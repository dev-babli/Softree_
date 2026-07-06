// Feature: page-forge-agent-system, loop controller property tests (Properties 43–46)
import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
    nextAction,
    incrementLoop,
    failedDimensions,
    orderFindingsByFixPriority,
    scheduleFixers,
    FIXER_ORDER,
    type FixerName,
    type FixerFileSets,
} from "../loop";
import type {
    Dimension,
    Finding,
    LoopState,
    Severity,
    Verdict,
} from "../types";

// ---------------------------------------------------------------------------
// Shared generators
// ---------------------------------------------------------------------------

const DIMENSIONS: Dimension[] = [
    "visual_design",
    "storytelling",
    "motion",
    "layout_responsive",
    "performance",
    "content_honesty",
];

const SEVERITIES: Severity[] = ["P0", "P1", "P2"];

const dimensionArb = fc.constantFrom<Dimension>(...DIMENSIONS);

const findingArb = (severity?: fc.Arbitrary<Severity>): fc.Arbitrary<Finding> =>
    fc.record({
        id: fc.string({ minLength: 1, maxLength: 10 }),
        severity: severity ?? fc.constantFrom<Severity>(...SEVERITIES),
        dimension: dimensionArb,
        message: fc.string({ maxLength: 16 }),
        open: fc.boolean(),
    });

// A subset of the six dimensions, de-duplicated.
const dimensionSubsetArb: fc.Arbitrary<Dimension[]> = fc
    .subarray(DIMENSIONS, { minLength: 0, maxLength: DIMENSIONS.length })
    .map((dims) => [...dims]);

// Verdict generator: verdict tag, failedDimensions subset, and an openP0 list
// of Findings whose severity/open flags vary (so the union logic is exercised).
const verdictArb: fc.Arbitrary<Verdict> = fc
    .record({
        verdict: fc.constantFrom<"APPROVED" | "REJECTED">("APPROVED", "REJECTED"),
        overall: fc.double({ min: 0, max: 10, noNaN: true }),
        failedDimensions: dimensionSubsetArb,
        openP0: fc.array(findingArb(), { maxLength: 8 }),
    })
    .map((v) => ({
        verdict: v.verdict,
        overall: v.overall,
        dimensions: {},
        openP0: v.openP0,
        failedDimensions: v.failedDimensions,
    }));

// LoopState generator with loop/maxLoops in sensible ranges.
const loopStateArb: fc.Arbitrary<LoopState> = fc
    .record({
        loop: fc.integer({ min: 0, max: 12 }),
        maxLoops: fc.integer({ min: 1, max: 10 }),
        lastVerdict: fc.constantFrom<"APPROVED" | "REJECTED" | null>(
            "APPROVED",
            "REJECTED",
            null,
        ),
    });

// ---------------------------------------------------------------------------
// Property 43 — Correction targets exactly the failed dimensions
// ---------------------------------------------------------------------------

describe("loop — correction targets exactly the failed dimensions (Property 43)", () => {
    // Feature: page-forge-agent-system, Property 43: Correction targets exactly the failed dimensions
    // Validates: Requirements 14.1
    it("scopes a REJECTED correction to exactly failedDimensions ∪ open-P0 dimensions", () => {
        fc.assert(
            fc.property(
                loopStateArb,
                verdictArb,
                (state, verdict) => {
                    // Constrain to the precondition: REJECTED and loop < maxLoops.
                    const rejected: Verdict = { ...verdict, verdict: "REJECTED" };
                    const active: LoopState = {
                        ...state,
                        // Guarantee loop < maxLoops so we get a "correct" action.
                        loop: 0,
                        maxLoops: Math.max(1, state.maxLoops),
                    };

                    const action = nextAction(active, rejected);
                    expect(action.kind).toBe("correct");
                    if (action.kind !== "correct") return;

                    // Independently compute the expected union: failed dimensions
                    // plus dimensions carrying an OPEN P0 finding.
                    const expected = new Set<Dimension>(rejected.failedDimensions);
                    for (const f of rejected.openP0) {
                        if (f.open && f.severity === "P0") {
                            expected.add(f.dimension);
                        }
                    }

                    const got = new Set<Dimension>(action.dimensions);

                    // No duplicates in the result.
                    expect(action.dimensions.length).toBe(got.size);
                    // Exact set equality: no more, no fewer.
                    expect(got.size).toBe(expected.size);
                    for (const d of expected) {
                        expect(got.has(d)).toBe(true);
                    }
                    for (const d of got) {
                        expect(expected.has(d)).toBe(true);
                    }
                },
            ),
            { numRuns: 200 },
        );
    });
});

