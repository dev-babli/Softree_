# SEO, AEO & GEO Final Execution Plan — Part 2 of 2
**Softree Technology** | softreetechnology.com | May 2026

*Read Part 1 first: `seo-execution-plan-part1.md`*

---

## 11. AEO Execution Plan

### 11.1 Answer Blocks (Add to service pages above FAQs)

---

**Q: What SharePoint development services does Softree provide?**

**Short Answer (place at top of SharePoint page body):**
> Softree provides SharePoint Online development, intranet portal design, SharePoint migration from on-premise to cloud, SPFX web part development, and Microsoft 365 integration. The team is Microsoft-certified with 150+ SharePoint projects delivered for enterprise clients in the UK, USA, and Australia.

**Voice Search Version:**
> Softree is a Microsoft-certified SharePoint company in India that builds intranets, migrates SharePoint to the cloud, and develops SPFX solutions for UK and US businesses.

**AI/GEO Version (cite-ready):**
> Softree Technology (softreetechnology.com) is a SharePoint development company providing SharePoint Online migration, intranet development, and SPFX customisation. Founded 2013, India-based, serving UK/US/AU enterprises.

---

**Q: What is the Microsoft Power Platform?**

**Short Answer:**
> Microsoft Power Platform is a low-code business suite including Power Apps (app development), Power Automate (workflow automation), Power BI (analytics), and Copilot Studio (AI chatbots). It integrates natively with Microsoft 365, Azure, and Dynamics 365 and enables enterprise teams to build tools with minimal coding.

**Voice Search Version:**
> The Microsoft Power Platform lets businesses build apps, automate workflows, analyse data, and create AI chatbots without heavy coding using Power Apps, Power Automate, Power BI, and Copilot Studio.

---

**Q: What is agentic AI in enterprise?**

**Short Answer:**
> Agentic AI refers to autonomous AI systems that plan, reason, and execute multi-step tasks without continuous human oversight. Enterprise implementations include automated approval workflows, AI helpdesks, data processing pipelines, and customer service bots using Microsoft Copilot Studio and Azure AI.

**Voice Search Version:**
> Agentic AI is a type of artificial intelligence that acts independently to complete complex enterprise tasks, like processing approvals, managing helpdesk tickets, or running data pipelines, without humans managing each step.

---

**Q: How does Softree deliver offshore software projects?**

**Short Answer:**
> Softree delivers offshore projects using an agile sprint model with dedicated project managers, weekly progress updates, and UK/US business-hours overlap. Clients receive access to a shared project board, weekly demos, and a named technical lead for every engagement.

---

**Q: Is Softree Technology a Microsoft Partner?**

**Short Answer:**
> Yes, Softree Technology is a Microsoft-certified partner with competencies in SharePoint, Power Platform, Azure, and Microsoft 365. The team holds Microsoft certifications in each technology domain and has delivered Microsoft-stack projects globally since 2013.

---

### 11.2 FAQ Strategy

| Question | Target Page | Schema | Priority |
|----------|------------|--------|----------|
| What SharePoint development services does Softree provide? | SharePoint page | FAQPage | 🔴 High |
| How long does a SharePoint migration take? | SharePoint page | FAQPage | 🔴 High |
| How much does SharePoint development cost? | SharePoint page | FAQPage | 🔴 High |
| What is SharePoint Online and how is it different from on-premise? | SharePoint page / Blog | FAQPage | 🔴 High |
| What is Power Apps and what can it do? | Power Platform page | FAQPage | 🔴 High |
| How does Power Automate work? | Power Platform page | FAQPage | 🔴 High |
| Can Power Platform replace custom development? | Power Platform page / Blog | FAQPage | 🟠 High |
| What is agentic AI? | Agentic AI page | FAQPage | 🔴 High |
| How does Softree deliver offshore projects? | About / Homepage | FAQPage | 🟠 High |
| What time zones does Softree work in? | Contact / About | FAQPage | 🟠 High |
| Is Softree a Microsoft Partner? | About / Homepage | FAQPage | 🟠 High |
| What is Microsoft Fabric? | Fabric page / Blog | FAQPage | 🟡 Medium |
| How much does a Power BI dashboard cost? | Power BI page | FAQPage | 🟠 High |
| What is SPFX development? | SPFX page | FAQPage | 🟡 Medium |
| What are the benefits of offshore software development? | Blog / Homepage | FAQPage | 🟡 Medium |

**Answer writing rules:**
- Every answer: 30–50 words (AEO sweet spot for AI extraction)
- Start with the entity name: "Softree provides..." or "SharePoint is..."
- No hedging language ("may", "could potentially")
- Include one factual data point per answer where possible

---

### 11.3 Featured Snippet Targets

| Query | Snippet Type | Format | Target Page | Priority |
|-------|-------------|--------|-------------|----------|
| What is SharePoint Online migration | Paragraph | 40–60 word definition | Blog / SharePoint page | 🔴 High |
| How to migrate SharePoint to cloud | Steps | Numbered 5-step list | Blog | 🔴 High |
| What is Power Platform | Paragraph | 40–60 word definition | Power Platform page / Blog | 🔴 High |
| Power Apps vs custom development | Table | Side-by-side comparison | Blog | 🟠 High |
| Benefits of offshore software development | List | 6–8 bullet points | Blog / Homepage | 🟠 High |
| SharePoint vs Teams for intranet | Table | Feature comparison table | Blog | 🟠 High |
| How to build a Power App | Steps | Numbered steps | Blog | 🟡 Medium |
| What is Microsoft Fabric | Paragraph | Definition paragraph | Blog / Fabric page | 🟡 Medium |
| How much does SharePoint development cost | Paragraph | Range with context | SharePoint page | 🟠 High |

