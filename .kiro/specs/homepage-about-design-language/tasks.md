# Implementation Plan: Homepage About Design Language

## Overview

This plan converts the design into a sequence of incremental, file-scoped coding tasks for a Next.js + TypeScript + Tailwind codebase. Work proceeds in five phases: (1) shared primitives and lint infrastructure, (2) the new `SoftreeHero` that replaces `TransferredSoftreeHero`, (3) in-place restyle of existing sections that have no About counterpart, (4) integration of the redesigned page tree in `src/app/home-page.tsx` together with accessibility wiring, and (5) the verification suite (ESLint token audit, computed-style parity, axe-core, reduced-motion, responsive, metadata, link reachability, Lighthouse CI). Reused About components (`AboutClientLogos`, `OffshoreTestimonialsGlobe` light variant, `LightEngagementModels`, `LightFAQExact`, `LightContactSection`) are imported as-is; no styling is duplicated.

The design intentionally omits a Correctness Properties section because this is a UI rendering and visual parity refactor with no pure-function logic, parsers, or data transformations. Test sub-tasks therefore use snapshot, computed-style, ESLint, axe-core, reduced-motion, responsive, metadata, link, and Lighthouse strategies, not property-based tests.

## Tasks

- [x] 1. Set up shared primitives, tokens, and lint infrastructure
  - [x] 1.1 Create `SectionHeader` shared component
    - Add `src/components/homepage-light/SectionHeader.tsx` with the `SectionHeaderProps` interface from the design (`badge`, `accent`, `headline`, `body?`, `as?`, `className?`)
    - Render badge pill (leading dot + uppercase, `tracking-[0.20em]`, accent-tinted border/background), headline with `clamp(48px, 8vw, 110px)` for `as="h1"` and `clamp(32px, 4.5vw, 56px)` for `as="h2"`, optional body `text-base leading-relaxed text-[#0a0a1a]/70 max-w-[640px]`
    - Restrict `accent` prop union to exactly `"#FF6B00" | "#FF5812" | "#1852FF"`
    - _Requirements: 1.3, 1.7, 11.2_

  - [x] 1.2 Extract `LetsTalkButton` into a shared component
    - Create `src/components/qc/shared/LetsTalkButton.tsx` containing the same DOM, hover roll-up, and orange arrow icon currently inlined inside `AvooraHero`
    - Replace the inlined version inside `AvooraHero` with an import of the new shared component to eliminate duplication
    - Resolve default `href` to `/contact` and accept a `compact` prop matching the existing variant
    - _Requirements: 4.1, 11.1_

  - [x] 1.3 Create token-aware `SectionSkeleton` replacement
    - Add `src/components/homepage-light/SectionSkeleton.tsx` with the `SectionSkeletonProps` interface (`surface`, `minHeight`, `label?`)
    - Restrict `surface` prop union to `"#FFFFFF" | "#F8F9FC" | "#F3F0EE"` and paint `background: surface` with the requested `min-height`
    - Render two thin shimmer bars (`bg-[#0a0a1a]/5`, `bg-[#0a0a1a]/8`) for visual continuity; no dark or off-token color anywhere
    - _Requirements: 1.1, 6.2_

  - [x] 1.4 Create `SectionErrorBoundary` component
    - Add `src/components/homepage-light/SectionErrorBoundary.tsx` as a React error boundary that times out lazy chunks at 10s via `Promise.race` and renders an inline error card on the section's surface token with a Retry button that re-imports the chunk
    - Card uses `rounded-2xl`, `border-[#0a0a1a]/10`, message "This section is temporarily unavailable.", and keeps siblings rendered
    - _Requirements: 6.6_

  - [x] 1.5 Add custom ESLint rule `no-untokenized-design-literals`
    - Implement the rule under `eslint-rules/no-untokenized-design-literals.js` (or equivalent local plugin path) and register it in the project ESLint config scoped to `src/components/sections/**`, `src/components/homepage-light/**`, `src/components/qc/homepage-light/**`
    - Flag surface literals outside `["#FFFFFF","#F8F9FC","#F3F0EE"]` on top-level `<section>` `bg-[#…]`/`background:`, accent literals outside `["#FF6B00","#FF5812","#1852FF"]` outside token files, `cubic-bezier(...)` literals outside `src/lib/motion.ts`, and inline `prefers-reduced-motion` `matchMedia` checks
    - _Requirements: 1.1, 1.3, 1.6, 4.1, 4.5_

  - [ ]* 1.6 Write unit tests for `SectionHeader`
    - Assert badge renders with leading dot, uppercase text, accent-tinted border; `as="h1"` produces an `<h1>`; default produces an `<h2>`
    - Assert body is omitted when prop is absent
    - _Requirements: 1.3, 1.7, 7.2_

  - [ ]* 1.7 Write unit tests for `SectionSkeleton`, `SectionErrorBoundary`, and `LetsTalkButton`
    - `SectionSkeleton`: paints exactly the passed surface token; applies requested `min-height`
    - `SectionErrorBoundary`: renders fallback on simulated chunk import failure; Retry re-invokes the import factory
    - `LetsTalkButton`: renders roll-up text + arrow; `compact` prop honored; `href` resolves to `/contact`
    - _Requirements: 6.2, 6.6, 4.1_

