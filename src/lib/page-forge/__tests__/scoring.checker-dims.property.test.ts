// Feature: page-forge-agent-system, Property 21: Checkers score only their assigned dimensions within range
import { describe, it, expect } from "vitest";
import fc from "fast-check";
import type {
    CheckerReport,
    Dimension,
    Score,
} from "../types";

/**
 * Property 21 — Checkers score only their assigned dimensions within range.
 *
 * Property statement: For any CheckerReport, the set of dimensions the report
 * scores is a subset of the dimensions assigned to that checker, and every
 * score it records lies in [0, 10]. Per the design's checker → dimension
 * mapping:
 *   - design-checker      → visual_design, storytelling, motion
 *   - responsive-checker  → layout_responsive
 *   - performance-checker → performance
 * Any dimension outside the checker's assignment, or any score outside
 * [0, 10], violates the invariant.
 *
 * The checker → dimension assignment is a spec rule (Req 9.4), so it is
 * encoded here as the executable spec: `CHECKER_DIMENSIONS` plus the validator
 * `checkerScoresValid`. `scoring.ts` does not export a helper for this, so the
 * validator is defined in the test. We generate arbitrary CheckerReports — both
 * obeying and violating the subset+range rule — and assert that
 * `checkerScoresValid` returns true iff the report obeys the rule.
 *
 * Validates: Requirements 9.4, 12.7
 */

/** Every scored dimension in the rubric. */
const ALL_DIMENSIONS: Dimension[] = [
    "visual_design",
    "storytelling",
    "motion",
    "layout_responsive",
    "performance",
    "content_honesty",
];

/** The three checker agents. */
type CheckerAgent = CheckerReport["agent"];

/**
 * The spec mapping of each checker agent to the dimensions it is permitted to
 * score (Req 9.4). Encoded here as the executable spec.
 */
const CHECKER_DIMENSIONS: Record<CheckerAgent, Dimension[]> = {
    "design-checker": ["visual_design", "storytelling", "motion"],
    "responsive-checker": ["layout_responsive"],
    "performance-checker": ["performance"],
};

const CHECKER_AGENTS: CheckerAgent[] = [
    "design-checker",
    "responsive-checker",
    "performance-checker",
];

/** The minimum/maximum any recorded score may take. */
const SCORE_MIN = 0;
const SCORE_MAX = 10;

/**
 * The invariant checkers must uphold (Req 9.4, 12.7): the set of scored
 * dimensions is a subset of the checker's assignment, and every non-null score
 * lies in [0, 10]. A `null` score marks an unscored dimension (checker failure,
 * Req 9.8) and is not range-checked. Returns true iff the report obeys the
 * subset + range rule.
 */
function checkerScoresValid(report: CheckerReport): boolean {
    const assigned = CHECKER_DIMENSIONS[report.agent];
    const assignedSet = new Set<Dimension>(assigned);

    for (const key of Object.keys(report.scores)) {
        const dim = key as Dimension;

        // Subset rule: no dimension outside the checker's assignment.
        if (!assignedSet.has(dim)) {
            return false;
        }

        // Range rule: every recorded (non-null) score lies in [0, 10].
        const value = report.scores[dim];
        if (value === null || value === undefined) {
            continue;
        }
        if (Number.isNaN(value) || value < SCORE_MIN || value > SCORE_MAX) {
            return false;
        }
    }

    return true;
}

