# Implementation Plan: Page Forge Agent System

## Overview

This plan builds the Page Forge Agent System as two layers: a **deterministic executable core** (pure TypeScript under `src/lib/page-forge/` plus scripts under `scripts/page-forge/`) and an **agent layer** (prompt/steering specs colocated with the existing `.agents/skills/awwwards-page-loop/` skill).

The build order is deliberate: (1) shared types and constraints, (2) the pure decision modules (brief, scoring, loop, artifacts, phase-skills) test-first, (3) the rule evaluators and validators, (4) build static-analysis, (5) state/resume and the orchestrator that wires everything, (6) the evidence-capture scripts, (7) the agent-layer prompt/steering definitions and machine-readable pipeline config, and (8) the CLI entry that ties the executable core to a runnable command. Each step builds on the previous ones and ends by wiring new code into the orchestrator or CLI so nothing is orphaned.

Testing uses Vitest (`npm run test` → `vitest run`) with fast-check. The design defines 50 numbered correctness properties; each is implemented as a single property-based test with ≥100 iterations and a tag comment of the form `// Feature: page-forge-agent-system, Property N: <name>`. Property/unit/integration test sub-tasks are marked optional with `*`.

## Tasks

- [ ] 1. Establish shared foundations (types + constraints)
  - [x] 1.1 Create domain types module `src/lib/page-forge/types.ts`
    - Define `PageKind`, `Phase`, `PHASE_ORDER`, `Dimension`, `Score`, `Severity`, `Finding`, `DimensionScores`, `Verdict`, `CheckerReport`, `EvidenceRef`, `ReviewArtifact`
    - Define `DesignDirection`, `ReferenceSource`, `ScrollBeat`, `ScrollBehavior`, `ComponentAssignment`, `LoopState`, `LoopAction`, `PipelineState`, `Brief`, `BriefInput`, `FieldState<T>`, `RangeRejection`
    - Define `ViewportMeasurement` and `PerfMeasurement` measurement shapes
    - _Requirements: 1.1, 9.4, 9.7, 13.2_
  - [x] 1.2 Create constraints module `src/lib/page-forge/constraints.ts`
    - Export `BRAND_TOKENS`, `FORBIDDEN_AESTHETICS`, `SACRED_UI`, `ANIMATABLE_PROPS`, `PIN_BUDGET`, `BREAKPOINTS`, `MOTION_TOKEN_SOURCE`
    - Add `isSacredUi(path)` and `isSacredEditPermitted(path, expandedScope)` helpers used by the constraint linter
    - _Requirements: 1.6, 8.6, 14.7, 17.1, 17.2, 17.3, 17.5, 17.7_
  - [x] 1.3 Write property test for Sacred_UI edit permission
    - **Property 4: Sacred_UI edits are permitted only within expanded scope**
    - **Validates: Requirements 1.6, 8.6, 14.7**

- [x] 2. Implement the Brief module
  - [x] 2.1 Implement `src/lib/page-forge/brief.ts`
    - Implement `normalizeBrief(input)` with threshold clamping to `[0.0,10.0]` (default 8.5) and Max_Loops clamping to integer `[1,10]` (default 4), recording `RangeRejection` entries
    - Mark absent fields via `FieldState`, compute `missingRequired` from route/slug/contentSource, capture `sacredUi` list
    - Export `DEFAULT_THRESHOLD`, `DEFAULT_MAX_LOOPS`, `THRESHOLD_RANGE`, `MAX_LOOPS_RANGE`, `REQUIRED_FIELDS`
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.6_
  - [x] 2.2 Write property test for Brief threshold and Max_Loops clamping
    - **Property 5: Brief threshold and Max_Loops clamping**
    - **Validates: Requirements 2.4, 2.5, 2.6**
  - [x] 2.3 Write property test for absent-field marking and gate progression
    - **Property 6: Absent fields are marked and gate progression**
    - **Validates: Requirements 1.5, 2.2, 2.8**

