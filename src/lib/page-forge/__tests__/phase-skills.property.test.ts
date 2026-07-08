import { describe, it, expect } from "vitest";
import fc from "fast-check";

import { PHASE_SKILLS, resolveLoadedSkills } from "../phase-skills";
import type { Phase } from "../types";

const PHASES: Phase[] = [
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

// Every skill assigned to any phase — used to keep generated noise strings
// strictly outside the assigned input space.
const allAssignedSkills: string[] = Array.from(
    new Set(PHASES.flatMap((p) => PHASE_SKILLS[p])),
);

// Feature: page-forge-agent-system, Property 11: Skill loading records loaded and unavailable entries
describe("Property 11: Skill loading records loaded and unavailable entries", () => {
    it("records loaded = assigned minus unavailable and unavailable = assigned ∩ unavailable", () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...PHASES),
                // Build an `unavailable` list from a subset of the phase's assigned
                // skills plus arbitrary noise strings that are never assigned.
                fc.record({
                    markAssigned: fc.array(fc.boolean()),
                    noise: fc.array(
                        fc.string().filter((s) => !allAssignedSkills.includes(s)),
                    ),
                }),
                (phase, { markAssigned, noise }) => {
                    const assigned = PHASE_SKILLS[phase];

                    // Pick a subset of the assigned skills to mark unavailable.
                    const unavailableAssigned = assigned.filter(
                        (_, i) => markAssigned[i] ?? false,
                    );
                    const unavailable = [...unavailableAssigned, ...noise];

                    const result = resolveLoadedSkills(phase, unavailable);

                    const expectedLoaded = assigned.filter(
                        (s) => !unavailable.includes(s),
                    );
                    const expectedUnavailable = assigned.filter((s) =>
                        unavailable.includes(s),
                    );

                    // loaded equals assigned minus unavailable
                    expect(result.loaded).toEqual(expectedLoaded);
                    // recorded unavailable equals assigned ∩ unavailable
                    expect(result.unavailable).toEqual(expectedUnavailable);

                    // loaded and recorded-unavailable are disjoint
                    for (const s of result.loaded) {
                        expect(result.unavailable).not.toContain(s);
                    }

                    // their union equals the assigned set (as sets)
                    const union = new Set([...result.loaded, ...result.unavailable]);
                    expect(union).toEqual(new Set(assigned));
                    expect(result.loaded.length + result.unavailable.length).toBe(
                        assigned.length,
                    );

                    // noise strings never appear in either output
                    for (const n of noise) {
                        expect(result.loaded).not.toContain(n);
                        expect(result.unavailable).not.toContain(n);
                    }
                },
            ),
            { numRuns: 200 },
        );
    });
});
