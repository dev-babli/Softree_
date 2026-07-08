/**
 * Page Forge — pipeline state discovery and resume (`state.ts`).
 *
 * The Artifact_Directory `.planning/page-forge/<slug>/` is the persistent state
 * of a run: the presence of an artifact means its phase completed, and the
 * front matter of `06-REVIEW.md` records the loop counter and verdict. This
 * module reads that directory and computes where a run should resume.
 *
 * The module is split into two layers:
 *
 *  - IO layer: {@link discoverState} inspects the directory (via
 *    `artifacts.ts` helpers and `fs`), reconstructs a normalized Brief, reads
 *    the review front matter, and assembles a {@link PipelineState}.
 *  - Pure layer: {@link resumePoint}, {@link nextIncompletePhase}, and
 *    {@link prerequisiteBackfill} are pure, total functions of their inputs.
 *    They contain the resume decision and prerequisite-backfill logic and are
 *    therefore independently property-testable (tasks 13.2–13.4).
 *
 * Resume rules (Req 16.1, 16.2):
 *  - Resume from the phase *after* the highest completed phase — i.e. the
 *    earliest phase in `PHASE_ORDER` whose artifact is absent.
 *  - When `06-REVIEW.md` records a REJECTED verdict and no correction artifact
 *    (`07-LOOP-<loop>-*`) exists for the current loop, resume at the correction
 *    phase for that loop (Req 16.2).
 *  - A correction wave that *has* been recorded for the current loop supersedes
 *    that loop's parallel check and review (they are regenerated on the next
 *    iteration — design flow step 2), so those phases are treated as pending
 *    again and the run resumes at the parallel check.
 *
 * Requirements: 1.1, 1.7, 16.1, 16.2
 */

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import {
    ARTIFACT_NAMES,
    ROOT,
    loopArtifactName,
    parseArtifact,
    verifyExists,
} from "./artifacts";
import { normalizeBrief } from "./brief";
import { PHASE_ORDER } from "./types";
import type {
    Brief,
    BriefInput,
    LoopArtifactSet,
    LoopState,
    PageKind,
    Phase,
    PipelineState,
    ReviewArtifact,
} from "./types";

// ---------------------------------------------------------------------------
// Pure resume logic (Req 1.1, 1.7, 16.1, 16.2)
// ---------------------------------------------------------------------------

/**
 * The earliest phase in `PHASE_ORDER` that is not yet complete, or `"ship"`
 * when every phase is complete.
 *
 * Because the Orchestrator only ever advances through `PHASE_ORDER` (Req 1.1),
 * "the phase after the highest completed phase" is equivalently "the earliest
 * incomplete phase" (Req 16.1). Pure and total.
 */
export function nextIncompletePhase(completed: ReadonlySet<Phase>): Phase {
    for (const phase of PHASE_ORDER) {
        if (!completed.has(phase)) {
            return phase;
        }
    }
    return "ship";
}

/**
 * The ordered list of `target`'s missing prerequisite phases: every phase that
 * precedes `target` in `PHASE_ORDER` and is not in `completed`, returned in
 * canonical `PHASE_ORDER` order (Req 1.7).
 *
 * When a downstream phase is requested before a prerequisite's artifact exists,
 * the Orchestrator runs exactly these phases, in this order, before the target.
 * An unknown `target` (not in `PHASE_ORDER`) yields an empty backfill. Pure and
 * total; never mutates `completed`.
 */
export function prerequisiteBackfill(
    completed: ReadonlySet<Phase>,
    target: Phase,
): Phase[] {
    const targetIndex = PHASE_ORDER.indexOf(target);
    if (targetIndex < 0) {
        return [];
    }
    const missing: Phase[] = [];
    for (let i = 0; i < targetIndex; i++) {
        const phase = PHASE_ORDER[i];
        if (!completed.has(phase)) {
            missing.push(phase);
        }
    }
    return missing;
}

