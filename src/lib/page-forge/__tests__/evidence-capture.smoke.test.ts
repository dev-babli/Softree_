// Feature: page-forge-agent-system, Task 16.3: evidence-capture wiring smoke/integration tests
import { describe, it, expect } from "vitest";

// The evidence-capture scripts are ESM modules under `scripts/page-forge/`.
// They are imported here by relative path; Vitest resolves `.mjs` natively.
import {
    capturePerf,
    analyzeStatic,
    findScrollLinkedProps,
    findGsapContextsWithoutCleanup,
    countHeavyPins,
    mountsGlobalLoaderOnRootLayout,
    hasReducedMotionPath,
} from "../../../../scripts/page-forge/capture-perf.mjs";
import {
    slugFromUrl,
    BREAKPOINTS,
    ROOT,
} from "../../../../scripts/page-forge/capture-viewport.mjs";

/**
 * Task 16.3 — integration/smoke tests for the evidence-capture wiring.
 *
 * These tests are intentionally CI-safe: they exercise the deterministic,
 * browser-free surface of the two capture scripts. They confirm that:
 *   - `capture-perf` static analysis derives the correct `PerfMeasurement`
 *     fields from in-memory source snippets (Req 11.2);
 *   - `capturePerf` sets `toolAbsent` while still populating static fields when
 *     the runtime tool is skipped or the target URL is unreachable (Req 11.4);
 *   - `capture-viewport` pure helpers derive the expected slug / breakpoints /
 *     session root used to wire `ViewportMeasurement` capture (Req 11.1).
 *
 * Full headless-browser viewport capture and Lighthouse/web-vitals runtime
 * capture are validated manually against a running preview; they are not run in
 * CI to keep this suite deterministic and free of a browser/network dependency.
 *
 * Validates: Requirements 11.1, 11.2, 11.4
 */

// A representative "hostile" source file: a scroll-linked GSAP timeline that
// animates the forbidden layout prop `top` and a `filter: blur(...)` while
// scrubbing, plus a heavy pin, all inside an unmanaged `gsap.context`.
const SCROLL_LINKED_SOURCE = {
    path: "src/components/forge/sections/HeavyScroll.tsx",
    content: `
import gsap from "gsap";
export function HeavyScroll() {
    const ctx = gsap.context(() => {
        gsap.to(".panel", {
            scrollTrigger: { trigger: ".panel", scrub: true, pin: true },
            top: "40%",
            filter: "blur(12px)",
        });
    });
    return <section className="panel" />;
}
`,
};

// The same animation, but with a proper cleanup path via `.revert()`.
const CLEANED_SOURCE = {
    path: "src/components/forge/sections/Cleaned.tsx",
    content: `
import gsap from "gsap";
export function Cleaned() {
    const ctx = gsap.context(() => {
        gsap.to(".panel", { scrollTrigger: { trigger: ".panel", scrub: true }, x: 100 });
    });
    return () => ctx.revert();
}
`,
};

// A root layout that mounts a global preloader — a layout hijack (Req 12.5).
const ROOT_LAYOUT_WITH_LOADER = {
    path: "src/app/layout.tsx",
    content: `
import { Preloader } from "@/components/Preloader";
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (<html><body><Preloader />{children}</body></html>);
}
`,
};

// A component that provides a reduced-motion path (Req 12.6).
const REDUCED_MOTION_SOURCE = {
    path: "src/components/forge/sections/Reveal.tsx",
    content: `
export function Reveal() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return <div className="final-state" />;
    }
    return <div className="animated" />;
}
`,
};

