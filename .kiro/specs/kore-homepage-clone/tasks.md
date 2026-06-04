# Implementation Plan: Kore.ai Homepage Clone

## Overview

Convert the feature design into a series of prompts for a code-generation LLM that will implement each step with incremental progress. Make sure that each prompt builds on the previous prompts, and ends with wiring things together. There should be no hanging or orphaned code that isn't integrated into a previous step. Focus ONLY on tasks that involve writing, modifying, or testing code.

The implementation is a 99.9% pixel-perfect React clone of the Kore.ai homepage at the Next.js App Router route `/kore-ai-component`, sourced from `public/kore-source-sections.html`. Work proceeds bottom-up: Design_Tokens and Asset_Manifest first, then primitive components, then sections, then page composition with Lenis/GSAP/Swiper/Rive orchestration, then property/integration/visual tests. Every literal style value is read from `tokens.ts`/`tokens.css`, every asset URL flows through `assets.ts`, and every Out_Of_Scope_Script and Out_Of_Scope_Backend is excluded by construction.

Stack: TypeScript, React 19, Next.js 16 App Router, Tailwind v4, GSAP 3.15 + ScrollTrigger, Lenis 1.3, Swiper 12, `@rive-app/canvas` (the only new top-level runtime dependency permitted). Test stack: Vitest + @testing-library/react, fast-check (devDependency only) for property tests, Puppeteer + pixelmatch for visual fidelity.

## Tasks

- [x] 1. Establish foundation: dependency, tokens, assets, keyframes
  - [x] 1.1 Add `@rive-app/canvas` to `package.json` dependencies and install
    - Add `@rive-app/canvas` at a pinned version to the `dependencies` block of the workspace root `package.json`
    - Install `fast-check` and `pixelmatch` and any missing test peers under `devDependencies`
    - Run `pnpm install` and commit the lockfile
    - Confirm no other entries in `package.json` are touched
    - _Requirements: 1.8, 29.7, 29.8_

  - [x] 1.2 Extract Source_Document style audit into a build-time script
    - Create `scripts/extract-kore-styles.mjs` that parses `public/kore-source-sections.html`, walks every `<style>` block plus inline style attributes, and emits a JSON inventory of distinct color, font-family, font-size, font-weight, line-height, letter-spacing, spacing, radius, shadow, duration, easing, z-index, and breakpoint values
    - Output goes to `scripts/.kore-style-inventory.json`, used as the input for tokens.ts and tokens.css authoring
    - Idempotent: re-running produces a byte-identical output for the same source
    - _Requirements: 22.1, 22.2, 22.3, 22.4, 22.5_

  - [x] 1.3 Author `src/components/kore/tokens.ts` with typed `as const` records
    - Define and export `colors`, `fonts`, `fontSizes`, `fontWeights`, `lineHeights`, `letterSpacings`, `spacing`, `radii`, `shadows`, `durations`, `easings`, `zIndices`, `breakpoints`
    - Populate every leaf from `scripts/.kore-style-inventory.json`
    - Narrow every record with `as const`; export a single `tokens` namespace barrel
    - _Requirements: 22.1, 22.2, 22.3, 22.4, 22.5_

  - [x] 1.4 Author `src/components/kore/tokens.css` with Tailwind v4 `@theme` block
    - Mirror every leaf in `tokens.ts` to a `--<kebab-case-key>` custom property under `@theme`
    - Use kebab-case derivation that matches the parity test in task 1.6
    - Import `tokens.css` from `src/app/kore-ai-component/page.tsx` (or its layout) so Tailwind v4 picks it up
    - _Requirements: 22.7_

  - [x] 1.5 Author `src/components/kore/keyframes.css` with every `@keyframes` block from Source_Document
    - Copy `marqueeSlide`, `sideArrowFlow`, every accordion grid transition rule, and any other `@keyframes` declared in the inline style block of Source_Document with frame stops, percentages, and property values exactly equal
    - Emit the static `[transition-delay="0".."15"]` rule block (`0.1s + n * 0.1s`) in the same file
    - Import `keyframes.css` from the same place as `tokens.css`
    - _Requirements: 19.5, 20.1, 20.2_

  - [x] 1.6 Property test: token coverage and tokens.ts ↔ tokens.css parity
    - **Property 9: Token Coverage and tokens.ts ↔ tokens.css Parity**
    - **Validates: Requirements 22.6, 22.7**
    - File: `tests/property/token-coverage.test.ts`
    - AST walk every file under `src/components/kore/` and `src/app/kore-ai-component/` and assert no literal numeric / color / easing / duration / radius / shadow values appear at call sites
    - Parse `tokens.css` and assert one-to-one cardinality with `tokens.ts` leaves
    - _Requirements: 22.6, 22.7_

  - [x] 1.7 Author `src/components/kore/assets.ts` typed Asset_Manifest
    - Define `AssetKind`, `CdnPassthroughAsset`, `LocalAsset`, `AssetRef`, `ImageAssetRef`, `VideoAssetRef` per design
    - Add one entry per distinct asset URL extracted from Source_Document via a build-time helper at `scripts/extract-kore-assets.mjs`
    - Group entries under section keys (`hero`, `industryTabs`, `businessOutcomes`, …)
    - For each `.riv` URL emit a `cdn-passthrough` entry plus a `fallback` `local` entry under `/kore/rive/`
    - _Requirements: 24.1, 24.2, 24.3, 24.4, 24.5_

  - [x] 1.8 Stage required `Local_Asset` files under `public/kore/`
    - Run `scripts/extract-kore-assets.mjs --download-locals` to download every asset classified as `local` in `assets.ts` and place it under `public/kore/<section>/<asset>.<ext>`
    - Stage `.riv` fallbacks under `public/kore/rive/`
    - Verify each `local` URL resolves to an existing file on disk
    - _Requirements: 24.3, 24.4_

  - [x] 1.9 Property test: Asset Manifest Well-Formedness
    - **Property 10: Asset Manifest Well-Formedness**
    - **Validates: Requirements 24.1, 24.2, 24.3, 24.4, 24.5**
    - File: `tests/property/asset-manifest.test.ts`
    - Parse `public/kore-source-sections.html`, extract every URL at the declared selector/attribute pairs, assert exactly one matching entry in `assets.ts` (and vice versa), assert every `local` URL exists on disk, assert every `.riv` entry has a `fallback`
    - _Requirements: 24.1, 24.2, 24.3, 24.4, 24.5_

