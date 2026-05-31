# Case Study V3 — Warm Editorial Long-Form

## Design direction

**System:** Warm Editorial Long-Form (single cohesive language)

Inspired by Accenture insight articles and TriState long-form case studies — professional B2B storytelling with generous whitespace, photo-forward sections, and distinct layout treatments per chapter (not repeated card grids).

### Why this direction

- User rejected V2 modular cards, sticky chapter rail, and generic accordion patterns
- B2B manufacturing buyers expect authority and clarity, not template slop
- Softree About Us already uses premium light FAQ/CTA patterns — this page matches that quality bar
- One theme committed: warm ivory editorial light with `#FF7A2F` accent only

### Typography

| Role | Font | Rationale |
|------|------|-----------|
| Display | Fraunces | Editorial serif with character — avoids Inter-everywhere |
| Body | DM Sans | Clean, readable, pairs well with Fraunces |

### Color

| Token | Value | Use |
|-------|-------|-----|
| `--cs-bg` | `#FAF8F5` | Page background |
| `--cs-bg-warm` | `#F3EDE6` | Alternate sections |
| `--cs-ink` | `#1C1917` | Primary text |
| `--cs-accent` | `#FF7A2F` | CTAs, labels, highlights only |

### Section treatments (all distinct, all cohesive)

1. **Hero** — Cinematic full-bleed photo, dark gradient, serif headline, stat strip
2. **Overview** — Editorial two-column + key facts sidebar (not cards)
3. **Challenge** — Photo + numbered narrative list (not 3 identical cards)
4. **Solution** — Horizontal architecture flow + dashboard image + accent border list
5. **Deliverables** — Alternating image/text rows (not grid)
6. **Gallery** — Dark band, featured screenshot + thumbnail selector
7. **Impact** — Full-bleed metrics moment with NumberFlow + before/after table
8. **Tech stack** — Dot-grid canvas bg, colored Microsoft logos
9. **Testimonial** — Full-width quote block over photo
10. **Related** — Horizontal scroll cards
11. **FAQ** — Numbered editorial accordion (Softree About Us inspired, not generic)
12. **CTA** — Premium dark panel with photo (not pasted component)

### Removed from V2

- Sticky chapter rail / scroll progress
- Repeated identical card grids
- Playfair + V2 token system
- Modular v2/ section folder

### Entry point

`ManufacturingPowerPlatformLayout.tsx` → `ManufacturingCaseStudyPage`

### Images

- Hero: Unsplash manufacturing (via `mapCaseStudyData.ts`)
- Sections: `/public/Gallery/Prestige Bangalore-*.webp`
