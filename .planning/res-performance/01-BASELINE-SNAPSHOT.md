# Vercel Speed Insights — Baseline Snapshot

**Captured:** 2026-07-06 (user report)  
**Data points:** 8,283  
**Site:** softreetechnology.com

---

## Global (all routes aggregate)

| Metric | Value | Rating | Target (Good) | Target (10/10 loop) |
| --- | ---: | --- | --- | --- |
| **Real Experience Score (RES)** | **49** | Poor | > 90 | **≥ 95** |
| First Contentful Paint (FCP) | 3.28 s | Poor | ≤ 1.8 s | ≤ 1.2 s |
| Largest Contentful Paint (LCP) | 4.54 s | Poor | ≤ 2.5 s | ≤ 1.8 s |
| Interaction to Next Paint (INP) | 704 ms | Poor | ≤ 200 ms | ≤ 150 ms |
| Cumulative Layout Shift (CLS) | 0 | Great | ≤ 0.1 | 0 |
| First Input Delay (FID) | 26 ms | Great | ≤ 100 ms | ≤ 50 ms |
| Time to First Byte (TTFB) | 0.14 s | Great | ≤ 0.8 s | ≤ 0.2 s |

**Diagnosis headline:** TTFB and CLS are already excellent. The RES collapse is driven by **FCP + LCP + INP** — render path and main-thread work, not server latency.

---

## Routes — Poor (< 50)

| Route | Visits | RES | Priority weight |
| --- | ---: | ---: | --- |
| `/case-studies` | 384 | **34** | P0 — worst score + listing hub |
| `/contact` | 46 | **33** | P0 |
| `/blog/[slug]` | 127 | **48** | P1 |
| `/services/offshore-power-platform-development` | 37 | **46** | P1 |
| `/studio/[...tool]` | 238 | **42** | **EXCLUDE** — Sanity Studio, not public marketing |
| `/studio/structure/caseStudies;caseStudiesPublished` | 30 | **27** | **EXCLUDE** |
| `/studio/structure/caseStudies;caseStudiesDrafts;…` | 15 | **35** | **EXCLUDE** |

---

## Routes — Needs Improvement (50–90)

| Route | Visits | RES | Priority weight |
| --- | ---: | ---: | --- |
| `/case-studies/[slug]` | **1,800** | **53** | **P0 — highest traffic poor route** |
| `/` | **995** | **62** | **P0 — homepage** |
| `/careers` | 116 | 77 | P2 |
| `/blog` | 112 | 61 | P1 |
| `/studio` | 77 | 74 | **EXCLUDE** |
| `/studio/structure` | 46 | 61 | **EXCLUDE** |
| `/blog/power-platform/how-to-use-environment-variables-in-power-platform` | 36 | 55 | P2 |

---

## Routes — Great (> 90) — USE AS BENCHMARKS

| Route | Visits | RES | Study for patterns |
| --- | ---: | ---: | --- |
| `/case-studies/preview` | 2,900 | **97** | Static/preview rendering path |
| `/about-us` | 94 | **97** | Reference implementation |
| `/studio/structure/caseStudies;newPageComposer` | 19 | 97 | EXCLUDE |

---

## Geography

| Country | Visits | RES |
| --- | ---: | ---: |
| India | 7,700 | **52** |
| United States | 155 | **55** |
| China | 45 | 79 |

**Note:** 93% of traffic is India — optimize for **mobile + slower networks + mid-tier Android** first. Desktop-only fixes will not move RES.

---

## Loop target (10/10 mode)

| Scope | RES | FCP | LCP | INP |
| --- | ---: | --- | --- | --- |
| Global | ≥ 95 | ≤ 1.2 s | ≤ 1.8 s | ≤ 150 ms |
| P0 routes (each) | ≥ 90 | ≤ 1.8 s | ≤ 2.5 s | ≤ 200 ms |
| P1 routes (each) | ≥ 85 | ≤ 2.0 s | ≤ 2.5 s | ≤ 250 ms |

Re-measure in Vercel Speed Insights after each production deploy. Lab scores (Lighthouse/PSI) are gates; **RES is the verdict**.
