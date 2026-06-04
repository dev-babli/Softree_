/**
 * Shared data primitives for the Kore.ai homepage clone fixtures.
 *
 * These interfaces are documented in design.md ("Data Models → Shared
 * Primitives") and are the canonical shapes imported by every
 * `src/components/kore/data/<section>.ts` fixture. They live here (rather than
 * being duplicated per-file) so the data layer has a single source of truth for
 * `ButtonData`, `LinkData`, `CtaBlock`, etc.
 *
 * Asset references flow through `assets.ts` (`AssetRef` / `ImageAssetRef`) per
 * Requirement 24; this module re-uses those types rather than re-declaring URL
 * shapes.
 *
 * NOTE ON `data/types.ts`: the execution brief allowed importing shared types
 * from `src/components/kore/data/types.ts` if present; it is not present, so the
 * shared primitives are defined here in the design-documented `_shared.ts`
 * location instead.
 */

import type { AssetRef, ImageAssetRef } from '../assets';

/**
 * A call-to-action button. Mirrors design.md `ButtonData`.
 *
 * `variant` maps to the Source_Document `.button` modifier attributes:
 *   - `primary`   → solid base button (no modifier attribute)
 *   - `secondary` → `is-ghost="1"` ghost treatment
 *   - `ghost`     → `is-ghost=""` (empty) light/ghost text-link treatment
 */
export interface ButtonData {
    readonly label: string;
    readonly href?: string;
    readonly target?: '_blank' | '_self';
    readonly rel?: string;
    readonly ariaLabel?: string;
    readonly variant: 'primary' | 'secondary' | 'ghost';
    /** For `hover-img-button` elements (Requirement 16). */
    readonly hoverImage?: AssetRef;
}

/** A plain navigational link. Mirrors design.md `LinkData`. */
export interface LinkData {
    readonly label: string;
    readonly href: string;
    readonly target?: '_blank' | '_self';
    readonly rel?: string;
    readonly ariaLabel?: string;
}

/**
 * A heading string with optional inline-highlight ranges (the source wraps
 * highlighted words in `<span>` nodes). Mirrors design.md `PortableHeading`.
 */
export interface PortableHeading {
    readonly text: string;
    readonly highlights?: readonly { readonly start: number; readonly end: number }[];
}

/**
 * A structured content node used by content modals whose body is richer than a
 * single string (design.md `ModalDescriptor.body: string | PortableContentNode[]`).
 *
 * Kept intentionally small — only the node kinds present in Source_Document
 * content modals are modelled.
 */
export type PortableContentNode =
    | { readonly type: 'paragraph'; readonly text: string }
    | { readonly type: 'heading'; readonly level: 1 | 2 | 3 | 4 | 5 | 6; readonly text: string }
    | { readonly type: 'image'; readonly image: ImageAssetRef }
    | { readonly type: 'group'; readonly heading?: string; readonly items: readonly string[] };

/**
 * A heading + body + primary (+ optional secondary) CTA card. Mirrors design.md
 * `CtaBlock`.
 *
 * DEVIATION (documented): design.md narrows `id` to the two Pre_Footer_CTA ids
 * inside the `KorePreFooterCta` section, but `KoreFooter.rfpCta` is also typed
 * `CtaBlock`. To allow that reuse, `id` is widened to `string` here; the
 * Pre_Footer_CTA fixture still pins the exact literal ids via its tuple.
 */
export interface CtaBlock {
    readonly id: string;
    readonly heading: string;
    readonly body: string;
    readonly primary: ButtonData;
    readonly secondary?: ButtonData;
}

/** Footer / navigation language toggle data. Mirrors design.md `LanguageToggleData`. */
export interface LanguageToggleData {
    readonly current: string;
    readonly languages: readonly { readonly code: string; readonly label: string }[];
}
