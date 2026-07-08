// Feature: page-forge-agent-system, Property 4: Sacred_UI edits are permitted only within expanded scope
import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
    SACRED_UI,
    isSacredUi,
    isSacredEditPermitted,
} from "../constraints";

/**
 * Property 4 — Sacred_UI edits are permitted only within expanded scope.
 *
 * Property statement: For any edit target path and any expandedScope set, an
 * edit to a Sacred_UI component is permitted if and only if that component
 * appears in the Brief's expanded scope; otherwise it is refused.
 *
 * Validates: Requirements 1.6, 8.6, 14.7
 */
describe("constraints — Sacred_UI edit permission (Property 4)", () => {
    // Common path prefixes/suffixes used to embed a Sacred_UI identifier into a
    // realistic-looking file path.
    const prefixArb = fc.constantFrom(
        "src/components/",
        "src/components/nav/",
        "app/(site)/",
        "src/sections/",
        "",
    );
    const suffixArb = fc.constantFrom(".tsx", ".ts", "/index.tsx", "", "-wrapper.tsx");

    // A path that embeds a specific Sacred_UI identifier (verbatim, so casing
    // matches the constant and isSacredUi is guaranteed true).
    const sacredPathArb = fc.record({
        component: fc.constantFrom(...SACRED_UI),
        prefix: prefixArb,
        suffix: suffixArb,
    }).map(({ component, prefix, suffix }) => ({
        path: `${prefix}${component}${suffix}`,
        component,
    }));

    // A random path that must NOT contain any Sacred_UI identifier. We filter to
    // guarantee non-sacredness so the arbitrary stays honest.
    const nonSacredPathArb = fc
        .stringMatching(/^[a-zA-Z0-9/_.-]{1,40}$/)
        .filter((p) => !isSacredUi(p));

    // An arbitrary subset of SACRED_UI to serve as the Brief's expanded scope.
    const expandedScopeArb = fc.subarray([...SACRED_UI]);

    it("permits a Sacred_UI edit iff the component is in expandedScope", () => {
        fc.assert(
            fc.property(sacredPathArb, expandedScopeArb, ({ path, component }, expandedScope) => {
                const permitted = isSacredEditPermitted(path, expandedScope);
                const inScope = expandedScope.some(
                    (s) => s.toLowerCase() === component.toLowerCase(),
                );
                // iff relationship: permitted exactly when in scope.
                expect(permitted).toBe(inScope);
            }),
            { numRuns: 200 },
        );
    });

    it("always permits edits to non-Sacred_UI paths regardless of scope", () => {
        fc.assert(
            fc.property(nonSacredPathArb, expandedScopeArb, (path, expandedScope) => {
                expect(isSacredEditPermitted(path, expandedScope)).toBe(true);
            }),
            { numRuns: 200 },
        );
    });

    it("refuses every Sacred_UI edit when expandedScope is empty", () => {
        fc.assert(
            fc.property(sacredPathArb, ({ path }) => {
                expect(isSacredEditPermitted(path, [])).toBe(false);
            }),
            { numRuns: 100 },
        );
    });
});
