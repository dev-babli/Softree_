# CMS AI Layer — Architecture (Sprint 4 target)

**Principle:** AI is not a page. It is ambient in every field, list, and action.

## Layers

1. **Context** — `aiContext` singleton (brand voice, banned phrases, tone)
2. **Field** — Sanity Assist + custom `fieldActions` on every editorial field
3. **Document** — Actions menu (SEO, blocks, go-live)
4. **Tool** — Content Agent, Gemini image, React Bits
5. **API** — `/api/cms/ai/complete-field`, `/api/cms/ai/generate-*`
6. **MCP** — Editor-facing tools (search, audit, suggest links)

## Field-level (implement everywhere)

- Autocomplete from title/heading
- Continue writing
- Rewrite (tone: professional, concise, technical)
- SEO: meta title, description, keywords, FAQ
- Alt text for images
- Slug suggestion
- Internal link suggestions

## Routes (migrate from `/api/studio/*`)

| Current | Target |
|---------|--------|
| `/api/studio/ai-complete-field` | `/api/cms/ai/complete-field` |
| `/api/studio/generate-image` | `/api/cms/ai/generate-image` |
| `/api/studio/content-pipeline/*` | `/api/cms/ai/pipeline/*` |

## Guardrails

- AI writes drafts only
- Never bypass `guardedPublishAction`
- Log prompts + outputs for audit (no PII in logs)
- Rate limit per editor session
