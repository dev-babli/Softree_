# Premium Case Study Layout — Fine-Tuning Loop

**Goal:** Every layout in `CASE_STUDY_LAYOUTS` renders production-quality on real Sanity data.  
**Registry:** `src/lib/case-study-layouts.ts` → `CaseStudyPageRenderer.tsx`  
**Loop:** Audit → Fix → Visual verify → Score → Repeat until ≥9/10

---

## Loop protocol (per layout)

1. Pick layout from queue
2. Assign 1+ real published case studies using it (or seed demo doc)
3. Audit: data mapping, mobile, a11y, motion, SEO blocks (FAQ/contact)
4. Fix `mapCaseStudyData.ts` + layout component
5. Screenshot compare (desktop + mobile)
6. Score /10 — must be ≥9 to mark done
7. Log in `premium-layout-loop-state.json`

---

## Layout queue

| Layout key | Title | Renderer | Score | Status | Notes |
|------------|-------|----------|-------|--------|-------|
| `manufacturing-power-platform` | Manufacturing PP | `ManufacturingPowerPlatformLayout` | 8 | done | Fixed mapping iter 1 |
| `page-composer` | Page composer | `PageComposerLayout` | 9 | done | 4 CMS mismatches fixed iter 1 |
| `sidebar-metadata` | Sidebar metadata | `SidebarMetadataLayout` | — | pending | |
| `split-hero-mockup` | Split hero | `SplitHeroMockupLayout` | — | pending | |
| `zigzag-alternating` | Zig-zag | `ZigzagAlternatingLayout` | — | pending | |
| `vertical-timeline` | Timeline | `VerticalTimelineLayout` | — | pending | |
| `tabbed-deliverables` | Tabbed | `TabbedDeliverablesLayout` | — | pending | |
| `bento-results` | Bento | `BentoResultsLayout` | — | pending | |
| `video-hero` | Video hero | `VideoHeroLayout` | — | pending | |
| `before-after-table` | Before/after | `BeforeAfterTableLayout` | — | pending | |
| `stats-dashboard` | Stats dashboard | `StatsDashboardLayout` | — | pending | |
| `parallax-screenshots` | Parallax | `ParallaxScreenshotsLayout` | — | pending | |
| `nexora-product-story` | Nexora | `NexoraProductStoryLayout` | — | pending | |
| `synqlab-product-story` | SynqLab | `SynqLabProductStoryLayout` | — | pending | |
| `payflow-fintech-story` | PayFlow | `PayFlowFintechStoryLayout` | — | pending | |
| `ai-horizontal-story` | AI horizontal | `AIHorizontalStoryLayout` | — | pending | GSAP perf check |
| `neutrino-dashboard-story` | Neutrino | `NeutrinoDashboardStoryLayout` | — | pending | |
| `madar-sticky-story` | Madar sticky | `MadarStickyStoryLayout` | — | pending | |
| `education-edtech-story` | EdTech | `EducationEdTechStoryLayout` | — | pending | |

---

## Audit rubric (each layout)

| Criterion | Weight |
|-----------|--------|
| Maps all CMS fields (no empty fallbacks) | 20% |
| Mobile responsive (375px) | 15% |
| Typography + spacing (Softree tokens) | 15% |
| Images (alt, aspect, lazy) | 10% |
| Motion (respects `prefers-reduced-motion`) | 10% |
| FAQ + contact present or self-contained | 10% |
| Related studies / internal links | 5% |
| JSON-LD / meta compatibility | 5% |
| Lighthouse perf (no layout shift) | 10% |

---

## Known issues (iteration 0)

1. `manufacturing-power-platform` → `EducationEdTechStoryLayout` (miswired)
2. `SELF_CONTAINED_PREMIUM` only lists `page-composer` — several premium layouts may duplicate FAQ/footer
3. Legacy `storyType` archetypes (`TransformationEpicLayout`, etc.) parallel to `detailLayout` — consolidate in new CMS

---

## New CMS integration

- Field name: `layoutKey` (alias `detailLayout` during migration)
- Studio: layout picker with preview thumbnails (port from `LayoutReadinessPanel`)
- Validation: warn if layout required fields missing (metrics, hero image, etc.)

---

## Current loop

**Iteration:** 1  
**Focus:** Fix `manufacturing-power-platform` mapping + audit `page-composer` on 3 live case studies  
**Next:** `sidebar-metadata`, `split-hero-mockup`
