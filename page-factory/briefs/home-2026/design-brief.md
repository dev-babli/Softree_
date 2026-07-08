# Design Brief — Homepage Rebuild ("home-2026")

> Route: `/` (building to preview route `/home-2026`) · Slug: `home-2026`
> Author: design-researcher · Date: 2026-07-04
> Inputs: `page-factory/research/design-trends-2026.md` (generated 2026-07-03, fresh — no web refresh needed),
> `page-factory/research/codebase-map.md`, `page-factory/LEARNINGS.md`, `src/app/home-page.tsx`.
> **Reference status**: `page-factory/design-references/` contains only `README.md` and the template
> `urls.md` — **no user-supplied references exist**. This brief therefore leans on the 2026 trend
> research, the codebase map, and the strongest patterns already shipped on the site (the case-study
> scrollytelling variants, the pinned hero, the sticky services list). When user references arrive,
> re-run intake and diff against this brief.

---

## 1. Page goal & audience

The homepage must convert a skeptical technical buyer — CTOs, VPs of Engineering, and product
founders evaluating offshore engineering partners and AI delivery capability — in under 90 seconds
of scrolling. Softree's pitch is *engineering honesty*: senior offshore teams, real AI products
(Avoora), and shipped case studies as proof. The current homepage (`src/app/home-page.tsx`) makes
that case with 14+ sections that oscillate between dark (`#0a0a0a`) and cream (`#F3F0EE`) bands,
producing skeleton-flash risk, narrative sprawl, and no single memorable moment. The rebuild is a
tightening, not a reinvention: one dark cinematic canvas, roughly ten sections that read as chapters
(claim → capability → **proof** → model → invitation), one signature scroll moment, and metadata
texture that makes the page itself feel engineered. Success = the visitor can name what Softree does,
has seen real proof, and reaches the CTA without ever having been hijacked or bored.

## 2. Chosen trend synthesis

Adapting the research doc's recommended synthesis to Softree specifically. Three primary directions
(plus two supporting), chosen because they map 1:1 onto Softree's positioning:

1. **Type-as-Architecture (§1) — the voice.** No hero video, no 3D blob: a viewport-scaled Inter
   headline with SplitText masked line reveals carries the brand. Softree sells engineering
   confidence; type-first heroes signal exactly that, and keep LCP text-based (< 2s is trivially
   achievable). Current hero (`TransferredSoftreeHero`, GSAP pinned) already trends this way — the
   rebuild keeps the type-first DNA but drops the hero pin to spend the page's single pin budget on
   the signature moment.
