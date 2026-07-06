# Design Checker — Loop 2

**Mode:** `EXACT_REFERENCE_MODE_REQUESTED`  
**Route:** `/kore-ai-component`  
**Reference:** `Softree_/aipage.html`

## Signature visual idea

**Kore orbit + scroll-progress card stack** — the page is recognizable by the pinned orbit step chapter (`#ai-programmable`) and the `--p`-driven outcomes card stack (`#enterprise-ai-outcomes`), not by Softree brand originality.

## Fidelity audit

| Area | Pass | Evidence |
| --- | --- | --- |
| Hero Rive canvas | yes | `#meet-artemis` canvas present after load |
| Outcomes scroll progress | yes | `.k2-cards-wrapper --p` animates 0.63 → 0.79 on scroll |
| Orbit steps | yes | `.k2-orbit-sticky[data-step]` updates on scroll + button click |
| Pillars modal | yes | `[data-modal-open="arch"]` opens panel `arch` |
| Build/Scale/Optimize tabs | yes | Outer tabs switch Build → Scale → Optimize |
| Scroll tabs (9 panes) | yes | Menu links activate on click (e.g. Prove with AI, Deploy with AI) |
| Demo video shell | yes | `.k2-demo-video` + Vimeo iframe + progress bar DOM |
| Shell chrome | yes | Header, side nav, footer, 2 modal panels |
| Middle light-group text | yes | `{ PILLARS }`, ABL™, ARCH, Invented for the agentic era |

## Generic-site rejection test

**N/A for exact reference mode** — page intentionally reproduces Kore.ai reference composition. Not evaluated as original Softree marketing.

## Scores (reference fidelity)

| Dimension | Score | Notes |
| --- | --- | --- |
| visual_design | 9.2 | Strong reference fidelity; minor timing-dependent orbit button hit areas |
| storytelling | 9.0 | Reference narrative preserved section-by-section |
| motion_taste | 9.1 | Orbit, outcomes `--p`, scroll-tabs, Barba intro all functional |
| creativity | 8.5 | Clone fidelity, not original art direction |

## Issues

### P0
- none

### P1
- `src/components/kore-ai-exact/KoreHeroSection.tsx` — `<img>` warnings (accepted for exact CDN asset fidelity)
- Orbit buttons report 0×0 rects until section is scrolled into active sticky range (click still works once in view)

### P2
- Manual pixel diff against live Kore site not run this loop

**Verdict:** PASS (exact reference)
