# Homepage refinement workflow

Single source of process for refining `src/app/home-page.tsx` **one component at a time**. No section order changes and no new components without explicit user approval.

---

## Rules (non‑negotiable)

1. **Permission gate** — After each component: present summary → **wait for explicit approval** (“approved”, “next”, or listed fixes). Do **not** open the next file or reorder sections without that reply.
2. **Refinement, not redesign** — Preserve architecture, scroll stories, GSAP pins, and About Us light DNA (`#F3F0EE`, `#FF5812`, `#0a0a1a`, `SectionHeader`, `@/lib/motion`).
3. **Research before structure changes** — If the task touches **what section comes below the hero** (or any reorder), complete **Phase R** below and share findings **before** editing `home-page.tsx`.
4. **One component per pass** — Analyze → implement → verify lints → stop.

---

## Phase R — Post‑hero section research (required when reordering)

Run this when the user asks which component should sit below the hero, or before moving `TrustedBy`, `ClarityControlSection`, etc.

### Sources to consult

| Source | What to extract |
|--------|------------------|
| **B2B / SaaS conversion research** (2024–2026) | Typical sequence: hero → **social proof** → outcome/features → proof/testimonials → pricing/FAQ → CTA |
| **Microsoft partner / consultancy patterns** | Hero (outcome + one CTA) → **credentials / logo bar** → services → case proof → process → CTA |
| **Kore.ai reference** (`public/kore-source-sections.html`, `.kiro/specs/kore-homepage-clone/requirements.md`) | After Hero: **Industry_Tabs** (Swiper logo marquee by vertical) — trust + segmentation, not a long editorial block |
| **Current Softree stack** (`home-page.tsx`) | Inventory: what each section does (trust, pillars, services, product, etc.) |

### Document in the approval message

- **Recommended slot #1 below hero** (with rationale: buyer psychology + reference + fit for Softree).
- **Alternatives** (e.g. keep editorial pillars first if brand story is the priority).
- **Current vs recommended** table (order only — no code until approved).
- **Risks** (e.g. moving `TrustedBy` up may duplicate proof if hero already shows logos).

### Research synthesis (Softree — last updated 2026‑06‑03)

**Consensus (B2B SaaS + consultancy):**

1. **Hero** — outcome headline, who it’s for, one primary CTA, optional light proof in fold.
2. **Immediate trust** — logo bar / “Trusted by” / Microsoft partner badges **within one scroll** of hero (highest trust density; ~15–25% conversion lift when visible before scroll on landing patterns).
3. **Value / scope** — 3–4 outcome pillars or “what we do” (maps to **ClarityControlSection**).
4. **Services / capabilities** — practice cards (maps to **SupportPartners** / stacked services).
5. **Product proof** — demos, features, case studies, testimonials (deeper in page).
6. **Closing** — FAQ, contact, repeat CTA.

**Kore.ai clone order (reference only):**  
`Hero` → `Industry_Tabs` (logo marquee + industry tabs) → `Business_Outcomes` → …  
→ not the same as Softree’s editorial three‑card block, but same **job**: trust + segmentation right after hero.

**Softree today (`home-page.tsx`):**

| Order | Component | Role |
|------:|-----------|------|
| 1 | `TransferredSoftreeHero` | Hero |
| 2 | `ClarityControlSection` | Editorial “what we do” + 3 glass cards |
| 3 | `SupportPartners` | Core engineering services grid |
| 4+ | `ServicesStackedSlides`, `FeaturesShowcase`, … | Deeper product / proof |
| — | `TrustedBy` | Logo marquee (**currently after FeaturesShowcase**) |

**Recommendation (for discussion — not implemented):**

