import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { evaluateResponsive } from "../responsive-rules";
import type { ViewportMeasurement } from "../types";

/**
 * Property tests for the responsive rule evaluator (`responsive-rules.ts`),
 * encoding Requirement 10. Each `it(...)` is one numbered design property with
 * at least 100 iterations.
 *
 * Findings are distinguished by their stable id prefix so a property can isolate
 * exactly the rule it is exercising:
 *   - responsive:coverage-gap:<section>:<bp>
 *   - responsive:overflow:<section>:<bp>
 *   - responsive:touch-target:<section>:<bp>:<index>
 *   - responsive:chrome-before-content:<section>:<bp>
 *   - responsive:mobile-pin:<section>:<bp>
 *   - responsive:padding:<section>:<bp>
 */

const BREAKPOINTS = [390, 768, 1024, 1440] as const;
const MOBILE = [390, 768];

// A single ViewportMeasurement whose fields are randomized to straddle every
// rule threshold (overflow, touch <44, padding bounds, collapse ordering, pin).
const measurementArb: fc.Arbitrary<ViewportMeasurement> = fc.record({
    breakpoint: fc.constantFrom<390 | 768 | 1024 | 1440>(...BREAKPOINTS),
    sectionId: fc.constantFrom("hero", "s1", "s2", "s3", "footer"),
    scrollWidth: fc.integer({ min: 0, max: 2000 }),
    clientWidth: fc.integer({ min: 0, max: 2000 }),
    horizontalPaddingPx: fc.integer({ min: 0, max: 600 }),
    touchTargets: fc.array(
        fc.record({
            w: fc.integer({ min: 0, max: 80 }),
            h: fc.integer({ min: 0, max: 80 }),
            selector: fc.string({ minLength: 1, maxLength: 5 }),
        }),
        { maxLength: 4 },
    ),
    pinnedAtBreakpoint: fc.boolean(),
    columnsCollapsed: fc.boolean(),
    firstPrimaryContentIndex: fc.integer({ min: 0, max: 10 }),
    firstChromeIndex: fc.integer({ min: 0, max: 10 }),
});

// An array of measurements with a unique (section, breakpoint) key so ids never
// collide. This lets us reason about the exact set of Findings produced.
const measurementsArb: fc.Arbitrary<ViewportMeasurement[]> = fc.uniqueArray(
    measurementArb,
    {
        selector: (m) => `${m.sectionId}@${m.breakpoint}`,
        minLength: 1,
        maxLength: 14,
    },
);

const key = (sectionId: string, breakpoint: number): string =>
    `${sectionId}@${breakpoint}`;

