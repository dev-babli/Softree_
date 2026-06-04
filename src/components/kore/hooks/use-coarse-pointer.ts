'use client';

import { useEffect, useState } from 'react';

/**
 * Detects whether the visitor's primary input is a coarse pointer with no hover
 * capability (e.g. touchscreens), via `matchMedia('(hover: none) and (pointer: coarse)')`.
 *
 * SSR-safe: returns `false` on the server (and during the initial client render)
 * and updates after mount once `window.matchMedia` is available. Subscribes to the
 * media query's `change` event, with a legacy `addListener`/`removeListener`
 * fallback for older browsers, and cleans up the subscription on unmount.
 *
 * Used to suppress the Hover_Image_Preview on touch devices (Requirement 16.5).
 *
 * @returns `true` when `(hover: none) and (pointer: coarse)` currently matches.
 */
const COARSE_POINTER_QUERY = '(hover: none) and (pointer: coarse)';

export function useCoarsePointer(): boolean {
    const [coarsePointer, setCoarsePointer] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            return;
        }

        const mediaQuery = window.matchMedia(COARSE_POINTER_QUERY);

        const update = (event: MediaQueryList | MediaQueryListEvent) => {
            setCoarsePointer(event.matches);
        };

        // Sync the value once on mount in case it changed before the listener attached.
        update(mediaQuery);

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', update);
            return () => mediaQuery.removeEventListener('change', update);
        }

        // Legacy fallback for Safari < 14 and other older browsers.
        mediaQuery.addListener(update);
        return () => mediaQuery.removeListener(update);
    }, []);

    return coarsePointer;
}
