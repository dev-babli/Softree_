# Loop 2 — Case Study Authoring UX (P0 fix)

**Date:** 2026-07-06  
**Phase:** `authoring_ux` (cross-cut from structure_stability)  
**Trigger:** User screenshot — new case study editor showed only "Untitled" + "Used on one page", no text fields.

## Root cause

1. **Default tab was `Page` (composer)** while many templates set `detailLayout` to a fixed layout (e.g. `manufacturing-power-platform`).
2. On fixed layouts, **all Page-tab fields are hidden** (`composerSections` hidden when layout ≠ `page-composer`).
3. Story fields (title, slug, excerpt) live on the **Story** tab — users never switched tabs → empty editor.
4. **"New — standard template"** used `caseStudy-standard` with legacy layout + no composer sections → worst case empty Page tab.

## Fixes shipped

| Change | File |
| --- | --- |
| Default tab → **Story** (title/slug visible first) | `caseStudyType.ts` |
| **Getting started** welcome panel (ungrouped, always visible) | `CaseStudyEditorWelcome.tsx` |
| **Page layout** picker visible (DetailLayoutInput) | `caseStudyType.ts` |
| All templates default to **page-composer** + starter sections | `templates.ts` |
| Sidebar: **＋ Create case study (guided)** + category templates submenu | `structure.tsx` |
| Removed confusing **New — standard template** entry | `structure.tsx` |

## Author flow (simplified)

1. **Home** → "New case study" OR **Case studies** → "＋ Create case study (guided)"
2. **Story** tab opens first → fill title, slug, client, excerpt
3. **Page** tab → edit starter sections (challenge / approach / outcome / metrics / contact)
4. **Publish & SEO** → readiness meter → Publish

## Verification

- `npm run build` → exit 0
- Manual: open `http://localhost:3000/studio` → Case studies → Create guided → confirm Story fields + welcome panel

## Next loop (Phase 2–3)

- Chrome MCP gate: zero console errors on create flow
- Wire `LayoutReadinessPanel` into publish group
- Dashboard copy alignment with new sidebar labels
