# Hero Component Pass

## Source

- `Softree_/aipage.html`
- Lines `2416-2590`
- Section: `#meet-artemis.k2-section.k2-section-hero.on`

## Implemented

- `src/components/kore-ai-exact/KoreHeroSection.tsx`
- Wired through `KoreMeetArtemisSection` in `src/components/kore-ai-exact/sections.tsx`

## Preserved Elements

- Original hero section id/classes/data-scroll state
- Hero background image and overlay
- Label: `Kore.ai Agent Platform`
- Intro heading: `Meet { Artemis }`
- Main headline and italic subheadline
- Right/lower copy block
- `Get Demo` CTA with dotted arrow SVG
- Build / Scale / Optimize tab buttons
- Three Rive panel containers and original `.riv` source URLs

## Verification

- IDE lints on edited hero files: pass
- `npx tsc --noEmit --pretty false`: repo has pre-existing errors, none reported for `KoreHeroSection.tsx` or `sections.tsx`
- Fresh dev route check: `/kore-ai-component` returned `200`
- Chrome runtime check:
  - `#meet-artemis` exists
  - 9 direct `main.k2-main > section` elements remain
  - Hero text matches reference
  - 3 tab buttons and 3 Rive panels present
  - No horizontal overflow
  - No console warnings/errors during hero check
- Screenshot: `.planning/page-forge/kore-ai-exact/hero-component-pass.png`

## Next Component

- `#enterprise-ai-outcomes`
