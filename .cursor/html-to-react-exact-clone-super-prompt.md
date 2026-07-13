# HTML → React Exact Clone — Devin Super Prompt + Agent Swarm

> Paste this into **Devin** (or Cursor Task / Claude Code) when converting a Webflow / raw HTML export into real React components on Softree's stack.
>
> Distilled from the Softree `/ai-home` conversion (`aihomepage.html` → `src/components/ai-home-exact/`) and aligned with Cognition's **map-reduce-and-manage** multi-agent pattern (writes single-threaded; parallel agents contribute intelligence, not conflicting code).

---

## 0. One-line goal

Convert `<REFERENCE_HTML>` into **hand-authored React section components** on Softree's Next.js App Router stack — **pixel/structure/animation parity**, Softree-honest content, **zero `dangerouslySetInnerHTML` of the page body**.

---

## 1. Devin session prompt (copy-paste)

```text
# GOAL
Convert the reference HTML export into real React components on Softree's existing tech stack.
Done = every top-level section is a committed .tsx file, the route renders without HTML-blob injection, reference animations play (same classes/attrs + same vendor engine), Softree copy is honest, and a headless probe reports zero console errors.

# REFERENCE
- HTML: Softree_/aihomepage.html  (or: <PATH>)
- Pattern to match: src/components/softree-agentic-exact/  (real sections, createPortal loader, next/script vendors, page-scoped CSS)
- Anti-pattern (FORBIDDEN): src/components/softree-ai-home/AiHomePage.tsx style — dangerouslySetInnerHTML of the full body

# STACK (hard constraints)
- Next.js App Router + React client components where needed
- TypeScript
- Page-scoped CSS + Webflow shared stylesheet via <link> (do NOT rewrite all CSS to Tailwind in v1)
- Vendors via sequential script load (jQuery/Webflow bundle, GSAP, ScrollTrigger, Lenis, Swiper, Rive) — same order as reference
- Preserve Webflow class names + animation attributes (data-anim, data-stagger, anim-element, anim-stagger, anim-scale, count-up, tabs-btns-slider, swiper-slider, etc.)
- Softree brand + honest content: no invented metrics, no borrowed client logos/testimonials presented as Softree's
- Sacred UI: do not change global site nav / sticky Softree footer / LightContactSection / LightFAQExact unless brief says so
- Nav on this page: SKIP unless brief says include

# NON-GOALS
- Do NOT inject the page body via dangerouslySetInnerHTML
- Do NOT invent a new aesthetic
- Do NOT reimplement GSAP/Lenis/Swiper from scratch if the reference engine can drive the real DOM
- Do NOT invent Softree client logos or fake case metrics
- Do NOT commit unless I ask

# ACCEPTANCE CRITERIA (checkable)
1. Route /ai-home (or <ROUTE>) renders AiHomeExactPage (or named page) composed of section components
2. No page-body dangerouslySetInnerHTML
3. Probe: document.documentElement.classList.contains('ready') === true
4. Probe: gsap + ScrollTrigger + Lenis present; ScrollTrigger.getAll().length > 0 when sections with anim-* exist
5. Probe: hasKore === false, hasArtemis === false (or brand-leak list empty)
6. Probe: pageerror + console error count === 0 (ignore PostHog missing key)
7. Each section file is real JSX (not a string blob)
8. Softree copy lives in content.ts (or equivalent), not hardcoded Kore strings

# ENVIRONMENT
- Dev: npm run dev (port 3000)
- Probe: node scripts/_probe-ai-home.mjs (or create equivalent)
- Verify after every section: screenshot + probe, not "should work"

# PROCESS (follow exactly — map-reduce-and-manage)
You are the MANAGER. Write a plan first. Wait for my plan approval if this is Devin Desktop.
Then execute phases in order. Child agents may research/map/check in parallel; YOU (or one Builder) write code single-threaded.

## Phase A — Map (read-only)
1. Strip scripts/styles from body; list ordered landmarks: header/nav/section/footer with id + class
2. For each section: line range, animation hooks present, media deps (Rive/video/Swiper)
3. Extract animation engine: which inline scripts + vendor URLs drive .ready, Lenis, GSAP reveals, tabs, swiper
4. Emit .planning/page-forge/<slug>/00-SECTION-MAP.md

## Phase B — Architecture
1. Create src/components/<feature>-exact/
2. Files: Page shell, content.ts, icons.tsx, wf.ts (Webflow attr passthrough), RiveCanvas.tsx if needed, aiHomeRuntime.ts (boot vendors + interaction scripts), page-scoped CSS
3. Wire route page.tsx to the new shell
4. Emit 01-ARCHITECTURE.md

## Phase C — Animation runtime (before more sections)
1. Port the reference's exact vendor load order + interaction scripts against the REAL React DOM
2. Replay DOMContentLoaded/load after inject (scripts register on those events)
3. Guard scripts whose target sections are not built yet (skip, don't crash)
4. Failsafe: force .ready after N seconds if engine stalls
5. Verify with probe: ready + gsap + lenis + zero errors

## Phase D — Build sections (one at a time, single-threaded writes)
Order: Hero → (skip nav if brief) → Content/Industries → Explore-products tabs → Proof/testimonials → Insights → Footer → Loader only if markup exists in export
For each section:
1. Read exact HTML slice
2. Transcribe to JSX preserving classes + anim attrs
3. Softree-honest content in content.ts
4. Mount in page shell
5. Probe + screenshot
6. Mark section DONE in todo / SECTION-MAP

## Phase E — Parallel checkers (intelligence only — no writes)
Spawn in parallel after each major section or at end of page:
- Design checker: structure parity, brand, no Kore leaks
- Animation checker: .ready reveal, ScrollTriggers, Lenis, tab/swiper init
- Content honesty checker: no borrowed logos/testimonials/fake metrics
- Console/perf checker: pageerrors, LCP not hidden under opacity:0 forever

## Phase F — Correct → re-check until gate
P0 first (blank screen, hydration crash, brand leak, anim engine dead). Then P1.
Max 4 loops unless TEN_OUT_OF_TEN mode.

## Phase G — Ship report
List files, what animations are exact vs approximated, remaining sections, probe evidence.

# STOP CONDITIONS
- Missing Softree content truth for a section that would require inventing clients → stop and ask
- Reference export has no loader markup → do not invent a loader; document N/A
- Plan drifts into HTML injection → abort and re-plan

# FIRST ACTION
Write the section map from the HTML. Do not write components until the map exists.
```

