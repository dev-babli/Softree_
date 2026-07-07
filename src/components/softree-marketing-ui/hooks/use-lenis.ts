'use client';

import { useEffect, useRef, type MutableRefObject } from 'react';
import Lenis, { type EasingFunction } from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { tokens } from '../tokens';
import { useReducedMotion } from './use-reduced-motion';

/**
 * Smooth-scroll orchestration hook (Lenis_Scroller + GSAP ticker sync).
 *
 * Owned by the root client page composer (`kore-page.tsx`) so cleanup is correct
 * when the route is navigated away from (Requirement 19.11). One — and only one —
 * `Lenis` instance drives the document scroll for the Clone_Page lifetime.
 *
 * SOURCE_DOCUMENT FIDELITY NOTE:
 *   The Source_Document's inline orchestration script instantiates Lenis with
 *   `new t.Lenis` — i.e. *no* explicit options, relying entirely on Lenis
 *   defaults (lerp-based smoothing, `smoothWheel: true`, `syncTouch: false`,
 *   vertical orientation/gesture). Per design.md "Smooth Scroll and Animation
 *   Orchestration", we pass those values explicitly and bind `duration`/`easing`
 *   to Design_Tokens so the config is auditable and token-covered rather than
 *   relying on opaque library defaults.
 *
 * LENIS 1.3 API NOTE:
 *   The installed runtime is `lenis@^1.3`, which renamed the legacy v0/v1 option
 *   names used in older sketches:
 *     - `direction`        -> `orientation`        ('vertical')
 *     - `gestureDirection` -> `gestureOrientation` ('vertical')
 *     - `smoothTouch`      -> `syncTouch`           (false)
 *   `smoothWheel`, `duration`, and `easing` are unchanged. We use the 1.3 names
 *   so the call site type-checks against the installed declarations.
 *
 * Requirements: 19.1, 19.2, 19.3, 19.11, 19.12, 26.6
 */

// ---------------------------------------------------------------------------
// Module-level shared accessor
// ---------------------------------------------------------------------------
// The active Lenis instance is exposed through a module-level ref so that
// components outside the hook's own tree (e.g. KoreFooter's back-to-top control,
// task 16.2) can imperatively call `lenis.scrollTo(...)` without prop drilling
// or a dedicated context. It is `null` whenever smooth scrolling is disabled
// (Reduced_Motion, missing rAF, or a Lenis construction failure → native scroll).
let activeLenis: Lenis | null = null;

/**
 * Returns the currently active Lenis instance, or `null` when smooth scrolling
 * is not running (Reduced_Motion, no `requestAnimationFrame`, or instantiation
 * failed and the page fell back to native scroll). Callers MUST handle `null`
 * and degrade to native APIs such as `window.scrollTo`.
 */
export function getLenis(): Lenis | null {
    return activeLenis;
}

// ---------------------------------------------------------------------------
// cubic-bezier -> JS easing function
// ---------------------------------------------------------------------------
// Design_Tokens store easings as CSS `cubic-bezier(x1, y1, x2, y2)` strings, but
// Lenis expects a JS `EasingFunction` of shape `(t: number) => number`. We parse
// the token and build an evaluator using the standard parametric cubic-bezier
// timing-function technique (the same approach browsers use for CSS easing):
// solve for the curve parameter `t` such that the X component equals the input
// progress, then return the Y component. Newton-Raphson with a bisection
// fallback keeps the solve fast and numerically stable.

/** Parse a CSS `cubic-bezier(x1, y1, x2, y2)` string into its four control values. */
function parseCubicBezier(value: string): [number, number, number, number] | null {
    const match = /cubic-bezier\(([^)]+)\)/.exec(value);
    if (!match) {
        return null;
    }
    const parts = match[1].split(',').map((part) => Number.parseFloat(part.trim()));
    if (parts.length !== 4 || parts.some((part) => Number.isNaN(part))) {
        return null;
    }
    return [parts[0], parts[1], parts[2], parts[3]];
}

/** Build a JS easing function from cubic-bezier control points P1(x1,y1), P2(x2,y2). */
function cubicBezierEasing(x1: number, y1: number, x2: number, y2: number): EasingFunction {
    // Polynomial coefficients for the parametric bezier (P0 = 0, P3 = 1).
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;

    const sampleX = (t: number): number => ((ax * t + bx) * t + cx) * t;
    const sampleY = (t: number): number => ((ay * t + by) * t + cy) * t;
    const sampleDerivativeX = (t: number): number => (3 * ax * t + 2 * bx) * t + cx;

    const solveForT = (x: number): number => {
        // Newton-Raphson: usually converges within a few iterations.
        let guess = x;
        for (let i = 0; i < 8; i += 1) {
            const error = sampleX(guess) - x;
            if (Math.abs(error) < 1e-6) {
                return guess;
            }
            const derivative = sampleDerivativeX(guess);
            if (Math.abs(derivative) < 1e-6) {
                break;
            }
            guess -= error / derivative;
        }
        // Bisection fallback when the derivative is too flat for Newton's method.
        let lower = 0;
        let upper = 1;
        guess = x;
        while (lower < upper) {
            const estimate = sampleX(guess);
            if (Math.abs(estimate - x) < 1e-6) {
                return guess;
            }
            if (x > estimate) {
                lower = guess;
            } else {
                upper = guess;
            }
            guess = (lower + upper) / 2;
        }
        return guess;
    };

    return (time: number): number => {
        if (time <= 0) {
            return 0;
        }
        if (time >= 1) {
            return 1;
        }
        return sampleY(solveForT(time));
    };
}

