# Requirements Document

## Introduction

The workspace contains a Next.js 16 / React 19 / TypeScript / Tailwind v4 application (`d:\Softree_Projects\SOFTREE_MAIN\Softree_\package.json`) with GSAP 3.15, Lenis 1.3, Swiper 12, Framer Motion 12, Radix primitives, and an empty mount page at `src/app/kore-ai-component/page.tsx`. The reference source is the saved Webflow-rendered HTML at `public/kore-source-sections.html` (9,600 lines), which captures the full DOM, inline styles, and runtime CSS of the live Kore.ai homepage including a top announcement strip slider, a sticky mega-menu navigation, a 100vh hero with three Rive-canvas product cards, an industry-tabs Swiper logo marquee section, a "Drive faster business outcomes" tab system with a 9-pane Artemis sub-tab panel, a featured analyst recognition tab section, a Swiper customer testimonial slider, a strategic partners section, an AI Insights blog grid, two pre-footer CTA blocks, an exit-page modal, the full site footer, content modals, a cursor-following hover image preview, a loader animation, and a floating chatbot element.

This feature delivers a 99.9% pixel-perfect React clone of that homepage rendered at the route `/kore-ai-component`, decomposed into reusable named components, driven by an extracted design-token layer, preserving every animation, interaction, responsive breakpoint, and visual property from the source. The implementation MUST NOT redesign, modernize, simplify, or improve any part of the source UI; the visual output and interaction behavior MUST match the source within the tolerance defined by the **Pixel_Tolerance** token. Backend integrations, third-party tracking pixels, the Webflow runtime, HubSpot scripts, Intellimize personalization, Microsoft Clarity, Google Tag Manager, LinkedIn Insight, Clickagy, and any analytics or A/B-testing instrumentation present in the source are explicitly out of scope.

## Glossary

- **Source_Document**: The HTML file at `d:\Softree_Projects\SOFTREE_MAIN\Softree_\public\kore-source-sections.html`, used as the single source of truth for visual, structural, and behavioral fidelity.
- **Clone_Route**: The Next.js App Router route `/kore-ai-component` rendered by `src/app/kore-ai-component/page.tsx`.
- **Clone_Page**: The full assembled React tree rendered at the Clone_Route, comprising every Page_Section in document order.
- **Page_Section**: One of the top-level visual blocks defined in Section 4 below (Top_Strip, Navigation, Hero, Industry_Tabs, Business_Outcomes, Analyst_Recognition, Testimonials, Strategic_Partners, AI_Insights, Pre_Footer_CTA, Footer, Modals_Layer, Loader, Chatbot, Hover_Image_Preview).
- **Pixel_Tolerance**: A maximum per-pixel RGB delta of 2 and a maximum element bounding-box delta of 1 device-independent pixel between the Clone_Page and the Source_Document, measured at the three Reference_Viewports under identical fonts, scrollbar visibility, and viewport scaling.
- **Reference_Viewports**: The three viewport sizes used for visual verification: Desktop 1440 x 900, Tablet 834 x 1112, Mobile 390 x 844, each at devicePixelRatio 2.
- **Source_Breakpoints**: The CSS media-query breakpoints declared in Source_Document — `max-width: 991px` (tablet down), `max-width: 767px` (mobile landscape down), `max-width: 479px` (mobile portrait down) — plus the implicit desktop range `min-width: 992px`.
- **Design_Tokens**: A typed module exported from `src/components/kore/tokens.ts` containing every color, font-family, font-size, font-weight, line-height, letter-spacing, spacing scale entry, border-radius, shadow, transition duration, easing function, z-index, and breakpoint extracted verbatim from Source_Document.
- **Token_Coverage**: The property that every literal numeric, color, easing, or duration value used in any Clone_Page component is read from a Design_Tokens export rather than written inline as a magic value, with the only exceptions being values native to the component primitive's own contract such as ARIA role strings.
- **Component_Module**: A single React component file under `src/components/kore/` that exports one named React component implementing exactly one Page_Section, sub-section, or repeatable visual primitive.
- **Asset_Manifest**: A typed module at `src/components/kore/assets.ts` mapping every external asset URL referenced in Source_Document (images, SVGs, videos, Rive `.riv` files, fonts) to a stable export name used by Clone_Page components.
- **CDN_Passthrough_Asset**: An asset whose URL in Asset_Manifest points to the original `cdn.prod.website-files.com` URL preserved unchanged from Source_Document.
- **Local_Asset**: An asset stored under `public/kore/` and referenced from Asset_Manifest via a workspace-relative path.
- **Rive_Canvas_Block**: One of the Rive WebGL/Canvas elements declared in Source_Document via `data-rive-src` and rendered through the `@rive-app/canvas` runtime, used in the Hero product cards and in the Business_Outcomes tab panels.
- **Lenis_Scroller**: The smooth-scroll instance from the `lenis` package (already in `package.json`) configured with the parameters declared in Source_Document and attached to the document root for the Clone_Page lifetime.
- **GSAP_Scroll_Triggers**: The collection of GSAP `ScrollTrigger`-driven animations declared in Source_Document and synchronized with Lenis_Scroller.
- **Swiper_Instance**: A Swiper 12 carousel configured with the modules, breakpoints, autoplay timing, loop behavior, navigation handles, pagination handles, and `slidesPerView` schedule declared in Source_Document for that specific slider.
- **Mega_Menu**: The desktop dropdown panel that opens beneath a top-level navigation item (Agent Platform {Artemis}, Agentic AI Apps, Agent Marketplace, More) and renders product cards, link groups, recent insights, and an event CTA.
- **Mobile_Drawer**: The off-canvas navigation panel that replaces Mega_Menu at viewport widths below 992 px, including the accordion-driven sub-menus.
- **Cycling_Strip_Slide**: One of the announcement messages rendered inside Top_Strip and rotated by a JavaScript timer at the interval declared in Source_Document.
- **Industry_Tab**: One of the five tabs in the industry section (Banking, Healthcare, Retail, Telecom_and_Media, Business) whose selection swaps the active Swiper_Instance for that industry's logo marquee.
- **Outcomes_Tab**: One of the four primary tabs in Business_Outcomes (Pre_built_Applications, Application_Accelerators, Tailored_Applications, Agent_Platform_Artemis).
- **Artemis_Sub_Tab**: One of the nine secondary tabs that render only while Outcomes_Tab equals Agent_Platform_Artemis, each driving a distinct corner-bordered content pane.
- **Hover_Image_Preview**: The cursor-following image preview activated by elements carrying the `hover-img-button` class, sized and animated as declared in Source_Document.
- **Exit_Modal**: The modal that appears when a pointer movement crosses the top edge of the viewport, rendering the "Start using Artemis today" CTA block declared in Source_Document.
- **Reduced_Motion**: The state where `window.matchMedia('(prefers-reduced-motion: reduce)').matches` evaluates to true.
- **Anti_Flicker_State**: The `anti-flicker` class applied to `<html>` in Source_Document during the initial 4 s personalization window, which hides body content via `visibility: hidden; opacity: 0`.
- **Loader_Sequence**: The two-stage logo animation declared in Source_Document where `.loader.logo-1` displays the first logo, then `.loader.logo-2` cross-fades to the second logo before the loader unmounts.
- **Out_Of_Scope_Scripts**: The set of third-party scripts present in Source_Document that MUST NOT be ported: HubSpot analytics, HubSpot cookie banner, HubSpot ads pixel, HubSpot interactives loader, Google Tag Manager (`GTM-KH6KVMH`), Google Analytics (`G-JW3PWR1JKY`), Google Ads conversion (`AW-852552351`), Microsoft Clarity, LinkedIn Insight, Clickagy, The Trade Desk, Intellimize personalization, Webflow runtime (`webflow.schunk.*.js`, `webflow.config.js`), Webfont loader, G2 attribution, Vidstack player CSS, the embedded JSON-LD structured data block, and the inline UTM-propagation script.
- **Out_Of_Scope_Backends**: The set of dynamic data sources implied by Source_Document that MUST NOT be wired up: the AI Insights `.w-dyn-list` Webflow CMS feed, any HubSpot form submissions, RFP submission flows, demo-request form posts, language toggle locale switching, search submission, and chatbot conversation backend.

## Requirements

### Requirement 1: Mount Point and Page Skeleton

**User Story:** As a senior frontend engineer, I want the cloned homepage to mount at a single Next.js App Router route, so that the existing application's other routes are not disturbed and the clone can be opened in one click.

#### Acceptance Criteria

1. THE Clone_Page SHALL render exclusively at the route `/kore-ai-component` served by the file `src/app/kore-ai-component/page.tsx`.
2. THE Clone_Page SHALL render Page_Sections in the document order: Loader, Top_Strip, Navigation, Hero, Industry_Tabs, Business_Outcomes, Analyst_Recognition, Testimonials, Strategic_Partners, AI_Insights, Pre_Footer_CTA, Footer, Modals_Layer, Hover_Image_Preview, Chatbot.
3. THE Clone_Page SHALL declare `lang="en"` on the document element via the `src/app/layout.tsx` `<html>` tag and SHALL set the `<body>` background color to `#FFFFFF` matching Source_Document.
4. THE Clone_Page SHALL NOT mount, fetch, or evaluate any Out_Of_Scope_Scripts.
5. THE Clone_Page SHALL NOT post to, fetch from, or otherwise contact any Out_Of_Scope_Backends.
6. WHEN the Clone_Route is opened directly with no referrer, THE Clone_Route SHALL respond with HTTP 200, THE Clone_Page SHALL render every Page_Section in its initial pre-animation state, THE Clone_Page SHALL emit zero uncaught exceptions to the browser console, and THE Clone_Page SHALL NOT trigger any React error boundary.
7. WHEN the Clone_Route is rendered server-side, THE Clone_Page SHALL emit static HTML for every Page_Section that does not strictly require a browser API, deferring only Lenis_Scroller, GSAP_Scroll_Triggers, Swiper_Instance, Rive_Canvas_Block, Hover_Image_Preview, Exit_Modal, and Loader_Sequence to client-only execution, and THE Clone_Page SHALL emit zero hydration mismatch warnings on first client paint.
8. THE Clone_Page implementation SHALL touch only files under `src/app/kore-ai-component/`, `src/components/kore/`, `public/kore/`, and the workspace root `package.json` for the `@rive-app/canvas` dependency, SHALL NOT modify any other route file, and SHALL NOT modify any pre-existing component outside `src/components/kore/`.
9. THE Clone_Page SHALL NOT apply the `anti-flicker` class to the document element at any point in the page lifecycle.

