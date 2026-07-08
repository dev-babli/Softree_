# Report templates

Copy these skeletons into `.planning/page-forge/<slug>/`.

---

## 00-BRIEF.md

```markdown
---
route: /services/example
slug: example
page_kind: service
audience: enterprise buyers
must_preserve:
  - nav
  - footer
  - LightContactSection
  - LightFAQExact
content_source: existing | softreetechnology.com | provided
references: []
max_loops: 4
threshold: 8.5
---

# Brief

## Goal
…

## Out of scope
…
```

---

## 01-DIRECTION.md

```markdown
---
direction_id: D1
name: Editorial Enterprise Scrollytelling
dials: { variance: 7, motion: 6, density: 4 }
---

# Direction

## Why Softree
- …

## Rejected
- D3: …

## References
- …
```

---

## 02-STORY.md

```markdown
# Story

## Signature visual idea
- name:
- derived_from_signature_argument:

| Beat | Section id | Job | Scroll |
| --- | --- | --- | --- |
| Hook | hero | … | reveal |
| Mechanism | pin-tabs | … | pin-scrub |

## Scroll scene count
- total:
- over_five: yes | no

## CONTENT_GAP
- …
```

---

## 03-DESIGN-INTENT.md

```markdown
# Design Intent

## Signature Argument
One sentence using mechanism + material + restraint.

## Kill List Audit
| Family | Hits | Pass/Fail | Justification |
| --- | --- | --- | --- |
| Generic AI-tool tells | 0 | pass | … |
| Generic AI-industry tells | 0 | pass | … |
| Generic B2B SaaS tells | 0 | pass | … |

## Token System
### Color
| Hex | Exclusive job |
| --- | --- |
| #000000 | … |

### Type
| Role | Typeface | Scale |
| --- | --- | --- |
| Hero | … | clamp(…) |

### Layout Wireframes
ASCII:
    section-name
    [signature element] [copy]

## Motion Spec
- one_pin_plan:
- easing:
- durations:
- reduced_motion_frozen_state:

## Copy Swap Test
| Headline | Pass/Fail | Rewrite if failed |
| --- | --- | --- |

## Final Test Answers
1. Screenshot recognition:
2. Softree mechanism:
3. Bold moves count:
4. Scroll scenes count:
5. Hero swap test:
```

---

## 03-COMPONENT-MAP.md

```markdown
| # | Section | Pattern ID | Motion | Notes |
| --- | --- | --- | --- | --- |
| 1 | hero | H-LIGHT-EDITORIAL | gsap | … |
```

---

## 04-BUILD.md

```markdown
# Build

## Files
- created: …
- modified: …

## Deviations from map
- …
```

---

## 05a-DESIGN.md

```markdown
---
agent: design-checker
scores:
  visual_design: 0
  storytelling: 0
  motion: 0
---

# Design check

## Evidence
…

## Design Intent Fidelity
- signature_argument:
- signature_visual_idea:
- preserved_in_build: yes | no
- token_system_used_faithfully: yes | no
- one_bold_move_only: yes | no
- scroll_scene_count:
- headline_swap_test_pass: yes | no

## Kill List Audit
| Family | Hits | Evidence |
| --- | --- | --- |
| Generic AI-tool tells | 0 | … |
| Generic AI-industry tells | 0 | … |
| Generic B2B SaaS tells | 0 | … |

## Five Final Tests
1. Screenshot recognition: pass | fail
2. Softree mechanism: pass | fail
3. One bold move: pass | fail
4. Five scroll scenes max: pass | fail
5. Hero swap test: pass | fail

## P0
- [ ] `path:line` — …

## P1
- [ ] …

## P2
- [ ] …
```

---

## 05b-RESPONSIVE.md

```markdown
---
agent: responsive-checker
scores:
  layout_responsive: 0
---

# Responsive check

## Viewports
| Section | 390 | 768 | 1024 | 1440 |
| --- | --- | --- | --- | --- |
| hero | ok / fail | … | … | … |

## P0 / P1 / P2
…
```

---

## 05c-PERFORMANCE.md

```markdown
---
agent: performance-checker
scores:
  performance: 0
---

# Performance check

## Budgets
- pins: 0/1
- blur-on-scroll: none
- gsap cleanup: yes/no
- lcp: safe/unsafe

## P0 / P1 / P2
…
```

---

## 06-REVIEW.md

```markdown
---
verdict: REJECTED
loop: 1
overall: 8.1
dimensions:
  visual_design: 8.4
  storytelling: 8.2
  motion: 8.3
  layout_responsive: 7.8
  performance: 8.0
  content_honesty: 9.0
---

# Review

## Blockers (P0)
1. …

## Fix plan
1. Responsive fixer: …
2. …
```

---

## 08-VERIFICATION.md

```markdown
---
phase: page-forge-<slug>
status: passed
verdict: APPROVED
overall_score: 8.6
threshold: 8.5
loop: 2
---

# Verification

| Dimension | Score |
| --- | --- |
| visual_design | … |
| storytelling | … |
| motion | … |
| layout_responsive | … |
| performance | … |
| content_honesty | … |
| **overall** | **…** |

## Remaining P2
- …
```

---

## 08-ESCALATION.md

```markdown
---
verdict: ESCALATED
loop: 4
overall: 8.2
---

# Escalation

Could not reach 8.5 within max_loops.

## Remaining P0/P1
…

## Needs human decision
…
```
