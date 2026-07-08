---
name: awwwards-page-loop
description: >-
  Multi-agent loop that plans, builds, checks, and corrects Softree marketing
  pages to Awwwards-level quality with scrollytelling, responsive placement,
  and performance gates. Use when the user asks to forge/build/redesign a page,
  run the page loop, generate an Awwwards page, or wants design+perf+responsive
  agent review with correction cycles.
---

# Awwwards Page Loop (Softree)

Orchestrated agent system that turns a page brief into a production-ready Softree page in the **existing** tech stack, then loops design / responsive / performance checkers and correction agents until scores clear the gate.

**Default pass gate:** Awwwards-weighted score ≥ **8.5 / 10**, developer quality ≥ **9.0 / 10**, zero P0 blockers.  
**10/10 mode:** when the user explicitly asks for 10/10, do not approve until Design, Usability, Creativity, Content, and Developer Quality are all **10.0 / 10** with no P0/P1/P2.  
**Max loops:** **4** correction cycles for `SOTD_TARGET`. In `TEN_OUT_OF_TEN` mode, continue correction until every checker returns 10/10 or write an honest blocker report; never mark generic work complete.

---

## When to run

User says any of:

- "forge page", "awwwards loop", "page loop", "build this page to Awwwards"
- "generate [route] with the agent system"
- redesign / rebuild a marketing page with full QA agents

**Do not run** for tiny one-line fixes, copy-only edits, or backend work.

---

## Hard constraints (never violate)

Read [`references/softree-constraints.md`](references/softree-constraints.md) before any build.

| Rule | Detail |
| --- | --- |
| Stack only | Next.js App Router, React, Tailwind, GSAP + ScrollTrigger, Framer Motion, existing `@/lib/motion` tokens |
| Brand | Orange `#FF5812`, cream `#f8f4ec`, ink `#121417` / `#141414` — no purple AI gradients |
| Scope | Page-scoped motion only — **never** mount global loaders/Barba on root layout unless user explicitly asks |
| Sacred UI | Do not change site nav, sticky orange SOFTREE footer, `LightContactSection`, `LightFAQExact` unless brief says so |
| Honest copy | No invented metrics, logos, or testimonials |
| Motion | Animate `transform` + `opacity` only; honor `prefers-reduced-motion` |
| LCP | Never hide LCP text with `opacity: 0` under a loader |
| Cross-stack conversion | Raw HTML/CSS/JS or prompts from another stack must be converted into Next.js App Router + React + Tailwind/page-scoped CSS + installed packages/`next/script`; never paste a standalone artifact unless explicitly requested |

---

## Skills to load (by phase)

| Phase | Skills (read and apply) |
| --- | --- |
| Direction | `hallmark`, `design-taste-frontend`, `high-end-visual-design`, `stitch-design-taste` |
| Copy / rebrand | `softree-content-writer` — after Story or before rebrand on reference pages |
| Motion / scroll | `design-motion-principles`, `emil-design-eng`, `gsap-core`, `gsap-scrolltrigger`, `gsap-react`, `gsap-performance`, `gsap-timeline` |
| Anti-slop / polish | `minimalist-ui` *or* `industrial-brutalist-ui` only if direction picks them; `redesign-existing-projects` on redesigns |
| SEO | `seo-aeo-best-practices` on final pass |
| Full code | `full-output-enforcement` when emitting components |

Do **not** invent a new aesthetic outside Softree brand + the locked direction from Phase 1.

---

## Pipeline (run in order)

```
0 BRIEF → 1 DESIGN INTENT → 2 STORY → [2a COPY if Softree/rebrand] → 3 COMPONENT MAP → 4 BUILD
     ↓
5 PARALLEL CHECK (Design · Responsive · Performance)
     ↓
6 REVIEW (aggregate score)
     ↓
7 CORRECT (P0 then P1) → back to 5 until APPROVED or max loops
     ↓
8 SHIP REPORT
```