describe("evidence capture — capture-perf static analysis (Req 11.2)", () => {
    it("derives scroll-linked forbidden props (top + blur) from a scrubbed timeline", () => {
        const props = findScrollLinkedProps(SCROLL_LINKED_SOURCE.content);
        expect(props).toContain("top");
        expect(props).toContain("blur");
    });

    it("flags an unmanaged gsap.context as file:symbol, and clears it when cleanup exists", () => {
        const dirty = findGsapContextsWithoutCleanup(
            SCROLL_LINKED_SOURCE.path,
            SCROLL_LINKED_SOURCE.content,
        );
        // Reported as `file:symbol` with the nearest binding name (`ctx`).
        expect(dirty).toContain(
            "src/components/forge/sections/HeavyScroll.tsx:ctx",
        );

        const cleaned = findGsapContextsWithoutCleanup(
            CLEANED_SOURCE.path,
            CLEANED_SOURCE.content,
        );
        expect(cleaned).toEqual([]);
    });

    it("counts heavy pins (pin: true)", () => {
        expect(countHeavyPins(SCROLL_LINKED_SOURCE.content)).toBe(1);
        expect(countHeavyPins(CLEANED_SOURCE.content)).toBe(0);
    });

    it("detects a global loader mounted on the root layout, and only on the root layout", () => {
        expect(
            mountsGlobalLoaderOnRootLayout(
                ROOT_LAYOUT_WITH_LOADER.path,
                ROOT_LAYOUT_WITH_LOADER.content,
            ),
        ).toBe(true);
        // Same content in a non-root-layout file is not a layout hijack.
        expect(
            mountsGlobalLoaderOnRootLayout(
                "src/components/forge/sections/Intro.tsx",
                ROOT_LAYOUT_WITH_LOADER.content,
            ),
        ).toBe(false);
    });

    it("detects a reduced-motion path", () => {
        expect(hasReducedMotionPath(REDUCED_MOTION_SOURCE.content)).toBe(true);
        expect(hasReducedMotionPath(SCROLL_LINKED_SOURCE.content)).toBe(false);
    });

    it("aggregates the full PerfMeasurement static fields via analyzeStatic", () => {
        const files = [
            SCROLL_LINKED_SOURCE,
            ROOT_LAYOUT_WITH_LOADER,
            REDUCED_MOTION_SOURCE,
        ];
        const fields = analyzeStatic(files, { briefRequestsGlobalLoader: false });

        expect(fields.scrollLinkedProps).toEqual(
            expect.arrayContaining(["top", "blur"]),
        );
        expect(fields.gsapContextsWithoutCleanup).toContain(
            "src/components/forge/sections/HeavyScroll.tsx:ctx",
        );
        expect(fields.heavyPinCount).toBe(1);
        expect(fields.globalLayoutHijack).toBe(true);
        expect(fields.reducedMotionPathPresent).toBe(true);
    });

    it("suppresses globalLayoutHijack when the Brief requests a global loader", () => {
        const fields = analyzeStatic([ROOT_LAYOUT_WITH_LOADER], {
            briefRequestsGlobalLoader: true,
        });
        expect(fields.globalLayoutHijack).toBe(false);
    });
});

describe("evidence capture — capturePerf toolAbsent wiring (Req 11.4)", () => {
    it("with skipRuntime, sets toolAbsent and still populates static fields (no lcpMs)", async () => {
        const { measurement, toolAbsent } = await capturePerf(
            "http://127.0.0.1:0/",
            {
                sourceFiles: [
                    SCROLL_LINKED_SOURCE,
                    ROOT_LAYOUT_WITH_LOADER,
                    REDUCED_MOTION_SOURCE,
                ],
                skipRuntime: true,
            },
        );

        // Runtime tool skipped → sentinel (Req 11.4), no runtime LCP.
        expect(toolAbsent).toBe(true);
        expect(measurement.lcpMs).toBeUndefined();

        // Static-derived fields are still fully populated.
        expect(measurement.scrollLinkedProps).toEqual(
            expect.arrayContaining(["top", "blur"]),
        );
        expect(measurement.gsapContextsWithoutCleanup).toContain(
            "src/components/forge/sections/HeavyScroll.tsx:ctx",
        );
        expect(measurement.heavyPinCount).toBe(1);
        expect(measurement.globalLayoutHijack).toBe(true);
        expect(measurement.reducedMotionPathPresent).toBe(true);
    });

    it("resolves (does not throw) with toolAbsent for an unreachable URL, static fields intact", async () => {
        // An unreachable target: the runtime capture must fail gracefully to the
        // sentinel rather than throwing, while static analysis still runs.
        const { measurement, toolAbsent } = await capturePerf(
            "http://127.0.0.1:0/",
            {
                sourceFiles: [SCROLL_LINKED_SOURCE],
                timeoutMs: 2000,
            },
        );

        expect(toolAbsent).toBe(true);
        expect(measurement.lcpMs).toBeUndefined();
        expect(measurement.scrollLinkedProps).toEqual(
            expect.arrayContaining(["top", "blur"]),
        );
        expect(measurement.heavyPinCount).toBe(1);
    }, 25_000);
});

describe("evidence capture — capture-viewport pure helpers (Req 11.1)", () => {
    it("derives filesystem-safe slugs from page URLs", () => {
        expect(slugFromUrl("http://localhost:3000/services/ai-platform")).toBe(
            "services-ai-platform",
        );
        expect(slugFromUrl("https://example.com/about/")).toBe("about");
        // A bare origin falls back to "page".
        expect(slugFromUrl("http://localhost:3000/")).toBe("page");
    });

    it("exposes the four verification breakpoints in order", () => {
        expect(BREAKPOINTS).toEqual([390, 768, 1024, 1440]);
    });

    it("derives the session evidence root under .planning/page-forge/<slug>", () => {
        expect(ROOT("services-ai-platform")).toBe(
            ".planning/page-forge/services-ai-platform",
        );
    });
});