- [ ] 3. Implement the artifacts module (naming, guarded IO, front-matter round-trip)
  - [x] 3.1 Implement `src/lib/page-forge/artifacts.ts`
    - Export `ROOT(slug)`, `ARTIFACT_NAMES`, `loopArtifactName(n, dim)`
    - Implement `persist(slug, name, content)` and `verifyExists(slug, name)` with a synchronous path-escape guard that rejects any path resolving outside `ROOT(slug)`
    - Implement `parseArtifact<T>(raw)` / `serializeArtifact<T>(front, body)` for YAML front matter + Markdown body
    - _Requirements: 1.2, 1.4, 2.1, 9.2, 13.1, 15.1_
  - [x] 3.2 Write property test for write confinement to the session directory
    - **Property 3: Artifact writes are confined to the session directory**
    - **Validates: Requirements 1.4**
  - [x] 3.3 Write property test for artifact front-matter round-trip
    - **Property 50: Artifact front-matter round-trips**
    - **Validates: Requirements 13.1, 16.1, 16.2**

- [x] 4. Implement the scoring engine
  - [x] 4.1 Implement `src/lib/page-forge/scoring.ts`
    - Export `WEIGHTS` (summing to 1.0), `PASS_DIMENSION_MIN = 8.0`
    - Implement `computeOverall(scores)` as the fixed weighted mean over scored dimensions
    - Implement `evaluateGate(scores, findings, threshold)` returning APPROVED iff overall ≥ threshold, every required scored dimension ≥ 8.0, and no open P0; treat a null required dimension as failing
    - Implement `mergeFindings(reports)` to de-duplicate P0/P1 across checkers and order by user impact
    - Add helpers for content-honesty cap (≤5 with forced P0) and the never-inflate rule used by the Review agent, plus open-P2 selection for the ship report
    - _Requirements: 9.4, 9.7, 13.2, 13.3, 13.4, 13.5, 13.7, 13.8, 15.3, 17.6_
  - [x] 4.2 Write property test for the fixed weighted-mean overall score
    - **Property 38: Overall score is the fixed weighted mean**
    - **Validates: Requirements 13.2**
  - [x] 4.3 Write property test for the exact verdict gate
    - **Property 39: Verdict gate is exact**
    - **Validates: Requirements 13.3, 13.4**
  - [x] 4.4 Write property test for finding merge/de-duplication
    - **Property 40: Finding merge de-duplicates and preserves uniques**
    - **Validates: Requirements 13.5**
  - [x] 4.5 Write property test for never inflating review scores
    - **Property 41: Review scores are never inflated without new evidence**
    - **Validates: Requirements 13.7**
  - [x] 4.6 Write property test for invented-content honesty cap
    - **Property 42: Invented content caps honesty and forces a P0**
    - **Validates: Requirements 13.8, 17.6**
  - [x] 4.7 Write property test for checker dimension assignment and score range
    - **Property 21: Checkers score only their assigned dimensions within range**
    - **Validates: Requirements 9.4, 12.7**
  - [x] 4.8 Write property test for single-severity findings
    - **Property 23: Every Finding has exactly one severity**
    - **Validates: Requirements 9.7**
  - [x] 4.9 Write property test for score-cites-evidence invariant
    - **Property 31: Every recorded score cites evidence**
    - **Validates: Requirements 11.3**
  - [x] 4.10 Write property test for ship-report P2 listing
    - **Property 47: Ship report lists exactly the open P2 findings**
    - **Validates: Requirements 15.3**

