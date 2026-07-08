/**
 * Page Forge — Scoring engine (`scoring.ts`).
 *
 * The deterministic heart of the quality gate. Every function here is pure:
 * given the same inputs it returns the same output and it never performs IO.
 * The Review Agent (Req 13) calls into this module to compute the Overall_Score,
 * roll the scored dimensions up into the four Awwwards category scores, evaluate
 * the Pass_Gate verdict, and merge/de-duplicate the checker Findings.
 *
 * Scoring model — the OFFICIAL AWWWARDS EVALUATION STANDARD:
 *   Design 40%, Usability 30%, Creativity 20%, Content 10% (each 0..10).
 * The six scored sub-dimensions roll up into those four categories. The
 * per-dimension `WEIGHTS` sum to exactly 1.00 and every category subtotal
 * equals its `CATEGORY_WEIGHTS` entry:
 *   - Design    0.40 = visual_design 0.24 + motion 0.16
 *   - Usability 0.30 = layout_responsive 0.18 + performance 0.12
 *   - Creativity 0.20 = storytelling 0.20
 *   - Content   0.10 = content_honesty 0.10
 *
 * Design decisions (see design.md → "Scoring engine (scoring.ts)"):
 * - `WEIGHTS` are fixed and sum to exactly 1.0 (asserted at module load and by
 *   an exported helper). `CATEGORY_WEIGHTS` sum to 1.0 and every category
 *   subtotal drawn from `WEIGHTS` via `DIMENSION_CATEGORY` matches its category
 *   weight (both invariants asserted at module load) (Req 13.2).
 * - `computeOverall` is the weighted mean over the *scored* (non-null)
 *   dimensions: `sum(weight_d * score_d) / sum(weight_d)` for every non-null
 *   dimension `d`. Dividing by the present weight mass keeps the result on the
 *   0..10 scale even when some checkers failed to score their dimension
 *   (Req 9.8). When no dimension is scored the overall is 0.
 * - `computeCategoryScores` rolls each category up from its member dimensions
 *   using their sub-weights normalized within the category; a category is null
 *   when all its members are unscored (Req 13.3).
 * - `evaluateGate` is APPROVED iff `overall >= threshold`, every required
 *   Scored_Dimension is `>= 8.0`, and there is no open P0 Finding. A required
 *   dimension that is `null` (unscored) never satisfies `>= 8.0`, so incomplete
 *   evidence always fails safe to REJECTED (Req 13.4).
 * - `mergeFindings` merges the P0 and P1 Findings across checkers,
 *   de-duplicates them (by id), and orders them by user impact (all P0 before
 *   all P1, otherwise stable) (Req 13.6).
 * - `applyContentHonestyCap` caps `content_honesty` at 5 and forces an open P0
 *   whenever invented content (a fabricated metric, logo, or testimonial) is
 *   present (Req 13.9).
 * - `clampReviewScore` encodes the never-inflate rule: the Review Agent may
 *   lower a checker score on weak evidence but may only raise it above the prior
 *   score when a previously depressing Finding has been closed (Req 13.8).
 * - `openP2` selects the open P2 Findings for the ship report (Req 15.3).
 *
 * Requirements: 9.4, 9.7, 13.2, 13.3, 13.4, 13.5, 13.7, 13.8, 15.3, 17.6
 */

import type {
    CheckerReport,
    Dimension,
    DimensionScores,
    EvidenceRef,
    Finding,
    Score,
    Severity,
    Verdict,
} from "./types";

// ---------------------------------------------------------------------------
// Awwwards categories + weights (Req 13.2)
// ---------------------------------------------------------------------------

/** The four official Awwwards evaluation categories. */
export type AwwwardsCategory = "design" | "usability" | "creativity" | "content";

/**
 * The official Awwwards category weights: Design 40%, Usability 30%,
 * Creativity 20%, Content 10%. Sums to exactly 1.00.
 */
export const CATEGORY_WEIGHTS: Record<AwwwardsCategory, number> = {
    design: 0.4,
    usability: 0.3,
    creativity: 0.2,
    content: 0.1,
};

/** Which Awwwards category each scored dimension rolls up into. */
export const DIMENSION_CATEGORY: Record<Dimension, AwwwardsCategory> = {
    visual_design: "design",
    motion: "design",
    layout_responsive: "usability",
    performance: "usability",
    storytelling: "creativity",
    content_honesty: "content",
};

