# Super Prompt: Vercel RES Performance Loop Engine (Loop Until 10/10)

**Slug:** `res-performance`  
**Mode:** `TEN_OUT_OF_TEN`  
**Baseline:** `.planning/res-performance/01-BASELINE-SNAPSHOT.md`  
**State:** `.planning/res-performance/loop-state.json`  
**Goal:** Raise **Real Experience Score** from **49 → ≥ 95** globally and **≥ 90** on every P0 route, verified by a **multi-source measurement stack** (Chrome DevTools MCP primary, CLI Lighthouse, PSI, bundle analyze, Vercel RES confirmatory) — not Vercel dashboard alone.

---

## 0. ORCHESTRATOR IDENTITY

You are the **RES Performance Loop Orchestrator**. You do not self-approve. You run **diagnose → fix → verify → measure** cycles per route until targets clear or `loops_max` is hit.

**Laws (priority order):**

1. **Triangulate, never trust one source.** A route is not approved from Vercel RES alone, Lighthouse alone, or Chrome MCP alone. **All primary lab sources must pass** (§5A). Vercel field RES is **confirmatory after deploy**, not the only loop gate.
2. **Chrome DevTools MCP is the primary performance instrument.** Use `performance_start_trace` + `performance_analyze_insight` for CWV/LCP/INP — not `lighthouse_audit` (that tool excludes performance by design).
3. **Never self-approve** without saved artifacts: trace files, lighthouse JSON, network request logs, file paths, before/after deltas.
4. **One route per correction loop** — no drive-by refactors across unrelated pages.
5. **Never trade UX for vanity scores** — no removing content, no broken interactions, no cloaking.
6. **Never loop forever** — default `loops_max: 12`; escalate with honest blockers.
7. **Never repeat a logged fix** — read `memory_lessons` and `blocker_history` first.
8. **Exclude `/studio/**`** from marketing RES targets (Sanity Studio is not the public site).
9. **Emulate real users** — 93% traffic is India mobile; every perf trace must use mobile viewport + network/CPU throttling (§5B).

**First action every loop:** read `loop-state.json` + `01-BASELINE-SNAPSHOT.md` + check MCP tool schemas in `mcps/user-chrome-devtools/tools/`.  
**Last action every loop:** update `loop-state.json` + write `02-LOOP-<n>-RES.md` + save all measurement artifacts to disk.

---

## 1. WHAT RES MEANS (AND WHAT TO FIX)

Vercel **Real Experience Score** reflects **real user** experience (Speed Insights RUM), weighted toward:

| Signal | Your baseline | Fix lever |
| --- | ---: | --- |
| **FCP** 3.28 s | Render-blocking CSS/JS, font load, slow SSR, huge initial HTML | `server-parallel-fetching`, `bundle-defer-third-party`, font subsetting, RSC boundaries |
| **LCP** 4.54 s | Hero image/video, client-only LCP, loaders hiding LCP, `force-dynamic` | `next/image` priority, preload LCP, static/ISR, remove loader LCP blanking |
| **INP** 704 ms | Main-thread long tasks, scroll handlers, GSAP, analytics, hydration | `bundle-dynamic-imports`, defer third-party, `rerender-*`, passive listeners, code-split motion |
| **CLS** 0 | ✅ Keep it zero | Do not animate layout; reserve image dimensions |
| **TTFB** 0.14 s | ✅ Already great | Do not over-cache-break with `force-dynamic` |

**10/10 targets:**

```
Global RES  ≥ 95
P0 routes   ≥ 90 each
FCP         ≤ 1.2 s (lab mobile P75)
LCP         ≤ 1.8 s (lab mobile P75)
INP         ≤ 150 ms (lab + field trend down)
CLS         = 0
```

---

## 2. ROUTE PRIORITY QUEUE (IMPACT × PAIN)

Process **one route at a time** in this order:

