# Scroll Tabs Loop Pass

## Build
- Added `SoftreeAgenticScrollTabsSection.tsx`.
- Preserved the exact original scroll-tabs content panes, menu links, images, CTA, and embedded section styles.
- Removed the frozen captured `pin-spacer`/width/height state from the rendered section tag.
- Recreated the original ScrollTrigger behavior locally: pinned section, scroll progress to active pane, menu tracking, pane background/card fades, and direct menu-click jump.
- Added a scroll-listener fallback if GSAP/ScrollTrigger is not ready.

## Verification
- Route check: `/agentic-ai-platform` returned `200`.
- Lint check: no diagnostics for the edited files.
- Scroll progress check: active item changed from Build at start, to Deploy mid-scroll, to Optimize near the end.
- Pin check: live ScrollTrigger created a `pin-spacer` and fixed section state at runtime.
- Click jump check: clicking Prove with AI activated the matching link and pane.
- Overflow check: no horizontal overflow detected.
- Screenshot: `scroll-tabs-pass.png`.
