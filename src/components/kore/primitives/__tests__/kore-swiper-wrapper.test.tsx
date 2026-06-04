/**
 * @vitest-environment jsdom
 *
 * Unit tests for the `KoreSwiperWrapper` primitive (task 3.6).
 *
 * These tests exercise the deterministic, browser-API-free surface of the
 * primitive: the SSR-safe skeleton DOM it emits before (and as a fallback for)
 * the imperative Swiper mount. That skeleton is what makes static screenshots
 * and JS-disabled rendering succeed with no hydration mismatch (Req 26.4, 27.8).
 *
 * The imperative `new Swiper(...)` mount itself is deferred behind a dynamic
 * `import('swiper')` that resolves on a later microtask; each test unmounts
 * synchronously, which flips the effect's `disposed` guard so the real runtime
 * is never constructed against jsdom. No mocking is used — the assertions read
 * the real rendered DOM.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import type { SwiperOptions } from 'swiper/types';

import { KoreSwiperWrapper } from '../kore-swiper-wrapper';

afterEach(() => {
    cleanup();
});

const EMPTY_CONFIG: SwiperOptions = {};

function querySwiperRoot(container: HTMLElement): HTMLElement {
    const root = container.querySelector('.swiper');
    if (root === null) {
        throw new Error('Expected a .swiper root element to be rendered');
    }
    return root as HTMLElement;
}

describe('KoreSwiperWrapper', () => {
    it('renders the .swiper > .swiper-wrapper > .swiper-slide skeleton (Req 26.4)', () => {
        const { container } = render(
            <KoreSwiperWrapper
                config={EMPTY_CONFIG}
                slides={[<span key="a">A</span>, <span key="b">B</span>]}
            />,
        );

        const root = querySwiperRoot(container);
        const wrapper = root.querySelector('.swiper-wrapper');
        expect(wrapper).not.toBeNull();
        expect(wrapper?.parentElement).toBe(root);

        const slideEls = root.querySelectorAll('.swiper-slide');
        // Every slide is a direct child of the wrapper, in source order.
        slideEls.forEach((el) => expect(el.parentElement).toBe(wrapper));
    });

    it('emits exactly one .swiper-slide per supplied slide in source order', () => {
        const { container } = render(
            <KoreSwiperWrapper
                config={EMPTY_CONFIG}
                slides={[
                    <span key="1">one</span>,
                    <span key="2">two</span>,
                    <span key="3">three</span>,
                ]}
            />,
        );

        const slideEls = querySwiperRoot(container).querySelectorAll('.swiper-slide');
        expect(slideEls).toHaveLength(3);
        expect(Array.from(slideEls, (el) => el.textContent)).toEqual([
            'one',
            'two',
            'three',
        ]);
    });

    it('wraps a single (non-array) slide node in one .swiper-slide', () => {
        const { container } = render(
            <KoreSwiperWrapper config={EMPTY_CONFIG} slides={<span>solo</span>} />,
        );

        const slideEls = querySwiperRoot(container).querySelectorAll('.swiper-slide');
        expect(slideEls).toHaveLength(1);
        expect(slideEls[0].textContent).toBe('solo');
    });

    it('applies className, wrapperClassName, slideClassName, ariaLabel, and id', () => {
        const { container } = render(
            <KoreSwiperWrapper
                config={EMPTY_CONFIG}
                slides={[<span key="a">A</span>]}
                className="connect-swiper"
                wrapperClassName="connect-track"
                slideClassName="connect-logo"
                ariaLabel="Banking customer logos"
                id="industry-banking"
            />,
        );

        const root = querySwiperRoot(container);
        expect(root.classList.contains('swiper')).toBe(true);
        expect(root.classList.contains('connect-swiper')).toBe(true);
        expect(root.id).toBe('industry-banking');
        expect(root.getAttribute('aria-label')).toBe('Banking customer logos');

        const wrapper = root.querySelector('.swiper-wrapper');
        expect(wrapper?.classList.contains('connect-track')).toBe(true);

        const slide = root.querySelector('.swiper-slide');
        expect(slide?.classList.contains('connect-logo')).toBe(true);
    });

    it('omits default navigation and pagination elements by default', () => {
        const { container } = render(
            <KoreSwiperWrapper config={EMPTY_CONFIG} slides={[<span key="a">A</span>]} />,
        );

        const root = querySwiperRoot(container);
        expect(root.querySelector('.swiper-button-next')).toBeNull();
        expect(root.querySelector('.swiper-button-prev')).toBeNull();
        expect(root.querySelector('.swiper-pagination')).toBeNull();
    });

    it('emits default navigation buttons when config.navigation === true', () => {
        const { container } = render(
            <KoreSwiperWrapper
                config={{ navigation: true }}
                slides={[<span key="a">A</span>]}
            />,
        );

        const root = querySwiperRoot(container);
        expect(root.querySelector('.swiper-button-prev')).not.toBeNull();
        expect(root.querySelector('.swiper-button-next')).not.toBeNull();
    });

    it('emits the default pagination element when config.pagination === true', () => {
        const { container } = render(
            <KoreSwiperWrapper
                config={{ pagination: true }}
                slides={[<span key="a">A</span>]}
            />,
        );

        expect(
            querySwiperRoot(container).querySelector('.swiper-pagination'),
        ).not.toBeNull();
    });

    it('does not emit default nav/pagination when those options are custom objects', () => {
        // When sections own the nav/pagination elements (object form with custom
        // `el`/`nextEl`/`prevEl`), the primitive must not also emit defaults.
        const { container } = render(
            <KoreSwiperWrapper
                config={{
                    navigation: { nextEl: '.custom-next', prevEl: '.custom-prev' },
                    pagination: { el: '.custom-pagination' },
                }}
                slides={[<span key="a">A</span>]}
            />,
        );

        const root = querySwiperRoot(container);
        expect(root.querySelector('.swiper-button-next')).toBeNull();
        expect(root.querySelector('.swiper-pagination')).toBeNull();
    });
});
