# Super Prompt: Loader → Hero Cinematic Handoff (Loop Until Done)

**Slug:** `kore-ai-exact`  
**Route:** `/kore-ai-component`  
**Mode:** `CINEMATIC_HANDOFF_LOOP`  
**Goal:** One continuous, cinematic, performance-safe transition from the K2 loader into `#meet-artemis` hero — where the **same hero background image** is visible in both states and the handoff feels like depth travel, not a cut.

**Loop until:** all gates in §9 pass with evidence, or `loops_max` reached → write escalation.

---

## 0. ORCHESTRATOR IDENTITY

You are the **Loader→Hero Transition Orchestrator**. You do not self-approve. You run build → check → correct cycles until the handoff clears every gate in §9 or budget is exhausted.

**Laws (priority order):**

1. Never approve without file path + screenshot + replay URL evidence.
2. Never loop past `loops_max` (default **6** for this prompt).
3. Never hide LCP hero text under a loader (`opacity: 0` on hero copy while loader runs is allowed only if the same text is visible in the loader layer).
4. Never mount loaders on `src/app/layout.tsx` — page-scoped only.
5. Never animate layout properties (`width`, `height`, `top`, `left`, `margin`) when `transform` + `opacity` can achieve the look.

**First action every loop:** read `.planning/page-forge/kore-ai-exact/loop-state.json`.  
**Last action every loop:** update `loop-state.json` + write `14-LOOP-<n>-HANDOFF.md`.

---

## 1. CREATIVE THESIS (ONE SENTENCE)

> The loader is not a separate screen — it is the hero **zoomed into**, playing its intro choreography; the handoff is the camera **pulling back** so the background settles into the frame while the headline **falls toward the viewer** and locks into the hero layout.

If you cannot explain the transition as depth travel (not fade-to-black), restart the motion spec.

---

## 2. SHARED ASSET LAW (NON-NEGOTIABLE)

The loader background **must** be the **exact same URL** as the hero background.

| Asset | Canonical export | Hero DOM |
| --- | --- | --- |
| Hero BG image | `KORE_HERO_BG_IMAGE` in `src/components/kore-ai-exact/koreHeroAssets.ts` | `#meet-artemis .k2-bg img` or equivalent |

**Rules:**

- Import `KORE_HERO_BG_IMAGE` in `KoreK2Loader.tsx` — never duplicate the URL string.
- Preload with `fetchPriority="high"` + `loading="eager"` on the loader `<img>`.
- Hero bg stays in DOM during loader (hidden via opacity/visibility on hero shell, not unmounted).
- At handoff end, loader bg and hero bg must be **pixel-aligned** (same `object-fit: cover`, same `object-position`, same overlay gradient family).

**Pass test:** DevTools → both imgs share identical `src`; at handoff t=0 and t=end, background focal point does not jump.

---

## 3. MOTION CHOREOGRAPHY (TARGET BEHAVIOR)

### Phase A — Loader intro (steps 0→3, preserve reference)

Keep the existing Kore K2 step machine:

| Step | What happens | Reference |
| --- | --- | --- |
| 0 | "Meet" chars stagger in | `k2-loader.css` `@keyframes loader0` |
| 1 | `{` block + green flash on `em` | `loader1-*` |
| 2 | `Artemis` width expand + char reveal | `loader2-*` |
| 3 | Progress bar completes; trigger handoff | `.step-3` |

**Do not break** step timing in `k2LoaderRuntime.ts` unless correcting a P0 stuck-loader bug. Hard stop remains **12s max**.

### Phase B — Cinematic handoff (the upgrade)

Triggered by `runCinematicHandoff()` in `k2CinematicHandoff.ts` after step 3.

#### B1. Background recedes ("falls backward inside the screen")

Stage the loader in a perspective container:

```css
.k2-loader-perspective {
  perspective: 1200px;
  perspective-origin: 50% 42%;
}
.k2-loader-bg {
  transform-style: preserve-3d;
  will-change: transform, opacity;
}
```

**Timeline (GSAP, single master timeline ~1.9s):**

