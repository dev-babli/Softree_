---
phase: page-1-offshore-ai
verified: 2026-07-03T06:25:00Z
status: gaps_found
score: 8/10 must-haves verified
verdict: REJECTED
overall_score: 8.28
threshold: 8.5
scores:
  design: 8.4
  usability: 8.0
  creativity: 8.2
  content: 8.5
gaps:
  - truth: "Proof stats display correct values when section is in view"
    status: partial
    reason: "Counter animates from 0+ over ~8s with no SSR or reduced-motion fallback; fast scrollers see wrong numbers"
    artifacts:
      - path: "src/components/agentic-ai/sections/AgenticAiStats.tsx"
        issue: "useSpring counter starts at 0; no prefersReducedMotion bypass"
    missing:
      - "Render final stat values in SSR or set spring immediately when prefers-reduced-motion"
      - "Speed up spring or show static values until animation completes"
  - truth: "Certification logos load without network errors"
    status: failed
    reason: "All 6 wp-content certification images return HTTP 403 in dev"
    artifacts:
      - path: "src/components/sections/certification.tsx"
        issue: "Remote softreetechnology.com/wp-content URLs blocked"
    missing:
      - "Host certification assets in /public and reference locally"
  - truth: "Orange #FF5812 accent meets design-brief prominence"
    status: partial
    reason: "Blue #1852FF references (~164) dominate orange (~83) in markup; hero headline accent is blue not orange"
    artifacts:
      - path: "src/components/agentic-ai/sections/AgenticAiHero.tsx"
        issue: "headlineAccent uses #1852FF; orange only on cycling word inside dark stage"
    missing:
      - "Rebalance SectionHeader accents and hero headline toward #FF5812 per DESIGN-BRIEF"
human_verification:
  - test: "Scroll quickly through Proof in numbers section"
    expected: "100+, 75+, 30+, 13+ visible without long wait at 0+"
    why_human: "Spring animation timing varies by device and scroll speed"
  - test: "Compare visual rhythm to /about-us at 1440px"
    expected: "Matching editorial cadence, cream/white alternation, SpotlightCard craft"
    why_human: "Subjective design-language parity"
---

# Page 1: Offshore AI Development — Verification Report

**URL:** `/services/offshore-ai-development`  
**Stack under test:** `src/components/agentic-ai/` (About Us design language)  
**Verified:** 2026-07-03  
**Status:** gaps_found  
**Verdict:** **REJECTED** (overall 8.28 / 10 — below 8.5 threshold)

## Executive Summary

The page successfully migrated off the old `ai-premium/` navy stack to the light About-Us-style `agentic-ai/` component system. `NavigationClient`, `Footer`, `LightContactSection`, and `LightFAQExact` are wired and present. `proofStats` data is correct (13+ years, 30+ countries). However, the build falls short of the ≥8.5 Awwwards-style bar due to a slow stats counter UX bug, certification image 403 errors, underweighted orange accent vs design brief, and several polish/a11y defects.

---

## Viewport Verification

| Viewport | Loaded | Layout | Notes |
| -------- | ------ | ------ | ----- |
| 1440×900 | ✓ | ✓ | Light hero + dark cinematic stage; h1 scales to 96px; section max-width ~1400px |
| 768×1024 | ✓ | ✓ | Hero stacks; industry tabs wrap; stats 2×2 grid |
| 390×844 | ✓ | ⚠️ | h1 at 40px fits; several touch targets &lt;44px (nav 40×40, testimonial arrows 32×32, text links 20px tall) |

**Console (current page tab only):** 0 JavaScript errors on navigation. 1 warning (PostHog key missing — expected in dev). **6 network errors** when certifications section loads (403 on all wp-content badge images).

---

## Awwwards-Style Scores

