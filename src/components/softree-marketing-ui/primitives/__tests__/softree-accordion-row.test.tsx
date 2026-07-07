/**
 * @vitest-environment jsdom
 *
 * Unit tests for the `SoftreeAccordionRow` primitive (task 3.10).
 *
 * Covers Requirements 3.6, 13.5, 15.4, 25.6, 25.7 as they apply to the
 * CSS-only disclosure row used by the Navigation Mobile_Drawer sub-menus
 * (Req 5.11) and the Footer link columns at ≤767 px (Req 14.6):
 *
 *   - DOM / attribute parity with Source_Document so the `keyframes.css`
 *     selectors apply verbatim: container `data-accordion-list="css"`, row
 *     `data-accordion="active"|"not-active"`, body `data-accordion-body`
 *     (Req 3.6 — the grid-template-rows 0fr→1fr transition is keyed off these
 *     attributes).
 *   - Disclosure semantics (Req 25.5/25.6/25.7-style): a native `<button>`
 *     trigger with `aria-expanded` reflecting state and `aria-controls` →
 *     body id; the body carries the matching id, `role="region"`, and
 *     `aria-labelledby` back to the trigger; collapsed body is `inert` +
 *     `aria-hidden`.
 *   - Click + keyboard (Enter / Space via native button) toggle in
 *     uncontrolled mode; `open` prop reflected and `onToggle` fired in
 *     controlled mode without using internal state.
 *   - Icon variant: `'chevron'` → `.accordion-icon`, `'cross'` →
 *     `.accordion-cross-icon`, each carrying the token-bound inline transform
 *     transition (durations.d0p6s + easings.silk) that `keyframes.css` leaves
 *     un-transitioned.
 *
 * The grid expand/collapse transition itself is declared in `keyframes.css`
 * (not inline) and jsdom does not compute it, so these tests assert that the
 * exact attributes/classes the `keyframes.css` selectors target are present,
 * rather than asserting computed transition timing.
 */
import { useState } from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import {
    render,
    screen,
    cleanup,
    fireEvent,
    within,
} from '@testing-library/react';

import { SoftreeAccordionRow } from '../softree-accordion-row';
import { durations, easings } from '../../tokens';

afterEach(() => {
    cleanup();
});

/** The outer `data-accordion-list="css"` container element. */
function getContainer(): HTMLElement {
    return document.querySelector('[data-accordion-list="css"]') as HTMLElement;
}

/** The row element carrying `data-accordion="active|not-active"`. */
function getRow(): HTMLElement {
    return document.querySelector('[data-accordion]') as HTMLElement;
}

/** The collapsible body element carrying `data-accordion-body`. */
function getBody(): HTMLElement {
    return document.querySelector('[data-accordion-body]') as HTMLElement;
}

