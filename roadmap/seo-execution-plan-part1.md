# SEO, AEO & GEO Final Execution Plan — Part 1 of 2
**Softree Technology** | softreetechnology.com | Next.js 16 | May 2026

---

## 1. Executive Summary

The codebase is technically solid but **invisible to Google** due to 5 critical infrastructure failures:

1. `metadataBase` in `layout.tsx:11` = `softree-2.vercel.app` — Google indexes wrong domain
2. No `sitemap.xml` — all 23 pages undiscoverable
3. No `robots.txt` — crawl behaviour undefined
4. `/og-image.png` missing from `/public` — broken social cards everywhere
5. 22/23 pages have zero page-level metadata

Additional high-severity: Organization schema URL wrong; schema in `react-web-development` uses `softree.in` (third wrong domain); CSS `@import` font is render-blocking.

**Fix items 1–5 and you unlock the entire site for indexing. These are all <30-min developer tasks.**

---

## 2. Website Information

| Item | Details |
|------|---------|
| URL | https://www.softreetechnology.com |
| Business | Softree Technology |
| Type | Offshore B2B Software Development |
| Markets | UK, USA, Australia, UAE, India |
| Services | SharePoint, Power Platform, Agentic AI, Generative AI, React/Next.js, Fabric, Power BI, SPFX, Mobile |
| Platform | Next.js 16 App Router / Vercel |
| Analytics | GTM-KDMTPWS8 installed; GA4 NOT configured; GSC NOT verified |
| Competitors | Netwoven, Apps4Rent, Evoort Solutions, Infoware |

---

## 3. Current SEO Status

| Area | Status | Notes |
|------|--------|-------|
| Technical SEO | 🔴 Critical | Domain identity broken |
| Sitemap | 🔴 Missing | No `sitemap.ts` or `sitemap.xml` |
| Robots.txt | 🔴 Missing | No `robots.ts` or `robots.txt` |
| Canonical Tags | 🔴 Broken | `metadataBase` resolves to wrong domain |
| On-Page Metadata | 🔴 22/23 missing | Only `react-web-development` has metadata |
| Content / Blog | 🔴 None | Zero informational content exists |
| AEO / FAQPage | 🔴 Not confirmed | FAQ UI exists; JSON-LD not confirmed |
| Schema | 🟠 Broken | Organization schema wrong URL; incomplete |
| GEO / AI Search | 🟠 Poor | No entity signals; no citable content |
| Local SEO | 🟠 Missing | No GBP; no LocalBusiness schema |
| Internal Linking | 🟠 Not confirmed | No strategy implemented |
| Page Speed | 🟠 Risk | CSS `@import` font render-blocking; heavy JS |
| Image SEO | 🔴 og-image.png missing | Broken OG cards on all pages |
| Analytics | 🟠 Partial | GTM live; GA4 not set up; GSC not verified |
| Backlinks | ⚪ No data | Requires Ahrefs/Semrush access |

---

## 4. Completed Items

| Item | Evidence |
|------|----------|
| GTM installed (GTM-KDMTPWS8) | `layout.tsx:88–103` |
| PostHog session analytics | `PostHogProvider` in layout |
| HTTPS via Vercel | Default — no action needed |
| GSC verification token present | `layout.tsx:42` — token exists, property not yet verified |
| Tidio live chat | `layout.tsx:160–163` |
| `next/image` with WebP/AVIF | `next.config.ts` confirmed |
| `<html lang="en">` | `layout.tsx:86` |
| Metadata + Service + BreadcrumbList schema | `react-web-development/page.tsx` — template exists to replicate |
| FAQ UI components on some pages | `SPFaq`, `AgenticAIFAQSection` — JSON-LD not confirmed |
| Pricing cards on service pages | `HireSharePointPricing`, `HirePowerAppsPricing` |
| `robots: { index:true, follow:true }` | `layout.tsx:36–39` |

---

## 5. P0 Developer Tasks (Do This Week)

