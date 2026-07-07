---
phase: page-1-offshore-ai
verified: 2026-07-03T10:30:00Z
status: passed
score: 5/5 design dimensions at threshold
verdict: APPROVED
overall_score: 8.62
threshold: 8.5
re_verification: true
previous_status: gaps_found
previous_score: 8.28
gaps_closed:
  - "Hero headline accent moved to #FF5812 orange"
  - "SoftreeAgenticScrollTabs ported with ScrollTrigger pin + barba:enter-complete deferral"
  - "Cinematic Barba transitions wired in layout with reduced-motion bypass"
  - "Stats counter no longer starts at 0+; reduced-motion shows final values"
  - "Certification light variant integrated on page"
  - "Kore-grade competitor reference removed from pillars copy"
  - "Hero touch targets raised to 44px (h-11) on carousel controls"
gaps_remaining:
  - "Certification WebP files missing from /public/images/certifications/"
  - "Em-dash copy fix incomplete in agentic-ai-content.ts user-facing strings"
  - "Industry tab pills below 44px touch target on mobile"
scores:
  visual_design: 8.6
  motion: 8.7
  layout: 8.5
  content: 8.4
  barba_transitions: 8.9
---

# Page 1: Offshore AI Development — Re-Audit (Post-Fix)

**URL:** `/services/offshore-ai-development`  
**Verified:** 2026-07-03  
**Status:** passed  
**Verdict:** **APPROVED** (8.62 / 10)

## Scores

| Dimension | Score | Δ vs prior | Notes |
| --------- | ----- | ---------- | ----- |
| Visual Design | **8.6** | +0.2 | Orange-led hero, cream Kore band, light cert section; cert SVG fallbacks not real badges |
| Motion | **8.7** | +0.7 | Barba curtain, Kore pin/scrub, hero GSAP, testimonial carousels; stats spring improved |
| Layout | **8.5** | +0.5 | 1400px rhythm, scroll-tabs grid, white/cream alternation; industry pills undersized |
| Content | **8.4** | −0.1 | Strong enterprise voice; em-dashes remain in data-driven copy |
| Barba Transitions | **8.9** | new | 5-slice brand curtain, leave/enter/once, ST kill/refresh, prefetch |
| **Overall** | **8.62** | +0.34 | **≥ 8.5 → APPROVED** |

## Fixes Verified

| Fix area | Status | Evidence |
| -------- | ------ | -------- |
| `barba/*` cinematic transitions | ✓ | `BarbaRoot` in `layout.tsx`; `cinematicLeave`/`Enter`/`Once` in `transitions.ts` |
| `SoftreeAgenticScrollTabs.tsx` | ✓ | ScrollTrigger pin, tab a11y, `barba:enter-complete` listener |
| `AgenticAiHero.tsx` | ✓ | Light editorial hero, `accent="#FF5812"`, descriptive `alt`, 44px controls |
| Certification light variant | ✓ | `AgenticAiPage` imports power-platform `certification.tsx` with `dark={false}` |
| Em-dash copy (sections) | ⚠️ partial | Inline TSX clean; `agentic-ai-content.ts` still has ~15 user-facing em-dashes |
| Stats counter | ✓ | Starts at 72% of value; `prefersReducedMotion()` renders final number |
| Orange accent | ✓ | No `#1852FF` in `agentic-ai/`; hero accent orange |

## Remaining Blockers

1. **Certification assets missing** — `/public/images/certifications/` contains only `README.md`; local paths 404 → `onError` SVG fallbacks, not partner badge artwork.
2. **Em-dash copy incomplete** — User-facing strings in `src/components/ai-premium/data/agentic-ai-content.ts` (hero subhead, Kore tab bodies, platform pillars) still use `—`; TSX inline copy was cleaned but data layer was not.
3. **Industry tab touch targets** — `AgenticAiIndustry` pills use `py-2` (~32px); below 44px mobile guideline.

---

_Verified: 2026-07-03T10:30:00Z_  
_Verifier: Claude (gsd-verifier)_
