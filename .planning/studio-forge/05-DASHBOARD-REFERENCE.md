# Dashboard reference — Vercel Speed Insights + Web Analytics

**Loop 5 target:** Softree Studio **Command Center**  
**Primary reference:** [Vercel Dashboard redesign](https://vercel.com/blog/dashboard-redesign) + [Speed Insights](https://vercel.com/docs/speed-insights)

## What we borrowed

| Vercel pattern | Softree implementation |
| --- | --- |
| Production health at a glance | **Site pulse** row — perf, traffic, search, editorial |
| Per-route performance kanban | **Page scorecards** — `/`, `/case-studies`, `/blog`, etc. |
| Top pages panel | **Top pages (7d)** from PostHog paths |
| Actionable drill-down | **Content issues** rows with fix links |
| Progressive density | Work queue primary; metrics always visible (not hidden) |
| Score coloring (green/amber/red) | PSI thresholds: ≥90 good, ≥50 warn, below red |

## Data sources (each tile maps to one)

| Tile | Source | Meaning for editors |
| --- | --- | --- |
| PageSpeed scores | `PSI_API_KEY` → Lighthouse | How fast pages feel on mobile |
| Visitors / pageviews | PostHog HogQL | Real people reading your content |
| Search clicks | Google Search Console API | Discovery from Google |
| Content issues | Sanity GROQ | What to fix before publishing |
| Work queue | Sanity completeness | Your next editing tasks |

## Key routes audited

`/`, `/case-studies`, `/blog`, `/contact`, `/services` — mobile strategy, 1h cache.