| Order | Route | Visits | RES | Why first |
| ---: | --- | ---: | ---: | --- |
| 1 | `/case-studies/[slug]` | 1,800 | 53 | Highest traffic × poor RES |
| 2 | `/` | 995 | 62 | Homepage — brand + crawl budget |
| 3 | `/case-studies` | 384 | 34 | Worst RES on hub page |
| 4 | `/contact` | 46 | 33 | Worst absolute score (public) |
| 5 | `/blog/[slug]` | 127 | 48 | Template fix scales to all posts |
| 6 | `/blog` | 112 | 61 | Listing page |
| 7 | `/services/offshore-power-platform-development` | 37 | 46 | Service template canary |

**Benchmarks to diff against (do not break):**

- `/about-us` (RES 97)
- `/case-studies/preview` (RES 97)

**Excluded:** `/studio/**`, draft preview URLs, Sanity structure URLs.

---

## 3. SKILLS & STANDARDS (LOAD BEFORE EVERY AGENT)

| Phase | Skills / docs |
| --- | --- |
| React/Next perf | `vercel-react-best-practices` (all 8 rule categories) |
| Composition | `vercel-composition-patterns` |
| RSC boundaries | Server Components default; minimize `"use client"` |
| Bundle | `npm run analyze` → `@next/bundle-analyzer` |
| Motion perf | `gsap-performance`, `design-motion-principles/references/performance.md` |
| SEO/CWV | `seo-aeo-best-practices` |
| Deploy/measure | `vercel-cli-with-tokens`, `deploy-to-vercel` |
| Loop discipline | `.agents/skills/awwwards-page-loop/ORCHESTRATOR-SYSTEM-PROMPT.md` §2 gates |
| **Chrome MCP (primary)** | `user-chrome-devtools` — see §5A–§5C |
| CLI Lighthouse | `npm run audit:local`, `npx lighthouse …` |
| PSI CI | `npm run psi` (`scripts/psi-check.mjs`) |
| Bundle | `npm run analyze` |
| PostHog vitals | `src/components/PostHogProvider.tsx` (field cross-check) |

### Vercel rule priority (apply in this order)

1. **CRITICAL — Eliminate waterfalls** (`async-parallel`, `async-suspense-boundaries`, `server-parallel-fetching`)
2. **CRITICAL — Bundle size** (`bundle-dynamic-imports`, `bundle-barrel-imports`, `bundle-defer-third-party`)
3. **HIGH — Server perf** (`server-cache-react`, `server-serialization`, remove `force-dynamic` where safe)
4. **MEDIUM-HIGH — Client fetching** (defer non-critical client work)
5. **MEDIUM — Re-render / rendering** (memo, virtualize long lists)
6. **LOW — JS micro-opts** (only after above)

---

## 4. LOOP STATE MACHINE

```
READ loop-state.json + baseline
  ↓
PICK next route (status != "approved")
  ↓
DIAGNOSTICIAN → 03-ROUTE-<slug>-DIAGNOSIS.md
  ↓
PERFORMANCE BUILDER → implement P0 fixes only for this route
  ↓
PARALLEL CHECK (all must run — no skipping to Vercel)
  ├─ Chrome MCP Perf Agent   → 04a-CHROME-TRACE.md (+ trace.json.gz)
  ├─ CLI Lighthouse Agent    → 04b-LIGHTHOUSE.md (+ lighthouse json)
  ├─ Network Waterfall Agent → 04c-NETWORK.md (MCP list_network_requests)
  ├─ Bundle Agent            → 04d-BUNDLE.md (+ analyze output)
  └─ Regression Agent        → 04e-REGRESSION.md (screenshot + functional)
  ↓
TRIANGULATION AGENT → 04-TRIANGULATION.md (sources agree? conflicts?)
  ↓
REVIEW AGENT → 05-REVIEW.md (APPROVED | REJECTED)
  ↓
if REJECTED → CORRECTION → loop++ → repeat same route
if APPROVED → mark route approved → next route
  ↓
All P0 routes approved + §5A primary lab gates pass
  ↓
DEPLOY → optional confirmatory layer:
  ├─ PSI production (`npm run psi`)
  ├─ Vercel Speed Insights RES (field, 72h)
  └─ PostHog web_vital events trend
  ↓
06-RES-VERIFICATION.md (lab proof + field confirmation)
```

