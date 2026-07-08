# Softree CMS — AI Architecture v0.1

**Agent 6 — AI Engineer**  
**Status:** Draft

---

## Vision

AI is not a plugin tab. It is **ambient** in every field, **governed** by brand voice, and **safe** by default (drafts only until human publish).

---

## Three layers

```
┌─────────────────────────────────────────────────────────┐
│  LAYER 3 — AGENTIC (MCP + Content Agent)                │
│  Whole-document generation, audits, bulk ops            │
├─────────────────────────────────────────────────────────┤
│  LAYER 2 — FIELD AI (Assist + custom actions)           │
│  Autocomplete, rewrite, SEO, alt text per field         │
├─────────────────────────────────────────────────────────┤
│  LAYER 1 — CONTEXT (aiContext singleton)                │
│  Brand voice, tone, banned phrases, style guide         │
└─────────────────────────────────────────────────────────┘
```

---

## Layer 1 — Context

**Source:** `aiContext` singleton (preserve from current CMS)

| Field | Purpose |
|-------|---------|
| `brandVoice` | Tone guidelines |
| `styleGuide` | Writing rules |
| `bannedPhrases[]` | Compliance |
| `exampleContent` | Few-shot samples |
| `isDefault` | Active context flag |

Injected into every AI call via system prompt assembly.

---

## Layer 2 — Field AI

### Sanity Assist (built-in)

- Temperature 0.3
- Exclude noisy fields from auto-suggestions
- Instruction templates per document type

### Custom field actions (port from `assist/fieldActions.tsx`)

| Field | Actions |
|-------|---------|
| `excerpt` | Autocomplete, shorten, expand |
| `metaTitle` | Generate, SEO optimize (≤60 chars) |
| `metaDescription` | Generate, SEO optimize (≤160 chars) |
| `faq[].answer` | Generate from document context |
| `coverImage.alt` | Generate from image + title |
| `sections[].headline` | Rewrite, improve tone |
| `challengeSummary` | Autocomplete (migration) |

### API route

`POST /api/cms/ai/complete-field` — replaces `/api/studio/ai-complete-field`

- Auth: `isStudioApiRequest`
- Input: `{ documentType, fieldPath, document, action }`
- Output: `{ value, confidence?, warnings? }`

---

## Layer 3 — Agentic

### Content Agent v2 (Studio tool)

**Tabs:**

| Tab | Function |
|-----|----------|
| Generate | Topic → draft post/case study with sections + FAQ + SEO |
| Audit | Missing meta, FAQ, alt, broken refs |
| Calendar | Suggest publish dates (future) |
| Chat | "Ask about our content" — RAG over dataset |

**Pipeline:** `src/cms/ai/pipeline/` — refactor from `content-pipeline/`

### MCP Server (new)

Expose tools for Cursor/Claude:

| Tool | Action |
|------|--------|
| `query_content` | GROQ search |
| `get_document` | Fetch by id |
| `draft_patch` | Patch draft only |
| `publish_document` | With validation |
| `audit_document` | SEO/AEO score |
| `generate_outline` | Blog/case study structure |
| `describe_schema` | Full schema for agents |

**Security:** Same RBAC as Studio user token; never expose write token to client.

### Gemini Image Tool (preserve)

- Studio route `/studio/tools/images`
- Upload to Sanity assets
- Auto alt-text on upload

---

## AI feature matrix

| Feature | Layer | Priority |
|---------|-------|----------|
| Field autocomplete | 2 | P0 |
| SEO meta generation | 2 | P0 |
| FAQ generation | 2 | P0 |
| Alt text generation | 2 | P0 |
| Full case study draft | 3 | P0 |
| Content audit dashboard | 3 | P0 |
| Rewrite / tone adjust | 2 | P1 |
| Brand voice checker | 2 | P1 |
| Internal link suggestions | 3 | P1 |
| Content scoring | 2 | P1 |
| MCP tools | 3 | P1 |
| Natural language search | 3 | P2 |
| Translation | 3 | P2 |
| Bulk edit | 3 | P2 |
| Chat with CMS | 3 | P2 |
| Content calendar AI | 3 | P3 |

---

## Editor UX for AI

### AI sidebar (right rail)

- Context: current document
- Quick actions: "Fix SEO", "Add 2 FAQs", "Improve excerpt"
- Scores: SEO / AEO / readability
- History: last 5 AI actions (undo)

### Inline

- Sparkle icon on field focus → action menu
- Ghost text autocomplete (Assist)
- Accept / reject diff view for longer generations

### Command palette (`Cmd+K`)

- "Generate meta description"
- "Audit this document"
- "Create case study from brief"

---

## Safety & governance

| Rule | Implementation |
|------|----------------|
| AI never auto-publishes | All mutations → draft |
| Production publish needs review | `reviewStatus: approved` |
| Log AI edits | `aiGenerated: true` flag on fields (optional) |
| Rate limits | Per-user on API routes |
| No secrets in prompts | Strip tokens from document snapshots |

---

## Implementation order

1. Port `aiContext` + field actions to new `src/cms/ai/`
2. Unified `/api/cms/ai/*` routes
3. Content Agent v2 shell in Studio
4. Audit scoring lib (port `publishReadiness` + extend)
5. MCP server (Sanity official MCP + custom tools)
6. Command palette plugin

---

## Dependencies

- `OPENAI_API_KEY` or equivalent for field complete
- `GEMINI_API_KEY` for images
- `SANITY_API_WRITE_TOKEN` for agent publish
- `aiContext` document populated in production
