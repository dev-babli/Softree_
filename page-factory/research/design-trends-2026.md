# Award-Level Web Design — 2025–2026 Trend Research
> Generated 2026-07-03. Refresh when > 60 days old (design-researcher does this automatically).
> Awwwards scoring: Design 40% / Usability 30% / Creativity 20% / Content 10%. SOTD needs 8.0+.

## Trend directions

### 1. Type-as-Architecture (kinetic editorial typography)
Typography as the primary interface architecture. Viewport-scaled headlines (`clamp(3rem, 12vw, 12rem)`),
variable fonts animating weight/width on scroll, editorial poster compositions, text breaking the grid.
Dominant SOTD hero pattern 2025→2026. Fast (no hero video payload), signals confidence.
**Techniques**: GSAP SplitText (free in 3.13+) masked line reveals `yPercent: 100→0`; variable font axes via CSS
custom property + GSAP; display serif × grotesk sans pairing; scroll-velocity-reactive type via Lenis velocity.
**Examples**: Obys, Lando Norris by OFF+BRAND (SOTY 2025), Jeton.

### 2. Cinematic Scroll Narrative (chapter-based scrollytelling)
The page as a film with chapters: pinned full-viewport sections where scroll scrubs a timeline; text beats
choreographed against visual beats; chapter progress indicators. Scrollytelling drives ~62% dwell-time lift.
2026 refinement: preserve native scroll physics — scrub, never hijack.
**Techniques**: `ScrollTrigger.create({pin:true, scrub:0.5–1})` with one master timeline per chapter;
horizontal section via `x: () => -(scrollWidth - innerWidth)` in a pinned trigger (max ONE per page);
Lenis sync: `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add(t => lenis.raf(t*1000))` + `lagSmoothing(0)`.
**Examples**: Lando Norris, San Rita, Metabole Studio.

### 3. Restrained 3D Object ("one hero artifact")
A single beautifully-lit 3D object that scroll rotates/morphs/re-lights while HTML flows around it.
3D as punctuation, not wallpaper — 80% of the wow at 20% of the cost of full WebGL worlds.
**Techniques**: one fixed R3F `<Canvas>`; scroll → target value → `useFrame` lerp (never set directly);
custom fragment shader (fresnel/matcap/refraction) over heavy PBR+HDRI; `frameloop="demand"` idle;
drei `PerformanceMonitor` to degrade DPR.
**Examples**: Lando Norris helmet, Active Theory, Jeton.

### 4. Tactile Brutalism / Engineered Rawness
Sharp geometry, 1px hairline borders, visible grid lines, monospace metadata (indices `01 / Work`,
coordinates, timestamps), grain/scanline textures, stark contrast. Reads as engineering honesty.
**Techniques**: JetBrains Mono/Fragment Mono labels; SVG `feTurbulence` or tiled noise PNG at 3–5% opacity;
crosshair/registration-mark decorations; raw underlined links.
**Examples**: The Browser Company, v0.dev.

### 5. Dark-First "Mood Mode" with ambient gradients
Dark-first as default for dev/SaaS brands. Smoky layered mesh/aurora gradients used as *lighting*
(violet-blue glow behind a card), tinted neutrals over pure #000/#fff, grain to prevent banding,
ONE saturated accent.
**Examples**: Linear, Vercel, Arc.

### 6. Scroll-Scrubbed Sequences (frames / 3D flythrough)
Scroll scrubs a cinematic sequence, Apple-style. Reliable: (a) WebP/AVIF frame sequence → canvas
`drawImage`; (b) R3F camera on `CatmullRomCurve3` with lerped scroll progress. `<video>` currentTime
scrubbing = fragile, avoid. One per site.

### 7. Micro-Interaction Density ("everything responds")
Every interactive element acknowledges the user: magnetic buttons, char-shuffle link hovers, custom cursor
states, cursor-following work-index previews, view transitions, scroll-velocity image skew.
Cheapest trend to execute, highest ROI on Usability+Design scoring. Restraint > confetti.
**Techniques**: GSAP `quickTo()` for cursor/magnetics; `clip-path` hover reveals; Next View Transitions.
**Examples**: Locomotive, Obys, Aino.agency.