| Task ID | Task | File | Fix | Testing |
|---------|------|------|-----|---------|
| SEO-001 | Fix `metadataBase` | `layout.tsx:11` | `new URL("https://www.softreetechnology.com")` | Inspect `<link rel="canonical">` in source |
| SEO-002 | Fix OG URL | `layout.tsx:53` | `url: "https://www.softreetechnology.com"` | Facebook Debugger |
| SEO-003 | Fix Organization schema URL | `layout.tsx:127` | Replace `softree-2.vercel.app` with production URL | Rich Results Test |
| SEO-004 | Fix `softree.in` in schema | `react-web-development/page.tsx` | Replace all `softree.in` → `https://www.softreetechnology.com` | JSON-LD validator |
| SEO-005 | Create `robots.ts` | `src/app/robots.ts` (new) | See code below | `curl /robots.txt` |
| SEO-006 | Create `sitemap.ts` | `src/app/sitemap.ts` (new) | See code below | `curl /sitemap.xml` |
| SEO-007 | Create `og-image.png` | `/public/og-image.png` (new) | 1200×630 branded PNG | Facebook Debugger |
| SEO-008 | Metadata: About | `src/app/about-us/page.tsx` | `export const metadata: Metadata = {...}` | View page source `<title>` |
| SEO-009 | Metadata: Services | `src/app/services/page.tsx` | Same pattern | View page source |
| SEO-010 | Metadata: Contact | `src/app/contact/page.tsx` | Same pattern | View page source |
| SEO-011 | Metadata: 15 service pages | All service `page.tsx` files | Same pattern per page | Screaming Frog crawl |
| SEO-012 | Verify GSC | GSC dashboard | Use token in `layout.tsx:42` | GSC shows verified |
| SEO-013 | Submit sitemap | GSC → Sitemaps | `https://www.softreetechnology.com/sitemap.xml` | GSC Sitemaps report |

### `src/app/robots.ts`
```ts
import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/_next/'] },
    sitemap: 'https://www.softreetechnology.com/sitemap.xml',
  }
}
```

### `src/app/sitemap.ts`
```ts
import type { MetadataRoute } from 'next'
const B = 'https://www.softreetechnology.com'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: B, changeFrequency: 'weekly', priority: 1 },
    { url: `${B}/about-us`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${B}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${B}/contact`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${B}/services/digital-workspace/sharepoint`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${B}/services/digital-workspace/react-web-development`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${B}/services/digital-workspace/web-app-development`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${B}/services/digital-workspace/mobile-app-development`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${B}/services/digital-workspace/spfx-developments`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${B}/services/business-applications/power-platform`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${B}/services/business-applications/mvp`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${B}/services/business-applications/softree-for-startups`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${B}/services/ai-intelligence/agentic-ai`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${B}/services/ai-intelligence/generative-ai`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${B}/services/data-analytics/power-bi`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${B}/services/data-analytics/microsoft-fabric`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${B}/case-studies/sharepoint`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${B}/case-studies/power-platform`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${B}/case-studies/ai`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${B}/case-studies/web`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${B}/case-studies/mobile`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${B}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${B}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
```

---

## 6. Metadata Templates

### Homepage (`layout.tsx`)
```ts
title: { default: "Offshore Software Development Company | SharePoint, Power Platform & AI | Softree", template: "%s | Softree" },
description: "Softree is a Microsoft-certified offshore engineering company in India delivering SharePoint, Power Platform, AI automation, and React development for UK, USA, and Australian enterprises.",
```

### About Us
```ts
export const metadata: Metadata = {
  title: "About Softree Technology | Microsoft Partner Offshore Engineering",
  description: "Softree Technology is an India-based offshore software development company founded in 2013. 50+ engineers delivering SharePoint, Power Platform, and AI solutions globally.",
  alternates: { canonical: "/about-us" },
}
```

### SharePoint
```ts
export const metadata: Metadata = {
  title: "SharePoint Development & Migration Services | Microsoft Partner | Softree",
  description: "Expert SharePoint Online development, migration, intranet portals, and SPFX for UK, US, and Australian businesses. Microsoft-certified offshore team.",
  alternates: { canonical: "/services/digital-workspace/sharepoint" },
}
```

