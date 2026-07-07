/**
 * Loader_Sequence fixture (Requirement 17.3; task 4.2).
 *
 * Source of truth for the loader timing and logo art consumed by `KoreLoader`
 * (`src/components/softree-marketing-ui/sections/softree-loader.tsx`, task 4.1).
 *
 * ── Timing ────────────────────────────────────────────────────────────────
 * Source_Document drives the loader from the inline `handleLoader({...})`
 * script (public/softree-source-sections.html, near the Lenis bootstrap):
 *
 *     handleLoader({ t0: n = 1, tLogo1: l = 700, tBetween: o = 700,
 *                    tLogo2: s = 700, tHtmlAfter: c = 250, tBotDelay: d = 450 })
 *
 * The reduced spec model (Requirement 17.3 / 17.4 / Design Property 7) collapses
 * that multi-stage script into:
 *   1. hold the first logo for a source-declared duration D ∈ [200, 2000] ms,
 *   2. cross-fade to the second logo, completing within 1000 ms,
 *   3. remove `loading`, apply `ready`, unmount.
 *
 * The source first-logo hold is `tLogo1 = 700` ms. The closest Design_Token in
 * `tokens.durations` is `dDot7s` (`.7s` = 700 ms) — an exact match — so the
 * first-logo display duration is token-bound to `durations.dDot7s` rather than
 * written as a magic literal (Requirement 17.3, Token_Coverage / Req 22.6).
 *
 * The 1000 ms cross-fade window (Requirement 17.4) is token-bound to
 * `durations.d1s` (`1s`). Both the JS hold (ms) and the CSS transition value
 * (the raw token string) derive from that single token.
 *
 * The 5000 ms force-complete safeguard (Requirement 17.8) has NO corresponding
 * leaf in `tokens.durations` (the largest sub-minute duration token is
 * `d40s`). It is therefore a documented behavioral constant local to the loader
 * contract — not a style value — and lives here in the (token-coverage
 * allowlisted) `data/` fixture layer rather than inline in the component.
 *
 * ── Logo art ──────────────────────────────────────────────────────────────
 * Source_Document only ships the loader *state* CSS rules:
 *     .loader.logo-1 > :nth-child(1) { opacity: 1 }
 *     .loader.logo-2 .kore-logo-2    { opacity: 1 }
 * The loader's own logo markup is injected/rendered outside the captured DOM,
 * so there is NO loader logo entry in `assets.ts` and no `.riv`/image URL to
 * reference. Per task 4.2 the logo refs are therefore defined inline here as
 * raw inline-SVG path data (NOTE below), reusing the Kore wordmark captured
 * verbatim from the `.nav-logo` inline `<svg viewBox="0 0 75 20">` element in
 * Source_Document. The same wordmark is used for both stages because the
 * distinct first/second loader glyphs are not present in the captured source;
 * the cross-fade machinery (Req 17.4) is preserved regardless.
 *
 * REQUIREMENTS COVERED: 17.3
 */

import { durations } from '../tokens';

// ---------------------------------------------------------------------------
// Duration token → milliseconds
// ---------------------------------------------------------------------------

/**
 * Parse a `tokens.durations` leaf (e.g. `'1s'`, `'.7s'`, `'200ms'`) into an
 * integer millisecond count. Keeps the loader timing derived from the tokens
 * rather than from hand-written numbers.
 */
function durationTokenToMs(token: string): number {
    const ms = /^(\d*\.?\d+)ms$/.exec(token);
    if (ms) return Math.round(Number.parseFloat(ms[1]));
    const s = /^(\d*\.?\d+)s$/.exec(token);
    if (s) return Math.round(Number.parseFloat(s[1]) * 1000);
    throw new Error(`loader.ts: unrecognized duration token "${token}"`);
}

// ---------------------------------------------------------------------------
// Timing (Requirement 17.3, 17.4, 17.8)
// ---------------------------------------------------------------------------

/**
 * The `tokens.durations` key the first-logo display duration is bound to.
 * `dDot7s` (`.7s` = 700 ms) is the closest token to the source `tLogo1 = 700`
 * hold — here it is an exact match.
 */
export const LOADER_FIRST_LOGO_DURATION_TOKEN = 'dDot7s' as const;

/** Raw token string for the first-logo hold (`'.7s'`). */
export const LOADER_FIRST_LOGO_DURATION = durations[LOADER_FIRST_LOGO_DURATION_TOKEN];

