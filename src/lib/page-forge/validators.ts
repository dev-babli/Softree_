/**
 * Page Forge Agent System — planning-artifact validators.
 *
 * Pure, deterministic validation logic for the artifacts produced by the
 * agent layer (direction, story, component map). This module never performs
 * IO; it only inspects already-parsed artifact objects and returns structured
 * results the Orchestrator uses to accept, reject, or gate a phase output.
 *
 * The file is intentionally organized into per-artifact sections so later
 * tasks can extend it without reshaping existing exports:
 *   - DIRECTION validators  (task 10.1 — implemented here)
 *   - STORY validators      (task 10.6 — placeholder below)
 *   - COMPONENT-MAP validators (task 10.9 — placeholder below)
 *
 * Requirements: 3.2, 3.3, 3.4, 4.2, 4.4, 4.5, 4.6, 4.8
 */

import type {
    ComponentAssignment,
    DesignDirection,
    Phase,
    ReferenceSource,
    ScrollBeat,
    ScrollBehavior,
} from "./types";
import { BRAND_TOKENS, FORBIDDEN_AESTHETICS, PIN_BUDGET } from "./constraints";

// ===========================================================================
// DIRECTION validators (task 10.1)
// ===========================================================================

/**
 * The approved macro directions defined in the trend bank
 * (`design-trends-2026.md`). The Trend_Scout may only select a Design_Direction
 * whose name is a member of this set (Req 3.3). Exported as a convenience
 * default for {@link validateDirection}; callers may pass a different set
 * (for example, loaded from a live trend bank) if needed.
 */
export const APPROVED_DIRECTION_NAMES: readonly string[] = [
    "Editorial Enterprise Scrollytelling",
    "Light About-Us Agency",
    "Stat-Led Trust",
    "Narrative Workflow",
    "Split Studio / Workbench",
] as const;

/** The approved trend-bank default direction (Req 3.7). */
export const DEFAULT_DIRECTION_NAME = "Editorial Enterprise Scrollytelling";

/**
 * Directions explicitly rejected for Softree (Req 3.4). This includes the
 * shared {@link FORBIDDEN_AESTHETICS} identifiers plus the human-readable
 * rejected-macro names listed in the trend bank, so a direction expressed in
 * either form is caught.
 */
export const REJECTED_DIRECTION_NAMES: readonly string[] = [
    ...FORBIDDEN_AESTHETICS,
    "Neon cyberpunk / matrix rain",
    "Purple AI mesh hero",
    "Full-page WebGL fluid",
    "Playful blob mascots",
    "Glassmorphism-everything",
    "Infinite auto-play marquee chaos",
    "Multi-pin scroll hijack",
] as const;

/** Inclusive integer range every direction dial must fall within (Req 3.2). */
export const DIAL_RANGE = { min: 0, max: 10 } as const;

/** The result of validating a single artifact. */
export interface ValidationResult {
    valid: boolean;
    errors: string[];
}

/** Case-insensitive membership test against a name set. */
function includesName(names: readonly string[], candidate: string): boolean {
    const needle = candidate.trim().toLowerCase();
    return names.some((name) => name.trim().toLowerCase() === needle);
}

/** True when `value` is an integer within the inclusive dial range [0, 10]. */
function isValidDial(value: number): boolean {
    return (
        Number.isInteger(value) &&
        value >= DIAL_RANGE.min &&
        value <= DIAL_RANGE.max
    );
}

/**
 * Validate a candidate Design_Direction.
 *
 * The direction is accepted (`valid: true`) if and only if:
 *  - its `name` is a member of `approvedNames` (Req 3.3),
 *  - its `name` is NOT a member of `rejectedNames` (Req 3.4), and
 *  - each of its three dials (variance, motion, density) is an integer in the
 *    inclusive range [0, 10] (Req 3.2).
 *
 * When invalid, `errors` lists every failing condition so the caller can
 * report all problems at once rather than one at a time. The function is pure
 * and total; it never throws.
 *
 * @param direction     the candidate direction to validate
 * @param approvedNames approved trend-bank names (defaults to {@link APPROVED_DIRECTION_NAMES})
 * @param rejectedNames rejected-for-Softree names (defaults to {@link REJECTED_DIRECTION_NAMES})
 *
 * Requirements: 3.2, 3.3, 3.4
 */
