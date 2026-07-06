/**
 * Page Forge — Responsive rule evaluator (`responsive-rules.ts`).
 *
 * A pure function that turns rendered viewport measurements into typed
 * `layout_responsive` Findings with fixed severities, encoding Requirement 10
 * exactly. Given the same measurements it always returns the same Findings and
 * the same score, and it never performs IO.
 *
 * The Responsive_Checker (Req 9, 10, 11) captures a `ViewportMeasurement` per
 * section per breakpoint (via `capture-viewport.mjs`, or by inspection when
 * Puppeteer is absent) and feeds the array here. The returned Findings and score
 * are what the checker records in `05b-RESPONSIVE.md`.
 *
 * Encoded rules (Req 10):
 * - 10.1 Coverage: every section is expected at each of the four Breakpoints
 *   390, 768, 1024, 1440. A section that is missing a measurement at a
 *   breakpoint yields a P1 coverage-gap Finding (responsiveness at that
 *   breakpoint could not be verified).
 * - 10.2 Overflow: `scrollWidth > clientWidth` at any breakpoint → P0, naming
 *   the affected section and breakpoint.
 * - 10.3 Touch targets: an interactive target whose width or height is below
 *   44 CSS pixels at the mobile Breakpoints 390 or 768 → P1.
 * - 10.4 Chrome-before-content: at a breakpoint where columns collapse, chrome
 *   ordered before primary content (`firstChromeIndex < firstPrimaryContentIndex`)
 *   → P1.
 * - 10.5 Mobile-pinned chapter: the pinned scroll chapter still pinned at the
 *   mobile Breakpoints 390 or 768 → P0.
 * - 10.6 Horizontal padding bounds: below 16px at 390, below 24px at
 *   768/1024/1440, or above 25% of the breakpoint width at any breakpoint → P1.
 * - 10.7 Score: `layout_responsive` on a 0..10 scale, derived from the Findings,
 *   and capped at 5.0 whenever any P0 Finding for the dimension is open.
 *
 * Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7
 */

import { BREAKPOINTS } from "./constraints";
import type { Dimension, Finding, Score, ViewportMeasurement } from "./types";

/** Every Finding produced by this evaluator is on the layout dimension. */
const DIMENSION: Dimension = "layout_responsive";

/** The mobile Breakpoints where touch-target and pin rules apply (Req 10.3, 10.5). */
const MOBILE_BREAKPOINTS: readonly number[] = [390, 768];

/** Minimum interactive touch-target size in CSS pixels (Req 10.3). */
const MIN_TOUCH_TARGET_PX = 44;

/** Minimum horizontal padding at the 390 Breakpoint (Req 10.6). */
const MIN_PADDING_MOBILE_PX = 16;

/** Minimum horizontal padding at the 768/1024/1440 Breakpoints (Req 10.6). */
const MIN_PADDING_DESKTOP_PX = 24;

/** Maximum horizontal padding as a fraction of the breakpoint width (Req 10.6). */
const MAX_PADDING_FRACTION = 0.25;

// ---------------------------------------------------------------------------
// Score deduction scheme (Req 10.7)
// ---------------------------------------------------------------------------

/** The maximum (perfect) `layout_responsive` score. */
const SCORE_MAX = 10.0;

/**
 * The hard ceiling applied to the score when any P0 Finding for the dimension
 * is open (Req 10.7). A broken/overflowing/mobile-pinned layout can never score
 * above this regardless of how few other Findings exist.
 */
export const P0_SCORE_CAP = 5.0;

/**
 * Per-severity deductions applied to the starting score of 10.
 *
 * The score starts at a perfect 10 and each open Finding subtracts its
 * severity's deduction; the running total is clamped to `[0, 10]` and then, if
 * any P0 Finding is open, capped at {@link P0_SCORE_CAP}. P0 deductions are
 * large so even a single ship-blocker drives the score well down before the cap
 * is applied; P1 deductions accumulate visible-quality gaps. (Closed Findings do
 * not deduct.)
 */
export const SCORE_DEDUCTIONS = {
    P0: 4.0,
    P1: 1.0,
} as const;

// ---------------------------------------------------------------------------
// Coverage (Req 10.1)
// ---------------------------------------------------------------------------

/** A single (section, breakpoint) coverage cell. */
export interface CoverageCell {
    sectionId: string;
    breakpoint: number;
}

