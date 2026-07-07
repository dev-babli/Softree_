'use client';

import { Children, useEffect, useRef, type ReactNode } from 'react';
// Type-only imports: erased at build time, so the Swiper 12 runtime is never
// pulled into the route's eager First Load JS bundle. The runtime itself is
// loaded lazily via a dynamic `import('swiper')` (see the effect below) once the
// host is ready to mount (Req 27.8).
import type { Swiper as SwiperInstance } from 'swiper';
import type { SwiperModule, SwiperOptions } from 'swiper/types';

/**
 * Props for {@link SoftreeSwiperWrapper}.
 */
export interface SoftreeSwiperWrapperProps {
    /**
     * The slide content. May be a single node or an array of nodes; each entry
     * is wrapped in a `.swiper-slide` element in source DOM order so the server
     * HTML matches `Swiper`'s expected `.swiper > .swiper-wrapper > .swiper-slide`
     * structure (no hydration mismatch — Req 26.4, 27.8).
     */
    readonly slides: ReactNode[] | ReactNode;
    /**
     * The Swiper configuration, applied **verbatim** from the supplied data
     * (sections pass Source_Document-derived configs). Combined with `modules`
     * when the instance is constructed.
     */
    readonly config: SwiperOptions;
    /**
     * The Swiper modules (`Navigation`, `Pagination`, `Autoplay`, `FreeMode`, …)
     * imported from `swiper/modules`, applied **verbatim**. When provided this
     * overrides any `modules` already present on `config`.
     */
    readonly modules?: readonly SwiperModule[];
    /** Extra class appended to the `.swiper` root element. */
    readonly className?: string;
    /** Extra class appended to the `.swiper-wrapper` element. */
    readonly wrapperClassName?: string;
    /** Extra class appended to every `.swiper-slide` element. */
    readonly slideClassName?: string;
    /** Accessible name applied to the `.swiper` root region, when provided. */
    readonly ariaLabel?: string;
    /** Optional `id` applied to the `.swiper` root element. */
    readonly id?: string;
    /**
     * Document-offset threshold (in CSS pixels) below scroll position 0 that
     * decides eager vs. lazy mount. When the host's initial vertical document
     * offset is greater than this value, the Swiper runtime is gated behind an
     * `IntersectionObserver`; otherwise it mounts eagerly after hydration.
     * Defaults to `844` — the Mobile Reference_Viewport height / mobile fold
     * (Req 27.8).
     */
    readonly mountThresholdPx?: number;
    /**
     * Pre-fetch margin for the lazy-mount `IntersectionObserver`: the runtime
     * begins loading once the host is within this distance of the viewport.
     * Defaults to `'200px'` (Req 27.6, 27.8).
     */
    readonly preMountMargin?: string;
    /**
     * Invoked once with the live `Swiper` instance immediately after it is
     * constructed, so sections can imperatively drive it (Industry_Tabs tab
     * swap, Testimonials pause-on-hover / autoplay control, navigation, …). Not
     * called when the instance fails to construct.
     */
    readonly onSwiper?: (swiper: SwiperInstance) => void;
}

/**
 * Default mount threshold: the Mobile Reference_Viewport height (Req 27.8). A
 * behavioural constant of this primitive's own contract, not a Source_Document
 * style value, so it is intentionally not a Design_Token.
 */
const DEFAULT_MOUNT_THRESHOLD_PX = 844;

/**
 * Default pre-fetch margin for the lazy-mount observer (Req 27.6, 27.8). Like
 * {@link DEFAULT_MOUNT_THRESHOLD_PX} this is a behavioural constant of the
 * lazy-loading contract, not a Source_Document style value.
 */
const DEFAULT_PRE_MOUNT_MARGIN = '200px';

/**
 * `SoftreeSwiperWrapper` — the shared Swiper 12 carousel primitive used by the
 * Industry_Tabs logo marquees (Req 7.6) and the Testimonials slider (Req 10.2).
 *
 * ## Chosen approach — imperative Swiper core (not `swiper/react`)
 *
 * This primitive renders the SSR-safe skeleton DOM itself
 * (`.swiper > .swiper-wrapper > .swiper-slide*`) and then imperatively
 * constructs the carousel with `new Swiper(rootEl, { ...config, modules })`
 * after mount. The core `Swiper` class is pulled in via a **dynamic
 * `import('swiper')`** rather than a static import, and `swiper/react` is
 * intentionally avoided. This was chosen over `<Swiper>`/`<SwiperSlide>` for two
 * reasons:
 *
 * 1. **Full SSR-skeleton control (Req 26.4, 27.8).** The server emits the exact
 *    `.swiper`/`.swiper-wrapper`/`.swiper-slide` markup (plus optional default
 *    navigation/pagination elements) so static screenshots and JS-disabled
 *    rendering succeed and there is no hydration mismatch. `Swiper` then
 *    initialises against this existing DOM.
 * 2. **Lazy runtime (Req 27.6, 27.8).** A dynamic `import()` keeps the Swiper
 *    runtime out of the route's eager First Load JS bundle, so the load can be
 *    gated on viewport proximity for below-fold sliders.
 *
 * ## Mount strategy (Req 27.8)
 *
 * On mount the primitive measures the host's vertical **document offset**
 * (`getBoundingClientRect().top + window.scrollY`):
 *
 * - **Host first appears more than `mountThresholdPx` (default 844 px) below
 *   scroll position 0** → the runtime import + `new Swiper(...)` is gated behind
 *   an `IntersectionObserver` with `rootMargin: preMountMargin` (default
 *   `'200px'`); nothing loads until the host approaches the viewport.
 * - **Otherwise (above the fold)** → the runtime is imported and the instance
 *   mounts eagerly right after hydration.
 *
 * Either way the runtime stays code-split behind the dynamic import. Where
 * `IntersectionObserver` is unavailable, the instance mounts immediately so the
 * slider still works.
 *
 * ## Cleanup
 *
 * On unmount (or when `config` / `modules` / the thresholds change) the effect
 * disconnects the observer and calls `swiper.destroy(true, true)`. Every async
 * failure path (dynamic import rejection, constructor throw) is swallowed so the
 * primitive emits zero unhandled errors — the SSR skeleton remains as a graceful
 * fallback.
 *
 * Consumers should pass stable `config` / `modules` references (the section data
 * fixtures export them as module-level constants) to avoid needless re-init; the
 * `onSwiper` callback is read through a ref so its identity may change freely.
 *
 * Requirements: 7.6, 10.2, 26.4, 27.6, 27.8
 */
