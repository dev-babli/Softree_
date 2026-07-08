# Visual diff — loader + hero (loop 4)

**Date:** 2026-07-04  
**Local:** http://localhost:3000/agentic-ai-platform  
**Reference:** https://www.softreetechnology.com/ai-agent-platform  
**Viewport:** 1536×960 (effective innerHeight ~732 with browser chrome)

## Screenshots

| Scope | Local | Reference |
| --- | --- | --- |
| Hero (post-loader) | `diff-hero-1536-local.png` | `diff-hero-1536-ref.png` |
| Loader (mid-run) | `diff-loader-1536-local.png` | _(capture on next pass — ref reload timeout)_ |

## Changes this loop

1. Replaced custom `SoftreeAgenticIntroTransition` with Kore `.k2-loader` + `k2Flip()` port (`SoftreeAgenticLoader.tsx`, `k2LoaderRuntime.ts`, `k2-loader.css`).
2. Restored exact Kore hero copy in `SoftreeAgenticHeroSection.tsx` (pill, Meet { Artemis }, H1, body, Get Demo CTA).
3. Added `visual-diff-checker` agent to awwwards loop (`agents.md`, `loop-protocol.md`, `.agents/skills/visual-diff-checker/SKILL.md`).
4. Updated route metadata to Kore reference title.

## Computed style parity (hero, post-loader)

All hero typography tokens **match** reference at 1536px:

| Element | fontSize | lineHeight | letterSpacing | color |
| --- | --- | --- | --- | --- |
| Pill | 16.20px | 16.20px | -0.324px | rgb(92, 200, 58) |
| Flip target | 53.38px | 58.71px | -0.324px | white |
| H1 | 72.92px | 65.63px | -1.458px | white |
| Sub em | 53.38px | 58.71px | -1.068px | italic white |
| Body | 18.23px | 21.88px | -0.365px | white |
| CTA | 16.20px | 24.31px | -0.324px | black on white chip |

## P0 (blocks ship)

| # | Area | Issue | Fix |
| --- | --- | --- | --- |
| — | — | None open from style/DOM audit | — |

## P1 (visible quality gaps)

| # | Area | Issue | Fix file |
| --- | --- | --- | --- |
| 1 | Loader timing | Step classes advance quickly; verify step-0 char stagger visible ≥1s | `k2LoaderRuntime.ts` |
| 2 | Hero scroll reveal | Char stagger on pill may not replay after loader (static `.on` on section) | `SoftreeAgenticPage.tsx` reveal bind |
| 3 | Rive Build tab | Canvas opacity transition — confirm parity with ref autoplay | `SoftreeAgenticHeroSection.tsx` |
| 4 | Dev chrome | Next.js dev indicator bottom-left (dev only) | N/A production |

## Motion / transition gaps

- [x] `.k2-loader` step-0→3 CSS animations ported from live HTML extract
- [x] `k2Flip("loader")` FLIP 1.5s cubic-bezier(.16,1,.3,1)
- [ ] Side-by-side loader frame capture vs reference (ref tab reload timed out — retry)
- [ ] Pill char fade-in on scroll (reference replays after loader via `k2Split` + scroll CSS)

## DOM structure

- [x] Loader `[data-flip="loader"]` matches reference markup
- [x] Hero `[data-flip-target="loader"]` char-split structure matches
- [x] CTA href `/get-a-demo-artemis`, label "Get Demo"

## Verdict

**CONDITIONAL PASS — hero typography/layout parity confirmed via computed styles + DOM visibility audit.**  
User visual sign-off still required. Re-run loader screenshot pair on reference after clearing `k2LoaderPlayedAt`.

## Next loop actions

1. Capture `diff-loader-1536-ref.png` at step-0 and post-flip
2. Add SplitType script if pill char stagger must match reference entrance
3. User confirms loader FLIP + hero match in browser
