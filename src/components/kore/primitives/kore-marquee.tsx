'use client';

import type { CSSProperties, ReactNode } from 'react';

import { useReducedMotion } from '../hooks/use-reduced-motion';
import { durations, easings } from '../tokens';

/**
 * Props for {@link KoreMarquee}.
 *
 * The marquee is a horizontally-scrolling track that loops seamlessly by
 * translating its content from `0%` to `-50%` via the `marqueeSlide`
 * keyframe (declared in `keyframes.css`). To make the `-50%` translate loop
 * seamlessly the track renders the supplied `children` twice — the second copy
 * is `aria-hidden` so assistive technology never reads duplicate content.
 */
export interface KoreMarqueeProps {
    /**
     * The marquee content. Pass the logo / item nodes once; the primitive
     * renders them inside two `.connect-logos-list` tracks (the real list plus
     * an `aria-hidden` clone) so the `-50%` translate loops with no jump.
     */
    readonly children: ReactNode;
    /**
     * Which `tokens.durations` leaf drives `animation-duration`. Mirrors the
     * Source_Document `[marquee-anim="20s"]` configuration by default
     * (`20s linear infinite`).
     */
    readonly durationToken?: keyof typeof durations;
    /** Optional extra class appended to the `.connect-logos-marquee` wrapper. */
    readonly className?: string;
    /** When `true`, hides the entire marquee from assistive technology. */
    readonly ariaHidden?: boolean;
}

/**
 * `KoreMarquee` — the `marqueeSlide` keyframe wrapper used by the Industry_Tabs
 * customer-logo strip (Requirement 20.3).
 *
 * Mirrors the Source_Document DOM exactly:
 *
 * ```html
 * <div class="connect-logos-marquee">
 *   <div marquee-anim="20s" class="connect-logos-marquee-track">
 *     <div class="connect-logos-list">…</div>
 *     <div class="connect-logos-list">…</div>
 *   </div>
 * </div>
 * ```
 *
 * The `marqueeSlide` keyframe lives in `keyframes.css`; the per-instance
 * `animation-duration` / `animation-timing-function` longhands are bound here
 * from Design_Tokens (no magic literals). The track keeps the source
 * `marquee-anim` attribute for DOM/visual parity, with its value also sourced
 * from the duration token.
 *
 * When Reduced_Motion is active the animation is held on its first frame via
 * `animation-play-state: paused` (Requirement 20.9).
 *
 * Requirements: 6.6, 20.3, 20.9
 */
export function KoreMarquee({
    children,
    durationToken = 'd20s',
    className,
    ariaHidden,
}: KoreMarqueeProps): React.JSX.Element {
    const prefersReducedMotion = useReducedMotion();

    const trackStyle: CSSProperties = {
        animationName: 'marqueeSlide',
        animationDuration: durations[durationToken],
        animationTimingFunction: easings.linear,
        animationIterationCount: 'infinite',
        animationPlayState: prefersReducedMotion ? 'paused' : 'running',
    };

    const wrapperClassName = className
        ? `connect-logos-marquee ${className}`
        : 'connect-logos-marquee';

    // `marquee-anim` is a Source_Document custom attribute (not in React's
    // intrinsic-element typings); spread it through a loose record so the DOM
    // output matches the source verbatim while its value stays token-bound.
    const marqueeAttr: Record<string, string> = {
        'marquee-anim': durations[durationToken],
    };

    return (
        <div className={wrapperClassName} aria-hidden={ariaHidden}>
            <div
                {...marqueeAttr}
                className="connect-logos-marquee-track"
                style={trackStyle}
            >
                <div className="connect-logos-list">{children}</div>
                <div className="connect-logos-list" aria-hidden="true">
                    {children}
                </div>
            </div>
        </div>
    );
}