/**
 * Compute the phase to run next for a given {@link PipelineState}.
 *
 * If the review recorded a REJECTED verdict and no correction artifact exists
 * for the current loop, resume at the `correction` phase (Req 16.2). Otherwise
 * resume at the earliest incomplete phase (Req 16.1); if all phases are
 * complete, resume at `ship`.
 *
 * Pure: a function only of `state.loop.lastVerdict`,
 * `state.currentLoopArtifacts`, and `state.completedPhases`.
 */
export function resumePoint(state: PipelineState): Phase {
    const rejected = state.loop.lastVerdict === "REJECTED";
    const hasCorrectionArtifact =
        state.currentLoopArtifacts.design ||
        state.currentLoopArtifacts.responsive ||
        state.currentLoopArtifacts.performance;

    if (rejected && !hasCorrectionArtifact) {
        return "correction";
    }
    return nextIncompletePhase(state.completedPhases);
}

// ---------------------------------------------------------------------------
// Completed-phase derivation
// ---------------------------------------------------------------------------

/** Existence flags for the artifacts that gate phase completion. */
interface ArtifactFlags {
    brief: boolean;
    direction: boolean;
    story: boolean;
    componentMap: boolean;
    build: boolean;
    design: boolean;
    responsive: boolean;
    performance: boolean;
    review: boolean;
    /** `08-VERIFICATION.md` — the approved terminal artifact. */
    verification: boolean;
    /** Any `07-LOOP-<currentLoop>-*` correction artifact exists. */
    anyCorrection: boolean;
    /** Review verdict is APPROVED or USER_OVERRIDE (correction not required). */
    reviewResolvedNonRejected: boolean;
}

/**
 * Map artifact presence to the set of completed phases.
 *
 * - `parallel_check` completes only when all three checker artifacts
 *   (`05a`/`05b`/`05c`) exist.
 * - `review` completes when `06-REVIEW.md` exists.
 * - `correction` is considered resolved when the review verdict is APPROVED or
 *   USER_OVERRIDE (no correction needed) or when a correction wave has been
 *   recorded for the current loop.
 * - A recorded correction wave supersedes the current loop's parallel check and
 *   review, which are regenerated on the next iteration; they are therefore
 *   treated as pending so the run resumes at `parallel_check` (design flow
 *   step 2).
 * - The approved terminal (`08-VERIFICATION.md`) marks everything through
 *   `ship` complete.
 */
function computeCompletedPhases(flags: ArtifactFlags): Set<Phase> {
    const completed = new Set<Phase>();

    if (flags.brief) completed.add("brief");
    if (flags.direction) completed.add("trend");
    if (flags.story) completed.add("story");
    if (flags.componentMap) completed.add("component_map");
    if (flags.build) completed.add("build");

    if (flags.anyCorrection) {
        // Correction wave recorded for the current loop: the prior check/review
        // are stale and will be regenerated, so mark only the correction phase
        // complete and leave parallel_check/review pending.
        completed.add("correction");
    } else {
        if (flags.design && flags.responsive && flags.performance) {
            completed.add("parallel_check");
        }
        if (flags.review) {
            completed.add("review");
        }
        if (flags.review && flags.reviewResolvedNonRejected) {
            // Approved / user-override: no correction phase is needed.
            completed.add("correction");
        }
    }

    if (flags.verification) {
        // Approved terminal: the run has reached ship.
        completed.add("parallel_check");
        completed.add("review");
        completed.add("correction");
        completed.add("ship");
    }

    return completed;
}

// ---------------------------------------------------------------------------
// Artifact reading helpers
// ---------------------------------------------------------------------------

/** Read a raw artifact under `ROOT(slug)`; resolves relative to `cwd()`. */
async function readArtifactRaw(slug: string, name: string): Promise<string> {
    const target = resolve(process.cwd(), ROOT(slug), name);
    return readFile(target, "utf8");
}