// ---------------------------------------------------------------------------
// Property 44 — Fix ordering places all P0 before P1 (and P1 before P2)
// ---------------------------------------------------------------------------

describe("loop — fix ordering places all P0 before P1 (Property 44)", () => {
    // Feature: page-forge-agent-system, Property 44: Fix ordering places all P0 before P1
    // Validates: Requirements 14.3
    const rank: Record<Severity, number> = { P0: 0, P1: 1, P2: 2 };

    it("orders every P0 before every P1 before every P2, stable within a band", () => {
        fc.assert(
            fc.property(
                fc.array(findingArb(), { maxLength: 20 }),
                (findings) => {
                    const ordered = orderFindingsByFixPriority(findings);

                    // Same multiset of findings (nothing added/dropped).
                    expect(ordered.length).toBe(findings.length);

                    // Severity ranks are non-decreasing across the result.
                    for (let i = 1; i < ordered.length; i++) {
                        expect(
                            rank[ordered[i].severity] >=
                            rank[ordered[i - 1].severity],
                        ).toBe(true);
                    }

                    // Stability: within each severity band the relative order of
                    // the original input is preserved.
                    for (const sev of SEVERITIES) {
                        const inInput = findings.filter((f) => f.severity === sev);
                        const inOutput = ordered.filter((f) => f.severity === sev);
                        expect(inOutput).toEqual(inInput);
                    }
                },
            ),
            { numRuns: 200 },
        );
    });
});

// ---------------------------------------------------------------------------
// Property 45 — Loop counter is monotonic and bounded; termination guaranteed
// ---------------------------------------------------------------------------

describe("loop — counter monotonic and bounded; termination guaranteed (Property 45)", () => {
    // Feature: page-forge-agent-system, Property 45: Loop counter is monotonic and bounded; termination is guaranteed
    // Validates: Requirements 14.4, 14.8
    it("incrementLoop increases loop by exactly 1 and does not mutate the input", () => {
        fc.assert(
            fc.property(loopStateArb, (state) => {
                const before = state.loop;
                const next = incrementLoop(state);
                expect(next.loop).toBe(before + 1);
                // Input is not mutated.
                expect(state.loop).toBe(before);
                // Other fields preserved.
                expect(next.maxLoops).toBe(state.maxLoops);
                expect(next.lastVerdict).toBe(state.lastVerdict);
            }),
            { numRuns: 200 },
        );
    });

    it("REJECTED with loop >= maxLoops escalates; APPROVED always ships", () => {
        fc.assert(
            fc.property(
                loopStateArb,
                verdictArb,
                fc.integer({ min: 0, max: 3 }),
                (state, verdict, overshoot) => {
                    // APPROVED always ships regardless of the counter.
                    const approved: Verdict = { ...verdict, verdict: "APPROVED" };
                    expect(nextAction(state, approved).kind).toBe("ship");

                    // REJECTED at or beyond the bound escalates (termination).
                    const maxLoops = Math.max(1, state.maxLoops);
                    const exhausted: LoopState = {
                        ...state,
                        maxLoops,
                        loop: maxLoops + overshoot,
                    };
                    const rejected: Verdict = { ...verdict, verdict: "REJECTED" };
                    expect(nextAction(exhausted, rejected).kind).toBe("escalate");
                },
            ),
            { numRuns: 200 },
        );
    });
});

