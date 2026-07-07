/**
 * @vitest-environment jsdom
 *
 * Unit tests for the `SoftreeRiveCanvas` primitive (task 3.7).
 *
 * Covers Requirements 6.4, 6.5, 6.9, 8.10, 26.5: the poster `<img>` renders
 * immediately and stays visible, a `<canvas>` overlay mounts at opacity 0,
 * the canvas fades 0 → 1 over the token-bound 350 ms on `loaded`, and stays at
 * opacity 0 on `error`/timeout (poster remains the fallback). The Rive load
 * lifecycle (`useRiveBlock`) and the motion preference (`useReducedMotion`) are
 * mocked so the primitive's own status → opacity mapping is exercised in
 * isolation; both hooks are covered by their own tests.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

import { SoftreeRiveCanvas } from '../softree-rive-canvas';
import { useRiveBlock, type RiveBlockStatus } from '../../hooks/use-rive-block';
import { useReducedMotion } from '../../hooks/use-reduced-motion';
import { durations } from '../../tokens';

vi.mock('../../hooks/use-rive-block', () => ({
    useRiveBlock: vi.fn(),
}));
vi.mock('../../hooks/use-reduced-motion', () => ({
    useReducedMotion: vi.fn(),
}));

const mockUseRiveBlock = vi.mocked(useRiveBlock);
const mockUseReducedMotion = vi.mocked(useReducedMotion);

const poster = {
    url: '/softree-marketing/rive/pre-built-applications.png',
    alt: 'Pre-built applications animation',
};

function setStatus(status: RiveBlockStatus): void {
    mockUseRiveBlock.mockReturnValue({ status });
}

beforeEach(() => {
    setStatus('idle');
    mockUseReducedMotion.mockReturnValue(false);
});

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

describe('SoftreeRiveCanvas', () => {
    it('renders the poster <img> immediately with its src and alt (Req 6.4, 6.9)', () => {
        render(<SoftreeRiveCanvas riveSrc="https://cdn/x.riv" poster={poster} />);
        const img = screen.getByRole('img');
        expect(img.getAttribute('src')).toBe(poster.url);
        expect(img.getAttribute('alt')).toBe(poster.alt);
    });

    it('renders a <canvas> overlay carrying the source `rive-canvas` class token', () => {
        const { container } = render(
            <SoftreeRiveCanvas riveSrc="https://cdn/x.riv" poster={poster} />,
        );
        const canvas = container.querySelector('canvas');
        expect(canvas).not.toBeNull();
        expect(canvas!.classList.contains('rive-canvas')).toBe(true);
    });

    it('keeps the canvas at opacity 0 before the first frame paints (idle)', () => {
        setStatus('idle');
        const { container } = render(
            <SoftreeRiveCanvas riveSrc="https://cdn/x.riv" poster={poster} />,
        );
        expect(container.querySelector('canvas')!.style.opacity).toBe('0');
    });

    it('keeps the canvas at opacity 0 while loading', () => {
        setStatus('loading');
        const { container } = render(
            <SoftreeRiveCanvas riveSrc="https://cdn/x.riv" poster={poster} />,
        );
        expect(container.querySelector('canvas')!.style.opacity).toBe('0');
    });

    it('transitions the canvas to opacity 1 over the 350 ms token on load (Req 6.5, 8.10)', () => {
        setStatus('loaded');
        const { container } = render(
            <SoftreeRiveCanvas riveSrc="https://cdn/x.riv" poster={poster} />,
        );
        const canvas = container.querySelector('canvas')!;
        expect(canvas.style.opacity).toBe('1');
        expect(canvas.style.transitionProperty).toBe('opacity');
        // 350 ms reveal is read from tokens.durations.d0p35s — no magic literal.
        expect(canvas.style.transitionDuration).toBe(durations.d0p35s);
    });

    it('keeps the canvas hidden and the poster visible on error/timeout (Req 6.9, 26.5)', () => {
        setStatus('error');
        const { container } = render(
            <SoftreeRiveCanvas riveSrc="https://cdn/x.riv" poster={poster} />,
        );
        // Canvas stays invisible...
        expect(container.querySelector('canvas')!.style.opacity).toBe('0');
        // ...and the poster fallback is still in the DOM and visible.
        expect(screen.getByRole('img').getAttribute('src')).toBe(poster.url);
    });

    it('collapses the reveal transition to 0s under Reduced_Motion', () => {
        mockUseReducedMotion.mockReturnValue(true);
        setStatus('loaded');
        const { container } = render(
            <SoftreeRiveCanvas riveSrc="https://cdn/x.riv" poster={poster} />,
        );
        expect(container.querySelector('canvas')!.style.transitionDuration).toBe(
            durations.d0s,
        );
    });

    it('forwards reducedMotion + riveSrc into useRiveBlock', () => {
        mockUseReducedMotion.mockReturnValue(true);
        render(<SoftreeRiveCanvas riveSrc="https://cdn/special.riv" poster={poster} />);
        expect(mockUseRiveBlock).toHaveBeenCalledWith(
            expect.objectContaining({
                src: 'https://cdn/special.riv',
                reducedMotion: true,
            }),
        );
    });

    it('marks the canvas aria-hidden and names the poster (no duplicate announcement)', () => {
        const { container } = render(
            <SoftreeRiveCanvas riveSrc="https://cdn/x.riv" poster={poster} />,
        );
        expect(container.querySelector('canvas')!.getAttribute('aria-hidden')).toBe(
            'true',
        );
        expect(screen.getByRole('img').getAttribute('alt')).toBe(poster.alt);
    });

    it('uses ariaLabel as the poster accessible name when provided', () => {
        render(
            <SoftreeRiveCanvas
                riveSrc="https://cdn/x.riv"
                poster={poster}
                ariaLabel="Tailored applications"
            />,
        );
        expect(screen.getByRole('img').getAttribute('alt')).toBe(
            'Tailored applications',
        );
    });

    it('applies width/height to both the poster and the canvas', () => {
        const { container } = render(
            <SoftreeRiveCanvas
                riveSrc="https://cdn/x.riv"
                poster={poster}
                width={776}
                height={710}
            />,
        );
        const img = screen.getByRole('img');
        const canvas = container.querySelector('canvas')!;
        expect(img.getAttribute('width')).toBe('776');
        expect(img.getAttribute('height')).toBe('710');
        expect(canvas.getAttribute('width')).toBe('776');
        expect(canvas.getAttribute('height')).toBe('710');
    });

    it('merges caller-supplied wrapper and canvas class names', () => {
        const { container } = render(
            <SoftreeRiveCanvas
                riveSrc="https://cdn/x.riv"
                poster={poster}
                className="hero-card"
                canvasClassName="height-100"
            />,
        );
        const wrapper = container.querySelector('.rive-canvas-block')!;
        expect(wrapper.classList.contains('hero-card')).toBe(true);
        const canvas = container.querySelector('canvas')!;
        expect(canvas.classList.contains('rive-canvas')).toBe(true);
        expect(canvas.classList.contains('height-100')).toBe(true);
    });
});
