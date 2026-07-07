# Loop 6 — Category & template simplification

**Phase:** Authoring UX (Phase 3)  
**Verdict:** SHIPPED  
**Build:** `npm run build` exit 0

---

## Problem

Editors confused by:

1. Category vs template vs layout — looked like three overlapping choices
2. Only Power Platform visible on site (prior loop fixed default; still needed mental model)
3. 17 layout cards in `DetailLayoutInput` competing with category picker
4. Legacy template IDs in `editorTemplates.ts` with no registered templates

---

## Research conclusion (enterprise)

**One create path → pick metadata in the form → build with blocks.**

- **Template** = how the document starts (single `caseStudy-composer`)
- **Category** = service line / site taxonomy (field, not template)
- **Layout** = render format (default `page-composer`; reference layouts advanced only)

See `06-WEB-RESEARCH-TEMPLATES.md`.

---

## Changes

| File | Change |
| --- | --- |
| `CaseStudySetupInput.tsx` | Unified Story setup: category cards + format picker + reference layouts (collapsed) |
| `caseStudyEditorGuide.ts` | Single source for editor copy, layout groups, when-to-use |
| `caseStudyType.ts` | Removed duplicate welcome panel; hidden `detailLayout` field; setup on `category` |
| `CaseStudyCategoryInput.tsx` | Superseded by setup input (kept on disk, unused) |
| `DetailLayoutInput.tsx` | No longer mounted in schema (reference layouts in setup accordion) |

---

## Editor flow (after)

```
＋ New case study  (one template)
  ↓
Story tab → Story setup
  1. Pick service category (AI, Web, Mobile, …)
  2. Pick page format (Flexible builder — default)
  3. Title, slug, client, …
Page tab → stack sections
Publish tab → go live
```

---

## Which template for which?

| You are writing… | Create template | Category field | Page format |
| --- | --- | --- | --- |
| Any new client story | Case study | Match service line | Flexible page builder |
| AI / Copilot project | Case study | AI | Flexible page builder |
| Web / SaaS delivery | Case study | Web | Flexible page builder |
| Showcase / demo URL | Case study | As appropriate | Reference layout (advanced) |

---

## Remaining for editors (content debt)

- Recategorize existing docs still set to Power Platform incorrectly
- Use **Case studies → Browse by category** to audit counts

---

## Gates

| Gate | Result |
| --- | --- |
| Build | ✅ |
| Single create template | ✅ |
| Category required (non-archived) | ✅ (loop 5) |
| Unified setup UI | ✅ |
| Reference layouts not default | ✅ |