/**
 * Read and normalize the `06-REVIEW.md` front matter into `{ verdict, loop }`.
 * Returns `null` when the artifact is missing or its front matter is
 * unreadable, so callers fall back to the pre-review defaults.
 */
async function readReviewFront(
    slug: string,
): Promise<Pick<ReviewArtifact, "verdict" | "loop"> | null> {
    let raw: string;
    try {
        raw = await readArtifactRaw(slug, ARTIFACT_NAMES.review);
    } catch {
        return null;
    }
    const { front } = parseArtifact<Partial<ReviewArtifact>>(raw);
    return {
        verdict: normalizeVerdict(front.verdict),
        loop: normalizeLoopNumber(front.loop),
    };
}

/** Coerce an unknown front-matter verdict into the known verdict union. */
function normalizeVerdict(
    value: unknown,
): "APPROVED" | "REJECTED" | "USER_OVERRIDE" {
    if (value === "REJECTED" || value === "USER_OVERRIDE") {
        return value;
    }
    // Anything else (including a missing/garbled value) is treated as APPROVED
    // only when explicitly APPROVED; otherwise default to APPROVED is unsafe, so
    // fall back to REJECTED which keeps the run inside the correction gate.
    return value === "APPROVED" ? "APPROVED" : "REJECTED";
}

/** Coerce an unknown front-matter loop value into a non-negative integer. */
function normalizeLoopNumber(value: unknown): number {
    return typeof value === "number" && Number.isInteger(value) && value >= 0
        ? value
        : 0;
}

// ---------------------------------------------------------------------------
// Brief reconstruction
// ---------------------------------------------------------------------------

const PAGE_KINDS: readonly PageKind[] = [
    "service",
    "about",
    "case-study",
    "landing",
];

/** Extract a string field from a front-matter object when present. */
function str(front: Record<string, unknown>, key: string): string | undefined {
    const value = front[key];
    return typeof value === "string" ? value : undefined;
}

/** Extract a finite number field from a front-matter object when present. */
function num(front: Record<string, unknown>, key: string): number | undefined {
    const value = front[key];
    return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

/** Extract a string[] field from a front-matter object when present. */
function strArray(
    front: Record<string, unknown>,
    key: string,
): string[] | undefined {
    const value = front[key];
    if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
        return value as string[];
    }
    return undefined;
}

/**
 * Best-effort reconstruction of a {@link BriefInput} from `00-BRIEF.md` front
 * matter. Only recognized, correctly-typed fields are carried over; the `slug`
 * is always taken from the directory being inspected (the authoritative
 * source). Unknown or mistyped fields are dropped so `normalizeBrief` can apply
 * its defaults.
 */
function briefInputFromFront(
    front: Record<string, unknown>,
    slug: string,
): BriefInput {
    const input: BriefInput = { slug };

    const route = str(front, "route");
    if (route !== undefined) input.route = route;

    const rawPageKind = str(front, "pageKind");
    if (rawPageKind !== undefined && PAGE_KINDS.includes(rawPageKind as PageKind)) {
        input.pageKind = rawPageKind as PageKind;
    }

    const audience = str(front, "audience");
    if (audience !== undefined) input.audience = audience;

    const contentSource = str(front, "contentSource");
    if (contentSource !== undefined) input.contentSource = contentSource;

    const references = strArray(front, "references");
    if (references !== undefined) input.references = references;

    const maxLoops = num(front, "maxLoops");
    if (maxLoops !== undefined) input.maxLoops = maxLoops;

    const threshold = num(front, "threshold");
    if (threshold !== undefined) input.threshold = threshold;

    const namedDirection = str(front, "namedDirection");
    if (namedDirection !== undefined) input.namedDirection = namedDirection;

    const mustPreserve = strArray(front, "mustPreserve");
    if (mustPreserve !== undefined) input.mustPreserve = mustPreserve;

    const expandedScope = strArray(front, "expandedScope");
    if (expandedScope !== undefined) input.expandedScope = expandedScope;

    return input;
}