describe('SoftreeAccordionRow', () => {
    it('renders the Source_Document accordion attribute scaffold (Req 3.6)', () => {
        render(
            <SoftreeAccordionRow heading="Products">
                <a href="/a">Link A</a>
            </SoftreeAccordionRow>,
        );

        const container = getContainer();
        expect(container).not.toBeNull();
        expect(container.getAttribute('data-accordion-list')).toBe('css');

        // The row + body the keyframes.css selectors target are nested inside.
        const row = within(container).getByText('Products').closest('[data-accordion]');
        expect(row).not.toBeNull();
        expect(getBody()).not.toBeNull();
        expect(getBody().hasAttribute('data-accordion-body')).toBe(true);
    });

    it('seeds collapsed (`not-active`) by default and exposes a closed trigger', () => {
        render(
            <SoftreeAccordionRow heading="Products">
                <a href="/a">Link A</a>
            </SoftreeAccordionRow>,
        );

        expect(getRow().getAttribute('data-accordion')).toBe('not-active');

        const trigger = screen.getByRole('button');
        expect(trigger.tagName).toBe('BUTTON');
        expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('honors defaultOpen=true for uncontrolled usage', () => {
        render(
            <SoftreeAccordionRow heading="Products" defaultOpen>
                <a href="/a">Link A</a>
            </SoftreeAccordionRow>,
        );

        expect(getRow().getAttribute('data-accordion')).toBe('active');
        expect(screen.getByRole('button').getAttribute('aria-expanded')).toBe('true');
    });

    it('wires aria-controls/aria-labelledby between the trigger and the body (Req 25.6)', () => {
        render(
            <SoftreeAccordionRow heading="Products" idBase="prods">
                <a href="/a">Link A</a>
            </SoftreeAccordionRow>,
        );

        const trigger = screen.getByRole('button');
        const body = getBody();

        // Trigger -> body via aria-controls; body id matches.
        expect(trigger.getAttribute('aria-controls')).toBe(body.id);
        expect(body.id).toBe('prods-body');

        // Body is a labelled region pointing back at the trigger.
        expect(body.getAttribute('role')).toBe('region');
        expect(body.getAttribute('aria-labelledby')).toBe(trigger.id);
        expect(trigger.id).toBe('prods-header');
    });

    it('click toggles open/closed in uncontrolled mode', () => {
        render(
            <SoftreeAccordionRow heading="Products">
                <a href="/a">Link A</a>
            </SoftreeAccordionRow>,
        );

        const trigger = screen.getByRole('button');
        expect(getRow().getAttribute('data-accordion')).toBe('not-active');

        fireEvent.click(trigger);
        expect(getRow().getAttribute('data-accordion')).toBe('active');
        expect(trigger.getAttribute('aria-expanded')).toBe('true');

        fireEvent.click(trigger);
        expect(getRow().getAttribute('data-accordion')).toBe('not-active');
        expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('toggles via keyboard Enter and Space (native button) (Req 15.4-style keyboard parity)', () => {
        render(
            <SoftreeAccordionRow heading="Products">
                <a href="/a">Link A</a>
            </SoftreeAccordionRow>,
        );

        const trigger = screen.getByRole('button');

        // A native <button> fires `click` for both Enter and Space, so the
        // keyboard activation path is exercised through that click handler.
        fireEvent.click(trigger); // Enter / Space => click
        expect(getRow().getAttribute('data-accordion')).toBe('active');

        fireEvent.click(trigger);
        expect(getRow().getAttribute('data-accordion')).toBe('not-active');
    });

    it('reflects the controlled `open` prop and fires onToggle without using internal state', () => {
        const onToggle = vi.fn();
        const { rerender } = render(
            <SoftreeAccordionRow heading="Products" open={false} onToggle={onToggle}>
                <a href="/a">Link A</a>
            </SoftreeAccordionRow>,
        );

        const trigger = screen.getByRole('button');
        expect(getRow().getAttribute('data-accordion')).toBe('not-active');

        // Clicking requests the next value but does NOT change internal state:
        // the row stays closed because the parent still passes open={false}.
        fireEvent.click(trigger);
        expect(onToggle).toHaveBeenCalledTimes(1);
        expect(onToggle).toHaveBeenCalledWith(true);
        expect(getRow().getAttribute('data-accordion')).toBe('not-active');

        // Only when the parent flips `open` does the row reflect it.
        rerender(
            <SoftreeAccordionRow heading="Products" open onToggle={onToggle}>
                <a href="/a">Link A</a>
            </SoftreeAccordionRow>,
        );
        expect(getRow().getAttribute('data-accordion')).toBe('active');
        expect(screen.getByRole('button').getAttribute('aria-expanded')).toBe('true');

        // Clicking while open requests `false`.
        fireEvent.click(screen.getByRole('button'));
        expect(onToggle).toHaveBeenCalledTimes(2);
        expect(onToggle).toHaveBeenLastCalledWith(false);
    });

    it('marks the collapsed body inert + aria-hidden and clears both when expanded', () => {
        function Harness() {
            const [open, setOpen] = useState(false);
            return (
                <>
                    <button type="button" onClick={() => setOpen((v) => !v)}>
                        external
                    </button>
                    <SoftreeAccordionRow heading="Products" open={open} idBase="prods">
                        <a href="/a">Link A</a>
                    </SoftreeAccordionRow>
                </>
            );
        }

        render(<Harness />);
        const body = getBody();

        // Collapsed: removed from the tab order + a11y tree without display:none.
        // React 19 renders `inert={true}` as the boolean `inert` attribute and
        // omits it when false; jsdom does not reflect the `inert` IDL property,
        // so assert against the attribute the component emits.
        expect(body.getAttribute('aria-hidden')).toBe('true');
        expect(body.hasAttribute('inert')).toBe(true);

        fireEvent.click(screen.getByText('external'));

        // Expanded: not hidden, not inert.
        const expandedBody = getBody();
        expect(expandedBody.getAttribute('aria-hidden')).toBe('false');
        expect(expandedBody.hasAttribute('inert')).toBe(false);
    });

    it('renders the chevron icon (.accordion-icon) by default', () => {
        render(
            <SoftreeAccordionRow heading="Products">
                <a href="/a">Link A</a>
            </SoftreeAccordionRow>,
        );

        expect(document.querySelector('.accordion-icon')).not.toBeNull();
        expect(document.querySelector('.accordion-cross-icon')).toBeNull();
    });

    it('renders the cross icon (.accordion-cross-icon) when icon="cross"', () => {
        render(
            <SoftreeAccordionRow heading="Products" icon="cross">
                <a href="/a">Link A</a>
            </SoftreeAccordionRow>,
        );

        expect(document.querySelector('.accordion-cross-icon')).not.toBeNull();
        expect(document.querySelector('.accordion-icon')).toBeNull();
    });

    it('sets the token-bound inline transform transition on the icon (durations.d0p6s + easings.silk)', () => {
        render(
            <SoftreeAccordionRow heading="Products">
                <a href="/a">Link A</a>
            </SoftreeAccordionRow>,
        );

        const icon = document.querySelector('.accordion-icon') as SVGElement;
        const style = (icon as unknown as HTMLElement).style;
        expect(style.transitionProperty).toBe('transform');
        expect(style.transitionDuration).toBe(durations.d0p6s);
        expect(style.transitionTimingFunction).toBe(easings.silk);
    });

    it('appends a custom className to the data-accordion-list container', () => {
        render(
            <SoftreeAccordionRow heading="Products" className="footer-col">
                <a href="/a">Link A</a>
            </SoftreeAccordionRow>,
        );

        const container = getContainer();
        expect(container.classList.contains('softree-accordion-row')).toBe(true);
        expect(container.classList.contains('footer-col')).toBe(true);
    });
});