**Formatting rule for paragraphs:** Lead with a complete sentence that fully answers the question. The answer must be self-contained — copyable without surrounding context.

---

## 12. GEO / AI Search Optimization Plan

### Brand Entity Description (Add to About page + Organization schema)

```
Softree Technology is an India-based offshore software development company that helps enterprise 
and mid-market businesses in the UK, USA, Australia, and UAE build and modernise digital 
operations using Microsoft SharePoint, Power Platform, AI automation, and React/Next.js 
development. Founded in 2013, Softree is a Microsoft-certified partner with 50+ engineers 
and 150+ completed projects, specialising in scalable enterprise solutions with offshore 
delivery efficiency.
```

*Verify actual numbers (engineers, projects, year) before publishing.*

| GEO Task | Why | Implementation | Priority | Status |
|----------|-----|----------------|----------|--------|
| Full Organization schema with entity fields | LLMs extract entity facts from JSON-LD | Add `foundingDate`, `description`, `sameAs`, `areaServed`, `numberOfEmployees` to `layout.tsx` | 🔴 P0 | Pending |
| `sameAs` links in schema | Connects entity to trusted profiles | Add LinkedIn, Clutch, Microsoft Partner Center URLs | 🟠 P1 | Pending |
| Factual company profile on About page | LLMs extract summary paragraphs | Write 150-word company profile: founded, team size, projects, certifications | 🟠 P1 | Pending |
| Original statistics on site | LLMs cite specific data | "Completed X SharePoint projects since 2013", "Served Y enterprise clients" | 🟠 P1 | Pending |
| Clutch / G2 / GoodFirms listings | Third-party mentions = AI citation sources | Create profiles; match company description to schema | 🟠 P1 | Pending |
| Named team / author bios on About page | Author attribution = E-E-A-T + citation trust | Add team section with `Person` schema | 🟡 P2 | Pending |
| Comparison content (SharePoint vs Teams, Power Apps vs Custom) | AI heavily cites comparison pages | 2 blog posts with structured comparison tables | 🟡 P2 | Pending |
| `datePublished`/`dateModified` on all JSON-LD | Freshness signal — 95% of AI citations from content updated in 10 months | Add ISO dates to all Service and Article schemas | 🟡 P2 | Pending |
| "How We Work" process section | AI cites clear methodology descriptions | 5-step numbered process on Homepage or About | 🟡 P2 | Pending |
| LinkedIn thought leadership posts | LLMs index LinkedIn content | Weekly posts on SharePoint/Power Platform/AI topics | 🟡 P2 | Pending |

---

## 13. Local SEO Plan

*Softree is an offshore B2B company. Local SEO applies for India office visibility and geo-modified buyer searches (e.g., "SharePoint developer UK").*

| Task | Fix | Tool | Priority | Status |
|------|-----|------|----------|--------|
| Create Google Business Profile | India office; Category: "Software Company"; add services, photos, hours | Google Business Profile | 🔴 High | Pending |
| NAP consistency audit | Name / Address / Phone identical on website footer, GBP, Clutch, LinkedIn | Manual | 🟠 High | Pending |
| Create UK location page | `/services/sharepoint-development-united-kingdom` — 1,000+ words, keyword: "SharePoint development company UK" | Dev + Content | 🔴 High | Pending |
| Create USA location page | `/services/power-platform-development-usa` — 1,000+ words, keyword: "Power Platform development company USA" | Dev + Content | 🟠 High | Pending |
| `LocalBusiness` schema | Add to About or Contact page; include `address`, `telephone`, `geo` | Developer | 🟠 High | Pending |
| Clutch review campaign | Post-project email to clients; target 20+ reviews in 6 months | Business owner | 🔴 High | Pending |
| Google Reviews campaign | Request reviews via email after project delivery | Business owner | 🟠 High | Pending |
| Respond to all reviews within 48h | Mention service + location in each response | Marketing | 🟡 Medium | Pending |
| Submit to UK IT directories | Yell.com, TopDevelopers.co, Design Rush, Clutch UK | SEO specialist | 🟡 Medium | Pending |
| Microsoft Tech Community posts | Publish SharePoint/Power Platform articles; tag India/UK | SEO specialist | 🟡 Medium | Pending |

