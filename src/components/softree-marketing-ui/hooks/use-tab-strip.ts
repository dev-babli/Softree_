'use client';

import {
    useCallback,
    useId,
    useState,
    type KeyboardEvent as ReactKeyboardEvent,
} from 'react';

/**
 * Props applied to a tab element (`role="tab"`) per the WAI-ARIA Authoring
 * Practices Tab pattern. Spread directly onto the clickable tab node.
 */
export interface TabProps {
    readonly role: 'tab';
    readonly id: string;
    readonly 'aria-selected': boolean;
    readonly 'aria-controls': string;
    /** Roving tabindex: `0` for the active tab, `-1` for every inactive tab. */
    readonly tabIndex: 0 | -1;
    readonly onClick: () => void;
    readonly onKeyDown: (event: ReactKeyboardEvent<HTMLElement>) => void;
}

/**
 * Props applied to a tab panel element (`role="tabpanel"`) per the WAI-ARIA
 * Authoring Practices Tab pattern. Spread directly onto the panel node.
 */
export interface TabPanelProps {
    readonly role: 'tabpanel';
    readonly id: string;
    readonly 'aria-labelledby': string;
    readonly tabIndex: 0;
    /** `true` for every panel except the one bound to the active tab. */
    readonly hidden: boolean;
}

/** Options for {@link useTabStrip}. */
export interface UseTabStripOptions<T extends string> {
    /** The ordered set of tab ids. Source DOM order is preserved. */
    readonly tabs: readonly T[];
    /** The tab id selected on first render. */
    readonly initial: T;
    /**
     * Optional stable prefix for the generated element ids. When omitted a
     * unique prefix is derived via {@link useId} so multiple strips on the same
     * page never collide.
     */
    readonly idBase?: string;
}

/** Return shape of {@link useTabStrip}. */
export interface UseTabStripResult<T extends string> {
    /** The currently active tab id. */
    readonly active: T;
    /** Activates the supplied tab id synchronously. */
    readonly setActive: (id: T) => void;
    /** Builds the ARIA + roving-tabindex props for the given tab id. */
    readonly getTabProps: (id: T) => TabProps;
    /** Builds the ARIA + visibility props for the given tab id's panel. */
    readonly getPanelProps: (id: T) => TabPanelProps;
}

/**
 * Shared tab activation + ARIA wiring implementing the WAI-ARIA Authoring
 * Practices Tab pattern with automatic activation and roving tabindex.
 *
 * Invariant: exactly one tab carries `aria-selected="true"` at all times (the
 * active tab); every other tab carries `aria-selected="false"`. Exactly one
 * panel is visible (the panel bound to the active tab); every other panel is
 * `hidden`. Activation updates state synchronously so the ARIA attributes and
 * panel visibility flip on the same render as the user gesture.
 *
 * Keyboard support on the tab list (per the pattern):
 * - `ArrowRight` / `ArrowLeft` move to the next / previous tab, wrapping around
 *   the ends, and move focus to the newly active tab.
 * - `Home` / `End` move to the first / last tab.
 *
 * Requirements: 7.3, 7.4, 8.4, 9.2, 9.6, 25.10
 *
 * @typeParam T - The union of valid tab ids.
 */
export function useTabStrip<T extends string>(
    opts: UseTabStripOptions<T>,
): UseTabStripResult<T> {
    const { tabs, initial, idBase } = opts;

    // A unique, render-stable fallback prefix when the caller does not supply
    // one. useId is SSR-safe and matches between server and client.
    const generatedId = useId();
    const prefix = idBase ?? generatedId;

    const [active, setActiveState] = useState<T>(initial);

    const tabDomId = useCallback(
        (id: T): string => `${prefix}-tab-${id}`,
        [prefix],
    );

    const panelDomId = useCallback(
        (id: T): string => `${prefix}-panel-${id}`,
        [prefix],
    );

    const setActive = useCallback((id: T): void => {
        setActiveState(id);
    }, []);

    const getTabProps = useCallback(
        (id: T): TabProps => {
            const isActive = id === active;

            const onKeyDown = (event: ReactKeyboardEvent<HTMLElement>): void => {
                const count = tabs.length;
                if (count === 0) {
                    return;
                }

                // Origin is the tab that received the key event, not necessarily
                // the active one. Falls back to 0 if the id is unexpectedly absent.
                const currentIndex = Math.max(tabs.indexOf(id), 0);
                let nextIndex: number | null = null;

                switch (event.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        nextIndex = (currentIndex + 1) % count;
                        break;
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        nextIndex = (currentIndex - 1 + count) % count;
                        break;
                    case 'Home':
                        nextIndex = 0;
                        break;
                    case 'End':
                        nextIndex = count - 1;
                        break;
                    default:
                        return;
                }

                event.preventDefault();

                const nextId = tabs[nextIndex];
                setActive(nextId);

                // Move focus to the newly active tab to follow the active tab
                // (automatic activation). The element already exists in the DOM;
                // roving tabindex changes do not add or remove nodes.
                if (typeof document !== 'undefined') {
                    const nextEl = document.getElementById(tabDomId(nextId));
                    nextEl?.focus();
                }
            };

            return {
                role: 'tab',
                id: tabDomId(id),
                'aria-selected': isActive,
                'aria-controls': panelDomId(id),
                tabIndex: isActive ? 0 : -1,
                onClick: () => setActive(id),
                onKeyDown,
            };
        },
        [active, tabs, tabDomId, panelDomId, setActive],
    );

    const getPanelProps = useCallback(
        (id: T): TabPanelProps => ({
            role: 'tabpanel',
            id: panelDomId(id),
            'aria-labelledby': tabDomId(id),
            tabIndex: 0,
            hidden: id !== active,
        }),
        [active, panelDomId, tabDomId],
    );

    return { active, setActive, getTabProps, getPanelProps };
}
