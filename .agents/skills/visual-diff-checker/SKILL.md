---
name: visual-diff-checker
description: Pixel-diff agent for reference page loops. Opens localhost vs live reference in two tabs, extracts DOM/CSS, captures screenshots, and reports P0/P1 visual flaws.
---

# Visual Diff Checker

Use when a page loop targets **pixel-perfect parity** with a live reference (e.g. Kore.ai `/ai-agent-platform`).

## When to run

- After loader + hero changes
- Before REVIEW agent approves EXACT_REFERENCE_MODE pages
- When user reports "doesn't look the same"

## Inputs

| Input | Example |
| --- | --- |
| `local_url` | `http://localhost:3000/kore-ai-component` |
| `reference_url` | `https://www.kore.ai/ai-agent-platform` |
| `scope` | `loader`, `hero`, `section:<id>`, `full-page` |
| `viewports` | `1536x960`, `390x844` |

## Workflow

1. **Reset session state** on local tab: clear `k2LoaderPlayedAt`, `sessionStorage` keys for intro skip.
2. **Open two tabs** via Chrome DevTools MCP (`new_page` / `navigate_page`).
3. **Match viewport** with `resize_page` (same DPR; note device scale).
4. **Wait for stable state**:
   - Loader scope: capture step-0, step-2, post-flip (≥6s after load)
   - Hero scope: wait for `kore-ai-intro-complete` or reference loader removal
5. **Extract reference DOM** for scoped selectors:
   - `#meet-artemis`, `.k2-loader`, `[data-flip-target="loader"]`
   - Computed styles: font-size, line-height, letter-spacing, color, padding, gap
6. **Screenshot both** with `take_screenshot` → `.planning/page-forge/<slug>/diff-<scope>-<viewport>-{local\|ref}.png`
7. **Compare** and emit `11-VISUAL-DIFF-<scope>.md`:

```markdown
# Visual diff — <scope> (loop N)

## Screenshots
- Local: diff-hero-1536-local.png
- Reference: diff-hero-1536-ref.png

## P0 (blocks ship)
| # | Area | Reference | Local | Fix file |
| 1 | Hero H1 size | 4.5rem / -0.04em | 3.75rem | KoreHeroSection.tsx |

## P1
...

## Motion / transition gaps
- Loader step-2 sup width animation missing --w
- Char stagger uses wrong --i on flip target

## DOM structure deltas
- Missing `<sup>` char split on loader flip source

## Verdict
FAIL — N P0, M P1
```

## Comparison checklist (loader + hero)

- [ ] `.k2-loader` grid/dot background visible
- [ ] Loader steps 0→3 timing (~500ms overlap on step 0)
- [ ] Progress bar `--p` at 0 / .33 / .66 / 1
- [ ] FLIP from `[data-flip="loader"]` → `[data-flip-target="loader"]` (~1.5s ease)
- [ ] Hero pill: "Kore.ai Agent Platform" char fade
- [ ] H1 + italic sub copy exact
- [ ] Body paragraph + "Get Demo" CTA
- [ ] Rive Build tab canvas visible
- [ ] Tab labels `{ Build }` `{ Scale }` `{ Optimize }`

## Tools

- Chrome DevTools MCP: `navigate_page`, `resize_page`, `take_screenshot`, `evaluate_script`
- Optional: `pixelmatch` CLI if installed; otherwise human-readable flaw list from computed styles

## Output location

`.planning/page-forge/<slug>/11-VISUAL-DIFF-*.md` and PNG pairs alongside.

## Loop integration

Runs **parallel with** design checker after BUILD, before REVIEW. Review agent must not APPROVE if visual-diff P0 list is non-empty in EXACT_REFERENCE_MODE.
