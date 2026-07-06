# 14-BUILD-HANDOFF — Loop 1

**Replay:** http://localhost:3000/kore-ai-component?replay-loader=1

## Files changed

| File | Change |
| --- | --- |
| `KoreK2Loader.tsx` | Perspective stage wrapper; shared `KORE_HERO_BG_IMAGE`; portal via `useSyncExternalStore` |
| `k2-loader.css` | `.k2-loader-perspective`, 3D bg plane, flip clone animation kill |
| `k2CinematicHandoff.ts` | rotateX recede, overlay dip, FLIP toward-camera beat, hero stagger |
| `k2LoaderRuntime.ts` | Handoff class swap; tuned step fallbacks |
| `kore-ai-page-fix.css` | GSAP handoff no longer fights `!important` opacity rules |

## Timeline (master ~1.75s handoff)

```
0.0s  bg scale 1.18 + rotateX 6° → 1.0 (recede)
0.0s  grain/bar fade out
0.12s hero .k2-bg crossfade in
0.2s  FLIP clone toward camera (scale 0.82→1.06)
0.82s FLIP settle to hero slot
0.95s hero rest stagger (pill → h1 → cta → tabs)
1.35s loader shell fade
1.75s finish() — portal removed, intro-complete
```

## Evidence

- Gates: `14-LOOP-1-GATES.json` — 8/8 pass
- Screenshots: `handoff-loop-1/` (12 PNGs, 3 viewports × 4 frames)
