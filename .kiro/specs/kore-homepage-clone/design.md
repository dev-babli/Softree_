# Design Document

## Overview

This design specifies a 99.9% pixel-perfect React clone of the Kore.ai homepage rendered at the App Router route `/kore-ai-component` (file: `src/app/kore-ai-component/page.tsx`). The single source of truth is the saved Webflow-rendered HTML at `public/kore-source-sections.html` (the **Source_Document**), captured with full DOM, inline `<style>` blocks, and runtime computed CSS.

The clone is a **front-end visual port**, not a feature build. Every literal style value, DOM structure, animation timing, and interaction handler in the Source_Document is preserved verbatim or proxied through a typed token system. Backend integrations, third-party tracking, the Webflow runtime, HubSpot, Intellimize, GTM, and analytics SDKs are explicitly excluded (Requirement 28).

The implementation is layered across three concerns:

1. **Design_Tokens** (`src/components/kore/tokens.ts` + `src/components/kore/tokens.css`) — every color, font, spacing, radius, shadow, easing, duration, z-index, and breakpoint extracted from Source_Document into a typed `as const` module plus a Tailwind v4 `@theme`-compatible CSS export. Token_Coverage MUST equal 100% (Requirement 22.6).
2. **Component_Modules** (`src/components/kore/sections/*` + `src/components/kore/primitives/*`) — one named, prefixed React component per Page_Section and per repeatable visual primitive, server-rendered by default, marked `'use client'` only when a browser-only API (Lenis, GSAP ScrollTrigger, Swiper, Rive, Hover_Image_Preview, Exit_Modal, Loader_Sequence) is required (Requirement 23).
3. **Asset_Manifest** (`src/components/kore/assets.ts`) — typed entries for every external asset URL, classified as either `cdn-passthrough` (preserving the original `cdn.prod.website-files.com` URL byte-for-byte) or `local` (under `public/kore/<section>/<asset>.<ext>`). Rive `.riv` assets default to CDN passthrough with a local `fallback` path (Requirement 24).

The page is composed in document order as: Loader → Top_Strip → Navigation → Hero → Industry_Tabs → Business_Outcomes → Analyst_Recognition → Testimonials → Strategic_Partners → AI_Insights → Pre_Footer_CTA → Footer → Modals_Layer → Hover_Image_Preview → Chatbot (Requirement 1.2). Lenis_Scroller drives smooth scrolling, GSAP ScrollTrigger drives `data-anim*` reveals, Swiper 12 drives every carousel, and `@rive-app/canvas` (the only new top-level dependency permitted, Requirement 29.8) drives the Hero and Business_Outcomes Rive_Canvas_Blocks.

Three runtime invariants thread through every section:

- **Strict scope:** Only files under `src/app/kore-ai-component/`, `src/components/kore/`, `public/kore/`, and one entry in workspace `package.json` MAY be touched (Requirement 1.8).
- **No tracking:** Zero requests to any host in the Out_Of_Scope_Backends list, zero `<script>` injections matching Out_Of_Scope_Scripts (Requirement 28).
- **Reduced motion fallback:** Every animation, autoplay, scroll trigger, marquee, and modal transition has a Reduced_Motion path that completes in 1 animation frame (Requirements 4.9, 6.10, 8.11, 13.8, 15.9, 17.7, 18.7, 19.12, 20.9).

This is a **UI rendering and pixel-fidelity feature**. The dominant verification strategy is screenshot diffing at the three Reference_Viewports plus DOM-structure equivalence assertions and runtime contract tests. A small number of structural invariants (token coverage, asset-manifest completeness, mutual-exclusion of modals/tabs, scope-confinement of file edits) are universally quantified and DO benefit from property-based testing — these are captured in the Correctness Properties section. The bulk of acceptance criteria are example-based or screenshot-comparison tests.

## Architecture

### Directory Layout

```
src/
  app/
    kore-ai-component/
      page.tsx                    ← server component, exports KoreAiComponentPage
      layout.tsx                  ← optional, only if scoped <body bg> override is required
      kore-page.tsx               ← 'use client' page tree composer (Lenis + ScrollTrigger orchestration)
  components/
    kore/
      tokens.ts                   ← typed Design_Tokens (Requirement 22.1)
      tokens.css                  ← Tailwind v4 @theme mirror of tokens.ts (Requirement 22.7)
      assets.ts                   ← typed Asset_Manifest (Requirement 24)
      keyframes.css               ← every @keyframes from Source_Document (Requirement 20.1)
      data/
        top-strip.ts              ← Cycling_Strip_Slide fixtures
        navigation.ts             ← Mega_Menu / Mobile_Drawer fixtures
        hero.ts                   ← headline / subhead / CTAs / Rive cards
        industry-tabs.ts          ← five industries × logo lists
        business-outcomes.ts      ← four Outcomes_Tabs + nine Artemis_Sub_Tabs
        analyst-recognition.ts    ← four analyst tabs
        testimonials.ts           ← testimonial slides
        strategic-partners.ts     ← Microsoft + AWS cards
        ai-insights.ts            ← 1 featured + 4 latest blog entries (Requirement 12.5)
        pre-footer-cta.ts         ← two CTA blocks
        footer.ts                 ← link columns / social / legal / RFP CTA
        modals.ts                 ← enterprise tech stack + AI-for-Work/Service/Process video modals
        exit-modal.ts             ← exit-intent modal copy
        chatbot.ts                ← chatbot copy
      hooks/
        use-reduced-motion.ts     ← matchMedia('(prefers-reduced-motion: reduce)') + change events
        use-coarse-pointer.ts     ← matchMedia('(hover: none) and (pointer: coarse)')
        use-lenis.ts              ← Lenis instantiation, GSAP ticker sync, cleanup (Requirement 19)
        use-rive-block.ts         ← @rive-app/canvas loader with intersection observer + 10s timeout (Requirement 26.5)
        use-scroll-triggers.ts    ← data-anim/data-anim-rotate/data-anim-scale/data-anim-hero-image (Requirement 19)
        use-focus-trap.ts         ← shared modal focus trap (Requirement 15.7, 25.7)
        use-tab-strip.ts          ← shared tab activation + ARIA wiring (Requirement 25.10)
      primitives/
        kore-button-dot.tsx        ← dot+line hover button primitive (Requirement 20.4–5)
        kore-section-pill.tsx      ← uppercase Source Code Pro pill label (Requirement 21.5)
        kore-tab-strip.tsx         ← role=tablist + role=tab wiring (Requirement 25.10)
        kore-tab-panel.tsx         ← role=tabpanel
        kore-accordion-row.tsx     ← grid-template-rows 0fr→1fr accordion (Requirement 3.6, 20.7)
        kore-modal.tsx             ← role=dialog, aria-modal, focus trap, Esc, backdrop (Requirement 15)
        kore-swiper-wrapper.tsx    ← Swiper 12 lazy-mounted via IntersectionObserver (Requirement 27.8)
        kore-rive-canvas.tsx       ← @rive-app/canvas mount with poster fallback (Requirement 6.9, 26.5)
        kore-marquee.tsx           ← marqueeSlide keyframe wrapper (Requirement 20.3)
        kore-side-arrow.tsx        ← sideArrowFlow keyframe child (Requirement 20.6)
        kore-hover-image-target.tsx ← imperative hook into Hover_Image_Preview registry
      sections/
        kore-loader.tsx            ← Loader_Sequence (Requirement 17)
        kore-top-strip.tsx         ← rotating announcement strip (Requirement 4)
        kore-navigation.tsx        ← sticky mega-menu + mobile drawer (Requirement 5)
        kore-hero.tsx              ← 100vh hero + three Rive cards (Requirement 6)
        kore-industry-tabs.tsx     ← five industries × logo Swiper (Requirement 7)
        kore-business-outcomes.tsx ← four tabs + nine Artemis sub-tabs + Rive (Requirement 8)
        kore-analyst-recognition.tsx ← four analyst tabs (Requirement 9)
        kore-testimonials.tsx      ← testimonial Swiper (Requirement 10)
        kore-strategic-partners.tsx ← Microsoft + AWS partner cards (Requirement 11)
        kore-ai-insights.tsx       ← 1 featured + 4 latest blog grid (Requirement 12)
        kore-pre-footer-cta.tsx    ← two pre-footer CTAs (Requirement 13.1–2)
        kore-footer.tsx            ← full site footer (Requirement 14)
        kore-modals-layer.tsx      ← enterprise tech + 3 video modals (Requirement 15)
        kore-exit-modal.tsx        ← top-edge exit-intent modal (Requirement 13.3–8)
        kore-hover-image-preview.tsx ← cursor-following preview (Requirement 16)
        kore-chatbot.tsx           ← floating chatbot affordance (Requirement 18)
public/
  kore/
    rive/                         ← .riv local fallbacks (Requirement 24.4)
    hero/                         ← Hero local images (if not CDN passthrough)
    industry-tabs/                ← logo SVGs that are NOT CDN passthrough
    ...                           ← one folder per Page_Section, kebab-case
```

