// Feature: page-forge-agent-system, Property 22: Responsive and performance checks always run and record failures
import { describe, it, expect } from "vitest";
import fc from "fast-check";

import {
    createOrchestrator,
    HaltError,
    type ArtifactIo,
    type CheckerOutcome,
    type PhaseRunners,
} from "../orchestrator";
import { normalizeBrief } from "../brief";
import { ARTIFACT_NAMES, loopArtifactName, parseArtifact } from "../artifacts";
import type {
    BriefInput,
    CheckerReport,
    Dimension,
    Phase,
    PipelineState,
    RequiredField,
} from "../types";

// ---------------------------------------------------------------------------
// Shared test fakes / helpers
// ---------------------------------------------------------------------------

interface FakeIo {
    io: ArtifactIo;
    /** Latest content persisted per artifact name (in memory, no disk). */
    store: Map<string, string>;
    /** Ordered log of every persisted artifact name (for one-shot counting). */
    writes: string[];
}

/**
 * An in-memory {@link ArtifactIo}: `persist` records content in a Map and
 * `verifyExists` reflects that Map. `failOn` lets a test simulate a write
 * failure for a specific artifact name (the persist throws).
 */
function makeIo(opts?: { failOn?: (name: string) => boolean }): FakeIo {
    const store = new Map<string, string>();
    const writes: string[] = [];
    const io: ArtifactIo = {
        async persist(_slug, name, content) {
            if (opts?.failOn?.(name)) {
                throw new Error(`simulated write failure for "${name}"`);
            }
            store.set(name, content);
            writes.push(name);
        },
        async verifyExists(_slug, name) {
            return store.has(name);
        },
    };
    return { io, store, writes };
}

// Fresh, unique slug that does not exist on disk, so `discoverState` reads an
// empty state and no real FS artifacts leak between runs.
let slugCounter = 0;
function freshSlug(): string {
    slugCounter += 1;
    return `pf-orch-test-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}-${slugCounter}`;
}

/** Build a PipelineState directly (no disk), with the given completed phases. */
function makeState(
    slug: string,
    completed: Phase[],
    overrides: Partial<PipelineState> = {},
): PipelineState {
    const brief = normalizeBrief({ slug, route: "/demo", contentSource: "cms" });
    return {
        slug,
        brief,
        loop: { loop: 0, maxLoops: 4, lastVerdict: null },
        completedPhases: new Set<Phase>(completed),
        currentLoopArtifacts: { design: false, responsive: false, performance: false },
        ...overrides,
    };
}

const CHECKER_DIMS: Record<CheckerReport["agent"], Dimension[]> = {
    "design-checker": ["visual_design", "storytelling", "motion"],
    "responsive-checker": ["layout_responsive"],
    "performance-checker": ["performance"],
};

/** A passing checker outcome for the given agent (all owned dimensions = 9.0). */
function passingOutcome(agent: CheckerReport["agent"]): CheckerOutcome {
    const scores: Partial<Record<Dimension, number | null>> = {};
    for (const d of CHECKER_DIMS[agent]) {
        scores[d] = 9.0;
    }
    return {
        report: {
            agent,
            scores,
            findings: [],
            evidence: [{ kind: "behavior", detail: "test inspection" }],
        },
    };
}

const LINEAR_COMPLETE: Phase[] = [
    "brief",
    "trend",
    "story",
    "component_map",
    "build",
];

// ---------------------------------------------------------------------------
// 14.2 — Property 22: Responsive + Performance checks always run + record failures
// Validates: Requirements 9.6, 9.8
// ---------------------------------------------------------------------------

