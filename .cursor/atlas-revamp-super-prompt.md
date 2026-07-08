# ATLAS: Self-Correcting Multi-Agent Page Revamp
## Awwwards / Apple / Softree Level — Iterate Until World-Class

**This is the master prompt.** Load ATLAS knowledge first, then paste the PROMPT block below into Cursor Plan mode, approve the plan, switch to Agent mode, and run.

---

## HOW TO RUN IN CURSOR

1. **Knowledge loads automatically** via `.cursor/rules/atlas-knowledge.mdc` (`alwaysApply: true`).
2. **Read** `.cursor/knowledge/thinking-principles.md` and the other knowledge files listed in that rule.
3. Open **Agents Window** (Cmd/Ctrl+Shift+P → "Agents Window").
4. Start in **Plan mode** — paste the PROMPT section below. Approve or edit the page queue and design concept.
5. Switch to **Agent mode**. Enable Auto-run for `npm run build`, `npm run lint`, browser tools, screenshot scripts.
6. Use **Build in Parallel** to spawn specialist subagents — one role per worktree when inputs allow.
7. After each APPROVED page, use **Design mode** on the rendered page for pixel-level fixes routed to the owning agent.

**Related files:**
- Knowledge brain: `.cursor/knowledge/`
- Standing rules: `.cursor/rules/atlas-knowledge.mdc`, `.cursor/rules/web-revamp.mdc`
- Website-modernization funnel spec: appendix at bottom of this file
- Design reference in repo: `src/components/softree-agentic-exact/` → `/agentic-ai-platform`

---

## PHASE 0 — SKILLS (mandatory before any work)

Every agent reads the relevant skills **before** its first action — not skim, read and apply.

### Design taste & visuals
`design-taste-frontend`, `design-taste-frontend-v1`, `high-end-visual-design`, `stitch-design-taste`, `web-design-guidelines`, `ui-typography`, `minimalist-ui`, `hallmark` (incl. references: typography, motion, layout-and-space, microinteractions, slop-test, macrostructures), `gpt-taste`, `design-audit`, `image-to-code`

Workspace paths: `.agents/skills/`, `.cursor/skills/`, user Claude skills

### Motion (pick ONE stack — GSAP recommended for scrollytelling)
`design-motion-principles` (incl. emil-kowalski, performance, accessibility, common-mistakes references)

