/**
 * Page Forge Agent System — shared domain types.
 *
 * This module is pure type definitions plus the single `PHASE_ORDER` const
 * array. It is the source of truth for the shapes exchanged between the
 * deterministic core modules (brief, scoring, loop, state, artifacts,
 * rule evaluators) and the agent layer.
 *
 * Requirements: 1.1, 9.4, 9.7, 13.2
 */

// ---------------------------------------------------------------------------
// Page kind
// ---------------------------------------------------------------------------

export type PageKind = "service" | "about" | "case-study" | "landing";

// ---------------------------------------------------------------------------
// Phases (Req 1.1)
// ---------------------------------------------------------------------------

export type Phase =
    | "brief"
    | "trend"
    | "story"
    | "component_map"
    | "build"
    | "parallel_check"
    | "review"
    | "correction"
    | "ship";

/**
 * The fixed, non-reorderable phase sequence. Presence of an artifact for a
 * phase means that phase completed; the Orchestrator only ever advances
 * through this order (Req 1.1, 1.7).
 */
export const PHASE_ORDER: Phase[] = [
    "brief",
    "trend",
    "story",
    "component_map",
    "build",
    "parallel_check",
    "review",
    "correction",
    "ship",
];

// ---------------------------------------------------------------------------
// Scoring primitives (Req 9.4, 9.7, 13.2)
// ---------------------------------------------------------------------------

export type Dimension =
    | "visual_design"
    | "storytelling"
    | "motion"
    | "layout_responsive"
    | "performance"
    | "content_honesty";

/** A rubric score in the range 0..10, expressed to one decimal. */
export type Score = number;

/** Finding severity: P0 ship-blocking, P1 visible gap, P2 optional polish. */
export type Severity = "P0" | "P1" | "P2";

export interface Finding {
    id: string;
    severity: Severity;
    dimension: Dimension;
    message: string;
    file?: string;
    /** Section id or line location, where localizable. */
    location?: string;
    open: boolean;
}

/**
 * Scores keyed by dimension. A dimension may be `null` when its checker failed
 * to complete (Req 9.8); a missing required dimension never satisfies the gate.
 */
export interface DimensionScores {
    [dimension: string]: Score | null;
}

export interface Verdict {
    verdict: "APPROVED" | "REJECTED";
    overall: Score;
    dimensions: DimensionScores;
    openP0: Finding[];
    /** Scored dimensions below the pass minimum (8.0). */
    failedDimensions: Dimension[];
}

// ---------------------------------------------------------------------------
// Checker + evidence + review artifacts
// ---------------------------------------------------------------------------

export interface EvidenceRef {
    kind: "file" | "breakpoint" | "behavior" | "measurement";
    detail: string;
    /** Set when the evidence-capture tool was unavailable (Req 11.4). */
    toolAbsent?: boolean;
}

export interface CheckerReport {
    agent: "design-checker" | "responsive-checker" | "performance-checker";
    scores: Partial<Record<Dimension, Score | null>>;
    findings: Finding[];
    evidence: EvidenceRef[];
    /** Set when the checker itself failed to complete (Req 9.8). */
    failed?: boolean;
}

export interface ReviewArtifact {
    verdict: "APPROVED" | "REJECTED" | "USER_OVERRIDE";
    loop: number;
    overall: Score;
    dimensions: DimensionScores;
    p0: Finding[];
    p1: Finding[];
}

// ---------------------------------------------------------------------------
// Design direction + references (Req 3, 4)
// ---------------------------------------------------------------------------

export interface DesignDirection {
    directionId: string;
    /** From the approved trend bank only (Req 3.3). */
    name: string;
    whySoftree: string[];
    /** Each dial is an integer on a 0..10 scale. */
    dials: { variance: number; motion: number; density: number };
    rejected: { name: string; reason: string }[];
    /** Pin_Budget — at most one heavy pin (Req 3.5). */
    scrollytellingBudget: { maxPins: 1 };
    references: ReferenceSource[];
    /** Which supplied Design_Data influenced the selection (Req 4.1). */
    influencingDesignData: string[];
}

export interface ReferenceSource {
    kind: "design_data" | "internet";
    /** Path or URL. */
    locator: string;
    used: boolean;
    /** Unreachable or unreadable reference (Req 4.8). */
    inaccessible?: boolean;
    /** Aspect rejected due to conflict with a Brand_Token (Req 4.6). */
    rejectedAspect?: string;
}

// ---------------------------------------------------------------------------
// Scroll narrative (Req 6)
// ---------------------------------------------------------------------------

export type ScrollBehavior =
    | "static"
    | "reveal"
    | "pin-scrub"
    | "count-up"
    | "none";

export interface ScrollBeat {
    /** Hook, Proof, Mechanism, ... */
    beat: string;
    /** Unique across all beats (Req 6.3). */
    sectionId: string;
    /** Exactly one stated emotional purpose (Req 6.2). */
    emotionalPurpose: string;
    scrollBehavior: ScrollBehavior;
    /** Beat labelled as a content gap when real content is unavailable (Req 6.6). */
    contentGap?: boolean;
}