- [x] 2. Build the new `SoftreeHero` (Hero_Pattern)
  - [x] 2.1 Scaffold `SoftreeHero` component file
    - Create `src/components/homepage-light/SoftreeHero.tsx` with the `SoftreeHeroProps` interface from the design (`tagline`, `wordmark`, `headlinePrefix`, `cyclingWords`, `primaryCta`, `secondaryCta`, `avatars`, `video`, `marqueeItems`)
    - Render the outer `<section data-section="hero">` on `#FFFFFF` with `py-20 md:py-24 lg:py-28`, inner `max-w-[1440px] px-6 lg:px-12`, top header row (wordmark with `®` superscript, tagline pill, `LetsTalkButton`), full-bleed rounded media stage with `clamp(20px, 2vw, 36px)` corners, avatar stack (3–5), centered headline using `SectionHeader as="h1"`, dual CTA pair (orange-fill primary, glass-border secondary), and bottom social rail
    - Import `EASE`, `EASE_T`, `DUR`, `STAGGER`, `REVEAL`, `prefersReducedMotion` from `@/lib/motion` for every animation
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 1.4, 1.7, 4.1, 7.1_

  - [x] 2.2 Wire hero content constants and CTA destinations
    - Define the `HERO` constant inside `SoftreeHero.tsx` exactly as specified in the design (wordmark "Softree", tagline "Offshore Engineering Partner", headlinePrefix "Scalable Microsoft + AI teams that build", cyclingWords list, `primaryCta { label: "Start Your Project", href: "/contact" }`, `secondaryCta { label: "Explore Solutions", href: "/services" }`, 5 avatars, video sources + poster, 5 marquee capability cards)
    - Pass `HERO` into the component on render from `home-page.tsx` (or directly consume internally if no override is needed)
    - _Requirements: 2.9, 9.5_

  - [x] 2.3 Implement `Cycling_Word` rotation with reduced-motion gating
    - Rotate words at 2.4s intervals when `prefersReducedMotion()` is `false`; freeze on `cyclingWords[0]` when `true`
    - Use per-character blur-up reveal driven by `REVEAL.blurUp` and `EASE_T.silk`/`DUR.card`
    - Mark the cycling region with `aria-hidden="true"` so AT does not announce changes
    - Re-evaluate the media query on `change` events
    - _Requirements: 2.6, 2.7, 7.7, 10.3, 10.5_

  - [x] 2.4 Implement service-capability marquee with white edge fades
    - Render the marquee directly beneath the media stage with a single linear loop, cycle duration fixed at 36s (within the 30–45s window), and white edge-fade overlays of width `64px` (within 48–96px) using `linear-gradient(90deg,#fff 0%,transparent 100%)` on the left and `linear-gradient(270deg,#fff 0%,transparent 100%)` on the right
    - When `prefersReducedMotion()` is `true`, set `animation-play-state: paused` and replace the doubled track with a single ordered set of items
    - Apply `data-marquee-track` attribute for the reduced-motion CSS override
    - _Requirements: 2.5, 2.6, 4.6, 5.5, 10.2_

  - [x] 2.5 Implement video poster fallback (3s timeout)
    - Set `<video poster={video.poster}>` and CSS `background-image: url(${video.poster})` on the same element (mirroring `AvooraHero`)
    - Use the `videoLoaded` pattern: `setTimeout(() => setVideoLoaded(true), 800)` then if `loadeddata` does not fire within an additional 3s, set `videoFailed` and remove `<source>` elements; never block hero render or surface a user-visible error
    - Defer all video byte fetching until after React hydration completes
    - _Requirements: 2.10, 6.3, 6.4_

  - [ ]* 2.6 Write unit tests for `SoftreeHero`
    - Assert cycling word rotates within 1.5–3s when reduced motion is off; freezes on `cyclingWords[0]` when reduced motion is on
    - Simulate video source `route.abort()` and assert poster image remains visible and headline/CTAs/marquee still render
    - Assert exactly one `<h1>` rendered and `aria-hidden="true"` is set on the cycling region
    - _Requirements: 2.6, 2.7, 2.10, 7.1, 7.7, 10.3_

