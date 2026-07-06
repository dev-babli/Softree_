# Softree Agentic AI — Design Brief (Single Source of Truth)

Research agent output. All observations below come from live-site visits on 2026-07-03 via Playwright
(1440x900 primary viewport, plus 768x1024 and 390x844 hero checks). Every claim is backed by a
screenshot in `design-reference/kore/` or `design-reference/craft/`.

Skills read before browsing (they shape every judgment in this document):

1. `.agents/skills/design-taste-frontend/SKILL.md` (anti-slop dials, AI-tell bans, pre-flight check)
2. `.agents/skills/hallmark/SKILL.md` (macrostructure discipline, token lock, slop test)
3. `.agents/skills/hallmark/references/typography.md` (2+1 font rule, scale ratios, headline sizing)
4. `.agents/skills/hallmark/references/motion.md` (easing tokens, duration buckets, reduced motion)
5. `.agents/skills/hallmark/references/layout-and-space.md` (4pt scale, asymmetry, hairlines, z-scale)
6. `.agents/skills/design-motion-principles/SKILL.md` (Emil/Jakub/Jhey weighting framework)
7. `.agents/skills/design-motion-principles/references/emil-kowalski.md` (restraint, frequency rule, easing)

---

## 1. Reference inventory

| Site | Screenshots | Key takeaway |
| --- | --- | --- |
| kore.ai About (`/about-us`) | `kore/about-1440-01..08.png`, `about-768-hero.png`, `about-390-hero.png` | Enterprise editorial: cool paper background, centered manifesto hero, mono-label system, floating rounded cards, real photography |
| kore.ai Artemis platform (`/ai-agent-platform`) | `kore/platform-1440-01..11.png`, `platform-768-hero.png`, `platform-390-hero.png` | The masterclass page: GSAP + ScrollTrigger + Lenis confirmed in-page; pinned word-list scrollytelling; cream/ink/green three-mode palette; brace `{ }` brand motif |
| kore.ai Homepage (`/`) | `kore/home-1440-01..07.png`, `home-768-hero.png`, `home-390-hero.png` | Light hero + dark feature banner contrast; sticky tab rails; real product UI as imagery; dual-CTA close |
| kore.ai AI for Service (`/ai-for-service`) | `kore/service-1440-01..06.png` | Service-page formula: pill eyebrow hero, problem/solution card trio, alternating product-proof splits, sticky index nav, dashed-border capability grid |
| Apple MacBook Pro | `craft/apple-mbp-01..05.png` | Scroll choreography: pinned scenes 3-4 viewports long, per-word paragraph brightening, stat overlays on full-bleed photography |
| Linear | `craft/linear-01..05.png` | Restraint: #08090a canvas, 64px/510-weight Inter Variable, one screenshot per claim, numbered section index, quiet footer |
| Stripe | `craft/stripe-01..04.png` | Enterprise credibility with density: two-tone headline device, bento of real product UI, proof stat inline with prose |
| Vercel | `craft/vercel-01..05.png` | Typography as the whole system: GeistSans 64px weight 400 ls -6%, mono uppercase micro-labels, near-total absence of color |

Total: 55 files. 37 kore + 18 craft.

---

## 2. Per-site documentation

### 2.1 kore.ai — About (`kore/about-1440-01..08.png`)

**Design language**

- Type (probed via getComputedStyle): H1 Inter 500, 54px / 59.4px line-height (1.1), letter-spacing -1.08px (-2%),
  ink `rgb(24,24,24)` = `#181818`. Sub-paragraph Inter 500 16px/24px, gray `#65717c`.
  Second register: a monospace face for every eyebrow pill, button label, and footer column head
  (`WHY WE ARE HERE`, `GET IN TOUCH`, `PRE-BUILT APPLICATIONS`), uppercase, ~11-12px, tracked wide.
