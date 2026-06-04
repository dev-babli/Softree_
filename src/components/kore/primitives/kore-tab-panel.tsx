import type { ReactNode } from 'react';

import { korePanelDomId, koreTabDomId } from './kore-tab-strip';

/**
 * `KoreTabPanel` — the panel half of the shared tab primitive, paired with
 * {@link KoreTabStrip}. It implements the WAI-ARIA Authoring Practices Tab
 * pattern panel contract: `role="tabpanel"`, a stable `id` that the owning
 * tab's `aria-controls` points at, an `aria-labelledby` that points back at the
 * owning tab, `tabIndex={0}` so keyboard users can focus the panel content, and
 * the `hidden` attribute on every panel except the active one (Req 7.5, 8.5,
 * 8.6, 9.3, 25.10).
 *
 * IDS ARE DERIVED, NOT PASSED:
 *   The panel computes its own `id` and `aria-labelledby` from the SAME
 *   {@link korePanelDomId} / {@link koreTabDomId} helpers the strip uses, given
 *   the same `idBase` + `tabId`. This guarantees the tab↔panel pairing is
 *   one-to-one by construction — there is no way for a caller to wire a panel
 *   to the wrong tab. Always render a `KoreTabPanel` for each
 *   `KoreTabDescriptor` with a matching `idBase` and `tabId`.
 *
 * VISIBILITY:
 *   Visibility is driven solely by the `active` prop (which the parent section
 *   owns alongside the strip's `active`/`onActivate`): the active panel renders
 *   without `hidden`; every other panel renders `hidden`. The native `hidden`
 *   attribute removes the panel from the accessibility tree and the layout, so
 *   exactly one panel is ever exposed.
 *
 * SERVER COMPONENT — intentionally NOT marked `'use client'`:
 *   This primitive references no browser-only API; it only spreads static ARIA
 *   props and toggles `hidden`. It renders identically on the server and the
 *   client. Its interactive parent (the section that owns `active`) is the
 *   `'use client'` boundary.
 *
 * @typeParam T - The union of valid tab ids for the owning strip.
 */
export interface KoreTabPanelProps<T extends string = string> {
    /**
     * Stable prefix for the generated element ids. MUST equal the `idBase`
     * given to the paired {@link KoreTabStrip} so `id` / `aria-labelledby`
     * resolve against the correct tab.
     */
    readonly idBase: string;
    /** The id of the tab this panel belongs to. */
    readonly tabId: T;
    /** Whether this panel's tab is the currently active one. */
    readonly active: boolean;
    /** The panel content. */
    readonly children: ReactNode;
    /** Extra classes appended after the source content token. */
    readonly className?: string;
}

export function KoreTabPanel<T extends string = string>({
    idBase,
    tabId,
    active,
    children,
    className,
}: KoreTabPanelProps<T>): React.JSX.Element {
    return (
        <div
            role="tabpanel"
            id={korePanelDomId(idBase, tabId)}
            aria-labelledby={koreTabDomId(idBase, tabId)}
            tabIndex={0}
            hidden={!active}
            className={className}
        >
            {children}
        </div>
    );
}
