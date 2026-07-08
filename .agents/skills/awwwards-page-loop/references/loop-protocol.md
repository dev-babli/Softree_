# Loop protocol

## State machine

```
BRIEF → DIRECTION → STORY → MAP → BUILD
                              ↓
                    ┌─── CHECK (parallel) ───┐
                    │ design · responsive · perf │
                    │ visual-diff (exact ref)    │
                    └───────────┬───────────────┘
                                ↓
                             REVIEW
                          ╱         ╲
                    APPROVED       REJECTED
                        ↓              ↓
                   VERIFICATION    CORRECT (loop++)
                                       ↓
                                   CHECK again
```

## Loop counter

- Start `loop = 0` after first build.
- Each full CHECK → REVIEW → CORRECT cycle increments `loop`.
- `max_loops` default **4** (from brief).
- On `loop == max_loops` and still REJECTED → write `08-ESCALATION.md` and stop.

## Pass criteria (all required)

| Check | Rule |
| --- | --- |
| Overall | ≥ 8.5 |
| Each dimension | ≥ 8.0 |
| P0 list | empty |
| Sacred UI | unchanged |
| Pin budget | ≤ 1 heavy ScrollTrigger pin |
| Reduced motion | paths exist |
| Root layout | not hijacked |

## Severity definitions

| Level | Meaning | Action |
| --- | --- | --- |
| **P0** | Blocks ship: broken layout, LCP hide, scroll jank, brand violation, sacred UI change, invented metrics | Must fix this loop |
| **P1** | Visible quality gap: touch targets, spacing, minor motion, copy polish | Fix this loop if time; else next |
| **P2** | Nice-to-have | Optional; list in verification |

## Parallelism rules

| Phase | Parallel? |
| --- | --- |
| Design Intent / Story / Map | Sequential |
| Build | Single builder (or micro-agents by section if isolated files) |
| Checkers | **Always parallel** |
| Fixers | Parallel if different files; else Design → Responsive → Performance |

## Artifact naming

```
.planning/page-forge/<slug>/
  00-BRIEF.md
  01-DIRECTION.md
  02-STORY.md
  03-DESIGN-INTENT.md
  03-COMPONENT-MAP.md
  04-BUILD.md
  05a-DESIGN.md
  05b-RESPONSIVE.md
  05c-PERFORMANCE.md
  06-REVIEW.md
  07-LOOP-1-design.md
  07-LOOP-1-responsive.md
  07-LOOP-1-performance.md
  06-REVIEW-loop-2.md      # optional suffix after re-review
  08-VERIFICATION.md       # on approve
  08-ESCALATION.md         # on max loops fail
```

## Resume behavior

If artifacts exist:

1. Read highest completed phase.
2. Resume from next incomplete phase.
3. If `06-REVIEW.md` is REJECTED and no `07-LOOP-<n>` for current loop, run correction.
4. Never restart Design Intent/Story unless user asks for a new direction or the kill-list/signature gate fails.

## Scoring honesty

- Scores must cite evidence (file, viewport, behavior).
- Raising a score requires a closed P0/P1 that previously depressed it.
- Review agent may **lower** a checker score if evidence is weak, but must not raise without new evidence.

## User interrupts

| User says | Action |
| --- | --- |
| "stop the loop" | Write current state, halt |
| "approve anyway" | Write verification with `verdict: USER_OVERRIDE` |
| "new direction" | Archive current folder as `archive-<timestamp>`, restart Phase 1 |
| "only fix performance" | Run performance checker + fixer only |

## Time / cost discipline

- Prefer one strong direction over trend shopping.
- Cap web research to Phase 1 (Design Intent Extractor).
- Checkers are read-only — no drive-by refactors.
- Fixers touch only listed items.
