# Agents Component Pass

## Source

- `Softree_/aipage.html`
- Lines `2741-2930`
- Section: `#ai-agents.k2-section.k2-section-agents`

## Implemented

- `src/components/kore-ai-exact/KoreAgentsSection.tsx`
- Wired through `KoreAiAgentsSection` in `src/components/kore-ai-exact/sections.tsx`

## Preserved Elements

- Original section id/classes
- Two tab buttons:
  - `{ technical leader }`
  - `{ business leader }`
- Two tab panels with original headings, copy, background images, foreground object images, and CTA
- Original panel image behavior classes:
  - `k2-tabs-panel-agents`
  - `k2-bg`
  - `k2-agents-panel`
  - `k2-agents-content`
- Tab accessibility state: `aria-selected`, `tabIndex`, `inert`

## Verification

- IDE lints on edited agents files: pass
- Fresh route check: `/kore-ai-component` returned `200`
- Chrome runtime check:
  - `#ai-agents` exists
  - Technical tab starts active
  - Business tab activates on click
  - Active panel id switches from `tabs-2-tab-1-panel` to `tabs-2-tab-2-panel`
  - Correct background/object image URLs are present for both states
  - No horizontal overflow
  - No agents-specific console errors
- Existing warning: PostHog key missing, unrelated to this component
- Screenshots:
  - `.planning/page-forge/kore-ai-exact/agents-technical-pass.png`
  - `.planning/page-forge/kore-ai-exact/agents-business-pass.png`

## Next Component

- `#ai-programmable`
