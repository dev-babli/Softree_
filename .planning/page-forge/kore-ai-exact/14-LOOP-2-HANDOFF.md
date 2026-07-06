# Loop 2 — Hero text vanish + cinematic handoff fix

**Date:** 2026-07-05  
**Result:** APPROVED (technical) — 12/12 gates  
**Replay:** http://localhost:3000/kore-ai-component?replay-loader=1

## Root causes fixed

1. **Flip target stayed `visibility: hidden`** — handoff CSS used `!important hidden` on `[data-flip-target="loader"]` while inline `visible` was set at FLIP swap; `finalizeHeroReveal()` then stripped inline styles.
2. **Hero rest stagger ran before FLIP lock** — H1/pill appeared then headline zone was empty until swap; reordered stagger to **1.88s** (after FLIP at 1.86s).
3. **Scroll reveal conflict** — post-intro `bindReveal()` stripped GSAP inline styles on `#meet-artemis` descendants; hero handoff now owns reveal exclusively.
4. **Reference scroll CSS hid `.char`** — intro-complete rules now lock all hero copy + chars visible with `!important`.

## Files changed

| File | Change |
| --- | --- |
| `heroHandoffSelectors.ts` | New — shared selectors + `finalizeHeroReveal()` |
| `k2CinematicHandoff.ts` | Reordered timeline; FLIP swap adds `k2-hero-handoff-settled` |
| `kore-ai-page-fix.css` | Hero copy lock post-intro; removed handoff flip `hidden !important` |
| `k2LoaderRuntime.ts` | Idempotent `finish()`; clears handoff class + hardStop |
| `KoreAiExactPage.tsx` | Exclude `#meet-artemis` from scroll reveal |
| `handoff-loop-verify.mjs` | Gates: hero_text_visible, hero_typography, hero_flip_visible, replay_loader |

## Evidence

- Gates: `14-LOOP-2-GATES.json` — 12/12 pass
- Screenshots: `handoff-loop-2/` (9376ms sequence)
- Hero audit: 33/33 chars visible, flip target visible
