'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import { useReducedMotion } from '../hooks/use-reduced-motion';
import { easings } from '../tokens';
import {
    LOADER_CROSSFADE_DURATION,
    LOADER_CROSSFADE_MS,
    LOADER_FIRST_LOGO_MS,
    LOADER_FORCE_COMPLETE_MS,
    loaderLogos,
    type LoaderLogo,
} from '../data/loader';

/**
 * `KoreLoader` — the Loader_Sequence (Requirement 17).
 *
 * Renders two stacked logo nodes mirroring the Source_Document state classes
 * `.loader.logo-1` and `.loader.logo-2`, then runs the first-paint reveal:
 *
 *   1. Apply `loading` to `<html>` within 1 animation frame (Req 17.1) so the
 *      source `html.loading { overflow:hidden; position:fixed; … }` rule locks
 *      scrolling (Req 17.2).
 *   2. Hold the first logo for the fixture duration `LOADER_FIRST_LOGO_MS`
 *      (700 ms, token-bound to `durations.dDot7s`; Req 17.3).
 *   3. Cross-fade to the second logo, completing within `LOADER_CROSSFADE_MS`
 *      (1000 ms, token-bound to `durations.d1s`; Req 17.4).
 *   4. Remove `loading`, apply `ready` within 1 frame, unmount (render null)
 *      (Req 17.5).
 *
 * A `LOADER_FORCE_COMPLETE_MS` (5000 ms) watchdog force-completes the sequence
 * if it has not finished, emitting no errors (Req 17.8 — behavioral constant,
 * see `data/loader.ts`).
 *
 * When Reduced_Motion is true the whole sequence is skipped: no `loading`
 * class is ever applied, `ready` is applied within 1 frame of mount, and the
 * loader renders null (Req 17.7).
 *
 * The `anti-flicker` class is NEVER applied to the document element at any
 * point in the loader lifecycle (Req 1.9 / 17.6).
 *
 * SSR-safe: the `loading` / `ready` classes are toggled ONLY inside `useEffect`
 * (never during render) so the server HTML and first client paint match.
 *
 * Requirements: 1.9, 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.7, 17.8
 */
export function KoreLoader(): React.JSX.Element | null {
    const prefersReducedMotion = useReducedMotion();

    // `null` until the post-mount effect decides; then either 'logo-1',
    // 'logo-2', or 'done' (which unmounts). Never read during the first paint
    // beyond the initial null so SSR/CSR markup agree.
    const [stage, setStage] = useState<'logo-1' | 'logo-2' | 'done' | null>(null);

    // Collect timers/rAF handles for deterministic cleanup on unmount.
    const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
    const framesRef = useRef<number[]>([]);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return;
        }

        const html = document.documentElement;
        let cancelled = false;

        const timers = timersRef.current;
        const frames = framesRef.current;

        const addTimer = (fn: () => void, ms: number): void => {
            timers.push(setTimeout(fn, ms));
        };
        const nextFrame = (fn: () => void): void => {
            frames.push(window.requestAnimationFrame(fn));
        };

        // Track whether the sequence has already settled so the 5000 ms
        // watchdog and the normal completion path don't double-apply (Req 17.8).
        let completed = false;
        const complete = (): void => {
            if (completed || cancelled) return;
            completed = true;
            // Remove `loading`, apply `ready` within 1 frame, then unmount.
            html.classList.remove('loading');
            nextFrame(() => {
                if (cancelled) return;
                html.classList.add('ready');
                setStage('done');
            });
        };

        // ── Reduced_Motion: skip the whole sequence (Req 17.7) ──────────────
        if (prefersReducedMotion) {
            // Never apply `loading`. Apply `ready` within 1 frame, render null.
            nextFrame(() => {
                if (cancelled) return;
                html.classList.add('ready');
                setStage('done');
            });
            return () => {
                cancelled = true;
                for (const t of timers) clearTimeout(t);
                for (const f of frames) window.cancelAnimationFrame(f);
                timers.length = 0;
                frames.length = 0;
            };
        }

        // ── Normal sequence ─────────────────────────────────────────────────
        // 1. Apply `loading` within 1 frame (Req 17.1, 17.2) and show logo 1.
        nextFrame(() => {
            if (cancelled) return;
            html.classList.add('loading');
            setStage('logo-1');
        });

        // 2. After the first-logo hold, begin the cross-fade to logo 2 (Req 17.4).
        addTimer(() => {
            if (cancelled) return;
            setStage('logo-2');
        }, LOADER_FIRST_LOGO_MS);

        // 3. Once the cross-fade window elapses, complete the sequence (Req 17.5).
        addTimer(() => {
            complete();
        }, LOADER_FIRST_LOGO_MS + LOADER_CROSSFADE_MS);

        // 4. Force-complete safeguard (Req 17.8). Whichever of (D + 1000) or
        //    5000 fires first wins; `complete()` is idempotent.
        addTimer(() => {
            complete();
        }, LOADER_FORCE_COMPLETE_MS);

        return () => {
            cancelled = true;
            for (const t of timers) clearTimeout(t);
            for (const f of frames) window.cancelAnimationFrame(f);
            timers.length = 0;
            frames.length = 0;
        };
        // `prefersReducedMotion` is read once on mount; if the OS preference
        // flips mid-sequence the running timers still honor their initial path.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prefersReducedMotion]);

    // Sequence finished (or skipped) → unmount the loader DOM nodes (Req 17.5).
    if (stage === 'done') {
        return null;
    }

    // SSR-safe defensive guard (design.md): the loader is a client-only
    // overlay; on the server there is nothing to render.
    if (typeof window === 'undefined') {
        return null;
    }

    // Compose the source state classes: `.loader` always, plus the active
    // stage modifier (`logo-1` / `logo-2`). `null` (pre-effect) renders the
    // bare `.loader` so the first client paint matches the SSR output.
    const stageClass = stage ? ` ${stage}` : '';
    const loaderClassName = `loader${stageClass}`;

    // Cross-fade transition bound to `durations.d1s` (Req 17.4) with the source
    // `ease-in-out` timing function from Design_Tokens — no magic literals.
    const fadeStyle: CSSProperties = {
        transition: `opacity ${LOADER_CROSSFADE_DURATION} ${easings.easeInOut}`,
    };

    return (
        <div className={loaderClassName} aria-hidden="true" role="presentation">
            {/* First logo — source rule `.loader.logo-1 > :nth-child(1)`. */}
            <div className="kore-logo-1" style={fadeStyle}>
                <LogoSvg logo={loaderLogos.logo1} />
            </div>
            {/* Second logo — source rule `.loader.logo-2 .kore-logo-2`. */}
            <div className="kore-logo-2" style={fadeStyle}>
                <LogoSvg logo={loaderLogos.logo2} />
            </div>
        </div>
    );
}

/**
 * Inline-SVG renderer for a single loader logo stage. Path data is copied
 * verbatim from Source_Document (`.nav-logo`); see `data/loader.ts`.
 */
function LogoSvg({ logo }: { readonly logo: LoaderLogo }): React.JSX.Element {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={logo.viewBox}
            fill="none"
            role="img"
            aria-label={logo.title}
        >
            {logo.paths.map((d) => (
                <path key={d} d={d} fill="currentColor" />
            ))}
        </svg>
    );
}
