# Loop 6 — Web research: category vs template (enterprise CMS)

**Date:** 2026-07-07  
**Scope:** How large teams separate taxonomy, templates, and page layout in headless CMS.

---

## Findings

### Sanity (official)

- **Initial value templates** define starting content for a document type — not navigation taxonomy.  
  Source: [Working with templates](https://www.sanity.io/docs/canvas/templates), [newDocumentOptions](https://sanity-docs.sanity.build/docs/studio/new-document-options)
- **`newDocumentOptions`** filters what appears in global Create vs structure context — enterprise teams expose **one template per content type** in the global menu and hide legacy IDs.
- **Field labels / scoped templates** reduce editor noise — writers see only fields relevant to their task.
- **Category/topic** should be a **schema field**, not a separate document template per category.

### Contentful (enterprise modeling)

- **Do not couple content types to page templates** — every front-end variation becomes a schema change.  
  Source: [Content modeling strategy](https://www.contentful.com/blog/develop-content-model-strategy/), [Modeling patterns](https://www.contentful.com/help/content-models/content-modeling-patterns/)
- **Topics vs assemblies:** Topics (articles, case studies) stay reusable; pages assemble **blocks/sections** in flexible order.
- **Channel-oriented vs content-oriented:** Fixed nav + flexible page body is the common hybrid — matches Softree (fixed site nav, flexible case study composer).
- **Modular blocks field** on a page type replaces “pick template A vs B vs C” at create time.

### Pattern applied to Softree

| Enterprise concept | Softree implementation |
| --- | --- |
| One content type | `caseStudy` |
| One create template | `caseStudy-composer` |
| Taxonomy / service line | `category` field (6 values) |
| Flexible page body | `page-composer` + `composerSections` |
| Fixed showcase layouts | Reference `detailLayout` values — advanced only |
| Filtered Create menu | `EDITOR_CREATE_TEMPLATE_IDS` in `editorTemplates.ts` |

### Anti-patterns we removed

- ❌ Separate create template per service line (`caseStudy-web`, `caseStudy-ai`, …)
- ❌ Default category = Power Platform on every new doc
- ❌ 17 layout cards shown equally at create/edit time
- ❌ Category validation skipped for drafts

---

## References

1. [Sanity — newDocumentOptions](https://sanity-docs.sanity.build/docs/studio/new-document-options)
2. [Sanity — Working with templates](https://www.sanity.io/docs/canvas/templates)
3. [Contentful — Develop content model strategy](https://www.contentful.com/blog/develop-content-model-strategy/)
4. [Contentful — Content modeling patterns](https://www.contentful.com/help/content-models/content-modeling-patterns/)
5. [Contentful — Flexible content models](https://www.contentful.com/blog/building-flexible-content-models-budget/)
