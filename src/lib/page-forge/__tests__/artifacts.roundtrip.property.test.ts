// Feature: page-forge-agent-system, Property 50: Artifact front-matter round-trips
//
// Property 50: Artifact front-matter round-trips.
// Validates: Requirements 13.1, 16.1, 16.2
//
// For any structured front-matter object, serializing it to YAML + Markdown and
// parsing it back yields a front-matter object equal to the original
// (round-trip identity) together with the exact body. This is the invariant the
// whole pipeline relies on: every phase reads back the scores, verdicts, and
// findings that a previous phase wrote.

import { describe, expect, it } from "vitest";
import fc from "fast-check";

import { parseArtifact, serializeArtifact } from "../artifacts";

/**
 * A finite JS number whose decimal `String(...)` representation round-trips
 * through `Number(...)`. `-0` is excluded because the serializer emits it as
 * `"0"`, which parses back as `+0` (a deliberate, documented normalization).
 */
const scalarNumber = fc
    .oneof(
        fc.integer(),
        fc.double({ noNaN: true, noDefaultInfinity: true }),
    )
    .filter((n) => Number.isFinite(n) && !Object.is(n, -0));

/**
 * Scalars representative of real artifact front matter: strings (including ones
 * with colons, quotes, spaces, and escapes — all JSON-quoted by the
 * serializer), finite numbers, booleans, and null.
 */
const scalar: fc.Arbitrary<string | number | boolean | null> = fc.oneof(
    fc.string(),
    scalarNumber,
    fc.boolean(),
    fc.constant(null),
);

/**
 * Object keys. Includes bare identifiers (emitted unquoted) and arbitrary
 * strings (JSON-quoted by the serializer) so both key paths round-trip.
 */
const key = fc.oneof(
    fc.stringMatching(/^[A-Za-z0-9_-]{1,12}$/),
    fc.string(),
);

/** An array of scalars, e.g. a list of tags or ids. */
const arrayOfScalars = fc.array(scalar, { maxLength: 6 });

/** A flat object of scalars, e.g. a single finding record. */
const scalarObject = fc.dictionary(key, scalar, { maxKeys: 6 });

/**
 * An array of small objects, e.g.
 * `findings: [{ id, severity, message, open }]`.
 */
const arrayOfObjects = fc.array(scalarObject, { maxLength: 5 });

/** A nested object one-to-two levels deep. */
const nestedObject = fc.dictionary(
    key,
    fc.oneof(scalar, arrayOfScalars, scalarObject),
    { maxKeys: 5 },
);

/**
 * A structured front-matter object: string keys mapping to scalars, arrays of
 * scalars, nested objects, and arrays of objects — the shapes the serializer
 * documents support for.
 */
const frontMatter = fc.dictionary(
    key,
    fc.oneof(
        scalar,
        arrayOfScalars,
        scalarObject,
        arrayOfObjects,
        nestedObject,
    ),
    { maxKeys: 8 },
);

/** A Markdown body — possibly empty, possibly multi-line. */
const body = fc.string();

describe("Property 50: Artifact front-matter round-trips", () => {
    it("parse(serialize(front, body)) reproduces the front matter and body exactly", () => {
        fc.assert(
            fc.property(frontMatter, body, (front, bodyText) => {
                const serialized = serializeArtifact(front, bodyText);
                const parsed = parseArtifact<Record<string, unknown>>(serialized);

                expect(parsed.front).toEqual(front);
                expect(parsed.body).toBe(bodyText);
            }),
            { numRuns: 200 },
        );
    });
});
