# Scoring rubrics

Source standard: Awwwards public Evaluation System, which scores jury submissions on:

| Criterion | Weight |
| --- | --- |
| Design | 40% |
| Usability | 30% |
| Creativity | 20% |
| Content | 10% |

Reference: https://www.awwwards.com/about-evaluation/

This loop also keeps a separate **Developer Quality Gate** inspired by Awwwards Developer Award expectations: modern code, performance, accessibility, interoperability, SEO, and robust implementation.

## Score Modes

| Mode | Gate | When |
| --- | --- | --- |
| `SOTD_TARGET` | official weighted score >= 8.5, no P0 | Default production-quality page loop |
| `TEN_OUT_OF_TEN` | official weighted score = 10.0, developer_quality = 10.0, no P0/P1/P2 | User explicitly asks for 10/10 |

All scores are **0-10**, one decimal allowed unless in `TEN_OUT_OF_TEN`, where every open issue prevents a perfect score.

## Official Awwwards Weighted Score

```
awwwards_score =
  design     * 0.40 +
  usability  * 0.30 +
  creativity * 0.20 +
  content    * 0.10
```

`developer_quality` is reported separately and must be >= 9.0 for SOTD_TARGET, exactly 10.0 for TEN_OUT_OF_TEN.

---

## design (40%)

| Score | Criteria |
| --- | --- |
| 10 | Award-level art direction, distinctive brand expression, impeccable hierarchy, no generic section rhythm, no visible template residue |
| 9-9.9 | Excellent, memorable, brand-true, only microscopic polish gaps |
| 8-8.9 | Strong production page, but some familiar patterns or uneven hierarchy |
| 7-7.9 | Competent but templated or visually uneven |
| <7 | Generic AI look, wrong brand, broken hierarchy |

**Deduct for:** purple gradients, equal 3-card grids as only rhythm, glass on everything, Inter-default vibe, competing accents, weak type scale.

**Award for:** cream/white band rhythm, orange used as accent not flood, structural variety, intentional negative space.

### Generic Site Rejection Test

A page cannot score above 8.8 in design unless it has a **screenshot-recognizable visual idea**: one named visual/mechanism that remains identifiable if the logo, headline, and brand name are removed.

The Design Checker must answer:

- What is the named signature visual idea?
- Which section proves it?
- Would a screenshot of this page be distinguishable from a high-quality SaaS template?
- Which exact sections avoid hero/cards/tabs/grids/CTA rhythm?
- Which exact sections still look generic?

If these answers are missing, design is capped at 7.0.

---

## usability (30%)

| Score | Criteria |
| --- | --- |
| 10 | Frictionless at 390/768/1024/1440, all targets >=44px, clear navigation, readable hierarchy, accessible states, fast perceived response |
| 9-9.9 | Excellent usability with only tiny polish notes |
| 8-8.9 | Solid and responsive, but one minor touch/spacing/clarity issue |
| 7-7.9 | Usable but has noticeable mobile, target, or flow issues |
| <7 | Overflow, unclear flow, broken responsive state, or accessibility blockers |

**Awwwards-specific note:** usability carries 30%, so mobile responsiveness, navigation clarity, accessibility, and perceived performance are not optional polish.

---

## creativity (20%)

| Score | Criteria |
| --- | --- |
| 10 | One or more original, brand-specific interaction or storytelling ideas that could be recognized from a screenshot or scroll recording |
| 9-9.9 | Distinctive and memorable, with minimal familiar-page feel |
| 8-8.9 | Strong direction, but still partly composed from known patterns |
| 7-7.9 | Polished but conservative |
| <7 | Generic sections, low originality, or novelty that hurts usability |

Creativity must not lower usability. A clever effect that breaks mobile, accessibility, performance, or business clarity is not high creativity.

Creativity requires a page-specific concept, not just nicer styling. A service page with only polished cards, tab panels, mock dashboards, process steps, proof blocks, and CTA sections is **not** creative above 8.0.

---

## content (10%)

| Score | Criteria |
| --- | --- |
| 10 | Honest, precise, high-signal copy; no invented metrics; every section advances the story; CTAs are contextual |
| 9-9.9 | Excellent content with only tiny wording refinements |
| 8-8.9 | Strong content, but some generic or repeated phrases |
| 7-7.9 | Clear but ordinary service copy |
| <7 | Invented proof, filler copy, weak specificity |

Any invented metric, fake rating, fake testimonial, or fake logo is a P0 and caps content at 5.