| Time | Element | From → To | Easing | Notes |
| --- | --- | --- | --- | --- |
| 0.00 | `.k2-loader-bg` | `scale: 1.18, rotateX: 6deg, y: -2%` → `scale: 1, rotateX: 0, y: 0%` | `power3.inOut` | Feels like plane tilting back into the viewport |
| 0.00 | `.k2-loader-bg-overlay` | opacity holds → slight fade as bg settles | `power2.out` | Optional 0.15 opacity dip |
| 0.12 | `#meet-artemis .k2-bg` | `opacity: 0, scale: 1.16` → `opacity: 1, scale: 1` | `power3.inOut` | Crossfade with loader bg — same image, no flash |
| 0.00 | `.k2-loader-grain`, `.k2-loader-bar-item` | → `opacity: 0` | `power2.out` | Exit like current |

**Performance:** animate only `transform`, `opacity`. `rotateX` is allowed here as the signature 3D moment — max **one** rotated layer (the bg plane). No `filter`/`blur` on the full viewport.

#### B2. Headline falls toward screen (toward camera)

The loader heading (`[data-flip="loader"]`) and hero target (`[data-flip-target="loader"]`) perform a **FLIP** with a **Z-forward beat**:

| Time | Element | From → To | Easing |
| --- | --- | --- | --- |
| 0.20 | FLIP clone | `y: +72, scale: 0.82, opacity: 0.55` → `y: -8, scale: 1.06, opacity: 1` | `power3.out` |
| 0.82 | FLIP clone | → `x: 0, y: 0, scale: 1` | `power3.inOut` |
| 1.78 | swap | clone removed; hero target visible | — |

The **toward-camera** feel comes from the mid-keyframe: brief **overscale (1.06)** + **negative y** before settling — text appears to drop toward the viewer then lock into hero position.

Char stagger from loader CSS must **not** fight GSAP — set `animation: none` on clone during handoff.

#### B3. Hero rest content (same language as loader)

After headline lock (~1.05s), stagger hero siblings:

**Selectors (keep in sync with `HERO_REST_SELECTORS`):**

```
#meet-artemis .k2-container-hero > .k2-hero > .k2-text
#meet-artemis .k2-container-hero [data-stagger='300'] > *
#meet-artemis .k2-container-hero-2 .k2-text
#meet-artemis .k2-container-hero-2 .k2-cta
#meet-artemis .k2-tabs
```

| Property | From | To | Stagger |
| --- | --- | --- | --- |
| `opacity` | 0 | 1 | 0.08s |
| `y` | 56px | 0 | 0.08s |
| ease | — | `power3.out` | duration 0.75s |

Motion language matches loader: **vertical travel + opacity**, not slide-from-sides.

#### B4. Loader shell exit

| Time | Element | Action |
| --- | --- | --- |
| 1.45 | `.k2-loader-ui` | fade out |
| 1.50 | `.k2-loader` root | `autoAlpha: 0` then `finish()` removes portal |

Dispatch `kore-ai-intro-complete` + add `.kore-ai-intro-complete` on shell.

---

## 4. PERFORMANCE BUDGET

Read and apply: `design-motion-principles/references/performance.md`, `gsap-performance` skill.

| Rule | Limit |
| --- | --- |
| Animated properties | `transform`, `opacity` only (except single bg `rotateX`) |
| Simultaneous compositor layers | ≤ 6 during handoff |
| Handoff duration | 1.7–2.1s total |
| Loader auto-complete | ≤ 12s hard stop |
| Skip dismiss | ≤ 300ms (if skip control added) |
| Image weight | hero webp already CDN — no second fetch |
| Scroll lock | `html.kore-ai-k2-loader-running { overflow: hidden }` only during loader |
| Cleanup | kill timeline on unmount; remove flip clone; restore Lenis |

**LCP rule:** Hero H1 must be in DOM and not permanently `opacity: 0` after handoff. During loader, hero H1 may be hidden if loader displays equivalent heading text.

**Reduced motion:** skip entire handoff — instant `finish()`, hero visible, no 3D.

---

## 5. FILES (OWNERSHIP MAP)

| File | Role |
| --- | --- |
| `src/components/kore-ai-exact/koreHeroAssets.ts` | Single source for bg URL |
| `src/components/kore-ai-exact/KoreK2Loader.tsx` | Loader markup, portal, shared bg img |
| `src/components/kore-ai-exact/k2-loader.css` | Step animations, perspective stage, grain, bar |
| `src/components/kore-ai-exact/k2LoaderRuntime.ts` | Step machine, hard stop, session skip |
| `src/components/kore-ai-exact/k2CinematicHandoff.ts` | GSAP handoff timeline (primary edit surface) |
| `src/components/kore-ai-exact/KoreHeroSection.tsx` | `data-flip-target="loader"`, hero bg DOM |
| `src/components/kore-ai-exact/KoreAiExactPage.tsx` | Wires loader + hero; no root layout |
| `src/components/kore-ai-exact/kore-ai-page-fix.css` | Hero visibility fixes post-intro |