- [x] 5. Implement the loop controller
  - [x] 5.1 Implement `src/lib/page-forge/loop.ts`
    - Implement `nextAction(state, verdict)`: ship when APPROVED, escalate when REJECTED and `loop >= maxLoops`, otherwise correct the failed dimensions
    - Implement `incrementLoop(state)` (monotonic +1)
    - Implement failed-dimension scoping, P0-before-P1 fix ordering, and fixer scheduling (parallel when file sets are pairwise disjoint, else serialize Design → Responsive → Performance)
    - _Requirements: 14.1, 14.3, 14.4, 14.6, 14.8_
  - [x] 5.2 Write property test for correction scoping to failed dimensions
    - **Property 43: Correction targets exactly the failed dimensions**
    - **Validates: Requirements 14.1**
  - [x] 5.3 Write property test for P0-before-P1 fix ordering
    - **Property 44: Fix ordering places all P0 before P1**
    - **Validates: Requirements 14.3**
  - [x] 5.4 Write property test for monotonic bounded loop and termination
    - **Property 45: Loop counter is monotonic and bounded; termination is guaranteed**
    - **Validates: Requirements 14.4, 14.8**
  - [x] 5.5 Write property test for fixer scheduling
    - **Property 46: Fixer scheduling parallelizes disjoint files and serializes shared files**
    - **Validates: Requirements 14.6**

- [x] 6. Implement the phase-skills map
  - [x] 6.1 Implement `src/lib/page-forge/phase-skills.ts`
    - Define the phase → assigned Skill_Library entries map (direction skills for Trend, motion/scroll for Build, anti-slop/audit for Parallel Check, SEO for Ship Report, full-output-enforcement at Builder emit)
    - Implement `resolveLoadedSkills(phase, unavailable)` returning assigned minus unavailable and recording unavailable entries
    - _Requirements: 5.1, 5.2, 5.3, 5.5_
  - [x] 6.2 Write property test for skill loading records
    - **Property 11: Skill loading records loaded and unavailable entries**
    - **Validates: Requirements 5.1, 5.5**
  - [x] 6.3 Write unit test for phase-skill map contents
    - Assert the specific per-phase skill assignments (Req 5.2) and Builder-emit full-output-enforcement loading (Req 5.3)
    - _Requirements: 5.2, 5.3_

- [x] 7. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Implement the responsive rule evaluator
  - [x] 8.1 Implement `src/lib/page-forge/responsive-rules.ts`
    - Implement `evaluateResponsive(measurements)` producing typed Findings and a `layout_responsive` score
    - Encode: overflow → P0 (with section+breakpoint); touch target < 44×44 at 390/768 → P1; chrome-before-content on collapse → P1; mobile-pinned chapter → P0; padding bounds (<16px@390, <24px@768/1024/1440, >25% vw) → P1; score capped at 5.0 when any P0 open
    - Ensure a measurement is expected for every section at all four breakpoints
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7_
  - [x] 8.2 Write property test for breakpoint coverage
    - **Property 24: Responsive breakpoint coverage**
    - **Validates: Requirements 10.1**
  - [x] 8.3 Write property test for overflow P0 detection
    - **Property 25: Overflow beyond viewport width is a P0**
    - **Validates: Requirements 10.2**
  - [x] 8.4 Write property test for small mobile touch targets
    - **Property 26: Small touch targets on mobile are a P1**
    - **Validates: Requirements 10.3**
  - [x] 8.5 Write property test for chrome-before-content on collapse
    - **Property 27: Chrome-before-content on collapse is a P1**
    - **Validates: Requirements 10.4**
  - [x] 8.6 Write property test for mobile-pinned chapter P0
    - **Property 28: Mobile-pinned chapter is a P0**
    - **Validates: Requirements 10.5**
  - [x] 8.7 Write property test for horizontal padding bounds
    - **Property 29: Horizontal padding bounds**
    - **Validates: Requirements 10.6**
  - [x] 8.8 Write property test for layout score range and P0 cap
    - **Property 30: Layout responsive score range and P0 cap**
    - **Validates: Requirements 10.7**

