# 14b-PERFORMANCE — Loop 1

| Check | Result |
| --- | --- |
| transform + opacity only | PASS (rotateX on bg layer only) |
| No layout thrash | PASS — GSAP inline transforms |
| Hero webp single URL | PASS — `SOFTREE_AGENTIC_HERO_BG_IMAGE` |
| Lenis restart | PASS — `finish()` calls `lenis?.start?.()` |
| Flip clone removed | PASS — `clone.remove()` at 1.78s |
| prefers-reduced-motion | PASS — instant `finish()` |
| Handoff duration | 9645ms total sequence (within 12s budget) |

**P0:** none  
**P1:** none  

**Performance dimension:** 9.4/10
