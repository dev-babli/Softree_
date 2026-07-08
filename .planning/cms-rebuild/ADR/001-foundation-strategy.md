# ADR-001: Foundation Strategy

**Status:** Accepted  
**Date:** 2026-07-07  
**Agents:** 1 (Architect), 3 (Next.js), 4 (Sanity)

## Context

User requested rebuild from `sanity-template-nextjs-clean` while deleting existing Studio. Three reference repos exist:

- `sanity-template-nextjs-clean` — Turbo monorepo, separate Studio port
- `template-nextjs-personal-website` — embedded Studio, Cache Components
- `cms-kit` — agency page builder patterns
- Current Softree — embedded `/studio`, production dataset, 119 Sanity files

## Decision

1. **Use clean template as pattern source, not literal repo fork**
2. **Keep embedded Studio** at `/studio` in main Next.js app (production constraint)
3. **New code lives in `src/cms/`** — parallel to `src/sanity/` until cutover
4. **Same Sanity project + dataset** — migrate in place, no greenfield dataset
5. **Single Studio URL** at `/studio` — no `/studio-v2`; cutover when new CMS passes gates

## Rationale

- Softree already deploys one Next app; splitting Studio to `:3333` adds ops burden
- Clean template's value is `defineLive`, Presentation, typegen — all portable
- Big-bang delete risks production content; parallel build de-risks
- Personal-website template proves embedded Studio + Cache Components works

## Consequences

**Positive:**
- No Vercel/deployment architecture change
- Editors keep `/studio` URL after cutover
- Testing on staging branch before `/studio` swap

**Negative:**
- Larger single-repo bundle — mitigate with lazy plugins
- Must discipline folder structure (`src/cms/` vs `src/sanity/`)

## Alternatives considered

| Alternative | Rejected because |
|-------------|------------------|
| Full monorepo fork of clean template | Requires splitting Softree frontend; high churn |
| Keep patching existing `src/sanity/` | Technical debt too deep; user mandated greenfield |
| New Sanity project/dataset | Breaks production URLs and content history |