### Render Pipeline

```mermaid
flowchart TD
    A[/kore-ai-component request] --> B[layout.tsx HTML lang=en, body bg #FFFFFF]
    B --> C[page.tsx server component, metadata, no client work]
    C --> D[kore-page.tsx 'use client', orchestrates Lenis + ScrollTriggers + Loader]
    D --> E1[KoreLoader]
    D --> E2[KoreTopStrip]
    D --> E3[KoreNavigation]
    D --> E4[main>KoreHero]
    E4 --> F1[KoreRiveCanvas xN, lazy via IntersectionObserver]
    D --> E5[KoreIndustryTabs]
    E5 --> F2[KoreSwiperWrapper xN, lazy via IntersectionObserver]
    D --> E6[KoreBusinessOutcomes]
    E6 --> F3[KoreRiveCanvas + KoreTabStrip + KoreTabStrip Artemis]
    D --> E7[KoreAnalystRecognition]
    D --> E8[KoreTestimonials]
    D --> E9[KoreStrategicPartners]
    D --> E10[KoreAiInsights]
    D --> E11[KorePreFooterCta]
    D --> E12[KoreFooter]
    D --> E13[KoreModalsLayer, code-split, mounted on first trigger]
    D --> E14[KoreHoverImagePreview]
    D --> E15[KoreExitModal]
    D --> E16[KoreChatbot]
```

### Server vs Client Boundary

Per Requirement 23.5–6, every Component_Module is server-rendered by default. The following are forced to `'use client'` because they require browser-only APIs:

| Component | Reason for `'use client'` |
| --- | --- |
| `kore-page.tsx` | Lenis_Scroller orchestration + GSAP ticker sync (Req 19) |
| `kore-loader.tsx` | `document.documentElement.classList`, `setTimeout` (Req 17) |
| `kore-top-strip.tsx` | Rotation `setInterval`, dismissal session state (Req 4) |
| `kore-navigation.tsx` | Pointer enter/leave, `lenis-stopped` toggle, scroll position read (Req 5) |
| `kore-hero.tsx` | Rive lazy mount + button hover (Req 6) |
| `kore-industry-tabs.tsx` | Swiper instantiation + tab state (Req 7) |
| `kore-business-outcomes.tsx` | Rive + Swiper + tab state + GSAP timelines (Req 8) |
| `kore-analyst-recognition.tsx` | Tab state + duration-in/out animation (Req 9) |
| `kore-testimonials.tsx` | Swiper instantiation, autoplay, pause-on-hover (Req 10) |
| `kore-modals-layer.tsx` | Focus trap, Esc handler, video play/pause (Req 15) |
| `kore-exit-modal.tsx` | `mouseleave` from top edge (Req 13.3) |
| `kore-hover-image-preview.tsx` | `requestAnimationFrame` cursor follow + lerp (Req 16) |
| `kore-chatbot.tsx` | Click-to-expand stagger + input state (Req 18) |

`KoreAiInsights`, `KorePreFooterCta`, `KoreStrategicPartners`, `KoreFooter` (server tree), and the static markup of every other section render server-side; only their hover/scroll behaviors hydrate progressively.

### Code Splitting and First-Load Budget

Per Requirement 27 the route's First Load JS bundle MUST be ≤350 KB uncompressed. The strategy:

- **Eager (first-load bundle):** `kore-page.tsx`, `kore-loader.tsx`, `kore-top-strip.tsx`, `kore-navigation.tsx`, `kore-hero.tsx` skeleton (without Rive runtime), `kore-industry-tabs.tsx` skeleton (without Swiper runtime), `tokens.ts`, `assets.ts`, `use-reduced-motion.ts`, `use-lenis.ts`, `use-scroll-triggers.ts`.
- **Lazy via dynamic `import()` keyed on `IntersectionObserver` with a 200 px pre-fetch margin (Req 27.6, 27.8):**
  - `@rive-app/canvas` runtime + each `.riv` asset, gated by the host element entering the viewport.
  - Each Swiper_Instance whose host element first appears more than 844 px below the initial scroll position (Industry_Tabs Swiper if below fold on mobile, Testimonials Swiper, any Business_Outcomes Swiper).
- **Lazy via `next/dynamic` with `ssr: false`, gated on first user trigger (Req 27.9):**
  - `kore-modals-layer.tsx` chunk — fetched only when any modal trigger is activated.

`<link rel="preload" as="image">` is emitted in `<head>` for the Hero background video poster image (Req 27.7) via the `metadata.other` field on `page.tsx` or via a `<link>` injected from `layout.tsx`'s `<head>`.

### Smooth Scroll and Animation Orchestration

Lenis_Scroller and GSAP ScrollTrigger are owned by a single root client component (`kore-page.tsx`) so cleanup is correct on route navigation away (Req 19.11):

```ts
// use-lenis.ts (sketch)
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return; // Req 19.12: native scrolling fallback
    const lenis = new Lenis({
      duration: SOURCE_LENIS_DURATION,   // tokens.durations.lenisDuration
      easing: SOURCE_LENIS_EASING_FN,    // tokens.easings.lenis
      smoothWheel: true,
      smoothTouch: false,
      direction: 'vertical',
      gestureDirection: 'vertical',
    });
    const raf = (time: number) => lenis.raf(time * 1000); // GSAP ticker is in seconds
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, []);
}
```

ScrollTriggers register `start: "top 95%"`, `once: true`, and the entrance transitions declared by the `data-anim*` rules in Source_Document (Req 19.4–9). The `transition-delay` ladder for `[transition-delay="0".."15"]` is emitted in `keyframes.css` via a static rule block (Req 19.5).

### Responsive Breakpoint System

Source_Breakpoints map directly to `tokens.breakpoints` (Req 22.3):

| Token | Pixel value | Active when |
| --- | --- | --- |
| `mobilePortrait` | 360 | always (smallest) |
| `mobileLandscape` | 480 | viewport ≥ 480 |
| `tablet` | 768 | viewport ≥ 768 |
| `desktop` | 992 | viewport ≥ 992 |

The legacy `@media (max-width: Npx)` rules from Source_Document are mirrored into Tailwind v4 arbitrary media queries on each component (`max-991:`, `max-767:`, `max-479:`) or kept verbatim in section-scoped CSS modules where Tailwind cannot represent the rule. Per Req 3.8–9, the layout MUST re-evaluate within 1 animation frame on `resize` / `orientationchange`; this is the default browser CSS behavior for media queries and requires no additional JavaScript except for the Mobile_Drawer / Mega_Menu visibility flag, which subscribes to `matchMedia('(min-width: 992px)').addEventListener('change', ...)`.

### State Boundaries

```mermaid
flowchart LR
    GS[Global state: zustand-free, prop-drilled] --> A[KorePage]
    A --> RM[ReducedMotion: useReducedMotion hook]
    A --> CP[CoarsePointer: useCoarsePointer hook]
    A --> HI[HoverImagePreviewRegistry: imperative ref-based]
    HI --> KHIP[KoreHoverImagePreview]
    HI --> KHIB[KoreHoverImageTarget x N]
    A --> ML[ModalState: open/close + which modal]
    ML --> KML[KoreModalsLayer]
    ML --> KEM[KoreExitModal]
    A --> LS[LoaderState: ready | loading]
    LS --> KL[KoreLoader]
```

State is intentionally minimalist — no Redux, no Zustand, no Context. The four genuinely cross-component states (Reduced_Motion, Coarse_Pointer, Hover_Image_Preview registry, modal stack) are owned by `kore-page.tsx` and exposed through small typed React contexts. Tab-strip state is local to each section.

## Components and Interfaces

This section enumerates the public interface of every Component_Module. Every component is exported as a named PascalCase export prefixed with `Kore` (Req 23.8–9), declared in a kebab-case file (Req 23.10).

### Section Components (`src/components/kore/sections/`)

#### `KoreLoader`

```ts
interface KoreLoaderProps {
  // No props — content is fully encoded in fixture
}
```

- Files: `kore-loader.tsx`
- Client component (Req 17 needs `document.documentElement.classList`).
- Renders two stacked logo nodes (`.loader.logo-1` and `.loader.logo-2`) with the cross-fade declared in Source_Document.
- On mount: applies `loading` class within 1 frame (Req 17.1), holds first logo for the source-declared duration (Req 17.3), cross-fades to second logo within 1000 ms (Req 17.4), removes `loading`, applies `ready`, unmounts (Req 17.5).
- 5000 ms force-complete safeguard (Req 17.8). Reduced_Motion path skips entirely (Req 17.7).

#### `KoreTopStrip`