### Power Platform
```ts
export const metadata: Metadata = {
  title: "Power Platform Development Services | Power Apps, Automate & BI | Softree",
  description: "End-to-end Microsoft Power Platform development — Power Apps, Power Automate, Power BI, Copilot Studio. Offshore delivery with Microsoft certification.",
  alternates: { canonical: "/services/business-applications/power-platform" },
}
```

### Agentic AI
```ts
export const metadata: Metadata = {
  title: "Agentic AI Development Services | AI Agents & Workflow Automation | Softree",
  description: "Build autonomous AI agents with Microsoft Copilot Studio, Azure AI, and custom LLM solutions. Enterprise AI workflow automation for UK, USA, and Australia.",
  alternates: { canonical: "/services/ai-intelligence/agentic-ai" },
}
```

---

## 7. Schema Templates

### Organization (Replace in `layout.tsx`)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Softree Technology",
  "url": "https://www.softreetechnology.com",
  "logo": "https://www.softreetechnology.com/images/logo/softree-logo.png",
  "foundingDate": "2013",
  "description": "Softree Technology is an India-based offshore software development company specialising in Microsoft SharePoint, Power Platform, AI automation, and React web development for enterprise clients in the UK, USA, Australia, and UAE.",
  "areaServed": ["GB", "US", "AU", "AE", "IN"],
  "sameAs": [
    "https://www.linkedin.com/company/softree-technology",
    "https://clutch.co/profile/softree-technology"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "info@softreetechnology.com",
    "availableLanguage": "English"
  }
}
```

### FAQPage (SharePoint page example)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What SharePoint development services does Softree provide?",
      "acceptedAnswer": { "@type": "Answer", "text": "Softree provides SharePoint Online development, intranet portal design, SharePoint migration from on-premise to cloud, SPFX web part development, and Microsoft 365 integration for enterprise and mid-market businesses globally." }
    },
    {
      "@type": "Question",
      "name": "How long does a SharePoint migration take?",
      "acceptedAnswer": { "@type": "Answer", "text": "A SharePoint migration typically takes 4–12 weeks depending on content volume, site complexity, and integration requirements. Softree provides a free migration assessment with exact timelines." }
    },
    {
      "@type": "Question",
      "name": "Is Softree Technology a Microsoft Partner?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, Softree Technology is a Microsoft-certified partner with expertise in SharePoint, Power Platform, Azure, and Microsoft 365 services." }
    }
  ]
}
```

