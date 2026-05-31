# Case Study Light Theme — Design Language

> **Deprecated.** The manufacturing reference layout moved to **Cinematic Product Noir** — see `CASE_STUDY_V2.md` and `ManufacturingV2Experience.tsx`. Do not extend this light template.

Premium editorial light theme for B2B enterprise case study detail pages. Anchored to Softree brand orange (`#FF7A2F`) and warm off-white surfaces (`#fafaf9`).

---

## Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--cs-bg-base` | `#fafaf9` | Page shell, hero base |
| `--cs-bg-cream` | `#f5f4f0` | Alternate section bands |
| `--cs-bg-muted` | `#f1f0ec` | Tech stack strip, metadata bar |
| `--cs-bg-white` | `#ffffff` | Cards, elevated nodes |
| `--cs-text-primary` | `#0f172a` | Headlines, stat values (non-accent) |
| `--cs-text-secondary` | `#334155` | Body copy, subtitles |
| `--cs-text-muted` | `#64748b` | Labels, captions |
| `--cs-accent` | `#FF7A2F` | Pills, metrics, CTA, borders |
| `--cs-accent-soft` | `rgba(255,122,47,0.12)` | Icon circles, pill backgrounds |
| `--cs-border` | `rgba(15,23,42,0.08)` | Card borders, dividers |

**Shadows:** Soft, layered — never harsh drop shadows. `shadow-sm` for resting cards, `shadow-hover` on interaction.

**Anti-patterns:** Purple/pink gradients, heavy glassmorphism, pure `#ffffff` page backgrounds, dark section alternation.

---

## Typography Scale

| Role | Size | Weight | Tracking | Line-height |
|------|------|--------|----------|-------------|
| Display (hero h1) | `clamp(2rem, 4.2vw, 3.25rem)` | 700 | `-0.03em` | `1.08` |
| Section h2 | `clamp(1.75rem, 3vw, 2.5rem)` | 700 | `-0.02em` | `1.15` |
| Card h3 | `1.125rem` | 600 | `-0.01em` | `1.3` |
| Body large | `1.0625rem` | 400 | — | `1.65` |
| Body | `0.9375rem` | 400 | — | `1.6` |
| Label | `10px` | 600 | `0.14em` uppercase | — |
| Stat | `clamp(1.75rem, 2.8vw, 2.25rem)` | 700 | — | `1` |

Headlines: max ~4 lines on mobile; use `max-w-*` to prevent 6-line wraps.

Typography: Inter (project default). Proper curly quotes in testimonials (`&ldquo;` / `&rdquo;`), en dashes for ranges.

---

## Spacing Rhythm

| Context | Mobile | Desktop |
|---------|--------|---------|
| Section padding Y | `5rem` (80px) | `7rem` (112px) |
| Section padding X | `1.25rem` | `2rem` |
| Card padding | `1.75rem` | `2rem` |
| Grid gap (cards) | `1.25rem` | `1.5rem` |
| Hero padding top | `6rem` | `8rem` |
| Max content width | `1240px` | — |

Vertical rhythm: alternate `--cs-bg-base` and `--cs-bg-white` / `--cs-bg-cream` — never more than two adjacent identical bands.

---

## Component Patterns

### Hero
Warm off-white base with subtle mesh gradient (orange tint, 8–12% opacity). Optional hero image with **light** overlay (`from-white/90`), not dark scrim. Orange case-study pill. Stats as white elevated cards with soft shadow.

### Stat pill (hero highlights)
White card, `rounded-xl`, icon in soft orange circle, metric in accent orange, label in muted text.

### Metadata bar (Project Snapshot)
Horizontal strip on `--cs-bg-muted`. Hairline vertical dividers between items. Orange accent dash above each label.

### Challenge card
White bg, subtle border, centered icon in orange tint circle. Hover: `translateY(-2px)` + shadow increase (transform-only).

### Architecture node
White elevated pill behind logo. Dotted connector in muted orange. Horizontal scroll on mobile.

### Deliverable tile
3×2 bento grid, equal min-heights, top-aligned icons, consistent padding.

### Screenshot carousel
Rounded `xl` frames, soft shadow, spring/ease-out slide. Caption in muted small caps or medium weight.

### Impact card
2×2 grid, large orange metric, optional featured card with warm gradient accent border.

### Tech stack strip
Muted surface band, logo row with labels below.

### Testimonial
Editorial block: left orange border (4px), large quote mark optional, avatar with orange ring.

### Related card
16/10 image, category pill in accent, hover lift on card (not image scale on touch).

### CTA band
Warm gradient (`#fafaf9` → soft orange tint). Strong orange CTA button with `active:scale(0.97)`.

---

## Motion Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--cs-duration-fast` | `160ms` | Button press, micro feedback |
| `--cs-duration-normal` | `200ms` | Card hover |
| `--cs-duration-reveal` | `400ms` | Section scroll reveal |
| `--cs-ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Default easing |

**Rules (Emil):** Transform and opacity only. No `transition: all`. Ease-out on enter. `scale(0.97)` on button `:active`. Carousel: ease-out slide or subtle spring.

**Reduced motion:** Disable transforms; keep opacity fades at 200ms max.

---

## Accessibility

- WCAG AA: primary text `#0f172a` on `#fafaf9` ≈ 16:1
- Muted text `#64748b` on white ≈ 4.6:1 (passes AA for body)
- Focus: `ring-2 ring-[#FF7A2F] ring-offset-2 ring-offset-[#fafaf9]`
- All interactive elements: `cursor-pointer`, visible focus
- Images: meaningful `alt` text
- Carousel: `aria-label` on prev/next, live region optional

---

## Adoption

Import tokens from `caseStudyLightTokens.ts`. Wrap layout in shell with `caseStudyLightCssVars`. Dark premium layouts remain unchanged — only import shared tokens when migrating.
