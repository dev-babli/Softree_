/**
 * Page Forge Agent System — phase → Skill_Library assignment map.
 *
 * Deterministic, pure module. It encodes which `.agents/skills/` entries the
 * Orchestrator loads for each phase before producing that phase's output, and
 * resolves the actually-loaded set against any skills that could not be loaded
 * in the current environment.
 *
 * The assignments mirror the per-phase skills table in
 * `.agents/skills/awwwards-page-loop/SKILL.md`:
 *   - Direction (Trend)      : direction skills
 *   - Build                  : motion/scroll skills + full-output-enforcement
 *                              (loaded when the Builder emits component code)
 *   - Parallel Check         : anti-slop / audit skills
 *   - Ship Report            : SEO skills (final pass)
 *
 * Requirements: 5.1, 5.2, 5.3, 5.5
 */

import type { Phase } from "./types";

// ---------------------------------------------------------------------------
// Skill groupings (source of truth: awwwards-page-loop/SKILL.md)
// ---------------------------------------------------------------------------

/** Direction skills loaded during the Trend selection phase (Req 5.2). */
export const DIRECTION_SKILLS = [
    "hallmark",
    "design-taste-frontend",
    "high-end-visual-design",
    "stitch-design-taste",
] as const;

/** Motion and scroll skills loaded during the Build phase (Req 5.2). */
export const MOTION_SCROLL_SKILLS = [
    "design-motion-principles",
    "emil-design-eng",
    "gsap-core",
    "gsap-scrolltrigger",
    "gsap-react",
    "gsap-performance",
    "gsap-timeline",
] as const;

/**
 * The full-output-enforcement skill, loaded during the Build phase when the
 * Builder emits component code (Req 5.3).
 */
export const BUILDER_EMIT_SKILL = "full-output-enforcement";

/** Anti-slop and audit skills loaded during the Parallel Check phase (Req 5.2). */
export const ANTI_SLOP_AUDIT_SKILLS = [
    "minimalist-ui",
    "industrial-brutalist-ui",
    "redesign-existing-projects",
] as const;

/** SEO skills loaded during the Ship Report phase (Req 5.2). */
export const SEO_SKILLS = ["seo-aeo-best-practices"] as const;

// ---------------------------------------------------------------------------
// Phase → assigned skills map (Req 5.2, 5.3)
// ---------------------------------------------------------------------------

/**
 * The Skill_Library entries assigned to each phase. Phases with no assigned
 * skills map to an empty array. The Build phase includes both the motion/scroll
 * skills and `full-output-enforcement` (loaded at Builder emit, Req 5.3).
 */
export const PHASE_SKILLS: Record<Phase, string[]> = {
    brief: [],
    trend: [...DIRECTION_SKILLS],
    story: [],
    component_map: [],
    build: [...MOTION_SCROLL_SKILLS, BUILDER_EMIT_SKILL],
    parallel_check: [...ANTI_SLOP_AUDIT_SKILLS],
    review: [],
    correction: [],
    ship: [...SEO_SKILLS],
};

// ---------------------------------------------------------------------------
// Resolution
// ---------------------------------------------------------------------------

export interface ResolvedSkills {
    /** Assigned skills for the phase minus any that were unavailable. */
    loaded: string[];
    /**
     * The unavailable entries that intersected the phase's assignment. Only
     * assigned-and-unavailable skills are recorded here (Req 5.5); unavailable
     * skills not assigned to the phase are ignored.
     */
    unavailable: string[];
}

/**
 * Resolve the skills actually loaded for a phase.
 *
 * Returns the phase's assigned skills minus any that appear in `unavailable`,
 * and records exactly the unavailable entries that intersected the assignment
 * (Req 5.1, 5.5). Assigned order is preserved in both outputs.
 *
 * Pure: does not mutate its inputs.
 */
export function resolveLoadedSkills(
    phase: Phase,
    unavailable: string[],
): ResolvedSkills {
    const assigned = PHASE_SKILLS[phase] ?? [];
    const unavailableSet = new Set(unavailable);

    const loaded: string[] = [];
    const recordedUnavailable: string[] = [];

    for (const skill of assigned) {
        if (unavailableSet.has(skill)) {
            recordedUnavailable.push(skill);
        } else {
            loaded.push(skill);
        }
    }

    return { loaded, unavailable: recordedUnavailable };
}