2. **Tactile Brutalism / Engineered Rawness (§4) — the differentiator.** Mono indices (`01 / Offshore
   Engineering`), 1px hairlines on `rgba(255,255,255,0.1)`, timestamps/coordinates on the global
   section, 3–4% tiled-noise grain. For a company whose product IS engineering, this texture is
   literal honesty, and it's what separates the page from every dark Linear-clone.

   **The identity test (what a screenshot of this page has that v0.dev doesn't):** the **ember light
   system** — every glow on the page is the same warm `--softree-ember` light source, and in the
   signature chapter that light *travels*: its temperature shifts panel-to-panel with the scrub
   (see §7). Paired with the **indexed-story rail** (mono chapter indices `01—10` that run the full
   page, not just the proof strip, forming a persistent left-edge hairline rail on desktop), the
   page reads as one continuously lit, indexed engineering document. Dark + mono + hairlines is the
   genre; the traveling ember light + full-page index rail is the signature no Linear-clone has.
3. **Cinematic Scroll Narrative (§2) — the proof.** One pinned, scrubbed horizontal chapter for case
   studies — the single most persuasive asset Softree owns. This pattern is already proven in the
   codebase (`src/components/case-studies/layouts/variants/ai-horizontal-story` = pinned horizontal
   scroll), so this is promotion of an existing site strength to the homepage, not new invention.

Supporting: **Dark-first ambient gradients (§5)** — one warm accent-tinted glow used as *lighting*
behind key panels, replacing the current light/dark band flip-flop with a single dark canvas; and
**Micro-interaction density (§7)** — magnetic CTA, char-shuffle nav/index hovers, cursor-following
case-study previews — the cheapest Awwwards Usability+Design points available. All engineered to
**Performance-as-Aesthetic (§8)** targets (budget in §8 below).

Explicitly **not** chosen: Restrained 3D artifact (§3) and frame sequences (§6). A page gets one
signature; ours is the pinned proof chapter. Skipping R3F on this route saves the entire WebGL
payload and guarantees the perf budget.

## 3. Section-by-section skeleton (9 sections)

| # | Section (component) | Narrative role | Layout pattern | Motion pattern | Inspired by |
|---|---|---|---|---|---|
| 1 | `Hero2026` | The claim — "who we are in one breath" | Full-viewport type-as-architecture: display headline set on a **broken 3-row grid** (rows offset left/right, second key word in transparent fill + 1px `--softree-fg` stroke), mono metadata row (`OFFSHORE ENGINEERING / APPLIED AI / 140+ ENGINEERS / 24°51'N 67°00'E`), **quiet mono hero CTA** `→ START A CONVERSATION` (link-style, links `/contact`), hairline frame, ambient ember glow bottom-right. NOT pinned, NOT centered-h1-two-buttons. **Headline copy (the thesis, final):** `We build the offshore teams / that ship / real AI.` Subline: `Senior engineering pods in 2 weeks, run from our delivery hub — with applied-AI products like Avoora as proof we ship, not slideware.` | SSR-painted visible (LCP on first paint); SplitText hide+reveal happens inside `useLayoutEffect` after `document.fonts.ready` (no flash — see §8 build rules); masked lines `yPercent: 100→0`, EASE.silk 1.1s; headline block gets velocity-reactive `skewX` (max 3°, quickTo, IO-gated) off Lenis velocity | Trend §1 + §4; evolution of `TransferredSoftreeHero` |
| 2 | `SignalStrip` | Credibility pulse | Single-row ticker between hairlines: **real client logos, monochrome (white 55% opacity), hairline-framed cells**, interleaved with real numbers only (`140+ ENGINEERS`, `9 SERVICE LINES` — no simulated liveness). **The page's one marquee.** | CSS transform loop, paused offscreen via IntersectionObserver | §4; distills `KoreEnterpriseCarousel` marquees down to one |
| 3 | `Manifesto` | The thesis — why offshore + AI, stated plainly | Editorial two-column: oversized statement left (~60ch max), mono margin notes right. Server component. | Header line-reveal only (EASE.out 0.6s); body renders instantly | §1 editorial; anti-pattern rule "no vague premium copy" — copy must explain the model |
| 4 | `CapabilityIndex` | What we do — services as an engineer's index | Full-width indexed list rows (`01 / Offshore Engineering Teams` … `0n / Applied AI`), 1px dividers, each row expands a one-line proof stat; cursor-following thumbnail preview on desktop. **Each row links to its real service route** (`/services/offshore-web-development`, `/services/offshore-ai`, … — verify exact slugs in `src/app/services/` at build time). Tech-stack logos = one mono metadata line. | Row hover: char-shuffle label + **transform-based mask preview** (fixed-size overflow-hidden window, inner image counter-translated via `quickTo`) — desktop `pointer: fine` only, NO animated clip-path; no scroll animation on rows | §4 + §7; merges `ServicesStackedSlides` + 420vh `LightServicesStickyList` into one lean index |
| 5 | **`ProofChapter`** ★ SIGNATURE | The proof — case studies as a film strip, **with third-party voice folded in** | **The page's ONE pinned section**: horizontal scrub through 4 flagship case-study panels, each full-viewport — massive index numeral, outcome metric, art crop, **one-line client quote + mono attribution under the metric**, panel links to its real `/case-studies/<slug>` route; chapter progress rail (`01—04`) in mono. **Unique mechanic — the traveling ember**: one fixed ambient gradient layer behind the track whose color temperature interpolates with the same scrub progress (panel 1 ember `#ff7a2f` → panel 4 cool `#7ab8ff` at equal 7% opacity), so the page's identity light literally travels through the proof. | `ScrollTrigger` pin + `x: () => -(scrollWidth - innerWidth)`, `scrub: 0.75`, ease `none`; ember temperature driven by the SAME scrub timeline (CSS custom-property interpolation, no layout work); per-panel content reveals at panel center (no number counters) | §2; **pattern reference** (not lift-and-shift): `ai-horizontal-story`'s `useHorizontalScroll` hook + reduced-motion vertical fallback; replaces `HomepageCaseStudiesLazy` + absorbs testimonials |
| 6 | `AISpotlight` | The edge — applied AI & Avoora, **demonstrated not decorated** | Asymmetric split: ember glow lights **a contained Avoora demo artifact** — a fixed-height terminal-style card that plays ONE scripted real product exchange (query → streamed answer) once on section enter; replay on click; reduced-motion/mobile shows the completed state. Mono changelog-style capability list beside it. | Demo plays once on enter (IO-gated, fixed card height = zero CLS); glow parallax `yPercent: ±6` scrub; **micro-interaction: ember spotlight follows cursor over the card** (radial-gradient position via CSS vars, transform-only) | §5 lighting + product proof; the demo artifact is a permitted contained exception to the typewriter ban (it demonstrates the actual product, fixed-height, plays once) |
| 7 | `GlobalDelivery` | The model — offshore, mapped honestly | Dark band: flat-line world map (SVG, no hex globe), city markers with mono coordinates + timezone clocks, 3 stat columns; stats SSR'd; clocks = static SSR offset labels (`UTC+5`) + tiny client leaf that ticks after mount (no hydration mismatch) | Marker dots fade in staggered 0.08s on enter; **micro-interaction: marker hover expands a mono tooltip (office, timezone, headcount) + map drifts ≤ 8px toward cursor (transform-only)** | §4 metadata texture; leaner evolution of `GlobalClientNetwork` |
| 8 | `EngagementModels` | The how — three ways to hire us | Editorial **asymmetric** 3-card row (varying column spans — explicitly not a uniform bento), hairline borders, mono `MODEL A/B/C` tags | Cards reveal once, stagger `amount: 0.24`, EASE.out 0.6s; **micro-interaction: hover draws corner brackets (4 stroked spans scaling in, transform-only) + mono tag char-shuffle** | Anti-pattern list ("uniform bento = 2024"); dark evolution of `LightEngagementModels` |
| 9 | `FinalCTA` + existing `Footer` | The invitation | Full-viewport: display-scale "Let's build your team." + magnetic primary CTA on `--softree-accent`, mono contact metadata (email, offices, response SLA) | Headline line-reveal EASE.silk 0.9s; CTA magnetic `quickTo` 0.45s; footer untouched | §7; evolution of `LightContactSection`, moved fully dark |

> `VoicesOfProof` is **cut** — testimonial quotes + attributions fold into the `ProofChapter` panels
> (decision per judge panel: proof and voice belong in the same moment). Section count: **9**.
> Conversion paths: nav CTA persists site-wide; hero carries the quiet mono CTA; ProofChapter panels
> and CapabilityIndex rows deep-link to case studies/services; FinalCTA closes.

Cut from the current page (with reasons): `InfinityScrollAnimation`, `FeaturesShowcase`,
`EngineeringSolutions`, `TechStackSection`, `Gallery` + `AnimatedPhotoGallery`, `LightFAQExact`,
`VoicesOfProof` (folded into ProofChapter) — narrative duplicates of §4/§5/§6 or gallery filler.
Tech-stack logos become one mono metadata line inside `CapabilityIndex`. Every removal serves the
single-canvas, one-signature rule.

**Blocking follow-up tasks (do not silently drop content):**
1. FAQ content (`LightFAQExact`) MUST be added to `/contact` in the same effort — objection-handling
   content is business-critical.
2. Industry-coverage tabs (`KoreEnterpriseCarousel`) need a destination — fold the industry list
   into `/services` or a mono line in `GlobalDelivery`; decide at build, do not delete outright.
3. Verify founding year + HQ coordinates from real site content; hero metadata currently uses
   `140+ ENGINEERS / 24°51'N 67°00'E` — confirm both before ship.

## 4. Type system

Inter only (300–700), already loaded centrally — **no new font files**. Mono metadata uses the
system stack (`ui-monospace, "SF Mono", Menlo, monospace`) as a `.font-mono-meta` utility: zero
network cost, satisfies L-1's "no font imports in components".

| Token | Value | Use |
|---|---|---|
| `display-xl` | `clamp(3rem, 10vw, 9.5rem)` / line-height 0.95 / weight 600 / tracking -0.03em | Hero headline, FinalCTA |
| `display-l` | `clamp(2.25rem, 6vw, 4.5rem)` / 1.02 / 600 / -0.02em | ProofChapter panel numerals & metrics, Manifesto statement |
| `heading` | `clamp(1.75rem, 3.5vw, 2.75rem)` / 1.1 / 500 | Section headers (§4–§9) |
| `index-row` | `clamp(1.5rem, 3vw, 2.5rem)` / 1.15 / 400 | CapabilityIndex row labels |
| `body` | `1.0625rem` / 1.65 / 400, `rgba(255,255,255,0.55)` muted | All copy; renders instantly, never animated |
| `mono-meta` | `0.8125rem` / 1.4 / 400 / tracking +0.08em / uppercase | Indices, coordinates, tags, progress rail |

## 5. Color plan

`--softree-*` tokens only: `--softree-bg #0a0a0a` (canvas), `--softree-bg-darker #050505`
(ProofChapter + FinalCTA, giving the pin chapter its own depth), `--softree-surface-1 #141414` /
`--softree-surface-2 #1e1e1e` (cards), `--softree-border rgba(255,255,255,0.1)` (all hairlines),
muted text `rgba(255,255,255,0.55)`, accent `#ff7a2f` (CTA, active index, progress rail — accent is
*earned*, ≤ 5% of any viewport), hover `#e85a1f`, soft `rgba(255,122,47,0.12)` (tag pills).

**The one new supporting tint**: `--softree-ember: rgba(255,122,47,0.07)` — the ambient glow color
(radial/mesh gradient in Hero and AISpotlight), derived from the accent so Sanity runtime token
overrides (`fetch-design-tokens.ts`) cascade correctly. Grain: tiled noise PNG at 4% opacity on
glow sections only (prevents banding, L-2 compliant). **No light bands on this page** — skeleton
flash class of bugs eliminated by design; all `next/dynamic` skeletons are `#0a0a0a` or `#050505`.

## 6. Motion language

All easings from `src/lib/motion.ts` — no ad-hoc beziers (L-1).

| Context | Easing token | Duration / values |
|---|---|---|
| Hero + FinalCTA choreography | `EASE.silk` | 0.9–1.1s total; line stagger 0.09s, envelope ≤ 0.6s |
| Section header reveals (only headers) | `EASE.out` | 0.6s, `y: 24 → 0` + opacity |
| ProofChapter scrub | `none` | `pin: true, scrub: 0.75` — scrub IS the easing |
| Card/marker staggers | `EASE.out` | 0.5s, stagger `amount: 0.24` |
| Testimonial swap | exit `EASE.out` 0.4s → enter `EASE.silk` 0.6s | exit ≈ 2/3 entrance (L-2) |
| Magnetic CTA / cursor previews | `quickTo`, power3 | 0.4–0.6s continuous |
| Glow parallax | `none` scrub | `yPercent: ±6` max |

Lenis: existing provider only (never a second instance), `lerp: 0.1`, synced to GSAP ticker,
**native scroll on touch**. On touch, ProofChapter falls back to a native horizontal snap-scroll
track (no pin). Reduced motion: `gsap.matchMedia()` both contexts — reduced = opacity-only ≤ 300ms,
no pin, no parallax, marquee static; expose the manual motion toggle.

## 7. The ONE signature moment

**`ProofChapter` — the pinned horizontal case-study film strip with the traveling ember (section 5).**
Scroll pins the viewport and scrubs (0.75) laterally through four flagship case studies, each a
full-viewport poster panel: a display-scale index numeral, one hard outcome metric, one art crop,
a one-line client quote + mono attribution, a deep link to the case study, and a mono progress rail
`01—04` that fills with `--softree-accent`. **The unique mechanic** — what makes this NOT the 2026
template — is the traveling ember: the page's single ambient light source sits fixed behind the
track, and the SAME scrub timeline interpolates its color temperature panel-to-panel (warm ember
`#ff7a2f` → cool `#7ab8ff`, constant ~7% opacity), so progressing through the proof physically
shifts the light of the whole viewport. Velocity of the scrub adds ≤ 2° skew to the index numerals
(quickTo, transform-only). Native scroll physics throughout — the user can bail at any moment.

Implementation reference (NOT lift-and-shift): `ai-horizontal-story`'s `useHorizontalScroll` hook
and its reduced-motion vertical fallback. On touch: native horizontal snap-scroll track, no pin.
This is the only pin, the only horizontal section, and the most expensive element on the page.
Everything else is deliberately cheaper so this moment lands. No 3D, no frame sequence anywhere.

## 8. Performance budget

- **Server components**: Manifesto, GlobalDelivery stats, EngagementModels copy, FinalCTA copy,
  Footer — all static copy SSR'd. `"use client"` only on animated leaves (hero choreography,
  SignalStrip, CapabilityIndex hovers, ProofChapter, testimonial switcher, magnetic CTA).
