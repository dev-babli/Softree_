'use client';

import { useEffect, useState, type RefObject } from 'react';
// Type-only import: erased at build time, so the `@rive-app/canvas` runtime is
// never pulled into the eager bundle. The runtime itself is loaded lazily via a
// dynamic `import()` once the host canvas approaches the viewport (Req 27.6).
import type { Rive as RiveInstance } from '@rive-app/canvas';

/**
 * Lifecycle state of a single Rive_Canvas_Block:
 *
 * - `idle`    — mounted but not yet within the pre-fetch margin; runtime not loaded.
 * - `loading` — within the pre-fetch margin; runtime importing / first frame pending.
 * - `loaded`  — first frame painted (the canvas may now fade 0 → 1).
 * - `error`   — load failed or the 10 s timeout elapsed; canvas stays hidden and
 *               the poster `<img>` stays visible.
 */
export type RiveBlockStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface UseRiveBlockOptions {
    /**
     * Ref to the `<canvas>` the Rive runtime draws into. The same element is
     * observed by the `IntersectionObserver` that triggers the lazy mount, so it
     * must be rendered (even while hidden at opacity 0) before load can begin.
     */
    readonly canvasRef: RefObject<HTMLCanvasElement | null>;
    /** The `.riv` source URL (CDN passthrough) declared by `Asset_Manifest`. */
    readonly src: string;
    /** When `true`, hold the animation on its first frame instead of autoplaying. */
    readonly reducedMotion: boolean;
}

export interface UseRiveBlockResult {
    /** Current load lifecycle state; see {@link RiveBlockStatus}. */
    readonly status: RiveBlockStatus;
}

/**
 * Maximum time to wait for the first frame before falling back to the poster
 * (Req 6.9, 26.5). A behavioural constant of this hook's own contract, not a
 * Source_Document style value.
 */
const RIVE_LOAD_TIMEOUT_MS = 10_000;

/**
 * Pre-fetch margin used by the lazy-mount `IntersectionObserver`: the runtime
 * begins loading once the host canvas is within this distance of the viewport
 * (Req 27.6).
 */
const RIVE_PREFETCH_ROOT_MARGIN = '200px';

/**
 * Lazily mounts a Rive_Canvas_Block and reports its load lifecycle.
 *
 * The `@rive-app/canvas` runtime and the `.riv` asset are deferred behind a
 * dynamic `import()` that is keyed on an `IntersectionObserver` with a 200 px
 * pre-fetch margin (Req 27.6): nothing loads until the host canvas approaches
 * the viewport. Once mounting begins, the runtime's `onLoad` callback races a
 * 10 s timeout (Req 6.9, 26.5). On `onLoadError`, on timeout, or on a failed
 * dynamic import the hook resolves to `'error'`, leaving the canvas hidden so
 * the caller can keep the poster `<img>` visible. Every failure path is caught
 * — the hook emits zero unhandled errors to the console (Req 6.9, 8.10).
 *
 * When `reducedMotion` is `true` the instance is constructed with
 * `autoplay: false`, so it paints and holds its first frame rather than
 * animating (Req 6.10, 8.11).
 *
 * On unmount (or whenever `src` / `reducedMotion` changes) the hook disconnects
 * the observer, clears the timeout, and calls `rive.cleanup()` to release the
 * Wasm-backed instance.
 *
 * `'use client'`-only and SSR-safe: the effect is a no-op until it runs in the
 * browser, and the value starts at `'idle'` on the server.
 *
 * Requirements: 6.4, 6.5, 6.9, 6.10, 8.10, 8.11, 26.5, 27.6
 */
export function useRiveBlock({
    canvasRef,
    src,
    reducedMotion,
}: UseRiveBlockOptions): UseRiveBlockResult {
    const [status, setStatus] = useState<RiveBlockStatus>('idle');

    useEffect(() => {
        const canvas = canvasRef.current;

        // Guard non-browser environments and the case where the canvas has not
        // been rendered yet — there is nothing to observe or draw into.
        if (typeof window === 'undefined' || canvas === null) {
            return;
        }

        // `disposed` flips on cleanup; `settled` flips once we reach a terminal
        // state (loaded/error). Both guard async callbacks (dynamic import,
        // onLoad, onLoadError, timeout) from firing after the fact and from
        // racing each other.
        let disposed = false;
        let settled = false;
        let rive: RiveInstance | null = null;
        let timeoutId: ReturnType<typeof setTimeout> | undefined;
        let observer: IntersectionObserver | null = null;

        const clearLoadTimeout = (): void => {
            if (timeoutId !== undefined) {
                clearTimeout(timeoutId);
                timeoutId = undefined;
            }
        };

        const disposeRive = (): void => {
            if (rive !== null) {
                try {
                    rive.cleanup();
                } catch {
                    // Swallow runtime teardown errors: cleanup must never throw
                    // (Req 6.9 — zero unhandled errors).
                }
                rive = null;
            }
        };

        // Terminal: load failed or timed out. Keep the canvas hidden so the
        // poster `<img>` remains visible (Req 6.9, 8.10).
        const fail = (): void => {
            if (disposed || settled) {
                return;
            }
            settled = true;
            clearLoadTimeout();
            disposeRive();
            setStatus('error');
        };

        // Terminal: first frame painted; the caller may now fade the canvas in.
        const succeed = (): void => {
            if (disposed || settled) {
                return;
            }
            settled = true;
            clearLoadTimeout();
            setStatus('loaded');
        };

        // Begins the (single) lazy mount: import the runtime, construct the Rive
        // instance, and race its `onLoad` against the timeout.
        const mount = (): void => {
            if (disposed || settled || rive !== null) {
                return;
            }
            setStatus('loading');
            timeoutId = setTimeout(fail, RIVE_LOAD_TIMEOUT_MS);

            import('@rive-app/canvas')
                .then(({ Rive }) => {
                    if (disposed || settled) {
                        return;
                    }
                    try {
                        rive = new Rive({
                            src,
                            canvas,
                            // Reduced_Motion holds the first frame; otherwise the
                            // animation autoplays (Req 6.10, 8.11).
                            autoplay: !reducedMotion,
                            onLoad: succeed,
                            onLoadError: fail,
                        });
                    } catch {
                        // Constructor threw (e.g. unsupported runtime): fall back
                        // to the poster without surfacing an error.
                        fail();
                    }
                })
                .catch(() => {
                    // Dynamic import failed (network/chunk error): fall back to
                    // the poster. Returning a handled rejection keeps the page
                    // free of unhandled promise rejections (Req 6.9).
                    fail();
                });
        };

        // Lazy-mount trigger: load only when the canvas enters the 200 px
        // pre-fetch margin (Req 27.6). Where `IntersectionObserver` is
        // unavailable, mount immediately so the block still renders.
        if (typeof IntersectionObserver === 'function') {
            observer = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        if (entry.isIntersecting) {
                            observer?.disconnect();
                            observer = null;
                            mount();
                            break;
                        }
                    }
                },
                { rootMargin: RIVE_PREFETCH_ROOT_MARGIN },
            );
            observer.observe(canvas);
        } else {
            mount();
        }

        return () => {
            disposed = true;
            clearLoadTimeout();
            if (observer !== null) {
                observer.disconnect();
                observer = null;
            }
            disposeRive();
        };
    }, [canvasRef, src, reducedMotion]);

    return { status };
}
