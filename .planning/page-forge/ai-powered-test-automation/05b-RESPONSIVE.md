---
agent: responsive-checker
scores:
  layout_responsive: 8.4
---

# Responsive Check

Scope: `/services/ai-powered-test-automation`  
Files read: all files under `src/components/test-automation/`, plus shared header/contact/FAQ/CTA dependencies used by the page handoff.

## Summary

The page is structurally responsive and should not produce meaningful horizontal overflow at 390, 768, 1024, or 1440. The implementation uses mobile-first single-column layouts, promotes to grids at `sm`/`md`/`lg`, includes `min-w-0` in the major constrained card/grid cells, and limits sticky behavior to `lg` for the pipeline chapter.

The score is held below the 8.5 gate by touch target inconsistencies in shared CTAs and a few narrow-width polish risks around fixed-width pills/links. No P0 blocker found.

## Viewport Table

| Section | 390 | 768 | 1024 | 1440 |
| --- | --- | --- | --- | --- |
| Hero | Stacks cleanly with `px-4`; h1 may wrap into extra lines but does not require horizontal scroll. Hero media has `min-h-[280px]`; testimonial controls are 44px. Main `LetsTalkButton` appears under 44px tall. | Stats promote to 3 columns; hero media at `min-h-[420px]`; testimonial card remains comfortable. | Max-width stage and stats stay contained; no sticky/pin behavior. | Good placement inside `max-w-[1440px]`; image and copy scale well. |
| Services | Single-column tabs over detail card; service buttons have `min-h-11`; `min-w-0` on tab label/detail card prevents title pressure. | Still single-column, readable, enough rhythm. | `lg:grid-cols-12` split gives tab rail/detail panel adequate width; no overflow expected. | Balanced 5/7 split; chips wrap safely. |
| Pipeline | Single-column; timeline line hidden until `sm`; step number target is 44px. Sticky is disabled. | Single-column; timeline line appears with enough gutter. Sticky still disabled. | Two-column layout begins; left copy uses `lg:sticky lg:top-32`, right list has `min-w-0`; heading wraps safely. | Sticky chapter has enough breathing room; scroll rhythm is stable. |
| Support | Single-column cards with `min-w-0`; text wraps safely. | `sm:grid-cols-2`; card widths remain comfortable. | `lg:grid-cols-3`; titles like "Enterprise Web Applications" wrap without pressure. | Three-column grid has generous spacing. |
| Engagement | Single-column ordered rows; features wrap safely. | `md:grid-cols-[120px_minmax(0,1fr)_minmax(0,0.85fr)]`; tight but protected by `min-w-0`. | Three-column row layout has comfortable columns. | Dense table-like rhythm works well. |
| Tech | Single-column rows; chips wrap. | Two-column rows at `md`; label/subtitle and chip list have `min-w-0`. | Rows remain contained; long tools such as "Azure DevOps" fit. | Clean spec-sheet feel with safe wrapping. |
| Why | Single-column cards and quotes; no overflow expected. | Both grids promote to 3 columns; testimonial copy creates height variation but not layout breakage. | Three-column cards are comfortable. | Strong spacing and placement. |
| Contact / FAQ handoff | Handoff from cream `Why` to dark contact is clean. Contact grid is single-column; email/office blocks use `min-w-0`. One custom Calendly button is 40px tall. FAQ is vertical stack; FAQ cards are large touch areas, but "More About Us" link is likely under 44px. | Contact remains single-column until `lg`; FAQ vertical stack remains safe. | Contact becomes 3-column; FAQ switches to horizontal accordion. Seven FAQ slots fit, but active answer width is tight and should be manually checked with final FAQ copy. | Contact and FAQ have enough width; horizontal accordion is stable. |

## Checks

- Horizontal overflow: no blocker found. Root uses `overflow-x-clip`, and child layouts are mostly contained with wrapping grids, `overflow-hidden` marquees/stages, and `min-w-0`.
- `min-w-0`: present in the highest-risk areas: service detail, pipeline list, engagement copy/features, tech rows, why cards, contact content cells, and testimonial identity.
- Touch targets: service tabs, testimonial arrows, pipeline numbers, social icons, contact inputs, and primary submit are 44px or larger. Shared hero CTA and custom contact Calendly CTA need correction.
- Sticky degradation: pipeline sticky is `lg:` only, so mobile and tablet degrade to normal document flow.
- Padding rhythm: consistent `px-4 sm:px-6 lg:px-12` and `py-16 md:py-24 lg:py-28` across custom sections. Contact/FAQ use their own sacred spacing but hand off cleanly.
- Text wrap: generally safe. Current section badges fit at 390, but badge `w-max` and CTA/link copy remain future-sensitive.

## P0

None.

## P1

1. Shared hero CTA touch target is below the 44px target.
   - Evidence: `src/components/qc/shared/LetsTalkButton.tsx` uses `py-1.5` with a 26px icon slot, making the visual/tap height about 38px.
   - Impact: primary mobile CTA in the hero misses the requested touch target standard.
   - Suggested fix: raise the anchor to `min-h-11` and center content without changing the visual language.

2. Custom contact Calendly CTA is 40px tall.
   - Evidence: `src/components/homepage-light/LightContactSection.tsx` passes `className="... h-10 ..."` to `CalendlyPopupButton` for the "Pick a time" button.
   - Impact: mobile contact conversion control misses the 44px target.
   - Suggested fix: use `h-11` or `min-h-11` for the custom Calendly class.

3. FAQ active-card link is likely below the 44px target.
   - Evidence: `src/components/homepage-light/LightFAQExact.tsx` renders "More About Us" with `px-4 py-2 text-sm`, without `min-h-11`.
   - Impact: secondary FAQ action is smaller than the requested mobile touch target.
   - Suggested fix: add `min-h-11` and `items-center` to the link.

## P2

1. Section badge uses `w-max`, which is safe for the current copy but can overflow if future badge text grows.
   - Evidence: `src/components/homepage-light/SectionHeader.tsx` badge class includes `w-max`.
   - Suggested fix: consider `max-w-full flex-wrap` or a page-local override if longer service labels are introduced.

2. Hero headline uses a forced `<br />`, so 390px can produce a more fragmented heading when "Release confidence" wraps before the explicit break.
   - Evidence: `src/components/test-automation/sections/TestAutomationHero.tsx` hard-breaks between headline and accent.
   - Suggested fix: acceptable as-is for current copy; manually screenshot 390 before shipping to confirm the visual rhythm.

3. FAQ horizontal accordion at 1024 is tight with seven items.
   - Evidence: `src/components/homepage-light/LightFAQExact.tsx` switches to `lg:flex-row` with `lg:h-[420px]`.
   - Suggested fix: acceptable with current copy, but verify at exactly 1024 after final FAQ content is locked.

## Verdict

Responsive status: **needs minor correction**. Layout and placement are strong across the requested viewports, with no P0 overflow or sticky-mobile issue found. Fixing the three touch-target P1s should raise `layout_responsive` above the 8.5 gate.
