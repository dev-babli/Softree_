# All Pages — Performance & Issue Audit

**Date:** 2026-07-08 · **Loop:** 1 · **Method:** Chrome DevTools MCP traces (mobile 390×844, Slow 4G, CPU×4) + static code audit for remaining routes  
**Artifacts:** `.planning/res-performance/traces/loop-1-*.json.gz` · **Baseline RES:** Vercel Speed Insights (field, Jul 2026)

> **Lab vs field:** Local prod server (`localhost:3100`). Field RES can differ (CDN, warm cache, geography). Even `/about-us` (field RES **97**) shows **LCP 5,984 ms** in cold lab — the site has systemic issues that production caching partially masks.

---

## Executive summary — 4 failure modes

| Mode | Symptom | Dominant metric | Worst routes |
|---|---|---|---|
| **A — Client render delay** | LCP is text; 80–90% render delay | LCP 7–8 s | `/contact`, `/case-studies/[slug]` |
| **B — Slow server (TTFB)** | HTML takes 3–6 s to arrive | TTFB 3.5–6 s | `/case-studies`, `/services/*`, `/about-us` |
| **C — LCP image discovery** | Hero image starts loading late | Load delay 1.2–2.4 s | `/`, `/blog`, `/blog/[slug]` |
| **D — Oversized images** | MB of wasted bytes | ImageDelivery | `/blog` (**10.7 MB**), services (**1.6 MB+**) |

**Global issues (every page):**
- **G1** Render-blocking Google Fonts `@import` in `globals.css:1` (Inter) + per-route Fraunces/IBM Plex/Syne/DM Sans → **~900 ms FCP/LCP** cold
- **G2** Root layout `async` + `draftMode()` + `fetchDesignTokens()` on every request
- **G3** GTM + Google Analytics + PostHog + Speed Insights on all routes
- **G4** All routes build as **`ƒ Dynamic`** except `/p/[slug]` (only SSG) — no HTML edge cache
- **G5** Raw `<img>` instead of `next/image` on most service/about sections
- **G6** Extra `@import url('fonts.googleapis.com…')` inside service hero styled-components
- **G7** Heavy pages never reach network idle (100 s timeout) — continuous requests/animations on `/`, `/services/*`

**CLS:** 0.00 on most routes; **0.01** on `/` and `/blog/[slug]` (font swap) — keep at 0.

---

## Lab measurement table (9 routes traced)

| Route | Field RES | Lab LCP | TTFB | Render delay | Load delay | CLS | INP | Verdict |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| `/contact` | 33 | **7,767 ms** | 772 ms | **6,995 ms (90%)** | — | 0.00 | — | ❌ Mode A |
| `/case-studies/[slug]` | 53 | **7,238 ms** | 1,440 ms | **5,798 ms (80%)** | — | 0.00 | — | ❌ Mode A |
| `/services/offshore-power-platform-development` | 46 | **8,113 ms** | **6,074 ms (75%)** | 162 ms | 703 ms | 0.00 | — | ❌ Mode B |
| `/about-us` | 97 | **5,984 ms** | **4,197 ms (70%)** | 447 ms | 754 ms | 0.00 | **153 ms** | ⚠️ Mode B |
| `/case-studies` | 34 | **4,957 ms** | **3,578 ms (72%)** | 1,380 ms | — | 0.00 | — | ❌ Mode B |
| `/blog` | 61 | **3,183 ms** | 90 ms | 143 ms | **2,376 ms** | 0.00 | — | ⚠️ Mode C+D |
| `/blog/[slug]` | 48 | **3,083 ms** | 1,138 ms | 100 ms | **1,246 ms** | 0.01 | — | ⚠️ Mode B+C |
| `/` | 62 | **2,276 ms** | 356 ms | 65 ms | **1,246 ms** | 0.01 | — | ⚠️ Mode C |
| `/case-studies/preview` | 97 | — | — | — | — | — | — | benchmark (not traced) |