### Requirement 2: Visual Fidelity to Source Document

**User Story:** As the senior frontend engineer reviewing the clone, I want every visual property of the rendered page to match Source_Document within Pixel_Tolerance, so that the clone is indistinguishable from the original at the Reference_Viewports.

#### Acceptance Criteria

1. THE Clone_Page SHALL match Source_Document at the Desktop 1440 x 900 Reference_Viewport such that no 8 x 8 pixel region of a full-page screenshot exceeds the per-pixel RGB delta declared by Pixel_Tolerance.
2. THE Clone_Page SHALL match Source_Document at the Tablet 834 x 1112 Reference_Viewport such that no 8 x 8 pixel region of a full-page screenshot exceeds the per-pixel RGB delta declared by Pixel_Tolerance.
3. THE Clone_Page SHALL match Source_Document at the Mobile 390 x 844 Reference_Viewport such that no 8 x 8 pixel region of a full-page screenshot exceeds the per-pixel RGB delta declared by Pixel_Tolerance.
4. THE Clone_Page SHALL apply font-family and font-weight values that are exactly equal to the computed values in Source_Document for the same CSS selector or data-attribute path, and SHALL apply font-size, line-height, and letter-spacing values that match Source_Document within 0.5 device-independent pixels.
5. THE Clone_Page SHALL apply margin, padding, gap, width, height, max-width, min-height, and border-width values that match Source_Document within 1 device-independent pixel for the same CSS selector or data-attribute path, and SHALL apply border-radius and box-shadow offset/blur/spread/color values that are exactly equal to Source_Document.
6. THE Clone_Page SHALL reproduce every gradient stop color, gradient angle, opacity, filter, and backdrop-filter value declared in Source_Document with each numeric component matching within 1 percent and each color component matching the per-pixel RGB delta declared by Pixel_Tolerance.
7. THE Clone_Page SHALL render every static image at the same intrinsic aspect ratio, `object-fit`, and `object-position` declared in Source_Document, and SHALL render the displayed pixel size within 1 device-independent pixel of Source_Document at each Reference_Viewport.
8. THE Clone_Page SHALL preserve the stacking order and z-index ranking of overlapping elements declared in Source_Document, including Top_Strip above Hero background, Navigation above Top_Strip, Modals_Layer above Navigation, and Loader above Modals_Layer.
9. WHEN a visual fidelity screenshot is captured at any Reference_Viewport, THE Clone_Page SHALL have completed Loader_Sequence, SHALL have resolved every `document.fonts.ready` font face, SHALL have rendered the first frame of every visible Rive_Canvas_Block, and SHALL have paused every Swiper_Instance autoplay and every GSAP_Scroll_Triggers timeline so that captures are deterministic.

### Requirement 3: Responsive Behavior at Source Breakpoints

**User Story:** As the senior frontend engineer, I want the clone to wrap, stack, hide, and resize elements at exactly the Source_Breakpoints, so that the responsive behavior is identical across desktop, tablet, and mobile.

#### Acceptance Criteria

1. THE Clone_Page SHALL apply every CSS declaration contained in the `@media (max-width: 991px)`, `@media (max-width: 767px)`, and `@media (max-width: 479px)` blocks of Source_Document such that, for any viewport width W in CSS pixels, a declaration inside `@media (max-width: Npx)` is active in Clone_Page if and only if W is less than or equal to N.
2. WHILE the viewport width is less than or equal to 991 CSS pixels, THE Navigation SHALL render the Mobile_Drawer in place of the Mega_Menu desktop layout, with no Mega_Menu DOM node visible or focusable.
3. WHILE the viewport width is less than or equal to 767 CSS pixels, THE Hero SHALL stack the three product cards in a single column in the document order Pre_built_Applications, Application_Accelerators, Tailored_Applications.
4. WHILE the viewport width is less than or equal to 767 CSS pixels, THE Industry_Tabs SHALL render the tab strip as a single horizontally scrollable row applying the `overflow-x`, `white-space`, and scroll-snap declarations contained in the `@media (max-width: 767px)` block of Source_Document for the tab strip.
5. WHILE the viewport width is less than or equal to 767 CSS pixels, THE Business_Outcomes section SHALL render the four Outcomes_Tabs and the nine Artemis_Sub_Tabs in the collapsed presentation declared inside the `@media (max-width: 767px)` block of Source_Document, including the tab-strip overflow behavior and the active-pane-only visibility declared therein.
6. WHILE the viewport width is less than or equal to 767 CSS pixels, THE Footer link columns SHALL render as accordion rows whose expanded state is driven by the `data-accordion="active"` toggle and the `grid-template-rows: 0fr` to `1fr` transition with `0.6s cubic-bezier(0.625, 0.05, 0, 1)` easing declared for `[data-accordion-list="css"] [data-accordion-body]` in Source_Document.
7. WHILE the viewport width is less than or equal to 479 CSS pixels, THE Top_Strip SHALL apply the font-size, padding, and slide-content layout declarations contained in the `@media (max-width: 479px)` block of Source_Document.
8. WHEN a `resize` or `orientationchange` event fires on the window, THE Clone_Page SHALL re-evaluate which Source_Breakpoints media queries match the new viewport width within 1 animation frame (less than or equal to 16.7 ms at 60 Hz) of the event firing.
9. IF a Source_Breakpoints media query that matched the previous viewport width no longer matches the current viewport width, THEN THE Clone_Page SHALL remove every layout, spacing, visibility, and typography style contributed by that media query from the affected elements within the same animation frame as criterion 8, such that no element retains computed styles from a previously-matching breakpoint that no longer matches.

### Requirement 4: Top Strip Announcement Slider

**User Story:** As a visitor, I want the announcement strip at the top of the page to rotate through messages and link to the announced content, so that current promotions and product updates are visible.

#### Acceptance Criteria

1. THE Top_Strip SHALL render every Cycling_Strip_Slide declared inside the `.top-strip-box` element of Source_Document in the same order, mounting the same number of slides as Source_Document.
2. THE Top_Strip SHALL apply the background color, foreground text color, font-size, font-weight, padding, and height declared for `.top-strip-bar` in Source_Document with computed values matching Source_Document for the same selector path.
3. WHERE a Cycling_Strip_Slide carries the `.top-strip-bar.new` modifier, THE Top_Strip SHALL render the `New` pill with the background color, padding, border-radius, font-family, font-size, and uppercase transform declared for `.top-strip-bar.new .sb-text > div:after` in Source_Document.
4. WHEN the Clone_Page mounts and the Top_Strip contains two or more Cycling_Strip_Slides, THE Top_Strip SHALL display the first Cycling_Strip_Slide at opacity 1 and SHALL advance to the next Cycling_Strip_Slide at the rotation interval declared by the rotation script in Source_Document.
5. WHEN advancing between Cycling_Strip_Slides, THE Top_Strip SHALL simultaneously fade the outgoing slide from opacity 1 to opacity 0 and fade the incoming slide from opacity 0 to opacity 1 using the `opacity 1s ease-in-out` transition declared for `.top-strip-bar` in Source_Document, completing both transitions within 1000 ms.
6. WHEN the rotation reaches the final Cycling_Strip_Slide, THE Top_Strip SHALL loop back to the first Cycling_Strip_Slide on the next interval tick using the same fade declared in criterion 5.
7. THE Top_Strip SHALL render the close button declared in Source_Document with an accessible name describing its action.
8. WHEN the Top_Strip close button is activated by mouse click, touch tap, Enter key, or Space key, THE Top_Strip SHALL stop the rotation timer, hide the entire Top_Strip block from layout, and SHALL keep the Top_Strip hidden for the remainder of the page session.
9. IF Reduced_Motion is true, THEN THE Top_Strip SHALL replace the 1 s opacity fade in criteria 5 and 6 with an immediate slide swap completed within 1 animation frame.

### Requirement 5: Sticky Navigation and Mega Menus

**User Story:** As a visitor, I want a sticky navigation with hover-driven dropdowns identical to the source, so that I can browse top-level destinations without scroll lag or layout jumps.

#### Acceptance Criteria

1. WHEN the Top_Strip's bottom edge scrolls above the top of the viewport, THE Navigation SHALL stick to the top of the viewport and SHALL apply the `transition: transform 0.9s` rule declared for `.nav` in Source_Document.
2. THE Navigation SHALL render the brand logo, the four top-level items (Agent Platform {Artemis}, Agentic AI Apps, Agent Marketplace, More), the language toggle, and the Get a demo CTA in the same order as Source_Document.
3. WHEN the pointer enters a top-level navigation item that owns a Mega_Menu while the viewport width is greater than or equal to 992 CSS pixels, THE Navigation SHALL open that Mega_Menu by transitioning `.nav-dropdown-menu` opacity from 0 to 1 and transitioning each `.mega-column` from `translateY(2rem)` opacity 0 to `translateY(0)` opacity 1 with the nth-child transition delays of 0 s, 0.1 s, and 0.2 s declared in Source_Document.
4. WHEN the pointer leaves both the top-level item and its open Mega_Menu, THE Navigation SHALL close the Mega_Menu by reversing the transitions declared in criterion 3 and SHALL restore `.nav-dropdown-menu` opacity to 0 and pointer-events to none.
5. THE Mega_Menu for Agent Platform {Artemis} SHALL render the product card grid, the link groups, the recent insights list, and the event CTA in the same DOM order as Source_Document with identical computed typography, spacing, and color values for the corresponding nodes.
6. THE Mega_Menu for Agentic AI Apps SHALL render its product card grid, link groups, and CTA in the same DOM order as Source_Document with identical computed typography, spacing, and color values for the corresponding nodes.
7. THE Mega_Menu for Agent Marketplace SHALL render its featured cards and link groups in the same DOM order as Source_Document with identical computed typography, spacing, and color values for the corresponding nodes.
8. THE Mega_Menu for More SHALL render its link groups in the same DOM order as Source_Document with identical computed typography, spacing, and color values for the corresponding nodes.
9. WHILE the viewport width is less than or equal to 991 CSS pixels, THE Navigation SHALL render the hamburger toggle in place of the Mega_Menu top-level interaction surface.
10. WHEN the hamburger toggle is activated by mouse click, touch tap, Enter key, or Space key, THE Navigation SHALL open the Mobile_Drawer using the translate and fade transition declared for the mobile drawer in Source_Document.
11. WHEN a Mobile_Drawer top-level item with sub-items is activated, THE Mobile_Drawer SHALL expand the corresponding accordion row using the `grid-template-rows: 0fr` to `1fr` transition with `0.6s cubic-bezier(0.625, 0.05, 0, 1)` easing declared for `[data-accordion-list="css"] [data-accordion-body]` in Source_Document.
12. WHEN the Mobile_Drawer is open, THE Clone_Page SHALL apply the `lenis-stopped` overflow lock to the document element to match Source_Document.
13. WHEN the Mobile_Drawer closes, THE Clone_Page SHALL remove the `lenis-stopped` class from the document element and SHALL resume Lenis_Scroller within 1 animation frame.