- [x] 9. Implement the performance rule evaluator
  - [x] 9.1 Implement `src/lib/page-forge/perf-rules.ts`
    - Implement `evaluatePerformance(measurement)` producing typed Findings and a `performance` score
    - Encode P0s: LCP text at zero opacity under loader; scroll-linked property in {blur, backdrop-filter, top, height, width}; GSAP/ScrollTrigger without cleanup; heavy pin count > 1; global loader/transition on `layout.tsx` without Brief request
    - Encode reduced-motion path required; only transform/opacity animated; palette restricted to Brand_Tokens; constraint violations classified P0
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 17.1, 17.2, 17.3, 17.4, 17.8_
  - [x] 9.2 Write property test for pin budget ≤ 1
    - **Property 14: Pin budget is at most one across story, map, and build**
    - **Validates: Requirements 6.4, 7.8, 12.4**
  - [x] 9.3 Write property test for LCP-text-under-loader P0
    - **Property 32: LCP text is never hidden under a loader**
    - **Validates: Requirements 12.1, 17.4**
  - [x] 9.4 Write property test for scroll-linked expensive properties
    - **Property 33: Scroll-linked expensive properties are a P0**
    - **Validates: Requirements 12.2**
  - [x] 9.5 Write property test for GSAP-without-cleanup P0
    - **Property 34: GSAP without cleanup is a P0**
    - **Validates: Requirements 12.3**
  - [x] 9.6 Write property test for reduced-motion path presence
    - **Property 35: Reduced-motion path exists for every animated element**
    - **Validates: Requirements 12.6, 17.3**
  - [x] 9.7 Write property test for transform/opacity-only animation
    - **Property 36: Only transform and opacity are animated**
    - **Validates: Requirements 17.2**
  - [x] 9.8 Write property test for palette restriction
    - **Property 37: Palette is restricted to Brand_Tokens**
    - **Validates: Requirements 17.1**
  - [x] 9.9 Write property test for constraint-violation P0 classification
    - **Property 49: Constraint violations are always classified P0**
    - **Validates: Requirements 17.8**

- [x] 10. Implement planning-artifact validators (direction, story, component map)
  - [x] 10.1 Implement direction validators in `src/lib/page-forge/validators.ts`
    - `validateDirection(direction)`: name in approved trend bank, not in rejected-for-Softree set, three dials integers in [0,10]
    - Reference recording/accessibility handling; brand-token-wins-over-reference resolution; internet-retrieval phase gate
    - _Requirements: 3.2, 3.3, 3.4, 4.2, 4.4, 4.5, 4.6, 4.8_
  - [x] 10.2 Write property test for design direction validity
    - **Property 7: Design direction validity**
    - **Validates: Requirements 3.2, 3.3, 3.4**
  - [x] 10.3 Write property test for reference recording and accessibility
    - **Property 8: Reference source recording and accessibility handling**
    - **Validates: Requirements 4.2, 4.8**
  - [x] 10.4 Write property test for phase-gated internet retrieval
    - **Property 9: Internet retrieval permission is phase-gated**
    - **Validates: Requirements 4.4, 4.5**
  - [x] 10.5 Write property test for brand-token-wins-over-reference
    - **Property 10: Brand tokens win over conflicting references**
    - **Validates: Requirements 4.6**
  - [x] 10.6 Implement story validators in `src/lib/page-forge/validators.ts`
    - `validateStory(beats)`: 4–9 ordered beats, each mapped to one section id / emotional purpose / approved scroll behavior, unique section ids, at most one heavy pin
    - `validateNarrativeOrder(beats)`: problem → approach → proof → path → contact without inversion
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  - [x] 10.7 Write property test for story beat count and structure
    - **Property 12: Story beat count and structure**
    - **Validates: Requirements 6.1, 6.2, 6.3**
  - [x] 10.8 Write property test for narrative ordering
    - **Property 13: Narrative order progresses problem → approach → proof → path → contact**
    - **Validates: Requirements 6.5**
  - [x] 10.9 Implement component-map validators in `src/lib/page-forge/validators.ts`
    - `validateComponentMap(assignments, direction)`: exactly one Pattern_ID per section, catalog membership, motion lib in allowed set, reduced-motion + mobile-stacking present, dials match locked direction, unmatched sections become gaps (never invalid patterns), pin budget ≤ 1
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.7, 7.8_
  - [x] 10.10 Write property test for component-map totality and single assignment
    - **Property 15: Component map totality and single assignment**
    - **Validates: Requirements 7.1**
  - [x] 10.11 Write property test for component assignment validity
    - **Property 16: Component assignment validity**
    - **Validates: Requirements 7.2, 7.3, 7.4**
  - [x] 10.12 Write property test for unmatched-section gaps
    - **Property 17: Unmatched sections become gaps, never invalid patterns**
    - **Validates: Requirements 7.7**
  - [x] 10.13 Write unit tests for selection logic and Sacred_UI mapping
    - Named/approved/default/rejected direction handling (Req 3.6, 3.7, 3.8); shared-primitive reuse and Sacred_UI contact/FAQ mapping (Req 7.5, 7.6)
    - _Requirements: 3.6, 3.7, 3.8, 7.5, 7.6_

