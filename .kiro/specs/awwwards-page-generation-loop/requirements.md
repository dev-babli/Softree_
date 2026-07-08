# Requirements Document

## Introduction

The Awwwards Page Generation Loop is a looping multi-agent system that generates a complete, production-ready marketing page inside Softree's existing tech stack (Next.js 16 App Router, React 19, Tailwind 4, GSAP + ScrollTrigger, Framer Motion, Sanity CMS). The system orchestrates a sequence of specialized agents — trend selection, story architecture, component mapping, and build — followed by a parallel checking wave (design, responsive, performance), an aggregating review agent that applies a scoring gate, and correction agents that iterate until quality gates pass or a maximum loop count is reached.

The system selects exactly one macro design direction that suits the website (surveying current design trends and fresh internet references), then decides the appropriate pattern per component. It targets "Awwwards-level" quality with deliberate scrollytelling and strong UI/UX, while honoring hard brand and technical constraints. It uses the available design and motion skills and can ingest a large corpus of design reference data. Automated verification uses the tools already available in the repository: Puppeteer for viewport capture, pixelmatch for visual diffing, and Vitest (with fast-check) for property-based checks.

This document formalizes the behavior of the orchestrator and every agent, the loop protocol with its gates and escalation, the reference-ingestion capability, and the correctness properties that the pipeline must uphold. It extends and formalizes the existing `.agents/skills/awwwards-page-loop/SKILL.md` skill.

## Glossary

- **Loop_System**: The complete looping multi-agent page generation system described by this document.
- **Orchestrator**: The controlling agent that runs the pipeline phases in order, launches sub-agents, maintains loop state, and enforces gates.
- **Brief**: The locked page specification (`00-BRIEF.md`) containing route, slug, page kind, audience, sacred UI list, content source, references, max loops, and threshold.
- **Trend_Scout**: Agent that selects exactly one macro design direction and emits `01-DIRECTION.md`.
- **Story_Architect**: Agent that designs the scroll narrative and emits `02-STORY.md`.
- **Component_Mapper**: Agent that assigns exactly one component pattern per story beat and emits `03-COMPONENT-MAP.md`.
- **Builder**: Agent that implements the page in the existing stack and emits `04-BUILD.md`.
- **Design_Checker**: Read-only agent that scores visual_design, storytelling, and motion and emits `05a-DESIGN.md`.
- **Responsive_Checker**: Read-only agent that validates viewport sizing, placement, and stacking across breakpoints and emits `05b-RESPONSIVE.md`.
- **Performance_Checker**: Read-only agent that audits runtime performance and emits `05c-PERFORMANCE.md`.
- **Review_Agent**: Read-only agent that aggregates checker scores, computes the weighted overall, applies the verdict, and emits `06-REVIEW.md`.
- **Correction_Agent**: Any of the Design Fixer, Responsive Fixer, or Performance Fixer agents that implement only their assigned issues and emit `07-LOOP-<n>-<role>.md`.
- **Checker_Agent**: Collective term for Design_Checker, Responsive_Checker, and Performance_Checker.
- **Reference_Corpus**: The set of design reference data (URLs, local files, screenshots, curated notes) ingested to inform direction and build.
- **Quality_Gate**: The pass condition — weighted overall score at least 8.5, every required dimension at least 8.0, and zero P0 blockers.
- **Dimension**: A scored quality axis: visual_design, storytelling, motion, layout_responsive, performance, or content_honesty.
- **P0 / P1 / P2**: Issue severity levels — P0 blocks ship, P1 is a visible quality gap, P2 is optional polish.
- **Breakpoint**: A target viewport width the Responsive_Checker evaluates — 390, 768, 1024, and 1440 pixels.
- **Sacred_UI**: Components that must remain unchanged unless the Brief explicitly permits changes — site nav, sticky orange SOFTREE footer, `LightContactSection`, `LightFAQExact`.
- **Pin_Budget**: The maximum number of heavy ScrollTrigger pinned sections allowed per page — one.
- **Artifact_Directory**: The session directory `.planning/page-forge/<slug>/` where all phase artifacts are written.
- **Max_Loops**: The maximum number of correction cycles allowed before escalation — default 4.
- **Loop_Counter**: The integer count of completed CHECK → REVIEW → CORRECT cycles.
- **Escalation_Report**: The artifact `08-ESCALATION.md` written when Max_Loops is reached while still REJECTED.
- **Verification_Report**: The artifact `08-VERIFICATION.md` written when the page is APPROVED.