```ts
interface CyclingStripSlide {
  readonly id: string;
  readonly text: string;
  readonly href: string | null;
  readonly variant: 'default' | 'new'; // 'new' applies .new modifier (Req 4.3)
}

interface KoreTopStripProps {
  readonly slides: readonly CyclingStripSlide[];
  readonly rotationIntervalMs: number; // sourced from Source_Document rotation script
}
```

- Renders `<div class="top-strip-bar">` per slide, positions absolute with opacity 0/1 cycling (Req 4.4–6).
- Close button (Req 4.7) sets a session flag in component state, hides the entire strip, and stops the timer (Req 4.8). Session flag is in-memory only — it does NOT persist to `localStorage` (preserves the session-scoped behavior of Source_Document and avoids any Out_Of_Scope persistence).
- Reduced_Motion path swaps slides instantly within 1 frame (Req 4.9).

#### `KoreNavigation`

```ts
interface MegaMenuItem {
  readonly id: 'agent-platform' | 'agentic-ai-apps' | 'agent-marketplace' | 'more';
  readonly label: string;
  readonly href: string | null;
  readonly menu: MegaMenuPanel;
}

interface MegaMenuPanel {
  readonly columns: readonly MegaColumn[]; // .mega-column nodes with stagger nth-child delays
  readonly recentInsights?: readonly LinkCard[];
  readonly eventCta?: LinkCard;
}

interface KoreNavigationProps {
  readonly logo: AssetRef;
  readonly items: readonly MegaMenuItem[];
  readonly languageToggle: LanguageToggleData;
  readonly demoCta: ButtonData;
}
```

- Renders desktop Mega_Menu structure when `viewportWidth >= 992` (Req 5.2–8) and Mobile_Drawer otherwise (Req 5.9–13).
- Sticky behavior: `position: sticky` on the wrapper plus the `transition: transform 0.9s` rule when the strip's bottom edge scrolls above viewport top (Req 5.1).
- Mega_Menu open/close: pointer enter/leave on the trigger and panel; column stagger uses CSS-only `nth-child` transition delays declared in Source_Document (Req 5.3–4).
- Mobile_Drawer: hamburger toggle (click + Enter + Space) opens the drawer with the source-declared transition (Req 5.10), accordion sub-menus use `grid-template-rows: 0fr → 1fr` (Req 5.11), `lenis-stopped` is applied to `<html>` while open (Req 5.12) and removed on close (Req 5.13).

#### `KoreHero`

```ts
interface KoreHeroProps {
  readonly headline: PortableHeading; // includes <span> nodes for inline highlights
  readonly subhead: string;
  readonly demoCta: ButtonData;
  readonly analystReportsCta: ButtonData;
  readonly artemisAnnouncement: ArtemisAnnouncementCard;
  readonly backgroundVideo: VideoAssetRef;     // Req 6.2
  readonly riveCards: readonly [RiveCardData, RiveCardData, RiveCardData]; // exactly three (Req 6.4)
}

interface RiveCardData {
  readonly id: 'pre-built-applications' | 'application-accelerators' | 'tailored-applications';
  readonly riveSrc: AssetRef;        // .riv passthrough URL
  readonly posterFallback: AssetRef; // local PNG/JPG (Req 6.9, 26.5)
  readonly title: string;
  readonly body: string;
  readonly cta: ButtonData;
}
```

- 100vh outer section with `padding-bottom: 0` (Req 6.1).
- Each Rive_Canvas_Block uses `KoreRiveCanvas` primitive: `IntersectionObserver` with 200 px pre-fetch (Req 27.6), opacity 0→1 over 350 ms after first frame paint (Req 6.5).
- 10 second timeout falls back to poster `<img>` (Req 6.9, 26.5).
- Reduced_Motion: video paused on first frame, Rive on first frame, side-arrow keyframe disabled (Req 6.10).

#### `KoreIndustryTabs`

```ts
type IndustryId = 'banking' | 'healthcare' | 'retail' | 'telecom-and-media' | 'business';

interface IndustryTabData {
  readonly id: IndustryId;
  readonly label: string;
  readonly logos: readonly LogoData[];
}

interface KoreIndustryTabsProps {
  readonly heading: string;
  readonly tabs: readonly [IndustryTabData, IndustryTabData, IndustryTabData, IndustryTabData, IndustryTabData];
  readonly initialActive: IndustryId; // 'banking' per Req 7.3
}
```

- Tab strip uses `KoreTabStrip` primitive (role=tablist + role=tab + aria-selected + aria-controls).
- Each tab pane lazy-mounts a `KoreSwiperWrapper` whose Swiper config (`slidesPerView`, `spaceBetween`, `loop`, `speed`, `autoplay`, `freeMode`, `breakpoints`) is sourced verbatim from Source_Document (Req 7.6).
- Logo dimensions enforced by tokens: `tokens.spacing.connectLogoWidth = 120` and `tokens.spacing.connectLogoImgHeight = 22` (Req 7.7).

#### `KoreBusinessOutcomes`

```ts
type OutcomesTabId =
  | 'pre-built-applications'
  | 'application-accelerators'
  | 'tailored-applications'
  | 'agent-platform-artemis';

type ArtemisSubTabId =
  | 'overview' | 'agents' | 'orchestration' | 'tools'
  | 'memory' | 'guardrails' | 'analytics' | 'integrations' | 'governance';

interface OutcomesTabData {
  readonly id: OutcomesTabId;
  readonly label: string;
  readonly content: OutcomesPaneContent;
  readonly subTabs?: readonly ArtemisSubTabData[]; // only present on agent-platform-artemis
}

interface KoreBusinessOutcomesProps {
  readonly heading: string;
  readonly tabs: readonly OutcomesTabData[]; // length 4 (Req 8.1)
}
```

- Outer wrapper is `#explore-products`. When `agent-platform-artemis` is active, applies `dark-mode` class (Req 8.5); removes it on transition to any other tab (Req 8.6).
- Each tab pane uses the `[tabs-component] [tabs-content]:not(.active) { display: none }` rule from Source_Document (Req 8.4).
- Artemis sub-tab activation replays a GSAP entrance timeline via `useGsapTimeline()` ref (Req 8.7).
- `hover-img-button` elements register with the `KoreHoverImagePreview` registry (Req 8.8–9, Req 16).
- Embedded Rive cards use `KoreRiveCanvas` with the same 350 ms opacity transition (Req 8.10).
- Reduced_Motion: skips Artemis entrance timelines, applies post-animation state in 1 frame, holds Rive on first frame (Req 8.11).

#### `KoreAnalystRecognition`

```ts
interface AnalystTabData {
  readonly id: 'conversational-ai-platforms' | 'cognitive-search-platforms' | 'genai-applications' | 'genai-engineering';
  readonly label: string;
  readonly body: string;
  readonly analystImage: ResponsiveImage; // srcset + sizes + alt
  readonly cta: ButtonData;
}

interface KoreAnalystRecognitionProps {
  readonly heading: string;
  readonly tabs: readonly [AnalystTabData, AnalystTabData, AnalystTabData, AnalystTabData];
}
```

- Uses `KoreTabStrip`. `data-duration-in="300"`, `data-duration-out="100"`, and `data-easing` are read from `tokens.durations` and `tokens.easings` (Req 9.3).

#### `KoreTestimonials`

```ts
interface TestimonialSlide {
  readonly id: string;
  readonly customerLogo: AssetRef;
  readonly customerName: string;
  readonly role: string;
  readonly quote: string;
}

interface KoreTestimonialsProps {
  readonly slides: readonly TestimonialSlide[];
  readonly swiperConfig: SwiperConfig; // sourced from Source_Document
}
```

- `KoreSwiperWrapper` with autoplay, loop, navigation, pagination from source. Pause-on-hover hooks into `mouseenter`/`mouseleave` (Req 10.7).
- Disabled prev/next states styled via tokens when loop is off (Req 10.8).

#### `KoreStrategicPartners`

```ts
interface PartnerCard {
  readonly id: 'microsoft' | 'aws';
  readonly image: ImageAssetRef;
  readonly heading: string;
  readonly body: string;
  readonly cta: ButtonData; // includes target + rel (Req 11.6)
}

interface KoreStrategicPartnersProps {
  readonly heading: string;
  readonly cards: readonly [PartnerCard, PartnerCard]; // exactly two, Microsoft first (Req 11.1)
}
```

- Server component (no client behavior beyond CSS hover via `KoreButtonDot`).

#### `KoreAiInsights`