- [x] 11. Implement build static-analysis
  - [x] 11.1 Implement `src/lib/page-forge/build-analysis.ts`
    - Scan emitted component source for: disallowed runtimes (CSS-in-JS runtime, Three.js, full-page WebGL, global animation framework), motion values imported only from `@/lib/motion` with no new motion constants
    - Detect placeholders (TODO/FIXME/placeholder comments, unimplemented bodies) and unresolved imports
    - Detect global loader/transition mounted on `src/app/layout.tsx` without Brief request → P0
    - _Requirements: 8.1, 8.3, 8.5, 8.7, 12.5, 17.5, 17.7_
  - [x] 11.2 Write property test for approved-stack and motion-token usage
    - **Property 18: Built code uses only the approved stack and motion tokens**
    - **Validates: Requirements 8.1, 8.3, 17.7**
  - [x] 11.3 Write property test for no-placeholder emitted code
    - **Property 19: Emitted code has no placeholders**
    - **Validates: Requirements 8.5**
  - [x] 11.4 Write property test for no global loader/transition on root layout
    - **Property 20: No global loader or transition framework on the root layout**
    - **Validates: Requirements 8.7, 12.5, 17.5**

- [x] 12. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 13. Implement state discovery and resume
  - [x] 13.1 Implement `src/lib/page-forge/state.ts`
    - Implement `discoverState(slug)` reading the Artifact_Directory and `06-REVIEW.md` front matter (verdict + loop)
    - Implement `resumePoint(state)`: phase after highest completed phase; route to correction for current loop when REVIEW is REJECTED and no `07-LOOP-<n>-*` exists; compute next phase as earliest incomplete in `PHASE_ORDER`; compute prerequisite backfill sequence
    - _Requirements: 1.1, 1.7, 16.1, 16.2_
  - [x] 13.2 Write property test for phase order never skipped/reordered
    - **Property 1: Phase order is never skipped or reordered**
    - **Validates: Requirements 1.1, 1.7**
  - [x] 13.3 Write property test for prerequisite backfill order
    - **Property 2: Prerequisite backfill equals missing predecessors in canonical order**
    - **Validates: Requirements 1.7**
  - [x] 13.4 Write property test for pure-function resume point
    - **Property 48: Resume point is a pure function of artifacts present**
    - **Validates: Requirements 16.1, 16.2**

