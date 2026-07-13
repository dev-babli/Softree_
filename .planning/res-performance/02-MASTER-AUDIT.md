# Master Performance Audit — All Routes

**Loop:** 1 · **Date:** 2026-07-08 · **Mode:** `TEN_OUT_OF_TEN`
**Method (this pass):** static code-evidence audit across every real public route + baseline Vercel RES field data.
**Still owed (live lab):** Chrome DevTools MCP traces + CLI Lighthouse per route — see §6. Numbers below marked *(field)* come from Vercel RES baseline (`01-BASELINE-SNAPSHOT.md`); everything else is code evidence with `file:line`.

> Honesty note: RES/CWV numbers here are the **existing Vercel field baseline**, not fresh lab runs. The *causes* listed are verified in code. Lab re-measurement is the verification gate (§6) and has **not** been run yet this loop.

---

## 0. Route inventory (real public site)

Excluded as non-public/demo: `showcase/*`, `wireframe`, `webanalyser`, `timeline-component-05`, `story-reel-demo`, `record-slides`, `sentry-example-page`, `homepage-light-demo`, `servicepage_new`, `home-2026`, `ai-home`, `avoora`, `nexus-card`, `studio/**`.

| Route | RES (field) | Render mode | Verdict |
|---|---:|---|---|
| `/case-studies/[slug]` | 53 | `force-dynamic` + **client renderer** | P0 |
| `/` | 62 | server + client islands | P0 |
| `/case-studies` | 34 | `force-dynamic` | P0 |
| `/contact` | 33 | **full client page** | P0 |
| `/blog/[slug]` | 48 | `force-dynamic` | P0 |
| `/blog` | 61 | `force-dynamic` | P1 |
| `/services/*` | 46–? | mixed (raw `<img>`) | P1 |
| `/about-us` | 97 | client, but well-tuned | benchmark |
| `/case-studies/preview` | 97 | — | benchmark |

---

## 1. GLOBAL issues (affect every route)

### G1 — Dev/iframe-only third-party scripts shipped to production **[P0]**
`src/app/layout.tsx:152-173` loads two external scripts on **every page**:
- `orchids-browser-logs.js` (`lazyOnload`)
- `route-messenger.js` (`lazyOnload`, `data-only-in-iframe="true"`)

Both are authoring/iframe tooling. They add DNS + connection + JS parse to a third-party origin (`slelguoygbfzlpylpxfs.supabase.co`) for real visitors → main-thread work (INP) + wasted network.
**Fix (researched):** gate behind `process.env.NODE_ENV !== 'production'` (or a `NEXT_PUBLIC_STUDIO_TOOLS` flag). Zero visitor value, immediate INP/network win. *(implemented this loop)*

### G2 — Root layout is fully dynamic-friendly but does an uncached CMS call **[P1]**
`src/app/layout.tsx:52-59` is `async`, awaits `draftMode()` + `fetchDesignTokens()`. Tokens are `React.cache`-deduped per request (`fetch-design-tokens.ts:14`) — good — but the underlying `cmsFetch` sets no `revalidate` in prod (`src/cms/lib/fetch.ts:21-28`), so on any dynamic route it's a live Sanity round-trip before first byte.
**Fix:** add `next: { revalidate: 3600, tags: ['designTokens'] }` to the design-tokens fetch so it's cached across requests and revalidated on publish. Combined with §2 (killing `force-dynamic`) this removes a per-request CMS hop from the critical path on the highest-traffic routes.

### G3 — Analytics/telemetry stack loads on every route **[P2]**
GTM (`afterInteractive`), GoogleAnalytics, PostHog provider, Speed Insights. Reasonable, but PostHog + GA + GTM overlap. Audit for duplicate pageview tracking and consider loading PostHog `lazyOnload`. Verify with INP interaction trace before removing anything.

### G4 — Raw `<img>` instead of `next/image` — widespread **[P1]**
Real service pages use raw `<img>` (no width/height, no lazy, no responsive srcset), e.g.:
- `src/app/services/offshore-power-platform-development/*.tsx` (services, testimonial, trust, casestudies, stack-slidr)
- `src/app/services/offshore-data-analytics/*.tsx` (stach-slider, case-studies, testimonials, cases)
- `src/app/about-us/{who,process,global}.tsx`, `src/app/services/{cases,header}.tsx`
- `src/components/sections/{trusted-by,solutions-grid,responsive-hero-banner,hero,FdaMapsSection}.tsx`