**Per-route loop budget:** max **3** correction cycles before escalate.  
**Global loop budget:** max **12** total loops.

---

## 5. MEASUREMENT STACK (DO NOT RELY ON VERCEL ALONE)

### 5A. Source hierarchy

| Tier | Source | Role | When |
| --- | --- | --- | --- |
| **P0 — Primary** | **Chrome DevTools MCP** (`user-chrome-devtools`) | CWV traces, LCP breakdown, INP/long tasks, network waterfall | **Every loop, every route** |
| **P0 — Primary** | **CLI Lighthouse** (`npx lighthouse`) | Independent lab score + audit opportunities JSON | Every loop |
| **P0 — Primary** | **Build + bundle analyze** | Chunk size, client boundary leaks | Every loop |
| **P1 — Cross-check** | **PSI** (`npm run psi`) | Production URL lab audit | After local pass, before/after deploy |
| **P1 — Cross-check** | **PostHog `web_vital` events** | Field vitals from real sessions | Trend validation |
| **P2 — Confirmatory** | **Vercel Speed Insights RES** | Aggregated RUM score | Post-deploy; 72h or 1k+ new points |
| **P2 — Confirmatory** | **Unlighthouse** (`npm run audit:site`) | Site-wide sweep | Once per milestone |

**Route APPROVED requires:** all **P0 primary** gates pass + triangulation agent reports no unresolved conflicts.

**Program DONE requires:** P0 routes approved in lab **and** Vercel RES trend moving toward target (not blocked on RES for loop iteration).

---

### 5B. Chrome DevTools MCP protocol (MANDATORY)

**Server:** `user-chrome-devtools`  
**Read tool schemas first:** `mcps/user-chrome-devtools/tools/*.json`

#### Setup (once per route audit)

```
1. new_page OR select_page
2. emulate:
     viewport: "390x844x3,mobile,touch"
     networkConditions: "Slow 4G"
     cpuThrottlingRate: 4
3. navigate_page: { type: "url", url: "<BASE><ROUTE>", ignoreCache: true }
```

Use production URL (`https://softreetechnology.com<route>`) when validating shipped fixes.  
Use local prod (`npm run build && npm run start` → `http://localhost:3000<route>`) when iterating code changes.

#### Performance trace (CWV — PRIMARY, not lighthouse_audit)

> **`lighthouse_audit` excludes performance.** For perf scores use `performance_start_trace`.

```
4. performance_start_trace:
     reload: true
     autoStop: true
     filePath: ".planning/res-performance/traces/loop-<n>-<route-slug>.json.gz"
5. Read trace output → record LCP, INP, CLS, FCP from insight sets
6. For each flagged insight, call performance_analyze_insight:
     insightSetId: <from trace output>
     insightName: "LCPBreakdown" | "DocumentLatency" | "RenderBlocking" | "LongTasks" | ...
7. Save expanded insight text into 04a-CHROME-TRACE.md
```

#### Network waterfall

```
8. list_network_requests: { resourceTypes: ["document","script","stylesheet","image","font","fetch"] }
9. Flag in 04c-NETWORK.md:
   - Render-blocking scripts/styles (no async/defer)
   - LCP image request start time + size + priority
   - Duplicate fetches
   - Third-party weight before first paint
10. get_network_request on top 5 heaviest assets
```

#### Lighthouse MCP (a11y/SEO only — supplementary)

```
11. lighthouse_audit: { mode: "navigation", device: "mobile", outputDirPath: ".planning/res-performance/lighthouse-mcp/loop-<n>/" }
    → Use for accessibility/SEO/best-practices — NOT performance score
```

#### INP interaction probe (routes with forms/CTAs)