| Category | Score | Rationale |
| -------- | ----- | --------- |
| **Design** | **8.4** | Strong About Us alignment: white/cream sections, `SectionHeader`, `SpotlightCard`, `AboutClientLogos` marquee. Intentional dark hero stage matches AvooraHero pattern. Deductions: blue-heavy accent ratio, generic cert grid, long white/cream homogeneity. |
| **Usability** | **8.0** | Clear IA, working CTAs, FAQ accordion, contact form. Deductions: stats show `0+` until slow spring completes, undersized mobile touch targets, empty `alt` on key images. |
| **Creativity** | **8.2** | Cycling Microsoft-stack words, spotlight cards, platform showcase tabs, testimonial carousel. Solid craft, not award-tier novelty. |
| **Content** | **8.5** | Enterprise agentic AI copy, industry tabs, services accordion, corrected proof stats. Minor: "Kore-grade" competitor reference in pillars body. |
| **Overall** | **8.28** | **Below 8.5 threshold → REJECTED** |

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
| --- | ----- | ------ | -------- |
| 1 | Page uses `agentic-ai/` not `ai-premium/` navy stack | ✓ VERIFIED | `page.tsx` imports `AgenticAiPage`; no `AiPremium` classes in DOM |
| 2 | About Us design language (light hero, SectionHeader, SpotlightCard) | ✓ VERIFIED | `AgenticSection` → `SectionHeader`; `SpotlightCard` in hero/pillars/why |
| 3 | Nav, Footer, LightContactSection, LightFAQExact unchanged | ✓ VERIFIED | Present in `page.tsx` / `AgenticAiPage.tsx`; contact h2 + FAQ "question 01" in DOM |
| 4 | proofStats: 13+ years, 30+ countries | ✓ VERIFIED | After animation: `100+`, `75+`, `30+`, `13+` in `AgenticAiStats` |
| 5 | No full-page navy/purple hero (old stack ban) | ✓ VERIFIED | Page `bg-white`; dark only in hero stage card `#0a0a1a` |
| 6 | Orange #FF5812 accent per design brief | ⚠️ PARTIAL | Orange on cycling word, progress bar, stars; blue dominates badges/headlines |
| 7 | Certification section renders logos | ✗ FAILED | 6× HTTP 403 on wp-content images (fallback SVGs may show after onError) |
| 8 | Stats readable on scroll into view | ⚠️ PARTIAL | Shows `0+` for ~5–8s; final values correct only after spring settles |
| 9 | Zero console errors on page load | ✓ VERIFIED | 0 JS errors; network errors on cert images when section reached |
| 10 | Mobile usability (44px touch targets) | ✗ FAILED | Multiple interactive elements below 44px at 390px width |

**Score:** 8/10 truths fully verified

---

## Required Artifacts

| Artifact | Expected | Status | Details |
| -------- | -------- | ------ | ------- |
| `src/app/services/offshore-ai-development/page.tsx` | Route shell + preserved chrome | ✓ VERIFIED | Uses `AgenticAiPage`, `NavigationClient`, `Footer` |
| `src/components/agentic-ai/AgenticAiPage.tsx` | Section orchestration | ✓ VERIFIED | 12 agentic sections + shared About/light components |
| `src/components/agentic-ai/sections/*.tsx` | Light editorial sections | ✓ VERIFIED | 11 section files, substantive implementations |
| `src/components/agentic-ai/primitives/AgenticSection.tsx` | SectionHeader wrapper | ✓ VERIFIED | Wired to `homepage-light/SectionHeader` |
| `src/components/agentic-ai/data.ts` | Content re-export | ⚠️ PARTIAL | Re-exports from `ai-premium/data/agentic-ai-content` (coupling) |

---

## Key Link Verification

| From | To | Via | Status |
| ---- | -- | --- | ------ |
| `page.tsx` | `AgenticAiPage` | import + render | ✓ WIRED |
| `AgenticAiPage` | `LightContactSection` | import + render | ✓ WIRED |
| `AgenticAiPage` | `LightFAQExact` | `faqs` prop | ✓ WIRED |
| `AgenticAiStats` | `proofStats` | `../data` | ✓ WIRED |
| `Certifications` | wp-content images | `certification.tsx` src URLs | ✗ NOT_WIRED (403) |

---

## Numbered Defects

