# Softree CMS Rebuild — Roadmap

**Horizon:** 10 phases · Quality over speed  
**Foundation:** `sanity-template-nextjs-clean` patterns in embedded Next app

---

## Phase 0 — Planning (current) ✅

**Deliverables:** `CHECKLIST.md`, `RESEARCH.md`, `ARCHITECTURE.md`, `CONTENT-MODEL.md`, `AI-ARCHITECTURE.md`, ADRs

**Gate:** Stakeholder review of content model + migration scope

---

## Phase 1 — Scaffold (Sprint 0)

**Goal:** Empty `src/cms/` with clean-template data layer, no schema yet

| Task | Agent |
|------|-------|
| Create `src/cms/lib/{client,live,fetch,token,api}.ts` from clean template | 3 |
| Wire `defineLive` in root layout | 3 |
| Draft mode routes (enable + disable) | 3 |
| Typegen pipeline in `sanity.cli.ts` | 4 |
| `/studio-v2` route pointing at new config stub | 4 |

**Gate:** `npm run build` passes; `/studio-v2` loads empty Studio

---

## Phase 2 — Core schemas (Sprint 1)

**Goal:** New content model v0.1 in code

| Task | Agent |
|------|-------|
| Implement singletons: siteSettings, navigation, aiContext | 2 |
| Implement caseStudy + section objects | 2 |
| Implement post + author + category | 2 |
| Implement marketingPage | 2 |
| serviceLine document type | 2 |
| Publish validation rules | 2 |

**Gate:** Typegen passes; Vision can query new types

---

## Phase 3 — Studio shell (Sprint 2)

**Goal:** Premium editor UX skeleton

| Task | Agent |
|------|-------|
| Structure tree (dashboard, content, settings) | 4, 5 |
| Softree theme (minimal, fast) | 5 |
| Section picker with catalog | 5 |
| Publish action (unified visibility) | 4 |
| SEO preview panel | 9 |
| FAQ / readiness checklist | 9 |

**Gate:** Editor can create case study end-to-end in `/studio-v2`

---

## Phase 4 — Frontend data layer (Sprint 3)

**Goal:** New queries; routes still on old data until migration

| Task | Agent |
|------|-------|
| Query modules with co-located fragments | 3 |
| Block renderer registry | 3 |
| Presentation resolvers for all types | 4 |
| Cache Components on homepage + settings | 7 |

**Gate:** Preview works for new documents in Presentation Tool

---

## Phase 5 — AI layer (Sprint 4)

**Goal:** AI-native editing

| Task | Agent |
|------|-------|
| Port field actions to `src/cms/ai/` | 6 |
| `/api/cms/ai/complete-field` | 6 |
| Content Agent v2 tool | 6 |
| Audit scoring sidebar | 6, 9 |
| Gemini image tool port | 6 |

**Gate:** Autocomplete + SEO generate works on new schema

---

## Phase 6 — Migration (Sprint 5)

**Goal:** Production content readable in new schema

| Task | Agent |
|------|-------|
| Field mapping scripts (old → new) | 2 |
| `visibility` migration from `status` | 2 |
| `serviceLine` backfill from string category | 2 |
| FAQ normalization | 2 |
| Staging dry-run + diff report | 1 |
| Rollback procedure doc | 8 |

**Gate:** 100% published case studies render on staging with new queries

---

## Phase 7 — Route cutover (Sprint 6)

**Goal:** Production frontend uses new queries

| Task | Agent |
|------|-------|
| Switch case study routes | 3 |
| Switch blog routes | 3 |
| Switch marketing pages | 3 |
| Revalidate webhook update | 7 |
| Premium layout registry unchanged | 3 |

**Gate:** softreetechnology.com parity check (visual + SEO)

---

## Phase 8 — Studio cutover (Sprint 7)

**Goal:** Replace old Studio

| Task | Agent |
|------|-------|
| `/studio` → new config | 4 |
| Remove `/studio-v2` | 4 |
| Archive `src/sanity/` → `_archive/` | 1 |
| Update docs + env guide | 10 |
| Train editors (5-min Loom) | 10 |

**Gate:** Editors publish without support tickets for 1 week

---

## Phase 9 — Polish loop

**Goal:** Commercial-grade feel

| Task | Agent |
|------|-------|
| Command palette | 5 |
| Keyboard shortcuts | 5 |
| Motion (subtle) | 5 |
| MCP tools | 6 |
| Performance audit | 7 |
| Security audit | 8 |
| SEO audit | 9 |

**Gate:** Checklist "Future enhancements" triaged for v2

---

## Phase 10 — Decommission legacy

**Only after Phase 8 gate passes:**

- [ ] Delete `_archive/sanity-legacy/` (or keep 90 days)
- [ ] Remove `cms-kit` submodule if unused
- [ ] Remove old API routes (`/api/studio/*` → `/api/cms/*`)
- [ ] Update CI

---

## Risk register

| Risk | Mitigation |
|------|------------|
| Content loss on migration | Staging dry-run + backup export |
| Premium layout breakage | `layoutKey` 1:1 mapping, no schema change |
| Editor retraining | Parallel `/studio-v2` for 2 weeks |
| AI API costs | Rate limits + caching |
| Build time regression | Lazy Studio plugins |

---

## Success metrics

| Metric | Target |
|--------|--------|
| Publish success rate | 99%+ (no status bugs) |
| Time to publish case study | < 15 min for trained editor |
| Lighthouse content pages | 90+ performance |
| AI field acceptance rate | Track; target 70%+ |
| Editor satisfaction | Qualitative after 2 weeks |