- [x] 14. Implement the orchestrator and wire the core together
  - [x] 14.1 Implement `src/lib/page-forge/orchestrator.ts`
    - Implement `run(slug, opts)`, `runPhase(state, phase)`, and `applyInterrupt(state, interrupt)`
    - Wire in `state.ts` (resume/backfill), `brief.ts` (normalize + consolidated-question gating), `artifacts.ts` (persist + verify with halt-on-write-failure via `HaltError`), `phase-skills.ts` (load per phase), `loop.ts` (verdict routing + increment), `scoring.ts` (Review), `responsive-rules.ts`/`perf-rules.ts`/`validators.ts`/`build-analysis.ts`
    - Enforce: fixed phase order, directory containment, Sacred_UI preservation, always-run Responsive+Performance checkers, checker-failure handling (mark dims null, continue), internet-retrieval phase gate, escalation and ship-report terminals
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 4.4, 4.5, 9.1, 9.2, 9.3, 9.6, 9.8, 14.1, 14.4, 14.5, 14.8, 15.1, 16.1, 16.2_
  - [x] 14.2 Write property test for responsive/performance always run + failure recording
    - **Property 22: Responsive and performance checks always run and record failures**
    - **Validates: Requirements 9.6, 9.8**
  - [x] 14.3 Write unit tests for halt-on-write-failure and one-shot artifact creation
    - Halt-before-advance keeping in-memory output (Req 1.3, 8.10); ship-report continues on write failure (Req 15.4); artifact creation for Brief/checkers/review/ship (Req 2.1, 9.2, 13.1, 15.1)
    - _Requirements: 1.3, 8.10, 9.2, 13.1, 15.1, 15.4_
  - [x] 14.4 Write unit tests for the Brief consolidated-question flow
    - One consolidated question for absent route/slug/contentSource, re-request still-absent fields, accept proactively-supplied answers (Req 2.7, 2.9); no advance while required absent (Req 1.5, 2.8)
    - _Requirements: 1.5, 2.7, 2.8, 2.9_
  - [x] 14.5 Write unit tests for interrupt handling
    - stop-and-persist, new-direction archive+restart-at-Trend, single-dimension fix, approve-despite-REJECTED override, resume-runs-correction (Req 16.2–16.6)
    - _Requirements: 16.2, 16.3, 16.4, 16.5, 16.6_

- [ ] 15. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 16. Implement evidence-capture scripts
  - [x] 16.1 Implement `scripts/page-forge/capture-viewport.mjs` (Puppeteer)
    - Implement `captureViewport(url)`: iterate breakpoints 390/768/1024/1440, produce a `ViewportMeasurement` per section (scroll/client width, horizontal padding, touch targets, pin state, column collapse, content vs chrome order), write screenshot evidence under `ROOT`
    - Detect Puppeteer availability; on absence return a sentinel marking evidence `toolAbsent`; derive static-analysis fields by scanning built source when no browser
    - _Requirements: 11.1, 11.3, 11.4_
  - [x] 16.2 Implement `scripts/page-forge/capture-perf.mjs` (Lighthouse/web-vitals)
    - Implement `capturePerf(url)`: populate `PerfMeasurement` (LCP, LCP-under-loader opacity, scroll-linked props, GSAP-without-cleanup, heavy pin count, global layout hijack, reduced-motion path presence)
    - Detect tool availability; on absence return a sentinel marking evidence `toolAbsent`; derive static-analysis fields from built source
    - _Requirements: 11.2, 11.3, 11.4_
  - [-] 16.3 Write integration/smoke tests for evidence capture wiring
    - 1–3 representative runs against the built preview confirming the scripts populate `ViewportMeasurement`/`PerfMeasurement` correctly and set `toolAbsent` when a tool is missing
    - _Requirements: 11.1, 11.2, 11.4_