/** Convert a CSS time token (e.g. `'1.2s'`, `'200ms'`) to a duration in seconds. */
function parseDurationSeconds(value: string): number {
    const trimmed = value.trim();
    if (trimmed.endsWith('ms')) {
        return Number.parseFloat(trimmed) / 1000;
    }
    return Number.parseFloat(trimmed);
}

// Token-bound Lenis configuration values.
//   - `LENIS_DURATION`: 1.2s, the canonical Lenis scroll duration, read from the
//     `1.2s` duration token rather than written as a magic number (Token_Coverage).
//   - `LENIS_EASING`: derived from `tokens.easings.lenis`
//     (cubic-bezier(0.165, 0.84, 0.44, 1) — easeOutQuart). Falls back to
//     `undefined` (Lenis default easing) if the token can ever fail to parse.
const LENIS_DURATION = parseDurationSeconds(tokens.durations.d1p2s);
const LENIS_EASING_POINTS = parseCubicBezier(tokens.easings.lenis);
const LENIS_EASING: EasingFunction | undefined = LENIS_EASING_POINTS
    ? cubicBezierEasing(
        LENIS_EASING_POINTS[0],
        LENIS_EASING_POINTS[1],
        LENIS_EASING_POINTS[2],
        LENIS_EASING_POINTS[3],
    )
    : undefined;

// Register the ScrollTrigger plugin once at module scope. This is safe in a
// client component: the module is only evaluated in the browser bundle, and the
// hook body that actually touches the DOM runs inside `useEffect`.
gsap.registerPlugin(ScrollTrigger);

/**
 * Instantiates Lenis, syncs it to the GSAP ticker, and tears everything down on
 * unmount. Returns a ref to the live Lenis instance (or `null` when smooth
 * scrolling is disabled) for callers that prefer a React ref over `getLenis()`.
 *
 * Behavior:
 *   - Reduced_Motion true, OR `requestAnimationFrame` unavailable, OR
 *     `new Lenis(...)` throws  ->  skip instantiation and fall back to native
 *     scrolling (Requirements 19.12, 26.6). The returned ref stays `null`.
 *   - Otherwise: drive `lenis.raf(time * 1000)` from the GSAP ticker (the ticker
 *     reports seconds, Lenis expects milliseconds) and disable lag smoothing so
 *     scroll stays in lockstep with ScrollTrigger updates (Requirements 19.1-19.3).
 *   - Cleanup kills every ScrollTrigger, removes the ticker callback, and
 *     destroys the Lenis instance (Requirement 19.11).
 *
 * Re-runs if the Reduced_Motion preference changes at runtime, tearing down or
 * (re)instantiating Lenis to match the new preference.
 */
export function useLenis(): MutableRefObject<Lenis | null> {
    const prefersReducedMotion = useReducedMotion();
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Req 19.12 / 26.6: honor Reduced_Motion — native scrolling only.
        if (prefersReducedMotion) {
            return;
        }

        // Req: skip when there is no animation clock to drive the rAF loop
        // (non-browser runtime or an environment without requestAnimationFrame).
        if (typeof window === 'undefined' || typeof window.requestAnimationFrame !== 'function') {
            return;
        }

        // Req: a Lenis construction failure must degrade gracefully to native
        // scroll rather than crash the page.
        let lenis: Lenis;
        try {
            lenis = new Lenis({
                duration: LENIS_DURATION, // tokens.durations.d1p2s (1.2s)
                easing: LENIS_EASING, // tokens.easings.lenis (cubic-bezier easeOutQuart)
                smoothWheel: true,
                syncTouch: false, // Lenis 1.3 rename of legacy `smoothTouch: false`
                orientation: 'vertical', // Lenis 1.3 rename of legacy `direction`
                gestureOrientation: 'vertical', // Lenis 1.3 rename of legacy `gestureDirection`
            });
        } catch {
            // Fall back to native scroll; leave the shared accessor null.
            return;
        }

        lenisRef.current = lenis;
        activeLenis = lenis;

        // Sync Lenis to the GSAP ticker. The ticker callback receives time in
        // seconds; Lenis.raf expects milliseconds (Requirement 19.1).
        const onTick = (time: number): void => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(onTick);
        gsap.ticker.lagSmoothing(0);

        return () => {
            // Req 19.11: full teardown so a route change leaves no dangling
            // ScrollTriggers, ticker callbacks, or scroll hijacking.
            gsap.ticker.remove(onTick);
            ScrollTrigger.getAll().forEach((trigger) => {
                trigger.kill();
            });
            lenis.destroy();
            if (activeLenis === lenis) {
                activeLenis = null;
            }
            lenisRef.current = null;
        };
    }, [prefersReducedMotion]);

    return lenisRef;
}