## Requirements

### Requirement 1: Orchestrator pipeline sequencing

**User Story:** As a developer, I want a single orchestrator to run the generation phases in a fixed order, so that every page is planned before it is built and reviewed before it ships.

#### Acceptance Criteria

1. WHEN the Loop_System is invoked for a page, THE Orchestrator SHALL execute phases in the order Brief, Trend, Story, Component Map, Build, Parallel Check, Review, and Correct.
2. WHERE a required upstream artifact is absent, THE Orchestrator SHALL NOT start the dependent phase until the upstream artifact exists.
3. WHEN the Orchestrator completes a phase, THE Orchestrator SHALL write that phase's artifact to the Artifact_Directory before starting the next phase.
4. IF the route or content source is missing from the invocation, THEN THE Orchestrator SHALL ask the user exactly one clarifying question before proceeding.
5. WHEN artifacts from a prior session already exist in the Artifact_Directory, THE Orchestrator SHALL resume from the phase after the highest completed phase.
6. THE Orchestrator SHALL write all session artifacts only within the Artifact_Directory.

### Requirement 2: Brief lock

**User Story:** As a developer, I want the page brief captured and locked at the start, so that all agents share one authoritative specification.

#### Acceptance Criteria

1. WHEN the Brief phase runs, THE Orchestrator SHALL write `00-BRIEF.md` containing route, slug, page_kind, audience, must_preserve list, content_source, references, max_loops, and threshold.
2. WHERE the invocation does not specify Max_Loops, THE Orchestrator SHALL set max_loops to 4 in the Brief.
3. WHERE the invocation does not specify a threshold, THE Orchestrator SHALL set threshold to 8.5 in the Brief.
4. THE Orchestrator SHALL populate the must_preserve list with the Sacred_UI components unless the Brief explicitly removes a component.
5. WHEN the slug is derived from a route, THE Orchestrator SHALL format the slug in kebab-case.

### Requirement 3: Single design direction selection

**User Story:** As a developer, I want the system to survey current design trends and pick one direction that fits the site, so that the page has a coherent aesthetic rather than portfolio chaos.

#### Acceptance Criteria

1. WHEN the Trend phase runs, THE Trend_Scout SHALL select exactly one macro design direction and record its identifier in `01-DIRECTION.md`.
2. THE Trend_Scout SHALL record, for the selected direction, a fit rationale for the enterprise audience, dial values for DESIGN_VARIANCE, MOTION_INTENSITY, and VISUAL_DENSITY, and a list of rejected directions with a one-line reason each.
3. WHERE fresh internet inspiration is requested, THE Trend_Scout SHALL record between two and three reference sources in `01-DIRECTION.md`.
4. THE Trend_Scout SHALL restrict web research to the Trend phase.
5. THE Trend_Scout SHALL record a scrollytelling budget that permits at most one heavy ScrollTrigger pin.
6. THE Trend_Scout SHALL NOT write application code.

### Requirement 4: Design reference ingestion

**User Story:** As a developer, I want to feed a large amount of design reference data into the system, so that direction and build decisions draw on curated inspiration.

#### Acceptance Criteria

1. WHERE the Brief lists reference sources, THE Loop_System SHALL record each reference in the Reference_Corpus with its source location.
2. WHEN a reference source is a local file path, THE Loop_System SHALL read the referenced file before the Trend phase completes.
3. IF a listed reference source cannot be read, THEN THE Loop_System SHALL record the failed reference and its reason in `01-DIRECTION.md` and continue with the remaining references.
4. THE Trend_Scout SHALL cite at least one Reference_Corpus entry as support for the selected direction.

### Requirement 5: Scroll narrative design

