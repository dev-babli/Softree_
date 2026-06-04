'use client';

import { useId, useState, type CSSProperties, type ReactNode } from 'react';

import { durations, easings } from '../tokens';

/**
 * `KoreAccordionRow` — the CSS-only collapsible row used by the Navigation
 * Mobile_Drawer sub-menus (Requirement 5.11) and the Footer link columns at
 * ≤767 px (Requirement 14.6).
 *
 * MARKED `'use client'`: the primitive owns the open/close state and wires the
 * click + keyboard toggle. The expand/collapse animation itself is pure CSS —
 * it is driven entirely by the attribute selectors declared in
 * `keyframes.css`, so this component only has to emit DOM those selectors
 * match.
 *
 * DOM / ATTRIBUTE PARITY (mirrors Source_Document so the rules in
 * `keyframes.css` apply verbatim):
 *
 * ```html
 * <div data-accordion-list="css">                    <!-- container -->
 *   <div data-accordion="active|not-active">          <!-- the row -->
 *     <button data-accordion-toggle aria-expanded aria-controls>
 *       …heading…
 *       <svg class="accordion-icon|accordion-cross-icon" />
 *     </button>
 *     <div data-accordion-body role="region" aria-labelledby>
 *       <div>…children…</div>                          <!-- overflow-hidden -->
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * The selectors in `keyframes.css` that this markup satisfies:
 *   - `[data-accordion-list="css"] [data-accordion-body]`
 *       → `display: grid; grid-template-rows: 0fr` (collapsed)
 *   - `[data-accordion-list="css"] [data-accordion="active"] [data-accordion-body]`
 *       → `grid-template-rows: 1fr` (expanded)
 *   - the `grid-template-rows` transition is declared there as
 *     `0.6s cubic-bezier(0.625, 0.05, 0, 1)` (= `durations.d0p6s` +
 *     `easings.silk`) — Requirements 3.6, 20.7.
 *   - `[data-accordion="active"] .accordion-icon` → `rotate(180deg)` and
 *     `[data-accordion="active"] .accordion-cross-icon` → `rotate(45deg)`
 *     (Requirement 20.8).
 *
 * The `0fr → 1fr` grid trick only visually clips its content when the body's
 * inner child carries `overflow: hidden`; that wrapper is rendered here.
 *
 * `keyframes.css` declares the end-state rotations for the icons but no
 * `transition` for them, so the token-bound `transform` transition is supplied
 * here (matching the grid timing — `durations.d0p6s` + `easings.silk`) so the
 * icon rotates smoothly rather than snapping. No magic literals are used.
 *
 * CONTROLLED vs UNCONTROLLED:
 *   - Controlled: pass `open` (and usually `onToggle`). The row reflects `open`
 *     and never stores its own state. Used by the Navigation Mobile_Drawer,
 *     which coordinates sibling rows.
 *   - Uncontrolled: omit `open`; the row seeds from `defaultOpen` and manages
 *     its own state. Used by the Footer's independent column accordions.
 *   In both modes `onToggle(next)` fires with the requested next open value.
 *
 * ACCESSIBILITY (Requirement 25.x disclosure pattern):
 *   - The trigger is a native `<button>` (Enter / Space toggle for free) with
 *     `aria-expanded` reflecting state and `aria-controls` pointing at the body.
 *   - The body carries a matching `id`, `role="region"`, and `aria-labelledby`
 *     referencing the trigger. While collapsed it is `inert` + `aria-hidden`,
 *     removing the clipped content from the tab order and accessibility tree
 *     without `display:none` (which would defeat the grid animation).
 */