- **Lazy (`next/dynamic` + color-matched dark skeletons, per L-1)**: ProofChapter (**`min-h-[400vh]`**
  placeholder — full pin-spacer height, bg `#050505`), AISpotlight, GlobalDelivery, FinalCTA.
  Hero, SignalStrip, Manifesto, CapabilityIndex ship in the initial bundle.
- **JS ceiling**: ≤ 120KB gzip route-level JS beyond the shared framework/GSAP/Lenis baseline.
  **Zero R3F/three.js on this route** (the single biggest saving vs. adding a 3D artifact).
- **Media**: case-study crops AVIF/WebP, `sizes` set, only hero glow (CSS gradient — 0 bytes) above
  the fold; `content-visibility: auto` + `contain-intrinsic-size` ONLY on truly static sections
  (EngagementModels, Footer) with pixel-accurate intrinsic sizes — NEVER on scrub-animated sections.
- **Discipline**: transform/opacity only; `will-change` applied just-before, removed after;
  SplitText only after `document.fonts.ready`; marquee/scrub loops gated by `onToggle`/IO.

**Build rules (feasibility — binding for builders):**
1. **ProofChapter lazy-mount**: the `next/dynamic` placeholder reserves the FULL pin-spacer height
   (`min-h-[400vh]` on the wrapper = 100vh pin + 3 panels of scrub distance) so page length never
   jumps mid-scroll; additionally call `ScrollTrigger.refresh()` after import resolve + first image
   decode as belt-and-braces. Sections below must tolerate a refresh.
