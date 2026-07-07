# Website Modernization Revamp — Shortcut

> **For the full ATLAS system** (all Agentic AI pages, research loop, verifier, Awwwards bar): use **[atlas-revamp-super-prompt.md](./atlas-revamp-super-prompt.md)**

This file is a shortcut when you only want to revamp `/services/website-modernization`.

---

## ATLAS KNOWLEDGE (read before every run)

Load `.cursor/knowledge/` first — especially `thinking-principles.md`, then
`business-context.md`, `brand-positioning.md`, `ideal-client-profile.md`, and
`website-scoring-rubric.md`.

---

## HOW TO RUN

1. Rules: `.cursor/rules/web-revamp.mdc` + `.cursor/rules/atlas-knowledge.mdc`
2. Master prompt: `.cursor/atlas-revamp-super-prompt.md` → **APPENDIX: Website Modernization**
3. Plan mode → paste PROMPT from master file → Agent mode → run

For website-modernization-only, tell the orchestrator:

```
Run ATLAS Complete Loop on /services/website-modernization only.
Follow the appendix in .cursor/atlas-revamp-super-prompt.md and web-revamp.mdc.
Skip the full page queue; still run Phase 1 research if design-reference/ is empty.
```

---

## Legacy prompt (still valid — subset of ATLAS)

The detailed section list, subagents, and self-iteration scoring below match the
master prompt's appendix and agent pipeline. Prefer the master file for new runs.

**Target page:** `src/app/services/website-modernization/` (route `/services/website-modernization`)

**Design reference:** `src/components/kore-ai-exact/` (live route `/kore-ai-component`)

**Business goal:** Qualified leads via AI modernization blueprint funnel.

**Primary CTA:** Get your free modernisation blueprint | **Secondary:** Book a modernisation strategy call

See `.cursor/atlas-revamp-super-prompt.md` appendix for full section order, assets, and constraints.