- Palette: body background `#f0f6f9` (cool paper) with enormous soft radial washes of powder blue;
  white cards; near-black `#181818` ink; gray `#65717c` secondary; black buttons with white mono text.
- Spacing: hero occupies a full viewport; sections are huge (roughly 120-160px vertical padding);
  content max-width ~1260px with white cards inset ~40px from the viewport edge, 24px corner radius.
- Imagery: real team photography, watercolor-ink organic art for the Artemis card, product dashboards
  on office screens. Zero stock-icon illustration.

**Structure and storytelling (`about-1440-01` → `08`)**

1. Hero: dotted-circle logo motif, mono pill eyebrow, 3-line centered headline, gray subtext,
   dotted vertical line leading downward (a quiet scroll affordance, not a "scroll" label).
2. Story: white rounded card, split 5/7. Left: 40px headline, bold sub-claim, gray body, dotted
   hairline above a CTA pair (black mono primary + outlined mono secondary). Right: real photo.
3. Proof: two-row logo marquee (Experian, Equinix, Lilly, CVS, Colgate, Airbus, Morgan Stanley,
   Pfizer, Coca-Cola), each logo in its own white rounded tile; black mono CTA below.
4. Platform tease: full-width near-black card, mono eyebrow chip `//// NEW PLATFORM`, display
   "Meet Agent Platform { Artemis }" with italic braces, body copy inside a corner-bracket box,
   white italic "Get demo" button with dashed arrow, green/blue ink-wash art bleeding right.
5. People: "Deep experience in innovation" + 4-col leadership grid, portraits on powder-blue
   gradient tiles, name / role-in-blue / provenance line.
6. Locations: "Global presence" cards with flag chips + photography + address card.
7. Careers: split headline + photo, blue-tinted body text, dotted hairlines.
8. Footer: light, hairline-ruled columns, mono uppercase column heads, "Let's work together"
   boxed CTA with `SUBMIT RFP` mono button.

**Responsive:** hero survives at 768 and 390 by letting the headline wrap to 6 lines at 390
(`about-390-hero.png`) while keeping the mono pill and dotted motif. Nav collapses to hamburger.

### 2.2 kore.ai — Artemis platform (`kore/platform-1440-01..11.png`)

**Confirmed tech (probed):** `window.gsap = true`, `ScrollTrigger = true`, Lenis smooth scroll
present, 1 GSAP pin-spacer, 5 sticky elements. This page is the engineering blueprint.

**Design language**

- H1 (probed): 72px, weight 500, line-height 64.8px (0.9!), white. Sub-display lines in light
  italic of the same family. Mono eyebrows in signal green (`KORE.AI AGENT PLATFORM`).
- Three surface modes rotate through the page:
  1. Full-bleed dark: near-black `#0c0e0c` with organic forest-green/blue ink-wash photography.
  2. Cream paper: warm `#f8f4ec` with deep forest-green ink (`#1d3b2a`-family) display type.
  3. Pure product: white/neutral panels holding real dashboard screenshots.
- The brand motif is typographic: `{ Artemis }` braces, `//// ` hatch prefixes on eyebrows,
  corner brackets around key boxes, dashed arrows in buttons `-->`, barcode/tally strips on cards,
  dotted and hairline rules everywhere. Left viewport edge carries a tick-mark progress rail whose
  active tick is green.
- Accent: exactly ONE chromatic accent (signal green ~`#35c24a`), used for eyebrows, active states,
  progress ticks, and the highlighted word in scrollytelling. Everything else is ink/paper/white.

**Scrollytelling moments (rebuild-ready descriptions)**

- `platform-1440-02/03` — "What { Artemis } changes" pinned header: section header (dot-matrix
  icon + mixed bold/italic headline) pins at viewport top; a green progress rule with tick marks
  fills under it as three brace-titled columns (`{ Outcomes in days }` etc.) reveal; then a giant
  stat trio "5x / No / Zero" (~140px, white on black, small bold labels) fades up one by one.
  Total scroll budget ~2 viewports.
