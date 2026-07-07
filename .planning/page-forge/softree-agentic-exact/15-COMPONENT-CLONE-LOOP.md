# Component Clone Loop — Orchestrator (NON-STOP)

**Slug:** `softree-agentic-exact`  
**Route:** `/agentic-ai-platform`  
**Reference HTML:** `Softree_/aipage.html`  
**Reference live:** https://www.softreetechnology.com/ai-agent-platform  
**Mode:** `COMPONENT_CLONE_LOOP`

## Law

1. **One component at a time.** Do not start component N+1 until component N is **APPROVED** (≥9.8/10, zero P0).
2. **No self-approve** without `component-clone-verify.mjs` JSON + screenshots + replay evidence.
3. **Loop until APPROVED** — no max loop cap in this mode (budget: 99 per component, escalate after).
4. **Compare:** local route vs live Kore URL vs `aipage.html` selectors (DOM + computed styles + layout rects + motion where automatable).
5. **Fix order:** P0 layout/copy → P0 motion → P1 polish → re-verify.

## Component queue (strict order)

| # | ID | Selector | React source |
| --- | --- | --- | --- |
| 1 | `loader-hero` | `#meet-artemis` + `.k2-loader` | `SoftreeAgenticLoader`, `SoftreeAgenticHeroSection` |
| 2 | `enterprise-outcomes` | `#enterprise-ai-outcomes` | `SoftreeAgenticOutcomesSection` |
| 3 | `ai-agents` | `#ai-agents` | `SoftreeAgenticAgentsSection` |
| 4 | `ai-programmable` | `#ai-programmable` | `SoftreeAgenticProgrammableSection` |
| 5 | `pillars` | `#pillars` | `SoftreeAgenticPillarsSection` |
| 6 | `build-scale-optimize` | `#build-scale-optimize` | `SoftreeAgenticBuildScaleOptimizeSection` |
| 7 | `demo-video` | `.k2-section:has(.k2-video)` | `SoftreeAgenticDemoVideoSection` |
| 8 | `scroll-tabs` | `.k2-section-scroll-tabs` | `SoftreeAgenticScrollTabsSection` |
| 9 | `get-started` | `#get-started` | `SoftreeAgenticGetStartedSection` |
| 10 | `shell-header` | `.k2-header` | `SoftreeAgenticHeader` |
| 11 | `shell-footer` | `.k2-footer` | `SoftreeAgenticFooter` |
| 12 | `modals` | `.k2-modal` | `SoftreeAgenticReferenceModals` |

## Per-component loop

```
READ loop-state.json → current_component
BUILD / FIX component
RUN npm run component:verify -- <id> <loopN>
PARALLEL: visual diff screenshots (1536 + 390)
REVIEW → APPROVED | REJECTED
if REJECTED → increment loop → repeat
if APPROVED → advance queue → next component
```

## Gates (per component)

| Gate | Pass |
| --- | --- |
| `route_200` | local page loads |
| `section_present` | selector exists |
| `copy_match` | text nodes match reference |
| `style_match` | fontSize, lineHeight, letterSpacing, color match |
| `layout_match` | key rects within 4px avg delta @ 1536 |
| `screenshots` | local + ref PNG pair saved |
| `weighted_score` | ≥ 9.8 |

## Commands

```bash
npm run component:verify -- loader-hero 1
npm run hero:score          # hero deep audit
npm run handoff:verify -- N # loader→hero motion
```

## Artifacts

- `.planning/page-forge/softree-agentic-exact/components/<id>/loop-<n>/`
- `15-COMPONENT-<id>-LOOP-<n>.md`
- `15-COMPONENT-<id>-GATES.json`
- Update `loop-state.json` every loop
