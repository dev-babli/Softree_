# Softree product truth

What Softree **is** and **is not**. Content must align with this table.

## What Softree sells (services)

| Area | Softree delivers | Microsoft / stack anchors |
| --- | --- | --- |
| **Agentic AI** | Custom agents, multi-agent orchestration, RAG, governance | Copilot Studio, Azure AI, Power Automate, Entra ID |
| **Power Platform** | Power Apps, Automate, BI, governance, citizen dev enablement | Power Platform, Dataverse |
| **SharePoint / SPFx** | Modern web parts, Teams integration, M365 extensions | SPFx, React, Graph |
| **Data / Fabric** | Unified analytics, migration, dashboards | Microsoft Fabric, Power BI, Synapse |
| **Offshore delivery** | Dedicated teams, ISO 27001 discipline, fast iteration | Cross-stack implementation |

## What Softree does NOT sell (do not claim)

| Reference / competitor concept | Status | Softree mapping |
| --- | --- | --- |
| Kore.ai **Artemis** / Agent Platform | Competitor product | "Agentic AI on Microsoft stack" or "Copilot Studio agent programs" |
| **ABL™** (Agent Blueprint Language) | Kore proprietary | "Agent definitions + governance patterns" or "structured agent specs" |
| **ARCH** (AI solution architect product) | Kore proprietary | "Solution architecture + delivery team" or `CONTENT_GAP` |
| **AI Studio** (as Kore/Google product) | Not a Softree product | See ai-studio-explainer.md — services page only if approved |
| Generic "AI platform" | Too vague | Name the Microsoft surface or Softree service line |

## Approved proof points (repo-sourced)

Use only when relevant to the page topic:

| Claim | Source context | Caveat |
| --- | --- | --- |
| 100+ AI engineers | agentic-ai-content hero stats | AI-focused pages |
| 4–16 weeks to production | agentic-ai-content | Agentic AI delivery |
| ISO 27001 delivery | agentic-ai-content | Security/governance sections |
| 3000+ projects, 96% retention | blog/service pages | General credibility — don't stack all stats on one hero |
| Named testimonials | agentic-ai-content, offshore hero | Exact quotes only; no edits |

Anything else → `CONTENT_GAP: user must supply metric or case study`.

## Service lines → page routes (reference)

| Topic | Existing route / content |
| --- | --- |
| Agentic AI | `/services/offshore-ai-development`, `src/components/agentic-ai/` |
| Power Platform | blog + service pages |
| SPFx | blog + service pages |
| Fabric | blog + service pages |

When mapping a Kore-style page, pull headline/subhead patterns from `src/components/ai-premium/data/agentic-ai-content.ts` before inventing new lines.

## Naming

| Use | Avoid |
| --- | --- |
| Softree Technology, Softree | SOFTREE (body copy), Softree AI Studio (without approval) |
| Agentic AI, Microsoft stack | AI Studio (as product), Agent Platform (as Softree product) |
| Copilot Studio, Azure AI | Artemis, ABL, ARCH |