**Do not use** `KoreBarbaIntroTransition.tsx` for this loop — K2 loader is canonical for `/kore-ai-component`.

---

## 6. SKILLS TO LOAD (BY AGENT)

| Agent | Skills |
| --- | --- |
| Motion Builder | `gsap-core`, `gsap-timeline`, `gsap-performance`, `gsap-react`, `design-motion-principles` |
| Performance Checker | `gsap-performance`, `design-motion-principles/references/performance.md` |
| Design Checker | `design-motion-principles`, `emil-design-eng`, `high-end-visual-design` |
| Visual Diff | `visual-diff-checker` (if available), Playwright screenshots |

**Perspective weighting (marketing cinematic):** Primary **Jakub Krehel** (production polish), Secondary **Jhey Tompkins** (depth/play), Selective **Emil Kowalski** (skip bloat, hard stop budgets).

---

## 7. PIPELINE (LOOP)

```
READ loop-state.json
  ↓
MOTION BUILDER → implement/refine handoff per §3
  ↓
PARALLEL CHECK
  ├─ Animation Fidelity Agent   → 14a-ANIMATION.md
  ├─ Performance Agent          → 14b-PERFORMANCE.md
  └─ Visual Diff Agent          → 14c-VISUAL.md + screenshots
  ↓
REVIEW AGENT → 14-REVIEW.md (APPROVED | REJECTED)
  ↓
if REJECTED → CORRECTION AGENTS → increment loop → repeat
if APPROVED  → 14-VERIFICATION.md + user sign-off prompt
```

**Max loops:** 6. On exhaustion → `14-ESCALATION.md`.

---

## 8. AGENT PROMPTS

### 8a. Motion Builder

```
Role: Motion Builder — Loader→Hero cinematic handoff.
Read §1–§5 of 13-LOADER-HERO-CINEMATIC-SUPER-PROMPT.md.
Read current: k2CinematicHandoff.ts, k2-loader.css, KoreK2Loader.tsx, k2LoaderRuntime.ts.

Implement or refine:
1. Shared KORE_HERO_BG_IMAGE in loader + hero (no URL drift).
2. Perspective stage + bg recede (scale + rotateX) per §3-B1.
3. FLIP headline with toward-camera overscale beat per §3-B2.
4. Hero rest stagger per §3-B3.
5. Reduced-motion instant path.
6. Timeline cleanup on unmount.

Do not touch unrelated page sections.
Emit 14-BUILD-HANDOFF.md: files changed, timeline diagram, replay URL.
Run: npm run lint (must pass).
```

### 8b. Animation Fidelity Checker

```
Role: Animation Fidelity Checker.
Replay URL: http://localhost:3000/kore-ai-component?replay-loader=1

Verify frame-by-frame:
- [ ] Step 0→3 plays completely before handoff
- [ ] Background does not flash or swap to a different image
- [ ] Bg visibly recedes (scale down + subtle rotateX settle)
- [ ] Headline moves toward viewer then locks (overscale beat visible)
- [ ] Hero H1/sub/CTA/tabs stagger in after headline
- [ ] No loader stuck after 12s
- [ ] Second visit within 1h skips loader (localStorage k2LoaderPlayedAt)
- [ ] ?replay-loader=1 forces replay

Score /10 per criterion. List P0/P1 with timestamps in the sequence.
Write 14a-ANIMATION.md.
```

### 8c. Performance Checker

```
Role: Performance Checker.
Use gsap-performance skill.

Verify:
- [ ] Only transform + opacity animated (rotateX exception: bg layer only)
- [ ] No layout thrash in Performance panel during handoff
- [ ] Hero webp loaded once (Network tab)
- [ ] Lenis restarts after finish()
- [ ] Flip clone removed from DOM
- [ ] prefers-reduced-motion: instant hero, no 3D

Write 14b-PERFORMANCE.md with P0/P1.
```

### 8d. Visual Diff Checker

```
Role: Visual Diff Checker.
Capture at 390, 768, 1536 widths:
1. loader step-0 (early)
2. loader step-3 (pre-handoff)
3. handoff mid (~50%)
4. hero settled (post complete)

Save to .planning/page-forge/kore-ai-exact/handoff-loop-<n>/.
Compare hero settled frame to reference https://www.kore.ai/ai-agent-platform hero.
Write 14c-VISUAL.md with diff percentages and pass/fail.
```

