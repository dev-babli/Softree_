/**
 * `KoreSectionPill` — the uppercase Source Code Pro "eyebrow" pill label used as
 * a section tag throughout the Kore.ai homepage (Source_Document `.section-tag`).
 *
 * Fidelity notes (Requirements 21.5, 23.7):
 *   - Preserves the Source_Document `section-tag` class token verbatim so the
 *     base pill styling declared in the upstream Webflow stylesheet (border,
 *     padding, radius, color) and the in-scope modifier rules captured in the
 *     inline `<style>` block (`.section-tag[bg-blur='1']`,
 *     `[theme='dark'] .section-tag`) continue to apply.
 *   - Enforces the two computed properties Requirement 21.5 mandates directly on
 *     the element via token-backed utilities: `text-transform: uppercase`
 *     (Tailwind `uppercase`) and `font-family: Sourcecodepro`
 *     (`font-source-code-pro`, which resolves to the `--font-source-code-pro`
 *     `@theme` token mirrored from `tokens.ts` → `fonts.sourceCodePro`).
 *   - The label is rendered as-is; uppercasing is purely presentational via CSS
 *     `text-transform` (matching the source) so the underlying text content is
 *     preserved for assistive technology and copy.
 *
 * Server component: it renders static markup and needs no browser-only API, so
 * it is intentionally NOT marked `'use client'` (Requirement 23.5).
 *
 * Modifiers: Source_Document exposes a single section-tag modifier,
 * `[bg-blur='1']` (translucent white background, transparent border). It is
 * surfaced here through the optional `bgBlur` prop, which emits the
 * `bg-blur="1"` attribute the source CSS selector targets.
 */
export interface KoreSectionPillProps {
    /** The pill text. Displayed uppercase via CSS `text-transform`. */
    readonly label: string;
    /**
     * When `true`, emits the `bg-blur="1"` attribute that activates the
     * Source_Document `.section-tag[bg-blur='1']` rule (translucent white
     * background, transparent border).
     */
    readonly bgBlur?: boolean;
    /** Extra classes merged after the source class token and token utilities. */
    readonly className?: string;
}

export function KoreSectionPill({
    label,
    bgBlur,
    className,
}: KoreSectionPillProps) {
    const classes = ['section-tag', 'uppercase', 'font-source-code-pro', className]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classes} {...(bgBlur ? { 'bg-blur': '1' } : {})}>
            {label}
        </div>
    );
}
