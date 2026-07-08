/**
 * @vitest-environment jsdom
 *
 * Unit tests for the `SoftreeModal` primitive (task 3.5).
 *
 * Covers Requirements 13.4, 13.5, 13.7, 13.8, 15.3, 15.4, 15.7, 15.9, 25.6,
 * 25.7: the dialog renders `role="dialog"`, `aria-modal="true"`, and a label
 * reference; applies/releases the `lenis-stopped` overflow lock on `<html>`;
 * traps focus, moves focus inward on open and restores it on close; closes on
 * Escape and backdrop click; and swaps display immediately under Reduced_Motion.
 */
import { useState } from 'react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, cleanup, fireEvent, act } from '@testing-library/react';
import { SoftreeModal } from '../softree-modal';

// Default jsdom matchMedia stub: Reduced_Motion OFF unless a test overrides it.
function stubMatchMedia(matches: boolean): void {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));
}

beforeEach(() => {
    stubMatchMedia(false);
    // Deterministic rAF so overflow-lock removal / entrance frames run on flush.
    vi.stubGlobal(
        'requestAnimationFrame',
        (cb: FrameRequestCallback): number => {
            return setTimeout(() => cb(performance.now()), 0) as unknown as number;
        },
    );
    vi.stubGlobal('cancelAnimationFrame', (id: number): void => {
        clearTimeout(id as unknown as ReturnType<typeof setTimeout>);
    });
});

afterEach(async () => {
    cleanup();
    // Flush any rAF (class-removal) scheduled by unmount cleanup so it cannot
    // leak into and pollute the next test, then reset shared state.
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });
    document.documentElement.classList.remove('lenis-stopped');
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

/** Flush pending macrotasks (our rAF stub schedules onto setTimeout(0)). */
async function flushFrames(): Promise<void> {
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });
}