- [ ] 2. Build cross-section hooks
  - [~] 2.1 Implement `src/components/kore/hooks/use-reduced-motion.ts`
    - Subscribe to `matchMedia('(prefers-reduced-motion: reduce)')`, return current value, react to `change` events
    - SSR-safe: returns `false` on the server and updates after mount
    - _Requirements: 4.9, 6.10, 8.11, 13.8, 14.9, 15.9, 17.7, 18.7, 19.12, 20.9_

  - [~] 2.2 Implement `src/components/kore/hooks/use-coarse-pointer.ts`
    - Subscribe to `matchMedia('(hover: none) and (pointer: coarse)')`, SSR-safe
    - _Requirements: 16.5_

  - [~] 2.3 Implement `src/components/kore/hooks/use-lenis.ts`
    - Instantiate Lenis with the `duration`, `easing`, `smoothWheel`, `smoothTouch`, `direction`, `gestureDirection` values declared in Source_Document (read from tokens)
    - Register a GSAP ticker callback that calls `lenis.raf(time * 1000)`; set `gsap.ticker.lagSmoothing(0)`
    - Cleanup on unmount: kill every `ScrollTrigger`, remove the ticker callback, call `lenis.destroy()`
    - When Reduced_Motion is true OR `requestAnimationFrame` is undefined OR `new Lenis(...)` throws: skip instantiation and fall back to native scroll
    - _Requirements: 19.1, 19.2, 19.3, 19.11, 19.12, 26.6_

  - [~] 2.4 Implement `src/components/kore/hooks/use-scroll-triggers.ts`
    - Register `ScrollTrigger`s for `[data-anim]`, `[data-anim-rotate]`, `[data-anim-scale]`, `[data-anim-hero-image]`, `[data-stagger]` with `start: "top 95%"` and `once: true`, applying the entrance transitions exactly as declared in Source_Document
    - When Reduced_Motion is true: skip ScrollTrigger registration and apply the final post-animation state on mount within 1 animation frame
    - _Requirements: 19.4, 19.6, 19.7, 19.8, 19.9, 19.10, 19.12_

  - [~] 2.5 Implement `src/components/kore/hooks/use-rive-block.ts`
    - Lazy-mount the Rive runtime via dynamic `import('@rive-app/canvas')` keyed on `IntersectionObserver` with `rootMargin: '200px'`
    - Race the `onLoad` callback against a 10s `setTimeout`; on rejection or timeout, leave the canvas hidden and keep the poster `<img>` visible
    - Suppress console errors; emit zero unhandled errors
    - When Reduced_Motion: hold canvas at first frame
    - _Requirements: 6.4, 6.5, 6.9, 6.10, 8.10, 8.11, 26.5, 27.6_

  - [~] 2.6 Implement `src/components/kore/hooks/use-focus-trap.ts`
    - Trap Tab and Shift+Tab inside the supplied container element while `active` is true
    - Restore focus to the prior `document.activeElement` on deactivation
    - Listen for Escape and call the supplied `onEscape` callback
    - _Requirements: 13.5, 13.7, 15.4, 15.7, 25.7_

  - [~] 2.7 Implement `src/components/kore/hooks/use-tab-strip.ts`
    - Manage active tab id, key handlers (Arrow Left / Right / Home / End), and emit `aria-selected`, `aria-controls`, `aria-labelledby` per the WAI-ARIA Tab pattern
    - Provide a typed `useTabStrip<T extends string>({ tabs, initial })` hook returning `{ active, setActive, getTabProps, getPanelProps }`
    - _Requirements: 7.3, 7.4, 8.4, 9.2, 9.6, 25.10_

  - [ ]* 2.8 Property test: Universal Tab Strip Invariant
    - **Property 4: Universal Tab Strip Invariant**
    - **Validates: Requirements 7.3, 7.4, 7.5, 8.1, 8.4, 8.5, 8.6, 9.2, 9.3, 25.10**
    - File: `tests/property/tab-strip.test.ts`
    - Use fast-check to generate sequences of activations across 2..9 tabs; assert exactly one `aria-selected="true"`, all others false, exactly one panel visible, ARIA updates within 100 ms, panel swap within 500 ms
    - _Requirements: 7.3, 7.4, 8.1, 8.4, 9.2, 25.10_

