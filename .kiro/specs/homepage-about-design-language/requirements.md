# Requirements Document

## Introduction

The current homepage (`src/app/home-page.tsx`) and the About Us page (`src/app/about-us/page.tsx`) coexist in the codebase but follow two different visual languages. The homepage is anchored by `TransferredSoftreeHero` (a dark, GSAP-pinned, mask-burst hero on `#1a2a3a`/`#fafaf9`) followed by a mix of dark sections (`AiInsightsBlog`, `TechStack`, `OffshoreTestimonialsGlobe` in dark variant) and light sections (`LightServicesStickyList`, `LightEngagementModels`, `LightFAQExact`, `LightContactSection`). The About Us page uses a unified, light-first design language built around `AvooraHero` (white background, video stage in rounded-[36px] container with `#FF6B00` orange accent, cycling word, service marquee), `LightAboutMerged` (`#F8F9FC` background with `#1852FF` blue accent, animated counters, Grainient cards, SpotlightCards), `AboutClientLogos`, `AboutTeamSection` (warm `#F3F0EE` with `#FF5812` accent), `AwardsMarqueeSection`, `OffshoreTestimonialsGlobe` in light variant, and Contact + FAQ.

This feature redesigns the homepage to adopt the About Us page's design language so the two pages feel like one product. The homepage's content sections (services, features, tech stack, blog/insights, engagement models, FAQ, contact, certifications, partners) MUST be preserved, but their visual presentation is brought in line with the About Us system: light-first canvas, the typography scale and tokens from About, the accent color discipline (orange `#FF6B00`/`#FF5812` for hero/team accents and blue `#1852FF` for stats/CTAs), the motion tokens defined in `src/lib/motion.ts`, the same hero treatment family (rounded-[36px] media stage, badge pill, cycling word, marquee), and the same section rhythm (badge → headline → supporting copy → animated reveal).

## Glossary

- **Homepage**: The route `/` rendered by `src/app/page.tsx` via `src/app/home-page.tsx`.
- **About_Page**: The route `/about-us` rendered by `src/app/about-us/page.tsx`.
- **About_Design_Language**: The combined visual, typographic, color, motion, and composition system used by `AvooraHero`, `LightAboutMerged`, `AboutClientLogos`, `AboutTeamSection`, `AwardsMarqueeSection`, `OffshoreTestimonialsGlobe` (light variant), `LightContactSection`, and `LightFAQExact` as composed by the About_Page. See `Design_Tokens` for the concrete tokens.
- **Design_Tokens**: The set of values that define About_Design_Language:
  - Canvas: light surfaces only — page background `#FFFFFF`, alternate section background `#F8F9FC`, warm alternate `#F3F0EE`.
  - Foreground text: `#0a0a1a` primary, `#0a0a1a/70` secondary, `#0a0a1a/60` tertiary.
  - Accents: orange `#FF6B00` (hero badge dot, primary CTA), warm orange `#FF5812` (team accent), blue `#1852FF` (stats, secondary CTA, About badge).
  - Typography: `Inter` (sans), display headings `clamp(48px, 8vw, 110px)` weight 600 leading-[0.9] tracking-[-0.04em]; section headings `clamp(32px, 4.5vw, 56px)` weight 600/700; body 14–16px line-height 1.6.
  - Surfaces: rounded-[20px]/[28px]/[36px] cards, `rounded-2xl` panels, hairline borders `border-[#0a0a1a]/10` or `border-gray-200`, soft shadows `shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)]`.
  - Motion tokens from `src/lib/motion.ts`: `EASE.silk` (`cubic-bezier(0.16, 1, 0.3, 1)`), `EASE.out`, `DUR.section` (0.9s), `DUR.card` (0.32s), `STAGGER.default` (0.06s), `REVEAL.up`, `REVEAL.blurUp`. Reduced-motion gating MUST be honored.
  - Composition: section header is a small badge pill (dot + uppercase label, 0.18–0.22em tracking) → headline → supporting copy → content. Marquees use white edge fades and 22–45s linear loops. Hero CTAs use the rounded-full pill family (`LetsTalkButton`-style for monochrome, orange-fill for primary).