Full agent prompts: [`references/agents.md`](references/agents.md)  
Loop rules: [`references/loop-protocol.md`](references/loop-protocol.md)  
Scoring: [`references/rubrics.md`](references/rubrics.md) using Awwwards public weights: Design 40%, Usability 30%, Creativity 20%, Content 10%.  
Product requirements: [`PRD.md`](PRD.md)  
Orchestrator law: [`ORCHESTRATOR-SYSTEM-PROMPT.md`](ORCHESTRATOR-SYSTEM-PROMPT.md)  
Design generation law: [`references/design-generation-super-prompt-v2.md`](references/design-generation-super-prompt-v2.md)  
Trends: [`references/design-trends-2026.md`](references/design-trends-2026.md)  
Section patterns: [`references/component-catalog.md`](references/component-catalog.md)  
Report formats: [`references/report-templates.md`](references/report-templates.md)

---

## Phase 0 — Brief lock

Orchestrator writes `.planning/page-forge/<slug>/00-BRIEF.md`:

```yaml
route: /services/example
slug: example
page_kind: service | about | case-study | landing
audience: enterprise buyers / technical decision makers
must_preserve: [nav, footer, LightContactSection, LightFAQExact]
content_source: softreetechnology.com | provided | existing components
references: [urls or aipage.html sections]
max_loops: 4
threshold: 8.5
score_mode: SOTD_TARGET | TEN_OUT_OF_TEN
```

If route or content source is missing, ask **one** question, then proceed.

---

## Phase 1 — Design Intent Extractor (agent)

**Goal:** Pick **one** macro direction and turn it into a concrete Softree-specific visual argument, not portfolio chaos or generic AI/SaaS styling.

1. Read `references/design-generation-super-prompt-v2.md` and `design-trends-2026.md`.
2. Optionally web-search for 2–3 fresh references (Awwwards / Codrops / Kore-class B2B).
3. Run the kill list. If the plan matches three or more kill-list items, restart before story/build.
4. Emit `.planning/page-forge/<slug>/01-DIRECTION.md`:
   - Macro direction name (from catalog)
   - Why it fits Softree
   - Dial values: `DESIGN_VARIANCE` / `MOTION_INTENSITY` / `VISUAL_DENSITY`
   - Rejected directions (1 line each)
   - Reference URLs / local refs
5. Emit `.planning/page-forge/<slug>/03-DESIGN-INTENT.md`:
   - One-sentence `signature_argument`
   - Kill-list audit + written justifications for any exception
   - Exact color/type/layout token system
   - ASCII wireframes for major sections
   - Motion spec with one-pin budget and reduced-motion frozen state
   - Copy swap-test results
   - Five final-test answers

**Softree default direction:** *Editorial Enterprise Scrollytelling* (cream/white bands, orange accent, one pinned scroll chapter, restrained motion).

---

## Phase 2 — Story Architect (agent)

**Goal:** Narrative arc + scroll beats, not a feature dump.

Read `03-DESIGN-INTENT.md`, then emit `02-STORY.md`:

| Beat | Purpose | Scroll behavior |
| --- | --- | --- |
| Hook | Promise / tension | Hero reveal |
| Proof | Logos / trust | Static or light marquee |
| Mechanism | How it works | **Pinned scroll tabs or step pin** (one only) |
| Context | Industries / stack | Alternating bands |
| Process | Delivery | Numbered sequence |
| Proof metrics | Real stats only | Count-up on enter |
| Close | Contact + FAQ | Existing sacred components |

Rules:

- Exactly **one** heavy ScrollTrigger pin per page (performance).
- Maximum five scroll scenes.
- Story must derive from the `signature_argument`, not a mood board.
- Story must answer: *problem → approach → proof → path to talk*.
- No fake case metrics.

---

## Phase 3 — Component Mapper (agent)

For **each** section, pick **one** pattern from `component-catalog.md` that matches the direction.

Emit `03-COMPONENT-MAP.md`:

```md
| # | Section | Pattern ID | Motion | Notes |
|---|---------|------------|--------|-------|
| 1 | Hero | H-LIGHT-EDITORIAL | GSAP stagger on ready | Wait agentic-ai:ready if loader |
```

One agent may own the map; optional **per-section micro-agents** only when sections are large (hero, pin chapter, process).

The map must preserve the token system and section wireframes from `03-DESIGN-INTENT.md`. Reject maps that collapse back into hero/cards/tabs/grids/CTA/FAQ rhythm.

---

## Phase 4 — Builder (agent)

Implement in existing stack:

