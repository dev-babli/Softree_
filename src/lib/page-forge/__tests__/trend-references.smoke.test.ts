// Feature: page-forge-agent-system, Task 17.6:
// integration/smoke test for Trend web-reference retrieval.
import { describe, it, expect } from "vitest";

import {
    evaluateReferenceCount,
    partitionReferences,
    INTERNET_REFERENCE_MIN,
    INTERNET_REFERENCE_MAX,
} from "../validators";
import type { ReferenceSource } from "../types";

/**
 * Task 17.6 — smoke/integration test for the Trend web-reference retrieval
 * policy.
 *
 * Actual web retrieval is non-deterministic and network-bound, so instead of
 * making real web-search calls this test exercises the deterministic
 * reference-count/recording logic that governs the retrieval outcome:
 *
 *   - The Trend_Scout targets between two and three internet Reference_Sources
 *     during the Trend selection phase (Req 4.3). When two or three internet
 *     references are used, they are all recorded and the count sits within the
 *     accepted [2, 3] range with no shortfall recorded.
 *   - If web search returns fewer than two internet references, the shortfall
 *     must be recorded in the direction artifact and the run proceeds with the
 *     available references (Req 4.9).
 *
 * Validates: Requirements 4.3, 4.9
 */

/** Build an internet Reference_Source with a distinct locator. */
function internetRef(n: number, extra: Partial<ReferenceSource> = {}): ReferenceSource {
    return {
        kind: "internet",
        locator: `https://example.com/reference-${n}`,
        used: true,
        ...extra,
    };
}

/** A user-supplied Design_Data reference (should not count toward the target). */
function designDataRef(n: number): ReferenceSource {
    return {
        kind: "design_data",
        locator: `.planning/design-data/ref-${n}.png`,
        used: true,
    };
}

describe("Trend web-reference retrieval — count policy (Req 4.3)", () => {
    it("exposes the approved [2, 3] internet-reference target range", () => {
        expect(INTERNET_REFERENCE_MIN).toBe(2);
        expect(INTERNET_REFERENCE_MAX).toBe(3);
    });

    it("accepts exactly two internet references with no shortfall", () => {
        const refs = [internetRef(1), internetRef(2)];

        const evaluation = evaluateReferenceCount(refs);
        expect(evaluation.internetCount).toBe(2);
        expect(evaluation.withinTarget).toBe(true);
        expect(evaluation.overTarget).toBe(false);
        expect(evaluation.shortfall).toBe(false);

        // All references are recorded in the direction artifact (Req 4.2).
        const { recorded } = partitionReferences(refs);
        expect(recorded).toHaveLength(2);
    });

    it("accepts exactly three internet references with no shortfall", () => {
        const refs = [internetRef(1), internetRef(2), internetRef(3)];

        const evaluation = evaluateReferenceCount(refs);
        expect(evaluation.internetCount).toBe(3);
        expect(evaluation.withinTarget).toBe(true);
        expect(evaluation.overTarget).toBe(false);
        expect(evaluation.shortfall).toBe(false);

        const { recorded } = partitionReferences(refs);
        expect(recorded).toHaveLength(3);
    });

    it("counts only internet references toward the target, ignoring Design_Data", () => {
        // Two internet references retrieved alongside several Design_Data refs:
        // the target is satisfied by the internet references alone.
        const refs = [
            internetRef(1),
            internetRef(2),
            designDataRef(1),
            designDataRef(2),
        ];

        const evaluation = evaluateReferenceCount(refs);
        expect(evaluation.internetCount).toBe(2);
        expect(evaluation.withinTarget).toBe(true);
        expect(evaluation.shortfall).toBe(false);

        // Every reference (internet + Design_Data) is still recorded (Req 4.2).
        const { recorded } = partitionReferences(refs);
        expect(recorded).toHaveLength(4);
    });

    it("flags counts above the target maximum as over-target (3 is the max)", () => {
        const refs = [internetRef(1), internetRef(2), internetRef(3), internetRef(4)];

        const evaluation = evaluateReferenceCount(refs);
        expect(evaluation.internetCount).toBe(4);
        expect(evaluation.overTarget).toBe(true);
        expect(evaluation.withinTarget).toBe(false);
        expect(evaluation.shortfall).toBe(false);
    });
});

describe("Trend web-reference retrieval — shortfall recording (Req 4.9)", () => {
    it("records a shortfall when exactly one internet reference is returned", () => {
        const refs = [internetRef(1)];

        const evaluation = evaluateReferenceCount(refs);
        expect(evaluation.internetCount).toBe(1);
        expect(evaluation.shortfall).toBe(true);
        expect(evaluation.withinTarget).toBe(false);

        // The run still proceeds with the available reference, which is recorded.
        const { recorded, usable } = partitionReferences(refs);
        expect(recorded).toHaveLength(1);
        expect(usable).toHaveLength(1);
    });

    it("records a shortfall when web search returns zero internet references", () => {
        const refs: ReferenceSource[] = [];

        const evaluation = evaluateReferenceCount(refs);
        expect(evaluation.internetCount).toBe(0);
        expect(evaluation.shortfall).toBe(true);
        expect(evaluation.withinTarget).toBe(false);
    });

    it("records a shortfall when only Design_Data references exist (no internet refs)", () => {
        // Design_Data references do not satisfy the internet-reference target,
        // so a run with only Design_Data must record a shortfall (Req 4.9).
        const refs = [designDataRef(1), designDataRef(2), designDataRef(3)];

        const evaluation = evaluateReferenceCount(refs);
        expect(evaluation.internetCount).toBe(0);
        expect(evaluation.shortfall).toBe(true);
    });

    it("does not record a shortfall once the two-reference minimum is met", () => {
        const shortfallRefs = [internetRef(1)];
        const okRefs = [internetRef(1), internetRef(2)];

        expect(evaluateReferenceCount(shortfallRefs).shortfall).toBe(true);
        expect(evaluateReferenceCount(okRefs).shortfall).toBe(false);
    });
});
