# Annnimate Starter Pack

Production-grade animation components — yours to paste into any project. No attribution required, no expiration. A new free component joins the pack every week; the full library has 50+ more like these.

## What's inside

- **text-reveal** — Text comes in word by word or letter by letter as you scroll. Good for hero headlines that need some weight.
- **accordion** — A smooth accordion for FAQs and product details. Click a row and it opens with its height animating and the icon flipping, and the text can reveal line by line. Set it to one open at a time or several.
- **dual-scramble** — Text scrambles through a brand colour and then settles into its final colour. Fire it on scroll, hover, click or load. No layout shift, and screen readers still get the real words.
- **multi-level-drawer-menu** — A drawer menu with two panels. The first slides in, and if a category has sub-links, hovering it opens a second panel next to it. The page behind dims while the menu stays clickable, and on phones it turns into a tap-through drill-down.
- **image-fly-in** — Imagery continuously flies in from deep inside the page toward the viewer, fading in and out around a central zone that stays clear for your content. The whole field glides softly with your cursor.
- **scale-slider** — A row of square photos that shrink away toward one edge, with the biggest one cropped right off the screen. Drag it, throw it, scroll the page, or let it drift on its own.
- **curtain-slider** — A full-bleed image slider where each slide change plays a staggered curtain: the outgoing image is divided into twelve columns and each column's clip edge wipes sideways one after another, revealing the next image settling into place beneath. Title, chapter label, and index roll between slides, with arrow, drag, and keyboard navigation built in.
- **feature-dialog** — A preview tile with an expand button that opens a tall centered dialog - the page dims and blurs behind it, the dialog rises in with a fast fade, and a gradient band follows it up. Focus, Escape and the backdrop are all wired up.
- **ascii-overlay** — Data-styled characters bloom over a real photo or video as you scroll, tinted to the colours underneath and only appearing in the brighter areas. The photo itself never disappears - unlike ASCII effects that replace the image with characters entirely, this one only adds to it.

Each component ships in four formats:

- `*.html` + `*.css` + `*.js` — vanilla, paste anywhere
- `*.jsx` — React component (uses `useGSAP` + refs, no jQuery, SSR-safe)
- `*.vue` — Vue 3 `<script setup>` component

## Dependencies

These components use GSAP (https://gsap.com), which became 100% free with all plugins in mid-2024. Install via npm:

```bash
npm install gsap
```

Or load from CDN if you're working in vanilla:

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
```

## Configuration

Every component is configurable via `data-anm-*` attributes (no source edits required). Full attribute reference for each component lives at https://annnimate.com/animations/<slug>.

## The rest of the library

A new free component joins this pack every week. The full library has 50+, with new ones every week, every framework (HTML, React, Vue), every component built to the standard we ship for real brands.

See: https://annnimate.com/pricing?utm_source=starter-pack&utm_medium=email&utm_campaign=starter-delivery

— Julian + Adrian
Good Fella
