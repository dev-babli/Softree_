/**
 * Page Forge — Performance rule evaluator (`perf-rules.ts`).
 *
 * A pure function that turns a single `PerfMeasurement` (captured by
 * `capture-perf.mjs` or derived by static inspection of the built source) into
 * a set of typed, `"performance"`-dimension Findings plus a `performance`
 * Score. It encodes the Performance_Checker rules from Requirement 12 exactly,
 * and because every rule here reflects a hard brand/stack constraint, each
 * violation is classified P0 (Req 17.8).
 *
 * Rules encoded (all P0 — ship-blocking):
 * - Req 12.1 / 17.4 — LCP text rendered at zero opacity while awaiting a loader.
 * - Req 12.2 / 17.2 — a scroll-linked animation drives an expensive property in
 *   the forbidden set {blur, backdrop-filter, top, height, width}. Only
 *   `transform` and `opacity` are cheap to animate; anything in the forbidden
 *   set forces layout/paint on the scroll thread.
 * - Req 12.3 — a GSAP animation or ScrollTrigger lacks cleanup on unmount
 *   (one Finding per leaking context).
 * - Req 12.4 — the page exceeds the Pin_Budget of one heavy ScrollTrigger pin.
 * - Req 12.5 — a global loader / page-transition framework is mounted on
 *   `src/app/layout.tsx` without an explicit Brief request.
 * - Req 12.6 / 17.3 — no Reduced_Motion path exists that renders an instant
 *   final state.
 *
 * Scoring model (Req 12.7):
 * - The score starts at `SCORE_MAX` (10.0) and each open Finding deducts a
 *   fixed amount by severity: P0 `P0_DEDUCTION`, P1 `P1_DEDUCTION`,
 *   P2 `P2_DEDUCTION`. The running total is floored at 0.
 * - The P0 cap: whenever any open P0 Finding exists the score is capped at
 *   `P0_SCORE_CAP` (5.0). Because every rule above is P0, any single violation
 *   both deducts and caps, so a page with any performance P0 can never score
 *   above 5.0.
 * - With no Findings the score is a clean 10.0.
 *
 * Every Finding id is a stable, deterministic string so the same measurement
 * always yields the same ids (important for de-duplication in `scoring.ts`).
 *
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 17.1, 17.2, 17.3, 17.4, 17.8
 */

import { BRAND_TOKENS, PIN_BUDGET } from "./constraints";
import type { Finding, PerfMeasurement, Score } from "./types";

// ---------------------------------------------------------------------------
// Forbidden scroll-linked properties (Req 12.2, 17.2)
// ---------------------------------------------------------------------------

/**
 * The expensive properties a scroll-linked animation must never drive. These
 * force layout (`top`, `height`, `width`) or costly paint/compositing
 * (`blur`, `backdrop-filter`) on the scroll thread. Only `transform` and
 * `opacity` are permitted for scroll-linked motion (Req 17.2).
 */
export const FORBIDDEN_SCROLL_PROPS = [
    "blur",
    "backdrop-filter",
    "top",
    "height",
    "width",
] as const;

export type ForbiddenScrollProp = (typeof FORBIDDEN_SCROLL_PROPS)[number];

// ---------------------------------------------------------------------------
// Scoring constants (Req 12.7)
// ---------------------------------------------------------------------------

/** The maximum performance score. */
const SCORE_MAX = 10.0;

/** The score ceiling forced whenever any open P0 Finding exists (Req 12.7). */
export const P0_SCORE_CAP = 5.0;

/** Per-severity score deduction applied for each open Finding. */
export const P0_DEDUCTION = 3.0;
export const P1_DEDUCTION = 1.5;
export const P2_DEDUCTION = 0.5;

// ---------------------------------------------------------------------------
// Evaluation
// ---------------------------------------------------------------------------

/**
 * Evaluate a `PerfMeasurement` into typed Findings and a `performance` Score.
 *
 * Pure: given the same measurement it always returns the same Findings (with
 * stable ids) and the same score. All Findings are on the `"performance"`
 * dimension and open. See the module doc for the rule and scoring model.
 */
