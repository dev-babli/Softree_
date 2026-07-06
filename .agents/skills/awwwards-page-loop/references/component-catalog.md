# Component catalog (pattern IDs)

Component Mapper picks **one ID per section**. Builder implements that ID only (no hybrid mashups unless map says so).

Motion keys: `css` · `gsap` · `framer` · `none`

---

## Heroes

| ID | Description | Motion | Mobile |
| --- | --- | --- | --- |
| `H-LIGHT-EDITORIAL` | Split type + media stage, orange accent word, testimonial mini-card optional | gsap stagger on ready | Stack media below |
| `H-STAT-LED` | One real KPI dominant, supporting line, CTA | css / count | KPI full width |
| `H-LETTER` | Editorial opening paragraph, minimal chrome | css | Same |
| `H-MANIFESTO` | Large statement, short proof line | css | Reduce type scale |

## Trust

| ID | Description | Motion | Mobile |
| --- | --- | --- | --- |
| `T-LOGO-ROW` | `AboutClientLogos` or quiet grayscale row | none / css | Horizontal scroll optional, not required |
| `T-HAIRLINE-WALL` | Logos separated by hairlines | none | 2-col grid |

## Mechanism / scrollytelling (max one heavy)

| ID | Description | Motion | Mobile |
| --- | --- | --- | --- |
| `M-PIN-TABS` | Kore-style pinned tabs + progress (see `KoreScrollTabs`) | gsap pin+scrub | Unpin; vertical accordion |
| `M-STICKY-STEPS` | Sticky left index, right panels | gsap/css sticky | Stack index on top |
| `M-STEP-SEQUENCE` | Numbered vertical steps, no pin | css reveal | Same |

## Pillars / features

| ID | Description | Motion | Mobile |
| --- | --- | --- | --- |
| `F-ASYM-BENTO` | Unequal grid spans | css | 1-col |
| `F-INDEX-LIST` | Numbered editorial list | css | Same |
| `F-CARD-GRID` | Cards only if content needs equal weight | framer hover | 1-col; min touch |

## Industry / context

| ID | Description | Motion | Mobile |
| --- | --- | --- | --- |
| `I-PILLS-PANEL` | Filter pills + detail panel | framer | Pills wrap; 44px targets |
| `I-SECTOR-INDEX` | Typographic sector list | css | Same |

## Tech stack

| ID | Description | Motion | Mobile |
| --- | --- | --- | --- |
| `S-SPEC-SHEET` | Tabular groups, mono labels | none | Cardize rows |
| `S-CHIP-GROUPS` | Grouped chips by category | none | Wrap |

## Framework / services

| ID | Description | Motion | Mobile |
| --- | --- | --- | --- |
| `V-SERVICE-ROWS` | Alternating row blocks | css | Stack |
| `V-FRAMEWORK-BAND` | Cream band with method diagram | css | Stack |

## Social proof / why

| ID | Description | Motion | Mobile |
| --- | --- | --- | --- |
| `W-REASON-GRID` | Icon+title+body, restrained | css | 1-col |
| `W-QUOTE-LED` | One real quote dominant | css | Same |

## Stats

| ID | Description | Motion | Mobile |
| --- | --- | --- | --- |
| `N-COUNT-STRIP` | 3–4 metrics, count-up on enter | gsap/css | 2×2 grid |
| `N-STAT-HERO-BAND` | Full-width cream stat band | count | Stack |

## Process

| ID | Description | Motion | Mobile |
| --- | --- | --- | --- |
| `P-VERTICAL-STEPS` | 01–0n process | css | Same |
| `P-STICKY-PROCESS` | Sticky label + steps (only if no M-PIN-*) | sticky | Stack |

## Certifications

| ID | Description | Motion | Mobile |
| --- | --- | --- | --- |
| `C-BADGE-ROW` | Real badge images or honest fallbacks | none | Wrap |

## Close (sacred defaults)

| ID | Description | Motion | Mobile |
| --- | --- | --- | --- |
| `X-LIGHT-CONTACT` | `LightContactSection` — do not restyle | existing | existing |
| `X-LIGHT-FAQ` | `LightFAQExact` — do not restyle | existing | existing |

## Page chrome (optional, page-scoped)

| ID | Description | Motion | Mobile |
| --- | --- | --- | --- |
| `L-BRAND-INTRO` | Cream loader, session once, LCP-safe | css | Same |
| `L-NONE` | No intro | — | — |

---

## Reuse map (prefer existing)

| Need | Existing |
| --- | --- |
| Section titles | `SectionHeader` |
| Cards | `SpotlightCard` |
| CTA button | `LetsTalkButton` |
| Logos | `AboutClientLogos` |
| Pin tabs | `KoreScrollTabs` pattern |
| Contact / FAQ | sacred components |
| Motion tokens | `@/lib/motion` |
| Brand logo | `@/lib/brand-assets` |

---

## Example map (D1 default)

| # | Section | Pattern |
| --- | --- | --- |
| 0 | Intro | `L-BRAND-INTRO` (optional) |
| 1 | Hero | `H-LIGHT-EDITORIAL` |
| 2 | Logos | `T-LOGO-ROW` |
| 3 | Pillars | `F-ASYM-BENTO` or `F-INDEX-LIST` |
| 4 | Mechanism | `M-PIN-TABS` |
| 5 | Industry | `I-PILLS-PANEL` |
| 6 | Stack | `S-SPEC-SHEET` |
| 7 | Services | `V-SERVICE-ROWS` |
| 8 | Why | `W-REASON-GRID` |
| 9 | Stats | `N-COUNT-STRIP` |
| 10 | Process | `P-VERTICAL-STEPS` |
| 11 | Certs | `C-BADGE-ROW` |
| 12 | Contact | `X-LIGHT-CONTACT` |
| 13 | FAQ | `X-LIGHT-FAQ` |
