'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { durations, easings } from '../tokens';
import { useReducedMotion } from './use-reduced-motion';

/**
 * Registers GSAP `ScrollTrigger`s for every scroll-reveal attribute declared in
 * Source_Document and replays the exact entrance transitions the source CSS
 * declares for them.
 *
 * Source_Document drives these reveals purely through CSS transitions that are
 * released when the `ready` class lands on `<html>`:
 *
 * ```css
 * [data-anim-rotate],
 * [data-anim],
 * .data-anim,
 * [data-anim-scale],
 * [data-stagger] > * {
 *   transition: opacity 1.25s var(--ease), transform 1.25s var(--ease);
 * }
 * html:not(.ready) [data-anim],
 * html:not(.ready) [data-stagger] > * { opacity: 0; transform: translate3d(0, 0.75rem, 0); }
 * html:not(.ready) [data-anim-scale]      { opacity: 0; transform: scale(0.5); }
 * html:not(.ready) [data-anim-rotate]     { opacity: 0; transform: rotate(-4deg); }
 * html:not(.ready) [data-anim-hero-image] { transform: rotate(-4deg) scale(1.1); }
 * ```
 *
 * where `--ease` is `cubic-bezier(0.22, 0.6, 0.36, 1)`. This hook reproduces
 * those declarations one-to-one: the duration (`1.25s`) and easing come from
 * `tokens.durations` / `tokens.easings`, the from/to opacity and transform
 * values mirror the rules above exactly, and each element is revealed when its
 * top edge crosses 95% of the viewport (`start: "top 95%"`) a single time
 * (`once: true`) — never replaying on subsequent scroll passes (Req 19.6–19.9).
 *
 * The transition itself is driven by the CSS `transition` property applied to
 * each element inline, so the duration and easing are honoured precisely; the
 * ScrollTrigger only flips the element from its `from` state to its `to` state.
 *
 * When Reduced_Motion is true (Req 19.12): no ScrollTriggers are registered;
 * every matching element is snapped to its final post-animation state on mount
 * within a single animation frame, with no transition.
 *
 * Requirements: 19.4, 19.6, 19.7, 19.8, 19.9, 19.10, 19.12
 */

/** Entrance duration declared in Source_Document (`1.25s`), read from tokens. */
const ENTRANCE_DURATION = durations.d1p25s;

/** Entrance easing declared in Source_Document (`--ease`), read from tokens. */
const ENTRANCE_EASING = easings.animLong;

/** ScrollTrigger `start` declared in Source_Document for every reveal. */
const SCROLL_TRIGGER_START = 'top 95%';

/** Default per-child stagger step (ms) when `[data-stagger]` carries no numeric value. */
const DEFAULT_STAGGER_STEP_MS = 100;

/** The animatable inline-style properties a reveal can touch. */
type EntranceState = {
    readonly opacity?: string;
    readonly transform?: string;
};

interface EntranceConfig {
    /** The attribute selector this reveal binds to. */
    readonly selector: string;
    /**
     * `self` animates each matched element; `children` animates the direct
     * children of each matched element (mirrors the `[data-stagger] > *` rule).
     */
    readonly target: 'self' | 'children';
    /** Pre-reveal state (matches the `html:not(.ready)` declarations). */
    readonly from: EntranceState;
    /** Post-reveal state. */
    readonly to: EntranceState;
    /** CSS properties that participate in the transition. */
    readonly transitionProps: readonly ('opacity' | 'transform')[];
}

/**
 * One config per `data-anim*` / `data-stagger` selector, mirroring the
 * Source_Document entrance declarations verbatim.
 */
const ENTRANCE_CONFIGS: readonly EntranceConfig[] = [
    {
        selector: '[data-anim]',
        target: 'self',
        from: { opacity: '0', transform: 'translate3d(0, 0.75rem, 0)' },
        to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        transitionProps: ['opacity', 'transform'],
    },
    {
        selector: '[data-stagger]',
        target: 'children',
        from: { opacity: '0', transform: 'translate3d(0, 0.75rem, 0)' },
        to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        transitionProps: ['opacity', 'transform'],
    },
    {
        selector: '[data-anim-scale]',
        target: 'self',
        from: { opacity: '0', transform: 'scale(0.5)' },
        to: { opacity: '1', transform: 'scale(1)' },
        transitionProps: ['opacity', 'transform'],
    },
    {
        selector: '[data-anim-rotate]',
        target: 'self',
        from: { opacity: '0', transform: 'rotate(-4deg)' },
        to: { opacity: '1', transform: 'rotate(0deg)' },
        transitionProps: ['opacity', 'transform'],
    },
    {
        // No opacity change for the hero image — only rotation + scale (Req 19.9).
        selector: '[data-anim-hero-image]',
        target: 'self',
        from: { transform: 'rotate(-4deg) scale(1.1)' },
        to: { transform: 'rotate(0deg) scale(1)' },
        transitionProps: ['transform'],
    },
];