### 8. Performance-as-Aesthetic (the DSOTD play)
Sites that *visibly* perform: instant load, sub-800ms or no preloader, 60fps, device-adaptive scenes.
Targets belong in the brief: Lighthouse 90+, LCP < 2s, CLS < 0.1, 60fps mid-tier mobile.
**Examples**: Vercel, Linear, Bruno Simon 2025 portfolio.

## Recommended synthesis for this stack (Next + GSAP + Lenis + R3F)
Dark-first tinted-neutral palette + one ambient shader gradient (§5) + type-as-architecture hero with
SplitText choreography (§1) + one restrained 3D artifact scrubbed by scroll (§3) + one chapter-based pinned
narrative (§2) + dense micro-interactions (§7), engineered to DSOTD standards (§8), with tactile-brutalist
metadata texture (§4: mono indices, hairlines, grain) as the differentiator.

## Motion language cheat sheet
| Use case | Easing | Duration |
|---|---|---|
| Default UI / reveals | `power2.out`–`power3.out` | 150–300ms micro, 500–800ms reveals |
| Hero / dramatic | `power4.out`, `expo.out` | 0.8–1.4s total choreography |
| Exits | `power1.in`/`power2.in` | ≈ 2/3 of entrance |
| Pinned scrub | `none` + `scrub: 0.5–1` | scrub IS the easing |
| Cursor/magnetic | `quickTo` `power3`, dur 0.4–0.6 | continuous |
| Playful accents | `back.out(1.4)` | sparingly |

Staggers: chars 0.015–0.03s · words 0.04–0.08s · lines 0.08–0.12s · cards 0.06–0.1s.
Cap total stagger envelope ~0.6s; prefer `amount` over `each` for large collections.
Lenis: `lerp: 0.1`, `autoRaf: false` synced to GSAP ticker, native scroll on touch.
Reduced motion: `gsap.matchMedia()` both contexts; reduced = opacity-only ≤300ms, no pins/parallax,
Lenis destroyed or `lerp: 1`, 3D static poster. Expose a manual motion toggle.

## Performance techniques
1. transform/opacity only (Lighthouse flags non-composited animation)
2. `will-change` applied just-before, removed after
3. gate loops to viewport (`onToggle` pause/play)
4. lazy-mount R3F: `dynamic(…, {ssr:false})` + IO rootMargin 200% + static poster until mount
5. `frameloop="demand"` idle, `invalidate()` on interaction
6. adaptive DPR (cap 1.5–2), fewer particles on mobile, drei `<Detailed>` LODs
7. instancing + shared geometries/materials
8. Draco/Meshopt GLB, KTX2 textures, `useGLTF.preload()`
9. `content-visibility: auto` + `contain-intrinsic-size` below fold
10. facade pattern: static bg ships first, WebGL layer hydrates after LCP
11. 2 font families max, variable fonts, `size-adjust` fallbacks, SplitText after `document.fonts.ready`
12. Server Components for static content; `"use client"` islands only on animated leaves
13. Targets: Lighthouse 90+, LCP < 2s, CLS < 0.1, 60fps mid-tier mobile

## Never-do list (dated / anti-patterns)
- Scroll hijacking (wheel = slide navigation)
- Preloaders > 1s / branded loading narratives
- Fade-up on every section (reveals: hero + section headers only)
- Kinetic type on body copy or nav
- 2015–2020 leftovers: gradient blobs, tilt cards, particles.js dots, generic Lottie heroes, typewriter effects, number counters, centered template hero
- Full-page WebGL distortion on every image hover
- Smooth synthetic scrolling on touch
- Purposeless 3D (155KB+ for a generic blob)
- Vague premium-sounding hero copy that explains nothing
- Ignoring `prefers-reduced-motion`
- More than one marquee
- Uniform bento grids (2024 look — use editorial asymmetry instead)