/**
 * Fixed dimension weights for the Overall_Score weighted mean. These sum to
 * exactly 1.00 and each Awwwards category subtotal equals its
 * `CATEGORY_WEIGHTS` entry:
 *   design     0.24 + 0.16 = 0.40
 *   usability  0.18 + 0.12 = 0.30
 *   creativity 0.20        = 0.20
 *   content    0.10        = 0.10
 * They must never be mutated. Keyed by every `Dimension`.
 */
export const WEIGHTS: Record<Dimension, number> = {
    visual_design: 0.24, // Design 0.40 = 0.24 + 0.16
    motion: 0.16,
    layout_responsive: 0.18, // Usability 0.30 = 0.18 + 0.12
    performance: 0.12,
    storytelling: 0.2, // Creativity 0.20
    content_honesty: 0.1, // Content 0.10
};

/** The per-dimension pass minimum applied to every required Scored_Dimension. */
export const PASS_DIMENSION_MIN = 8.0;

/**
 * The required dimensions for the Pass_Gate — all six weighted dimensions. A
 * required dimension must be scored and `>= PASS_DIMENSION_MIN` for APPROVED.
 */
export const REQUIRED_DIMENSIONS: Dimension[] = Object.keys(
    WEIGHTS,
) as Dimension[];

/** All four Awwwards categories, in canonical order. */
export const AWWWARDS_CATEGORIES: AwwwardsCategory[] = Object.keys(
    CATEGORY_WEIGHTS,
) as AwwwardsCategory[];

/** Floating-point tolerance for the weights-sum invariants. */
const WEIGHTS_SUM_EPSILON = 1e-9;

/** The maximum value any dimension score may take. */
const SCORE_MAX = 10.0;

/** The content-honesty ceiling forced when invented content is present. */
export const CONTENT_HONESTY_CAP = 5.0;

/**
 * Sum of the fixed dimension weights. Exposed so a unit test can assert the
 * `=== 1.0` invariant without re-deriving the arithmetic.
 */
export function weightsSum(): number {
    return REQUIRED_DIMENSIONS.reduce((total, d) => total + WEIGHTS[d], 0);
}

/**
 * Sum the sub-dimension weights that roll up into `category`. Exposed so a unit
 * test can assert each category subtotal equals its `CATEGORY_WEIGHTS` entry.
 */
export function categoryWeightSubtotal(category: AwwwardsCategory): number {
    return REQUIRED_DIMENSIONS.filter(
        (d) => DIMENSION_CATEGORY[d] === category,
    ).reduce((total, d) => total + WEIGHTS[d], 0);
}

/**
 * Assert the two weight invariants at module load:
 *   1. `WEIGHTS` sum to 1.0;
 *   2. every category subtotal drawn from `WEIGHTS` equals `CATEGORY_WEIGHTS`.
 * Throws a descriptive error otherwise so any accidental edit fails fast.
 */
export function assertWeightsSumToOne(): void {
    const sum = weightsSum();
    if (Math.abs(sum - 1.0) > WEIGHTS_SUM_EPSILON) {
        throw new Error(
            `Page Forge WEIGHTS must sum to 1.0 but sum to ${sum}. ` +
            "Adjust src/lib/page-forge/scoring.ts WEIGHTS.",
        );
    }

    const categorySum = AWWWARDS_CATEGORIES.reduce(
        (total, c) => total + CATEGORY_WEIGHTS[c],
        0,
    );
    if (Math.abs(categorySum - 1.0) > WEIGHTS_SUM_EPSILON) {
        throw new Error(
            `Page Forge CATEGORY_WEIGHTS must sum to 1.0 but sum to ${categorySum}. ` +
            "Adjust src/lib/page-forge/scoring.ts CATEGORY_WEIGHTS.",
        );
    }

    for (const category of AWWWARDS_CATEGORIES) {
        const subtotal = categoryWeightSubtotal(category);
        if (Math.abs(subtotal - CATEGORY_WEIGHTS[category]) > WEIGHTS_SUM_EPSILON) {
            throw new Error(
                `Page Forge category subtotal for "${category}" is ${subtotal} ` +
                `but CATEGORY_WEIGHTS says ${CATEGORY_WEIGHTS[category]}. ` +
                "Adjust src/lib/page-forge/scoring.ts WEIGHTS/DIMENSION_CATEGORY.",
            );
        }
    }
}

// Fail fast at import time if either weights invariant is ever broken.
assertWeightsSumToOne();

// ---------------------------------------------------------------------------
// Overall score (Req 13.2)
// ---------------------------------------------------------------------------

