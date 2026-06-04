/**
 * @vitest-environment jsdom
 *
 * Unit tests for the `KoreButtonDot` primitive (task 3.1).
 *
 * Covers Requirements 6.7, 6.8, 11.3, 11.5, 20.4, 20.5: the dot-and-line CTA
 * renders the Source_Document `.button` markup (leading dot + underline) with
 * the exact class tokens mirrored from Source_Document, renders an `<a>` when
 * `href` is provided and a `<button type="button">` otherwise, maps the
 * `variant` prop to the source ghost modifier, and forwards anchor / a11y
 * attributes and the click handler.
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { KoreButtonDot } from '../kore-button-dot';

afterEach(() => {
    cleanup();
});

describe('KoreButtonDot', () => {
    it('renders the label inside the source `.text-style-1line` node', () => {
        render(<KoreButtonDot label="Get a demo" />);
        const label = screen.getByText('Get a demo');
        expect(label.classList.contains('text-style-1line')).toBe(true);
    });

    it('mirrors the Source_Document dot + underline DOM structure and class names', () => {
        const { container } = render(<KoreButtonDot label="Learn more" />);
        // Source_Document: .button > .text-style-1line + .btn_dot-block(
        //   .btn-dot-wrapper > .btn-dot, .btn_dot-line-wrapper > .btn_dot-line)
        expect(container.querySelector('.button')).not.toBeNull();
        expect(container.querySelector('.btn_dot-block')).not.toBeNull();
        expect(
            container.querySelector('.btn_dot-block .btn-dot-wrapper .btn-dot'),
        ).not.toBeNull();
        expect(
            container.querySelector(
                '.btn_dot-block .btn_dot-line-wrapper .btn_dot-line',
            ),
        ).not.toBeNull();
    });

    it('preserves the Webflow `w-inline-block` class token', () => {
        const { container } = render(<KoreButtonDot label="Register" />);
        expect(
            container.querySelector('.button')!.classList.contains('w-inline-block'),
        ).toBe(true);
    });

    it('renders an <a> with href, target and rel when href is provided', () => {
        const { container } = render(
            <KoreButtonDot
                label="Analyst Reports"
                href="/analyst-recognition"
                target="_blank"
                rel="noopener noreferrer"
            />,
        );
        const anchor = container.querySelector('a');
        expect(anchor).not.toBeNull();
        expect(anchor!.getAttribute('href')).toBe('/analyst-recognition');
        expect(anchor!.getAttribute('target')).toBe('_blank');
        expect(anchor!.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('renders a <button type="button"> when no href is provided', () => {
        const { container } = render(<KoreButtonDot label="Open" />);
        const button = container.querySelector('button');
        expect(button).not.toBeNull();
        expect(button!.getAttribute('type')).toBe('button');
        expect(container.querySelector('a')).toBeNull();
    });

    it('forwards the click handler', () => {
        const onClick = vi.fn();
        render(<KoreButtonDot label="Submit" onClick={onClick} />);
        fireEvent.click(screen.getByText('Submit'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('defaults to the primary variant (no is-ghost modifier attribute)', () => {
        const { container } = render(<KoreButtonDot label="Primary" />);
        expect(container.querySelector('.button')!.getAttribute('is-ghost')).toBeNull();
    });

    it('emits is-ghost="1" for the secondary variant (source ghost modifier)', () => {
        const { container } = render(
            <KoreButtonDot label="Secondary" variant="secondary" />,
        );
        expect(container.querySelector('.button')!.getAttribute('is-ghost')).toBe('1');
    });

    it('applies an aria-label override when provided', () => {
        render(<KoreButtonDot label="Go" ariaLabel="Discover more" />);
        expect(screen.getByLabelText('Discover more')).not.toBeNull();
    });

    it('merges a caller-supplied className after the source class tokens', () => {
        const { container } = render(
            <KoreButtonDot label="Custom" className="for-nav" />,
        );
        const el = container.querySelector('.button')!;
        expect(el.classList.contains('button')).toBe(true);
        expect(el.classList.contains('for-nav')).toBe(true);
    });
});
