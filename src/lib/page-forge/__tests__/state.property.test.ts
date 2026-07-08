import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
    nextIncompletePhase,
    prerequisiteBackfill,
    resumePoint,
} from "../state";
import { PHASE_ORDER } from "../types";
import type {
    Brief,
    LoopState,
    Phase,
    PipelineState,
} from "../types";

/**
 * Property tests for the pure resume/state functions in `state.ts`
 * (tasks 13.2–13.4). These functions are total and depend only on their
 * inputs, so we drive them with fast-check across randomized phase sets,
 * targets, and pipeline states, and compare against independently derived
 * expectations built from `PHASE_ORDER`.
 */
describe("state — pure resume/prerequisite logic", () => {
    // A single phase drawn from the canonical order.
    const phaseArb = fc.constantFrom<Phase>(...PHASE_ORDER);

    // A random subset of PHASE_ORDER as a Set<Phase>. Using subarray preserves
    // that each phase appears at most once; the resulting set is an arbitrary
    // subset of the nine phases (including empty and full).
    const completedSetArb: fc.Arbitrary<Set<Phase>> = fc
        .subarray(PHASE_ORDER, { minLength: 0, maxLength: PHASE_ORDER.length })
        .map((phases) => new Set<Phase>(phases));

    // A minimal but type-complete Brief. resumePoint/nextIncompletePhase ignore
    // the Brief entirely, so a fixed default is sufficient.
    const minimalBrief: Brief = {
        route: { present: false },
        slug: { present: true, value: "sample" },
        pageKind: { present: false },
        audience: { present: false },
        contentSource: { present: false },
        references: [],
        maxLoops: 3,
        threshold: 8,
        rejections: [],
        sacredUi: [],
        missingRequired: ["route", "contentSource"],
    };

    const loopArb: fc.Arbitrary<LoopState> = fc.record({
        loop: fc.nat({ max: 10 }),
        maxLoops: fc.integer({ min: 1, max: 10 }),
        lastVerdict: fc.constantFrom<LoopState["lastVerdict"]>(
            "APPROVED",
            "REJECTED",
            null,
        ),
    });

    const loopArtifactsArb = fc.record({
        design: fc.boolean(),
        responsive: fc.boolean(),
        performance: fc.boolean(),
    });

    const pipelineStateArb: fc.Arbitrary<PipelineState> = fc
        .record({
            loop: loopArb,
            completedPhases: completedSetArb,
            currentLoopArtifacts: loopArtifactsArb,
        })
        .map(({ loop, completedPhases, currentLoopArtifacts }) => ({
            slug: "sample",
            brief: minimalBrief,
            loop,
            completedPhases,
            currentLoopArtifacts,
        }));

    // Feature: page-forge-agent-system, Property 1: Phase order is never skipped or reordered
    it("nextIncompletePhase returns the earliest incomplete phase (Validates 1.1, 1.7)", () => {
        fc.assert(
            fc.property(completedSetArb, (completed) => {
                const result = nextIncompletePhase(completed);

                // Independently derive the smallest index whose phase is absent.
                const firstMissingIndex = PHASE_ORDER.findIndex(
                    (phase) => !completed.has(phase),
                );

                if (firstMissingIndex === -1) {
                    // Every phase complete -> "ship".
                    expect(result).toBe("ship");
                } else {
                    // Result is exactly the first absent phase in PHASE_ORDER.
                    expect(result).toBe(PHASE_ORDER[firstMissingIndex]);
                    // Its index equals the smallest not-completed index (never
                    // skipped or reordered): every earlier phase IS completed.
                    expect(PHASE_ORDER.indexOf(result)).toBe(firstMissingIndex);
                    for (let i = 0; i < firstMissingIndex; i++) {
                        expect(completed.has(PHASE_ORDER[i])).toBe(true);
                    }
                }
            }),
            { numRuns: 200 },
        );
    });

    // Feature: page-forge-agent-system, Property 2: Prerequisite backfill equals missing predecessors in canonical order
    it("prerequisiteBackfill returns exactly the missing predecessors in PHASE_ORDER order (Validates 1.7)", () => {
        fc.assert(
            fc.property(completedSetArb, phaseArb, (completed, target) => {
                const result = prerequisiteBackfill(completed, target);

                const targetIndex = PHASE_ORDER.indexOf(target);
                // Independently derive: phases before target that are absent,
                // in canonical order.
                const expected = PHASE_ORDER.slice(0, targetIndex).filter(
                    (phase) => !completed.has(phase),
                );

                // Exact match: no extras, no reordering, no missing.
                expect(result).toEqual(expected);

                // Every element strictly precedes target and is absent.
                for (const phase of result) {
                    expect(PHASE_ORDER.indexOf(phase)).toBeLessThan(targetIndex);
                    expect(completed.has(phase)).toBe(false);
                }
                // Result is a subsequence of PHASE_ORDER (canonical order held).
                const indices = result.map((p) => PHASE_ORDER.indexOf(p));
                const sorted = [...indices].sort((a, b) => a - b);
                expect(indices).toEqual(sorted);
            }),
            { numRuns: 200 },
        );
    });

    // Feature: page-forge-agent-system, Property 48: Resume point is a pure function of artifacts present
    it("resumePoint routes to correction iff REJECTED with no loop artifact, else nextIncompletePhase (Validates 16.1, 16.2)", () => {
        fc.assert(
            fc.property(pipelineStateArb, (state) => {
                const result = resumePoint(state);

                const rejected = state.loop.lastVerdict === "REJECTED";
                const hasCorrectionArtifact =
                    state.currentLoopArtifacts.design ||
                    state.currentLoopArtifacts.responsive ||
                    state.currentLoopArtifacts.performance;

                if (rejected && !hasCorrectionArtifact) {
                    expect(result).toBe("correction");
                } else {
                    expect(result).toBe(
                        nextIncompletePhase(state.completedPhases),
                    );
                }
            }),
            { numRuns: 200 },
        );
    });
});
