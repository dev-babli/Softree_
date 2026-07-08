# Loop error correction — `.k2-theme-light` middle sections (05–07)

## Components

| # | Section | ID | Wrapper |
|---|---------|-----|---------|
| 05 | AI Agents | `#ai-agents` | `.k2-theme-light` |
| 06 | AI Programmable | `#ai-programmable` | `.k2-theme-light` |
| 07 | Pillars | `#pillars` | `.k2-theme-light` |

## Symptoms

- AI Agents: tab panels empty, background image missing, headline/body/CTA hidden or flashing
- AI Programmable: orbit sticky area blank, step buttons missing, scroll steps inert
- Pillars: header and pillar rows invisible until manual scroll; Softree copy instead of Kore

## Root causes

1. **Scroll-reveal CSS** — Reference rules hide `[data-scroll]:not(.on) .char`, `[data-stagger] > *`, and `.k2-tabs-panel-agents:not(.on)` children until `.on` is applied. IntersectionObserver did not always fire before paint.
2. **Agents panel stacking** — `.k2-bg` inside tab panels needed `isolation: isolate` + `z-index: 0` with content at `z-index: 1` (same class of bug as hero bg).
3. **Softree HTML patches** — `patchMiddleSectionHtml()` rewrote programmable/pillars copy away from Kore reference.
4. **Orbit buttons** — Shared CSS sets `.k2-orbit-buttons { display: none }` on mobile; desktop needs explicit `display: flex` after reveal.

## Fix (shipped)

| File | Change |
| --- | --- |
| `softree-light-theme-fix.css` | Light-theme visibility, agents bg stacking, orbit buttons, scroll-reveal overrides |
| `lightThemeReveal.ts` | `revealLightThemeSections()` — adds `.on`, clears inline opacity/visibility on scroll/stagger nodes |
| `SoftreeAgenticPage.tsx` | Calls `revealLightThemeSections()` in scroll-reveal `bindReveal` |
| `SoftreeAgenticAgentsSection.tsx` | `.on` on `.k2-agents-panel` / `.k2-agents-content`; reveal on tab change |
| `SoftreeAgenticProgrammableSection.tsx` | Raw Kore HTML; reveal on mount |
| `SoftreeAgenticPillarsSection.tsx` | Raw Kore HTML; reveal on mount |
| `softreeAgenticHtmlCopy.ts` | `patchMiddleSectionHtml` → identity (Kore copy restored) |

## Quick verify (no full loop)

```bash
node scripts/light-theme-audit.mjs
```

Expect all probes `opacity: 1`, `vis: visible`, non-zero width/height.

## Regression rules

- Never patch middle-section HTML to Softree copy in the Kore exact clone route.
- Any new `[data-scroll]` / `[data-stagger]` node in `.k2-theme-light` must receive `.on` via `revealLightThemeSections()` or IntersectionObserver.
- Agents tab panels must keep `.k2-tabs-panel-agents.on` on the active panel only.
