# `#build-scale-optimize` Loop Pass

## Build
- Added `KoreBuildScaleOptimizeSection.tsx`.
- Preserved the exact original background, headline, five-tab outer DOM, nested tab groups, copy, images, and CTA markup.
- Added `koreTabs.ts`, a local Webflow-style tab initializer for exact sections that need tab state after React renders.
- The initializer handles active classes, ARIA state, `tabIndex`, `inert`, keyboard navigation, nested tabs, and autoplay progress CSS variable `--p`.

## Verification
- Route check: `/kore-ai-component` returned `200`.
- Lint check: no diagnostics for the edited files.
- Outer tabs check: Build, Scale, Optimize, Performance, and Foundation each activate the matching panel with correct ARIA and `inert` state.
- Nested tabs check: Build panel nested tabs activate matching panels and autoplay progress runs.
- Overflow check: no horizontal overflow detected.
- Screenshot: `build-scale-optimize-pass.png`.
