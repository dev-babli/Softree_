# Copy Map — softree-agentic-exact (Round 1 complete)

**Source of truth:** `softreeAgenticContent.ts`  
**HTML patches:** `softreeAgenticHtmlCopy.ts` (imports content file)

## Loader (`SoftreeAgenticLoader`)

| Field | Softree copy |
| --- | --- |
| meet | Meet |
| brand | Softree |
| ariaLabel | Loading Softree Agentic AI |

## Hero (`SoftreeAgenticHeroSection`)

| Field | Softree copy |
| --- | --- |
| eyebrow | Softree Technology · Agentic AI |
| headline | Autonomous agents built for |
| headlineAccent | enterprise certainty. |
| subheadItalic | Design, deploy, and govern AI on the Microsoft stack. |
| body | Built for enterprise delivery from the ground up — Softree combines offshore velocity with Copilot Studio, Azure AI, and Power Platform expertise. |
| cta | Let's talk → `/contact` |
| riveTabs | { Build } / { Scale } / { Optimize } |

## Outcomes (`SoftreeAgenticOutcomesSection`)

| Card | Metric | Label |
| --- | --- | --- |
| Outcomes in weeks | 4× | faster time to production |
| Predictability at scale | 0 | surprises in production |
| Security + governance | 100% | audited agent sessions |

## Agents (`SoftreeAgenticAgentsSection`)

| Tab | Hook | Body focus |
| --- | --- | --- |
| technical leader | No more {pilot stall} in production | trace events, evals, DLP, observability |
| business leader | AI agents that move metrics | regulated workflows, offshore speed |

## Programmable (HTML patch)

| Field | Softree copy |
| --- | --- |
| brand | { Softree } |
| headlineDesigned | designed for what actually ships |
| headlineAdvantage | Agentic AI on Microsoft is the new enterprise advantage |
| closing | Built for the agentic era. Shaped by offshore delivery on Copilot Studio, Azure AI, and Power Platform. |

## Pillars (HTML patch)

| Pillar | Title | Body |
| --- | --- | --- |
| 1 | Agent definitions + governance patterns | Structured specs for behavior, tools, guardrails, handoffs |
| 2 | Delivery architecture | Softree architects → Copilot Studio, Power Automate, Azure |

## Build-Scale-Optimize (HTML patch)

| Tab | Focus |
| --- | --- |
| Build | Copilot Studio delivery, architects, specs |
| Scale | Operate at scale, signals |
| Optimize | Model curve, eval suites, continuous improvement loop |

## Demo video (HTML patch)

| Field | Copy |
| --- | --- |
| headline | Start your next agentic AI program on Microsoft |

## Scroll tabs (9)

All titles/bodies in `scrollTabsContent.tabs[]` — Copilot patterns, orchestration, guardrails, validation, topology, audit, portability, unified stack, optimization.

## Get started (HTML patch)

| Field | Copy |
| --- | --- |
| headline | Get started with Softree |
| subhead | Start your next agentic AI program with Softree |

## Shell (nav/footer)

| Field | Copy |
| --- | --- |
| navProduct | Agentic AI |
| footerTagline | Microsoft-stack agentic AI, delivered offshore |
| ctaDemo | Let's talk |
| ctaRfp | Book a meeting |

## Metadata (`page.tsx`)

| Field | Copy |
| --- | --- |
| title | Softree Agentic AI \| Build, govern & scale on Microsoft |
| description | Design, deploy, and govern AI agents across Copilot Studio, Azure AI, and Power Platform |

## Voice audit (Round 1)

- Forbidden-term scan: **PASS** (`npx tsx scripts/verify-softree-copy.mjs`)
- Swap test: headlines read as Softree, not Kore
- CONTENT_GAP: outcome metrics (4×, 0, 100%) are positioning claims — verify with marketing before case-study citation
