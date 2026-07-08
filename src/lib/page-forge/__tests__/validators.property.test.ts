import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
    validateDirection,
    APPROVED_DIRECTION_NAMES,
    REJECTED_DIRECTION_NAMES,
    DIAL_RANGE,
    partitionReferences,
    resolveBrandConflict,
    internetRetrievalPermitted,
    validateStory,
    validateNarrativeOrder,
    STORY_BEAT_MIN,
    STORY_BEAT_MAX,
    APPROVED_SCROLL_BEHAVIORS,
    NARRATIVE_ORDER,
    validateComponentMap,
    CATALOG,
    HEAVY_PIN_PATTERN_IDS,
    APPROVED_MOTION_LIBS,
} from "../validators";
import { PIN_BUDGET } from "../constraints";
import { PHASE_ORDER } from "../types";
import type {
    ComponentAssignment,
    DesignDirection,
    Phase,
    ReferenceSource,
    ScrollBeat,
    ScrollBehavior,
} from "../types";

const NUM_RUNS = 200;

// ---------------------------------------------------------------------------
// Shared helpers + generators
// ---------------------------------------------------------------------------

/** Build a full DesignDirection; only `name` and `dials` are read by validators. */
function makeDirection(
    name: string,
    dials: { variance: number; motion: number; density: number },
): DesignDirection {
    return {
        directionId: "dir-1",
        name,
        whySoftree: [],
        dials,
        rejected: [],
        scrollytellingBudget: { maxPins: 1 },
        references: [],
        influencingDesignData: [],
    };
}

/** A locked, valid direction for component-map validation. */
const VALID_DIRECTION = makeDirection("Stat-Led Trust", {
    variance: 4,
    motion: 3,
    density: 5,
});

