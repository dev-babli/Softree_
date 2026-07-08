# Story Spec — home-2026
> By storytelling-director role · 2026-07-04 · Source: `design-brief.md` (amended per judge panel)
> Route `/home-2026` (preview) · Components in `src/components/home-2026/`

## Narrative arc

| Beat | Sections | Function |
|---|---|---|
| **Hook** | 1 Hero | The claim, stated in one breath, lit by the ember |
| **Credibility pulse** | 2 SignalStrip | Logos + hard numbers before a single paragraph |
| **Tension → thesis** | 3 Manifesto | "Offshore is broken; here's the honest model" |
| **Capability** | 4 CapabilityIndex | What we do, as an engineer's index — browsable, linked |
| **PROOF (climax)** | 5 ProofChapter ★ | The film strip; the ember travels; clients speak |
| **The edge** | 6 AISpotlight | Avoora demonstrates itself |
| **The model** | 7 GlobalDelivery | Offshore mapped honestly — where, when, who |
| **The how** | 8 EngagementModels | Three ways in |
| **Invitation** | 9 FinalCTA | Ask for the conversation |

**Chapters** (pinned/scrubbed): only §5. Everything else is connective flow.
**Scroll progress affordance**: persistent left-edge index rail (desktop ≥1024px): mono `01–09`
ticks on a 1px hairline; active index in `--softree-accent`; built once in the page shell
(`HomeShell`), driven by section `IntersectionObserver` — no scroll-linked JS per frame.

## Shared build notes
- Shared client utilities in `src/components/home-2026/lib/`:
  `Reveal.tsx` (once-only header reveal: y 24→0 + opacity, EASE.out 0.6s, `useInView`),
  `useCharShuffle.ts` (hover char-shuffle, 0.3s, mono-safe),
  `MagneticLink.tsx` (quickTo magnetic wrapper),
  `ember.css` (ember glow + 4% grain utilities).
- All easings imported from `src/lib/motion.ts`. All reduced-motion via `gsap.matchMedia()`.
- Section files listed per beat; server sections import client leaves only where stated.

---

## 1. Hero2026 — `src/components/home-2026/Hero2026.tsx` (client) · kind: flow
**Copy (final):**
- Kicker (mono): `SOFTREE TECHNOLOGY — ENGINEERING, HONESTLY`
- Headline, broken 3-row grid: `We build the offshore teams` / `that ship` / `real AI.`
  ("ship" in transparent fill + 1px stroke — the knocked-out word)
- Subline: `Senior engineering pods in 2 weeks, run from our delivery hub — with applied-AI products like Avoora as proof we ship, not slideware.`
- Metadata row (mono): `OFFSHORE ENGINEERING / APPLIED AI / 140+ ENGINEERS / 24°51'N 67°00'E`
- Quiet CTA (mono link): `→ START A CONVERSATION` → `/contact`
**Entrance:** SSR-visible headline (LCP). In `useLayoutEffect` after `fonts.ready` (skip entirely if >2.5s): split to lines, set hidden pre-paint, masked reveal yPercent 100→0, EASE.silk, 1.1s total, line stagger 0.09s; kicker + metadata fade 0.4s after; CTA last.
**Scroll:** none (not pinned). Velocity: headline block skewX ≤3° + ember glow drift via Lenis velocity → quickTo, both IO-gated to hero visibility.
**Reduced motion:** no split, no skew, no drift; single opacity fade 250ms.
**Mobile (<768):** grid collapses to stacked left-aligned rows; stroke word keeps stroke; skew effect off (touch); min font via clamp floor.

## 2. SignalStrip — `src/components/home-2026/SignalStrip.tsx` (client) · kind: flow
**Content:** hairline-framed monochrome client logo cells (reuse existing logo assets found in `public/` — verify at build; fallback: text cells styled as logo lockups at 55% white) interleaved with real stats: `140+ ENGINEERS`, `9 SERVICE LINES`, `4 CONTINENTS`.
**Motion:** single CSS transform marquee loop ~40s linear; `animation-play-state: paused` when offscreen (IO) and on hover.
**Reduced motion:** static row, horizontally scrollable.
**Mobile:** same marquee, slower (60s), cells shrink.

