/**
 * Page Forge — Orchestrator (`orchestrator.ts`).
 *
 * The controlling module that sequences the nine pipeline phases, resumes a run
 * from whatever artifacts already exist, enforces the write-fail halt, and
 * delegates every unit of judgement work to the deterministic core and an
 * injectable agent layer. It never scores or fixes on its own; it wires the
 * pure modules together and owns the *control flow*:
 *
 *  - fixed phase order and prerequisite backfill (`state.ts` — Req 1.1, 1.7);
 *  - Brief normalization and the consolidated missing-field gate
 *    (`brief.ts` — Req 1.5, 2.7–2.9);
 *  - guarded persistence + verify with a halt-on-write-failure `HaltError`
 *    (`artifacts.ts` — Req 1.2, 1.3);
 *  - directory containment (all writes go through `artifacts.ts` — Req 1.4);
 *  - Sacred_UI preservation (`constraints.ts` — Req 1.6, 8.6, 14.7);
 *  - always-run Responsive + Performance checkers and checker-failure handling
 *    (Req 9.6, 9.8);
 *  - the Review gate via `scoring.ts` (Req 13) and verdict routing via
 *    `loop.ts` (Req 14), with the escalation and ship terminals (Req 14.8, 15);
 *  - resume and interrupt handling (Req 16).
 *
 * The genuinely subjective work — trend selection, story, component mapping,
 * code authoring, qualitative checker scoring, corrections — is performed by an
 * injectable {@link PhaseRunners} object. Sensible default no-op runners write
 * minimal artifacts and report passing checker scores, so the deterministic
 * control flow is fully exercisable in a unit test without a real agent layer.
 *
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 4.4, 4.5, 9.1, 9.2, 9.3,
 * 9.6, 9.8, 14.1, 14.4, 14.5, 14.8, 15.1, 16.1, 16.2
 */

import { mkdir, readFile, readdir, rename } from "node:fs/promises";
import { resolve } from "node:path";

import {
    ARTIFACT_NAMES,
    ROOT,
    loopArtifactName,
    parseArtifact,
    persist as defaultPersist,
    serializeArtifact,
    verifyExists as defaultVerifyExists,
} from "./artifacts";
import type { LoopDimension } from "./artifacts";
import { normalizeBrief } from "./brief";
import { SACRED_UI, isSacredEditPermitted } from "./constraints";
import {
    FIXER_DIMENSIONS,
    failedDimensions,
    fixersForDimensions,
    incrementLoop,
    nextAction,
    scheduleFixers,
} from "./loop";
import type { FixerFileSets, FixerName } from "./loop";
import { discoverState, prerequisiteBackfill, resumePoint } from "./state";
import {
    applyContentHonestyCap,
    evaluateGate,
    mergeFindings,
    openP2,
} from "./scoring";
import { resolveLoadedSkills } from "./phase-skills";
import { internetRetrievalPermitted } from "./validators";
import type {
    Brief,
    BriefInput,
    CheckerReport,
    Dimension,
    DimensionScores,
    Finding,
    Phase,
    PipelineState,
    RequiredField,
    ReviewArtifact,
    Score,
    Verdict,
} from "./types";

// ---------------------------------------------------------------------------
// Public interfaces
// ---------------------------------------------------------------------------

/**
 * The controlling contract. `run` is the entry point; `runPhase` runs exactly
 * one phase (backfilling prerequisites first); `applyInterrupt` handles the
 * four user interrupts.
 */
export interface Orchestrator {
    run(slug: string): Promise<PipelineOutcome>;
    runPhase(state: PipelineState, phase: Phase): Promise<PipelineState>;
    applyInterrupt(
        state: PipelineState,
        interrupt: Interrupt,
    ): Promise<PipelineState>;
}

/**
 * A user interrupt. Discriminated on `kind`:
 *  - `stop`             — persist current state and halt (Req 16.3);
 *  - `new_direction`    — archive the session and restart at Trend (Req 16.4);
 *  - `fix_dimension`    — run only the given dimension's checker + fixer (Req 16.5);
 *  - `approve_override` — write the ship report with `USER_OVERRIDE` (Req 16.6).
 */
export type Interrupt =
    | { kind: "stop" }
    | { kind: "new_direction" }
    | { kind: "fix_dimension"; dimension: Dimension }
    | { kind: "approve_override" };

/**
 * A structured artifact draft returned by an agent runner. The orchestrator
 * serializes `front` + `body` and persists it under the phase's artifact name.
 * `filesEdited` (Builder / Correction) is checked against the Sacred_UI lock.
 */
export interface ArtifactDraft {
    front: Record<string, unknown>;
    body: string;
    filesEdited?: readonly string[];
}

/** A checker's output: its structured report plus an optional artifact draft. */
export interface CheckerOutcome {
    report: CheckerReport;
    draft?: ArtifactDraft;
}

/** A correction fixer's output. */
export interface CorrectionOutcome {
    draft?: ArtifactDraft;
    filesEdited?: readonly string[];
}

/** The Review agent's content-honesty judgement (Req 13.9 lives in scoring.ts). */
export interface ContentHonestyOutcome {
    score: Score | null;
    findings: Finding[];
}

/** Context handed to every agent runner for a phase. */
export interface PhaseContext {
    slug: string;
    brief: Brief;
    state: PipelineState;
    phase: Phase;
    /** Skills loaded for this phase (assigned minus unavailable — Req 5.1). */
    loadedSkills: string[];
    /** Assigned skills that were unavailable this run (Req 5.5). */
    unavailableSkills: string[];
    /** Sacred_UI components to preserve (Req 1.6). */
    sacredUi: readonly string[];
    /** Sacred_UI components the Brief brought into scope (Req 1.6, 8.6). */
    expandedScope: readonly string[];
    /** The current loop counter. */
    loop: number;
    /** Whether internet retrieval is permitted in this phase (Req 4.4, 4.5). */
    internetAllowed: boolean;
}

