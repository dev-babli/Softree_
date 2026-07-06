# Component Clone Loop — Orchestrator (NON-STOP)

**Slug:** `kore-ai-exact`  
**Route:** `/kore-ai-component`  
**Reference HTML:** `Softree_/aipage.html`  
**Reference live:** https://www.kore.ai/ai-agent-platform  
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
| 1 | `loader-hero` | `#meet-artemis` + `.k2-loader` | `KoreK2Loader`, `KoreHeroSection` |
| 2 | `enterprise-outcomes` | `#enterprise-ai-outcomes` | `KoreEnterpriseOutcomesSection` |
| 3 | `ai-agents` | `#ai-agents` | `KoreAgentsSection` |
| 4 | `ai-programmable` | `#ai-programmable` | `KoreAiProgrammableSection` |
| 5 | `pillars` | `#pillars` | `KorePillarsSection` |
| 6 | `build-scale-optimize` | `#build-scale-optimize` | `KoreBuildScaleOptimizeSection` |
| 7 | `demo-video` | `.k2-section:has(.k2-video)` | `KoreDemoVideoSection` |
| 8 | `scroll-tabs` | `.k2-section-scroll-tabs` | `KoreScrollTabsSection` |
| 9 | `get-started` | `#get-started` | `KoreGetStartedSection` |
| 10 | `shell-header` | `.k2-header` | `KoreAiHeader` |
| 11 | `shell-footer` | `.k2-footer` | `KoreAiFooter` |
| 12 | `modals` | `.k2-modal` | `KoreAiReferenceModals` |

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

- `.planning/page-forge/kore-ai-exact/components/<id>/loop-<n>/`
- `15-COMPONENT-<id>-LOOP-<n>.md`
- `15-COMPONENT-<id>-GATES.json`
- Update `loop-state.json` every loop