2. **Hero LCP**: headline is SSR-painted visible. The SplitText takeover (split → set hidden →
   reveal) runs inside `useLayoutEffect` (pre-paint post-hydration, no visible flash) and only
   after `document.fonts.ready`; if fonts take > 2.5s, skip the entrance entirely (headline stays
   visible) — LCP must register on first paint in all cases.
3. **CapabilityIndex preview**: fixed-size overflow-hidden mask + inner counter-translate via
   `quickTo`. Desktop `pointer: fine` media query only. No animated `clip-path`.
4. **GlobalDelivery clocks**: SSR static `UTC±n` labels; a minimal client leaf upgrades to ticking
   time after mount. No `Date` rendering in server output that differs at hydration.
5. **Hero velocity effects** (glow drift + headline skew): gated by IntersectionObserver — zero
   work once the hero leaves the viewport.
6. **Avoora demo artifact**: fixed height reserved (zero CLS), IO-gated, plays once, respects
   reduced-motion (final state only).
- **Targets (QA gates via `npm run qa:perf` / `qa:viewport` / `psi`)**: Lighthouse ≥ 90,
  LCP < 2s (text hero), CLS < 0.1, 60fps scrub on mid-tier mobile, no preloader.

## 9. Explicit never-do list for this page

From `LEARNINGS.md` L-1/L-2 + anti-pattern research, plus page-specific rules:

