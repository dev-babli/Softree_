# CONTENT INVENTORY — Agentic AI Pages Revamp

Compiled by content audit agent. Source of truth for copy/data during redesign.
Shared shell components (NavigationClient, Footer, LightContactSection, LightFAQExact,
Certifications, TrustedBrandsMarquee) are KEPT AS-IS — content-level changes only.

---

## Shared content (repeats across pages)

### Testimonials (verbatim — same 3 clients on all service heroes + Why sections)

| Name | Role | Company | Location | Quote |
|------|------|---------|----------|-------|
| Darrell Trimble | CEO | SP Marketplace | California | "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed." |
| Natasha Adams | Partner | Wicked Point LLC | Virginia | Full quote in old heroes ends: "...The final product was exactly what we wanted and we look forward to working with Softree in the future." (Premium data uses shortened version.) |
| Arkady Fedorovtsjev | IT Specialist | ECG International / ECG Group | Netherlands | "Overall, we are satisfied with our collaboration in the past and your last action and response to our reported issue, really makes a difference." |

### Stats that repeat (often inconsistent — MUST unify in redesign)

- 50+ Enterprise clients, 98% Satisfaction, 12yr Platform expertise — Gen AI hero, Test Automation hero, old Agentic hero
- 100+ AI engineers, 4–16 Weeks to production, ISO 27001 — new Agentic premium hero
- 100+ AI engineers, 75+ models, 12+ countries, 18+ years — Agentic premium proof stats (12+ countries CONFLICTS with site constant 30+)
- 4.9/5, 150+ client reviews — old why.tsx / why-gen-ai.tsx only
- 95% client retention, 125+ Successful Enterprise Deliveries — About Us spotlight
- 412% ROI — AI case studies hero stat (hardcoded)

### Logos (TrustedBrandsMarquee / AboutClientLogos)

GO ERP, Nuvento, Snapon (trust only), Jonians, Export Control Group, SP Marketplace,
Bosch, Emscale, Link Innovation, Intellectt — paths under `/images/logo/`

### Certifications (shared)

STPI, Startup India, MCPD, MCTS, ISO 9001:2015, ISO 27001:2022

---

## Page 1: Agentic AI (`/services/offshore-ai-development`)

Data source: `src/components/ai-premium/data/agentic-ai-content.ts`

### Render order (live)

| # | Section | Component |
|---|---------|-----------|
| 1 | Hero (value prop, CTAs, announcement, testimonial carousel, stats) | `ai-premium/sections/AiPremiumHero.tsx` |
| 2 | Trust marquee | `AiPremiumMarquee.tsx` → TrustedBrandsMarquee |
| 3 | Platform pillars (6) | `AiPremiumPillars.tsx` |
| 4 | Stack showcase (Copilot / Agent Builder / Analytics) | `AiPremiumStackShowcase.tsx` |
| 5 | Industry tabs (5 verticals) | `AiPremiumIndustryTabs.tsx` |
| 6 | Industry pills (19) | `AiPremiumIndustryPills.tsx` |
| 7 | Tech stack (8 categories, 40 tags) | `AiPremiumTechStack.tsx` |
| 8 | Delivery framework (5 steps) | `AiPremiumFramework.tsx` |
| 9 | Services (6 blocks) | `AiPremiumServices.tsx` |
| 10 | Enterprise benefits (6) | `AiPremiumEnterprise.tsx` |
| 11 | Why Softree (4 + review carousel) | `AiPremiumWhyChoose.tsx` |
| 12 | Proof stats (4 metrics) | `AiPremiumStats.tsx` |
| 13 | Process (5 steps) | `AiPremiumProcess.tsx` |
| 14 | Certifications | shared |
| 15 | Contact | LightContactSection |
| 16 | FAQ (5) | LightFAQExact |

### Key copy (live)

- Hero H1: "Autonomous agents built for { enterprise certainty }"; subhead: Copilot Studio, Azure AI, Power Platform; CTAs "Talk to an expert" (Calendly), "View AI case studies"
- Announcement: "Copilot + Power Platform agent programs" → /case-studies/ai
- Hero cards: Pre-built agent patterns / Integration accelerators / Custom agent systems
- Hero stats: 100+ AI engineers | 4–16 Weeks to production | ISO 27001 delivery
- Pillars H2: "What { Agentic AI } changes for your enterprise"
- Stack H2: "Intelligence that works for your operators"
- Industry tabs: Banking, Healthcare, Manufacturing, Retail, IT & HR (headline + body + 3 outcomes + tech chips each)
- Tech H2: "Architected to be AI-native"
- Framework H2: "From vision to governed autonomy"
- Services H2: "AI services & solutions" (Strategy, Gen AI, ML, CV, Product/UX, Infrastructure)
- Enterprise H2: "Transforming operations with intelligent AI agents"
- Why H2: "A partner built for enterprise AI delivery"
- Proof: 100+ engineers | 75+ models | 12+ countries | 18+ years
- Process H2: "From discovery to production agents"

