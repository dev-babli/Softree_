'use client';

import { useRef, type CSSProperties } from 'react';

import { useReducedMotion } from '../hooks/use-reduced-motion';
import { useRiveBlock } from '../hooks/use-rive-block';
import { durations, easings } from '../tokens';

/**
 * Minimal poster shape consumed by {@link SoftreeRiveCanvas}.
 *
 * The Hero and Business_Outcomes call sites derive this from an
 * `Asset_Manifest` entry's local `fallback` / `posterFallback` `AssetRef`
 * (`url`) plus the human-readable `alt` text, so only the two fields the
 * primitive actually needs are surfaced here.
 */
export interface SoftreeRiveCanvasPoster {
    /** Static poster image URL (the Rive `.riv`'s Local_Asset fallback). */
    readonly url: string;
    /** Accessible description of the artwork the poster/canvas depicts. */
    readonly alt: string;
}

/**
 * Props for {@link SoftreeRiveCanvas}.
 */
export interface SoftreeRiveCanvasProps {
    /**
     * The `.riv` source URL (CDN passthrough) for this Rive_Canvas_Block,
     * taken from `Asset_Manifest`. Forwarded verbatim to {@link useRiveBlock}.
     */
    readonly riveSrc: string;
    /**
     * Static fallback poster rendered immediately and kept visible underneath
     * the canvas. Stays on screen whenever the Rive load fails or times out
     * (Req 6.9, 26.5).
     */
    readonly poster: SoftreeRiveCanvasPoster;
    /** Extra classes appended to the positioning wrapper. */
    readonly className?: string;
    /** Extra classes appended after the source `rive-canvas` class token. */
    readonly canvasClassName?: string;
    /**
     * Intrinsic canvas/poster width in pixels (the Rive draw-buffer resolution
     * and the poster's intrinsic-aspect-ratio hint). Display size is driven by
     * the wrapper, so this only sets the underlying buffer / aspect ratio.
     */
    readonly width?: number;
    /** Intrinsic canvas/poster height in pixels (see {@link width}). */
    readonly height?: number;
    /**
     * Accessible name for the block. When provided it overrides the poster's
     * own `alt`, so the artwork is announced exactly once (the canvas overlay
     * is always `aria-hidden`, being a decorative duplicate of the poster).
     */
    readonly ariaLabel?: string;
}

/**
 * `SoftreeRiveCanvas` — the poster-backed `@rive-app/canvas` mount used by every
 * Rive_Canvas_Block in the Hero product cards (Req 6.4, 6.5, 6.9) and the
 * Business_Outcomes tab panels (Req 8.10).
 *
 * Rendering model (mirrors the Source_Document `[data-rive-src]` block while
 * keeping the layout fully self-contained so it never depends on the upstream
 * `!important` positioning rules):
 *   - The poster `<img>` is rendered immediately and stays in normal flow, so
 *     it both establishes the block's size and remains visible before — and
 *     after — the canvas loads (Req 6.4: each block starts at canvas opacity 0;
 *     Req 6.9: the poster is the permanent fallback).
 *   - A `<canvas>` overlay is absolutely positioned over the poster at
 *     `opacity: 0`. The lazy mount itself is owned by {@link useRiveBlock},
 *     which only loads the runtime + `.riv` once the canvas approaches the
 *     viewport (Req 27.6) and races a 10 s timeout (Req 6.9, 26.5).
 *
 * Load lifecycle → opacity:
 *   - `idle` / `loading` / `error` → canvas held at `opacity: 0`; the poster
 *     stays visible. On `error` (load failure or 10 s timeout) the canvas
 *     element is left in the DOM but invisible so layout stays stable and zero
 *     unhandled errors are emitted (Req 6.9, 8.10, 26.5).
 *   - `loaded` → canvas transitions `opacity` 0 → 1 over 350 ms
 *     (`durations.d0p35s`) after the first frame paints, matching the inline
 *     `transition: opacity 0.35s` rule on Source_Document `.rive-canvas`
 *     elements (Req 6.5). All timing is token-bound — no magic literals.
 *
 * Reduced_Motion: forwarded to {@link useRiveBlock}, which holds the animation
 * on its first frame (Req 6.10, 8.11). The reveal transition is additionally
 * collapsed to `0s` so the canvas swaps in without an opacity tween.
 *
 * Accessibility: the poster `<img>` carries the accessible name (`ariaLabel`
 * when supplied, otherwise `poster.alt`); the canvas overlay is `aria-hidden`
 * so assistive technology never announces the decorative duplicate.
 *
 * Requirements: 6.4, 6.5, 6.9, 8.10, 26.5
 */
export function SoftreeRiveCanvas({
    riveSrc,
    poster,
    className,
    canvasClassName,
    width,
    height,
    ariaLabel,
}: SoftreeRiveCanvasProps): React.JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const prefersReducedMotion = useReducedMotion();
    const { status } = useRiveBlock({
        canvasRef,
        src: riveSrc,
        reducedMotion: prefersReducedMotion,
    });

    const isLoaded = status === 'loaded';

    const wrapperClassName = ['rive-canvas-block', className]
        .filter(Boolean)
        .join(' ');

    const canvasClasses = ['rive-canvas', canvasClassName]
        .filter(Boolean)
        .join(' ');

    const wrapperStyle: CSSProperties = {
        position: 'relative',
    };

    // Poster sits in normal flow: it sizes the wrapper and is the permanent
    // fallback that stays visible under the canvas (Req 6.9).
    const posterStyle: CSSProperties = {
        display: 'block',
        width: '100%',
        height: 'auto',
    };

    // Canvas overlays the poster, hidden until the first frame paints. The
    // reveal duration/easing are token-bound (Req 6.5); Reduced_Motion swaps
    // it in immediately instead of tweening.
    const canvasStyle: CSSProperties = {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: isLoaded ? 1 : 0,
        transitionProperty: 'opacity',
        transitionDuration: prefersReducedMotion ? durations.d0s : durations.d0p35s,
        transitionTimingFunction: easings.ease,
        willChange: 'opacity',
    };

    return (
        <div className={wrapperClassName} style={wrapperStyle}>
            <img
                src={poster.url}
                alt={ariaLabel ?? poster.alt}
                width={width}
                height={height}
                style={posterStyle}
            />
            <canvas
                ref={canvasRef}
                className={canvasClasses}
                width={width}
                height={height}
                aria-hidden="true"
                style={canvasStyle}
            />
        </div>
    );
}
