# Design trend bank (mid-2025 → June 2026)

Curated for **Softree**: B2B enterprise AI / Microsoft-stack services. Portfolio-only trends are listed under Reject.

Design Intent Extractor must pick **one** macro direction and convert it into a concrete Softree-specific visual argument. Component Mapper picks patterns that fit that direction.

---

## Macro directions (pick one)

### D1 — Editorial Enterprise Scrollytelling *(Softree default)*

| | |
| --- | --- |
| **Feel** | Kore / Awwwards B2B: cream bands, sharp type, one pinned chapter |
| **Dials** | Variance 7 · Motion 6 · Density 4 |
| **Story** | Hook → logos → **pinned mechanism** → industries → process → metrics → contact |
| **Motion** | CSS reveals + one GSAP pin/scrub |
| **Why Softree** | Matches `aipage.html` / agentic-ai work; credible, not playful |
| **Refs** | Local `Softree_/aipage.html` k2-scroll-tabs; cream `#f8f4ec` editorial sites |

### D2 — Light About-Us Agency

| | |
| --- | --- |
| **Feel** | Softree About / homepage-light: white canvas, orange accent, card proof |
| **Dials** | Variance 6 · Motion 5 · Density 4 |
| **Story** | Human hero → clients → pillars → services grid → why us → FAQ |
| **Motion** | Framer/GSAP entrances, minimal pin |
| **Why Softree** | Already in codebase (`homepage-light`, `AboutClientLogos`) |
| **Use when** | About, culture, general services |

### D3 — Stat-Led Trust

| | |
| --- | --- |
| **Feel** | Numbers and certifications lead; sparse chrome |
| **Dials** | Variance 5 · Motion 4 · Density 5 |
| **Story** | Big metric hero → proof strip → method → case snippets → CTA |
| **Motion** | Count-up, light reveals |
| **Why Softree** | Enterprise procurement cares about proof |
| **Constraint** | **Real metrics only** |

### D4 — Narrative Workflow (Process-first)

| | |
| --- | --- |
| **Feel** | Delivery story as the product |
| **Dials** | Variance 6 · Motion 7 · Density 4 |
| **Story** | Problem → engagement model → phased process (pin or sticky steps) → outcomes |
| **Motion** | Step sequence pin **or** sticky left rail (not both) |
| **Why Softree** | Offshore delivery is a differentiator |

### D5 — Split Studio / Workbench

| | |
| --- | --- |
| **Feel** | Product-workbench: diagram + copy, technical but clean |
| **Dials** | Variance 7 · Motion 5 · Density 5 |
| **Story** | Capability diagram → stack → integrations → engagement |
| **Motion** | Hover states, light scroll reveals |
| **Why Softree** | AI platform / Copilot / Azure pages |

---

## Reject for Softree (do not pick as macro)

| Trend | Why reject |
| --- | --- |
| Neon cyberpunk / matrix rain | Undermines enterprise trust |
| Purple AI mesh hero | Peak AI-slop 2024–25 |
| Full-page WebGL fluid | Perf cost, weak B2B signal |
| Playful blob mascots | Wrong audience |
| Glassmorphism-everything | Dated SaaS template |
| Infinite auto-play marquee chaos | Accessibility + attention tax |
| Multi-pin scroll hijack | Jank; Softree pin budget = 1 |

---

## Component-level trends (2026)

### Hero

| Pattern | Notes |
| --- | --- |
| Light editorial split | Image/stage + type; orange accent word |
| Letter / manifesto open | Long-form first line (About) |
| Stat-led open | One real KPI + subcopy |
| Avoid | Centered dark mesh, fake 3D robots |

### Trust / logos

| Pattern | Notes |
| --- | --- |
| Quiet logo row | Grayscale, no carnival marquee |
| Hairline logo wall | Editorial separators |

### Mechanism (scrollytelling core)

| Pattern | Notes |
| --- | --- |
| Pinned tab chapter | Kore `k2-scroll-tabs` — **one per page** |
| Sticky step rail | Left index, right content |
| Horizontal chapter (desktop only) | Degrade to vertical on mobile |

### Features / pillars

| Pattern | Notes |
| --- | --- |
| Asymmetric bento | Unequal spans, not 3 equal cards |
| Numbered index list | Editorial, dense type |
| Avoid | Identical icon-card triplets |

### Industry / context

| Pattern | Notes |
| --- | --- |
| Pill filters + panel | Large touch targets (≥44px) |
| Map / sector index | Typographic list |

### Tech stack

| Pattern | Notes |
| --- | --- |
| Spec sheet table | Tabular, mono labels |
| Grouped chip cloud | Restrained, not rainbow |

### Process

| Pattern | Notes |
| --- | --- |
| Vertical step sequence | Numbers + line |
| Sticky process | Pin budget if mechanism unused |

### Stats

| Pattern | Notes |
| --- | --- |
| Count-up on enter | Start from ~70% value, not 0; reduced-motion = final |
| Stat strip | 3–4 real numbers max |

### CTA / close

| Pattern | Notes |
| --- | --- |
| Existing LightContactSection | Sacred |
| Letter-close typography | Only if contact is in scope |

### Loaders (page-scoped)

| Pattern | Notes |
| --- | --- |
| Cream brand intro | Logo + orange line + mono label, ≤1.3s, session once |
| Avoid | Global site blocker, LCP hide |

---

## Performance-conscious motion (2026 consensus)

1. CSS `@keyframes` / transitions for simple enters.
2. GSAP for timeline + ScrollTrigger pin only.
3. No scroll-linked blur/filter.
4. `will-change` only during active animation.
5. Kill ScrollTriggers on unmount / route change.
6. `prefers-reduced-motion: reduce` → instant final state.
7. Prefetch next route; don't block input for decoration.

---

## Reference seeds (research starting points)

Agents should refresh with live search in Phase 1, but start from:

- Local Kore reference: `Softree_/aipage.html` (loader, scroll tabs, theme bands)
- Softree live patterns: `/services/offshore-ai-development`, homepage-light sections
- Hallmark macrostructures: `.agents/skills/hallmark/references/macrostructures/`
- Motion philosophy: Emil Kowalski (Linear) restraint + GSAP ScrollTrigger demos
- Anti-slop: hallmark `anti-patterns.md`, design-taste-frontend defaults list

When web-searching, prefer: Awwwards Sites of the Day in **SaaS / Technology / Corporate**, Codrops scroll demos that use transform-only, enterprise AI vendors with editorial layouts (not game-like).
