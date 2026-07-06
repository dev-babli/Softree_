---
agent: performance-checker
scores:
  performance: 8.6
---

# Performance check

## Budgets

- GSAP pins: 0 (CSS sticky only for models)
- blur-on-scroll: none
- gsap cleanup: useGSAP scope + event listener once/remove
- lcp: hero text in HTML; reveal uses transform + opacity ≥ 0.92 (not blanked)
- loader: page-scoped, session skip, reduced-motion skip, force complete 3.2s
- root layout: not hijacked

## Notes

- Hero intervals respect `prefersReducedMotion()`
- Motion limited to transform/opacity in loader CSS and GSAP intro
- No global Barba/loader on `src/app/layout.tsx`

## P0

- None

## P1

- None after reduced-motion interval fix

## P2

- [ ] Hero image shared with agentic page (`/service_image/ai.jpg`) — consider GenAI-specific asset later
- [ ] Entire `GenerativeAiPage` is a client boundary — acceptable for interactivity; could split static sections later
