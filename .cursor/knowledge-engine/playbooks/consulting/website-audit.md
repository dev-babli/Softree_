---
id: playbook.website-audit
title: Website Audit Playbook
category: playbook
domain: consulting
tags:
  - playbook
  - audit
  - website
  - ux
  - seo
summary: End-to-end consulting playbook for auditing a business website against positioning, UX, trust, SEO, GEO, AEO, performance, accessibility, and conversion.
confidence: 0.9
version: 1.0.0
lastUpdated: 2026-07-07
sources:
  - type: internal
    ref: atom:scoring.website-rubric
    confidence: 0.95
    retrievedAt: 2026-07-07
  - type: internal
    ref: atom:consulting.thinking-principles
    confidence: 0.95
    retrievedAt: 2026-07-07
related:
  - scoring.website-rubric
  - consulting.thinking-principles
  - competitors.benchmark-framework
  - playbook.competitive-benchmark
status: verified
---

## Summary

Structured playbook for ATLAS website audits. Produces scored findings, ROI-prioritized recommendations, and executive-ready reports.

## Core Concepts

### Phase 1 — Discover (30 min)
- Identify business, ICP, primary conversion goal, competitors
- Read atom:business.softree-context for positioning lens
- Screenshot homepage + 3 key pages at 390/768/1440px

### Phase 2 — Diagnose (2–4 hrs)
Score each rubric dimension (100 pts total):
- Positioning, Messaging, Visual Design, UX, Navigation, IA
- Trust, Social Proof, Content, SEO, GEO, AEO
- Performance, Accessibility, Conversion

Run: Lighthouse, console check, keyboard nav spot-check

### Phase 3 — Design Recommendations (1–2 hrs)
- Top 10 issues + Top 10 quick wins + Top 10 strategic improvements
- Each finding: severity, business/revenue/trust/SEO/conversion impact, difficulty, ROI, priority, confidence

### Phase 4 — Deliver Report
- Use template:consulting.executive-report-template
- Include competitor comparison matrix
- Final verdict: Improve | Partially Rebuild | Reposition | Complete Redesign

### Phase 5 — Optimize (ongoing)
- 30-day quick wins plan
- 90-day structural improvements
- 1-year category positioning strategy

## Best Practices

- Never audit from memory — visit live site with browser tools.
- Benchmark against Kore.ai + category leader, not average.
- Separate facts, assumptions, opinions.
- Every issue must trace to evidence (screenshot, metric, or cited source).

## Common Mistakes

- Scoring without rubric consistency across pages.
- Recommending redesign without business impact justification.
- Ignoring conversion in favor of pure design scores.

## Decision Framework

| Overall Score | Verdict |
|---------------|---------|
| 80–100 | Improve — targeted fixes |
| 60–79 | Partially Rebuild — section-level |
| 40–59 | Reposition — messaging + structure |
| <40 | Complete Redesign — evidence required |

## Implementation Guide

1. Load rubric: atom:scoring.website-rubric
2. Run self-improve backlog check: `npm run atlas:improve`
3. Execute audit phases 1–4
4. Store findings in report; queue fixes in research backlog if gaps found

## References

- atom:scoring.website-rubric
- template:consulting.executive-report-template
- playbook.competitive-benchmark

## Related Topics

- playbook.seo-audit
- playbook.competitive-benchmark
- pattern.business-outcomes-first

## Future Research

- Automated Lighthouse + visual diff pipeline integration
- GEO/AEO scoring criteria refinement for 2026 search landscape
