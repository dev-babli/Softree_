import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
    mergeFindings,
    openP2,
    scoresCiteEvidence,
    REQUIRED_DIMENSIONS,
} from "../scoring";
import type {
    CheckerReport,
    Dimension,
    EvidenceRef,
    Finding,
    Score,
    Severity,
} from "../types";

/**
 * Shared fast-check arbitraries for the scoring-module evidence/severity
 * properties. These generators cover the full input space that the scoring
 * module handles: every severity, open/closed flags, every dimension,
 * null/non-null scores, and reports with/without evidence.
 */

const SEVERITIES: Severity[] = ["P0", "P1", "P2"];
const EVIDENCE_KINDS: EvidenceRef["kind"][] = [
    "file",
    "breakpoint",
    "behavior",
    "measurement",
];
const CHECKER_AGENTS: CheckerReport["agent"][] = [
    "design-checker",
    "responsive-checker",
    "performance-checker",
];

const dimensionArb = fc.constantFrom<Dimension>(...REQUIRED_DIMENSIONS);
const severityArb = fc.constantFrom<Severity>(...SEVERITIES);

/** A Finding with any severity, dimension, open/closed flag. */
const findingArb: fc.Arbitrary<Finding> = fc.record({
    id: fc.string({ minLength: 1, maxLength: 12 }),
    severity: severityArb,
    dimension: dimensionArb,
    message: fc.string({ maxLength: 24 }),
    open: fc.boolean(),
});

const findingsArb = fc.array(findingArb, { maxLength: 12 });

/** A single dimension score: a number in [0, 10] or null. */
const scoreOrNullArb: fc.Arbitrary<Score | null> = fc.oneof(
    fc.double({ min: 0, max: 10, noNaN: true }),
    fc.constant(null),
);

/** A single EvidenceRef of any kind. */
const evidenceRefArb: fc.Arbitrary<EvidenceRef> = fc.record({
    kind: fc.constantFrom<EvidenceRef["kind"]>(...EVIDENCE_KINDS),
    detail: fc.string({ maxLength: 24 }),
    toolAbsent: fc.option(fc.boolean(), { nil: undefined }),
});

/**
 * A partial score map keyed by an arbitrary subset of the six dimensions,
 * each value a number in [0, 10] or null. Covers all-null, all-scored, and
 * mixed reports.
 */
const partialScoresArb: fc.Arbitrary<Partial<Record<Dimension, Score | null>>> =
    fc
        .tuple(...REQUIRED_DIMENSIONS.map(() => fc.option(scoreOrNullArb, { nil: undefined })))
        .map((values) => {
            const scores: Partial<Record<Dimension, Score | null>> = {};
            REQUIRED_DIMENSIONS.forEach((dim, i) => {
                const v = values[i];
                if (v !== undefined) {
                    scores[dim] = v;
                }
            });
            return scores;
        });

/** A CheckerReport with varied scores, findings, and evidence (0..N refs). */
const checkerReportArb: fc.Arbitrary<CheckerReport> = fc.record({
    agent: fc.constantFrom<CheckerReport["agent"]>(...CHECKER_AGENTS),
    scores: partialScoresArb,
    findings: findingsArb,
    evidence: fc.array(evidenceRefArb, { maxLength: 5 }),
    failed: fc.option(fc.boolean(), { nil: undefined }),
});

const reportsArb = fc.array(checkerReportArb, { maxLength: 5 });

// Feature: page-forge-agent-system, Property 23: Every Finding has exactly one severity
/**
 * Property 23 — Every Finding has exactly one severity.
 *
 * Property statement: For any CheckerReport[], every Finding produced or
 * handled by the scoring module carries exactly one severity value drawn from
 * the union "P0" | "P1" | "P2" — never zero, never two. The `mergeFindings`
 * output and the `openP2` output each contain only such findings, and each
 * Finding exposes a single `severity` field (not an array or a set).
 *
 * Validates: Requirements 9.7
 */
