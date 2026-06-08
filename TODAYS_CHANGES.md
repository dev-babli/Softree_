# Today's Changes Summary — June 4, 2026

Today has seen major structural additions, bug fixes, integration of new frontend modules (Kore, Avoora, Spiral Gallery, Story Reel, Testimonial Slider), and Sanity CMS enhancements. Below is a detailed breakdown of all commits, modified components, new features, and tests introduced today.

---

## 📅 Commit History (Today)

| Commit Hash | Time (Local) | Author | Message |
|:---|:---|:---|:---|
| **`5e4c923`** | 19:56:46 | satabdimohanty2000 | fixed wrapper pixel issue it is cutting from the middle and gtm issue |
| **`2e4719d`** | 18:59:40 | satabdimohanty2000 | fix: restore deleted category components needed by local category pages |
| **`d482a2d`** | 18:55:04 | satabdimohanty2000 | fix: restore missing layout preview/certification helpers and fix duplicate slides type |
| **`d522ade`** | 18:50:23 | satabdimohanty2000 | Merge branch 'main' of https://github.com/dev-babli/Softree_ into satabdi |
| **`c0c7d5b`** | 15:58:46 | satabdimohanty2000 | done_dusted |
| **`efd2f82`** | 15:04:55 | satabdimohanty2000 | fix(deps): remove gemini Sanity plugins incompatible with Sanity 5 |
| **`e557275`** | 14:50:32 | satabdimohanty2000 | Major changes done new pages built |

---

## 🛠️ Summary of Changes by Component

### 1. Kore Primitives & Hooks (`src/components/kore/`)
A set of new design system primitives, motion handlers, and hooks has been introduced:
- **Hooks**:
  - `use-scroll-triggers.ts` (GSAP-like scroll triggering logic)
  - `use-tab-strip.ts` (Dynamic tab navigation hooks)
- **Keyframes & Styling**:
  - `keyframes.css` (Tailored micro-animations)
  - `tokens.css` & `tokens.ts` (Core design system color, font, and spacing tokens)
- **Components & Primitives**:
  - `kore-accordion-row.tsx` (Collapsible accordion row)
  - `kore-button-dot.tsx` (Dot hover effects on buttons)
  - `kore-hover-image-target.tsx` (Interactive image hover transitions)
  - `kore-marquee.tsx` (Infinite scrolling marquee text/items)
  - `kore-modal.tsx` (Smooth modal transitions)
  - `kore-rive-canvas.tsx` (Canvas runtime for Rive vector animations)
  - `kore-section-pill.tsx` (Sleek badge/pill selectors)
  - `kore-swiper-wrapper.tsx` / `kore-tab-panel.tsx` / `kore-tab-strip.tsx` / `kore-side-arrow.tsx`
- **Sections**:
  - `kore-loader.tsx` (Premium intro loader animation)

### 2. Showcase Systems (`src/components/showcase/`)
Two major showcase modules have been implemented:
- **Avoora Interactive Showcase**:
  - `AvooraBento.tsx`, `AvooraCanvas.tsx`, `AvooraCta.tsx`, `AvooraServices.tsx`, `AvooraStudioSection.tsx`, `BrandLogos.tsx` (A clean, visual-heavy presentation of products and brand logos)
- **Spiral Gallery**:
  - `SpiralGallery.tsx`, `SpiralGalleryCanvas.tsx`, `SpiralGalleryControls.tsx`, `config.ts`, `tuning.ts` (A 3D/WebGL spiral layout gallery for visual assets and portfolio pieces)
- **Home Intro**:
  - `ConceptFrame.tsx`, `EditorialStats.tsx`, `LogoMarqueeEditorial.tsx`, `LogoMosaic.tsx`, `LogoTickerVertical.tsx`, `PracticesCards.tsx`, `VariantFrame.tsx`

### 3. Story Reel & Testimonials
- **Story Reel**:
  - `SoftreeStoryReelHero.tsx`, `StoryCoverImage.tsx`, `StoryReel.tsx`, `StoryReelSoftreeParts.tsx` (An immersive interactive reel component to showcase Softree's story)
- **Testimonial Slider**:
  - `SoftreeLightTestimonialSlider.tsx`, `TestimonialBrandPanel.tsx`, `TestimonialSlider.tsx` (Premium slider with WebGL "Grainient" transitions)

### 4. Global Sections & Layout Updates (`src/components/sections/`)
- **New Sections**:
  - `GlobalClientNetwork.tsx` (Client geographical node network)
  - `SuccessStoriesBentoSection.tsx` (Rich Bento-grid success metrics and links)
  - `why-us-advantage/` (BentoPanel, ProjectMarquee, WhyUsAdvantageSection)
  - `StuxenHeroClone.tsx` & `StuxenAboutV1Clone.tsx` (Clone structures for specific homepage variants)
  - `PostHeroSequence.tsx` (Transition lane after the hero)
- **Modified & Polished Sections**:
  - `google-analytics.tsx`: Updated and fixed route tracking, GTAG event logging, page_view events, and tracking init scripts.
  - `certification.tsx` & `trusted-by.tsx`: Fixed duplicate slides, layout preview helper linkages, and wrapper pixel cutting issues on custom layouts.
  - `KoreEnterpriseCarousel.tsx`, `KorePlatformShowcaseSection.tsx`, `OffshoreCoreFeatures.tsx`, `ServicesStackedSlides.tsx` (Aligned styling tokens, borders, and margins to prevent layout overflow).

### 5. Sanity CMS Studio Integration (`src/sanity/` & `studio-softree-technology/`)
- **PPT Import Plugin**:
  - Added custom plugin inside `studio-softree-technology/plugins/pptImport` including `PptImportInput.tsx` and `pptParser.ts` to allow importing slide decks/presentations directly into case study documents.
- **Assist & AI Copilot Fields**:
  - Configured `@sanity/assist` with custom instruction templates (`instructionTemplates.ts`) and field action handlers (`fieldActions.tsx`).
- **Badges & Previews**:
  - `CaseStudyDocumentBadge.tsx` (Document status badges)
  - `CaseStudyLivePreviewPane.tsx` (Refined live-preview integration)

### 6. Automated Verification Tests (`tests/`)
Three new property and coverage tests were added to maintain code quality:
- `tests/property/asset-manifest.test.ts` (Validates asset loading path coverage)
- `tests/property/tab-strip.test.ts` (Interactive tab behaviour test cases)
- `tests/property/token-coverage.test.ts` (Ensures CSS/JS style token mappings align perfectly)

---

## 🔍 Verification Status

1. **Working Tree Status**: Clean.
2. **Build and Deployment Checks**: Run local dev servers or verify package.json tasks to ensure all component imports are valid.