| # | Severity | Defect | Owning fix area |
| --- | -------- | ------ | --------------- |
| 1 | **Blocker** | Proof stats render `0+` until slow spring animation (~8s); no reduced-motion/static fallback | `src/components/agentic-ai/sections/AgenticAiStats.tsx` |
| 2 | **Major** | All 6 certification badge images fail HTTP 403 from wp-content URLs | `src/components/sections/certification.tsx` + `/public` assets |
| 3 | **Major** | Orange `#FF5812` underrepresented vs blue `#1852FF` (2:1 ratio); hero headline accent is blue | `agentic-ai/sections/*` accent props, `AgenticAiHero.tsx` |
| 4 | **Minor** | "Kore-grade platform thinking" competitor name in pillars copy | `agentic-ai-content.ts` / `AgenticAiPillars.tsx` |
| 5 | **Minor** | Hero, platform showcase, accordion images use `alt=""` | `AgenticAiHero.tsx`, `AgenticAiPlatform.tsx`, `AgenticAccordion.tsx` |
| 6 | **Minor** | Mobile touch targets below 44px (nav menu 40×40, carousel arrows 32×32, "View AI case studies" 20px height) | `AgenticAiHero.tsx`, `navigation-client`, shared buttons |
| 7 | **Info** | 12 orphaned files in `src/app/services/offshore-ai-development/` (old hero, faq, etc.) not imported | Cleanup `offshore-ai-development/` dead files |
| 8 | **Info** | Content data still coupled to `ai-premium/data/agentic-ai-content.ts` | `src/components/agentic-ai/data.ts` |
| 9 | **Info** | Next.js Image warnings: logo aspect ratio, hero LCP `loading="eager"` suggestion | `AgenticAiHero.tsx`, nav logo |
| 10 | **Info** | PostHog key missing warning (dev-only) | env config — not page-specific |

---

## Anti-Patterns Found

| File | Pattern | Severity | Impact |
| ---- | ------- | -------- | ------ |
| `AgenticAiStats.tsx` | Animated counter with no static/SSR fallback | 🛑 Blocker | Users see `0+` for engineers/countries/years |
| `certification.tsx` | Remote hotlinked images without local fallback path | ⚠️ Warning | Broken badges + console 403 errors |
| `AgenticAiPillars.tsx` | Competitor brand name in body copy | ℹ️ Info | Off-brand for Softree editorial voice |
| `offshore-ai-development/*.tsx` (12 files) | Dead code from pre-migration | ℹ️ Info | Maintenance confusion |

---

## Human Verification Required

### 1. Proof stats scroll behavior

**Test:** Scroll to "Proof in numbers" at normal reading speed.  
**Expected:** `100+`, `75+`, `30+`, `13+` visible within 1–2 seconds of section entering viewport.  
**Why human:** Spring stiffness/damping feel varies; programmatic scroll showed 8s to final values.

### 2. About Us visual parity

**Test:** Open `/about-us` and `/services/offshore-ai-development` side-by-side at 1440px.  
**Expected:** Matching badge pills, cream `#F8F9FC` bands, SpotlightCard elevation, editorial spacing.  
**Why human:** Subjective craft judgment.

### 3. Certification fallback appearance

**Test:** Scroll to Certifications section with network throttling.  
**Expected:** Either real badge artwork or polished fallback icons — not broken image icons.  
**Why human:** onError fallback timing is visual.

---

## Gaps Summary

The architectural migration goal is **achieved**: the page runs on `agentic-ai/` with About Us qc/homepage-light patterns and preserved nav/footer/contact/FAQ. Content stats are **correct in data** but **degraded in UX** by the animated counter. Certification assets are **broken at the network layer**. Design brief orange accent is **present but subordinate** to blue. Overall craft is **good enterprise editorial** but **not yet Awwwards-grade** at ≥8.5.

**Recommendation:** Fix defects #1–#3, then re-verify. Approve after overall score ≥8.5.

---

_Verified: 2026-07-03T06:25:00Z_  
_Verifier: Claude (gsd-verifier)_