export interface KoreAccordionRowProps {
    /** The always-visible header content rendered inside the trigger button. */
    readonly heading: ReactNode;
    /** The collapsible body content. */
    readonly children: ReactNode;
    /**
     * Initial open state for UNCONTROLLED usage. Ignored when `open` is
     * provided. Defaults to `false` (collapsed).
     */
    readonly defaultOpen?: boolean;
    /**
     * Controlled open state. When provided, the row reflects this value and
     * does not keep its own state; supply `onToggle` to react to user intent.
     */
    readonly open?: boolean;
    /** Fired with the requested next open value on every user toggle. */
    readonly onToggle?: (open: boolean) => void;
    /** Extra classes appended to the outer `data-accordion-list` container. */
    readonly className?: string;
    /**
     * Base used to derive the trigger / body element ids (`<idBase>-header`,
     * `<idBase>-body`). When omitted a stable `useId()` value is used so SSR
     * and client markup agree.
     */
    readonly idBase?: string;
    /**
     * Which icon to render in the trigger:
     *   - `'chevron'` (default) → `.accordion-icon`, rotates 180° when active.
     *   - `'cross'`             → `.accordion-cross-icon`, rotates 45° (+ → ×).
     */
    readonly icon?: 'chevron' | 'cross';
}

/**
 * Token-bound transform transition for the trigger icon. The grid transition
 * lives in `keyframes.css`; this mirrors its timing for the icon rotation,
 * which `keyframes.css` leaves un-transitioned. Reading from Design_Tokens
 * keeps the call site free of magic literals.
 */
const ICON_TRANSITION: CSSProperties = {
    transitionProperty: 'transform',
    transitionDuration: durations.d0p6s,
    transitionTimingFunction: easings.silk,
};

function AccordionIcon({
    icon,
}: {
    readonly icon: 'chevron' | 'cross';
}): React.JSX.Element {
    // `aria-hidden` — the icon is decorative; the button's text supplies its
    // accessible name and `aria-expanded` conveys state.
    if (icon === 'cross') {
        return (
            <svg
                className="accordion-cross-icon"
                style={ICON_TRANSITION}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
                focusable="false"
            >
                <line x1="10" y1="4" x2="10" y2="16" />
                <line x1="4" y1="10" x2="16" y2="10" />
            </svg>
        );
    }

    return (
        <svg
            className="accordion-icon"
            style={ICON_TRANSITION}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            <polyline points="5,8 10,13 15,8" />
        </svg>
    );
}

export function KoreAccordionRow({
    heading,
    children,
    defaultOpen = false,
    open,
    onToggle,
    className,
    idBase,
    icon = 'chevron',
}: KoreAccordionRowProps): React.JSX.Element {
    const generatedId = useId();
    const base = idBase ?? generatedId;
    const headerId = `${base}-header`;
    const bodyId = `${base}-body`;

    const isControlled = open !== undefined;
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const active = isControlled ? open : internalOpen;

    const handleToggle = (): void => {
        const next = !active;
        if (!isControlled) {
            setInternalOpen(next);
        }
        onToggle?.(next);
    };

    const containerClassName = className
        ? `kore-accordion-row ${className}`
        : 'kore-accordion-row';

    // `data-accordion-list` / `data-accordion` / `data-accordion-toggle` /
    // `data-accordion-body` are Source_Document custom attributes that the
    // `keyframes.css` selectors target; they are not in React's intrinsic
    // typings, so they are emitted as plain `data-*` attributes.
    return (
        <div data-accordion-list="css" className={containerClassName}>
            <div data-accordion={active ? 'active' : 'not-active'}>
                <button
                    type="button"
                    data-accordion-toggle=""
                    id={headerId}
                    aria-expanded={active}
                    aria-controls={bodyId}
                    onClick={handleToggle}
                    className="kore-accordion-row__trigger"
                >
                    <span className="kore-accordion-row__heading">{heading}</span>
                    <AccordionIcon icon={icon} />
                </button>
                <div
                    data-accordion-body=""
                    id={bodyId}
                    role="region"
                    aria-labelledby={headerId}
                    aria-hidden={!active}
                    inert={!active}
                >
                    <div className="kore-accordion-row__content overflow-hidden">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