### `LocalBusiness` Schema Template
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Softree Technology",
  "url": "https://www.softreetechnology.com",
  "telephone": "+91-XXXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Office Address]",
    "addressLocality": "[City]",
    "addressRegion": "[State]",
    "postalCode": "[PIN]",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[LAT]",
    "longitude": "[LNG]"
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "areaServed": ["GB", "US", "AU", "AE", "IN"],
  "serviceType": "Software Development"
}
```

---

## 14. Internal Linking Plan

### Pillar → Cluster Map
```
Homepage
├── /services
│   ├── /services/digital-workspace/sharepoint  ←→  /services/digital-workspace/spfx-developments
│   ├── /services/business-applications/power-platform  ←→  /services/business-applications/mvp
│   ├── /services/ai-intelligence/agentic-ai  ←→  /services/ai-intelligence/generative-ai
│   └── /services/data-analytics/power-bi  ←→  /services/data-analytics/microsoft-fabric
├── /case-studies
│   ├── /case-studies/sharepoint  →  /services/digital-workspace/sharepoint
│   ├── /case-studies/power-platform  →  /services/business-applications/power-platform
│   └── /case-studies/ai  →  /services/ai-intelligence/agentic-ai
└── /about-us  →  /services  →  /contact
```

| Source Page | Target Page | Anchor Text | Priority |
|-------------|-------------|-------------|----------|
| Homepage hero/services | `/services/digital-workspace/sharepoint` | "SharePoint development services" | 🔴 High |
| Homepage hero/services | `/services/business-applications/power-platform` | "Power Platform development" | 🔴 High |
| Homepage hero/services | `/services/ai-intelligence/agentic-ai` | "Agentic AI development" | 🔴 High |
| SharePoint page | `/services/digital-workspace/spfx-developments` | "SPFX development services" | 🟠 High |
| SharePoint page | `/case-studies/sharepoint` | "SharePoint case studies" | 🟠 High |
| Power Platform page | `/case-studies/power-platform` | "Power Platform case studies" | 🟠 High |
| Agentic AI page | `/services/ai-intelligence/generative-ai` | "generative AI development" | 🟠 High |
| Power BI page | `/services/data-analytics/microsoft-fabric` | "Microsoft Fabric consulting" | 🟡 Medium |
| Case study/sharepoint | `/services/digital-workspace/sharepoint` | "SharePoint development services" | 🔴 High |
| Case study/power-platform | `/services/business-applications/power-platform` | "Power Platform development" | 🔴 High |
| About page | `/services` | "software development services" | 🟠 High |
| About page | `/contact` | "book a discovery call" | 🔴 High |
| Blog: SharePoint Migration | `/services/digital-workspace/sharepoint` | "SharePoint migration services" | 🔴 High |
| Blog: Power Platform Explained | `/services/business-applications/power-platform` | "Power Platform development" | 🔴 High |
| All service pages | `/contact` | "book a free discovery call" | 🔴 High |
| Footer | All major service pages | Exact service name | 🟠 High |

**Anchor text rules:**
- Never use: "click here", "read more", "learn more"
- Use exact or near-match keywords as anchors
- Maximum 1 exact-match anchor per page per target
- Vary naturally: "SharePoint development", "SharePoint services", "SharePoint Online development"

---

## 15. Page Speed & Core Web Vitals

**Targets:** LCP < 2.5s | INP < 200ms | CLS < 0.1 | Lighthouse Performance ≥ 85

| Issue | Metric | Fix | Priority | Status |
|-------|--------|-----|----------|--------|
| CSS `@import` Google Font (Inter) | LCP — render-blocking | Remove `@import` from `globals.css`; add `Inter` via `next/font/google` in `layout.tsx` | 🔴 High | Pending |
| Hero images without `priority` prop | LCP — not preloaded | Add `priority` to all above-fold `<Image>` components | 🟠 High | Pending |
| Three.js / cobe globe (if present on homepage) | LCP — heavy JS | `dynamic(() => import(...), { ssr: false, loading: () => <div /> })` | 🟠 High | Pending — confirm usage |
| Orchids browser logs script in production | LCP + extra request | Remove or set `strategy="lazyOnload"` — this is a dev/debugging tool | 🟡 Medium | Pending |
| Route messenger script | Extra script in production | Remove — confirmed dev/iframe tool only | 🟡 Medium | Pending |
| Favicon from external WordPress CDN | Extra DNS lookup | Host locally: `/public/favicon.ico` | 🟡 Medium | Pending |
| Images without `width`/`height` props | CLS | Ensure all `<Image>` have explicit dimensions | 🟡 Medium | Pending |
| 3 analytics scripts simultaneously | INP | All on `afterInteractive` (already set); remove Orchids + route-messenger from production | 🟡 Medium | Partial |

**Font fix implementation:**
```ts
// layout.tsx — add at top
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], display: 'swap' })