### Requirement 6: Hero Section

**User Story:** As a visitor, I want a 100vh hero with the headline, subhead, CTAs, Artemis announcement card, and three Rive-animated product cards identical to the source, so that the first impression matches the brand surface.

#### Acceptance Criteria

1. THE Hero SHALL set its outer section height to `100vh` and apply the `padding-bottom: 0` rule declared for `.section-home-hero._100vh.pb-0` in Source_Document.
2. THE Hero SHALL render the background video element with the `src`, `poster`, `autoplay`, `loop`, `muted`, and `playsinline` attributes declared for the `.home-hero-video` element in Source_Document.
3. THE Hero SHALL render the headline, the subhead paragraph, the Get a demo CTA, the Analyst Reports CTA, and the Artemis announcement card with the typography, spacing, and CTA treatments declared in Source_Document.
4. THE Hero SHALL render three Rive_Canvas_Blocks in document order Pre_built_Applications, Application_Accelerators, Tailored_Applications, each initialized at canvas opacity 0 before its first frame paint and each loading the `.riv` file referenced by its `data-rive-src` attribute in Source_Document via the `@rive-app/canvas` runtime.
5. WHEN a Rive_Canvas_Block has finished its first frame paint, THE Hero SHALL transition the canvas opacity from 0 to 1 over 350 ms matching the inline `transition: opacity 0.35s` rule declared on `.rive-canvas` elements in Source_Document.
6. THE Hero SHALL render the side scroll indicator and apply the side-arrow flow keyframe animation declared in Source_Document with the same duration, iteration count, and easing.
7. WHEN the pointer enters the Get a demo CTA or the Analyst Reports CTA, THE Hero SHALL drive the button dot-and-line hover animation declared in Source_Document including the dot translate and the underline width transition.
8. WHEN the pointer leaves the Get a demo CTA or the Analyst Reports CTA, THE Hero SHALL reverse the hover animation declared in criterion 7, restoring the dot and underline to their pre-hover positions.
9. IF a Rive_Canvas_Block fails to load its `.riv` file or fails to paint its first frame within 10 seconds of mount, THEN THE Hero SHALL keep the canvas at opacity 0, SHALL render the static poster image declared by Asset_Manifest for that Rive file, and SHALL emit zero unhandled errors to the browser console.
10. IF Reduced_Motion is true, THEN THE Hero SHALL pause the background video on its first available frame, hold each Rive_Canvas_Block on its first frame, and disable the side scroll indicator's keyframe animation.

### Requirement 7: Industry Logo Tabs Section

**User Story:** As a visitor, I want to switch between industries and see the corresponding customer logo marquee, so that I can see who Kore.ai serves in my sector.

#### Acceptance Criteria

1. THE Industry_Tabs section SHALL render five Industry_Tabs in the order Banking, Healthcare, Retail, Telecom_and_Media, Business.
2. THE Industry_Tabs section SHALL render one Swiper_Instance per Industry_Tab containing one slide per logo declared inside that industry's `.connect-logos-marquee` block in Source_Document, with one-to-one mapping between source logos and rendered slides.
3. WHEN the Clone_Page mounts, THE Industry_Tabs SHALL select Banking as the active Industry_Tab, SHALL set its tab element's `aria-selected` to `true`, SHALL set every other tab's `aria-selected` to `false`, and SHALL display Banking's Swiper_Instance.
4. WHEN an inactive Industry_Tab is activated by mouse click, touch tap, Enter key, or Space key, THE Industry_Tabs SHALL update `aria-selected` to `true` on the activated tab and `false` on every other tab within 100 ms of the activation.
5. WHEN an inactive Industry_Tab has been activated, THE Industry_Tabs SHALL apply the `[tabs-component] [tabs-content]:not(.active) { display: none }` rule declared in Source_Document to hide the previously active Swiper_Instance and SHALL display the newly active Swiper_Instance within 500 ms of activation.
6. THE Swiper_Instance for each Industry_Tab SHALL apply the `slidesPerView`, `spaceBetween`, `loop`, `speed`, `autoplay`, `freeMode`, and `breakpoints` configuration declared in Source_Document for that slider.
7. THE Swiper_Instance for each Industry_Tab SHALL render every logo as an image element with the height of `22px` and the wrapper width of `120px` declared for `.connect-logos-marquee .connect-logo` and `.connect-logos-marquee .connect-logo img` in Source_Document, and SHALL set each image's `alt` attribute to the customer brand name from Source_Document.
8. THE Industry_Tabs section SHALL apply the section background color, padding, container width, and the heading font-family, font-size, font-weight, line-height, and letter-spacing declared in Source_Document.

### Requirement 8: Business Outcomes Tabs and Artemis Sub-Tabs

**User Story:** As a visitor, I want to explore the four product groups and dive into the nine Artemis capability panes, so that I can learn how each offering accelerates outcomes.

#### Acceptance Criteria

1. THE Business_Outcomes section SHALL render four Outcomes_Tabs in the order Pre_built_Applications, Application_Accelerators, Tailored_Applications, Agent_Platform_Artemis, and SHALL select Pre_built_Applications as the active Outcomes_Tab on Clone_Page mount.
2. WHEN an Outcomes_Tab other than Agent_Platform_Artemis is active, THE Business_Outcomes section SHALL render that Outcomes_Tab's service-card grid, hover image buttons, and tab-specific content blocks as declared in Source_Document.
3. WHEN the Outcomes_Tab Agent_Platform_Artemis is active for the first time in a page session, THE Business_Outcomes section SHALL render the nine Artemis_Sub_Tabs and SHALL select the first Artemis_Sub_Tab as active, displaying its corner-bordered content pane.
4. WHEN an inactive Outcomes_Tab is activated by mouse click, touch tap, Enter key, or Space key, THE Business_Outcomes section SHALL hide the previously active content via the `[tabs-component] [tabs-content]:not(.active) { display: none }` rule declared in Source_Document and SHALL display the newly active content within 1 animation frame of activation.
5. WHEN the Outcomes_Tab Agent_Platform_Artemis is activated, THE Business_Outcomes section SHALL apply the `dark-mode` class to the `#explore-products` element matching the JavaScript toggle declared in Source_Document.
6. WHEN the active Outcomes_Tab changes from Agent_Platform_Artemis to any other Outcomes_Tab, THE Business_Outcomes section SHALL remove the `dark-mode` class from the `#explore-products` element within 1 animation frame.
7. WHEN an inactive Artemis_Sub_Tab is activated by mouse click, touch tap, Enter key, or Space key, THE Business_Outcomes section SHALL replay its sub-pane entrance animation timeline using the same GSAP timeline parameters declared in Source_Document.
8. WHEN the pointer enters an element carrying the `hover-img-button` class inside Business_Outcomes, THE Hover_Image_Preview SHALL display the image declared by that element's `data-img` attribute and SHALL follow the cursor with the lerp easing declared in Source_Document.
9. WHEN the pointer leaves an element carrying the `hover-img-button` class, THE Hover_Image_Preview SHALL fade out over the duration declared in Source_Document.
10. THE Business_Outcomes Rive_Canvas_Blocks SHALL load each `.riv` file referenced by `data-rive-src` in Source_Document and SHALL apply the same opacity transition rule declared in Requirement 6 acceptance criterion 5.
11. IF Reduced_Motion is true, THEN THE Business_Outcomes section SHALL skip the Artemis_Sub_Tab GSAP entrance timelines, SHALL apply the final post-animation state of every sub-pane on activation within 1 animation frame, and SHALL hold each Rive_Canvas_Block on its first frame.

### Requirement 9: Analyst Recognition Tabs Section

**User Story:** As a visitor, I want to see analyst recognition by category, so that I can validate Kore.ai's market position.

#### Acceptance Criteria

1. THE Analyst_Recognition section SHALL render four tabs in the order Conversational_AI_Platforms, Cognitive_Search_Platforms, GenAI_Applications, GenAI_Engineering.
2. WHEN the Clone_Page mounts, THE Analyst_Recognition section SHALL select Conversational_AI_Platforms as the active tab, SHALL set its tab element's `aria-selected` to `true`, SHALL set every other tab's `aria-selected` to `false`, and SHALL display its content pane.
3. WHEN an inactive Analyst_Recognition tab is activated by mouse click, touch tap, Enter key, or Space key, THE Analyst_Recognition section SHALL update `aria-selected` on every tab, hide the previously active pane, and display the newly active pane using the 300 ms duration-in / 100 ms duration-out timings declared by `data-duration-in`, `data-duration-out`, and `data-easing` on the `.featured-tabs.with-bg` element in Source_Document.
4. THE Analyst_Recognition section SHALL render for each tab pane the body copy, the analyst image (with `srcset`, `sizes`, and `alt` attributes declared in Source_Document), and the primary CTA button (with the label and `href` declared in Source_Document) in the same DOM order as Source_Document.
5. THE Analyst_Recognition section SHALL apply the section background color, container width, padding, the heading font-family, font-size, font-weight, line-height, and letter-spacing, and the `.tabs-menu.v2` and `.tab-btn` active-state and hover-state styling declared in Source_Document.
6. THE Analyst_Recognition tab strip SHALL render the tablist with `role="tablist"`, each tab with `role="tab"`, each pane with `role="tabpanel"`, and SHALL pair every tab with its pane via matching `aria-controls` and `aria-labelledby` attributes.