describe('SoftreeModal', () => {
    it('renders nothing while closed', () => {
        render(
            <SoftreeModal open={false} onClose={() => { }} ariaLabel="Demo">
                <button type="button">Inside</button>
            </SoftreeModal>,
        );
        expect(screen.queryByRole('dialog')).toBeNull();
    });

    it('renders a dialog with aria-modal and aria-labelledby when open (Req 25.6)', async () => {
        render(
            <SoftreeModal open onClose={() => { }} labelledById="heading-1">
                <h2 id="heading-1">Enterprise tech stack</h2>
                <button type="button">Close</button>
            </SoftreeModal>,
        );
        await flushFrames();

        const dialog = screen.getByRole('dialog');
        expect(dialog.getAttribute('aria-modal')).toBe('true');
        expect(dialog.getAttribute('aria-labelledby')).toBe('heading-1');
        // aria-label is omitted when a labelledById is supplied.
        expect(dialog.getAttribute('aria-label')).toBeNull();
    });

    it('falls back to aria-label when no labelledById is provided', async () => {
        render(
            <SoftreeModal open onClose={() => { }} ariaLabel="Exit modal">
                <button type="button">Close</button>
            </SoftreeModal>,
        );
        await flushFrames();

        const dialog = screen.getByRole('dialog');
        expect(dialog.getAttribute('aria-label')).toBe('Exit modal');
        expect(dialog.getAttribute('aria-labelledby')).toBeNull();
    });

    it('applies `lenis-stopped` to <html> while open (Req 13.4, 15.3)', async () => {
        render(
            <SoftreeModal open onClose={() => { }} ariaLabel="Demo">
                <button type="button">Close</button>
            </SoftreeModal>,
        );
        await flushFrames();
        expect(document.documentElement.classList.contains('lenis-stopped')).toBe(true);
    });

    it('removes `lenis-stopped` within one frame on close (Req 13.4, 15.3)', async () => {
        const { rerender } = render(
            <SoftreeModal open onClose={() => { }} ariaLabel="Demo">
                <button type="button">Close</button>
            </SoftreeModal>,
        );
        await flushFrames();
        expect(document.documentElement.classList.contains('lenis-stopped')).toBe(true);

        rerender(
            <SoftreeModal open={false} onClose={() => { }} ariaLabel="Demo">
                <button type="button">Close</button>
            </SoftreeModal>,
        );
        await flushFrames();
        expect(document.documentElement.classList.contains('lenis-stopped')).toBe(false);
    });

    it('moves focus to the first focusable descendant on open (Req 25.7)', async () => {
        render(
            <SoftreeModal open onClose={() => { }} ariaLabel="Demo">
                <button type="button">First</button>
                <button type="button">Second</button>
            </SoftreeModal>,
        );
        await flushFrames();
        expect(document.activeElement).toBe(screen.getByText('First'));
    });

    it('returns focus to the trigger on close (Req 15.7, 25.7)', async () => {
        function Harness() {
            const [open, setOpen] = useState(false);
            return (
                <>
                    <button type="button" onClick={() => setOpen(true)}>
                        Trigger
                    </button>
                    <SoftreeModal open={open} onClose={() => setOpen(false)} ariaLabel="Demo">
                        <button type="button">Inside</button>
                    </SoftreeModal>
                </>
            );
        }

        render(<Harness />);
        const trigger = screen.getByText('Trigger');
        trigger.focus();
        expect(document.activeElement).toBe(trigger);

        fireEvent.click(trigger);
        await flushFrames();
        expect(document.activeElement).toBe(screen.getByText('Inside'));

        // Close via Escape; focus should return to the trigger.
        fireEvent.keyDown(document, { key: 'Escape' });
        await flushFrames();
        expect(document.activeElement).toBe(screen.getByText('Trigger'));
    });

    it('invokes onClose when Escape is pressed (Req 15.4)', async () => {
        const onClose = vi.fn();
        render(
            <SoftreeModal open onClose={onClose} ariaLabel="Demo">
                <button type="button">Close</button>
            </SoftreeModal>,
        );
        await flushFrames();

        fireEvent.keyDown(document, { key: 'Escape' });
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('invokes onClose on backdrop click by default', async () => {
        const onClose = vi.fn();
        render(
            <SoftreeModal open onClose={onClose} ariaLabel="Demo" backdropClassName="kore-backdrop">
                <button type="button">Close</button>
            </SoftreeModal>,
        );
        await flushFrames();

        fireEvent.click(document.querySelector('.kore-backdrop')!);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not close on backdrop click when closeOnBackdrop is false', async () => {
        const onClose = vi.fn();
        render(
            <SoftreeModal
                open
                onClose={onClose}
                ariaLabel="Demo"
                backdropClassName="kore-backdrop"
                closeOnBackdrop={false}
            >
                <button type="button">Close</button>
            </SoftreeModal>,
        );
        await flushFrames();

        fireEvent.click(document.querySelector('.kore-backdrop')!);
        expect(onClose).not.toHaveBeenCalled();
    });

    it('does not close when content (non-backdrop) is clicked', async () => {
        const onClose = vi.fn();
        render(
            <SoftreeModal open onClose={onClose} ariaLabel="Demo">
                <button type="button">Inside</button>
            </SoftreeModal>,
        );
        await flushFrames();

        fireEvent.click(screen.getByText('Inside'));
        expect(onClose).not.toHaveBeenCalled();
    });

    it('preserves the Source_Document `modal` and `open` class tokens', async () => {
        render(
            <SoftreeModal open onClose={() => { }} ariaLabel="Demo" className="enterprise">
                <button type="button">Close</button>
            </SoftreeModal>,
        );
        await flushFrames();

        const dialog = screen.getByRole('dialog');
        expect(dialog.classList.contains('modal')).toBe(true);
        expect(dialog.classList.contains('open')).toBe(true);
        expect(dialog.classList.contains('enterprise')).toBe(true);
    });

    it('renders into document.body via a portal', async () => {
        const { container } = render(
            <SoftreeModal open onClose={() => { }} ariaLabel="Demo">
                <button type="button">Close</button>
            </SoftreeModal>,
        );
        await flushFrames();

        // The portal escapes the component's container.
        expect(container.querySelector('[role="dialog"]')).toBeNull();
        expect(document.body.querySelector('[role="dialog"]')).not.toBeNull();
    });

    it('swaps to full opacity immediately under Reduced_Motion (Req 13.8, 15.9)', async () => {
        stubMatchMedia(true);
        render(
            <SoftreeModal open onClose={() => { }} ariaLabel="Demo">
                <button type="button">Close</button>
            </SoftreeModal>,
        );
        await flushFrames();

        const dialog = screen.getByRole('dialog');
        expect(dialog.style.opacity).toBe('1');
        // No opacity transition is declared under Reduced_Motion.
        expect(dialog.style.transition === '' || dialog.style.transition === 'none').toBe(
            true,
        );
    });
});