export function evaluatePerformance(m: PerfMeasurement): {
    findings: Finding[];
    score: Score;
} {
    const findings: Finding[] = [];

    // Req 12.1 / 17.4 — LCP text hidden at zero opacity under a loader.
    if (m.lcpElementOpacityZeroUnderLoader) {
        findings.push({
            id: "perf-lcp-opacity-zero-under-loader",
            severity: "P0",
            dimension: "performance",
            message:
                "LCP text is rendered at zero opacity while awaiting a loader; " +
                "the largest contentful element must be visible on first paint.",
            open: true,
        });
    }

    // Req 12.2 / 17.2 — scroll-linked animation drives an expensive property.
    for (const prop of matchedForbiddenProps(m.scrollLinkedProps)) {
        findings.push({
            id: `perf-scroll-linked-prop:${prop}`,
            severity: "P0",
            dimension: "performance",
            message:
                `A scroll-linked animation drives the expensive property "${prop}". ` +
                "Only transform and opacity may be animated on scroll.",
            location: prop,
            open: true,
        });
    }

    // Req 12.3 — GSAP / ScrollTrigger contexts without cleanup on unmount.
    for (const context of dedupePreserveOrder(m.gsapContextsWithoutCleanup)) {
        findings.push({
            id: `perf-gsap-no-cleanup:${context}`,
            severity: "P0",
            dimension: "performance",
            message:
                `GSAP animation or ScrollTrigger "${context}" lacks cleanup on unmount; ` +
                "every context must be reverted/killed to avoid motion leaks.",
            location: context,
            open: true,
        });
    }

    // Req 12.4 — Pin_Budget exceeded (more than one heavy pin).
    if (m.heavyPinCount > PIN_BUDGET) {
        findings.push({
            id: "perf-pin-budget-exceeded",
            severity: "P0",
            dimension: "performance",
            message:
                `The page uses ${m.heavyPinCount} heavy ScrollTrigger pins but the ` +
                `Pin_Budget is ${PIN_BUDGET}.`,
            open: true,
        });
    }

    // Req 12.5 — global loader / transition mounted on the root layout.
    if (m.globalLayoutHijack) {
        findings.push({
            id: "perf-global-layout-hijack",
            severity: "P0",
            dimension: "performance",
            message:
                "A global loader or page-transition framework is mounted on " +
                "src/app/layout.tsx without an explicit Brief request.",
            file: "src/app/layout.tsx",
            open: true,
        });
    }

    // Req 12.6 / 17.3 — a Reduced_Motion instant-final-state path must exist.
    if (!m.reducedMotionPathPresent) {
        findings.push({
            id: "perf-reduced-motion-path-missing",
            severity: "P0",
            dimension: "performance",
            message:
                "No Reduced_Motion path exists; prefers-reduced-motion must render " +
                "an instant final state for every animated element.",
            open: true,
        });
    }

    return { findings, score: scoreFromFindings(findings) };
}

// ---------------------------------------------------------------------------
// Palette restriction (Req 17.1)
// ---------------------------------------------------------------------------

/**
 * The set of allowed brand color tokens, flattened from `BRAND_TOKENS` and
 * lowercased for case-insensitive comparison. The `ink` field is an array, so
 * it is spread into individual entries; every other field is a single string.
 */
const BRAND_TOKEN_COLORS: ReadonlySet<string> = new Set(
    [
        BRAND_TOKENS.accent,
        BRAND_TOKENS.cream,
        ...BRAND_TOKENS.ink,
        BRAND_TOKENS.white,
    ].map((color) => color.toLowerCase()),
);

/**
 * Evaluate a list of colors against the locked Brand_Tokens palette (Req 17.1).
 *
 * Pure: returns one P0 `"performance"`-dimension Finding for every color that
 * is not exactly (case-insensitively) one of the Brand_Tokens color values.
 * Forbidden palettes (purple AI gradients, cyan cyberpunk palettes, rainbow
 * gradients) are simply colors outside the brand set, so any such color yields
 * a violation. A color that matches a brand token — regardless of letter case —
 * never produces a Finding. The comparison trims surrounding whitespace only;
 * it does not otherwise normalize color notation.
 */