/**
 * The injectable agent layer. Every runner is optional; a missing runner falls
 * back to a deterministic default (see {@link defaultRunners}) that writes a
 * minimal artifact and, for checkers, reports passing scores.
 */
export interface PhaseRunners {
    trend?: (ctx: PhaseContext) => Promise<ArtifactDraft> | ArtifactDraft;
    story?: (ctx: PhaseContext) => Promise<ArtifactDraft> | ArtifactDraft;
    componentMap?: (ctx: PhaseContext) => Promise<ArtifactDraft> | ArtifactDraft;
    build?: (ctx: PhaseContext) => Promise<ArtifactDraft> | ArtifactDraft;
    designChecker?: (ctx: PhaseContext) => Promise<CheckerOutcome> | CheckerOutcome;
    responsiveChecker?: (
        ctx: PhaseContext,
    ) => Promise<CheckerOutcome> | CheckerOutcome;
    performanceChecker?: (
        ctx: PhaseContext,
    ) => Promise<CheckerOutcome> | CheckerOutcome;
    contentHonesty?: (
        ctx: PhaseContext,
    ) => Promise<ContentHonestyOutcome> | ContentHonestyOutcome;
    correction?: (
        ctx: PhaseContext,
        fixer: FixerName,
        dimensions: readonly Dimension[],
    ) => Promise<CorrectionOutcome> | CorrectionOutcome;
}

/** The guarded IO seam. Defaults to the `artifacts.ts` implementations. */
export interface ArtifactIo {
    persist(slug: string, name: string, content: string): Promise<void>;
    verifyExists(slug: string, name: string): Promise<boolean>;
}

/** Options controlling a run. */
export interface RunOptions {
    /** Raw Brief input; when present the Brief phase is (re)run and persisted. */
    brief?: BriefInput;
    /** Injectable agent runners. */
    runners?: PhaseRunners;
    /** Skills unavailable this run (recorded per phase — Req 5.5). */
    unavailableSkills?: string[];
    /** Sacred_UI components explicitly in scope (Req 1.6, 8.6, 14.7). */
    expandedScope?: string[];
    /** Guarded IO override (for tests). */
    io?: ArtifactIo;
    /**
     * Called with the still-absent required fields so the caller can supply a
     * consolidated answer (Req 2.7). Invoked repeatedly until nothing is absent
     * or a bounded number of attempts is exhausted (Req 2.8).
     */
    onMissingRequired?: (
        missing: RequiredField[],
        brief: Brief,
    ) => Promise<Partial<BriefInput>> | Partial<BriefInput>;
    /** Narrative summary recorded in the ship report (Req 15.2). */
    narrativeSummary?: string;
    /** Design direction name recorded in the ship report (Req 15.2). */
    directionName?: string;
    /** Per-fixer file sets used to schedule corrections (Req 14.6). */
    fixerFileSets?: FixerFileSets;
}

/** The lifecycle status a run terminates in. */
export type PipelineStatus =
    | "shipped"
    | "escalated"
    | "awaiting_input"
    | "override_shipped";

/** The result of a `run`. */
export interface PipelineOutcome {
    slug: string;
    status: PipelineStatus;
    verdict: "APPROVED" | "REJECTED" | "USER_OVERRIDE" | null;
    overall: Score | null;
    dimensions: DimensionScores | null;
    /** The last phase actually executed. */
    finalPhase: Phase;
    /** The phase the run resumed from. */
    resumePoint: Phase;
    /** The terminal pipeline state. */
    state: PipelineState;
    /** Still-absent required Brief fields (populated when awaiting input). */
    missingRequired: RequiredField[];
    /** Recorded non-fatal write failures (e.g. ship report — Req 15.4). */
    writeFailures: string[];
}

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

/**
 * Thrown when a phase artifact fails to persist or verify. It carries the phase
 * that failed, the in-memory phase output (so the caller can retry without
 * recomputation, Req 1.3), and a human-readable message. The orchestrator does
 * not swallow it — the run halts before advancing.
 */
export class HaltError extends Error {
    readonly phase: Phase;
    readonly output: unknown;

    constructor(phase: Phase, message: string, output: unknown) {
        super(message);
        this.name = "HaltError";
        this.phase = phase;
        this.output = output;
        Object.setPrototypeOf(this, HaltError.prototype);
    }
}

/**
 * Thrown when a Builder or Correction edit targets a Sacred_UI component that
 * the Brief did not bring into scope (Req 1.6, 8.6, 14.7).
 */
export class SacredEditError extends Error {
    readonly phase: Phase;
    readonly path: string;

