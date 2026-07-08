import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
    analyzeBuild,
    hasDisallowedRuntimeImport,
    hasPlaceholder,
    importsMotionOnlyFromTokens,
    mountsGlobalLoaderOnRootLayout,
} from "../build-analysis";

/**
 * Property tests for the Page Forge build static-analysis module
 * (`build-analysis.ts`). Each property below is expressed as an iff between the
 * high-level `analyzeBuild` orchestration and the module's own exported
 * predicates (used as oracles), so a divergence surfaces as a genuine bug in
 * the analysis rather than a re-derivation mismatch.
 */

// ---------------------------------------------------------------------------
// Shared building blocks
// ---------------------------------------------------------------------------

/**
 * Approved-stack module specifiers. These must NEVER produce a
 * disallowed-runtime finding, and (for the motion source) never a motion-token
 * finding.
 */
const APPROVED_SPECIFIERS = [
    "react",
    "next",
    "next/link",
    "next/image",
    "gsap",
    "gsap/ScrollTrigger",
    "framer-motion",
    "motion",
    "@/lib/motion",
    "tailwindcss",
] as const;

/** Specifiers that are outside the approved stack (each a P0 stack violation). */
const DISALLOWED_SPECIFIERS = [
    "styled-components",
    "@emotion/react",
    "@emotion/styled",
    "@stitches/react",
    "goober",
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "ogl",
    "regl",
    "pixi.js",
    "locomotive-scroll",
    "lenis",
    "@studio-freight/lenis",
    "@barba/core",
    "barba",
    "swup",
    "scrollmagic",
    "aos",
] as const;