export function evaluatePalette(colors: string[]): Finding[] {
    const findings: Finding[] = [];
    for (const color of colors) {
        const normalized = color.trim().toLowerCase();
        if (!BRAND_TOKEN_COLORS.has(normalized)) {
            findings.push({
                id: `perf-palette-non-brand-token:${color}`,
                severity: "P0",
                dimension: "performance",
                message:
                    `The color "${color}" is not a Brand_Token; the palette is ` +
                    "restricted to the locked Softree brand tokens.",
                location: color,
                open: true,
            });
        }
    }
    return findings;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Normalize a raw scroll-linked property token to a canonical forbidden-prop
 * name, or `null` when it is not in the forbidden set.
 *
 * Handles the variants the capture layer may emit, e.g. `"filter"` and
 * `"filter: blur(4px)"` both normalize to `"blur"`, `"backdropFilter"` and
 * `"backdrop-filter"` both normalize to `"backdrop-filter"`, and layout
 * properties (`top`/`height`/`width`) match after lowercasing and trimming any
 * value suffix.
 */
function normalizeScrollProp(raw: string): ForbiddenScrollProp | null {
    // Strip any value (everything after ':') and surrounding whitespace, then
    // lowercase for case-insensitive matching.
    const head = raw.split(":")[0]?.trim().toLowerCase() ?? "";
    // Collapse camelCase (backdropFilter) to kebab-case (backdrop-filter).
    const kebab = head.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

    // `blur` and any `filter`/`filter: blur()` usage map to the blur category.
    if (kebab === "blur" || kebab === "filter" || kebab.startsWith("blur(")) {
        return "blur";
    }
    if (kebab === "backdrop-filter" || kebab.startsWith("backdrop-filter(")) {
        return "backdrop-filter";
    }
    if (kebab === "top") {
        return "top";
    }
    if (kebab === "height") {
        return "height";
    }
    if (kebab === "width") {
        return "width";
    }
    return null;
}

/**
 * Return the distinct forbidden properties referenced by the scroll-linked
 * props, in first-seen canonical order. Duplicates and variants that map to the
 * same canonical prop collapse to a single entry so each forbidden prop yields
 * exactly one Finding.
 */
function matchedForbiddenProps(props: string[]): ForbiddenScrollProp[] {
    const seen = new Set<ForbiddenScrollProp>();
    const ordered: ForbiddenScrollProp[] = [];
    for (const raw of props) {
        const canonical = normalizeScrollProp(raw);
        if (canonical !== null && !seen.has(canonical)) {
            seen.add(canonical);
            ordered.push(canonical);
        }
    }
    return ordered;
}

/** De-duplicate string entries while preserving first-seen order. */
function dedupePreserveOrder(entries: string[]): string[] {
    const seen = new Set<string>();
    const ordered: string[] = [];
    for (const entry of entries) {
        if (!seen.has(entry)) {
            seen.add(entry);
            ordered.push(entry);
        }
    }
    return ordered;
}

/**
 * Derive the performance score from the open Findings using the fixed
 * per-severity deduction scheme, then apply the open-P0 cap (Req 12.7).
 */
function scoreFromFindings(findings: Finding[]): Score {
    let score = SCORE_MAX;
    let hasOpenP0 = false;

    for (const finding of findings) {
        if (!finding.open) {
            continue;
        }
        switch (finding.severity) {
            case "P0":
                score -= P0_DEDUCTION;
                hasOpenP0 = true;
                break;
            case "P1":
                score -= P1_DEDUCTION;
                break;
            case "P2":
                score -= P2_DEDUCTION;
                break;
        }
    }

    if (score < 0) {
        score = 0;
    }
    if (hasOpenP0 && score > P0_SCORE_CAP) {
        score = P0_SCORE_CAP;
    }

    return roundToOneDecimal(score);
}

/** Round a score to one decimal place, avoiding negative-zero output. */
function roundToOneDecimal(value: number): Score {
    const rounded = Math.round(value * 10) / 10;
    return rounded === 0 ? 0 : rounded;
}