---

## 2. Architecture (what we actually built)

```
src/components/ai-home-exact/
├── AiHomeExactPage.tsx      # shell: body classes, styles, mounts sections, boots runtime
├── aiHomeRuntime.ts         # exact vendor + interaction script boot (no body HTML inject)
├── ai-home-exact.css        # page-scoped extras (scroll indicator, capability chips, tab CSS)
├── content.ts               # Softree copy + section data
├── icons.tsx                # repeated SVGs as components
├── wf.ts                    # type-safe Webflow attr passthrough ({...wf({ "data-anim": "" })})
├── RiveCanvas.tsx           # reusable Rive mount (mirrors softree-agentic-exact)
└── sections/
    ├── HeroSection.tsx
    ├── IndustriesSection.tsx
    └── … (ExploreProducts, Proof, Insights, Footer)
```

**Key design law**

| Do | Don't |
| --- | --- |
| Hand-author JSX with reference class names | `dangerouslySetInnerHTML` the page body |
| Run the reference animation engine on real DOM | Reinvent Lenis/GSAP/Swiper from scratch |
| Softree-honest content chips instead of borrowed logos | Present Kore client logos as Softree's |
| Skip nav if brief says so | Mount global loaders on `layout.tsx` |
| Probe after every section | Claim done on "should work" |

**Animation strategy (exact cinematicness)**

1. Keep `[data-anim]`, `transition-delay`, `anim-element`, `anim-stagger`, etc. on JSX.
2. Load the same vendor scripts in the same order.
3. Run the reference's verbatim interaction scripts (captured in `referenceContent` / extracted from HTML).
4. Replay `DOMContentLoaded` + `load` so handlers that already missed the native event still init.
5. Let `.ready` on `<html>` drive the CSS reveal; let GSAP ScrollTrigger drive scroll reveals; let Swiper/wireSlider drive carousels.

---

## 3. Agent swarm (map-reduce-and-manage)

Per Cognition (2026): **unstructured swarms are a distraction**. Use a manager + children. **Writes stay single-threaded.** Parallel agents contribute research, maps, and reviews.

```
                    ┌─────────────────────┐
                    │  ORCHESTRATOR /     │
                    │  MANAGER (Devin)    │
                    │  plan · write code  │
                    │  synthesize · ship  │
                    └──────────┬──────────┘
           ┌───────────────────┼───────────────────┐
           ▼                   ▼                   ▼
   ┌───────────────┐   ┌───────────────┐   ┌───────────────┐
   │ MAPPER        │   │ ANIM ANALYST  │   │ CONTENT       │
   │ (read-only)   │   │ (read-only)   │   │ HONESTY       │
   │ section list  │   │ engine + CSS  │   │ Softree copy  │
   │ line ranges   │   │ timings       │   │ no fake logos │
   └───────────────┘   └───────────────┘   └───────────────┘
           │                   │                   │
           └───────────────────┼───────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │  BUILDER (single)   │
                    │  one section/file   │
                    │  at a time          │
                    └──────────┬──────────┘
                               ▼
        ┌──────────────┬───────┴───────┬──────────────┐
        ▼              ▼               ▼              ▼
   Design Check   Anim Check    Content Check   Console Check
   (parallel, read-only / report only)
        └──────────────┴───────┬───────┴──────────────┘
                               ▼
                    ┌─────────────────────┐
                    │  CORRECTOR          │
                    │  P0 then P1         │
                    │  (manager writes)   │
                    └─────────────────────┘
```

### Agent roles

