# Page Factory — Awwwards-Level Page Generation Pipeline

A reusable multi-agent looping system that designs, builds, reviews, and corrects
marketing pages for this site until they pass a full QA gauntlet.

## One-time setup (registers the skill + agents with Claude Code)

From the repo root (Windows):

```
xcopy /E /I /Y page-factory\agents .claude\agents
xcopy /E /I /Y page-factory\skill .claude\skills\page-factory
xcopy /I /Y page-factory\workflow\page-factory.workflow.js .claude\workflows\
```

(The canonical sources stay in `page-factory/` — re-run the copy after editing them.)

## How to run

1. Start the dev server in a separate terminal: `npm run dev`
2. In Claude Code, from the repo root:

```
/page-factory <route> — e.g. /page-factory /services/offshore-ai
```

Or describe it: "run the page factory on the about-us page".

The orchestrator can also run the workflow directly without the copy step:
`Workflow({ scriptPath: "page-factory/workflow/page-factory.workflow.js", args: { route, pageSlug, date, serverUp } })`

## The loop

```
┌─ 1. INTAKE ──────── design-researcher reads design-references/ + LEARNINGS.md
│                     + research/design-trends-2026.md → design brief
├─ 2. DIRECTION ───── 3 parallel direction proposals → judge panel → winner
├─ 3. STORY ───────── storytelling-director → chapter-based scrollytelling spec
├─ 4. BUILD ───────── one component-builder agent per section (parallel)
├─ 5. ASSEMBLE ────── page route assembled, wired into app router
└─ 6. QA GAUNTLET ─── loop until all gates pass (max 4 rounds):
      ├─ viewport-checker    → runs `npm run qa:viewport -- <route>` (6 viewports,
      │                        scroll captures, overflow/overlap/broken-asset detection)
      ├─ performance-auditor → runs `npm run qa:perf -- <route>` (LCP/CLS/long tasks/
      │                        scroll FPS/bundle weight)
      ├─ review-agent        → design critique vs. the awwwards bar + anti-pattern list
      ├─ correction agents   → one agent per confirmed issue, fixes applied
      └─ every failure is appended to LEARNINGS.md so no mistake repeats
```

## Directory map

| Path | Purpose |
|---|---|
| `design-references/` | **Drop your design inspiration here** — HTML of sites you like, screenshots, URLs, prompts. Read at intake. |
| `LEARNINGS.md` | The mistake ledger. Every agent reads it before working; QA failures append to it. Never delete entries. |
| `research/design-trends-2026.md` | Trend research (refreshed by design-researcher when stale). |
| `research/codebase-map.md` | Architecture conventions all builders must follow. |
| `briefs/` | Generated design briefs + storytelling specs per page. |
| `qa/` | Screenshot + audit output per page per round. Gitignored. |
| `../scripts/qa/viewport-audit.mjs` | Puppeteer multi-viewport + scroll-capture + layout-fault detector. |
| `../scripts/qa/perf-audit.mjs` | Web-vitals / long-task / scroll-FPS / weight audit. |
| `../.claude/agents/` | The seven agent definitions. |
| `../.claude/workflows/page-factory.js` | The deterministic orchestration loop. |

## QA gates (all must pass)

1. **Layout**: no horizontal overflow at any viewport; no element wider than viewport;
   no zero-size or broken images; no overlapping interactive elements.
2. **Responsiveness**: 360, 390, 768, 1024, 1440, 1920 px all visually correct
   (verified against screenshots, not assumptions).
3. **Performance**: LCP < 2.5s (local), CLS < 0.1, no long task > 200ms during scroll,
   scroll FPS ≥ 50 average, zero console errors, zero failed requests.
4. **Motion**: `prefers-reduced-motion` respected; transform/opacity-only animation;
   animations gated to viewport (no offscreen tickers).
5. **Craft**: passes review-agent critique against the anti-pattern list —
   no template-look, storytelling arc intact, micro-interaction density adequate.
