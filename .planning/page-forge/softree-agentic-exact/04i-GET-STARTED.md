# `#get-started` Loop Pass

## Build
- Added `SoftreeAgenticGetStartedSection.tsx`.
- Preserved the exact original prefooter SVG grid/pluses, logomark, heading, CTA, body copy, and embedded hover styles.
- Added a local intersection reveal so `.k2-container-prefooter` receives `on` when visible.

## Verification
- Route check: `/agentic-ai-platform` returned `200`.
- Lint check: no diagnostics for the edited files.
- Reveal check: container gained `on` after entering the viewport and plus opacity resolved to visible.
- Content check: heading, body, CTA text, CTA href, plus count, and cell count match the source.
- Overflow check: no horizontal overflow detected.
- Screenshot: `get-started-pass.png`.