- [ ] 17. Author the agent layer (prompt specs + steering + pipeline config)
  - [x] 17.1 Create machine-readable `src/lib/page-forge/pipeline.config.ts`
    - Encode the agent I/O contracts (per-agent reads/writes/scores/may-edit-code) and the phase → agent + skill wiring the orchestrator loads
    - _Requirements: 5.1, 5.2, 9.1, 9.3_
  - [-] 17.2 Author Trend Scout, Story Architect, and Component Mapper prompt/steering specs
    - Colocate under `.agents/skills/awwwards-page-loop/`; constrain each to write its single structured artifact (`01-DIRECTION.md`, `02-STORY.md`, `03-COMPONENT-MAP.md`) with front matter the validators parse; treat fetched reference content as untrusted data
    - _Requirements: 3.1, 4.1, 4.7, 6.6, 7.5, 7.6_
  - [-] 17.3 Author Builder and Correction agent prompt/steering specs
    - Constrain Builder to place sections under `src/components/<feature>/sections/` and route under `src/app/<route>/page.tsx`, import motion from `@/lib/motion`, honor Sacred_UI and root-layout rules, scope any intro loader to the route with skip ≤100ms and auto-dismiss ≤3000ms and session-once suppression, write `04-BUILD.md`
    - Constrain Correction agents to edit only assigned findings (P0 before P1), preserve Sacred_UI, write `07-LOOP-<n>-<dim>.md`
    - _Requirements: 8.2, 8.4, 8.6, 8.7, 8.8, 8.9, 14.2, 14.7_
  - [-] 17.4 Author Design/Responsive/Performance Checker and Review agent prompt/steering specs
    - Read-only contracts; checkers call the rule evaluators and write `05a/05b/05c`; Review calls `scoring.ts` to compute overall/gate/merge and writes `06-REVIEW.md`; never inflate scores
    - _Requirements: 9.2, 9.3, 9.5, 13.1, 13.6_
  - [-] 17.5 Write edge tests for loader timing and session-once suppression
    - Skip control dismisses within 100ms, auto-dismiss within 3000ms (Req 8.8); repeat-visit suppression renders final state immediately (Req 8.9)
    - _Requirements: 8.8, 8.9_
  - [-] 17.6 Write integration/smoke test for Trend web-reference retrieval
    - Confirm 2–3 references retrieved during Trend and shortfall (<2) recorded (Req 4.3, 4.9)
    - _Requirements: 4.3, 4.9_

- [ ] 18. Implement the CLI entry and wire the full pipeline
  - [-] 18.1 Implement `scripts/page-forge/forge.mjs`
    - Thin CLI that parses the developer command (e.g. `forge page /route`, `run the page loop`, `only fix performance`), constructs `RunOptions`/`Interrupt`, and delegates to `orchestrator.run` / `orchestrator.applyInterrupt`
    - Add an npm script entry to invoke it
    - _Requirements: 1.1, 16.3, 16.4, 16.5, 16.6_
  - [ ] 18.2 Write integration/smoke test for the CLI-to-orchestrator wiring
    - Confirm a command resolves to a resume point and runs forward through the deterministic core against a temp Artifact_Directory
    - _Requirements: 1.1, 1.2, 16.1_

- [ ] 19. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional test sub-tasks and can be skipped for a faster MVP; core implementation tasks are never optional.
- Each property test is a single fast-check test (≥100 iterations) carrying a tag comment `// Feature: page-forge-agent-system, Property N: <name>`.
- Property tests cover the deterministic core (Properties 1–50); unit/example tests cover concrete flows and error paths; integration/smoke/edge tests cover browser/network tooling and timing.
- The agent layer is prompt/steering plus a machine-readable `pipeline.config.ts`; it calls into the deterministic core rather than duplicating its logic.
- Every implementation task ends by wiring new code into the orchestrator or CLI so there is no orphaned code.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3", "2.1", "3.1", "6.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "3.2", "3.3", "4.1", "5.1", "6.2", "6.3"] },
    { "id": 3, "tasks": ["4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9", "4.10", "5.2", "5.3", "5.4", "5.5", "8.1", "9.1", "10.1", "11.1"] },
    { "id": 4, "tasks": ["8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "8.8", "9.2", "9.3", "9.4", "9.5", "9.6", "9.7", "9.8", "9.9", "10.6", "10.9", "11.2", "11.3", "11.4"] },
    { "id": 5, "tasks": ["10.2", "10.3", "10.4", "10.5", "10.7", "10.8", "10.10", "10.11", "10.12", "10.13", "13.1"] },
    { "id": 6, "tasks": ["13.2", "13.3", "13.4", "14.1"] },
    { "id": 7, "tasks": ["14.2", "14.3", "14.4", "14.5", "16.1", "16.2", "17.1"] },
    { "id": 8, "tasks": ["16.3", "17.2", "17.3", "17.4"] },
    { "id": 9, "tasks": ["17.5", "17.6", "18.1"] },
    { "id": 10, "tasks": ["18.2"] }
  ]
}
```
