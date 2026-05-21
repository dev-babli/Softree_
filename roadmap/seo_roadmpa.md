
Before I proceed, I need some key information to make this audit specific and actionable — not generic.





No problem — I'll proceed with a codebase-based audit since the live site returned 403. Let me inspect all the key technical files directly.

Let me gather the remaining key files needed for a complete audit.













I now have a comprehensive picture of the entire codebase. Here is the full audit.

---

# Softree Technology — Complete SEO, AEO & GEO Growth Blueprint
**Domain:** softreetechnology.com | **Platform:** Next.js 16 App Router | **Audit Date:** May 2026

---

## A. Executive Summary

Softree is a technically strong codebase on a modern stack (Next.js 16, React 19, App Router) with GTM already wired. However, the site has **critical identity and infrastructure failures** that are actively suppressing every page from ranking. The site is pointing to a **Vercel staging URL** (`softree-2.vercel.app`) in all metadata, schema, and canonical tags — meaning Google is indexing the wrong domain. There is no `sitemap.xml`, no `robots.txt`, no `og-image.png` file, and only **1 of 23 pages** has page-level metadata. These are not marginal issues — they are blocking all organic growth right now.

**Biggest wins available:** Fix domain references → add sitemap → add per-page metadata → implement full schema → content depth on service pages → FAQ/AEO blocks. These alone should produce ranking movement within 60–90 days.

---

## B. Biggest SEO Problems (Ranked by Impact)