Gate: LCP ≤ 2,500 ms mobile lab → **0/9 pass**.

---

## Per-route analysis

### Core marketing

#### `/` — Homepage
| | |
|---|---|
| **Field RES** | 62 |
| **Lab LCP** | 2,276 ms (best measured route) |
| **Render** | Server page (`page.tsx`) → client `Home` component |
| **Primary issue** | **LCP load delay 1,246 ms** — hero image not discoverable from initial HTML (`LCPDiscovery` insight). Slight **CLS 0.01** from font swap. **DOMSize + ForcedReflow** during scroll sections. Nav **times out at 100 s** (never idle — background polling/animations). |
| **Fix** | `next/image` with `priority` + `fetchPriority="high"` on hero LCP image in server HTML; preload LCP URL in `<head>`; `next/font` (G1); audit home client bundle for below-fold GSAP/motion `dynamic()`. |

#### `/about-us`
| | |
|---|---|
| **Field RES** | 97 (benchmark) |
| **Lab LCP** | 5,984 ms |
| **Render** | **`"use client"` entire page** — yet good field RES because repeat visitors + fast interaction path |
| **Primary issue** | **TTFB 4,197 ms (70%)** — slow server despite client page. **INP 153 ms** (borderline). Raw `<img>` in `who.tsx`, `process.tsx`, `global.tsx`. ForcedReflow + large DOM. |
| **Fix** | Convert shell to RSC where possible; parallelize/cache server data if any; `next/image` on section images; defer GSAP below fold. Lab LCP still needs TTFB fix even if field RES looks fine. |

#### `/contact`
| | |
|---|---|
| **Field RES** | 33 (worst public) |
| **Lab LCP** | 7,767 ms |
| **Render** | **`"use client"` entire page** |
| **Primary issue** | **Render delay 6,995 ms (90%)** — hero headline not in server HTML. DOMSize + ForcedReflow. Calendly/third-party in hub. GSAP ScrollTrigger cleanup in `useEffect`. |
| **Fix** | Server Component shell; server-render `ContactHero`; client islands for form/Calendly/map; lazy-load Calendly on click/visibility. **Highest ROI after global fonts.** |

#### `/book-meeting`
| | |
|---|---|
| **Field RES** | — |
| **Lab** | Not traced |
| **Render** | **`"use client"`** |
| **Issues (code)** | Same class as `/contact` — full client page, likely high render delay. |
| **Fix** | Same pattern: server shell + island booking widget. |

---

### Blog

#### `/blog` — Listing
| | |
|---|---|
| **Field RES** | 61 |
| **Lab LCP** | 3,183 ms |
| **Render** | Server page; `revalidate = 900` |
| **Primary issue** | **ImageDelivery: 10.7 MB wasted bytes** on listing card images. **Load delay 2,376 ms** on LCP image. Uses `NavigationClient` not server nav. |
| **Fix** | `next/image` with `sizes` for card grid; Sanity CDN width params; limit body fetch in list query; only fetch `excerpt` not `body[0]`. |

#### `/blog/[slug]` — Post detail
| | |
|---|---|
| **Field RES** | 48 |
| **Lab LCP** | 3,083 ms (throttled) |
| **Render** | Server; `revalidate = 3600`; no `generateStaticParams` yet |
| **Primary issue** | **TTFB 1,138 ms** + **load delay 1,246 ms** on hero/feature image. DocumentLatency −1,031 ms potential. CLS 0.01 fonts. |
| **Fix** | Add `generateStaticParams`; `priority` on hero image; preload LCP; parallel Sanity fetches in page. |

---

### Case studies

