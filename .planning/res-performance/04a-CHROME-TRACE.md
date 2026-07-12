# Loop 1 — Chrome DevTools MCP traces (PRIMARY lab evidence)

**Env:** local prod (`npx next start -p 3100`) · mobile 390×844×3 · **Slow 4G** · **CPU ×4**
**Tool:** `user-chrome-devtools` `performance_start_trace` (reload+autoStop)
**Artifacts:** `traces/loop-1-case-studies-slug.json.json.gz`, `traces/loop-1-contact.json.json.gz`

> Field CrUX: n/a for these URLs (localhost). Compare to Vercel RES baseline: `/case-studies/[slug]` 53, `/contact` 33.

---

## Route: `/case-studies/ai-shipment-delay-prediction-platform`  (P0 #1)

| Metric | Value | Gate | Verdict |
|---|---:|---:|---|
| **LCP** | **7,238 ms** | ≤2,500 | ❌ FAIL (2.9×) |
| — TTFB | 1,440 ms (19.9%) | — | high |
| — **Render delay** | **5,798 ms (80.1%)** | — | ❌ dominant |
| CLS | 0.00 | ≤0.1 | ✅ |

**LCP element:** a **text `<span>`** (italic serif subtitle, `nodeId 77`, class `mt-1 block font-serif … italic … text-[#141414]/88`) — **not an image**. Text LCP with 80% render delay ⇒ the element is gated on **client JS hydration**, confirming the `"use client"` full-page renderer (`CaseStudyPageRenderer.tsx:1`).

**Top insights (with est. savings):**
- `DocumentLatency` → FCP/LCP **−1,327 ms** (server response + text compression on the HTML doc).
- `RenderBlocking` → FCP/LCP **−939 ms**: render-blocking CSS = **2× `fonts.googleapis.com`** (Inter; Fraunces+IBM Plex) + 3 local CSS. Fonts are VeryHigh priority, ~2 s each cold on Slow 4G.
- `ForcedReflow`, `ThirdParties` present (secondary).

**Fixes (evidence-backed):**
1. **Server-render the hero** (eyebrow + title + the LCP subtitle span + hero image) as an RSC; mount client islands only for animated/interactive sections → collapses the 5.8 s render delay. *(P0)*
2. **Self-host fonts via `next/font`**, remove `@import` from `globals.css:1` → removes render-blocking external font requests (−939 ms). *(P0, global)*
3. Enable text compression / check HTML doc latency (DocumentLatency −1,327 ms). *(P1)*

---

## Route: `/contact`  (P0, worst public RES 33)

| Metric | Value | Gate | Verdict |
|---|---:|---:|---|
| **LCP** | **7,767 ms** | ≤2,500 | ❌ FAIL (3.1×) |
| — TTFB | 772 ms (10%) | — | ok |
| — **Render delay** | **6,995 ms (90%)** | — | ❌ dominant |
| CLS | 0.00 | ≤0.1 | ✅ |

TTFB is fine (772 ms) — the entire loss is **render delay**, i.e. the whole page is `"use client"` (`contact/page.tsx:1`) so nothing above the fold is in the server HTML.

**Extra insight:** `DOMSize` (large DOM) + `ForcedReflow` → main-thread cost. `RenderBlocking` only −15 ms here (fonts warm from prior nav; still −939 ms on a cold first visit).

**Fixes:**
1. **Convert page shell to Server Component**; keep `ContactHub` (form + Calendly) + map as client islands; **server-render `ContactHero`** headline (the LCP text). *(P0)*
2. Lazy-mount Calendly on interaction/visibility (defer third party). *(P1)*
3. Reduce DOM size of hero/hub. *(P2)*

---

## Cross-route conclusion (verified)

The RES problem on the worst routes is **not caching and not images** — it is **client-side rendering of above-the-fold content** (render delay = 80–90% of a ~7.5 s LCP), compounded by a **global render-blocking font `@import`**. 

**Two fixes address most of the loss sitewide:**
- **A. `next/font` self-hosting** (remove `globals.css` `@import`) — global, ~−939 ms FCP/LCP, low risk.
- **B. Server-render hero/above-the-fold** on the client-only routes (`/case-studies/[slug]`, `/contact`, and audit `/`, `/case-studies` listing) — kills the multi-second render delay.

CLS is already 0.00 everywhere measured — do not regress it.

## Gates status (this loop)
- ✅ build (exit 0), ✅ lint, ✅ Chrome MCP trace (2 P0 routes, artifacts saved)
- ⏭ CLI Lighthouse cross-check, network waterfall detail, bundle analyze, remaining routes (`/`, `/case-studies` listing, `/blog/[slug]`, services)
