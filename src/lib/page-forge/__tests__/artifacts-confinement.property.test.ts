// Feature: page-forge-agent-system, Property 3: Artifact writes are confined to the session directory
import { describe, it, expect, afterAll } from "vitest";
import { rm } from "node:fs/promises";
import { resolve } from "node:path";
import fc from "fast-check";
import { ROOT, persist, verifyExists } from "../artifacts";

/**
 * Property 3 — Artifact writes are confined to the session directory.
 *
 * Property statement: For any candidate write name/path, the containment guard
 * accepts it if and only if it resolves within `.planning/page-forge/<slug>/`;
 * every path that escapes that root is rejected. The escape guard is
 * synchronous — it throws before the returned promise begins any IO — so a
 * rejected write never touches the filesystem.
 *
 * To keep the property fast and disk-light we test the guard's behavior:
 *  - Clearly-escaping names (`..` traversal, absolute POSIX/Windows paths) must
 *    make `persist` and `verifyExists` throw synchronously.
 *  - Safe relative names (no traversal) must NOT throw the containment error.
 *    We prefer `verifyExists` for the accept case since it performs no write;
 *    it may legitimately resolve `false`, but it must never throw the escape
 *    error. Any files created under the temp session directory are cleaned up.
 *
 * Validates: Requirements 1.4
 */

// A random temp slug so the property never collides with a real session and is
// trivial to clean up afterward.
const TEMP_SLUG = `__pbt-confinement-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
const TEMP_ROOT = resolve(process.cwd(), ROOT(TEMP_SLUG));

afterAll(async () => {
    // Remove the whole temp session directory (and anything persist created).
    await rm(TEMP_ROOT, { recursive: true, force: true });
});

describe("artifacts — write confinement (Property 3)", () => {
    // ---- Safe names: file names and contained subpaths that stay in ROOT ----
    const safeLeaf = fc.constantFrom(
        "00-BRIEF.md",
        "05a-DESIGN.md",
        "06-REVIEW.md",
        "07-LOOP-3-responsive.md",
        "child.md",
        "notes.txt",
        "deep.file.name.md",
        "a",
    );
    const safeNameArb = fc.oneof(
        safeLeaf,
        // Contained nested subpaths like "sub/child.md" or "a/b/c.md".
        fc
            .array(fc.constantFrom("sub", "nested", "loop", "a", "b"), {
                minLength: 1,
                maxLength: 3,
            })
            .chain((dirs) => safeLeaf.map((leaf) => [...dirs, leaf].join("/"))),
    );

    // ---- Escaping names: `..` traversal that climbs out, and absolute paths --
    const escapingArb = fc.oneof(
        // Relative traversal that escapes the root under path.resolve semantics.
        fc.constantFrom(
            "../escape.md",
            "../../x",
            "sub/../../../y",
            "../../../../etc/passwd",
            "a/b/../../../c.md",
            "./../sibling.md",
        ),
        // Absolute POSIX paths.
        fc.constantFrom("/etc/passwd", "/tmp/x.md", "/var/www/leak.md"),
        // Absolute, drive-qualified Windows paths.
        fc.constantFrom("C:\\Windows\\x", "C:\\Users\\admin\\secret.md", "D:\\leak.md"),
    );

    it("throws SYNCHRONOUSLY for every path that escapes the session root", () => {
        fc.assert(
            fc.property(escapingArb, (name) => {
                // persist/verifyExists return a Promise, but the containment
                // guard runs before any IO and throws synchronously. If the
                // guard were async (returned a rejected promise) these calls
                // would return a promise instead of throwing, and toThrow would
                // fail — which is exactly the confinement violation we forbid.
                expect(() => persist(TEMP_SLUG, name, "x")).toThrow();
                expect(() => verifyExists(TEMP_SLUG, name)).toThrow();
            }),
            { numRuns: 200 },
        );
    });

    it("does NOT throw the containment error for safe names inside the root", () => {
        fc.assert(
            fc.property(safeNameArb, (name) => {
                // Prefer verifyExists for the accept case: it performs no write,
                // so the guard admitting the path is observable purely by the
                // absence of a synchronous throw. It may return a promise that
                // resolves to false; that is fine — only the escape error is
                // forbidden here.
                let threw = false;
                try {
                    const p = verifyExists(TEMP_SLUG, name);
                    // Consume the eventual settlement to avoid unhandled rejection.
                    void p.then(
                        () => undefined,
                        () => undefined,
                    );
                } catch {
                    threw = true;
                }
                expect(threw).toBe(false);
            }),
            { numRuns: 200 },
        );
    });
});

describe("artifacts — safe names really do persist and verify inside the root", () => {
    // A couple of concrete safe names we actually persist + verify, proving the
    // guard admits real contained writes (not just declines to throw). Cleaned
    // up by the afterAll above via the temp root removal.
    const concreteSafe = ["05a-DESIGN.md", "sub/child.md"];

    it("persists and verifies a handful of safe artifacts", async () => {
        for (const name of concreteSafe) {
            await persist(TEMP_SLUG, name, "content");
            expect(await verifyExists(TEMP_SLUG, name)).toBe(true);
        }
    });
});
