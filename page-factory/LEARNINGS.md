# LEARNINGS — the mistake ledger

Every agent MUST read this file before doing any work, and MUST NOT repeat any
mistake recorded here. When a QA round finds a failure, the correcting agent
appends an entry. Entries are never deleted — only marked `superseded` if the
codebase changes make them obsolete.

Format:

```
## L-<number>: <short title>
- **Date**: YYYY-MM-DD
- **Page/Component**: where it happened
- **Mistake**: what went wrong
- **Detection**: which gate/agent caught it
- **Rule**: the permanent rule that prevents recurrence
```

---

## L-1: Seed rules from codebase conventions (pre-loaded, not from a failure)
- **Date**: 2026-07-03
- **Page/Component**: global
- **Mistake**: n/a — seeded from architecture review
- **Detection**: n/a
- **Rule**:
  - Use `@/*` path alias, strict TS, PascalCase components, sections in `src/components/sections/` (or a page-scoped folder).
  - `"use client"` only on animated/interactive leaves; sections that are static stay server components.
  - Heavy sections must be lazy-loaded with `next/dynamic` and a skeleton whose background color matches the section background (prevents flash).
  - Use the shared easing tokens from `src/lib/motion.ts` (EASE.silk, EASE.out, …) — never invent ad-hoc cubic-beziers per component.
  - Fonts: Inter only, loaded centrally. Do not add font imports in components.
  - Colors: use `--softree-*` tokens (accent #ff7a2f, bg-dark #0a0a0a, surfaces #141414/#1e1e1e). No hardcoded new brand colors.
  - Lenis + ScrollTrigger must be synced through the existing provider pattern; never instantiate a second Lenis.

## L-2: Seed rules from 2026 anti-pattern research (pre-loaded)
- **Date**: 2026-07-03
- **Page/Component**: global
- **Mistake**: n/a — seeded from trend research
- **Detection**: n/a
- **Rule**:
  - NEVER scroll-hijack (wheel = slide). Scrub with native physics (`scrub: 0.5–1`), max ONE pinned horizontal section per page.
  - NEVER fade-up every section — reveals for hero + section headers only; body copy renders instantly.
  - NEVER animate width/height/top/left — transform/opacity only.
  - NEVER leave a marquee/canvas ticking offscreen — gate with ScrollTrigger `onToggle` or IntersectionObserver.
  - NEVER skip `prefers-reduced-motion` — use `gsap.matchMedia()` contexts; reduced variant = opacity fades ≤300ms, no pins, no parallax.
  - NEVER ship the centered `h1 + subtext + two buttons` template hero, particles.js dots, floating gradient blobs, tilt cards, typewriter effects.
  - NEVER apply smooth (synthetic) scrolling on touch devices.
  - 3D only as ONE purposeful artifact, lazy-mounted (`ssr:false`, IO rootMargin ~200%), poster fallback, DPR capped ≤ 2.
  - Run SplitText/text measurement only after `document.fonts.ready` (CLS).
  - Cap stagger envelope at ~0.6s total; exits ≈ 2/3 of entrance duration.
