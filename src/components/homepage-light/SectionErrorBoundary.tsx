"use client";

import { Component, Fragment, ReactNode } from "react";
import { EASE } from "@/lib/motion";

/**
 * SectionErrorBoundary
 * ────────────────────
 * Per-section React error boundary used to wrap every `next/dynamic`
 * lazy boundary on the redesigned homepage. Two responsibilities:
 *
 *  1. Catch rendering or chunk-loading errors thrown by the lazy
 *     subtree and replace it with a token-styled inline error card
 *     (rounded-2xl, hairline `border-[#0a0a1a]/10`, "This section is
 *     temporarily unavailable.") painted on the section's surface
 *     token (`#FFFFFF`, `#F8F9FC`, or `#F3F0EE`).
 *
 *  2. Expose `withSectionTimeout`, a small helper that wraps a
 *     `next/dynamic` import factory in a 10-second `Promise.race`.
 *     If the chunk has not resolved within 10s the race rejects and
 *     the rejection bubbles up to the nearest `SectionErrorBoundary`,
 *     which renders the fallback card.
 *
 * The boundary is scoped to a single section: a failure here keeps
 * every already-rendered sibling section visible (Requirement 6.6).
 *
 * The "Retry" button bumps an internal `retryKey` and remounts the
 * subtree behind a keyed `<Fragment>`. Re-mounting the subtree forces
 * `next/dynamic` to re-instantiate its inner lazy component which in
 * turn re-invokes the import factory and attempts a fresh chunk load.
 *
 * Requirements: 6.6
 */

/** Default per-section chunk-load timeout in milliseconds. */
export const SECTION_CHUNK_TIMEOUT_MS = 10_000;

/** The Design_Tokens canvas surfaces a section may paint. */
export type SectionSurface = "#FFFFFF" | "#F8F9FC" | "#F3F0EE";

export interface SectionErrorBoundaryProps {
    /**
     * The Design_Tokens canvas surface assigned to the wrapped section.
     * Painted as the fallback card's outer background so the card never
     * shows a different surface than the section it replaces.
     */
    surface: SectionSurface;
    /**
     * Optional CSS `min-height` value (e.g. `"60vh"`, `"720px"`) so the
     * fallback occupies roughly the same vertical real estate as the
     * loaded section, avoiding a layout shift on failure.
     */
    minHeight?: string;
    /**
     * Optional human-readable section label appended to the fallback
     * message (e.g. `"AI insights"`). Used purely for accessibility —
     * never required by the visible message itself.
     */
    sectionLabel?: string;
    children: ReactNode;
}

interface SectionErrorBoundaryState {
    error: Error | null;
    retryKey: number;
}

/**
 * Wrap a `next/dynamic` import factory in a 10-second timeout race.
 *
 * @example
 * const FeaturesShowcaseLazy = dynamic(
 *   withSectionTimeout(() => import("@/components/features/FeaturesShowcase")),
 *   { loading: () => <SectionSkeleton surface="#F8F9FC" minHeight="100vh" /> },
 * );
 */
export function withSectionTimeout<T>(
    factory: () => Promise<T>,
    timeoutMs: number = SECTION_CHUNK_TIMEOUT_MS,
): () => Promise<T> {
    return () =>
        Promise.race<T>([
            factory(),
            new Promise<T>((_, reject) => {
                setTimeout(() => {
                    reject(
                        new Error(
                            `[SectionErrorBoundary] Section chunk failed to load within ${timeoutMs}ms.`,
                        ),
                    );
                }, timeoutMs);
            }),
        ]);
}

export class SectionErrorBoundary extends Component<
    SectionErrorBoundaryProps,
    SectionErrorBoundaryState
> {
    state: SectionErrorBoundaryState = { error: null, retryKey: 0 };

    static getDerivedStateFromError(
        error: Error,
    ): Partial<SectionErrorBoundaryState> {
        return { error };
    }

    componentDidCatch(error: Error): void {
        // Surface the failure during development so authors notice
        // when a section silently renders the inline error card.
        if (process.env.NODE_ENV !== "production") {
            console.error("[SectionErrorBoundary] caught:", error);
        }
    }

    private handleRetry = (): void => {
        // Bumping `retryKey` re-mounts the keyed <Fragment> below,
        // which forces any `next/dynamic` instance inside `children`
        // to re-instantiate and re-invoke its import factory.
        this.setState((prev) => ({
            error: null,
            retryKey: prev.retryKey + 1,
        }));
    };

    render() {
        const { surface, minHeight, sectionLabel, children } = this.props;
        const { error, retryKey } = this.state;

        if (error) {
            return (
                <div
                    role="alert"
                    aria-live="polite"
                    style={{ background: surface, minHeight }}
                    className="relative flex w-full items-center justify-center px-6 py-16 lg:px-12"
                >
                    <div className="flex w-full max-w-[640px] flex-col items-center gap-6 rounded-2xl border border-[#0a0a1a]/10 bg-white px-6 py-10 text-center shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)]">
                        <p className="text-base leading-relaxed text-[#0a0a1a]">
                            This section is temporarily unavailable
                            {sectionLabel ? `: ${sectionLabel}` : ""}.
                        </p>
                        <button
                            type="button"
                            onClick={this.handleRetry}
                            style={{ transitionTimingFunction: EASE.silk }}
                            className="inline-flex items-center gap-2 rounded-full bg-[#0a0a1a] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:-translate-y-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]/70"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            );
        }

        // Re-keyed Fragment: on retry, the entire subtree unmounts and
        // remounts so that any `next/dynamic` boundary inside `children`
        // re-runs its import factory.
        return <Fragment key={retryKey}>{children}</Fragment>;
    }
}

export default SectionErrorBoundary;