### Media

- Unsplash photo-1677442136019-21780ecad995, /service_image/ai.jpg, /images/case-study/web/ai-web.jpg

### SEO

- Title: Agentic AI Development Services | AI Agents & Intelligent Automation | Softree
- Canonical: https://www.softreetechnology.com/services/offshore-ai-development

### FAQs (5, in page.tsx)

1. What Agentic AI services do you offer?
2. How do AI agents differ from traditional automation?
3. How long to build an AI agent? (4–8 / 10–16 weeks)
4. Can AI agents integrate with existing systems?
5. How do you ensure reliability and safety?

### Orphaned files (src/app/services/offshore-ai-development/) — content NOT in new data

| File | Unique content |
|------|----------------|
| hero.tsx | H1 "Enterprise Agentic AI Solutions & Intelligent Automation"; stats 50+/98%/12yr; longer Natasha quote |
| stack-slider.tsx | H2 "Intelligence that works for you"; badge "Smart Capability" |
| enterprise.tsx | Intro mentions "measurable growth" |
| tools.tsx | H2 "Enterprise-Ready Agentic AI Stack" + longer intro |
| industry.tsx | **TechAhead brand leakage** (do not reuse copy verbatim) |
| agentic-frame.tsx | 4-step framework: Strategy & Co-Creation → Governance → Platform Build → Deploy/Optimize |
| strategy.tsx | Richer service bullets + CTA labels ("Explore Consulting" etc.) |
| why.tsx | H2 "Built for Long-Term Impact"; 4.9/5, 150+ reviews; stray `<meta>` JSX bug |
| agentic-section.tsx | "From Vision to Autonomous Execution" intro paragraph |
| ai-stats.tsx | "Power Your Next Leap with Agentic AI Delivered by Proven Experts"; COUNTRIES_SERVED = 30+ |
| cta.tsx | "Hire experts to design Autonomous AI Agents"; 40+ engineers, 95% deployment, 30 Days POC; Formspree form |
| faq.tsx | 8 educational FAQs (What is Agentic AI?, benefits, skills…) |
| casestudies.tsx | Power Apps carousel (wrong vertical) |

---

## Page 2: About Us (`/about-us`)

### Render order

| # | Section | Component |
|---|---------|-----------|
| 1 | Hero (video, cycling words, service cards) | `qc/homepage-light/AvooraHero.tsx` |
| 2 | About (story, mission/vision, stats) | `LightAboutMerged.tsx` |
| 3 | Client logos | `AboutClientLogos.tsx` |
| 4 | Engagement (5 accordion models) | `LightEngagementModels.tsx` |
| 5 | Team (Leadership/Engineering/Delivery) | `AboutTeamSection.tsx` |
| 6 | Awards marquee | `AwardsMarqueeSection.tsx` |
| 7 | Workspace gallery | `AnimatedPhotoGallery.tsx` |
| 8 | Offices (Bengaluru, Cuttack, San Francisco) | `Gallery.tsx` + `src/data/softree-offices.ts` |
| 9 | Contact | qc/LightContactSection |
| 10 | FAQ (6, inline) | LightFAQExact |

### Key copy

- Hero: Softree® Technology; "Enterprise Software & AI Solutions"; "We Build Digital Solutions with" + cycling: Agentic AI, Web Apps, Power Platform, Data Analytics, Cloud Solutions
- "Enterprise AI, Microsoft platforms, and cloud-native apps — scoped, scaled, and shipped."; "Shipping production-grade software since 2013"
- About H3: "Your global offshore development partner."; "30+ countries served. 200+ projects delivered."
- Mission: "Engineer solutions that scale with your ambition." / Vision: "Lead the future of enterprise AI and cloud."
- Stats: 50+ enterprise clients | 98% retention | 50+ Microsoft-certified engineers | 30+ countries
- Spotlight: 95% Client Retention | 125+ Successful Enterprise Deliveries
- Logos H2: "Engineered alongside technology leaders."
- Engagement H2: "How We Partner With You" — Dedicated Teams, White-Label, Staff Augmentation, Project Delivery, Managed Services
- Team H2: "The Team Behind Every Solution"
- Awards: Microsoft Gold Partner (50+), ISO 27001 (2023), Clutch (2024), Power Platform Excellence, Great Place to Work (2024)
- Offices: "Pay Us A Visit"