    constructor(phase: Phase, path: string) {
        super(
            `Refusing to edit Sacred_UI component during "${phase}": "${path}" ` +
            `is not listed in the Brief's expanded scope.`,
        );
        this.name = "SacredEditError";
        this.phase = phase;
        this.path = path;
        Object.setPrototypeOf(this, SacredEditError.prototype);
    }
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** The name of the run-state snapshot written on a `stop` interrupt (Req 16.3). */
const STATE_SNAPSHOT_NAME = "STATE.md";

/** The phases run linearly before the correction loop, in canonical order. */
const LINEAR_PHASES: readonly Phase[] = [
    "trend",
    "story",
    "component_map",
    "build",
];

/** All six scored dimensions, in canonical order. */
const ALL_DIMENSIONS: readonly Dimension[] = [
    "visual_design",
    "storytelling",
    "motion",
    "layout_responsive",
    "performance",
    "content_honesty",
];

/** The pass minimum applied to routing of failed dimensions. */
const PASS_MIN = 8.0;

/** The dimensions each checker is assigned (Req 9.4). */
const CHECKER_DIMENSIONS: Record<CheckerReport["agent"], Dimension[]> = {
    "design-checker": ["visual_design", "storytelling", "motion"],
    "responsive-checker": ["layout_responsive"],
    "performance-checker": ["performance"],
};

/** Default passing score reported by a stub checker. */
const DEFAULT_PASS_SCORE = 9.0;

/** Default content-honesty score assigned by the Review step when honest. */
const DEFAULT_CONTENT_HONESTY = 9.0;

// ---------------------------------------------------------------------------
// Pure state helpers
// ---------------------------------------------------------------------------

/** Return a new state with `phases` added to `completedPhases`. */
function addCompleted(state: PipelineState, ...phases: Phase[]): PipelineState {
    const completedPhases = new Set(state.completedPhases);
    for (const phase of phases) {
        completedPhases.add(phase);
    }
    return { ...state, completedPhases };
}

/** Return a new state with `phases` removed from `completedPhases`. */
function removeCompleted(
    state: PipelineState,
    ...phases: Phase[]
): PipelineState {
    const completedPhases = new Set(state.completedPhases);
    for (const phase of phases) {
        completedPhases.delete(phase);
    }
    return { ...state, completedPhases };
}

/** The route recorded in the ship report; falls back to the slug (Req 15.2). */
function routeOf(brief: Brief): string {
    return brief.route.present ? brief.route.value : brief.slug.present ? brief.slug.value : "";
}

/** Extract a human-readable message from an unknown thrown value. */
function messageOf(err: unknown): string {
    if (err instanceof Error) {
        return err.message;
    }
    return String(err);
}

/** The fixer that owns a given dimension (Req 14.1, 14.6). */
function fixerForDimension(dimension: Dimension): FixerName {
    const [fixer] = fixersForDimensions([dimension]);
    return fixer ?? "design";
}

// ---------------------------------------------------------------------------
// Default runners (deterministic no-op agent layer)
// ---------------------------------------------------------------------------

/** A minimal front-matter+body draft for a linear phase. */
function defaultDraft(phase: Phase): ArtifactDraft {
    return {
        front: { phase, status: "stub" },
        body: `# ${phase}\n\nGenerated by the default Page Forge runner (stub).\n`,
    };
}

/** A default checker outcome that reports passing scores and no findings. */
function defaultCheckerOutcome(agent: CheckerReport["agent"]): CheckerOutcome {
    const scores: Partial<Record<Dimension, Score | null>> = {};
    for (const dimension of CHECKER_DIMENSIONS[agent]) {
        scores[dimension] = DEFAULT_PASS_SCORE;
    }
    return {
        report: {
            agent,
            scores,
            findings: [],
            evidence: [
                { kind: "behavior", detail: "default runner inspection (stub)" },
            ],
        },
    };
}

// ---------------------------------------------------------------------------
// Orchestrator implementation
// ---------------------------------------------------------------------------

class OrchestratorImpl implements Orchestrator {
    private readonly runners: PhaseRunners;
    private readonly io: ArtifactIo;
    private readonly unavailableSkills: string[];
    private readonly expandedScope: string[];
    private readonly onMissingRequired: RunOptions["onMissingRequired"];
    private readonly narrativeSummary: string;
    private readonly directionName?: string;
    private readonly fixerFileSets: FixerFileSets;

    /** Raw Brief input, mutated as consolidated answers arrive. */
    private briefInput?: BriefInput;

    // Per-run mutable caches.
    private lastReports: CheckerReport[] | null = null;
    private lastVerdict: Verdict | null = null;
    private lastFindings: Finding[] | null = null;
    private writeFailures: string[] = [];
    private initialResume: Phase = "brief";
    private lastPhaseRun: Phase = "brief";

    constructor(opts: RunOptions) {
        this.runners = opts.runners ?? {};
        this.io = opts.io ?? {
            persist: defaultPersist,
            verifyExists: defaultVerifyExists,
        };
        this.unavailableSkills = opts.unavailableSkills ?? [];
        this.expandedScope =
            opts.expandedScope ?? opts.brief?.expandedScope ?? [];
        this.onMissingRequired = opts.onMissingRequired;
        this.narrativeSummary = opts.narrativeSummary ?? "";
        this.directionName = opts.directionName;
        this.fixerFileSets = opts.fixerFileSets ?? {};
        this.briefInput = opts.brief;
    }

    // -----------------------------------------------------------------------
    // Entry point
    // -----------------------------------------------------------------------

    async run(slug: string): Promise<PipelineOutcome> {
        this.resetRunCaches();

        let state = await discoverState(slug);
        state = this.applyBriefOverride(state);
        this.initialResume = resumePoint(state);

        // --- Brief phase + consolidated missing-field gate (Req 1.5, 2.7-2.9) ---
        const forceBrief = this.briefInput !== undefined;
        if (forceBrief || !state.completedPhases.has("brief")) {
            state = await this.ensureBrief(state);
            if (state.brief.missingRequired.length > 0) {
                // Cannot advance past Brief while a required field is absent.
                this.lastPhaseRun = "brief";
                return this.buildOutcome(state, "awaiting_input", null);
            }
            state = await this.runPhase(state, "brief");
        }

        // --- Linear phases: Trend -> Story -> Component Map -> Build ---
        for (const phase of LINEAR_PHASES) {
            if (!state.completedPhases.has(phase)) {
                state = await this.runPhase(state, phase);
            }
        }

        // --- Bounded correction loop + terminals ---
        return this.runLoop(state);
    }

    // -----------------------------------------------------------------------
    // Single-phase execution (Req 1.7 backfill + atomic run)
    // -----------------------------------------------------------------------

    async runPhase(state: PipelineState, phase: Phase): Promise<PipelineState> {
        // Backfill any missing prerequisite phases in canonical order (Req 1.7).
        for (const prerequisite of prerequisiteBackfill(
            state.completedPhases,
            phase,
        )) {
            state = await this.runPhaseOnce(state, prerequisite);
        }
        return this.runPhaseOnce(state, phase);
    }

