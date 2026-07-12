---
id: engineering.architecture
title: Architecture
category: atom
domain: engineering
knowledgeFolder: 05-engineering
fileName: Architecture.md
tags:
  - engineering
  - nextjs
  - sanity
  - architecture
summary: Softree_ monorepo architecture — Next.js 16 App Router, Sanity CMS, motion stack, verify scripts (July 2026).
confidence: 0.93
version: 1.1.0
lastVerified: 2026-07-13
lastUpdated: 2026-07-13
sources:
  - type: internal
    ref: package.json
    confidence: 0.98
    retrievedAt: 2026-07-13
  - type: internal
    ref: src/cms/schema/types/index.ts
    confidence: 0.95
    retrievedAt: 2026-07-13
  - type: url
    ref: https://nextjs.org/blog/next-16-2
    confidence: 0.95
    retrievedAt: 2026-07-13
related:
  - engineering.performance
status: verified
---

## Summary

Softree_ is a Next.js 16 App Router marketing site with embedded Sanity Studio, premium case-study layout system, and page-forge exact-clone workstreams.

## Stack (from package.json)

| Layer | Version | Notes |
|-------|---------|-------|
| Next.js | ^16.2.6 | `next build --webpack`, `next dev --turbo` |
| React | ^19.0.0 | React 19 App Router |
| Sanity | ^6.3.0 | `next-sanity ^13.1.1`, Studio at `/studio` |
| Motion | GSAP ^3.15.0, Framer Motion ^12.40.0, Lenis ^1.3.23 | Agentic K2 loader uses GSAP |
| Node | 24.x | engines field |
| Tailwind | ^4.3.0 | PostCSS 4 |

## App Structure

- **Routes:** 63 unique `src/app/**/page.tsx` paths
- **Production nav:** `src/components/sections/navigation.tsx` (+ navigation-server/client)
- **CMS schema:** `src/cms/` — documents (post, caseStudy, marketingPage, homepage, serviceLine, aiContext, etc.) + case study composer blocks
- **Case studies:** 19 layout values in `src/lib/case-study-layouts.ts`, 17 premium layout folders
- **Flagship clones:** `softree-agentic-exact/`, `client-exact/`
- **Only SSG marketing route:** `/p/[slug]` (CMS pages)

## Sanity Integration

- Studio: `src/app/studio/[[...tool]]/page.tsx` (force-dynamic)
- Seeds: `scripts/seed-premium-client-case-studies.ts`, `scripts/seed-ai-context.ts`, etc.
- Go-live verify: `npm run cms:go-live`

## Next.js 16 Notes for This Repo

- `middleware.ts` deprecated — migrate to `proxy.ts` (build warning observed)
- Next.js 16.2 adds AGENTS.md, browser log forwarding, Server Fast Refresh
- Security: stay on 16.2.6+ (13 advisories patched May 2026)

## Verify / Audit Scripts

- `agentic:copy:verify`, `handoff:verify`, `hero:score`, `psi`, `cms:go-live`
- ATLAS: `atlas:ingest`, `atlas:improve`, `atlas:knowledge`

## References

- `package.json`
- `.cursor/knowledge/20-memory/audits/repo-scan-2026-07-13.json`