GSAP: `gsap-core`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-react`, `gsap-performance`, `gsap-plugins`, `gsap-utils`

Alternative: `framer-motion` — use consistently if chosen, never mix stacks on one page

### Engineering
`vercel-react-best-practices`, `vercel-composition-patterns`, `bencium-code-conventions`, `emil-design-eng`

### Content & SEO (when writing copy or audits)
`softree-content-writer`, `seo-aeo-best-practices`, `content-modeling-best-practices`

### Skill assignment
| Agent | Must read |
|-------|-----------|
| UX Architect | thinking-principles, brand-positioning, consulting-frameworks, hallmark/macrostructures |
| UI Designer | ALL design-taste skills + web-design-guidelines + ui-typography |
| Component Engineer | vercel-react-best-practices, vercel-composition-patterns, bencium-code-conventions |
| Motion Engineer | ALL gsap skills + design-motion-principles — **before any animation code** |
| Responsive Engineer | web-design-guidelines, emil-design-eng |
| Performance Engineer | gsap-performance, vercel-react-best-practices |
| CRO/Copy | softree-content-writer, ideal-client-profile, brand-positioning |
| Verifier | design-audit, hallmark/slop-test, website-scoring-rubric |

Each agent confirms which skills it read before starting.

---

## PHASE 1 — DEEP WEB RESEARCH (reference library)

Dispatch a **RESEARCH AGENT** with browser tools (Playwright / Chrome DevTools MCP). Visit live sites — never rely on memory.

### Primary reference
**https://softreetechnology.com** — About Us + every Agentic AI / platform / product page.

Full-page screenshots at **1440px, 768px, 390px**. Save to `./design-reference/kore/`.

### Craft references (minimum 4 — screenshot each)
- apple.com product pages (scroll choreography)
- linear.app (restraint + polish)
- stripe.com (enterprise credibility)
- vercel.com (typography)
- One current Awwwards SOTD winner

Save to `./design-reference/craft/`.

### For EACH reference, document with screenshot evidence
1. **Design language** — type scale, palette, spacing rhythm, grid, imagery
2. **Motion** — what animates, trigger, duration, easing
3. **Storytelling** — narrative arc: opening hook → proof → close
4. **Structure** — section order, heights, transitions between sections
5. **Scrollytelling** — every pinned/scrub/parallax moment, precise enough to rebuild

### Output
`./design-reference/DESIGN-BRIEF.md` — single source of truth: Softree's design language, motion vocabulary, storytelling formula.

Synthesize Softree enterprise discipline + Apple scroll craft + Softree positioning as **AI Transformation Partner** (not IT services).

---

## DESIGN DIRECTION (non-negotiable)

**Quality bar:** Awwwards SOTD / Apple product page / softreetechnology.com enterprise polish.

Verifier scores like an Awwwards judge: **Design 40, Usability 30, Creativity 20, Content 10**. Under **8.5/10 overall = REJECTED**.

Also score against `.cursor/knowledge/website-scoring-rubric.md` (100-point framework).

### Hard bans (instant rejection)
- Purple-to-blue gradients, glassmorphism, glowing borders
- Generic hero: centered headline + two buttons + floating blob
- Emoji as icons, stock 3D illustrations, unthemed default shadcn
- More than 2 font families, more than 1 accent color
- Shadows on everything, rounded-2xl on everything, linear easing anywhere
- Dark patterns: fake urgency, deceptive CTAs
- Lorem ipsum — preserve and elevate existing Softree copy meaning

### What the bar requires
- **Scroll choreography:** ≥1 pinned scroll-driven sequence per flagship page (GSAP ScrollTrigger pin + scrub)
- **Signature hero:** kinetic typography, animated diagram, canvas treatment, or masked-video reveal — never a template
- **Micro-interactions:** magnetic buttons, character-stagger hovers, spring physics on cards — 60fps, transform/opacity only
- **Typographic drama:** structural display type (96–160px desktop), mixed weights, clip-path / per-line stagger reveals
- **Custom easing:** cubic-bezier(0.16, 1, 0.3, 1) family; entrances 400–800ms; sibling stagger 40–80ms
- **Section transitions:** theme shifts between sections, choreographed content in (no skeleton flash)
- **softreetechnology.com discipline:** rigid grid, restrained palette, enterprise credibility — creativity in motion, not layout chaos
- **3rd-visit test:** interruptible, respects `prefers-reduced-motion`, never blocks reading

### Page 1 concept gate
UI Designer presents **2–3 distinct visual concepts** for the first flagship page (words + reference to Softree screenshots). Orchestrator picks one. All later pages inherit that design language.

---

## THE AGENT TEAM (pipeline per page)

You are the **ORCHESTRATOR**. You dispatch specialists; you do not write code yourself.

| # | Agent | Output |
|---|-------|--------|
| 1 | **UX ARCHITECT** | Component tree + narrative wireframe using Discover→Diagnose→Design→Deliver→Optimize arc |
| 2 | **UI DESIGNER** | Visual spec: spacing, type, colors, imagery — from DESIGN-BRIEF.md |
| 3 | **COMPONENT ENGINEER** | Small reusable typed components, one per file, semantic HTML, WCAG 2.2 AA |
| 4 | **MOTION ENGINEER** | Scroll choreography, entrances, micro-interactions — gsap-scrolltrigger + gsap-react first |
| 5 | **RESPONSIVE ENGINEER** | Flawless at 390 / 768 / 1024 / 1440 / 1920px; scrollytelling degrades gracefully on mobile |
| 6 | **PERFORMANCE ENGINEER** | Lazy loading, image optimization, code splitting, 60fps, no CLS |
| 7 | **CRO/COPY** | Headlines, CTAs, objection handling — business outcomes not feature lists |
| 8 | **SEO/AEO** | Semantic HTML, meta, schema.org, internal linking, Core Web Vitals |
| 9 | **TRUST** | Case studies, logos, badges, proof — reuse existing Softree assets |
| 10 | **ANALYTICS** | Event tracking on CTAs, scroll depth, funnel steps |

Parallel-dispatch when agents don't depend on each other's output.

---

## THE COMPLETE LOOP (never skip a step)

For every page:

```
RESEARCH → IMPLEMENT → SELF-CHECK → COMPARE TO WEB → FIND FLAWS → FIX → repeat
```

### Step 1 — RESEARCH
Before building, re-open DESIGN-BRIEF.md + reference screenshots. If page type lacks a close reference, Research agent finds 2 world-class examples, screenshots and documents them.

### Step 2 — IMPLEMENT
Pipeline: Architect → Designer → Engineer → Motion → Responsive → Performance → CRO → SEO → Trust → Analytics.

Reuse existing repo patterns where appropriate:
- Motion: `@/lib/motion`, `k2ScrollReveal`, `k2Radar` from `softree-agentic-exact`
- Shell: `NavigationClient`, `LightContactSection`, `Footer`
- Do not copy competitor branding verbatim

### Step 3 — SELF-CHECK (VERIFIER — did NOT write the code)
- Run dev server, open OUR page in browser tools
- Screenshot all 5 breakpoints; scroll full page recording actual motion
- Run `npm run build`, lint, check console errors, accessibility basics

### Step 4 — COMPARE TO WEB
Side-by-side OUR screenshots vs softreetechnology.com + craft references:
- Design language hold up?
- Motion as smooth and purposeful?
- Storytelling arc as clear?
- Scrollytelling as crafted?
- Awwwards scores: Design /10, Usability /10, Creativity /10, Content /10
- Rubric score from `website-scoring-rubric.md`

### Step 5 — FIND FLAWS
**APPROVED** if: ≥8.5 Awwwards overall, zero hard-ban hits, zero technical defects, rubric gaps only Low/Medium with documented deferrals.

**REJECTED** with numbered defect list:
- What's wrong, where, severity
- Which reference shows how it should look
- Which agent owns the fix
- Acceptance criterion

If Verifier can't articulate a design fix, dispatch fresh web research for that pattern before rejecting.

### Step 6 — FIX
Route defects to owning specialists. Return to Step 3.

**Max 6 iterations per page.** Still failing → escalate with defect list + screenshots.

**On APPROVED:** log progress line (page, scores, loop count). Do not commit unless user asks.

---

## PAGE REVAMP QUEUE (flagships first)

Inventory and revamp in this order. Confirm list against repo before starting; add/remove as needed.

| Priority | Route | Component / notes |
|----------|-------|-------------------|
| 1 | `/about-us` | Company story — must answer Why Softree, Why trust us |
| 2 | `/ai` | Main AI positioning hub |
| 3 | `/services/offshore-ai-development` | `AgenticAiPage` — primary Agentic AI service |
| 4 | `/services/offshore-generative-ai-development` | Generative AI service |
| 5 | `/services/website-modernization` | Lead-gen funnel — see appendix |
| 6 | `/services/ai-powered-test-automation` | AI test automation |
| 7 | `/case-studies/ai` | AI social proof |
| 8 | `/` | Homepage AI transformation positioning (if scope includes) |

**Design gold standard in repo:** `/agentic-ai-platform` → `src/components/softree-agentic-exact/` — study before building; reuse patterns, do not duplicate blindly.

After all pages: **FULL-SITE VERIFIER** — nav, footer, spacing rhythm, motion vocabulary, cross-page consistency + final build/lint/console sweep.

---

## RULES

- Never skip Verifier. Never self-approve. Builder never reviews itself.
- Screenshots are evidence — every quality claim needs one.
- Real content only. Every page answers: Why Softree? Why now? Why AI? Why trust us? Why us over competitors?
- Optimize for: **"Will this help Softree win more qualified clients?"**
- Speed matters; the bar is non-negotiable on flagships.
- Only pause if genuinely blocked — state assumption and continue.
- Scope changes to target page; touch shared tokens/components only when consistency requires it — say so explicitly.

---

## OUTPUT PER ITERATION

```
### Page: [route] — Loop N
Research: (new reference findings only)
Changes: [agent]: what — why — trade-off
Build status: pass/fail
Awwwards: Design _/10 Usability _/10 Creativity _/10 Content _/10 → Overall _/10
Rubric: _/100 (breakdown)
Verdict: APPROVED | REJECTED
Defects: (numbered, if rejected)
Next focus:
```

## FINAL DELIVERABLE (all pages complete)

Use `.cursor/knowledge/report-template.md` structure:
- Executive summary + overall score
- Before/after per page
- Competitor benchmark matrix
- Priority + ROI matrices
- 30-day / 90-day / 1-year recommendations
- Final verdict: Improve | Partially Rebuild | Completely Reposition | Complete Redesign — with evidence

---

# PROMPT (paste into Plan mode)

You are the ORCHESTRATOR running ATLAS — a self-correcting multi-agent revamp of Softree's Agentic AI and positioning pages to Awwwards / Apple / Softree level.

**Before anything else:** Read `.cursor/knowledge/thinking-principles.md`, then `business-context.md`, `brand-positioning.md`, `ideal-client-profile.md`, `website-scoring-rubric.md`, and `consulting-frameworks.md`.

**Then execute in order:**
1. Phase 0 — confirm skill reads per agent role
2. Phase 1 — Research agent builds `./design-reference/` + `DESIGN-BRIEF.md` (live softreetechnology.com + craft sites, screenshots at 3 breakpoints, full motion/story/structure docs)
3. UI Designer presents 2–3 concepts for page 1 (`/about-us`); you pick one
4. Run the Complete Loop on each page in the revamp queue (flagships first)
5. Full-site Verifier pass
6. Final report per `report-template.md`

**You do not write code.** Dispatch subagents via Build in Parallel. Loop until Verifier APPROVES each page (max 6 iterations). Do not ask me questions unless truly blocked.

Start now: inventory the page queue against the repo, begin Phase 1 research, and show me the page order + first DESIGN-BRIEF outline before implementing page 1.

---

# APPENDIX: Website Modernization Funnel (`/services/website-modernization`)

When revamping this page, additionally apply `.cursor/rules/web-revamp.mdc`.

**Business goal:** Qualified leads via AI modernization blueprint funnel — URL → problem audit → trust gaps → competitor comparison → wireframe preview → book strategy call.

**Primary CTA:** Get your free modernisation blueprint (hero URL submit + embedded analyser)

**Secondary CTA:** Book a modernisation strategy call

**Audience:** Mid-market marketing leaders, IT directors, SMB founders with outdated sites (WordPress, Webflow, legacy React).

**Existing assets (integrate, don't rebuild):**
- AI analyser: `src/app/webanalyser/page.tsx` (iframe; API via `vercel.json` `/api/process`)
- Contact: `src/components/homepage-light/LightContactSection.tsx`
- Before/after: `src/app/services/legacy-application-modernization/before-after.tsx`
- Scroll lead: `src/app/services/offshore-web-app-development/web-dev-scroll-lead.tsx`
- Copy angle: `src/components/servicepage_new/BuildWebsiteSection.tsx`

**Section order:**
1. Hero — URL input + primary CTA + trust chips
2. Problem — signs your website needs modernisation
3. AI pipeline — 5-stage scroll story: Scan → Crawl → Competitors → Wireframe → Build
4. Sample blueprint — tabbed demo (Problems | Trust | Competitors | Wireframe)
5. Before/after slider
6. What we modernise — services grid
7. Process — discovery → design → build → launch
8. Case studies
9. Live analyser embed (prefilled from hero URL)
10. FAQ + LightContactSection

**Constraints:** Hero URL must prefill analyser. Wireframe/competitor outputs may be gated — use labelled demo data, never fake results. iframe must not block LCP.
