---
id: research-seo-cwv-2026
title: Core Web Vitals Thresholds 2026
category: atom
domain: seo
knowledgeFolder: 09-seo
tags:
  - seo
summary: "Core Web Vitals in 2026 remain three metrics evaluated at 75th percentile of real-user field data (CrUX): Largest Contentful Paint (LCP) Good ≤2.5s, Needs Improvement 2.5-4.0s, Poor >4.0s; Interaction to Next Paint (INP) Good ≤200ms, Needs Improvement 200-500ms, Poor >500ms (INP replaced First Input Delay in March 2024); Cumulative Layout Shift (CLS) Good ≤0.1, Needs Improvement 0.1-0.25, Poor ..."
confidence: 0.75
version: 1.0.0
lastUpdated: 2026-07-12
sources:
  - type: url
    ref: https://developers.google.com/search/docs/appearance/core-web-vitals
    confidence: 0.85
    retrievedAt: 2026-07-12
related:
status: verified
---

## Summary

Core Web Vitals in 2026 remain three metrics evaluated at 75th percentile of real-user field data (CrUX): Largest Contentful Paint (LCP) Good ≤2.5s, Needs Improvement 2.5-4.0s, Poor >4.0s; Interaction to Next Paint (INP) Good ≤200ms, Needs Improvement 200-500ms, Poor >500ms (INP replaced First Input Delay in March 2024); Cumulative Layout Shift (CLS) Good ≤0.1, Needs Improvement 0.1-0.25, Poor ...

## Core Concepts

Core Web Vitals in 2026 remain three metrics evaluated at 75th percentile of real-user field data (CrUX): Largest Contentful Paint (LCP) Good ≤2.5s, Needs Improvement 2.5-4.0s, Poor >4.0s; Interaction to Next Paint (INP) Good ≤200ms, Needs Improvement 200-500ms, Poor >500ms (INP replaced First Input Delay in March 2024); Cumulative Layout Shift (CLS) Good ≤0.1, Needs Improvement 0.1-0.25, Poor >0.25. Google uses field data not lab Lighthouse scores for ranking evaluation. Search Console groups URLs by worst-performing metric — one Poor metric marks entire group Poor. CWV are confirmed ranking signals but act as tiebreakers when content relevance is similar. Page experience bundle also includes HTTPS, mobile usability, no intrusive interstitials. Diagnostic metrics: TTFB Good ≤0.8s, FCP Good ≤1.8s. Highest-impact fixes: optimize LCP element (hero image/text), reduce/split JavaScript for INP, reserve dimensions for images/ads/embeds for CLS.

## References

- https://developers.google.com/search/docs/appearance/core-web-vitals