- [ ] 3. Build shared primitive components
  - [~] 3.1 Implement `KoreButtonDot` primitive at `src/components/kore/primitives/kore-button-dot.tsx`
    - Props: `label`, `href?`, `onClick?`, `target?`, `rel?`, `ariaLabel?`, `variant?`
    - Render the source `.button` markup with leading dot and underline; hover transitions read from `tokens.durations` and `tokens.easings`
    - _Requirements: 6.7, 6.8, 11.3, 11.5, 20.4, 20.5_

  - [~] 3.2 Implement `KoreSectionPill` primitive at `src/components/kore/primitives/kore-section-pill.tsx`
    - Render uppercase Source Code Pro pill labels matching the source
    - _Requirements: 21.5_

  - [~] 3.3 Implement `KoreTabStrip` and `KoreTabPanel` primitives
    - File: `src/components/kore/primitives/kore-tab-strip.tsx`, `src/components/kore/primitives/kore-tab-panel.tsx`
    - Wire `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `aria-labelledby`, keyboard navigation via `useTabStrip`
    - Active state styling via tokens
    - _Requirements: 7.3, 7.4, 8.1, 8.4, 9.2, 9.6, 25.10_

  - [~] 3.4 Implement `KoreAccordionRow` primitive at `src/components/kore/primitives/kore-accordion-row.tsx`
    - Markup carries `data-accordion-list="css"`, `data-accordion-body`, and toggles `data-accordion="active"`
    - Apply `grid-template-rows: 0fr → 1fr` with `0.6s cubic-bezier(0.625, 0.05, 0, 1)` from tokens
    - Rotate the accordion icon 180° and the cross icon 45° when active
    - _Requirements: 3.6, 5.11, 14.6, 20.7, 20.8_

  - [~] 3.5 Implement `KoreModal` primitive at `src/components/kore/primitives/kore-modal.tsx`
    - Render `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
    - Apply `lenis-stopped` to `<html>` while open; remove on close within 1 frame
    - Manage backdrop click, Esc handler, focus trap via `use-focus-trap`, focus return to trigger
    - Reduced_Motion path swaps display immediately within 1 animation frame
    - _Requirements: 13.4, 13.5, 13.7, 13.8, 15.3, 15.4, 15.7, 15.8, 15.9, 25.6, 25.7_

  - [~] 3.6 Implement `KoreSwiperWrapper` primitive at `src/components/kore/primitives/kore-swiper-wrapper.tsx`
    - SSR-safe skeleton (`<div class="swiper">`, `<div class="swiper-wrapper">`, child slides) before hydration
    - Lazy-mount the Swiper instance via `IntersectionObserver` with `rootMargin: '200px'` if the host first appears more than 844 px below scroll position 0
    - Apply the `modules` and `config` props verbatim from the supplied data
    - _Requirements: 7.6, 10.2, 26.4, 27.6, 27.8_

  - [~] 3.7 Implement `KoreRiveCanvas` primitive at `src/components/kore/primitives/kore-rive-canvas.tsx`
    - Render the poster `<img>` immediately; mount a `<canvas>` overlay when host enters viewport
    - Use `use-rive-block` to manage load and timeout
    - Opacity 0 → 1 over 350 ms after first frame paint
    - _Requirements: 6.4, 6.5, 6.9, 8.10, 26.5_

  - [~] 3.8 Implement `KoreMarquee` and `KoreSideArrow` primitives
    - File: `src/components/kore/primitives/kore-marquee.tsx`, `src/components/kore/primitives/kore-side-arrow.tsx`
    - `KoreMarquee` applies the `marqueeSlide` keyframe with `[marquee-anim="20s"]` config
    - `KoreSideArrow` applies `sideArrowFlow` 1.5s infinite with the staggered 0s/0.3s child delays
    - When Reduced_Motion: `animation-play-state: paused`
    - _Requirements: 6.6, 20.3, 20.6, 20.9_

  - [~] 3.9 Implement `KoreHoverImageTarget` primitive at `src/components/kore/primitives/kore-hover-image-target.tsx`
    - Imperatively register the rendered element with the `HoverImageContext` registry on mount; unregister on unmount
    - Pass-through children
    - _Requirements: 8.8, 8.9, 16.2, 16.3, 16.4_

  - [ ]* 3.10 Unit tests for `KoreModal` and `KoreAccordionRow`
    - File: `src/components/kore/primitives/__tests__/kore-modal.test.tsx`, `…/kore-accordion-row.test.tsx`
    - Cover Esc-to-close, focus return, backdrop click, accordion grid transition timing
    - _Requirements: 3.6, 13.5, 15.4, 25.6, 25.7_

- [ ] 4. Implement Loader section
  - [~] 4.1 Implement `KoreLoader` at `src/components/kore/sections/kore-loader.tsx`
    - `'use client'`; render two stacked logo nodes with the source classes `.loader.logo-1` and `.loader.logo-2`
    - On mount inside `useEffect`: apply `loading` to `<html>` within 1 frame, hold first logo for the source-declared duration (200..2000 ms), cross-fade to second logo within 1000 ms, remove `loading`, apply `ready`, unmount
    - 5000 ms force-complete safeguard
    - When Reduced_Motion: skip entirely, apply `ready` within 1 frame
    - Never apply the `anti-flicker` class
    - _Requirements: 1.9, 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.7, 17.8_

  - [~] 4.2 Author `src/components/kore/data/loader.ts` fixture
    - Export the loader's first-logo display duration token-bound; export logo asset refs
    - _Requirements: 17.3_

  - [ ]* 4.3 Property test: Loader Sequence Timing
    - **Property 7: Loader Sequence Timing**
    - **Validates: Requirements 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.8, 1.9**
    - File: `tests/property/loader-sequence.test.ts`
    - Use fast-check to vary first-logo duration in [200, 2000] ms; assert `loading` present for `[0, t_complete)`, `t_complete ≤ min(D + 1000, 5000)`, `ready` applied, `anti-flicker` never applied
    - _Requirements: 1.9, 17.1, 17.4, 17.5, 17.8_

- [ ] 5. Implement Top Strip section
  - [~] 5.1 Author `src/components/kore/data/top-strip.ts` fixture
    - Export `topStripSlides` from Source_Document `.top-strip-box` in source order, each with `id`, `text`, `href`, `variant`
    - Export `TOP_STRIP_ROTATION_MS` from the source rotation script
    - _Requirements: 4.1_

  - [~] 5.2 Implement `KoreTopStrip` at `src/components/kore/sections/kore-top-strip.tsx`
    - `'use client'`; render every Cycling_Strip_Slide as `<div class="top-strip-bar">`
    - Apply the source-declared background color, foreground text color, font-size, font-weight, padding, height
    - Render the `.top-strip-bar.new` modifier pill via `KoreSectionPill`
    - On mount with N ≥ 2 slides: display index 0 at opacity 1, advance with `setInterval(rotationIntervalMs)`, fade outgoing 1→0 and incoming 0→1 with `opacity 1s ease-in-out`, loop modulo N
    - Close button (accessible name from data) stops the timer, hides the strip, persists in-memory only for the page session
    - When Reduced_Motion: replace the 1s opacity fade with an immediate slide swap within 1 frame
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9_

  - [ ]* 5.3 Property test: Top Strip Rotation Correctness
    - **Property 3: Top Strip Rotation Correctness**
    - **Validates: Requirements 4.4, 4.5, 4.6, 4.8**
    - File: `tests/property/top-strip-rotation.test.ts`
    - Use fast-check to generate slide arrays of length 2..10 and tick counts ≥ 0; assert active index = `K mod N`, opacity transitions complete within 1000 ms, close-button activation freezes future ticks
    - _Requirements: 4.4, 4.5, 4.6, 4.8_