### BreadcrumbList (per service page)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.softreetechnology.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.softreetechnology.com/services" },
    { "@type": "ListItem", "position": 3, "name": "SharePoint Development", "item": "https://www.softreetechnology.com/services/digital-workspace/sharepoint" }
  ]
}
```

---

## 8. Keyword Map

| Keyword | Intent | Target Page | Priority |
|---------|--------|-------------|----------|
| offshore software development company India | Commercial | Homepage | 🔴 High |
| SharePoint development services | Commercial | SharePoint page | 🔴 High |
| SharePoint migration services | Commercial | SharePoint page | 🔴 High |
| Power Platform development company | Commercial | Power Platform page | 🔴 High |
| Power Apps development services | Commercial | Power Platform page | 🔴 High |
| agentic AI development services | Commercial | Agentic AI page | 🔴 High |
| hire SharePoint developer UK | Commercial | SharePoint + UK page | 🔴 High |
| Power Platform development UK | Commercial | UK location page | 🔴 High |
| React Next.js development company | Commercial | React Web Dev page | 🟠 High |
| Microsoft Fabric consulting | Commercial | Fabric page | 🟠 High |
| Power BI development services | Commercial | Power BI page | 🟠 High |
| SPFX development services | Commercial | SPFX page | 🟠 High |
| what is SharePoint Online migration | Informational | Blog | 🟡 Medium |
| Power Apps vs custom development | Comparison | Blog | 🟡 Medium |
| what is Microsoft Power Platform | Informational | Blog | 🟡 Medium |
| how does agentic AI work in enterprise | Informational | Blog | 🟡 Medium |
| SharePoint vs Teams for intranet | Comparison | Blog | 🟡 Medium |
| benefits of offshore software development | Informational | Blog | 🟡 Medium |

---

## 9. P1 Developer Tasks (Month 1)

| Task ID | Task | File | Priority |
|---------|------|------|----------|
| SEO-014 | Replace CSS `@import` font with `next/font/google` | `globals.css` + `layout.tsx` | 🟠 P1 |
| SEO-015 | Add `priority` prop to above-fold hero images | Hero components | 🟠 P1 |
| SEO-016 | Tighten `remotePatterns` — remove wildcard `**` | `next.config.ts` | 🟠 P1 |
| SEO-017 | FAQPage JSON-LD: SharePoint | `sharepoint/page.tsx` | 🟠 P1 |
| SEO-018 | FAQPage JSON-LD: Power Platform | `power-platform/page.tsx` | 🟠 P1 |
| SEO-019 | FAQPage JSON-LD: Agentic AI | `agentic-ai/page.tsx` | 🟠 P1 |
| SEO-020 | BreadcrumbList JSON-LD: all 14 remaining service pages | All service `page.tsx` | 🟠 P1 |
| SEO-021 | Service JSON-LD: all 14 remaining service pages | All service `page.tsx` | 🟠 P1 |
| SEO-022 | Audit H1 SSR presence on all service pages | Hero components | 🟠 P1 |
| SEO-023 | Configure GA4 tag in GTM dashboard | GTM (GTM-KDMTPWS8) | 🟠 P1 |
| SEO-024 | Expand Organization schema with full fields | `layout.tsx` | 🟠 P1 |

---

## 10. Content Plan

| Task ID | Content | URL | Keyword | Words | Priority |
|---------|---------|-----|---------|-------|----------|
| CW-001 | SharePoint Migration Complete Guide | `/blog/sharepoint-online-migration-guide` | SharePoint migration guide | 2,000+ | 🔴 High |
| CW-002 | Power Apps vs Custom Development | `/blog/power-apps-vs-custom-development` | Power Apps vs custom development | 1,500+ | 🔴 High |
| CW-003 | Microsoft Power Platform Explained | `/blog/microsoft-power-platform-explained` | Microsoft Power Platform explained | 1,500+ | 🔴 High |
| CW-004 | How Offshore Software Development Works | `/blog/how-offshore-software-development-works` | offshore software development | 1,500+ | 🔴 High |
| CW-005 | Agentic AI in Enterprise Guide | `/blog/agentic-ai-enterprise-guide` | agentic AI enterprise | 1,500+ | 🟠 High |
| CW-006 | SharePoint vs Teams for Intranet | `/blog/sharepoint-vs-teams-intranet` | SharePoint vs Teams | 1,200+ | 🟠 High |
| CW-007 | SharePoint Dev UK Location Page | `/services/sharepoint-development-united-kingdom` | SharePoint development company UK | 1,000+ | 🔴 High |
| CW-008 | Power Platform Dev USA Location Page | `/services/power-platform-development-usa` | Power Platform development USA | 1,000+ | 🟠 High |
| CW-009 | SharePoint Intranet Case Study | `/case-studies/sharepoint-intranet` | SharePoint intranet case study | 800+ | 🔴 High |
| CW-010 | Power Apps HR Automation Case Study | `/case-studies/power-apps-hr-automation` | Power Apps case study | 800+ | 🔴 High |
| CW-011 | SharePoint page FAQ (8 Q&As) | `/services/digital-workspace/sharepoint` | varies | 400 | 🟠 High |
| CW-012 | Power Platform page FAQ (8 Q&As) | `/services/business-applications/power-platform` | varies | 400 | 🟠 High |
| CW-013 | Expand SharePoint page body to 1,500+ words | `/services/digital-workspace/sharepoint` | SharePoint development services | 1,500+ | 🟠 High |
| CW-014 | About page company profile section (150 words) | `/about-us` | N/A | 150 | 🟠 High |

---

*Continued in Part 2: AEO blocks, GEO plan, Local SEO, Internal linking, CRO, Analytics, roadmaps, and final checklist.*
