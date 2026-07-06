# PRD: Softree Awwwards Looping Agent

## 0. Orchestrator Contract

Before applying this PRD, the Orchestrator must read and obey [`ORCHESTRATOR-SYSTEM-PROMPT.md`](ORCHESTRATOR-SYSTEM-PROMPT.md).

That file is the harness law for this product. If this PRD and the orchestrator prompt conflict, the orchestrator prompt wins.

Before any Design Intent, Story, Component Map, or Build phase, the relevant agents must also read and obey [`references/design-generation-super-prompt-v2.md`](references/design-generation-super-prompt-v2.md).

That file is the design-generation law for this product. It governs the visual argument, kill list, token system, motion spec, copy tests, and final design tests. The harness law still decides whether the work is allowed to ship.

## 1. Product Summary

The Softree Awwwards Looping Agent is a multi-agent design-to-code and page-improvement system for building Softree marketing pages from rich design inputs. It accepts natural-language prompts, competitor/reference URLs, local HTML files, screenshots, videos, existing code, and brand/content constraints. It then researches, plans, builds, visually compares, audits, corrects, and repeats until the target quality gate is met.

The system must not behave like a one-shot page generator. "Looping" means iterative improvement with evidence. Every pass must produce artifacts, scores, blocker lists, and concrete corrections. In `TEN_OUT_OF_TEN` mode, the loop does not stop until every relevant checker returns 10/10 with zero P0/P1/P2 issues, or the orchestrator writes an honest blocker report explaining why perfection is impossible with the current inputs.

## 2. Problem

Current page-generation agents often fail in predictable ways:

- They produce polished but generic SaaS/service pages.
- They accept weak visual checker reports with vague praise.
- They do not clone reference animation behavior accurately.
- They lack deterministic visual regression checks.
- They improve one dimension while breaking another.
- They stop at "approved" rather than continuing to refine.
- They fabricate proof, logos, metrics, or testimonials.
- They do not distinguish inspiration from exact cloning.

The user wants a system that can receive design inputs, including raw HTML reference pages, and reproduce or adapt them with high visual and animation fidelity while preserving Softree's stack, content honesty, accessibility, performance, and responsiveness.

## 3. Goals

1. Accept multiple input types:
   - Prompt-only design direction.
   - Reference website URL.
   - Local HTML/CSS/JS file.
   - Screenshots.
   - Screen recordings.
   - Existing Softree route/component.
   - Brand/content notes.

2. Support two build modes:
   - `INSPIRED_MODE`: borrow structure, motion logic, and design principles without copying protected content/assets.
   - `EXACT_REFERENCE_MODE`: reproduce user-provided or rights-cleared HTML/reference behavior as closely as possible.

3. Build in Softree's existing stack:
   - Next.js App Router.
   - React.
   - Tailwind CSS.
   - GSAP/ScrollTrigger where needed.
   - Framer Motion only for isolated component motion.
   - Existing brand and motion tokens.
   - Any supplied HTML/CSS/vanilla JS/CDN prompt must be converted into this stack before implementation. Preserve visual and motion intent, but adapt architecture to route files, React components, page-scoped CSS, installed package imports, `next/script` for required browser custom elements, and cleanup-safe effects.

4. Iterate until quality targets are reached:
   - Visual/design 10/10.
   - UI/UX 10/10.
   - Responsive 10/10.
   - Performance/developer quality 10/10.
   - Content honesty 10/10.

5. Use deterministic verification wherever possible:
   - Playwright screenshots.
   - DOM/CSS/motion extraction.
   - Visual diff thresholds.
   - Viewport checks.
   - Reduced-motion checks.
   - Lint/build/route health.
   - Accessibility and keyboard checks.

## 4. Non-Goals

- Do not blindly scrape and reuse third-party copyrighted assets unless the user provides rights-cleared material.
- Do not fabricate client proof.
- Do not mount global loaders/Barba transitions unless explicitly requested.
- Do not hide LCP content behind loaders.
- Do not use reference cloning as an excuse to break accessibility or performance.
- Do not call generic pages "Awwwards-level."

## 5. Research Basis

### Awwwards Scoring

Awwwards publicly scores sites by:

- Design: 40%
- Usability: 30%
- Creativity: 20%
- Content: 10%