- [ ] 6. Implement Navigation section
  - [~] 6.1 Author `src/components/kore/data/navigation.ts` fixture
    - Export the four `MegaMenuItem`s (`agent-platform`, `agentic-ai-apps`, `agent-marketplace`, `more`) with their `MegaMenuPanel` columns, recent insights, and event CTA
    - Export the language toggle data and demo CTA
    - _Requirements: 5.2, 5.5, 5.6, 5.7, 5.8_

  - [~] 6.2 Implement `KoreNavigation` at `src/components/kore/sections/kore-navigation.tsx`
    - `'use client'`; render brand logo, four top-level items, language toggle, Get-a-demo CTA in source order
    - Sticky behavior: `position: sticky` with the `transition: transform 0.9s` rule when the strip's bottom edge scrolls above viewport top
    - Mega_Menu open/close on pointer enter/leave; transitions opacity 0→1 and `.mega-column` `translateY(2rem) opacity 0` → `translateY(0) opacity 1` with nth-child delays 0s/0.1s/0.2s
    - When viewport ≥ 992 px render Mega_Menu; below render Mobile_Drawer with hamburger toggle (click + Enter + Space)
    - Mobile_Drawer accordion sub-menus via `KoreAccordionRow`
    - Apply `lenis-stopped` to `<html>` while drawer open; remove on close
    - Annotate hamburger toggle and language toggle with `aria-label`; annotate disclosure triggers with `aria-expanded` and `aria-controls`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.10, 5.11, 5.12, 5.13, 25.4, 25.5_

  - [ ]* 6.3 Unit tests for `KoreNavigation`
    - File: `src/components/kore/sections/__tests__/kore-navigation.test.tsx`
    - Cover sticky behavior at scroll boundary, hamburger toggle, drawer accordion expansion, `lenis-stopped` toggling
    - _Requirements: 5.1, 5.10, 5.12, 5.13_

- [ ] 7. Implement Hero section
  - [~] 7.1 Author `src/components/kore/data/hero.ts` fixture
    - Export `heroData` with headline (PortableHeading), subhead, two CTAs, Artemis announcement card, background video asset, and exactly three RiveCardData entries (`pre-built-applications`, `application-accelerators`, `tailored-applications`) each with `riveSrc` and `posterFallback`
    - _Requirements: 6.2, 6.3, 6.4_

  - [~] 7.2 Implement `KoreHero` at `src/components/kore/sections/kore-hero.tsx`
    - `'use client'`; outer `<section class="section-home-hero _100vh pb-0">` with `height: 100vh`, `padding-bottom: 0`
    - Render background `<video>` with `src`, `poster`, `autoplay`, `loop`, `muted`, `playsinline` from data
    - Render headline, subhead, demo CTA via `KoreButtonDot`, analyst-reports CTA, Artemis announcement card
    - Render three `KoreRiveCanvas` blocks in document order; each driven by `use-rive-block` with the 200 px pre-fetch margin and 10s timeout fallback
    - Render `KoreSideArrow` for the side scroll indicator
    - When Reduced_Motion: pause background video on first frame, hold each Rive on first frame, disable side-arrow keyframe
    - On Rive load failure: keep canvas at opacity 0, render the poster `<img>` from `Asset_Manifest.fallback`
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 6.10_

  - [ ]* 7.3 Unit tests for `KoreHero`
    - File: `src/components/kore/sections/__tests__/kore-hero.test.tsx`
    - Cover Reduced_Motion video pause, button hover transitions, Rive load timeout fallback to poster
    - _Requirements: 6.5, 6.9, 6.10_

- [ ] 8. Implement Industry Tabs section
  - [~] 8.1 Author `src/components/kore/data/industry-tabs.ts` fixture
    - Export `industryTabsData` with the five tabs in source order (`banking`, `healthcare`, `retail`, `telecom-and-media`, `business`), each with logos copied one-to-one from Source_Document
    - Export the per-industry Swiper config matching Source_Document `slidesPerView`, `spaceBetween`, `loop`, `speed`, `autoplay`, `freeMode`, `breakpoints`
    - `initialActive: 'banking'`
    - _Requirements: 7.1, 7.2, 7.3, 7.6_

  - [~] 8.2 Implement `KoreIndustryTabs` at `src/components/kore/sections/kore-industry-tabs.tsx`
    - `'use client'`; render heading, then `KoreTabStrip` with five tabs, then five `KoreTabPanel`s each containing a `KoreSwiperWrapper`
    - Apply the section background, padding, container width, heading typography from tokens
    - Each logo wrapper is 120px wide with 22px image height; image `alt` is the brand name
    - Apply `[tabs-component] [tabs-content]:not(.active) { display: none }` rule
    - Use `KoreMarquee` for the marquee animation when applicable
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 20.3_

  - [ ]* 8.3 Unit tests for `KoreIndustryTabs`
    - File: `src/components/kore/sections/__tests__/kore-industry-tabs.test.tsx`
    - Cover Banking-default selection, ARIA wiring, Swiper config equality (deep-equal against fixture)
    - _Requirements: 7.3, 7.4, 7.6_

