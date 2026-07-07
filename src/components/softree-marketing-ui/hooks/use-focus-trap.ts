'use client';

import { useEffect, useRef, type RefObject } from 'react';

/**
 * Standard focusable-element selector. Matches links, enabled form controls,
 * and any element that explicitly opts into the tab order via a non-negative
 * `tabindex`. Elements with `tabindex="-1"` are intentionally excluded because
 * they are programmatically focusable only, not part of the Tab sequence.
 */
const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(', ');

export interface UseFocusTrapOptions {
    /** Ref to the element whose focusable descendants are trapped. */
    readonly containerRef: RefObject<HTMLElement | null>;
    /** When `true` the trap is engaged; when `false` it is released. */
    readonly active: boolean;
    /** Invoked when the Escape key is pressed while the trap is active. */
    readonly onEscape?: () => void;
}

/**
 * Returns `true` when the element is reachable by keyboard focus: not inert,
 * not `aria-hidden`, and not visually removed via `display: none` /
 * `visibility: hidden` (on the element or an ancestor). Used to discard
 * matches of {@link FOCUSABLE_SELECTOR} that exist in the DOM but cannot
 * actually receive focus.
 */
function isFocusable(element: HTMLElement): boolean {
    if (element.hasAttribute('inert') || element.closest('[inert]') !== null) {
        return false;
    }

    if (element.getAttribute('aria-hidden') === 'true') {
        return false;
    }

    if (typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
        const style = window.getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden') {
            return false;
        }
    }

    return true;
}

/**
 * Collects the ordered list of keyboard-focusable descendants of `container`,
 * preserving DOM order so that Tab wrapping moves first ↔ last correctly.
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        isFocusable,
    );
}

/**
 * Traps keyboard focus inside a container while `active` is true.
 *
 * On activation the hook captures the currently focused element so it can be
 * restored later, then moves focus to the first focusable descendant of the
 * container (or the container itself when it has none). While active, Tab and
 * Shift+Tab wrap focus within the container (first ↔ last) and never escape it,
 * and pressing Escape invokes `onEscape`. On deactivation or unmount the hook
 * removes its listeners and returns focus to the previously focused element,
 * provided that element is still connected to the document.
 *
 * `'use client'`-only and SSR-safe: the activation effect is a no-op until it
 * runs in the browser after mount.
 *
 * Requirements: 13.5, 13.7, 15.4, 15.7, 25.7
 */
export function useFocusTrap({ containerRef, active, onEscape }: UseFocusTrapOptions): void {
    // Keep the latest onEscape in a ref so the keydown handler always calls the
    // current callback without forcing the activation effect to re-run (which
    // would otherwise re-capture focus and clobber the restore target).
    const onEscapeRef = useRef(onEscape);
    useEffect(() => {
        onEscapeRef.current = onEscape;
    }, [onEscape]);

    // The element that held focus immediately before activation; restored on
    // deactivation. Held in a ref so it survives re-renders.
    const previousActiveElementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!active) {
            return;
        }

        if (typeof document === 'undefined') {
            return;
        }

        const container = containerRef.current;
        if (container === null) {
            return;
        }

        // Capture the element to restore focus to on deactivation.
        const previousActiveElement =
            document.activeElement instanceof HTMLElement ? document.activeElement : null;
        previousActiveElementRef.current = previousActiveElement;

        // Move focus into the trap: first focusable descendant, else the
        // container itself (made programmatically focusable when needed).
        const initialFocusable = getFocusableElements(container);
        if (initialFocusable.length > 0) {
            initialFocusable[0].focus();
        } else {
            if (!container.hasAttribute('tabindex')) {
                container.setAttribute('tabindex', '-1');
            }
            container.focus();
        }

        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'Escape' || event.key === 'Esc') {
                onEscapeRef.current?.();
                return;
            }

            if (event.key !== 'Tab') {
                return;
            }

            const focusable = getFocusableElements(container);

            // No focusable descendants: keep focus pinned to the container.
            if (focusable.length === 0) {
                event.preventDefault();
                container.focus();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            const focusInside = current !== null && container.contains(current);

            if (event.shiftKey) {
                // Backward wrap: from the first element (or from outside) to the last.
                if (!focusInside || current === first) {
                    event.preventDefault();
                    last.focus();
                }
            } else {
                // Forward wrap: from the last element (or from outside) to the first.
                if (!focusInside || current === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };

        // Capture phase so the trap is robust against descendant handlers that
        // stop propagation.
        document.addEventListener('keydown', handleKeyDown, true);

        return () => {
            document.removeEventListener('keydown', handleKeyDown, true);

            const elementToRestore = previousActiveElementRef.current;
            previousActiveElementRef.current = null;

            // Restore focus only if the prior element is still in the document.
            if (
                elementToRestore !== null &&
                typeof elementToRestore.focus === 'function' &&
                elementToRestore.isConnected
            ) {
                elementToRestore.focus();
            }
        };
    }, [active, containerRef]);
}