### Requirement 10: Customer Testimonials Slider

**User Story:** As a visitor, I want to read customer success quotes from named brands, so that I trust the platform.

#### Acceptance Criteria

1. THE Testimonials section SHALL render one Swiper_Instance containing every testimonial slide declared inside the testimonial block of Source_Document with one-to-one mapping between source slides and rendered slides.
2. THE Testimonials Swiper_Instance SHALL apply the `slidesPerView`, `spaceBetween`, `loop`, `speed`, `autoplay`, `pagination`, and `navigation` configuration declared in Source_Document.
3. THE Testimonials section SHALL render every customer logo, customer name, role, and quote with the typography, spacing, and color declared in Source_Document.
4. THE Testimonials section SHALL render the previous and next navigation buttons with the icon, size, and hover state declared in Source_Document.
5. THE Testimonials Swiper_Instance SHALL preserve the autoplay tick interval declared in Source_Document and SHALL advance to the next slide on each tick.
6. WHEN a Testimonials navigation button is activated by mouse click, touch tap, Enter key, or Space key, THE Testimonials Swiper_Instance SHALL transition to the previous slide for the previous button and to the next slide for the next button using the speed declared in Source_Document.
7. WHERE the source Swiper configuration declares pause-on-hover, WHEN the pointer enters the Testimonials slider, THE Testimonials Swiper_Instance SHALL pause autoplay, and WHEN the pointer leaves the Testimonials slider, THE Testimonials Swiper_Instance SHALL resume autoplay.
8. WHERE the Testimonials Swiper_Instance has `loop` disabled and the active slide is the first slide, THE Testimonials section SHALL render the previous navigation button in its disabled state styling declared in Source_Document, and WHERE the Testimonials Swiper_Instance has `loop` disabled and the active slide is the last slide, THE Testimonials section SHALL render the next navigation button in its disabled state styling declared in Source_Document.
9. WHEN a Testimonials pagination indicator is activated by mouse click, touch tap, Enter key, or Space key, THE Testimonials Swiper_Instance SHALL transition to the slide whose index matches the activated indicator using the speed declared in Source_Document.

### Requirement 11: Strategic Partners Section

**User Story:** As a visitor, I want to see strategic partner cards for Microsoft and AWS with their CTAs, so that I can explore co-built solutions.

#### Acceptance Criteria

1. THE Strategic_Partners section SHALL render exactly two partner cards in the document order Microsoft, AWS as declared in Source_Document.
2. THE Strategic_Partners section SHALL render each partner card with the card image (preserving intrinsic aspect ratio and the `object-fit` declared in Source_Document, with `alt` set to the partner brand name), the card heading, the card body copy, the card CTA, the card background color, the card border-radius, and the card padding declared in Source_Document.
3. WHEN the pointer enters a partner card CTA or the CTA receives keyboard focus, THE Strategic_Partners section SHALL apply the dot-and-line hover treatment declared in Source_Document, completing the dot translate and underline width transition within the duration declared in Source_Document.
4. THE Strategic_Partners section SHALL apply the section background color, container width, padding, and the heading font-family, font-size, font-weight, line-height, and letter-spacing declared in Source_Document.
5. WHEN the pointer leaves a partner card CTA or the CTA loses keyboard focus, THE Strategic_Partners section SHALL reverse the dot-and-line transition declared in criterion 3, restoring the dot and underline to their pre-hover positions within the duration declared in Source_Document.
6. WHEN a partner card CTA is activated by mouse click, touch tap, Enter key, or Space key, THE Strategic_Partners section SHALL navigate the browser to the destination URL declared by that CTA's `href` in Source_Document, preserving the `target` and `rel` attributes declared in Source_Document.
7. IF a partner card image fails to load, THEN THE Strategic_Partners section SHALL preserve the card layout, SHALL display the image's `alt` text, and SHALL emit zero unhandled errors to the browser console.

### Requirement 12: AI Insights Blog Grid

**User Story:** As a visitor, I want to scan a featured insight and the latest insights from one section, so that I can read recent thought leadership.

#### Acceptance Criteria

1. THE AI_Insights section SHALL render exactly one featured blog block (the `.blogs_hero-section_block.hide-mobile-landscape` node containing one `.blog-item` with class `for-homepage`) and exactly one latest blogs list (the `.blogs_hero-section_block.for-latest.for-homepage > .latest-blogs-list` node) containing exactly four `.blog-item.is-latest` entries, in the same DOM order, parent-child nesting, and class names declared in Source_Document.
2. THE AI_Insights section SHALL render each blog item with the cover image inside `.blog-img-wrap`, the title inside the heading element, and the `.blog-meta` block containing the publish date and the read-time copy declared in Source_Document, AND WHERE Source_Document declares any additional category or tag node for that item, THE AI_Insights section SHALL render that node in the same DOM position with the same text content.
3. IF Source_Document declares the read-time text node as empty for a given blog item, THEN THE AI_Insights section SHALL render that read-time node as empty without injecting placeholder text and without removing the surrounding `.blog-meta` separator declared in Source_Document.
4. THE AI_Insights section SHALL render the section heading text "AI Insights" and the "View all" CTA in the same DOM order, computed typography, spacing, and CTA treatment declared in Source_Document, with the CTA's `href` attribute equal to the `href` declared on the corresponding anchor in Source_Document.
5. THE AI_Insights section SHALL source the blog item content (image URL, title, publish date, read-time copy, and destination href) from a static, build-time TypeScript fixture file at `src/components/kore/data/insights.ts` whose entries are equal in count and field values to the items captured in Source_Document (one featured plus four latest), and SHALL NOT contact any Out_Of_Scope_Backends.
6. WHEN the pointer enters a blog item, THE AI_Insights section SHALL apply the hover transition (target properties, durations, and easing) declared in Source_Document for that item's class.
7. WHEN the pointer leaves a blog item, THE AI_Insights section SHALL reverse the hover transition declared in criterion 6, restoring every transitioned property to its pre-hover computed value within the duration declared in Source_Document.
8. WHEN a blog item is activated by mouse click, touch tap, Enter key, or Space key, THE AI_Insights section SHALL navigate the browser to the destination URL declared by that item's anchor `href` in Source_Document.
9. WHILE the viewport width is less than or equal to 767 CSS pixels (the breakpoint at which the `.hide-mobile-landscape { display: none !important }` rule declared in Source_Document is active), THE AI_Insights section SHALL hide the featured `.blogs_hero-section_block.hide-mobile-landscape` block from layout and SHALL render only the latest blogs list with the layout, spacing, and typography declared in Source_Document for that breakpoint.

### Requirement 13: Pre-Footer CTA Blocks and Exit Modal

**User Story:** As a visitor, I want to see two end-of-page CTAs and a triggered exit modal that match the source, so that I have one final chance to convert.

#### Acceptance Criteria

1. THE Pre_Footer_CTA section SHALL render the "Accelerate time-to-value" CTA block and the "Start using {Artemis} today" CTA block in the order, layout, and styling declared in Source_Document.
2. THE Pre_Footer_CTA section SHALL render every CTA button with the label, hover treatment, target URL, and `aria-label` declared in Source_Document.
3. WHEN the pointer leaves the document through the top edge of the viewport for the first time in a page session, THE Exit_Modal SHALL open within 100 ms of the pointer-leave event using the entrance transition declared in Source_Document, and on every subsequent pointer-leave event in the same page session, THE Exit_Modal SHALL NOT re-open.
4. WHILE the Exit_Modal is open, THE Clone_Page SHALL apply the `lenis-stopped` overflow lock to the document element matching Source_Document and SHALL suspend Lenis_Scroller for the duration the Exit_Modal remains open.
5. WHEN the Exit_Modal close affordance is activated by mouse click, touch tap, Enter key, or Space key, OR WHEN the backdrop is activated by mouse click or touch tap, OR WHEN the Escape key is pressed while the Exit_Modal is open, THE Exit_Modal SHALL close using the exit transition declared in Source_Document, SHALL release the `lenis-stopped` overflow lock within 1 animation frame of the close transition completing, and SHALL return keyboard focus to the element that was focused immediately before the Exit_Modal opened.
6. THE Exit_Modal SHALL render the heading, body copy, primary CTA, and secondary CTA declared inside the exit-modal block of Source_Document.
7. WHEN the Exit_Modal opens, THE Exit_Modal SHALL set `role="dialog"`, `aria-modal="true"`, `aria-labelledby` referencing the Exit_Modal heading element id, and SHALL move keyboard focus to the close affordance within 1 animation frame of the open transition starting.
8. IF Reduced_Motion is true, THEN THE Exit_Modal SHALL replace the entrance transition declared in criterion 3 and the exit transition declared in criterion 5 with an immediate display swap completed within 1 animation frame.

### Requirement 14: Site Footer

**User Story:** As a visitor, I want a complete footer with logo, language toggle, link columns, RFP CTA, social links, legal row, and back-to-top control identical to the source, so that secondary navigation is preserved.

#### Acceptance Criteria