/**
 * First-logo display duration in milliseconds (700), token-bound to
 * `durations.dDot7s`. Lies in the spec-mandated [200, 2000] ms band
 * (Requirement 17.3 / Design Property 7).
 */
export const LOADER_FIRST_LOGO_MS = durationTokenToMs(LOADER_FIRST_LOGO_DURATION);

/** The `tokens.durations` key the cross-fade window is bound to (`d1s`). */
export const LOADER_CROSSFADE_DURATION_TOKEN = 'd1s' as const;

/**
 * Raw token string for the cross-fade transition (`'1s'`). Consumed directly as
 * the CSS `transition` duration on the stacked logo nodes so the fade completes
 * within 1000 ms (Requirement 17.4).
 */
export const LOADER_CROSSFADE_DURATION = durations[LOADER_CROSSFADE_DURATION_TOKEN];

/** Cross-fade window in milliseconds (1000), token-bound to `durations.d1s`. */
export const LOADER_CROSSFADE_MS = durationTokenToMs(LOADER_CROSSFADE_DURATION);

/**
 * Force-complete safeguard in milliseconds (Requirement 17.8).
 *
 * BEHAVIORAL CONSTANT (documented): there is no 5000 ms / 5s leaf in
 * `tokens.durations`, so this upper-bound watchdog is intentionally a literal
 * here in the fixture layer rather than a style token. If the normal sequence
 * has not completed within this window the loader force-completes
 * (remove `loading`, add `ready`, unmount) and emits no errors.
 */
export const LOADER_FORCE_COMPLETE_MS = 5000;

// ---------------------------------------------------------------------------
// Logo art (inline SVG — not in Asset_Manifest; see file header NOTE)
// ---------------------------------------------------------------------------

/**
 * A single inline-SVG logo stage. `paths` are `<path d="…">` strings rendered
 * with `fill="currentColor"`; `viewBox` matches the source `.nav-logo` glyph.
 */
export interface LoaderLogo {
    /** SVG `viewBox` copied from the source `.nav-logo` element. */
    readonly viewBox: string;
    /** Ordered `<path d>` strings copied verbatim from Source_Document. */
    readonly paths: readonly string[];
    /** Accessible title (the loader itself is decorative; used for `<title>`/alt). */
    readonly title: string;
}

/**
 * The Kore wordmark path data, captured verbatim from the Source_Document
 * `.nav-logo` inline `<svg viewBox="0 0 75 20">`. Reused for both loader stages
 * (see file header NOTE) — the distinct first/second loader glyphs are not
 * present in the captured source.
 */
