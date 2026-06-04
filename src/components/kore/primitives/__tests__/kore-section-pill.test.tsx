/**
 * @vitest-environment jsdom
 *
 * Unit tests for the `KoreSectionPill` primitive (task 3.2).
 *
 * Covers Requirement 21.5: the section tag pill renders its label with the
 * Source_Document `section-tag` class token, the uppercase transform, and the
 * Source Code Pro font utility, plus the `bg-blur` source modifier.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { KoreSectionPill } from '../kore-section-pill';

afterEach(() => {
    cleanup();
});

describe('KoreSectionPill', () => {
    it('renders the provided label text', () => {
        render(<KoreSectionPill label="Industries" />);
        expect(screen.getByText('Industries')).toBeTruthy();
    });

    it('preserves the Source_Document `section-tag` class token', () => {
        render(<KoreSectionPill label="Outcomes" />);
        const el = screen.getByText('Outcomes');
        expect(el.classList.contains('section-tag')).toBe(true);
    });

    it('applies the uppercase transform and Source Code Pro font utilities (Req 21.5)', () => {
        render(<KoreSectionPill label="Analyst Recognition" />);
        const el = screen.getByText('Analyst Recognition');
        expect(el.classList.contains('uppercase')).toBe(true);
        expect(el.classList.contains('font-source-code-pro')).toBe(true);
    });

    it('does not uppercase the underlying text content (transform is CSS-only)', () => {
        render(<KoreSectionPill label="Partners" />);
        // Text node stays as authored; uppercasing is presentational via CSS.
        expect(screen.getByText('Partners').textContent).toBe('Partners');
    });

    it('omits the bg-blur attribute by default', () => {
        render(<KoreSectionPill label="Default" />);
        expect(screen.getByText('Default').getAttribute('bg-blur')).toBeNull();
    });

    it('emits the `bg-blur="1"` modifier attribute when bgBlur is true', () => {
        render(<KoreSectionPill label="Blurred" bgBlur />);
        expect(screen.getByText('Blurred').getAttribute('bg-blur')).toBe('1');
    });

    it('merges a caller-supplied className', () => {
        render(<KoreSectionPill label="Custom" className="mb-4" />);
        const el = screen.getByText('Custom');
        expect(el.classList.contains('section-tag')).toBe(true);
        expect(el.classList.contains('mb-4')).toBe(true);
    });
});
