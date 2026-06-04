'use client';

import { useEffect, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Tracks the user's `prefers-reduced-motion` setting.
 *
 * SSR-safe: returns `false` during server render and on the initial client
 * paint, then updates inside `useEffect` after mount to reflect the real
 * `matchMedia` value. Subscribes to `change` events so the value stays in sync
 * if the user toggles their OS-level motion preference at runtime.
 *
 * Requirements: 4.9, 6.10, 8.11, 13.8, 14.9, 15.9, 17.7, 18.7, 19.12, 20.9
 *
 * @returns `true` when the user prefers reduced motion, otherwise `false`.
 */
export function useReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        // Guard non-browser environments and runtimes lacking matchMedia.
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            return;
        }

        const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);

        // Sync the initial value after mount.
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (event: MediaQueryListEvent): void => {
            setPrefersReducedMotion(event.matches);
        };

        // Modern browsers expose addEventListener; fall back to the legacy
        // addListener/removeListener API for older Safari and other engines.
        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handleChange);
            return () => {
                mediaQuery.removeEventListener('change', handleChange);
            };
        }

        mediaQuery.addListener(handleChange);
        return () => {
            mediaQuery.removeListener(handleChange);
        };
    }, []);

    return prefersReducedMotion;
}
