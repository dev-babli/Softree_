# ATLAS: Softree_ Project — Full Repo Scan + Knowledge Refresh (July 2026)

**Repository:** `D:/Softree_Projects/SOFTREE_MAIN/Softree_`  
**Product:** Softree Technology marketing site + Sanity CMS + page-forge workstreams  
**Production:** https://softreetechnology.com  
**Knowledge lives in this repo:** `.cursor/knowledge/` + `.cursor/knowledge-engine/` (not a separate project)

**This is the master prompt for THIS workspace.** Scan **this** Softree codebase end-to-end, update **this** repo's ATLAS knowledge base from what you find here, and refresh external intelligence to **July 2026** via web search — never from model memory alone.

---

## REPOSITORY IDENTITY (do not scan a different project)

You are inside the **Softree_** Next.js monorepo. Everything below is in **this** tree:

| Layer | Path in this repo |
|-------|-------------------|
| App router (64 routes) | `src/app/**/page.tsx` |
| Flagship agentic page | `src/app/agentic-ai-platform/` → `src/components/softree-agentic-exact/` |
| Client clone (in progress) | `src/app/client/` → `src/components/client-exact/` |
| Case studies + CMS layouts | `src/components/case-studies/`, Sanity in `src/cms/` |
| Home variants | `src/app/page.tsx`, `src/app/home-2026/`, `src/app/ai-home/` |
| Services pages | `src/app/services/**` (offshore AI, generative AI, modernization, etc.) |
| Showcase / demos | `src/app/showcase/**`, `src/components/react-bits/` |
| ATLAS knowledge (agent brain) | `.cursor/knowledge/{00-21}-*/` |
| Knowledge engine pipeline | `.cursor/knowledge-engine/` |
| Agent rules & super-prompts | `.cursor/rules/`, `.cursor/*-super-prompt.md` |
| Active page-forge loops | `.planning/page-forge/softree-agentic-exact/`, `.planning/cms-rebuild/`, `.planning/studio-forge/`, `.planning/res-performance/` |
| Design reference captures | `design-reference/kore/` |
| Verify / audit scripts | `scripts/` (hero-score, handoff-loop, PSI, sanity seeds, atlas ingest) |
| Skills for agents | `.agents/skills/`, `.cursor/skills/` |

**Active due workstreams in this repo (prioritize in scan):**
1. **Agentic platform exact clone** — `/agentic-ai-platform`, K2 loader, scroll tabs, content loop
2. **Client page clone** — `/client`, HTML→React extraction in `client-exact/`
3. **CMS rebuild** — Sanity composer, premium case study layouts, studio-forge
4. **Website modernization funnel** — service pages, scoring rubrics, audit scripts
5. **Performance loop** — `.planning/res-performance/`, Lighthouse/PSI traces

---

## HOW TO RUN IN CURSOR

1. **Constitution loads automatically** via `.cursor/rules/atlas-knowledge.mdc` and `.cursor/rules/atlas-constitution.mdc`.
2. **Read first:**
   - `.cursor/knowledge/00-constitution/ThinkingFramework.md`
   - `.cursor/knowledge-engine-operator-prompt.md`
   - `.cursor/knowledge/README.md`
3. Open **Agents Window** (Cmd/Ctrl+Shift+P → "Agents Window").
4. Start in **Plan mode** — paste the **PROMPT** block at the bottom. Approve the scan scope and research queue.
5. Switch to **Agent mode**. Enable Auto-run for `npm run atlas:*`, `npm run build`, web search, and browser tools.
6. Use **Build in Parallel** to spawn specialist subagents — one role per workstream when inputs allow.
7. Do not ask clarifying questions unless blocked on credentials or ambiguous destructive actions.

**Related files:**
- Legacy knowledge (ATLAS v3): `.cursor/knowledge/{00-21}-*/`
- Knowledge engine (v2 pipeline): `.cursor/knowledge-engine/`
- Standing rules: `.cursor/rules/atlas-knowledge.mdc`, `.cursor/rules/atlas-constitution.mdc`
- Operator protocol: `.cursor/knowledge-engine-operator-prompt.md`
- Research backlog: `.cursor/knowledge-engine/meta/research-backlog.json`