- [x] 3. Checkpoint — shared primitives and hero compile and tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Restyle existing homepage sections in place
  - [x] 4.1 Restyle `support-partners.tsx` to light surface
    - File: `src/components/sections/support-partners.tsx`
    - Set outer surface to `#F8F9FC`; remove the procedural canvas background; switch to white card pattern with hairline border `border-[#0a0a1a]/10` and soft shadow `shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)]`
    - Replace heading block with `<SectionHeader badge=… accent="#1852FF" headline=… body=… />`
    - Reroute all GSAP animations to `EASE.silk` / `DUR.section` / `STAGGER.default` from `@/lib/motion`; remove inline `cubic-bezier` literals
    - Preserve every visible text, image, link `href`, and CTA destination unchanged
    - _Requirements: 1.1, 1.3, 1.4, 1.5, 1.6, 1.7, 3.2, 3.6, 4.1_

  - [x] 4.2 Restyle `ServicesStackedSlides.tsx` to light surface
    - File: `src/components/sections/ServicesStackedSlides.tsx`
    - Set outer surface to `#FFFFFF`; replace black backdrops on stacked slides with `#F8F9FC` card surfaces and `border-[#0a0a1a]/10`
    - Replace heading block with `<SectionHeader badge=… accent="#FF6B00" headline=… body=… />`
    - Map all GSAP timeline ease/duration/stagger to Motion_System tokens; audit `ScrollTrigger.pin` to ensure the pin span ≤ 50% of viewport height
    - Preserve every visible text, image, link `href`, and CTA destination unchanged
    - _Requirements: 1.1, 1.3, 1.4, 1.6, 3.2, 3.6, 4.1, 6.7_

  - [x] 4.3 Restyle `FeaturesShowcase.tsx` to About stat/content split parity
    - File: `src/components/features/FeaturesShowcase.tsx`
    - Set outer surface to `#F8F9FC`; cards adopt `rounded-[20px]`/`rounded-[28px]`, `border-[#0a0a1a]/10`, and `shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)]`
    - Use `SpotlightCard` from `src/components/qc/shared/SpotlightCard.tsx` for any card requiring a cursor-following radial glow; do not reimplement the pointer/gradient logic
    - Replace heading block with `<SectionHeader badge=… accent="#1852FF" headline=… body=… />`
    - Reroute animations to Motion_System tokens; preserve every visible text, image, link `href`, and CTA destination
    - _Requirements: 1.1, 1.3, 1.4, 1.6, 3.2, 3.6, 4.1, 4.2, 11.1_

  - [x] 4.4 Restyle `ai-insights-blog.tsx` to light card system
    - File: `src/components/sections/ai-insights-blog.tsx`
    - Set outer surface to `#FFFFFF`; featured + recent article cards adopt `rounded-2xl border border-[#0a0a1a]/10 bg-white shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)]`
    - Hover lifts via `motion.div whileHover={{ y: -4 }}` with `EASE_T.silk` / `DUR.card`
    - Replace heading block with `<SectionHeader badge=… accent="#1852FF" headline=… body=… />`
    - Preserve every visible text, image, link `href`, and CTA destination
    - _Requirements: 1.1, 1.3, 1.4, 1.6, 3.2, 3.6, 4.1, 9.5_

  - [x] 4.5 Restyle `tech.tsx` to warm light surface
    - File: `src/components/sections/tech.tsx`
    - Set outer surface to `#F3F0EE` (warm break mirroring `AboutTeamSection`); remove the dark gradient panel; render logos on a single white card `rounded-[28px]` with hairline border
    - Replace heading block with `<SectionHeader badge=… accent="#FF6B00" headline=… body=… />`
    - Map any `power3.out` GSAP ease references to `EASE.silk`; preserve every visible text, image, link `href`, and CTA destination
    - _Requirements: 1.1, 1.3, 1.4, 1.5, 1.6, 3.2, 3.6, 4.1_

  - [x] 4.6 Audit `LightServicesStickyList.tsx` for token compliance
    - File: `src/components/homepage-light/LightServicesStickyList.tsx`
    - Replace any inline `cubic-bezier(…)` with `EASE.silk` / `EASE.out` from `@/lib/motion`; replace inline durations with `DUR.section` / `DUR.card`
    - Verify every accent literal is one of `#FF6B00` / `#FF5812` / `#1852FF`; verify outer surface is `#FFFFFF`
    - Confirm the `SectionHeader` order (badge → headline → body) is in place; preserve every visible text, image, link `href`, and CTA destination
    - _Requirements: 1.1, 1.3, 1.6, 1.7, 3.2, 4.1_

  - [x] 4.7 Restyle `certification.tsx` to light tile system
    - File: `src/components/sections/certification.tsx`
    - Set outer surface to `#FFFFFF`; cards become small white tiles with `border-[#0a0a1a]/10`
    - Replace heading block with `<SectionHeader badge=… accent="#1852FF" headline=… body=… />`
    - Map all GSAP ease references to `EASE.silk` / `EASE.out`; preserve every visible text, image, link `href`, and CTA destination
    - _Requirements: 1.1, 1.3, 1.4, 1.6, 3.2, 3.6, 4.1_

