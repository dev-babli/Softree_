// Feature: page-forge-agent-system, Property 38: Overall score is the fixed weighted mean
import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
    computeOverall,
    weightsSum,
    categoryWeightSubtotal,
    WEIGHTS,
    CATEGORY_WEIGHTS,
    DIMENSION_CATEGORY,
    REQUIRED_DIMENSIONS,
} from "../scoring";
import type { Dimension, DimensionScores } from "../types";

/**
 * Property 38 — Overall score is the fixed weighted mean.
 *
 * Property statement: For any full set of DimensionScores (all six dimensions
 * present, each in 0..10), `computeOverall` equals the fixed weighted mean
 * `sum(WEIGHTS[d] * score_d)` rounded to one decimal. Because the full weight
 * mass equals 1.0, no normalization changes the value: the weighted sum over
 * all present dimensions is already divided by 1.0.
 *
 * The fixed AWWWARDS weights are an invariant of the model: they sum to exactly
 * 1.0 and each Awwwards category subtotal equals its CATEGORY_WEIGHTS entry
 * (design 0.40, usability 0.30, creativity 0.20, content 0.10).
 *
 * Validates: Requirements 13.2, 13.3
 */
describe("scoring — overall score is the fixed weighted mean (Property 38)", () => {
    /**
     * Reference implementation of the one-decimal rounding used by scoring.ts.
     * Uses the same relative-epsilon nudge so an exact half-step (e.g. 6.65)
     * rounds half-up (6.7) deterministically instead of tipping down due to
     * IEEE-754 representation error (6.65 * 10 === 66.49999999999999).
     */
    const roundToOneDecimal = (value: number): number => {
        const snapped = Math.round(value * 1e9) / 1e9;
        const rounded = Math.round(snapped * 10) / 10;
        return rounded === 0 ? 0 : rounded;
    };

    /** A score in 0..10 to one decimal, spanning the whole valid range. */
    const scoreArb = fc
        .integer({ min: 0, max: 100 })
        .map((tenths) => tenths / 10);

    /** A full DimensionScores record with every dimension present (non-null). */
    const fullScoresArb: fc.Arbitrary<DimensionScores> = fc
        .tuple(
            scoreArb,
            scoreArb,
            scoreArb,
            scoreArb,
            scoreArb,
            scoreArb,
        )
        .map(([a, b, c, d, e, f]) => ({
            visual_design: a,
            motion: b,
            layout_responsive: c,
            performance: d,
            storytelling: e,
            content_honesty: f,
        }));

    it("equals sum(WEIGHTS[d] * score_d) rounded to one decimal for full scores", () => {
        fc.assert(
            fc.property(fullScoresArb, (scores) => {
                const expectedRaw = REQUIRED_DIMENSIONS.reduce(
                    (total, d: Dimension) => total + WEIGHTS[d] * (scores[d] as number),
                    0,
                );
                const expected = roundToOneDecimal(expectedRaw);

                const actual = computeOverall(scores);

                // The result must be exactly the one-decimal weighted mean.
                expect(actual).toBe(expected);
                // And it must stay within one rounding step of the raw mean.
                // Rounding to one decimal is at most exactly 0.05 from the raw
                // value; a small epsilon absorbs IEEE-754 representation error
                // at that exact half-step boundary.
                expect(Math.abs(actual - expectedRaw)).toBeLessThanOrEqual(0.05 + 1e-9);
                // Overall stays on the 0..10 scale.
                expect(actual).toBeGreaterThanOrEqual(0);
                expect(actual).toBeLessThanOrEqual(10);
            }),
            { numRuns: 300 },
        );
    });

    it("invariant: the fixed dimension weights sum to exactly 1.0", () => {
        expect(weightsSum()).toBeCloseTo(1.0, 9);
    });

    it("invariant: each category subtotal equals its CATEGORY_WEIGHTS entry", () => {
        expect(categoryWeightSubtotal("design")).toBeCloseTo(0.4, 9);
        expect(categoryWeightSubtotal("usability")).toBeCloseTo(0.3, 9);
        expect(categoryWeightSubtotal("creativity")).toBeCloseTo(0.2, 9);
        expect(categoryWeightSubtotal("content")).toBeCloseTo(0.1, 9);

        // Cross-check the subtotals against the declared category weights.
        for (const category of Object.keys(CATEGORY_WEIGHTS) as Array<
            keyof typeof CATEGORY_WEIGHTS
        >) {
            expect(categoryWeightSubtotal(category)).toBeCloseTo(
                CATEGORY_WEIGHTS[category],
                9,
            );
        }
    });

    it("invariant: every dimension maps to a category and full mass is 1.0", () => {
        // Each dimension rolls up into exactly one category, and the sum of all
        // category weights (which equals the full weight mass) is 1.0.
        for (const d of REQUIRED_DIMENSIONS) {
            expect(CATEGORY_WEIGHTS[DIMENSION_CATEGORY[d]]).toBeGreaterThan(0);
        }
        const totalCategoryWeight = Object.values(CATEGORY_WEIGHTS).reduce(
            (a, b) => a + b,
            0,
        );
        expect(totalCategoryWeight).toBeCloseTo(1.0, 9);
    });
});
