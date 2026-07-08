import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
    evaluatePerformance,
    evaluatePalette,
    FORBIDDEN_SCROLL_PROPS,
} from "../perf-rules";
import { BRAND_TOKENS, PIN_BUDGET } from "../constraints";
import type { Finding, PerfMeasurement } from "../types";

/**
 * Property tests for the Performance rule evaluator (`perf-rules.ts`).
 *
 * These properties pin the observable behavior of `evaluatePerformance` and the
 * pure `evaluatePalette` helper against the Performance_Checker constraints from
 * Requirements 12 and 17. Every performance constraint violation is a P0
 * (ship-blocking) Finding, so the properties assert both the presence/absence of
 * the specific Finding ids and their severity.
 */

// ---------------------------------------------------------------------------
// Shared arbitraries
// ---------------------------------------------------------------------------

// Canonical forbidden props and their observable variants (accounting for the
// normalization performed by perf-rules: "filter"/"blur(...)" -> blur,
// camelCase backdropFilter -> backdrop-filter, case-insensitive).
const forbiddenPropVariantArb = fc.constantFrom<string>(
    "blur",
    "BLUR",
    "filter",
    "filter: blur(4px)",
    "blur(8px)",
    "backdrop-filter",
    "backdropFilter",
    "backdrop-filter: blur(2px)",
    "top",
    "TOP",
    "top: 40px",
    "height",
    "height: 200px",
    "width",
    "width: 50%",
);

// Tokens that are NOT in the forbidden set and must never yield a Finding.
const allowedPropArb = fc.constantFrom<string>(
    "transform",
    "opacity",
    "translateY",
    "scale",
    "color",
    "background",
    "",
    "rotate",
);

const scrollLinkedPropsArb: fc.Arbitrary<string[]> = fc.array(
    fc.oneof(forbiddenPropVariantArb, allowedPropArb),
    { maxLength: 8 },
);

const gsapContextsArb: fc.Arbitrary<string[]> = fc.array(
    fc.string({ maxLength: 20 }),
    { maxLength: 6 },
);

// A full PerfMeasurement arbitrary that exercises both triggering and
// non-triggering states of every field.
const perfMeasurementArb: fc.Arbitrary<PerfMeasurement> = fc.record({
    lcpMs: fc.option(fc.integer({ min: 0, max: 10000 }), { nil: undefined }),
    lcpElementOpacityZeroUnderLoader: fc.boolean(),
    scrollLinkedProps: scrollLinkedPropsArb,
    gsapContextsWithoutCleanup: gsapContextsArb,
    heavyPinCount: fc.integer({ min: 0, max: 5 }),
    globalLayoutHijack: fc.boolean(),
    reducedMotionPathPresent: fc.boolean(),
});

// Independent re-derivation of the distinct forbidden props a scroll-linked
// prop list references, mirroring perf-rules' normalization.
function expectedForbiddenProps(props: string[]): Set<string> {
    const out = new Set<string>();
    for (const raw of props) {
        const head = raw.split(":")[0]?.trim().toLowerCase() ?? "";
        const kebab = head.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        if (kebab === "blur" || kebab === "filter" || kebab.startsWith("blur(")) {
            out.add("blur");
        } else if (
            kebab === "backdrop-filter" ||
            kebab.startsWith("backdrop-filter(")
        ) {
            out.add("backdrop-filter");
        } else if (kebab === "top") {
            out.add("top");
        } else if (kebab === "height") {
            out.add("height");
        } else if (kebab === "width") {
            out.add("width");
        }
    }
    return out;
}

function findingsById(findings: Finding[], id: string): Finding[] {
    return findings.filter((f) => f.id === id);
}

