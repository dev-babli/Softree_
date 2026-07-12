---
id: ai.agents
title: Agents
category: atom
domain: ai
knowledgeFolder: 06-ai
fileName: Agents.md
tags:
  - ai
  - agents
  - mcp
  - agentic-platform
summary: Enterprise agentic AI implementation in Softree_ — /agentic-ai-platform, MCP 2026 spec, Kore benchmark lineage.
confidence: 0.91
version: 1.1.0
lastVerified: 2026-07-13
lastUpdated: 2026-07-13
sources:
  - type: internal
    ref: src/components/softree-agentic-exact/softreeAgenticContent.ts
    confidence: 0.95
    retrievedAt: 2026-07-13
  - type: url
    ref: https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/
    confidence: 0.95
    retrievedAt: 2026-07-13
  - type: url
    ref: https://www.kore.ai/news/kore-ai-launches-artemis-the-new-generation-of-the-kore-ai-agent-platform-for-building-governing-and-optimizing-enterprise-ai
    confidence: 0.9
    retrievedAt: 2026-07-13
related:
  - competitors.kore.a.i
status: verified
---

## Summary

Softree ships a flagship agentic platform page at `/agentic-ai-platform` with K2 cinematic loader, scroll-tab depth section, and Microsoft-stack positioning. Design lineage traces to Kore.ai benchmark (now Artemis, May 2026).

## Softree Implementation (`softree-agentic-exact/`)

**Canonical copy:** `softreeAgenticContent.ts` (content agents edit only this file)

**Story hierarchy (scroll order):**
1. Loader + Hero — production-grade agents on Microsoft stack
2. Outcomes — speed, predictability, governance metrics
3. Agents — technical vs business leader personas
4. Programmable — Microsoft-stack advantage
5. Pillars — definitions + delivery architecture
6. Build-Scale-Optimize — ship, run, improve
7. Demo video
8. Scroll tabs — nine capability proofs
9. Get started CTA

**Motion/runtime:** `k2LoaderRuntime.ts`, `k2CinematicHandoff.ts`, `k2Scramble.ts`, `k2ScrollReveal.ts`

**Content loop:** Complete (scores ≥8, forbidden terms 10/10) — `.planning/page-forge/softree-agentic-exact/content-loop-state.json`

**Go-live gap:** Route not yet in `navigation.tsx` or `sitemap.ts`

## MCP Protocol (July 2026)

MCP `2026-07-28` RC (final July 28, 2026):
- **Stateless core** — no initialize handshake; scales on commodity HTTP
- **OAuth 2.1** authorization for enterprise MCP servers
- **Extensions:** Tasks (long-running), MCP Apps (sandboxed UIs)
- **MRTR** — mid-call user input without persistent streams
- **Deprecation policy** — 12-month minimum before feature removal

Relevant for Softree consulting on enterprise agent tool connectivity and governance.

## Competitor Benchmark — Kore.ai Artemis (May 2026)

- AI-native agent platform: ABL (Agent Blueprint Language), Arch designer, Dual-Brain architecture
- Governance-first for regulated industries
- Model/cloud agnostic vs hyperscaler lock-in
- Softree page-forge uses Kore layout/motion as design reference (`design-reference/kore/`, `softreeAgenticHtmlCopy.ts`)

## Accenture Counter-Position

AI Refinery + Trusted Agent Huddle uses MCP and Agent2Agent for multi-vendor orchestration — hyperscaler-scale alternative to mid-market specialist positioning.

## References

- `src/components/softree-agentic-exact/`
- `.cursor/rules/softree-agentic-content-loop.mdc`
