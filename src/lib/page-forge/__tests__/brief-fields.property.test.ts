// Feature: page-forge-agent-system, Property 6: Absent fields are marked and gate progression

import { describe, expect, it } from "vitest";
import * as fc from "fast-check";

import { normalizeBrief, REQUIRED_FIELDS } from "../brief";
import type { BriefInput, PageKind, RequiredField } from "../types";

/**
 * Property 6: Absent fields are marked and gate progression.
 *
 * For any partial Brief input:
 *  - every unsupplied field is marked absent (present:false) and every supplied
 *    field carries its exact value;
 *  - missingRequired equals exactly the subset of REQUIRED_FIELDS that were
 *    omitted;
 *  - progression past the Brief phase is permitted iff route, slug, and content
 *    source are all present (i.e. missingRequired is empty).
 *
 * Validates: Requirements 1.5, 2.2, 2.8
 */

const PAGE_KINDS: PageKind[] = ["service", "about", "case-study", "landing"];

// A generator that independently includes or omits each Brief field. Numeric
// range fields (threshold/maxLoops) are constrained to in-range values so this
// property focuses purely on field presence and gate progression, not clamping.
const briefInputArb: fc.Arbitrary<BriefInput> = fc.record(
    {
        route: fc.option(fc.string(), { nil: undefined }),
        slug: fc.option(fc.string(), { nil: undefined }),
        pageKind: fc.option(fc.constantFrom(...PAGE_KINDS), { nil: undefined }),
        audience: fc.option(fc.string(), { nil: undefined }),
        contentSource: fc.option(fc.string(), { nil: undefined }),
        references: fc.option(fc.array(fc.string()), { nil: undefined }),
        threshold: fc.option(
            fc.double({ min: 0, max: 10, noNaN: true }),
            { nil: undefined }
        ),
        maxLoops: fc.option(fc.integer({ min: 1, max: 10 }), { nil: undefined }),
    },
    { requiredKeys: [] }
);

describe("Property 6: Absent fields are marked and gate progression", () => {
    it("marks unsupplied fields absent, supplied fields with value, and gates progression on required fields", () => {
        fc.assert(
            fc.property(briefInputArb, (input) => {
                const brief = normalizeBrief(input);

                // --- Field marking (Req 2.2): present iff supplied, with value ---
                const checkField = <T>(
                    supplied: T | undefined,
                    state: { present: true; value: T } | { present: false }
                ) => {
                    if (supplied === undefined) {
                        expect(state.present).toBe(false);
                    } else {
                        expect(state.present).toBe(true);
                        if (state.present) {
                            expect(state.value).toBe(supplied);
                        }
                    }
                };

                checkField(input.route, brief.route);
                checkField(input.slug, brief.slug);
                checkField(input.pageKind, brief.pageKind);
                checkField(input.audience, brief.audience);
                checkField(input.contentSource, brief.contentSource);

                // --- Missing required (Req 2.8): exactly the omitted required fields ---
                const expectedMissing: RequiredField[] = REQUIRED_FIELDS.filter(
                    (f) => input[f] === undefined
                );
                expect([...brief.missingRequired].sort()).toEqual(
                    [...expectedMissing].sort()
                );

                // --- Gate progression (Req 1.5): may progress iff all required present ---
                const mayProgress = brief.missingRequired.length === 0;
                const allRequiredPresent =
                    brief.route.present &&
                    brief.slug.present &&
                    brief.contentSource.present;
                expect(mayProgress).toBe(allRequiredPresent);
            }),
            { numRuns: 200 }
        );
    });
});
