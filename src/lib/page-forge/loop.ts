/**
 * Page Forge Agent System — loop controller.
 *
 * Pure, deterministic decision logic for the bounded correction loop. This
 * module never performs IO; it only routes verdicts to actions, advances the
 * loop counter, and computes the scoping/ordering/scheduling that the
 * Orchestrator uses to drive Correction_Agents.
 *
 * Requirements: 14.1, 14.3, 14.4, 14.6, 14.8
 */

import type {
    Dimension,
    Finding,
    LoopAction,
    LoopState,
    Verdict,
} from "./types";

// ---------------------------------------------------------------------------
// Canonical ordering constants
// ---------------------------------------------------------------------------

/**
 * Canonical dimension order. Used to make failed-dimension scoping stable and
 * deterministic regardless of the order dimensions arrive from a Verdict.
 */
const DIMENSION_ORDER: readonly Dimension[] = [
    "visual_design",
    "storytelling",
    "motion",
    "layout_responsive",
    "performance",
    "content_honesty",
] as const;

/**
 * The three correction fixers, in the fixed serialization order used when
 * their owned file sets overlap (Req 14.6): Design → Responsive → Performance.
 */
export type FixerName = "design" | "responsive" | "performance";

export const FIXER_ORDER: readonly FixerName[] = [
    "design",
    "responsive",
    "performance",
] as const;

/**
 * Which scored dimensions each fixer is responsible for correcting. A failed
 * dimension routes to exactly one fixer (Req 14.1, 14.6).
 */
export const FIXER_DIMENSIONS: Record<FixerName, readonly Dimension[]> = {
    design: ["visual_design", "storytelling", "motion"],
    responsive: ["layout_responsive"],
    performance: ["performance"],
};

// ---------------------------------------------------------------------------
// Verdict routing (Req 14.1, 14.8)
// ---------------------------------------------------------------------------

/**
 * Route the next loop action from a Verdict and the current LoopState.
 *
 * - APPROVED                          → ship
 * - REJECTED and loop >= maxLoops     → escalate (termination guarantee, 14.8)
 * - REJECTED and loop <  maxLoops     → correct exactly the failed dimensions
 *
 * Pure and total. Because `maxLoops` is clamped into [1,10] by the Brief and
 * {@link incrementLoop} is monotonic, this routing guarantees termination.
 */
export function nextAction(state: LoopState, verdict: Verdict): LoopAction {
    if (verdict.verdict === "APPROVED") {
        return { kind: "ship" };
    }
    if (state.loop >= state.maxLoops) {
        return { kind: "escalate" };
    }
    return { kind: "correct", dimensions: failedDimensions(verdict) };
}

// ---------------------------------------------------------------------------
// Loop counter (Req 14.4)
// ---------------------------------------------------------------------------

/**
 * Advance the loop counter by exactly one, returning a new LoopState. Pure and
 * monotonic (the returned `loop` is always the previous `loop` plus one); the
 * original state is never mutated.
 */
export function incrementLoop(state: LoopState): LoopState {
    return {
        ...state,
        loop: state.loop + 1,
    };
}

// ---------------------------------------------------------------------------
// Failed-dimension scoping (Req 14.1)
// ---------------------------------------------------------------------------

/**
 * Derive the exact set of dimensions needing correction from a Verdict.
 *
 * A dimension needs correction when it is below the pass minimum (already
 * captured in `verdict.failedDimensions`) OR when it has an open P0 Finding
 * (from `verdict.openP0`). The union is de-duplicated and returned in the
 * canonical dimension order so callers get a stable, deterministic scope
 * limited to exactly the failed dimensions (Req 14.1).
 */
export function failedDimensions(verdict: Verdict): Dimension[] {
    const needing = new Set<Dimension>(verdict.failedDimensions);
    for (const finding of verdict.openP0) {
        if (finding.open && finding.severity === "P0") {
            needing.add(finding.dimension);
        }
    }
    return DIMENSION_ORDER.filter((dimension) => needing.has(dimension));
}

/**
 * Map a set of failed dimensions to the fixers that own them, returned in the
 * fixed Design → Responsive → Performance order. Only fixers that own at least
 * one of the failed dimensions are included (Req 14.6).
 */
export function fixersForDimensions(dimensions: readonly Dimension[]): FixerName[] {
    const failed = new Set<Dimension>(dimensions);
    return FIXER_ORDER.filter((fixer) =>
        FIXER_DIMENSIONS[fixer].some((dimension) => failed.has(dimension))
    );
}

