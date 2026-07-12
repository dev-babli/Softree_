# Story Hierarchy — softree-agentic-exact

**Route:** `/agentic-ai-platform`  
**Canonical copy:** `src/components/softree-agentic-exact/softreeAgenticContent.ts`

## Narrative arc

| # | Section | Job | Reader state after |
| --- | --- | --- | --- |
| 1 | Loader + Hero | Promise: production-grade agents on Microsoft stack | "This is Softree, not a generic AI vendor" |
| 2 | Outcomes | Proof: speed, predictability, governance | "They ship faster with fewer surprises" |
| 3 | Agents | Personas: technical vs business leader | "They speak my role" |
| 4 | Programmable | Why: Microsoft-stack advantage | "This fits our Copilot/Azure estate" |
| 5 | Pillars | How: definitions + delivery architecture | "They have a method, not just prompts" |
| 6 | Build-Scale-Optimize | Motion: ship → run → improve | "I see the delivery lifecycle" |
| 7 | Demo video | Show: credibility | "I want to see it" |
| 8 | Scroll tabs | Depth: nine capability proofs | "They cover orchestration, guardrails, audit" |
| 9 | Get started | Convert | "Let's talk" |

## Content placement rules

1. **Hero before proof** — No metrics above the fold except implicit credibility (Microsoft stack).
2. **Outcomes before personas** — Quantified claims land before role-specific tabs.
3. **Personas before platform depth** — Emotional hook (pilot stall / metrics) before programmable/pillars jargon.
4. **Pillars after programmable** — "Why Microsoft" then "how we define and architect."
5. **Build-scale before demo** — Process before spectacle.
6. **Scroll tabs late** — Dense capability list after narrative is established.
7. **Get started last** — Single conversion beat; CTAs elsewhere point to `/contact`.

## Forbidden in shipped copy

- Kore.ai, Artemis, ABL™, Arch™, Agent Marketplace (as product)
- Unverified client logos or stats (mark `CONTENT_GAP`)

## Verification

```bash
npx tsx scripts/verify-softree-copy.mjs
node scripts/softree-agentic-content-verify.mjs
npm run build
```
