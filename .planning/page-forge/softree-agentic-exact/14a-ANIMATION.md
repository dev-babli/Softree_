# 14a-ANIMATION — Loop 1

**Replay:** http://localhost:3000/agentic-ai-platform?replay-loader=1

| Criterion | Score | Evidence |
| --- | ---: | --- |
| Step 0→3 before handoff | 9.0 | `1536-02-loader-step3.png` |
| Shared bg, no flash | 9.5 | `bg_url_match` gate; same CDN src |
| Bg recede (scale + rotateX) | 9.0 | `k2CinematicHandoff.ts` + `1536-03-handoff-mid.png` |
| Headline toward-camera FLIP | 8.8 | overscale 1.06 keyframe in timeline |
| Hero stagger post-lock | 9.0 | `1536-04-hero-settled.png` |
| No stuck loader | 10 | completes 9645ms; hard stop 12s |
| Session skip / replay param | 10 | `k2LoaderPlayedAt` + `?replay-loader=1` |

**P0:** none  
**P1:** FLIP alignment on 390px — verify manually on device  

**Animation dimension:** 9.2/10