### 8e. Review Agent

```
Role: Review Agent.
Read 14a, 14b, 14c + inspect code.

APPROVED only if:
- weighted score ≥ 8.5
- zero P0
- bg shared asset verified in code
- cinematic beats §3-B1/B2/B3 evidenced in screenshots or screen recording notes

Emit 14-REVIEW.md with verdict + dimension scores.
```

---

## 9. EXECUTABLE GATES (SCRIPT-FIRST)

Run in order each loop:

| # | Gate | Command / action | Pass |
| --- | --- | --- | --- |
| 1 | Lint | `npm run lint` | exit 0 |
| 2 | Route | `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/kore-ai-component` | 200 |
| 3 | Shared asset | grep: loader imports `KORE_HERO_BG_IMAGE` | single import |
| 4 | No layout hijack | loader not in `src/app/layout.tsx` | absent |
| 5 | Replay param | `?replay-loader=1` shows loader | manual/automation |
| 6 | Hard stop | loader gone ≤ 12s | timed |
| 7 | Reduced motion | emulate `prefers-reduced-motion: reduce` | hero instant |
| 8 | Screenshots | 4 frames × 3 viewports exist on disk | files present |
| 9 | Hero text visible | post-handoff: h1, flip, pill, body, cta, tabs opacity ≥ 0.85 | automation |
| 10 | Hero chars visible | ≥ 8 `.char` nodes opacity > 0.5 after settle | automation |
| 11 | Hero typography | H1 computed font-size 28–120px at 1536 | automation |
| 12 | Flip target visible | `[data-flip-target="loader"]` visibility visible | automation |

Checker reports contradicting a failed gate are **invalid**.

---

## 10. PASS CRITERIA (APPROVED)

| Dimension | Min score |
| --- | ---: |
| Shared bg continuity | 9.0 |
| Recede depth (B1) | 8.5 |
| Headline toward-camera (B2) | 8.5 |
| Hero stagger fidelity (B3) | 8.5 |
| Performance | 9.0 |
| Reference parity (Kore hero) | 8.5 |
| **Weighted overall** | **≥ 8.5** |

Plus: **zero P0**, user visual sign-off checkbox in scratchpad.

---

## 11. REPLAY & TEST PROTOCOL

**Force loader every time during loop:**

```
http://localhost:3000/kore-ai-component?replay-loader=1
```

Or: DevTools → Application → Local Storage → delete `k2LoaderPlayedAt` → hard refresh.

**Fresh intro session key (Barba overlay — separate):** `softree-kore-ai-exact-intro-v1` in sessionStorage — do not conflate with K2 loader.

---

## 12. loop-state.json SCHEMA (HANDOFF EXTENSION)

Merge into existing `loop-state.json`:

```json
{
  "handoff_loop": 0,
  "handoff_status": "IN_PROGRESS",
  "handoff_blockers": [],
  "handoff_completed_gates": [],
  "handoff_pending_gates": ["lint", "replay_loader", "screenshots", "animation_fidelity"],
  "handoff_budget": { "loops_used": 0, "loops_max": 6 }
}
```

---

## 13. CORRECTION PRIORITY

| Priority | Examples |
| --- | --- |
| **P0** | Loader stuck; bg URL mismatch; hero never appears; >12s hang; layout hijack; LCP text permanently hidden |
| **P1** | Weak depth read; FLIP misaligned at 390px; stagger too slow; grain/bar visible after handoff |
| **P2** | Easing polish; overlay opacity tune; screenshot delta <5% cosmetic |

Fix P0 before P1. One correction wave per loop.

---

## 14. QUICK INVOKE

Tell the orchestrator:

```
Run loader→hero cinematic handoff loop on kore-ai-exact.
Read 13-LOADER-HERO-CINEMATIC-SUPER-PROMPT.md and loop until APPROVED or max 6 loops.
Replay: ?replay-loader=1
```

---

## 15. DEFINITION OF DONE

The loop is **DONE** when:

1. `14-REVIEW.md` verdict = `APPROVED`
2. All §9 gates logged pass
3. User checks scratchpad: `[x] User visual sign-off`
4. Hero score ≥ 8.5 and loader handoff specifically ≥ 8.5 in animation dimension
5. `Verified: npm run lint -> exit 0` recorded in verification doc

Until then: **keep looping**.