## 3. Manifesto — `src/components/home-2026/Manifesto.tsx` (server + `Reveal` leaf) · kind: flow
**Copy (final):**
- Header (via Reveal): `Offshore has a trust problem. We fixed it with proof.`
- Statement (~60ch, display-l, renders instantly): `Most offshore vendors sell resumes. We sell running teams — senior pods you interview once, who ship from week two, measured on the same dashboards you use.`
- Mono margin notes (right column, instant): `NO BODYSHOPS`, `SENIOR-ONLY PODS`, `YOUR TOOLS, YOUR REPOS`, `EXIT ANYTIME — L-2 HONESTY RULE: real terms only`  (builder: replace last note with actual engagement term from /services copy).
**Motion:** header Reveal only. Body instant.
**Mobile:** margin notes move below statement as a mono list.

## 4. CapabilityIndex — `src/components/home-2026/CapabilityIndex.tsx` (client) · kind: flow
**Content:** indexed rows from the real service routes (builder MUST verify slugs via `src/app/services/`):
`01 / Offshore Engineering Teams`, `02 / Applied AI & LLM Systems`, `03 / Web & Product Engineering`, `04 / Data & Analytics`, `05 / Power Platform`, `06 / SharePoint & M365`, … (one row per real service page; each row: index, label, one-line proof stat, `→` glyph). Footer mono line: tech stack (`TS / NEXT / .NET / AZURE / PYTHON / REACT NATIVE …`).
**Header (Reveal):** `Nine ways teams use us. One standard.`
**Interaction:** hover (pointer:fine): label char-shuffle; fixed 280×180 preview window follows cursor (quickTo x/y), inner thumbnail counter-translates (transform mask). Rows link to service routes. Focus-visible ring for keyboard.
**Motion:** no scroll animation on rows (instant render).
**Mobile:** no preview, no shuffle; rows = large touch targets (≥48px) with chevron.

## 5. ProofChapter ★ — `src/components/home-2026/ProofChapter.tsx` (client, lazy) · kind: CHAPTER
**Content:** 4 panels, hardcoded data array; builder picks the 4 strongest case studies with real slugs from `/case-studies` (verify via `src/app/case-studies/` + Sanity seed scripts; JetBrains + Albert Heijn + manufacturing + one AI/product story preferred). Panel = index numeral (display-l), client + title (mono), one outcome metric (display-l), one-line client quote + mono attribution, art crop (`next/image`, AVIF/WebP, sizes), `→ READ THE CASE` link to `/case-studies/<slug>`.
Progress rail bottom-left: mono `01 — 04`, accent fill synced to scrub.
**Mechanic — traveling ember:** fixed gradient layer behind track; scrub timeline interpolates `--ember-h` panel-to-panel: `#ff7a2f → #ff9a4d → #c98bff → #7ab8ff` at 7% opacity (CSS custom property tween on the same timeline; no layout).
**Scroll:** wrapper reserves `min-h-[400vh]`. Pin inner viewport, `x: () => -(track.scrollWidth - innerWidth)`, `scrub: 0.75`, ease none. Panel content (quote, metric) reveals when panel center crosses viewport center (no counters). Numerals get velocity skew ≤2° (quickTo). `ScrollTrigger.refresh()` after mount + first image decode.
**Reduced motion:** vertical stack, no pin, opacity-only; ember static warm.
**Touch/mobile:** native horizontal snap-scroll track (`scroll-snap-type: x mandatory`), no pin; rail becomes dots; ember static.
**Entrance header (before pin):** `Proof, filmed in production.` via Reveal.

## 6. AISpotlight — `src/components/home-2026/AISpotlight.tsx` (client, lazy) · kind: flow
**Copy:** header (Reveal): `Our edge isn't a deck. It's deployed.`; side list (mono changelog, instant): `AVOORA — partner-portal AI, live`, `LLM RETRIEVAL PIPELINES`, `DOC INTELLIGENCE (PDF → DECISIONS)`, `FACE/VISION QA` (builder: align items with real capabilities from site content).
**Demo artifact:** fixed-height (~360px) terminal-style card: scripted exchange plays once on enter (IO): mono user line `> summarize the Q2 delivery risks for the Nexora account` → 300ms pause → streamed 3-line answer (real-ish product copy) → mono footer `AVOORA · RESPONSE 1.2s`. Replay button (`↻ RUN AGAIN`). Cursor-over: ember spotlight follows pointer (CSS var radial position, transform-only).
**Motion:** glow parallax yPercent ±6 scrub. Card height fixed = zero CLS.
**Reduced motion / mobile:** completed exchange shown statically; spotlight off.