// ---------------------------------------------------------------------------
// Property 46 — Fixer scheduling parallelizes disjoint, serializes shared
// ---------------------------------------------------------------------------

describe("loop — fixer scheduling parallelizes disjoint and serializes shared files (Property 46)", () => {
    // Feature: page-forge-agent-system, Property 46: Fixer scheduling parallelizes disjoint files and serializes shared files
    // Validates: Requirements 14.6

    // A small shared file pool so overlaps and disjointness both occur often.
    const fileArb = fc.constantFrom("a.tsx", "b.tsx", "c.tsx", "d.tsx", "e.tsx");
    const fileSetArb = fc
        .array(fileArb, { maxLength: 4 })
        .map((files) => [...new Set(files)]);

    // Optionally-present file set per fixer.
    const maybeFileSetArb = fc.option(fileSetArb, { nil: undefined });

    const fileSetsArb: fc.Arbitrary<FixerFileSets> = fc
        .record({
            design: maybeFileSetArb,
            responsive: maybeFileSetArb,
            performance: maybeFileSetArb,
        })
        .map((r) => {
            const out: FixerFileSets = {};
            if (r.design !== undefined) out.design = r.design;
            if (r.responsive !== undefined) out.responsive = r.responsive;
            if (r.performance !== undefined) out.performance = r.performance;
            return out;
        });

    const rankOf = (f: FixerName): number => FIXER_ORDER.indexOf(f);

    const shareFile = (
        fileSets: FixerFileSets,
        a: FixerName,
        b: FixerName,
    ): boolean => {
        const setA = new Set(fileSets[a] ?? []);
        return (fileSets[b] ?? []).some((file) => setA.has(file));
    };

    it("within a wave all pairs are disjoint; conflicting fixers serialize in canonical order", () => {
        fc.assert(
            fc.property(fileSetsArb, (fileSets) => {
                const schedule = scheduleFixers(fileSets);

                // Locate each fixer's wave index.
                const waveOf = new Map<FixerName, number>();
                schedule.forEach((wave, i) => {
                    for (const fixer of wave) {
                        waveOf.set(fixer, i);
                    }
                });

                // Only present fixers are scheduled, each exactly once.
                const scheduledCount = schedule.reduce((n, w) => n + w.length, 0);
                const presentCount = FIXER_ORDER.filter(
                    (f) => fileSets[f] !== undefined,
                ).length;
                expect(scheduledCount).toBe(presentCount);

                // Within any wave, all pairs are disjoint.
                for (const wave of schedule) {
                    for (let i = 0; i < wave.length; i++) {
                        for (let j = i + 1; j < wave.length; j++) {
                            expect(shareFile(fileSets, wave[i], wave[j])).toBe(false);
                        }
                    }
                    // Fixers within a wave appear in canonical order.
                    for (let i = 1; i < wave.length; i++) {
                        expect(rankOf(wave[i]) > rankOf(wave[i - 1])).toBe(true);
                    }
                }

                // Any two present fixers that share a file are in different
                // waves, ordered Design → Responsive → Performance.
                const present = FIXER_ORDER.filter(
                    (f) => fileSets[f] !== undefined,
                );
                for (let i = 0; i < present.length; i++) {
                    for (let j = i + 1; j < present.length; j++) {
                        const a = present[i];
                        const b = present[j];
                        if (shareFile(fileSets, a, b)) {
                            const wa = waveOf.get(a)!;
                            const wb = waveOf.get(b)!;
                            expect(wa).not.toBe(wb);
                            // a precedes b in canonical order, so its wave is earlier.
                            expect(wa < wb).toBe(true);
                        }
                    }
                }
            }),
            { numRuns: 200 },
        );
    });
});
