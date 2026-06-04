'use client';

import type {
    CSSProperties,
    KeyboardEvent as ReactKeyboardEvent,
    ReactNode,
} from 'react';

import { durations, easings } from '../tokens';

/**
 * `KoreTabStrip` — the shared, accessible tab-list primitive that powers every
 * tabbed section of the Kore.ai homepage: Industry_Tabs (Req 7.3, 7.4),
 * Business_Outcomes including the nested Artemis sub-tabs (Req 8.1, 8.4), and
 * Analyst_Recognition (Req 9.2, 9.6). It implements the WAI-ARIA Authoring
 * Practices Tab pattern: `role="tablist"`, one `role="tab"` per tab,
 * `aria-selected`, `aria-controls`, roving `tabindex`, and arrow/Home/End
 * keyboard navigation (Req 25.10). The matching `aria-labelledby` wiring lives
 * on the panel side in {@link KoreTabPanel}, which derives its ids from the
 * SAME {@link koreTabDomId} / {@link korePanelDomId} helpers exported here so
 * the tab↔panel pairing is guaranteed one-to-one.
 *
 * CONTROLLED COMPONENT (by design — see design.md `KoreTabStrip` and the
 * orchestrating sections):
 *   The active tab is owned by the PARENT section via the `active` +
 *   `onActivate` props, not by this primitive. This is deliberate: the
 *   consuming sections must react to activation beyond swapping panels —
 *   Business_Outcomes toggles `dark-mode` on `#explore-products` when the
 *   Artemis tab is active (Req 8.5–8.7) and replays a GSAP entrance timeline on
 *   sub-tab change, and Industry_Tabs / Analyst_Recognition swap the active
 *   Swiper / analyst card. A self-owned `useState` inside the strip could not
 *   drive those side effects, so the strip is fully controlled.
 *
 * RELATIONSHIP TO `use-tab-strip.ts`:
 *   `hooks/use-tab-strip.ts` is the UNCONTROLLED variant (it owns `active` via
 *   `useState`) and is exercised directly by the Property 4 invariant test
 *   (`tests/property/tab-strip.test.ts`). Per the task guidance we intentionally
 *   do NOT modify that hook; instead this primitive reimplements the same small
 *   ARIA + keyboard prop-building logic in a controlled fashion. The id-derivation
 *   scheme here is byte-identical to the hook's (`${base}-tab-${id}` /
 *   `${base}-panel-${id}`) so the two stay interchangeable and the documented
 *   invariant — exactly one `aria-selected="true"`, exactly one visible panel —
 *   holds identically here.
 *
 * ACTIVE-STATE STYLING (Req 7.3, 8.4, 9.2 — "active state styling via tokens"):
 *   Each tab mirrors the Source_Document `.tab-btn` class verbatim so the
 *   upstream stylesheet's tab styling continues to apply, and the active tab
 *   additionally carries the source `active` modifier class plus
 *   `aria-selected="true"`. The transition timing is token-bound (no magic
 *   literals): {@link TAB_TRANSITION} reads `durations.dDot3s` / `easings.ease`,
 *   and `motion-reduce:transition-none` collapses the transition to an instant
 *   state change under Reduced_Motion.
 *
 * @typeParam T - The union of valid tab ids for this strip.
 */

/** A single tab descriptor: its stable id plus the rendered label content. */
export interface KoreTabDescriptor<T extends string> {
    /** Stable, unique-within-the-strip tab id. Drives the generated DOM ids. */
    readonly id: T;
    /** Visible label content for the tab (text, or markup with icons). */
    readonly label: ReactNode;
}

/** Render-state passed to the optional {@link KoreTabStripProps.renderTab}. */
export interface KoreTabRenderState {
    /** `true` when this tab is the currently active one. */
    readonly active: boolean;
}

export interface KoreTabStripProps<T extends string> {
    /** The ordered set of tabs, preserved in Source_Document DOM order. */
    readonly tabs: readonly KoreTabDescriptor<T>[];
    /** The currently active tab id (controlled by the parent section). */
    readonly active: T;
    /** Called with the id to activate on click or keyboard navigation. */
    readonly onActivate: (id: T) => void;
    /**
     * Stable prefix for the generated element ids. The matching
     * {@link KoreTabPanel}s MUST be given the same `idBase` so each tab's
     * `aria-controls` resolves to its panel and vice-versa.
     */
    readonly idBase: string;
    /** Accessible name for the `role="tablist"` container (Req 25.10). */
    readonly ariaLabel?: string;
    /** Extra classes appended to the source `tabs-menu` container token. */
    readonly className?: string;
    /**
     * Tab-list orientation. Defaults to `'horizontal'`; when set, the
     * container emits `aria-orientation`. Arrow keys navigate regardless.
     */
    readonly orientation?: 'horizontal';
    /**
     * Optional escape hatch to customise the INNER content of each tab button
     * (e.g. to add the Source_Document icon SVGs). The strip always owns the
     * surrounding `role="tab"` button and all ARIA / roving-tabindex wiring;
     * `renderTab` only supplies the children. Defaults to `tab.label`.
     */
    readonly renderTab?: (
        tab: KoreTabDescriptor<T>,
        state: KoreTabRenderState,
    ) => ReactNode;
}

