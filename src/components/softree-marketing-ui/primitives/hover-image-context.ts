'use client';

import { createContext } from 'react';

/**
 * Imperative registry that the Hover_Image_Preview exposes to descendant
 * components so any `hover-img-button` target can opt into the cursor-following
 * preview without prop-drilling (Requirement 16).
 *
 * Mirrors the Source_Document behaviour where a single floating
 * `.cta-hover-image` element is shared by every `.hover-img-button`, with each
 * button declaring its preview via a `data-img` attribute. In the React clone
 * the single preview element lives in `SoftreeHoverImagePreview` (task 18.1) and
 * each {@link SoftreeHoverImageTarget} registers its rendered DOM node here.
 */
export interface HoverImageRegistry {
    /**
     * Register a DOM element as a hover-image target.
     *
     * @param target  The rendered element that triggers the preview on
     *                `pointerenter` (the Source_Document `hover-img-button`).
     * @param dataImg The preview image URL (the source `data-img` attribute), or
     *                `null` / empty when the target has no preview — the real
     *                registry skips such targets without throwing (Requirement
     *                16.6).
     * @returns An unregister callback that detaches the target's listeners and
     *          removes it from the registry. Callers MUST invoke it on unmount.
     */
    register(target: HTMLElement, dataImg: string | null): () => void;
}

/**
 * Default no-op registry used when no {@link HoverImageContext} provider is
 * mounted above a {@link SoftreeHoverImageTarget}.
 *
 * `register` returns a no-op unregister so targets are always safe to render —
 * including during server rendering, in isolation (unit tests / Storybook), or
 * before the page-level `SoftreeHoverImagePreview` provider exists. No DOM
 * listeners are attached and nothing is thrown.
 */
export const noopHoverImageRegistry: HoverImageRegistry = {
    register: () => () => {
        /* no-op: no preview provider mounted */
    },
};

/**
 * Shared context carrying the active {@link HoverImageRegistry}.
 *
 * The real registry is supplied by `SoftreeHoverImagePreview`
 * (`src/components/softree-marketing-ui/sections/softree-hover-image-preview.tsx`, task 18.1),
 * which renders the single fixed-position `.cta-hover-image` element and wires
 * up the `pointerenter` / `pointerleave` / `scroll` lifecycle plus the
 * requestAnimationFrame lerp loop (Requirement 16). Until that provider mounts
 * the context resolves to {@link noopHoverImageRegistry}, so consumers never
 * need a null check.
 */
export const HoverImageContext =
    createContext<HoverImageRegistry>(noopHoverImageRegistry);
