# Softree CMS — Content Model v0.1

**Agent 2 — CMS Engineer**  
**Status:** Draft for review

---

## Design principles

1. **Structured over presentational** — blocks carry content, not layout CSS
2. **Objects in page builder, references for reuse** — FAQs, testimonials, authors
3. **Singletons for globals** — one source of truth per site config
4. **Separate metric fields** — case study KPIs are queryable, not buried in PT
5. **SEO fields on every public document** — meta, OG, keywords, FAQ
6. **One composer model** — eliminate classic/blog legacy in new schema (migrate data in)

---

## Document types

### Editorial

| Type | Route | Purpose |
|------|-------|---------|
| `caseStudy` | `/case-studies/:slug` | Primary proof content |
| `post` | `/blog/:slug` | Blog / thought leadership |
| `marketingPage` | `/p/:slug` | Campaign landing pages |
| `service` | `/services/:slug` | Service detail (optional v1) |

### Taxonomy

| Type | Purpose |
|------|---------|
| `category` | Blog categories |
| `serviceLine` | Case study service lines (replaces string enum) |
| `tag` | Optional cross-cutting tags |

### People & social proof

| Type | Purpose |
|------|---------|
| `author` | Blog bylines |
| `testimonial` | Reusable quotes (reference from pages) |
| `client` | Client logos / names (optional) |

### Reusable content banks

| Type | Purpose |
|------|---------|
| `faqBank` | Shared FAQ sets |
| `ctaBlock` | Reusable CTAs |

### Singletons

| Type | `_id` | Purpose |
|------|-------|---------|
| `siteSettings` | `siteSettings` | Name, URL, logo, default SEO, analytics |
| `navigation` | `navigation` | Header menu (references) |
| `footer` | `footer` | Footer columns + legal |
| `homepage` | `homepage` | Hero, featured case studies, sections |
| `careersPage` | `careersPage` | Full careers content |
| `aiContext` | `aiContext` | Brand voice for AI |

---

## Case study schema (core)

```
caseStudy
├── title, slug
├── clientName, clientLogo
├── serviceLine → serviceLine (reference)     # replaces string category
├── excerpt (max 160)
├── coverImage (+ alt)
├── layoutKey (enum)                          # premium layout registry
├── sections[] (composer blocks)              # primary content
├── metrics[] { label, value, context }
├── testimonial → testimonial (optional ref)
├── relatedCaseStudies[] → caseStudy
├── seo { metaTitle, metaDescription, focusKeyword, secondaryKeywords[], ogImage }
├── faq[] { question, answer }                # min 2 for publish
├── editorial { reviewStatus, publishedAt }
└── visibility: 'visible' | 'hidden' | 'archived'   # replaces dual status hack
```

### Composer section types (objects)

| Block | Purpose |
|-------|---------|
| `section.hero` | Eyebrow, headline, subhead, media, CTAs |
| `section.overview` | Summary + key facts |
| `section.narrative` | Rich text chapter |
| `section.metrics` | Stat strip |
| `section.gallery` | Image grid |
| `section.beforeAfter` | Comparison |
| `section.techStack` | Logo grid |
| `section.testimonial` | Quote (inline or ref) |
| `section.faq` | FAQ accordion |
| `section.cta` | Call to action |
| `section.related` | Related content |
| `section.contact` | Lead form embed |

**Common fields on every section** (from cms-kit pattern):

- `theme`, `paddingY`, `background`, `anchorId`

---

## Post schema

```
post
├── title, slug, excerpt
├── author → author
├── categories[] → category
├── coverImage (+ alt)
├── sections[] (shared composer blocks + blog-specific)
├── body (portable text) — DEPRECATED, migration only
├── seo { ... }
├── faq[]
├── editorial { reviewStatus, publishedAt }
└── visibility
```

---

## Marketing page schema

```
marketingPage
├── title, slug
├── sections[] (marketing blocks: hero, features, testimonial, richText, cta)
├── seo { ... }
├── editorial { ... }
└── visibility
```

---

## Site settings (singleton)

```
siteSettings
├── siteName, siteUrl, logo
├── defaultSeo { title, description, ogImage }
├── social[] { platform, url }
├── contact { email, phone, address }
├── analytics { gtmId, posthogId }
└── designTokens { accent, typography preset }
```

---

## Relationships (entity graph)

```
serviceLine ←── caseStudy
service ←── caseStudy (optional)
author ←── post
category ←── post
testimonial ←── caseStudy, marketingPage
faqBank ←── page sections (reference)
siteSettings ──→ default SEO for all routes
navigation.menuItems[] ──→ page | post | caseStudy | service
```

---

## GROQ patterns

- One query file per route family: `queries/caseStudy.ts`, `queries/blog.ts`
- Co-located fragments per section type
- Conditional projection for `sections[]`
- `visibility == "visible"` filter (with migration coalesce for legacy `status`)
- `defineQuery` everywhere for typegen

---

## Migration mapping (old → new)

| Old | New |
|-----|-----|
| `status: published/draft/archived` | `visibility: visible/hidden/archived` |
| `category` (string) | `serviceLine` reference |
| `composerSections` | `sections` |
| `faqSchema` | `faq` |
| `globalSettings` | `siteSettings` |
| `homepageCaseStudySlider` | `homepage.featuredCaseStudies` |
| `detailLayout` | `layoutKey` |
| UI-only fields | **DROP** — never migrate |

---

## Validation rules (publish gates)

| Type | Required for publish |
|------|---------------------|
| caseStudy | title, slug, excerpt, cover+alt, ≥1 section, ≥2 FAQ, serviceLine, review approved (prod) |
| post | title, slug, excerpt, cover+alt, ≥2 FAQ, author |
| marketingPage | title, slug, ≥1 section |

---

## Open questions

1. Promote `serviceLine` to document type vs keep app-level enum for nav — **lean document type**
2. `faqBank` references vs inline only — **both**: inline default, bank for reuse
3. Keep `marketingPage` separate from generic `page` — **yes** (different templates)