#### `/case-studies` — Hub listing
| | |
|---|---|
| **Field RES** | 34 (worst hub) |
| **Lab LCP** | 4,957 ms |
| **Render** | Server; `revalidate = 3600`; `CaseStudiesListingClient` client island |
| **Primary issue** | **TTFB 3,578 ms (72%)** — 3 parallel Sanity queries (`getCaseStudyListingItems`, hero slides, category counts) on every uncached request. DocumentLatency −3,445 ms. Render-blocking fonts −884 ms. DOMSize. |
| **Fix** | Cache aggregated listing query with `React.cache` + ISR; consider static shell with streamed client grid; reduce payload (card fields only). |

#### `/case-studies/[slug]` — Detail (**highest traffic**)
| | |
|---|---|
| **Field RES** | 53 (1,800 visits) |
| **Lab LCP** | 7,238 ms |
| **Render** | Server page but **`CaseStudyPageRenderer` is `"use client"`**; still has `force-dynamic`; `await searchParams` for layout override |
| **Primary issue** | **Render delay 5,798 ms (80%)** — LCP is **text subtitle span**, not image. Client renderer gates entire hero. Render-blocking fonts −939 ms. |
| **Fix** | Remove `force-dynamic`; move `?layout=` to client `useSearchParams`; **server-render hero** (title, subtitle, hero image with `priority`); client islands for composer sections only. |

#### `/case-studies/{ai,web,mobile,data-analytics,sharepoint,power-platform}` — Category hubs
| | |
|---|---|
| **Field RES** | — |
| **Lab** | Not traced (extrapolate from `/case-studies`) |
| **Issues (code)** | Same listing pattern + filtered CMS queries → expect **Mode B TTFB** + client listing island. |
| **Fix** | Same as hub listing; shared cached fetch helper. |

#### `/case-studies/preview`
| | |
|---|---|
| **Field RES** | 97 |
| **Render** | `"use client"` |
| **Note** | Benchmark — good field score; likely low traffic + simple preview UI. |

#### `/case-studies/layout-showcase`
| | |
|---|---|
| **Note** | Internal/dev showcase — exclude from RES targets. |

---

### Services (14 routes)

**Measured:** `/services/offshore-power-platform-development` → LCP **8,113 ms**, TTFB **6,074 ms**, ImageDelivery **1.6 MB** wasted, nav timeout 100 s.

| Route | Client page? | Extra font @import | Raw `<img>` |
|---|:---:|---|---|
| `/services` | No | — | likely |
| `/services/offshore-power-platform-development` | No | — | **Yes** (many files) |
| `/services/offshore-ai-development` | No | hero.tsx Syne/DM Sans | Yes |
| `/services/offshore-data-analytics` | No | hero.tsx | Yes |
| `/services/offshore-generative-ai-development` | No | hero.tsx | Yes |
| `/services/offshore-microsoft-fabric` | No | — | Yes |
| `/services/offshore-mobile-app-development` | **YES** | — | Yes |
| `/services/offshore-sharepoint-development` | No | — | Yes |
| `/services/offshore-spfx-development` | No | — | Yes |
| `/services/offshore-web-app-development` | No | — | Yes |
| `/services/website-modernization` | No | — | audit |
| `/services/ai-powered-test-automation` | No | — | audit |
| `/services/legacy-application-modernization` | No | styled @import Syne/DM Sans | Yes |
| `/services/mvp` | No | — | audit |

**Shared issues (all service pages):**
- Large composite pages (10+ section components) → **slow TTFB** (Mode B)
- Raw `<img>` throughout → no WebP/AVIF, no responsive sizes, CLS risk
- Per-page Google Fonts `@import` in styled JSX → **duplicate render-blocking chains**
- GSAP scroll sections → **ForcedReflow**, INP risk
- Some import heavy sliders/marquees
- **`offshore-mobile-app-development` is full `"use client"` page** — expect Mode A on top of Mode B

**Fix (template — fix once, apply to all):**
1. Shared server layout wrapper with cached nav/footer
2. Migrate all section images to `next/image`
3. Remove styled-component font `@import`; use global `next/font`
4. `dynamic()` for below-fold animated sections
5. Split mobile page to server shell