---

## MISSION (scoped to Softree_ only)

| Goal | Definition of done |
|------|-------------------|
| **This repo scan** | Full inventory of **Softree_** routes, components, CMS schema, scripts, deps, planning state, and super-prompts → `repo-scan-{date}.json` in **this** repo's `.cursor/knowledge/20-memory/audits/` |
| **This repo's knowledge sync** | `.cursor/knowledge/` and `.cursor/knowledge-engine/` reflect what **this** codebase actually ships — pages, copy sources, tech stack, competitor refs in code, verify scripts |
| **July 2026 external refresh** | Domain knowledge Softree agents need (AI/agents, MCP, SEO/GEO/AEO, Kore/competitors, Next.js 15+, Sanity) updated from **2026 web sources** — URL + date + confidence on every claim |
| **Pipeline in this repo** | Run `npm run atlas:improve` → ingest → reindex from **this** workspace root; verify with `npm run atlas:knowledge search` |

**Hard rules:**
- Scan **only** `D:/Softree_Projects/SOFTREE_MAIN/Softree_` — not sibling repos, not generic templates.
- Knowledge output goes **only** into this repo's `.cursor/knowledge/` and `.cursor/knowledge-engine/`.
- Never read or commit `.env.local` values — env **names** only.
- If a fact cannot be traced to **this repo** or a July 2026 source, mark `assumption` with confidence ≤ 0.5.

---

## PHASE 0 — BOOTSTRAP (mandatory before any work)

```bash
npm run atlas:improve
npm run atlas:knowledge search "softree"
npm run atlas:patterns search "consulting"
```

Read and internalize:
- `.cursor/knowledge/01-company/Softree.md`
- `.cursor/knowledge/01-company/BrandPositioning.md`
- `.cursor/knowledge-engine/meta/research-backlog.json`
- `.cursor/knowledge-engine/meta/improvement-report.json` (if present)

Record baseline stats: total atoms, empty folders, stale items, draft count, last `analyzedAt` timestamp.

---

## PHASE 1 — FULL SCAN OF THIS SOFTREE_ REPO

Dispatch a **REPO SCANNER AGENT**. Read-only. Map **this** codebase as consulting intelligence — not a generic file dump.

### 1A — Topology (mandatory paths in Softree_)

| Area | Path in this repo | What to extract |
|------|-------------------|-----------------|
| **Production routes** | `src/app/**/page.tsx` | All 64 routes — flag production vs demo (`showcase/`, `wireframe/`, `*-demo`) |
| **Agentic flagship** | `src/components/softree-agentic-exact/` | K2 loader, scroll tabs, copy map (`softreeAgenticContent.ts`), verify scripts |
| **Client clone** | `src/components/client-exact/`, `src/app/client/` | HTML extraction, sections, runtime (`appear-runner.ts`) |
| **Legacy agentic** | `src/components/agentic-ai/` | Older implementation vs exact clone — document which is live |
| **Case studies** | `src/components/case-studies/layouts/` | Layout archetypes, Sanity composer variants |
| **CMS / Sanity** | `src/cms/`, `sanity.cli.ts`, `scripts/seed-*.ts`, `src/app/studio/` | Schema, seeds, studio registration |
| **Home variants** | `src/app/page.tsx`, `home-2026/`, `ai-home/`, `src/components/home-2026/` | Which is canonical / experimental |
| **Services** | `src/app/services/**` | Offshore AI, generative AI, modernization, test automation, etc. |
| **Marketing UI kit** | `src/components/softree-marketing-ui/` | Shared primitives, data files |
| **Motion / bits** | `src/components/react-bits/`, GSAP in agentic-exact | Motion stack in use |
| **Scripts** | `scripts/`, `package.json` scripts | `handoff-loop-verify`, `hero-visual-score`, `atlas:*`, `psi-check`, sanity seeds |
| **Planning state** | `.planning/page-forge/softree-agentic-exact/content-loop-state.json`, `.planning/cms-rebuild/`, `.planning/res-performance/` | Current loop round, blockers, verification status |
| **Super-prompts** | `.cursor/*-super-prompt.md` | All active orchestration prompts in this repo |
| **Design reference** | `design-reference/kore/` | Captured Kore/Softree reference screenshots |
| **Static assets** | `public/og/`, `public/client/`, `public/images/certifications/` | OG coverage, client clone assets |
| **Env surface** | `.env.example` if present, documented keys in scripts — **never `.env.local` values** |