describe("orchestrator — responsive & performance checks always run (Property 22)", () => {
    it("always writes 05b/05c and records a failed checker's dimensions as null", async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.record({
                    designThrows: fc.boolean(),
                    responsiveThrows: fc.boolean(),
                    performanceThrows: fc.boolean(),
                    designScore: fc.double({ min: 0, max: 10, noNaN: true }),
                }),
                async ({
                    designThrows,
                    responsiveThrows,
                    performanceThrows,
                    designScore,
                }) => {
                    const slug = freshSlug();
                    const { io, store } = makeIo();

                    const runners: PhaseRunners = {
                        designChecker: () => {
                            if (designThrows) {
                                throw new Error("design checker failed");
                            }
                            const outcome = passingOutcome("design-checker");
                            outcome.report.scores = {
                                visual_design: designScore,
                                storytelling: designScore,
                                motion: designScore,
                            };
                            return outcome;
                        },
                        responsiveChecker: () => {
                            if (responsiveThrows) {
                                throw new Error("responsive checker failed");
                            }
                            return passingOutcome("responsive-checker");
                        },
                        performanceChecker: () => {
                            if (performanceThrows) {
                                throw new Error("performance checker failed");
                            }
                            return passingOutcome("performance-checker");
                        },
                    };

                    const orch = createOrchestrator({ io, runners });
                    const state = makeState(slug, LINEAR_COMPLETE);

                    // Parallel Check never throws, regardless of any checker outcome.
                    const next = await orch.runPhase(state, "parallel_check");
                    expect(next.completedPhases.has("parallel_check")).toBe(true);

                    // Responsive + Performance artifacts are always written (Req 9.6),
                    // as is Design — even when the Design checker itself failed.
                    expect(store.has(ARTIFACT_NAMES.responsive)).toBe(true);
                    expect(store.has(ARTIFACT_NAMES.performance)).toBe(true);
                    expect(store.has(ARTIFACT_NAMES.design)).toBe(true);

                    const resp = parseArtifact<{
                        scores: Record<string, number | null>;
                        failed?: boolean;
                    }>(store.get(ARTIFACT_NAMES.responsive)!);
                    const perf = parseArtifact<{
                        scores: Record<string, number | null>;
                        failed?: boolean;
                    }>(store.get(ARTIFACT_NAMES.performance)!);

                    // A failed checker records its dimensions as null (unscored) while
                    // the run continues (Req 9.8); a passing checker records its score.
                    if (responsiveThrows) {
                        expect(resp.front.scores.layout_responsive).toBeNull();
                        expect(resp.front.failed).toBe(true);
                    } else {
                        expect(resp.front.scores.layout_responsive).toBe(9);
                        expect(resp.front.failed).toBe(false);
                    }

                    if (performanceThrows) {
                        expect(perf.front.scores.performance).toBeNull();
                        expect(perf.front.failed).toBe(true);
                    } else {
                        expect(perf.front.scores.performance).toBe(9);
                        expect(perf.front.failed).toBe(false);
                    }
                },
            ),
            { numRuns: 150 },
        );
    });
});

// ---------------------------------------------------------------------------
// 14.3 — halt-on-write-failure + one-shot artifact creation
// Requirements: 1.3, 8.10, 9.2, 13.1, 15.1, 15.4
// ---------------------------------------------------------------------------