- [x] 5. Checkpoint — every section renders on a Design_Tokens canvas surface
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Integrate redesigned page tree in `home-page.tsx` and wire accessibility
  - [x] 6.1 Replace lazy imports in `home-page.tsx` with restyled / shared light variants
    - File: `src/app/home-page.tsx`
    - Replace `TransferredSoftreeHero` import with `SoftreeHero` (eager, non-lazy); render it as the first child of `<main>`
    - Update `next/dynamic` lazy imports for features showcase, testimonials globe (`variant="light"`), AI insights, tech stack, services sticky list, engagement models, certifications, FAQ, and contact to point at the restyled or shared `qc/homepage-light` variants
    - Render the 13 Preserved_Sections in the exact top-to-bottom order from Requirement 3.1 with the surface cadence from the design's Surface ↔ Section table
    - Keep `NavigationClient` as the first child of the page tree above `<main>` and `Footer` as the last child below
    - _Requirements: 3.1, 3.5, 3.8, 6.1_

  - [ ] 6.2 Migrate engagement-models and contact to `qc/homepage-light` variants
    - In `home-page.tsx`, swap the older `homepage-light` engagement-models import for `src/components/qc/homepage-light/LightEngagementModels.tsx`
    - Swap the older `homepage-light` contact section import for `src/components/qc/homepage-light/LightContactSection.tsx`
    - Confirm both render unchanged (no local style overrides) — these are the parity targets for Requirement 11.1
    - _Requirements: 3.5, 11.1_

  - [ ] 6.3 Replace `SectionSkeleton` usages with token-aware skeletons
    - In `home-page.tsx`, update every `loading: () => <SectionSkeleton …/>` for each lazy boundary to pass the section's assigned surface token (per the design's Surface Cadence table) and a `minHeight` within ±10% of the loaded section's final height
    - Remove the dark-void `bg-[#0a0a0a]` skeleton entirely
    - _Requirements: 1.1, 6.2_

  - [ ] 6.4 Wrap each lazy boundary with `SectionErrorBoundary`
    - In `home-page.tsx`, wrap every `next/dynamic` boundary with `<SectionErrorBoundary surface={…}>` so chunk failures show the inline error card with Retry instead of a permanent dark skeleton
    - Other already-rendered sections must stay visible during a failure
    - _Requirements: 6.6_

  - [ ] 6.5 Pass `variant="light"` to `OffshoreTestimonialsGlobe`
    - File: `src/app/home-page.tsx` (consumer site only — do not change the component)
    - Pass `variant="light"`; do not override its themeable color props with values outside the Design_Tokens accent set
    - _Requirements: 4.4, 11.1_

  - [ ] 6.6 Add accessible landmarks and skip link
    - File: `src/app/home-page.tsx` (or the layout that owns `<main>`)
    - Ensure exactly one `<header>` (NavigationClient), one `<main>`, one `<footer>` (Footer)
    - Add a keyboard-accessible skip link as the first focusable element that moves focus to `<main id="main">`; the skip link is visually hidden until focused and has a focus indicator at least 2px thick with ≥ 3:1 contrast
    - Audit heading hierarchy: exactly one `<h1>` (in the hero), every section heading is an `<h2>`, no heading levels skipped
    - _Requirements: 7.1, 7.2, 7.4, 7.8, 7.9_

  - [x] 6.7 Verify `metadata` export in `src/app/page.tsx` is byte-for-byte preserved
    - File: `src/app/page.tsx`
    - Confirm `title`, `description`, `openGraph.title`, `openGraph.description`, `twitter.title`, `twitter.description` match the values listed in the design's Metadata Surface section byte-for-byte
    - Confirm `alternates.canonical` equals `"https://www.softreetechnology.com/"` and renders as a `<link rel="canonical">` in `<head>`
    - Do not change any user-visible text values
    - _Requirements: 9.1, 9.4_