```
12. After load settles, performance_start_trace: { reload: false, autoStop: false }
13. click primary CTA OR fill first form field (click/fill tools)
14. performance_stop_trace → save to traces/loop-<n>-<route>-inp.json.gz
15. Record INP / long task from interaction trace
```

#### Reduced motion

```
16. emulate + navigate with initScript OR evaluate_script to set matchMedia override
17. Re-run smoke: page renders, no errors, CLS = 0
```

#### Screenshots

```
18. take_screenshot → .planning/res-performance/screenshots/<route>-loop-<n>-390.png
```

---

### 5C. CLI Lighthouse protocol (independent cross-check)

```bash
npm run build && npm run start
# separate terminal:
npx lighthouse http://localhost:3000<route> \
  --preset=perf \
  --form-factor=mobile \
  --screenEmulation.mobile=true \
  --throttling-method=simulate \
  --output=json,html \
  --output-path=.planning/res-performance/lighthouse/loop-<n>-<route-slug>
```

Record scores in `04b-LIGHTHOUSE.md`. This must **agree within tolerance** with Chrome MCP trace (§5D).

---

### 5D. Triangulation rules (conflict resolution)

| Metric | MCP trace | CLI Lighthouse | Max allowed delta | If conflict |
| --- | --- | --- | --- | --- |
| LCP | primary | secondary | ±400 ms | Trust MCP LCPBreakdown; re-run both cold-cache |
| FCP | primary | secondary | ±300 ms | Check render-blocking in network waterfall |
| CLS | either | either | ±0.02 | Trust whichever caught layout shift; fix shift |
| Performance score | N/A from MCP | required | ≥ 90 | Fix until CLI ≥ 90; MCP trace must show green LCP/INP |
| INP | primary (interaction trace) | TBT as proxy | — | Fix long tasks MCP names |

Unresolved conflict → **REJECTED**, not APPROVED. Log in `04-TRIANGULATION.md`.

---

### 5E. Executable gates (every loop)

**Build gates (sequential):**

| # | Gate | Command / MCP | Pass |
| --- | --- | --- | --- |
| 1 | Lint | `npm run lint` | exit 0 |
| 2 | Build | `npm run build` | exit 0 |
| 3 | Route 200 | HTTP 200 or `navigate_page` succeeds | 200 |

**Primary lab gates (parallel — ALL required):**

| # | Gate | Tool | Pass |
| --- | --- | --- | --- |
| 4 | Chrome perf trace | MCP `performance_start_trace` @ mobile Slow 4G CPU×4 | LCP ≤ 2500 ms, CLS ≤ 0.1, trace saved |
| 5 | Chrome LCP breakdown | MCP `performance_analyze_insight` LCPBreakdown | LCP element identified + optimized |
| 6 | Chrome network audit | MCP `list_network_requests` | no P0 render-blockers documented |
| 7 | CLI Lighthouse mobile | `npx lighthouse …` | performance ≥ 90 |
| 8 | CLI CWV | lighthouse JSON | FCP ≤ 1800 ms, LCP ≤ 2500 ms, TBT ≤ 300 ms |
| 9 | Bundle | `npm run analyze` | no chunk > 250 kb gzip unjustified |
| 10 | Triangulation | agent `04-TRIANGULATION.md` | no unresolved conflicts |
| 11 | force-dynamic | grep route | P0 if unjustified |
| 12 | Regression screenshot | MCP `take_screenshot` @ 390px | file exists |

**Confirmatory gates (post-deploy — do NOT block loop iteration):**

| # | Gate | Source | Pass |
| --- | --- | --- | --- |
| 13 | PSI production | `PSI_API_KEY=… npm run psi` | performance ≥ 90 |
| 14 | Vercel route RES | Speed Insights dashboard | trend ≥ baseline + 15 pts |
| 15 | Vercel global RES | Speed Insights | trend toward ≥ 95 |
| 16 | PostHog vitals | `web_vital` event median | LCP/INP trending down |

Checker reports without on-disk trace/json/network artifacts are **invalid**.

