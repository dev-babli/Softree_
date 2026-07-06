/**
 * Page Forge — shared brand and stack constraints (`constraints.ts`).
 *
 * These constants are the single source of truth for the locked Softree brand
 * identity and technical stack. They are imported by the rule evaluators (so a
 * forbidden palette or a second pin becomes a Finding deterministically) and are
 * injected into every agent prompt (so the agent layer honors the same lock).
 *
 * Any phase output that violates one of these constraints is recorded as a P0
 * Finding by the checkers/validators.
 *
 * Requirements: 1.6, 8.6, 14.7, 17.1, 17.2, 17.3, 17.5, 17.7
 */

/**
 * The locked Softree palette. The color system is restricted to these tokens;
 * purple AI gradients, cyan cyberpunk palettes, and rainbow gradients are
 * excluded (Req 17.1).
 */
export const BRAND_TOKENS = {
    accent: "#FF5812",
    cream: "#f8f4ec",
    ink: ["#121417", "#141414"],
    white: "#ffffff",
} as const;

/**
 * Aesthetics that are rejected for Softree. A Design_Direction or built page
 * matching any of these is a hard violation (Req 17.1, Req 3.4).
 */
export const FORBIDDEN_AESTHETICS = [
    "purple-ai-mesh",
    "neon-cyberpunk",
    "full-page-webgl",
    "glassmorphism-everything",
    "multi-pin-scroll-hijack",
    "cyan-cyberpunk-palette",
    "rainbow-gradient",
] as const;

/**
 * Components that must not be modified unless the Brief explicitly expands
 * scope (Req 1.6, 8.6, 14.7).
 */
export const SACRED_UI = [
    "NavigationClient",
    "sticky-orange-softree-footer",
    "LightContactSection",
    "LightFAQExact",
    "Footer",
] as const;

/**
 * The only CSS properties Page_Forge is permitted to animate (Req 17.2).
 */
export const ANIMATABLE_PROPS = ["transform", "opacity"] as const;

/**
 * The maximum number of heavy ScrollTrigger pin chapters allowed per page.
 */
export const PIN_BUDGET = 1;

/**
 * The verification viewport widths, in CSS pixels.
 */
export const BREAKPOINTS = [390, 768, 1024, 1440] as const;

/**
 * The only module motion values may be imported from (Req 17.7). The Builder
 * must not define new motion constants.
 */
export const MOTION_TOKEN_SOURCE = "@/lib/motion";

/** Returns true when `char` is an ASCII alphanumeric character. */
function isAlphaNumeric(char: string | undefined): boolean {
    if (!char) {
        return false;
    }
    return /[a-z0-9]/.test(char);
}

/**
 * Finds the Sacred_UI components that a path *specifically* references.
 *
 * Matching is done against word/segment boundaries rather than as a naive
 * substring, so a Sacred_UI identifier only matches when it is delimited by a
 * non-alphanumeric character (path separator, dot, hyphen) or the string edge
 * on both sides. Hyphens *inside* an identifier such as
 * `sticky-orange-softree-footer` are treated as internal, so the identifier is
 * matched as a whole.
 *
 * When two identifiers match overlapping regions (for example the standalone
 * `Footer` occurring at the tail of `sticky-orange-softree-footer`), the shorter
 * match is discarded via a longest-/most-specific-match rule. This guarantees a
 * `sticky-orange-softree-footer` path is attributed to that component and NOT
 * also to `Footer`.
 *
 * Returns the de-duplicated list of matched Sacred_UI identifiers (in their
 * original casing).
 */
function matchedSacredComponents(path: string): string[] {
    if (!path) {
        return [];
    }
    const haystack = path.toLowerCase();

    type Match = { component: string; start: number; end: number };
    const matches: Match[] = [];

    for (const component of SACRED_UI) {
        const needle = component.toLowerCase();
        let from = 0;
        for (; ;) {
            const idx = haystack.indexOf(needle, from);
            if (idx === -1) {
                break;
            }
            const end = idx + needle.length;
            const boundedBefore = idx === 0 || !isAlphaNumeric(haystack[idx - 1]);
            const boundedAfter = end === haystack.length || !isAlphaNumeric(haystack[end]);
            if (boundedBefore && boundedAfter) {
                matches.push({ component, start: idx, end });
            }
            from = idx + 1;
        }
    }

    // Drop any match that is fully contained within a strictly longer match, so
    // the most-specific identifier wins the overlapping region.
    const specific = matches.filter(
        (m) =>
            !matches.some(
                (other) =>
                    other !== m &&
                    other.start <= m.start &&
                    other.end >= m.end &&
                    other.end - other.start > m.end - m.start
            )
    );

    return [...new Set(specific.map((m) => m.component))];
}

/**
 * Returns true when the given path references a Sacred_UI component.
 *
 * The check matches each Sacred_UI identifier against path segments / word
 * boundaries so it works for both component names (e.g.
 * `src/components/nav/NavigationClient.tsx`) and descriptive identifiers (e.g.
 * the `sticky-orange-softree-footer`). Matching is case-insensitive to guard
 * against path-casing differences, and uses a most-specific-match rule so a
 * longer identifier is never mistaken for a shorter one it happens to contain.
 *
 * Requirements: 1.6, 8.6, 14.7, 17.5
 */
export function isSacredUi(path: string): boolean {
    return matchedSacredComponents(path).length > 0;
}

/**
 * Returns true iff editing the given path is permitted with respect to the
 * Sacred_UI lock.
 *
 * Editing is permitted when either:
 *  - the path does not reference a Sacred_UI component, or
 *  - every Sacred_UI component the path specifically references appears in the
 *    Brief's expanded scope.
 *
 * The permission decision keys on the *actual* matched component(s), so a
 * co-matched but non-referenced identifier (e.g. `Footer` inside
 * `sticky-orange-softree-footer`) can never grant permission. Any edit to a
 * Sacred_UI component not listed in `expandedScope` is refused (and recorded as
 * a violation by the constraint linter).
 *
 * Requirements: 1.6, 8.6, 14.7
 */
export function isSacredEditPermitted(
    path: string,
    expandedScope: readonly string[] = []
): boolean {
    const matched = matchedSacredComponents(path);
    if (matched.length === 0) {
        return true;
    }
    const scope = new Set(expandedScope.map((scoped) => scoped.toLowerCase()));
    return matched.every((component) => scope.has(component.toLowerCase()));
}