### 1B — Softree_-specific signals (extract with file citations)

From **this repo only**:

- Copy source of truth: `softreeAgenticContent.ts`, `softreeAgenticHtmlCopy.ts`, `client-exact/vigorousContent.ts`
- Forbidden terms / voice rules: `.cursor/rules/softree-agentic-content-loop.mdc`, verify scripts
- Competitor references in code/copy (Kore, etc.) — grep `src/` and `.planning/`
- Scoring rubrics: `.cursor/knowledge/18-scoring/`, `scripts/hero-visual-score.mjs`, `scripts/handoff-loop-verify.mjs`
- HTML prototypes referenced by clone work: any `*.html` under repo root or `_extracted/`
- What production deploys: routes linked from `src/components/sections/header.tsx` / footer nav

### 1C — Health checks (run, read output)

```bash
npm run build
npm run lint
npm run atlas:improve
```

Note build warnings, lint debt, and any failing verify scripts — store as engineering findings, not as knowledge atoms unless they affect consulting recommendations.

### 1D — Output artifact

Write: `.cursor/knowledge/20-memory/audits/repo-scan-{YYYY-MM-DD}.json`

Schema:

```json
{
  "scannedAt": "ISO-8601",
  "repo": "D:/Softree_Projects/SOFTREE_MAIN/Softree_",
  "productionUrl": "https://softreetechnology.com",
  "routes": [{ "path": "/agentic-ai-platform", "componentRoot": "...", "status": "production|demo|draft" }],
  "techStack": { "next": "...", "react": "...", "cms": "...", "motion": "..." },
  "scripts": [{ "name": "atlas:ingest", "purpose": "..." }],
  "knowledgeGapsFromRepo": ["..."],
  "engineeringFindings": ["..."],
  "confidence": 0.95
}
```

---

## PHASE 2 — KNOWLEDGE BASE AUDIT

Dispatch a **KNOWLEDGE AUDITOR AGENT**. Compare two stores and reconcile.

### Stores

| Store | Path | Role |
|-------|------|------|
| ATLAS v3 (legacy) | `.cursor/knowledge/{00-21}-*/` | Agent-facing consulting intelligence |
| Knowledge engine v2 | `.cursor/knowledge-engine/knowledge/{00-31}_*/` | Pipeline-ingested atoms + graph |

### Audit checklist

For each pillar, answer:

1. **Coverage** — Does knowledge exist? Is the folder empty (see backlog)?
2. **Freshness** — Any file with content predating 2026 without a `lastVerified` or July 2026 source?
3. **Contradictions** — Legacy vs engine vs repo facts — list conflicts with evidence
4. **Duplicates** — Same concept in multiple files (>85% overlap → merge plan)
5. **Repo alignment** — Does `01-company/` match what the site and code actually say?

Run:

```bash
npm run atlas:knowledge search "<topic>"   # for each pillar touched
npm run atlas:knowledge reindex            # if files changed
```

### Priority gaps (from backlog — always check first)

- Draft atoms (e.g. `competitor.kore-ai`)
- Empty taxonomy folders in `research-backlog.json` (24 as of last improve run)
- Missing competitor profiles: Accenture, IBM Consulting, Thoughtworks, Moveworks
- Stale vendor research in `14-research/` (OpenAI, Google, Microsoft, AWS, Azure)

Write: `.cursor/knowledge-engine/meta/knowledge-audit-{YYYY-MM-DD}.json`