---

## 6. AGENT PROMPTS

### 6a. Diagnostician

```
Role: RES Diagnostician for route: <PATH>
Read §5A–§5E and vercel-react-best-practices.

Tasks:
1. Map route → src/app/.../page.tsx + layout + client islands.
2. Run Chrome MCP protocol (§5B): emulate mobile Slow 4G CPU×4 → trace → LCPBreakdown insight.
3. Run CLI Lighthouse (§5C) independently — do not skip because MCP ran.
4. Run list_network_requests — top 10 assets by weight + render-blocking flags.
5. List LCP element (selector + asset URL + size + loading strategy) from MCP LCPBreakdown.
6. List top 5 long tasks / main-thread sources from trace insights.
7. Flag anti-patterns (force-dynamic, barrel imports, client-wrapped page, etc.).
8. Diff vs benchmark /about-us using same MCP protocol on both URLs.

Emit 03-ROUTE-<slug>-DIAGNOSIS.md with P0/P1/P2 + links to saved trace/json files.
Do not implement fixes.
```

### 6b. Performance Builder

```
Role: Performance Builder for route: <PATH>
Read diagnosis file. Fix P0 only this loop.

Apply vercel-react-best-practices in priority order (§3).
Allowed techniques:
- Promise.all / parallel server fetches
- React.cache() for deduped Sanity fetches
- next/dynamic with route-matched skeleton bg
- next/image priority + sizes + fetchPriority on LCP
- Remove force-dynamic → ISR revalidate or static where content allows
- Defer PostHog/GA/Speed Insights impact (afterInteractive / dynamic import)
- Split GSAP/motion below fold via dynamic()
- Suspense boundaries for non-LCP sections

Forbidden:
- Deleting content or CTAs to score
- Global layout hacks that break other routes
- Disabling analytics entirely without user approval
- picture-only fixes with no measured improvement

Emit 04-BUILD-<slug>.md: files changed, expected metric delta, risks.
Run npm run lint && npm run build — must pass.
```

### 6c. Chrome MCP Performance Agent

```
Role: Chrome MCP Performance Agent.
Server: user-chrome-devtools (read tool schemas before calling).

Execute §5B protocol on <URL>. Save artifacts:
- traces/loop-<n>-<slug>.json.gz
- 04a-CHROME-TRACE.md

Record:
- LCP ms + element (from LCPBreakdown insight)
- FCP, CLS from trace insight sets
- INP ms from interaction trace (if applicable)
- Top 3 insights with performance_analyze_insight expansions
- Pass/fail vs gates 4–6

Score /10: LCP path, main-thread, network, caching.
List P0/P1 with insight names + evidence file paths.
Do NOT use lighthouse_audit for performance score.
```

### 6d. CLI Lighthouse Agent

```
Role: CLI Lighthouse Agent.
Run §5C npx lighthouse independently of MCP.

Save JSON + HTML to .planning/res-performance/lighthouse/loop-<n>-<slug>.*
Emit 04b-LIGHTHOUSE.md:
- performance, FCP, LCP, TBT, CLS, Speed Index
- top 3 opportunities from JSON
- Pass/fail vs gates 7–8
```

### 6e. Network Waterfall Agent

```
Role: Network Waterfall Agent.
Use MCP list_network_requests + get_network_request on heaviest assets.

Emit 04c-NETWORK.md:
- Total transfer size before FCP
- Render-blocking chain
- LCP resource timing (start, duration, priority)
- Third-party domains + weight
- Duplicate requests

Flag P0: render-blocking script > 50kb, LCP image without priority, font blocking.
```

### 6f. Bundle Checker

```
Role: Bundle Checker.
Run npm run analyze. Read .next/analyze output.

Emit 04d-BUNDLE.md (same content as before).
```

### 6g. Regression Checker

```
Role: Regression Checker.
MCP take_screenshot @ 390px. Verify nav, CTA, forms, no overflow.
Emit 04e-REGRESSION.md + screenshot path.
```

