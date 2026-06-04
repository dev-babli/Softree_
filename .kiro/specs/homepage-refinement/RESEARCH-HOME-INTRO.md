# Home Intro Unified Section — Research (2026-06-03)

Deep research synthesis for merging **logo marquee + About us + What we do (3 pillars + glass cards)** into one post-hero component. Showcase: `/showcase/home-intro`.

---

## 1. Reference: [Avoora](https://avoora.webflow.io/) (Softree About DNA)

From [Avoora Webflow template](https://webflow.com/templates/html/avoora-website-template) and live Home A:

| Zone | Content | Job |
|------|---------|-----|
| Hero | Studio positioning, CTAs, service index 01–05 | Outcome + scope |
| Logo marquee | Dual lane, white tiles | Immediate trust |
| About band | “ABOUT US”, one-line promise, READ MORE | Brand story (short) |
| Stats | $74M, 95%, +225, 92% | Quantified credibility |
| Featured work / Expertise | Numbered services with imagery | Proof of craft |

**Takeaway for Softree:** Marquee and About are **separate beats** in one scroll chapter, not three homepage sections. Stats optional but high impact on Avoora.

---

## 2. B2B / enterprise conversion research

| Source | Finding |
|--------|---------|
| [Brand Vision — 200+ homepages](https://www.brandvm.com/post/homepage-layouts-that-convert) | Client logos **immediately below hero**; trust near CTAs lifts conversion up to ~42% when placed at hesitation points |
| [Discovered Labs](https://discoveredlabs.com/blog/home-page-conversion-optimization-turning-visitors-into-qualified-leads) | Primary trust signal **below value proposition**; specific badges beat generic logo walls |
| [UXPin — corporate design](https://www.uxpin.com/studio/blog/corporate-website-design-examples/) | Salesforce pattern: headline → **customer logos** → product cards |
| [Superside — enterprise landing](https://www.superside.com/blog/landing-pages-for-enterprises) | Modular homepage: hero + proof + offer + use-case; trust **prominent, not buried** |
| [KrishaWeb / DesignRevision](https://www.krishaweb.com/blog/saas-homepage-conversion-best-practices/) | Sequence: hero → social proof → features/outcomes → testimonials |

---

## 3. Kore.ai reference (in-repo)

`.kiro/specs/kore-homepage-clone/requirements.md`:

`Hero` → **`Industry_Tabs`** (logo Swiper + industry segmentation) → `Business_Outcomes` …

**Takeaway:** Trust + **segmentation** in one block right after hero — maps to Variant C (marquee-first band).

---

## 4. Webflow agency template patterns

| Template | Pattern |
|----------|---------|
| [Siv Agency](https://www.flowradar.com/templates/digital-agency-portfolio-webflow-template-siv-agency) | Hero → **split logo marquee** → large about → portfolio |
| [Circle Flow](https://www.flowradar.com/templates/creative-agency-webflow-template-circle-flow) | About text → **client logo bar** → services |
| [Growth Creative](https://www.flowradar.com/templates/one-page-digital-agency-webflow-template-growth-creative) | Hero → about → portfolio → features → **client logos** |

Agency templates consistently bundle **trust + story + services** in the first 2–3 viewport heights.

---

## 5. Softree asset mapping

| Unified zone | Production source |
|--------------|-------------------|
| Logo marquee (light) | `AboutClientLogos` / new `LogoMarqueeLight` |
| About teaser | Short copy from About narrative + `/about-us` |
| Pillars + glass cards | `ClarityControlSection` exports: `ClarityPillarRow`, `ClarityGlassCardGrid` |
| Surface / tokens | `#F3F0EE`, `#FF5812`, `SectionHeader`, `@/lib/motion` |

**Do not** embed dark `TrustedBy` inside the cream unified block.

---

## 6. Three showcase variants

### Variant A — Conversion stack (recommended default)

`Header (What we do + About side) → Marquee → Stats grid → Pillars → Glass cards`

- Aligns B2B research + Salesforce/UXPin hierarchy
- Best for procurement-led Microsoft partner buyers

### Variant B — Avoora editorial

`About center → Marquee → What we do headline → Pillars → Glass cards`

- Matches [Avoora Home A](https://avoora.webflow.io/) story-first rhythm
- Best when hero is already dense on proof

### Variant C — Kore trust-first

`Marquee band → Inline stats → Header + About → Pillars → Glass cards`

- Matches Kore Industry_Tabs “trust immediately”
- Best for cold traffic / paid landing continuity

---

## 7. Implementation status

- Showcase page: `src/app/showcase/home-intro/page.tsx`
- Components: `src/components/showcase/home-intro/Variant*.tsx`
- Shared: `src/components/showcase/home-intro/shared/*`
- Exports: `ClarityPillarRow`, `ClarityGlassCardGrid`, `useClarityCardParallax` from `ClarityControlSection.tsx`

**Next step (requires approval):** Promote winning variant to `HomeIntroUnifiedSection` and replace `ClarityControlSection` mount on `home-page.tsx`.