```ts
interface BlogItem {
  readonly id: string;
  readonly cover: ImageAssetRef;
  readonly title: string;
  readonly publishDate: string;
  readonly readTime: string; // empty string permitted (Req 12.3)
  readonly category?: string;
  readonly tag?: string;
  readonly href: string;
  readonly variant: 'featured' | 'latest';
}

interface KoreAiInsightsProps {
  readonly heading: 'AI Insights';
  readonly viewAllCta: ButtonData;
  readonly featured: BlogItem;                           // exactly one (Req 12.1)
  readonly latest: readonly [BlogItem, BlogItem, BlogItem, BlogItem]; // exactly four (Req 12.1)
}
```

- Server component. Data sourced from `src/components/kore/data/insights.ts` build-time fixture (Req 12.5). NO Webflow CMS, NO API call.
- Featured block carries `hide-mobile-landscape` class — it MUST become `display: none !important` at viewport ≤767 (Req 12.9).

#### `KorePreFooterCta`

```ts
interface CtaBlock {
  readonly id: 'accelerate-time-to-value' | 'start-using-artemis-today';
  readonly heading: string;
  readonly body: string;
  readonly primary: ButtonData;
  readonly secondary?: ButtonData;
}

interface KorePreFooterCtaProps {
  readonly blocks: readonly [CtaBlock, CtaBlock];
}
```

#### `KoreFooter`

```ts
interface FooterColumn {
  readonly heading: string;
  readonly links: readonly LinkData[];
}

interface KoreFooterProps {
  readonly logo: AssetRef;
  readonly languageToggle: LanguageToggleData;
  readonly columns: readonly [FooterColumn, FooterColumn, FooterColumn, FooterColumn]; // exactly four (Req 14.1)
  readonly rfpCta: CtaBlock;
  readonly social: readonly LinkData[];
  readonly legal: readonly LinkData[];
  readonly copyright: string;
}
```

- Back-to-top: invokes `lenis.scrollTo(0, { duration: tokens.durations.backToTop })` (Req 14.3); Reduced_Motion path uses `window.scrollTo({ top: 0 })` instantly (Req 14.9).
- Language list activation renders an inline non-functional acknowledgement text node (Req 14.8) — does NOT call any backend.
- ≤767 px: link columns collapse into `KoreAccordionRow` accordions (Req 14.6).

#### `KoreModalsLayer`

```ts
interface ModalDescriptor {
  readonly id: 'enterprise-tech-stack' | 'ai-for-work' | 'ai-for-service' | 'ai-for-process';
  readonly kind: 'content' | 'video';
  readonly heading: string;
  readonly body: string | ReadonlyArray<PortableContentNode>;
  readonly video?: VideoAssetRef; // required when kind='video'
  readonly poster?: ImageAssetRef;
  readonly closeAriaLabel: string;
}

interface KoreModalsLayerProps {
  readonly modals: readonly ModalDescriptor[]; // length 4
}
```

- Single global modal stack: at most one modal open at a time (Req 15.8). Triggers anywhere in the page tree call `openModal(id)` via context.
- Each modal is a `KoreModal` primitive with focus trap (Req 15.7), Esc-to-close (Req 15.4), backdrop dismiss, `lenis-stopped` while open, focus return on close.
- Video modals autoplay muted on open, pause and reset to time 0 on close (Req 15.5–6).
- 10 second video-load timeout falls back to poster (Req 15.10).
- Reduced_Motion path uses immediate display swap (Req 15.9).
- Code-split via `next/dynamic({ ssr: false })` — only fetched on first trigger (Req 27.9).

#### `KoreExitModal`

```ts
interface KoreExitModalProps {
  readonly heading: string;
  readonly body: string;
  readonly primary: ButtonData;
  readonly secondary: ButtonData;
}
```

- Listens for `mouseleave` on `document.documentElement` where `event.clientY <= 0` (top edge crossing) — fires only the first such event in the page session (Req 13.3).
- Uses `KoreModal` primitive — same focus trap, Esc, backdrop, focus restore.

#### `KoreHoverImagePreview`

```ts
interface HoverImageRegistry {
  register(target: HTMLElement, dataImg: string | null): () => void;
}

const HoverImageContext: React.Context<HoverImageRegistry>;

interface KoreHoverImagePreviewProps {
  // no props
}
```

- Renders one fixed-position container (`width: 180px`, `height: auto`, `pointer-events: none`, `z-index: 99`) per Req 16.1 — extracted into tokens.
- Registry pattern: any descendant component (e.g. `KoreBusinessOutcomes`, `KoreFooter`) can call `register(targetElement, dataImg)` from `useEffect`; on `pointerenter` the preview waits 100 ms (Req 16.2), fades opacity 0→1 over 500 ms, and starts a `requestAnimationFrame` loop that lerps the position toward the cursor with factor 0.15, offset 20 px below cursor (Req 16.3).
- `pointerleave` cancels pending entrance and fades 1→0 (Req 16.4).
- `(hover: none) and (pointer: coarse)` matchMedia: registry is a no-op (Req 16.5).
- Empty / missing `data-img`: registry skips that target without throwing (Req 16.6).
- `scroll` event hides preview within 1 frame; re-triggers if pointer is still over a target (Req 16.7).

#### `KoreChatbot`

```ts
interface KoreChatbotProps {
  readonly placeholder: string;
  readonly arrowAriaLabel: string;
}
```

- Collapsed → expanded transition with the staggered transition-delays declared in Source_Document (`.chatbot-line-spacer` 0.5 s, `.chatbot-input` 0.8 s, `.chatbot-arrow-btn` 0.3 s) (Req 18.3).
- Submit with non-empty trimmed message renders an inline acknowledgement and clears input (Req 18.4); empty/whitespace input is rejected and retains focus (Req 18.5).
- NO backend call — purely local component state.

### Primitive Components (`src/components/kore/primitives/`)

#### `KoreButtonDot`

```ts
interface KoreButtonDotProps {
  readonly label: string;
  readonly href?: string;
  readonly onClick?: () => void;
  readonly target?: string;
  readonly rel?: string;
  readonly ariaLabel?: string;
  readonly variant?: 'primary' | 'secondary';
}
```

- Source-document button class with leading dot + underline; hover transitions read from tokens (Req 20.4–5).

#### `KoreTabStrip`

```ts
interface KoreTabStripProps<T extends string> {
  readonly id: string;
  readonly tabs: readonly { id: T; label: ReactNode }[];
  readonly active: T;
  readonly onActivate: (id: T) => void;
  readonly orientation?: 'horizontal';
  readonly className?: string;
}
```

- Emits `role="tablist"`, each tab `role="tab"`, `aria-selected`, `aria-controls`, `aria-labelledby`, keyboard arrow-key navigation (Req 25.10).
- Active state styling via tokens.

#### `KoreModal`

```ts
interface KoreModalProps {
  readonly id: string;
  readonly headingId: string;
  readonly open: boolean;
  readonly onClose: () => void;
  readonly children: ReactNode;
  readonly closeAriaLabel: string;
  readonly enterMs?: number; // default tokens.durations.modalEnter
  readonly exitMs?: number;  // default tokens.durations.modalExit
}
```

- Manages: backdrop, Esc handler, focus trap (`use-focus-trap.ts`), `lenis-stopped` toggle, focus return on close, `aria-modal`, `role="dialog"`, `aria-labelledby` (Req 15, 25.6–7).
- Reduced_Motion replaces transitions with immediate swap (Req 15.9).

#### `KoreSwiperWrapper`

```ts
interface KoreSwiperWrapperProps {
  readonly id: string;
  readonly modules: readonly SwiperModule[]; // imported from 'swiper/modules'
  readonly config: Omit<SwiperOptions, 'modules'>;
  readonly children: ReactNode; // <SwiperSlide> children
  readonly preMountMargin?: string; // default '200px'
  readonly className?: string;
}
```

- Lazy-mounts the Swiper instance only when its host element enters the viewport with the configured pre-mount margin (Req 27.8). Renders an SSR-safe HTML skeleton (`<div class="swiper">`, `<div class="swiper-wrapper">`, child slides) before hydration so static screenshots and JS-disabled rendering succeed (Req 26.4).

#### `KoreRiveCanvas`

```ts
interface KoreRiveCanvasProps {
  readonly riveSrc: string;
  readonly poster: ImageAssetRef;
  readonly width: number;
  readonly height: number;
  readonly stateMachineName?: string;
  readonly autoplay?: boolean;
  readonly loadTimeoutMs?: number; // default 10000 (Req 6.9, 26.5)
  readonly className?: string;
  readonly ariaLabel?: string;
}
```

- Renders the poster `<img>` immediately, then mounts a `<canvas>` overlay when the host enters the viewport. On first frame paint: opacity 0→1 over 350 ms (Req 6.5). On 10 s timeout or load error: keeps poster, removes canvas, emits zero unhandled errors (Req 6.9).

#### `KoreAccordionRow`

```ts
interface KoreAccordionRowProps {
  readonly id: string;
  readonly trigger: ReactNode;
  readonly active: boolean;
  readonly onToggle: () => void;
  readonly children: ReactNode;
}
```

