# CMS Rebuild — Research Synthesis

**Date:** 2026-07-07  
**Sources:** 3 template repos, existing Softree CMS, web research

---

## 1. Foundation: `sanity-template-nextjs-clean`

**What it is:** Official Sanity Turbo monorepo — `studio/` + `frontend/` workspaces.

| Strength | Detail |
|----------|--------|
| Live Content API | `defineLive` + `SanityLive` — canonical 2025+ pattern |
| Visual editing | Presentation Tool + `defineEnableDraftMode` |
| Type safety | Shared `sanity.schema.json` → typegen both workspaces |
| Page builder | Array of objects, `useOptimistic` drag-and-drop |
| Queries | `defineQuery` + conditional GROQ projections |
| Polymorphic links | `link` object (href / page ref / post ref) |

| Gap for Softree | Detail |
|-----------------|--------|
| Schema scope | 4 types only (page, post, person, settings) |
| Studio UX | Default chrome — no agency workflow |
| Deployment | Separate ports (3000 + 3333) vs embedded `/studio` |
| AI | Assist only — no content pipeline |

**Verdict:** Use as **technical spine**, not as literal repo structure. Port `live.ts`, draft-mode, queries patterns, presentation resolvers.

---

## 2. Inspiration: `template-nextjs-personal-website`

**What it is:** Next.js 16 monolith with embedded Studio + Cache Components.

| Adopt | Detail |
|-------|--------|
| Singleton plugin | Hide singletons from Create, pin in structure |
| Reference-based nav | `settings.menuItems[]` → documents |
| 3-layer fetch | Page → Dynamic (Suspense) → Cached (`'use cache'`) |
| Shared layout cache | One `fetchSettings()` for navbar + footer |
| Optimistic reorder | Draft-mode-only sort for featured items |
| Custom PT blocks | Timeline as embedded portable-text type |

| Skip | Detail |
|------|--------|
| Portfolio-only schema | No blog, no agency types |
| intro-template | Dev onboarding chrome |

**Verdict:** Best reference for **embedded Studio + performance** in a single Next deploy.

---

## 3. Inspiration: `cms-kit`

**What it is:** Focus Reactive Turbo monorepo — Sanity + Storyblok with shared `@shared/ui`.

| Adopt | Detail |
|-------|--------|
| Section catalog + presets | Visual picker with screenshots (Softree already has `sectionLibrary.ts`) |
| `sectionCommonFields` | Theme, padding, background tokens on every block |
| Co-located GROQ | Per-section `query.ts` fragments |
| Section renderer registry | `_type` → React controller map |
| Turbo codegen | `pnpm gen` scaffolds schema + UI + registry |

| Avoid | Detail |
|-------|--------|
| `section.hero` as document in array | Schema inconsistency |
| Tinloof `pages()` plugin | Use native Presentation Tool |
| Default structure (no filtering) | Agency needs curated desk |
| Hardcoded asset refs in presets | Breaks on new datasets |
| Dual CMS (Storyblok parity) | Maintenance cost |

**Verdict:** Extract **editor UX patterns** (section picker, common fields), not the Tinloof stack.

---

## 4. Existing Softree CMS (to be replaced)

**Scale:** 119 files in `src/sanity/`, 8 document types, ~30 block types, 3 AI surfaces.

### Must preserve functionally

| Domain | Current implementation |
|--------|------------------------|
| Case studies | Composer sections + 18 premium layouts + legacy fields |
| Blog | Composer or classic mode |
| Marketing pages | 5 block types at `/p/:slug` |
| Careers | Singleton `/careers` |
| Global settings | Design tokens → CSS vars site-wide |
| Homepage slider | Singleton + featured sync blueprint |
| SEO/AEO | Meta fields, FAQ (≥2), JSON-LD |
| Editorial | Review status, publish readiness, guarded publish |
| AI | Assist, Content Agent, Gemini images |
| Preview | Presentation + draft mode + live preview pane |
| Ops | Revalidate webhook, Slack notify, PPT upload function |

### Technical debt to eliminate

| Problem | New CMS approach |
|---------|------------------|
| Dual status field vs Sanity draft | Single visibility model (ADR-002) |
| Legacy + composer dual model | One canonical composer; migration script for old |
| 18 layouts in React only | `layoutKey` enum + frontend registry (unchanged) |
| UI-only fields breaking publish | String shells or computed panels, never persisted objects |
| Category inconsistency | Unified taxonomy documents |
| Comments/split-pane crashes | Simpler preview UX, upgrade Sanity when stable |

---

## 5. Web research — modern CMS landscape

### Sanity (primary stack)

- **defineLive** default for Next.js — handles cache + live updates
- **Presentation Tool** — click-to-edit via stega; `stega: false` on SEO fields
- **Page builder** — inline objects default; references for reusable FAQ/testimonial banks
- **Structured content** — separate presentation from content model

### AI-native CMS trends (2025–2026)

| Pattern | Application for Softree |
|---------|-------------------------|
| MCP tool surface | Expose CMS operations to Cursor/Claude (draft, publish, query) |
| Field-level AI | Autocomplete, rewrite, SEO, alt text — via Assist + custom actions |
| Agentic drafts | AI creates drafts; humans approve — Content Agent v2 |
| Brand voice context | `aiContext` singleton — already exists, make first-class |
| Same validation for AI + humans | No separate "agent track" |
| Content scoring | SEO + readability + brand voice in sidebar |

### Agency content modeling

| Entity | Modeling recommendation |
|--------|----------------------|
| Case study | Dedicated document; metric fields separate from body; service ref |
| Blog | Post + author + category documents |
| Landing page | Page builder array OR marketing page type |
| FAQ | Reusable FAQ bank (reference) + per-page overrides |
| Services | Document type with case study refs |
| Settings | Singletons (site, nav, footer, AI context) |
| Schema.org | Field mapping in CMS → JSON-LD builder on frontend |

### Platforms compared (feature gaps to close)

| Platform | Learn from |
|----------|------------|
| Storyblok | Component/blok model, visual editor |
| Contentful | Entry references, roles |
| Hygraph | Structured content hub, GraphQL |
| Payload | TypeScript-first schemas, admin UI |
| Builder.io | Visual drag-drop (we use Sanity arrays + Presentation) |
| Webflow CMS | Collection references, schema-bound fields |
| Directus | Open data model, roles |
| Framer | Premium editor feel (target UX) |

---

## 6. Competitive target

**Not** "another Sanity Studio skin."

**Target:** Agency-grade CMS that feels like **Linear × Notion × Framer** with **AI at every field** and **zero publish surprises**.

### Differentiators

1. AI-native from day one (not bolted on)
2. AEO/SEO scoring built into editor
3. Case study composer with visual section catalog
4. One-click publish with clear website visibility
5. Command palette for power editors
6. MCP for developer/agent workflows

---

## 7. Research loop — iteration 1 findings

| Weakness found | Improvement |
|----------------|-------------|
| Clean template has no agency types | Design full content model before code |
| Softree publish bugs | Server-side publish API + unified visibility |
| cms-kit inconsistent schemas | Strict object-only page builder blocks |
| No command palette | Add `cmd+k` Studio plugin |
| AI scattered across 3 UIs | Unified AI sidebar + field actions |
| Premium layouts not in CMS | Accept — document `layoutKey`, don't force into page builder |

**Next loop:** Compare Payload CMS localization + roles; Sanity official MCP; Framer CMS editor patterns.