export function validateDirection(
    direction: DesignDirection,
    approvedNames: readonly string[] = APPROVED_DIRECTION_NAMES,
    rejectedNames: readonly string[] = REJECTED_DIRECTION_NAMES
): ValidationResult {
    const errors: string[] = [];

    if (!includesName(approvedNames, direction.name)) {
        errors.push(
            `Direction name "${direction.name}" is not a member of the approved trend bank.`
        );
    }

    if (includesName(rejectedNames, direction.name)) {
        errors.push(
            `Direction name "${direction.name}" is listed as rejected for Softree.`
        );
    }

    const dials: Array<["variance" | "motion" | "density", number]> = [
        ["variance", direction.dials.variance],
        ["motion", direction.dials.motion],
        ["density", direction.dials.density],
    ];
    for (const [dial, value] of dials) {
        if (!isValidDial(value)) {
            errors.push(
                `Dial "${dial}" must be an integer in [${DIAL_RANGE.min}, ${DIAL_RANGE.max}] (received ${value}).`
            );
        }
    }

    return { valid: errors.length === 0, errors };
}

// ---------------------------------------------------------------------------
// Reference recording + accessibility handling (Req 4.2, 4.8)
// ---------------------------------------------------------------------------

/**
 * The partitioning of a set of Reference_Sources for the direction artifact.
 *
 * - `recorded`     — every reference, since Req 4.2 requires all used
 *                    references (and, per Req 4.8, all inaccessible ones) to be
 *                    recorded in the direction artifact.
 * - `usable`       — accessible references that may inform Design_Direction
 *                    selection (Req 4.2). Selection continues over these.
 * - `inaccessible` — references flagged unreachable/unreadable; recorded but
 *                    excluded from selection (Req 4.8).
 */
export interface ReferencePartition {
    recorded: ReferenceSource[];
    usable: ReferenceSource[];
    inaccessible: ReferenceSource[];
}

/**
 * Partition Reference_Sources into what gets recorded, what remains usable for
 * selection, and what is inaccessible.
 *
 * Every reference is recorded (Req 4.2/4.8). A reference is treated as
 * inaccessible when its `inaccessible` flag is set; such references are
 * excluded from `usable` so selection continues over only the reachable ones
 * (Req 4.8). The function is pure and does not mutate its input.
 *
 * Requirements: 4.2, 4.8
 */
export function partitionReferences(
    refs: readonly ReferenceSource[]
): ReferencePartition {
    const recorded = [...refs];
    const inaccessible = recorded.filter((ref) => ref.inaccessible === true);
    const usable = recorded.filter((ref) => ref.inaccessible !== true);
    return { recorded, usable, inaccessible };
}

// ---------------------------------------------------------------------------
// Internet reference count + shortfall policy (Req 4.3, 4.9)
// ---------------------------------------------------------------------------

/**
 * The inclusive target range of internet Reference_Sources the Trend_Scout
 * retrieves during the Trend selection phase (Req 4.3): between two and three.
 */
export const INTERNET_REFERENCE_MIN = 2;
export const INTERNET_REFERENCE_MAX = 3;

/**
 * The outcome of evaluating the internet-reference count for the direction
 * artifact against the Req 4.3 target range.
 *
 * - `internetCount` — how many internet-kind references were retrieved.
 * - `withinTarget`  — true when the count is in the accepted [2, 3] range.
 * - `overTarget`    — true when more than the max (3) were retrieved.
 * - `shortfall`     — true when fewer than the min (2) were retrieved; when
 *                     set, the Trend_Scout must record the shortfall in the
 *                     direction artifact and proceed with what is available
 *                     (Req 4.9).
 */
export interface ReferenceCountEvaluation {
    internetCount: number;
    withinTarget: boolean;
    overTarget: boolean;
    shortfall: boolean;
}

/**
 * Evaluate the internet-reference count policy for a set of Reference_Sources.
 *
 * Only `kind: "internet"` references count toward the Trend-phase web-search
 * target (Req 4.3); user-supplied Design_Data references are ignored here. The
 * count is classified against the inclusive [{@link INTERNET_REFERENCE_MIN},
 * {@link INTERNET_REFERENCE_MAX}] target range: a count below the minimum is a
 * `shortfall` the Trend_Scout must record (Req 4.9), a count within range is
 * `withinTarget`, and a count above the maximum is `overTarget`.
 *
 * The function is pure and total; it never throws and does not mutate input.
 *
 * Requirements: 4.3, 4.9
 */
