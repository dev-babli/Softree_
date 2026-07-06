# Brief: Kore.ai Exact Reference Conversion

route: /kore-ai-component
slug: kore-ai-exact
mode: EXACT_REFERENCE_MODE_REQUESTED
reference: Softree_/aipage.html
rights_note: User provided a local HTML reference and explicitly requested exact reproduction. Third-party tracking/analytics scripts are excluded; visual DOM/assets/interactions are used as fidelity target.

## Goal
Convert the local Webflow HTML reference into the existing Next.js/React stack, one original section per React component, preserving layout, visuals, motion, and interaction as closely as possible.

## Component Rule
Each top-level HTML section becomes one React section component. Header, scroll nav, footer, and dialogs are separate components.