---

## PHASE 3 — JULY 2026 WEB RESEARCH

Dispatch a **RESEARCH AGENT** with **WebSearch + browser tools (Chrome DevTools MCP)**. Target date floor: **2026-01-01**. Prefer sources from **2026-07** when available.

**Never rely on training data for:** model releases, API changes, competitor positioning, SEO/GEO algorithm updates, framework versions, or pricing.

### Research domains (minimum coverage)

| Domain | Knowledge folder | Example July 2026 queries |
|--------|------------------|----------------------------|
| Enterprise AI & agents | `06-ai/`, `18_agents/` | "enterprise agentic AI 2026", "MCP protocol updates 2026" |
| LLM vendors | `14-research/` | OpenAI, Anthropic, Google Gemini, Microsoft Copilot — product pages + docs |
| RAG & retrieval | `17_rag/` | "RAG best practices 2026", "vector search enterprise 2026" |
| SEO | `09-seo/` | "Google search updates 2026", Core Web Vitals current thresholds |
| GEO / AEO | `10-geo/`, `11-aeo/` | "generative engine optimization 2026", "AI answer citation 2026" |
| Next.js / React | `05-engineering/` | Next.js release notes, React 19+ patterns used in this repo |
| Competitors | `15-competitors/`, `23_competitors/` | Kore.ai, Accenture AI, Moveworks — live homepage + platform pages |
| Softree live site vs this repo | `01-company/` | Compare `https://softreetechnology.com` to **this repo's** `src/app/` routes — note drift (screenshot 1440 + 390) |
| This repo's stack | `05-engineering/` | Next.js + webpack/turbo flags, Sanity, GSAP versions from **this** `package.json` |
| Design craft | `03-design/`, `08_design/` | Linear, Stripe, Apple product pages — motion + typography evidence |
| Security & compliance | `21_security/` | AI governance, SOC2, EU AI Act enforcement status July 2026 |

### Source tier rules (from `config.json`)

| Tier | Source type | Min confidence |
|------|-------------|----------------|
| 1 | Official vendor documentation | 0.95 |
| 2 | Standards / government | 0.90 |
| 3 | Academic / verified benchmarks | 0.85 |
| 4 | Established consulting & engineering blogs | 0.75 |
| 5 | Conference / books | 0.70 |
| 6 | Community (requires cross-ref) | 0.50 |

### Evidence protocol (every research item)

1. Visit live URL with browser tools
2. Screenshot at **1440px** and **390px** where visual evidence matters
3. Save screenshots to `.cursor/knowledge-engine/ingest/evidence/{id}/`
4. Extract publish date or "last updated" from page when visible
5. Record: URL, title, date, tier, confidence, 3–5 bullet summary

---

## PHASE 4 — INGESTION PIPELINE

Dispatch an **INGESTION AGENT**. Follow the operator protocol exactly.

### For each researched item

1. Write `.cursor/knowledge-engine/ingest/raw/{id}.json`:

```json
{
  "url": "https://...",
  "title": "...",
  "content": "Full extracted text...",
  "domain": "agents",
  "knowledgeFolder": "18_agents",
  "category": "atom",
  "tags": ["mcp", "orchestration", "2026"],
  "publishedAt": "2026-07-01",
  "sourceTier": 1
}
```

2. Write `.cursor/knowledge-engine/ingest/queue/{id}.json`:

```json
{
  "id": "research-agents-mcp-2026-07",
  "query": "MCP agent orchestration best practices July 2026",
  "domain": "agents",
  "priority": 1,
  "url": "https://..."
}
```

3. Run pipeline:

```bash
npm run atlas:ingest
npm run atlas:knowledge reindex
npm run atlas:knowledge search "{topic}"
```

### Quality gates (reject without `--force`)

- No traceable source URL
- Duplicate >85% similarity to existing atom
- Missing: summary, coreConcepts, bestPractices, references
- Confidence <0.6 without `status: draft`

### Legacy sync (when v3 files are stale)