describe("responsive-rules — Requirement 10 properties", () => {
    // Feature: page-forge-agent-system, Property 24: Responsive breakpoint coverage
    // Validates: Requirements 10.1
    it("evaluates every section at each of 390/768/1024/1440 (coverage gaps for the rest)", () => {
        fc.assert(
            fc.property(measurementsArb, (measurements) => {
                const { findings } = evaluateResponsive(measurements);

                // Distinct sections observed and the present (section, bp) cells.
                const sections = new Set(measurements.map((m) => m.sectionId));
                const present = new Set(
                    measurements.map((m) => key(m.sectionId, m.breakpoint)),
                );

                // Expected coverage gaps: every section × every breakpoint not present.
                const expectedGaps = new Set<string>();
                for (const sectionId of sections) {
                    for (const bp of BREAKPOINTS) {
                        if (!present.has(key(sectionId, bp))) {
                            expectedGaps.add(key(sectionId, bp));
                        }
                    }
                }

                const actualGaps = new Set(
                    findings
                        .filter((f) => f.id.startsWith("responsive:coverage-gap:"))
                        .map((f) => f.location),
                );

                expect(actualGaps).toEqual(expectedGaps);
                // Every coverage-gap Finding is a P1 on the layout dimension.
                for (const f of findings) {
                    if (f.id.startsWith("responsive:coverage-gap:")) {
                        expect(f.severity).toBe("P1");
                        expect(f.dimension).toBe("layout_responsive");
                    }
                }
            }),
            { numRuns: 200 },
        );
    });

    // Feature: page-forge-agent-system, Property 25: Overflow beyond viewport width is a P0
    // Validates: Requirements 10.2
    it("produces a P0 naming section+breakpoint iff scrollWidth > clientWidth", () => {
        fc.assert(
            fc.property(measurementsArb, (measurements) => {
                const { findings } = evaluateResponsive(measurements);

                const expected = new Set(
                    measurements
                        .filter((m) => m.scrollWidth > m.clientWidth)
                        .map((m) => key(m.sectionId, m.breakpoint)),
                );

                const overflow = findings.filter((f) =>
                    f.id.startsWith("responsive:overflow:"),
                );
                const actual = new Set(overflow.map((f) => f.location));

                expect(actual).toEqual(expected);
                for (const f of overflow) {
                    expect(f.severity).toBe("P0");
                    expect(f.dimension).toBe("layout_responsive");
                }
            }),
            { numRuns: 200 },
        );
    });

    // Feature: page-forge-agent-system, Property 26: Small touch targets on mobile are a P1
    // Validates: Requirements 10.3
    it("produces a P1 recording the target iff w<44 or h<44 at breakpoints 390 or 768", () => {
        fc.assert(
            fc.property(measurementsArb, (measurements) => {
                const { findings } = evaluateResponsive(measurements);

                // Expected touch-target Finding ids: mobile breakpoints only, per
                // target index that is below the 44px minimum.
                const expected = new Set<string>();
                for (const m of measurements) {
                    if (!MOBILE.includes(m.breakpoint)) continue;
                    m.touchTargets.forEach((t, index) => {
                        if (t.w < 44 || t.h < 44) {
                            expected.add(
                                `responsive:touch-target:${m.sectionId}:${m.breakpoint}:${index}`,
                            );
                        }
                    });
                }

                const touch = findings.filter((f) =>
                    f.id.startsWith("responsive:touch-target:"),
                );
                const actual = new Set(touch.map((f) => f.id));

                expect(actual).toEqual(expected);
                for (const f of touch) {
                    expect(f.severity).toBe("P1");
                    expect(f.dimension).toBe("layout_responsive");
                }
            }),
            { numRuns: 200 },
        );
    });

    // Feature: page-forge-agent-system, Property 27: Chrome-before-content on collapse is a P1
    // Validates: Requirements 10.4
    it("produces a P1 at a collapsed breakpoint iff firstChromeIndex < firstPrimaryContentIndex", () => {
        fc.assert(
            fc.property(measurementsArb, (measurements) => {
                const { findings } = evaluateResponsive(measurements);

                const expected = new Set(
                    measurements
                        .filter(
                            (m) =>
                                m.columnsCollapsed &&
                                m.firstChromeIndex < m.firstPrimaryContentIndex,
                        )
                        .map((m) => key(m.sectionId, m.breakpoint)),
                );

                const chrome = findings.filter((f) =>
                    f.id.startsWith("responsive:chrome-before-content:"),
                );
                const actual = new Set(chrome.map((f) => f.location));

                expect(actual).toEqual(expected);
                for (const f of chrome) {
                    expect(f.severity).toBe("P1");
                    expect(f.dimension).toBe("layout_responsive");
                }
            }),
            { numRuns: 200 },
        );
    });

    // Feature: page-forge-agent-system, Property 28: Mobile-pinned chapter is a P0
    // Validates: Requirements 10.5
    it("produces a P0 iff pinnedAtBreakpoint is true at breakpoint 390 or 768", () => {
        fc.assert(
            fc.property(measurementsArb, (measurements) => {
                const { findings } = evaluateResponsive(measurements);

                const expected = new Set(
                    measurements
                        .filter(
                            (m) =>
                                MOBILE.includes(m.breakpoint) && m.pinnedAtBreakpoint,
                        )
                        .map((m) => key(m.sectionId, m.breakpoint)),
                );

                const pin = findings.filter((f) =>
                    f.id.startsWith("responsive:mobile-pin:"),
                );
                const actual = new Set(pin.map((f) => f.location));

                expect(actual).toEqual(expected);
                for (const f of pin) {
                    expect(f.severity).toBe("P0");
                    expect(f.dimension).toBe("layout_responsive");
                }
            }),
            { numRuns: 200 },
        );
    });

    // Feature: page-forge-agent-system, Property 29: Horizontal padding bounds
    // Validates: Requirements 10.6
    it("produces a P1 iff padding < min (16@390, 24 otherwise) or > 25% of the breakpoint width", () => {
        fc.assert(
            fc.property(measurementsArb, (measurements) => {
                const { findings } = evaluateResponsive(measurements);

                const violates = (m: ViewportMeasurement): boolean => {
                    const minPadding = m.breakpoint === 390 ? 16 : 24;
                    const maxPadding = m.breakpoint * 0.25;
                    return (
                        m.horizontalPaddingPx < minPadding ||
                        m.horizontalPaddingPx > maxPadding
                    );
                };

                const expected = new Set(
                    measurements
                        .filter(violates)
                        .map((m) => key(m.sectionId, m.breakpoint)),
                );

                const padding = findings.filter((f) =>
                    f.id.startsWith("responsive:padding:"),
                );
                const actual = new Set(padding.map((f) => f.location));

                expect(actual).toEqual(expected);
                for (const f of padding) {
                    expect(f.severity).toBe("P1");
                    expect(f.dimension).toBe("layout_responsive");
                }
            }),
            { numRuns: 200 },
        );
    });

    // Feature: page-forge-agent-system, Property 30: Layout responsive score range and P0 cap
    // Validates: Requirements 10.7
    it("keeps the score within [0,10] and <= 5.0 whenever any layout_responsive P0 is open", () => {
        fc.assert(
            fc.property(measurementsArb, (measurements) => {
                const { findings, score } = evaluateResponsive(measurements);

                expect(score).toBeGreaterThanOrEqual(0);
                expect(score).toBeLessThanOrEqual(10);

                const hasOpenP0 = findings.some(
                    (f) =>
                        f.severity === "P0" &&
                        f.open &&
                        f.dimension === "layout_responsive",
                );
                if (hasOpenP0) {
                    expect(score).toBeLessThanOrEqual(5.0);
                }
            }),
            { numRuns: 200 },
        );
    });
});