1. THE Footer SHALL render the brand logo, the language toggle, the four link columns, the RFP CTA block, the social links row, the legal links row, the copyright line, and the back-to-top control in the same DOM order as Source_Document, and the keyboard tab order produced by Tab key navigation through the Footer SHALL match the DOM order without any positive `tabindex` value.
2. THE Footer SHALL apply the section background color, gradient stops and angle, divider colors, padding, container width, column widths, font-family, font-size, font-weight, line-height, and letter-spacing declared in Source_Document.
3. WHEN the back-to-top control is activated by mouse click, touch tap, Enter key, or Space key, THE Footer SHALL invoke Lenis_Scroller to scroll the document to scroll position 0 using the duration declared in Source_Document.
4. WHEN the pointer enters the language toggle or the language toggle receives keyboard focus, THE Footer SHALL display the language list using the `.lang-toggle.open .lang-toggle-body` opacity and pointer-events transition declared in Source_Document.
5. WHEN the pointer leaves both the language toggle and the open language list, OR WHEN keyboard focus moves outside the language toggle and its language list, OR WHEN the Escape key is pressed while the language list is open, THE Footer SHALL close the language list by reversing the transition declared in criterion 4.
6. WHILE the viewport width is less than or equal to 767 CSS pixels, THE Footer link columns SHALL collapse into accordion rows whose toggle behavior matches the rule defined in Requirement 3 acceptance criterion 6.
7. THE Footer SHALL render every social link icon with the same icon asset, hover background, hover icon swap, target URL `href`, `target` attribute, and `rel` attribute declared in Source_Document.
8. WHEN a language list item is activated by mouse click, touch tap, Enter key, or Space key, THE Footer SHALL render a non-functional acknowledgement and SHALL NOT contact any Out_Of_Scope_Backends.
9. IF Reduced_Motion is true, THEN the back-to-top behavior in criterion 3 SHALL set the document scroll position to 0 immediately within 1 animation frame instead of using the Lenis_Scroller smooth-scroll duration.

### Requirement 15: Content Modals (Enterprise Tech Stack and Video Modals)

**User Story:** As a visitor, I want to open the enterprise tech stack modal and the AI for Work, Service, and Process video modals with their content intact, so that I can dive deeper without leaving the page.

#### Acceptance Criteria

1. THE Modals_Layer SHALL render an enterprise tech stack modal whose copy text, images, close affordance, and backdrop computed typography, spacing, and color match the modal block declared in Source_Document.
2. THE Modals_Layer SHALL render three video modals — AI_for_Work, AI_for_Service, AI_for_Process — whose copy text, embedded video sources (`src` and `poster`), close affordance, and backdrop computed typography, spacing, and color match the corresponding modal blocks declared in Source_Document.
3. WHEN any modal trigger is activated by mouse click, touch tap, Enter key, or Space key, THE Modals_Layer SHALL open the targeted modal using the entrance transition declared in Source_Document completing within 500 ms, SHALL apply the `lenis-stopped` overflow lock to the document element within 1 animation frame, and SHALL move keyboard focus to the close affordance of the opened modal.
4. WHEN the close affordance of an open modal is activated by mouse click, touch tap, Enter key, or Space key, OR WHEN the backdrop is activated by mouse click or touch tap, OR WHEN the Escape key is pressed while a modal is open, THE Modals_Layer SHALL close that modal using the exit transition declared in Source_Document completing within 500 ms, SHALL release the `lenis-stopped` overflow lock within 1 animation frame of the exit transition completing, and SHALL return keyboard focus to the trigger element that was focused immediately before the modal opened.
5. WHEN a video modal opens, THE Modals_Layer SHALL autoplay the video with audio muted matching the `autoplay` and `muted` attributes declared in Source_Document.
6. WHEN a video modal closes, THE Modals_Layer SHALL pause the video and reset the playback time to 0 within 1 animation frame.
7. WHILE a modal is open, THE Modals_Layer SHALL trap keyboard focus within the open modal such that Tab key navigation cycles forward through the modal's focusable descendants and Shift+Tab cycles backward, with no focus moving outside the modal until the modal closes.
8. WHILE any modal is open, THE Modals_Layer SHALL ensure that no other modal in this Modals_Layer is simultaneously open.
9. IF Reduced_Motion is true, THEN THE Modals_Layer SHALL replace the entrance and exit transitions declared in criteria 3 and 4 with an immediate display swap completed within 1 animation frame.
10. IF an embedded video fails to load within 10 seconds of the modal opening, THEN THE Modals_Layer SHALL display the video poster image declared in Source_Document, SHALL keep the modal open, and SHALL emit zero unhandled errors to the browser console.

### Requirement 16: Hover Image Preview

**User Story:** As a visitor, I want a cursor-following preview image to appear when I hover over preview-bearing buttons, so that I get an instant visual hint of the destination.

#### Acceptance Criteria

1. THE Hover_Image_Preview SHALL render exactly one fixed-position container with `width: 180px`, `height: auto`, `object-fit: contain`, `pointer-events: none`, and `z-index: 99` matching the `.cta-hover-image` rule declared in Source_Document.
2. WHEN the pointer enters an element carrying the `hover-img-button` class, THE Hover_Image_Preview SHALL load the image referenced by that element's `data-img` attribute, SHALL wait the 100 ms delay declared in Source_Document, and SHALL apply the `opacity 0.5s ease` entrance transition from opacity 0 to opacity 1 declared in Source_Document with the container scale held at 1.
3. WHILE the pointer is over an element carrying the `hover-img-button` class, THE Hover_Image_Preview SHALL update its position once per animation frame to follow the cursor with the lerp factor 0.15 declared in Source_Document and SHALL position the image 20 CSS pixels below the cursor position.
4. WHEN the pointer leaves an element carrying the `hover-img-button` class, THE Hover_Image_Preview SHALL cancel any pending entrance delay declared in criterion 2 and SHALL apply the `opacity 0.5s ease` exit transition from opacity 1 to opacity 0 declared in Source_Document.
5. WHERE the visitor's primary input is coarse (the media query `(hover: none) and (pointer: coarse)` matches), THE Hover_Image_Preview SHALL remain hidden at opacity 0 and SHALL NOT respond to touch or pointer events.
6. IF an element carrying the `hover-img-button` class has no `data-img` attribute or has `data-img` set to an empty string, THEN THE Hover_Image_Preview SHALL remain hidden at opacity 0 on pointer enter and SHALL emit zero unhandled errors to the browser console.
7. WHEN a `scroll` event fires on the window while the Hover_Image_Preview is visible, THE Hover_Image_Preview SHALL hide by setting opacity to 0 within 1 animation frame, and IF the pointer is still over an element carrying the `hover-img-button` class after the scroll, THEN THE Hover_Image_Preview SHALL re-trigger the entrance behavior declared in criterion 2.

### Requirement 17: Loader Sequence

**User Story:** As a visitor, I want a brief loader animation on first paint that hides flicker, so that the page reveal feels intentional.

#### Acceptance Criteria

1. WHEN the Clone_Page mounts for the first time in a browser session, THE Loader SHALL apply the `loading` class to the document element within 1 animation frame matching the `html.loading` rule declared in Source_Document.
2. WHILE the `loading` class is applied to the document element, THE Clone_Page SHALL set `overflow: hidden`, `position: fixed`, `width: 100%`, and `height: 100%` on the document element matching the rule declared in Source_Document such that mouse wheel, touch scroll, and keyboard scroll inputs do not change the document scroll position.
3. THE Loader SHALL display the first logo (`.loader.logo-1`) for a duration between 200 ms and 2000 ms matching the duration declared by the loader script in Source_Document.
4. WHEN the first logo display duration in criterion 3 elapses, THE Loader SHALL cross-fade to the second logo (`.loader.logo-2`) using the transition declared in Source_Document, completing the cross-fade within 1000 ms.
5. WHEN Loader_Sequence completes, THE Clone_Page SHALL remove the `loading` class from the document element, SHALL apply the `ready` class declared in Source_Document within 1 animation frame, and SHALL unmount the loader DOM nodes.
6. THE Clone_Page SHALL NOT apply the `anti-flicker` class to the document element at any point in the page lifecycle.
7. IF Reduced_Motion is true, THEN THE Loader SHALL skip Loader_Sequence, SHALL NOT apply the `loading` class to the document element, and SHALL apply the `ready` class within 1 animation frame of mount.
8. IF Loader_Sequence has not completed within 5000 ms of Clone_Page mount, THEN THE Loader SHALL force-complete the sequence, remove the `loading` class, apply the `ready` class, unmount the loader DOM nodes, and emit zero unhandled errors to the browser console.

### Requirement 18: Floating Chatbot Element

**User Story:** As a visitor, I want a floating chatbot affordance in the lower right that expands on interaction, so that the entry to a conversation is always visible.

#### Acceptance Criteria

1. THE Chatbot SHALL render a fixed-position element in the lower right of the viewport at the offset, size, background color, border-radius, and shadow declared for `.chatbot-element` in Source_Document.
2. WHILE the Chatbot has not been activated during the current page session, THE Chatbot SHALL apply the `.chatbot-element:not(.ready)` rule declared in Source_Document with width `3.5rem` and SHALL render `.chatbot-line-spacer`, `.chatbot-input`, and `.chatbot-arrow-btn` at opacity 0 with `pointer-events: none`.
3. WHEN the collapsed Chatbot affordance is activated by mouse click, touch tap, Enter key, or Space key, THE Chatbot SHALL apply the `.chatbot-element.ready` rule declared in Source_Document within 1 animation frame, SHALL set the chatbot icon `max-width` to `1.25rem`, SHALL fade in `.chatbot-line-spacer` with transition delay `0.5s`, `.chatbot-input` with transition delay `0.8s`, and `.chatbot-arrow-btn` with transition delay `0.3s` declared in Source_Document, and SHALL match the expanded width declared for `.chatbot-element.ready`.
4. WHEN the chatbot input or the chatbot arrow button is activated with a non-empty trimmed message via mouse click, touch tap, or Enter key, THE Chatbot SHALL render an inline acknowledgement indicating the message has been received, SHALL clear the input value to an empty string, and SHALL NOT contact any Out_Of_Scope_Backends.
5. IF the chatbot input value is empty or contains only whitespace WHEN the arrow button is activated, THEN THE Chatbot SHALL NOT render the acknowledgement declared in criterion 4, SHALL retain keyboard focus on the input, and SHALL NOT contact any Out_Of_Scope_Backends.
6. WHILE the viewport width is less than or equal to 767 CSS pixels, THE Chatbot SHALL apply the offset, size, and visibility rules declared for `.chatbot-element` in the `@media (max-width: 767px)` block of Source_Document.
7. IF Reduced_Motion is true, THEN THE Chatbot SHALL replace the staggered fade transitions declared in criterion 3 with an immediate state change completed within 1 animation frame.