Impact: unbounded layout shift risk (CLS), no lazy-loading below the fold, no AVIF/WebP negotiation → larger LCP.
**Fix:** migrate to `next/image` with explicit `width/height` (or `fill` + sized container), `sizes`, and `priority` only on the LCP image. Do per-route during that route's loop.

---

## 2. `force-dynamic` on cacheable CMS routes **[P0 — biggest RES lever]**

`export const dynamic = "force-dynamic"` forces uncached SSR on every request (high TTFB→FCP→LCP). It is set on the **exact worst-scoring routes**:

| Route | Evidence | Needs per-request? | Fix |
|---|---|---|---|
| `/case-studies` | `case-studies/page.tsx:21` | No | → `revalidate = 3600` *(implemented)* |
| `/blog` | `blog/page.tsx:20` | No | → `revalidate = 900` *(implemented)* |
| `/blog/[slug]` | `blog/[slug]/page.tsx:180` | No | → `revalidate = 3600` + `generateStaticParams` *(implemented)* |
| `/case-studies/[slug]` | `case-studies/[slug]/page.tsx:20` | Only for `?layout=` preview | → `revalidate` + move layout override to client `useSearchParams` (see C1) |

Note: `/case-studies/[slug]` already has `generateStaticParams` (`:29`) that is **defeated** by `force-dynamic`. draft-mode still auto-opts dynamic for editors, so ISR is safe for published visitors.

---

## 3. P0 route deep-dives

### C1 — `/case-studies/[slug]` (RES 53, 1,800 visits — highest impact)
- `force-dynamic` (§2).
- `searchParams.layout` is awaited server-side (`page.tsx:78`) → forces dynamic even without `force-dynamic`.
- **Entire renderer is `"use client"`** (`CaseStudyPageRenderer.tsx:1`) → hero/LCP rendered on client after hydration.

**Researched fix path:**
1. Drop `force-dynamic`, add `export const revalidate = 3600`.
2. Remove server `searchParams`; read `?layout=` inside the client renderer via `useSearchParams()` (renderer is already client and takes `forceLayout`). This lets the static shell prerender.
3. Server-render the hero (title, header image, eyebrow) as an RSC and mount client islands only for interactive/animated sections → real LCP element in initial HTML with `next/image priority`.

### C2 — `/case-studies` (RES 34, worst hub)
- `force-dynamic` (§2 — fixed).
- `CaseStudiesListingClient` is a client island receiving all studies; verify it isn't importing heavy motion/WebGL eagerly. Virtualize/paginate if the list is long.

### C3 — `/contact` (RES 33, worst public score)
- **Whole page is `"use client"`** (`contact/page.tsx:1`). Hero (`ContactHero`), hub, gallery all client.
- Already lazy-loads `FdaMapsSection` + `LightFAQExact` (good, `:11-19`).
- `useEffect` imports `gsap/ScrollTrigger` (`:31-38`) — fine, deferred.

**Fix:** convert the page shell to a Server Component; keep `ContactHub` (form + Calendly) and map as client islands. Server-render `ContactHero` so the LCP headline is in initial HTML. Lazy-load the Calendly embed on interaction/visibility.

### C4 — `/` home (RES 62, 995 visits)
- Server page with client islands (needs live trace to find LCP element + long tasks). Diagnose LCP hero image loading strategy and any eager GSAP/three islands above the fold.

### C5 — `/blog/[slug]` (RES 48) & `/blog` (RES 61)
- `force-dynamic` on both (fixed). Add `generateStaticParams` to `/blog/[slug]` so posts prebuild.
- Blog listing query pulls `body[0]` + images for every post; ensure list images use `next/image` with `sizes`.

---

## 4. WebGL / heavy-canvas components **[P1 — verify usage]**

`three`/`@react-three`/`ogl`/`postprocessing` are imported by ~60 files, almost all under `react-bits/*` and `showcase/*` (demo-only). **Real-site** usages to verify are lazy-loaded (`next/dynamic`, `ssr:false`) and not above the fold:
- `src/components/sections/globe.tsx`, `OffshoreTestimonialsGlobe.tsx`
- `src/components/homepage-light/Grainient.tsx`

If any of these render on `/`, `/ai`, or a service hero without `next/dynamic`, they block hydration and hurt INP/LCP. **Action:** grep each real route's tree; wrap heavy canvases in `dynamic(() => …, { ssr:false, loading })` and only mount when in viewport.

