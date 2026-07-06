// Feature: page-forge-agent-system, Property 40: Finding merge de-duplicates and preserves uniques
import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { mergeFindings } from "../scoring";
import type { CheckerReport, Dimension, Finding, Severity } from "../types";

/**
 * Property 40 — Finding merge de-duplicates and preserves uniques.
 *
 * Property statement: For any collection of checker Findings, the merged P0/P1
 * list contains every unique Finding exactly once, contains no Finding absent
 * from the inputs, and is ordered by user impact (all P0 before all P1).
 *
 * `mergeFindings` de-duplicates by id, with a content-key fallback
 * (dimension|message|file|location). To exercise the id-based de-duplication
 * path without accidental content-key collisions between *distinct* ids, the
 * generator derives each Finding's `message`, `file`, and `location` from its
 * `id`. This makes the content key a 1:1 function of the id, so "unique by id"
 * and "unique by content key" coincide, and identical Findings sampled into
 * multiple reports collapse to exactly one merged entry.
 *
 * Validates: Requirements 13.5
 */
describe("scoring — finding merge de-duplication and ordering (Property 40)", () => {
    const DIMENSIONS: Dimension[] = [
        "visual_design",
        "storytelling",
        "motion",
        "layout_responsive",
        "performance",
        "content_honesty",
    ];

    const AGENTS: CheckerReport["agent"][] = [
        "design-checker",
        "responsive-checker",
        "performance-checker",
    ];

    const severityArb = fc.constantFrom<Severity>("P0", "P1", "P2");
    const dimensionArb = fc.constantFrom<Dimension>(...DIMENSIONS);

    /**
     * A pool of Findings with unique ids. Content is derived from the id so
     * that two distinct ids can never share a content key, and any repeat of
     * the same pool entry across reports is a genuine duplicate (same id and
     * same content key).
     */
    const poolArb = fc
        .uniqueArray(
            fc.record({
                id: fc.string({ minLength: 1, maxLength: 8 }),
                severity: severityArb,
                dimension: dimensionArb,
                open: fc.boolean(),
            }),
            { selector: (f) => f.id, minLength: 1, maxLength: 24 },
        )
        .map<Finding[]>((base) =>
            base.map((b) => ({
                id: b.id,
                severity: b.severity,
                dimension: b.dimension,
                message: `finding ${b.id} on ${b.dimension}`,
                file: `src/f-${b.id}.tsx`,
                location: `section-${b.id}`,
                open: b.open,
            })),
        );

    /**
     * Build a set of checker reports that sample (with replacement, and across
     * multiple reports) from the shared pool — creating both intra-report and
     * cross-report duplicates.
     */
    const scenarioArb = poolArb.chain((pool) =>
        fc.record({
            pool: fc.constant(pool),
            reports: fc.array(
                fc.record({
                    agent: fc.constantFrom(...AGENTS),
                    findings: fc.array(fc.constantFrom(...pool), {
                        minLength: 0,
                        maxLength: pool.length * 2,
                    }),
                }),
                { minLength: 1, maxLength: 4 },
            ),
        }),
    );

    const toReports = (
        reports: { agent: CheckerReport["agent"]; findings: Finding[] }[],
    ): CheckerReport[] =>
        reports.map((r) => ({
            agent: r.agent,
            scores: {},
            findings: r.findings,
            evidence: [],
        }));

    it("merges to exactly the unique P0/P1 findings, excludes P2, and orders P0 before P1", () => {
        fc.assert(
            fc.property(scenarioArb, ({ reports }) => {
                const checkerReports = toReports(reports);
                const merged = mergeFindings(checkerReports);

                const allInput = checkerReports.flatMap((r) => r.findings);
                const inputIds = new Set(allInput.map((f) => f.id));

                // Expected unique P0/P1 ids across all inputs.
                const expectedIds = new Set(
                    allInput
                        .filter((f) => f.severity === "P0" || f.severity === "P1")
                        .map((f) => f.id),
                );

                const mergedIds = merged.map((f) => f.id);

                // (a) No duplicate ids in the output.
                expect(new Set(mergedIds).size).toBe(mergedIds.length);

                // (b) Every unique P0/P1 finding appears exactly once (by id).
                expect(new Set(mergedIds)).toEqual(expectedIds);
                expect(mergedIds.length).toBe(expectedIds.size);

                // (c) No P2 in the merged output.
                for (const f of merged) {
                    expect(f.severity === "P0" || f.severity === "P1").toBe(true);
                }

                // (d) Contains no finding absent from the inputs.
                for (const f of merged) {
                    expect(inputIds.has(f.id)).toBe(true);
                }

                // (e) Ordered so that all P0 precede all P1.
                let seenP1 = false;
                for (const f of merged) {
                    if (f.severity === "P1") {
                        seenP1 = true;
                    } else if (f.severity === "P0") {
                        // A P0 must never appear after any P1.
                        expect(seenP1).toBe(false);
                    }
                }
            }),
            { numRuns: 200 },
        );
    });

    it("preserves the exact input finding for each merged id", () => {
        fc.assert(
            fc.property(scenarioArb, ({ reports }) => {
                const checkerReports = toReports(reports);
                const merged = mergeFindings(checkerReports);
                const allInput = checkerReports.flatMap((r) => r.findings);

                for (const f of merged) {
                    const source = allInput.find((s) => s.id === f.id);
                    expect(source).toBeDefined();
                    // The merged finding is one of the actual inputs, unmodified.
                    expect(f).toEqual(source);
                }
            }),
            { numRuns: 200 },
        );
    });
});