### Requirement 19: Smooth Scroll and ScrollTrigger Animations

**User Story:** As a visitor, I want the page to scroll smoothly and reveal content with the same scroll-driven animations as the source, so that the motion feel is preserved.

#### Acceptance Criteria

1. WHEN the Clone_Page mounts, THE Lenis_Scroller SHALL initialize with the `duration`, `easing`, `smoothWheel`, `smoothTouch`, `direction`, and `gestureDirection` configuration values declared by the Lenis instantiation in Source_Document.
2. THE Lenis_Scroller SHALL drive document scroll for every Page_Section.
3. THE Clone_Page SHALL synchronize the GSAP `ticker` with Lenis_Scroller using the integration pattern declared in Source_Document, calling `lenis.raf(time)` from within the GSAP ticker callback on every frame.
4. THE Clone_Page SHALL register a GSAP_Scroll_Trigger for every `data-anim`, `data-anim-rotate`, `data-anim-scale`, `data-anim-hero-image`, and `data-stagger` attribute declared in Source_Document with `start: "top 95%"`, `once: true`, and the corresponding entrance transition declared in the inline style block of Source_Document.
5. THE Clone_Page SHALL apply the `transition-delay` value `0.1s + n * 0.1s` for each `[transition-delay="n"]` element matching the rule declared in Source_Document for n in 0 through 15.
6. WHEN a `data-anim` element's top edge crosses 95 percent of the viewport height during scroll, THE Clone_Page SHALL transition its opacity from 0 to 1 and its transform from `translate3d(0, 0.75rem, 0)` to `translate3d(0, 0, 0)` over `1.25s` with the `cubic-bezier(0.22, 0.6, 0.36, 1)` easing declared in Source_Document, and SHALL NOT replay the transition on subsequent scroll passes.
7. WHEN a `data-anim-scale` element's top edge crosses 95 percent of the viewport height during scroll, THE Clone_Page SHALL transition its opacity from 0 to 1 and its scale from `0.5` to `1` over `1.25s` with the easing declared in Source_Document, and SHALL NOT replay the transition on subsequent scroll passes.
8. WHEN a `data-anim-rotate` element's top edge crosses 95 percent of the viewport height during scroll, THE Clone_Page SHALL transition its opacity from 0 to 1 and its rotation from `-4deg` to `0deg` over `1.25s` with the easing declared in Source_Document, and SHALL NOT replay the transition on subsequent scroll passes.
9. WHEN a `data-anim-hero-image` element's top edge crosses 95 percent of the viewport height during scroll, THE Clone_Page SHALL transition its rotation from `-4deg` to `0deg` and its scale from `1.1` to `1.0` over `1.25s` with the easing declared in Source_Document, and SHALL NOT replay the transition on subsequent scroll passes.
10. WHEN Loader_Sequence completes per Requirement 17 acceptance criterion 5, THE Clone_Page SHALL apply the `ready` class to the document element so that the `html:not(.ready) [data-anim]` initial state declared in Source_Document is released.
11. WHEN the Clone_Page unmounts (route navigation away from `/kore-ai-component`), THE Clone_Page SHALL destroy the Lenis_Scroller instance, kill every registered GSAP_Scroll_Trigger, and remove the GSAP ticker callback declared in criterion 3 such that no Lenis or ScrollTrigger references remain attached to the window or document.
12. IF Reduced_Motion is true, THEN THE Clone_Page SHALL apply the final post-animation state of every `data-anim`, `data-anim-rotate`, `data-anim-scale`, `data-anim-hero-image`, and `data-stagger` element on mount within 1 animation frame, SHALL NOT register any GSAP_Scroll_Triggers that drive entrance transforms, and SHALL fall back to native browser scrolling without initializing Lenis_Scroller.

### Requirement 20: Marquee, Side-Arrow, and Button Hover Keyframes

**User Story:** As a visitor, I want the marquee, side-arrow flow, and button dot/line hover animations to play exactly as in the source, so that the kinetic detail is preserved.

#### Acceptance Criteria

1. THE Clone_Page SHALL define every CSS `@keyframes` rule declared inside the inline style block of Source_Document under the same animation name with frame stops, percentages, and property values exactly equal to those declared in Source_Document.
2. THE Clone_Page SHALL apply each keyframe animation to the same selectors that bind the animation in Source_Document with `animation-duration`, `animation-timing-function`, `animation-iteration-count`, `animation-delay`, and `animation-direction` exactly equal to the longhand values declared in Source_Document.
3. THE Industry_Tabs Swiper_Instance SHALL drive its logo scroll using the `marqueeSlide` keyframe with the `[marquee-anim="20s"]` `20s linear infinite` configuration declared in Source_Document, looping seamlessly between iterations with no visible jump.
4. WHEN the pointer enters a button element carrying the `button` class with the dot variant declared in Source_Document, THE Clone_Page SHALL animate the dot opacity from 0 to 1 and the underline `width` using the durations and easings declared in Source_Document.
5. WHEN the pointer leaves a button element carrying the `button` class with the dot variant declared in Source_Document, THE Clone_Page SHALL reverse the dot and underline transitions declared in criterion 4, restoring the dot opacity to 0 and the underline width to its pre-hover value within the durations declared in Source_Document.
6. THE Hero side scroll indicator SHALL apply the `sideArrowFlow` keyframe with `1.5s` duration, `infinite` iteration count, and the staggered `0s` and `0.3s` delays declared for the two `.side-arrow` children in Source_Document.
7. THE Clone_Page SHALL apply the `grid-template-rows` transition from `0fr` to `1fr` with `0.6s cubic-bezier(0.625, 0.05, 0, 1)` easing declared in Source_Document for every `[data-accordion-list="css"] [data-accordion-body]` element.
8. WHEN an accordion item carrying `data-accordion-list="css"` toggles to `data-accordion="active"`, THE Clone_Page SHALL rotate the accordion icon by `180deg` and the accordion cross icon by `45deg` matching the rules declared for `[data-accordion="active"] .accordion-icon` and `[data-accordion="active"] .accordion-cross-icon` in Source_Document.
9. IF Reduced_Motion is true, THEN THE Clone_Page SHALL apply `animation-play-state: paused` to the marquee and side-arrow keyframes declared in criteria 3 and 6 holding each at its first frame, and SHALL replace the button dot/line hover transitions declared in criteria 4 and 5 with immediate state changes completed within 1 animation frame.

### Requirement 21: Typography System

**User Story:** As the senior frontend engineer, I want fonts loaded and applied identically to the source, so that text appears in the exact same family, weight, size, and rhythm.

#### Acceptance Criteria

1. THE Clone_Page SHALL load the `Space Grotesk` family in normal style with weights 300, 400, 500, 600, and 700 from the Google Fonts source URL referenced in Source_Document, such that `document.fonts.check` returns true for each of the five weight/style pairs before the first user-visible paint of any text node whose computed `font-family` resolves to `Space Grotesk` in Source_Document.
2. THE Clone_Page SHALL load the `Source Code Pro` family with every weight and style required by selectors in Source_Document that declare `font-family: Sourcecodepro`, including the weight applied to the Top_Strip `New` pill (`.top-strip-bar.new .sb-text > div:after`) and the section tag pill labels, such that `document.fonts.check` returns true for each loaded weight before the first user-visible paint of any text node assigned that family.
3. THE Clone_Page SHALL load the `Inter` family with every weight and style required by in-scope selectors in Source_Document that declare `font-family: Inter` for body copy adjacent to the cookie consent surface; IF every selector referencing `Inter` in Source_Document belongs exclusively to Out_Of_Scope_Scripts, THEN THE Clone_Page MAY omit loading `Inter` and SHALL document the omission in Asset_Manifest.
4. THE Clone_Page SHALL apply `font-family`, `font-weight`, `font-size`, `line-height`, and `letter-spacing` to each text element such that, for every CSS selector or data-attribute path present in both Clone_Page and Source_Document, the computed `font-family` and `font-weight` values are exactly equal and the computed `font-size`, `line-height`, and `letter-spacing` values match within 0.5 device-independent pixels at every Reference_Viewport.
5. THE Clone_Page SHALL render every text node carrying a pill label class declared in Source_Document (`.top-strip-bar.new .sb-text > div:after` and the section tag pills) with the `text-transform: uppercase` declaration and the `Sourcecodepro` font-family declared for that selector in Source_Document, with computed `text-transform` equal to `uppercase` and computed `font-family` resolving to `Source Code Pro` before any fallback family.
6. IF a font family declared in criteria 1, 2, or 3 fails to reach `loaded` status within 3 seconds of Clone_Page mount, THEN THE Clone_Page SHALL render every affected text node using the generic family keyword declared at the end of that family's CSS font stack in Source_Document (`sans-serif` for `Space Grotesk` and `Inter`, `monospace` for `Source Code Pro`), SHALL retain the element's bounding-box height within 1 device-independent pixel of the loaded-font layout, and SHALL emit zero unhandled errors to the browser console.
7. WHEN every font face declared in criteria 1, 2, and 3 has either resolved or exhausted the 3 second timeout in criterion 6, THE Clone_Page SHALL resolve `document.fonts.ready` within 1 animation frame so that visual fidelity captures defined in Requirement 2 are deterministic.

### Requirement 22: Design Token Extraction

**User Story:** As the senior frontend engineer, I want every literal style value extracted into a typed Design_Tokens module, so that fidelity is enforceable and future edits remain consistent.

#### Acceptance Criteria

