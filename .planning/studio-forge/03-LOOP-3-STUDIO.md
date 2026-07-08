# Loop 3 — Single-path editor UX (industry alignment)

**Date:** 2026-07-06  
**Phase:** `authoring_ux`  
**Mode:** TEN_OUT_OF_TEN  
**Research:** `03-WEB-RESEARCH.md`

## Audit findings (before)

| Problem | Impact |
| --- | --- |
| 16+ case study templates in global Create | Editors pick wrong template or blank layout |
| Sidebar: guided + 6 categories + dashboard + global Create | Same action, 9 paths |
| Blog: composer + classic + 3 body-only templates | Empty editor on broken templates |
| Category as template not field | Confusion ("which AI template?") |
| `postCompleteness` defaulted `displayMode` to classic | Needs-work queue wrong for new posts |
| Dead `StudioWelcome.tsx` | Conflicting intents if ever wired |

## Changes shipped

### One create path
- **Case studies:** `＋ New case study` at top of sidebar → `caseStudy-composer` only
- **Blog:** `＋ New blog post` at top → `post-composer` only
- **Global Create (+):** only Case study, Blog post, Marketing landing page

### Templates consolidated (`templates.ts`)
- Editor templates: 3
- Legacy templates: 4 blog (fixed with `displayMode: 'classic'`)
- Removed 11 redundant case study category/archetype templates from registration
- `editorTemplates.ts` — single allowlist for `newDocumentOptions`

### In-document guidance
- `PostEditorWelcome` on all blog posts (mirrors case study welcome)
- Technology **category** moved to Story tab (identity fieldset)
- Blog `displayMode` collapsed under Advanced layout
- Dashboard guide rewritten to match Story → Page → Publish flow

### Cleanup
- Deleted orphan `StudioWelcome.tsx`
- Fixed `POST_NEEDS_WORK` coalesce to `composer`

## Editor workflow (final)

### Case study
1. **＋ New case study** (sidebar, dashboard, or global Create — all same)
2. **Story** tab: title, slug, client, category, excerpt
3. **Page** tab: edit starter sections
4. **Media** → cover
5. **Publish & SEO** → Publish

### Blog post
1. **＋ New blog post**
2. **Content** tab: title, slug, excerpt, image
3. **Page composer** tab: sections
4. **Publish** tab

*(Optional: Content Agent for AI-generated drafts)*

## Verification

| Gate | Result |
| --- | --- |
| `npm run build` | exit 0 |
| Linter | clean on touched files |
| Structure create paths | 2 (CS + blog), not 16 |
| Global Create filter | 3 templates |

## Remaining (Loop 4+)

- Chrome MCP console gate on `/studio`
- Hide Legacy sections tab when composer mode
- Visual polish phase (dashboard, studio.css)
- Collapse case study tab count (6 → 4)
