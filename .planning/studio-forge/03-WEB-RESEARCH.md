# Web Research — Studio Editor UX (Loop 3)

**Date:** 2026-07-06  
**Sources cited for consolidation decisions**

## Industry patterns (Sanity + editorial CMS)

| Pattern | Source | Applied? |
| --- | --- | --- |
| **Explicit allowlist sidebar** — build tree manually, omit types from catch-all | [Nayan Kyada — Structure grouping](https://nayankyada.com/blog/how-i-customise-sanity-structure-builder-with-custom-ordering-and-grouping) | Yes — caseStudy/post excluded from root list |
| **Published / Drafts / Needs work buckets** | [Social Animal — 3000+ posts](https://socialanimal.dev/blog/sanity-studio-production-tips-3000-posts-groq-schemas/), [Nayan Kyada — hide draft noise](https://nayankyada.com/blog/how-i-use-sanitys-structure-builder-to-hide-draft-noise-and-speed-up-editor-work) | Already had; kept |
| **One create path per content type** — avoid 10 templates in global Create | Social Animal + Sanity docs | **Loop 3 fix** — global Create shows 3 items only |
| **Field groups on 6+ field types** | Social Animal | Story/Content default tab + welcome panel |
| **Soft validations for drafts** — don't block save | Social Animal | Guarded publish only on publish action |
| **`canHandleIntent` on custom lists** | [Sanity Structure docs](https://www.sanity.io/docs/studio/structure-introduction) | Already implemented |
| **Category in form, not in template menu** | Common pattern (Contentful, Sanity editorial studios) | **Loop 3** — technology category on Story tab |

## Anti-patterns we removed

1. **6 category templates + 3 story archetypes + composer** in global Create (16 case study entry points)
2. **Templates by category** submenu duplicating global Create
3. **Classic vs composer blog** as parallel sidebar creates
4. **Broken body-only blog templates** without `displayMode: 'classic'`
5. **Orphan `StudioWelcome.tsx`** with conflicting intents

## Target editor mental model (post Loop 3)

```
Home dashboard
  └─ Quick action: New case study | New blog post

Case studies
  └─ ＋ New case study          ← ONLY create path
  └─ Needs work / Published / Drafts / All

Blog
  └─ ＋ New blog post           ← ONLY create path
  └─ Needs work / All posts

Global Create (+)
  └─ Case study | Blog post | Marketing landing page
```

Category, technologies, and layout are **fields inside the document** — not separate templates.

## Optional power-user paths (documented, not removed)

- **Content Agent** (`/studio/content-agent`) — AI-generated blog drafts
- **Presentation** — visual editing on live site
- **Legacy templates** — still registered for old bookmarks; hidden from UI