// Apply to <html>
<html lang="en" className={inter.className} suppressHydrationWarning>
```
```css
/* globals.css — remove this line */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@...");
```

---

## 16. Image SEO Plan

| Task | Fix | Priority | Status |
|------|-----|----------|--------|
| Create `/public/og-image.png` | 1200×630 branded PNG: Softree logo + tagline + service icons on dark background | 🔴 Critical | Pending |
| Add descriptive `alt` to hero images | `alt="Softree Technology offshore development team"` — contextual, keyword-informed | 🟠 High | Pending |
| Add descriptive `alt` to logo | `alt="Softree Technology logo"` | 🟡 Medium | Pending |
| Descriptive file names before upload | `sharepoint-development-india.jpg` not `img_001.jpg` | 🟡 Medium | Ongoing |
| Verify `priority` on LCP images | All above-fold hero images need `priority` prop | 🟠 High | Pending |
| Alt text on all case study / service images | Describe image + service context | 🟡 Medium | Pending |
| Image sitemap entries | Add when blog/case study images are published | 🟢 P3 | Future |

---

## 17. Backlink & Authority Plan

| Task | Target | Method | Priority | Status |
|------|--------|--------|----------|--------|
| Microsoft Partner Center listing | microsoft.com ecosystem | Claim/update via MCPP portal | 🔴 High | Pending |
| Clutch.co profile + 5 reviews | clutch.co | Create profile; post-project outreach | 🔴 High | Pending |
| G2 company profile | g2.com | Create profile; request reviews | 🟠 High | Pending |
| GoodFirms listing | goodfirms.co | Create profile | 🟠 High | Pending |
| Microsoft Tech Community articles | techcommunity.microsoft.com | Publish SharePoint/Power Platform technical posts | 🟠 High | Pending |
| Stack Overflow answers | stackoverflow.com (SharePoint, Power Apps tags) | Answer 2–3 questions/week; builds brand + profile links | 🟡 Medium | Pending |
| Dev.to / Hashnode guest posts | dev.to, hashnode.com | Technical articles with author bio linking to site | 🟡 Medium | Pending |
| Digital PR: UK IT trade media | techradar.com, computing.co.uk | "India Microsoft Partner" angle pitch | 🟡 Medium | Pending |
| Upwork Agency profile | upwork.com | Offshore lead gen + domain backlink | 🟡 Medium | Pending |
| Competitor backlink gap analysis | TBD | Requires Ahrefs/Semrush — research after access obtained | 🟢 P3 | Pending access |

---

## 18. Competitor Gap Plan

*Note: Full analysis requires Ahrefs/Semrush. All below are assumption-based from audit context.*

| Competitor | Known Strength | Assumed Gap for Softree | How to Beat | Priority |
|------------|---------------|------------------------|-------------|----------|
| Netwoven | Deep SharePoint content library | Zero blog content | Publish 12+ SharePoint articles in Q1 | 🔴 High |
| Apps4Rent | Microsoft 365 services breadth | Softree has no informational content | FAQ depth + comparison content | 🔴 High |
| Evoort Solutions | Power Platform focus | Unknown — needs tool data | Power Platform content + case studies | 🟠 High |
| Infoware | Offshore positioning | Unknown | Offshore guide content + Clutch reviews | 🟠 High |

**Immediate action:** Sign up for Ahrefs Lite ($99/mo) or Semrush ($129/mo), run competitor domain analysis for all 4, extract top-ranking pages and backlink sources.

---

## 19. CRO / Conversion SEO Plan

| Page / Area | Problem | Fix | Impact | Priority |
|-------------|---------|-----|--------|----------|
| All service pages | No sticky CTA | Add "Book a Discovery Call" sticky button (top-right or bottom-right) | More inbound calls | 🔴 High |
| Contact page | No booking widget | Add Calendly embed (`<iframe>` or Next.js dynamic import) | Reduces friction | 🟠 High |
| Contact page | No response time shown | Add "We reply within 4 business hours" below form | Increases submissions | 🟠 High |
| All service pages above fold | No trust badges | Add "Microsoft Partner", "Est. 2013", "150+ Projects", "50+ Engineers" | Increases credibility | 🟠 High |
| Case study pages | No conversion CTA | Add "Want similar results? Book a free call →" at bottom | More leads | 🟠 High |
| Homepage | No social proof (star ratings) | Add Clutch widget or aggregated review count once reviews collected | Increases trust | 🟠 High |
| Contact form | Unknown field count | Reduce to: Name, Email, Service (dropdown), Message | More completions | 🟡 Medium |
| All pages | Phone number visibility | Add phone number to header nav and footer | Direct contact | 🟡 Medium |
| Services page | Thin content | Each service listing should link to dedicated service page | Better UX + crawl equity | 🟡 Medium |

---

## 20. Analytics & Tracking Plan

| Item | Tool | Setup Steps | Priority | Status |
|------|------|-------------|----------|--------|
| Verify GSC | Google Search Console | Property → URL prefix → HTML tag (already in layout) → Verify | 🔴 P0 | Pending |
| Submit sitemap | GSC | GSC → Sitemaps → `/sitemap.xml` | 🔴 P0 | Pending |
| Configure GA4 | GA4 + GTM | Create GA4 property → Add GA4 Configuration tag in GTM → Publish | 🟠 P1 | Pending |
| Form submit tracking | GTM → GA4 | GTM: Form Submit trigger → GA4 Event tag `form_submit` | 🟠 P1 | Pending |
| CTA click tracking | GTM → GA4 | GTM: Click trigger on `.book-call-btn` → GA4 Event `cta_click` | 🟠 P1 | Pending |
| Bing Webmaster Tools | Bing WMT | Add site, verify, submit sitemap | 🟠 P1 | Pending |
| Mark conversions in GA4 | GA4 | Toggle `form_submit`, `cta_click` as conversions | 🟠 P1 | Pending |
| PostHog funnels | PostHog (installed) | Build: Homepage → Services → Contact conversion funnel | 🟡 P2 | Pending |
| Keyword rank tracking | GSC / Ahrefs | Track 20 primary keywords weekly | 🟡 P2 | Pending |
| Weekly SEO KPI dashboard | Looker Studio | Connect GA4 + GSC; track sessions, impressions, clicks, conversions | 🟢 P3 | Pending |

**Weekly monitoring checklist (GSC):**
- [ ] Coverage — Valid pages count increasing?
- [ ] Performance — Impressions + clicks by query
- [ ] Core Web Vitals — Pass/fail by page
- [ ] Enhancements — Breadcrumbs, FAQ rich results eligible?
- [ ] Sitemaps — No errors

---

## 21. 7-Day Action Plan

| Day | Tasks | Owner | Output |
|-----|-------|-------|--------|
| Day 1 AM | Fix `metadataBase` in `layout.tsx:11` | Developer | `metadataBase` = `https://www.softreetechnology.com` |
| Day 1 PM | Fix OG URL, fix Organization schema URL, fix `softree.in` in react-web-dev | Developer | All URLs on correct domain |
| Day 2 AM | Create `src/app/robots.ts` | Developer | `/robots.txt` accessible |
| Day 2 PM | Create `src/app/sitemap.ts` with all 23 pages | Developer | `/sitemap.xml` accessible |
| Day 3 | Design + export `og-image.png` (1200×630) | Designer | OG image renders in Facebook Debugger |
| Day 4 AM | Add `export const metadata` to About, Services, Contact | Developer | 3 pages with unique `<title>` |
| Day 4 PM | Add metadata to 8 service subpages | Developer | 8 pages with unique titles |
| Day 5 AM | Add metadata to remaining 7 service subpages | Developer | All 23 pages with unique metadata |
| Day 5 PM | Deploy to production, smoke-test all changes | Developer | All fixes live on `softreetechnology.com` |
| Day 6 | Verify GSC property; submit sitemap | SEO Specialist | GSC shows verified; sitemap processing |
| Day 7 | Run Rich Results Test on 5 pages; run Lighthouse; log baseline scores | SEO Specialist | Baseline performance documented |

