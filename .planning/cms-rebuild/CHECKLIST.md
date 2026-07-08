# Softree CMS Rebuild — Living Checklist

**Mission:** Rebuild Softree CMS from scratch on `sanity-template-nextjs-clean` foundation.  
**Status:** Phase 0 complete · Sprint 0 in progress · Phase 10 not started  
**Last updated:** 2026-07-07

**Locked decisions:** Same dataset · Premium layout loop · No `/studio-v2` (see `DECISIONS.md`)

---

## Agent assignments

| Agent | Owner domain | Status |
|-------|--------------|--------|
| Agent 1 — System Architect | `ARCHITECTURE.md`, ADRs, repo layout | 🟡 In progress |
| Agent 2 — CMS Engineer | `CONTENT-MODEL.md`, schemas, migrations | 🟡 In progress |
| Agent 3 — Next.js Architect | App Router, caching, routes | ⬜ Pending |
| Agent 4 — Sanity Expert | Studio config, structure, plugins | ⬜ Pending |
| Agent 5 — UX Designer | Editor IA, keyboard shortcuts, polish | ⬜ Pending |
| Agent 6 — AI Engineer | `AI-ARCHITECTURE.md`, Assist, MCP | ⬜ Pending |
| Agent 7 — Performance Engineer | Cache Components, ISR, bundle | ⬜ Pending |
| Agent 8 — Security Engineer | Tokens, RBAC, draft protection | ⬜ Pending |
| Agent 9 — SEO Expert | Metadata, JSON-LD, sitemap | ⬜ Pending |
| Agent 10 — Agency Workflow | Templates, client sites, roles | ⬜ Pending |

---

## Phase 1 — Read every project ✅

- [x] Analyze `sanity-template-nextjs-clean` (foundation)
- [x] Analyze `template-nextjs-personal-website` (embedded Studio + Cache Components)
- [x] Analyze `cms-kit` (section catalog, UI/controller split)
- [x] Inventory existing Softree CMS (`src/sanity/`, 119 files)
- [x] Map frontend dependencies (~95 files import Sanity)

## Phase 2 — Document findings ✅

- [x] `RESEARCH.md` — cross-project synthesis
- [x] Existing CMS inventory (document types, AI, publish workflow)
- [x] Technical debt register

## Phase 3 — Research online ✅

- [x] Sanity best practices (defineLive, Presentation, page builder)
- [x] AI-native CMS patterns (MCP, agentic workflows, field-level AI)
- [x] Agency content modeling (case studies, SEO, entity graph)
- [ ] Deep-dive: Payload CMS content modeling
- [ ] Deep-dive: Storyblok component model
- [ ] Deep-dive: Sanity MCP server (official)

## Phase 4 — Compare architectures 🟡

- [x] Clean template vs Softree embedded vs cms-kit monorepo
- [x] ADR-001: Foundation strategy
- [ ] ADR-004: Page builder vs portable-text-first
- [ ] ADR-005: Category model (document vs enum)

## Phase 5 — Improvement roadmap 🟡

- [x] `ROADMAP.md` — 10 phases with gates
- [ ] Stakeholder sign-off on scope (premium layouts parity?)
- [ ] Data migration strategy doc

## Phase 6 — Content model design 🟡

- [x] `CONTENT-MODEL.md` v0.1
- [ ] Schema PR review (Agent 2 + Agent 9)
- [ ] Migration field mapping (old → new)

## Phase 7 — Studio UX design ⬜

- [ ] Editor IA wireframe (Notion/Linear-inspired)
- [ ] Structure tree spec
- [ ] Command palette spec
- [ ] Keyboard shortcut map
- [ ] Onboarding flow for new editors

## Phase 8 — AI architecture 🟡

- [x] `AI-ARCHITECTURE.md` v0.1
- [ ] MCP tool surface design
- [ ] Field action catalog (autocomplete matrix)
- [ ] Content Agent v2 spec

## Premium layout loop 🟡