/** A single element queued for reveal, with its config and stagger offset. */
interface RevealEntry {
    readonly el: HTMLElement;
    readonly config: EntranceConfig;
    readonly staggerDelayMs: number;
}

function applyState(el: HTMLElement, state: EntranceState): void {
    if (state.opacity !== undefined) {
        el.style.opacity = state.opacity;
    }
    if (state.transform !== undefined) {
        el.style.transform = state.transform;
    }
}

function buildTransition(props: readonly string[]): string {
    return props.map((prop) => `${prop} ${ENTRANCE_DURATION} ${ENTRANCE_EASING}`).join(', ');
}

/**
 * Resolves the per-child stagger step for a `[data-stagger]` container, matching
 * the Source_Document `handleStagger` logic: a numeric `data-stagger` value
 * greater than 1 is used as the step (ms); otherwise the step defaults to 100ms.
 */
function resolveStaggerStep(container: HTMLElement): number {
    const raw = Number(container.getAttribute('data-stagger'));
    return Number.isFinite(raw) && raw > 1 ? raw : DEFAULT_STAGGER_STEP_MS;
}

/** Builds the flat list of elements to reveal from the live DOM. */
function collectRevealEntries(): RevealEntry[] {
    const entries: RevealEntry[] = [];

    for (const config of ENTRANCE_CONFIGS) {
        const matches = Array.from(document.querySelectorAll<HTMLElement>(config.selector));

        for (const match of matches) {
            if (config.target === 'children') {
                const step = resolveStaggerStep(match);
                let delay = 0;
                for (const child of Array.from(match.children)) {
                    if (child instanceof HTMLElement) {
                        entries.push({ el: child, config, staggerDelayMs: delay });
                        delay += step;
                    }
                }
                continue;
            }

            // `[data-anim]` elements nested inside a `[data-stagger]` are revealed
            // as that container's children — skip them here to avoid double work.
            if (config.selector === '[data-anim]' && match.closest('[data-stagger]') !== null) {
                continue;
            }

            entries.push({ el: match, config, staggerDelayMs: 0 });
        }
    }

    return entries;
}

/**
 * Registers scroll-reveal `ScrollTrigger`s for the current page on mount and
 * tears them down on unmount. Safe to call from any client component; it runs
 * independently of Lenis and refreshes ScrollTrigger after registration.
 */
export function useScrollTriggers(): void {
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return;
        }

        const entries = collectRevealEntries();

        // Reduced_Motion (Req 19.12): no triggers; snap to the final state within
        // a single animation frame.
        if (prefersReducedMotion) {
            const rafId = window.requestAnimationFrame(() => {
                for (const { el, config } of entries) {
                    el.style.transition = 'none';
                    el.style.transitionDelay = '0s';
                    applyState(el, config.to);
                }
            });

            return () => window.cancelAnimationFrame(rafId);
        }

        gsap.registerPlugin(ScrollTrigger);

        // Seed each element with its pre-reveal state + the exact source transition.
        for (const { el, config, staggerDelayMs } of entries) {
            applyState(el, config.from);
            el.style.transition = buildTransition(config.transitionProps);
            if (staggerDelayMs > 0) {
                el.style.transitionDelay = `${staggerDelayMs}ms`;
            }
        }

        // Force a style/layout flush so above-the-fold elements animate from their
        // seeded `from` state when their trigger fires during the initial refresh.
        void document.documentElement.offsetHeight;

        const triggers = entries.map(({ el, config }) =>
            ScrollTrigger.create({
                trigger: el,
                start: SCROLL_TRIGGER_START,
                once: true,
                onEnter: () => applyState(el, config.to),
            }),
        );

        ScrollTrigger.refresh();

        return () => {
            for (const trigger of triggers) {
                trigger.kill();
            }
        };
    }, [prefersReducedMotion]);
}
