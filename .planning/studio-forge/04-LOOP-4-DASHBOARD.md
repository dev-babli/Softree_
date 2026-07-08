# Loop 4 — Dashboard workspace redesign

**Date:** 2026-07-06  
**Phase:** `visual_polish` + `authoring_ux`  
**Research:** Four Kitchens editorial workplace patterns, GitCMS content board, Concrete CMS editor UX

## Design principles applied

| Principle | Implementation |
| --- | --- |
| Work queue before architecture | Hero → pipeline → **Your work queue** first |
| Reduce cognitive load | Charts/PageSpeed/AI audit collapsed under **Site insights** |
| One obvious create path | Primary CTAs in hero (case study + blog + presentation) |
| Progressive disclosure | Analytics optional; tools in compact sidebar |
| Welcoming copy | "Your editorial workspace", "You are all caught up" |
| Governance in UI | Per-item progress %, "Next: missing field" tags |

## New layout (top → bottom)

1. **Welcome hero** — greeting, readiness ring, 3 CTAs
2. **Pipeline board** — Needs attention · Drafts · Live · Edits this week
3. **Workspace grid**
   - Left: Work queue + Continue where you left off
   - Right: Tools (5 tiles) + How it works (3 steps)
4. **Site insights** (collapsed) — charts + AI health

## Files changed

- `StudioDashboard.tsx` — restructured layout
- `dashboard/DashboardWelcomeHero.tsx` — new
- `dashboard/DashboardPipelineBoard.tsx` — new
- `dashboard/DashboardQuickTools.tsx` — new
- `dashboard/DashboardGettingStarted.tsx` — new
- `dashboard/dashboard.css` — workspace styles
- `structure.tsx` — sidebar "Home" → **Workspace**
- `RecentEditsList.tsx` — `hideHead` for continue section

## Removed from default view

- Duplicate KPI strip (merged into pipeline + hero ring)
- 8 stacked quick-action buttons (replaced by hero CTAs + tool grid)
- Collapsible text-only guides (replaced by always-visible How it works)

## Verification

- `npm run build` → exit 0

## Next (Loop 5)

- Chrome MCP screenshots at 1440 + 390
- Studio navbar polish to match workspace branding