// ---------------------------------------------------------------------------
// Fix ordering: P0 before P1 (Req 14.3)
// ---------------------------------------------------------------------------

const SEVERITY_RANK: Record<Finding["severity"], number> = {
    P0: 0,
    P1: 1,
    P2: 2,
};

/**
 * Order assigned Findings so that every P0 comes before every P1, and every P1
 * before every P2 (Req 14.3). The sort is stable within a severity band, so
 * the relative order of same-severity Findings from the input is preserved.
 * Pure — a new array is returned and the input is not mutated.
 */
export function orderFindingsByFixPriority(findings: readonly Finding[]): Finding[] {
    return findings
        .map((finding, index) => ({ finding, index }))
        .sort((a, b) => {
            const rank =
                SEVERITY_RANK[a.finding.severity] - SEVERITY_RANK[b.finding.severity];
            return rank !== 0 ? rank : a.index - b.index;
        })
        .map((entry) => entry.finding);
}

// ---------------------------------------------------------------------------
// Fixer scheduling (Req 14.6)
// ---------------------------------------------------------------------------

/**
 * Map of fixer → the set of files that fixer intends to modify. Only the
 * fixers present in the map are scheduled.
 */
export type FixerFileSets = Partial<Record<FixerName, readonly string[]>>;

/**
 * A correction schedule: an ordered array of "waves". Each wave is a set of
 * fixers (in canonical Design → Responsive → Performance order) whose owned
 * file sets are pairwise disjoint, so every fixer in a wave can run in
 * parallel. Waves run sequentially, so fixers with overlapping file sets are
 * serialized across waves in canonical order.
 */
export type FixerSchedule = FixerName[][];

/**
 * Compute a correction schedule from each fixer's owned file set (Req 14.6).
 *
 * Fixers run in PARALLEL when their file sets are pairwise disjoint and are
 * SERIALIZED in the order Design → Responsive → Performance when they modify
 * shared files. The algorithm walks fixers in canonical order and greedily
 * places each into the earliest wave whose members it does not conflict with,
 * creating a new wave only when it conflicts with every existing wave. This
 * yields a single parallel wave when all file sets are disjoint, and a fully
 * serialized schedule when every fixer shares files.
 */
export function scheduleFixers(fileSets: FixerFileSets): FixerSchedule {
    const present = FIXER_ORDER.filter(
        (fixer): fixer is FixerName => fileSets[fixer] !== undefined
    );

    const ownedFiles = (fixer: FixerName): Set<string> =>
        new Set(fileSets[fixer] ?? []);

    const shareFile = (a: Set<string>, b: Set<string>): boolean => {
        for (const file of a) {
            if (b.has(file)) {
                return true;
            }
        }
        return false;
    };

    // Assign each fixer (in canonical Design → Responsive → Performance order) a
    // wave index one past the latest wave of any EARLIER-canonical fixer it
    // shares a file with. A fixer that conflicts with nobody earlier stays in
    // wave 0. This guarantees two invariants required by Req 14.6:
    //   1. within a wave, every pair is file-disjoint (a fixer never lands in a
    //      wave that already holds a fixer it conflicts with); and
    //   2. conflicting fixers are serialized in canonical order (a later-canonical
    //      fixer that shares a file always gets a strictly greater wave index).
    // The greedy earliest-fit approach previously used here was incorrect: it
    // could place performance in an earlier wave than a responsive fixer it
    // conflicts with, inverting the required order.
    const placed: { fixer: FixerName; files: Set<string>; wave: number }[] = [];

    for (const fixer of present) {
        const files = ownedFiles(fixer);
        let wave = 0;
        for (const prior of placed) {
            if (shareFile(files, prior.files)) {
                wave = Math.max(wave, prior.wave + 1);
            }
        }
        placed.push({ fixer, files, wave });
    }

    if (placed.length === 0) {
        return [];
    }

    // Materialize contiguous waves, preserving canonical order within each wave.
    const maxWave = Math.max(...placed.map((p) => p.wave));
    const waves: FixerName[][] = [];
    for (let w = 0; w <= maxWave; w++) {
        const members = placed
            .filter((p) => p.wave === w)
            .map((p) => p.fixer);
        if (members.length > 0) {
            waves.push(members);
        }
    }

    return waves;
}