export function evaluateReferenceCount(
    refs: readonly ReferenceSource[]
): ReferenceCountEvaluation {
    const internetCount = refs.filter((ref) => ref.kind === "internet").length;
    const shortfall = internetCount < INTERNET_REFERENCE_MIN;
    const overTarget = internetCount > INTERNET_REFERENCE_MAX;
    const withinTarget = !shortfall && !overTarget;
    return { internetCount, withinTarget, overTarget, shortfall };
}

// ---------------------------------------------------------------------------
// Brand-token-wins-over-reference resolution (Req 4.6)
// ---------------------------------------------------------------------------

/** The known Brand_Token keys, for identifying which token wins a conflict. */
export type BrandTokenKey = keyof typeof BRAND_TOKENS;

/**
 * The resolution of a conflict between a Reference_Source and a Brand_Token or
 * hard constraint. The Brand_Token always wins (`brandTokenWins: true`), and
 * the rejected reference aspect is recorded on the returned reference
 * (`reference.rejectedAspect`) so the direction artifact preserves the trail.
 */
export interface ConflictResolution {
    brandTokenWins: true;
    /** The winning Brand_Token key (when the conflict is with a token). */
    brandToken?: BrandTokenKey;
    /** The reference with its `rejectedAspect` recorded (Req 4.6). */
    reference: ReferenceSource;
    /** The aspect of the reference that was rejected. */
    rejectedAspect: string;
}

/**
 * Resolve a conflict between a Reference_Source and a Brand_Token / hard
 * constraint in favor of the Brand_Token (Req 4.6).
 *
 * The resolved aesthetic retains the Brand_Token; the conflicting aspect of the
 * reference is recorded as `rejectedAspect` on a copy of the reference (the
 * input is not mutated). The reference remains otherwise usable — only the
 * conflicting aspect is dropped.
 *
 * Requirements: 4.6
 */
export function resolveBrandConflict(
    reference: ReferenceSource,
    rejectedAspect: string,
    brandToken?: BrandTokenKey
): ConflictResolution {
    return {
        brandTokenWins: true,
        brandToken,
        reference: { ...reference, rejectedAspect },
        rejectedAspect,
    };
}

// ---------------------------------------------------------------------------
// Internet-retrieval phase gate (Req 4.4, 4.5)
// ---------------------------------------------------------------------------

/**
 * Decide whether internet Reference_Source retrieval is permitted.
 *
 * Retrieval is permitted if and only if the current phase is Trend selection
 * (Req 4.4), OR an agent in another phase is retrieving a reference to resolve
 * a Finding (Req 4.5). In every other case retrieval is refused.
 *
 * Requirements: 4.4, 4.5
 */
export function internetRetrievalPermitted(
    phase: Phase,
    resolvingFinding: boolean
): boolean {
    return phase === "trend" || resolvingFinding;
}

// ===========================================================================
// STORY validators (task 10.6)
// ===========================================================================

/** Inclusive lower bound on the number of Scroll_Beats in a story (Req 6.1). */
export const STORY_BEAT_MIN = 4;

/** Inclusive upper bound on the number of Scroll_Beats in a story (Req 6.1). */
export const STORY_BEAT_MAX = 9;

/**
 * The approved scroll behaviors a Scroll_Beat may declare (Req 6.2). Mirrors
 * the {@link ScrollBehavior} union so the validator can check membership at
 * runtime (the union alone only constrains at compile time).
 */
export const APPROVED_SCROLL_BEHAVIORS: readonly ScrollBehavior[] = [
    "static",
    "reveal",
    "pin-scrub",
    "count-up",
    "none",
] as const;

/** The single scroll behavior that constitutes a heavy ScrollTrigger pin. */
export const HEAVY_PIN_BEHAVIOR: ScrollBehavior = "pin-scrub";

/**
 * The canonical narrative arc a story must progress through, in order
 * (Req 6.5). Exported so callers and tests share one source of truth for the
 * phase sequence problem → approach → proof → path → contact.
 */
export const NARRATIVE_ORDER = [
    "problem",
    "approach",
    "proof",
    "path",
    "contact",
] as const;

/** One canonical narrative phase. */
export type NarrativePhase = (typeof NARRATIVE_ORDER)[number];