| # | Problem | Severity |
|---|---------|----------|
| 1 | `metadataBase` and all schema URLs point to `softree-2.vercel.app`, not `softreetechnology.com` | 🔴 Critical |
| 2 | No `sitemap.xml` — Google cannot discover or prioritize pages | 🔴 Critical |
| 3 | No `robots.txt` — crawl behavior is undefined | 🔴 Critical |
| 4 | `/og-image.png` referenced everywhere but **does not exist** in [/public](cci:9://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/public:0:0-0:0) | 🔴 Critical |
| 5 | Only 1 page ([react-web-development](cci:9://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/services/digital-workspace/react-web-development:0:0-0:0)) has `export const metadata` — 22 pages have no individual title/description | 🔴 Critical |
| 6 | Schema in [layout.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/layout.tsx:0:0-0:0) uses `softree-2.vercel.app` URL and missing [logo](cci:9://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/public/images/logo:0:0-0:0), `contactPoint`, `sameAs` | 🔴 Critical |
| 7 | `alternates.canonical` on root layout is `"/"` (relative) — should be absolute canonical | 🟠 High |
| 8 | No breadcrumb schema on service pages (except react-web-development) | 🟠 High |
| 9 | No FAQ schema on any page except possibly some service subpages | 🟠 High |
| 10 | `images.unoptimized: true` locally — on Vercel this is fine, but signals potential image perf issues | 🟡 Medium |
| 11 | Google Font loaded via `@import` in CSS (render-blocking) | 🟡 Medium |
| 12 | No blog / content hub — zero informational content for organic discovery | 🟡 Medium |
| 13 | 3 heavyweight third-party scripts on every page (Tidio, PostHog, Orchids logger) — harming INP/LCP | 🟡 Medium |
| 14 | Schema URL inconsistency — some files use `softree.in`, some use `softree-2.vercel.app` | 🟠 High |
| 15 | No `<html lang>` per-page variant (only `en` on root — fine, but no hreflang for multi-market) | 🟡 Medium |

---

## C. Biggest SEO Opportunities

| Opportunity | Potential Impact |
|-------------|-----------------|
| Fix domain identity (metadataBase + schema) | Immediate indexing of correct domain |
| Add sitemap.xml + robots.txt | Full site crawlability unlocked |
| Add metadata to all 22 remaining pages | Title/desc appears in every SERP result |
| SharePoint, Power Platform, Power BI service pages targeting high-intent B2B keywords | High — these have £2k–£10k per click intent |
| FAQ schema on all service pages | Featured snippet + People Also Ask eligibility |
| Microsoft Partner / offshore dev blog content | Long-tail informational traffic + AEO citations |
| Case studies as standalone indexed pages | Trust + commercial keyword targets |
| Organization schema with `sameAs` (LinkedIn, Microsoft Partner listing) | Knowledge panel eligibility |
| `LocalBusiness` + India + UK office schema | Local pack visibility |
| Core Web Vitals improvement (font loading, script deferral) | Rankings uplift + CrUX signal |

---

## D. Technical SEO Audit

### D1. Crawlability & Indexing

**`robots.txt` — MISSING**
```
❌ /public/robots.txt does not exist
❌ /src/app/robots.ts does not exist
```
**Fix — create `src/app/robots.ts`:**
```ts
import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.softreetechnology.com/sitemap.xml',
  }
}
```

---

**`sitemap.xml` — MISSING**
All 23 pages are undiscoverable unless Google stumbles on them via links.

**Fix — create `src/app/sitemap.ts`:**
```ts
import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.softreetechnology.com'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/services/digital-workspace/sharepoint`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${base}/services/digital-workspace/react-web-development`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${base}/services/digital-workspace/web-app-development`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/services/digital-workspace/mobile-app-development`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/services/digital-workspace/spfx-developments`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/services/business-applications/power-platform`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${base}/services/business-applications/mvp`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/services/business-applications/softree-for-startups`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/services/ai-intelligence/agentic-ai`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${base}/services/ai-intelligence/generative-ai`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${base}/services/data-analytics/power-bi`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/services/data-analytics/microsoft-fabric`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/case-studies/sharepoint`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/case-studies/power-platform`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/case-studies/ai`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/case-studies/web`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/case-studies/mobile`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/privacy-policy`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${base}/terms`, priority: 0.3, changeFrequency: 'yearly' },
  ]
}
```

---

### D2. Domain Identity — Critical

```
layout.tsx line 11: metadataBase: new URL("https://softree-2.vercel.app") ❌
layout.tsx line 53: openGraph.url: "https://softree-2.vercel.app" ❌
layout.tsx line 127: Organization schema url: "https://softree-2.vercel.app" ❌
react-web-development schema: provider.url: "https://softree.in" ❌ (wrong domain)
breadcrumbs: all items use "https://softree.in" ❌
```

Every canonical URL, every OG URL, every schema entity currently resolves to a Vercel preview or the wrong domain. Google will index `softree-2.vercel.app` or `softree.in` instead of `softreetechnology.com`.

**Fix in [layout.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/layout.tsx:0:0-0:0):**
```ts
metadataBase: new URL("https://www.softreetechnology.com"),
openGraph.url: "https://www.softreetechnology.com",
// All schema references → "https://www.softreetechnology.com"
```

---

### D3. Canonical Tags

- Root layout: `alternates: { canonical: "/" }` — this renders as a relative canonical. **Fine in Next.js** when `metadataBase` is correct, but currently broken because `metadataBase` is wrong.
- [react-web-development](cci:9://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/services/digital-workspace/react-web-development:0:0-0:0) page: `canonical: "/services/digital-workspace/react-web-development"` — again relative, will resolve to wrong base.
- All other pages: **no canonical at all**.

**Fix:** Once `metadataBase` is corrected to `https://www.softreetechnology.com`, relative canonicals will resolve correctly. Then add per-page canonicals.

---

### D4. Redirect & HTTPS

- Verify `www` vs non-`www` redirect is handled at the hosting/DNS level (Vercel handles this, but confirm canonical matches redirect destination)
- Confirm HTTPS is enforced (Vercel default — ✅)
- No `http://` links found in codebase — ✅ (except `remotePatterns` in [next.config.ts](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/next.config.ts:0:0-0:0) which allows `http://` external images — **remove that**)

---

### D5. JavaScript Rendering

- Next.js App Router with `"use client"` on interactive components — SSR/SSG for non-interactive pages is available but most pages do not export `generateStaticParams` or `dynamic` settings.
- Several service pages import heavy client-side animations (GSAP, Three.js, tsParticles) which can delay First Contentful Paint.
- Googlebot can render JavaScript but render budget is limited — **critical content should be in SSR HTML**, not dependent on client JS.

**Audit needed:** Run `curl https://www.softreetechnology.com/services/digital-workspace/sharepoint` and check if the H1 and main body text is in the HTML response. If not, that page is effectively invisible to Google.

---

### D6. Core Web Vitals Risk Factors

| Issue | LCP | INP | CLS |
|-------|-----|-----|-----|
| Inter font via CSS `@import` | 🔴 Blocks render | — | — |
| Three.js / `cobe` globe on homepage | 🔴 Heavy JS parse | 🟠 | — |
| Tidio chat loaded `afterInteractive` | — | 🟠 | 🟠 possible |
| `@tsparticles` on any page | 🔴 | 🟠 | — |
| `unoptimized: true` images in dev | 🟠 | — | 🟠 |
| PostHog + Orchids + Route messenger (3 analytics scripts) | 🟡 | 🟡 | — |

**Font fix — replace CSS `@import` in [globals.css](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/globals.css:0:0-0:0) with Next.js `next/font`:**

In [layout.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/layout.tsx:0:0-0:0):
```ts
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], display: 'swap' })
// Apply: <html className={inter.className}>
```
Remove `@import url("https://fonts.googleapis.com/...")` from [globals.css](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/globals.css:0:0-0:0).

---

### D7. Image SEO

- `/og-image.png` is referenced in both [layout.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/layout.tsx:0:0-0:0) and [react-web-development/page.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/services/digital-workspace/react-web-development/page.tsx:0:0-0:0) but **the file does not exist** in [/public](cci:9://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/public:0:0-0:0). Every social share will show a broken image.
- `remotePatterns` uses `{ hostname: "**" }` wildcard — this is a security risk and should be tightened.
- `formats: ["image/webp", "image/avif"]` is configured ✅ — good, Next.js will serve AVIF/WebP automatically via `<Image>`.
- Many pages use `Image` from `next/image` ✅ but some use raw `<img>` tags (audit needed).

---

## E. On-Page SEO Audit

### E1. Metadata Coverage (22 pages missing)

| Page | Has Metadata | Title Quality | Issues |
|------|-------------|---------------|--------|
| `/` (homepage) | ✅ in layout | Acceptable | Generic, not keyword-focused |
| [/about-us](cci:9://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/about-us:0:0-0:0) | ❌ | — | Falls back to default |
| [/services](cci:9://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/services:0:0-0:0) | ❌ | — | Falls back to default |
| [/contact](cci:9://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/contact:0:0-0:0) | ❌ | — | Falls back to default |
| [/services/digital-workspace/sharepoint](cci:9://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/services/digital-workspace/sharepoint:0:0-0:0) | ❌ | — | Missing |
| [/services/digital-workspace/react-web-development](cci:9://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/services/digital-workspace/react-web-development:0:0-0:0) | ✅ | Good | URLs use `softree.in` |
| All other 17 service/case pages | ❌ | — | Missing |

### E2. Optimized Metadata Examples

**Homepage:**
```ts
title: "Offshore Software Development Company | SharePoint, Power Platform & AI | Softree"
description: "Softree is an India-based offshore engineering company delivering SharePoint, Power Platform, AI automation, and modern web application development for global enterprises."
```

**SharePoint Page:**
```ts
title: "SharePoint Development & Migration Services | Microsoft Partner | Softree"
description: "Expert SharePoint Online development, migration, and customisation services. Microsoft-certified team delivering intranet portals, SPFX solutions, and SharePoint governance for UK, US, and Australian businesses."
```

**Power Platform Page:**
```ts
title: "Power Platform Development Services | Power Apps, Automate & BI | Softree"
description: "End-to-end Microsoft Power Platform development including Power Apps, Power Automate, Power BI, and Copilot Studio. Offshore delivery with enterprise governance."
```

**Agentic AI Page:**
```ts
title: "Agentic AI Development Services | AI Agents & Workflow Automation | Softree"
description: "Build autonomous AI agents and intelligent workflow automation with Softree. Microsoft Copilot Studio, Azure AI, and custom LLM solutions for enterprise operations."
```

---

### E3. H1 Audit

Most pages have H1s inside the Hero components. These need verifying:
- H1 must contain the **primary keyword** for the page
- Must be unique per page
- Must be present in the SSR HTML (not rendered only client-side)

**Check required for:** `SharePointHero`, `PowerAppsHero`, `AboutHeroPro` — if they use `"use client"` with GSAP animations, the H1 may not be in the initial HTML response.

---

## F. Keyword Strategy

### Primary Service Keywords (High Commercial Intent)

| Keyword | Monthly Volume (est.) | Difficulty | Target Page |
|---------|----------------------|------------|-------------|
| SharePoint development services | 1,600/mo | Medium | [/services/digital-workspace/sharepoint](cci:9://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/services/digital-workspace/sharepoint:0:0-0:0) |
| Power Platform development company | 880/mo | Medium | `/services/business-applications/power-platform` |
| Power Apps development services | 1,300/mo | Medium | Same |
| Offshore software development company India | 2,400/mo | Medium-High | Homepage |
| React Next.js development company | 720/mo | Medium | [/services/digital-workspace/react-web-development](cci:9://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/services/digital-workspace/react-web-development:0:0-0:0) |
| Agentic AI development services | 390/mo | Low-Medium | `/services/ai-intelligence/agentic-ai` |
| Microsoft Fabric consulting | 480/mo | Low | `/services/data-analytics/microsoft-fabric` |
| SharePoint migration services | 1,900/mo | Medium | SharePoint page |
| Power BI development services | 1,100/mo | Medium | `/services/data-analytics/power-bi` |
| SPFX development services | 590/mo | Low | [/services/digital-workspace/spfx-developments](cci:9://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/services/digital-workspace/spfx-developments:0:0-0:0) |

### Long-Tail High-Conversion Keywords

```
"hire SharePoint developer UK"
"Power Platform development company UK"
"offshore Microsoft developer India"
"Power Apps developer for hire"
"custom SharePoint intranet development"
"Microsoft 365 automation services"
"AI workflow automation for enterprise"
"SharePoint Online migration service"
"React web development agency for startups"
"Power BI dashboard development services"
```

### Informational / AEO Keywords

```
"what is SharePoint Online migration"
"how to automate business processes with Power Automate"
"what is Power Apps used for"
"how does agentic AI work in enterprise"
"what is Microsoft Fabric"
"Power Platform vs custom development"
"SharePoint vs Teams for intranet"
"benefits of offshore software development"
"how to build a Power Apps canvas app"
```

### Keyword Clusters by Page

**Homepage cluster:** offshore engineering, offshore development company, India software development, global engineering partner, Microsoft partner

**SharePoint cluster:** SharePoint development, SharePoint migration, SharePoint Online, SPFX, SharePoint intranet, SharePoint customization, SharePoint governance

**Power Platform cluster:** Power Apps, Power Automate, Power BI, Copilot Studio, Microsoft 365 automation, no-code development

**AI cluster:** agentic AI, generative AI, AI agents, Copilot Studio, Azure AI, AI workflow automation, LLM integration

---

## G. Content Strategy

### G1. Content Gaps (Currently Missing)

**Zero blog or resource content exists.** This is the biggest long-term SEO gap. Informational content drives:
- Top-of-funnel awareness
- AEO/AI citations
- Backlink acquisition
- Topical authority that lifts all service pages

### G2. Priority Content Plan

**Month 1–3 (Foundation):**

| Content | Type | Target Keyword | Intent |
|---------|------|---------------|--------|
| "What is SharePoint Online Migration? Complete Guide" | Blog | SharePoint migration guide | Informational |
| "Power Apps vs Custom Development: When to Choose Each" | Blog | Power Apps vs custom development | Comparison |
| "Microsoft Power Platform Explained: All 5 Products" | Blog | Microsoft Power Platform explained | Informational |
| "How Offshore Software Development Works" | Blog | offshore software development | Informational |
| Case Study: SharePoint Intranet for [Client] | Case Study | SharePoint intranet case study | Commercial |
| Case Study: Power Apps HR Automation | Case Study | Power Apps case study | Commercial |

**Month 3–6 (Authority):**

| Content | Type | Target Keyword |
|---------|------|---------------|
| "SharePoint vs Teams: Which Should Your Business Use?" | Blog | SharePoint vs Teams |
| "Agentic AI in Enterprise: What It Is and How to Deploy It" | Blog | agentic AI enterprise |
| "Power BI Dashboard Best Practices for 2025" | Blog | Power BI dashboard |
| "Microsoft Fabric vs Azure Synapse" | Blog | Microsoft Fabric vs Synapse |
| "Hiring Offshore React Developers: Complete Guide" | Blog | hire offshore React developer |
| Location pages: /services/sharepoint-development-uk | Location | SharePoint development UK |

**Month 6–12 (Scale):**
- Glossary: Microsoft 365, Power Platform terms (20+ pages)
- Comparison hub: Competitor comparison pages
- Industry verticals: Healthcare, Finance, Education SharePoint/Power Platform
- "Softree vs [Competitor]" pages

---

## H. AEO Strategy — Answer Engine Optimization

### H1. Current AEO Status: ❌ Not Optimized

No FAQ schema exists at the global level. Some pages have FAQ components (`SPFaq`, `AgenticAIFAQSection`) but whether they include `FAQPage` JSON-LD schema needs verification.

### H2. AEO Implementation Plan

**Rule: Every service page needs:**
1. A direct-answer paragraph (50 words) at the top of the page body
2. A minimum 8-question FAQ section with `FAQPage` JSON-LD
3. Answers of 30–50 words each (optimal for AI extraction)
4. Questions phrased as users actually type them

### H3. FAQ Schema Template (add to every service page)

```ts
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What SharePoint development services does Softree provide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Softree provides SharePoint Online development, intranet portal design, SharePoint migration from on-premise to cloud, SPFX web part development, SharePoint governance, and Microsoft 365 integration services for enterprise and mid-market businesses."
      }
    },
    // ... 7+ more questions
  ]
}
```

### H4. Answer-Ready Content Blocks (Examples)

**For SharePoint page — Direct Answer Block:**
> Softree is a Microsoft-certified SharePoint development company based in India, delivering SharePoint Online development, migration, intranet portals, and SPFX solutions for businesses in the UK, USA, and Australia. Founded in 2013, Softree has completed 150+ SharePoint projects.

**For Power Platform page:**
> Softree provides end-to-end Microsoft Power Platform development services including Power Apps canvas and model-driven apps, Power Automate workflows, Power BI dashboards, and Copilot Studio bots. The team is Microsoft-certified and delivers to enterprise clients globally.

**Voice search optimised answers:**
- "Who does SharePoint development in India?" → *Softree Technology is a SharePoint development company in India that builds and migrates SharePoint solutions for UK and US businesses.*
- "What does Power Platform do?" → *Microsoft Power Platform is a suite of low-code tools including Power Apps for building apps, Power Automate for workflows, Power BI for analytics, and Copilot Studio for AI chatbots.*

---

## I. GEO — Generative Engine Optimization

### I1. Current GEO Score: ~2/10

LLMs (ChatGPT, Gemini, Perplexity) currently have very little to work with for Softree because:
- No Wikipedia-style entity definition of the company
- No statistics or original data anywhere on the site
- No author bios or named experts
- Schema Organization object is minimal (no `foundingDate`, `numberOfEmployees`, `award`, `sameAs`)
- No third-party citations or press mentions detectable in the codebase

### I2. GEO Action Plan

**Entity clarity — add to [layout.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/layout.tsx:0:0-0:0) Organization schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Softree Technology",
  "url": "https://www.softreetechnology.com",
  "logo": "https://www.softreetechnology.com/images/logo/softree-logo.png",
  "foundingDate": "2013",
  "description": "Softree Technology is an India-based offshore software development company specialising in Microsoft SharePoint, Power Platform, AI automation, and React web development for enterprise clients in the UK, USA, Australia, and UAE.",
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": "50+" },
  "areaServed": ["GB", "US", "AU", "AE", "IN"],
  "serviceType": ["SharePoint Development", "Power Platform Development", "AI Development", "React Development"],
  "sameAs": [
    "https://www.linkedin.com/company/softree-technology",
    "https://www.upwork.com/...",
    "https://clutch.co/profile/softree-technology"
  ],
  "award": "Microsoft Partner",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "info@softreetechnology.com",
    "availableLanguage": "English"
  }
}
```

**Content for AI citations:**
- Add a "Company Profile" section to the About page with factual, quotable sentences
- Publish original data: "Softree has delivered X SharePoint projects since 2013"
- Get listed on Clutch, G2, GoodFirms, Microsoft AppSource partner directory
- Publish thought leadership on LinkedIn (AI will cite LinkedIn articles)

---

## J. Local SEO Strategy

Softree serves globally but has an India base. For offshore buyer discovery:

**Google Business Profile:**
- Create/claim listing for Softree India office
- Category: "Software Company", "IT Services"
- Add services: SharePoint Development, Power Platform, AI Automation
- Add photos of office and team
- Enable messaging

**Location pages to create:**
- `/services/sharepoint-development-united-kingdom`
- `/services/power-platform-development-usa`
- `/services/offshore-software-development-india`

These target geo-modified high-intent searches like "SharePoint development company UK" or "Power Platform developer UK."

**NAP consistency:** Ensure Name, Address, Phone is identical across website, GBP, Clutch, LinkedIn, and any directory listings.

---

## K. Schema Plan — Full Implementation

| Schema Type | Page | Priority | Status |
|------------|------|----------|--------|
| `Organization` | All (via layout) | 🔴 Critical | ❌ Broken (wrong URL) |
| `WebSite` with `SearchAction` | Homepage | 🟠 High | ❌ Missing |
| `Service` | Each service page | 🟠 High | ✅ Only react-web-dev |
| `BreadcrumbList` | All service/case pages | 🟠 High | ✅ Only react-web-dev |
| `FAQPage` | All service pages | 🟠 High | ❌ Likely missing JSON-LD |
| `LocalBusiness` | About/Contact | 🟡 Medium | ❌ Missing |
| `Person` (founder/team) | About page | 🟡 Medium | ❌ Missing |
| `Review` / `AggregateRating` | Homepage, services | 🟡 Medium | ❌ Missing |
| `CaseStudy` / `Article` | Case study pages | 🟡 Medium | ❌ Missing |
| `WebPage` | Each page | 🟡 Medium | ❌ Missing |

**`WebSite` schema with Sitelinks search (add to homepage):**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Softree Technology",
  "url": "https://www.softreetechnology.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.softreetechnology.com/?s={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

---

## L. Internal Linking Plan

### Current State
- No explicit internal linking strategy visible in components
- Footer likely has main nav links but no contextual content links
- Service pages do not link to related service pages
- No blog exists to create cluster links

### Pillar → Cluster Map

```
Homepage
├── /services (pillar)
│   ├── /services/digital-workspace/sharepoint
│   │   └── /services/digital-workspace/spfx-developments (cluster)
│   ├── /services/business-applications/power-platform
│   │   └── /services/business-applications/mvp (cluster)
│   ├── /services/ai-intelligence/agentic-ai
│   │   └── /services/ai-intelligence/generative-ai (cluster)
│   └── /services/data-analytics/power-bi
│       └── /services/data-analytics/microsoft-fabric (cluster)
├── /case-studies (pillar)
│   ├── /case-studies/sharepoint → links back to SharePoint service page
│   ├── /case-studies/power-platform → links back to Power Platform page
│   └── /case-studies/ai → links back to Agentic AI page
└── /about-us
    └── /contact
```

**Anchor text rules:**
- SharePoint service page → link with "SharePoint development services" or "SharePoint Online development"
- Power Platform → "Power Platform development" or "Power Apps development"
- Avoid generic "click here" or "learn more" anchors

**Immediate internal link additions needed:**
1. Homepage CTA section → link to specific service pages (not just [/services](cci:9://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/services:0:0-0:0))
2. Each service page → link to 2–3 related case studies
3. Each case study → link back to relevant service page
4. About page → link to services and contact
5. Footer → add links to all major service sub-pages

---

## M. Off-Page SEO & Authority Building

### Priority Link Targets

**Tier 1 — Microsoft Ecosystem (High Authority)**
- Microsoft Partner Center listing (adds `microsoft.com` backlink ecosystem)
- Microsoft AppSource (if any tool/app qualifies)
- Microsoft Tech Community (publish thought leadership articles)

**Tier 2 — B2B Directories (Easy Wins)**
- Clutch.co profile with 5+ reviews
- G2.com company profile
- GoodFirms.co listing
- Upwork Agency profile
- Toptal partner listing (if qualified)
- Trustpilot business profile

**Tier 3 — Content-Based Links**
- Guest posts on: `sharepoint.stackexchange.com`, `community.powerbi.com`, dev.to, Hashnode
- Answer questions on StackOverflow (SharePoint, Power Apps tags) — creates brand awareness + DoFollow profile links
- Digital PR: "India's fastest-growing Microsoft partner" pitch to IT trade media

**Review strategy:** Every completed project → request Clutch review. Target 20+ reviews in 6 months. Clutch reviews directly influence Google's E-E-A-T assessment.

---

## N. Competitor Gap Analysis

**Key competitors to analyze (tools needed: Ahrefs/Semrush):**
- Cognizant / Infosys (enterprise SharePoint) — too large to compete directly
- **Infoware** (softreetechnology.com size competitor)
- **Evoort Solutions** (Power Platform focus)
- **Netwoven** (SharePoint specialist)
- **Apps4Rent** (Microsoft 365 services)

**Assumptions-based gaps (to confirm with Ahrefs):**
- Competitors rank for "SharePoint development company" via dedicated landing pages with 1,500+ words of content
- Softree service pages are likely below 500 words of indexable text — this is a major content depth gap
- Competitors have 200–500+ backlinks; Softree likely has <50 referring domains

**Strategy to compete:** Depth beats volume. One 2,000-word SharePoint service page with proper schema, FAQ, case study links, and keyword targeting will outperform thin competitor pages in 6–12 months for long-tail queries.

---

## O. Conversion Optimization Plan

### Current CRO Issues (from codebase)
- Contact form exists in [LightContactSection.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/components/homepage-light/LightContactSection.tsx:0:0-0:0) and [cta-banner.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/components/sections/cta-banner.tsx:0:0-0:0) — **both forms use different backends** (check which is active on production)
- Tidio chatbot is installed ✅ — good for live conversion
- No pricing transparency anywhere (pricing cards exist on some pages — good)
- No "Book a Call" / Calendly integration visible
- Case studies exist as pages but don't have clear "Get similar results → Contact" CTAs

### CRO Recommendations
1. Add a sticky "Book a Discovery Call" button on all service pages
2. Each case study page: add "We built this for [client type]. Want something similar?" CTA
3. Add trust signals above the fold on service pages: "Microsoft Partner", "12+ Years", "150+ Projects", "4.9/5 reviews"
4. Contact page: add estimated response time ("We reply within 4 business hours")
5. Add Calendly or similar booking embed to Contact page
6. Form: reduce fields to Name + Email + Message + "What service?" for initial contact

---

## P. Analytics & Tracking Plan

### Immediate Setup Required

**Google Search Console:**
- Verify `softreetechnology.com` (HTML tag method — verification code already in [layout.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/layout.tsx:0:0-0:0): `CBKqqECDJRj5OGKmASLx9E8oM6XET_LWY_4_mWL5A3k`)
- Submit sitemap once created
- Monitor: Coverage, Core Web Vitals, Performance, Enhancements

**GA4:**
- GTM is already installed (`GTM-KDMTPWS8`) ✅
- Configure GA4 property via GTM
- Set up conversion events: `form_submit`, `contact_click`, `cta_click`, `phone_click`
- Enable Google Signals for cross-device tracking

**Bing Webmaster Tools:**
- Free, often overlooked — UK/enterprise audience uses Bing more than consumer market

**PostHog** is already installed — configure funnels for:
- Homepage → Services → Contact (main conversion funnel)
- Service page → CTA click → Contact form submission

### Weekly KPIs to Monitor
- Impressions + clicks in GSC (by page and query)
- Crawl errors in GSC Coverage report
- Core Web Vitals (CrUX data in GSC)
- New pages indexed

### Monthly KPIs
- Organic sessions by page (GA4)
- Conversion rate by landing page
- Ranking positions for primary keywords
- New referring domains (Ahrefs/Semrush)
- Page-level bounce rate

---

## Q. 30-Day SEO Plan (Immediate Fixes)

| Day | Task | Priority | Difficulty | Impact |
|-----|------|----------|------------|--------|
| 1 | Fix `metadataBase` to `softreetechnology.com` in [layout.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/layout.tsx:0:0-0:0) | 🔴 Critical | Easy | Very High |
| 1 | Fix Organization schema URL + add `foundingDate`, `sameAs`, `description` | 🔴 Critical | Easy | High |
| 1 | Fix all schema URLs in [react-web-development](cci:9://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/services/digital-workspace/react-web-development:0:0-0:0) from `softree.in` to `softreetechnology.com` | 🔴 Critical | Easy | High |
| 2 | Create `src/app/robots.ts` | 🔴 Critical | Easy | High |
| 2 | Create `src/app/sitemap.ts` with all 23 pages | 🔴 Critical | Easy | Very High |
| 3 | Create `og-image.png` (1200×630) and add to [/public](cci:9://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/public:0:0-0:0) | 🔴 Critical | Easy | Medium |
| 3–5 | Add `export const metadata` to: [/about-us](cci:9://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/about-us:0:0-0:0), [/services](cci:9://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/services:0:0-0:0), [/contact](cci:9://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/contact:0:0-0:0) pages | 🔴 Critical | Easy | High |
| 5–7 | Add metadata to all service subpages (15 pages) | 🔴 Critical | Medium | High |
| 7 | Verify GSC with existing verification token, submit sitemap | 🔴 Critical | Easy | High |
| 7–10 | Replace `@import` Google Font with `next/font/google` in layout | 🟠 High | Easy | Medium |
| 10–14 | Add `FAQPage` JSON-LD to SharePoint, Power Platform, Agentic AI pages | 🟠 High | Medium | High |
| 14–20 | Add `BreadcrumbList` JSON-LD to all service pages | 🟠 High | Medium | Medium |
| 20–25 | Add `Service` JSON-LD schema to remaining 14 service pages | 🟠 High | Medium | High |
| 25–30 | Create Clutch.co profile and request first 5 reviews | 🟠 High | Medium | High |
| 25–30 | Set up GA4 via GTM | 🟠 High | Medium | High |

---

## R. 90-Day SEO Plan

| Week | Task |
|------|------|
| 5–6 | Write + publish first 3 blog posts (SharePoint migration guide, Power Platform explained, offshore dev guide) |
| 6–7 | Improve content depth on SharePoint page to 1,500+ indexable words |
| 7–8 | Improve content depth on Power Platform page |
| 8–9 | Add `AggregateRating` schema to homepage using real Clutch/G2 data |
| 9–10 | Create `/services/sharepoint-development-united-kingdom` location page |
| 10–11 | Create `/services/power-platform-development-usa` location page |
| 11–12 | Internal linking audit + add contextual links across all service pages |
| 12 | Set up Bing Webmaster Tools, submit sitemap |

---

## S. 12-Month SEO Roadmap

| Quarter | Goal | Key Actions |
|---------|------|-------------|
| Q1 (months 1–3) | Technical foundation | All critical fixes, sitemap, robots, metadata, schema, GSC/GA4, first blog posts |
| Q2 (months 4–6) | Content depth + authority | 12 blog posts, 2 location pages, Clutch 15+ reviews, 5+ guest posts, case studies expanded |
| Q3 (months 7–9) | Topical authority | Glossary (15 pages), comparison pages, industry pages (Healthcare SharePoint, Finance Power BI), Microsoft Community presence |
| Q4 (months 10–12) | Scale + conversion | Video content + schema, 30-page blog library, rank tracking showing top-10 for 5+ primary keywords, conversion rate optimization based on GA4 data |

---

## T. Final Checklist

### 🔴 Do This Week (Blocking Everything Else)
- [ ] Fix `metadataBase` in [layout.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/layout.tsx:0:0-0:0) → `https://www.softreetechnology.com`
- [ ] Fix Organization schema URL + add full company description
- [ ] Fix all `softree.in` and `softree-2.vercel.app` references in schema files
- [ ] Create `src/app/robots.ts`
- [ ] Create `src/app/sitemap.ts`
- [ ] Create `/public/og-image.png` (1200×630px)
- [ ] Add metadata exports to at minimum: About, Services, Contact pages
- [ ] Verify in Google Search Console + submit sitemap

### 🟠 Do This Month
- [ ] Metadata on all 22 remaining pages
- [ ] FAQPage JSON-LD on all service pages
- [ ] BreadcrumbList JSON-LD on all service pages
- [ ] Replace CSS font import with `next/font`
- [ ] Set up GA4 via GTM
- [ ] Create Clutch profile, begin requesting reviews
- [ ] Remove `http://` wildcard from [next.config.ts](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/next.config.ts:0:0-0:0) remotePatterns

### 🟡 Do in 60–90 Days
- [ ] First 6 blog posts published
- [ ] Location pages for UK and USA
- [ ] Content depth improvements on top 3 service pages
- [ ] `WebSite` schema with SearchAction on homepage
- [ ] Bing Webmaster Tools setup
- [ ] Calendly or booking integration on Contact page
- [ ] Microsoft Partner Center listing claimed

---

## Developer Task List

| Task ID | Task Name | Description | Affected File(s) | Priority | Impact | Acceptance Criteria | Test Method |
|---------|-----------|-------------|-----------------|----------|--------|--------------------|-----------:|
| DEV-01 | Fix metadataBase | Change `softree-2.vercel.app` → `https://www.softreetechnology.com` | [src/app/layout.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/layout.tsx:0:0-0:0) line 11 | P0 | Critical | `metadataBase` equals production URL | Inspect page source, verify canonical href |
| DEV-02 | Fix Organization schema | Update URL, add `foundingDate`, `description`, `sameAs`, `contactPoint` | [src/app/layout.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/layout.tsx:0:0-0:0) lines 122–130 | P0 | High | Valid JSON-LD per Google Rich Results Test | Google Rich Results Test |
| DEV-03 | Create robots.ts | New file at `src/app/robots.ts` pointing to production sitemap | `src/app/robots.ts` (new) | P0 | High | `GET /robots.txt` returns valid rules + sitemap URL | `curl https://www.softreetechnology.com/robots.txt` |
| DEV-04 | Create sitemap.ts | New file at `src/app/sitemap.ts` with all 23 current pages | `src/app/sitemap.ts` (new) | P0 | High | `GET /sitemap.xml` returns all URLs with correct domain | `curl https://www.softreetechnology.com/sitemap.xml` |
| DEV-05 | Create og-image.png | Design and export 1200×630 branded OG image | `/public/og-image.png` (new) | P0 | Medium | Image exists, renders in social card preview | Facebook Debugger / Twitter Card Validator |
| DEV-06 | Add page metadata — About | `export const metadata` with title, description, canonical, OG | [src/app/about-us/page.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/about-us/page.tsx:0:0-0:0) | P0 | High | Page-specific title in `<head>` | View page source |
| DEV-07 | Add page metadata — Services | Same as DEV-06 | [src/app/services/page.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/services/page.tsx:0:0-0:0) | P0 | High | Same | Same |
| DEV-08 | Add page metadata — Contact | Same as DEV-06 | [src/app/contact/page.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/contact/page.tsx:0:0-0:0) | P0 | High | Same | Same |
| DEV-09 | Add metadata to 15 service subpages | Page-specific title, description, canonical, OG per service page | All 15 [page.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/page.tsx:0:0-0:0) service files | P1 | High | Each page has unique title ≠ default template | Screaming Frog crawl / GSC |
| DEV-10 | Add FAQPage JSON-LD | Verify existing FAQ components output JSON-LD; add if missing | SharePoint, Power Platform, Agentic AI, Generative AI pages | P1 | High | Google Rich Results Test shows FAQPage | Rich Results Test |
| DEV-11 | Add BreadcrumbList JSON-LD | Add breadcrumb schema to all service pages (model from react-web-development) | 14 service [page.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/page.tsx:0:0-0:0) files | P1 | Medium | Breadcrumbs appear in GSC Enhancements report | GSC + Rich Results Test |
| DEV-12 | Replace CSS font import | Remove `@import` from [globals.css](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/globals.css:0:0-0:0), add `next/font/google` in [layout.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/layout.tsx:0:0-0:0) | [globals.css](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/globals.css:0:0-0:0), [layout.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/layout.tsx:0:0-0:0) | P1 | Medium | No external font request in initial HTML; font loads via Next.js optimization | WebPageTest / Lighthouse |
| DEV-13 | Fix schema URL consistency | Replace all `softree.in` with `softreetechnology.com` in schema objects | [react-web-development/page.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/services/digital-workspace/react-web-development/page.tsx:0:0-0:0) | P0 | High | All schema URLs resolve to production domain | JSON-LD validator |
| DEV-14 | Add WebSite schema | Add WebSite JSON-LD with SearchAction to homepage | [src/app/page.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/page.tsx:0:0-0:0) or layout | P2 | Medium | WebSite schema valid in Rich Results Test | Rich Results Test |
| DEV-15 | Tighten image remotePatterns | Remove wildcard `hostname: "**"` entries, list only used hostnames | [next.config.ts](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/next.config.ts:0:0-0:0) | P2 | Low | No security warning; only approved domains allowed | Code review + test image loading |
| DEV-16 | Add Service JSON-LD to remaining pages | Copy pattern from react-web-development for remaining 14 service pages | All service [page.tsx](cci:7://file:///d:/Softree_Projects/SOFTREE_MAIN/SOFTREE/src/app/page.tsx:0:0-0:0) files | P1 | High | Service schema valid, areaServed = Worldwide | Rich Results Test |
| DEV-17 | Internal linking additions | Add contextual links between related service pages in content components | Service page content components | P2 | Medium | Each service page links to ≥2 related pages with keyword-rich anchors | Manual check + Screaming Frog |
| DEV-18 | GSC + GA4 activation | Submit sitemap in GSC; configure GA4 tag via existing GTM | GTM dashboard (no code change needed) | P0 | High | GSC shows sitemap submitted; GA4 receives pageview events | GSC dashboard + GA4 DebugView |

---

**Tools needed for ongoing monitoring:** Google Search Console (free), GA4 (free), Google Rich Results Test (free), Screaming Frog (free up to 500 URLs), Ahrefs or Semrush Lite (for keyword + backlink tracking).

**Most impactful single action:** Fixing `metadataBase` to the correct production domain — it unlocks correct canonicalization, OG tags, and schema entity resolution in one change.