- `data-accordion-list="css"` + `data-accordion="active"` + `data-accordion-body` markup matching Source_Document; CSS-only `grid-template-rows: 0fr → 1fr` transition (Req 20.7).

### Asset Manifest Interface

```ts
// src/components/kore/assets.ts
export type AssetKind = 'cdn-passthrough' | 'local';

export interface CdnPassthroughAsset {
  readonly kind: 'cdn-passthrough';
  readonly url: `https://cdn.prod.website-files.com/${string}`;
  readonly fallback?: LocalAsset; // for .riv files (Req 24.4)
}

export interface LocalAsset {
  readonly kind: 'local';
  readonly url: `/kore/${string}`;
}

export type AssetRef = CdnPassthroughAsset | LocalAsset;

export interface ImageAssetRef extends AssetRef {
  readonly width?: number;
  readonly height?: number;
  readonly loading?: 'lazy' | 'eager';
  readonly decoding?: 'async' | 'sync' | 'auto';
  readonly srcset?: string;
  readonly sizes?: string;
  readonly alt: string;
}

export interface VideoAssetRef {
  readonly src: AssetRef;
  readonly poster?: AssetRef;
  readonly autoplay: boolean;
  readonly loop: boolean;
  readonly muted: boolean;
  readonly playsInline: boolean;
}

export const assets = {
  hero: { /* ... */ },
  industryTabs: { /* ... */ },
  // ... one key per Page_Section
} as const;
```

Per Req 24.7–9: an image is rendered with `next/image` only if Source_Document declares `loading="lazy"` for that image; otherwise it's rendered with a native `<img>` tag preserving the exact attribute set from Source_Document.

### Design Token Interface

```ts
// src/components/kore/tokens.ts
export const colors = {
  blue: '#1852FF',                // --blue
  charcoal03: '...',              // --primary--charcoal-03
  charcoal04: '...',              // --primary--charcoal-04
  borderLight: '...',             // --stroke--border-light
  white: '#FFFFFF',
  // ... every distinct color from Source_Document (Req 22.2)
} as const;

export const fonts = {
  spaceGrotesk: '"Space Grotesk", sans-serif',
  sourceCodePro: '"Source Code Pro", monospace',
  inter: '"Inter", sans-serif', // documented if omitted (Req 21.3)
} as const;

export const breakpoints = {
  mobilePortrait: 360,
  mobileLandscape: 480,
  tablet: 768,
  desktop: 992,
} as const;

export const easings = {
  silk: 'cubic-bezier(0.625, 0.05, 0, 1)',
  ease: 'ease',
  easeInOut: 'ease-in-out',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  linear: 'linear',
  anim: 'cubic-bezier(0.22, 0.6, 0.36, 1)', // --ease used by data-anim
  // ... every distinct timing function (Req 22.4)
} as const;

export const durations = {
  riveOpacity: 350,
  accordionGrid: 600,
  navStick: 900,
  dataAnim: 1250,
  // ... every distinct duration in ms (Req 22.5)
} as const;

export const fontSizes = { /* ... */ } as const;
export const fontWeights = { /* ... */ } as const;
export const lineHeights = { /* ... */ } as const;
export const letterSpacings = { /* ... */ } as const;
export const spacing = { /* ... */ } as const;
export const radii = { /* ... */ } as const;
export const shadows = { /* ... */ } as const;
export const zIndices = {
  topStrip: 50,
  navigation: 60,
  modals: 70,
  loader: 80,
  hoverImagePreview: 99,
  chatbot: 90,
  // ... matching the stacking order asserted in Req 2.8
} as const;
```

The mirror file `tokens.css` emits the same keys under `@theme` (Tailwind v4):

```css
/* src/components/kore/tokens.css */
@theme {
  --color-blue: #1852FF;
  --color-charcoal-03: ...;
  --font-space-grotesk: "Space Grotesk", sans-serif;
  --breakpoint-desktop: 992px;
  --ease-silk: cubic-bezier(0.625, 0.05, 0, 1);
  --duration-rive-opacity: 350ms;
  /* ... one-to-one with tokens.ts (Req 22.7) */
}
```

A `tokens-map.test.ts` build-time test asserts one-to-one cardinality between the TypeScript exports and the CSS `@theme` properties.

## Data Models

This section enumerates the typed data shapes used to render the page. All fixtures live under `src/components/kore/data/<section>.ts` and are imported by their owning section component (Req 23.4).

### Shared Primitives

```ts
// src/components/kore/data/_shared.ts
export interface ButtonData {
  readonly label: string;
  readonly href?: string;
  readonly target?: '_blank' | '_self';
  readonly rel?: string;
  readonly ariaLabel?: string;
  readonly variant: 'primary' | 'secondary' | 'ghost';
  readonly hoverImage?: AssetRef; // for hover-img-button class (Req 16)
}

export interface LinkData {
  readonly label: string;
  readonly href: string;
  readonly target?: '_blank' | '_self';
  readonly rel?: string;
  readonly ariaLabel?: string;
}

export interface PortableHeading {
  readonly text: string;
  readonly highlights?: readonly { readonly start: number; readonly end: number }[];
}

export interface LogoData {
  readonly id: string;
  readonly image: ImageAssetRef;
  readonly brandName: string; // -> alt
}
```

### Top Strip

```ts
// src/components/kore/data/top-strip.ts
import type { CyclingStripSlide } from '../sections/kore-top-strip';

export const topStripSlides: readonly CyclingStripSlide[] = [
  { id: 'slide-1', text: '...', href: '...', variant: 'new' },
  // ... one entry per .top-strip-bar in Source_Document, in source order (Req 4.1)
] as const;

export const TOP_STRIP_ROTATION_MS = 5000; // sourced from rotation script in Source_Document
```

### Navigation

```ts
// src/components/kore/data/navigation.ts
export interface MegaColumn {
  readonly id: string;
  readonly heading?: string;
  readonly cards?: readonly ProductCard[];
  readonly links?: readonly LinkData[];
}

export interface ProductCard {
  readonly id: string;
  readonly icon: AssetRef;
  readonly heading: string;
  readonly body: string;
  readonly href: string;
}

export const navigationData: KoreNavigationProps = { /* ... */ } as const;
```

### Hero

```ts
// src/components/kore/data/hero.ts
export interface ArtemisAnnouncementCard {
  readonly badge: string;
  readonly heading: string;
  readonly body: string;
  readonly cta: ButtonData;
  readonly image: ImageAssetRef;
}

export const heroData: KoreHeroProps = { /* ... */ } as const;
```

### Industry Tabs

```ts
// src/components/kore/data/industry-tabs.ts
export const industryTabsData: KoreIndustryTabsProps = {
  heading: '...',
  tabs: [
    { id: 'banking', label: 'Banking', logos: [/* ... */] },
    { id: 'healthcare', label: 'Healthcare', logos: [/* ... */] },
    { id: 'retail', label: 'Retail', logos: [/* ... */] },
    { id: 'telecom-and-media', label: 'Telecom and Media', logos: [/* ... */] },
    { id: 'business', label: 'Business', logos: [/* ... */] },
  ],
  initialActive: 'banking',
} as const;
```

### Business Outcomes

```ts
// src/components/kore/data/business-outcomes.ts
export interface OutcomesPaneContent {
  readonly heading: string;
  readonly body: string;
  readonly cards?: readonly ServiceCard[];
  readonly riveBlock?: RiveCardData; // for Application_Accelerators tab (Req 8.10)
  readonly hoverImageButtons?: readonly ButtonData[];
}

export interface ArtemisSubTabData {
  readonly id: ArtemisSubTabId;
  readonly label: string;
  readonly heading: string;
  readonly body: string;
  readonly visual: ImageAssetRef | RiveCardData;
}

export const businessOutcomesData: KoreBusinessOutcomesProps = { /* ... */ } as const;
```

### Analyst Recognition

```ts
// src/components/kore/data/analyst-recognition.ts
export const analystRecognitionData: KoreAnalystRecognitionProps = { /* ... */ } as const;
```

### Testimonials

```ts
// src/components/kore/data/testimonials.ts
export interface SwiperConfig {
  readonly slidesPerView: number | 'auto';
  readonly spaceBetween: number;
  readonly loop: boolean;
  readonly speed: number;
  readonly autoplay: { readonly delay: number; readonly disableOnInteraction: boolean } | false;
  readonly pagination?: { readonly clickable: boolean };
  readonly navigation?: boolean;
  readonly freeMode?: boolean;
  readonly breakpoints?: Readonly<Record<number, Partial<SwiperConfig>>>;
}