describe("perf-rules — performance rule evaluator", () => {
    // 9.2 --------------------------------------------------------------------
    // Feature: page-forge-agent-system, Property 14: Pin budget is at most one across story, map, and build
    it("Property 14: pin-budget-exceeded P0 iff heavyPinCount > PIN_BUDGET", () => {
        // Validates: Requirements 6.4, 7.8, 12.4
        expect(PIN_BUDGET).toBe(1);
        fc.assert(
            fc.property(perfMeasurementArb, (m) => {
                const { findings } = evaluatePerformance(m);
                const matches = findingsById(findings, "perf-pin-budget-exceeded");
                if (m.heavyPinCount > PIN_BUDGET) {
                    expect(matches).toHaveLength(1);
                    expect(matches[0].severity).toBe("P0");
                    expect(matches[0].dimension).toBe("performance");
                } else {
                    expect(matches).toHaveLength(0);
                }
            }),
            { numRuns: 200 },
        );
    });

    // 9.3 --------------------------------------------------------------------
    // Feature: page-forge-agent-system, Property 32: LCP text is never hidden under a loader
    it("Property 32: lcp-opacity-zero-under-loader P0 iff the flag is set", () => {
        // Validates: Requirements 12.1, 17.4
        fc.assert(
            fc.property(perfMeasurementArb, (m) => {
                const { findings } = evaluatePerformance(m);
                const matches = findingsById(
                    findings,
                    "perf-lcp-opacity-zero-under-loader",
                );
                if (m.lcpElementOpacityZeroUnderLoader) {
                    expect(matches).toHaveLength(1);
                    expect(matches[0].severity).toBe("P0");
                    expect(matches[0].dimension).toBe("performance");
                } else {
                    expect(matches).toHaveLength(0);
                }
            }),
            { numRuns: 200 },
        );
    });

    // 9.4 --------------------------------------------------------------------
    // Feature: page-forge-agent-system, Property 33: Scroll-linked expensive properties are a P0
    it("Property 33: one P0 per distinct forbidden scroll-linked prop", () => {
        // Validates: Requirements 12.2
        fc.assert(
            fc.property(perfMeasurementArb, (m) => {
                const { findings } = evaluatePerformance(m);
                const expected = expectedForbiddenProps(m.scrollLinkedProps);

                const scrollFindings = findings.filter((f) =>
                    f.id.startsWith("perf-scroll-linked-prop:"),
                );
                // Every forbidden canonical prop yields exactly one P0 Finding.
                const producedProps = new Set(
                    scrollFindings.map((f) => f.id.slice("perf-scroll-linked-prop:".length)),
                );
                expect(producedProps).toEqual(expected);
                expect(scrollFindings).toHaveLength(expected.size);
                for (const f of scrollFindings) {
                    expect(f.severity).toBe("P0");
                    expect(f.dimension).toBe("performance");
                    expect(FORBIDDEN_SCROLL_PROPS).toContain(
                        f.id.slice("perf-scroll-linked-prop:".length) as never,
                    );
                }
            }),
            { numRuns: 200 },
        );
    });

    // 9.5 --------------------------------------------------------------------
    // Feature: page-forge-agent-system, Property 34: GSAP without cleanup is a P0
    it("Property 34: one P0 per distinct GSAP context without cleanup", () => {
        // Validates: Requirements 12.3
        fc.assert(
            fc.property(perfMeasurementArb, (m) => {
                const { findings } = evaluatePerformance(m);
                const distinctContexts = new Set(m.gsapContextsWithoutCleanup);

                const gsapFindings = findings.filter((f) =>
                    f.id.startsWith("perf-gsap-no-cleanup:"),
                );
                const producedContexts = new Set(
                    gsapFindings.map((f) => f.id.slice("perf-gsap-no-cleanup:".length)),
                );
                expect(producedContexts).toEqual(distinctContexts);
                expect(gsapFindings).toHaveLength(distinctContexts.size);
                for (const f of gsapFindings) {
                    expect(f.severity).toBe("P0");
                    expect(f.dimension).toBe("performance");
                }
                // A P0 exists iff the list is non-empty.
                expect(gsapFindings.length > 0).toBe(
                    m.gsapContextsWithoutCleanup.length > 0,
                );
            }),
            { numRuns: 200 },
        );
    });

    // 9.6 --------------------------------------------------------------------
    // Feature: page-forge-agent-system, Property 35: Reduced-motion path exists for every animated element
    it("Property 35: reduced-motion-path-missing P0 iff no reduced-motion path", () => {
        // Validates: Requirements 12.6, 17.3
        fc.assert(
            fc.property(perfMeasurementArb, (m) => {
                const { findings } = evaluatePerformance(m);
                const matches = findingsById(
                    findings,
                    "perf-reduced-motion-path-missing",
                );
                if (!m.reducedMotionPathPresent) {
                    expect(matches).toHaveLength(1);
                    expect(matches[0].severity).toBe("P0");
                    expect(matches[0].dimension).toBe("performance");
                } else {
                    expect(matches).toHaveLength(0);
                }
            }),
            { numRuns: 200 },
        );
    });

    // 9.7 --------------------------------------------------------------------
    // Feature: page-forge-agent-system, Property 36: Only transform and opacity are animated
    it("Property 36: a Finding is produced iff an animated property is outside {transform, opacity}", () => {
        // Validates: Requirements 17.2
        //
        // The observable channel for "animated properties" in a PerfMeasurement is
        // `scrollLinkedProps`. Only transform and opacity are permitted; any
        // animated property in the forbidden set {blur, backdrop-filter, top,
        // height, width} must produce a scroll-linked-prop Finding. So the
        // presence of any scroll-linked-prop Finding is equivalent to at least one
        // animated property being outside the allowed set.
        fc.assert(
            fc.property(perfMeasurementArb, (m) => {
                const { findings } = evaluatePerformance(m);
                const scrollFindings = findings.filter((f) =>
                    f.id.startsWith("perf-scroll-linked-prop:"),
                );
                const anyForbidden = expectedForbiddenProps(m.scrollLinkedProps).size > 0;
                expect(scrollFindings.length > 0).toBe(anyForbidden);
                for (const f of scrollFindings) {
                    expect(f.severity).toBe("P0");
                }
            }),
            { numRuns: 200 },
        );
    });

    // 9.8 --------------------------------------------------------------------
    // Feature: page-forge-agent-system, Property 37: Palette is restricted to Brand_Tokens
    it("Property 37: evaluatePalette flags a P0 iff a color is not a Brand_Token", () => {
        // Validates: Requirements 17.1
        const brandColors = [
            BRAND_TOKENS.accent,
            BRAND_TOKENS.cream,
            ...BRAND_TOKENS.ink,
            BRAND_TOKENS.white,
        ];
        const brandColorSet = new Set(brandColors.map((c) => c.toLowerCase()));

        // Brand colors, sometimes with case/whitespace variation, plus forbidden
        // palettes (purple/cyan/rainbow gradients) as non-brand colors.
        const brandColorArb = fc
            .constantFrom(...brandColors)
            .chain((c) =>
                fc.constantFrom(c, c.toUpperCase(), `  ${c}  `, c.toLowerCase()),
            );
        const forbiddenColorArb = fc.constantFrom<string>(
            "#8b5cf6", // purple
            "#a855f7", // purple
            "purple",
            "#22d3ee", // cyan
            "cyan",
            "linear-gradient(90deg, red, orange, yellow, green, blue)", // rainbow
            "#00ff00",
            "#123456",
            "rebeccapurple",
        );
        const colorArb = fc.oneof(brandColorArb, forbiddenColorArb);

        fc.assert(
            fc.property(fc.array(colorArb, { maxLength: 10 }), (colors) => {
                const findings = evaluatePalette(colors);
                const expectedViolations = colors.filter(
                    (c) => !brandColorSet.has(c.trim().toLowerCase()),
                );
                expect(findings).toHaveLength(expectedViolations.length);
                for (const f of findings) {
                    expect(f.severity).toBe("P0");
                    expect(f.dimension).toBe("performance");
                }
                // Non-brand colors are flagged; brand colors (any case) are not.
                for (const c of colors) {
                    const isBrand = brandColorSet.has(c.trim().toLowerCase());
                    const flagged = findings.some((f) => f.location === c);
                    expect(flagged).toBe(!isBrand);
                }
            }),
            { numRuns: 200 },
        );
    });

    // 9.9 --------------------------------------------------------------------
    // Feature: page-forge-agent-system, Property 49: Constraint violations are always classified P0
    it("Property 49: every Finding from evaluatePerformance has severity P0", () => {
        // Validates: Requirements 17.8
        fc.assert(
            fc.property(perfMeasurementArb, (m) => {
                const { findings } = evaluatePerformance(m);
                for (const f of findings) {
                    expect(f.severity).toBe("P0");
                    expect(f.dimension).toBe("performance");
                }
            }),
            { numRuns: 200 },
        );
    });
});
