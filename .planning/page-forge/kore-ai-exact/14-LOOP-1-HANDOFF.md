# Loop 1 — Loader→Hero cinematic handoff

**Date:** 2026-07-05  
**Result:** APPROVED (technical) — 9.15/10 weighted

## Fixes applied

1. **P0:** CSS `opacity: 1 !important` fought GSAP during handoff → swap `kore-ai-k2-loader-running` to `kore-ai-k2-handoff-running` with `opacity: unset`
2. **P0:** Missing perspective/rotateX recede → added `.k2-loader-perspective` + GSAP rotateX timeline
3. **P1:** Loader mount race → `useSyncExternalStore` portal mount + run after DOM ready
4. **P1:** Overlay fade on bg settle → `.k2-loader-bg-overlay` tween

## Artifacts

- `14-BUILD-HANDOFF.md`
- `14a-ANIMATION.md`
- `14b-PERFORMANCE.md`
- `14c-VISUAL.md`
- `14-REVIEW.md`
- `14-VERIFICATION.md`
- `14-LOOP-1-GATES.json`
- `handoff-loop-1/*.png`

## Next

User opens replay URL and checks scratchpad sign-off.
