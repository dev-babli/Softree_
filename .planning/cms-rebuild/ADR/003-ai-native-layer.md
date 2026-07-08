# ADR-003: AI-Native Layer

**Status:** Proposed  
**Date:** 2026-07-07  
**Agent:** 6 (AI Engineer)

## Context

Softree already has three AI surfaces (Assist, Content Agent, Gemini Images) built ad hoc. User wants AI "everywhere" — autocomplete, SEO, FAQs, chat, MCP.

Industry trend (2025–2026): agentic CMS with MCP tools, field-level AI, brand voice context, human-in-the-loop publish.

## Decision

**Three-layer AI architecture** (see `AI-ARCHITECTURE.md`):

1. **Context** — `aiContext` singleton
2. **Field AI** — Assist + custom actions on every editorial field
3. **Agentic** — Content Agent v2 + MCP server

**Rules:**
- AI writes drafts only; never bypasses publish validation
- All AI routes under `/api/cms/ai/*` with Studio auth
- Brand context injected on every completion call
- MCP exposes same operations as Studio (no superuser write token in IDE)

## Rationale

- Preserves working investment (Assist, pipeline, Gemini)
- Unified API surface for maintenance
- MCP enables Cursor/Claude workflows user already uses
- Layered approach ships P0 fast (field AI) without blocking on agentic

## P0 AI features (Sprint 4)

- Field autocomplete (excerpt, meta, FAQ, alt)
- SEO package generation
- Content audit (meta, FAQ, alt gaps)
- Full draft generation (post, case study)

## P1+

- Command palette AI commands
- MCP tools
- Content scoring sidebar
- Chat with CMS

## Consequences

- API cost monitoring required
- Must keep `aiContext` populated for quality
- MCP security review before external exposure