- [ ] 9. Implement Business Outcomes section
  - [~] 9.1 Author `src/components/kore/data/business-outcomes.ts` fixture
    - Export `businessOutcomesData` with the four `OutcomesTabData` entries in order
    - The `agent-platform-artemis` entry includes nine `ArtemisSubTabData` entries
    - Embed `RiveCardData` for the Application_Accelerators tab block where source declares Rive
    - Each `hover-img-button` carries its `data-img` value
    - _Requirements: 8.1, 8.3, 8.10_

  - [~] 9.2 Implement `KoreBusinessOutcomes` at `src/components/kore/sections/kore-business-outcomes.tsx`
    - `'use client'`; render the outer `#explore-products` wrapper, heading, then `KoreTabStrip` with four Outcomes_Tabs
    - Default active = `pre-built-applications`
    - Each pane renders its service-card grid, hover-image buttons (wrapped in `KoreHoverImageTarget`), and embedded Rive blocks
    - When `agent-platform-artemis` is active: add `dark-mode` class to `#explore-products`, render the nine Artemis_Sub_Tabs via a nested `KoreTabStrip`, default first sub-tab active
    - When transitioning away from `agent-platform-artemis`: remove `dark-mode` within 1 frame
    - On sub-tab activation: replay GSAP entrance timeline (use `useGsapTimeline` ref); when Reduced_Motion: skip timeline and apply final state in 1 frame
    - Apply `[tabs-component] [tabs-content]:not(.active) { display: none }` rule
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 8.10, 8.11_

  - [ ]* 9.3 Unit tests for `KoreBusinessOutcomes`
    - File: `src/components/kore/sections/__tests__/kore-business-outcomes.test.tsx`
    - Cover dark-mode toggle on Artemis activation/deactivation, Artemis sub-tab GSAP timeline replay, Reduced_Motion skip path
    - _Requirements: 8.5, 8.6, 8.7, 8.11_

- [ ] 10. Implement Analyst Recognition section
  - [~] 10.1 Author `src/components/kore/data/analyst-recognition.ts` fixture
    - Export `analystRecognitionData` with four tabs in order (`conversational-ai-platforms`, `cognitive-search-platforms`, `genai-applications`, `genai-engineering`)
    - Each tab carries `body`, `analystImage` (with srcset/sizes/alt), `cta`
    - _Requirements: 9.1, 9.4_

  - [~] 10.2 Implement `KoreAnalystRecognition` at `src/components/kore/sections/kore-analyst-recognition.tsx`
    - `'use client'`; render heading, then `KoreTabStrip` with four tabs and matching panels
    - Default active = `conversational-ai-platforms`
    - Read `data-duration-in="300"`, `data-duration-out="100"`, `data-easing` from `tokens.durations` / `tokens.easings`
    - Annotate tablist + tabs + panels with the WAI-ARIA Tab pattern
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [~] 11. Checkpoint - Foundation, Loader, Top_Strip, Navigation, Hero, Industry_Tabs, Business_Outcomes, Analyst_Recognition complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Implement Testimonials section
  - [~] 12.1 Author `src/components/kore/data/testimonials.ts` fixture
    - Export every testimonial slide one-to-one from Source_Document with `customerLogo`, `customerName`, `role`, `quote`
    - Export the Swiper config matching Source_Document
    - _Requirements: 10.1, 10.2_

  - [~] 12.2 Implement `KoreTestimonials` at `src/components/kore/sections/kore-testimonials.tsx`
    - `'use client'`; render via `KoreSwiperWrapper` with autoplay, loop, navigation, pagination from source
    - Pause-on-hover via `mouseenter` / `mouseleave`
    - Disabled prev/next styling when loop is off and at boundary slides
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9_

- [ ] 13. Implement Strategic Partners section
  - [~] 13.1 Author `src/components/kore/data/strategic-partners.ts` fixture
    - Export `strategicPartnersData` with exactly two cards in order Microsoft, AWS
    - _Requirements: 11.1_

  - [~] 13.2 Implement `KoreStrategicPartners` at `src/components/kore/sections/kore-strategic-partners.tsx`
    - Server component; render heading and two partner cards in source DOM order
    - Each card: image (preserving aspect ratio + object-fit, alt = brand name), heading, body, CTA via `KoreButtonDot`
    - On image error: preserve layout via width/height attributes, keep alt text visible
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7_

- [ ] 14. Implement AI Insights section
  - [~] 14.1 Author `src/components/kore/data/insights.ts` fixture
    - Export `aiInsightsData` with exactly one `featured` BlogItem (`variant: 'featured'`) and exactly four `latest` BlogItems (`variant: 'latest'`) sourced from Source_Document
    - Permit empty `readTime` strings
    - _Requirements: 12.1, 12.3, 12.5_

  - [~] 14.2 Implement `KoreAiInsights` at `src/components/kore/sections/kore-ai-insights.tsx`
    - Server component; render the `.blogs_hero-section_block.hide-mobile-landscape` featured block + the `.blogs_hero-section_block.for-latest.for-homepage > .latest-blogs-list` with four `.blog-item.is-latest` entries in source DOM order
    - Render heading "AI Insights" and "View all" CTA via `KoreButtonDot`
    - Empty `readTime` renders an empty node — no placeholder
    - Apply `hide-mobile-landscape { display: none !important }` at viewport ≤ 767 px
    - Hover transition driven by source CSS rules
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8, 12.9_

- [ ] 15. Implement Pre-Footer CTA section and Exit Modal
  - [~] 15.1 Author `src/components/kore/data/pre-footer-cta.ts` and `data/exit-modal.ts` fixtures
    - `preFooterCtaData`: two CtaBlocks in order (`accelerate-time-to-value`, `start-using-artemis-today`)
    - `exitModalData`: heading, body, primary, secondary
    - _Requirements: 13.1, 13.6_

  - [~] 15.2 Implement `KorePreFooterCta` at `src/components/kore/sections/kore-pre-footer-cta.tsx`
    - Server component; render the two CTA blocks in source DOM order with the source layout, styling, target URLs, and `aria-label`s
    - _Requirements: 13.1, 13.2_

  - [~] 15.3 Implement `KoreExitModal` at `src/components/kore/sections/kore-exit-modal.tsx`
    - `'use client'`; subscribe to `mouseleave` on `document.documentElement` where `event.clientY <= 0`, fire only the first such event in the page session
    - Render a `KoreModal` wrapping the heading, body, primary, secondary CTAs
    - Apply `lenis-stopped` to `<html>` while open; suspend Lenis_Scroller; restore focus to the prior `document.activeElement` on close
    - Annotate with `role="dialog"`, `aria-modal="true"`, `aria-labelledby` referencing the heading id; move focus to close affordance within 1 frame of open
    - When Reduced_Motion: replace transitions with immediate display swap within 1 frame
    - _Requirements: 13.3, 13.4, 13.5, 13.6, 13.7, 13.8_