// ---------------------------------------------------------------------------
// Component map (Req 7)
// ---------------------------------------------------------------------------

export interface ComponentAssignment {
    sectionId: string;
    /** From the component catalog only (Req 7.3). */
    patternId: string;
    motionLib: "gsap-scrolltrigger" | "framer" | "css" | "none";
    reducedMotionFallback: string;
    mobileStacking: string;
    reusedPrimitive?:
    | "SectionHeader"
    | "SpotlightCard"
    | "LetsTalkButton"
    | "AboutClientLogos";
    /** Section with no matching catalog pattern (Req 7.7). */
    unmatchedGap?: boolean;
    /** Sacred_UI section: X-LIGHT-CONTACT / X-LIGHT-FAQ (Req 7.6). */
    sacred?: boolean;
}

// ---------------------------------------------------------------------------
// Loop controller (Req 14)
// ---------------------------------------------------------------------------

export interface LoopState {
    /** Starts at 0 after the first build. */
    loop: number;
    /** From the Brief, clamped into [1, 10]. */
    maxLoops: number;
    lastVerdict: "APPROVED" | "REJECTED" | null;
}

export type LoopAction =
    | { kind: "ship" }
    | { kind: "correct"; dimensions: Dimension[] }
    | { kind: "escalate" };

// ---------------------------------------------------------------------------
// Brief (Req 2)
// ---------------------------------------------------------------------------

export type FieldState<T> = { present: true; value: T } | { present: false };

/** The Brief fields that must be supplied before advancing (Req 1.5, 2.8). */
export type RequiredField = "route" | "slug" | "contentSource";

/** A recorded out-of-range Brief value that fell back to the default (Req 2.6). */
export interface RangeRejection {
    field: "threshold" | "maxLoops";
    suppliedValue: number;
    fallbackValue: number;
}

export interface BriefInput {
    route?: string;
    slug?: string;
    pageKind?: PageKind;
    audience?: string;
    contentSource?: string;
    references?: string[];
    /** Raw user value, may be out of range. */
    maxLoops?: number;
    /** Raw user value, may be out of range. */
    threshold?: number;
    namedDirection?: string;
    mustPreserve?: string[];
    /** Sacred_UI components explicitly brought into scope. */
    expandedScope?: string[];
}

export interface Brief {
    route: FieldState<string>;
    slug: FieldState<string>;
    pageKind: FieldState<PageKind>;
    audience: FieldState<string>;
    contentSource: FieldState<string>;
    references: string[];
    /** Always in [1, 10], defaulted/clamped. */
    maxLoops: number;
    /** Always in [0, 10], defaulted/clamped. */
    threshold: number;
    /** Recorded out-of-range values (Req 2.6). */
    rejections: RangeRejection[];
    sacredUi: string[];
    /** route/slug/contentSource if absent. */
    missingRequired: RequiredField[];
}

// ---------------------------------------------------------------------------
// Pipeline state (Req 16)
// ---------------------------------------------------------------------------

/** Which correction artifacts exist for the current loop. */
export interface LoopArtifactSet {
    design: boolean;
    responsive: boolean;
    performance: boolean;
}

export interface PipelineState {
    slug: string;
    brief: Brief;
    loop: LoopState;
    completedPhases: Set<Phase>;
    currentLoopArtifacts: LoopArtifactSet;
}

// ---------------------------------------------------------------------------
// Evidence measurement shapes (Req 10, 11, 12)
// ---------------------------------------------------------------------------

/** A single rendered viewport measurement, per section, per breakpoint. */
export interface ViewportMeasurement {
    breakpoint: 390 | 768 | 1024 | 1440;
    sectionId: string;
    /** For overflow detection. */
    scrollWidth: number;
    clientWidth: number;
    horizontalPaddingPx: number;
    touchTargets: { w: number; h: number; selector: string }[];
    /** Whether the pin chapter is still pinned at this breakpoint. */
    pinnedAtBreakpoint: boolean;
    columnsCollapsed: boolean;
    /** Order of primary content (headings/body/CTA). */
    firstPrimaryContentIndex: number;
    /** Order of chrome (media/dividers/controls). */
    firstChromeIndex: number;
}

export interface PerfMeasurement {
    lcpMs?: number;
    lcpElementOpacityZeroUnderLoader: boolean;
    /** e.g. ["blur", "top"] found in scroll handlers. */
    scrollLinkedProps: string[];
    /** file:symbol entries for GSAP contexts missing cleanup. */
    gsapContextsWithoutCleanup: string[];
    heavyPinCount: number;
    /** Loader/transition mounted on app/layout.tsx. */
    globalLayoutHijack: boolean;
    reducedMotionPathPresent: boolean;
}
