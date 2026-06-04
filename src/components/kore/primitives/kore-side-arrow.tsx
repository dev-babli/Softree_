'use client';

import type { CSSProperties } from 'react';

import { useReducedMotion } from '../hooks/use-reduced-motion';
import { durations } from '../tokens';

/**
 * Props for {@link KoreSideArrow}.
 */
export interface KoreSideArrowProps {
    /** Optional extra class appended to the `.side-arrows` wrapper. */
    readonly className?: string;
    /**
     * Accessible name for the scroll indicator. When provided, the wrapper is
     * exposed to assistive technology with this label; when omitted the arrows
     * are treated as decorative (`aria-hidden`).
     */
    readonly ariaLabel?: string;
}

/**
 * Two staggered child animation delays declared in Source_Document for the
 * `.side-arrow:nth-child(1)` / `:nth-child(2)` rules, sourced from
 * Design_Tokens so no magic literals appear at the call site:
 *   - first arrow:  0s   (`durations.d0s`)
 *   - second arrow: 0.3s (`durations.d0p3s`)
 */
const ARROW_DELAY_TOKENS: ReadonlyArray<keyof typeof durations> = ['d0s', 'd0p3s'];

/**
 * `KoreSideArrow` — the `sideArrowFlow` keyframe child used by the Hero side
 * scroll indicator (Requirement 20.6).
 *
 * Mirrors the Source_Document DOM exactly:
 *
 * ```html
 * <div class="side-arrows">
 *   <span class="side-arrow"></span>
 *   <span class="side-arrow"></span>
 * </div>
 * ```
 *
 * The `sideArrowFlow` keyframe lives in `keyframes.css`. Each `.side-arrow`
 * runs the animation for `1.5s` (`durations.d1p5s`) with an `infinite`
 * iteration count and the staggered `0s` / `0.3s` per-child delays declared in
 * Source_Document — all bound here from Design_Tokens.
 *
 * When Reduced_Motion is active the animation is held on its first frame via
 * `animation-play-state: paused` (Requirement 20.9).
 *
 * Requirements: 20.6, 20.9
 */
export function KoreSideArrow({
    className,
    ariaLabel,
}: KoreSideArrowProps): React.JSX.Element {
    const prefersReducedMotion = useReducedMotion();

    const wrapperClassName = className ? `side-arrows ${className}` : 'side-arrows';

    return (
        <div
            className={wrapperClassName}
            aria-label={ariaLabel}
            aria-hidden={ariaLabel ? undefined : true}
        >
            {ARROW_DELAY_TOKENS.map((delayToken) => {
                const style: CSSProperties = {
                    animationName: 'sideArrowFlow',
                    animationDuration: durations.d1p5s,
                    animationIterationCount: 'infinite',
                    animationDelay: durations[delayToken],
                    animationPlayState: prefersReducedMotion ? 'paused' : 'running',
                };

                return <span key={delayToken} className="side-arrow" style={style} />;
            })}
        </div>
    );
}
