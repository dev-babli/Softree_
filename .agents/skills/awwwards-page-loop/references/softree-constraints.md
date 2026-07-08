# Softree constraints (locked)

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js App Router (`next` ^16) |
| UI | React client/server components |
| Styling | Tailwind utility classes + page-scoped CSS modules/files |
| Motion | GSAP 3 + ScrollTrigger, Framer Motion, `@/lib/motion` |
| CMS | Sanity (when content is CMS-driven) |
| Images | `next/image`, brand assets from `@/lib/brand-assets` |

**Do not introduce:** new CSS-in-JS runtimes, Three.js, Lottie-by-default, full-page WebGL, global animation frameworks on root layout.

## Cross-stack conversion rule

All external prompts, raw HTML, CSS, vanilla JS, CDN instructions, or examples from another stack must be converted into Softree's stack before implementation. Do not paste standalone HTML/CSS/JS into the product unless the user explicitly asks for a standalone artifact.

- HTML becomes Next.js App Router pages and React components.
- Global CSS becomes Tailwind utilities, CSS modules, or page-scoped CSS.
- CDN scripts become installed package imports when the package already exists, or `next/script` only for required browser custom elements.
- Vanilla DOM animation logic becomes React effects with cleanup, refs, and reduced-motion guards where possible.
- Keep behavior and visual fidelity from the source prompt, but adapt architecture, routing, imports, and cleanup to this repo.

## Brand tokens

| Token | Value | Use |
| --- | --- | --- |
| Accent | `#FF5812` | CTAs, highlights, active states |
| Cream | `#f8f4ec` | Editorial bands, loaders, pin chapters |
| Ink | `#121417` / `#141414` | Text, dark bands |
| White | `#ffffff` | Default page canvas |
| Mono | `ui-monospace` stack | Labels, indexes, meta |

**Forbidden:** purple/violet AI meshes, cyan cyberpunk, rainbow gradients, glassmorphism as default card style.

## Motion system

Import from `@/lib/motion`:

- `DUR` — ui / card / section / cinematic
- `EASE` / `EASE_T` — GSAP strings + Framer tuples
- `STAGGER`, `REVEAL`, `prefersReducedMotion()`

Rules:

- UI interactions ≤ ~300ms
- Section reveals 0.6–1.0s
- Animate **transform + opacity only**
- Always branch on `prefersReducedMotion()`

## Sacred components (default preserve)

| Component | Path pattern |
| --- | --- |
| Navigation | `NavigationClient` / site nav |
| Sticky orange footer bar | existing site chrome |
| Contact | `LightContactSection` |
| FAQ | `LightFAQExact` |
| Site `Footer` | unless brief redesigns footer |

Page work happens **between** nav and contact/FAQ unless brief expands scope.

## Architecture patterns (proven)

```
src/app/<route>/page.tsx          # server page, metadata, FAQ data
src/app/<route>/layout.tsx        # optional page-scoped critical CSS only
src/components/<feature>/
  <Feature>Page.tsx               # client composition
  sections/*.tsx
  data.ts or data/*
  *-loader.css / tokens
```

Reference implementation: `src/components/agentic-ai/` + `/services/offshore-ai-development`.

## Scope rules from production incidents

1. **Never** wrap the whole site in loaders or Barba from `src/app/layout.tsx` unless the user explicitly demands a global system and accepts the risk.
2. Loaders are **page-scoped** and session-skippable.
3. Page transitions (Barba) are **opt-in per route family**, not default.
4. One ScrollTrigger pin chapter per page.

## Content policy

- Prefer copy from softreetechnology.com or existing repo content.
- Mark gaps as `CONTENT_GAP` — do not fabricate.
- Prefer en-dash or comma over em-dash spam in UI copy when matching prior page-1 standards.

## Performance budgets (page level)

| Budget | Target |
| --- | --- |
| Heavy pins | ≤ 1 |
| Scroll-linked blur | 0 |
| Intro loader | ≤ 1.3s + exit, session once |
| Client islands | only interactive sections |
| LCP | hero text visible in HTML; loader overlays, does not blank text |
