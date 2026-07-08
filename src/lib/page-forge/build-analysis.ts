/**
 * Page Forge — Build static-analysis (`build-analysis.ts`).
 *
 * Pure, deterministic static analysis over emitted component/route source.
 * It never performs IO: every function operates only on the source strings it
 * is handed (plus a file path and a boolean for whether the root layout was
 * requested to host a global system). Given the same input it always returns
 * the same Findings with the same stable ids.
 *
 * The Builder (Req 8) must emit code that stays inside the approved stack, only
 * imports motion values from `@/lib/motion`, contains no placeholders, and never
 * hijacks the root layout. This module inspects the emitted source and records a
 * typed Finding for every violation it can detect from the source alone.
 *
 * Encoded rules:
 * - Req 8.1 / 17.7 — Disallowed runtime imports. New CSS-in-JS runtimes
 *   (styled-components, @emotion, ...), Three.js / full-page WebGL
 *   (`three`, `@react-three/fiber`, ...), and global animation / page-transition
 *   frameworks (`locomotive-scroll`, `lenis`, `@barba/core`, ...) are not part of
 *   the approved stack. The approved stack (Next.js, React, Tailwind, GSAP +
 *   ScrollTrigger, Framer Motion, `@/lib/motion`) is explicitly never flagged.
 *   Each is a stack violation and therefore P0 (Req 17.8).
 * - Req 8.3 / 17.7 — Motion tokens. Motion values must be imported from
 *   `@/lib/motion` (MOTION_TOKEN_SOURCE). Newly-defined motion constants and
 *   motion-value imports from any other module are flagged (P1 — a stack
 *   deviation that is a visible gap rather than a build-breaker).
 * - Req 8.5 — Placeholders. TODO / FIXME / placeholder comments (P1),
 *   unimplemented function bodies (P0), and unresolved / placeholder import
 *   specifiers (P0) are all forbidden in emitted code.
 * - Req 8.7 / 12.5 / 17.5 — Root-layout hijack. A global loader or
 *   page-transition framework mounted on `src/app/layout.tsx` without an
 *   explicit Brief request is P0.
 * - Req 17.7 (full-page WebGL / banned stacks) — a literal FORBIDDEN_AESTHETICS
 *   marker (e.g. `full-page-webgl`) appearing in emitted source is a stack
 *   violation and P0 (Req 17.8).
 *
 * Dimension mapping: motion-token violations are on the `motion` dimension;
 * every other rule here concerns stack/architecture integrity, which the
 * Performance_Checker owns, so those Findings are on the `performance` dimension.
 *
 * Detection is necessarily heuristic because the input is source text, not a
 * fully-resolved module graph. The heuristics are tuned to avoid false positives
 * on approved-stack code (GSAP, Framer Motion, Tailwind) and are documented at
 * each predicate.
 *
 * - Req 8.8 / 8.9 — Intro-loader contract. When the Brief requests an intro
 *   loader, the emitted loader must be scoped to the page route, expose a skip
 *   control that dismisses within 100ms, auto-dismiss within 3000ms, and be
 *   suppressed on a repeat visit within the same session (rendering the final
 *   state immediately). `validateLoaderConfig` checks a declared loader config
 *   against these budgets.
 *
 * Requirements: 8.1, 8.3, 8.5, 8.7, 8.8, 8.9, 12.5, 17.5, 17.7
 */

import { FORBIDDEN_AESTHETICS, MOTION_TOKEN_SOURCE } from "./constraints";
import type { Dimension, Finding, Severity } from "./types";

// ---------------------------------------------------------------------------
// Public options / result
// ---------------------------------------------------------------------------

export interface AnalyzeBuildOptions {
    /**
     * Whether the Brief explicitly requested a global loader / page-transition
     * system on the root layout. When true, a loader mounted on
     * `src/app/layout.tsx` is permitted and no root-layout-hijack Finding is
     * produced (Req 8.7 / 12.5).
     */
    briefRequestsGlobalLoader?: boolean;
}

export interface AnalyzeBuildResult {
    findings: Finding[];
}

// ---------------------------------------------------------------------------
// Disallowed runtimes (Req 8.1 / 17.7)
// ---------------------------------------------------------------------------

type RuntimeCategory =
    | "css-in-js"
    | "three-js"
    | "webgl"
    | "global-animation";

