# Barba Intro Transition Pass

## Scope

- Added `SoftreeAgenticIntroTransition` as a page-scoped loader for `/agentic-ai-platform`.
- Used the hero background asset as the loader background so the fade into the hero is visually continuous.
- Added Barba-compatible `data-barba="wrapper"` and `data-barba="container"` attributes to the page shell.
- Dynamically initializes `@barba/core` for this route's once lifecycle and keeps normal navigation outside Barba control.
- Added animated typewriter copy, loader progress line, hero background handoff, and falling hero text reveal.
- Respects `prefers-reduced-motion` by skipping the heavy animation and revealing the hero immediately.

## Verification

- Route: `curl.exe -I http://localhost:3000/agentic-ai-platform` returned `200 OK`.
- File-scoped diagnostics: Cursor lints reported no errors for `SoftreeAgenticIntroTransition.tsx` and `SoftreeAgenticPage.tsx`.
- ESLint: `npx eslint "src/components/softree-agentic-exact/SoftreeAgenticIntroTransition.tsx" "src/components/softree-agentic-exact/SoftreeAgenticPage.tsx"` passed.
- Browser runtime: Barba wrapper/container present, loader removed after intro, `softree-agentic-intro-complete` set, scroll lock removed, hero heading opacity `1`, transform `none`.
- Browser console: no warnings or errors after the intro pass.
- Screenshot: `.planning/page-forge/softree-agentic-exact/barba-intro-final-hero.png`.

## Notes

- `npm run lint` currently fails because the project script uses `next lint`, which this installed Next CLI interprets as an invalid project directory (`...\\lint`). Direct ESLint was used for changed-file verification.
