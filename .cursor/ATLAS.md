# ATLAS v3 — Softree Consulting Intelligence

```
ATLAS
├── Constitution           → knowledge/00-constitution/
├── Company Intelligence   → knowledge/01-company/
├── Consulting Knowledge   → knowledge/02-consulting/
├── Design + UI/UX         → knowledge/03-design/ 04-ui-ux/
├── Engineering            → knowledge/05-engineering/
├── AI Knowledge           → knowledge/06-ai/
├── Marketing + Brand      → knowledge/07-marketing/ 12-brand/ 13-copywriting/
├── Sales                  → knowledge/08-sales/
├── SEO / GEO / AEO        → knowledge/09-seo/ 10-geo/ 11-aeo/
├── Research               → knowledge/14-research/
├── Competitors            → knowledge/15-competitors/
├── Frameworks             → knowledge/17-frameworks/
├── Scoring                → knowledge/18-scoring/
├── Reporting              → knowledge/19-reporting/
├── Memory                 → knowledge/20-memory/
├── Roadmaps               → knowledge/21-roadmaps/
├── Pattern Engine         → knowledge-engine/patterns/  ← moat
├── Prompt Library         → prompts/
└── Rules                  → rules/atlas-constitution.mdc
```

## Quick start

```bash
npm run atlas:bootstrap          # 180+ knowledge files
npm run atlas:knowledge search "enterprise AI"
npm run atlas:patterns list      # evidence-backed patterns
npm run atlas:improve            # research backlog
```

## Pipeline

```
Internet → Research Agent → Scraper → Cleaner → Summarizer → Fact Checker
→ Knowledge Extractor → Pattern Engine → Knowledge Files → Memory → Graph
```

## Operator prompts

| Task | File |
|------|------|
| Knowledge ingestion | `.cursor/knowledge-engine-operator-prompt.md` |
| Page revamp | `.cursor/atlas-revamp-super-prompt.md` |

## Pattern Engine

Learns from every audit in `20-memory/audits/`. At 3+ occurrences → new pattern with confidence score.

Example: *"Enterprise AI companies position outcomes, not agents"* — High confidence.

## Page revamp queue

See `.cursor/atlas-loop-state.json` and `atlas-revamp-super-prompt.md`.