export function SoftreeSwiperWrapper({
    slides,
    config,
    modules,
    className,
    wrapperClassName,
    slideClassName,
    ariaLabel,
    id,
    mountThresholdPx = DEFAULT_MOUNT_THRESHOLD_PX,
    preMountMargin = DEFAULT_PRE_MOUNT_MARGIN,
    onSwiper,
}: SoftreeSwiperWrapperProps): React.JSX.Element {
    const rootRef = useRef<HTMLDivElement | null>(null);

    // Read `onSwiper` through a ref so a changing callback identity does not
    // re-run the mount effect (and tear down / recreate the live instance).
    const onSwiperRef = useRef(onSwiper);
    useEffect(() => {
        onSwiperRef.current = onSwiper;
    }, [onSwiper]);

    useEffect(() => {
        const root = rootRef.current;

        // Guard non-browser environments and the case where the root has not
        // been rendered yet — there is nothing to mount onto.
        if (typeof window === 'undefined' || root === null) {
            return;
        }

        // `disposed` flips on cleanup; it guards the async dynamic-import
        // callback from constructing an instance after the component unmounts.
        let disposed = false;
        let swiper: SwiperInstance | null = null;
        let observer: IntersectionObserver | null = null;

        // Begins the (single) lazy mount: import the runtime and construct the
        // Swiper instance against the already-rendered skeleton DOM.
        const mount = (): void => {
            if (disposed || swiper !== null) {
                return;
            }

            import('swiper')
                .then(({ Swiper }) => {
                    if (disposed || rootRef.current === null) {
                        return;
                    }
                    try {
                        swiper = new Swiper(rootRef.current, {
                            // `config` is applied verbatim from the supplied
                            // data; `modules`, when provided, is applied verbatim
                            // and overrides any `modules` already on `config`.
                            ...config,
                            ...(modules ? { modules: [...modules] } : {}),
                        });
                        onSwiperRef.current?.(swiper);
                    } catch {
                        // Constructor threw: leave the SSR skeleton in place as a
                        // graceful fallback (Req 26.4) and emit no unhandled error.
                    }
                })
                .catch(() => {
                    // Dynamic import failed (network / chunk error): keep the
                    // skeleton; returning a handled rejection avoids an unhandled
                    // promise rejection.
                });
        };

        // Decide eager vs. lazy mount from the host's initial document offset
        // (Req 27.8): a host that first appears more than `mountThresholdPx`
        // below scroll position 0 is gated behind the pre-fetch observer.
        const documentOffsetTop =
            root.getBoundingClientRect().top + window.scrollY;
        const isBelowFold = documentOffsetTop > mountThresholdPx;

        if (isBelowFold && typeof IntersectionObserver === 'function') {
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
                { rootMargin: preMountMargin },
            );
            observer.observe(root);
        } else {
            // Above the fold (or no IntersectionObserver support): mount eagerly
            // after hydration.
            mount();
        }

        return () => {
            disposed = true;
            if (observer !== null) {
                observer.disconnect();
                observer = null;
            }
            if (swiper !== null) {
                try {
                    swiper.destroy(true, true);
                } catch {
                    // Swallow teardown errors: destroy must never throw.
                }
                swiper = null;
            }
        };
    }, [config, modules, mountThresholdPx, preMountMargin]);

    // Normalise slides to a stable, keyed array and wrap each entry in the
    // source `.swiper-slide` element.
    const slideNodes = Children.toArray(slides);
    const slideClasses = slideClassName
        ? `swiper-slide ${slideClassName}`
        : 'swiper-slide';

    const rootClasses = className ? `swiper ${className}` : 'swiper';
    const wrapperClasses = wrapperClassName
        ? `swiper-wrapper ${wrapperClassName}`
        : 'swiper-wrapper';

    // Render the source default navigation / pagination elements only when the
    // config requests them via the boolean shorthand (`navigation: true` /
    // `pagination: true`), which is when Swiper targets its default
    // `.swiper-button-*` / `.swiper-pagination` selectors. When these options are
    // objects with custom `el` / `nextEl` / `prevEl`, the consuming section owns
    // those elements (often outside the `.swiper` root), so they are not emitted
    // here.
    const showDefaultNavigation = config.navigation === true;
    const showDefaultPagination = config.pagination === true;

    return (
        <div ref={rootRef} id={id} className={rootClasses} aria-label={ariaLabel}>
            <div className={wrapperClasses}>
                {slideNodes.map((slide, index) => (
                    <div key={index} className={slideClasses}>
                        {slide}
                    </div>
                ))}
            </div>
            {showDefaultNavigation && (
                <>
                    <div className="swiper-button-prev" />
                    <div className="swiper-button-next" />
                </>
            )}
            {showDefaultPagination && <div className="swiper-pagination" />}
        </div>
    );
}