/**
 * Keyword table mapping a Scroll_Beat's human `beat` label to a canonical
 * {@link NarrativePhase}. Matching is case-insensitive and substring-based so
 * labels such as "Hook", "The Problem", "Proof / Metrics", or "Close (Contact)"
 * resolve to the right phase. Order within each list does not matter; the whole
 * table is scanned and the phase with a matching keyword wins.
 */
const NARRATIVE_KEYWORDS: Record<NarrativePhase, readonly string[]> = {
    problem: ["hook", "problem", "challenge", "pain", "tension", "intro"],
    approach: ["mechanism", "approach", "solution", "how", "method", "system"],
    proof: ["proof", "metric", "stat", "result", "evidence", "trust", "logo"],
    path: ["process", "path", "step", "journey", "roadmap", "plan", "workflow"],
    contact: ["close", "contact", "cta", "connect", "talk", "reach"],
};

/**
 * Classify a beat label into its canonical {@link NarrativePhase}, or `null`
 * when no keyword matches. Pure and case-insensitive.
 */
function classifyNarrativePhase(beatLabel: string): NarrativePhase | null {
    const needle = beatLabel.trim().toLowerCase();
    if (needle === "") {
        return null;
    }
    for (const phase of NARRATIVE_ORDER) {
        if (NARRATIVE_KEYWORDS[phase].some((kw) => needle.includes(kw))) {
            return phase;
        }
    }
    return null;
}

/**
 * Validate a scroll narrative (its ordered list of Scroll_Beats).
 *
 * The story is accepted (`valid: true`) if and only if:
 *  - it contains between {@link STORY_BEAT_MIN} and {@link STORY_BEAT_MAX}
 *    ordered beats, inclusive (Req 6.1);
 *  - every beat maps to exactly one non-empty section id, exactly one non-empty
 *    emotional purpose, and exactly one approved scroll behavior (Req 6.2);
 *  - all section ids are unique across beats (Req 6.3); and
 *  - at most {@link PIN_BUDGET} (one) beat uses the heavy pin behavior
 *    `"pin-scrub"` (Req 6.4).
 *
 * `errors` accumulates every failing condition so the caller sees all problems
 * at once. The function is pure and total; it never throws.
 *
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */
export function validateStory(beats: ScrollBeat[]): ValidationResult {
    const errors: string[] = [];

    // Beat count within the inclusive [4, 9] range (Req 6.1).
    if (beats.length < STORY_BEAT_MIN || beats.length > STORY_BEAT_MAX) {
        errors.push(
            `Story must have between ${STORY_BEAT_MIN} and ${STORY_BEAT_MAX} beats (received ${beats.length}).`
        );
    }

    // Per-beat field validity (Req 6.2).
    const seenSectionIds = new Map<string, number>();
    beats.forEach((beat, index) => {
        if (beat.sectionId.trim() === "") {
            errors.push(`Beat ${index} ("${beat.beat}") is missing a section id.`);
        }
        if (beat.emotionalPurpose.trim() === "") {
            errors.push(
                `Beat ${index} ("${beat.beat}") is missing an emotional purpose.`
            );
        }
        if (!APPROVED_SCROLL_BEHAVIORS.includes(beat.scrollBehavior)) {
            errors.push(
                `Beat ${index} ("${beat.beat}") has an unapproved scroll behavior "${beat.scrollBehavior}".`
            );
        }

        // Track section-id occurrences for the uniqueness check (Req 6.3).
        const key = beat.sectionId.trim();
        if (key !== "") {
            seenSectionIds.set(key, (seenSectionIds.get(key) ?? 0) + 1);
        }
    });

    // Section ids unique across all beats (Req 6.3).
    for (const [sectionId, count] of seenSectionIds) {
        if (count > 1) {
            errors.push(
                `Section id "${sectionId}" is assigned to ${count} beats; ids must be unique.`
            );
        }
    }

    // At most one heavy pin across the story (Req 6.4).
    const heavyPins = beats.filter(
        (beat) => beat.scrollBehavior === HEAVY_PIN_BEHAVIOR
    ).length;
    if (heavyPins > PIN_BUDGET) {
        errors.push(
            `Story uses ${heavyPins} heavy pins; the Pin_Budget allows at most ${PIN_BUDGET}.`
        );
    }

    return { valid: errors.length === 0, errors };
}