1. Route under `src/app/.../page.tsx` (server) + client page component folder.
2. Sections as separate files under `src/components/<feature>/sections/`.
3. Use `@/lib/motion` (`DUR`, `EASE`, `STAGGER`, `prefersReducedMotion`).
4. Page-scoped CSS for pin/loader only.
5. Wire sacred components unchanged.
6. No global layout hijack.
7. Implement the design law from `03-DESIGN-INTENT.md`: one bold signature idea, exact tokens, mobile-redesigned signature moment, copy swap-test compliance, one pin max, five scroll scenes max.

Emit `04-BUILD.md` with file list + intentional deviations.

---

## Phase 5 — Parallel checkers (3 agents)

Launch **in parallel** (Task tool / subagents):

| Agent | Output | Focus |
| --- | --- | --- |
| **Design Checker** | `05a-DESIGN.md` | Hallmark/slop, hierarchy, brand, storytelling fidelity |
| **Responsive Checker** | `05b-RESPONSIVE.md` | 390 / 768 / 1024 / 1440 placement, overflow, touch 44px, stacking |
| **Performance Checker** | `05c-PERFORMANCE.md` | LCP, scroll jank, GSAP leaks, blur/filters, layout thrash, reduced-motion |

Each agent scores per `rubrics.md` and lists **P0 / P1 / P2** with file:line when possible.

---

## Phase 6 — Review Agent

Reads all `05*` reports + code. Emits `06-REVIEW.md`:

```yaml
verdict: APPROVED | REJECTED
overall: 8.4
dimensions:
  visual_design: 8.5
  storytelling: 8.2
  motion: 8.6
  layout_responsive: 8.0
  performance: 7.9
  content_honesty: 9.0
p0: [...]
p1: [...]
loop: 1
```

**APPROVED** in default mode only if:

- Awwwards-weighted score `>= 8.5`
- developer quality `>= 9.0`
- `p0` empty
- performance has no scroll-blocking or LCP-hiding issues

**PERFECT** in 10/10 mode only if:

- Design = 10.0
- Usability = 10.0
- Creativity = 10.0
- Content = 10.0
- Developer Quality = 10.0
- P0/P1/P2 all empty

---

## Phase 7 — Correction wave

If REJECTED:

1. Spawn **Correction agents** (can be parallel by file ownership):
   - Design fixer
   - Responsive fixer
   - Performance fixer
2. Each fixer only touches its P0/P1 list.
3. Increment `loop`, write `07-LOOP-<n>-FIXES.md`.
4. Re-run Phase 5 → 6.
5. Stop at `max_loops` and write `08-ESCALATION.md` for the user.

---

## Phase 8 — Ship report

On APPROVED, write `08-VERIFICATION.md` using the template (same shape as prior page-1 verification).

Tell the user:

- Live URL
- Overall score
- What direction/story was used
- Remaining P2 (optional polish)

---

## Orchestrator rules (you)

1. **You are the orchestrator.** Prefer Task/subagents for Trend, Checkers, Review, and Correction. Build yourself when faster, but still run checkers.
2. **Never skip Responsive or Performance** even if design looks great.
3. **Never raise scores without evidence** (file paths, viewport notes).
4. **Preserve sacred UI** every loop.
5. **Session artifacts** live only under `.planning/page-forge/<slug>/`.
6. If user is mid-conversation on an existing page, set `slug` from the route and continue the loop from the latest phase file present.
7. In `TEN_OUT_OF_TEN` mode, never accept a Design Checker report that does not name a screenshot-recognizable visual idea and provide file-backed evidence.
8. If the page still reads as hero/cards/tabs/grids/CTA/FAQ, route the loop back to Story Architect and Component Mapper, not just Builder polish.

---

## Quick invoke examples

```
forge page /services/offshore-generative-ai-development
awwwards loop for about-us
run page loop on /case-studies/ai — use Editorial Enterprise Scrollytelling
```

---

## Anti-patterns for this skill

- Mounting loaders/Barba on `src/app/layout.tsx`
- Multiple ScrollTrigger pins fighting each other
- Inventing client logos or “47% faster” stats
- Purple/blue AI mesh gradients
- Glassmorphism on every card
- Hiding hero copy for the loader
- Declaring APPROVED below 8.5
- Infinite correction loops without escalating
- Visual checker praise without evidence
- Calling a polished generic SaaS/service page "Awwwards-level"
- Treating a dashboard mockup, tab block, or card grid as a signature visual idea
