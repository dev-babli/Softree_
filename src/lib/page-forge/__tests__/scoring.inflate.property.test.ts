// Feature: page-forge-agent-system, Property 41: Review scores are never inflated without new evidence
import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { clampReviewScore } from "../scoring";

/**
 * Property 41 — Review scores are never inflated without new evidence.
 *
 * Property statement: For any checker score (0..10), prior score (0..10 or
 * null), and closed-finding flag, the reconciled Review score
 * (`clampReviewScore`):
 *  - is always within [0, 10];
 *  - never exceeds the (bounded) checker score;
 *  - when a prior score exists and no depressing Finding was closed since that
 *    prior score, never exceeds the prior score (no inflation on weak evidence);
 *  - when a depressing Finding was closed since the prior score, may rise up to
 *    the (bounded) checker score.
 *
 * Validates: Requirements 13.7
 */
describe("scoring — never inflate review scores without new evidence (Property 41)", () => {
    const SCORE_MIN = 0;
    const SCORE_MAX = 10;

    // Scores in the valid 0..10 range, exercising boundaries and one-decimal values.
    const scoreArb = fc.oneof(
        fc.double({ min: 0, max: 10, noNaN: true }),
        fc.constantFrom(0, 2.5, 5, 7.9, 8, 8.5, 10),
    );

    // Prior score: a valid score or null (no prior recorded).
    const priorArb = fc.oneof(scoreArb, fc.constant(null));

    const closedArb = fc.boolean();

    it("result is always within [0, 10] and never exceeds the bounded checker score", () => {
        fc.assert(
            fc.property(scoreArb, priorArb, closedArb, (checker, prior, closed) => {
                const result = clampReviewScore(checker, prior, closed);
                const boundedChecker = Math.min(Math.max(checker, SCORE_MIN), SCORE_MAX);

                expect(result).toBeGreaterThanOrEqual(SCORE_MIN);
                expect(result).toBeLessThanOrEqual(SCORE_MAX);
                expect(result).toBeLessThanOrEqual(boundedChecker);
            }),
            { numRuns: 300 },
        );
    });

    it("never raises above the prior score when no finding was closed", () => {
        fc.assert(
            fc.property(scoreArb, scoreArb, (checker, prior) => {
                const result = clampReviewScore(checker, prior, false);
                const boundedPrior = Math.min(Math.max(prior, SCORE_MIN), SCORE_MAX);

                // Without new evidence the reconciled score is clamped to the prior.
                expect(result).toBeLessThanOrEqual(boundedPrior);
            }),
            { numRuns: 300 },
        );
    });

    it("with no prior score, takes the bounded checker score as-is", () => {
        fc.assert(
            fc.property(scoreArb, closedArb, (checker, closed) => {
                const result = clampReviewScore(checker, null, closed);
                const boundedChecker = Math.min(Math.max(checker, SCORE_MIN), SCORE_MAX);

                expect(result).toBe(boundedChecker);
            }),
            { numRuns: 300 },
        );
    });

    it("with a closed finding, may equal the bounded checker score", () => {
        fc.assert(
            fc.property(scoreArb, scoreArb, (checker, prior) => {
                const result = clampReviewScore(checker, prior, true);
                const boundedChecker = Math.min(Math.max(checker, SCORE_MIN), SCORE_MAX);

                // New evidence permits a raise up to the checker score.
                expect(result).toBe(boundedChecker);
            }),
            { numRuns: 300 },
        );
    });
});