describe("scoring — checkers score only assigned dimensions within range (Property 21)", () => {
    const agentArb = fc.constantFrom<CheckerAgent>(...CHECKER_AGENTS);

    // An in-range score value, biased around the 0 and 10 boundaries, or null.
    const validScoreArb: fc.Arbitrary<Score | null> = fc.oneof(
        fc.double({ min: 0, max: 10, noNaN: true }),
        fc.constantFrom<Score>(0, 10, 8, 5.5),
        fc.constant(null),
    );

    // An out-of-range score value (below 0, above 10, or NaN).
    const outOfRangeScoreArb: fc.Arbitrary<Score> = fc.oneof(
        fc.double({ min: -1000, max: -0.0001, noNaN: true }),
        fc.double({ min: 10.0001, max: 1000, noNaN: true }),
        fc.constantFrom<Score>(-1, 10.5, 11, -0.5, Number.NaN),
    );

    const dimensionArb = fc.constantFrom<Dimension>(...ALL_DIMENSIONS);

    /**
     * Build a scores record from a set of [dimension, value] entries. Later
     * entries win for duplicate dimensions.
     */
    const scoresFromEntries = (
        entries: [Dimension, Score | null][],
    ): CheckerReport["scores"] => {
        const scores: CheckerReport["scores"] = {};
        for (const [dim, value] of entries) {
            scores[dim] = value;
        }
        return scores;
    };

    // A fully arbitrary scores record: any dimensions (assigned or not), any
    // values (in-range, out-of-range, or null). This covers both valid and
    // invalid reports so the iff holds across the whole input space.
    const arbitraryScoresArb: fc.Arbitrary<CheckerReport["scores"]> = fc
        .array(
            fc.tuple(
                dimensionArb,
                fc.oneof(validScoreArb, outOfRangeScoreArb),
            ),
            { maxLength: 6 },
        )
        .map(scoresFromEntries);

    const reportArb: fc.Arbitrary<CheckerReport> = fc
        .tuple(agentArb, arbitraryScoresArb)
        .map(([agent, scores]) => ({
            agent,
            scores,
            findings: [],
            evidence: [],
        }));

    // Independent recomputation of the subset + range rule (mirrors Req 9.4).
    const obeysRule = (report: CheckerReport): boolean => {
        const assigned = new Set<Dimension>(CHECKER_DIMENSIONS[report.agent]);
        return Object.keys(report.scores).every((key) => {
            const dim = key as Dimension;
            if (!assigned.has(dim)) {
                return false;
            }
            const value = report.scores[dim];
            if (value === null || value === undefined) {
                return true;
            }
            return (
                !Number.isNaN(value) &&
                value >= SCORE_MIN &&
                value <= SCORE_MAX
            );
        });
    };

    it("returns true iff the report obeys the subset + range rule", () => {
        fc.assert(
            fc.property(reportArb, (report) => {
                expect(checkerScoresValid(report)).toBe(obeysRule(report));
            }),
            { numRuns: 300 },
        );
    });

    it("accepts reports that score only assigned dimensions within [0, 10]", () => {
        // Generate reports guaranteed to obey the rule: only assigned
        // dimensions, only in-range (or null) values.
        const validReportArb: fc.Arbitrary<CheckerReport> = agentArb.chain(
            (agent) => {
                const assigned = CHECKER_DIMENSIONS[agent];
                return fc
                    .array(
                        fc.tuple(
                            fc.constantFrom<Dimension>(...assigned),
                            validScoreArb,
                        ),
                        { maxLength: assigned.length + 2 },
                    )
                    .map((entries) => ({
                        agent,
                        scores: scoresFromEntries(entries),
                        findings: [],
                        evidence: [],
                    }));
            },
        );

        fc.assert(
            fc.property(validReportArb, (report) => {
                expect(checkerScoresValid(report)).toBe(true);
            }),
            { numRuns: 200 },
        );
    });

    it("rejects reports that score an unassigned dimension", () => {
        // Pick an agent and a dimension NOT in its assignment; assert invalid.
        const invalidDimReportArb = agentArb.chain((agent) => {
            const assigned = new Set<Dimension>(CHECKER_DIMENSIONS[agent]);
            const unassigned = ALL_DIMENSIONS.filter((d) => !assigned.has(d));
            return fc
                .tuple(
                    fc.constantFrom<Dimension>(...unassigned),
                    validScoreArb,
                )
                .map(([dim, value]) => ({
                    agent,
                    scores: scoresFromEntries([[dim, value]]),
                    findings: [],
                    evidence: [],
                }));
        });

        fc.assert(
            fc.property(invalidDimReportArb, (report) => {
                expect(checkerScoresValid(report)).toBe(false);
            }),
            { numRuns: 200 },
        );
    });

    it("rejects reports with an out-of-range score on an assigned dimension", () => {
        const outOfRangeReportArb = agentArb.chain((agent) => {
            const assigned = CHECKER_DIMENSIONS[agent];
            return fc
                .tuple(
                    fc.constantFrom<Dimension>(...assigned),
                    outOfRangeScoreArb,
                )
                .map(([dim, value]) => ({
                    agent,
                    scores: scoresFromEntries([[dim, value]]),
                    findings: [],
                    evidence: [],
                }));
        });

        fc.assert(
            fc.property(outOfRangeReportArb, (report) => {
                expect(checkerScoresValid(report)).toBe(false);
            }),
            { numRuns: 200 },
        );
    });
});
