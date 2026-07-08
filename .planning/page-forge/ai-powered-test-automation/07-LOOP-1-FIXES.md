# Loop 1 Fixes

## Design

- Removed the duplicated hero testimonial carousel so social proof appears once, later in the Why section.
- Removed unsourced 5-star visuals from testimonial quote cards.
- Replaced hero CTA secondary link with a local `#pipeline` anchor to strengthen the problem → mechanism story.
- Added an in-hero release signal map (`Risk map`, `Automation suite`, `CI quality gate`) to make the page feel more authored and less card-template driven.

## Responsive

- Added `min-h-11` to the page-local `LetsTalkButton` usage in the hero.
- Kept `LightContactSection` and `LightFAQExact` unchanged because they are sacred components in the loop constraints.

## Performance

- Removed continuous RAF-driven progress width animation by removing the duplicated hero testimonial carousel.
- Added reduced-motion-safe Framer keyword transitions in the hero.
- Removed `priority` from the loader logo so the hero image remains the primary priority image.

## Verification

- IDE lints: no errors in `src/components/test-automation`
- Route: `/services/ai-powered-test-automation` returns 200