| Agent | Mode | Output | Writes code? |
| --- | --- | --- | --- |
| **Orchestrator** | Manager | Plan, todos, ship report | Yes (or delegates to one Builder) |
| **Section Mapper** | Read-only | `00-SECTION-MAP.md` | No |
| **Anim Analyst** | Read-only | Engine inventory, timings, CSS deps | No |
| **Content Writer** | Read-only → data | Softree `content.ts` draft | Data only |
| **Builder** | Single-threaded | One section `.tsx` per turn | Yes |
| **Design Checker** | Read-only | P0/P1 visual/structure | No |
| **Anim Checker** | Probe | ready / ST / Lenis / swiper | No |
| **Honesty Checker** | Grep + probe | brand leaks, fake logos | No |
| **Corrector** | Manager writes | Fixes from P0/P1 lists | Yes (manager) |

### Loop protocol

```
MAP → ARCH → RUNTIME → [BUILD section → PROBE]×N → PARALLEL CHECK → REVIEW → CORRECT → CHECK …
```

**Gate (default)**

- Zero P0 (blank screen, injection regression, brand leak, dead anim engine)
- Probe console errors = 0
- Every built section has Softree-honest copy
- Developer quality: real components, not blobs

**Max loops:** 4 correction cycles, then escalate with honest blocker report.

---

## 4. Process we used on Softree `/ai-home` (evidence)

| Step | What happened | Artifact |
| --- | --- | --- |
| 1 | User rejected HTML injection; demanded real React like `softree-agentic-exact` | — |
| 2 | Chose **manual** hand-authored sections (not codegen / not html-react-parser) | AskQuestion |
| 3 | Mapped landmarks from `aihomepage.html` | section list |
| 4 | Scaffolded `ai-home-exact/` + `wf` + `RiveCanvas` + Hero | `HeroSection.tsx` |
| 5 | Wired `/ai-home` to `AiHomeExactPage` | `src/app/ai-home/page.tsx` |
| 6 | Studied line ~9416 master engine; built `aiHomeRuntime.ts` | exact anims |
| 7 | Built Industries with Swiper/tabs; replaced client logos with capability chips | `IndustriesSection.tsx` |
| 8 | Probed after each step | `_probe-ai-home.mjs` → ready, gsap, lenis, 0 errors |

**Hard lesson:** Injection is faster but wrong for this brief. Exact animations come from **preserving attrs + running the reference engine**, not from rewriting motion in Framer by eye.

---

## 5. Child-agent micro-prompts

### Mapper

```text
Read Softree_/aihomepage.html. Strip <script> and <style>. List every <section|header|footer|nav|main> in order with id, class (truncated), approx line range, and animation attributes found. Output markdown table only. No code changes.
```

### Anim Analyst

```text
Find handleLoader, handleLenis, handleGlobalAnimation, handleStagger, custom-tabs GSAP, Swiper init in the HTML / referenceContent. Document: vendor URL order, which classes/attrs each function needs, timings (logo stages if any), and which CSS lives in head vs body-scoped <style>. Output ANIM-ENGINE.md. No code changes.
```

### Builder (per section)

```text
Build ONLY <SectionName> as src/components/ai-home-exact/sections/<File>.tsx.
Preserve class names and anim attrs via wf(). Softree copy from content.ts.
Mount in AiHomeExactPage. Run probe. Do not touch other sections.
```

### Checker (parallel)

```text
Open /ai-home. Report P0/P1 for: structure parity, Softree brand leaks (Kore/Artemis), animation engine (ready, gsap, ScrollTrigger count, Lenis, swiper-initialized), console pageerrors. Evidence only. No code changes.
```

---

## 6. Variables to fill per page

| Variable | Example |
| --- | --- |
| `REFERENCE_HTML` | `Softree_/aihomepage.html` |
| `ROUTE` | `/ai-home` |
| `FEATURE_FOLDER` | `ai-home-exact` |
| `PATTERN_PAGE` | `softree-agentic-exact` |
| `INCLUDE_NAV` | `false` |
| `CONTENT_MODE` | Softree rebrand + honesty |
| `SCORE_MODE` | `SOTD_TARGET` \| `TEN_OUT_OF_TEN` |

---

## 7. Sources (research)

- Cognition — [Multi-Agents: What's Actually Working](https://cognition.ai/blog/multi-agents-working/) — map-reduce-and-manage; single-threaded writes
- Devin Desktop — prompt engineering: clear objective, context, constraints, acceptance criteria
- Softree — `.agents/skills/awwwards-page-loop/SKILL.md` — forge loop + stack constraints
- Softree — `src/components/softree-agentic-exact/` — gold-standard exact-clone pattern
- Softree — `src/components/ai-home-exact/` — this conversion in progress

---

## 8. Quick invoke

```
Run the HTML→React exact-clone loop on Softree_/aihomepage.html → /ai-home.
Use .cursor/html-to-react-exact-clone-super-prompt.md
Nav not required. Exact animations. Softree-honest content. No body injection.
Continue from Industries → explore-products → proof → insights → footer.
```
