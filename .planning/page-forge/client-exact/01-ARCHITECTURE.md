# client-exact architecture

## Source
- `Softree_/client.html` — Framer Hanza portfolio/agency template SSR export
- Not Webflow: hashed `framer-*` classes + CDN ESM hydrate (`script_main.*.mjs`)

## Decision
**Do not inject Framer hydrate / body HTML.** Rebuild as Softree React sections (exact-clone loop law).

## Route
- `/client` → `src/app/client/page.tsx` → `ClientExactPage`

## Folder
```
src/components/client-exact/
  ClientExactPage.tsx
  client-exact.css
  content.ts
  motion.tsx
  sections.tsx
```

## Section map (Hanza → Softree)
| # | Hanza | Softree component |
|---|-------|-------------------|
| 0 | Hero | HeroSection |
| 1 | Logos | LogosSection (TrustedBy logos) |
| 2 | About + stats | AboutSection |
| 3 | Portfolio | PortfolioSection |
| 4 | Services | ServicesSection |
| 5 | Process | ProcessSection |
| 6 | Testimonials | TestimonialsSection (real Softree quotes) |
| 7 | Case study band | ProofSection |
| 8 | Pricing | EngagementSection (no fake $ packages) |
| 9 | FAQ | FaqSection |
| 10 | Blog | InsightsSection |
| 11 | CTA | CtaSection |

## Motion
Framer Motion `whileInView` stagger (opacity + y) — honors `prefers-reduced-motion`.

## Honesty
- Logos from existing Softree TrustedBy set
- Testimonials from Softree delivery quotes (not Hanza fictional clients)
- Engagement models instead of invented $3.5k/$7.5k/$12.5k packages
