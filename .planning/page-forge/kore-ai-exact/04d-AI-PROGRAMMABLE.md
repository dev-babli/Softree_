# `#ai-programmable` Loop Pass

## Build
- Added `KoreAiProgrammableSection.tsx`.
- Preserved the exact original orbit DOM/SVG/CSS from `aipage.html`.
- Ported the original sticky orbit logic into a component-owned React effect.
- Added active orbit-button state for parity with the visible progress controls.
- Set the section to the light visual theme because the extracted section no longer carries the original parent light wrapper.

## Verification
- Route check: `/kore-ai-component` returned `200`.
- Lint check: no diagnostics for the edited component or section registry.
- Runtime check: step samples activated `data-step="1"`, `data-step="2"`, and `data-step="3"` with matching active button and content text.
- Overflow check: no horizontal overflow detected.
- Screenshot: `ai-programmable-step3-pass.png`.
