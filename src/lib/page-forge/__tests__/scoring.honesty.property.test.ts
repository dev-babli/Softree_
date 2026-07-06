// Feature: page-forge-agent-system, Property 42: Invented content caps honesty and forces a P0
import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
    applyContentHonestyCap,
    isInventedContentFinding,
    CONTENT_HONESTY_CAP,
    REQUIRED_DIMENSIONS,
} from "../scoring";
import type { Dimension, DimensionScores, Finding, Severity } from "../types";

/**
 * Property 42 — Invented content caps honesty and forces a P0.
 *
 * Property statement: For any DimensionScores and any set of Findings,
 * `applyContentHonestyCap`:
 *   - when at least one invented-content Finding is present (as classified by
 *     `isInventedContentFinding`), returns scores with `content_honesty` <=
 *     CONTENT_HONESTY_CAP (5) AND findings containing an open P0 on the
 *     `content_honesty` dimension;
 *   - when no invented-content Finding is present, leaves `content_honesty`
 *     unchanged and adds no forced P0.
 *
 * `isInventedContentFinding` is used to model the expectation so the test and
 * implementation share a single definition of "invented content".
 *
 * Validates: Requirements 13.8, 17.6
 */
describe("scoring — invented content caps honesty and forces a P0 (Property 42)", () => {
    const SEVERITIES: Severity[] = ["P0", "P1", "P2"];
    const dimensionArb = fc.constantFrom<Dimension>(...REQUIRED_DIMENSIONS);

    // Keywords that mark a Finding as describing invented content (mirrors the
    // implementation's keyword list closely enough to reliably generate
    // positive cases; the actual expectation is anchored on
    // isInventedContentFinding, never on this list).
    const INVENTED_KEYWORDS = [
        "invented",
        "fabricated",
        "fake",
        "logo",
        "testimonial",
        "made up",
    ];

    // A finding that IS invented-content: content_honesty dimension + a message
    // embedding an invented-content keyword.
    const inventedFindingArb: fc.Arbitrary<Finding> = fc.record({
        id: fc.string({ minLength: 1, maxLength: 12 }),
        severity: fc.constantFrom<Severity>(...SEVERITIES),
        dimension: fc.constant<Dimension>("content_honesty"),
        message: fc
            .tuple(
                fc.string({ maxLength: 10 }),
                fc.constantFrom(...INVENTED_KEYWORDS),
                fc.string({ maxLength: 10 }),
            )
            .map(([pre, kw, post]) => `${pre} ${kw} ${post}`),
        open: fc.boolean(),
    });

    // A generic finding (may or may not be invented-content by chance, but its
    // message is not seeded with a keyword and its dimension is arbitrary).
    const genericFindingArb: fc.Arbitrary<Finding> = fc.record({
        id: fc.string({ minLength: 1, maxLength: 12 }),
        severity: fc.constantFrom<Severity>(...SEVERITIES),
        dimension: dimensionArb,
        message: fc.string({ maxLength: 20 }),
        open: fc.boolean(),
    });

    const findingArb = fc.oneof(
        { weight: 1, arbitrary: inventedFindingArb },
        { weight: 2, arbitrary: genericFindingArb },
    );

    const findingsArb = fc.array(findingArb, { maxLength: 10 });

    const scoreValueArb = fc.oneof(
        fc.double({ min: 0, max: 10, noNaN: true }),
        fc.constant(null),
    );

    const scoresArb: fc.Arbitrary<DimensionScores> = fc
        .tuple(...REQUIRED_DIMENSIONS.map(() => scoreValueArb))
        .map((values) => {
            const scores: DimensionScores = {};
            REQUIRED_DIMENSIONS.forEach((dim, i) => {
                scores[dim] = values[i];
            });
            return scores;
        });

    it("caps honesty and forces an open P0 exactly when invented content is present", () => {
        fc.assert(
            fc.property(scoresArb, findingsArb, (scores, findings) => {
                const originalHonesty = scores.content_honesty;
                const result = applyContentHonestyCap(scores, findings);

                // Purity: the inputs must not be mutated.
                expect(scores.content_honesty).toBe(originalHonesty);

                const hasInvented = findings.some(isInventedContentFinding);

                if (hasInvented) {
                    // content_honesty must be capped at the ceiling.
                    const capped = result.scores.content_honesty;
                    expect(capped).not.toBeNull();
                    expect(capped as number).toBeLessThanOrEqual(
                        CONTENT_HONESTY_CAP,
                    );

                    // When there was a prior numeric score below the cap, it is
                    // never raised by the cap.
                    if (
                        originalHonesty !== null &&
                        originalHonesty !== undefined &&
                        originalHonesty < CONTENT_HONESTY_CAP
                    ) {
                        expect(capped as number).toBeLessThanOrEqual(
                            originalHonesty,
                        );
                    }

                    // An open P0 on content_honesty must be guaranteed.
                    const openP0OnHonesty = result.findings.some(
                        (f) =>
                            f.severity === "P0" &&
                            f.open &&
                            f.dimension === "content_honesty",
                    );
                    expect(openP0OnHonesty).toBe(true);
                } else {
                    // content_honesty is unchanged.
                    expect(result.scores.content_honesty).toBe(originalHonesty);

                    // No forced P0 is added: findings are preserved as-is.
                    expect(result.findings).toEqual(findings);
                }
            }),
            { numRuns: 200 },
        );
    });
});
