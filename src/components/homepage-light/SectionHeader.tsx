"use client";

import { ReactNode } from "react";

/**
 * Design_Tokens accent color set — restricted to the three accents defined by
 * the About design language (Requirement 1.3 / 4.5):
 *   • `#FF6B00` — hero badge dot, primary CTA
 *   • `#FF5812` — team accent (warm orange)
 *   • `#1852FF` — stats, secondary CTA, About badge
 */
export type SectionHeaderAccent = "#FF6B00" | "#FF5812" | "#1852FF";

export interface SectionHeaderProps {
    /**
     * UPPERCASE label rendered inside the pill, with a leading accent dot.
     * Tracking is fixed at `0.20em` to stay within the 0.18–0.22em range
     * required by Requirement 1.7.
     */
    badge: string;
    /**
     * Accent color used for the badge dot, badge text, and badge border tint.
     * MUST be one of the three Design_Tokens accents.
     */
    accent: SectionHeaderAccent;
    /** Headline content. Renders as `<h2>` by default; the hero passes `as="h1"`. */
    headline: ReactNode;
    /** Optional supporting copy paragraph rendered beneath the headline. */
    body?: ReactNode;
    /**
     * Override heading level. Only the hero passes `"h1"`; every other section
     * SHOULD use the default `"h2"` to preserve the page's heading hierarchy
     * (Requirement 7.2).
     */
    as?: "h1" | "h2";
    /** Optional class names applied to the outer wrapper. */
    className?: string;
}

/**
 * Hex → 8-digit hex helper for translucent tints. Tailwind cannot generate
 * arbitrary `border-[#…]/20` utilities at runtime, so the badge uses inline
 * style for its accent-tinted surface and border. The accent set is fixed
 * (3 values) so the surface area is small and predictable.
 */
function withAlpha(hex: SectionHeaderAccent, alpha: number): string {
    // alpha is 0-1; convert to 2-digit hex
    const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
        .toString(16)
        .padStart(2, "0")
        .toUpperCase();
    return `${hex}${a}`;
}

/**
 * Shared section header for every Preserved_Section on the homepage.
 *
 * Renders, in this exact order (Requirement 1.7):
 *   1. Badge pill — leading accent dot + UPPERCASE label, tracking-[0.20em],
 *      accent-tinted border/background, accent text.
 *   2. Headline — display weight (`font-semibold`, `leading-[0.9]`,
 *      `tracking-[-0.04em]`). Size scales by heading level:
 *        • `as="h1"` → `clamp(48px, 8vw, 110px)`
 *        • `as="h2"` → `clamp(32px, 4.5vw, 56px)`
 *   3. Optional body — `text-base leading-relaxed text-[#0a0a1a]/70 max-w-[640px]`.
 *
 * Validates against Requirements 1.3 (accent discipline), 1.7 (composition
 * order), and 11.2 (parity attributes — typography scale, accent palette,
 * badge pill treatment).
 */
export function SectionHeader({
    badge,
    accent,
    headline,
    body,
    as = "h2",
    className,
}: SectionHeaderProps) {
    const HeadingTag = as;

    const headlineFontSize =
        as === "h1" ? "clamp(48px, 8vw, 110px)" : "clamp(32px, 4.5vw, 56px)";

    const wrapperClass = ["flex flex-col gap-6", className]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={wrapperClass}>
            <span
                className="inline-flex w-max items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.20em]"
                style={{
                    color: accent,
                    borderColor: withAlpha(accent, 0.2),
                    backgroundColor: withAlpha(accent, 0.08),
                }}
            >
                <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: accent }}
                />
                {badge}
            </span>

            <HeadingTag
                className="text-[#0a0a1a] font-semibold leading-[0.9] tracking-[-0.04em]"
                style={{ fontSize: headlineFontSize }}
            >
                {headline}
            </HeadingTag>

            {body !== undefined && body !== null && body !== "" ? (
                <p className="text-base leading-relaxed text-[#0a0a1a]/70 max-w-[640px]">
                    {body}
                </p>
            ) : null}
        </div>
    );
}

export default SectionHeader;