- **Hero_Pattern**: The About_Page hero composition — top header row (brand mark + tagline pill + Let's Talk pill), full-bleed rounded media stage (video or hero image) with avatar stack, centered headline containing a cycling word, dual CTAs, bottom social rail; followed by a service-card marquee on white.
- **Cycling_Word**: The animated word component in `AvooraHero` that rotates through a fixed list with per-character blur-up reveal and an animated underline.
- **Section_Rhythm**: The vertical pacing used by About_Page sections — `py-20 md:py-24 lg:py-28` outer padding, `max-w-[1400px]` container, `px-6 lg:px-12` inner gutters, badge → heading → body → grid/cards order.
- **Preserved_Sections**: The homepage content blocks that MUST keep their content and ordering intent: hero, support partners, services stack, features showcase, trusted-by/client logos, testimonials globe, AI insights/blog, tech stack, services sticky list, engagement models, certifications, FAQ, contact.
- **Motion_System**: The tokens exported from `src/lib/motion.ts` (`EASE`, `EASE_T`, `DUR`, `SPRING`, `STAGGER`, `REVEAL`, `VIEWPORT`, `prefersReducedMotion`).
- **Reduced_Motion**: The state where `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is true.
- **Lighthouse_Mobile_Performance_Score**: The Lighthouse "Performance" category score (0–100) measured on the Mobile preset against the deployed `/` route.
- **Equivalent_Replacement**: A string that replaces an original Preserved_Section string only when it preserves the original semantic intent of the heading, body copy, or CTA label and preserves the original link `href` target and CTA destination URL unchanged.

## Requirements

### Requirement 1: Homepage Adopts About Design Language

**User Story:** As a visitor landing on `/`, I want the homepage to feel like the same product as `/about-us`, so that I trust the brand and navigate without a visual jolt between pages.

#### Acceptance Criteria

1. THE Homepage SHALL set every Preserved_Section's full-width outer surface background to exactly one of `#FFFFFF`, `#F8F9FC`, or `#F3F0EE` from the Design_Tokens canvas list, and SHALL NOT apply any other solid color, gradient, or image as that outer section surface.
2. THE Homepage SHALL apply the Design_Tokens typography scale entries for hero headline, section heading, subheading, and body copy to the corresponding text elements in every Preserved_Section that renders text, with no inline overrides of font-family, font-size, or line-height.
3. THE Homepage SHALL restrict accent color usage to `#FF6B00`, `#FF5812`, and `#1852FF`, applying these colors only to badges, badge dots, primary CTAs, stat numbers, and decorative underlines, and SHALL NOT apply them to body copy, section backgrounds, borders of non-primary controls, or secondary/tertiary text.
4. THE Homepage SHALL apply the Section_Rhythm vertical padding (`py-20 md:py-24 lg:py-28`), a centered `max-w-[1400px]` container, and `px-6 lg:px-12` inner gutters to every Preserved_Section, including the topmost hero section, on every viewport width.
5. WHERE a Preserved_Section currently renders on a dark surface (`#0a0a0a`, `#1a2a3a`, or `#111`), THE Homepage SHALL render it on a light surface chosen from the Design_Tokens canvas list (`#FFFFFF`, `#F8F9FC`, or `#F3F0EE`) with primary foreground text exactly `#0a0a1a`, secondary text expressed as `#0a0a1a/70`, and tertiary text expressed as `#0a0a1a/60`.
6. WHEN a Preserved_Section enters the viewport, THE Homepage SHALL drive its entrance animation using only the Motion_System tokens (`EASE.silk`, `EASE.out`, `DUR.section`, `DUR.card`, `STAGGER.default`, `REVEAL.up`, `REVEAL.blurUp`) and SHALL NOT apply any bespoke easing curve or duration value outside this token set.
7. THE Homepage SHALL render every section header in the order badge pill, headline, then supporting copy when supplied, where the badge pill is an uppercase label with a leading dot and tracking between 0.18em and 0.22em, mirroring the About_Page section header order.
8. IF the visitor's environment reports `prefers-reduced-motion: reduce`, THEN THE Homepage SHALL skip Preserved_Section entrance animations and render each Preserved_Section in its final visible state with no transform, blur, opacity, or stagger transition.

### Requirement 2: Hero Section Matches About Hero Pattern

**User Story:** As a visitor, I want the homepage hero to use the same composition as the About hero, so that the first impression is consistent across the site.

#### Acceptance Criteria

1. THE Homepage SHALL replace the GSAP-pinned, mask-burst `TransferredSoftreeHero` with a hero that follows the Hero_Pattern.
2. THE Homepage hero SHALL render on a white (`#FFFFFF`) page surface with foreground text `text-gray-900`/`#0a0a1a`.
3. THE Homepage hero SHALL include a top header row that contains the Softree wordmark (with `®` superscript), a tagline pill (rounded-full border with leading dot), and a `LetsTalkButton`-style CTA on the right, with the wordmark and tagline pill grouped on the left and the CTA right-aligned within the same row.
4. THE Homepage hero SHALL render a full-bleed rounded media stage with corner radius `clamp(20px, 2vw, 36px)` containing a hero image or video, an avatar stack of 3 to 5 overlapping circular avatars, a centered headline containing a Cycling_Word drawn from a list of 3 to 6 words, and a dual CTA pair where the primary CTA uses an orange fill and the secondary CTA uses a glass-border style.
5. THE Homepage hero SHALL render a service/capability marquee directly beneath the media stage with a left and right white edge fade between 48px and 96px wide and a single linear loop whose total cycle duration is fixed at a value between 30 and 45 seconds inclusive.
6. WHEN Reduced_Motion is true, THE Homepage hero SHALL freeze the Cycling_Word on the first word in its list and SHALL stop the marquee animation with the marquee track held in a static, fully visible position.
7. WHEN Reduced_Motion is false, THE Homepage hero SHALL run the Cycling_Word rotation at a fixed interval between 1.5 and 3 seconds per word, the marquee loop, and the entrance animations using Motion_System tokens.
8. WHERE an animation is a subtle fade, opacity transition, or color transition that does not cause translation greater than 8px and does not loop, THE Homepage SHALL be permitted to run the animation even when Reduced_Motion is true.
9. THE Homepage hero copy SHALL preserve the current value proposition, retaining both the offshore engineering partner claim and the scalable Microsoft + AI teams claim verbatim or with wording changes that do not remove or weaken either claim.
10. IF the homepage hero cannot load its background video within 3 seconds of mount, THEN THE Homepage hero SHALL display the poster image as a static fallback in place of the video, SHALL NOT block render of the rest of the hero, and SHALL NOT surface a user-visible error.

### Requirement 3: Content Preservation Across Sections

**User Story:** As a content owner, I want every existing homepage section to remain on the page after the redesign, so that no marketing content or SEO value is lost.

#### Acceptance Criteria

1. THE Homepage SHALL render exactly the following 13 Preserved_Sections, in this exact top-to-bottom order, with no section omitted, duplicated, or reordered: (1) hero, (2) support partners, (3) services stack, (4) features showcase, (5) trusted-by client logos, (6) testimonials globe, (7) AI insights/blog, (8) tech stack, (9) services sticky list, (10) engagement models, (11) certifications, (12) FAQ, (13) contact.
2. THE Homepage SHALL preserve, for every Preserved_Section, every visible text string, every image asset (matched by source URL or imported asset reference), every link `href` target, and every CTA destination URL that is currently rendered by that section, except where a string is replaced by an Equivalent_Replacement sourced from Sanity or from the About_Page version of the same content block.
3. THE Homepage SHALL treat a string as an Equivalent_Replacement only when the replacement preserves the original semantic intent of the heading, body copy, or CTA label and preserves the original link `href` target and CTA destination URL unchanged.
4. IF an Equivalent_Replacement sourced from Sanity is unavailable, fails to load, or returns an empty value, THEN THE Homepage SHALL fall back to rendering the original Preserved_Section string and SHALL preserve the original link `href` target and CTA destination URL from AC2.
5. WHERE a Preserved_Section has a direct light-surface counterpart used by the About_Page (for example `LightContactSection`, `LightFAQExact`, `LightEngagementModels`, `OffshoreTestimonialsGlobe` light variant, `AboutClientLogos` for partner logos), THE Homepage SHALL reuse that counterpart component instead of duplicating styling.
6. WHERE a Preserved_Section has no light-surface counterpart (for example `AiInsightsBlog`, `TechStack`, `support-partners`, `ServicesStackedSlides`, `FeaturesShowcase`, `LightServicesStickyList`, `certification`), THE Homepage SHALL restyle that section to comply with Requirement 1, SHALL preserve every text string, image asset, link `href` target, and CTA destination URL of that section per AC2, and SHALL be permitted to modify the section's layout structure or interactive behavior when the existing structure cannot satisfy the Design_Tokens, the Section_Rhythm, or the badge → headline → body composition required by Requirement 1.
7. IF a Preserved_Section's existing layout structure or interactive behavior conflicts with Requirement 1, THEN THE Homepage SHALL prioritize compliance with Requirement 1 over preserving the original layout structure or interactive behavior, while still preserving every text string, image asset, link `href` target, and CTA destination URL of that section from AC2.
8. THE Homepage SHALL render `NavigationClient` as the first child of the page tree above all Preserved_Sections and SHALL render `Footer` as the last child of the page tree below all Preserved_Sections.

### Requirement 4: Reusable Component Adoption

**User Story:** As a developer, I want the homepage to share components and tokens with About Us, so that future visual changes propagate to both pages from one source.

#### Acceptance Criteria

1. THE Homepage SHALL import the motion values `EASE`, `EASE_T`, `DUR`, `STAGGER`, `REVEAL`, and `prefersReducedMotion` from `src/lib/motion.ts` for every GSAP and Framer Motion call in homepage-owned section files, AND SHALL NOT redeclare equivalent easing curves, durations, stagger values, or reduced-motion checks inline.
2. WHERE a homepage card requires a cursor-following radial spotlight glow bounded within the card, THE Homepage SHALL render `SpotlightCard` from `src/components/qc/shared/SpotlightCard.tsx` AND SHALL NOT reimplement the pointer-tracking or radial-gradient logic in a homepage-local component.
3. WHERE `SpotlightCard` cannot satisfy a design requirement captured in the homepage design specification (for example a non-radial gradient, simultaneous multi-cursor glow, or a glow that must extend outside the card bounds), THE Homepage SHALL be permitted to implement a custom spotlight effect, AND THE custom implementation SHALL draw every accent color exclusively from the Design_Tokens accent set defined in `src/lib/motion.ts` and `src/app/globals.css`.
4. WHERE the testimonials globe is rendered on the Homepage, THE Homepage SHALL pass `variant="light"` to `OffshoreTestimonialsGlobe` AND SHALL NOT override its themeable color props with values that are not members of the Design_Tokens accent set.
5. IF a homepage file introduces an accent color literal that is not already present as a named token in `src/lib/motion.ts` or `src/app/globals.css`, THEN THE Homepage SHALL register the value as a named token in one of those two files before the color is referenced, such that no accent color literal appears outside the token definitions.
6. WHERE a marquee is rendered on the Homepage, THE Homepage SHALL apply white edge-fade overlays on both the left and right edges using `linear-gradient(90deg, #fff 0%, transparent 100%)` with the same edge-fade width used by `AvooraHero` and `AboutClientLogos`, AND each overlay's outermost edge SHALL be fully opaque white while its inner edge SHALL be fully transparent.

### Requirement 5: Responsive Behavior

**User Story:** As a mobile or tablet visitor, I want the redesigned homepage to render correctly on my device, so that I can use it without horizontal scrolling, clipped text, or broken layouts.

#### Acceptance Criteria

1. THE Homepage SHALL render without horizontal overflow (document scrollWidth less than or equal to viewport width) at viewport widths of 360px, 768px, 1024px, 1280px, and 1440px.
2. WHEN the viewport width is less than 640px, THE Homepage hero SHALL stack the top header row vertically with the brand block above the CTA block AND SHALL render the headline at a font size between 28px and 48px inclusive.
3. WHEN the viewport width is less than 1024px, THE Homepage SHALL collapse every two-column section layout (including About-style stat plus content splits) into a single column with the headline block rendered above the content block in the document flow.
4. THE Homepage SHALL render every interactive target (links, buttons, form controls, and tappable icons) at a minimum hit area of 44px by 44px with a minimum spacing of 8px between adjacent targets on viewports of 1024px width or less and on any device exposing a coarse pointer.
5. WHILE the user agent reports `prefers-reduced-motion: reduce`, THE Homepage marquee sections SHALL stop all scrolling animation within 100ms AND SHALL keep all marquee text fully visible within the viewport at static positions with no clipping.
6. IF the viewport width is less than 360px, THEN THE Homepage SHALL continue to render all sections without horizontal overflow and without clipping interactive targets or headline text.

### Requirement 6: Performance and Loading Behavior

**User Story:** As a visitor on a slow connection, I want the homepage to load quickly and progressively, so that I can read content before all sections finish hydrating.

#### Acceptance Criteria

1. THE Homepage SHALL preserve the existing `next/dynamic` lazy-loading boundary for the following sections currently lazy-loaded in `src/app/home-page.tsx`: features showcase, testimonials globe, AI insights, tech stack, services sticky list, engagement models, certifications, FAQ, and contact.
2. WHILE a lazy-loaded Preserved_Section is loading, THE Homepage SHALL display a skeleton placeholder whose background color exactly equals the surface token assigned to that section in the Design_Tokens canvas list (not `#0a0a0a`), and whose rendered height is within plus or minus 10 percent of the loaded section's final height to keep Cumulative Layout Shift contribution below 0.05.
3. THE Homepage hero SHALL set `priority` on its primary above-the-fold image so that the image is included in the initial HTML response and is not lazy-loaded.
4. WHEN the Homepage hero has completed React hydration, THE Homepage SHALL begin loading the hero video sources following the `videoLoaded` pattern in `AvooraHero`, and SHALL NOT request video bytes before hydration completes.
5. THE Lighthouse_Mobile_Performance_Score for `/`, measured as the median of 3 consecutive Lighthouse runs using the Lighthouse mobile preset (Moto G Power class device profile, 4x CPU throttling, Slow 4G network throttling) against the redesigned homepage, SHALL be greater than or equal to the median Lighthouse_Mobile_Performance_Score recorded for `/` against the current homepage using the same preset, runs count, and device profile, with a tolerance of 0 points.
6. IF a lazy-loaded Preserved_Section chunk fails to load within 10 seconds or returns a network error, THEN THE Homepage SHALL replace its skeleton placeholder with an inline error indicator stating that the section is unavailable, SHALL keep all already-rendered sections visible, and SHALL expose a retry control that re-requests the chunk on activation.
7. THE Homepage SHALL NOT add a new full-page GSAP `ScrollTrigger.pin` that pins the viewport for more than 50 percent of the viewport height.

### Requirement 7: Accessibility

**User Story:** As a visitor using assistive technology or keyboard navigation, I want the redesigned homepage to remain accessible, so that I can perceive and operate every interactive element.

#### Acceptance Criteria

1. THE Homepage SHALL render exactly one `<h1>` element, located inside the hero section, with a non-empty accessible name between 1 and 120 characters.
2. THE Homepage SHALL preserve a logical heading hierarchy where every section heading is an `<h2>`, subordinate headings are `<h3>` or lower, and no heading level is skipped (e.g., `<h2>` directly followed by `<h4>` is not allowed).
3. THE Homepage SHALL provide non-empty `alt` text between 1 and 250 characters for every informational image (any image conveying content or function) and SHALL use `alt=""` for purely decorative images (images that convey no information beyond visual styling).
4. WHEN any interactive element on the Homepage receives keyboard focus, THE Homepage SHALL render a visible focus indicator on that element that is at least 2 CSS pixels thick, fully enclosing or adjacent to the element, and maintaining a contrast ratio of at least 3:1 against both the element's surface and the adjacent background.
5. THE Homepage text SHALL meet WCAG 2.1 AA contrast on every Design_Tokens canvas surface, where the ratio is at least 4.5:1 for body text below 18pt (24px) regular or 14pt (18.66px) bold, and at least 3:1 for large text at or above those sizes.
6. WHEN the user agent reports `prefers-reduced-motion: reduce` as true (Reduced_Motion = true), THE Homepage SHALL skip all non-essential entrance animations, scroll-linked transforms, and looped marquees, replacing them with an immediate final-state render and no continuous motion exceeding 0.1 seconds.
7. THE Homepage SHALL expose the Cycling_Word changes as visual-only updates by marking the cycling region with `aria-hidden="true"` or `aria-live="off"`, and SHALL NOT trigger any assistive-technology announcement on word change.
8. THE Homepage SHALL ensure every interactive element is reachable and operable using only the keyboard (Tab, Shift+Tab, Enter, Space, and arrow keys where applicable), with a logical DOM tab order matching the visual reading order.
9. THE Homepage SHALL expose semantic landmark regions including exactly one `<header>`, one `<main>`, and one `<footer>`, and SHALL provide a keyboard-accessible skip link as the first focusable element that moves focus to the `<main>` region when activated.
10. IF an interactive element has no visible text label (e.g., icon-only button or link), THEN THE Homepage SHALL provide a non-empty accessible name between 1 and 120 characters via `aria-label`, `aria-labelledby`, or visually hidden text.

### Requirement 8: Sanity Content Compatibility

**User Story:** As a content editor, I want any homepage section that currently reads from Sanity to continue reading from Sanity after the redesign, so that I can keep editing copy without a code change.

#### Acceptance Criteria

1. WHERE a Preserved_Section currently fetches data from Sanity through `src/sanity/client.ts` or any GROQ query module referenced by that section, THE Homepage SHALL invoke the same query against the same Sanity dataset and consume the same response fields after the redesign.
2. WHERE a Preserved_Section currently uses hardcoded content, THE Homepage SHALL keep that content hardcoded after the redesign.
3. WHERE a Preserved_Section currently uses hardcoded content, THE Homepage SHALL NOT add a new Sanity query, schema, or content fetch for that section as part of the redesign.
4. IF a Sanity fetch for a Preserved_Section does not return a successful response within 5 seconds, or returns null, undefined, or an empty array for the queried document, THEN THE Homepage SHALL render the fallback content specified for that section and SHALL NOT render an empty section.

### Requirement 9: Metadata and SEO Preservation

**User Story:** As an SEO owner, I want the homepage's metadata and indexable structure to remain intact after the redesign, so that search rankings are not disrupted.

#### Acceptance Criteria

1. THE Homepage SHALL preserve the exact user-visible string values of the following fields in the `metadata` export in `src/app/page.tsx` byte-for-byte (including casing, punctuation, whitespace, and Unicode characters): `title`, `description`, `openGraph.title`, `openGraph.description`, `twitter.title`, and `twitter.description`.
2. WHERE the user has explicitly approved a copy change in writing for a specific metadata field, THE Homepage SHALL be permitted to update only that specified field's user-visible text value.
3. THE Homepage SHALL be permitted to modify non-content aspects of the `metadata` export (key ordering, code formatting, addition of structured fields not listed in criterion 1, and image reference values) provided the user-visible text values listed in criterion 1 remain byte-for-byte identical.
4. THE Homepage SHALL expose a canonical URL whose value equals exactly `https://www.softreetechnology.com/` (including the `https` scheme, `www` subdomain, and trailing slash) in the rendered HTML `<head>`.
5. THE Homepage SHALL render at least one reachable internal link (resolving to HTTP 200 and not marked `rel="nofollow"`) to each of the following destinations after the redesign: `/contact`, `/services`, `/case-studies`, `/about-us`, and every service deep link present on the pre-redesign homepage.
6. IF any internal link destination listed in criterion 5 is absent, returns a non-200 HTTP status, or is marked `rel="nofollow"` after the redesign, THEN THE Homepage SHALL be considered non-compliant with this requirement and the redesign SHALL be rejected with an indication identifying the missing or broken destination.

### Requirement 10: Reduced Motion Compliance

**User Story:** As a visitor with `prefers-reduced-motion: reduce` set, I want animations to be suppressed, so that I can use the page without motion-induced discomfort.

#### Acceptance Criteria

1. IF Reduced_Motion is true, THEN THE Homepage SHALL skip all GSAP timeline entrance animations and SHALL render every animated element in its final visible state (opacity 1.0, no transform offset, no scale, no blur) within 100 ms of component mount.
2. IF Reduced_Motion is true, THEN THE Homepage marquees SHALL remain stationary with zero translation and SHALL display all marquee items in their natural document order without duplication or clipping.
3. IF Reduced_Motion is true, THEN THE Homepage Cycling_Word SHALL render only the first configured word statically, with no rotation, fade, or transition for the lifetime of the page.
4. IF Reduced_Motion is true, THEN THE Homepage SHALL NOT register any `ScrollTrigger.scrub` timeline, and any scroll-driven animation SHALL be replaced by its final visual state.
5. THE Homepage SHALL determine Reduced_Motion by evaluating the `prefers-reduced-motion: reduce` media query on initial page load and SHALL re-evaluate the query whenever it changes during the session.

### Requirement 11: Visual Parity Verification

**User Story:** As a designer reviewing the redesign, I want a clear way to confirm that the homepage matches the About design language, so that I can sign off on the change.

#### Acceptance Criteria

1. THE Homepage SHALL render the following sections in this order — hero, About-style stat/content split, marquee, engagement-models accordion, testimonials block, FAQ block, and contact block — and each section SHALL pull its surface color, badge style, heading scale, card corner radius, and CTA shape from the same Design_Tokens values used by its About_Page counterpart, with zero token-value differences when computed styles are compared in browser DevTools.
2. WHEN a designer performs a side-by-side review of the Homepage against `/about-us` at the mobile (375px width), tablet (768px width), and desktop (1280px width) breakpoints, THE Homepage SHALL match the About_Page on each of the following attributes per breakpoint: font family, heading scale (h1 through h4 font-size and line-height), accent color palette (primary, secondary, and muted), badge pill treatment (padding, radius, and border), card corner radius, and motion easing curve (cubic-bezier values), where each attribute is verified against the shared Design_Tokens source.
3. WHEN the side-by-side review is complete, THE Homepage redesign SHALL be considered signed off only after a reviewer records a pass result for every section listed in criterion 1 across every breakpoint listed in criterion 2, and any attribute showing a token-value mismatch SHALL be marked as a fail and block sign-off until corrected.
4. WHERE a Preserved_Section has no About_Page counterpart, THE Homepage SHALL restyle that section using Design_Tokens values (color, typography, radius, spacing) drawn from the About system rather than importing the section from the About implementation, and absence of an inline code comment documenting this restyle decision SHALL NOT block the redesign from being released.
