// @vitest-environment jsdom

/**
 * Property 4: Universal Tab Strip Invariant
 *
 * Validates: Requirements 7.3, 7.4, 7.5, 8.1, 8.4, 8.5, 8.6, 9.2, 9.3, 25.10
 *
 * For any tab strip driven by `useTabStrip` with N tabs (2 <= N <= 9) and any
 * finite sequence of activations (mouse click on a tab or keyboard navigation
 * via Arrow / Home / End on the focused tab), the following invariant holds
 * after every activation:
 *
 *   - Exactly one tab carries `aria-selected="true"`; every other tab carries
 *     `aria-selected="false"` (Req 7.3, 7.4, 8.1, 8.4, 9.2, 25.10).
 *   - Exactly one panel (`role="tabpanel"`) is visible (not `hidden`); every
 *     other panel is `hidden` (Req 7.5, 8.5, 8.6, 9.3).
 *   - The single selected tab is paired one-to-one with the single visible
 *     panel via matching `aria-controls` / `aria-labelledby` (Req 25.10).
 *   - The ARIA flip and panel swap are applied synchronously with the
 *     activation gesture: immediately after the gesture is flushed the DOM
 *     already reflects the new state (well within the 100 ms ARIA bound and
 *     the 500 ms panel-swap bound of Req 7.4 / 7.5 / 8.5 / 8.6 / 9.3).
 */

import { describe, it, expect, afterEach } from 'vitest';
import * as fc from 'fast-check';
import React from 'react';
import { render, cleanup, act, fireEvent } from '@testing-library/react';

import { useTabStrip } from '../../src/components/kore/hooks/use-tab-strip';

// ---------------------------------------------------------------------------
// Test harness: a minimal component that spreads the hook props onto real DOM
// nodes so we can assert on the rendered ARIA attributes and panel visibility.
// Authored with React.createElement (no JSX) to stay valid inside a `.ts` file.
// ---------------------------------------------------------------------------

const ID_BASE = 'strip';

interface HarnessProps {
    readonly tabs: readonly string[];
    readonly initial: string;
}