/**
 * The full set of measurements a responsive evaluation expects: every section
 * at each of the four Breakpoints (Req 10.1). Sections are emitted in the order
 * given; breakpoints follow the canonical `BREAKPOINTS` order.
 *
 * Exposed so the checker/capture layer and tests share one definition of "every
 * section at every breakpoint".
 */
export function expectedCoverage(sectionIds: readonly string[]): CoverageCell[] {
    const cells: CoverageCell[] = [];
    for (const sectionId of sectionIds) {
        for (const breakpoint of BREAKPOINTS) {
            cells.push({ sectionId, breakpoint });
        }
    }
    return cells;
}

/**
 * The distinct section ids present in `measurements`, in first-seen order.
 */
function distinctSections(measurements: readonly ViewportMeasurement[]): string[] {
    const seen = new Set<string>();
    const ordered: string[] = [];
    for (const m of measurements) {
        if (!seen.has(m.sectionId)) {
            seen.add(m.sectionId);
            ordered.push(m.sectionId);
        }
    }
    return ordered;
}

// ---------------------------------------------------------------------------
// Rule evaluation
// ---------------------------------------------------------------------------

/**
 * Evaluate every viewport measurement against the Requirement 10 responsive
 * rules and produce the typed Findings plus the `layout_responsive` score.
 *
 * Every returned Finding is on the `layout_responsive` dimension, is `open`, and
 * carries a stable, unique id derived from its rule, section, and breakpoint (so
 * re-running on the same measurements yields identical ids). The score is
 * computed from the Findings per {@link SCORE_DEDUCTIONS} and capped per
 * {@link P0_SCORE_CAP} (Req 10.7).
 */
export function evaluateResponsive(measurements: ViewportMeasurement[]): {
    findings: Finding[];
    score: Score;
} {
    const findings: Finding[] = [];

    // 10.1 Coverage: expect every observed section at all four breakpoints.
    const sections = distinctSections(measurements);
    const present = new Set(
        measurements.map((m) => coverageKey(m.sectionId, m.breakpoint)),
    );
    for (const cell of expectedCoverage(sections)) {
        if (!present.has(coverageKey(cell.sectionId, cell.breakpoint))) {
            findings.push(makeCoverageGapFinding(cell.sectionId, cell.breakpoint));
        }
    }

    // Per-measurement rules (Req 10.2–10.6).
    for (const m of measurements) {
        collectMeasurementFindings(m, findings);
    }

    return { findings, score: scoreFromFindings(findings) };
}

/**
 * Append every Finding a single measurement triggers (Req 10.2–10.6) to
 * `findings`.
 */
function collectMeasurementFindings(
    m: ViewportMeasurement,
    findings: Finding[],
): void {
    const { sectionId, breakpoint } = m;
    const isMobile = MOBILE_BREAKPOINTS.includes(breakpoint);

    // 10.2 Overflow beyond viewport width → P0.
    if (m.scrollWidth > m.clientWidth) {
        findings.push({
            id: `responsive:overflow:${sectionId}:${breakpoint}`,
            severity: "P0",
            dimension: DIMENSION,
            message:
                `Section "${sectionId}" overflows the viewport at ${breakpoint}px ` +
                `(scrollWidth ${m.scrollWidth} > clientWidth ${m.clientWidth}).`,
            location: `${sectionId}@${breakpoint}`,
            open: true,
        });
    }

    // 10.5 Mobile-pinned chapter → P0.
    if (isMobile && m.pinnedAtBreakpoint) {
        findings.push({
            id: `responsive:mobile-pin:${sectionId}:${breakpoint}`,
            severity: "P0",
            dimension: DIMENSION,
            message:
                `Pinned scroll chapter "${sectionId}" remains pinned / scroll-hijacked ` +
                `at the mobile ${breakpoint}px breakpoint.`,
            location: `${sectionId}@${breakpoint}`,
            open: true,
        });
    }

    // 10.3 Small touch targets on mobile → P1.
    if (isMobile) {
        m.touchTargets.forEach((target, index) => {
            if (target.w < MIN_TOUCH_TARGET_PX || target.h < MIN_TOUCH_TARGET_PX) {
                findings.push({
                    id: `responsive:touch-target:${sectionId}:${breakpoint}:${index}`,
                    severity: "P1",
                    dimension: DIMENSION,
                    message:
                        `Touch target "${target.selector}" in section "${sectionId}" measures ` +
                        `${target.w}x${target.h}px at ${breakpoint}px (below the ` +
                        `${MIN_TOUCH_TARGET_PX}x${MIN_TOUCH_TARGET_PX}px minimum).`,
                    location: `${sectionId}@${breakpoint}:${target.selector}`,
                    open: true,
                });
            }
        });
    }

    // 10.4 Chrome-before-content on collapse → P1.
    if (m.columnsCollapsed && m.firstChromeIndex < m.firstPrimaryContentIndex) {
        findings.push({
            id: `responsive:chrome-before-content:${sectionId}:${breakpoint}`,
            severity: "P1",
            dimension: DIMENSION,
            message:
                `Section "${sectionId}" places chrome (index ${m.firstChromeIndex}) before ` +
                `primary content (index ${m.firstPrimaryContentIndex}) when columns collapse ` +
                `at ${breakpoint}px.`,
            location: `${sectionId}@${breakpoint}`,
            open: true,
        });
    }

    // 10.6 Horizontal padding bounds → P1.
    const paddingViolation = paddingViolationReason(m.horizontalPaddingPx, breakpoint);
    if (paddingViolation) {
        findings.push({
            id: `responsive:padding:${sectionId}:${breakpoint}`,
            severity: "P1",
            dimension: DIMENSION,
            message:
                `Section "${sectionId}" horizontal padding ${m.horizontalPaddingPx}px at ` +
                `${breakpoint}px ${paddingViolation}.`,
            location: `${sectionId}@${breakpoint}`,
            open: true,
        });
    }
}

