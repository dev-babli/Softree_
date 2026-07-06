// Feature: page-forge-agent-system, Property 39: Verdict gate is exact
import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
    evaluateGate,
    computeOverall,
    REQUIRED_DIMENSIONS,
    PASS_DIMENSION_MIN,
} from "../scoring";
import type { Dimension, DimensionScores, Finding, Severity } from "../types";

/**
 * Property 39 — Verdict gate is exact.
 *
 * Property statement: For any DimensionScores (each of the six dimensions
 * scored in [0, 10] or null), any set of Findings (each with a severity of
 * P0/P1/P2 and an open flag), and any threshold in [0, 10], `evaluateGate`
 * returns APPROVED iff ALL of the following hold, and REJECTED otherwise:
 *   1. overall (the fixed weighted mean) >= threshold;
 *   2. every required dimension is scored and >= 8.0 (a null required
 *      dimension always fails this condition and blocks APPROVED);
 *   3. no open P0 Finding exists.
 * The verdict is always exactly one of "APPROVED" or "REJECTED".
 *
 * Validates: Requirements 13.3, 13.4
 */
describe("scoring — verdict gate is exact (Property 39)", () => {
    const SEVERITIES: Severity[] = ["P0", "P1", "P2"];

    // A single dimension score: either a number in [0, 10] or null. Bias the
    // number generator around the 8.0 pass boundary so the gate's dimension
    // condition is exercised on both sides frequently.
    const scoreValueArb = fc.oneof(
        fc.double({ min: 0, max: 10, noNaN: true }),
        // Extra weight near the 8.0 boundary.
        fc.double({ min: 7.5, max: 8.5, noNaN: true }),
        fc.constantFrom(0, 8, 8.0, 7.9, 10, PASS_DIMENSION_MIN),
    );

    const dimensionScoreArb: fc.Arbitrary<number | null> = fc.oneof(
        scoreValueArb,
        fc.constant(null),
    );

    // A full DimensionScores record keyed by every required dimension.
    const scoresArb: fc.Arbitrary<DimensionScores> = fc
        .tuple(...REQUIRED_DIMENSIONS.map(() => dimensionScoreArb))
        .map((values) => {
            const scores: DimensionScores = {};
            REQUIRED_DIMENSIONS.forEach((dim, i) => {
                scores[dim] = values[i];
            });
            return scores;
        });

    const dimensionArb = fc.constantFrom<Dimension>(...REQUIRED_DIMENSIONS);

    const findingArb: fc.Arbitrary<Finding> = fc.record({
        id: fc.string({ minLength: 1, maxLength: 12 }),
        severity: fc.constantFrom<Severity>(...SEVERITIES),
        dimension: dimensionArb,
        message: fc.string({ maxLength: 20 }),
        open: fc.boolean(),
    });

    const findingsArb = fc.array(findingArb, { maxLength: 8 });

    const thresholdArb = fc.oneof(
        fc.double({ min: 0, max: 10, noNaN: true }),
        fc.constantFrom(0, 8, 8.5, 10),
    );

    // Independent recomputation of the expected verdict, mirroring Req 13.4.
    const expectedApproved = (
        scores: DimensionScores,
        findings: Finding[],
        threshold: number,
    ): boolean => {
        const overall = computeOverall(scores);

        const allRequiredScoredAndGe8 = REQUIRED_DIMENSIONS.every((dim) => {
            const value = scores[dim];
            return (
                value !== null &&
                value !== undefined &&
                value >= PASS_DIMENSION_MIN
            );
        });

        const noOpenP0 = !findings.some((f) => f.severity === "P0" && f.open);

        return overall >= threshold && allRequiredScoredAndGe8 && noOpenP0;
    };

    it("matches the independently recomputed verdict for any inputs", () => {
        fc.assert(
            fc.property(
                scoresArb,
                findingsArb,
                thresholdArb,
                (scores, findings, threshold) => {
                    const verdict = evaluateGate(scores, findings, threshold);

                    // The verdict is always exactly APPROVED or REJECTED.
                    expect(["APPROVED", "REJECTED"]).toContain(verdict.verdict);

                    const expected = expectedApproved(scores, findings, threshold)
                        ? "APPROVED"
                        : "REJECTED";
                    expect(verdict.verdict).toBe(expected);
                },
            ),
            { numRuns: 300 },
        );
    });

    it("a null required dimension always blocks APPROVED", () => {
        fc.assert(
            fc.property(
                scoresArb,
                findingsArb,
                thresholdArb,
                dimensionArb,
                (scores, findings, threshold, nulledDim) => {
                    // Force one required dimension to be unscored.
                    const withNull: DimensionScores = { ...scores, [nulledDim]: null };
                    const verdict = evaluateGate(withNull, findings, threshold);
                    expect(verdict.verdict).toBe("REJECTED");
                },
            ),
            { numRuns: 200 },
        );
    });

    it("an open P0 always blocks APPROVED", () => {
        fc.assert(
            fc.property(
                scoresArb,
                findingsArb,
                thresholdArb,
                dimensionArb,
                (scores, findings, threshold, p0Dim) => {
                    // Inject a guaranteed open P0 Finding.
                    const openP0: Finding = {
                        id: "forced-open-p0",
                        severity: "P0",
                        dimension: p0Dim,
                        message: "forced open p0",
                        open: true,
                    };
                    const verdict = evaluateGate(
                        scores,
                        [...findings, openP0],
                        threshold,
                    );
                    expect(verdict.verdict).toBe("REJECTED");
                },
            ),
            { numRuns: 200 },
        );
    });
});