- `platform-1440-04` — Cream problem statement: "No more {it worked} in the [Demo]" set ~110px in
  forest green over ruled hairlines (like ledger paper), with a duotone photo + watercolor splash
  anchored right. Text reveals per-line on enter (600ms, expo-out, 60-80ms stagger).
- `platform-1440-05/06` — ABL orbital diagram: hairline circles (one dotted) with small dots
  orbiting a black core disc labeled `ABL(tm) ARCH(tm)` with green corner brackets; the orbit angle
  is scroll-scrubbed over ~1.5 viewports; the section closes with a centered serif-free quote line
  "Invented for the agentic era..." in green ink on cream.
- `platform-1440-07..10` — THE signature pattern. First a stacked display intro "Build. Scale.
  Optimize." (bold/bold/italic, ~120px) over dark imagery. Then a pinned two-column stage:
  right column is a vertical word list (Build / Orchestrate / Prove / Test / Deploy / Govern /
  Scale / Simplify, ~56px, dim gray at 25% opacity); as the user scrolls, the list translates
  upward so the active word sits mid-viewport, turns signal green, and gains an appended italic
  "with AI" in white; the left column simultaneously crossfades a photography card carrying a
  dark overlay panel (mono eyebrow, white claim like "Zero production surprises.", 2-line body,
  tally-strip motif). Scroll budget: about 1 viewport per word (8 viewports pinned via GSAP
  pin + scrub; this is the page's single pin-spacer).
- `platform-1440-11` — Dark footer: hairline-boxed grid, mono uppercase column heads each with a
  green square dot, italic "Submit RFP" button with a separate dashed-arrow cell.
- At 768 (`platform-768-hero.png`) the pinned tabs collapse to a sticky bottom bar
  `{ BUILD } { SCALE } { OPTIMIZE }` with a green progress line — the scrollytelling degrades to
  tap-able tabs instead of disappearing.

**Storytelling arc:** cinematic claim → what changes (proof trio) → the problem in the buyer's
words → what actually matters → how it works (diagram) → why now (quote) → capabilities in depth
(pinned tabs + product screenshots) → word-list depth pass → CTA/footer. Confidence escalates:
imagery-led → evidence-led → product-led.

### 2.3 kore.ai — Homepage (`kore/home-1440-01..07.png`)

- Hero (`home-01`): centered 2-line headline (~56px Inter 500) on pale blue radial-wash paper, gray
  2-line subtext, black mono CTA + outlined mono secondary. Directly below, a near-black rounded
  banner card "Meet { Artemis } [NEW]" with ink-wash art and a circular arrow button: the dark card
  against the light page is the primary visual event of the fold.
- 3-up utility row ("Pre-built Applications / Application Accelerators / Tailored Applications"),
  each with real UI micro-mockups, arrow chips top-right.
- Industry section (`home-02`): left sticky headline "We've built our business by serving global
  enterprises", right mono pill tabs (BANKING active-black) + photographic industry cards sliding
  horizontally.
- Sticky rail section (`home-03`): left rail of mono uppercase tab pills (active = black fill), right
  2-col grid of "AI for Banking / Healthcare / Retail / IT" cards, each embedding a real chat
  transcript UI. The accent inside cards is a blue link color, but structural accents stay black.
- Analyst proof (`home-04`): mono pill tabs for Gartner categories + report card; dotted-border
  "GET ACCESS TO THE REPORT" black button.
- Testimonials (`home-05`): "Customer testimonials" + 4-col card carousel (Morgan Stanley, Pfizer,
  Mphasis, Microsoft), quote text in blue-gray, circular prev/next buttons.
- Partners (`home-06`): two large cards (Microsoft, AWS) with brand-gradient art, body copy with
  bolded product names, black mono + outlined mono CTA pair. Then "AI Insights" blog cards.
- Close (`home-07`): two side-by-side CTA cards — solid card ("Accelerate time-to-value from AI",
  outlined button) and dashed-border card ("Start using { Artemis } today", black button). The dashed
  border marks the newer/spicier option. Then the light footer.

### 2.4 kore.ai — AI for Service (`kore/service-1440-01..06.png`) — the service-page formula

1. Hero: white pill eyebrow `TAILORED SOLUTIONS`, 1-line display "AI for Service" (~64px), 2-line
  gray subtext, black mono CTA + outlined secondary, on the blue-wash paper. Below the fold, a
  full-width near-black media card (demo video placeholder).
2. Problem/solution trio (`service-02`): left column pill label + 3-line headline "Turn frustration
  into seamless support with AI" + blue-gray body; right: three white cards, each with a tinted
  icon tile (warm cream / mint / lavender), a small outlined label chip, and 4-line body. The only
  color on the page lives in those icon tiles.
3. Capability splits (`service-03`): alternating rows inside white rounded cards; text col
  (headline 32px, gray body, black mono "DIVE IN DEEPER" button) + real product screenshot col on
  a blue-tinted panel. Repeated for each capability with orientation flips, max 2 in a row.
4. Interlude trio (`service-04`): three cards with icon tiles + dotted hairline + body; then a new
  section pill `FEATURES` + display "Reimagine service experiences".
5. Deep index (`service-05`): left sticky index list (AI Agents / Agentic Contact Center / Agent AI
  Assistance / Search AI / Quality Assurance / Conversation Intelligence / Outbound Campaigns /
  Pre-built Applications) with hairline underlines; right: tall feature blocks with product
  screenshots and dashed-border `GET A DEMO` buttons; the index highlights as blocks pass.
6. Capability grid (`service-06`): 2x3 grid of dashed-border cards, headline with a left pipe
  accent, blue-gray body, outlined mono `LEARN MORE` buttons.

### 2.5 Apple MacBook Pro (`craft/apple-mbp-01..05.png`)

- Canvas: pure black. Local product sub-nav sticks under the global nav (Overview / Tech Specs /
  Compare / Buy pill) — a pattern worth stealing for service pages.
- `apple-mbp-01`: hero is a single dramatic product photo (levitating open laptop), left-aligned
  name + 56px two-tone headline ("Fast runs in the family." with the key words in gradient tint),
  floating price/Buy capsule bottom-right.
- `apple-mbp-02`: pinned chapter intro: tiny bold eyebrow "Performance", 80px display
  "M5. M5 Pro. M5 Max. Pick your quick." where each chip name carries a subtle steel-blue gradient
  tint; below, THE Apple signature: a paragraph whose words brighten from 40%-gray to white
  word-by-word as scroll progresses (scrubbed text-highlight, ~1.5 viewports of scroll for ~70
  words). The user literally reads at scroll speed.
- `apple-mbp-03`: full-bleed product screenshots inside device frames; copy blocks alternate
  gray/white emphasis inside the same paragraph (bold white claim, gray elaboration).
- `apple-mbp-04`: pinned stat overlay: a vibrant full-bleed lifestyle photo pins while six stat
  lines ("1600 nits peak HDR brightness", "1,000,000:1 contrast ratio"...) fade up sequentially
  over it. Stat text ~32-40px, weight 600.
- `apple-mbp-05`: comparison table rendered as airy centered columns (chip badges, "Up to" small
  label over 28px number, hairline dividers), closing with a pill "Compare all Mac models".
- Scroll grammar: every pinned scene gets 2-4 viewports of scroll distance; nothing moves fast;
  easing feels like a long expo-out; exits are quicker than entries.

### 2.6 Linear (`craft/linear-01..05.png`)

- Probed: body bg `rgb(8,9,10)` (#08090a), text `#f7f8f8`, H1 Inter Variable 64px weight 510,
  line-height 1.0, letter-spacing -1.408px (-2.2%).
- Hero: left-aligned 2-line headline, one quiet sentence of subtext, and then the product itself
  (a full real app screenshot) fills the fold. "New · Coding Sessions →" sits far right as a
  single accent-free announcement.
- Section rhythm (`linear-02`): giant claim left ("Make product operations self-driving"), matching
  explainer right, then a full-bleed product composite. Numbered micro-index ("1.0 Intake →",
  "3.1 Issues / 3.2 Agents") threads through the page: chapters, not eyebrows.
- `linear-03`: features presented as staged product vignettes (an assign-to dropdown rendered
  huge), never as icon cards.
- `linear-04`: Changelog as a horizontal timeline with dot markers and mono dates: proof of life,
  quietly.
- `linear-05`: closing display statement + two pill buttons (white primary, gray secondary), then a
  five-column hairline-less footer in 13px gray. Motion on the site is nearly invisible: fades
  under 300ms; restraint is the aesthetic.

### 2.7 Stripe (`craft/stripe-01..04.png`)

- Hero: white canvas (normally backed by the animated WebGL gradient ribbon: it was removed
  during capture to stabilize screenshots), 44px two-tone headline device: first sentence in
  near-black ink, the continuation in slate blue-gray ("Financial infrastructure to grow your
  revenue." + "Accept payments, offer financial services..."). A live micro-stat above the
  headline ("Global GDP running on Stripe: 1.674%") does the trust work of a whole logo wall.
- Purple-blue pill CTA (`Request an invite`), then a single-row logo strip (Amazon, Nvidia, Ford,
  Coinbase, Google, Shopify) separated by hairlines.
- `stripe-02`: bento of real product UI: 3 columns, each card = headline + live-looking product
  render (agentic commerce chat, VISA card art, particle globe). Density is high but each card
  holds exactly one idea.
- `stripe-03`: section transition via a full-width data-burst illustration; then the two-tone
  headline device again ("Powering businesses of all sizes." black + gray continuation); enterprise
  block pairs a claim with a verifiable stat ("50% of Fortune 100 companies...") in plain body copy.
- `stripe-04`: developer bento (code snippets rendered as real editor panels with syntax color),
  a 3-up "guide" row with tiny outlined icons, then a centered customer quote (28px, quote marks,
  attribution in bold + role) with the customer wordmark above.

### 2.8 Vercel (`craft/vercel-01..05.png`)

- Probed: H1 GeistSans 64px weight 400, letter-spacing -3.84px (-6%!), line-height 1.0, canvas
  `#fafafa`, pure black ink.
- Hero (`vercel-01`): radical 3-column: left = 2-word headline + two pill buttons; center = the
  black triangle logomark with a soft halo; right = three lines of mono uppercase micro-copy
  (`FOR CODING AGENTS / TO SHIP APPS AND AGENTS / AUTOMATED BY AGENTS`). Below, a hairline logo
  row (Blackbox, Charles Schwab, DoorDash, OpenAI, Supreme, Polymarket).
- Two-tone headline device again (`vercel-02`): "Notion powers millions of agent conversations
  daily on Vercel." with the customer name in gray and claim in black. Feature lists are mono
  uppercase strings (`DURABLE ORCHESTRATION / SANDBOXED ENVIRONMENTS / AI MODEL GATEWAY`), no
  icons at all.
- Proof numbers set small and gray (`450K+ agents built`), never shouted.
- `vercel-04` "Recently shipped": 3-card grid where each card is a real product artifact (terminal
  output, localized wordmark art, line-art frame): no fake screenshots.
- `vercel-05`: mega-footer as a 6-column typographic index with `NEW` chips: the footer IS the site
  map, and it's beautiful because it's only type.

---

## 3. SYNTHESIS — the Softree Agentic AI design language

**Design read (per taste-skill 0.B):** enterprise agentic-AI service pages for technical and
procurement buyers, with a kore.ai-grade editorial-engineering language: near-black ink, cream
paper, ONE accent, mono label register, GSAP scrollytelling used sparingly and precisely.
Dials: `DESIGN_VARIANCE 7 / MOTION_INTENSITY 7 / VISUAL_DENSITY 4`.

**Non-negotiable existing chrome (do NOT redesign):** the white pill `NavigationClient` at top and
the sticky orange SOFTREE footer. Everything between them is ours. The current navy hero on
`/services/offshore-ai-development` is superseded by this brief.

### 3.1 Aesthetic direction (one direction, no alternates)

"**Ink on paper, signal in orange.**" Light cream-paper sections carry the argument in huge
near-black type with a monospace label register; one or two near-black cinematic sections carry
the scrollytelling; real product UI and duotone photography are the only imagery. The single
accent is Softree orange. It behaves like kore.ai's signal green: eyebrows, active states,
progress ticks, the highlighted word: never backgrounds, never gradients.

**Accent decision: orange `#ff5812`.** Justification: (a) the sticky SOFTREE footer is already
orange, so the page closes on the accent: choosing blue would put two accents on every scroll;
(b) blue `#1852ff` next to AI subject matter reads as the generic "AI-blue" tell that both skills
ban; (c) orange against cream/ink is the same warm-signal-on-paper trick kore.ai runs with green,
and no major agentic-AI competitor owns orange. Blue `#1852ff` is demoted to a functional link
color inside body copy only, if ever needed. One accent, locked, page-wide.

### 3.2 Palette tokens

```css
:root {
  /* surfaces */
  --paper:        #f7f4ed;  /* cream: default section surface */
  --paper-warm:   #f2ede2;  /* deeper cream for alternating sections */
  --surface:      #ffffff;  /* cards on paper */
  --ink-section:  #0e0f0e;  /* near-black cinematic sections (never #000) */
  --ink-card:     #131513;  /* cards on dark */

  /* ink */
  --ink:          #181818;  /* display + body headings (kore.ai's exact ink) */
  --ink-soft:     #4c5560;  /* body copy on light */
  --ink-faint:    #8a9199;  /* captions, mono labels at rest */
  --on-dark:      #f7f6f2;  /* type on ink sections (never #fff) */
  --on-dark-soft: rgba(247,246,242,.62);

  /* accent: exactly one */
  --accent:       #ff5812;  /* Softree orange: eyebrows, active states, ticks, highlighted words */
  --accent-ink:   #c93f06;  /* orange on cream when AA contrast needs it (small text) */

  /* lines */
  --hairline:     rgba(24,24,24,.14);
  --hairline-dark:rgba(247,246,242,.16);
}
```

Rules: no gradients as surfaces (soft radial paper washes at <4% chroma are the ceiling, à la
kore.ai's blue wash). No pure black, no pure white type. Shadows: one whisper shadow max,
tinted to the surface hue: prefer hairlines.

### 3.3 Typography

2+1 rule (hallmark): ONE sans family carries display and body; ONE monospace carries the label
register. No serif anywhere. Recommended: **Geist** (display + body) + **Geist Mono** (labels,
buttons, eyebrows, footer column heads, stat units). If the repo already loads a grotesque via
`next/font`, keep it and apply this scale to it instead: do not add a third family.

Scale (1440 desktop; clamp everything):

| Token | Size / line-height / tracking | Use |
| --- | --- | --- |
| `--display-xl` | clamp(96px → **128-160px**) / 0.92 / -3% | ONE statement moment per page, <=3 words ("Ship. Govern. Scale.") |
| `--display` | 72px / 0.95 / -2.5%, weight 500 | Page hero H1 (kore.ai Artemis = exactly this) |
| `--h2` | 54px / 1.05 / -2% , weight 500 | Section headlines |
| `--h3` | 32px / 1.15 / -1% | Card + split headlines |
| `--body-lg` | 20px / 1.5 | Hero subtext, section intros |
| `--body` | 16px / 1.55, color `--ink-soft` | Everything else, max-width 65ch |
| `--mono-label` | 12px / 1.2 / +8%, uppercase, Geist Mono | Eyebrows, buttons, ticks, column heads |
| `--stat` | 120-140px / 1.0, weight 500 | Stat trio numerals ("5x / Zero / 24-7") |

Devices to steal: italic-of-same-family for emphasis words (kore.ai's "{ Artemis }" and Apple's
tinted words: never a serif inject); the Stripe/Vercel two-tone headline (claim in `--ink`,
continuation in `--ink-faint`); brace/bracket typographic motifs `{ }` `[ ]` for the agentic
brand voice; `////` hatch prefix on mono eyebrows.

### 3.4 Spacing, grid, radius

- 4pt scale: `4 / 8 / 12 / 16 / 24 / 40 / 64 / 96 / 144` (`--space-3xs`..`--space-4xl`).
- Sections: `py 96-160px` on desktop, uneven on purpose (generous top, tighter bottom after a
  pinned scene). Content container `max-w-[1280px]`, full-bleed cards inset 40px with 24px radius
  (the kore.ai floating-card move).
- Grid: 12-col, asymmetric spans (5/7 story splits, 4/8 sticky-rail splits). Never three equal
  feature cards. Zigzag capped at 2 consecutive.
- Radius system: cards 24px, buttons 4px (rectangular mono buttons like kore.ai: NOT pills, the
  nav pill is the only pill), chips/pills 999px for eyebrow labels only. Documented and locked.
- Hairlines organize; boxes only when content is interactive. Dashed borders reserved for the
  single "newest thing" per page (kore.ai's dashed Artemis CTA card).

### 3.5 Motion vocabulary

Weighting (design-motion-principles): Jakub primary (production polish), Emil secondary
(restraint + easing), Jhey selective (the one scrollytelling set piece).

```css
:root {
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);   /* everything entering */
  --ease-in:     cubic-bezier(0.7, 0, 0.84, 0);   /* everything leaving  */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);  /* state toggles       */
  --dur-micro: 120ms;  /* button press, tick */
  --dur-short: 240ms;  /* hover, tooltip, tab swap */
  --dur-enter: 500ms;  /* section/card reveals (400-800ms band) */
  --dur-hero:  800ms;  /* hero line reveals only */
}
```

- Entrances: opacity 0→1 + translateY 12-24px + optional blur(4px)→0, `--dur-enter`, `--ease-out`,
  staggered 40-80ms per element, total stagger <=500ms. Trigger once via IntersectionObserver /
  `whileInView`; never re-fire.
- Hero: one orchestrated load sequence (eyebrow → headline lines → subtext → CTAs at 60ms steps).
- Pinned/scrubbed (GSAP ScrollTrigger, `start: "top top"`, pin + scrub, exactly like the skill
  skeletons): maximum TWO per page:
  1. The **word-list scrollytelling** (kore.ai `platform-1440-08..10`): pinned split, right-hand
     vertical verb list scrubs upward, active verb turns `--accent` + gains italic suffix, left
     card crossfades in sync. ~0.8 viewport of scroll per word.
  2. The **stat reveal** (kore.ai `platform-1440-03` / Apple `apple-mbp-04`): pinned header with
     accent progress rule filling, then 3 giant stats fading up sequentially. ~2 viewports.
- Optional third device (cheap, no pin): Apple's per-word paragraph brightening for one manifesto
  paragraph, scrubbed over ~1.2 viewports.
- Buttons: `:active` scale(0.98); hover translateY(-1px), 120ms. Dashed-arrow `-->` micro-slide
  4px on hover.
- Everything honors `prefers-reduced-motion`: pins unpin to static stacks, scrubs become instant,
  reveals become 150ms opacity.
- Bans: parallax for its own sake, infinite loops, bounce/elastic, `linear` easing (progress bars
  excepted), scroll-event listeners, more than 2 pinned scenes, animating layout properties.

### 3.6 Storytelling formula (service-page narrative arc)

Synthesized from kore.ai's service + platform pages, sequenced by the Stripe/Linear proof ethic:

1. **Claim** (paper, 1 viewport): mono eyebrow pill → 72px headline naming the outcome (not the
   tech) → 20 words of subtext → black mono CTA + outlined secondary. Left-aligned or centered
   manifesto style, but only 4 text elements total.
2. **Show, immediately** (0.7 viewport): full-width near-black rounded media card: real product UI,
   demo capture, or duotone photography. The dark-card-on-paper contrast is the fold's event.
3. **Problem in the buyer's words** (paper-warm): oversized ink statement à la "No more {it worked}
   in the [Demo]", ruled hairlines, one duotone image. Emotional beat, no CTA.
4. **What changes** (ink section, pinned): stat trio (real numbers only: hallmark's honest-copy
   rule; placeholders labeled "metric to confirm" if Softree lacks them) + 3 brace-titled columns.
5. **How we work** (paper): the word-list scrollytelling: Softree's delivery verbs (Discover /
   Design / Build / Evaluate / Deploy / Govern) with a proof card per verb.
6. **Proof** (paper): logo tiles or 2-3 testimonial cards + one verifiable sentence-stat in body
   copy (Stripe style). Logos are logos only, no category captions.
7. **Capabilities index** (white cards): sticky left index + right feature blocks with real
   screenshots (kore.ai `service-05`), or a dashed-border capability grid if content is shallow.
8. **Close** (paper, before the orange footer): two CTA cards: solid ("Talk to an expert") +
   dashed-border ("Start an agentic pilot"). One contact intent, one label, everywhere. The sticky
   orange SOFTREE footer then lands as the final block of color: the accent's payoff.

### 3.7 Hard-ban list (page fails review if any appears)

- Purple-blue "AI" gradients; any gradient as a text fill or surface (soft <4%-chroma paper wash excepted)
- Glassmorphism, frosted panels, glowing/neon borders, drop-shadow glows on dark
- Generic centered hero over a dark mesh; `min-height:100vh` hero with one centered sentence
- Emoji icons anywhere; hand-rolled SVG icon paths; div-built fake screenshots
- More than 2 font families (sans + mono ONLY); serif injects for "premium" flavor
- More than 1 accent color (orange only; blue #1852ff at most as inline link color)
- `linear` or browser-default `ease` easing; bounce/elastic on UI; parallax decoration
- Em-dashes in any visible copy; section-number eyebrows (`01 / CAPABILITIES`); scroll cues ("Scroll to explore")
- Three-equal-card feature rows; >2 consecutive zigzag splits; eyebrow above every section (max 1 per 3 sections)
- Invented metrics ("+47% conversion", "trusted by 50,000 teams"); "Quietly trusted by" copy
- Pure #000 / pure #fff; two-line CTA labels; duplicate CTA intents; cookie-cutter 4-col link footer replacing the SOFTREE footer

---

## 4. Notes for downstream agents

- The GSAP skeletons to use verbatim live in `.agents/skills/design-taste-frontend/SKILL.md`
  sections 5.A (sticky stack), 5.B (horizontal pan), 5.C (whileInView stagger). Pin with
  `start: "top top"` always; the kore.ai bottom-tab fallback (`platform-768-hero.png`) is the
  approved <1024px degradation for pinned tab scenes.
- Isolate all motion in `"use client"` leaf components; never mix GSAP and Motion in one tree.
- Screenshot evidence for any disputed call: cite the file, e.g. dashed-border-as-newness is
  `kore/home-1440-07.png`, the mono-label system is `kore/about-1440-08.png`.
- Existing `/services/offshore-ai-development` content (copy, routes, SEO slugs) is preserved;
  only the visual/interaction layer changes (hallmark redesign safety rail).