/** Case-insensitive membership, mirroring the validator's internal helper. */
function includesName(names: readonly string[], candidate: string): boolean {
    const needle = candidate.trim().toLowerCase();
    return names.some((n) => n.trim().toLowerCase() === needle);
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

/** Catalog patterns that are NOT heavy pins, so pin budget never trips. */
const NON_PIN_CATALOG = CATALOG.filter(
    (p) => !HEAVY_PIN_PATTERN_IDS.includes(p),
);

// ===========================================================================
// 10.2 — Design direction validity
// ===========================================================================

describe("validators — design direction validity (Property 7)", () => {
    const dialArb = fc.oneof(
        fc.integer({ min: DIAL_RANGE.min, max: DIAL_RANGE.max }), // valid ints
        fc.integer({ min: -6, max: 16 }), // may be out of range
        fc.double({ min: -5, max: 15, noNaN: true }), // may be non-integer
    );

    const nameArb = fc.oneof(
        fc.constantFrom(...APPROVED_DIRECTION_NAMES),
        fc.constantFrom(...REJECTED_DIRECTION_NAMES),
        fc.constantFrom(...APPROVED_DIRECTION_NAMES).map((n) => n.toUpperCase()),
        fc.string({ maxLength: 24 }),
    );

    const isValidDial = (v: number) =>
        Number.isInteger(v) && v >= DIAL_RANGE.min && v <= DIAL_RANGE.max;

    // Feature: page-forge-agent-system, Property 7: Design direction validity
    it("accepts iff name is approved, not rejected, and all three dials are integers in [0,10]", () => {
        fc.assert(
            fc.property(
                nameArb,
                dialArb,
                dialArb,
                dialArb,
                (name, variance, motion, density) => {
                    const direction = makeDirection(name, {
                        variance,
                        motion,
                        density,
                    });
                    const result = validateDirection(direction);

                    const expected =
                        includesName(APPROVED_DIRECTION_NAMES, name) &&
                        !includesName(REJECTED_DIRECTION_NAMES, name) &&
                        isValidDial(variance) &&
                        isValidDial(motion) &&
                        isValidDial(density);

                    expect(result.valid).toBe(expected);
                    if (!result.valid) {
                        expect(result.errors.length).toBeGreaterThan(0);
                    }
                },
            ),
            { numRuns: NUM_RUNS },
        );
    });
});

// ===========================================================================
// 10.3 — Reference source recording and accessibility handling
// ===========================================================================

describe("validators — reference recording and accessibility (Property 8)", () => {
    const refArb: fc.Arbitrary<ReferenceSource> = fc.record({
        kind: fc.constantFrom<ReferenceSource["kind"]>(
            "design_data",
            "internet",
        ),
        locator: fc.string({ minLength: 1, maxLength: 16 }),
        used: fc.boolean(),
        inaccessible: fc.oneof(
            fc.boolean(),
            fc.constant(undefined as unknown as boolean),
        ),
    });

    // Feature: page-forge-agent-system, Property 8: Reference source recording and accessibility handling
    it("records every reference, excludes inaccessible ones from usable, keeps accessible ones", () => {
        fc.assert(
            fc.property(fc.array(refArb, { maxLength: 12 }), (refs) => {
                const { recorded, usable, inaccessible } =
                    partitionReferences(refs);

                // Every reference is recorded (same count + contents preserved).
                expect(recorded).toHaveLength(refs.length);
                expect(recorded).toEqual(refs);

                // Partition is exhaustive and disjoint by the inaccessible flag.
                expect(usable.length + inaccessible.length).toBe(refs.length);
                expect(inaccessible.every((r) => r.inaccessible === true)).toBe(
                    true,
                );
                expect(usable.every((r) => r.inaccessible !== true)).toBe(true);

                // Each original ref lands in exactly one partition per its flag.
                for (const r of refs) {
                    if (r.inaccessible === true) {
                        expect(inaccessible).toContain(r);
                        expect(usable).not.toContain(r);
                    } else {
                        expect(usable).toContain(r);
                    }
                }
            }),
            { numRuns: NUM_RUNS },
        );
    });
});

// ===========================================================================
// 10.4 — Internet retrieval permission is phase-gated
// ===========================================================================

describe("validators — internet retrieval phase gate (Property 9)", () => {
    // Feature: page-forge-agent-system, Property 9: Internet retrieval permission is phase-gated
    it("permits retrieval iff phase is trend OR an agent is resolving a finding", () => {
        fc.assert(
            fc.property(
                fc.constantFrom<Phase>(...PHASE_ORDER),
                fc.boolean(),
                (phase, resolvingFinding) => {
                    const permitted = internetRetrievalPermitted(
                        phase,
                        resolvingFinding,
                    );
                    expect(permitted).toBe(phase === "trend" || resolvingFinding);
                },
            ),
            { numRuns: NUM_RUNS },
        );
    });
});

// ===========================================================================
// 10.5 — Brand tokens win over conflicting references
// ===========================================================================

describe("validators — brand tokens win over references (Property 10)", () => {
    const refArb: fc.Arbitrary<ReferenceSource> = fc.record({
        kind: fc.constantFrom<ReferenceSource["kind"]>(
            "design_data",
            "internet",
        ),
        locator: fc.string({ minLength: 1, maxLength: 16 }),
        used: fc.boolean(),
    });

    // Feature: page-forge-agent-system, Property 10: Brand tokens win over conflicting references
    it("returns brandTokenWins true and records rejectedAspect on a copy without mutating the input", () => {
        fc.assert(
            fc.property(
                refArb,
                fc.string({ minLength: 1, maxLength: 20 }),
                (reference, rejectedAspect) => {
                    const before = JSON.parse(JSON.stringify(reference));
                    const resolution = resolveBrandConflict(
                        reference,
                        rejectedAspect,
                    );

                    // Brand token always wins and the rejected aspect is recorded.
                    expect(resolution.brandTokenWins).toBe(true);
                    expect(resolution.rejectedAspect).toBe(rejectedAspect);
                    expect(resolution.reference.rejectedAspect).toBe(
                        rejectedAspect,
                    );

                    // The returned reference is a copy, not the input object.
                    expect(resolution.reference).not.toBe(reference);
                    // Original non-conflicting fields are preserved on the copy.
                    expect(resolution.reference.kind).toBe(reference.kind);
                    expect(resolution.reference.locator).toBe(reference.locator);

                    // The input is not mutated.
                    expect(reference).toEqual(before);
                },
            ),
            { numRuns: NUM_RUNS },
        );
    });
});

// ===========================================================================
// 10.7 — Story beat count and structure
// ===========================================================================

describe("validators — story beat count and structure (Property 12)", () => {
    const behaviorArb = fc.oneof(
        fc.constantFrom<ScrollBehavior>(...APPROVED_SCROLL_BEHAVIORS),
        fc.constantFrom("parallax", "bounce", "spin") as fc.Arbitrary<
            ScrollBehavior
        >,
    );

    const beatArb: fc.Arbitrary<ScrollBeat> = fc.record({
        beat: fc.string({ maxLength: 10 }),
        // Small pool + empty to exercise duplicates and missing ids.
        sectionId: fc.constantFrom("sec-a", "sec-b", "sec-c", ""),
        emotionalPurpose: fc.oneof(
            fc.string({ minLength: 1, maxLength: 12 }),
            fc.constant(""),
        ),
        scrollBehavior: behaviorArb,
    });

    // Feature: page-forge-agent-system, Property 12: Story beat count and structure
    it("accepts iff 4-9 beats, each with a non-empty section id/emotional purpose/approved behavior and unique section ids", () => {
        fc.assert(
            fc.property(fc.array(beatArb, { maxLength: 12 }), (beats) => {
                const result = validateStory(beats);

                const countOk =
                    beats.length >= STORY_BEAT_MIN &&
                    beats.length <= STORY_BEAT_MAX;
                const perBeatOk = beats.every(
                    (b) =>
                        b.sectionId.trim() !== "" &&
                        b.emotionalPurpose.trim() !== "" &&
                        APPROVED_SCROLL_BEHAVIORS.includes(b.scrollBehavior),
                );
                const ids = beats
                    .map((b) => b.sectionId.trim())
                    .filter((id) => id !== "");
                const uniqueOk = new Set(ids).size === ids.length;
                const heavyPins = beats.filter(
                    (b) => b.scrollBehavior === "pin-scrub",
                ).length;
                const pinOk = heavyPins <= PIN_BUDGET;

                const expected = countOk && perBeatOk && uniqueOk && pinOk;
                expect(result.valid).toBe(expected);
            }),
            { numRuns: NUM_RUNS },
        );
    });
});

// ===========================================================================
// 10.8 — Narrative order progresses problem -> approach -> proof -> path -> contact
// ===========================================================================

describe("validators — narrative order (Property 13)", () => {
    // Recognizable labels that classify uniquely into each canonical phase.
    const LABEL_TO_PHASE: Record<string, string> = {
        Hook: "problem",
        Mechanism: "approach",
        Proof: "proof",
        Process: "path",
        Close: "contact",
    };
    const LABELS = Object.keys(LABEL_TO_PHASE);

    const makeBeat = (label: string): ScrollBeat => ({
        beat: label,
        sectionId: label,
        emotionalPurpose: "purpose",
        scrollBehavior: "reveal",
    });

    // Feature: page-forge-agent-system, Property 13: Narrative order progresses problem → approach → proof → path → contact
    it("accepts iff first-occurrence phase indices are non-decreasing in the canonical narrative order", () => {
        fc.assert(
            fc.property(
                fc.array(fc.constantFrom(...LABELS), {
                    minLength: 1,
                    maxLength: 8,
                }),
                (labels) => {
                    const beats = labels.map(makeBeat);
                    const result = validateNarrativeOrder(beats);

                    // Compute the expected ordering verdict independently.
                    const firstOccurrence = new Map<string, number>();
                    labels.forEach((label, i) => {
                        const phase = LABEL_TO_PHASE[label];
                        if (!firstOccurrence.has(phase)) {
                            firstOccurrence.set(phase, i);
                        }
                    });
                    let previousIndex = -1;
                    let ordered = true;
                    for (const phase of NARRATIVE_ORDER) {
                        const occ = firstOccurrence.get(phase);
                        if (occ === undefined) continue;
                        if (occ < previousIndex) ordered = false;
                        previousIndex = occ;
                    }

                    expect(result.valid).toBe(ordered);
                },
            ),
            { numRuns: NUM_RUNS },
        );
    });
});

// ===========================================================================
// 10.10 — Component map totality and single assignment
// ===========================================================================

describe("validators — component map totality and single assignment (Property 15)", () => {
    // Otherwise-valid assignments; only the section id varies (empty/dup/unique).
    const specArb = fc.record({
        sectionId: fc.constantFrom("s1", "s2", "s3", ""),
        patternId: fc.constantFrom(...NON_PIN_CATALOG),
        motionLib: fc.constantFrom<ComponentAssignment["motionLib"]>(
            ...APPROVED_MOTION_LIBS,
        ),
    });

    // Feature: page-forge-agent-system, Property 15: Component map totality and single assignment
    it("requires exactly one Pattern_ID per section — non-empty and unique section ids", () => {
        fc.assert(
            fc.property(
                fc.array(specArb, { minLength: 1, maxLength: 6 }),
                (specs) => {
                    const assignments = specs.map((s) =>
                        makeAssignment({
                            sectionId: s.sectionId,
                            patternId: s.patternId,
                            motionLib: s.motionLib,
                        }),
                    );
                    const result = validateComponentMap(
                        assignments,
                        VALID_DIRECTION,
                    );

                    const ids = specs
                        .map((s) => s.sectionId.trim())
                        .filter((id) => id !== "");
                    const noEmpty = specs.every((s) => s.sectionId.trim() !== "");
                    const unique = new Set(ids).size === ids.length;

                    expect(result.valid).toBe(noEmpty && unique);
                },
            ),
            { numRuns: NUM_RUNS },
        );
    });
});

// ===========================================================================
// 10.11 — Component assignment validity
// ===========================================================================

describe("validators — component assignment validity (Property 16)", () => {
    const specArb = fc.record({
        inCatalog: fc.boolean(),
        catalogPick: fc.constantFrom(...NON_PIN_CATALOG),
        offPattern: fc.constantFrom("Z-NOPE", "FAKE-1", "NOT-A-PATTERN"),
        motionOk: fc.boolean(),
        fallbackOk: fc.boolean(),
        stackingOk: fc.boolean(),
    });

    // Feature: page-forge-agent-system, Property 16: Component assignment validity
    it("accepts iff every non-gap assignment has a catalog pattern, approved motion lib, and non-empty fallback + mobile stacking", () => {
        fc.assert(
            fc.property(
                fc.array(specArb, { minLength: 1, maxLength: 5 }),
                (specs) => {
                    const assignments = specs.map((s, i) =>
                        makeAssignment({
                            sectionId: `sec-${i}`, // unique + non-empty (7.1 always ok)
                            patternId: s.inCatalog ? s.catalogPick : s.offPattern,
                            motionLib: s.motionOk
                                ? "css"
                                : ("bogus-lib" as ComponentAssignment["motionLib"]),
                            reducedMotionFallback: s.fallbackOk ? "instant" : "",
                            mobileStacking: s.stackingOk ? "single-column" : "",
                            unmatchedGap: false,
                        }),
                    );
                    const result = validateComponentMap(
                        assignments,
                        VALID_DIRECTION,
                    );

                    const expected = specs.every(
                        (s) =>
                            s.inCatalog &&
                            s.motionOk &&
                            s.fallbackOk &&
                            s.stackingOk,
                    );
                    expect(result.valid).toBe(expected);
                },
            ),
            { numRuns: NUM_RUNS },
        );
    });
});

// ===========================================================================
// 10.12 — Unmatched sections become gaps, never invalid patterns
// ===========================================================================

describe("validators — unmatched sections become gaps (Property 17)", () => {
    // Feature: page-forge-agent-system, Property 17: Unmatched sections become gaps, never invalid patterns
    it("accepts an off-catalog assignment iff it is recorded as a gap; rejects it as a real assignment", () => {
        fc.assert(
            fc.property(
                fc.boolean(),
                fc.string({ maxLength: 8 }),
                (isGap, suffix) => {
                    // Guaranteed off-catalog Pattern_ID.
                    const offCatalog = `GAP-${suffix}`;
                    const assignment = makeAssignment({
                        sectionId: "unmatched-section",
                        patternId: offCatalog,
                        motionLib: "css",
                        reducedMotionFallback: "instant",
                        mobileStacking: "single-column",
                        unmatchedGap: isGap,
                    });
                    const result = validateComponentMap(
                        [assignment],
                        VALID_DIRECTION,
                    );

                    // A gap is accepted (recorded), a non-gap off-catalog is rejected.
                    expect(result.valid).toBe(isGap);
                },
            ),
            { numRuns: NUM_RUNS },
        );
    });
});