    /** Run exactly one phase without backfilling. */
    private async runPhaseOnce(
        state: PipelineState,
        phase: Phase,
    ): Promise<PipelineState> {
        this.lastPhaseRun = phase;
        switch (phase) {
            case "brief":
                return this.runBrief(state);
            case "trend":
                return this.runLinear(state, "trend", ARTIFACT_NAMES.direction, this.runners.trend);
            case "story":
                return this.runLinear(state, "story", ARTIFACT_NAMES.story, this.runners.story);
            case "component_map":
                return this.runLinear(
                    state,
                    "component_map",
                    ARTIFACT_NAMES.componentMap,
                    this.runners.componentMap,
                );
            case "build":
                return this.runBuild(state);
            case "parallel_check":
                return this.runParallelCheck(state);
            case "review":
                return this.runReview(state);
            case "correction":
                return this.runCorrection(state);
            case "ship":
                return this.runShip(state);
            default:
                return state;
        }
    }

    // -----------------------------------------------------------------------
    // Phase implementations
    // -----------------------------------------------------------------------

    /** Brief phase: persist the normalized Brief (Req 2.1). */
    private async runBrief(state: PipelineState): Promise<PipelineState> {
        const content = this.briefContent(state.brief);
        await this.persistAndVerify(
            state.slug,
            ARTIFACT_NAMES.brief,
            content,
            "brief",
            state.brief,
        );
        return addCompleted(state, "brief");
    }

    /** A linear judgement phase (Trend / Story / Component Map). */
    private async runLinear(
        state: PipelineState,
        phase: Phase,
        artifactName: string,
        runner:
            | ((ctx: PhaseContext) => Promise<ArtifactDraft> | ArtifactDraft)
            | undefined,
    ): Promise<PipelineState> {
        const ctx = this.buildContext(state, phase);
        const draft = runner ? await runner(ctx) : defaultDraft(phase);
        this.assertSacred(draft.filesEdited, phase);
        await this.persistAndVerify(
            state.slug,
            artifactName,
            serializeArtifact(draft.front, draft.body),
            phase,
            draft,
        );
        return addCompleted(state, phase);
    }

    /** Build phase: authors page code + `04-BUILD.md` (Req 9.1 precondition). */
    private async runBuild(state: PipelineState): Promise<PipelineState> {
        const ctx = this.buildContext(state, "build");
        const draft = this.runners.build
            ? await this.runners.build(ctx)
            : defaultDraft("build");
        this.assertSacred(draft.filesEdited, "build");
        await this.persistAndVerify(
            state.slug,
            ARTIFACT_NAMES.build,
            serializeArtifact(draft.front, draft.body),
            "build",
            draft,
        );
        return addCompleted(state, "build");
    }

    /**
     * Parallel Check phase: launch the three checkers concurrently. Responsive
     * and Performance always run regardless of the Design result (Req 9.6); a
     * checker that fails has its dimensions marked unscored and the run
     * continues (Req 9.8).
     */
    private async runParallelCheck(
        state: PipelineState,
    ): Promise<PipelineState> {
        const ctx = this.buildContext(state, "parallel_check");
        const [design, responsive, performance] = await Promise.all([
            this.runChecker("design-checker", this.runners.designChecker, ctx),
            this.runChecker(
                "responsive-checker",
                this.runners.responsiveChecker,
                ctx,
            ),
            this.runChecker(
                "performance-checker",
                this.runners.performanceChecker,
                ctx,
            ),
        ]);

        await this.persistAndVerify(
            state.slug,
            ARTIFACT_NAMES.design,
            this.checkerContent(design.report, design.draft),
            "parallel_check",
            design.report,
        );
        await this.persistAndVerify(
            state.slug,
            ARTIFACT_NAMES.responsive,
            this.checkerContent(responsive.report, responsive.draft),
            "parallel_check",
            responsive.report,
        );
        await this.persistAndVerify(
            state.slug,
            ARTIFACT_NAMES.performance,
            this.checkerContent(performance.report, performance.draft),
            "parallel_check",
            performance.report,
        );

        this.lastReports = [design.report, responsive.report, performance.report];
        return addCompleted(state, "parallel_check");
    }

    /**
     * Review phase: aggregate checker reports, apply the content-honesty cap,
     * evaluate the gate via `scoring.ts`, and persist `06-REVIEW.md` (Req 13).
     */
    private async runReview(state: PipelineState): Promise<PipelineState> {
        const reports = this.lastReports ?? (await this.gatherReports(state));
        const ctx = this.buildContext(state, "review");

        const honesty: ContentHonestyOutcome = this.runners.contentHonesty
            ? await this.runners.contentHonesty(ctx)
            : { score: DEFAULT_CONTENT_HONESTY, findings: [] };

        const scores = this.combineScores(reports, honesty.score);
        const rawFindings: Finding[] = [
            ...reports.flatMap((report) => report.findings),
            ...honesty.findings,
        ];

        const { scores: capped, findings: withCap } = applyContentHonestyCap(
            scores,
            rawFindings,
        );
        const verdict = evaluateGate(capped, withCap, state.brief.threshold);
        const merged = mergeFindings([
            { agent: "design-checker", scores: {}, findings: withCap, evidence: [] },
        ]);
        const p0 = merged.filter((finding) => finding.severity === "P0");
        const p1 = merged.filter((finding) => finding.severity === "P1");

        const review: ReviewArtifact = {
            verdict: verdict.verdict,
            loop: state.loop.loop,
            overall: verdict.overall,
            dimensions: capped,
            p0,
            p1,
        };

        await this.persistAndVerify(
            state.slug,
            ARTIFACT_NAMES.review,
            serializeArtifact(review, this.reviewBody(verdict)),
            "review",
            review,
        );

        this.lastVerdict = verdict;
        this.lastFindings = withCap;
        const next = addCompleted(state, "review");
        return {
            ...next,
            loop: { ...next.loop, lastVerdict: verdict.verdict },
        };
    }