## 7. GlobalDelivery — `src/components/home-2026/GlobalDelivery.tsx` (server) + `ClockLeaf.tsx`, `MarkerLayer.tsx` (client leaves) · kind: flow
**Copy:** header (Reveal): `One delivery hub. Your timezone covered.`; 3 SSR stat columns: `140+ ENGINEERS`, `12h OVERLAP GUARANTEED`, `4 CONTINENTS SERVED` (verify numbers from site).
**Map:** flat SVG world line-map; markers (delivery hub + client regions) with mono coordinates. Clocks: SSR `UTC±n` labels; ClockLeaf upgrades to ticking HH:MM after mount.
**Interaction:** marker hover → mono tooltip (office, timezone, headcount); map drifts ≤8px toward cursor (transform, pointer:fine).
**Motion:** markers stagger-fade 0.08s on enter (once). Industry coverage line (mono, instant): `FINTECH / RETAIL / MANUFACTURING / EDTECH / DEVTOOLS` (follow-up task #2 resolution).
**Mobile:** map full-bleed, tooltips become tap; drift off.

## 8. EngagementModels — `src/components/home-2026/EngagementModels.tsx` (server) + `ModelCard.tsx` (client leaf) · kind: flow
**Copy:** header (Reveal): `Three ways in.`; asymmetric cards (spans 5/4/3 of a 12-col grid):
- `MODEL A — DEDICATED POD`: `A senior team of 4–8, yours end-to-end. Interview once, start in two weeks.`
- `MODEL B — EMBEDDED ENGINEERS`: `Seniors who join your standups, your repos, your on-call.`
- `MODEL C — AI DELIVERY SPRINT`: `Six weeks from use-case to deployed AI workflow, priced fixed.`
(builder: align terms with real /services + /contact copy; each card links onward)
**Motion:** cards reveal once, stagger amount 0.24, EASE.out 0.6s. Hover: corner brackets draw in (4 stroked spans scale from 0, 0.25s, EASE.out) + tag char-shuffle.
**Static optimization:** `content-visibility: auto` + accurate `contain-intrinsic-size` allowed here (truly static).
**Mobile:** cards stack full-width, spans ignored; brackets on tap-focus.

## 9. FinalCTA — `src/components/home-2026/FinalCTA.tsx` (client, lazy) · kind: flow
**Copy:** display-xl headline: `Let's build your team.`; mono metadata: `hello@softreetechnology.com / RESPONSE < 24H / NDA ON REQUEST`; primary CTA button (accent bg): `BOOK A CALL` → `/contact`; secondary mono link: `→ SEE ALL CASE STUDIES` → `/case-studies`.
**Motion:** headline line-reveal EASE.silk 0.9s (Reveal-style, once); CTA magnetic quickTo 0.45s (pointer:fine); footer (existing `Footer` component) untouched below.
**Reduced motion:** opacity fade only; no magnetism.
**Mobile:** magnetism off; CTA full-width ≥56px tall.

---

## Build order & files (for the workflow)
| # | componentName | file | kind |
|---|---|---|---|
| 0 | HomeShell (+ IndexRail) | `src/components/home-2026/HomeShell.tsx` | shell |
| 1 | Hero2026 | `src/components/home-2026/Hero2026.tsx` | flow |
| 2 | SignalStrip | `src/components/home-2026/SignalStrip.tsx` | flow |
| 3 | Manifesto | `src/components/home-2026/Manifesto.tsx` | flow |
| 4 | CapabilityIndex | `src/components/home-2026/CapabilityIndex.tsx` | flow |
| 5 | ProofChapter | `src/components/home-2026/ProofChapter.tsx` | chapter |
| 6 | AISpotlight | `src/components/home-2026/AISpotlight.tsx` | flow |
| 7 | GlobalDelivery | `src/components/home-2026/GlobalDelivery.tsx` | flow |
| 8 | EngagementModels | `src/components/home-2026/EngagementModels.tsx` | flow |
| 9 | FinalCTA | `src/components/home-2026/FinalCTA.tsx` | flow |
Shared lib first: `src/components/home-2026/lib/{Reveal.tsx, useCharShuffle.ts, MagneticLink.tsx, ember.css}`.
Route: `src/app/home-2026/page.tsx` (preview; existing homepage untouched).