- [ ] 7. Checkpoint — page tree wired, hero renders, no horizontal overflow
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Verification suite — implement the design's testing strategy
  - [ ]* 8.1 Run the ESLint token-audit pass and resolve violations
    - Execute `pnpm lint` (or repo equivalent) to run `no-untokenized-design-literals` against `src/components/sections/**`, `src/components/homepage-light/**`, `src/components/qc/homepage-light/**`
    - Fix any flagged surface, accent, `cubic-bezier`, or inline `prefers-reduced-motion` literals at the source file
    - _Requirements: 1.1, 1.3, 1.6, 4.1, 4.5_

  - [ ]* 8.2 Add Playwright snapshot suite for visual parity at three breakpoints
    - Add a Playwright spec under `tests/e2e/visual-parity.spec.ts` that loads `/` and `/about-us` at 375px, 768px, 1280px and captures `expect(page).toHaveScreenshot()` per Preserved_Section
    - Establish baselines on the redesign branch
    - _Requirements: 11.1, 11.2_

  - [ ]* 8.3 Add computed-style parity test for token compliance
    - Add a Vitest+Playwright spec that, for the seven sections with About counterparts (hero, About-style stat/content split, marquee, engagement-models accordion, testimonials, FAQ, contact), asserts exact equality of `font-family`, `h1`–`h4` `font-size`/`line-height`, badge pill `padding`/`border-radius`/`border-color`, card `border-radius`/`box-shadow`, and accent literals (rgb form of `#FF6B00`/`#FF5812`/`#1852FF`)
    - Extract motion easing curves from inline GSAP configs via a custom DOM probe and assert match against `EASE` values
    - Build fails on any token-value mismatch
    - _Requirements: 11.1, 11.2, 11.3_

  - [ ]* 8.4 Add reduced-motion Playwright tests
    - Launch with `--force-prefers-reduced-motion` and assert: every `[data-reveal]` has `opacity:1` / `transform:none` within 100ms of mount; every `[data-marquee-track]` has `animation-play-state:paused` and zero translation; cycling word equals `cyclingWords[0]` over a 6s window; `window.ScrollTrigger.getAll().every(t => !t.vars.scrub)` is true
    - Add a second run without the flag asserting cycling word rotates within 1.5–3s
    - _Requirements: 2.6, 2.7, 5.5, 10.1, 10.2, 10.3, 10.4, 10.5_

  - [ ]* 8.5 Add responsive viewport tests
    - Add a Playwright spec that runs at 360px, 768px, 1024px, 1280px, 1440px and asserts `documentElement.scrollWidth <= window.innerWidth` (no horizontal overflow)
    - At 360px, assert hero header row children stack vertically and headline `font-size` ∈ [28px, 48px]
    - At < 1024px, assert every two-column section's `grid-template-columns` resolves to a single column
    - With `hasTouch:true` at ≤ 1024px, assert every interactive target's bounding box ≥ 44×44px and adjacent target spacing ≥ 8px
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.6_

  - [ ]* 8.6 Add accessibility tests (axe-core + keyboard)
    - Vitest + `@axe-core/react` integration test on the rendered `/` DOM asserting: exactly one `<h1>` with name 1–120 chars; logical heading hierarchy with no skipped levels; every `<img>` has `alt` text or `alt=""`; every interactive control has an accessible name; one `<header>`, `<main>`, `<footer>`; first focusable element is the skip link; cycling region has `aria-hidden="true"`
    - Playwright keyboard spec that Tab-walks `/` and asserts every interactive element receives focus with computed `outline-width >= 2px` and outline contrast ≥ 3:1 against both surface and background
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.7, 7.8, 7.9, 7.10_

  - [ ]* 8.7 Add metadata byte-for-byte test
    - Vitest unit test importing `metadata` from `src/app/page.tsx` and asserting byte-for-byte equality against fixtures captured pre-redesign for `title`, `description`, `openGraph.title`, `openGraph.description`, `twitter.title`, `twitter.description`
    - Playwright assertion that rendered `<head>` contains `<link rel="canonical" href="https://www.softreetechnology.com/">`
    - _Requirements: 9.1, 9.3, 9.4_

  - [ ]* 8.8 Add `scripts/check-homepage-links.mjs` link reachability script
    - Script extracts every `<a href>` from the rendered `/` DOM via Playwright and HEAD-requests each internal link against the running dev server
    - Fails if any required link (`/contact`, `/services`, `/case-studies`, `/about-us`, every service deep link present pre-redesign) is missing, returns non-200, or is marked `rel="nofollow"`
    - Wired into the CI pipeline so it blocks merge on regression
    - _Requirements: 9.5, 9.6_

  - [ ]* 8.9 Extend Lighthouse CI for performance baseline comparison
    - Update `.github/workflows/lhci.yml` to capture 3 mobile-preset runs against the deployed `/` route and compare the median Performance score against the stored baseline (median of 3 runs against pre-redesign `/`)
    - Fail the build if post-redesign median is lower than baseline by any margin (tolerance 0)
    - _Requirements: 6.5_

  - [ ]* 8.10 Add CLS and `ScrollTrigger.pin` assertions
    - Playwright test asserting Cumulative Layout Shift on `/` is < 0.05 to validate skeleton-to-final height delta within ±10%
    - Test asserting no `ScrollTrigger.pin` instance pins for more than 50% of viewport height (`pin.end - pin.start <= window.innerHeight * 0.5`)
    - _Requirements: 6.2, 6.7_

  - [ ]* 8.11 Create Requirement 11.3 sign-off checklist artifact
    - Add `docs/homepage-redesign-signoff.md` listing each section in Requirement 11.1 × each breakpoint in Requirement 11.2 as a checkbox row to be marked pass/fail by the reviewer
    - Reference the computed-style suite output (8.3) so any token-value mismatch maps to a fail row
    - _Requirements: 11.3_

