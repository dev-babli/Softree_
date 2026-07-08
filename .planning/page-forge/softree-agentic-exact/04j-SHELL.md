# Header / Nav / Footer / Modal Loop Pass

## Build
- Preserved the exact reference header, side scroll nav, footer, and modal DOM.
- Added page-level modal open/close handling for all `data-modal-open` triggers.
- Added page-level side-nav active marker handling tied to viewport intersection.
- Restored `w--current` and `aria-current="page"` on the header/footer `/ai-agent-platform` links after external scripts settle.

## Verification
- Route check: `/agentic-ai-platform` returned `200`.
- Lint check: no diagnostics for the edited files.
- Header check: `/ai-agent-platform` link has `w--current` after scripts settle.
- Footer check: footer logo alt and 39 footer links render; `/ai-agent-platform` footer link has `w--current`.
- Modal check: ABL/ARCH modal triggers open `.k2-modal` and reveal the matching panel.
- Scroll nav check: side nav renders one marker per id-backed section and updates `w--current` based on viewport state.
- Overflow check: no horizontal overflow detected.
- Screenshot: `shell-footer-pass.png`.