/**
 * Validate that a story's beats progress through the canonical narrative arc
 * problem → approach → proof → path → contact without inversion (Req 6.5).
 *
 * Each beat's `beat` label is classified into a {@link NarrativePhase} via
 * {@link classifyNarrativePhase}. For every phase that appears, its
 * first-occurrence index in the beat list is taken; the ordering is accepted if
 * and only if those first-occurrence indices are non-decreasing when read in
 * the canonical {@link NARRATIVE_ORDER}. A beat whose label matches no phase is
 * reported as unclassifiable (the arc cannot be verified around it).
 *
 * The function is pure and total; it never throws.
 *
 * Requirements: 6.5
 */
export function validateNarrativeOrder(beats: ScrollBeat[]): ValidationResult {
    const errors: string[] = [];

    // First-occurrence index of each canonical phase (undefined if absent).
    const firstOccurrence = new Map<NarrativePhase, number>();
    beats.forEach((beat, index) => {
        const phase = classifyNarrativePhase(beat.beat);
        if (phase === null) {
            errors.push(
                `Beat ${index} ("${beat.beat}") does not map to a known narrative phase.`
            );
            return;
        }
        if (!firstOccurrence.has(phase)) {
            firstOccurrence.set(phase, index);
        }
    });

    // Read first-occurrence indices in canonical order and confirm they are
    // non-decreasing; any drop means a later phase appeared before an earlier
    // one (an inversion).
    let previousPhase: NarrativePhase | null = null;
    let previousIndex = -1;
    for (const phase of NARRATIVE_ORDER) {
        const occurrence = firstOccurrence.get(phase);
        if (occurrence === undefined) {
            continue;
        }
        if (occurrence < previousIndex) {
            errors.push(
                `Narrative inversion: "${phase}" first appears at beat ${occurrence}, before "${previousPhase}" at beat ${previousIndex}.`
            );
        }
        previousPhase = phase;
        previousIndex = occurrence;
    }

    return { valid: errors.length === 0, errors };
}

// ===========================================================================
// COMPONENT-MAP validators (task 10.9)
// ===========================================================================

/**
 * The known component-catalog Pattern_IDs (Req 7.3). Mirrors the pattern IDs in
 * the trend-bank component catalog (`component-catalog.md`). A Component_Mapper
 * may only assign a Pattern_ID that is a member of this catalog; anything else
 * must instead be recorded as an unmatched-pattern gap (Req 7.7).
 *
 * Callers may pass a different catalog to {@link validateComponentMap} (for
 * example, loaded from a live catalog); this const is the sensible default.
 */
export const CATALOG: readonly string[] = [
    // Heroes
    "H-LIGHT-EDITORIAL",
    "H-STAT-LED",
    "H-LETTER",
    "H-MANIFESTO",
    // Trust
    "T-LOGO-ROW",
    "T-HAIRLINE-WALL",
    // Mechanism / scrollytelling
    "M-PIN-TABS",
    "M-STICKY-STEPS",
    "M-STEP-SEQUENCE",
    // Pillars / features
    "F-ASYM-BENTO",
    "F-INDEX-LIST",
    "F-CARD-GRID",
    // Industry / context
    "I-PILLS-PANEL",
    // Tech stack
    "S-SPEC-SHEET",
    // Framework / services
    "V-SERVICE-ROWS",
    // Social proof / why
    "W-REASON-GRID",
    "W-QUOTE-LED",
    // Stats
    "N-COUNT-STRIP",
    "N-STAT-HERO-BAND",
    // Process
    "P-VERTICAL-STEPS",
    "P-STICKY-PROCESS",
    // Certifications
    "C-BADGE-ROW",
    // Close (Sacred_UI)
    "X-LIGHT-CONTACT",
    "X-LIGHT-FAQ",
    // Page chrome
    "L-BRAND-INTRO",
] as const;

/**
 * The catalog Pattern_IDs that employ a heavy ScrollTrigger pin. Only these
 * count against the Pin_Budget in the component map (Req 7.8). `M-PIN-TABS` is
 * the pinned/scrubbed mechanism pattern; the sticky variants are not heavy
 * pins.
 */
export const HEAVY_PIN_PATTERN_IDS: readonly string[] = ["M-PIN-TABS"] as const;

/** The motion libraries an assignment may declare (Req 7.2). */
export const APPROVED_MOTION_LIBS: readonly ComponentAssignment["motionLib"][] = [
    "gsap-scrolltrigger",
    "framer",
    "css",
    "none",
] as const;