- **Primary:** Move **`TrustedBy`** to **position #2** (directly under hero) to match conversion research and Kore’s “logo marquee” beat.
- **Then:** **`ClarityControlSection`** (#3) — outcome pillars; keep glass card geometry per reference.
- **Then:** **`SupportPartners`** (#4) — service verticals once trust + scope are established.

**Alternative:** Keep **ClarityControl** at #2 if the hero is light on story and the three pillars are the main “trust bridge”; still add a **compact logo strip** in or immediately under the hero (requires separate approval).

**Action:** User must approve a target order before any `home-page.tsx` reorder.

---

## Phase R2 — Unified post‑hero block (trust + about + what we do)

Run when the user asks to **merge** logo marquee, About teaser, and Clarity pillars into **one** homepage section (instead of three separate mounts).

### Reference sites (2026‑06‑03)

| Site | Order after hero | Pattern |
|------|------------------|---------|
| **[Avoora](https://avoora.webflow.io/)** (Softree About DNA) | Hero → service pills + founder → **dual logo marquee** → **“ABOUT US”** + tagline + READ MORE → **stats strip** → Featured Work → **Our Expertise** (5 numbered services w/ imagery) | Trust **before** long about copy; about is **one band** not a full page; expertise is **separate** from hero pills |
| **Kore.ai** (clone spec) | Hero → **Industry_Tabs** (marquee + tabs) | Trust + **segmentation** in one interactive block |
| **B2B SaaS research** | Hero → logo bar → outcomes → services | Trust within one scroll ([KrishaWeb](https://www.krishaweb.com/blog/saas-homepage-conversion-best-practices/), [DesignRevision](https://designrevision.com/blog/b2b-saas-landing-pages)) |
| **Webflow agency templates** (Siv, Circle Flow, Growth Creative) | Hero → about **or** metrics card → **client logo bar** → services/portfolio | Often **one scroll chapter** before deep portfolio ([FlowRadar summaries](https://www.flowradar.com/templates/creative-agency-webflow-template-circle-flow)) |

### Softree assets to compose (do not duplicate dark `TrustedBy` on cream)

| Job | Existing module | Notes |
|-----|-----------------|-------|
| Logo marquee (light) | `AboutClientLogos.tsx` | Dual lane, cream `#fafaf9`, white logo tiles — **matches Avoora + About page** |
| Logo marquee (dark) | `trusted-by.tsx` | Keep for **later** dark band on homepage — **not** inside unified light section |
| About teaser | `LightAboutMerged.tsx` (About page) | Extract **short** copy + `READ MORE` → `/about-us` — not full spotlight stack |
| What we do + glass cards | `ClarityControlSection.tsx` | `SectionHeader`, `COLUMNS` intro, 400/350 card geometry |

### Recommended unified section: `HomeIntroUnifiedSection`

**One** `data-section="home-intro-unified"` on surface `#F3F0EE`, replacing separate mounts of `ClarityControlSection` + post‑hero marquee + (no second about block).

#### Layout — **Variant A (recommended: Avoora + conversion)**

Vertical zones inside one section (single scroll chapter):

```
┌─────────────────────────────────────────────────────────┐
│ Z1  SectionHeader  badge "What we do"  accent #FF5812   │
│     H2 + optional right column: About teaser (2–3 lines) │
│     Link: Read more about us → /about-us                 │
├─────────────────────────────────────────────────────────┤
│ Z2  Logo marquee — compact (dual lane from AboutClient)  │
│     No second H2; optional micro label "Trusted by"      │
│     py-10–12 (not full AboutClientLogos py-24)           │
├─────────────────────────────────────────────────────────┤
│ Z3  Three pillar rows (existing COLUMNS copy)            │
│     border-t hairline                                    │
├─────────────────────────────────────────────────────────┤
│ Z4  Three glass + Grainient cards (unchanged geometry)   │
└─────────────────────────────────────────────────────────┘
```

**Why this order:** B2B research wants **logos immediately after hero**; Avoora puts marquee **before** the ABOUT headline block; pillars + cards deliver “what we do” **after** trust is established.

#### Layout — **Variant B (editorial-first)**

Z1 About teaser centered → Z2 marquee → Z3/Z4 cards. Use only if hero is thin on story.

#### Optional Z5 (Avoora stats — separate approval)

4‑up metrics (`$74M`-style) between Z2 and Z3 — pull from `LightAboutMerged` / About stats, **not** required for v1.

### Implementation plan (after user approval only)

1. Create `src/components/sections/HomeIntroUnifiedSection.tsx` (or rename `ClarityControlSection` in place).
2. Extract `LogoMarqueeLight` from `AboutClientLogos` (lanes + `PARTNERS` list) into `src/components/homepage-light/LogoMarqueeLight.tsx` — shared with About page.
3. Move card visuals + `COLUMNS` + geometry constants into same file or `home-intro/ClarityCards.tsx`.
4. `home-page.tsx`: replace `<ClarityControlSection />` with `<HomeIntroUnifiedSection />`; **remove** duplicate later `TrustedBy` **or** keep dark `TrustedBy` deeper as second proof pass (user choice).
5. One Phase 1 approval for the **unified** component, not three separate passes.

### Anti‑patterns

- Stacking **dark** `TrustedBy` + **light** marquee in the same unified section (two visual systems).
- Full `LightAboutMerged` globe/spotlight stack inside homepage intro (too heavy; belongs on `/about-us`).
- Tying outer card height to inner glass height (see geometry rules below).

**Action:** User picks **Variant A or B**, optional Z5, and approves file rename vs new component before any code.

### Showcase (built 2026-06-03)

Compare all three variants live:

- **URL:** `/showcase/home-intro`
- **Research doc:** `.kiro/specs/homepage-refinement/RESEARCH-HOME-INTRO.md`
- **Components:** `src/components/showcase/home-intro/VariantA|B|C*.tsx`

---

## Phase 1 — Per‑component pass

For component `N`:

1. **Read** — component file, styles, motion hooks, `SectionHeader` / tokens.
2. **Audit** — typography, spacing, motion (`@/lib/motion`), a11y, reduced motion, slop patterns.
3. **Implement** — minimal diff; document geometry constants (e.g. card layers) in file comments.
4. **Verify** — `ReadLints` on touched files.
5. **Stop** — summary + screenshots checklist for user; **no next component**.

### Component queue (homepage order)

| # | Component | File | Status |
|---|-----------|------|--------|
| 1 | Hero | `TransferredSoftreeHero.tsx` | User iterations; confirm approval |
| 2 | Home intro unified (proposed) | `HomeIntroUnifiedSection.tsx` ← merge marquee + about teaser + `ClarityControlSection` | **Research done** — awaiting variant + build approval |
| 2b | Clarity & control (legacy) | `ClarityControlSection.tsx` | Geometry fix 2026‑06‑03; **awaiting approval** or superseded by 2 |
| 3 | Core services | `support-partners.tsx` | Not started |
| 4+ | … | see `home-page.tsx` | Not started |

---

## ClarityControl card geometry (reference)

Do not tie outer height to inner height.

- **Outer:** 400×400 px square — Grainient only.
- **Inner (glass):** 350×350 px square — **top edge** at 50% of outer (200 px), **not** vertical center of glass at 50%.
- **Overflow:** 150 px below outer bottom → wrapper `padding-bottom: 37.5%` of width on **outer** group; glass `top: 50%` must be relative to **inner** `aspect-square` box only (not the padded wrapper).

---

## Approval template (copy per component)

```text
## Component [N]: [Name]

**Changed:** …
**Unchanged:** …
**Check on dev:** …

Reply: Approved | Fix: … | Revert: …
```