### SEO

- Title: About Us | Softree Technology - AI & Enterprise Solutions

### FAQs (6)

Offshore partner choice; industries served; Microsoft experience; security/governance
(ISO 27001:2022, ISO 9001:2015); white-label; low-code + custom dev

### Oddities

22 unused legacy files in src/app/about-us/ (hero.tsx, hero-elite.tsx, story.tsx, …)

---

## Page 3: Generative AI (`/services/offshore-generative-ai-development`)

### Render order (11)

1. Hero + testimonials (`hero.tsx`)
2. Trust marquee (shared trust.tsx)
3. Services — 6-tab explorer (`services.tsx`): Model Dev, Replication, Integration, Maintenance, Fine-Tuning, Strategy
4. Models (`sticky-models.tsx`): GPT, DALL·E, Whisper, Midjourney, Claude, Gemini, Llama, Stable Diffusion
5. Industries — 15-sector grid (`industry.tsx`)
6. Process — 6-step carousel (`process.tsx`)
7. Framework — 4-step timeline (`gen-frame.tsx`)
8. Why Softree (`why-gen-ai.tsx`, stray meta tag bug)
9. Certifications
10. Contact
11. FAQ (5, in page.tsx)

### Key copy

- Hero H1: "Enterprise Generative AI Solutions & AI Automation Services"
- Services H2: "End-to-End Generative AI Built for Enterprise Scale"
- Models H2: "Built on World-Class Intelligence"
- Industries H2: "Expertise Across Every Sector"
- Process H2: "From Concept to Intelligent Automation"
- Framework H2: "A Structured Path to Production-Ready Generative AI"
- Why H2: "Built for Long-Term Impact" + 4.9/5 rating block

### SEO

- Title: Generative AI Development Services | Custom AI & Enterprise Automation

### Orphans

cta.tsx, faq.tsx, "faq copy.tsx"

---

## Page 4: AI-Powered Test Automation (`/services/ai-powered-test-automation`)

### Render order (9)

1. Hero (`hero.tsx`)
2. Trust / QAForge metrics (`trust.tsx`) — QAForge product branding
3. Testing services — 5 tabs (`testing-services.tsx`): Web, API, Mobile, AI Regression, CI/CD
4. Solutions grid — 6 cards (`testing-support.tsx`)
5. Engagement — 3 models (`models.tsx`)
6. Why Softree — 3 pillars (`why.tsx`)
7. Tech stack — 7 tabbed categories (`tech.tsx`)
8. Contact
9. FAQ (5, in page.tsx)

### Notable stats (QAForge section)

70% manual effort reduced | 3.2h regression cycle | 98.4% CI/CD pass | 94% coverage |
2.1k tests | 99% uptime SLA | 14m avg build | 340+ enterprises | SOC 2 Type II | GDPR Ready

### SEO

- Title: AI-Powered Test Automation Services | Softree

### Orphan

cta.tsx

---

## Page 5: AI Case Studies (`/case-studies/ai`)

### Render order

1. Hero (`CaseStudyHero.tsx`) — hardcoded `categoryConfig.ts`
2. Grid (`CaseStudyGridNew.tsx`) — Sanity CMS via `getCaseStudyItemsByCategory('ai')`
3. Empty state (inline fallback)
4. Category links (dynamic counts from Sanity)
5. Proof CTA (`CaseStudyProofCTA.tsx`) — hardcoded
6. Contact (qc/LightContactSection)
7. FAQ (3, hardcoded)

### Hardcoded AI category copy

- Eyebrow: Artificial Intelligence · Machine Learning
- Title: "AI case studies"
- Hero stat: 412% — "ROI achieved for Enterprise AI Decision Platform"
- Proof quote: "The AI decision platform delivered 412% ROI in year one…" — Chief Analytics Officer, Financial Services
- FAQs: featured projects / technologies / measuring success

---

## Cross-page inconsistencies to fix during redesign

1. Countries served: 12+ (agentic data) vs 30+ (constants / About) — unify on 30+
2. Years: 12yr vs 18+ vs "since 2013" — unify (2013 → 13 years as of 2026; verify with client)
3. Client counts: 50+ clients / 100+ engineers / 125+ deliveries / 150+ reviews — pick a coherent set
4. Brand leakage: TechAhead (orphaned industry.tsx), QAForge (test automation trust)
5. Duplicate LightContactSection paths (qc/ vs homepage-light/)
6. Invalid stray `<meta>` JSX in why.tsx files