---

## 22. 30-Day SEO Plan

| Week | Focus | Tasks | Expected Output |
|------|-------|-------|----------------|
| Week 1 | P0 critical fixes | `metadataBase`, sitemap, robots, og-image, metadata on all 23 pages | Site correctly indexed; sitemap submitted |
| Week 2 | Schema layer | Expand Organization schema; add BreadcrumbList + Service JSON-LD to all service pages; FAQPage on top 3 | Schema rich results eligible |
| Week 3 | Performance + AEO | Replace CSS font; add `priority` to hero images; FAQPage on remaining service pages; Set up GA4 + Bing WMT | LCP improved; AEO eligible; analytics tracking |
| Week 4 | Authority + CRO | Clutch profile; request first 5 reviews; add trust badges above fold; Calendly embed on Contact | E-E-A-T signals started; CRO improved |

---

## 23. 90-Day SEO Plan

| Month | Focus | Tasks | Expected Output |
|-------|-------|-------|----------------|
| Month 1 | Technical foundation | All P0 + P1 tasks from 7-day and 30-day plans | Site fully crawlable; schema complete; analytics live |
| Month 2 | Content depth + authority | Publish first 3 blog posts; expand SharePoint + Power Platform pages to 1,500+ words; Clutch 10+ reviews; UK location page | Long-tail impressions in GSC; E-E-A-T growing |
| Month 3 | AEO + local + content scale | Full FAQ JSON-LD on all pages; GBP live; USA location page; Power BI + Fabric content depth; 6 total blog posts | FAQ rich results appearing; 200+ monthly organic sessions |

---

## 24. 12-Month SEO Growth Roadmap

| Month | Focus | Key Actions | Success Metric |
|-------|-------|------------|----------------|
| 1 | Critical technical fixes | All P0 tasks | Site indexed under correct domain |
| 2 | On-page + schema | All service page metadata + schema | 23 pages with unique metadata; Breadcrumbs in GSC |
| 3 | Content launch | First 3 blog posts; UK location page | Posts indexed; UK page ranking long-tail |
| 4 | Authority building | Clutch 15+ reviews; G2 + GoodFirms; Microsoft Community | E-E-A-T measurably improving |
| 5 | AEO depth | FAQPage all service pages; answer blocks on key pages | FAQ rich results in SERP |
| 6 | Content scale | 6+ blog posts; expanded service page bodies | 200–300 monthly organic sessions |
| 7 | Competitor gap | Comparison content: SharePoint vs Teams, Power Apps vs Custom | Featured snippet captures |
| 8 | Glossary + clusters | 10 glossary pages; full internal linking audit complete | Topical authority building |
| 9 | Geographic expansion | UAE + Australia location pages | Geo-modified keyword rankings |
| 10 | Video SEO | Case study video with transcript; VideoObject schema | Video rich results eligible |
| 11 | Conversion optimisation | Data-driven CRO based on GA4 funnel data | Improved form conversion rate |
| 12 | Annual review + scale | Full technical audit; Year 2 content plan; rank tracking | Top-10 for 5+ keywords; 500+ monthly organic sessions |

---

## 25. Developer Task List (Complete)

