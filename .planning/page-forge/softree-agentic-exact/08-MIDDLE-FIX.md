# Middle Component Correction Loop

## Scope

- Fixed the middle sections called out by the user:
  - `#ai-programmable`
  - `#pillars`
  - `#build-scale-optimize`
- Restored the source HTML grouping by wrapping Agents, AI Programmable, and Pillars in `div.k2-theme-light`.
- Added a page-scoped reveal initializer for middle-section `[data-scroll]` and `[data-stagger]` elements so they do not depend on removed Webflow runtime state.
- Fixed orbit button/scroll activation by adding a small threshold bias so steps 1, 2, and 3 activate reliably.

## Runtime Verification

- Required text is exposed in the browser snapshot:
  - `Invented for the agentic era`
  - `{ Pillars }`
  - `Agent Blueprint Language (ABL™)`
  - `ABL is a typed, schema-driven language`
  - `™ARCH`
  - `Build. Scale. Optimize.`
- Orbit buttons now activate:
  - Click 1 -> `data-step="1"`
  - Click 2 -> `data-step="2"`
  - Click 3 -> `data-step="3"`
- Pillars modal:
  - `data-modal-open="arch"` opens the modal.
  - Active panel becomes `arch`.
- Build/Scale/Optimize:
  - Outer tab clicks switch to `Scale`, `Optimize`, `Foundation`, and back to `Build`.
  - Active panel text changes with the active tab.
- Console:
  - No browser warnings or errors after the checks.

## Verification Artifacts

- `.planning/page-forge/softree-agentic-exact/middle-pillars-fixed.png`
- `.planning/page-forge/softree-agentic-exact/middle-build-optimize-fixed.png`

## Lint

- `npx eslint "src/components/softree-agentic-exact/SoftreeAgenticProgrammableSection.tsx" "src/components/softree-agentic-exact/SoftreeAgenticPage.tsx" "src/components/softree-agentic-exact/sections.tsx"` passed.