### 6h. Triangulation Agent

```
Role: Triangulation Agent.
Read 04a, 04b, 04c. Apply §5D tolerance table.

Emit 04-TRIANGULATION.md:
  sources: [chrome_mcp, cli_lighthouse, network]
  conflicts: [] | [{ metric, mcp, lighthouse, resolution }]
  verdict: ALIGNED | CONFLICT — if CONFLICT, Review must REJECT
```

### 6i. Review Agent

```
Role: RES Review Agent.
Read 04a–04h + 04-TRIANGULATION + inspect code diff.

APPROVED only if:
- ALL §5E primary lab gates (4–12) pass
- Triangulation verdict = ALIGNED
- Zero P0 open
- Artifacts exist on disk (trace + lighthouse json + screenshot)
- Benchmark routes not regressed (re-run MCP on /about-us if global layout changed)

Do NOT require Vercel RES for route APPROVED — lab proof is sufficient for loop iteration.

Emit 05-REVIEW.md:
  verdict: APPROVED | REJECTED
  chrome_trace: { lcp_ms, fcp_ms, cls, inp_ms }
  lighthouse: { performance, fcp_ms, lcp_ms, tbt_ms, cls }
  triangulation: ALIGNED | CONFLICT
  next_route: <path>
```

---

## 7. ROUTE-SPECIFIC PLAYBOOK (START HERE)

Known codebase signals — verify and fix in diagnosis:

### `/case-studies` (RES 34) — P0

**File:** `src/app/case-studies/page.tsx`

- `export const dynamic = "force-dynamic"` → **P0**: disables static/ISR; forces SSR every request. Replace with `revalidate = 3600` or tag-based revalidation unless draft preview requires dynamic.
- Parallel fetches already use `Promise.all` ✅ — keep.
- Client carousel/listing likely heavy → dynamic import + LCP = first visible card image with `priority`.

### `/case-studies/[slug]` (RES 53, 1.8K visits) — P0

- Audit composer layouts vs lightweight `/case-studies/preview` (RES 97).
- Defer below-fold GSAP/ScrollTrigger.
- Sanity presentation query: minimize serialized props to client.
- Preload LCP hero image; avoid client-only hero shell.

### `/` (RES 62) — P0

**File:** `src/app/home-page.tsx`

- Many `dynamic()` imports ✅ — verify skeletons match bg (no flash).
- `TransferredSoftreeHero` pinned scroll + GSAP → defer init until hero in view or after LCP.
- `layout.tsx` fetches design tokens every request — cache with `React.cache()` ✅ pattern if not already.
- Third-party: PostHog + GA + Speed Insights in layout — defer non-critical init.

### `/contact` (RES 33) — P0

- Likely heavy form client bundle + maps/embeds.
- Server-render static shell; dynamic import form validation only on interaction.

### `/blog/[slug]` (RES 48) — P1

- Mirror `/about-us` patterns (RES 97).
- Static generation where possible; optimize portable text renderer bundle.

### Global layout (`src/app/layout.tsx`)

- `fetchDesignTokens()` on every layout render — ensure cached + not blocking LCP.
- `@vercel/speed-insights/next` — keep (negligible).
- PostHog web-vitals capture — ensure it does not block main thread (already in useEffect ✅).

---

## 8. FIX PATTERN LIBRARY (METRIC → ACTION)

### LCP fixes

| Pattern | Rule ID | Example |
| --- | --- | --- |
| LCP image priority | rendering-* | `<Image priority fetchPriority="high" sizes="…" />` |
| Remove loader blanking | awwwards LCP law | No `opacity:0` on LCP text without loader duplicate |
| Static/ISR | server-* | Remove `force-dynamic`; add `revalidate` |
| Preconnect CDN | advanced-* | `<link rel="preconnect" href="cdn.sanity.io" />` |
| Font subset | rendering-* | `next/font` with subset, display swap |

### FCP fixes

