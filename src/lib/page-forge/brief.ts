/**
 * Page Forge — Brief capture and normalization (`brief.ts`).
 *
 * `normalizeBrief` is the single source of truth for Brief validation
 * (Req 2.2–2.6): it clamps the pass threshold and Max_Loops into their valid
 * ranges (falling back to defaults and recording rejections for out-of-range
 * values), marks every unsupplied field as absent, computes the set of missing
 * required fields (route / slug / content source), and captures the Sacred_UI
 * preservation list.
 *
 * The function is pure: given the same `BriefInput` it always returns the same
 * `Brief`, and it never performs IO. The Orchestrator consumes `missingRequired`
 * to drive the consolidated question flow (Req 2.7–2.9, 1.5).
 *
 * Requirements: 2.2, 2.3, 2.4, 2.5, 2.6
 */

import { SACRED_UI } from "./constraints";
import type {
    Brief,
    BriefInput,
    FieldState,
    RangeRejection,
    RequiredField,
} from "./types";

// ---------------------------------------------------------------------------
// Defaults and valid ranges (Req 2.4, 2.5, 2.6)
// ---------------------------------------------------------------------------

/** Default Pass_Gate overall minimum when no in-range threshold is supplied. */
export const DEFAULT_THRESHOLD = 8.5;

/** Default Max_Loops before escalation when no in-range value is supplied. */
export const DEFAULT_MAX_LOOPS = 4;

/** Valid inclusive range for the pass threshold (Req 2.4). */
export const THRESHOLD_RANGE = { min: 0.0, max: 10.0 } as const;

/** Valid inclusive range for Max_Loops; the value must also be an integer (Req 2.5). */
export const MAX_LOOPS_RANGE = { min: 1, max: 10 } as const;

/**
 * The Brief fields that must be supplied before advancing past the Brief phase
 * (Req 1.5, 2.8). Absent members of this set populate `Brief.missingRequired`.
 */
export const REQUIRED_FIELDS = ["route", "slug", "contentSource"] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Wraps a possibly-undefined input value in a `FieldState`. A supplied value
 * (anything other than `undefined`) is marked present; an absent value is
 * marked `{ present: false }` (Req 2.2).
 */
function fieldState<T>(value: T | undefined): FieldState<T> {
    if (value === undefined) {
        return { present: false };
    }
    return { present: true, value };
}

/** True when `n` is a finite number (guards against NaN/Infinity). */
function isFiniteNumber(n: number | undefined): n is number {
    return typeof n === "number" && Number.isFinite(n);
}

// ---------------------------------------------------------------------------
// normalizeBrief (Req 2.2–2.6)
// ---------------------------------------------------------------------------

/**
 * Normalize a raw `BriefInput` into a validated `Brief`.
 *
 * Threshold (Req 2.4, 2.6): when supplied and within `[0.0, 10.0]` the supplied
 * value is used; otherwise it falls back to `DEFAULT_THRESHOLD` (8.5) and a
 * `RangeRejection` is recorded.
 *
 * Max_Loops (Req 2.5, 2.6): when supplied and an integer within `[1, 10]` the
 * supplied value is used; otherwise it falls back to `DEFAULT_MAX_LOOPS` (4) and
 * a `RangeRejection` is recorded. Non-integer supplied values are out of range.
 *
 * Fields (Req 2.2): each of route, slug, pageKind, audience, and contentSource
 * becomes a `FieldState`. `references` defaults to `[]` when absent.
 *
 * Missing required (Req 2.8): the subset of `REQUIRED_FIELDS` that is absent.
 *
 * Sacred_UI (Req 2.3): `input.mustPreserve` when supplied, else the default
 * `SACRED_UI` list.
 */
export function normalizeBrief(input: BriefInput): Brief {
    const rejections: RangeRejection[] = [];

    // --- Threshold clamping (Req 2.4, 2.6) ---
    let threshold = DEFAULT_THRESHOLD;
    if (input.threshold !== undefined) {
        const supplied = input.threshold;
        if (
            isFiniteNumber(supplied) &&
            supplied >= THRESHOLD_RANGE.min &&
            supplied <= THRESHOLD_RANGE.max
        ) {
            threshold = supplied;
        } else {
            rejections.push({
                field: "threshold",
                suppliedValue: supplied,
                fallbackValue: DEFAULT_THRESHOLD,
            });
        }
    }

    // --- Max_Loops clamping (Req 2.5, 2.6) ---
    let maxLoops = DEFAULT_MAX_LOOPS;
    if (input.maxLoops !== undefined) {
        const supplied = input.maxLoops;
        if (
            isFiniteNumber(supplied) &&
            Number.isInteger(supplied) &&
            supplied >= MAX_LOOPS_RANGE.min &&
            supplied <= MAX_LOOPS_RANGE.max
        ) {
            maxLoops = supplied;
        } else {
            rejections.push({
                field: "maxLoops",
                suppliedValue: supplied,
                fallbackValue: DEFAULT_MAX_LOOPS,
            });
        }
    }

    // --- Field states (Req 2.2) ---
    const route = fieldState(input.route);
    const slug = fieldState(input.slug);
    const pageKind = fieldState(input.pageKind);
    const audience = fieldState(input.audience);
    const contentSource = fieldState(input.contentSource);

    // --- Missing required fields (Req 2.8) ---
    const fieldPresence: Record<RequiredField, boolean> = {
        route: route.present,
        slug: slug.present,
        contentSource: contentSource.present,
    };
    const missingRequired: RequiredField[] = REQUIRED_FIELDS.filter(
        (field) => !fieldPresence[field]
    );

    // --- Sacred_UI list (Req 2.3) ---
    const sacredUi =
        input.mustPreserve !== undefined
            ? [...input.mustPreserve]
            : [...SACRED_UI];

    return {
        route,
        slug,
        pageKind,
        audience,
        contentSource,
        references: input.references !== undefined ? [...input.references] : [],
        maxLoops,
        threshold,
        rejections,
        sacredUi,
        missingRequired,
    };
}