Update corresponding files in `.cursor/knowledge/` **only when** the engine atom is verified. Add YAML frontmatter:

```yaml
---
id: unique-kebab-id
lastVerified: 2026-07-13
confidence: 0.92
sources:
  - url: https://...
    accessedAt: 2026-07-13
---
```

Do **not** create orphan markdown outside `knowledge/{00-31}_*/` or `.cursor/knowledge/{00-21}-*/`.

---

## PHASE 5 — REPO-DERIVED KNOWLEDGE EXTRACTION

Dispatch a **COMPANY INTELLIGENCE AGENT**. Turn Phase 1 scan into durable company knowledge.

Update or create in **this repo** (with path citations into Softree_):

| File in this repo | Source in Softree_ |
|-------------------|-------------------|
| `.cursor/knowledge/01-company/Softree.md` | `src/app/about-us/`, live site, positioning in agentic copy |
| `.cursor/knowledge/01-company/Services.md` | Every route under `src/app/services/**` |
| `.cursor/knowledge/01-company/CaseStudies.md` | `src/cms/`, `scripts/seed-*-case-study*.ts`, layout variants |
| `.cursor/knowledge/01-company/BrandPositioning.md` | `softreeAgenticContent.ts`, content-loop rules, verify scripts |
| `.cursor/knowledge/05-engineering/Architecture.md` | App router, Sanity studio at `/studio`, cms-kit if referenced |
| `.cursor/knowledge/05-engineering/Performance.md` | `.planning/res-performance/`, `scripts/psi-check.mjs` |
| `.cursor/knowledge/06-ai/Agents.md` | `src/components/softree-agentic-exact/` — K2 loader, MCP refs, scroll tabs |
| `.cursor/knowledge/17-frameworks/SoftreeTransformationFramework.md` | D5OO references in knowledge + service page copy |
| `.cursor/knowledge-engine/knowledge/01_company/softree-context.md` | Mirror verified facts for ingest pipeline |
| `.cursor/knowledge/20-memory/audits/` | Store all scan + refresh JSON/MD artifacts here |

Extract **patterns** (recurring repo conventions) → route to `31_patterns/` via pattern engine when applicable.

---

## PHASE 6 — SELF-IMPROVEMENT LOOP

```bash
npm run atlas:improve
```

Answer the five improvement questions (document in final report):

1. What new concepts appeared?
2. What knowledge is outdated?
3. What contradictions exist?
4. What patterns are emerging?
5. What should be researched next?

Update `research-backlog.json` items: mark completed, add new gaps, reprioritize.

Store audit memory:

`.cursor/knowledge/20-memory/audits/knowledge-refresh-{YYYY-MM-DD}.json`

---

## AGENT ROSTER

| Agent | Phase | Deliverable |
|-------|-------|-------------|
| **Repo Scanner** | 1 | `repo-scan-{date}.json` |
| **Knowledge Auditor** | 2 | `knowledge-audit-{date}.json` + gap list |
| **Research Agent** | 3 | Raw JSON + screenshots in `ingest/evidence/` |
| **Fact Checker** | 3–4 | Confidence scores, draft vs verified |
| **Ingestion Agent** | 4 | Atoms in `knowledge-engine/knowledge/` |
| **Company Intelligence** | 5 | Updated `01-company/`, engineering, AI files |
| **Pattern Engine** | 4–5 | New entries in `31_patterns/` if recurring |
| **Verifier** | 6 | Final report + search verification |

Each agent confirms which constitution rules and operator protocol steps it followed before finishing.

---

## EXIT CRITERIA

Stop only when **all** are true:

- [ ] `repo-scan-{date}.json` written with ≥90% route coverage
- [ ] `knowledge-audit-{date}.json` written; all Priority-1 backlog items addressed or explicitly deferred with reason
- [ ] ≥10 new or updated atoms ingested from **2026 sources** (minimum 3 competitor/vendor, 3 AI/agents, 2 SEO/GEO/AEO, 2 engineering)
- [ ] `npm run atlas:knowledge search "agentic"` (and 2 other spot checks) returns new content
- [ ] `npm run atlas:improve` re-run; stats show reduced empty folders or documented plan
- [ ] Final report delivered (see template below)
- [ ] No secrets committed; no `.env.local` values in any artifact