/**
 * Describe why a horizontal padding value violates the Req 10.6 bounds for the
 * given breakpoint, or return `null` when it is within bounds.
 *
 * Lower bound: 16px at 390, 24px at 768/1024/1440.
 * Upper bound: at most 25% of the breakpoint width at every breakpoint.
 */
function paddingViolationReason(
    paddingPx: number,
    breakpoint: number,
): string | null {
    const minPadding =
        breakpoint === 390 ? MIN_PADDING_MOBILE_PX : MIN_PADDING_DESKTOP_PX;
    if (paddingPx < minPadding) {
        return `is below the ${minPadding}px minimum`;
    }

    const maxPadding = breakpoint * MAX_PADDING_FRACTION;
    if (paddingPx > maxPadding) {
        return `exceeds ${Math.round(MAX_PADDING_FRACTION * 100)}% of the ${breakpoint}px width (max ${maxPadding}px)`;
    }

    return null;
}

/** Build the coverage-gap Finding for a missing (section, breakpoint) cell. */
function makeCoverageGapFinding(sectionId: string, breakpoint: number): Finding {
    return {
        id: `responsive:coverage-gap:${sectionId}:${breakpoint}`,
        severity: "P1",
        dimension: DIMENSION,
        message:
            `No viewport measurement for section "${sectionId}" at the ${breakpoint}px ` +
            `breakpoint; responsiveness there could not be verified.`,
        location: `${sectionId}@${breakpoint}`,
        open: true,
    };
}

/** Coverage-set key for a (section, breakpoint) pair. */
function coverageKey(sectionId: string, breakpoint: number): string {
    return `${sectionId}@${breakpoint}`;
}

// ---------------------------------------------------------------------------
// Scoring (Req 10.7)
// ---------------------------------------------------------------------------

/**
 * Derive the `layout_responsive` score from the Findings (Req 10.7).
 *
 * Start at a perfect {@link SCORE_MAX}, subtract each open Finding's severity
 * deduction ({@link SCORE_DEDUCTIONS}), clamp to `[0, 10]`, then cap at
 * {@link P0_SCORE_CAP} whenever any P0 Finding for the dimension is open. The
 * result is rounded to one decimal to match the rubric scale.
 */
export function scoreFromFindings(findings: Finding[]): Score {
    let score = SCORE_MAX;
    let hasOpenP0 = false;

    for (const finding of findings) {
        if (!finding.open) {
            continue;
        }
        if (finding.severity === "P0") {
            hasOpenP0 = true;
            score -= SCORE_DEDUCTIONS.P0;
        } else if (finding.severity === "P1") {
            score -= SCORE_DEDUCTIONS.P1;
        }
    }

    // Clamp into range before the P0 cap.
    score = Math.min(SCORE_MAX, Math.max(0, score));

    if (hasOpenP0) {
        score = Math.min(score, P0_SCORE_CAP);
    }

    return roundToOneDecimal(score);
}

/** Round a score to one decimal place, avoiding negative-zero output. */
function roundToOneDecimal(value: number): Score {
    const rounded = Math.round(value * 10) / 10;
    return rounded === 0 ? 0 : rounded;
}