**User Story:** As a developer, I want a story architect to define the scroll narrative, so that the page tells a story instead of listing features.

#### Acceptance Criteria

1. WHEN the Story phase runs, THE Story_Architect SHALL emit `02-STORY.md` mapping the beats Hook, Proof, Mechanism, Context, Process, Metrics, and Close to section identifiers.
2. THE Story_Architect SHALL assign exactly one heavy ScrollTrigger pin to the Mechanism beat.
3. THE Story_Architect SHALL assign each beat a scroll behavior from the set static, reveal, pin-scrub, count-up, and none.
4. IF required real content for a beat is unavailable, THEN THE Story_Architect SHALL flag the beat as CONTENT_GAP in `02-STORY.md`.
5. THE Story_Architect SHALL NOT record invented metrics, logos, or testimonials.
6. THE Story_Architect SHALL NOT write application code.

### Requirement 6: Per-component pattern mapping

**User Story:** As a developer, I want each section mapped to one component pattern, so that the build has a clear, direction-consistent plan.

#### Acceptance Criteria

1. WHEN the Component Map phase runs, THE Component_Mapper SHALL assign exactly one component pattern identifier to each story beat in `03-COMPONENT-MAP.md`.
2. THE Component_Mapper SHALL record, for each mapped section, its motion library selection from the set CSS, GSAP, and Framer, and a reduced-motion fallback, and a mobile stacking order.
3. THE Component_Mapper SHALL record the shared primitives to reuse for each section.
4. THE Component_Mapper SHALL NOT write application code.

### Requirement 7: Page build in existing stack

**User Story:** As a developer, I want the builder to implement the page in the existing stack, so that the result integrates with the current codebase.

#### Acceptance Criteria

1. WHEN the Build phase runs, THE Builder SHALL implement the page using only Next.js App Router, React, Tailwind, GSAP with ScrollTrigger, Framer Motion, and the existing `@/lib/motion` tokens.
2. THE Builder SHALL place interactive sections as client components under `src/components/<feature>/sections/`.
3. THE Builder SHALL wire the Sacred_UI components without modifying them unless the Brief permits modification.
4. THE Builder SHALL NOT mount global loaders or Barba on `src/app/layout.tsx` unless the Brief explicitly requests it.
5. THE Builder SHALL emit `04-BUILD.md` listing files created or modified and any intentional deviations.
6. WHEN the Builder animates an element, THE Builder SHALL animate only transform and opacity properties.
7. THE Builder SHALL provide a reduced-motion code path for every animated section.
8. THE Builder SHALL NOT hide a Largest Contentful Paint text element with zero opacity while waiting for a loader.

### Requirement 8: Parallel quality checking

**User Story:** As a developer, I want design, responsive, and performance checks to run in parallel after each build, so that all quality dimensions are evaluated on every iteration.

#### Acceptance Criteria

1. WHEN the Build phase completes, THE Orchestrator SHALL launch the Design_Checker, Responsive_Checker, and Performance_Checker in parallel.
2. THE Orchestrator SHALL launch all three Checker_Agents on every loop iteration, including after every correction wave.
3. THE Design_Checker, Responsive_Checker, and Performance_Checker SHALL NOT modify application code.
4. WHEN a Checker_Agent reports an issue, THE Checker_Agent SHALL assign the issue a severity of P0, P1, or P2 and record an affected file path or section reference.
5. THE Orchestrator SHALL NOT start the Review phase until all three checker artifacts exist for the current loop.

### Requirement 9: Responsive validation across breakpoints

**User Story:** As a developer, I want the responsive checker to validate that components are correctly sized and placed at each breakpoint, so that the page works on every screen.

#### Acceptance Criteria