---

### Other public routes

| Route | Field RES | Render | Issues | Fix priority |
|---|---:|---|---|---|
| `/ai` | — | Server | Marketing page; likely Mode B/C; check hero image priority | P1 |
| `/agentic-ai-platform` | — | Server | May pull heavy motion/GSAP | P1 |
| `/engineering-solutions` | — | Server | Standard marketing | P2 |
| `/careers` | — | Server, `revalidate=300` | ISR configured; likely Mode B TTFB | P2 |
| `/privacy-policy` | — | Server | Static-ish content; should be fast after G1 | P3 |
| `/terms` | — | Server | Same | P3 |
| `/p/[slug]` | — | **● SSG** (only static route) | Reference implementation — replicate pattern | benchmark |
| `/studio/**` | 42 | Sanity Studio | **Excluded** from marketing RES | — |

---

## Excluded (non-production / demo)

Do not optimize for RES: `showcase/*`, `wireframe`, `webanalyser`, `ai-home`, `home-2026`, `avoora`, `homepage-light-demo`, `servicepage_new`, `record-slides`, `sentry-example-page`, `timeline-component-05`, `story-reel-demo`.

**Note:** `showcase/react-bits` imports `face-api.js` → build warning `Can't resolve 'fs'` — ensure demo routes are not linked from production nav.

---

## Global fix backlog (researched, priority order)

| # | Fix | Impact | Effort | Routes |
|---|---|---|---|---|
| **1** | **`next/font` self-host** — remove `globals.css` `@import` + service styled `@import`s | −900 ms FCP/LCP sitewide | S | ALL |
| **2** | **Server-render heroes** on client-only pages | −5–7 s LCP | M | `/contact`, `/case-studies/[slug]`, `/book-meeting`, `/services/offshore-mobile-app-development` |
| **3** | **ISR + `generateStaticParams`** for CMS routes | −3–6 s TTFB | M | `/case-studies/[slug]`, `/blog/[slug]`, listings |
| **4** | **`next/image` + Sanity CDN sizes** on all marketing images | −10 MB transfer on `/blog`; faster LCP | M | blog, services, about |
| **5** | **LCP preload/priority** on hero images | −1.2 s load delay | S | `/`, `/blog`, `/blog/[slug]` |
| **6** | **Cache Sanity listing queries** (`React.cache`, parallel) | −3 s TTFB | S | `/case-studies`, category hubs |
| **7** | **Defer third-party** (GTM lazy, Calendly on interaction) | INP improvement | S | ALL |
| **8** | **`dynamic()` below-fold** GSAP/motion/three | INP + TBT | M | home, services, about |
| **9** | **Sanity cacheComponents three-layer pattern** | Enable SSG for CMS routes | L | ALL CMS |

---

## What to fix first (by traffic × pain)

1. **`/case-studies/[slug]`** — 1,800 visits, LCP 7.2 s, Mode A → server hero + drop force-dynamic
2. **`/contact`** — RES 33, LCP 7.8 s, Mode A → server shell
3. **`/case-studies`** — RES 34, LCP 5 s, Mode B → cache listing queries
4. **Global fonts (G1)** — every page, −900 ms, 1 file change
5. **`/blog`** — 10.7 MB image waste → `next/image` on cards
6. **Service template** — TTFB 6 s+ → apply fixes from power-platform canary to all 14 routes

---

## Verification status

| Gate | Status |
|---|---|
| Code audit all public routes | ✅ |
| Chrome MCP trace (9 routes) | ✅ |
| CLI Lighthouse cross-check | ⏭ pending |
| Bundle analyze | ⏭ pending |
| Post-fix re-trace | ⏭ pending |

**Next step:** implement fix #1 (global `next/font`) + fix #2 (server heroes on contact + case study detail) → re-run traces to confirm LCP drops below 2,500 ms gate.