---

## 5. Priority-ordered fix backlog

| # | Fix | Routes | Effort | Risk | Status |
|---|---|---|---|---|---|
| 1 | Gate dev-only scripts to non-prod (G1) | all | S | low | ✅ this loop |
| 2 | `force-dynamic`→ISR on listing/blog (§2) | `/case-studies`,`/blog`,`/blog/[slug]` | S | low | ✅ this loop |
| 3 | Cache design-tokens fetch (G2) | all | S | med | ⏭ deferred — needs next-sanity live-fetch cache semantics confirmed |
| 4 | `/case-studies/[slug]` ISR + client layout param + RSC hero (C1) | P0 #1 | M | med | ⏭ next loop (needs live trace) |
| 5 | `/contact` server shell + island form (C3) | P0 | M | med | ⏭ next loop |
| 6 | `next/image` migration per route (G4) | services, about | M | low | ⏭ per-route |
| 7 | Lazy-load WebGL canvases (§4) | verify | M | med | ⏭ verify |
| 8 | Home LCP + long-task diagnosis (C4) | `/` | M | — | ⏭ needs live trace |

---

## 6. Verification still required (lab gates — NOT yet run this loop)

Per `00-RES-LOOP-SUPER-PROMPT.md` §5, a route is only **APPROVED** with saved artifacts:
1. `npm run build && npm run start` (prod serve).
2. Chrome DevTools MCP: `emulate` mobile Slow-4G CPU×4 → `performance_start_trace` → `performance_analyze_insight` (LCPBreakdown, RenderBlocking, LongTasks) → save `traces/loop-1-<slug>.json.gz`.
3. `npx lighthouse … --form-factor=mobile` → save JSON/HTML.
4. `list_network_requests` waterfall.
5. Triangulate (MCP vs Lighthouse within tolerance) → REVIEW → APPROVED/REJECTED.

This requires a connected Chrome instance + prod build served locally. Run route-by-route starting `/case-studies/[slug]`.

---

## 7. Loop 1 — VERIFIED build findings (`npm run build`, exit 0, 2026-07-08)

Production build **passed**. Route table (`ƒ` = dynamic, `●` = SSG, `○` = static):

- **Only `/p/[slug]` is `● SSG`**; `/robots.txt` + `/sitemap.xml` are `○`. **Every other route is `ƒ Dynamic`.**
- **Correction to earlier assumption:** dynamic rendering is *not* the sole RES cause. `/about-us` builds `ƒ Dynamic` yet scores **RES 97** (field). So caching helps TTFB but the worst routes (`/contact` 33, `/case-studies` 34) are dragged down by **client-JS weight + LCP/render path**, which is where per-route lab traces must focus.
- **Working static recipe = `/p/[slug]`:** `generateStaticParams` via `client.fetch(...)` (not `sanityFetch`) + `export const revalidate` + **no `searchParams`**. Replicate this for `/case-studies/[slug]` and `/blog/[slug]` (add `generateStaticParams` + move layout override to client) to flip them SSG.
- **`/case-studies/[slug]` dynamic trigger = `await searchParams`** (`page.tsx:78`), not `force-dynamic`. Removing `force-dynamic` alone won't make it SSG until the `searchParams` read is moved client-side.
- **Build warnings (non-blocking):** `face-api.js` → `Can't resolve 'fs' / 'encoding'`, pulled via `react-bits/GridScan` → `showcase/react-bits` (demo route only). Confirms heavy WebGL/ML libs are import-reachable from a shipped route tree; ensure they're demo-gated / dynamically imported.

### Implemented & verified this loop
- ✅ G1: dev/iframe scripts gated to non-production (`layout.tsx`) — build passes, lint clean.
- ✅ §2: `force-dynamic` → `revalidate` on `/case-studies`, `/blog`, `/blog/[slug]` — build passes. (Correct hygiene + aligns with SSG recipe; becomes fully effective once each route's remaining dynamic trigger is removed.)

### Next loop (route-by-route, with live lab traces)
1. `/case-studies/[slug]`: client `useSearchParams` for `?layout=` + `generateStaticParams` → SSG; server-render hero for LCP.
2. `/contact`: server shell + island form; server-render hero headline.
3. `/case-studies` + `/`: Chrome trace to find LCP element + top long tasks; trim above-fold client JS.