interface DisallowedRuntime {
    /** Package (or scope) the specifier must equal or be a subpath of. */
    pkg: string;
    category: RuntimeCategory;
    label: string;
}

/**
 * Runtimes that are outside the approved stack. A specifier matches an entry
 * when it equals `pkg` or is a subpath (`pkg + "/"`). Scopes such as
 * `@emotion` match any `@emotion/*` package.
 *
 * The approved stack — `react`, `next`, `gsap` (+ `gsap/ScrollTrigger`),
 * `framer-motion`, `motion`, `tailwindcss`, and `@/lib/motion` — is intentionally
 * absent so it is never flagged.
 */
const DISALLOWED_RUNTIMES: readonly DisallowedRuntime[] = [
    // New CSS-in-JS runtimes.
    { pkg: "styled-components", category: "css-in-js", label: "styled-components" },
    { pkg: "@emotion", category: "css-in-js", label: "@emotion" },
    { pkg: "@stitches/react", category: "css-in-js", label: "@stitches/react" },
    { pkg: "@stitches/core", category: "css-in-js", label: "@stitches/core" },
    { pkg: "goober", category: "css-in-js", label: "goober" },
    { pkg: "aphrodite", category: "css-in-js", label: "aphrodite" },
    { pkg: "jss", category: "css-in-js", label: "jss" },
    { pkg: "glamor", category: "css-in-js", label: "glamor" },
    // Three.js.
    { pkg: "three", category: "three-js", label: "three" },
    { pkg: "@react-three/fiber", category: "three-js", label: "@react-three/fiber" },
    { pkg: "@react-three/drei", category: "three-js", label: "@react-three/drei" },
    // Other full-page WebGL runtimes.
    { pkg: "ogl", category: "webgl", label: "ogl" },
    { pkg: "regl", category: "webgl", label: "regl" },
    { pkg: "pixi.js", category: "webgl", label: "pixi.js" },
    { pkg: "@babylonjs/core", category: "webgl", label: "@babylonjs/core" },
    { pkg: "babylonjs", category: "webgl", label: "babylonjs" },
    // Global animation / page-transition frameworks.
    { pkg: "locomotive-scroll", category: "global-animation", label: "locomotive-scroll" },
    { pkg: "lenis", category: "global-animation", label: "lenis" },
    { pkg: "@studio-freight/lenis", category: "global-animation", label: "@studio-freight/lenis" },
    { pkg: "@studio-freight/react-lenis", category: "global-animation", label: "@studio-freight/react-lenis" },
    { pkg: "@barba/core", category: "global-animation", label: "@barba/core" },
    { pkg: "barba", category: "global-animation", label: "barba" },
    { pkg: "swup", category: "global-animation", label: "swup" },
    { pkg: "scrollmagic", category: "global-animation", label: "scrollmagic" },
    { pkg: "aos", category: "global-animation", label: "aos" },
    { pkg: "wowjs", category: "global-animation", label: "wowjs" },
    { pkg: "fullpage.js", category: "global-animation", label: "fullpage.js" },
    { pkg: "@fullpage/react-fullpage", category: "global-animation", label: "@fullpage/react-fullpage" },
] as const;

/**
 * Modules whose imports are always allowed to carry motion-vocabulary bindings
 * without being treated as a "motion import from elsewhere". These are the
 * approved motion libraries plus the token source itself.
 */
const APPROVED_MOTION_MODULES: readonly string[] = [
    MOTION_TOKEN_SOURCE,
    "framer-motion",
    "motion",
    "gsap",
];

// ---------------------------------------------------------------------------
// Dimensions + severities
// ---------------------------------------------------------------------------

const DIM_STACK: Dimension = "performance";
const DIM_MOTION: Dimension = "motion";

// ---------------------------------------------------------------------------
// Module-specifier extraction
// ---------------------------------------------------------------------------

/**
 * Collect every module specifier referenced by static imports/exports, bare
 * imports, dynamic `import()`, and `require()` in the source.
 *
 * Pure and order-preserving; duplicates are kept so callers can dedupe as they
 * see fit.
 */