/**
 * Validate a component map: the set of section-to-Pattern_ID assignments
 * produced against a locked {@link DesignDirection}.
 *
 * The map is accepted (`valid: true`) if and only if:
 *  - every assignment carries a non-empty section id and each section id is
 *    assigned exactly once — no section is unassigned or double-assigned
 *    (Req 7.1);
 *  - every non-gap assignment's `patternId` is a member of `catalog`; a section
 *    with no catalog match must be recorded as an unmatched-pattern gap
 *    (`unmatchedGap: true`) rather than assigned an off-catalog Pattern_ID
 *    (Req 7.3, 7.7);
 *  - every non-gap assignment's `motionLib` is one of
 *    {@link APPROVED_MOTION_LIBS} and its `reducedMotionFallback` and
 *    `mobileStacking` fields are present and non-empty (Req 7.2); and
 *  - at most one assignment uses a heavy ScrollTrigger pin, consistent with the
 *    Pin_Budget of one and the locked direction's scrollytelling budget
 *    (Req 7.8).
 *
 * Dial consistency (Req 7.4): the {@link ComponentAssignment} shape carries no
 * per-assignment dial values, so the per-assignment dial-match sub-check is not
 * applicable here and is intentionally skipped. The locked `direction` is still
 * consulted for the effective pin budget (the stricter of {@link PIN_BUDGET}
 * and `direction.scrollytellingBudget.maxPins`).
 *
 * `errors` accumulates every failing condition. The function is pure and total;
 * it never throws.
 *
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.7, 7.8
 */
export function validateComponentMap(
    assignments: ComponentAssignment[],
    direction: DesignDirection,
    catalog: readonly string[] = CATALOG
): ValidationResult {
    const errors: string[] = [];

    // Single, total assignment: non-empty and unique section ids (Req 7.1).
    const seenSectionIds = new Map<string, number>();
    assignments.forEach((assignment, index) => {
        const key = assignment.sectionId.trim();
        if (key === "") {
            errors.push(`Assignment ${index} is missing a section id.`);
        } else {
            seenSectionIds.set(key, (seenSectionIds.get(key) ?? 0) + 1);
        }
    });
    for (const [sectionId, count] of seenSectionIds) {
        if (count > 1) {
            errors.push(
                `Section "${sectionId}" is assigned ${count} times; each section must have exactly one Pattern_ID.`
            );
        }
    }

    // Per-assignment validity (Req 7.2, 7.3, 7.7).
    assignments.forEach((assignment, index) => {
        const label = assignment.sectionId.trim() || `#${index}`;
        const inCatalog = catalog.includes(assignment.patternId);

        if (assignment.unmatchedGap === true) {
            // A recorded gap must NOT smuggle in an off-catalog Pattern_ID as a
            // real assignment; the gap is the recorded outcome (Req 7.7).
            return;
        }

        if (!inCatalog) {
            errors.push(
                `Section "${label}" uses Pattern_ID "${assignment.patternId}" which is not in the catalog; record it as an unmatched-pattern gap instead.`
            );
        }

        if (!APPROVED_MOTION_LIBS.includes(assignment.motionLib)) {
            errors.push(
                `Section "${label}" uses an unapproved motion library "${assignment.motionLib}".`
            );
        }

        if (assignment.reducedMotionFallback.trim() === "") {
            errors.push(
                `Section "${label}" is missing a reduced-motion fallback.`
            );
        }

        if (assignment.mobileStacking.trim() === "") {
            errors.push(`Section "${label}" is missing a mobile stacking behavior.`);
        }
    });

    // At most one heavy ScrollTrigger pin, bounded by the stricter of the
    // global Pin_Budget and the locked direction's scrollytelling budget
    // (Req 7.8). Gaps carry no real pattern and are excluded.
    const effectiveBudget = Math.min(
        PIN_BUDGET,
        direction.scrollytellingBudget.maxPins
    );
    const heavyPins = assignments.filter(
        (assignment) =>
            assignment.unmatchedGap !== true &&
            HEAVY_PIN_PATTERN_IDS.includes(assignment.patternId)
    ).length;
    if (heavyPins > effectiveBudget) {
        errors.push(
            `Component map uses ${heavyPins} heavy pins; the Pin_Budget allows at most ${effectiveBudget}.`
        );
    }

    return { valid: errors.length === 0, errors };
}
