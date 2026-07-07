/**
 * @vitest-environment jsdom
 *
 * Unit tests for the `SoftreeSectionPill` primitive (task 3.2).
 *
 * Covers Requirement 21.5: the section tag pill renders its label with the
 * Source_Document `section-tag` class token, the uppercase transform, and the
 * Source Code Pro font utility, plus the `bg-blur` source modifier.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { SoftreeSectionPill } from '../softree-section-pill';

afterEach(() => {
    cleanup();
});

describe('SoftreeSectionPill', () => {
    it('renders the provided label text', () => {
        render(<SoftreeSectionPill label="Industries" />);
        expect(screen.getByText('Industries')).toBeTruthy();
    });

    it('preserves the Source_Document `section-tag` class token', () => {
        render(<SoftreeSectionPill label="Outcomes" />);
        const el = screen.getByText('Outcomes');
        expect(el.classList.contains('section-tag')).toBe(true);
    });

    it('applies the uppercase transform and Source Code Pro font utilities (Req 21.5)', () => {
        render(<SoftreeSectionPill label="Analyst Recognition" />);
        const el = screen.getByText('Analyst Recognition');
        expect(el.classList.contains('uppercase')).toBe(true);
        expect(el.classList.contains('font-source-code-pro')).toBe(true);
    });

    it('does not uppercase the underlying text content (transform is CSS-only)', () => {
        render(<SoftreeSectionPill label="Partners" />);
        // Text node stays as authored; uppercasing is presentational via CSS.
        expect(screen.getByText('Partners').textContent).toBe('Partners');
    });

    it('omits the bg-blur attribute by default', () => {
        render(<SoftreeSectionPill label="Default" />);
        expect(screen.getByText('Default').getAttribute('bg-blur')).toBeNull();
    });

    it('emits the `bg-blur="1"` modifier attribute when bgBlur is true', () => {
        render(<SoftreeSectionPill label="Blurred" bgBlur />);
        expect(screen.getByText('Blurred').getAttribute('bg-blur')).toBe('1');
    });

    it('merges a caller-supplied className', () => {
        render(<SoftreeSectionPill label="Custom" className="mb-4" />);
        const el = screen.getByText('Custom');
        expect(el.classList.contains('section-tag')).toBe(true);
        expect(el.classList.contains('mb-4')).toBe(true);
    });
});