- [x] Loop spec + rubric (`PREMIUM-LAYOUT-LOOP.md`)
- [x] Iteration 1: fix `manufacturing-power-platform` renderer mapping
- [ ] Iteration 1: audit `page-composer` on 3 live case studies
- [ ] Score all 19 layouts ≥9/10

## Phase 9 — Implementation checklist 🟡

- [x] Sprint 0: scaffold `src/cms/` data layer + `cms.config.ts` stub
- [ ] Sprint 1: core schemas + typegen
- [ ] Sprint 2: Studio shell + structure
- [ ] Sprint 3: frontend data layer port
- [ ] Sprint 4: case study + blog routes
- [ ] Sprint 5: AI layer
- [ ] Sprint 6: migration scripts
- [ ] Sprint 7: cutover plan

## Phase 10 — Implementation ⬜ (NOT STARTED)

> **Do not delete `src/sanity/` until Sprint 6 migration is verified on staging.**

- [ ] Create `apps/cms/` workspace from clean template
- [ ] Wire into Softree monorepo (or parallel deploy)
- [ ] Port production dataset compatibility layer
- [ ] Staging deploy test before `/studio` cutover
- [ ] Migrate content (scripts + validation)
- [ ] Switch frontend queries to new package
- [ ] Deprecate old `src/sanity/` (delete only after cutover)
- [ ] Remove `cms-kit` submodule if redundant

---

## Blockers

| ID | Blocker | Owner | Resolution |
|----|---------|-------|------------|
| B1 | 18 premium case study layouts are React code, not CMS blocks | Agent 2 | ADR: keep layout registry in frontend, CMS stores `layoutKey` only |
| B2 | Dual `status` vs Sanity draft semantics caused publish bugs | Agent 4 | ADR-002: unify on Sanity publish + optional `visibility` field |
| B3 | `SANITY_API_WRITE_TOKEN` required for server publish | Agent 8 | Document in env setup; fail with clear toast |
| B4 | Production content must not break during rebuild | Agent 1 | Staging branch + migration dry-run before cutover |

---

## Future enhancements (post-MVP)

- [ ] Scheduled publishing (enforce `publishedAt` on frontend)
- [ ] Localization (document-level locales)
- [ ] Multi-site / multi-tenant (agency clients)
- [ ] Content calendar + publish suggestions
- [ ] Natural language CMS search
- [ ] AI bulk editing
- [ ] Version diff UI in Studio
- [ ] Webhook marketplace (Slack, Linear, etc.)
- [ ] Section codegen CLI (from cms-kit pattern)

---

## Research findings (quick links)

- Foundation: `sanity-template-nextjs-clean` — defineLive, Presentation, typegen, page builder
- Patterns: `template-nextjs-personal-website` — Cache Components 3-layer fetch, singleton nav
- Patterns: `cms-kit` — section catalog presets, co-located GROQ fragments
- Preserve: Softree AI (Assist + Content Agent + Gemini), publish readiness, FAQ/AEO
- Avoid: cms-kit Tinloof plugin, mixed section document types, vendor asset refs in presets

---

## Architectural decisions

| ADR | Title | Status |
|-----|-------|--------|
| [ADR-001](ADR/001-foundation-strategy.md) | Foundation & repo layout | Accepted |
| [ADR-002](ADR/002-publish-and-visibility.md) | Publish & website visibility | Proposed |
| [ADR-003](ADR/003-ai-native-layer.md) | AI-native architecture | Proposed |
| ADR-004 | Page builder architecture | Draft |
| ADR-005 | Category modeling | Draft |

---

## Open questions

1. **Monorepo vs embedded Studio?** Lean: embedded in main Next app (Softree production reality) with clean-template *patterns* ported in. See ADR-001.
2. **Keep 18 premium layouts?** Yes for parity — frontend registry + `layoutKey` field; not CMS blocks.
3. **Delete cms-kit submodule?** After section catalog is native in new CMS.
4. **Separate Sanity project or same dataset?** Same dataset + gradual schema migration preferred.
5. **Studio deploy:** Embedded `/studio` vs standalone `studio.softree.com`?
