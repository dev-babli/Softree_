# Performance Checker — Loop 2

**Route:** `/kore-ai-component`

## Audit

| Item | Result | Notes |
| --- | --- | --- |
| Route HTTP | 200 | verified |
| Console errors/warns | clean | after full reload + interaction pass |
| LCP text | pass | hero H1 in DOM; Barba intro overlays, does not blank text permanently |
| Motion properties | pass | component logic uses transform/opacity patterns |
| GSAP cleanup | pass | ScrollTrigger `kill()` on unmount in scroll-tabs |
| Pin budget | pass | one pinned chapter (scroll-tabs on desktop) |
| CDN scripts | note | Rive, GSAP, ScrollTrigger, ScrollToPlugin, Vimeo loaded page-scoped |
| Reduced motion | partial | Barba intro respects `prefers-reduced-motion`; section reveals use `.on` class |

## Score

**performance: 8.6**

## Issues

### P0
- none

### P1
- Duplicate GSAP sources (Webflow CDN + jsdelivr ScrollToPlugin) — acceptable for reference fidelity but adds weight

### P2
- No Lighthouse trace captured this loop

**Verdict:** PASS