/**
 * Read and normalize the Brief for `slug`. When `00-BRIEF.md` is absent or
 * unreadable, a minimal normalized Brief (defaults only, with the known slug)
 * is returned so downstream defaults such as `maxLoops` are still available.
 */
async function readBrief(slug: string, exists: boolean): Promise<Brief> {
    if (!exists) {
        return normalizeBrief({ slug });
    }
    try {
        const raw = await readArtifactRaw(slug, ARTIFACT_NAMES.brief);
        const { front } = parseArtifact<Record<string, unknown>>(raw);
        return normalizeBrief(briefInputFromFront(front, slug));
    } catch {
        return normalizeBrief({ slug });
    }
}

// ---------------------------------------------------------------------------
// discoverState (Req 16.1, 16.2)
// ---------------------------------------------------------------------------

/**
 * Inspect the Artifact_Directory for `slug` and assemble a
 * {@link PipelineState}.
 *
 * Reads which artifacts exist to derive `completedPhases`, parses the
 * `06-REVIEW.md` front matter to populate `LoopState` (loop + verdict), takes
 * `maxLoops` from the reconstructed Brief (default when absent), and checks
 * which `07-LOOP-<loop>-<dim>.md` correction artifacts exist for the current
 * loop.
 *
 * The returned Brief is reconstructed best-effort from `00-BRIEF.md`; when that
 * artifact is absent it is a minimal normalized Brief carrying only the slug
 * and defaults.
 */
export async function discoverState(slug: string): Promise<PipelineState> {
    const [
        brief,
        direction,
        story,
        componentMap,
        build,
        design,
        responsive,
        performance,
        review,
        verification,
    ] = await Promise.all([
        verifyExists(slug, ARTIFACT_NAMES.brief),
        verifyExists(slug, ARTIFACT_NAMES.direction),
        verifyExists(slug, ARTIFACT_NAMES.story),
        verifyExists(slug, ARTIFACT_NAMES.componentMap),
        verifyExists(slug, ARTIFACT_NAMES.build),
        verifyExists(slug, ARTIFACT_NAMES.design),
        verifyExists(slug, ARTIFACT_NAMES.responsive),
        verifyExists(slug, ARTIFACT_NAMES.performance),
        verifyExists(slug, ARTIFACT_NAMES.review),
        verifyExists(slug, ARTIFACT_NAMES.verification),
    ]);

    const briefModel = await readBrief(slug, brief);
    const reviewFront = review ? await readReviewFront(slug) : null;
    const currentLoop = reviewFront?.loop ?? 0;
    const verdict = reviewFront?.verdict ?? null;
    const lastVerdict: LoopState["lastVerdict"] =
        verdict === "APPROVED" || verdict === "REJECTED" ? verdict : null;

    const [loopDesign, loopResponsive, loopPerformance] = await Promise.all([
        verifyExists(slug, loopArtifactName(currentLoop, "design")),
        verifyExists(slug, loopArtifactName(currentLoop, "responsive")),
        verifyExists(slug, loopArtifactName(currentLoop, "performance")),
    ]);

    const currentLoopArtifacts: LoopArtifactSet = {
        design: loopDesign,
        responsive: loopResponsive,
        performance: loopPerformance,
    };
    const anyCorrection = loopDesign || loopResponsive || loopPerformance;

    const completedPhases = computeCompletedPhases({
        brief,
        direction,
        story,
        componentMap,
        build,
        design,
        responsive,
        performance,
        review,
        verification,
        anyCorrection,
        reviewResolvedNonRejected:
            verdict === "APPROVED" || verdict === "USER_OVERRIDE",
    });

    const loop: LoopState = {
        loop: currentLoop,
        maxLoops: briefModel.maxLoops,
        lastVerdict,
    };

    return {
        slug,
        brief: briefModel,
        loop,
        completedPhases,
        currentLoopArtifacts,
    };
}