Developer quality is evaluated separately for Developer Award-style expectations: performance, SEO, accessibility, interoperability, and implementation quality.

### Visual Regression

Modern visual QA should use Playwright `toHaveScreenshot()` with:

- Stable browser environment.
- Viewport-specific screenshots.
- Component/section-level screenshots where possible.
- Full-page screenshots for route-level regression.
- Animation disabling for static diffs.
- Dynamic content masks.
- Tight pixel thresholds.
- Diff artifacts stored for review.

### Motion / Animation Quality

Production motion should:

- Animate transform and opacity only where possible.
- Avoid width, height, top, left, blur, and filter animation.
- Use CSS sticky before JS pinning where possible.
- Use one major ScrollTrigger pin per page.
- Use `gsap.context`, cleanup, and exception-safe release.
- Respect `prefers-reduced-motion`.
- Test on mobile/throttled devices.

### Agent Loop Engineering

Reliable AI loops need:

- External verification, not self-confidence.
- Separate builder and critic roles.
- Structured artifacts.
- Checkpointing.
- Deterministic gates.
- Stop conditions.
- Escalation when blocked.
- Harness updates when repeated failures occur.

## 6. User Stories

1. As a user, I can provide a prompt like "make this page feel like a cinematic AI infrastructure site" and get a researched, non-generic Softree page.

2. As a user, I can provide a website URL and ask the loop to analyze its layout, motion, and interaction patterns before adapting them to Softree.

3. As a user, I can provide a local HTML file and ask the loop to clone the layout and animations as closely as possible in the Softree stack.

4. As a user, I can demand `10/10` and the loop will not stop at 8.5 or 9.0.

5. As a user, I can see why the loop has not reached 10/10 because every blocker is documented with evidence.

6. As a user, I can trust the visual checker because it rejects generic pages and must identify a screenshot-recognizable signature idea.

## 7. Input Contract

Each run starts with a `00-BRIEF.md`:

```yaml
route: /services/example
slug: example
mode: INSPIRED_MODE | EXACT_REFERENCE_MODE
score_mode: SOTD_TARGET | TEN_OUT_OF_TEN
input_types:
  prompt: true
  reference_url: optional
  local_html: optional
  screenshots: optional
  video: optional
  existing_route: optional
rights:
  clone_allowed: true|false|unknown
must_preserve:
  - nav
  - footer
  - content honesty
design_goal: short paragraph
content_source: provided | softreetechnology.com | existing route | user-supplied
```

## 8. Modes

### 8.1 INSPIRED_MODE

Use when the user provides external websites for inspiration but not ownership/permission.

Allowed:

- Analyze structure.
- Analyze motion patterns.
- Recreate interaction principles.
- Adapt mood, pacing, layout logic, and storytelling.

Forbidden:

- Copy third-party assets.
- Copy exact text.
- Copy protected branding.
- Claim exact clone.

### 8.2 EXACT_REFERENCE_MODE

Use when the user provides local HTML/CSS/JS, owns the material, or explicitly confirms clone permission.

Goal:

- Match layout, spacing, visual rhythm, interaction behavior, scroll behavior, and animation timing as closely as possible.

Verification:

- Screenshot diff vs rendered reference.
- DOM/layout mapping.
- Animation event/timeline sampling.
- Viewport comparison.
- Manual note for anything impossible due to stack/browser/API differences.

## 9. System Architecture

```text
Input Intake
  ↓
Reference Analyzer
  ↓
Research Scout
  ↓
Design Intent Extractor
  ↓
Story Architect
  ↓
Component Mapper
  ↓
Builder
  ↓
Deterministic Verification
  ↓
Parallel Human-like Checkers
  ↓
Review Aggregator
  ↓
Correction Agents
  ↓
Repeat Until Gate Met
```

## 10. Agent Roster

### 10.1 Orchestrator

Owns the loop state. It launches agents, merges results, prevents false approvals, and decides when to continue or escalate.

Responsibilities:

- Create run folder.
- Write brief.
- Enforce mode.
- Launch research and analyzer agents.
- Launch checker agents in parallel.
- De-duplicate blockers.
- Route blockers to correction agents.
- Refuse unsupported 10/10 claims.