- [ ] 16. Implement Site Footer
  - [~] 16.1 Author `src/components/kore/data/footer.ts` fixture
    - Export `footerData` with logo, language toggle, exactly four `FooterColumn`s, RFP CTA, social, legal, copyright
    - _Requirements: 14.1, 14.7_

  - [~] 16.2 Implement `KoreFooter` at `src/components/kore/sections/kore-footer.tsx`
    - Client wrapper for back-to-top + language toggle; static structure renders server-side
    - Render brand logo, language toggle, four link columns, RFP CTA, social row, legal row, copyright, back-to-top in source order; no positive `tabindex` values
    - At ≤ 767 px: collapse columns into `KoreAccordionRow` accordions
    - Back-to-top: invoke `lenis.scrollTo(0, { duration: tokens.durations.backToTop })`; when Reduced_Motion: `window.scrollTo({ top: 0 })` instantly
    - Language toggle open/close via pointer enter/leave + focus + Escape
    - Language list activation renders an inline non-functional acknowledgement; no backend call
    - Annotate hamburger / language toggle / back-to-top icon-only controls with `aria-label`
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7, 14.8, 14.9, 25.4_

- [ ] 17. Implement Modals Layer (code-split)
  - [~] 17.1 Author `src/components/kore/data/modals.ts` fixture
    - Export `modalsData` with the four ModalDescriptors in order (`enterprise-tech-stack` content, `ai-for-work` / `ai-for-service` / `ai-for-process` video)
    - _Requirements: 15.1, 15.2_

  - [~] 17.2 Implement `KoreModalsLayer` at `src/components/kore/sections/kore-modals-layer.tsx`
    - `'use client'`; expose a `ModalContext` with `openModal(id)` / `closeModal()`; mutual exclusion: at most one modal open at a time
    - Render via `KoreModal` primitive — `role="dialog"`, `aria-modal="true"`, focus trap, Esc, backdrop, focus return
    - Video modals: autoplay muted on open; pause + reset `currentTime = 0` on close; 10s `canplaythrough` watchdog falls back to poster image
    - When Reduced_Motion: immediate display swap within 1 frame
    - Code-split via `next/dynamic({ ssr: false })`; chunk fetched only on first trigger
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8, 15.9, 15.10, 27.9_

  - [ ]* 17.3 Property test: Modal Lifecycle Invariant
    - **Property 5: Modal Lifecycle Invariant**
    - **Validates: Requirements 13.3, 13.4, 13.5, 13.7, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8, 25.6, 25.7**
    - File: `tests/property/modal-lifecycle.test.ts`
    - Use fast-check to generate sequences of `openModal(id)` and `closeModal()` ops across all five modals + Mobile_Drawer; assert mutual exclusion, focus trap, `lenis-stopped`, focus return, video play/pause/reset, Exit_Modal once-per-session
    - _Requirements: 13.3, 15.3, 15.7, 15.8, 25.6, 25.7_

- [ ] 18. Implement Hover Image Preview
  - [~] 18.1 Implement `KoreHoverImagePreview` at `src/components/kore/sections/kore-hover-image-preview.tsx`
    - `'use client'`; render one fixed-position container at `width: 180px`, `height: auto`, `object-fit: contain`, `pointer-events: none`, `z-index: 99`
    - Provide `HoverImageContext` with a `register(target, dataImg)` registry
    - On `pointerenter`: load `data-img`, wait 100 ms, fade opacity 0→1 over 500 ms with scale 1
    - While hovering: `requestAnimationFrame` loop that lerps position toward cursor with factor 0.15, offset 20 px below cursor
    - On `pointerleave`: cancel pending entrance, fade 1→0 over 500 ms
    - On `(hover: none) and (pointer: coarse)`: registry is a no-op
    - Empty / missing `data-img`: registry skips without throwing
    - On `scroll`: hide preview within 1 frame; re-trigger if pointer is still over a target
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7_

  - [ ]* 18.2 Property test: Hover Image Preview Lifecycle and Lerp
    - **Property 6: Hover Image Preview Lifecycle and Lerp**
    - **Validates: Requirements 16.2, 16.3, 16.4, 16.5, 16.6**
    - File: `tests/property/hover-image-preview.test.ts`
    - Use fast-check to generate cursor trajectories of N animation frames; assert `p_{n+1} = p_n + 0.15 × (c_n - p_n)` within IEEE-754 tolerance, rendered y = `p_n.y + 20`, coarse-pointer no-op, missing `data-img` no-op
    - _Requirements: 16.2, 16.3, 16.4, 16.5, 16.6_

- [ ] 19. Implement Floating Chatbot
  - [~] 19.1 Author `src/components/kore/data/chatbot.ts` fixture
    - Export `chatbotData` with `placeholder` and `arrowAriaLabel`
    - _Requirements: 18.1_

  - [~] 19.2 Implement `KoreChatbot` at `src/components/kore/sections/kore-chatbot.tsx`
    - `'use client'`; render fixed-position element in lower-right with the source offset, size, background, radius, shadow
    - Collapsed (`:not(.ready)`): width 3.5rem; `.chatbot-line-spacer`, `.chatbot-input`, `.chatbot-arrow-btn` at opacity 0 + `pointer-events: none`
    - On activation (click + Enter + Space): apply `.ready` within 1 frame, set chatbot icon `max-width: 1.25rem`, fade-in spacer (delay 0.5s), input (0.8s), arrow btn (0.3s)
    - On submit with non-empty trimmed message: render an inline acknowledgement, clear input, no backend call
    - On submit with empty/whitespace input: do NOT acknowledge, retain focus, no backend call
    - At ≤ 767 px: apply mobile offset/size/visibility
    - When Reduced_Motion: immediate state change within 1 frame
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5, 18.6, 18.7_

  - [ ]* 19.3 Property test: Chatbot Input Validation
    - **Property 8: Chatbot Input Validation**
    - **Validates: Requirements 18.4, 18.5**
    - File: `tests/property/chatbot-input.test.ts`
    - Use fast-check to generate arbitrary input strings; assert `S.trim() === ''` → no acknowledgement, focus retained, zero requests; `S.trim() !== ''` → exactly one acknowledgement, input cleared, zero requests to Out_Of_Scope_Backends
    - _Requirements: 18.4, 18.5_

