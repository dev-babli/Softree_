# Loop 1 — Case study detail polish

**Verdict:** SHIPPED  
**Build:** `npm run build` exit 0

## P0 fixed

- `CaseStudyPageRenderer` no longer falls back to `education-edtech-story` for missing/invalid layout — uses `page-composer` or legacy archetypes correctly.

## Visual upgrades

| Area | Change |
| --- | --- |
| Hero | Cream band, category pill accent, breadcrumb, serif subline, elevated metrics cards, scroll hint |
| Chrome | Top scroll progress bar |
| Overview | Horizontal snapshot strip with orange accent dashes |
| Impact | Featured first metric (dark card, 2×2 on lg) |
| Testimonial | Full-width dark editorial quote block |
| Composer | Alternating section surfaces (white / cream / stone) |

## Files

- `CaseStudyPageRenderer.tsx`
- `PageComposerLayout.tsx`
- `HeroSection.tsx`
- `OverviewSection.tsx`, `ImpactSection.tsx`, `TestimonialSection.tsx`
- `CaseStudyComposer.tsx`
- `detail/CaseStudyDetailChrome.tsx`
- `detail/caseStudyDetailSurfaces.ts`