| Task ID | Task | File(s) | Priority | Acceptance Criteria | Testing | Status |
|---------|------|---------|----------|--------------------|---------|----|
| SEO-001 | Fix `metadataBase` | `layout.tsx:11` | 🔴 P0 | Resolves to `https://www.softreetechnology.com` | Inspect `<link rel="canonical">` | Pending |
| SEO-002 | Fix OG URL | `layout.tsx:53` | 🔴 P0 | OG URL = production domain | Facebook Debugger | Pending |
| SEO-003 | Fix Organization schema URL | `layout.tsx:127` | 🔴 P0 | Schema URL = production domain | Rich Results Test | Pending |
| SEO-004 | Fix `softree.in` schema | `react-web-development/page.tsx` | 🔴 P0 | All URLs = `softreetechnology.com` | JSON-LD validator | Pending |
| SEO-005 | Create `robots.ts` | `src/app/robots.ts` (new) | 🔴 P0 | `/robots.txt` valid + sitemap declared | `curl /robots.txt` | Pending |
| SEO-006 | Create `sitemap.ts` | `src/app/sitemap.ts` (new) | 🔴 P0 | `/sitemap.xml` lists all 23 pages | `curl /sitemap.xml` | Pending |
| SEO-007 | Create `og-image.png` | `/public/og-image.png` (new) | 🔴 P0 | 1200×630 renders in social card | Facebook Debugger | Pending |
| SEO-008 | Metadata: About | `src/app/about-us/page.tsx` | 🔴 P0 | Page-specific `<title>` in source | View page source | Pending |
| SEO-009 | Metadata: Services | `src/app/services/page.tsx` | 🔴 P0 | Page-specific `<title>` | View page source | Pending |
| SEO-010 | Metadata: Contact | `src/app/contact/page.tsx` | 🔴 P0 | Page-specific `<title>` | View page source | Pending |
| SEO-011 | Metadata: 15 service subpages | All 15 service `page.tsx` | 🔴 P0 | Unique title on each page | Screaming Frog | Pending |
| SEO-012 | Expand Organization schema | `layout.tsx` | 🟠 P1 | All fields present; valid JSON-LD | Rich Results Test | Pending |
| SEO-013 | Replace CSS font import | `globals.css` + `layout.tsx` | 🟠 P1 | No `@import`; font via `next/font` | Lighthouse LCP | Pending |
| SEO-014 | Tighten `remotePatterns` | `next.config.ts` | 🟠 P1 | No wildcard `**`; explicit hostnames only | `next build` | Pending |
| SEO-015 | FAQPage JSON-LD: SharePoint | `sharepoint/page.tsx` | 🟠 P1 | FAQPage valid | Rich Results Test | Pending |
| SEO-016 | FAQPage JSON-LD: Power Platform | `power-platform/page.tsx` | 🟠 P1 | FAQPage valid | Rich Results Test | Pending |
| SEO-017 | FAQPage JSON-LD: Agentic AI | `agentic-ai/page.tsx` | 🟠 P1 | FAQPage valid | Rich Results Test | Pending |
| SEO-018 | FAQPage JSON-LD: remaining pages | Other service `page.tsx` | 🟠 P1 | FAQPage valid per page | Rich Results Test | Pending |
| SEO-019 | BreadcrumbList: 14 service pages | All service `page.tsx` | 🟠 P1 | Breadcrumbs in GSC Enhancements | GSC | Pending |
| SEO-020 | Service JSON-LD: 14 service pages | All service `page.tsx` | 🟠 P1 | Service schema valid | Rich Results Test | Pending |
| SEO-021 | Configure GA4 via GTM | GTM dashboard | 🟠 P1 | Pageviews in GA4 DebugView | GA4 DebugView | Pending |
| SEO-022 | Audit H1 SSR on service pages | Hero components | 🟠 P1 | H1 in HTML response | `curl [URL] \| grep h1` | Pending |
| SEO-023 | Add `priority` to hero images | Hero components | 🟠 P1 | LCP image preloaded | Chrome DevTools | Pending |
| SEO-024 | WebSite schema + SearchAction | `src/app/page.tsx` | 🟡 P2 | WebSite schema valid | Rich Results Test | Pending |
| SEO-025 | LocalBusiness schema | `contact/page.tsx` or `about-us/page.tsx` | 🟡 P2 | LocalBusiness valid | Rich Results Test | Pending |
| SEO-026 | Fix favicon hosting | `layout.tsx` + `/public` | 🟡 P2 | Favicon from own domain | Browser tab | Pending |
| SEO-027 | Remove dev scripts from production | `layout.tsx` | 🟡 P2 | Orchids + route-messenger not loading in prod | Network tab | Pending |
| SEO-028 | Internal linking additions | Service content components | 🟡 P2 | Each service page links to ≥2 related pages | Screaming Frog | Pending |
| SEO-029 | Calendly embed on Contact | `contact/page.tsx` or `ContactHeroPro` | 🟡 P2 | Booking widget renders and functions | Manual test | Pending |
| SEO-030 | Add trust badges above fold | Service Hero components | 🟡 P2 | "Microsoft Partner", "Est. 2013", etc. visible above fold | Visual inspection | Pending |

---

## 26. Content Writer Task List