- [ ] 9. Final checkpoint — full verification suite passes
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP. The verification suite (8.x) is largely optional in MVP terms but strongly recommended given Requirements 6.5, 9.1, 9.5, 11.1–11.3 each have hard pass/fail gates.
- Each task references the granular sub-requirement numbers it satisfies.
- Section restyle tasks (4.1–4.7) each touch a distinct file and are independent of one another — they may run in parallel.
- The hero (2.x) and shared primitives (1.x) share files within their group, so sub-tasks within those groups must be sequenced.
- Shared component reuse: `AboutClientLogos`, `OffshoreTestimonialsGlobe` (variant="light"), `LightEngagementModels`, `LightFAQExact`, `LightContactSection` are imported as-is; no styling is duplicated. Their integration is handled in 6.1, 6.2, and 6.5 and so they do not appear as their own restyle tasks.
- The design has no Correctness Properties section because this is a UI rendering / visual parity refactor with no pure-function logic; verification uses snapshot, computed-style, axe-core, reduced-motion, responsive, metadata, link, and Lighthouse tests instead of property-based tests.
- Checkpoints (3, 5, 7, 9) are gates that confirm prior phases compile and the verification subset for that phase passes before continuing.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3", "1.4", "1.5"] },
    { "id": 1, "tasks": ["1.6", "1.7", "2.1", "4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7"] },
    { "id": 2, "tasks": ["2.2"] },
    { "id": 3, "tasks": ["2.3"] },
    { "id": 4, "tasks": ["2.4"] },
    { "id": 5, "tasks": ["2.5"] },
    { "id": 6, "tasks": ["2.6"] },
    { "id": 7, "tasks": ["6.1"] },
    { "id": 8, "tasks": ["6.2", "6.3", "6.4", "6.5", "6.7"] },
    { "id": 9, "tasks": ["6.6"] },
    { "id": 10, "tasks": ["8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "8.8", "8.9", "8.10", "8.11"] }
  ]
}
```