1. No scroll hijacking anywhere; ProofChapter scrubs with native physics (`scrub: 0.75`), never snaps wheel-to-slide.
2. Exactly ONE pinned section (ProofChapter). The hero is NOT pinned — do not carry over `TransferredSoftreeHero`'s pin. No second horizontal section.
3. No fade-up-everything: reveals on hero + section headers only; body copy and index rows render instantly.
4. No light bands / no `#F3F0EE` surfaces — single dark canvas; every dynamic skeleton bg is `#0a0a0a` or `#050505` (kills the dark→cream flash class of bugs from the current page).
5. Exactly ONE marquee (SignalStrip), paused offscreen. `Gallery`/`AnimatedPhotoGallery`-style filler does not return.
6. No 3D, no particles.js dots, no gradient blobs, no tilt cards, no typewriter on page copy, no number counters, no centered `h1 + subtext + two buttons` hero, no uniform bento grid. (Sole permitted exception: the contained Avoora demo artifact in `AISpotlight` — it demonstrates the real product, fixed height, plays once, IO-gated, reduced-motion safe. The hero's quiet mono CTA link is not a "button pair".)
7. Only `--softree-*` tokens + `--softree-ember`; only `EASE.*` tokens from `src/lib/motion.ts`; Inter only (mono = system stack utility, no font import).
8. Never animate width/height/top/left — transform/opacity only.
9. Never skip `prefers-reduced-motion` (`gsap.matchMedia()` both contexts) or ship synthetic smooth scroll on touch; never instantiate a second Lenis.
10. SplitText only after `document.fonts.ready`; stagger envelope ≤ 0.6s; exits ≈ 2/3 of entrances.
11. No vague hero copy — the headline must state what Softree does; the Manifesto must explain the offshore + AI model in plain language.