function TabStripHarness({ tabs, initial }: HarnessProps): React.ReactElement {
    const { getTabProps, getPanelProps } = useTabStrip({
        tabs,
        initial,
        idBase: ID_BASE,
    });

    const tabNodes = tabs.map((id) =>
        React.createElement(
            'button',
            { key: `tab-${id}`, ...getTabProps(id) },
            id,
        ),
    );

    const panelNodes = tabs.map((id) =>
        React.createElement(
            'div',
            { key: `panel-${id}`, ...getPanelProps(id) },
            `content-${id}`,
        ),
    );

    return React.createElement(
        React.Fragment,
        null,
        React.createElement('div', { role: 'tablist' }, tabNodes),
        ...panelNodes,
    );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generate stable, unique tab ids `t0 .. t{n-1}`. */
const makeTabs = (n: number): string[] =>
    Array.from({ length: n }, (_, i) => `t${i}`);

/** Find an element by exact id via an attribute selector (CSS.escape-free). */
const byId = (container: HTMLElement, id: string): HTMLElement =>
    container.querySelector<HTMLElement>(`[id="${id}"]`)!;

/**
 * Assert the universal invariant for the given expected active id, returning
 * the elapsed time captured by the caller is the caller's concern; this only
 * inspects the current DOM.
 */
function assertInvariant(
    container: HTMLElement,
    tabs: readonly string[],
    expectedActiveId: string,
): void {
    const tabEls = Array.from(
        container.querySelectorAll<HTMLElement>('[role="tab"]'),
    );
    const panelEls = Array.from(
        container.querySelectorAll<HTMLElement>('[role="tabpanel"]'),
    );

    // Cardinality: one tab + one panel rendered per source tab id.
    expect(tabEls).toHaveLength(tabs.length);
    expect(panelEls).toHaveLength(tabs.length);

    // Exactly one tab is aria-selected="true"; all others are "false".
    const selectedTabs = tabEls.filter(
        (el) => el.getAttribute('aria-selected') === 'true',
    );
    const unselectedTabs = tabEls.filter(
        (el) => el.getAttribute('aria-selected') === 'false',
    );
    expect(selectedTabs).toHaveLength(1);
    expect(unselectedTabs).toHaveLength(tabs.length - 1);
    // No tab is left in an indeterminate (missing) aria-selected state.
    expect(selectedTabs.length + unselectedTabs.length).toBe(tabs.length);

    // The selected tab is the expected one, and it carries roving tabindex 0
    // while every other tab carries -1.
    const selectedTab = selectedTabs[0];
    expect(selectedTab.id).toBe(`${ID_BASE}-tab-${expectedActiveId}`);
    expect(selectedTab.tabIndex).toBe(0);
    for (const el of unselectedTabs) {
        expect(el.tabIndex).toBe(-1);
    }

    // Exactly one panel is visible (not hidden); all others are hidden.
    const visiblePanels = panelEls.filter((el) => !el.hidden);
    expect(visiblePanels).toHaveLength(1);
    expect(panelEls.filter((el) => el.hidden)).toHaveLength(tabs.length - 1);

    // The single visible panel is paired one-to-one with the selected tab.
    const visiblePanel = visiblePanels[0];
    expect(visiblePanel.id).toBe(`${ID_BASE}-panel-${expectedActiveId}`);
    expect(selectedTab.getAttribute('aria-controls')).toBe(visiblePanel.id);
    expect(visiblePanel.getAttribute('aria-labelledby')).toBe(selectedTab.id);
}

// Operation model -----------------------------------------------------------

type Operation =
    | { readonly kind: 'click'; readonly index: number }
    | { readonly kind: 'key'; readonly key: string };

const NAV_KEYS = [
    'ArrowRight',
    'ArrowLeft',
    'ArrowUp',
    'ArrowDown',
    'Home',
    'End',
] as const;

/** Compute the next active index for a keyboard navigation key. */
function nextIndexForKey(key: string, current: number, count: number): number {
    switch (key) {
        case 'ArrowRight':
        case 'ArrowDown':
            return (current + 1) % count;
        case 'ArrowLeft':
        case 'ArrowUp':
            return (current - 1 + count) % count;
        case 'Home':
            return 0;
        case 'End':
            return count - 1;
        default:
            return current;
    }
}

// ---------------------------------------------------------------------------
// Cleanup between every render (property runs render many components).
// ---------------------------------------------------------------------------

afterEach(() => {
    cleanup();
});

// ---------------------------------------------------------------------------
// Property test
// ---------------------------------------------------------------------------

describe('Property 4: Universal Tab Strip Invariant', () => {
    it('maintains exactly-one-selected / exactly-one-visible across any activation sequence', () => {
        const scenario = fc.integer({ min: 2, max: 9 }).chain((n) => {
            const indexArb = fc.nat({ max: n - 1 });
            const opArb = fc.oneof(
                indexArb.map(
                    (index): Operation => ({ kind: 'click', index }),
                ),
                fc
                    .constantFrom(...NAV_KEYS)
                    .map((key): Operation => ({ kind: 'key', key })),
            );
            return fc.record({
                n: fc.constant(n),
                ops: fc.array(opArb, { minLength: 1, maxLength: 25 }),
            });
        });

        fc.assert(
            fc.property(scenario, ({ n, ops }) => {
                const tabs = makeTabs(n);
                const initial = tabs[0];

                const { container } = render(
                    React.createElement(TabStripHarness, { tabs, initial }),
                );

                // Initial state: first tab active (Req 7.3 / 8.1 / 9.2 default).
                let activeIndex = 0;
                assertInvariant(container, tabs, tabs[activeIndex]);

                for (const op of ops) {
                    let expectedIndex: number;
                    let target: HTMLElement;

                    if (op.kind === 'click') {
                        expectedIndex = op.index;
                        const tabId = `${ID_BASE}-tab-${tabs[op.index]}`;
                        target = byId(container, tabId);
                    } else {
                        expectedIndex = nextIndexForKey(op.key, activeIndex, n);
                        // Keyboard events originate from the currently focused
                        // (active) tab, mirroring roving-tabindex focus.
                        const tabId = `${ID_BASE}-tab-${tabs[activeIndex]}`;
                        target = byId(container, tabId);
                    }

                    act(() => {
                        if (op.kind === 'click') {
                            fireEvent.click(target);
                        } else {
                            fireEvent.keyDown(target, { key: op.key });
                        }
                    });

                    activeIndex = expectedIndex;

                    // The ARIA flip (Req 7.4 / 8.4) and panel swap (Req 7.5 /
                    // 8.5 / 8.6 / 9.3) are applied synchronously with the
                    // gesture: the DOM already reflects the new state right
                    // after the act() flush, with zero additional async waiting.
                    // A synchronous, same-tick update trivially satisfies the
                    // 100 ms ARIA bound and the 500 ms panel-swap bound. We
                    // prove synchrony (rather than measuring jsdom wall-clock,
                    // which is dominated by test-harness/GC jitter) by asserting
                    // the full invariant holds immediately.
                    assertInvariant(container, tabs, tabs[activeIndex]);
                }

                cleanup();
            }),
            { numRuns: 100 },
        );
    });

    // ------------------------------------------------------------------
    // Focused example-based checks for key boundaries of the invariant.
    // ------------------------------------------------------------------

    it('selects the first tab and shows only its panel on initial render', () => {
        const tabs = makeTabs(5);
        const { container } = render(
            React.createElement(TabStripHarness, { tabs, initial: tabs[0] }),
        );
        assertInvariant(container, tabs, tabs[0]);
    });

    it('activates the clicked tab and hides the previously visible panel', () => {
        const tabs = makeTabs(4);
        const { container } = render(
            React.createElement(TabStripHarness, { tabs, initial: tabs[0] }),
        );

        const third = byId(container, `${ID_BASE}-tab-${tabs[2]}`);
        act(() => {
            fireEvent.click(third);
        });

        assertInvariant(container, tabs, tabs[2]);
    });

    it('wraps with ArrowRight from the last tab back to the first', () => {
        const tabs = makeTabs(3);
        const { container } = render(
            React.createElement(TabStripHarness, { tabs, initial: tabs[0] }),
        );

        // Move to the last tab via End, then ArrowRight should wrap to first.
        const first = byId(container, `${ID_BASE}-tab-${tabs[0]}`);
        act(() => {
            fireEvent.keyDown(first, { key: 'End' });
        });
        assertInvariant(container, tabs, tabs[2]);

        const last = byId(container, `${ID_BASE}-tab-${tabs[2]}`);
        act(() => {
            fireEvent.keyDown(last, { key: 'ArrowRight' });
        });
        assertInvariant(container, tabs, tabs[0]);
    });

    it('wraps with ArrowLeft from the first tab to the last', () => {
        const tabs = makeTabs(3);
        const { container } = render(
            React.createElement(TabStripHarness, { tabs, initial: tabs[0] }),
        );

        const first = byId(container, `${ID_BASE}-tab-${tabs[0]}`);
        act(() => {
            fireEvent.keyDown(first, { key: 'ArrowLeft' });
        });
        assertInvariant(container, tabs, tabs[2]);
    });
});