/**
 * Compute the Overall_Score as the fixed weighted mean over the *scored*
 * (non-null) dimensions.
 *
 * For every dimension `d` with a non-null score, the contribution is
 * `WEIGHTS[d] * score_d`; the sum of those contributions is divided by the sum
 * of the weights of the present dimensions. This keeps the result a true mean
 * on the 0..10 scale even when some dimensions are missing (checker failure,
 * Req 9.8). If no dimension is scored, the overall is 0.
 *
 * The result is rounded to one decimal to match the rubric's one-decimal scale.
 */
export function computeOverall(scores: DimensionScores): Score {
    let weightedSum = 0;
    let weightMass = 0;

    for (const d of REQUIRED_DIMENSIONS) {
        const value = scores[d];
        if (value === null || value === undefined) {
            continue;
        }
        weightedSum += WEIGHTS[d] * value;
        weightMass += WEIGHTS[d];
    }

    if (weightMass === 0) {
        return 0;
    }

    return roundToOneDecimal(weightedSum / weightMass);
}

// ---------------------------------------------------------------------------
// Category roll-up (Req 13.3)
// ---------------------------------------------------------------------------

/**
 * Roll the scored dimensions up into the four Awwwards category scores on a
 * 0..10 scale.
 *
 * For each category, the score is the weighted mean of its member dimensions
 * that are scored (non-null), using the member sub-weights normalized within
 * the category (`sum(WEIGHTS[d] * score_d) / sum(WEIGHTS[d])` over present
 * members). A category is `null` when all of its members are unscored. Each
 * present category score is rounded to one decimal.
 */
export function computeCategoryScores(
    scores: DimensionScores,
): Record<AwwwardsCategory, Score | null> {
    const result: Record<AwwwardsCategory, Score | null> = {
        design: null,
        usability: null,
        creativity: null,
        content: null,
    };

    for (const category of AWWWARDS_CATEGORIES) {
        let weightedSum = 0;
        let weightMass = 0;

        for (const d of REQUIRED_DIMENSIONS) {
            if (DIMENSION_CATEGORY[d] !== category) {
                continue;
            }
            const value = scores[d];
            if (value === null || value === undefined) {
                continue;
            }
            weightedSum += WEIGHTS[d] * value;
            weightMass += WEIGHTS[d];
        }

        result[category] =
            weightMass === 0 ? null : roundToOneDecimal(weightedSum / weightMass);
    }

    return result;
}

// ---------------------------------------------------------------------------
// Verdict gate (Req 13.4)
// ---------------------------------------------------------------------------

/**
 * Evaluate the Pass_Gate and produce a `Verdict`.
 *
 * The verdict is APPROVED iff all three conditions hold:
 * 1. `overall >= threshold`;
 * 2. every required dimension is scored and `>= PASS_DIMENSION_MIN` (a `null`
 *    required dimension fails this test — incomplete evidence never passes);
 * 3. there are no open P0 Findings.
 *
 * Otherwise the verdict is REJECTED. `failedDimensions` lists the *scored*
 * dimensions that fell below the pass minimum (null dimensions are excluded
 * from this list but still block APPROVED via condition 2).
 */
export function evaluateGate(
    scores: DimensionScores,
    findings: Finding[],
    threshold: number,
): Verdict {
    const overall = computeOverall(scores);

    const failedDimensions: Dimension[] = [];
    let everyRequiredSatisfied = true;

    for (const d of REQUIRED_DIMENSIONS) {
        const value = scores[d];
        if (value === null || value === undefined) {
            // Unscored required dimension: fails safe, does not pass the gate.
            everyRequiredSatisfied = false;
            continue;
        }
        if (value < PASS_DIMENSION_MIN) {
            failedDimensions.push(d);
            everyRequiredSatisfied = false;
        }
    }

    const openP0 = findings.filter((f) => f.severity === "P0" && f.open);

    const approved =
        overall >= threshold && everyRequiredSatisfied && openP0.length === 0;

    return {
        verdict: approved ? "APPROVED" : "REJECTED",
        overall,
        dimensions: scores,
        openP0,
        failedDimensions,
    };
}

// ---------------------------------------------------------------------------
// Finding merge + de-duplication (Req 13.6)
// ---------------------------------------------------------------------------

/** Severity rank for ordering by user impact: lower sorts first. */
const SEVERITY_RANK: Record<Severity, number> = { P0: 0, P1: 1, P2: 2 };

/**
 * Build the content-based de-duplication key for a Finding:
 * `dimension|message|file|location`. Used as the fallback duplicate test when
 * two Findings from different checkers describe the same issue with colliding
 * or non-unique ids.
 */
function findingContentKey(finding: Finding): string {
    return [
        finding.dimension,
        finding.message,
        finding.file ?? "",
        finding.location ?? "",
    ].join("|");
}