| Pattern | Rule ID |
| --- | --- |
| Stream with Suspense | `async-suspense-boundaries` |
| Parallel server fetch | `server-parallel-fetching` |
| Defer analytics | `bundle-defer-third-party` |
| Cut initial client JS | `bundle-dynamic-imports` |

### INP fixes

| Pattern | Rule ID |
| --- | --- |
| Split heavy handlers | `rerender-defer-reads` |
| Passive scroll listeners | `client-passive-event-listeners` |
| Defer GSAP below fold | `bundle-conditional` |
| Virtualize long lists | `rendering-virtualize` |
| Reduce hydration | `server-serialization` |

---

## 9. SCORING (10/10 MODE)

| Dimension | Weight | 10/10 requires |
| --- | ---: | --- |
| Chrome MCP trace (LCP/INP/CLS) | 30% | LCP ≤ 1800 ms, INP ≤ 150 ms, CLS = 0 |
| CLI Lighthouse mobile | 25% | ≥ 95 |
| Network discipline | 15% | No P0 render-blockers; LCP preloaded |
| Bundle discipline | 15% | No unjustified mega-chunks |
| Triangulation | 10% | ALIGNED, no conflicts |
| Vercel RES (confirmatory) | +bonus | ≥ 95 global post-deploy |

**Route approved:** §5E primary gates pass + triangulation ALIGNED + Review APPROVED.  
**Program complete:** all P0 routes lab-approved + Vercel RES ≥ 95 (field confirmatory).

---

## 10. ARTIFACT TREE

```
.planning/res-performance/
  00-RES-LOOP-SUPER-PROMPT.md
  01-BASELINE-SNAPSHOT.md
  loop-state.json
  02-LOOP-<n>-RES.md
  03-ROUTE-<slug>-DIAGNOSIS.md
  04-BUILD-<slug>.md
  04a-CHROME-TRACE.md          ← MCP performance trace + insights
  04b-LIGHTHOUSE.md            ← CLI lighthouse JSON scores
  04c-NETWORK.md               ← MCP network waterfall
  04d-BUNDLE.md
  04e-REGRESSION.md
  04-TRIANGULATION.md          ← cross-source agreement
  05-REVIEW.md
  06-RES-VERIFICATION.md       ← lab + field (Vercel/PostHog/PSI)
  07-ESCALATION.md
  traces/loop-<n>-<slug>.json.gz
  lighthouse/loop-<n>-<slug>.{json,html}
  lighthouse-mcp/loop-<n>/     ← a11y/SEO from lighthouse_audit MCP
  screenshots/
  bundle/loop-<n>/
```

---

## 11. MEASUREMENT PROTOCOL (MULTI-SOURCE)

### Every loop — primary (before merge)

**1. Chrome DevTools MCP** (mandatory first — §5B)  
**2. CLI Lighthouse** (mandatory second — §5C)  
**3. Triangulation** (§5D)  
**4. Bundle analyze**

```bash
npm run lint && npm run build && npm run start
# MCP agents run in parallel with:
npx lighthouse http://localhost:3000<route> --preset=perf --form-factor=mobile \
  --output=json,html --output-path=.planning/res-performance/lighthouse/loop-<n>-<slug>
npm run analyze
```

### After local pass — production cross-check

```bash
PSI_API_KEY=<key> PSI_SITE_BASE=https://softreetechnology.com npm run psi
npm run audit:site   # unlighthouse full site sweep (milestone only)
```

Re-run Chrome MCP against production URL to confirm deploy matches local lab.

### Field confirmatory (after deploy — does NOT block loop)

| Source | How | Record in |
| --- | --- | --- |
| Vercel Speed Insights | Dashboard → Routes → RES | `06-RES-VERIFICATION.md` |
| PostHog | `web_vital` events by `page` path | `06-RES-VERIFICATION.md` |
| PSI production | `npm run psi` on live URLs | `06-RES-VERIFICATION.md` |

Wait **72 hours** or **1,000+ new data points** before declaring global RES target met.

