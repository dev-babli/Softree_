# Softree Studio — Baseline Audit

**Route:** `/studio` (embedded Next.js + Sanity v6.3)  
**Captured:** 2026-07-06

---

## Known breakages (user-reported)

| Issue | Symptom | Root cause (suspected) |
| --- | --- | --- |
| Structure load error | `component is required and must be a function for component() view item` | `memo()`-wrapped preview pane or cross-boundary import not resolving as plain function |
| Re-render crash | Too many re-renders #301 | `.defaultPanes([editor, preview])` on document node — removed |
| Stale structure URLs | `/studio/structure/caseStudies;caseStudiesPublished` | Old pane IDs not in current structure |

---

## Current stack

| Layer | Location |
| --- | --- |
| Config | `sanity.config.ts` |
| Structure | `src/sanity/structure.ts` |
| Custom chrome | `StudioLayout`, `StudioNavbar`, `StudioBoot` |
| Dashboard | `src/sanity/studio/StudioDashboard.tsx` |
| Live preview | `CaseStudyLivePreviewPane.tsx` |
| Tools | Presentation, Content Agent, React Bits, Gemini Image, Vision |
| AI | Assist plugin, guarded publish, SEO/blocks actions |

---

## Gap analysis vs Sanity docs + Softree UX rules

| Area | Status | Gap |
| --- | --- | --- |
| Structure component views | 🔴 Broken | Plain function requirement |
| `canHandleIntent` | 🔴 Missing | Deep links / create may fail on nested lists |
| Published / Draft lists | 🟡 Partial | No published/draft split; old IDs missing |
| Presentation shortcut | 🟡 Nav only | Not in structure sidebar |
| Split pane default | 🟡 Manual tab | defaultPanes disabled for stability |
| Light editorial theme | 🟢 Good | `studio.css` + theme.ts |
| Dashboard KPIs | 🟢 Good | Charts, health ledger, recent edits |
| Guarded publish | 🟢 Good | Readiness gate |
| Logo / brand | 🟢 Good | SoftreeLogo in navbar |
| Viewport lock scroll | 🟢 Good | `data-softree-studio-route` |
| Section picker drawer | 🟡 Verify | ComposerSectionsInput |
| Web research targets | — | Sanity opinionated guide, structure intents, custom views |

---

## Benchmark references (web)

1. [Sanity Structure Introduction](https://www.sanity.io/docs/studio/structure-introduction) — `canHandleIntent` on custom `.child()`
2. [Custom document views](https://www.sanity.io/docs/studio/create-custom-document-views-with-structure-builder) — plain React function for `.view.component()`
3. [Opinionated Studio guide](https://www.sanity.io/docs/developer-guides/an-opinionated-guide-to-sanity-studio) — plugins folder, collocate structure
4. [Focus Reactive customization](https://focusreactive.com/sanity-customization/) — multi-view documents, branded chrome

---

## Loop target (10/10)

| Dimension | 10/10 means |
| --- | ---: |
| Structure stability | Zero structure errors; all panes load |
| Visual polish | Light editorial theme, logo, spacing, micro-interactions per `softree-studio-ux-polish.mdc` |
| Authoring UX | Needs-work queues, templates, readiness, guarded publish |
| Preview | Live preview tab works; Presentation tool one click |
| AI surfaces | Assist + Content Agent + field actions coherent |
| Performance | Studio route RES acceptable; no runaway re-renders |
| Accessibility | Keyboard nav, focus rings, reduced motion |
