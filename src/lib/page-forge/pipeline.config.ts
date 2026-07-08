/**
 * Page Forge Agent System — machine-readable pipeline configuration.
 *
 * Pure data module. It encodes two things the Orchestrator loads to drive the
 * agent layer:
 *
 *   1. The per-agent I/O contracts (what each agent reads, writes, scores, and
 *      whether it may edit page code) — the "Agent layer interfaces" table from
 *      the design (Req 9.1, 9.3).
 *   2. The phase → agent(s) wiring, i.e. which agent(s) run in each phase
 *      (Req 5.1, 5.2). Skill wiring per phase lives in `phase-skills.ts` and is
 *      re-exposed here via `skillsForPhase` for convenience.
 *
 * This module contains no behavior beyond typed lookups; the deterministic core
 * (scoring, loop, validators, rule evaluators) does the real work.
 *
 * Requirements: 5.1, 5.2, 9.1, 9.3
 */

import type { Dimension, Phase } from "./types";
import { PHASE_SKILLS } from "./phase-skills";

// ---------------------------------------------------------------------------
// Agent identifiers
// ---------------------------------------------------------------------------

/**
 * The full agent roster. Correction agents are modelled as three
 * dimension-scoped fixers (design / responsive / performance) rather than a
 * single "Correction Agents" entry so the phase wiring can name each one.
 */
export type AgentId =
    | "trend-scout"
    | "story-architect"
    | "component-mapper"
    | "builder"
    | "design-checker"
    | "responsive-checker"
    | "performance-checker"
    | "review-agent"
    | "design-fixer"
    | "responsive-fixer"
    | "performance-fixer";

// ---------------------------------------------------------------------------
// Agent I/O contract
// ---------------------------------------------------------------------------

/**
 * The read/write/score/edit contract for a single agent, mirroring the design's
 * "Agent layer interfaces" table. `reads`/`writes` are human-readable artifact
 * or input labels; `scores` are the rubric dimensions the agent may score
 * (empty for non-scoring agents); `mayEditCode` is true only for agents allowed
 * to touch page-scoped source.
 */
export interface AgentContract {
    id: AgentId;
    reads: string[];
    writes: string[];
    scores: Dimension[];
    mayEditCode: boolean;
}

// ---------------------------------------------------------------------------
// Agent contracts (source of truth: design "Agent layer interfaces" table)
// ---------------------------------------------------------------------------

/**
 * Per-agent I/O contracts. Every non-correction agent writes exactly one
 * artifact; correction fixers write their per-loop `07-LOOP-<n>-<dim>.md`
 * artifact plus code within their assigned findings.
 */
export const AGENT_CONTRACTS: Record<AgentId, AgentContract> = {
    "trend-scout": {
        id: "trend-scout",
        reads: ["Brief", "Design_Data", "web refs"],
        writes: ["01-DIRECTION.md"],
        scores: [],
        mayEditCode: false,
    },
    "story-architect": {
        id: "story-architect",
        reads: ["Direction"],
        writes: ["02-STORY.md"],
        scores: [],
        mayEditCode: false,
    },
    "component-mapper": {
        id: "component-mapper",
        reads: ["Story", "catalog"],
        writes: ["03-COMPONENT-MAP.md"],
        scores: [],
        mayEditCode: false,
    },
    builder: {
        id: "builder",
        reads: ["Component Map"],
        writes: ["code", "04-BUILD.md"],
        scores: [],
        mayEditCode: true, // page scope
    },
    "design-checker": {
        id: "design-checker",
        reads: ["code", "Story"],
        writes: ["05a-DESIGN.md"],
        scores: ["visual_design", "storytelling", "motion"],
        mayEditCode: false,
    },
    "responsive-checker": {
        id: "responsive-checker",
        reads: ["code", "viewport evidence"],
        writes: ["05b-RESPONSIVE.md"],
        scores: ["layout_responsive"],
        mayEditCode: false,
    },
    "performance-checker": {
        id: "performance-checker",
        reads: ["code", "perf evidence"],
        writes: ["05c-PERFORMANCE.md"],
        scores: ["performance"],
        mayEditCode: false,
    },
    "review-agent": {
        id: "review-agent",
        reads: ["all 05*"],
        writes: ["06-REVIEW.md"],
        scores: [], // computes overall via scoring.ts, does not score a dimension itself
        mayEditCode: false,
    },
    "design-fixer": {
        id: "design-fixer",
        reads: ["06-REVIEW.md"],
        writes: ["07-LOOP-<n>-design.md", "code"],
        scores: [],
        mayEditCode: true, // assigned findings only
    },
    "responsive-fixer": {
        id: "responsive-fixer",
        reads: ["06-REVIEW.md"],
        writes: ["07-LOOP-<n>-responsive.md", "code"],
        scores: [],
        mayEditCode: true, // assigned findings only
    },
    "performance-fixer": {
        id: "performance-fixer",
        reads: ["06-REVIEW.md"],
        writes: ["07-LOOP-<n>-performance.md", "code"],
        scores: [],
        mayEditCode: true, // assigned findings only
    },
};

// ---------------------------------------------------------------------------
// Phase → agent wiring (Req 5.1, 5.2, 9.1, 9.3)
// ---------------------------------------------------------------------------

/**
 * Which agent(s) run in each phase. Terminal/gate-only phases (`brief`, `ship`)
 * run no agents. `parallel_check` runs the three checkers; `correction` runs
 * the three dimension-scoped fixers (only those matching failed dimensions are
 * actually spawned by the loop controller).
 */
export const PHASE_AGENTS: Partial<Record<Phase, AgentId[]>> = {
    brief: [],
    trend: ["trend-scout"],
    story: ["story-architect"],
    component_map: ["component-mapper"],
    build: ["builder"],
    parallel_check: [
        "design-checker",
        "responsive-checker",
        "performance-checker",
    ],
    review: ["review-agent"],
    correction: ["design-fixer", "responsive-fixer", "performance-fixer"],
    ship: [],
};

// ---------------------------------------------------------------------------
// Re-exports + helpers
// ---------------------------------------------------------------------------

export { PHASE_SKILLS };

/** The agent ids wired to run in `phase` (empty when none). */
export function agentsForPhase(phase: Phase): AgentId[] {
    return PHASE_AGENTS[phase] ?? [];
}

/** The Skill_Library entries assigned to `phase` (empty when none). */
export function skillsForPhase(phase: Phase): string[] {
    return PHASE_SKILLS[phase] ?? [];
}

/** The I/O contract for a given agent. */
export function contractFor(agent: AgentId): AgentContract {
    return AGENT_CONTRACTS[agent];
}
