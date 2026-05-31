# Case Study V2 — Cinematic Product Noir

Editorial dark narrative for premium B2B case studies. Replaces the abandoned light “admin template” language (`CASE_STUDY_LIGHT.md`).

---

## Creative Direction

**Cinematic Product Noir** — Linear/Vercel spec-document aesthetic on a near-black canvas, with Softree orange as a surgical accent. Each chapter uses a distinct layout (no repeated 3-column card grids). Scroll progress rail + GSAP chapter tracking; impact section gets full-viewport typographic drama.

---

## Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--cs2-bg` | `#0a0b0f` | Page shell |
| `--cs2-bg-elevated` | `#111318` | Bento tiles, device frames |
| `--cs2-bg-surface` | `#16181f` | Inset panels |
| `--cs2-text` | `#f4f4f5` | Headlines |
| `--cs2-text-muted` | `#71717a` | Body, captions |
| `--cs2-accent` | `#FF7A2F` | Lines, metrics, CTA (sparingly) |

**Anti-patterns:** Warm off-white cards, purple gradients, identical shadow cards, uppercase “CASE STUDY” pills, Bootstrap stat rows.

---

## Typography

| Role | Treatment |
|------|-----------|
| Display | Playfair Display — hero & pull quotes |
| UI / body | Inter (project default) |
| Labels | Monospace — `FIG 01`, chapter numbers, metadata |

Scale: hero `clamp(2.5rem, 6vw, 4.75rem)`; section titles `clamp(1.85rem, 3.8vw, 3rem)`.

---

## Layout Patterns (stolen, not copied)

1. **Sticky scroll rail** — Inkwell/Awwwards pathfinder; orientation without chapter-skip.
2. **FIG / chapter labels** — Linear spec-document framing.
3. **Asymmetric bento** — Deliverables: 2×2 + featured tile, not 3×2 clones.
4. **Alternating challenge narrative** — Magazine stagger, not centered icon cards.
5. **SVG architecture flow** — Animated stroke on scroll; not horizontal logo pills.
6. **Device mockup gallery** — Staggered depth, not 4-up carousel grid.
7. **Impact viewport** — One hero metric + supporting row; optional count-up.
8. **Editorial testimonial** — Full-bleed quote typography, no bordered quote box.

---

## Motion

| Token | Value |
|-------|-------|
| Reveal | `400–550ms`, ease-out `[0.23, 1, 0.32, 1]` |
| Hover | `transform` + `opacity` only |
| GSAP | Chapter `ScrollTrigger` for rail; architecture path `strokeDashoffset` |

**Reduced motion:** Opacity-only reveals; no pin/scrub; static metrics.

---

## Adoption

Import from `caseStudyV2Tokens.ts`. Layout entry: `ManufacturingPowerPlatformLayout.tsx` → `ManufacturingV2Experience` sections.