export const testimonialsData: KoreTestimonialsProps = { /* ... */ } as const;
```

### Strategic Partners

```ts
// src/components/kore/data/strategic-partners.ts
export const strategicPartnersData: KoreStrategicPartnersProps = {
  heading: 'Strategic partners',
  cards: [
    { id: 'microsoft', /* ... */ },
    { id: 'aws', /* ... */ },
  ],
} as const;
```

### AI Insights

```ts
// src/components/kore/data/ai-insights.ts (or insights.ts per Req 12.5)
export const aiInsightsData: KoreAiInsightsProps = {
  heading: 'AI Insights',
  viewAllCta: { /* ... */ },
  featured: { /* exactly one BlogItem with variant: 'featured' */ },
  latest: [/* exactly four BlogItem with variant: 'latest' */],
} as const;
```

### Pre-Footer CTA

```ts
// src/components/kore/data/pre-footer-cta.ts
export const preFooterCtaData: KorePreFooterCtaProps = { /* ... */ } as const;
```

### Footer

```ts
// src/components/kore/data/footer.ts
export interface LanguageToggleData {
  readonly current: string;
  readonly languages: readonly { readonly code: string; readonly label: string }[];
}

export const footerData: KoreFooterProps = { /* ... */ } as const;
```

### Modals & Exit Modal

```ts
// src/components/kore/data/modals.ts
export const modalsData: KoreModalsLayerProps = {
  modals: [
    { id: 'enterprise-tech-stack', kind: 'content', /* ... */ },
    { id: 'ai-for-work', kind: 'video', /* ... */ },
    { id: 'ai-for-service', kind: 'video', /* ... */ },
    { id: 'ai-for-process', kind: 'video', /* ... */ },
  ],
} as const;

// src/components/kore/data/exit-modal.ts
export const exitModalData: KoreExitModalProps = { /* ... */ } as const;
```

### Chatbot

```ts
// src/components/kore/data/chatbot.ts
export const chatbotData: KoreChatbotProps = {
  placeholder: '...',
  arrowAriaLabel: 'Send message',
} as const;
```

### Type Provenance

Every fixture file declares its values `as const` (Req 22.1) and exports types narrowed to their literal values. Acceptance tests (`fixtures.test.ts`) iterate every fixture and assert that:

- Every `href` is either an absolute `https://...` URL or starts with `/`.
- Every `image.alt` is a non-empty string.
- Every fixture record has a stable `id` field where required for tab strips, modal triggers, etc.
- Every `AssetRef` resolves: `cdn-passthrough` URLs match the `^https://cdn\.prod\.website-files\.com/` regex; `local` URLs match `^/kore/[a-z0-9-]+(/[a-z0-9.-]+)+$`.



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

This feature is dominantly UI rendering and visual fidelity, which is verified primarily through screenshot diffs at the three Reference_Viewports (Req 2.1–2.3) plus per-selector computed-style assertions. However, the spec contains a meaningful set of universal invariants — covering tab-strip ARIA wiring, modal mutual exclusion, design-token coverage across the source tree, asset-manifest cardinality, scope-confinement of file edits, and the absence of forbidden third-party content — that ARE suitable for property-based testing. Those universals are captured below. Each property is expressed as a "for all" statement and traces back to specific acceptance criteria.

### Property 1: Scope-Confinement of File Changes

*For any* file path appearing in the diff between the feature branch and `main`, the path SHALL begin with one of the prefixes `src/app/kore-ai-component/`, `src/components/kore/`, or `public/kore/`, OR the path SHALL be exactly `package.json` AND the diff SHALL only add `@rive-app/canvas` to its `dependencies` block.

**Validates: Requirements 1.8, 29.7, 29.8**

### Property 2: Media Query Parity Over Viewport Widths

*For any* viewport width W in the integer range [320, 2560] CSS pixels, *for any* CSS rule R declared in Source_Document inside an `@media (max-width: Npx)` block, R SHALL be active in Clone_Page at width W if and only if W ≤ N. Furthermore, *for any* pair of widths (W₁, W₂) with W₁ ≠ W₂, after the viewport transitions from W₁ to W₂, no rendered element SHALL retain a computed style contributed by a media query that matched only at W₁.

**Validates: Requirements 3.1, 3.9, 12.9**

### Property 3: Top Strip Rotation Correctness

*For any* slide array of length N ≥ 2 and *for any* tick count K ≥ 0, the active Cycling_Strip_Slide index after K rotation ticks SHALL equal `K mod N`, the previously-active slide's opacity SHALL transition from 1 to 0 within 1000 ms of the tick, and the newly-active slide's opacity SHALL transition from 0 to 1 within 1000 ms of the tick. *For any* sequence containing a close-button activation, all subsequent rotation ticks in that page session SHALL produce no opacity changes and the Top_Strip element SHALL remain hidden from layout.

**Validates: Requirements 4.4, 4.5, 4.6, 4.8**

### Property 4: Universal Tab Strip Invariant

*For any* `KoreTabStrip` instance with N ≥ 2 tabs, *for any* sequence of activations [t₁, t₂, …, t_k] where each tᵢ is a valid tab id, after the k-th activation: exactly one tab in the strip SHALL have `aria-selected="true"` (the tab with id t_k), every other tab SHALL have `aria-selected="false"`, exactly one panel referenced by `aria-controls` SHALL be visible (the panel for t_k), and every other panel in the strip SHALL match the `[tabs-component] [tabs-content]:not(.active) { display: none }` rule from Source_Document. Additionally, *for any* activation event triggered by mouse click, touch tap, Enter key, or Space key, the ARIA attributes SHALL update within 100 ms and the panel swap SHALL complete within 500 ms.

**Validates: Requirements 7.3, 7.4, 7.5, 8.1, 8.4, 8.5, 8.6, 9.2, 9.3, 25.10**

### Property 5: Modal Lifecycle Invariant

*For any* sequence of `openModal(id)` and `closeModal()` operations applied to the Modals_Layer plus the Exit_Modal, the following invariants SHALL hold:

- At most one modal SHALL have `open === true` at any point in the sequence (mutual exclusion).
- *While* a modal is open, simulating Tab and Shift+Tab from any focusable descendant SHALL cycle focus among that modal's focusable descendants only — focus SHALL never escape the open modal until the modal closes.
- *While* a modal is open, the document element SHALL carry the `lenis-stopped` class.
- *When* a modal closes, the `lenis-stopped` class SHALL be removed within 1 animation frame and keyboard focus SHALL return to the trigger element that opened it.
- *For any* video modal in the sequence, *when* the modal opens the underlying `<video>` element SHALL have `paused === false` and `muted === true`; *when* the modal closes the `<video>` SHALL have `paused === true` and `currentTime === 0`.
- *For any* page session, the Exit_Modal SHALL open at most once regardless of how many top-edge `mouseleave` events fire on the document element.

**Validates: Requirements 13.3, 13.4, 13.5, 13.7, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8, 25.6, 25.7**

### Property 6: Hover Image Preview Lifecycle and Lerp

*For any* element registered with the Hover_Image_Preview registry whose `data-img` attribute is a non-empty string, *when* a `pointerenter` event fires on the registered target the preview SHALL load `data-img`, wait 100 ms, then transition opacity from 0 to 1 over 500 ms with the image scale held at 1; *when* a `pointerleave` event fires the preview SHALL cancel any pending entrance and transition opacity from 1 to 0 over 500 ms. *For any* element whose `data-img` is missing or empty, *when* `pointerenter` fires the preview SHALL remain at opacity 0 and emit zero unhandled errors. *For any* cursor trajectory of N animation frames where the cursor is at position c_n on frame n, the preview position p_n SHALL satisfy `p_{n+1} = p_n + 0.15 × (c_n - p_n)` to within IEEE-754 double-precision tolerance, and the rendered y-coordinate SHALL be `p_n.y + 20`. *Where* the matchMedia query `(hover: none) and (pointer: coarse)` evaluates to true, *for any* registered target and any pointer event sequence, the preview SHALL remain at opacity 0.

**Validates: Requirements 16.2, 16.3, 16.4, 16.5, 16.6**

### Property 7: Loader Sequence Timing

*For any* first-logo display duration D in the closed interval [200, 2000] ms declared by the loader script in Source_Document, *for any* clock starting at the loader mount time t = 0:

- The `loading` class SHALL be present on the document element for the interval [0, t_complete) and absent thereafter, where t_complete ≤ min(D + 1000, 5000) ms.
- At t = D the cross-fade from `.loader.logo-1` to `.loader.logo-2` SHALL begin.
- At t = D + 1000 (or t = 5000 if the force-complete path triggers) the cross-fade SHALL be complete, the `loading` class SHALL be removed, the `ready` class SHALL be applied within 1 animation frame, and the loader DOM nodes SHALL be unmounted.
- The `anti-flicker` class SHALL never be present on the document element at any t ≥ 0.

**Validates: Requirements 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.8, 1.9**

### Property 8: Chatbot Input Validation

