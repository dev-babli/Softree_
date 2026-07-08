# Feature Gap Analysis — Reference → Softree CMS

**Base:** `sanity-template-nextjs-clean`  
**Reference:** `template-nextjs-personal-website`, `cms-kit`  
**Target:** `src/cms/` + Softree production site  
**Date:** 2026-07-07

---

## Executive summary

| Source | Role | Migrate? |
|--------|------|----------|
| **sanity-template-nextjs-clean** | Foundation (live, queries, presentation, page builder spine) | **YES — base** |
| **template-nextjs-personal-website** | Cache Components + three-layer fetch + optimistic arrays | **YES — modernize** |
| **cms-kit** | Section catalog, common fields, controller/UI split, template picker | **YES — redesign** |
| **Softree legacy (`src/sanity`)** | Production GROQ + 38 case studies + premium layouts | **KEEP data; retire code** |

Softree already exceeds the clean template in content model and AI. Gaps are **architecture** (dual data layer), **caching** (no Cache Components), **agency UX** (section catalog, command palette), and **publish model** (`status` vs `visibility`).

---

## Feature matrix

| Feature | Clean | Personal | cms-kit | Softree today | Action |
|---------|-------|----------|---------|---------------|--------|
| `defineLive` + SanityLive | ✅ | ✅ | ✅ | ✅ (sanity path live) | Wire `CmsSanityLive` |
| Presentation Tool | ✅ | ✅ | Tinloof alt | ✅ | Keep native |
| Draft mode | ✅ | ✅ | ✅ | ✅ | Keep |
| `defineQuery` + typegen | ✅ | ✅ | ✅ | Partial | Add root `schema.json` |
| Cache Components | Skill only | ✅ | ❌ | ❌ | **Port three-layer pattern** |
| Singleton desk plugin | ✅ settings | ✅ home+settings | ❌ | Manual lists | Port `singletonPlugin` |
| Page builder blocks | 2 | ❌ | 7 sections | 15 composer + 5 marketing | Merge `sectionCommonFields` |
| Section template picker | ❌ | ❌ | ✅ screenshots | SectionPicker exists | **Improve presets** |
| `sectionCommonFields` | ❌ | ❌ | ✅ | **Added iter 1** | Apply to all blocks |
| Controller/UI split | ❌ | ❌ | ✅ packages/ui | Monolith | Extract `@/cms/ui` later |
| Co-located GROQ fragments | Partial | Partial | ✅ per section | Single `queries.ts` | **Sprint 3** |
| CMS-driven navigation | ❌ | ✅ settings.menu | header doc | Hardcoded nav | Add `navigation` singleton |
| Timeline blocks | ❌ | ✅ | ❌ | ❌ | Reject (not Softree need) |
| Optimistic array reorder | ❌ | ✅ | ❌ | ❌ | Port for composer/menu |
| Unsplash asset source | ✅ | ✅ | ❌ | ❌ | Add plugin |
| AI Assist alt text | ✅ | ❌ | ❌ | ✅ | Keep |
| Custom AI tools | ❌ | ❌ | ❌ | ✅ Content Agent, Gemini | Expand to field-level |
| Guarded publish | ❌ | ❌ | ❌ | ✅ | Keep; simplify with ADR-002 |
| Premium case study layouts | ❌ | ❌ | ❌ | ✅ 19 layouts | Keep frontend registry |
| Webhook revalidation | Documented | ❌ | Storyblok only | `/api/revalidate` | Keep + document |
| Sitemap | ✅ (buggy URL) | ❌ | ✅ | ✅ | Fix https protocol |
| JSON-LD | ❌ | ❌ | ❌ | Partial | **Agent 07** |
| Command palette | ❌ | ❌ | ❌ | ❌ | **Build** |
| MCP | ❌ | ❌ | ❌ | Planned | **Agent 06 Sprint 4** |

---

## Migrate (redesign first)

### From clean template
1. `api.ts` / `token.ts` / `client.ts` split → **done iter 1**
2. `defineLive` wiring pattern
3. Presentation `defineDocuments` + location resolvers
4. Page builder registry (`BlockRenderer` pattern) for marketing pages
5. Onboarding empty states
6. Unsplash plugin

### From personal-website
1. `cacheComponents: true` + `cacheLife: { default: sanity }`
2. `getDynamicFetchOptions()` helper
3. Page → Dynamic → Cached component split
4. `(website)` vs `/studio` route group isolation
5. `OptimisticSortOrder` for composer sections
6. `sanityFetchMetadata` / `sanityFetchStaticParams` wrappers
7. `stegaClean()` on display fields
8. CORS error toast for Live API

### From cms-kit
1. `sectionCommonFields` → **done iter 1**
2. Per-section module layout (`schema`, `query`, `controller`, `templates/`)
3. Template selector with preview images (fix hardcoded asset refs)
4. `customLink` with button variants
5. `SectionContainer` + theme via `data-theme`
6. Turbo `pnpm gen` section scaffolding (adapt to npm/turbo in Softree)
7. SEO group on pages (robots, ogImage) — merge with existing Softree SEO fields

---

## Reject (with reason)

| Feature | Reason |
|---------|--------|
| Tinloof `pages()` plugin | Native Presentation Tool is better for Softree |
| `section.hero` as document-in-array | Schema smell; use object + optional ref |
| Separate studio on :3333 | Embedded `/studio` is locked decision |
| Storyblok / Payload apps in cms-kit | Sanity-only |
| Timeline/milestone blocks | Not in Softree content strategy |
| Static marketing homepage shell | Replace with CMS `homepage` singleton |

---

## Softree-only (keep)

- 19 premium case study layouts + page-composer
- Guarded publish + website visibility (until ADR-002)
- Content Agent pipeline
- Case study category taxonomy
- AEO / FAQ completeness scoring
- React Bits integration
- Studio API routes (migrate namespace to `/api/cms/`)

---

## Priority order (next 5 sprints)

1. **Sprint A** — Fix data layer: env ✅, wire `CmsSanityLive`, port queries
2. **Sprint B** — Cache Components + three-layer fetch on top 5 routes
3. **Sprint C** — ADR-002 visibility migration + publish API
4. **Sprint D** — Section catalog v2 + template picker UX
5. **Sprint E** — AI field actions everywhere + `/api/cms/ai/`

---

## Agent assignments (this iteration)

| Agent | Deliverable | Status |
|-------|-------------|--------|
| 01 Architect | `api.ts`, gap doc, checklist | ✅ |
| 02 Sanity | `sectionCommonFields`, schema plan | 🟡 |
| 03 Next.js | queries stub, live layer fix | 🟡 |
| 04 UX | Dashboard redesign spec | ⬜ |
| 05 Design system | sectionCommonFields | ✅ |
| 06 AI | architecture stub | ⬜ |
| 07 SEO | gap documented | ✅ |
| 08 Perf | cacheComponents plan | ⬜ |
| 09 Security | token.ts server-only | ✅ |
| 10 QA | build verify | 🟡 |