/**
 * Merge the P0 and P1 Findings across all checker reports, de-duplicate them,
 * and order them by user impact.
 *
 * De-duplication is by `id` first; a Finding whose `id` was already seen is
 * dropped. As a fallback for ids that collide or are not unique across
 * checkers, a Finding whose content key (`dimension+message+file+location`) was
 * already seen is also dropped, so the same issue reported by two checkers with
 * different ids collapses to one Finding.
 *
 * Ordering is by user impact: severity rank first (every P0 precedes every P1),
 * then by dimension weight descending (heavier-weighted dimensions surface
 * earlier), then by insertion order as a stable tie-break. P2 Findings are
 * excluded here (they are surfaced separately via {@link openP2} for the ship
 * report, per Req 13.6).
 */
export function mergeFindings(reports: CheckerReport[]): Finding[] {
    const seenIds = new Set<string>();
    const seenContentKeys = new Set<string>();
    const merged: Finding[] = [];

    for (const report of reports) {
        for (const finding of report.findings) {
            if (finding.severity !== "P0" && finding.severity !== "P1") {
                continue;
            }
            const contentKey = findingContentKey(finding);
            if (seenIds.has(finding.id) || seenContentKeys.has(contentKey)) {
                continue;
            }
            seenIds.add(finding.id);
            seenContentKeys.add(contentKey);
            merged.push(finding);
        }
    }

    // Stable sort: severity, then dimension weight desc, then insertion order.
    return merged
        .map((finding, index) => ({ finding, index }))
        .sort((a, b) => {
            const rank =
                SEVERITY_RANK[a.finding.severity] -
                SEVERITY_RANK[b.finding.severity];
            if (rank !== 0) {
                return rank;
            }
            const weightDelta =
                WEIGHTS[b.finding.dimension] - WEIGHTS[a.finding.dimension];
            if (weightDelta !== 0) {
                return weightDelta;
            }
            return a.index - b.index;
        })
        .map((entry) => entry.finding);
}

// ---------------------------------------------------------------------------
// Content-honesty cap (Req 13.9)
// ---------------------------------------------------------------------------

/** Keywords that mark a Finding as describing invented/fabricated content. */
const INVENTED_CONTENT_KEYWORDS = [
    "invent",
    "fabricat",
    "fake",
    "made up",
    "made-up",
    "unverified metric",
    "placeholder metric",
    "logo",
    "testimonial",
];

/**
 * Detect whether a Finding describes invented content — a fabricated metric,
 * logo, or testimonial (Req 13.9). A Finding qualifies when it is on the
 * `content_honesty` dimension and its message mentions an invented-content
 * keyword. Exported so callers and tests share one definition.
 */
export function isInventedContentFinding(finding: Finding): boolean {
    if (finding.dimension !== "content_honesty") {
        return false;
    }
    const message = finding.message.toLowerCase();
    return INVENTED_CONTENT_KEYWORDS.some((kw) => message.includes(kw));
}

/**
 * Apply the content-honesty cap. When any invented-content Finding is present,
 * the `content_honesty` dimension is capped at {@link CONTENT_HONESTY_CAP} and
 * an open P0 Finding is guaranteed to exist for it (Req 13.9).
 *
 * Pure: returns freshly adjusted `scores` and `findings` without mutating the
 * inputs. When no invented content is present the inputs are returned copied
 * but unchanged.
 */
export function applyContentHonestyCap(
    scores: DimensionScores,
    findings: Finding[],
): { scores: DimensionScores; findings: Finding[] } {
    const inventedFindings = findings.filter(isInventedContentFinding);
    if (inventedFindings.length === 0) {
        return { scores: { ...scores }, findings: [...findings] };
    }

    // Cap content_honesty at the ceiling; only ever lower, never raise.
    const current = scores.content_honesty;
    const capped: DimensionScores = { ...scores };
    capped.content_honesty =
        current === null || current === undefined
            ? CONTENT_HONESTY_CAP
            : Math.min(current, CONTENT_HONESTY_CAP);

    // Ensure at least one open P0 content-honesty Finding is recorded.
    const adjustedFindings: Finding[] = [...findings];
    const hasOpenP0 = inventedFindings.some(
        (f) => f.severity === "P0" && f.open,
    );
    if (!hasOpenP0) {
        adjustedFindings.push(makeInventedContentP0(inventedFindings[0]));
    }

    return { scores: capped, findings: adjustedFindings };
}