1. WHEN the Responsive_Checker runs, THE Responsive_Checker SHALL evaluate each section at the 390, 768, 1024, and 1440 pixel breakpoints.
2. IF any section produces horizontal overflow at a Breakpoint, THEN THE Responsive_Checker SHALL record a P0 issue with the section and Breakpoint.
3. IF an interactive touch target is smaller than 44 by 44 pixels, THEN THE Responsive_Checker SHALL record a P0 issue with the section and Breakpoint.
4. THE Responsive_Checker SHALL verify for each section the stacking order, padding rhythm, image sizing within the viewport, and text containment.
5. IF the pinned Mechanism section does not degrade gracefully at the 390 pixel Breakpoint, THEN THE Responsive_Checker SHALL record a P0 issue.
6. THE Responsive_Checker SHALL record a layout_responsive score between 0 and 10 in `05b-RESPONSIVE.md`.

### Requirement 10: Performance validation

**User Story:** As a developer, I want the performance checker to catch performance errors in components and the page, so that the page stays fast and smooth.

#### Acceptance Criteria

1. WHEN the Performance_Checker runs, THE Performance_Checker SHALL audit Largest Contentful Paint safety, scroll-linked animation properties, GSAP context cleanup, client boundary count, reduced-motion paths, and root layout integrity.
2. IF a Largest Contentful Paint text element is hidden with zero opacity waiting for a loader, THEN THE Performance_Checker SHALL record a P0 issue.
3. IF a scroll-linked animation drives a blur, backdrop-filter, or layout property, THEN THE Performance_Checker SHALL record a P0 issue.
4. IF a GSAP or ScrollTrigger instance lacks cleanup on unmount, THEN THE Performance_Checker SHALL record a P0 issue.
5. IF a global loader or Barba is mounted on the root layout without an explicit Brief request, THEN THE Performance_Checker SHALL record a P0 issue.
6. IF more than one heavy ScrollTrigger pin is present, THEN THE Performance_Checker SHALL record a P0 issue.
7. THE Performance_Checker SHALL record a performance score between 0 and 10 in `05c-PERFORMANCE.md`.

### Requirement 11: Review aggregation and scoring gate

**User Story:** As a developer, I want a review agent to aggregate scores and apply a gate, so that a page ships only when it meets the quality bar.

#### Acceptance Criteria

1. WHEN the Review phase runs, THE Review_Agent SHALL compute the overall score as the weighted mean using weights visual_design 0.20, storytelling 0.15, motion 0.15, layout_responsive 0.25, performance 0.20, and content_honesty 0.05.
2. THE Review_Agent SHALL record a verdict of APPROVED WHEN the overall score is at least 8.5 AND every Dimension score is at least 8.0 AND the merged P0 list is empty.
3. IF the overall score is below 8.5 OR any Dimension score is below 8.0 OR the merged P0 list is non-empty, THEN THE Review_Agent SHALL record a verdict of REJECTED.
4. THE Review_Agent SHALL merge and de-duplicate the P0 and P1 issues from all Checker_Agent artifacts into `06-REVIEW.md`.
5. THE Review_Agent SHALL NOT raise a Checker_Agent score without new evidence recorded in the checker artifacts.
6. IF a page records an invented metric, logo, or testimonial, THEN THE Review_Agent SHALL record a P0 issue and cap the content_honesty Dimension at 5.
7. THE Review_Agent SHALL NOT modify application code.

### Requirement 12: Correction wave

**User Story:** As a developer, I want correction agents to fix the reported issues, so that each loop moves the page closer to passing.

#### Acceptance Criteria

1. WHEN the Review_Agent verdict is REJECTED, THE Orchestrator SHALL spawn a Correction_Agent for each Dimension that failed the gate.
2. THE Correction_Agent SHALL modify only the P0 and then P1 issues assigned to its role.
3. WHEN a Correction_Agent completes, THE Correction_Agent SHALL emit `07-LOOP-<n>-<role>.md` listing the changes made.
4. WHERE two Correction_Agents modify different files, THE Orchestrator SHALL run those Correction_Agents in parallel.
5. IF two Correction_Agents would modify the same file, THEN THE Orchestrator SHALL run them serially in the order Design, Responsive, Performance.
6. THE Correction_Agent SHALL preserve the Sacred_UI components.
7. WHEN a correction wave completes, THE Orchestrator SHALL increment the Loop_Counter and re-run the Parallel Check and Review phases.

