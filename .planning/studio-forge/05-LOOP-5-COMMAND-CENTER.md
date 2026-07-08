# Loop 5 — Command Center (Vercel reference)

**Reference:** [Vercel Speed Insights](https://vercel.com/docs/speed-insights) + [Dashboard redesign](https://vercel.com/blog/dashboard-redesign)  
**Artifact:** `05-DASHBOARD-REFERENCE.md`

## Every component — purpose

| Component | Meaning | Data source |
| --- | --- | --- |
| **Welcome hero** | Greeting + create CTAs + editorial readiness % | Sanity GROQ |
| **Site pulse** | 4 live health tiles: speed, visitors, search, gaps | PSI + PostHog + GSC + Sanity |
| **Page scorecards** | Per-route mobile PageSpeed (Perf/SEO/A11y) | PSI (5 routes) |
| **Pipeline board** | Quick counts: attention, drafts, live, edits | Sanity GROQ |
| **Work queue** | Actionable docs with % complete + next field | Sanity completeness |
| **Content pipeline chart** | Published/draft/needs-work by type | Sanity GROQ |
| **Content issues** | SEO/AEO/review gaps with fix links | Insights GROQ |
| **Top pages** | Where traffic goes (7d) | PostHog HogQL |
| **Edit velocity** | Team activity chart + recent edits | Sanity GROQ |
| **Quick tools** | Studio shortcuts | Static |
| **How it works** | 3-step onboarding | Static |
| **AI assistant health** | Assist/Agent/config audit | API audit |

## API extensions (Loop 5)

- PSI routes: `/`, `/case-studies`, `/blog`, `/contact`, `/services`
- PostHog: `topPages` HogQL query (top 8 paths, 7d)

## UX change from Loop 4

- Metrics **always visible** (not collapsed) — user asked for scores/visits on every view
- Each metric tile explains *why it matters*
- Page cards link to live URLs

## Verification

- `npm run build` → pending
