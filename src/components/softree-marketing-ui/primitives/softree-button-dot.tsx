import type { CSSProperties } from 'react';

import { durations, easings } from '../tokens';

/**
 * `SoftreeButtonDot` — the dot-and-line CTA button used throughout the Softree
 * homepage (Source_Document `.button` with the `btn_dot-block` leading dot +
 * underline). It powers the Hero "Get a demo" / "Analyst Reports" CTAs
 * (Requirements 6.7, 6.8), the Strategic_Partners card CTAs (Requirements
 * 11.3, 11.5), and the generic button-dot hover treatment (Requirements 20.4,
 * 20.5).
 *
 * SERVER COMPONENT — intentionally NOT marked `'use client'`:
 *   - The dot/line hover is reproduced with pure CSS transitions (group-hover
 *     utilities + token-backed timing), so no browser-only API is referenced.
 *     Per Property 12 (design.md) a file carrying `'use client'` MUST reference
 *     a browser-only API; since this primitive needs none, the directive is
 *     deliberately omitted.
 *   - The optional `onClick` prop is a pass-through React event handler. This
 *     primitive is a "shared" component: when imported into a `'use client'`
 *     section tree (the common case for the interactive CTAs) the handler is
 *     wired client-side as normal. Consumers must only pass `onClick` from a
 *     client tree (a server-rendered ancestor cannot attach event handlers).
 *
 * DOM / CLASS PARITY (mirrored verbatim from Source_Document so the upstream
 * CDN stylesheet's `.button`, `.w-inline-block`, `.btn_dot-block`,
 * `.btn-dot`, `.btn_dot-line`, `.text-style-1line` rules continue to style the
 * element):
 *
 * ```html
 * <a class="button w-inline-block">
 *   <div class="text-style-1line">Get a demo</div>
 *   <div class="btn_dot-block">
 *     <div class="btn-dot-wrapper"><div class="btn-dot"></div></div>
 *     <div class="btn_dot-line-wrapper"><div class="btn_dot-line"></div></div>
 *   </div>
 * </a>
 * ```
 *
 * HOVER TRANSITIONS (Requirements 20.4, 20.5) — token-bound, no magic literals:
 *   - The dot fades opacity 0 → 1 on hover and back to 0 on leave.
 *   - The underline (`btn_dot-line`) fades out and translates by the
 *     `0.5rem` offset declared in the Source_Document GSAP timeline
 *     (`tokens.spacing.s0p5rem`, referenced via the `--spacing-s0p5rem`
 *     custom property in a Tailwind arbitrary utility) on hover, reversing on
 *     leave.
 *   - The transition-duration / transition-timing-function are read from
 *     `tokens.durations` / `tokens.easings` via inline style (they are
 *     hover-state-independent), while the hover end-states are toggled with
 *     `group-hover` utilities. `motion-reduce:transition-none` collapses the
 *     transition to an immediate state change when the user prefers reduced
 *     motion.
 *
 * VARIANTS (Source_Document `.button` modifier attributes):
 *   - `primary`   → the solid base button (no modifier attribute).
 *   - `secondary` → emits `is-ghost="1"`, activating the source
 *     `.button[is-ghost='1']` ghost treatment.
 */
export interface SoftreeButtonDotProps {
    /** Visible button text, rendered inside `.text-style-1line`. */
    readonly label: string;
    /** When provided, renders an `<a>` navigating to this destination. */
    readonly href?: string;
    /**
     * Click handler. Only attaches when this primitive renders inside a
     * `'use client'` ancestor tree (see the server-component note above).
     */
    readonly onClick?: () => void;
    /** Anchor `target` (e.g. `_blank`); only meaningful when `href` is set. */
    readonly target?: string;
    /** Anchor `rel` (e.g. `noopener noreferrer`); only meaningful with `href`. */
    readonly rel?: string;
    /**
     * Accessible name override. Optional here because `label` is visible text
     * that already supplies the accessible name; supply it only when the
     * accessible name must differ from the visible label.
     */
    readonly ariaLabel?: string;
    /**
     * Visual variant mapped to Source_Document `.button` modifiers.
     * Defaults to `'primary'` (solid base button).
     */
    readonly variant?: 'primary' | 'secondary';
    /** Extra classes appended after the source class tokens + utilities. */
    readonly className?: string;
}

/**
 * Token-backed transition timing shared by the dot and the underline.
 *
 * Only the timing (duration + easing) lives here because it is independent of
 * the `:hover` state; the animated end-states (opacity / transform) are
 * toggled via `group-hover` utility classes on each element. Mirrors the
 * Source_Document button hover feel using the nearest declared
 * Design_Tokens (`durations.dDot3s` = `.3s`, `easings.ease`).
 */
const DOT_LINE_TRANSITION: CSSProperties = {
    transitionProperty: 'opacity, transform',
    transitionDuration: durations.dDot3s,
    transitionTimingFunction: easings.ease,
};

export function SoftreeButtonDot({
    label,
    href,
    onClick,
    target,
    rel,
    ariaLabel,
    variant = 'primary',
    className,
}: SoftreeButtonDotProps): React.JSX.Element {
    const classes = ['button', 'w-inline-block', 'group/softree-btn', className]
        .filter(Boolean)
        .join(' ');

    // `is-ghost` is a Source_Document custom attribute (not in React's
    // intrinsic-element typings); spread it through a loose record so the DOM
    // output matches the source verbatim for the `secondary` variant.
    const variantAttrs: Record<string, string> =
        variant === 'secondary' ? { 'is-ghost': '1' } : {};

    const content = (
        <>
            <div className="text-style-1line">{label}</div>
            <div className="btn_dot-block">
                <div className="btn-dot-wrapper">
                    <div
                        className="btn-dot opacity-0 transition group-hover/softree-btn:opacity-100 motion-reduce:transition-none"
                        style={DOT_LINE_TRANSITION}
                    />
                </div>
                <div className="btn_dot-line-wrapper">
                    <div
                        className="btn_dot-line transition group-hover/softree-btn:opacity-0 group-hover/softree-btn:[transform:translateX(var(--spacing-s0p5rem))] motion-reduce:transition-none"
                        style={DOT_LINE_TRANSITION}
                    />
                </div>
            </div>
        </>
    );

    if (href) {
        return (
            <a
                className={classes}
                href={href}
                target={target}
                rel={rel}
                aria-label={ariaLabel}
                onClick={onClick}
                {...variantAttrs}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            type="button"
            className={classes}
            aria-label={ariaLabel}
            onClick={onClick}
            {...variantAttrs}
        >
            {content}
        </button>
    );
}
