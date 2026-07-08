// Feature: page-forge-agent-system, Unit: phase-skill map contents

import { describe, expect, it } from "vitest";

import {
    ANTI_SLOP_AUDIT_SKILLS,
    BUILDER_EMIT_SKILL,
    DIRECTION_SKILLS,
    MOTION_SCROLL_SKILLS,
    PHASE_SKILLS,
    SEO_SKILLS,
} from "../phase-skills";
import type { Phase } from "../types";

/**
 * Unit tests for the phase → Skill_Library assignment map.
 *
 * These assert the specific per-phase skill assignments (Req 5.2) and that the
 * Build phase loads the full-output-enforcement skill for the Builder emit
 * step (Req 5.3). Empty-assignment phases are asserted explicitly so a stray
 * assignment cannot slip in unnoticed.
 */
describe("PHASE_SKILLS map contents", () => {
    // Req 5.2 — direction skills load during the Trend selection phase.
    it("assigns the direction skills to the trend phase", () => {
        expect(PHASE_SKILLS.trend).toEqual([
            "hallmark",
            "design-taste-frontend",
            "high-end-visual-design",
            "stitch-design-taste",
        ]);
        // Sanity: the map value mirrors the exported grouping const.
        expect(PHASE_SKILLS.trend).toEqual([...DIRECTION_SKILLS]);
    });

    // Req 5.2 — motion/scroll skills load during the Build phase.
    it("assigns the motion/scroll skills to the build phase", () => {
        for (const skill of [
            "design-motion-principles",
            "emil-design-eng",
            "gsap-core",
            "gsap-scrolltrigger",
            "gsap-react",
            "gsap-performance",
            "gsap-timeline",
        ]) {
            expect(PHASE_SKILLS.build).toContain(skill);
        }
        // Sanity: every motion/scroll grouping entry is present in order.
        for (const skill of MOTION_SCROLL_SKILLS) {
            expect(PHASE_SKILLS.build).toContain(skill);
        }
    });

    // Req 5.3 — the Builder emit step loads full-output-enforcement.
    it("includes full-output-enforcement in the build phase (Builder emit)", () => {
        expect(BUILDER_EMIT_SKILL).toBe("full-output-enforcement");
        expect(PHASE_SKILLS.build).toContain("full-output-enforcement");
    });

    // Req 5.2 + 5.3 — the full build assignment is motion/scroll skills followed
    // by the Builder-emit full-output-enforcement skill, in that exact order.
    it("assigns exactly the motion/scroll skills plus full-output-enforcement to the build phase", () => {
        expect(PHASE_SKILLS.build).toEqual([
            "design-motion-principles",
            "emil-design-eng",
            "gsap-core",
            "gsap-scrolltrigger",
            "gsap-react",
            "gsap-performance",
            "gsap-timeline",
            "full-output-enforcement",
        ]);
        expect(PHASE_SKILLS.build).toEqual([
            ...MOTION_SCROLL_SKILLS,
            BUILDER_EMIT_SKILL,
        ]);
    });

    // Req 5.2 — anti-slop/audit skills load during the Parallel Check phase.
    it("assigns the anti-slop/audit skills to the parallel_check phase", () => {
        expect(PHASE_SKILLS.parallel_check).toEqual([
            "minimalist-ui",
            "industrial-brutalist-ui",
            "redesign-existing-projects",
        ]);
        expect(PHASE_SKILLS.parallel_check).toEqual([...ANTI_SLOP_AUDIT_SKILLS]);
    });

    // Req 5.2 — SEO skills load during the Ship Report phase.
    it("assigns the SEO skills to the ship phase", () => {
        expect(PHASE_SKILLS.ship).toEqual(["seo-aeo-best-practices"]);
        expect(PHASE_SKILLS.ship).toEqual([...SEO_SKILLS]);
    });

    // Phases with no assigned skills map to an empty array.
    it("maps unassigned phases to an empty array", () => {
        const emptyPhases: Phase[] = [
            "brief",
            "story",
            "component_map",
            "review",
            "correction",
        ];
        for (const phase of emptyPhases) {
            expect(PHASE_SKILLS[phase]).toEqual([]);
        }
    });
});