**10/10 lab approval does NOT require Vercel RES during active loops.**  
**10/10 program complete requires both lab proof AND field confirmation trending to target.**

---

## 12. CORRECTION PRIORITY

| Level | Examples |
| --- | --- |
| **P0** | RES-blocking: `force-dynamic` on high-traffic listing, LCP hidden, 500kb+ client bundle on route, main-thread block > 500 ms at load |
| **P1** | Missing `sizes`, serial Sanity fetches, non-priority LCP image, heavy below-fold not deferred |
| **P2** | Micro tree-shaking, prefetch tuning, image format upgrade |

Fix all P0 before P1. Max one route's P0 set per builder pass.

---

## 13. ANTI-PATTERNS (AUTO-REJECT)

- Approving from **Vercel RES alone** without Chrome MCP trace + CLI Lighthouse
- Using **`lighthouse_audit` MCP for performance score** (it excludes perf by design)
- Skipping **`performance_analyze_insight`** when LCPBreakdown is flagged
- Skipping **mobile Slow 4G + CPU×4 emulation** (93% India traffic)
- Raising scores without trace/json/screenshot artifacts on disk
- Fixing RES by removing Speed Insights or analytics without approval
- `force-dynamic` added without revalidation strategy
- Optimizing `/studio` routes as marketing pages
- Breaking `/about-us` benchmark to fix another route
- Desktop-only Lighthouse (must be mobile + MCP mobile viewport)
- Infinite loops without updating `blocker_history`
- Triangulation CONFLICT marked APPROVED anyway

---

## 14. QUICK INVOKE

Tell the orchestrator:

```
Run RES performance loop until 10/10.
Read .planning/res-performance/00-RES-LOOP-SUPER-PROMPT.md
Use Chrome DevTools MCP (performance_start_trace) + CLI Lighthouse + triangulation.
Do NOT rely on Vercel RES alone — Vercel is confirmatory after deploy.
Start route /case-studies/[slug]. Mobile Slow 4G CPU×4 every trace.
Mode: TEN_OUT_OF_TEN. Max 12 loops.
```

Shorter:

```
RES loop — Chrome MCP trace + Lighthouse + bundle. Not Vercel-only. Start P0 routes.
```

---

## 15. DEFINITION OF DONE

The loop engine is **DONE** when:

1. `loop-state.json` → all P0 routes `status: "approved"`
2. Every approved route has on disk:
   - `traces/loop-*-<slug>.json.gz` (Chrome MCP)
   - `lighthouse/loop-*-<slug>.json` (CLI)
   - `04-TRIANGULATION.md` verdict = ALIGNED
3. `06-RES-VERIFICATION.md` documents:
   - Lab: Chrome MCP LCP ≤ 1.8 s, CLI Lighthouse ≥ 95 on all P0 routes
   - Field (confirmatory): Vercel RES trending ≥ 95 global, P0 routes ≥ 90
   - PostHog/PSI cross-check where available
4. `npm run lint` + `npm run build` pass
5. Benchmark routes `/about-us` and `/case-studies/preview` still pass MCP + Lighthouse
6. Zero open P0/P1 in final review

**During active loops:** lab approval (MCP + Lighthouse + triangulation) is sufficient to proceed.  
**Program complete:** requires field confirmation too.

Until then: **keep looping**.

---

## 16. EXTEND PSI SCRIPT (BUILDER TASK)

Update `scripts/psi-check.mjs`:

```js
const PAGES = [
  { path: "/", label: "Homepage" },
  { path: "/case-studies", label: "Case Studies" },
  { path: "/case-studies/preview", label: "CS Preview (benchmark)" },
  { path: "/about-us", label: "About Us (benchmark)" },
  { path: "/contact", label: "Contact" },
  { path: "/blog", label: "Blog" },
];

const THRESHOLDS = {
  performance: 90,  // TEN_OUT_OF_TEN mode
  accessibility: 90,
  seo: 90,
  "best-practices": 90,
};
```

Commit with first loop that touches performance infra.