### 10.2 Input Intake Agent

Normalizes user inputs.

Outputs:

- `00-BRIEF.md`
- `00-INPUT-MANIFEST.md`

Extracts:

- Routes.
- Provided prompts.
- Reference URLs.
- Local file paths.
- Screenshot/video paths.
- Clone permission status.
- Must-preserve constraints.

### 10.3 Reference Analyzer

Reads URL or HTML reference and extracts:

- Section order.
- DOM hierarchy.
- Typography scale.
- Color palette.
- Layout grid.
- Sticky/pin behavior.
- Animation triggers.
- CSS keyframes.
- JS motion libraries.
- Asset dependencies.
- Responsive breakpoints.

Outputs:

- `01-REFERENCE-ANALYSIS.md`
- `01-REFERENCE-MOTION-MAP.md`
- `01-REFERENCE-ASSET-MAP.md`

### 10.4 Web Research Scout

Researches:

- Awwwards/Codrops/current trends.
- Comparable pages.
- Motion techniques.
- Performance constraints.
- Interaction patterns.

Outputs:

- `02-RESEARCH.md`
- `02-REFERENCES.md`

### 10.5 Design Intent Extractor

Turns reference material into design principles.

Outputs:

- `03-DESIGN-INTENT.md`

Must define:

- One-sentence signature argument using mechanism + material + restraint.
- Kill-list audit with written justification for any exception.
- Exact color/type/layout token system with exclusive jobs and numeric scales.
- ASCII wireframes for major sections.
- Motion grammar with one-pin budget, real durations/easing, and reduced-motion frozen state.
- Copy swap-test results.
- Five final-test answers.
- Anti-generic constraints.
- What to clone exactly.
- What to adapt for Softree.

### 10.6 Story Architect

Creates the page narrative.

Outputs:

- `04-STORY.md`

Must include:

- Hook.
- Tension.
- Signature mechanism.
- Proof.
- Process.
- Close.
- Scroll/motion role per section.

### 10.7 Component Mapper

Maps story to implementation.

Outputs:

- `05-COMPONENT-MAP.md`

Must include:

- Section list.
- Component file paths.
- Motion library.
- Responsive behavior.
- Reference match requirements.
- Anti-template answer for each section.

### 10.8 Builder

Implements the page.

Outputs:

- Code.
- `06-BUILD.md`

Must:

- Use existing stack.
- Keep page server-friendly.
- Use client islands only where needed.
- Implement reference motion faithfully in exact mode.
- Implement signature visual mechanism.

### 10.9 Visual Diff Agent

Runs Playwright screenshot comparisons.

Outputs:

- `07-VISUAL-DIFF.md`
- Actual screenshots.
- Diff screenshots.

Viewports:

- 390
- 768
- 1024
- 1440

Thresholds:

- Exact reference section diff target: <= 0.5% unless anti-aliasing requires documented exception.
- Inspired mode visual regression: no unexpected layout drift, no broken sections.
- Full-page diff may use slightly higher tolerance; section-level diff is preferred.

### 10.10 Animation Fidelity Agent

Validates animation behavior.

Outputs:

- `08-ANIMATION-FIDELITY.md`

Checks:

- Trigger positions.
- Durations.
- Easing.
- Stagger.
- Pin behavior.
- Sticky behavior.
- Reduced-motion fallback.
- Mobile degradation.
- No layout-property animation.
- No uncontrolled RAF leaks.

For exact clone mode, it samples key animation states:

- Initial.
- 25%.
- 50%.
- 75%.
- Final.

### 10.11 Visual Design Checker

Adversarial visual juror.

Outputs:

- `09a-DESIGN.md`
- `09a-VISUAL-ANTI-GENERIC.md`

Rejects:

- Generic SaaS/service pages.
- Dashboard-only hero ideas.
- Card-grid rhythm.
- Logo/color rebrandable pages.
- No screenshot-recognizable signature idea.

### 10.12 UI/UX Checker

Outputs:

- `09b-UX.md`

Checks:

- Navigation.
- Keyboard access.
- Focus states.
- Touch targets.
- CTA clarity.
- Form announcements.
- Mobile flow.
- Hidden content semantics.

### 10.13 Responsive Checker

Outputs:

