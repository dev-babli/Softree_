# Task: Kore AI Exact Page Loop

- [x] **COMPONENT CLONE LOOP — ALL 12/12 APPROVED** (10/10 each @ :3001)
- [x] Handoff loop 3 — 13/13 gates pass
- [x] Loader layout fix — display-5 + flex center (0px delta vs live Kore @ 1536)
- [x] Hero text visibility fix — z-index stacking + handoff reveal lock
- [x] Hero bg fix — isolation isolate + z-index 0/1/2 layering (see 16-LOOP-HERO-BG-ERROR-CORRECTION.md)
- [x] Light theme fix — agents / programmable / pillars reveal + Kore copy (see 17-LOOP-LIGHT-THEME-ERROR-CORRECTION.md)
- [x] Handoff loop 5 — 13/13 gates pass
- [ ] User visual sign-off on full page

## Approved components

loader-hero · enterprise-outcomes · ai-agents · ai-programmable · pillars · build-scale-optimize · demo-video · scroll-tabs · get-started · shell-header · shell-footer · modals

## Replay

`http://localhost:3001/kore-ai-component?replay-loader=1`

## Verify all

```bash
npm run component:verify -- loader-hero 1
npm run handoff:verify -- 3
```
