import { describe, it, expect } from "vitest";
import {
    validateDirection,
    validateComponentMap,
    APPROVED_DIRECTION_NAMES,
    REJECTED_DIRECTION_NAMES,
    DEFAULT_DIRECTION_NAME,
    CATALOG,
} from "../validators";
import type { ComponentAssignment, DesignDirection } from "../types";

/**
 * Unit tests for direction selection logic and Sacred_UI / shared-primitive
 * mapping in the planning-artifact validators.
 *
 * Validates: Requirements 3.6, 3.7, 3.8, 7.5, 7.6
 */

function makeDirection(name: string): DesignDirection {
    return {
        directionId: "dir-1",
        name,
        whySoftree: [],
        dials: { variance: 5, motion: 4, density: 6 },
        rejected: [],
        scrollytellingBudget: { maxPins: 1 },
        references: [],
        influencingDesignData: [],
    };
}

function makeAssignment(
    over: Partial<ComponentAssignment>,
): ComponentAssignment {
    return {
        sectionId: "s1",
        patternId: "H-LIGHT-EDITORIAL",
        motionLib: "css",
        reducedMotionFallback: "instant final state",
        mobileStacking: "single-column",
        ...over,
    };
}

describe("validators — direction selection (Req 3.6, 3.7, 3.8)", () => {
    it("the default direction name is an approved trend-bank direction and validates (Req 3.7)", () => {
        expect(APPROVED_DIRECTION_NAMES).toContain(DEFAULT_DIRECTION_NAME);

        // When the Brief names no direction, the default is adopted; it must validate.
        const result = validateDirection(makeDirection(DEFAULT_DIRECTION_NAME));
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it("adopts an approved named direction (Req 3.6)", () => {
        const named = "Stat-Led Trust";
        expect(APPROVED_DIRECTION_NAMES).toContain(named);

        const result = validateDirection(makeDirection(named));
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it("refuses a direction listed as rejected for Softree (Req 3.8)", () => {
        const rejected = "Purple AI mesh hero";
        expect(REJECTED_DIRECTION_NAMES).toContain(rejected);

        const result = validateDirection(makeDirection(rejected));
        expect(result.valid).toBe(false);
        expect(
            result.errors.some((e) => e.toLowerCase().includes("rejected")),
        ).toBe(true);
    });

    it("also refuses a forbidden-aesthetic identifier form of a rejected direction (Req 3.8)", () => {
        const result = validateDirection(makeDirection("purple-ai-mesh"));
        expect(result.valid).toBe(false);
    });
});

describe("validators — Sacred_UI and shared-primitive mapping (Req 7.5, 7.6)", () => {
    it("the catalog contains the Sacred_UI contact and FAQ patterns (Req 7.6)", () => {
        expect(CATALOG).toContain("X-LIGHT-CONTACT");
        expect(CATALOG).toContain("X-LIGHT-FAQ");
    });

    it("accepts a map that assigns the Sacred_UI contact/FAQ patterns and reuses a shared primitive (Req 7.5, 7.6)", () => {
        const direction = makeDirection(DEFAULT_DIRECTION_NAME);
        const assignments: ComponentAssignment[] = [
            makeAssignment({
                sectionId: "hero",
                patternId: "H-LIGHT-EDITORIAL",
                reusedPrimitive: "SectionHeader",
            }),
            makeAssignment({
                sectionId: "logos",
                patternId: "T-LOGO-ROW",
                reusedPrimitive: "AboutClientLogos",
            }),
            makeAssignment({
                sectionId: "contact",
                patternId: "X-LIGHT-CONTACT",
                reusedPrimitive: "LetsTalkButton",
                sacred: true,
            }),
            makeAssignment({
                sectionId: "faq",
                patternId: "X-LIGHT-FAQ",
                sacred: true,
            }),
        ];

        const result = validateComponentMap(assignments, direction);
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it("the known shared-primitive reuse targets are recognizable catalog-adjacent patterns (Req 7.5)", () => {
        // Sanity: the catalog exposes the hero/trust/close patterns the shared
        // primitives attach to, so reuse mapping has real targets to bind.
        for (const pattern of ["H-LIGHT-EDITORIAL", "T-LOGO-ROW", "X-LIGHT-CONTACT"]) {
            expect(CATALOG).toContain(pattern);
        }
    });
});