- [ ] 20. Wire the page tree, layout, and route
  - [~] 20.1 Implement `src/app/kore-ai-component/layout.tsx`
    - Optional segment-scoped layout that imports `tokens.css` and `keyframes.css`
    - Declare the `<link rel="preconnect">` tags for `cdn.prod.website-files.com`, `fonts.googleapis.com`, `fonts.gstatic.com` matching Source_Document `crossorigin`
    - Declare `<link rel="preload" as="image">` for the Hero background video poster
    - Confirm root `src/app/layout.tsx` already declares `lang="en"` on `<html>` and `body { background: #FFFFFF }`; if not, update only the minimal required attributes
    - _Requirements: 1.3, 24.6, 27.7_

  - [~] 20.2 Implement `src/app/kore-ai-component/page.tsx`
    - Server component; export `KoreAiComponentPage` default; emit metadata only (no client work)
    - Render the `KorePage` client composer
    - _Requirements: 1.1, 1.7, 23.5_

  - [~] 20.3 Implement `src/app/kore-ai-component/kore-page.tsx`
    - `'use client'`; mount `useLenis()` and `useScrollTriggers()`; mount `HoverImageContext.Provider` and modal context provider
    - Render Page_Sections in document order: `KoreLoader`, `KoreTopStrip`, `KoreNavigation`, `<main>` containing `KoreHero`, `KoreIndustryTabs`, `KoreBusinessOutcomes`, `KoreAnalystRecognition`, `KoreTestimonials`, `KoreStrategicPartners`, `KoreAiInsights`, `KorePreFooterCta`, then `KoreFooter`, `KoreModalsLayer` (lazy via `next/dynamic({ ssr: false })`), `KoreHoverImagePreview`, `KoreExitModal`, `KoreChatbot`
    - Z-index ranking matches tokens: Top_Strip < Navigation < Modals_Layer < Loader, with Hover_Image_Preview at z-index 99
    - One `<main>` landmark, exactly one `<h1>` in Hero, `<nav>` for Navigation, `<footer>` for Footer
    - Never apply the `anti-flicker` class
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.7, 1.9, 2.8, 19.1, 19.2, 19.3, 25.1, 25.2, 25.3_

  - [~] 20.4 Wire focus ring and keyboard focus styling globally for the Clone_Page
    - Add a scoped CSS rule (via `tokens.css` or a sibling `focus.css`) ensuring every focusable element in the Clone_Page tree shows a 2px outline / box-shadow with ≥ 3:1 contrast on focus
    - _Requirements: 25.8_

- [~] 21. Checkpoint - Page composition and all sections wired
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 22. Build accessibility, scope, and out-of-scope guardrails
  - [~] 22.1 Wire and run an `eslint` rule set forbidding the literal markers `TODO`, `FIXME`, `XXX`, `placeholder`, `lorem ipsum`, `mock` inside `src/components/kore/`, `src/app/kore-ai-component/`, and `public/kore/` (case-insensitive), with the only exception being literal string values copied verbatim from Source_Document
    - Use `eslint-plugin-no-warning-comments` plus a custom regex rule
    - _Requirements: 29.1_

  - [ ]* 22.2 Property test: Component Naming, Use-Client Gating, A11y Icon Labels
    - **Property 12: Component Naming, Use-Client Gating, and Accessibility Annotations**
    - **Validates: Requirements 23.5, 23.6, 23.7, 23.8, 23.9, 23.10, 25.4**
    - File: `tests/property/component-conventions.test.ts`
    - AST walk every `.tsx` under `src/components/kore/sections/` and `src/components/kore/primitives/`; assert exactly one named PascalCase export prefixed with `Kore`, file basename = kebab-case form
    - Assert every file with `'use client'` references at least one browser-only API; every file without `'use client'` does NOT reference any
    - Render the page tree with `@testing-library/react` and assert every icon-only `<button>`, `<a>`, or `[role="button"]` carries a non-empty `aria-label`
    - _Requirements: 23.5, 23.6, 23.7, 23.8, 23.9, 23.10, 25.4_

  - [ ]* 22.3 Property test: Out-Of-Scope Containment
    - **Property 11: Out-Of-Scope Containment**
    - **Validates: Requirements 1.4, 1.5, 28.1, 28.2, 28.3, 28.4, 28.5, 28.6, 28.7, 28.8, 28.9**
    - File: `tests/property/out-of-scope.test.ts`
    - Render the page in jsdom + intercept `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource`, `navigator.sendBeacon`; over a 60s simulated idle window assert zero forbidden script tags, zero JSON-LD blocks, zero `data-wf-*` attributes, zero requests to Out_Of_Scope_Backends hosts, zero forbidden `window.*` globals
    - _Requirements: 1.4, 1.5, 28.1, 28.2, 28.3, 28.4, 28.5, 28.6, 28.7, 28.8, 28.9_

  - [ ]* 22.4 Property test: Scope-Confinement of File Changes
    - **Property 1: Scope-Confinement of File Changes**
    - **Validates: Requirements 1.8, 29.7, 29.8**
    - File: `tests/property/scope-confinement.test.ts`
    - Run `git diff --name-only origin/main...HEAD`; assert every path is under `src/app/kore-ai-component/`, `src/components/kore/`, `public/kore/`, OR is exactly `package.json` AND its diff only adds `@rive-app/canvas` to `dependencies`
    - _Requirements: 1.8, 29.7, 29.8_

  - [ ]* 22.5 Property test: Media Query Parity Over Viewport Widths
    - **Property 2: Media Query Parity Over Viewport Widths**
    - **Validates: Requirements 3.1, 3.9, 12.9**
    - File: `tests/property/media-query-parity.test.ts`
    - Use fast-check `fc.integer({ min: 320, max: 2560 })` for viewport widths; for each width assert each `@media (max-width: Npx)` rule is active iff `W ≤ N`; for transitions assert no element retains computed style contributed by a no-longer-matching breakpoint
    - _Requirements: 3.1, 3.9, 12.9_