    /**
     * Correction phase: fix the failed dimensions (P0 before P1 is enforced by
     * each fixer), record `07-LOOP-<n>-<dim>.md`, and increment the loop
     * counter (Req 14.1, 14.4, 14.6). Parallel Check and Review are cleared so
     * the next iteration re-runs them (Req 14.5).
     */
    private async runCorrection(state: PipelineState): Promise<PipelineState> {
        const verdict = await this.currentVerdict(state);
        const dimensions = verdict ? failedDimensions(verdict) : [];
        const fixers = fixersForDimensions(dimensions);

        // Schedule: parallelize disjoint file sets, serialize shared ones
        // (Req 14.6). Fixers with no declared file set default to their name.
        const fileSets: FixerFileSets = {};
        for (const fixer of fixers) {
            fileSets[fixer] = this.fixerFileSets[fixer] ?? [`__fixer__/${fixer}`];
        }
        const schedule = scheduleFixers(fileSets);
        const orderedFixers = schedule.flat();

        const loopNumber = state.loop.loop;
        for (const fixer of orderedFixers) {
            const ctx = this.buildContext(state, "correction");
            const fixerDimensions = FIXER_DIMENSIONS[fixer].filter((dimension) =>
                dimensions.includes(dimension),
            );
            const outcome = this.runners.correction
                ? await this.runners.correction(ctx, fixer, fixerDimensions)
                : {};
            const edited = outcome.filesEdited ?? outcome.draft?.filesEdited;
            this.assertSacred(edited, "correction");
            const draft = outcome.draft ?? this.correctionDraft(fixer, loopNumber);
            await this.persistAndVerify(
                state.slug,
                loopArtifactName(loopNumber, fixer as LoopDimension),
                serializeArtifact(draft.front, draft.body),
                "correction",
                draft,
            );
        }

        // Advance the loop and reset the current-loop check/review completion so
        // the next iteration re-runs Parallel Check + Review (Req 14.4, 14.5).
        const advanced = incrementLoop(state.loop);
        this.lastReports = null;
        this.lastVerdict = null;
        this.lastFindings = null;

        const cleared = removeCompleted(
            state,
            "parallel_check",
            "review",
            "correction",
        );
        return {
            ...cleared,
            loop: { ...advanced, lastVerdict: null },
            currentLoopArtifacts: {
                design: false,
                responsive: false,
                performance: false,
            },
        };
    }

    /** Ship phase: write `08-VERIFICATION.md`; continue on write failure (Req 15). */
    private async runShip(state: PipelineState): Promise<PipelineState> {
        const verdict = await this.currentVerdict(state);
        await this.writeShipReport(state, verdict, "APPROVED");
        return addCompleted(state, "ship");
    }

    // -----------------------------------------------------------------------
    // Correction loop driver + terminals
    // -----------------------------------------------------------------------

    /**
     * Drive the bounded correction loop from the current state to a terminal.
     * Runs Parallel Check + Review to obtain a verdict (unless positioned to
     * run Correction directly on resume), then routes via `nextAction`:
     * APPROVED -> ship, escalate when the counter is exhausted, otherwise
     * correct and iterate.
     */
    private async runLoop(state: PipelineState): Promise<PipelineOutcome> {
        // Bound the number of iterations defensively; the monotonic loop counter
        // guarantees termination well within this ceiling (Property 45).
        const iterationCeiling = state.loop.maxLoops + 2;
        for (let iteration = 0; iteration <= iterationCeiling; iteration++) {
            if (state.completedPhases.has("ship")) {
                return this.buildOutcome(state, "shipped", this.lastVerdict);
            }

            const correctDirectly = this.needsCorrectionDirectly(state);
            if (!correctDirectly) {
                if (!state.completedPhases.has("parallel_check")) {
                    state = await this.runPhase(state, "parallel_check");
                }
                if (!state.completedPhases.has("review")) {
                    state = await this.runPhase(state, "review");
                }
            }

            const verdict = await this.currentVerdict(state);
            if (verdict === null) {
                // No verdict available: run the checks explicitly and retry.
                state = await this.runPhase(state, "parallel_check");
                state = await this.runPhase(state, "review");
                continue;
            }

            const action = nextAction(state.loop, verdict);
            if (action.kind === "ship") {
                state = await this.runShip(state);
                return this.buildOutcome(state, "shipped", verdict);
            }
            if (action.kind === "escalate") {
                state = await this.escalate(state, verdict);
                return this.buildOutcome(state, "escalated", verdict);
            }
            // action.kind === "correct"
            state = await this.runPhase(state, "correction");
        }

        // Unreachable in practice; surface the current state defensively.
        return this.buildOutcome(state, "escalated", this.lastVerdict);
    }

    /**
     * True when the run is positioned to run Correction directly: the recorded
     * verdict is REJECTED, Review is complete but Correction is not, and no
     * correction artifact exists for the current loop (Req 16.2).
     */
    private needsCorrectionDirectly(state: PipelineState): boolean {
        const rejected = state.loop.lastVerdict === "REJECTED";
        const anyCorrection =
            state.currentLoopArtifacts.design ||
            state.currentLoopArtifacts.responsive ||
            state.currentLoopArtifacts.performance;
        return (
            rejected &&
            !anyCorrection &&
            state.completedPhases.has("review") &&
            !state.completedPhases.has("correction")
        );
    }

    /** Escalation terminal: write `08-ESCALATION.md` and stop (Req 14.8). */
    private async escalate(
        state: PipelineState,
        verdict: Verdict,
    ): Promise<PipelineState> {
        const remaining = this.lastFindings ?? verdict.openP0;
        const front = {
            verdict: "ESCALATED",
            loop: state.loop.loop,
            maxLoops: state.loop.maxLoops,
            overall: verdict.overall,
            dimensions: verdict.dimensions,
            remainingFindings: remaining,
        };
        const body =
            `# Escalation\n\nMax_Loops (${state.loop.maxLoops}) reached with a ` +
            `REJECTED verdict. ${remaining.length} finding(s) remain.\n`;
        await this.persistAndVerify(
            state.slug,
            ARTIFACT_NAMES.escalation,
            serializeArtifact(front, body),
            "review",
            front,
        );
        return state;
    }

