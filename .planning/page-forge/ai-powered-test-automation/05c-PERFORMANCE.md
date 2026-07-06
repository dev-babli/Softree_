---
agent: performance-checker
scores:
  performance: 8.1
---

# Performance Check

Scope audited:

- `src/components/test-automation/**`
- `src/app/services/ai-powered-test-automation/page.tsx`
- `src/app/services/ai-powered-test-automation/layout.tsx`
- `src/app/layout.tsx`

Rendered path confirmed: the route entry renders `TestAutomationPage` from `src/components/test-automation`. The older route-local files listed in `04-BUILD.md` remain unwired and were not treated as active page runtime.

## Budgets

- LCP budget: hero headline must stay server-rendered and must not be blanked with `opacity: 0`; hero media should remain the only large priority asset.
- Loader budget: page-scoped only, first session only, skip on reduced motion / save-data / 2g / hash routes, target visible intro <= 1.2s, hard fail-safe <= 3.2s.
- ScrollTrigger pin budget: 0 active GSAP pins, 1 CSS sticky chapter allowed.
- Scroll effects budget: no scroll-time blur, filter, backdrop-filter, or layout-width animation.
- Motion budget: transform + opacity for runtime entrance/exit; color-only hovers are acceptable; avoid `width`, `height`, `top`, `left`, `box-shadow`, or `filter` in continuous loops.
- GSAP lifecycle budget: all timelines must be scoped, reverted, or explicitly killed on unmount.
- Reduced-motion budget: no loader, no auto-rotating copy/testimonials, no initial reveal motion, no manual-control motion.
- Root layout budget: no global loader, Barba wrapper, global route transition, GSAP mount, or document-level motion hijack.

## Evidence

- LCP path is mostly safe: `page.tsx` renders the page below preserved nav/footer, and `TestAutomationHero` uses an `h1` through `SectionHeader` plus a priority hero image.
- Loader is route-scoped: `TestAutomationPageLoader` adds only `test-automation-route` / `test-automation-loading`, removes both on cleanup, and dispatches `test-automation:ready`.
- Loader safety is intentionally bounded: `shouldSkipTestAutomationIntro()` skips reduced motion, save-data, 2g/slow-2g, session repeats, and hash routes; `FORCE_COMPLETE_MS` provides a 3.2s fail-safe.
- ScrollTrigger pin budget passes: no `ScrollTrigger` import or `pin:` usage in the active component tree; `TestAutomationPipeline` uses one CSS sticky column.
- No active scroll blur/filter found: the rendered component tree has no `filter`, `blur`, or `backdrop-filter` on scroll. The only SVG filter is a static low-opacity loader grain.
- Root layout passes: `src/app/layout.tsx` contains analytics/providers only and no page-loop loader, Barba, GSAP, Framer route transition, or root-level motion hijack.

## P0

- None.

## P1

- [ ] Hero testimonial progress updates `width` on every animation frame. `TestAutomationHero` drives `progress` through `requestAnimationFrame`, then writes `style={{ width: `${progress}%` }}`. This is the only continuous layout-affecting animation in the rendered page and should become `transform: scaleX(...)` with `transform-origin: left` or a CSS custom property consumed by `transform`.
  - Evidence: `src/components/test-automation/sections/TestAutomationHero.tsx:54-68`, `src/components/test-automation/sections/TestAutomationHero.tsx:213-215`

- [ ] Reduced-motion still gets Framer initial/manual transitions. Loader, GSAP, auto word cycling, and auto testimonial progress correctly skip, but the `motion.span` and `motion.div` still define `initial/animate/exit` y/opacity transitions. Under reduced motion, initial render and manual testimonial navigation should render static state or use `transition={{ duration: 0 }}`.
  - Evidence: `src/components/test-automation/sections/TestAutomationHero.tsx:154-162`, `src/components/test-automation/sections/TestAutomationHero.tsx:216-223`

- [ ] Loader logo is marked `priority` while the hero image is also `priority`. On the first session, this can compete with the actual LCP candidate and make the loader logo or delayed hero image dominate LCP. Keep the hero image priority; make the small loader logo non-priority unless measurement proves it helps.
  - Evidence: `src/components/test-automation/TestAutomationPageLoader.tsx:97-103`, `src/components/test-automation/sections/TestAutomationHero.tsx:131-137`

## P2

- [ ] The GSAP intro timeline is created from `runIntro`, which can run from a delayed `test-automation:ready` event. `useGSAP` scopes the callback and the listener is removed, but the delayed timeline should be wrapped with `contextSafe()` or stored in a ref and killed in cleanup to make unmount behavior explicit.
  - Evidence: `src/components/test-automation/sections/TestAutomationHero.tsx:71-94`

- [ ] The full-screen loader overlays the page for the first visit even though the hero text itself is not set to `opacity: 0`. This is acceptable for the loop if the intro remains short, but it should be measured in Lighthouse/Web Vitals because the visible LCP moment can still be pushed by the overlay and exit fade.
  - Evidence: `src/components/test-automation/test-automation-loader.css:7-14`, `src/components/test-automation/test-automation-loader.css:185-201`, `src/components/test-automation/TestAutomationPageLoader.tsx:66-69`

- [ ] Legacy route-local files contain `backdropFilter`, `transition: all`, and width transitions, but they are not imported by the current route entry. Keep them unwired or delete them in a cleanup pass so they cannot accidentally regress the page if reintroduced.
  - Evidence: `src/app/services/ai-powered-test-automation/page.tsx:90-97`, `04-BUILD.md`

## Verdict

No P0 blocker found. The page is structurally safe for the Awwwards loop: no global root-layout hijack, no ScrollTrigger pin pressure, no active scroll blur/filter, and a bounded route-scoped loader. Performance is below the 8.5 polish target because of one continuous width animation, incomplete reduced-motion treatment for Framer transitions, and loader/hero priority competition.