describe("scoring — every Finding has exactly one severity (Property 23)", () => {
    const hasExactlyOneSeverity = (finding: Finding): boolean => {
        // The field is a single value, and it is exactly one of the three.
        const s = finding.severity as unknown;
        if (typeof s !== "string") {
            return false;
        }
        const matches = SEVERITIES.filter((sev) => sev === s);
        return matches.length === 1;
    };

    it("mergeFindings and openP2 outputs carry exactly one severity per finding", () => {
        fc.assert(
            fc.property(reportsArb, (reports) => {
                const merged = mergeFindings(reports);
                for (const finding of merged) {
                    expect(hasExactlyOneSeverity(finding)).toBe(true);
                    // mergeFindings only surfaces P0/P1 (P2 excluded).
                    expect(["P0", "P1"]).toContain(finding.severity);
                }

                const allFindings = reports.flatMap((r) => r.findings);
                const p2 = openP2(allFindings);
                for (const finding of p2) {
                    expect(hasExactlyOneSeverity(finding)).toBe(true);
                    expect(finding.severity).toBe("P2");
                }

                // Every input finding also admits exactly one severity.
                for (const finding of allFindings) {
                    expect(hasExactlyOneSeverity(finding)).toBe(true);
                }
            }),
            { numRuns: 200 },
        );
    });
});

// Feature: page-forge-agent-system, Property 31: Every recorded score cites evidence
/**
 * Property 31 — Every recorded score cites evidence.
 *
 * Property statement: For any CheckerReport, `scoresCiteEvidence(report)` is
 * true iff every non-null scored dimension in `report.scores` is accompanied
 * by at least one EvidenceRef in `report.evidence`. When at least one
 * dimension is scored, evidence must be present; when nothing is scored the
 * invariant holds vacuously (true regardless of evidence).
 *
 * Validates: Requirements 11.3
 */
describe("scoring — every recorded score cites evidence (Property 31)", () => {
    const expected = (report: CheckerReport): boolean => {
        const scored = Object.values(report.scores).filter(
            (v) => v !== null && v !== undefined,
        );
        if (scored.length === 0) {
            return true;
        }
        return (report.evidence ?? []).length >= 1;
    };

    it("matches the independent evidence-backing recomputation for any report", () => {
        fc.assert(
            fc.property(checkerReportArb, (report) => {
                expect(scoresCiteEvidence(report)).toBe(expected(report));
            }),
            { numRuns: 200 },
        );
    });

    it("a scored dimension without any evidence fails the invariant", () => {
        const scoredNoEvidence = fc
            .tuple(dimensionArb, fc.double({ min: 0, max: 10, noNaN: true }))
            .map(([dim, score]) => {
                const report: CheckerReport = {
                    agent: "design-checker",
                    scores: { [dim]: score },
                    findings: [],
                    evidence: [],
                };
                return report;
            });

        fc.assert(
            fc.property(scoredNoEvidence, (report) => {
                expect(scoresCiteEvidence(report)).toBe(false);
            }),
            { numRuns: 100 },
        );
    });

    it("a scored dimension with >=1 evidence ref satisfies the invariant", () => {
        const scoredWithEvidence = fc
            .tuple(
                dimensionArb,
                fc.double({ min: 0, max: 10, noNaN: true }),
                fc.array(evidenceRefArb, { minLength: 1, maxLength: 4 }),
            )
            .map(([dim, score, evidence]) => {
                const report: CheckerReport = {
                    agent: "responsive-checker",
                    scores: { [dim]: score },
                    findings: [],
                    evidence,
                };
                return report;
            });

        fc.assert(
            fc.property(scoredWithEvidence, (report) => {
                expect(scoresCiteEvidence(report)).toBe(true);
            }),
            { numRuns: 100 },
        );
    });
});

// Feature: page-forge-agent-system, Property 47: Ship report lists exactly the open P2 findings
/**
 * Property 47 — Ship report lists exactly the open P2 findings.
 *
 * Property statement: For any Finding[], `openP2(findings)` returns exactly the
 * findings whose severity is "P2" AND whose `open` flag is true — no more and
 * no fewer. Closed P2 findings and every non-P2 finding (regardless of open
 * state) are excluded.
 *
 * Validates: Requirements 15.3
 */
describe("scoring — ship report lists exactly the open P2 findings (Property 47)", () => {
    it("returns exactly the open P2 findings and nothing else", () => {
        fc.assert(
            fc.property(findingsArb, (findings) => {
                const result = openP2(findings);

                // Everything returned is an open P2.
                for (const finding of result) {
                    expect(finding.severity).toBe("P2");
                    expect(finding.open).toBe(true);
                }

                // Nothing that should be included is dropped: the result set
                // equals the set of open-P2 inputs (same membership + count).
                const expectedOpenP2 = findings.filter(
                    (f) => f.severity === "P2" && f.open,
                );
                expect(result.length).toBe(expectedOpenP2.length);
                expect(result).toEqual(expectedOpenP2);

                // No closed P2 or non-P2 finding leaks into the result.
                const leaked = result.filter(
                    (f) => f.severity !== "P2" || !f.open,
                );
                expect(leaked).toHaveLength(0);
            }),
            { numRuns: 200 },
        );
    });
});