    /**
     * Write the ship report. Uses best-effort persistence: on write failure the
     * approval is not rolled back, the failure is recorded, and the run
     * continues (Req 15.4).
     */
    private async writeShipReport(
        state: PipelineState,
        verdict: Verdict | null,
        finalVerdict: "APPROVED" | "USER_OVERRIDE",
    ): Promise<void> {
        const front = {
            verdict: finalVerdict,
            route: routeOf(state.brief),
            overall: verdict?.overall ?? null,
            dimensions: verdict?.dimensions ?? null,
            designDirection: this.directionName ?? "",
            narrativeSummary: this.narrativeSummary,
            p2: openP2(this.lastFindings ?? []),
        };
        const body =
            `# Ship Report\n\nRoute: ${routeOf(state.brief)}\n` +
            `Verdict: ${finalVerdict}\n`;
        await this.persistBestEffort(
            state.slug,
            ARTIFACT_NAMES.verification,
            serializeArtifact(front, body),
        );
    }

    // -----------------------------------------------------------------------
    // Interrupt handling (Req 16.3-16.6)
    // -----------------------------------------------------------------------

    async applyInterrupt(
        state: PipelineState,
        interrupt: Interrupt,
    ): Promise<PipelineState> {
        switch (interrupt.kind) {
            case "stop":
                return this.interruptStop(state);
            case "new_direction":
                return this.interruptNewDirection(state);
            case "fix_dimension":
                return this.interruptFixDimension(state, interrupt.dimension);
            case "approve_override":
                return this.interruptApproveOverride(state);
            default:
                return state;
        }
    }

    /** stop: persist the current state snapshot and halt (Req 16.3). */
    private async interruptStop(state: PipelineState): Promise<PipelineState> {
        const front = {
            slug: state.slug,
            loop: state.loop.loop,
            maxLoops: state.loop.maxLoops,
            lastVerdict: state.loop.lastVerdict,
            completedPhases: [...state.completedPhases],
        };
        await this.persistBestEffort(
            state.slug,
            STATE_SNAPSHOT_NAME,
            serializeArtifact(front, "# Stopped\n\nRun halted by user request.\n"),
        );
        return state;
    }

    /**
     * new direction: archive the session directory under `archive-<timestamp>/`
     * and restart at Trend by re-persisting the Brief and rediscovering the
     * (now near-empty) state (Req 16.4).
     */
    private async interruptNewDirection(
        state: PipelineState,
    ): Promise<PipelineState> {
        await this.archiveSession(state.slug);
        // Re-establish the Brief so the restart begins at Trend, not Brief.
        await this.persistBestEffort(
            state.slug,
            ARTIFACT_NAMES.brief,
            this.briefContent(state.brief),
        );
        this.resetRunCaches();
        return discoverState(state.slug);
    }

    /** fix only one dimension: run that checker and its fixer (Req 16.5). */
    private async interruptFixDimension(
        state: PipelineState,
        dimension: Dimension,
    ): Promise<PipelineState> {
        const fixer = fixerForDimension(dimension);
        const agent = `${fixer}-checker` as CheckerReport["agent"];
        const runnerByFixer: Record<
            FixerName,
            PhaseRunners["designChecker"]
        > = {
            design: this.runners.designChecker,
            responsive: this.runners.responsiveChecker,
            performance: this.runners.performanceChecker,
        };

        const ctx = this.buildContext(state, "parallel_check");
        const checker = await this.runChecker(agent, runnerByFixer[fixer], ctx);
        const artifactName = this.checkerArtifactName(fixer);
        await this.persistAndVerify(
            state.slug,
            artifactName,
            this.checkerContent(checker.report, checker.draft),
            "parallel_check",
            checker.report,
        );

        const correctionCtx = this.buildContext(state, "correction");
        const outcome = this.runners.correction
            ? await this.runners.correction(correctionCtx, fixer, [dimension])
            : {};
        const edited = outcome.filesEdited ?? outcome.draft?.filesEdited;
        this.assertSacred(edited, "correction");
        const draft = outcome.draft ?? this.correctionDraft(fixer, state.loop.loop);
        await this.persistAndVerify(
            state.slug,
            loopArtifactName(state.loop.loop, fixer as LoopDimension),
            serializeArtifact(draft.front, draft.body),
            "correction",
            draft,
        );

        const currentLoopArtifacts = { ...state.currentLoopArtifacts };
        currentLoopArtifacts[fixer] = true;
        return { ...state, currentLoopArtifacts };
    }

    /** approve anyway: write the ship report with `USER_OVERRIDE` (Req 16.6). */
    private async interruptApproveOverride(
        state: PipelineState,
    ): Promise<PipelineState> {
        const verdict = await this.currentVerdict(state);
        await this.writeShipReport(state, verdict, "USER_OVERRIDE");
        return addCompleted(state, "ship");
    }

    // -----------------------------------------------------------------------
    // Checker execution + report aggregation
    // -----------------------------------------------------------------------

    /**
     * Run a single checker, translating any failure into a report whose
     * assigned dimensions are marked unscored (null) so the run continues
     * (Req 9.8). A missing runner falls back to the passing default.
     */
    private async runChecker(
        agent: CheckerReport["agent"],
        runner:
            | ((ctx: PhaseContext) => Promise<CheckerOutcome> | CheckerOutcome)
            | undefined,
        ctx: PhaseContext,
    ): Promise<CheckerOutcome> {
        if (!runner) {
            return defaultCheckerOutcome(agent);
        }
        try {
            return await runner(ctx);
        } catch {
            const scores: Partial<Record<Dimension, Score | null>> = {};
            for (const dimension of CHECKER_DIMENSIONS[agent]) {
                scores[dimension] = null;
            }
            return {
                report: {
                    agent,
                    scores,
                    findings: [],
                    evidence: [
                        { kind: "behavior", detail: "checker failed to complete" },
                    ],
                    failed: true,
                },
            };
        }
    }

