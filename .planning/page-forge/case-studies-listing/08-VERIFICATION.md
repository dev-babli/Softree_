# Case Studies Listing — Loop 1 Verification

```yaml
verdict: APPROVED
route: /case-studies
loop: 1
overall: 8.6
```

## Shipped

- Category technology rail with counts + inline filter sync
- Featured recently published band (sorted by `publishedAt`)
- SpotlightCard grid with per-category accent + `keyResults` metrics
- Aggregate stats bar + sticky scroll summary
- Hub proof CTA, `LightContactSection`, `LightFAQExact`

## Browser check

- `http://127.0.0.1:3000/case-studies` — 43 stories, category rail, stats, proof, FAQ present
- 48 case study links in DOM

## Files

- `src/app/case-studies/CaseStudiesListingClient.tsx`
- `src/app/case-studies/page.tsx`
- `src/app/case-studies/listingConfig.ts`
- `src/components/case-studies/listing/CaseStudiesCategoryRail.tsx`
- `src/components/case-studies/listing/CaseStudyListingCard.tsx`

## P2 (optional)

- Hero could migrate from GeneralHeaderHero to editorial CaseStudyHero for parity with category pages
- Add `companySize` to Sanity card projection type in `categoryCards.ts`