1. THE Design_Tokens module SHALL export TypeScript `as const` object literals with narrowed literal types named `colors`, `fonts`, `fontSizes`, `fontWeights`, `lineHeights`, `letterSpacings`, `spacing`, `radii`, `shadows`, `durations`, `easings`, `zIndices`, and `breakpoints`.
2. THE Design_Tokens `colors` record SHALL include every distinct color value (hex, rgb, rgba, hsl, hsla, or named keyword) extracted from the CSS custom properties declared on `:root`, `html`, or `body` in Source_Document and from every literal color declaration applied in selectors of Source_Document, including the values exposed via the `--blue`, `--primary--charcoal-03`, `--primary--charcoal-04`, and `--stroke--border-light` custom properties.
3. THE Design_Tokens `breakpoints` record SHALL declare entries `desktop = 992`, `tablet = 768`, `mobileLandscape = 480`, and `mobilePortrait = 360` as integer CSS pixel counts matching the Source_Breakpoints.
4. THE Design_Tokens `easings` record SHALL include `silk = "cubic-bezier(0.625, 0.05, 0, 1)"` and every other distinct timing-function value (named keyword such as `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`, or `cubic-bezier(...)` declaration) extracted from `transition-timing-function`, `animation-timing-function`, or `transition` and `animation` shorthand declarations in Source_Document.
5. THE Design_Tokens `durations` record SHALL store integer millisecond values for `0.35s`, `0.6s`, `0.9s`, `1.25s`, and every other distinct duration value extracted from `transition-duration`, `animation-duration`, or `transition` and `animation` shorthand declarations in Source_Document.
6. THE Clone_Page Component_Modules SHALL achieve Token_Coverage equal to 100 percent, defined as the ratio (number of literal numeric, color, easing, duration, radius, and shadow values that are read from a Design_Tokens export) divided by (total number of such literal values appearing in any Component_Module under `src/components/kore/`), with the only exclusions from the denominator being values native to a primitive's contract such as ARIA role strings, semantic HTML attribute values (e.g., `tabindex="0"`), and Source_Document data-attribute selectors.
7. THE Design_Tokens module SHALL expose a Tailwind v4 `@theme`-compatible token export at `src/components/kore/tokens.css` such that every leaf entry in the TypeScript records declared in criterion 1 has a corresponding `@theme` CSS custom property whose value is equal to the TypeScript leaf value, with one-to-one cardinality (no extra `@theme` properties without a corresponding TypeScript leaf, and no TypeScript leaf without a corresponding `@theme` property).

### Requirement 23: Component Decomposition

**User Story:** As the senior frontend engineer, I want each Page_Section split into named, reusable Component_Modules, so that the codebase is maintainable and testable.

#### Acceptance Criteria

1. THE Clone_Page SHALL decompose into one Component_Module per Page_Section under `src/components/kore/sections/` with one default-exported component per file.
2. THE Clone_Page SHALL decompose every repeatable visual primitive (button, badge, card, marquee, hover image preview, modal, accordion row, tab strip, swiper wrapper) into one Component_Module per primitive under `src/components/kore/primitives/`.
3. Every Component_Module SHALL accept its content via a TypeScript `interface` or `type` alias declared in the same file (or imported from `src/components/kore/data/`), enumerating every text string, image URL, href, and ARIA label sourced from Source_Document as a strictly-typed prop or fixture field.
4. Every Component_Module SHALL co-locate its data fixture under `src/components/kore/data/<section>.ts` (where `<section>` is the kebab-case Page_Section name), exporting typed records that match the content declared in Source_Document.
5. Every Component_Module SHALL be a server-rendered React component by default.
6. IF a Component_Module requires Lenis_Scroller, GSAP_Scroll_Triggers, Swiper_Instance, Rive_Canvas_Block, Hover_Image_Preview, Exit_Modal, Loader_Sequence, or any of the browser-only APIs `window`, `document`, `navigator`, `localStorage`, or `sessionStorage`, THEN that Component_Module SHALL be marked `'use client'` at the top of the file.
7. Every Component_Module SHALL render the same DOM tag sequence, nesting depth, and sibling order as the corresponding fragment of Source_Document, and SHALL preserve every CSS class token from Source_Document that is referenced by any source CSS rule the component depends on for visual fidelity.
8. Every Component_Module SHALL declare its export name in PascalCase.
9. Every Component_Module export name SHALL be prefixed with `Kore` (for example, `KoreHero`, `KoreIndustryTabs`, `KoreHoverImagePreview`).
10. Every Component_Module file name SHALL match its exported component name in kebab-case (for example, `KoreHero` is exported from `kore-hero.tsx`).

### Requirement 24: Asset Strategy

**User Story:** As the senior frontend engineer, I want a clear, typed manifest for every external asset used by the page, so that asset references are auditable and replaceable.

#### Acceptance Criteria

1. THE Asset_Manifest SHALL export one named entry per distinct asset URL referenced by `<img src>`, `<img srcset>`, `<source src>`, `<source srcset>`, `<video src>`, `<video poster>`, `<link rel="stylesheet" href>`, `<link rel="icon" href>`, `<link rel="apple-touch-icon" href>`, `data-rive-src` attribute, or CSS `url(...)` declaration in Source_Document, grouped under a typed object keyed by Page_Section name with the entry key derived from the asset filename in kebab-case.
2. THE Asset_Manifest SHALL designate every CDN_Passthrough_Asset by setting a `kind: "cdn-passthrough"` discriminator field and SHALL retain the original `cdn.prod.website-files.com` URL byte-for-byte equal to Source_Document including scheme, host, path, query, fragment, and percent-encoding.
3. WHERE an asset is classified as a Local_Asset, THE Asset_Manifest SHALL set a `kind: "local"` discriminator field, SHALL store the file under `public/kore/<section>/<asset-name>.<ext>` where `<section>` is the kebab-case Page_Section name, `<asset-name>` is the asset filename in kebab-case, and `<ext>` is the file extension preserved from Source_Document, and SHALL export the URL `/kore/<section>/<asset-name>.<ext>`.
4. THE Asset_Manifest SHALL declare each Rive `.riv` file as a CDN_Passthrough_Asset by default with an additional `fallback` field referencing a Local_Asset path under `public/kore/rive/`, AND IF the CDN_Passthrough_Asset URL returns an HTTP error response or fails to deliver the first byte within 10 seconds, THEN THE Clone_Page SHALL load the Local_Asset declared in `fallback`.
5. THE Asset_Manifest SHALL declare each video file referenced by `<video src>` or nested `<source src>` in Source_Document as a CDN_Passthrough_Asset.
6. THE Clone_Page SHALL declare `<link rel="preconnect">` tags in `<head>` for `https://cdn.prod.website-files.com`, `https://fonts.googleapis.com`, and `https://fonts.gstatic.com` matching the in-scope `<link rel="preconnect">` declarations in Source_Document, preserving the `crossorigin` attribute exactly as declared in Source_Document, and SHALL deduplicate any preconnect targets that appear more than once.
7. THE Clone_Page SHALL render every image with `width`, `height`, `loading`, and `decoding` attribute values exactly equal to those declared in Source_Document for the same image; WHERE Source_Document omits any of these attributes, THE Clone_Page SHALL also omit them on the corresponding rendered image.
8. WHERE Source_Document declares `loading="lazy"` on an image, THE Clone_Page SHALL render that image using `next/image` with `loading="lazy"`.
9. WHERE Source_Document does not declare `loading="lazy"` on an image, THE Clone_Page SHALL render that image with the loading behavior declared in Source_Document and SHALL NOT use `next/image`.

### Requirement 25: Accessibility Hardening

**User Story:** As a visitor relying on assistive technology, I want the cloned page to expose the same semantic structure with stronger accessibility annotations, so that the page is operable without sight or pointer.

#### Acceptance Criteria

1. THE Clone_Page SHALL render exactly one `<main>` landmark wrapping every Page_Section between Navigation and Footer.
2. THE Clone_Page SHALL render exactly one `<nav>` landmark for Navigation and exactly one `<footer>` landmark for Footer.
3. THE Clone_Page SHALL render heading levels in a strictly descending hierarchy with exactly one `<h1>` element placed inside Hero, `<h2>` for every other Page_Section heading, `<h3>` for every section sub-heading, with no skipped levels (no `<h3>` may appear without an ancestor `<h2>` in document order).
4. THE Clone_Page SHALL annotate every interactive icon-only control (any `<button>`, `<a>`, or element with `role="button"` whose accessible name is not derivable from visible text content) with an `aria-label` describing its action, including the Top_Strip close button, the Navigation hamburger toggle, the language toggle, the modal close affordances, and the back-to-top control.
5. THE Clone_Page SHALL annotate every Mega_Menu and Mobile_Drawer top-level disclosure trigger with `aria-expanded` set to `"true"` while open and `"false"` while closed, and `aria-controls` referencing the id of the disclosure body it controls.
6. THE Clone_Page SHALL annotate every modal (the enterprise tech stack modal, the three video modals, and Exit_Modal) with `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` referencing the id of the modal's heading element.
7. WHEN a modal opens, THE Clone_Page SHALL move keyboard focus to the modal's first focusable descendant within 1 animation frame; WHILE the modal is open, THE Clone_Page SHALL trap keyboard focus within the modal; WHEN the Escape key is pressed, THE Clone_Page SHALL close the modal; WHEN the modal closes, THE Clone_Page SHALL return keyboard focus to the trigger element that opened it within 1 animation frame.
8. THE Clone_Page SHALL preserve a visible keyboard focus ring on every focusable element with a minimum 2 CSS pixel `outline` or `box-shadow` width and a minimum 3:1 contrast ratio against the focused element's surrounding background.
9. THE Clone_Page SHALL declare `lang="en"` on the document element matching Source_Document.
10. THE Clone_Page SHALL annotate every Tab strip (Industry_Tabs, Outcomes_Tabs, Artemis_Sub_Tabs, Analyst_Recognition tabs) such that the strip element has `role="tablist"`, every tab has `role="tab"` with `aria-selected` set to `"true"` for the active tab and `"false"` for every inactive tab and `aria-controls` referencing its pane's id, and every pane has `role="tabpanel"` with `aria-labelledby` referencing its tab's id.
11. THE Clone_Page SHALL preserve every visible heading, paragraph, and link label text string from Source_Document as readable text content of the corresponding HTML element and SHALL NOT replace any heading, paragraph, or link label with a decorative image or with text rendered inside an `<img alt>` attribute.