**Max research cycles:** 3 rounds. If blocked, stop with explicit gaps — do not fabricate.

---

## FINAL REPORT TEMPLATE

Write to: `.cursor/knowledge/20-memory/audits/KNOWLEDGE-REFRESH-REPORT-{YYYY-MM-DD}.md`

```markdown
# ATLAS Knowledge Refresh Report — {date}

## Executive summary
(3–5 sentences: what changed, why it matters for Softree consulting work)

## Repository scan highlights
- Routes: N production, N demo
- Tech stack: ...
- Top 3 engineering findings

## Knowledge changes
| File / Atom | Action | Source | Confidence |
|-------------|--------|--------|------------|

## July 2026 research ingested
- (bulleted list with URLs)

## Gaps remaining
- (prioritized backlog for next run)

## Contradictions resolved
- (or "none found")

## Verification
- atlas:improve stats: before → after
- search spot checks: pass/fail
- build/lint: pass/fail

## Next run recommendations
1. ...
```

---

## PROMPT (paste into Cursor Agent mode — Softree_ workspace)

```
You are the ATLAS Knowledge Refresh Orchestrator for the Softree_ project.

Workspace (ONLY this repo): D:/Softree_Projects/SOFTREE_MAIN/Softree_
Production site: https://softreetechnology.com
Knowledge base location: .cursor/knowledge/ + .cursor/knowledge-engine/ (inside this repo)

Execute the full loop in `.cursor/atlas-knowledge-refresh-super-prompt.md`.

PHASE 0 — Bootstrap (from repo root)
- npm run atlas:improve
- npm run atlas:knowledge search "softree"
- Read .cursor/knowledge/00-constitution/ThinkingFramework.md
- Read .cursor/knowledge-engine-operator-prompt.md
- Record baseline stats from research-backlog.json

PHASE 1 — Full scan of THIS Softree_ repo
- Inventory all src/app/**/page.tsx routes (64+) — tag production vs demo/showcase
- Deep-read active workstreams:
  • softree-agentic-exact + /agentic-ai-platform
  • client-exact + /client
  • case-studies layouts + Sanity/cms scripts
  • .planning/page-forge/softree-agentic-exact/ state + content-loop-state.json
  • .planning/cms-rebuild/ + .planning/res-performance/
- Map scripts/, package.json atlas:* and verify:* commands
- Read .cursor/rules/ and all .cursor/*-super-prompt.md in this repo
- Run npm run build && npm run lint — capture results
- Write .cursor/knowledge/20-memory/audits/repo-scan-{today}.json
- NEVER read or expose .env.local secret values

PHASE 2 — Audit THIS repo's knowledge base
- Compare .cursor/knowledge/ vs .cursor/knowledge-engine/ vs what Phase 1 found
- Flag drift: knowledge says X, Softree_ code/site says Y
- Process Priority-1 items from .cursor/knowledge-engine/meta/research-backlog.json
- Write .cursor/knowledge-engine/meta/knowledge-audit-{today}.json

PHASE 3 — July 2026 web research (for Softree agent work)
- WebSearch + browser tools — NOT training memory
- Minimum: AI/agents/MCP, Kore + 1 competitor, SEO/GEO/AEO 2026, Next.js/Sanity versions this repo uses, softreetechnology.com vs local routes
- Screenshot evidence → .cursor/knowledge-engine/ingest/evidence/{id}/

PHASE 4 — Ingest into THIS repo's knowledge engine
- .cursor/knowledge-engine/ingest/raw/ + ingest/queue/
- npm run atlas:ingest && npm run atlas:knowledge reindex
- Sync verified facts to .cursor/knowledge/ where stale

PHASE 5 — Softree_-derived intelligence
- Update 01-company/, 05-engineering/, 06-ai/, 17-frameworks/ from THIS codebase
- Extract patterns from softree-agentic-exact, client-exact, case-study layouts → 31_patterns/ if recurring

PHASE 6 — Close loop
- npm run atlas:improve
- Write .cursor/knowledge/20-memory/audits/KNOWLEDGE-REFRESH-REPORT-{today}.md
- Update research-backlog.json

Constitution: cite evidence (repo path or URL), never hallucinate, confidence scores, no duplicates.

Do not scan other repositories. Do not ask questions unless blocked on credentials.
Report: Softree_ routes mapped, knowledge files touched, atoms ingested, top 5 gaps, commands verified.
```