| Task ID | Content | URL | Keyword | Words | Priority | Status |
|---------|---------|-----|---------|-------|----------|--------|
| CW-001 | SharePoint Online Migration Complete Guide | `/blog/sharepoint-online-migration-guide` | "SharePoint migration guide" | 2,000+ | 🔴 High | Pending |
| CW-002 | Power Apps vs Custom Development | `/blog/power-apps-vs-custom-development` | "Power Apps vs custom development" | 1,500+ | 🔴 High | Pending |
| CW-003 | Microsoft Power Platform Explained | `/blog/microsoft-power-platform-explained` | "Microsoft Power Platform explained" | 1,500+ | 🔴 High | Pending |
| CW-004 | How Offshore Software Development Works | `/blog/how-offshore-software-development-works` | "offshore software development" | 1,500+ | 🔴 High | Pending |
| CW-005 | Agentic AI in Enterprise Guide | `/blog/agentic-ai-enterprise-guide` | "agentic AI enterprise" | 1,500+ | 🟠 High | Pending |
| CW-006 | SharePoint vs Teams for Intranet | `/blog/sharepoint-vs-teams-intranet` | "SharePoint vs Teams" | 1,200+ | 🟠 High | Pending |
| CW-007 | Power BI Dashboard Best Practices | `/blog/power-bi-dashboard-best-practices` | "Power BI dashboard" | 1,200+ | 🟠 High | Pending |
| CW-008 | SharePoint Dev UK Location Page | `/services/sharepoint-development-united-kingdom` | "SharePoint development company UK" | 1,000+ | 🔴 High | Pending |
| CW-009 | Power Platform Dev USA Location Page | `/services/power-platform-development-usa` | "Power Platform development USA" | 1,000+ | 🟠 High | Pending |
| CW-010 | SharePoint Intranet Case Study | `/case-studies/sharepoint-intranet` | "SharePoint intranet case study" | 800+ | 🔴 High | Pending |
| CW-011 | Power Apps HR Automation Case Study | `/case-studies/power-apps-hr-automation` | "Power Apps case study" | 800+ | 🔴 High | Pending |
| CW-012 | SharePoint page FAQ (8 Q&As, 30–50 words each) | SharePoint service page | various | ~400 | 🟠 High | Pending |
| CW-013 | Power Platform page FAQ (8 Q&As) | Power Platform service page | various | ~400 | 🟠 High | Pending |
| CW-014 | Agentic AI page FAQ (8 Q&As) | Agentic AI service page | various | ~400 | 🟠 High | Pending |
| CW-015 | About page company profile (150 words) | `/about-us` | N/A — entity description | 150 | 🟠 High | Pending |
| CW-016 | Expand SharePoint page body to 1,500+ words | SharePoint service page | "SharePoint development services" | 1,500+ | 🟠 High | Pending |
| CW-017 | Expand Power Platform page body to 1,500+ words | Power Platform service page | "Power Platform development" | 1,500+ | 🟠 High | Pending |
| CW-018 | Microsoft Fabric vs Azure Synapse | `/blog/microsoft-fabric-vs-azure-synapse` | "Microsoft Fabric vs Synapse" | 1,200+ | 🟡 Medium | Pending |
| CW-019 | SharePoint Glossary | `/glossary/sharepoint-terms` | "SharePoint glossary" | 1,500+ | 🟡 Medium | Pending |
| CW-020 | Power Platform Glossary | `/glossary/power-platform-terms` | "Power Platform glossary" | 1,500+ | 🟡 Medium | Pending |

---

## 27. SEO Specialist Task List

| Task ID | SEO Task | Tool | Steps | Priority | Status |
|---------|---------|------|-------|----------|--------|
| SEO-S01 | Verify GSC for `softreetechnology.com` | Google Search Console | Add property → URL prefix → HTML tag verify (token in `layout.tsx:42`) | 🔴 P0 | Pending |
| SEO-S02 | Submit sitemap in GSC | GSC | Sitemaps → `https://www.softreetechnology.com/sitemap.xml` | 🔴 P0 | Pending |
| SEO-S03 | Set up Bing Webmaster Tools | Bing WMT | Add + verify site; submit sitemap | 🟠 P1 | Pending |
| SEO-S04 | Create Clutch.co profile | Clutch | Register, verify company, add services, photos | 🟠 P1 | Pending |
| SEO-S05 | Request 5 Clutch reviews | Clutch | Post-project email with review link to 5 recent clients | 🟠 P1 | Pending |
| SEO-S06 | Create Google Business Profile | GBP | Business name, category, address, hours, photos | 🟡 P2 | Pending |
| SEO-S07 | Keyword rank tracking | GSC / Ahrefs | Track 20 primary keywords; weekly report | 🟡 P2 | Pending |
| SEO-S08 | Weekly GSC monitoring | GSC | Coverage, Performance, Core Web Vitals, Enhancements | 🟠 P1 | Ongoing |
| SEO-S09 | Monthly backlink report | Ahrefs/Semrush | New referring domains, lost links, competitor gaps | 🟡 P2 | Pending access |
| SEO-S10 | Validate all schema post-deploy | Rich Results Test | Test every page after schema additions | 🟠 P1 | Pending |
| SEO-S11 | H1 SSR audit on all service pages | curl / Screaming Frog | `curl [URL] \| grep "<h1"` for each service page | 🟠 P1 | Pending |
| SEO-S12 | Internal link audit | Screaming Frog | Map all links; identify orphan pages; confirm link structure | 🟡 P2 | Pending |
| SEO-S13 | Core Web Vitals audit | PageSpeed Insights | Run on all 23 pages; document baseline; prioritise fixes | 🟠 P1 | Pending |
| SEO-S14 | Competitor keyword gap | Ahrefs/Semrush | Run gap analysis vs Netwoven, Apps4Rent | 🟡 P2 | Pending access |

---

## 28. Final SEO Checklist