- `09c-RESPONSIVE.md`

Checks:

- 390/768/1024/1440.
- No overflow.
- No clipping.
- No broken sticky/pin.
- Correct stacking.
- Footer/nav on mobile.

### 10.14 Performance Checker

Outputs:

- `09d-PERFORMANCE.md`

Checks:

- Route 200.
- Lints.
- LCP safety.
- Client boundaries.
- WebGL cleanup.
- GSAP cleanup.
- Reduced motion.
- No global motion hijack.
- No scroll jank.

### 10.15 Content Honesty Checker

Outputs:

- `09e-CONTENT.md`

Checks:

- No fake metrics.
- No fake testimonials.
- No fake logos.
- All proof sourced.
- All claims qualified.
- Copy specific to service.

### 10.16 Review Aggregator

Outputs:

- `10-REVIEW.md`

Computes:

```text
awwwards_score =
  design * 0.40 +
  usability * 0.30 +
  creativity * 0.20 +
  content * 0.10
```

Also tracks:

- Developer quality.
- P0/P1/P2.
- Evidence gaps.
- Required next correction agents.

### 10.17 Correction Agents

Types:

- Design Fixer.
- Clone Fidelity Fixer.
- Animation Fixer.
- Responsive Fixer.
- UX/A11y Fixer.
- Performance Fixer.
- Content Fixer.

Each correction agent only fixes assigned blockers and writes:

- `11-LOOP-<n>-<dimension>-FIXES.md`

## 11. Loop State Machine

```text
INIT
  ↓
INPUT_LOCKED
  ↓
REFERENCE_ANALYZED
  ↓
RESEARCH_COMPLETE
  ↓
STORY_LOCKED
  ↓
MAP_LOCKED
  ↓
BUILT
  ↓
VERIFIED
  ↓
REVIEWED
  ↓
PASSED → SHIP_REPORT
  ↓
FAILED → CORRECTION_WAVE → BUILT
  ↓
BLOCKED → BLOCKER_REPORT
```

## 12. Scoring and Gates

### SOTD_TARGET

Passes when:

- Awwwards score >= 8.5.
- Developer quality >= 9.0.
- No P0.

### TEN_OUT_OF_TEN

Passes only when:

- Design = 10.0.
- Usability = 10.0.
- Creativity = 10.0.
- Content = 10.0.
- Developer quality = 10.0.
- Visual diff/fidelity gates pass.
- No P0/P1/P2.
- No evidence gaps.

## 13. Strict Visual Metrics

The page must have:

- One named signature visual idea.
- Screenshot-recognizable identity.
- Art direction beyond color/logo swap.
- Section variety.
- Story-driven layout.
- No dominant template rhythm.

Automatic caps:

- No signature idea: design <= 8.0.
- Generic dashboard hero: design <= 8.2.
- Hero + cards + tabs + grids + CTA + FAQ rhythm: design <= 8.0.
- Rebrandable by logo/color only: design <= 7.5.
- Praise without evidence: design <= 7.0.

## 14. Exact Clone Fidelity Metrics

Used in `EXACT_REFERENCE_MODE`.

### Layout Fidelity

- Section order must match unless documented.
- Major element positions within ±4px at target viewport where possible.
- Typography scale within ±2px.
- Spacing rhythm within ±4px.
- Breakpoint behavior must match or be documented.

### Visual Fidelity

- Section screenshot diff <= 0.5% preferred.
- Full-page screenshot diff <= 1.0% preferred.
- Color deltas must be documented if Softree brand adaptation is required.

### Motion Fidelity

- Trigger points within ±5% scroll progress.
- Duration within ±100ms.
- Easing family matched or justified.
- Stagger count/order matched.
- Pin/sticky behavior matched.
- Animation state sampled at 0/25/50/75/100%.

### Interaction Fidelity

- Hover/focus states matched or adapted accessibly.
- Menus/tabs/accordions work by mouse and keyboard.
- Reduced-motion equivalent exists.

## 15. Anti-Cheat Rules

No checker may give 10/10 unless it states:

```text
I found zero P0, zero P1, zero P2, and no evidence gaps across my assigned category.
```

Visual checker must additionally state:

```text
I found zero generic-template signals and the page has a screenshot-recognizable visual idea: <name>.
```

