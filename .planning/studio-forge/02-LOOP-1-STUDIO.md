# Loop 1 — Structure stability

**Phase:** structure_stability  
**Verdict:** PENDING Chrome MCP verification

---

## Changes

| File | Change |
| --- | --- |
| `src/sanity/structure.ts` → `structure.tsx` | JSX plain-function wrappers for Dashboard, Presentation, Live preview |
| `structure.tsx` | Added `canHandleIntent` on all `docList()` + blog posts list |
| `structure.tsx` | Added Published (`caseStudiesPublished`) + Drafts (`caseStudiesDrafts`) lists — restores bookmark URLs |
| `structure.tsx` | Added Presentation sidebar item |
| `CaseStudyLivePreviewPane.tsx` | Removed `memo()`; default export plain function |

---

## Expected fixes

- [x] `component is required and must be a function` — plain functions in structure module
- [x] Deep link / create intent routing — `canHandleIntent`
- [x] Stale `/caseStudiesPublished` URL — pane ID restored

---

## Gates to run

- [x] `npm run build` — exit 0 (`/studio/[[...tool]]` compiles)
- [ ] `/studio/structure/dashboard` loads (manual / Chrome MCP)
- [ ] `/studio/structure/caseStudies;caseStudiesPublished` loads
- [ ] Case study document → Live preview tab
- [ ] Chrome MCP console clean
