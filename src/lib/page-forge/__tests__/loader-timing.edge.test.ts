import { describe, it, expect } from "vitest";
import {
    validateLoaderConfig,
    shouldShowIntroLoader,
    LOADER_SKIP_DISMISS_MAX_MS,
    LOADER_AUTO_DISMISS_MAX_MS,
    type LoaderConfig,
} from "../build-analysis";

/**
 * Edge/example tests for the Builder-produced intro-loader contract
 * (`validateLoaderConfig` + `shouldShowIntroLoader` in `build-analysis.ts`).
 *
 * These cover the loader timing budgets and session-once suppression rule the
 * Builder must satisfy when the Brief requests an intro loader:
 *   - a skip control dismisses within 100ms (Req 8.8),
 *   - the loader auto-dismisses within 3000ms (Req 8.8),
 *   - a repeat visit within the same session suppresses the loader and renders
 *     the final state immediately (Req 8.9).
 *
 * Validates: Requirements 8.8, 8.9
 */

/** A fully-conformant loader config used as the baseline for each edge case. */
function validConfig(over: Partial<LoaderConfig> = {}): LoaderConfig {
    return {
        scopedToRoute: true,
        hasSkipControl: true,
        skipDismissMs: 80,
        autoDismissMs: 2500,
        suppressOnRepeatVisit: true,
        ...over,
    };
}

/** Ids of findings returned by the validator, for concise assertions. */
function ids(config: LoaderConfig): string[] {
    return validateLoaderConfig(config).map((f) => f.id);
}

describe("intro-loader timing budgets (Req 8.8)", () => {
    it("pins the budget constants to the required values", () => {
        expect(LOADER_SKIP_DISMISS_MAX_MS).toBe(100);
        expect(LOADER_AUTO_DISMISS_MAX_MS).toBe(3000);
        // Skip-dismiss must be tighter than auto-dismiss.
        expect(LOADER_SKIP_DISMISS_MAX_MS).toBeLessThan(LOADER_AUTO_DISMISS_MAX_MS);
    });

    it("accepts a fully-conformant loader config with no findings", () => {
        expect(validateLoaderConfig(validConfig())).toEqual([]);
    });

    it("accepts skip-dismiss exactly at the 100ms boundary", () => {
        expect(ids(validConfig({ skipDismissMs: LOADER_SKIP_DISMISS_MAX_MS }))).not.toContain(
            "loader-skip-dismiss-over-budget",
        );
    });

    it("rejects skip-dismiss just over the 100ms budget as a P0 finding", () => {
        const findings = validateLoaderConfig(validConfig({ skipDismissMs: 101 }));
        const skip = findings.find((f) => f.id === "loader-skip-dismiss-over-budget");
        expect(skip).toBeDefined();
        expect(skip?.severity).toBe("P0");
    });

    it("accepts auto-dismiss exactly at the 3000ms boundary", () => {
        expect(ids(validConfig({ autoDismissMs: LOADER_AUTO_DISMISS_MAX_MS }))).not.toContain(
            "loader-auto-dismiss-over-budget",
        );
    });

    it("rejects auto-dismiss just over the 3000ms budget as a P0 finding", () => {
        const findings = validateLoaderConfig(validConfig({ autoDismissMs: 3001 }));
        const auto = findings.find((f) => f.id === "loader-auto-dismiss-over-budget");
        expect(auto).toBeDefined();
        expect(auto?.severity).toBe("P0");
    });

    it("rejects a missing skip control", () => {
        expect(ids(validConfig({ hasSkipControl: false }))).toContain(
            "loader-no-skip-control",
        );
    });

    it("rejects a loader not scoped to the page route", () => {
        expect(ids(validConfig({ scopedToRoute: false }))).toContain(
            "loader-scope-not-route",
        );
    });

    it("treats non-finite / negative durations as out-of-budget violations", () => {
        for (const bad of [-1, Number.NaN, Number.POSITIVE_INFINITY]) {
            expect(ids(validConfig({ skipDismissMs: bad }))).toContain(
                "loader-skip-dismiss-over-budget",
            );
            expect(ids(validConfig({ autoDismissMs: bad }))).toContain(
                "loader-auto-dismiss-over-budget",
            );
        }
    });

    it("is pure: identical configs yield identical finding ids", () => {
        const config = validConfig({ skipDismissMs: 500, autoDismissMs: 9000 });
        expect(ids(config)).toEqual(ids(config));
    });
});

describe("intro-loader session-once suppression (Req 8.9)", () => {
    it("rejects a config that does not suppress the loader on a repeat visit", () => {
        expect(ids(validConfig({ suppressOnRepeatVisit: false }))).toContain(
            "loader-no-session-once-suppression",
        );
    });

    it("shows the loader on the first visit of a session", () => {
        expect(shouldShowIntroLoader(validConfig(), false)).toBe(true);
    });

    it("suppresses the loader on a repeat visit within the same session", () => {
        // Repeat visit + suppression enabled => render final state immediately.
        expect(shouldShowIntroLoader(validConfig(), true)).toBe(false);
    });

    it("still shows the loader on a repeat visit when suppression is disabled", () => {
        // A config that fails Req 8.9 would keep re-showing the loader; the
        // validator flags this config (see above), and the suppression helper
        // reflects the non-conformant runtime behavior.
        expect(
            shouldShowIntroLoader(validConfig({ suppressOnRepeatVisit: false }), true),
        ).toBe(true);
    });
});