Invalid checker behavior:

- Vague praise.
- No file references.
- No viewport references.
- No screenshot/visual evidence.
- Ignoring generic structure.
- Giving 10/10 with open P2s.
- Builder grading its own output.

## 16. Artifacts Per Run

```text
.planning/page-forge/<slug>/
  00-BRIEF.md
  00-INPUT-MANIFEST.md
  01-REFERENCE-ANALYSIS.md
  01-REFERENCE-MOTION-MAP.md
  01-REFERENCE-ASSET-MAP.md
  02-RESEARCH.md
  03-DESIGN-INTENT.md
  04-STORY.md
  05-COMPONENT-MAP.md
  06-BUILD.md
  07-VISUAL-DIFF.md
  08-ANIMATION-FIDELITY.md
  09a-DESIGN.md
  09a-VISUAL-ANTI-GENERIC.md
  09b-UX.md
  09c-RESPONSIVE.md
  09d-PERFORMANCE.md
  09e-CONTENT.md
  10-REVIEW.md
  11-LOOP-<n>-*-FIXES.md
  12-FINAL-VERIFICATION.md
  12-BLOCKER-REPORT.md
```

## 17. Required Tools

Minimum:

- File reader/writer.
- Web search.
- Playwright or browser automation.
- Screenshot capture.
- Visual diff.
- Linter diagnostics.
- Route HTTP checker.
- Optional Chrome DevTools MCP.

Preferred:

- Playwright `toHaveScreenshot()`.
- Section-level screenshot tests.
- Trace/video capture for animation debugging.
- DOM extractor for reference HTML.
- CSS parser for reference styles.

## 18. Verification Requirements

Every loop must run:

- Lints on edited files.
- Route HTTP check.
- Responsive review at 390/768/1024/1440.
- Reduced-motion review.
- Visual anti-generic checklist.
- Performance/developer-quality audit.
- Content honesty audit.

Exact clone mode additionally runs:

- Reference screenshot capture.
- Candidate screenshot capture.
- Visual diff.
- Animation state sampling.

## 19. Failure Handling

If the loop cannot reach 10/10:

- Do not pretend it did.
- Write `12-BLOCKER-REPORT.md`.
- Identify blockers by type:
  - Missing reference permission.
  - Missing real proof.
  - Shared chrome prevents accessibility 10.
  - Reference uses impossible/prohibited assets.
  - Performance conflict with exact clone.
  - User must provide screenshot/video/HTML.

## 20. PRD Acceptance Criteria

The looping agent is ready when:

- It supports prompt, URL, local HTML, screenshot, and video reference inputs.
- It creates all required planning/checker artifacts.
- It can distinguish exact clone vs inspired adaptation.
- It uses Awwwards-weighted scoring.
- It has deterministic Playwright visual checks.
- It rejects generic pages.
- It cannot self-approve.
- It continues iteration in 10/10 mode until all categories are 10/10 or a blocker report is written.

## 21. Implementation Roadmap

### Phase 1: Harness Upgrade

- Add input manifest.
- Add reference analyzer.
- Add visual anti-generic artifact.
- Add stricter review aggregation.

### Phase 2: Visual Diff Pipeline

- Add Playwright screenshot scripts.
- Add section-level visual tests.
- Add baseline/diff artifact storage.
- Add viewport matrix.

### Phase 3: Animation Fidelity Pipeline

- Add motion map extraction.
- Add sampled animation-state checks.
- Add GSAP/ScrollTrigger audit template.

### Phase 4: Exact Clone Mode

- Add HTML/CSS/JS parser workflow.
- Add asset mapping.
- Add clone permission checks.
- Add exact-vs-adapted diff reporting.

### Phase 5: Persistent Learning

- Convert repeated checker failures into permanent rubric rules.
- Add anti-cheat regression tests.
- Add design-pattern blacklist for generic layouts.

## 22. Open Questions

- Should exact clone mode be allowed for third-party sites without ownership proof, or should it always default to inspired mode?
- Should visual baselines be committed to git, stored under `.planning`, or kept outside the repo?
- Should the loop use browser automation by default, or only when a dev server is running?
- Should the user approve the signature visual idea before build in 10/10 mode?

