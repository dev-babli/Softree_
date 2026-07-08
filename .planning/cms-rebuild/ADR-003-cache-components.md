# ADR-003: Cache Components deferred

**Status:** Accepted (deferred)  
**Date:** 2026-07-07

## Context

`template-nextjs-personal-website` uses Next.js Cache Components with `cacheLife: { default: sanity }`.

## Decision

Defer until Next.js exposes `cacheComponents` in the stable config for this project (Next 16.2.6 — not available).

## Mitigation

- `getDynamicFetchOptions()` in `@/cms/lib/fetch`
- `CmsSanityLive` for on-demand draft updates
- Webhook revalidation at `/api/revalidate`