    /** Re-run the three checkers to reconstruct reports (resume at Review). */
    private async gatherReports(
        state: PipelineState,
    ): Promise<CheckerReport[]> {
        const ctx = this.buildContext(state, "parallel_check");
        const [design, responsive, performance] = await Promise.all([
            this.runChecker("design-checker", this.runners.designChecker, ctx),
            this.runChecker(
                "responsive-checker",
                this.runners.responsiveChecker,
                ctx,
            ),
            this.runChecker(
                "performance-checker",
                this.runners.performanceChecker,
                ctx,
            ),
        ]);
        return [design.report, responsive.report, performance.report];
    }

    /**
     * Merge checker dimension scores into a full {@link DimensionScores},
     * initializing every dimension to null so a missing/failed checker leaves
     * its dimensions unscored (Req 9.8). `content_honesty` comes from the
     * Review agent's judgement.
     */
    private combineScores(
        reports: CheckerReport[],
        contentHonesty: Score | null,
    ): DimensionScores {
        const scores: DimensionScores = {};
        for (const dimension of ALL_DIMENSIONS) {
            scores[dimension] = null;
        }
        for (const report of reports) {
            for (const [dimension, value] of Object.entries(report.scores)) {
                scores[dimension] = value ?? null;
            }
        }
        scores.content_honesty = contentHonesty ?? null;
        return scores;
    }

    /**
     * The current verdict: the cached in-memory verdict when present, otherwise
     * reconstructed deterministically from the persisted `06-REVIEW.md`.
     */
    private async currentVerdict(
        state: PipelineState,
    ): Promise<Verdict | null> {
        if (this.lastVerdict !== null) {
            return this.lastVerdict;
        }
        return this.readReviewVerdict(state);
    }

    /** Reconstruct a Verdict from the persisted review artifact. */
    private async readReviewVerdict(
        state: PipelineState,
    ): Promise<Verdict | null> {
        let raw: string;
        try {
            raw = await readFile(
                resolve(process.cwd(), ROOT(state.slug), ARTIFACT_NAMES.review),
                "utf8",
            );
        } catch {
            return null;
        }
        const { front } = parseArtifact<Partial<ReviewArtifact>>(raw);
        const dimensions = (front.dimensions ?? {}) as DimensionScores;
        const findings: Finding[] = [
            ...((front.p0 ?? []) as Finding[]),
            ...((front.p1 ?? []) as Finding[]),
        ];
        const verdict = evaluateGate(dimensions, findings, state.brief.threshold);
        this.lastFindings = findings;
        return verdict;
    }

    // -----------------------------------------------------------------------
    // Guarded persistence
    // -----------------------------------------------------------------------

    /**
     * Persist an artifact and verify it exists. On any write or verify failure
     * throws a {@link HaltError} carrying the phase and in-memory output so the
     * run halts before advancing (Req 1.2, 1.3).
     */
    private async persistAndVerify(
        slug: string,
        name: string,
        content: string,
        phase: Phase,
        output: unknown,
    ): Promise<void> {
        try {
            await this.io.persist(slug, name, content);
        } catch (err) {
            throw new HaltError(
                phase,
                `Failed to write artifact "${name}": ${messageOf(err)}`,
                output,
            );
        }
        let exists: boolean;
        try {
            exists = await this.io.verifyExists(slug, name);
        } catch (err) {
            throw new HaltError(
                phase,
                `Failed to verify artifact "${name}": ${messageOf(err)}`,
                output,
            );
        }
        if (!exists) {
            throw new HaltError(
                phase,
                `Artifact "${name}" was not found after writing.`,
                output,
            );
        }
    }

    /**
     * Persist an artifact best-effort. On failure the error is recorded in
     * `writeFailures` and the run continues (used for the ship report — Req
     * 15.4 — and the stop snapshot).
     */
    private async persistBestEffort(
        slug: string,
        name: string,
        content: string,
    ): Promise<boolean> {
        try {
            await this.io.persist(slug, name, content);
            const ok = await this.io.verifyExists(slug, name);
            if (!ok) {
                this.writeFailures.push(`${name}: not found after write`);
                return false;
            }
            return true;
        } catch (err) {
            this.writeFailures.push(`${name}: ${messageOf(err)}`);
            return false;
        }
    }

    // -----------------------------------------------------------------------
    // Brief handling
    // -----------------------------------------------------------------------

    /** Apply an explicit Brief override onto the discovered state. */
    private applyBriefOverride(state: PipelineState): PipelineState {
        if (this.briefInput === undefined) {
            return state;
        }
        const brief = normalizeBrief(this.briefInput);
        return {
            ...state,
            brief,
            loop: { ...state.loop, maxLoops: brief.maxLoops },
        };
    }

    /**
     * Ensure the required Brief fields are present. When any are absent and an
     * `onMissingRequired` callback is provided, ask for a consolidated answer
     * and re-request still-absent fields up to a bounded number of attempts
     * (Req 2.7, 2.8). Returns the state with the (possibly updated) Brief.
     */
    private async ensureBrief(state: PipelineState): Promise<PipelineState> {
        let brief = state.brief;
        if (brief.missingRequired.length === 0 || !this.onMissingRequired) {
            return { ...state, brief, loop: { ...state.loop, maxLoops: brief.maxLoops } };
        }

        let input: BriefInput = this.briefInput ?? {};
        let attempts = 0;
        while (brief.missingRequired.length > 0 && attempts < 5) {
            const answer = await this.onMissingRequired(
                brief.missingRequired,
                brief,
            );
            input = { ...input, ...answer };
            brief = normalizeBrief(input);
            attempts += 1;
        }
        this.briefInput = input;
        return {
            ...state,
            brief,
            loop: { ...state.loop, maxLoops: brief.maxLoops },
        };
    }

    // -----------------------------------------------------------------------
    // Context, constraints, and content builders
    // -----------------------------------------------------------------------

