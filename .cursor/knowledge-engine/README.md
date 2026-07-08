# ATLAS Knowledge Engine v2

Autonomous consulting intelligence with numbered taxonomy, pipeline agents, knowledge graph, and self-improvement loop.

## Pipeline

```
Internet
   │
   ▼
Research Agent      ← backlog + queue targets
   │
   ▼
Scraper             ← ingest/raw/ → ingest/scraped/
   │
   ▼
Cleaner             ← strip HTML, normalize → ingest/cleaned/
   │
   ▼
Summarizer
   │
   ▼
Fact Checker        ← source confidence, draft vs verified
   │
   ▼
Knowledge Extractor ← structured atom candidates
   │
   ▼
Pattern Engine      ← auto-route to 31_patterns/
   │
   ▼
Knowledge Files     ← knowledge/{00-31}_*/
   │
   ▼
Knowledge Graph     ← graph/knowledge-graph.json
```

## Knowledge taxonomy (`knowledge/`)

| Folder | Domain |
|--------|--------|
| `00_constitution/` | Thinking principles, agent rules |
| `01_company/` | Softree vision, positioning, ICP |
| `02_consulting/` | Delivery methodology |
| `03_business/` | Business models, ROI |
| `04_strategy/` | Product strategy, roadmaps |
| `05_sales/` | Enterprise sales |
| `06_marketing/` | Demand gen, funnels |
| `07_copywriting/` | Messaging, conversion copy |
| `08_design/` | Visual design, systems |
| `09_ui/` | Components, interface |
| `10_ux/` | IA, flows, usability |
| `11_psychology/` | Buying psychology, trust |
| `12_seo/` | Search optimization |
| `13_geo/` | Generative engine optimization |
| `14_aeo/` | Answer engine optimization |
| `15_llmo/` | LLM optimization |
| `16_ai/` | AI strategy, governance |
| `17_rag/` | Retrieval augmented generation |
| `18_agents/` | Agentic systems, MCP |
| `19_architecture/` | System design, cloud |
| `20_performance/` | Web performance, CWV |
| `21_security/` | Security, compliance |
| `22_accessibility/` | WCAG, inclusive design |
| `23_competitors/` | Competitive intelligence |
| `24_industries/` | Vertical knowledge |
| `25_case_studies/` | Proof patterns |
| `26_frameworks/` | Proprietary frameworks |
| `27_prompt_library/` | Agent prompts |
| `28_report_templates/` | Audit report structures |
| `29_scoring/` | Rubrics |
| `30_playbooks/` | Consulting playbooks |
| `31_patterns/` | Reusable patterns |

## Commands

```bash
npm run atlas:migrate      # legacy .cursor/knowledge/ → knowledge/
npm run atlas:relocate     # move v1 engine files → numbered folders
npm run atlas:ingest       # run full pipeline
npm run atlas:improve      # gap analysis + research backlog
npm run atlas:knowledge search "agentic ai"
npm run atlas:knowledge related consulting.thinking-principles
npm run atlas:knowledge reindex
```

## Ingestion (for agents)

1. Research with browser tools → write `ingest/raw/{id}.json`:
   ```json
   { "url": "https://...", "title": "...", "content": "...", "domain": "12_seo", "tags": ["technical-seo"] }
   ```
2. Queue → `ingest/queue/{id}.json`: `{ "id", "query", "domain", "priority", "url" }`
3. Run `npm run atlas:ingest`

## Operator prompt

`.cursor/knowledge-engine-operator-prompt.md`
