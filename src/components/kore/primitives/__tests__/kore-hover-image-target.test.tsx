/**
 * @vitest-environment jsdom
 *
 * Unit tests for the `KoreHoverImageTarget` primitive (task 3.9).
 *
 * Covers the imperative registration lifecycle against the
 * `HoverImageContext` registry (register on mount / unregister on unmount /
 * re-register on `dataImg` change), child pass-through, source class merge
 * (`hover-img-button`), and `data-img` DOM parity.
 *
 * Requirements: 8.8, 8.9, 16.2, 16.3, 16.4
 */
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { createRef } from 'react';

import { KoreHoverImageTarget } from '../kore-hover-image-target';
import {
    HoverImageContext,
    noopHoverImageRegistry,
    type HoverImageRegistry,
} from '../hover-image-context';

afterEach(() => {
    cleanup();
});

/**
 * Build a spy registry that records every register call and hands back a spy
 * unregister so tests can assert the full mount/unmount lifecycle.
 */
function createSpyRegistry(): {
    registry: HoverImageRegistry;
    calls: Array<{ target: HTMLElement; dataImg: string | null }>;
    unregister: ReturnType<typeof vi.fn>;
} {
    const calls: Array<{ target: HTMLElement; dataImg: string | null }> = [];
    const unregister = vi.fn();
    const registry: HoverImageRegistry = {
        register: (target, dataImg) => {
            calls.push({ target, dataImg });
            return unregister;
        },
    };
    return { registry, calls, unregister };
}

describe('KoreHoverImageTarget', () => {
    it('renders its child without introducing an extra wrapper element', () => {
        render(
            <KoreHoverImageTarget dataImg="https://cdn.example/x.webp">
                <a href="/guide" data-testid="target">
                    Guide
                </a>
            </KoreHoverImageTarget>,
        );
        const el = screen.getByTestId('target');
        expect(el.tagName).toBe('A');
        expect(el.textContent).toBe('Guide');
    });

    it('merges the source `hover-img-button` class onto the child (Req 8.8)', () => {
        render(
            <KoreHoverImageTarget dataImg="https://cdn.example/x.webp">
                <a className="button w-inline-block" data-testid="target">
                    Guide
                </a>
            </KoreHoverImageTarget>,
        );
        const el = screen.getByTestId('target');
        expect(el.classList.contains('button')).toBe(true);
        expect(el.classList.contains('w-inline-block')).toBe(true);
        expect(el.classList.contains('hover-img-button')).toBe(true);
    });

    it('mirrors the `data-img` attribute for DOM parity (Req 16.2)', () => {
        const url = 'https://cdn.example/banking-guide.webp';
        render(
            <KoreHoverImageTarget dataImg={url}>
                <a data-testid="target">Guide</a>
            </KoreHoverImageTarget>,
        );
        expect(screen.getByTestId('target').getAttribute('data-img')).toBe(url);
    });

    it('omits `data-img` when there is no preview (Req 16.6)', () => {
        render(
            <KoreHoverImageTarget dataImg={null}>
                <a data-testid="target">Guide</a>
            </KoreHoverImageTarget>,
        );
        expect(screen.getByTestId('target').getAttribute('data-img')).toBeNull();
    });

    it('registers the rendered node on mount and passes the dataImg through', () => {
        const { registry, calls } = createSpyRegistry();
        render(
            <HoverImageContext.Provider value={registry}>
                <KoreHoverImageTarget dataImg="https://cdn.example/x.webp">
                    <a data-testid="target">Guide</a>
                </KoreHoverImageTarget>
            </HoverImageContext.Provider>,
        );
        expect(calls).toHaveLength(1);
        expect(calls[0].target).toBe(screen.getByTestId('target'));
        expect(calls[0].dataImg).toBe('https://cdn.example/x.webp');
    });

    it('passes a null dataImg through to the registry so it can skip (Req 16.6)', () => {
        const { registry, calls } = createSpyRegistry();
        render(
            <HoverImageContext.Provider value={registry}>
                <KoreHoverImageTarget dataImg={null}>
                    <a data-testid="target">Guide</a>
                </KoreHoverImageTarget>
            </HoverImageContext.Provider>,
        );
        expect(calls).toHaveLength(1);
        expect(calls[0].dataImg).toBeNull();
    });

    it('invokes the unregister callback on unmount (Req 16.4 lifecycle)', () => {
        const { registry, unregister } = createSpyRegistry();
        const { unmount } = render(
            <HoverImageContext.Provider value={registry}>
                <KoreHoverImageTarget dataImg="https://cdn.example/x.webp">
                    <a data-testid="target">Guide</a>
                </KoreHoverImageTarget>
            </HoverImageContext.Provider>,
        );
        expect(unregister).not.toHaveBeenCalled();
        unmount();
        expect(unregister).toHaveBeenCalledTimes(1);
    });

    it('re-registers when dataImg changes', () => {
        const { registry, calls, unregister } = createSpyRegistry();
        const { rerender } = render(
            <HoverImageContext.Provider value={registry}>
                <KoreHoverImageTarget dataImg="https://cdn.example/a.webp">
                    <a data-testid="target">Guide</a>
                </KoreHoverImageTarget>
            </HoverImageContext.Provider>,
        );
        expect(calls).toHaveLength(1);

        rerender(
            <HoverImageContext.Provider value={registry}>
                <KoreHoverImageTarget dataImg="https://cdn.example/b.webp">
                    <a data-testid="target">Guide</a>
                </KoreHoverImageTarget>
            </HoverImageContext.Provider>,
        );

        // Old registration is torn down and a new one created with the new URL.
        expect(unregister).toHaveBeenCalledTimes(1);
        expect(calls).toHaveLength(2);
        expect(calls[1].dataImg).toBe('https://cdn.example/b.webp');
    });

    it('forwards the rendered node to a caller-supplied ref on the child', () => {
        const ref = createRef<HTMLAnchorElement>();
        render(
            <KoreHoverImageTarget dataImg="https://cdn.example/x.webp">
                <a ref={ref} data-testid="target">
                    Guide
                </a>
            </KoreHoverImageTarget>,
        );
        expect(ref.current).toBe(screen.getByTestId('target'));
    });

    it('is safe without a provider via the default no-op registry', () => {
        // No provider: uses noopHoverImageRegistry. Should not throw on mount.
        expect(() =>
            render(
                <KoreHoverImageTarget dataImg="https://cdn.example/x.webp">
                    <a data-testid="target">Guide</a>
                </KoreHoverImageTarget>,
            ),
        ).not.toThrow();
        // The default registry's register returns a no-op unregister.
        const unregister = noopHoverImageRegistry.register(
            document.createElement('a'),
            'https://cdn.example/x.webp',
        );
        expect(typeof unregister).toBe('function');
        expect(() => unregister()).not.toThrow();
    });
});