describe("orchestrator — halt-on-write-failure & one-shot artifact creation (14.3)", () => {
    const briefInput: BriefInput = {
        route: "/demo",
        slug: "demo",
        contentSource: "cms",
    };

    it.each<{ name: string; phase: Phase }>([
        { name: ARTIFACT_NAMES.brief, phase: "brief" },
        { name: ARTIFACT_NAMES.direction, phase: "trend" },
        { name: ARTIFACT_NAMES.build, phase: "build" },
        { name: ARTIFACT_NAMES.design, phase: "parallel_check" },
        { name: ARTIFACT_NAMES.review, phase: "review" },
    ])(
        "throws HaltError carrying the phase + in-memory output when $name fails to persist",
        async ({ name, phase }) => {
            const slug = freshSlug();
            const { io } = makeIo({ failOn: (n) => n === name });
            const orch = createOrchestrator({
                brief: { ...briefInput, slug },
                io,
            });

            let error: unknown;
            try {
                await orch.run(slug);
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(HaltError);
            const halt = error as HaltError;
            expect(halt.phase).toBe(phase);
            // The in-memory phase output is carried so the caller can retry
            // without recomputation (Req 1.3).
            expect(halt.output).toBeDefined();
        },
    );

    it("does NOT throw when the ship report (08-VERIFICATION.md) fails to persist; records it in writeFailures (Req 15.4)", async () => {
        const slug = freshSlug();
        const { io, store } = makeIo({
            failOn: (n) => n === ARTIFACT_NAMES.verification,
        });
        const orch = createOrchestrator({ brief: { ...briefInput, slug }, io });

        const outcome = await orch.run(slug);

        expect(outcome.status).toBe("shipped");
        expect(
            outcome.writeFailures.some((w) => w.includes(ARTIFACT_NAMES.verification)),
        ).toBe(true);
        expect(store.has(ARTIFACT_NAMES.verification)).toBe(false);
    });

    it("creates the Brief, checker, review, and ship artifacts exactly once", async () => {
        const slug = freshSlug();
        const { io, writes } = makeIo();
        const orch = createOrchestrator({ brief: { ...briefInput, slug }, io });

        const outcome = await orch.run(slug);
        expect(outcome.status).toBe("shipped");

        const count = (n: string) => writes.filter((w) => w === n).length;
        expect(count(ARTIFACT_NAMES.brief)).toBe(1);
        expect(count(ARTIFACT_NAMES.design)).toBe(1);
        expect(count(ARTIFACT_NAMES.responsive)).toBe(1);
        expect(count(ARTIFACT_NAMES.performance)).toBe(1);
        expect(count(ARTIFACT_NAMES.review)).toBe(1);
        expect(count(ARTIFACT_NAMES.verification)).toBe(1);
    });
});

// ---------------------------------------------------------------------------
// 14.4 — Brief consolidated-question flow
// Requirements: 1.5, 2.7, 2.8, 2.9
// ---------------------------------------------------------------------------

describe("orchestrator — Brief consolidated-question flow (14.4)", () => {
    it("stays awaiting_input and never advances past Brief when required fields are never supplied", async () => {
        const slug = freshSlug();
        const { io, store } = makeIo();
        const asked: RequiredField[][] = [];

        const orch = createOrchestrator({
            brief: { slug }, // route + contentSource absent
            io,
            onMissingRequired: (missing) => {
                asked.push([...missing]);
                return {}; // supply nothing
            },
        });

        const outcome = await orch.run(slug);

        expect(outcome.status).toBe("awaiting_input");
        expect(outcome.missingRequired).toEqual(
            expect.arrayContaining(["route", "contentSource"]),
        );
        // The consolidated question is asked (and bounded-re-asked) with the
        // still-absent fields each time (Req 2.7, 2.8).
        expect(asked.length).toBeGreaterThan(0);
        expect(asked.every((m) => m.includes("route") && m.includes("contentSource"))).toBe(
            true,
        );
        // No advance past Brief: the Brief artifact is never written.
        expect(store.has(ARTIFACT_NAMES.brief)).toBe(false);
    });

    it("asks once, re-requests only the still-absent fields, then proceeds when all are supplied", async () => {
        const slug = freshSlug();
        const { io, store } = makeIo();
        const asked: RequiredField[][] = [];
        let call = 0;

        const orch = createOrchestrator({
            brief: { slug }, // route + contentSource absent
            io,
            onMissingRequired: (missing) => {
                asked.push([...missing]);
                call += 1;
                if (call === 1) {
                    return { route: "/demo" }; // supply route only
                }
                return { contentSource: "cms" }; // then contentSource
            },
        });

        const outcome = await orch.run(slug);

        expect(outcome.status).toBe("shipped");
        expect(asked.length).toBe(2);
        expect(asked[0]).toEqual(["route", "contentSource"]);
        // Route was supplied, so only contentSource is re-requested (Req 2.9).
        expect(asked[1]).toEqual(["contentSource"]);
        expect(store.has(ARTIFACT_NAMES.brief)).toBe(true);
    });

    it("does not ask at all when all required fields are supplied up front (Req 2.9)", async () => {
        const slug = freshSlug();
        const { io } = makeIo();
        const asked: RequiredField[][] = [];

        const orch = createOrchestrator({
            brief: { route: "/demo", slug, contentSource: "cms" },
            io,
            onMissingRequired: (missing) => {
                asked.push([...missing]);
                return {};
            },
        });

        const outcome = await orch.run(slug);

        expect(asked.length).toBe(0);
        expect(outcome.status).toBe("shipped");
    });
});

// ---------------------------------------------------------------------------
// 14.5 — Interrupt handling
// Requirements: 16.2, 16.3, 16.4, 16.5, 16.6
// ---------------------------------------------------------------------------

describe("orchestrator — interrupt handling (14.5)", () => {
    it("stop: writes a state snapshot and halts without mutating state (Req 16.3)", async () => {
        const slug = freshSlug();
        const { io, store } = makeIo();
        const orch = createOrchestrator({ io });
        const state = makeState(slug, LINEAR_COMPLETE);

        const result = await orch.applyInterrupt(state, { kind: "stop" });

        expect(store.has("STATE.md")).toBe(true);
        // Halts on the current state — nothing advances.
        expect(result).toBe(state);
    });

    it("new_direction: re-establishes the Brief so the run restarts at Trend (Req 16.4)", async () => {
        const slug = freshSlug();
        const { io, store, writes } = makeIo();
        const orch = createOrchestrator({ io });
        const state = makeState(slug, [
            ...LINEAR_COMPLETE,
            "parallel_check",
            "review",
        ]);

        const result = await orch.applyInterrupt(state, { kind: "new_direction" });

        // Reachable in-memory effect: the Brief is re-persisted so the restart
        // begins at Trend rather than Brief. The archive step + rediscovery hit
        // the real FS (covered by state.ts tests); with a fresh, non-existent
        // slug the archive is a no-op and discoverState returns an empty state,
        // so we assert only the hermetic, injected-IO effects here.
        expect(writes).toContain(ARTIFACT_NAMES.brief);
        expect(store.has(ARTIFACT_NAMES.brief)).toBe(true);
        expect(result.slug).toBe(slug);
    });

    it("fix_dimension: runs only that dimension's checker + fixer and marks its loop artifact (Req 16.5)", async () => {
        const slug = freshSlug();
        const { io, store } = makeIo();
        const orch = createOrchestrator({ io });
        const state = makeState(slug, LINEAR_COMPLETE);

        const result = await orch.applyInterrupt(state, {
            kind: "fix_dimension",
            dimension: "layout_responsive",
        });

        // Only the responsive checker + its correction artifact were written.
        expect(store.has(ARTIFACT_NAMES.responsive)).toBe(true);
        expect(store.has(loopArtifactName(0, "responsive"))).toBe(true);
        expect(store.has(ARTIFACT_NAMES.design)).toBe(false);
        expect(store.has(ARTIFACT_NAMES.performance)).toBe(false);

        // Only the fixed dimension's current-loop artifact flag is set.
        expect(result.currentLoopArtifacts.responsive).toBe(true);
        expect(result.currentLoopArtifacts.design).toBe(false);
        expect(result.currentLoopArtifacts.performance).toBe(false);
    });

    it("fix_dimension: routes visual_design to the design checker + fixer (Req 16.5)", async () => {
        const slug = freshSlug();
        const { io, store } = makeIo();
        const orch = createOrchestrator({ io });
        const state = makeState(slug, LINEAR_COMPLETE);

        const result = await orch.applyInterrupt(state, {
            kind: "fix_dimension",
            dimension: "visual_design",
        });

        expect(store.has(ARTIFACT_NAMES.design)).toBe(true);
        expect(store.has(loopArtifactName(0, "design"))).toBe(true);
        expect(store.has(ARTIFACT_NAMES.responsive)).toBe(false);
        expect(store.has(ARTIFACT_NAMES.performance)).toBe(false);
        expect(result.currentLoopArtifacts.design).toBe(true);
    });

    it("approve_override: writes a USER_OVERRIDE ship report and marks ship complete (Req 16.6)", async () => {
        const slug = freshSlug();
        const { io, store } = makeIo();
        const orch = createOrchestrator({ io });
        const state = makeState(slug, [
            ...LINEAR_COMPLETE,
            "parallel_check",
            "review",
        ]);

        const result = await orch.applyInterrupt(state, {
            kind: "approve_override",
        });

        expect(store.has(ARTIFACT_NAMES.verification)).toBe(true);
        const ship = parseArtifact<{ verdict: string }>(
            store.get(ARTIFACT_NAMES.verification)!,
        );
        expect(ship.front.verdict).toBe("USER_OVERRIDE");
        expect(result.completedPhases.has("ship")).toBe(true);
    });
});