    /** Build the {@link PhaseContext} handed to a phase's runner. */
    private buildContext(state: PipelineState, phase: Phase): PhaseContext {
        const { loaded, unavailable } = resolveLoadedSkills(
            phase,
            this.unavailableSkills,
        );
        return {
            slug: state.slug,
            brief: state.brief,
            state,
            phase,
            loadedSkills: loaded,
            unavailableSkills: unavailable,
            sacredUi: state.brief.sacredUi.length > 0 ? state.brief.sacredUi : [...SACRED_UI],
            expandedScope: this.expandedScope,
            loop: state.loop.loop,
            internetAllowed: internetRetrievalPermitted(phase, false),
        };
    }

    /**
     * Refuse edits to Sacred_UI components not brought into scope (Req 1.6,
     * 8.6, 14.7). Throws {@link SacredEditError} on the first violation.
     */
    private assertSacred(
        files: readonly string[] | undefined,
        phase: Phase,
    ): void {
        if (!files) {
            return;
        }
        for (const file of files) {
            if (!isSacredEditPermitted(file, this.expandedScope)) {
                throw new SacredEditError(phase, file);
            }
        }
    }

    /** Serialize the normalized Brief into `00-BRIEF.md` content. */
    private briefContent(brief: Brief): string {
        const front = {
            route: brief.route.present ? brief.route.value : null,
            slug: brief.slug.present ? brief.slug.value : null,
            pageKind: brief.pageKind.present ? brief.pageKind.value : null,
            audience: brief.audience.present ? brief.audience.value : null,
            contentSource: brief.contentSource.present
                ? brief.contentSource.value
                : null,
            references: brief.references,
            maxLoops: brief.maxLoops,
            threshold: brief.threshold,
            sacredUi: brief.sacredUi,
            rejections: brief.rejections,
            missingRequired: brief.missingRequired,
        };
        return serializeArtifact(front, "# Brief\n\nLocked page brief.\n");
    }

    /** Serialize a checker report into its `05*` artifact content. */
    private checkerContent(
        report: CheckerReport,
        draft: ArtifactDraft | undefined,
    ): string {
        if (draft) {
            return serializeArtifact(draft.front, draft.body);
        }
        const front = {
            agent: report.agent,
            scores: report.scores,
            findings: report.findings,
            evidence: report.evidence,
            failed: report.failed ?? false,
        };
        const heading = report.failed
            ? `# ${report.agent} (failed)\n\nChecker did not complete; dimensions unscored.\n`
            : `# ${report.agent}\n\nChecker report.\n`;
        return serializeArtifact(front, heading);
    }

    /** The `05*` artifact name a fixer's checker writes. */
    private checkerArtifactName(fixer: FixerName): string {
        switch (fixer) {
            case "design":
                return ARTIFACT_NAMES.design;
            case "responsive":
                return ARTIFACT_NAMES.responsive;
            case "performance":
                return ARTIFACT_NAMES.performance;
        }
    }

    /** A default correction artifact draft. */
    private correctionDraft(fixer: FixerName, loop: number): ArtifactDraft {
        return {
            front: { fixer, loop, status: "stub" },
            body: `# Correction ${loop} — ${fixer}\n\nDefault correction stub.\n`,
        };
    }

    /** The Markdown body of `06-REVIEW.md`. */
    private reviewBody(verdict: Verdict): string {
        return (
            `# Review\n\nVerdict: ${verdict.verdict}\n` +
            `Overall: ${verdict.overall}\n`
        );
    }

    // -----------------------------------------------------------------------
    // Archiving + outcome + reset
    // -----------------------------------------------------------------------

    /** Move existing session artifacts into a fresh `archive-<timestamp>/`. */
    private async archiveSession(slug: string): Promise<string> {
        const root = resolve(process.cwd(), ROOT(slug));
        const archiveName = `archive-${new Date()
            .toISOString()
            .replace(/[:.]/g, "-")}`;
        const archiveDir = resolve(root, archiveName);

        let entries: { name: string }[];
        try {
            entries = await readdir(root, { withFileTypes: true });
        } catch {
            return archiveName;
        }
        await mkdir(archiveDir, { recursive: true });
        for (const entry of entries) {
            if (entry.name.startsWith("archive-")) {
                continue;
            }
            await rename(
                resolve(root, entry.name),
                resolve(archiveDir, entry.name),
            );
        }
        return archiveName;
    }

    /** Assemble a {@link PipelineOutcome} for the run. */
    private buildOutcome(
        state: PipelineState,
        status: PipelineStatus,
        verdict: Verdict | null,
    ): PipelineOutcome {
        const resolvedVerdict: PipelineOutcome["verdict"] =
            status === "override_shipped"
                ? "USER_OVERRIDE"
                : verdict?.verdict ?? state.loop.lastVerdict ?? null;
        return {
            slug: state.slug,
            status,
            verdict: resolvedVerdict,
            overall: verdict?.overall ?? null,
            dimensions: verdict?.dimensions ?? null,
            finalPhase: this.lastPhaseRun,
            resumePoint: this.initialResume,
            state,
            missingRequired: state.brief.missingRequired,
            writeFailures: [...this.writeFailures],
        };
    }

    /** Clear per-run mutable caches at the start of a run. */
    private resetRunCaches(): void {
        this.lastReports = null;
        this.lastVerdict = null;
        this.lastFindings = null;
        this.writeFailures = [];
        this.initialResume = "brief";
        this.lastPhaseRun = "brief";
    }
}

// ---------------------------------------------------------------------------
// Public factory + convenience entry point
// ---------------------------------------------------------------------------

/**
 * Create an {@link Orchestrator} bound to the given options (runners, IO,
 * scope, callbacks). The returned object exposes `run`, `runPhase`, and
 * `applyInterrupt`.
 */
export function createOrchestrator(opts: RunOptions = {}): Orchestrator {
    return new OrchestratorImpl(opts);
}

/**
 * Convenience entry point: create an orchestrator for `opts` and run `slug`
 * end-to-end. Mirrors the `Orchestrator.run(slug, opts)` shape from the design.
 */
export function run(
    slug: string,
    opts: RunOptions = {},
): Promise<PipelineOutcome> {
    return createOrchestrator(opts).run(slug);
}