function collectModuleSpecifiers(content: string): string[] {
    const specifiers: string[] = [];
    const patterns: RegExp[] = [
        /\bfrom\s*["']([^"']+)["']/g, // import/export ... from "x"
        /\bimport\s+["']([^"']+)["']/g, // import "x"
        /\bimport\s*\(\s*["']([^"']+)["']/g, // import("x")
        /\brequire\s*\(\s*["']([^"']+)["']/g, // require("x")
    ];
    for (const pattern of patterns) {
        let match: RegExpExecArray | null;
        while ((match = pattern.exec(content)) !== null) {
            const specifier = match[1];
            if (specifier !== undefined) {
                specifiers.push(specifier);
            }
        }
    }
    return specifiers;
}

/** True when `specifier` equals `pkg` or is a subpath (`pkg/...`) of it. */
function specifierMatchesPackage(specifier: string, pkg: string): boolean {
    return specifier === pkg || specifier.startsWith(`${pkg}/`);
}

// ---------------------------------------------------------------------------
// Predicate: disallowed runtime import (Req 8.1 / 17.7)
// ---------------------------------------------------------------------------

/**
 * Return the disallowed runtimes imported by the source.
 *
 * A runtime is matched when any collected module specifier equals the package
 * or is one of its subpaths. Results are de-duplicated by package in
 * first-seen order.
 */
function matchedDisallowedRuntimes(content: string): DisallowedRuntime[] {
    const specifiers = collectModuleSpecifiers(content);
    const matched: DisallowedRuntime[] = [];
    const seen = new Set<string>();
    for (const runtime of DISALLOWED_RUNTIMES) {
        if (seen.has(runtime.pkg)) {
            continue;
        }
        if (specifiers.some((specifier) => specifierMatchesPackage(specifier, runtime.pkg))) {
            seen.add(runtime.pkg);
            matched.push(runtime);
        }
    }
    return matched;
}

/**
 * True when the source imports at least one runtime outside the approved stack
 * (new CSS-in-JS runtime, Three.js / WebGL, or a global animation / transition
 * framework). Approved-stack imports never trip this.
 *
 * Requirements: 8.1, 17.7
 */
export function hasDisallowedRuntimeImport(content: string): boolean {
    return matchedDisallowedRuntimes(content).length > 0;
}

// ---------------------------------------------------------------------------
// Predicate: motion values imported only from the token source (Req 8.3 / 17.7)
// ---------------------------------------------------------------------------

/**
 * A motion-vocabulary token used both to spot newly-defined motion constants by
 * name and to spot motion-value bindings imported from a non-token module.
 */
const MOTION_VOCAB_RE = /(?:^|[^A-Za-z])(?:ease|easing|duration|durations|spring|stagger|transition|transitions|motiontoken|motiontokens)(?:$|[^A-Za-z])/i;

/**
 * Newly-defined motion constants: a `const`/`let`/`var` whose name carries
 * motion vocabulary, or an inline `cubic-bezier(...)` easing literal. Either
 * indicates a motion value defined in-place instead of imported from
 * `@/lib/motion`.
 */
function definesNewMotionConstant(content: string): boolean {
    const declRe = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)/g;
    let match: RegExpExecArray | null;
    while ((match = declRe.exec(content)) !== null) {
        const name = match[1];
        if (name !== undefined && MOTION_VOCAB_RE.test(name)) {
            return true;
        }
    }
    return /cubic-bezier\s*\(/i.test(content);
}

/**
 * A motion-value import from a module other than `@/lib/motion` and outside the
 * approved motion libraries. Detected as an import statement whose binding
 * clause carries motion vocabulary while its specifier is neither the token
 * source nor an approved motion library.
 */
function importsMotionFromElsewhere(content: string): boolean {
    const importRe = /\bimport\s+([^;'"]+?)\s+from\s*["']([^"']+)["']/g;
    let match: RegExpExecArray | null;
    while ((match = importRe.exec(content)) !== null) {
        const clause = match[1] ?? "";
        const specifier = match[2] ?? "";
        const approved = APPROVED_MOTION_MODULES.some((mod) =>
            specifierMatchesPackage(specifier, mod)
        );
        if (approved) {
            continue;
        }
        if (MOTION_VOCAB_RE.test(clause)) {
            return true;
        }
    }
    return false;
}

/**
 * True when every motion value in the source comes from `@/lib/motion`
 * (MOTION_TOKEN_SOURCE) — i.e. the source defines no new motion constants and
 * imports no motion values from any other module.
 *
 * Requirements: 8.3, 17.7
 */
export function importsMotionOnlyFromTokens(content: string): boolean {
    return !definesNewMotionConstant(content) && !importsMotionFromElsewhere(content);
}

// ---------------------------------------------------------------------------
// Predicate: placeholders (Req 8.5)
// ---------------------------------------------------------------------------

type PlaceholderKind =
    | "comment"
    | "unimplemented-body"
    | "unresolved-import";

interface PlaceholderHit {
    kind: PlaceholderKind;
    severity: Severity;
    detail: string;
}

/** Extract the text of line (`//`) and block (`/* *\/`) comments. */
function extractComments(content: string): string[] {
    const comments: string[] = [];
    const patterns: RegExp[] = [/\/\/[^\n]*/g, /\/\*[\s\S]*?\*\//g];
    for (const pattern of patterns) {
        let match: RegExpExecArray | null;
        while ((match = pattern.exec(content)) !== null) {
            comments.push(match[0]);
        }
    }
    return comments;
}

const PLACEHOLDER_COMMENT_RE = /\b(?:TODO|FIXME|XXX|HACK|PLACEHOLDER|NOT[\s-]?IMPLEMENTED|IMPLEMENT[\s-]?ME|COMING[\s-]?SOON)\b/i;

/** An unimplemented body such as `throw new Error("not implemented")`. */
const UNIMPLEMENTED_BODY_RE = /throw\s+new\s+\w*Error\s*\(\s*["'`][^"'`]*\b(?:not[\s-]?implemented|unimplemented|todo)\b[^"'`]*["'`]\s*\)/i;

/** Import specifiers that are obvious placeholders / cannot resolve. */
function isPlaceholderSpecifier(specifier: string): boolean {
    const trimmed = specifier.trim();
    if (trimmed.length === 0) {
        return true;
    }
    if (/^(?:TODO|FIXME|PLACEHOLDER)$/i.test(trimmed)) {
        return true;
    }
    if (/(?:^|\/)(?:TODO|FIXME|PLACEHOLDER)(?:\/|$)/i.test(trimmed)) {
        return true;
    }
    if (/path\/to\//i.test(trimmed) || /\byour-[\w-]+/i.test(trimmed)) {
        return true;
    }
    if (/^\.{3,}$/.test(trimmed)) {
        return true;
    }
    return false;
}

/**
 * Detect every placeholder signal in the source: placeholder comments,
 * unimplemented function bodies, and unresolved / placeholder import
 * specifiers. Comment placeholders are visible gaps (P1); an unimplemented body
 * or an unresolved import breaks the emitted component and is P0.
 */
function detectPlaceholders(content: string): PlaceholderHit[] {
    const hits: PlaceholderHit[] = [];

    for (const comment of extractComments(content)) {
        if (PLACEHOLDER_COMMENT_RE.test(comment)) {
            hits.push({
                kind: "comment",
                severity: "P1",
                detail: comment.trim(),
            });
            break;
        }
    }

    if (UNIMPLEMENTED_BODY_RE.test(content)) {
        hits.push({
            kind: "unimplemented-body",
            severity: "P0",
            detail: "throw new Error(\"not implemented\")",
        });
    }

    for (const specifier of collectModuleSpecifiers(content)) {
        if (isPlaceholderSpecifier(specifier)) {
            hits.push({
                kind: "unresolved-import",
                severity: "P0",
                detail: specifier.trim() || "(empty specifier)",
            });
        }
    }

    return hits;
}

/**
 * True when the source contains any placeholder: a TODO/FIXME/placeholder
 * comment, an unimplemented function body, or an unresolved / placeholder import
 * specifier.
 *
 * Requirements: 8.5
 */
export function hasPlaceholder(content: string): boolean {
    return detectPlaceholders(content).length > 0;
}

// ---------------------------------------------------------------------------
// Predicate: global loader / transition on the root layout (Req 8.7 / 12.5 / 17.5)
// ---------------------------------------------------------------------------

/** True when `path` is the App Router root layout (`src/app/layout.tsx`). */
function isRootLayoutPath(path: string): boolean {
    const normalized = path.replace(/\\/g, "/").toLowerCase();
    return /(^|\/)src\/app\/layout\.(?:t|j)sx?$/.test(normalized);
}

/**
 * Indicators that a global loader / page-transition system is being mounted:
 * a loader/preloader/splash/page-transition/smooth-scroll component in JSX, or
 * an import of a page-transition library. GSAP and Framer Motion primitives on
 * their own are not treated as a global system.
 */
const LOADER_COMPONENT_RE = /<\s*[A-Za-z0-9_]*(?:Loader|Preloader|Splash|IntroSequence|PageTransition|SmoothScroll|Lenis|Barba|LocomotiveScroll)[A-Za-z0-9_]*\b/;

const TRANSITION_IMPORT_RE = /\bfrom\s*["'](?:@barba\/core|barba|swup|locomotive-scroll|lenis|@studio-freight\/lenis|@studio-freight\/react-lenis|next-transition-router|@react-page-transition\/[\w-]+)["']/;

/**
 * True when the given file is the root layout AND it mounts a global loader or
 * page-transition system. Whether that constitutes a violation depends on the
 * Brief (see {@link analyzeBuild}); this predicate only reports the mounting.
 *
 * Requirements: 8.7, 12.5, 17.5
 */
export function mountsGlobalLoaderOnRootLayout(path: string, content: string): boolean {
    if (!isRootLayoutPath(path)) {
        return false;
    }
    return LOADER_COMPONENT_RE.test(content) || TRANSITION_IMPORT_RE.test(content);
}

// ---------------------------------------------------------------------------
// Forbidden-aesthetic markers (Req 17.7 — full-page WebGL / banned stacks)
// ---------------------------------------------------------------------------

/**
 * FORBIDDEN_AESTHETICS identifiers (e.g. `full-page-webgl`) that literally name
 * a banned stack/aesthetic. Their presence in emitted source is a stack
 * violation. Matched on word/segment boundaries to avoid accidental substring
 * hits.
 */
function matchedForbiddenAesthetics(content: string): string[] {
    const haystack = content.toLowerCase();
    const matched: string[] = [];
    for (const aesthetic of FORBIDDEN_AESTHETICS) {
        const needle = aesthetic.toLowerCase();
        const boundary = new RegExp(`(?:^|[^a-z0-9])${escapeRegExp(needle)}(?:$|[^a-z0-9])`);
        if (boundary.test(haystack)) {
            matched.push(aesthetic);
        }
    }
    return matched;
}

/** Escape a string for safe literal use inside a RegExp. */
function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ---------------------------------------------------------------------------
// analyzeBuild — top-level orchestration over all emitted files
// ---------------------------------------------------------------------------

/**
 * Analyze the emitted build (component + route source) and return every static
 * Finding. Pure and deterministic: the same files and options always yield the
 * same Findings with the same stable ids, so downstream de-duplication in
 * `scoring.ts` is stable.
 *
 * @param files the emitted files, each as `{ path, content }`
 * @param opts  build options; `briefRequestsGlobalLoader` permits a root-layout
 *              loader/transition when the Brief explicitly asked for one
 *
 * Requirements: 8.1, 8.3, 8.5, 8.7, 12.5, 17.5, 17.7
 */
export function analyzeBuild(
    files: { path: string; content: string }[],
    opts: AnalyzeBuildOptions = {}
): AnalyzeBuildResult {
    const findings: Finding[] = [];
    const briefRequestsGlobalLoader = opts.briefRequestsGlobalLoader === true;

    for (const { path, content } of files) {
        // Req 8.1 / 17.7 — disallowed runtime imports (stack violation → P0).
        for (const runtime of matchedDisallowedRuntimes(content)) {
            findings.push({
                id: `build-disallowed-runtime:${path}:${runtime.pkg}`,
                severity: "P0",
                dimension: DIM_STACK,
                message:
                    `Import of "${runtime.label}" (${runtime.category}) is outside the ` +
                    "approved stack (Next.js, React, Tailwind, GSAP + ScrollTrigger, " +
                    "Framer Motion, and @/lib/motion). Remove the disallowed runtime.",
                file: path,
                open: true,
            });
        }

        // Req 17.7 — a literal forbidden-aesthetic marker in emitted source.
        for (const aesthetic of matchedForbiddenAesthetics(content)) {
            findings.push({
                id: `build-forbidden-aesthetic:${path}:${aesthetic}`,
                severity: "P0",
                dimension: DIM_STACK,
                message:
                    `Emitted source references the forbidden aesthetic/stack "${aesthetic}", ` +
                    "which is excluded for Softree.",
                file: path,
                location: aesthetic,
                open: true,
            });
        }

        // Req 8.3 / 17.7 — motion tokens must come only from @/lib/motion.
        if (definesNewMotionConstant(content)) {
            findings.push({
                id: `build-motion-constant-defined:${path}`,
                severity: "P1",
                dimension: DIM_MOTION,
                message:
                    "Motion constant defined inline; motion values must be imported " +
                    `from ${MOTION_TOKEN_SOURCE} rather than redefined.`,
                file: path,
                open: true,
            });
        }
        if (importsMotionFromElsewhere(content)) {
            findings.push({
                id: `build-motion-import-elsewhere:${path}`,
                severity: "P1",
                dimension: DIM_MOTION,
                message:
                    "Motion values are imported from a module other than " +
                    `${MOTION_TOKEN_SOURCE}; import motion tokens from ${MOTION_TOKEN_SOURCE}.`,
                file: path,
                open: true,
            });
        }

        // Req 8.5 — placeholders (comments P1; unimplemented body / unresolved
        // import P0).
        for (const hit of detectPlaceholders(content)) {
            findings.push({
                id: `build-placeholder:${hit.kind}:${path}:${hit.detail}`,
                severity: hit.severity,
                dimension: DIM_STACK,
                message: placeholderMessage(hit),
                file: path,
                location: hit.detail,
                open: true,
            });
        }

        // Req 8.7 / 12.5 / 17.5 — global loader / transition on the root layout
        // without an explicit Brief request.
        if (
            !briefRequestsGlobalLoader &&
            mountsGlobalLoaderOnRootLayout(path, content)
        ) {
            findings.push({
                id: `build-root-layout-hijack:${path}`,
                severity: "P0",
                dimension: DIM_STACK,
                message:
                    "A global loader or page-transition framework is mounted on " +
                    "src/app/layout.tsx without an explicit Brief request; confine " +
                    "motion to the page scope and do not hijack the root layout.",
                file: path,
                open: true,
            });
        }
    }

    return { findings };
}

// ---------------------------------------------------------------------------
// Intro-loader timing + session-once suppression (Req 8.8 / 8.9)
// ---------------------------------------------------------------------------

/**
 * Maximum time (ms) a skip control may take to dismiss the intro loader once
 * activated. The Builder must dismiss the loader within this budget (Req 8.8).
 */
export const LOADER_SKIP_DISMISS_MAX_MS = 100;

/**
 * Maximum time (ms) the intro loader may remain before it auto-dismisses on its
 * own. The Builder must auto-dismiss within this budget (Req 8.8).
 */
export const LOADER_AUTO_DISMISS_MAX_MS = 3000;

/**
 * The timing + scope contract a Builder-produced intro loader must satisfy when
 * the Brief requests one (Req 8.8 / 8.9). This is a specification of the emitted
 * loader's behavior, not a runtime object — the validator below checks a
 * declared config against the fixed budgets.
 */
export interface LoaderConfig {
    /** True when the loader is scoped to the single page route (Req 8.8). */
    scopedToRoute: boolean;
    /** True when the loader exposes a skip control (Req 8.8). */
    hasSkipControl: boolean;
    /** Time (ms) the skip control takes to dismiss the loader (Req 8.8). */
    skipDismissMs: number;
    /** Time (ms) after which the loader auto-dismisses (Req 8.8). */
    autoDismissMs: number;
    /**
     * True when a repeat visit within the same browser session suppresses the
     * loader and renders the final state immediately (Req 8.9).
     */
    suppressOnRepeatVisit: boolean;
}

/**
 * Validate a declared intro-loader config against the Builder contract. Pure
 * and deterministic: returns one stable Finding per violated rule and an empty
 * array for a fully-conformant config.
 *
 * Rules (all P0 — a loader that overruns its budget or fails to suppress on a
 * repeat visit breaks the brand/perf contract, Req 17.8):
 * - Req 8.8 — the loader is scoped to the single page route.
 * - Req 8.8 — a skip control exists and dismisses within
 *   `LOADER_SKIP_DISMISS_MAX_MS` (100ms). A non-finite or negative value is
 *   itself a violation.
 * - Req 8.8 — the loader auto-dismisses within `LOADER_AUTO_DISMISS_MAX_MS`
 *   (3000ms). A non-finite or negative value is itself a violation.
 * - Req 8.9 — a repeat visit within the same session suppresses the loader and
 *   renders the final state immediately.
 *
 * Requirements: 8.8, 8.9
 */
export function validateLoaderConfig(config: LoaderConfig): Finding[] {
    const findings: Finding[] = [];

    // Req 8.8 — scope to the single page route.
    if (!config.scopedToRoute) {
        findings.push({
            id: "loader-scope-not-route",
            severity: "P0",
            dimension: DIM_STACK,
            message:
                "Intro loader is not scoped to the single page route; confine the " +
                "loader to the page instead of mounting it globally.",
            open: true,
        });
    }

    // Req 8.8 — a skip control must exist.
    if (!config.hasSkipControl) {
        findings.push({
            id: "loader-no-skip-control",
            severity: "P0",
            dimension: DIM_STACK,
            message:
                "Intro loader provides no skip control; the loader must offer a skip " +
                "control that dismisses it within " +
                `${LOADER_SKIP_DISMISS_MAX_MS}ms.`,
            open: true,
        });
    }

    // Req 8.8 — skip control must dismiss within the budget.
    if (!isWithinBudget(config.skipDismissMs, LOADER_SKIP_DISMISS_MAX_MS)) {
        findings.push({
            id: "loader-skip-dismiss-over-budget",
            severity: "P0",
            dimension: DIM_STACK,
            message:
                `Skip control dismisses the loader in ${config.skipDismissMs}ms, ` +
                `over the ${LOADER_SKIP_DISMISS_MAX_MS}ms budget (Req 8.8).`,
            location: `${config.skipDismissMs}ms`,
            open: true,
        });
    }

    // Req 8.8 — loader must auto-dismiss within the budget.
    if (!isWithinBudget(config.autoDismissMs, LOADER_AUTO_DISMISS_MAX_MS)) {
        findings.push({
            id: "loader-auto-dismiss-over-budget",
            severity: "P0",
            dimension: DIM_STACK,
            message:
                `Loader auto-dismisses in ${config.autoDismissMs}ms, over the ` +
                `${LOADER_AUTO_DISMISS_MAX_MS}ms budget (Req 8.8).`,
            location: `${config.autoDismissMs}ms`,
            open: true,
        });
    }

    // Req 8.9 — repeat visit within the session must suppress the loader.
    if (!config.suppressOnRepeatVisit) {
        findings.push({
            id: "loader-no-session-once-suppression",
            severity: "P0",
            dimension: DIM_STACK,
            message:
                "Intro loader is not suppressed on a repeat visit within the same " +
                "session; a repeat visit must render the final state immediately " +
                "(Req 8.9).",
            open: true,
        });
    }

    return findings;
}

/**
 * True when `value` is a finite, non-negative duration within `maxMs`
 * (inclusive). A negative, NaN, or Infinite value is never within budget.
 */
function isWithinBudget(value: number, maxMs: number): boolean {
    return Number.isFinite(value) && value >= 0 && value <= maxMs;
}

/**
 * Resolve whether the Builder-produced intro loader should be shown for a given
 * visit. When the loader has already been shown earlier in the same browser
 * session and the config suppresses repeat visits, the loader is skipped and
 * the page renders its final state immediately (Req 8.9). Pure function of its
 * inputs.
 *
 * Requirements: 8.9
 */
export function shouldShowIntroLoader(
    config: LoaderConfig,
    alreadyShownThisSession: boolean
): boolean {
    if (alreadyShownThisSession && config.suppressOnRepeatVisit) {
        return false;
    }
    return true;
}

/** Human-readable message for a placeholder hit. */
function placeholderMessage(hit: PlaceholderHit): string {
    switch (hit.kind) {
        case "comment":
            return `Placeholder comment found ("${hit.detail}"); emitted code must not contain TODO/FIXME/placeholder comments.`;
        case "unimplemented-body":
            return "Unimplemented function body found; every emitted function must have a real implementation.";
        case "unresolved-import":
            return `Unresolved / placeholder import specifier "${hit.detail}"; imports must resolve to real modules.`;
    }
}
