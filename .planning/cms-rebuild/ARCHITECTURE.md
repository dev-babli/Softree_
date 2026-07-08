# Softree CMS — Target Architecture

**Version:** 0.1  
**Status:** Draft for review  
**Foundation:** Patterns from `sanity-template-nextjs-clean` + Softree production constraints

---

## Executive summary

Rebuild Softree CMS as a **greenfield Studio + content layer** inside the existing Next.js app, using the **clean template's data/preview patterns** while designing **agency-grade schemas, AI, and editor UX** from scratch.

**We do not copy** cms-kit or personal-website wholesale. We **extract patterns** and **redesign** for Softree.

---

## Repository layout (recommended)

```
Softree_/
├── apps/
│   └── cms/                          # NEW — ported from sanity-template-nextjs-clean patterns
│       ├── studio/                   # Studio source (or merged into src/cms/studio)
│       └── lib/                      # Shared: queries, client, live, typegen
├── src/
│   ├── app/
│   │   ├── studio/[[...tool]]/       # Embedded Studio (keep URL)
│   │   └── api/
│   │       ├── draft-mode/
│   │       └── cms/                  # AI, publish, revalidate
│   ├── cms/                          # NEW — replaces src/sanity/
│   │   ├── schema/
│   │   ├── studio/
│   │   ├── lib/
│   │   └── ai/
│   └── components/                   # Frontend renderers (unchanged ownership)
├── sanity.schema.json                # Shared typegen source
└── .planning/cms-rebuild/            # This planning system
```

**ADR-001 decision:** Embedded Studio in main Next app (production reality), not separate `:3333` deploy — but **organize code** like the clean template's `sanity/lib` separation.

---

## System diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        EDITORS                                   │
│  Studio UI │ Presentation │ Command Palette │ AI Sidebar         │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    SANITY CONTENT LAKE                           │
│  Documents │ Drafts │ Assets │ History                          │
│  Dataset: production (same — migration in place)                 │
└────────────────────────────┬────────────────────────────────────┘
                             │ GROQ + Live API
┌────────────────────────────▼────────────────────────────────────┐
│                   NEXT.JS APP (App Router)                         │
│  defineLive │ sanityFetch │ Cache Components │ VisualEditing      │
│  Routes: /, /blog, /case-studies, /p, /careers                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                   AI SERVICES LAYER                              │
│  Assist │ Field API │ Content Agent │ MCP Server │ Gemini       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Layer responsibilities

### 1. Content layer (`src/cms/schema/`)

- Zod-backed validation at API boundaries
- Sanity `defineType` / `defineField` only in schema folder
- No React in schema files (except custom input wrappers in `studio/inputs/`)

### 2. Studio layer (`src/cms/studio/`)

| Module | Responsibility |
|--------|----------------|
| `structure/` | Desk IA, singletons, filtered lists |
| `plugins/` | Presentation, dashboard, command palette |
| `actions/` | Publish, duplicate, SEO generate |
| `inputs/` | Section picker, SEO preview, AI panels |
| `theme/` | Softree editorial theme (minimal, fast) |

### 3. Data layer (`src/cms/lib/`)

| File | Pattern source |
|------|----------------|
| `client.ts` | clean template |
| `live.ts` | `defineLive` + `SanityLive` |
| `fetch.ts` | 3-layer cache (personal-website) for hot paths |
| `queries/` | Co-located fragments (cms-kit) |
| `writeClient.ts` | Server mutations |
| `typegen/` | Shared pipeline |

### 4. Frontend layer (`src/app/`, `src/components/`)

- **Block registry** maps `_type` → React component
- **Layout registry** maps `layoutKey` → premium case study layouts
- **No GROQ in components** — only in `src/cms/lib/queries/`

### 5. AI layer (`src/cms/ai/`)

See `AI-ARCHITECTURE.md`.

---

## Key technical choices

| Concern | Choice | Rationale |
|---------|--------|-----------|
| Framework | Next.js 16 App Router | Already in production |
| CMS | Sanity v5/v6 | Existing dataset, team knowledge |
| Live updates | `defineLive` | Official pattern, replaces custom wrappers |
| Preview | Presentation Tool | Native, not Tinloof |
| Styling | Tailwind + `@sanity/ui` + shadcn for Studio chrome | Consistency |
| Types | Sanity TypeGen + `defineQuery` | End-to-end safety |
| Validation | Zod at API routes | Server-side guard |
| AI | Assist + custom field actions + MCP | Layered, not monolithic |

---

## Migration strategy (no big-bang delete)

### Phase A — Parallel build
- New code in `src/cms/` alongside `src/sanity/`
- Studio route: `/studio-v2` for internal testing
- Read same dataset with new schema aliases where possible

### Phase B — Content migration
- Scripts map old documents → new shape
- Validate FAQ counts, slugs, status visibility
- Staging dataset dry-run

### Phase C — Cutover
- Switch `/studio` to new config
- Switch frontend queries to `src/cms/lib/queries`
- Archive `src/sanity/` → `_archive/sanity-legacy/`
- Delete only after 2-week production bake

---

## Security architecture

| Asset | Rule |
|-------|------|
| `SANITY_API_READ_TOKEN` | Server only; draft mode sessions |
| `SANITY_API_WRITE_TOKEN` | Server only; publish + migration APIs |
| Studio API routes | `isStudioApiRequest()` guard |
| MCP | Authenticated; same permissions as Studio role |
| Draft mode | `defineEnableDraftMode` — no public enable |

---

## Performance architecture

1. **Default:** `defineLive` for editorial freshness
2. **Hot paths:** Cache Components 3-layer (home, settings, nav)
3. **Static params:** `perspective: 'published'`, `stega: false`
4. **Metadata:** always `stega: false`
5. **Images:** `sanity-image` + Next/Image + LQIP
6. **Studio bundle:** lazy-load heavy plugins (Gemini, React Bits)

---

## Observability

- Publish events → Slack (keep blueprint pattern)
- AI actions → structured log (no PII in logs)
- Revalidate webhook → path-level with secret
- Studio errors → toast + optional Sentry

---

## What we explicitly do NOT build in v1

- Multi-tenant client sites
- Full localization
- Scheduled publish enforcement
- Custom media CDN
- Storyblok parity

These are **Phase 2+** in `CHECKLIST.md`.
