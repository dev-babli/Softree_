"use client";

import { FC } from "react";

/**
 * Token-aware loading skeleton for lazy-loaded Preserved_Sections.
 *
 * Replaces the legacy dark-void skeleton in `home-page.tsx`. The placeholder
 * paints exactly one of the three Design_Tokens canvas surfaces so the
 * skeleton is visually invisible until the lazy chunk hydrates and the final
 * section content fades in.
 *
 * Requirements:
 *  - 1.1: outer surface is exactly `#FFFFFF`, `#F8F9FC`, or `#F3F0EE`.
 *  - 6.2: skeleton background equals the surface token assigned to the
 *    loaded section; height kept within ±10% of the loaded section's final
 *    height to keep CLS contribution below 0.05.
 *
 * The shimmer bars use `#0a0a1a/5` and `#0a0a1a/8` exclusively — no dark
 * (`#0a0a0a`) or off-token color appears anywhere in this component.
 */
export interface SectionSkeletonProps {
    /** MUST be one of the three Design_Tokens canvas surfaces. */
    surface: "#FFFFFF" | "#F8F9FC" | "#F3F0EE";
    /** CSS `min-height` value (e.g. `"60vh"`, `"720px"`). Pass within ±10% of
     * the loaded section's final rendered height (Requirement 6.2). */
    minHeight: string;
    /** Optional accessible name for the placeholder. When omitted the
     * skeleton is `aria-hidden`. */
    label?: string;
}

export const SectionSkeleton: FC<SectionSkeletonProps> = ({
    surface,
    minHeight,
    label,
}) => {
    const a11yProps = label
        ? ({ role: "status", "aria-label": label, "aria-busy": true } as const)
        : ({ "aria-hidden": true } as const);

    return (
        <div
            {...a11yProps}
            style={{ background: surface, minHeight }}
            className="relative w-full"
        >
            <div className="absolute inset-x-0 top-1/3 mx-auto h-[2px] w-24 max-w-[80%] animate-pulse rounded-full bg-[#0a0a1a]/5" />
            <div className="absolute inset-x-0 top-1/2 mx-auto mt-3 h-2 w-48 max-w-[60%] animate-pulse rounded-full bg-[#0a0a1a]/[0.08]" />
        </div>
    );
};

export default SectionSkeleton;