describe("build-analysis — property tests", () => {
    // Feature: page-forge-agent-system, Property 18: Built code uses only the approved stack and motion tokens
    // Validates: Requirements 8.1, 8.3, 17.7
    it("flags disallowed runtimes and non-token motion values iff present, and never flags the approved stack (Property 18)", () => {
        const specifierArb = fc.constantFrom<string>(
            ...APPROVED_SPECIFIERS,
            ...DISALLOWED_SPECIFIERS,
        );
        const importLineArb = specifierArb.map((s) => `import x from "${s}";`);

        // Motion source snippet: some are token-clean, some define/redefine
        // motion values inline or import them from a non-token module.
        const motionSnippetArb = fc.constantFrom<string>(
            `import { ease, duration } from "@/lib/motion";`, // approved token source
            ``, // no motion values at all
            `const duration = 0.5;`, // inline motion constant
            `const x = "cubic-bezier(0.4, 0, 0.2, 1)";`, // inline easing literal
            `import { easing } from "my-motion-utils";`, // motion import from elsewhere
        );

        fc.assert(
            fc.property(
                fc.array(importLineArb, { minLength: 0, maxLength: 6 }),
                motionSnippetArb,
                (importLines, motionSnippet) => {
                    const content = [...importLines, motionSnippet].join("\n");
                    const path = "src/components/Section.tsx";
                    const { findings } = analyzeBuild([{ path, content }]);

                    // Disallowed-runtime findings: present iff the source imports
                    // a disallowed runtime, and every such finding is a P0 on the
                    // performance/stack dimension.
                    const runtimeFindings = findings.filter((f) =>
                        f.id.startsWith("build-disallowed-runtime:"),
                    );
                    expect(runtimeFindings.length > 0).toBe(
                        hasDisallowedRuntimeImport(content),
                    );
                    for (const f of runtimeFindings) {
                        expect(f.severity).toBe("P0");
                        expect(f.dimension).toBe("performance");
                    }

                    // Motion-token findings: present iff motion values are defined
                    // inline or imported from a non-`@/lib/motion` module.
                    const motionFindings = findings.filter(
                        (f) =>
                            f.id.startsWith("build-motion-constant-defined:") ||
                            f.id.startsWith("build-motion-import-elsewhere:"),
                    );
                    expect(motionFindings.length > 0).toBe(
                        !importsMotionOnlyFromTokens(content),
                    );
                    for (const f of motionFindings) {
                        expect(f.dimension).toBe("motion");
                    }
                },
            ),
            { numRuns: 200 },
        );
    });

    // Feature: page-forge-agent-system, Property 18: Built code uses only the approved stack and motion tokens
    // Validates: Requirements 8.1, 8.3, 17.7
    it("approved-stack imports and token-sourced motion never produce a finding (Property 18)", () => {
        const approvedSpecifierArb = fc.constantFrom<string>(...APPROVED_SPECIFIERS);
        const approvedImportLineArb = approvedSpecifierArb.map(
            (s) => `import x from "${s}";`,
        );
        const approvedMotionArb = fc.constantFrom<string>(
            ``,
            `import { ease, duration } from "@/lib/motion";`,
        );

        fc.assert(
            fc.property(
                fc.array(approvedImportLineArb, { minLength: 1, maxLength: 8 }),
                approvedMotionArb,
                (importLines, motionSnippet) => {
                    const content = [...importLines, motionSnippet].join("\n");
                    const { findings } = analyzeBuild([
                        { path: "src/components/Section.tsx", content },
                    ]);

                    expect(hasDisallowedRuntimeImport(content)).toBe(false);
                    expect(importsMotionOnlyFromTokens(content)).toBe(true);
                    expect(
                        findings.some(
                            (f) =>
                                f.id.startsWith("build-disallowed-runtime:") ||
                                f.id.startsWith("build-motion-constant-defined:") ||
                                f.id.startsWith("build-motion-import-elsewhere:"),
                        ),
                    ).toBe(false);
                },
            ),
            { numRuns: 200 },
        );
    });

    // Feature: page-forge-agent-system, Property 19: Emitted code has no placeholders
    // Validates: Requirements 8.5
    it("produces a placeholder finding iff the source contains a placeholder marker (Property 19)", () => {
        // Lines that carry a placeholder signal (comment, unimplemented body, or
        // placeholder import specifier).
        const placeholderLineArb = fc.constantFrom<string>(
            `// TODO: wire this up`,
            `// FIXME broken`,
            `/* PLACEHOLDER */`,
            `// XXX revisit`,
            `// HACK for now`,
            `// coming soon`,
            `throw new Error("not implemented");`,
            `import a from "path/to/thing";`,
            `import b from "TODO";`,
            `import c from "your-module-here";`,
            `import d from "";`,
        );

        // Benign lines that must never trip the placeholder detector.
        const benignLineArb = fc.constantFrom<string>(
            `import React from "react";`,
            `import { ease } from "@/lib/motion";`,
            `const value = 42;`,
            `export function Section() { return null; }`,
            `// renders the hero band`,
            `const label = "Get in touch";`,
        );

        fc.assert(
            fc.property(
                fc.array(benignLineArb, { minLength: 0, maxLength: 6 }),
                fc.array(placeholderLineArb, { minLength: 0, maxLength: 4 }),
                (benignLines, placeholderLines) => {
                    // Interleave so ordering is arbitrary but content is stable.
                    const content = [...benignLines, ...placeholderLines].join("\n");
                    const { findings } = analyzeBuild([
                        { path: "src/components/Section.tsx", content },
                    ]);

                    const hasPlaceholderFinding = findings.some((f) =>
                        f.id.startsWith("build-placeholder:"),
                    );
                    // analyzeBuild must agree with the hasPlaceholder oracle.
                    expect(hasPlaceholderFinding).toBe(hasPlaceholder(content));
                },
            ),
            { numRuns: 200 },
        );
    });

    // Feature: page-forge-agent-system, Property 20: No global loader or transition framework on the root layout
    // Validates: Requirements 8.7, 12.5, 17.5
    it("emits the root-layout-hijack P0 iff root layout mounts a loader/transition and the Brief did not request it (Property 20)", () => {
        const pathArb = fc.constantFrom<string>(
            // Root layout variants (should match).
            "src/app/layout.tsx",
            "src/app/layout.jsx",
            "src/app/layout.ts",
            "src\\app\\layout.tsx",
            "SRC/APP/LAYOUT.TSX",
            // Non-root paths (should not match).
            "src/app/page.tsx",
            "src/components/Loader.tsx",
            "app/layout.tsx",
            "src/app/(marketing)/layout.tsx",
        );

        const contentArb = fc.constantFrom<string>(
            // Loader / transition content (mounts a global system).
            `export default function Layout() { return <Preloader />; }`,
            `export default function Layout() { return <PageTransition>{children}</PageTransition>; }`,
            `export default function Layout() { return <SmoothScroll/>; }`,
            `import x from "@barba/core";`,
            `import x from "lenis";`,
            `import x from "locomotive-scroll";`,
            // Benign content (no global system).
            `export default function Layout() { return <html><body>{children}</body></html>; }`,
            `import React from "react";\nexport default function Layout() { return <div/>; }`,
        );

        const briefArb = fc.option(fc.boolean(), { nil: undefined });

        fc.assert(
            fc.property(
                pathArb,
                contentArb,
                briefArb,
                (path, content, briefRequestsGlobalLoader) => {
                    const { findings } = analyzeBuild(
                        [{ path, content }],
                        { briefRequestsGlobalLoader },
                    );

                    const hijackFindings = findings.filter((f) =>
                        f.id.startsWith("build-root-layout-hijack:"),
                    );

                    const expected =
                        mountsGlobalLoaderOnRootLayout(path, content) &&
                        briefRequestsGlobalLoader !== true;

                    expect(hijackFindings.length > 0).toBe(expected);
                    for (const f of hijackFindings) {
                        expect(f.severity).toBe("P0");
                    }
                },
            ),
            { numRuns: 200 },
        );
    });
});