/**
 * Compose the DOM id for a tab element. Shared with {@link KoreTabPanel} (via
 * its `aria-labelledby`) and identical to the scheme used by
 * `hooks/use-tab-strip.ts` so the controlled and uncontrolled variants line up.
 */
export function koreTabDomId(idBase: string, tabId: string): string {
    return `${idBase}-tab-${tabId}`;
}

/**
 * Compose the DOM id for a tab panel element. Shared with {@link KoreTabPanel}
 * (its `id`) and with each tab's `aria-controls`.
 */
export function korePanelDomId(idBase: string, tabId: string): string {
    return `${idBase}-panel-${tabId}`;
}

/**
 * Token-backed transition timing shared by every tab button. Only the timing
 * (duration + easing) lives here because it is independent of the active state;
 * the active end-state is toggled via the source `active` class + the upstream
 * stylesheet. Mirrors the homepage tab feel using the nearest Design_Tokens
 * (`durations.dDot3s` = `.3s`, `easings.ease`).
 */
const TAB_TRANSITION: CSSProperties = {
    transitionProperty: 'color, opacity, background-color, border-color',
    transitionDuration: durations.dDot3s,
    transitionTimingFunction: easings.ease,
};

/**
 * Resolve the next active index for a WAI-ARIA tab keyboard gesture, wrapping
 * around the ends. Returns `null` for keys that are not navigation keys so the
 * caller can let the event through untouched.
 */
function nextIndexForKey(
    key: string,
    currentIndex: number,
    count: number,
): number | null {
    switch (key) {
        case 'ArrowRight':
        case 'ArrowDown':
            return (currentIndex + 1) % count;
        case 'ArrowLeft':
        case 'ArrowUp':
            return (currentIndex - 1 + count) % count;
        case 'Home':
            return 0;
        case 'End':
            return count - 1;
        default:
            return null;
    }
}

export function KoreTabStrip<T extends string>({
    tabs,
    active,
    onActivate,
    idBase,
    ariaLabel,
    className,
    orientation = 'horizontal',
    renderTab,
}: KoreTabStripProps<T>): React.JSX.Element {
    const listClasses = ['tabs-menu', className].filter(Boolean).join(' ');

    const handleKeyDown = (
        event: ReactKeyboardEvent<HTMLButtonElement>,
        tabId: T,
    ): void => {
        const count = tabs.length;
        if (count === 0) {
            return;
        }

        // Origin is the tab that received the key event, not necessarily the
        // active one; fall back to 0 if the id is unexpectedly absent.
        const currentIndex = Math.max(
            tabs.findIndex((t) => t.id === tabId),
            0,
        );
        const nextIndex = nextIndexForKey(event.key, currentIndex, count);
        if (nextIndex === null) {
            return;
        }

        event.preventDefault();

        const nextId = tabs[nextIndex].id;
        onActivate(nextId);

        // Follow the active tab (automatic activation): move focus to the newly
        // activated tab. The element already exists in the DOM; roving tabindex
        // changes never add or remove nodes.
        if (typeof document !== 'undefined') {
            const nextEl = document.getElementById(
                koreTabDomId(idBase, nextId),
            );
            nextEl?.focus();
        }
    };

    return (
        <div
            role="tablist"
            aria-label={ariaLabel}
            aria-orientation={orientation}
            className={listClasses}
        >
            {tabs.map((tab) => {
                const isActive = tab.id === active;
                const tabClasses = ['tab-btn', isActive ? 'active' : null]
                    .filter(Boolean)
                    .join(' ');

                return (
                    <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        id={koreTabDomId(idBase, tab.id)}
                        aria-selected={isActive}
                        aria-controls={korePanelDomId(idBase, tab.id)}
                        tabIndex={isActive ? 0 : -1}
                        className={`${tabClasses} motion-reduce:transition-none`}
                        style={TAB_TRANSITION}
                        onClick={() => onActivate(tab.id)}
                        onKeyDown={(event) => handleKeyDown(event, tab.id)}
                    >
                        {renderTab
                            ? renderTab(tab, { active: isActive })
                            : tab.label}
                    </button>
                );
            })}
        </div>
    );
}
