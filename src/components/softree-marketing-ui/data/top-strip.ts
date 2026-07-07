/**
 * Top_Strip announcement-slider fixture (Requirement 4.1; task 5.1).
 *
 * Source: `public/softree-source-sections.html`
 *   - markup:  `<section class="… top-strip-box"> … <div class="top-strip-slider"></div>`
 *   - styling: `.top-strip-bar`, `.top-strip-bar.active`, `.top-strip-bar.new .sb-text>div:after`
 *   - script:  the "Top Strip Slider" inline `<script>` at the end of `<body>`
 *
 * The `CyclingStripSlide` interface mirrors design.md (`KoreTopStrip` section);
 * it is defined and exported here so the fixture has a single source of truth.
 * The `KoreTopStrip` section component (task 5.2) imports it from this module.
 *
 * ── SOURCE DISCREPANCY (flagged, not silently invented) ─────────────────────
 *
 *  EMPTY SLIDER IN SNAPSHOT. In the captured Source_Document the
 *  `.top-strip-slider` container is rendered EMPTY:
 *
 *      <div class="top-strip-slider"></div>
 *
 *  The rotation `<script>` queries `document.querySelectorAll('.top-strip-bar')`
 *  and immediately does `strips[0].classList.add('active')` — i.e. the
 *  `.top-strip-bar` slides are injected at runtime (Webflow CMS / personalization
 *  layer) and are therefore NOT present in the static HTML that is our single
 *  source of truth. There are ZERO `.top-strip-bar` elements anywhere in the
 *  document (confirmed: the class appears only in the `<style>` block and the
 *  rotation script, never as markup).
 *
 *  Per the spec's prime directive (clone the Source_Document verbatim; do not
 *  invent content), `topStripSlides` is exported as an EMPTY array rather than
 *  fabricating announcement copy/links that do not exist in the source. The
 *  `KoreTopStrip` component already handles N = 0 / N = 1 (no rotation) and
 *  N ≥ 2 (rotation) per Requirement 4.4. → If the intended announcement slides
 *  are known out-of-band, add them here in source order; the shape is ready.
 */

/**
 * One announcement message rendered inside Top_Strip and rotated by the
 * source rotation timer. Mirrors design.md `CyclingStripSlide`.
 *
 *   - `variant: 'new'` applies the `.top-strip-bar.new` modifier, which renders
 *     the uppercase "New" pill via `.sb-text > div:after` (Requirement 4.3).
 *   - `href` is `null` when the slide is not a link.
 */
export interface CyclingStripSlide {
    readonly id: string;
    readonly text: string;
    readonly href: string | null;
    readonly variant: 'default' | 'new';
}

/**
 * Cycling_Strip_Slides in Source_Document DOM order (Requirement 4.1).
 *
 * Empty because the captured `.top-strip-slider` contains no `.top-strip-bar`
 * nodes — see the file-header "SOURCE DISCREPANCY" note. Typed as
 * `readonly CyclingStripSlide[]` so slides can be appended without a shape
 * change.
 */
export const topStripSlides: readonly CyclingStripSlide[] = [] as const;

/**
 * Rotation interval in milliseconds, sourced from the Top_Strip rotation
 * `<script>` in Source_Document.
 *
 * The script declares `FIRST_SLIDE_DURATION = 6000` and
 * `OTHER_SLIDE_DURATION = 6000` and schedules the next slide via
 * `setTimeout(..., getDuration(index))`; both durations are 6000 ms, so the
 * single rotation interval is 6000 ms (Requirement 4.4).
 */
export const TOP_STRIP_ROTATION_MS = 6000;
