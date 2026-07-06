---
agent: responsive-checker
scores:
  layout_responsive: 8.6
---

# Responsive check

## Viewports

| Section | 390 | 768 | 1024 | 1440 |
| --- | --- | --- | --- | --- |
| hero | ok | ok | ok | ok |
| services | ok (stack) | ok | ok (split) | ok |
| models | ok (stack) | ok | sticky | sticky |
| industry | ok (2-col) | ok (3) | ok (5) | ok |
| framework | ok | ok (2) | ok (4) | ok |
| process | ok | ok (2) | ok (3) | ok |
| why | ok | ok (2/3) | ok | ok |

## Checks

- `min-w-0` on flex/grid text children in hero, services, models, cards
- Touch targets: service buttons `min-h-11`, carousel controls `h-11 w-11`, industry cells `min-h-14`
- Sticky models only `lg:sticky` — no broken pin on mobile
- Page root `overflow-x-clip`
- Padding scales via `GenSection` `py-16 md:py-24 lg:py-28`

## P0

- None

## P1

- None

## P2

- [ ] Industry labels on 390 may wrap to 2 lines in narrow cells (acceptable)
- [ ] Hero cycling word `min-w` may leave slight gap on very narrow screens