---

## APPENDIX A — Commands reference

```bash
npm run atlas:bootstrap    # rebuild scaffolds
npm run atlas:migrate      # legacy .cursor/knowledge/ → engine
npm run atlas:relocate     # move v1 engine files → numbered folders
npm run atlas:ingest       # full ingestion pipeline
npm run atlas:improve      # gap analysis + research backlog
npm run atlas:knowledge search "query"
npm run atlas:knowledge related atom.id
npm run atlas:knowledge reindex
npm run atlas:patterns search "topic"
```

---

## APPENDIX B — Dual taxonomy map

Legacy (`.cursor/knowledge/`) uses `00-21` hyphen folders. Engine (`.cursor/knowledge-engine/knowledge/`) uses `00-31` underscore folders. When ingesting, prefer engine paths; mirror critical atoms to legacy only when agents read legacy rules directly.

| Legacy folder | Engine folder | Topic |
|---------------|---------------|-------|
| `06-ai/` | `16_ai/`, `18_agents/` | AI & agents |
| `09-seo/` | `12_seo/` | SEO |
| `10-geo/` | `13_geo/` | GEO |
| `11-aeo/` | `14_aeo/` | AEO |
| `14-research/` | `16_ai/` + vendor atoms | Vendor intelligence |
| `15-competitors/` | `23_competitors/` | Competitor profiles |
| `20-memory/` | audit JSON + engine graph | Memory |

---

## APPENDIX C — Research priority queue (seed)

Process in order unless repo scan reveals higher urgency:

1. Complete draft: `competitor.kore-ai`
2. Competitors: Accenture, IBM Consulting, Thoughtworks, Moveworks
3. Empty folders (batch 5 per cycle): `18_agents`, `16_ai`, `13_geo`, `14_aeo`, `12_seo`
4. Vendor refresh: OpenAI, Anthropic, Google, Microsoft — July 2026 product pages
5. **This repo:** Softree agentic platform from `src/components/softree-agentic-exact/` + content loop state
6. **This repo:** Client clone patterns from `src/components/client-exact/`
7. **This repo:** CMS rebuild gaps from `.planning/cms-rebuild/FEATURE_GAP_ANALYSIS.md`

---

## APPENDIX D — Softree_ route classification (seed for scanner)

Use nav + sitemap + `header.tsx` to confirm production status. Initial classification:

| Tier | Routes |
|------|--------|
| **Production** | `/`, `/about-us`, `/contact`, `/book-meeting`, `/careers`, `/services`, `/services/*`, `/case-studies`, `/case-studies/[slug]`, `/blog`, `/blog/[slug]`, `/agentic-ai-platform`, `/ai`, `/engineering-solutions`, `/privacy-policy`, `/terms`, `/studio` |
| **Active build** | `/client`, `/home-2026`, `/ai-home`, `/services/website-modernization` |
| **Demo / internal** | `/showcase/**`, `/wireframe`, `/webanalyser`, `/story-reel-demo`, `/homepage-light-demo`, `/case-studies/preview`, `/case-studies/layout-showcase`, `/sentry-example-page`, `/record-slides` |

Re-verify against `src/components/sections/header.tsx` and any middleware — this table is a seed, not gospel.

---

*Softree_ project (`SOFTREE_MAIN/Softree_`) — refresh cadence: monthly or before page-forge / CMS / audit work.*