/** Build the forced open P0 Finding for invented content. */
function makeInventedContentP0(source: Finding): Finding {
    return {
        id: `content-honesty-p0:${source.id}`,
        severity: "P0",
        dimension: "content_honesty",
        message: `Invented content must be removed or verified: ${source.message}`,
        file: source.file,
        location: source.location,
        open: true,
    };
}

// ---------------------------------------------------------------------------
// Never-inflate rule (Req 13.8)
// ---------------------------------------------------------------------------

/**
 * Clamp a Review score against the checker score under the never-inflate rule
 * (Req 13.8). Returns `min(priorScore, checkerScore)` unless a previously
 * depressing Finding was closed since the prior score, in which case the
 * checker score may stand.
 *
 * - The Review Agent may always *lower* a score (weak evidence).
 * - It may only *raise* a score above the prior recorded score when a
 *   previously depressing Finding has been closed
 *   (`closedFindingSincePrior === true`).
 * - Without a newly-closed Finding the reconciled score is clamped to at most
 *   the prior score, so scores are never inflated on weak evidence.
 *
 * The reconciled score never exceeds the checker score and stays within 0..10.
 *
 * @param checkerScore            The score reported by the checker this round.
 * @param priorScore             The previously recorded Review score, or null.
 * @param closedFindingSincePrior Whether a previously depressing Finding was
 *                                closed since the prior score.
 */
export function clampReviewScore(
    checkerScore: Score,
    priorScore: Score | null,
    closedFindingSincePrior: boolean,
): Score {
    const bounded = clampScore(checkerScore);

    if (priorScore === null || priorScore === undefined) {
        // No prior score to inflate beyond; take the checker score as-is.
        return bounded;
    }

    const priorBounded = clampScore(priorScore);

    if (closedFindingSincePrior) {
        // Evidence improved: a raise up to the checker score is permitted.
        return bounded;
    }

    // No new evidence: never raise above the prior score.
    return Math.min(bounded, priorBounded);
}

// ---------------------------------------------------------------------------
// Ship-report P2 selection (Req 15.3)
// ---------------------------------------------------------------------------

/**
 * Select the open P2 Findings for the ship report's optional-polish list
 * (Req 15.3). Closed Findings and non-P2 severities are excluded. Input order
 * is preserved.
 */
export function openP2(findings: Finding[]): Finding[] {
    return findings.filter((f) => f.severity === "P2" && f.open);
}

// ---------------------------------------------------------------------------
// Evidence-backing invariant (Req 11.3)
// ---------------------------------------------------------------------------

/**
 * Decide whether a checker report's recorded scores are backed by evidence
 * (Req 11.3). A checker that records any non-null dimension score must cite at
 * least one {@link EvidenceRef} — a file path, a breakpoint, an observed
 * behavior, or a measurement — for that report.
 *
 * Returns true iff, for every non-null dimension score in `report.scores`,
 * there is at least one `EvidenceRef` in `report.evidence`. When no dimension
 * is scored (every entry null/absent) the report cites nothing and the
 * invariant holds vacuously. Pure: reads only its argument, mutates nothing.
 */
export function scoresCiteEvidence(report: CheckerReport): boolean {
    const scoredDimensions = Object.values(report.scores).filter(
        (value): value is Score => value !== null && value !== undefined,
    );

    if (scoredDimensions.length === 0) {
        // Nothing scored: no evidence is required.
        return true;
    }

    const evidence: EvidenceRef[] = report.evidence ?? [];
    return evidence.length >= 1;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Round a score to one decimal place using deterministic round-half-up.
 *
 * A relative epsilon nudge absorbs IEEE-754 accumulation error so a
 * mathematically exact half-boundary (e.g. 1.25) always rounds up (1.3)
 * regardless of the order the weighted sum was accumulated in. Without this,
 * `1.25 * 10` can evaluate to `12.499999999999998` and round down to 1.2.
 * Negative-zero output is normalized to 0.
 */
function roundToOneDecimal(value: number): Score {
    // Two-stage snap: first round away sub-1e-9 accumulation noise so the value
    // sits on its intended decimal, then round to one decimal. This makes the
    // result independent of the order the weighted sum was accumulated in — an
    // exact half-step (e.g. 3.35) rounds half-up (3.4) rather than tipping down
    // because `3.35 * 10 === 33.49999999999999` in IEEE-754.
    const snapped = Math.round(value * 1e9) / 1e9;
    const rounded = Math.round(snapped * 10) / 10;
    return rounded === 0 ? 0 : rounded;
}

/** Clamp a score into the valid 0..10 range. */
function clampScore(value: Score): Score {
    if (value < 0) {
        return 0;
    }
    if (value > SCORE_MAX) {
        return SCORE_MAX;
    }
    return value;
}