*For any* string S submitted to the chatbot via the input or arrow button, *if* `S.trim() === ''` *then* no acknowledgement node SHALL be rendered, the input value SHALL retain S, keyboard focus SHALL remain on the input, and zero network requests SHALL be issued. *If* `S.trim() !== ''` *then* exactly one inline acknowledgement node SHALL be rendered, the input value SHALL become the empty string, and zero network requests SHALL be issued to any Out_Of_Scope_Backend.

**Validates: Requirements 18.4, 18.5**

### Property 9: Token Coverage and tokens.ts ↔ tokens.css Parity

*For any* literal numeric value (excluding integers used as ARIA index strings), color value (hex, rgb, rgba, hsl, hsla, named keyword), easing function (named keyword or `cubic-bezier(...)`), duration value (ms or s), border-radius value, or shadow value appearing in any `.ts` or `.tsx` file under `src/components/kore/` or `src/app/kore-ai-component/`, the value SHALL be sourced from a property access on the `tokens` module (e.g. `tokens.colors.blue`, `tokens.durations.riveOpacity`) rather than written as a literal at the call site. *For any* leaf key K in `tokens.ts`, K SHALL have a corresponding `--<kebab-case-K>` CSS custom property in the `@theme` block of `tokens.css` whose value equals the TypeScript leaf value; conversely, *for any* `--K` property in `tokens.css` `@theme`, the TypeScript module SHALL export a leaf at the corresponding camelCase path with equal value (one-to-one cardinality).

**Validates: Requirements 22.6, 22.7**

### Property 10: Asset Manifest Well-Formedness

*For any* asset URL appearing in Source_Document at any of the declared selectors and attributes (`<img src>`, `<img srcset>`, `<source src>`, `<source srcset>`, `<video src>`, `<video poster>`, `<link rel="stylesheet" href>`, `<link rel="icon" href>`, `<link rel="apple-touch-icon" href>`, `data-rive-src`, CSS `url(...)`), the URL SHALL appear in exactly one entry of `assets.ts`. Conversely, *for any* entry E in `assets.ts`, E.url SHALL appear in Source_Document at one of the declared selector/attribute pairs. *For any* entry E with `kind === 'cdn-passthrough'`, E.url SHALL match the source URL byte-for-byte (scheme, host, path, query, fragment, and percent-encoding). *For any* entry E with `kind === 'local'`, E.url SHALL match the regex `^/kore/[a-z0-9-]+(/[a-z0-9.-]+)+$` AND the file SHALL exist at `public${E.url}`. *For any* entry E referring to a `.riv` file, E SHALL have a `fallback` field whose `kind === 'local'` and whose file exists.

**Validates: Requirements 24.1, 24.2, 24.3, 24.4, 24.5**

### Property 11: Out-Of-Scope Containment

*After* Loader_Sequence completion at any Reference_Viewport, *for any* observation window of 60 seconds of idle time, the rendered Clone_Page DOM and the browser's network panel SHALL satisfy:

- Zero `<script>` tags whose `src` attribute matches any pattern in the declared Out_Of_Scope_Scripts list.
- Zero `<script>` tags whose `src` matches the patterns `webflow.schunk.*.js`, `webflow.config.js`, or `webflow-internal-*`.
- Zero DOM elements carrying any attribute name matching `^data-wf-`.
- Zero `<script type="application/ld+json">` blocks.
- Zero outbound HTTP, WebSocket, EventSource, or `navigator.sendBeacon` requests to any host in the declared Out_Of_Scope_Backends list.
- Zero global window identifiers from the set `{clarity, dataLayer, gtag, fbq, _linkedin_partner_id, lintrk, intellimize}` defined as own properties of `window`.

**Validates: Requirements 1.4, 1.5, 28.1, 28.2, 28.3, 28.4, 28.5, 28.6, 28.7, 28.8, 28.9**

### Property 12: Component Naming, Use-Client Gating, and Accessibility Annotations

*For any* `.tsx` file F under `src/components/kore/sections/` or `src/components/kore/primitives/`, F SHALL declare exactly one named React component export, its export name SHALL be PascalCase prefixed with `Kore`, and the file's basename SHALL be the kebab-case form of the export name. *For any* file F containing the directive `'use client'` at the top, F SHALL reference at least one of the browser-only APIs `window`, `document`, `navigator`, `localStorage`, `sessionStorage`, Lenis, GSAP ScrollTrigger, Swiper, `@rive-app/canvas`, the Hover_Image_Preview registry, or a modal-open setter; *conversely* for any file F not so marked, F SHALL not reference any of those APIs. *For any* `<button>`, `<a>`, or `[role="button"]` element rendered by Clone_Page whose accessible name is not derivable from visible text content (icon-only), the element SHALL carry a non-empty `aria-label` attribute.

**Validates: Requirements 23.5, 23.6, 23.7, 23.8, 23.9, 23.10, 25.4**

## Error Handling

The clone is a presentational surface, but it MUST handle six classes of failure without throwing uncaught exceptions, breaking the layout, or contacting Out_Of_Scope_Backends.

### 1. Rive Asset Failure

Each `KoreRiveCanvas` instance is wrapped in a Promise race between (a) the Rive runtime's `onLoad` callback and (b) a 10-second `setTimeout`. On either rejection or timeout (Req 6.9, 8.10, 26.5):

- The poster `<img>` declared in `Asset_Manifest.fallback` is kept visible.
- The canvas opacity stays at 0; the canvas `<canvas>` element is left in the DOM but is invisible (so the section layout remains stable).
- A `console.warn` is suppressed; no `console.error` is emitted (zero unhandled errors per Req 6.9).
- A best-effort `<link rel="preload">` for the local fallback asset is emitted on first failure to speed up subsequent visits.

### 2. Image Asset Failure

For native `<img>` elements (Req 24.7–9): the `onError` handler swaps the `src` to the fallback `Asset_Manifest` entry if one is declared, otherwise it preserves the layout dimensions via the declared `width`/`height` attributes and keeps the `alt` text visible (Req 11.7).

For `next/image` elements (lazy images): the built-in `next/image` blur-up + error states apply.

### 3. Video Asset Failure (Modal Videos)

For each video modal (Req 15.10): a 10-second `canplaythrough` watchdog falls back to the poster image, leaves the modal open, and emits no errors. The video element is paused and removed from the playing-videos set so subsequent re-opens cleanly retry.

### 4. Lenis / ScrollTrigger Initialization Failure

If `new Lenis(...)` throws OR Reduced_Motion is active OR `requestAnimationFrame` is undefined (Req 26.6): the page falls back to native browser scrolling, ScrollTriggers are not registered, and `data-anim*` elements are placed in their final post-animation state on mount within 1 animation frame (Req 19.12).

### 5. Font Load Timeout

For each font family, `document.fonts.load('<weight> <family>')` is wrapped in a 3-second `Promise.race`. On timeout (Req 21.6): the family-specific generic-fallback (`sans-serif` for Space Grotesk and Inter, `monospace` for Source Code Pro) is left to take effect. `font-display: swap` is set in the `@font-face` declarations so the layout does not reflow visibly when fonts eventually load.

### 6. SSR / Hydration Drift

To prevent hydration mismatches (Req 1.7, 29.6):

- Client-only computed values (e.g. `window.innerWidth`-derived layout decisions, `matchMedia` results) are NEVER read during the initial render. Each affected component initializes with `null` (or its source-document desktop default) and updates inside `useEffect`.
- The `loading` and `ready` classes are applied to `document.documentElement` ONLY inside `useEffect` — never during render — so the SSR HTML does not contain either class and matches the initial client paint.
- The Hover_Image_Preview, Exit_Modal, and Loader components declare an `if (typeof window === 'undefined') return null` guard inside their render bodies but rely primarily on `'use client'` and `useEffect` for browser-API access.

## Testing Strategy

The dual testing approach combines property-based tests (where universals exist), example-based unit tests (where specific behavior is asserted), integration tests (where infrastructure or external services are involved), screenshot-diff visual fidelity tests (where pixel parity must be verified), and Lighthouse measurements (where performance budgets apply).

### Test Library Choices