- [ ] 23. Build integration tests
  - [ ]* 23.1 Route smoke test
    - File: `tests/integration/route.test.ts`
    - Boot `next start`; GET `/kore-ai-component` returns 200; zero console errors over 30s idle; zero React error boundary fires; SSR HTML contains every Page_Section heading text; no script tags match Out_Of_Scope_Scripts patterns; no requests over 60s match Out_Of_Scope_Backends
    - _Requirements: 1.4, 1.5, 1.6, 26.4, 28.9_

  - [ ]* 23.2 Bundle size and code-split test
    - File: `tests/integration/bundle-size.test.ts`
    - Run `pnpm next build`; parse output; assert First Load JS for `/kore-ai-component` ≤ 350 KB uncompressed; assert no Rive runtime, no Modals_Layer chunk, and no below-fold Swiper chunk in the First Load bundle
    - _Requirements: 27.5, 27.6, 27.8, 27.9_

  - [ ]* 23.3 Lighthouse performance test
    - File: `tests/integration/lighthouse.test.ts`
    - Run Lighthouse Mobile preset 3 times; assert median Performance ≥ 75, LCP ≤ 3.0s, CLS ≤ 0.10, TBT ≤ 300 ms
    - _Requirements: 27.1, 27.2, 27.3, 27.4_

- [ ] 24. Build visual fidelity tests
  - [ ]* 24.1 Visual fidelity screenshot diffs at three Reference_Viewports
    - File: `tests/visual/kore-homepage.spec.ts`
    - Use Puppeteer + pixelmatch; capture full-page screenshots at Desktop 1440×900, Tablet 834×1112, Mobile 390×844 at devicePixelRatio 2
    - Apply deterministic-capture preconditions: gate on `document.fonts.ready`, complete Loader_Sequence, pause every Swiper autoplay, pause every GSAP_Scroll_Trigger timeline at final state, render first Rive frame
    - 8×8-pixel-region tile diff; per-pixel RGB delta ≤ 2; element bounding-box delta ≤ 1 dpx
    - Reference baselines under `tests/visual/__baselines__/`; updated only via `pnpm test:visual:update`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.9_

  - [ ]* 24.2 Browser matrix visual tests
    - File: `tests/browser-matrix/*.spec.ts`
    - Run the visual fidelity suite via Playwright against Chrome (latest + previous), Edge (latest + previous), Firefox (latest + previous), Safari (latest + previous), iOS Safari 17+, Android Chrome 120+
    - Gate behind `pnpm test:matrix`; runs nightly in CI, not on every commit
    - _Requirements: 26.1, 26.2, 26.3_

- [~] 25. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
  - Confirm `pnpm exec eslint src/components/kore src/app/kore-ai-component --max-warnings=0` exits 0
  - Confirm `pnpm exec tsc --noEmit` exits 0
  - Confirm `pnpm next build` exits 0 with zero warnings referencing `src/components/kore/` or `src/app/kore-ai-component/`
  - _Requirements: 29.2, 29.3, 29.4, 29.5_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP. Core implementation tasks (foundation, primitives, sections, page composition) are always required.
- Each task references specific granular requirements clauses (e.g. 7.4 not just "Requirement 7") for traceability.
- Property test sub-tasks each carry a Property number and a Validates clause referencing the design's Correctness Properties section. Each property is its own sub-task and is placed close to the implementation that introduces the invariant so failures surface early.
- Checkpoints (tasks 11, 21, 25) ensure incremental validation across foundation → composition → final.
- Test infrastructure (`fast-check`, `pixelmatch`, additional Vitest peers) is added under `devDependencies` only. The only new top-level runtime dependency is `@rive-app/canvas` per Requirement 29.8.
- Visual fidelity is the dominant verification surface; property tests cover the universal invariants (token coverage, asset manifest, tab strip, modal lifecycle, hover-image lerp, loader timing, chatbot input, scope-confinement, media-query parity, out-of-scope containment, component conventions).

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3", "1.5", "1.7"] },
    { "id": 2, "tasks": ["1.4", "1.6", "1.8", "1.9", "2.1", "2.2", "2.6", "2.7"] },
    { "id": 3, "tasks": ["2.3", "2.4", "2.5", "2.8", "3.1", "3.2", "3.8"] },
    { "id": 4, "tasks": ["3.3", "3.4", "3.5", "3.6", "3.7", "3.9"] },
    { "id": 5, "tasks": ["3.10", "4.1", "4.2", "5.1", "6.1", "7.1", "8.1", "9.1", "10.1", "12.1", "13.1", "14.1", "15.1", "16.1", "17.1", "19.1"] },
    { "id": 6, "tasks": ["4.3", "5.2", "6.2", "7.2", "8.2", "9.2", "10.2", "12.2", "13.2", "14.2", "15.2", "15.3", "16.2", "17.2", "18.1", "19.2"] },
    { "id": 7, "tasks": ["5.3", "6.3", "7.3", "8.3", "9.3", "17.3", "18.2", "19.3"] },
    { "id": 8, "tasks": ["20.1", "20.2"] },
    { "id": 9, "tasks": ["20.3"] },
    { "id": 10, "tasks": ["20.4", "22.1"] },
    { "id": 11, "tasks": ["22.2", "22.3", "22.4", "22.5", "23.1", "23.2", "23.3", "24.1", "24.2"] }
  ]
}
```