const KORE_WORDMARK: LoaderLogo = {
    viewBox: '0 0 75 20',
    paths: [
        'M71.3463 4.96191H68.6133V14.707H71.3463V4.96191Z',
        'M52.5129 14.707C51.3844 14.707 50.4551 15.5988 50.4551 16.7649C50.4551 17.9309 51.3844 18.8227 52.5129 18.8227C53.6414 18.8227 54.5707 17.9309 54.5707 16.7649C54.5707 15.5988 53.6744 14.707 52.5129 14.707Z',
        'M63.413 4.99408V5.75097C62.68 5.25739 61.813 4.99408 60.7469 4.99408C58.1469 4.99408 56.0469 7.13448 56.0469 9.86662C56.0469 12.5988 58.1469 14.7061 60.7469 14.7061C61.813 14.7061 62.68 14.4098 63.413 13.9492V14.7061H66.1461V4.99316H63.413V4.99408ZM63.413 11.3483C62.813 12.1382 62.013 12.4345 61.213 12.4345C59.7799 12.4345 58.7799 11.2492 58.7799 9.86662C58.7799 8.48404 59.7799 7.26567 61.213 7.26567C61.98 7.26567 62.78 7.52898 63.413 8.35192V11.3483Z',
        'M72.0139 1.38442C73.3818 1.38442 74.4956 2.49728 74.4956 3.8661V15.8048C74.4956 17.1727 73.3827 18.2865 72.0139 18.2865H56.5137C56.6908 17.8057 56.7825 17.292 56.7825 16.7663C56.7825 15.6011 56.3449 14.5213 55.5495 13.7277C54.8715 13.0506 53.9871 12.6341 53.0192 12.5258V3.8661C53.0192 2.49819 54.132 1.38442 55.5009 1.38442H72.0148M72.0139 0.879825H55.4999C53.8513 0.879825 52.5137 2.21654 52.5137 3.8661V13.002C54.6385 13.002 56.277 14.6332 56.277 16.7653C56.277 17.5204 56.0678 18.2112 55.7082 18.7901H72.0139C73.6625 18.7901 75.0002 17.4534 75.0002 15.8039V3.86518C75.0002 2.21654 73.6635 0.878906 72.0139 0.878906V0.879825Z',
        'M8.19459 11.6085L13.0974 6.34509H8.53955L3.66334 11.6351V0.879883H0V19.0719H3.66334V16.4397L5.69456 14.2892L9.03955 19.0719H13.6497L8.19459 11.6085Z',
        'M30.6065 7.95895V6.33691H27V19.0701H30.6065V11.5939C31.6459 10.4434 33.0193 9.86723 34.9643 9.792V6.33966C33.123 6.33966 31.7212 6.9149 30.6065 7.95895Z',
        'M14.9078 8.14518C16.8931 6.19745 19.8317 5.75983 22.2932 7.03232C22.8492 7.31031 23.3657 7.70848 23.8418 8.14518C25.1923 9.45712 25.8272 11.2067 25.7474 12.9563C25.5886 11.9223 25.0721 10.9287 24.2785 10.1333C22.2134 8.06628 18.8785 8.06628 16.8133 10.1333C15.4234 11.525 15.4234 13.8306 16.8133 15.2618C17.3298 15.7783 17.9647 16.1361 18.6399 16.2554C17.2895 16.3746 15.9005 15.937 14.8674 14.904C13.0013 13.0755 13.0013 10.0535 14.828 8.225L14.8674 8.18555L14.9069 8.1461L14.9078 8.14518Z',
        'M23.8428 17.252C22.652 18.4447 21.0235 19.1208 19.3556 19.1208C17.6877 19.1208 16.0602 18.4447 14.829 17.252C13.6381 16.0593 12.9629 14.429 12.9629 12.7198V12.4015C13.1216 13.4354 13.6381 14.4685 14.4317 15.2639C15.4244 16.2575 16.7345 16.8144 18.1639 16.8144C19.3951 16.8144 20.5859 16.3768 21.4997 15.6217C21.619 15.5024 21.7777 15.3832 21.8969 15.2639L21.9364 15.2245C23.3263 13.7932 23.3263 11.5666 21.9364 10.1748C21.4602 9.69778 20.9043 9.37942 20.2685 9.2207H20.5859C21.8566 9.2207 23.008 9.73722 23.8814 10.6519C25.6282 12.4409 25.6685 15.3034 23.9612 17.1327C23.9612 17.1327 23.9612 17.1722 23.9217 17.1722L23.8419 17.252H23.8428Z',
        'M41.7558 16.0574C39.9924 16.0574 39.0677 15.1014 38.7236 13.8344C38.6365 13.539 38.5273 12.995 38.5695 12.2069C38.6576 10.5803 39.6319 8.84356 42.1062 8.84356C43.6154 8.84356 44.8907 9.38944 45.8962 10.4656C46.887 11.5262 47.3182 12.7959 47.4934 13.5014C47.5448 13.1372 47.5687 12.7693 47.565 12.4014C47.565 8.66374 45.0118 6.21875 41.5833 6.21875C37.7998 6.21875 35.2227 8.91787 35.2227 12.6519C35.2227 16.3859 37.8245 19.0648 41.6787 19.0648C44.5099 19.0648 46.7632 17.4721 47.4127 15.1482H43.787C43.4099 15.7547 42.7328 16.0583 41.7558 16.0583V16.0574Z',
        'M42.9695 9.46875C43.5888 9.84765 43.9842 10.5247 44.1081 11.4651H39.2447C39.1594 11.7816 39.1291 12.0614 39.12 12.2367C39.0879 12.8312 39.1512 13.2651 39.2135 13.533H46.9329C46.4577 11.7238 45.1907 9.85591 42.9695 9.46875Z',
    ],
    title: 'Softree',
} as const;

/**
 * Loader logo references for the two cross-fade stages.
 *
 * NOTE (task 4.2): these are inline-SVG refs, NOT `assets.ts` manifest entries
 * — the loader's logo markup does not appear in the captured Source_Document
 * (only the `.loader.logo-1` / `.loader.logo-2` state CSS does). Both stages
 * reuse the verbatim Kore wordmark from the source `.nav-logo` element.
 */
export const loaderLogos = {
    /** First stage — shown while `.loader.logo-1` is active (source: `:nth-child(1)`). */
    logo1: KORE_WORDMARK,
    /** Second stage — shown while `.loader.logo-2` is active (source: `.kore-logo-2`). */
    logo2: KORE_WORDMARK,
} as const;