---

## developer_quality (separate gate)

| Score | Criteria |
| --- | --- |
| 10 | No lints, route 200, LCP safe, no layout thrash, no global hijack, all motion reduced-motion safe, accessible interactions, semantic structure, clean client boundaries |
| 9-9.9 | Excellent implementation with only microscopic cleanup notes |
| 8-8.9 | Safe production implementation, but has non-blocking performance/accessibility/code polish |
| 7-7.9 | Works but has meaningful implementation risks |
| <7 | Broken, janky, inaccessible, or globally risky |

Developer quality checks:

- [ ] No linter errors
- [ ] Route returns 200
- [ ] No `opacity: 0` blanking LCP text behind loader
- [ ] No scroll-linked `blur()`, `filter`, `backdrop-filter`, width, height, top, or left animation
- [ ] GSAP timelines scoped and cleaned up
- [ ] No global loader/Barba/root layout hijack
- [ ] Touch targets >= 44x44
- [ ] Keyboard/focus-visible states exist for interactive controls
- [ ] Reduced motion renders static final states
- [ ] Responsive verified at 390, 768, 1024, 1440

---

## Legacy dimension mapping

Older checker reports may emit `visual_design`, `storytelling`, `motion`, `layout_responsive`, `performance`, and `content_honesty`. Review agents must map them to Awwwards categories:

```
design =
  visual_design * 0.70 +
  motion        * 0.30

usability =
  layout_responsive * 0.60 +
  performance       * 0.25 +
  content_honesty   * 0.15

creativity =
  storytelling * 0.45 +
  motion       * 0.35 +
  visual_design * 0.20

content =
  content_honesty * 0.70 +
  storytelling    * 0.30

developer_quality =
  performance * 0.55 +
  layout_responsive * 0.35 +
  content_honesty * 0.10
```

---

## Automatic caps

| Issue | Cap |
| --- | --- |
| Any P0 | Verdict REJECTED |
| Invented proof | content <= 5, verdict REJECTED |
| Global root-layout motion hijack | developer_quality <= 5, verdict REJECTED |
| Mobile horizontal overflow | usability <= 6.5 |
| LCP text hidden with `opacity: 0` | developer_quality <= 6 |
| Missing reduced-motion path | usability <= 8, developer_quality <= 8 |
| Page feels like a template/card stack | creativity <= 8 |
| No memorable narrative/mechanism | creativity <= 7.5 |
| Shared sacred component issue left open | can pass SOTD_TARGET if documented, cannot reach TEN_OUT_OF_TEN |
| No screenshot-recognizable visual idea | design <= 8.0, creativity <= 7.5 |
| Generic dashboard/mockup is the main hero idea | design <= 8.2, creativity <= 7.8 |
| Hero + cards + tabs + grids + CTA + FAQ rhythm dominates | design <= 8.0, creativity <= 7.5 |
| Equal card grids are the main layout in more than two sections | design <= 8.0 |
| Design Checker provides praise without file-backed evidence | design <= 7.0 |
| Design could be rebranded by changing logo/color only | design <= 7.5, creativity <= 7.0 |

---

## Verdict table

| Condition | Verdict |
| --- | --- |
| mode `TEN_OUT_OF_TEN` and awwwards_score = 10.0 and developer_quality = 10.0 and no P0/P1/P2 | **PERFECT** |
| mode `SOTD_TARGET` and awwwards_score >= 8.5 and developer_quality >= 9.0 and no P0 | **APPROVED** |
| else | **REJECTED** |

---

## Report format (new)

```yaml
scores:
  design: 9.0
  usability: 9.0
  creativity: 8.6
  content: 9.2
  awwwards_score: 8.98
  developer_quality: 9.1
mode: SOTD_TARGET
verdict: APPROVED
```

For 10/10 requests:

```yaml
mode: TEN_OUT_OF_TEN
verdict: PERFECT | REJECTED
open_issues:
  p0: []
  p1: []
  p2: []
```

---

## Score stamp format (legacy accepted)

```yaml
scores:
  visual_design: 8.4      # design only
  storytelling: 8.2       # design only
  motion: 8.5             # design (+ perf notes)
  layout_responsive: 8.1  # responsive only
  performance: 8.0        # perf only
  content_honesty: 9.0    # review fills if design omitted
```

Checkers may still fill legacy dimensions, but Review must compute official Awwwards categories and developer quality.
