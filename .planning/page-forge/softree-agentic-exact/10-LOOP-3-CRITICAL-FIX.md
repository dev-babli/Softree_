# Loop 3 — Critical fixes (user-reported)

## Root causes found

1. **Loader could leave page stuck** in `kore-ai-intro-running` — hero copy hidden, scroll locked, hero bg appeared missing under overlay.
2. **Scroll reveals only ran on partial middle selectors** — many `[data-scroll]` elements never received `.on`, so Webflow CSS kept them invisible.
3. **Hero background** could be suppressed by `[data-unscale]` rules during intro.
4. **Copy patches failed** because HTML used `<em>agentic era</em>` markup, not plain text.

## Fixes applied

| File | Fix |
| --- | --- |
| `SoftreeAgenticIntroTransition.tsx` | Shorter Softree intro, 6s hard stop, session skip, reliable `completeIntro()` |
| `softree-agentic-page-fix.css` | Hero bg always visible; intro-complete unhides hero; middle reveal safety |
| `SoftreeAgenticPage.tsx` | Page-wide reveal observer; body bg reset; fix CSS import |
| `softreeAgenticHtmlCopy.ts` | Regex/HTML-aware Softree copy for programmable + pillars |
| `SoftreeAgenticHeroSection.tsx` | Softree hero copy + `/contact` CTA |
| `SoftreeAgenticOutcomesSection.tsx` | Softree outcomes copy |
| `SoftreeAgenticAgentsSection.tsx` | Softree agents copy |
| `page.tsx` | Softree metadata |

## Re-test checklist

- [ ] Hard refresh with sessionStorage cleared — loader exits < 6s
- [ ] Hero background image visible during and after intro
- [ ] Middle sections readable when scrolled (agents, programmable, pillars)
- [ ] Softree copy visible in hero + middle patches

**Status:** FIXES SHIPPED — awaiting user visual confirmation. Loop does NOT approve until user confirms.
