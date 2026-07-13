---
id: engineering.performance
title: Performance
category: atom
domain: engineering
knowledgeFolder: 05-engineering
fileName: Performance.md
tags:
  - engineering
  - performance
  - cwv
  - lighthouse
summary: Softree_ performance baseline from res-performance loop + Core Web Vitals thresholds July 2026.
confidence: 0.88
version: 1.1.0
lastVerified: 2026-07-13
lastUpdated: 2026-07-13
sources:
  - type: internal
    ref: .planning/res-performance/loop-state.json
    confidence: 0.9
    retrievedAt: 2026-07-13
  - type: url
    ref: https://developers.google.com/search/docs/appearance/core-web-vitals
    confidence: 0.95
    retrievedAt: 2026-07-13
related:
  - engineering.architecture
status: verified
---

## Summary

Softree site performance loop documents global RES 49 with severe LCP on dynamic routes. CWV thresholds unchanged in 2026: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at p75 field data.

## Softree Baseline (res-performance Loop 1)

| Metric | Value | Source |
|--------|-------|--------|
| Global RES | 49 | `.planning/res-performance/loop-state.json` |
| Worst LCP | `/case-studies/[slug]` 7238ms | Loop analysis |
| Contact LCP | 7767ms | Loop analysis |
| Root cause | 80–90% render delay (client-render gated) | Loop analysis |
| Only SSG route | `/p/[slug]` | Architecture scan |

**Fix applied:** Inter via `next/font` (dev verified; prod build OOM blocked re-verify)

**Scripts:** `npm run psi`, `npm run audit:site`, `npm run audit:local`

## Core Web Vitals Thresholds (2026)

| Metric | Good (p75) | Poor |
|--------|--------------|------|
| LCP | ≤ 2.5s | > 4.0s |
| INP | ≤ 200ms | > 500ms |
| CLS | ≤ 0.1 | > 0.25 |

INP replaced FID (March 2024). Google uses CrUX field data, not Lighthouse lab scores, for ranking evaluation. CWV act as tiebreakers when content quality is similar.

## Priority Actions for Softree

1. Reduce client-render gate on `/case-studies/[slug]` and `/contact`
2. Expand SSG/ISR for high-traffic templates
3. Resolve prod build OOM to re-baseline after font fix
4. Track INP on agentic page (heavy GSAP scroll interactions)

## References

- `.planning/res-performance/`
- `scripts/psi-check.mjs`