- **Property-based testing:** [`fast-check`](https://github.com/dubzzz/fast-check) v3+ — already an idiomatic choice in the JavaScript/TypeScript ecosystem and easy to integrate with Vitest. We do NOT introduce any new dependency at the workspace `package.json` level for this; `fast-check` lives under `devDependencies` only and is added as part of the test harness, NOT as a runtime dependency. (If the spec's Req 29.8 prohibition on new top-level dependencies extends to devDependencies, the property tests will instead be implemented as plain quantified loops with seeded random generation in Node's `crypto.randomInt`. This decision is captured as an open question for confirmation with the user.)
- **Unit + integration tests:** Vitest 1.x with `@testing-library/react` and `@testing-library/jest-dom`, both already standard in the Next.js ecosystem.
- **Screenshot diffs:** `puppeteer` (already a workspace devDependency) with a tile-based RGB delta comparator (`pixelmatch`).
- **Lighthouse:** the existing `node scripts/psi-check.mjs` and `npx lighthouse` runner already configured in `package.json`.

### Test Tagging Convention

Per the design's property-based-testing guidance, every property-based test MUST be tagged with a comment in the format:

```ts
// Feature: kore-homepage-clone, Property N: <property text>
```

This makes failing tests trivially traceable back to the design property that was violated. Example:

```ts
// Feature: kore-homepage-clone, Property 4: Universal Tab Strip Invariant
test.prop([fc.array(fc.string(), { minLength: 2, maxLength: 9 }), fc.array(fc.nat())])(
  'tab strip ARIA invariants hold for any activation sequence',
  (tabIds, activationIndices) => { /* ... */ }
);
```

### Property Test Configuration

Per the design constraint: each property-based test MUST run a **minimum of 100 iterations** (fast-check's default `numRuns = 100` is sufficient). Property tests with cheap generators (chatbot input validation, tab-strip activation) MAY run 1000 iterations.

### Coverage by Property

| # | Property | Test File | Generators |
| --- | --- | --- | --- |
| 1 | Scope-Confinement of File Changes | `tests/property/scope-confinement.test.ts` | git diff name list |
| 2 | Media Query Parity | `tests/property/media-query-parity.test.ts` | `fc.integer({ min: 320, max: 2560 })` viewport widths |
| 3 | Top Strip Rotation Correctness | `tests/property/top-strip-rotation.test.ts` | `fc.array(slideArb, { minLength: 2, maxLength: 10 })` + tick counts |
| 4 | Universal Tab Strip Invariant | `tests/property/tab-strip.test.ts` | `fc.array(fc.nat({ max: 8 }))` activation sequences |
| 5 | Modal Lifecycle Invariant | `tests/property/modal-lifecycle.test.ts` | `fc.array(fc.oneof(openOp, closeOp))` operation sequences |
| 6 | Hover Image Preview Lifecycle and Lerp | `tests/property/hover-image-preview.test.ts` | random cursor trajectories `fc.array(pointArb, { maxLength: 60 })` |
| 7 | Loader Sequence Timing | `tests/property/loader-sequence.test.ts` | `fc.integer({ min: 200, max: 2000 })` first-logo durations |
| 8 | Chatbot Input Validation | `tests/property/chatbot-input.test.ts` | `fc.string()` arbitrary input strings |
| 9 | Token Coverage and tokens.ts ↔ tokens.css Parity | `tests/property/token-coverage.test.ts` | AST walk of every file in `src/components/kore/` |
| 10 | Asset Manifest Well-Formedness | `tests/property/asset-manifest.test.ts` | URL extraction from Source_Document + manifest entries |
| 11 | Out-Of-Scope Containment | `tests/property/out-of-scope.test.ts` | rendered DOM + intercepted network requests |
| 12 | Component Naming, Use-Client Gating, A11y Icon Labels | `tests/property/component-conventions.test.ts` | file globs + AST walks |

### Coverage by Example / Edge Case

Example-based unit tests live alongside their components under `src/components/kore/<area>/__tests__/`:

- `kore-loader.test.tsx` — Reduced_Motion path, 5000 ms force-complete (edge case)
- `kore-top-strip.test.tsx` — close-button activation, Reduced_Motion immediate swap
- `kore-navigation.test.tsx` — sticky behavior at scroll boundary, hamburger toggle
- `kore-hero.test.tsx` — Reduced_Motion video pause, button hover
- `kore-rive-canvas.test.tsx` — Rive load timeout (edge case), poster fallback
- `kore-industry-tabs.test.tsx` — Swiper config equality
- `kore-business-outcomes.test.tsx` — dark-mode toggle, Artemis sub-tab GSAP timeline replay
- `kore-analyst-recognition.test.tsx` — duration-in/out timings
- `kore-testimonials.test.tsx` — pause-on-hover, navigation buttons
- `kore-strategic-partners.test.tsx` — image error path (edge case)
- `kore-ai-insights.test.tsx` — fixture cardinality (1 + 4)
- `kore-pre-footer-cta.test.tsx` — DOM order
- `kore-footer.test.tsx` — back-to-top, language toggle
- `kore-modals-layer.test.tsx` — video play/pause/reset, video load timeout (edge case)
- `kore-exit-modal.test.tsx` — top-edge `mouseleave` + once-per-session
- `kore-hover-image-preview.test.tsx` — coarse pointer suppression, scroll hides preview
- `kore-chatbot.test.tsx` — expansion stagger, Reduced_Motion immediate
- `tokens.test.ts` — module shape, `as const` narrowing
- `assets.test.ts` — fixture validity (URLs match regex)

### Visual Fidelity Tests

`tests/visual/kore-homepage.spec.ts` runs Puppeteer against `next start` at the three Reference_Viewports, captures full-page screenshots with the deterministic-capture preconditions of Req 2.9, and runs an 8×8-pixel-region tile diff against PNGs of Source_Document rendered under identical conditions (font-load gating, autoplay paused, ScrollTriggers paused at final state). Failure threshold: any tile exceeding the per-pixel RGB delta of 2 OR any element bounding-box delta exceeding 1 device-independent pixel (Req 2.1–2.7).

Reference screenshots are checked into `tests/visual/__baselines__/` and updated only via an explicit `pnpm test:visual:update` command.

### Integration Tests

`tests/integration/route.test.ts` — renders the route under `next start`, asserts:

- HTTP 200 status (Req 1.6)
- Zero console errors over 30 seconds idle
- Zero React error boundaries triggered
- SSR HTML contains every Page_Section's heading text (Req 26.4)
- No script tags match Out_Of_Scope_Scripts patterns (Req 1.4)
- No network requests over 60 seconds idle match Out_Of_Scope_Backends (Req 1.5, 28.9)

`tests/integration/lighthouse.test.ts` — runs Lighthouse Mobile preset 3 times, asserts median performance score ≥ 75, LCP ≤ 3.0 s, CLS ≤ 0.10, TBT ≤ 300 ms (Req 27.1–4).

`tests/integration/bundle-size.test.ts` — runs `pnpm next build`, parses output, asserts First Load JS for `/kore-ai-component` ≤ 350 KB and that no Rive runtime, Modals_Layer chunk, or below-fold Swiper chunk is included (Req 27.5–9).

### Browser Matrix

`tests/browser-matrix/*.spec.ts` runs the visual fidelity test suite against Chrome, Edge, Firefox, Safari (latest + previous), iOS Safari 17+, and Android Chrome 120+ via Playwright (Req 26.1–3). This is gated behind a `pnpm test:matrix` script and runs in CI nightly, not on every commit.

### Static Analysis Gates

CI gates (matching Req 29.2–5):

- `pnpm exec eslint src/components/kore src/app/kore-ai-component --max-warnings=0` — must exit 0
- `pnpm exec tsc --noEmit` — must exit 0
- `pnpm next build` — must exit 0 with zero warnings referencing `src/components/kore/` or `src/app/kore-ai-component/`

### Why Property-Based Testing Is Appropriate Here

PBT is appropriate for this feature despite it being primarily a UI clone because the spec contains a meaningful set of universals where input variation finds bugs that example tests would miss:

- **Tab-strip ARIA wiring** (Property 4) — there are 4 distinct tab strips with 4–9 tabs each. A property test runs activation sequences across all of them with a single test, catching off-by-one errors and stale-state bugs (e.g., previously-active tab leaking `aria-selected="true"`).
- **Modal mutual exclusion** (Property 5) — the modal stack has 5 distinct modals (4 in Modals_Layer + Exit_Modal) plus the Mobile_Drawer. A property test over open/close sequences catches double-open bugs and focus-trap leaks.
- **Token coverage** (Property 9) — a static AST walk over the entire source tree is the natural form here; the property "every literal numeric value reads from tokens" is genuinely universal.
- **Asset manifest cardinality** (Property 10) — Source_Document contains hundreds of asset URLs; a property test matching them one-to-one against the manifest is the only practical way to catch duplicate or missing entries.
- **Out-of-scope containment** (Property 11) — a property test over the rendered DOM tree catches any leaked Webflow attribute, JSON-LD block, or forbidden script that an example test would not enumerate.
- **Hover-image lerp math** (Property 6) — the lerp recurrence is a mathematical relationship; random cursor trajectories find float-precision bugs that fixed-trajectory examples would not.

PBT is NOT used for:

- Per-section pixel-fidelity (handled by screenshot diffs)
- Per-selector computed-style assertions (deterministic example tests)
- Specific Swiper configuration values (deterministic equality)
- Lighthouse performance scores (integration tests)
- Browser matrix (integration tests)