### Requirement 13: Loop termination and escalation

**User Story:** As a developer, I want the loop to stop at a maximum and escalate, so that it never runs forever.

#### Acceptance Criteria

1. WHILE the Review_Agent verdict is REJECTED AND the Loop_Counter is less than Max_Loops, THE Orchestrator SHALL continue correction cycles.
2. WHEN the Review_Agent verdict becomes APPROVED, THE Orchestrator SHALL stop the loop and proceed to the ship report.
3. IF the Loop_Counter reaches Max_Loops while the verdict is REJECTED, THEN THE Orchestrator SHALL stop the loop and write `08-ESCALATION.md` listing the remaining gaps.
4. WHEN the user instructs the Loop_System to stop, THE Orchestrator SHALL write the current state and halt.
5. WHEN the user instructs the Loop_System to approve anyway, THE Orchestrator SHALL write the Verification_Report with a verdict of USER_OVERRIDE.

### Requirement 14: Ship report

**User Story:** As a developer, I want a verification report when a page is approved, so that I have a record of the outcome.

#### Acceptance Criteria

1. WHEN the verdict is APPROVED, THE Orchestrator SHALL write `08-VERIFICATION.md` containing the route, the overall score, the selected direction, the story summary, and any remaining P2 items.
2. THE Orchestrator SHALL report to the user the live route, the overall score, the direction and story used, and the remaining optional P2 items.

### Requirement 15: Hard constraint enforcement

**User Story:** As a developer, I want the system to enforce brand and technical constraints on every loop, so that generated pages never violate the design system.

#### Acceptance Criteria

1. THE Loop_System SHALL use only the orange `#FF5812`, cream `#f8f4ec`, and ink `#121417` / `#141414` brand colors for structural brand elements.
2. THE Loop_System SHALL keep the Sacred_UI components unchanged across every loop unless the Brief permits a change.
3. THE Loop_System SHALL keep the number of heavy ScrollTrigger pinned sections within the Pin_Budget of one.
4. IF a generated page violates a hard constraint, THEN THE responsible Checker_Agent SHALL record a P0 issue.
5. THE Loop_System SHALL NOT mount page-generation motion on the root layout.

### Requirement 16: Automated verification tooling

**User Story:** As a developer, I want the checks backed by the repository's existing tooling, so that findings are evidence-based rather than guesses.

#### Acceptance Criteria

1. WHERE Puppeteer is available, THE Responsive_Checker SHALL capture a screenshot of the page at each Breakpoint as evidence for its findings.
2. WHERE pixelmatch is available, THE Loop_System SHALL compute a pixel difference between the current build and a reference capture when a reference capture exists.
3. WHEN a Checker_Agent records a score, THE Checker_Agent SHALL cite evidence consisting of a file path, a viewport, or an observed behavior.
4. WHERE property-based tests are defined for a generated section, THE Loop_System SHALL run the property-based tests with Vitest and fast-check and record the result before the Review phase.

### Requirement 17: Correctness properties

**User Story:** As a developer, I want the pipeline to hold verifiable correctness properties, so that the system behaves consistently regardless of input.

#### Acceptance Criteria

1. FOR ALL loop iterations, THE overall score recorded by the Review_Agent SHALL equal the weighted mean of the six Dimension scores using the defined weights (invariant).
2. FOR ALL Review_Agent verdicts of APPROVED, the overall score SHALL be at least 8.5 AND every Dimension score SHALL be at least 8.0 AND the P0 list SHALL be empty (invariant).
3. FOR ALL completed pipelines, the Loop_Counter SHALL be at most Max_Loops (invariant).
4. FOR ALL generated pages, the count of heavy ScrollTrigger pinned sections SHALL be at most one (invariant).
5. WHEN the Loop_System is resumed on an existing Artifact_Directory, resuming SHALL produce the same next phase as a single uninterrupted run at the same completed-phase state (idempotence of resume).
6. FOR ALL brief inputs where the route and content source are present, running the Trend phase then serializing the direction then re-reading it SHALL yield an equivalent direction record (round-trip property).
