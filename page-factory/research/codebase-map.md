# Softree Codebase Map — conventions every builder agent MUST follow
> Generated 2026-07-03 from architecture review. Verify paths before relying on them.

## Stack
Next.js 16 App Router (`src/app/`), React 19, TypeScript strict, Tailwind v4 (`@theme` in CSS,
no tailwind.config.ts), GSAP + @gsap/react, Lenis, Framer Motion, React Three Fiber + drei,
Sanity CMS (case studies, blog, design tokens), path alias `@/*` → `./src/*`, Node 24.

## Routing
- Marketing pages: `/`, `/about-us`, `/services` (+9 offshore sub-pages), `/case-studies`
  (+category + `[slug]` with 15+ layout variants), `/blog`, `/careers`, `/contact`, `/showcase`, `/avoora`
- Sanity Studio at `/studio`
- Homepage composition: `src/app/home-page.tsx` — 14+ sections, heavy ones lazy via
  `next/dynamic` with color-matched skeletons

## Component taxonomy
- `src/components/sections/` — 70+ marketing sections (flat)
- `src/components/ui/` — ~65 shadcn/radix primitives
- `src/components/case-studies/layouts/variants/` — 15+ scrollytelling layout variants
  (e.g. `ai-horizontal-story` = pinned horizontal scroll; `madar-sticky-story` = sticky sections)
- `src/components/case-studies/layouts/motion/scrollReveal.tsx` — reusable scroll-reveal
- `src/components/homepage-light/` — light-mode homepage sections
- Page-scoped component folders are acceptable for new pages: `src/components/<page-name>/`

## Design tokens
- `src/app/globals.css` — Tailwind v4 `@theme` + `--softree-*` custom props
- Accent: `#ff7a2f` (hover `#e85a1f`, soft `rgba(255,122,47,0.12)`)
- Dark: bg `#0a0a0a`, darker `#050505`, surface-1 `#141414`, surface-2 `#1e1e1e`,
  border `rgba(255,255,255,0.1)`, muted text `rgba(255,255,255,0.55)`
- Light: bg `#fafaf9`, fg `#0a0a0a`
- Font: Inter only (300–700). `.glass-card` utility exists.
- Runtime brand tokens from Sanity via `src/lib/fetch-design-tokens.ts` → CSS vars on `<html>`
- Breakpoints: standard Tailwind (640/768/1024/1280/1536)

## Motion system
- `src/lib/motion.ts` — EASE tokens: `out` (0.23,1,0.32,1), `inOut` (0.77,0,0.175,1),
  `drawer` (0.32,0.72,0,1), `silk` (0.16,1,0.3,1 = expo.out, cinematic arrivals),
  `smooth` (0.65,0,0.35,1), `implode` (0.7,0,0.84,0). Plus `EASE_T` tuples for Framer.
- USE THESE TOKENS. Do not invent per-component beziers.
- Existing patterns: `useInView`/`useNearViewport` gating, ScrollTrigger pin+scrub in case-study
  variants, Lenis smooth-scroll provider. Never instantiate a second Lenis.

## Conventions
- PascalCase components, camelCase hooks/utils, kebab-case CSS files
- `"use client"` only on animated/interactive leaves; static sections stay server components
- Lazy-load heavy sections: `dynamic(() => import(...), { loading: () => <Skeleton/> })`,
  skeleton bg matches section bg
- Metadata: exported from `page.tsx` with canonical + OG (`ogImages()`, `twitterImages()`)
- CSS modules allowed alongside components for keyframe-heavy work

## Existing QA scripts
- `npm run psi` — PageSpeed Insights CI (thresholds: perf 50 / a11y 85 / seo 85 / bp 80)
- `npm run audit:local` — Lighthouse on localhost:3000
- `npm run audit:site` — Unlighthouse batch
- `npm run generate:og` — Puppeteer OG screenshots
- Page Factory adds: `npm run qa:viewport` and `npm run qa:perf` (scripts/qa/)
