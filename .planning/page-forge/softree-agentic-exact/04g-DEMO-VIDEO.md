# Demo Video Loop Pass

## Build
- Added `SoftreeAgenticDemoVideoSection.tsx`.
- Preserved the exact original video iframe, overlay controls, progress markup, CTA card, and embedded section styles.
- Restored the source booking popup overlay that lived outside the extracted section.
- Added component-owned Vimeo/fallback control logic for play, pause, progress, seek, preview loop state, CTA reveal, booking popup, HubSpot embed injection, and close behavior.

## Verification
- Route check: `/agentic-ai-platform` returned `200`.
- Lint check: no diagnostics for the edited files.
- Play check: play hides the play CTA, shows the pause control, shows progress, and updates current time/progress width.
- Pause check: pause restores the play CTA and hides the pause control.
- CTA check: booking CTA appears after 5 seconds of intentional playback.
- Popup check: BOOK NOW opens the overlay and injects the HubSpot meeting container; close hides it.
- Overflow check: no horizontal overflow detected.
- Screenshot: `demo-video-pass.png`.
