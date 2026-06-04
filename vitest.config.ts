import { defineConfig } from "vitest/config";

/**
 * Vitest configuration for the Kore.ai homepage clone test suite.
 *
 * Scope: only `tests/**` and any colocated `src/**` test files.  We
 * exclude build output and node_modules, and we keep the test
 * environment as `node` because the property tests in `tests/property/**`
 * inspect source files on disk and parse ASTs (no DOM needed).  Component
 * tests under `src/components/kore/**__tests__/**` will switch to a jsdom
 * environment via `@vitest-environment jsdom` annotations on a per-file
 * basis when authored.
 */
export default defineConfig({
    test: {
        environment: "node",
        include: ["tests/**/*.test.ts", "src/**/*.test.ts", "src/**/*.test.tsx"],
        exclude: ["node_modules", ".next", "dist", "studio-softree-technology"],
        testTimeout: 30_000,
    },
});