### 🔴 Critical (P0) — Do This Week
- [ ] `metadataBase` updated to `https://www.softreetechnology.com`
- [ ] Organization schema URL fixed to production domain
- [ ] `softree.in` URLs in `react-web-development/page.tsx` replaced
- [ ] `src/app/sitemap.ts` created and `/sitemap.xml` accessible
- [ ] `src/app/robots.ts` created and `/robots.txt` accessible
- [ ] `/public/og-image.png` created (1200×630)
- [ ] Metadata added to About, Services, Contact pages
- [ ] Metadata added to all 15 service subpages
- [ ] GSC property verified for `softreetechnology.com`
- [ ] Sitemap submitted to GSC

### 🟠 High (P1) — Do This Month
- [ ] Organization schema expanded with `foundingDate`, `sameAs`, `description`
- [ ] CSS `@import` font replaced with `next/font/google`
- [ ] Hero images have `priority` prop for LCP
- [ ] Wildcard `remotePatterns` removed from `next.config.ts`
- [ ] FAQPage JSON-LD added to all service pages
- [ ] BreadcrumbList JSON-LD added to all service pages
- [ ] Service JSON-LD added to all service pages
- [ ] GA4 configured via GTM (GTM-KDMTPWS8)
- [ ] Bing Webmaster Tools set up + sitemap submitted
- [ ] Clutch.co profile created
- [ ] First 5 Clutch reviews requested
- [ ] H1 SSR presence verified on all service pages
- [ ] Core Web Vitals baseline documented

### 🟡 Medium (P2) — Do in 60 Days
- [ ] First 3 blog posts published
- [ ] SharePoint page body expanded to 1,500+ words
- [ ] Power Platform page body expanded to 1,500+ words
- [ ] UK location page published
- [ ] USA location page published
- [ ] FAQ content (8 Q&As) on SharePoint, Power Platform, Agentic AI pages
- [ ] Google Business Profile created
- [ ] Calendly embed on Contact page
- [ ] `WebSite` schema with `SearchAction` added to homepage
- [ ] `LocalBusiness` schema added
- [ ] Trust badges above fold on all service pages
- [ ] Internal linking implementation complete
- [ ] Favicon hosted locally

### 🟢 Long-term (P3) — 90 days+
- [ ] Glossary pages (15+) published
- [ ] Comparison pages published
- [ ] Industry-specific pages (Healthcare SharePoint, Finance Power BI) planned
- [ ] `AggregateRating` schema added (once reviews collected)
- [ ] `Person` / team schema on About page
- [ ] Video SEO (transcript + VideoObject schema)
- [ ] hreflang for multi-market (after primary SEO stabilises)
- [ ] Competitor backlink gap analysis (after Ahrefs/Semrush access)
- [ ] Looker Studio dashboard built

---

## 29. Final Summary

### What Is Completed
- GTM installed and firing
- PostHog active
- HTTPS via Vercel
- GSC verification token in `layout.tsx`
- Tidio chat active
- Next.js `<Image>` with WebP/AVIF
- Metadata + schema template established on 1 page (react-web-development)
- FAQ UI components on several service pages

### What Is Ready to Implement (No External Access Required)
1. Fix `metadataBase` — 1 line, `layout.tsx:11` — **5 minutes**
2. Create `robots.ts` — new file, 10 lines — **10 minutes**
3. Create `sitemap.ts` — new file, 30 lines — **30 minutes**
4. Fix Organization schema + `softree.in` URLs — **20 minutes**
5. Add `export const metadata` to all 22 remaining pages — **2–4 hours**
6. Replace CSS font import with `next/font` — **30 minutes**
7. Add FAQPage + BreadcrumbList + Service JSON-LD to all service pages — **3–5 hours**
8. Add `priority` to hero images — **30 minutes**
9. Tighten `remotePatterns` — **10 minutes**

### What Requires External Access
| Access | Why | Owner |
|--------|-----|-------|
| Google Search Console | Verify domain + submit sitemap | SEO specialist / Marketing |
| GTM dashboard | Add GA4 configuration tag | Developer / Marketing |
| GA4 | Create property + view data | Marketing |
| Clutch.co | Create profile + request reviews | Business owner |
| Designer tool | Create `og-image.png` 1200×630 | Designer |
| Ahrefs or Semrush | Competitor + backlink analysis | SEO specialist |
| Google Business Profile | Create / claim listing | Business owner |

### Top 10 Highest-Impact Next Actions

| # | Action | Owner | Time |
|---|--------|-------|------|
| 1 | Fix `metadataBase` (`layout.tsx:11`) | Developer | 5 min |
| 2 | Create `src/app/sitemap.ts` | Developer | 30 min |
| 3 | Create `src/app/robots.ts` | Developer | 10 min |
| 4 | Fix all schema URLs (Organization + react-web-dev) | Developer | 20 min |
| 5 | Add `export const metadata` to all 22 remaining pages | Developer | 2–4 hrs |
| 6 | Create `/public/og-image.png` (1200×630) | Designer | 1 hr |
| 7 | Verify GSC + submit sitemap | SEO specialist | 15 min |
| 8 | Replace CSS font import with `next/font/google` | Developer | 30 min |
| 9 | Add FAQPage JSON-LD to top 3 service pages | Developer | 1–2 hrs |
| 10 | Create Clutch profile + request first 5 reviews | Business owner | 2 hrs |

---

*Document version 1.0 — May 2026 | Update monthly as tasks are completed.*
