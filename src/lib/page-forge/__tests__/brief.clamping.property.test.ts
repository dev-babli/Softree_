// Feature: page-forge-agent-system, Property 5: Brief threshold and Max_Loops clamping
import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
    normalizeBrief,
    DEFAULT_THRESHOLD,
    DEFAULT_MAX_LOOPS,
    THRESHOLD_RANGE,
    MAX_LOOPS_RANGE,
} from "../brief";
import type { BriefInput } from "../types";

/**
 * Property 5 — Brief threshold and Max_Loops clamping.
 *
 * Property statement: For any raw threshold and raw Max_Loops values, the
 * normalized Brief uses the supplied value when it is in range (threshold in
 * [0.0, 10.0]; Max_Loops an integer in [1, 10]), and otherwise falls back to
 * the default (8.5 / 4) while recording a RangeRejection; the normalized values
 * are always within their valid ranges.
 *
 * Validates: Requirements 2.4, 2.5, 2.6
 */
describe("brief — threshold and Max_Loops clamping (Property 5)", () => {
    // --- Helpers mirroring the spec's notion of "in range" ---
    const thresholdInRange = (n: number): boolean =>
        Number.isFinite(n) && n >= THRESHOLD_RANGE.min && n <= THRESHOLD_RANGE.max;

    const maxLoopsInRange = (n: number): boolean =>
        Number.isFinite(n) &&
        Number.isInteger(n) &&
        n >= MAX_LOOPS_RANGE.min &&
        n <= MAX_LOOPS_RANGE.max;

    const hasRejection = (
        b: ReturnType<typeof normalizeBrief>,
        field: "threshold" | "maxLoops",
    ): boolean => b.rejections.some((r) => r.field === field);

    // --- Arbitraries ---
    // Threshold: in-range doubles, out-of-range doubles, NaN, and undefined.
    const thresholdArb = fc.oneof(
        // in-range
        fc.double({ min: 0, max: 10, noNaN: true }),
        // arbitrary doubles including out-of-range and NaN (noNaN off)
        fc.double(),
        // explicit boundary + out-of-range sentinels
        fc.constantFrom(0, 10, -0.0001, 10.0001, -100, 100, NaN, Infinity, -Infinity),
        // absent
        fc.constant(undefined),
    );

    // Max_Loops: integers (in and out of range), non-integer doubles, NaN, undefined.
    const maxLoopsArb = fc.oneof(
        fc.integer({ min: 1, max: 10 }),
        fc.integer({ min: -50, max: 60 }),
        fc.double(), // non-integers, out-of-range, NaN
        fc.constantFrom(0, 1, 10, 11, -1, 2.5, 5.9, NaN, Infinity, -Infinity),
        fc.constant(undefined),
    );

    it("normalized threshold is always within [0, 10]", () => {
        fc.assert(
            fc.property(thresholdArb, (threshold) => {
                const brief = normalizeBrief({ threshold } as BriefInput);
                expect(brief.threshold).toBeGreaterThanOrEqual(THRESHOLD_RANGE.min);
                expect(brief.threshold).toBeLessThanOrEqual(THRESHOLD_RANGE.max);
                expect(Number.isFinite(brief.threshold)).toBe(true);
            }),
            { numRuns: 300 },
        );
    });

    it("normalized maxLoops is always an integer within [1, 10]", () => {
        fc.assert(
            fc.property(maxLoopsArb, (maxLoops) => {
                const brief = normalizeBrief({ maxLoops } as BriefInput);
                expect(Number.isInteger(brief.maxLoops)).toBe(true);
                expect(brief.maxLoops).toBeGreaterThanOrEqual(MAX_LOOPS_RANGE.min);
                expect(brief.maxLoops).toBeLessThanOrEqual(MAX_LOOPS_RANGE.max);
            }),
            { numRuns: 300 },
        );
    });

    it("uses the supplied threshold with no rejection when in range; else default + rejection", () => {
        fc.assert(
            fc.property(thresholdArb, (threshold) => {
                const brief = normalizeBrief({ threshold } as BriefInput);

                if (threshold === undefined) {
                    // Absent → default, no rejection recorded (Req 2.2/2.4).
                    expect(brief.threshold).toBe(DEFAULT_THRESHOLD);
                    expect(hasRejection(brief, "threshold")).toBe(false);
                } else if (thresholdInRange(threshold)) {
                    // In range → supplied value used, no rejection (Req 2.4).
                    expect(brief.threshold).toBe(threshold);
                    expect(hasRejection(brief, "threshold")).toBe(false);
                } else {
                    // Out of range / NaN → default + recorded rejection (Req 2.6).
                    expect(brief.threshold).toBe(DEFAULT_THRESHOLD);
                    expect(hasRejection(brief, "threshold")).toBe(true);
                    const rejection = brief.rejections.find((r) => r.field === "threshold");
                    expect(rejection?.fallbackValue).toBe(DEFAULT_THRESHOLD);
                    expect(rejection?.suppliedValue).toBe(threshold);
                }
            }),
            { numRuns: 300 },
        );
    });

    it("uses the supplied maxLoops with no rejection when in range; else default + rejection", () => {
        fc.assert(
            fc.property(maxLoopsArb, (maxLoops) => {
                const brief = normalizeBrief({ maxLoops } as BriefInput);

                if (maxLoops === undefined) {
                    // Absent → default, no rejection recorded (Req 2.2/2.5).
                    expect(brief.maxLoops).toBe(DEFAULT_MAX_LOOPS);
                    expect(hasRejection(brief, "maxLoops")).toBe(false);
                } else if (maxLoopsInRange(maxLoops)) {
                    // Integer in range → supplied value used, no rejection (Req 2.5).
                    expect(brief.maxLoops).toBe(maxLoops);
                    expect(hasRejection(brief, "maxLoops")).toBe(false);
                } else {
                    // Non-integer / out of range / NaN → default + rejection (Req 2.6).
                    expect(brief.maxLoops).toBe(DEFAULT_MAX_LOOPS);
                    expect(hasRejection(brief, "maxLoops")).toBe(true);
                    const rejection = brief.rejections.find((r) => r.field === "maxLoops");
                    expect(rejection?.fallbackValue).toBe(DEFAULT_MAX_LOOPS);
                    expect(rejection?.suppliedValue).toBe(maxLoops);
                }
            }),
            { numRuns: 300 },
        );
    });

    it("clamps threshold and maxLoops independently for any raw combination", () => {
        fc.assert(
            fc.property(thresholdArb, maxLoopsArb, (threshold, maxLoops) => {
                const brief = normalizeBrief({ threshold, maxLoops } as BriefInput);

                // Both normalized values always land within their valid ranges.
                expect(brief.threshold).toBeGreaterThanOrEqual(THRESHOLD_RANGE.min);
                expect(brief.threshold).toBeLessThanOrEqual(THRESHOLD_RANGE.max);
                expect(Number.isInteger(brief.maxLoops)).toBe(true);
                expect(brief.maxLoops).toBeGreaterThanOrEqual(MAX_LOOPS_RANGE.min);
                expect(brief.maxLoops).toBeLessThanOrEqual(MAX_LOOPS_RANGE.max);

                // A rejection is recorded exactly for each out-of-range supplied field.
                const thresholdShouldReject =
                    threshold !== undefined && !thresholdInRange(threshold);
                const maxLoopsShouldReject =
                    maxLoops !== undefined && !maxLoopsInRange(maxLoops);
                expect(hasRejection(brief, "threshold")).toBe(thresholdShouldReject);
                expect(hasRejection(brief, "maxLoops")).toBe(maxLoopsShouldReject);
            }),
            { numRuns: 300 },
        );
    });
});