### Requirement 26: Browser and Device Support Matrix

**User Story:** As the senior frontend engineer, I want a stated support matrix, so that fidelity testing has a finite scope.

#### Acceptance Criteria

1. THE Clone_Page SHALL render at the Desktop 1440 x 900 Reference_Viewport on the latest stable release and the previous stable release of Chrome, Edge, Firefox, and Safari, after Loader_Sequence completes per Requirement 17, such that visual fidelity matches Source_Document within Pixel_Tolerance and zero unhandled errors are emitted to the browser console for 30 seconds of idle time after first paint.
2. THE Clone_Page SHALL render at the Mobile 390 x 844 Reference_Viewport on iOS Safari version 17.0 and later running on iPhone 12 and later devices, after Loader_Sequence completes, such that visual fidelity matches Source_Document within Pixel_Tolerance and zero unhandled errors are emitted to the browser console for 30 seconds of idle time after first paint.
3. THE Clone_Page SHALL render on Android Chrome version 120 and later running on devices with viewport width greater than or equal to 360 CSS pixels and less than or equal to 480 CSS pixels, after Loader_Sequence completes, such that visual fidelity matches Source_Document within Pixel_Tolerance at the Mobile 390 x 844 Reference_Viewport and zero unhandled errors are emitted to the browser console for 30 seconds of idle time after first paint.
4. WHILE the browser has JavaScript disabled, THE Clone_Page SHALL emit static HTML for every Page_Section that does not require browser APIs (per Requirement 1 acceptance criterion 7) such that every visible heading, paragraph, and link text string from Source_Document is present in the rendered DOM, every link `href` matches the value declared in Source_Document, and no Page_Section root element collapses to zero height or zero width.
5. IF a `@rive-app/canvas` Rive instance throws on instantiation OR fails to load its `.riv` file within 10 seconds OR fails to paint a first frame within 10 seconds, THEN THE Hero and Business_Outcomes Rive_Canvas_Blocks SHALL fall back to the static `<img>` poster declared in Asset_Manifest for that Rive file.
6. IF the Lenis_Scroller initialization throws OR Reduced_Motion is true OR `requestAnimationFrame` is undefined on the window, THEN THE Clone_Page SHALL fall back to native browser scrolling without initializing Lenis_Scroller.
7. IF the visiting user agent is outside the matrix declared in criteria 1, 2, and 3, THEN THE Clone_Page SHALL still render every Page_Section without throwing uncaught exceptions and SHALL document the out-of-matrix user agent in the project release notes for triage rather than as a release blocker.

### Requirement 27: Performance Budget

**User Story:** As the senior frontend engineer, I want a stated performance budget, so that fidelity does not come at the cost of runtime experience.

#### Acceptance Criteria

1. WHEN measured against a `next start` production build at the Clone_Route using the Lighthouse Mobile preset with default Lighthouse mobile throttling, THE Clone_Page SHALL achieve a Performance score greater than or equal to 75 measured as the median of three consecutive runs in an idle browser process.
2. WHEN measured per the protocol declared in criterion 1, THE Clone_Page SHALL achieve a Largest Contentful Paint less than or equal to 3.0 seconds.
3. WHEN measured per the protocol declared in criterion 1, THE Clone_Page SHALL achieve a Cumulative Layout Shift less than or equal to 0.10.
4. WHEN measured per the protocol declared in criterion 1, THE Clone_Page SHALL achieve a Total Blocking Time less than or equal to 300 milliseconds.
5. THE Clone_Page SHALL ship a First Load JS bundle for the `/kore-ai-component` route summary row of `next build` output less than or equal to 350 kilobytes uncompressed.
6. THE Clone_Page SHALL exclude every Rive_Canvas_Block runtime and `.riv` asset from the route's First Load JS bundle declared in criterion 5, and SHALL fetch each Rive runtime and asset only when the parent Component_Module's host element enters the viewport with a 200 CSS pixel pre-fetch margin.
7. THE Clone_Page SHALL declare `<link rel="preload" as="image">` resource hints in `<head>` for the Hero background video poster image declared in Source_Document such that the preload hint is emitted before the first paint of the Hero section.
8. THE Clone_Page SHALL exclude every Swiper_Instance whose host element first appears at a vertical document offset greater than 844 CSS pixels (the Mobile Reference_Viewport height) below scroll position 0 from the route's First Load JS bundle, and SHALL fetch each such Swiper_Instance only when its host element enters the viewport with a 200 CSS pixel pre-fetch margin.
9. THE Clone_Page SHALL exclude the Modals_Layer code split chunk from the route's First Load JS bundle declared in criterion 5, and SHALL fetch the Modals_Layer chunk only when the first modal trigger is activated.

### Requirement 28: Out of Scope

**User Story:** As the senior frontend engineer, I want the out-of-scope items stated explicitly, so that effort is not spent porting tracking, personalization, or backend integrations.

#### Acceptance Criteria

1. THE Clone_Page SHALL NOT include any `<script>` tag, ES module import, dynamic `import()`, or `document.createElement("script")` injection that loads, evaluates, or re-implements any Out_Of_Scope_Scripts.
2. THE Clone_Page SHALL NOT issue any HTTP request, WebSocket connection, EventSource subscription, or `navigator.sendBeacon` call to any Out_Of_Scope_Backends host during the 60 seconds of idle time following Loader_Sequence completion at the Desktop 1440 x 900 Reference_Viewport.
3. THE Clone_Page SHALL NOT render any `<form>` element whose `action` attribute resolves to any HubSpot, marketing automation, CRM, or analytics endpoint, and SHALL NOT submit any form via `fetch`, `XMLHttpRequest`, or programmatic form submission to any such endpoint.
4. THE Clone_Page SHALL NOT include any `<script>` tag whose `src` attribute matches the patterns `webflow.schunk.*.js`, `webflow.config.js`, or `webflow-internal-*`.
5. THE Clone_Page SHALL NOT render any DOM element carrying any `data-wf-*` runtime attribute (`data-wf-page`, `data-wf-site`, `data-wf-domain`, `data-wf-intellimize-customer-id`, `data-wf-view-events`, `data-wf-cms-context`, `data-wf-component-context`).
6. THE Clone_Page SHALL NOT install or invoke the Microsoft Clarity, Google Tag Manager, Google Analytics, Google Ads, LinkedIn Insight, Clickagy, The Trade Desk, G2 attribution, or Intellimize personalization SDKs, and SHALL NOT define any of the global window identifiers `clarity`, `dataLayer`, `gtag`, `fbq`, `_linkedin_partner_id`, `lintrk`, or `intellimize`.
7. THE Clone_Page SHALL NOT render any `<script type="application/ld+json">` block, including the embedded JSON-LD structured data block declared in Source_Document.
8. THE Clone_Page SHALL NOT render the HubSpot cookie banner element with id `hs-eu-cookie-confirmation` or any of its descendants, and SHALL NOT render any other cookie consent solicitation UI bundled with the Out_Of_Scope_Scripts.
9. WHILE the Clone_Page is loaded at the Clone_Route, the network panel of the browser SHALL show zero requests to the hosts `js.hs-analytics.net`, `js.hs-banner.com`, `js.hubspot.com`, `js.hsadspixel.net`, `js.hs-scripts.com`, `www.googletagmanager.com`, `www.google-analytics.com`, `googleads.g.doubleclick.net`, `www.googleadservices.com`, `snap.licdn.com`, `tags.clickagy.com`, `aorta.clickagy.com`, `js.adsrvr.org`, `insight.adsrvr.org`, `tracking-api.g2.com`, `cdn.intellimize.co`, `api.intellimize.co`, `log.intellimize.co`, `117417219.intellimizeio.com`, `scripts.clarity.ms`, or `www.clarity.ms`.

### Requirement 29: Production Code Quality

**User Story:** As the senior frontend engineer, I want production-ready code with no placeholders, so that the clone can ship without remediation.

#### Acceptance Criteria

1. THE Clone_Page Component_Modules SHALL NOT contain the case-insensitive markers `TODO`, `FIXME`, `XXX`, `placeholder`, `lorem ipsum`, or `mock` as comment text or as identifier names in any source file under `src/components/kore/`, `src/app/kore-ai-component/`, or `public/kore/`, with the only exception being literal string values copied verbatim from Source_Document.
2. WHEN `pnpm exec eslint src/components/kore src/app/kore-ai-component --max-warnings=0` is run, THE Clone_Page SHALL exit with code 0 and zero errors and zero warnings.
3. WHEN `pnpm exec tsc --noEmit` is run from the workspace root, THE Clone_Page SHALL exit with code 0 and zero errors.
4. THE Clone_Page Component_Modules SHALL declare strict TypeScript types for every prop, every fixture record exported from `src/components/kore/data/`, every Asset_Manifest entry, and every Design_Tokens export, and SHALL NOT use `any`, `@ts-ignore`, `@ts-expect-error`, `@ts-nocheck`, or non-null assertion operator (`!`) on values whose type is not provably non-null at the use site.
5. WHEN `pnpm next build` is run from the workspace root, THE Clone_Page SHALL exit with code 0 and SHALL emit zero warnings whose message references any file under `src/components/kore/`, `src/app/kore-ai-component/`, or `public/kore/`.
6. THE Clone_Page Component_Modules SHALL render identical DOM and computed style on the server and on the client first paint such that running the Clone_Route under React Strict Mode in development emits zero `Hydration failed` or `did not match` warnings to the browser console between the start of hydration and the first idle frame after first paint.
7. IF a capability required by any Component_Module cannot be implemented using the dependencies already declared in `d:\Softree_Projects\SOFTREE_MAIN\Softree_\package.json` plus `@rive-app/canvas`, THEN that capability SHALL be implemented in workspace source code under `src/components/kore/` rather than by introducing a new top-level npm dependency.
8. THE Clone_Page SHALL NOT introduce a new top-level npm dependency in `package.json` `dependencies`, `devDependencies`, `peerDependencies`, or `optionalDependencies` other than `@rive-app/canvas` pinned to an exact version.
