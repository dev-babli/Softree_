// biome-ignore-all lint: GSAP scroll gallery with dynamic img layers (registry primitive)
"use client";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type CSSProperties, useMemo, useRef, useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import {
  isWindowScroller,
  observeWindowResize,
  waitForScrollerReady,
} from "@/components/ui/scroll-gallery-utils/scroll-trigger-utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MASK_HIDDEN =
  "linear-gradient(to bottom, transparent 0%, transparent 100%)";
const MASK_REVEALED = "linear-gradient(to bottom, black 0%, black 100%)";

const MASKED_IMAGE_STYLE =
  "width:100%;height:100%;object-fit:cover;transform-origin:center center;backface-visibility:hidden;mask-size:100% 100%;-webkit-mask-size:100% 100%;mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat;will-change:transform,mask-image;";

const IMAGE_CONTAINER_STYLE =
  "position:absolute;top:0;left:0;width:100%;height:100%;transform:translateZ(0);backface-visibility:hidden;";

/** Minimal layout defaults — typography and styling via `variant` or the `classNames` prop. */
const LAYOUT = {
  root: "relative h-svh w-full overflow-hidden",
  images: "absolute inset-0 h-full w-full",
  imageFrame: "absolute inset-0 h-full w-full",
  image: "h-full w-full object-cover",
  info: "absolute top-1/2 left-0 z-[2] w-full -translate-y-1/2",
  infoInner: "flex gap-8",
  prefix: "flex-1",
  title: "relative flex-[2] overflow-hidden",
  link: "flex flex-1 justify-end",
} as const;

export type ScrollGalleryVariant = "minimal" | "studio";

/** Structural-only preset for `variant="minimal"`. Override slots via the `classNames` prop. */
export const SCROLL_GALLERY_MINIMAL_CLASSES = {
  ...LAYOUT,
  prefixText: "",
  titleText: "",
  linkText: "",
} as const;

/** Deadlock Studios featured-work layout — used by `variant="studio"` or pass via the `classNames` prop. */
export const SCROLL_GALLERY_STUDIO_CLASSES = {
  root: "relative h-svh w-full overflow-hidden max-lg:h-dvh",
  images: "absolute inset-0 h-full w-full",
  imageFrame: "absolute inset-0 h-full w-full",
  image: "h-full w-full origin-center object-cover",
  info: "absolute top-1/2 left-0 z-[2] w-full -translate-y-1/2 border-white/20 border-b",
  infoInner: "flex items-center justify-between gap-4 sm:gap-8 px-5 sm:px-9",
  prefix: "flex-1 max-[1000px]:hidden",
  prefixText:
    "font-medium text-[20px] md:text-[26px] lg:text-[30px] text-white leading-none tracking-[-0.02rem] antialiased will-change-transform max-[1000px]:text-[16px]",
  title: "relative h-8 sm:h-9 lg:h-10 flex-[2] overflow-hidden max-[1000px]:h-[22px]",
  titleText:
    "font-medium text-[20px] md:text-[26px] lg:text-[30px] text-white leading-none tracking-[-0.02rem] antialiased will-change-transform [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)] max-[1000px]:text-[16px]",
  link: "flex flex-1 justify-end",
  linkText:
    "font-medium text-[18px] md:text-[22px] lg:text-[26px] text-white leading-none tracking-[-0.02rem] no-underline antialiased will-change-transform max-[1000px]:text-[15px] hover:text-[#FF5812] transition-colors",
} as const;

export interface ScrollGallerySlide {
  image: string;
  /** Per-slide CTA label. Falls back to `linkLabel`. */
  linkLabel?: string;
  title: string;
  url?: string;
  number?: string;
  tag?: string;
  description?: string;
  deliverables?: string[];
  impact?: string;
  techTags?: string[];
}

export interface ScrollGalleryTiming {
  /** Scroll padding after the last transition (vh units). @default 300 */
  finalDelay?: number;
  /** Scroll padding before the first transition (vh units). @default 300 */
  initialDelay?: number;
  /** Starting scale for the active image. @default 1.25 */
  scaleFrom?: number;
  /** Resting scale after a slide is revealed. @default 1 */
  scaleTo?: number;
  /** Multiplier for strip-mask reveal speed. @default 2 */
  stripRevealSpeed?: number;
  /** Progress within a transition before the title advances (0–1). @default 0.3 */
  titleChangeThreshold?: number;
  /** Title slide-out / slide-in duration (seconds). @default 0.3 */
  titleDuration?: number;
  /** GSAP ease for title transitions. @default "power2.out" */
  titleEase?: string;
  /** Vertical offset for title enter/exit (CSS %). @default "120%" */
  titleOffset?: string;
}

export interface ScrollGalleryClassNames {
  /** First slide img element. */
  image?: string;
  /** Image frame wrapper. */
  imageFrame?: string;
  /** Image stack wrapper. */
  images?: string;
  /** Info band wrapper. */
  info?: string;
  /** Info band inner flex row. */
  infoInner?: string;
  /** CTA link column. */
  link?: string;
  /** CTA link text. */
  linkText?: string;
  /** Prefix label column. */
  prefix?: string;
  /** Prefix label text. */
  prefixText?: string;
  /** Animated title column. */
  title?: string;
  /** Animated title text. */
  titleText?: string;
  /** Extra classes on the scroll track (embedded mode only). */
  track?: string;
}

export interface ScrollGalleryProps {
  className?: string;
  /** Per-slot class overrides. `cn()` merges after built-ins/variant preset. */
  classNames?: ScrollGalleryClassNames;
  /**
   * Use container query height (`cqh`) instead of viewport height (`svh/dvh`)
   * for embedded mode. Enable when the gallery lives inside a
   * `container-type: size` ancestor (e.g. a preview panel).
   * @default false
   */
  containerQuery?: boolean;
  /** Catalog/docs preview — CSS sticky scroll track (no GSAP pin). */
  embedded?: boolean;
  /**
   * Scroll distance per transition in embedded mode (vh units, same as `scrollPerTransition`).
   * When omitted, embedded mode auto-targets ~5 panel heights total.
   */
  embeddedScrollPerTransition?: number;
  /** Global CTA label (right column). @default "Explore" */
  linkLabel?: string;
  /** ScrollTrigger pin start. @default "top top" */
  pinStart?: string;
  /** Prefix label (left column). Set `showPrefix={false}` to hide. @default "Featured" */
  prefixLabel?: string;
  /**
   * GSAP ScrollTrigger refresh priority. Lower numbers refresh later.
   * Set below any pinned section that appears earlier in the DOM to ensure
   * their spacers are re-added before this trigger measures its position.
   * @default -1
   */
  refreshPriority?: number;
  /** Scroll container for ScrollTrigger. Defaults to `window`. */
  scroller?: Element | Window;
  /** Scroll distance in vh per slide transition. @default 1000 */
  scrollPerTransition?: number;
  /** GSAP scrub smoothing (seconds). @default 1 */
  scrub?: number;
  showInfoBand?: boolean;
  showLink?: boolean;
  showPrefix?: boolean;
  slides: ScrollGallerySlide[];
  /** Number of horizontal mask strips for the wipe transition. @default 20 */
  stripsCount?: number;
  timing?: ScrollGalleryTiming;
  /**
   * Visual preset. `studio` applies Deadlock Studios editorial styling;
   * `minimal` is structural-only (override via the `classNames` prop).
   * @default "minimal"
   */
  variant?: ScrollGalleryVariant;
}

function resolveScrollGalleryClasses(
  variant: ScrollGalleryVariant,
  classNames: ScrollGalleryClassNames | undefined,
) {
  const preset =
    variant === "studio"
      ? SCROLL_GALLERY_STUDIO_CLASSES
      : SCROLL_GALLERY_MINIMAL_CLASSES;

  return {
    rootPreset: preset.root,
    images: cn(preset.images, classNames?.images),
    imageFrame: cn(preset.imageFrame, classNames?.imageFrame),
    image: cn(preset.image, classNames?.image),
    info: cn(preset.info, classNames?.info),
    infoInner: cn(preset.infoInner, classNames?.infoInner),
    prefix: cn(preset.prefix, classNames?.prefix),
    prefixText: cn(preset.prefixText, classNames?.prefixText),
    title: cn(preset.title, classNames?.title),
    titleText: cn(preset.titleText, classNames?.titleText),
    link: cn(preset.link, classNames?.link),
    linkText: cn(preset.linkText, classNames?.linkText),
    track: classNames?.track,
  };
}

interface ResolvedTiming {
  finalDelay: number;
  initialDelay: number;
  scaleFrom: number;
  scaleRange: number;
  scaleStep: number;
  scaleTo: number;
  stripRevealSpeed: number;
  titleChangeThreshold: number;
  titleDuration: number;
  titleEase: string;
  titleOffset: string;
}

function resolveTiming(timing?: ScrollGalleryTiming): ResolvedTiming {
  const scaleFrom = timing?.scaleFrom ?? 1.25;
  const scaleTo = timing?.scaleTo ?? 1;
  const scaleRange = scaleFrom - scaleTo;

  return {
    initialDelay: timing?.initialDelay ?? 300,
    finalDelay: timing?.finalDelay ?? 300,
    titleChangeThreshold: timing?.titleChangeThreshold ?? 0.3,
    titleDuration: timing?.titleDuration ?? 0.3,
    titleEase: timing?.titleEase ?? "power2.out",
    titleOffset: timing?.titleOffset ?? "120%",
    scaleFrom,
    scaleTo,
    scaleRange,
    scaleStep: scaleRange / 2,
    stripRevealSpeed: timing?.stripRevealSpeed ?? 2,
  };
}

function getTotalScrollDistanceVh(
  slideCount: number,
  scrollPerTransition: number,
  timing: ResolvedTiming,
): number {
  const transitionCount = Math.max(0, slideCount - 1);
  return (
    transitionCount * scrollPerTransition +
    timing.initialDelay +
    timing.finalDelay
  );
}

/** ~5 preview-panel heights for catalog embedded demos (not full-page 20+ vh). */
const EMBEDDED_SCROLL_TARGET_TOTAL = 520;

function resolveEmbeddedScrollConfig(
  slideCount: number,
  scrollPerTransition: number,
  embeddedScrollPerTransition: number | undefined,
  timing: ResolvedTiming,
): { scrollPerTransition: number; timing: ResolvedTiming } {
  const embeddedTiming: ResolvedTiming = {
    ...timing,
    initialDelay: Math.min(timing.initialDelay, 50),
    finalDelay: Math.min(timing.finalDelay, 50),
  };
  const transitionCount = Math.max(0, slideCount - 1);

  if (embeddedScrollPerTransition !== undefined) {
    return {
      scrollPerTransition: embeddedScrollPerTransition,
      timing: embeddedTiming,
    };
  }

  if (transitionCount === 0) {
    return { scrollPerTransition, timing: embeddedTiming };
  }

  const padding = embeddedTiming.initialDelay + embeddedTiming.finalDelay;
  const perTransition = Math.max(
    70,
    Math.floor((EMBEDDED_SCROLL_TARGET_TOTAL - padding) / transitionCount),
  );

  return { scrollPerTransition: perTransition, timing: embeddedTiming };
}

function createStripBounds(stripsCount: number) {
  return Array.from({ length: stripsCount }, (_, j) => {
    const posFromBottom = stripsCount - j - 1;
    const step = 100 / stripsCount;
    const lower = (posFromBottom + 1) * step;
    const upper = posFromBottom * step;
    return {
      lower,
      upperGap: upper - 0.1,
      delay: (j / stripsCount) * 0.5,
    };
  });
}

function mergeIntervals(intervals: { top: number; bottom: number }[]) {
  if (!intervals.length) {
    return [];
  }
  intervals.sort((a, b) => a.top - b.top);
  const merged = [{ ...intervals[0] }];
  for (let i = 1; i < intervals.length; i++) {
    const last = merged.at(-1);
    const next = intervals[i];
    if (!last) {
      break;
    }
    if (next.top <= last.bottom) {
      last.bottom = Math.max(last.bottom, next.bottom);
    } else {
      merged.push({ ...next });
    }
  }
  return merged;
}

function buildStripMask(
  stripBounds: ReturnType<typeof createStripBounds>,
  getAdj: (j: number, bounds: (typeof stripBounds)[number]) => number,
) {
  const intervals: { top: number; bottom: number }[] = [];
  for (let j = 0; j < stripBounds.length; j++) {
    const bounds = stripBounds[j];
    const adj = Math.max(0, Math.min(1, getAdj(j, bounds)));
    if (adj <= 0) {
      continue;
    }
    const sliceHeight = bounds.lower - bounds.upperGap;
    intervals.push({
      top: bounds.lower - adj * sliceHeight,
      bottom: bounds.lower,
    });
  }
  const merged = mergeIntervals(intervals);
  if (!merged.length) {
    return MASK_HIDDEN;
  }
  const stops: string[] = [];
  let cursor = 0;
  for (const { top, bottom } of merged) {
    if (top > cursor) {
      stops.push(`transparent ${cursor}%`, `transparent ${top}%`);
    }
    stops.push(`black ${top}%`, `black ${bottom}%`);
    cursor = bottom;
  }
  if (cursor < 100) {
    stops.push(`transparent ${cursor}%`, "transparent 100%");
  }
  return `linear-gradient(to bottom, ${stops.join(", ")})`;
}

function setMaskImage(el: HTMLElement, value: string) {
  el.style.maskImage = value;
  el.style.webkitMaskImage = value;
}

function createScaleSetter(el: HTMLElement, initialScale: number) {
  const apply = (value: number) => {
    el.style.transform = `translate3d(0, 0, 0) scale(${value})`;
  };
  apply(initialScale);
  return apply;
}

function imageScaleStyle(scale: number): CSSProperties {
  return {
    backfaceVisibility: "hidden",
    transform: `translate3d(0, 0, 0) scale(${scale})`,
  };
}

export function ScrollGallery({
  slides,
  stripsCount = 20,
  scrollPerTransition = 1000,
  scrub = 1,
  pinStart = "top top",
  timing: timingProp,
  scroller: scrollerProp,
  embedded = false,
  containerQuery = false,
  embeddedScrollPerTransition,
  prefixLabel = "Featured",
  linkLabel = "Explore",
  showInfoBand = true,
  showPrefix = true,
  showLink = true,
  className,
  classNames,
  refreshPriority = -1,
  variant = "minimal",
}: ScrollGalleryProps) {
  const classes = useMemo(
    () => resolveScrollGalleryClasses(variant, classNames),
    [variant, classNames],
  );

  const resolvedTiming = useMemo(() => resolveTiming(timingProp), [timingProp]);
  const scrollConfig = useMemo(() => {
    if (!embedded) {
      return {
        scrollPerTransition,
        timing: resolvedTiming,
      };
    }

    return resolveEmbeddedScrollConfig(
      slides.length,
      scrollPerTransition,
      embeddedScrollPerTransition,
      resolvedTiming,
    );
  }, [
    embedded,
    embeddedScrollPerTransition,
    resolvedTiming,
    scrollPerTransition,
    slides.length,
  ]);
  const scrollDistanceVh = useMemo(
    () =>
      getTotalScrollDistanceVh(
        slides.length,
        scrollConfig.scrollPerTransition,
        scrollConfig.timing,
      ),
    [slides.length, scrollConfig],
  );

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const firstImgRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const exploreLinkRef = useRef<HTMLAnchorElement>(null);
  const slideImagesRef = useRef<HTMLDivElement>(null);

  const shouldAnimate = slides.length > 0;
  const displayPrefix = showInfoBand && showPrefix && Boolean(prefixLabel);
  const displayLink = showInfoBand && showLink;

  useGSAP(
    () => {
      if (!shouldAnimate) {
        return;
      }

      const scrollTriggerRoot = embedded
        ? trackRef.current
        : sectionRef.current;
      if (!scrollTriggerRoot) {
        return;
      }

      if (embedded && scrollerProp === undefined) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            "[ScrollGallery] embedded=true requires a `scroller` prop — animation will not mount without it.",
          );
        }
        return;
      }

      let disposed = false;
      let trigger: ScrollTrigger | null = null;
      let unbindResize: (() => void) | undefined;
      let resizeObserver: ResizeObserver | undefined;
      const createdContainers: HTMLDivElement[] = [];

      const mountGallery = async () => {
        const section = sectionRef.current;
        const scrollRoot = embedded ? trackRef.current : sectionRef.current;
        const slideImages = slideImagesRef.current;
        const titleElement = titleRef.current;
        const exploreLink = exploreLinkRef.current;
        const firstSlideImg = firstImgRef.current;

        if (!(section && slideImages && firstSlideImg && scrollRoot)) {
          return;
        }
        if (showInfoBand && !titleElement) {
          return;
        }
        if (displayLink && !exploreLink) {
          return;
        }

        const scroller = scrollerProp ?? window;
        await waitForScrollerReady(scroller);

        if (disposed || sectionRef.current !== section) {
          return;
        }
        if (embedded && trackRef.current !== scrollRoot) {
          return;
        }

        const titleEl = titleElement;
        const exploreLinkEl = exploreLink;
        const {
          finalDelay,
          initialDelay,
          scaleFrom,
          scaleStep,
          scaleTo,
          stripRevealSpeed,
          titleChangeThreshold,
          titleDuration,
          titleEase,
          titleOffset,
        } = scrollConfig.timing;
        const activeScrollPerTransition = scrollConfig.scrollPerTransition;

        const stripBounds = createStripBounds(stripsCount);
        const totalSlides = slides.length;
        const setFirstImgScale = createScaleSetter(firstSlideImg, scaleFrom);

        interface SlideLayer {
          img: HTMLImageElement;
          revealState: "hidden" | "animating" | "revealed";
          setScale: (v: number) => void;
          transitionIndex: number;
        }

        const slideLayers: SlideLayer[] = [];

        for (let i = 1; i < totalSlides; i++) {
          const imgContainer = document.createElement("div");
          imgContainer.style.cssText = IMAGE_CONTAINER_STYLE;

          const img = document.createElement("img");
          img.style.cssText = MASKED_IMAGE_STYLE;
          img.src = slides[i].image;
          img.alt = slides[i].title;
          img.decoding = "async";
          setMaskImage(img, MASK_HIDDEN);

          imgContainer.appendChild(img);
          slideImages.appendChild(imgContainer);
          createdContainers.push(imgContainer);

          slideLayers.push({
            transitionIndex: i - 1,
            img,
            setScale: createScaleSetter(img, scaleFrom),
            revealState: "hidden",
          });
        }

        const transitionCount = totalSlides - 1;
        const totalScrollDistance =
          transitionCount * activeScrollPerTransition +
          initialDelay +
          finalDelay;

        const transitionRanges: { startPercent: number; endPercent: number }[] =
          [];
        let pos = initialDelay;
        for (let i = 0; i < transitionCount; i++) {
          const start = pos;
          const end = start + activeScrollPerTransition;
          transitionRanges.push({
            startPercent: start / totalScrollDistance,
            endPercent: end / totalScrollDistance,
          });
          pos = end;
        }

        function calculateImageProgress(scrollProgress: number) {
          const firstRange = transitionRanges[0];
          const lastRange = transitionRanges.at(-1);
          if (!(firstRange && lastRange)) {
            return 0;
          }
          if (scrollProgress < firstRange.startPercent) {
            return 0;
          }
          if (scrollProgress > lastRange.endPercent) {
            return transitionRanges.length;
          }
          for (let i = 0; i < transitionRanges.length; i++) {
            const { startPercent, endPercent } = transitionRanges[i];
            if (
              scrollProgress >= startPercent &&
              scrollProgress <= endPercent
            ) {
              const norm =
                (scrollProgress - startPercent) / (endPercent - startPercent);
              return i + norm;
            }
          }
          return transitionRanges.length;
        }

        function getScaleForImage(
          imageIndex: number,
          currentImageIndex: number,
          progress: number,
        ) {
          const continuousProgress = currentImageIndex + progress;
          const diff = continuousProgress - imageIndex;
          if (diff <= 0) {
            return scaleFrom;
          }
          if (diff >= 2) {
            return scaleTo;
          }
          return scaleFrom - scaleStep * diff;
        }

        let currentTitleIndex = 0;
        let queuedTitleIndex: number | null = null;
        let isAnimating = false;
        let lastImageProgress = 0;

        function updateLinkForSlide(index: number) {
          if (!(displayLink && exploreLinkEl)) {
            return;
          }
          exploreLinkEl.href = slides[index].url ?? "#";
          const label = slides[index].linkLabel ?? linkLabel;
          if (label) {
            exploreLinkEl.textContent = label;
          }
        }

        function animateTitleChange(index: number, direction: "down" | "up") {
          if (!titleEl) {
            return;
          }
          if (index === currentTitleIndex) {
            return;
          }
          if (index < 0 || index >= slides.length) {
            return;
          }
          if (isAnimating) {
            queuedTitleIndex = index;
            return;
          }
          isAnimating = true;
          const offset = titleOffset;
          const outY = direction === "down" ? `-${offset}` : offset;
          const inY = direction === "down" ? offset : `-${offset}`;

          gsap.killTweensOf(titleEl);
          updateLinkForSlide(index);

          gsap.to(titleEl, {
            y: outY,
            duration: titleDuration,
            ease: titleEase,
            onComplete: () => {
              titleEl.textContent = slides[index].title;
              gsap.set(titleEl, { y: inY });
              gsap.to(titleEl, {
                y: "0%",
                duration: titleDuration,
                ease: titleEase,
                onComplete: () => {
                  currentTitleIndex = index;
                  isAnimating = false;
                  if (
                    queuedTitleIndex !== null &&
                    queuedTitleIndex !== currentTitleIndex
                  ) {
                    const next = queuedTitleIndex;
                    queuedTitleIndex = null;
                    animateTitleChange(next, direction);
                  }
                },
              });
            },
          });
        }

        function getTitleIndexForProgress(imageProgress: number) {
          const idx = Math.floor(imageProgress);
          const specific = imageProgress - idx;
          return specific >= titleChangeThreshold
            ? Math.min(idx + 1, slides.length - 1)
            : idx;
        }

        function setLayerRevealed(layer: SlideLayer) {
          if (layer.revealState === "revealed") {
            return;
          }
          setMaskImage(layer.img, MASK_REVEALED);
          layer.revealState = "revealed";
        }

        function setLayerHidden(layer: SlideLayer) {
          if (layer.revealState === "hidden") {
            return;
          }
          setMaskImage(layer.img, MASK_HIDDEN);
          layer.revealState = "hidden";
        }

        const useWindowPin = isWindowScroller(scroller);

        const handleScrollUpdate = (progress: number) => {
          const imageProgress = calculateImageProgress(progress);
          const scrollDirection =
            imageProgress > lastImageProgress ? "down" : "up";
          const currentImageIndex = Math.floor(imageProgress);
          const imageSpecificProgress = imageProgress - currentImageIndex;

          const correctTitleIndex = getTitleIndexForProgress(imageProgress);
          if (correctTitleIndex !== currentTitleIndex) {
            queuedTitleIndex = correctTitleIndex;
            setActiveSlideIndex(correctTitleIndex);
            if (!isAnimating && showInfoBand && titleEl) {
              animateTitleChange(correctTitleIndex, scrollDirection);
            }
          }

          setFirstImgScale(
            getScaleForImage(0, currentImageIndex, imageSpecificProgress),
          );

          for (const layer of slideLayers) {
            const { transitionIndex, setScale } = layer;
            setScale(
              getScaleForImage(
                transitionIndex,
                currentImageIndex,
                imageSpecificProgress,
              ),
            );

            if (transitionIndex < currentImageIndex) {
              setLayerRevealed(layer);
            } else if (transitionIndex === currentImageIndex) {
              layer.revealState = "animating";
              setMaskImage(
                layer.img,
                buildStripMask(stripBounds, (_j, bounds) =>
                  Math.max(
                    0,
                    Math.min(
                      1,
                      (imageSpecificProgress - bounds.delay) * stripRevealSpeed,
                    ),
                  ),
                ),
              );
            } else {
              setLayerHidden(layer);
            }
          }

          lastImageProgress = imageProgress;
        };

        if (embedded) {
          trigger = ScrollTrigger.create({
            trigger: scrollRoot,
            scroller,
            start: "top top",
            end: "bottom bottom",
            scrub,
            invalidateOnRefresh: true,
            refreshPriority: -1,
            onUpdate: (self) => {
              handleScrollUpdate(self.progress);
            },
          });
        } else {
          trigger = ScrollTrigger.create({
            trigger: section,
            scroller,
            start: pinStart,
            end: `+=${totalScrollDistance}vh`,
            pin: true,
            pinReparent: !useWindowPin,
            pinSpacing: true,
            scrub,
            invalidateOnRefresh: true,
            refreshPriority,
            onUpdate: (self) => {
              handleScrollUpdate(self.progress);
            },
          });
        }

        if (scroller instanceof HTMLElement) {
          resizeObserver = new ResizeObserver(() => {
            ScrollTrigger.refresh();
            trigger?.refresh();
          });
          resizeObserver.observe(scroller);
        } else {
          unbindResize = observeWindowResize(() => {
            ScrollTrigger.refresh();
            trigger?.refresh();
          });
        }

        ScrollTrigger.refresh();
        trigger.refresh();
        handleScrollUpdate(trigger.progress);
      };

      mountGallery().catch(() => {
        /* ScrollTrigger setup aborted on unmount */
      });

      return () => {
        disposed = true;
        resizeObserver?.disconnect();
        trigger?.kill();
        trigger = null;
        unbindResize?.();
        for (const el of createdContainers) {
          el.remove();
        }
      };
    },
    {
      scope: embedded ? trackRef : sectionRef,
      dependencies: [
        slides,
        stripsCount,
        scrollPerTransition,
        scrub,
        pinStart,
        scrollerProp,
        scrollConfig,
        shouldAnimate,
        showInfoBand,
        displayLink,
        linkLabel,
        embedded,
        refreshPriority,
      ],
    },
  );

  const firstSlide = slides[0];
  const activeSlide = slides[activeSlideIndex] ?? firstSlide;
  const initialLinkLabel = firstSlide?.linkLabel ?? linkLabel;
  const initialImageScale = scrollConfig.timing.scaleFrom;
  const hasRichContent = Boolean(
    activeSlide?.deliverables?.length || activeSlide?.description || activeSlide?.tag
  );

  const trackStyle = {
    "--sg-scroll-vh": scrollDistanceVh,
  } as CSSProperties;

  const gallerySection = (
    <section
      className={cn(
        embedded
          ? "relative h-full w-full overflow-hidden"
          : classes.rootPreset,
        className,
      )}
      ref={sectionRef}
    >
      <div className={classes.images} ref={slideImagesRef}>
        <div className={classes.imageFrame}>
          {firstSlide ? (
            <img
              alt={firstSlide.title}
              className={classes.image}
              ref={firstImgRef}
              src={firstSlide.image}
              style={imageScaleStyle(initialImageScale)}
            />
          ) : null}
        </div>
      </div>

      {/* Cinematic Dark Overlay Scrim for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/45 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent pointer-events-none z-[1]" />

      {hasRichContent && activeSlide ? (
        <div className="absolute inset-0 z-[2] flex flex-col justify-between p-5 sm:p-7 md:p-9 lg:p-10 text-white select-none">
          {/* Top Bar: Number, Category Tag, Counter */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <span className="text-[#FF5812] font-mono font-bold">
                #{activeSlide.number || String(activeSlideIndex + 1).padStart(2, "0")}
              </span>
              <span className="h-3 w-px bg-white/20" />
              <span className="tracking-wider uppercase text-zinc-200">
                {activeSlide.tag || prefixLabel}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 bg-black/50 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#FF5812] animate-pulse" />
              <span>
                {String(activeSlideIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Middle Content Area */}
          <div className="my-auto py-2 transition-all duration-300">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.15rem] font-extrabold text-white tracking-tight leading-tight max-w-4xl drop-shadow-md">
              {activeSlide.title}
            </h3>

            {activeSlide.description && (
              <p className="mt-2 text-xs sm:text-sm md:text-[14.5px] text-zinc-300 leading-relaxed max-w-3xl">
                {activeSlide.description}
              </p>
            )}

            {activeSlide.deliverables && activeSlide.deliverables.length > 0 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 max-w-4xl">
                {activeSlide.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 rounded-lg bg-black/60 border border-white/10 px-3 py-2 text-xs sm:text-[12.5px] text-zinc-200 backdrop-blur-md"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#FF5812] flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Row: Tech Tags, ROI Callout, CTA */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {activeSlide.techTags?.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-white/10 border border-white/10 px-2 py-0.5 text-[11px] font-medium text-zinc-300"
                >
                  {tech}
                </span>
              ))}
              {activeSlide.impact && (
                <span className="text-[11.5px] text-zinc-300 italic hidden md:inline ml-2">
                  💡 {activeSlide.impact}
                </span>
              )}
            </div>

            <a
              href={activeSlide.url || "#"}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5812] px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#FF5812]/30 hover:bg-[#e04c0d] transition-all self-start sm:self-auto flex-shrink-0"
            >
              <span>{activeSlide.linkLabel || initialLinkLabel}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      ) : showInfoBand && firstSlide ? (
        <div className={classes.info}>
          <div className={classes.infoInner}>
            {displayPrefix ? (
              <div className={classes.prefix}>
                <p className={classes.prefixText}>{prefixLabel}</p>
              </div>
            ) : null}

            <div className={classes.title}>
              <p className={classes.titleText} ref={titleRef}>
                {firstSlide.title}
              </p>
            </div>

            {displayLink ? (
              <div className={classes.link}>
                <a
                  className={classes.linkText}
                  href={firstSlide.url ?? "#"}
                  ref={exploreLinkRef}
                >
                  {initialLinkLabel}
                </a>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );

  if (embedded) {
    const trackHeightStyle: CSSProperties = containerQuery
      ? { ...trackStyle, height: `calc(var(--sg-scroll-vh) * 1cqh)` }
      : trackStyle;

    const stickyHeightStyle: CSSProperties = containerQuery
      ? { height: "100cqh" }
      : {};

    return (
      <div
        className={cn(
          "relative w-full",
          !containerQuery &&
            "h-[calc(var(--sg-scroll-vh)*1svh)] max-lg:h-[calc(var(--sg-scroll-vh)*1dvh)]",
          classes.track,
        )}
        ref={trackRef}
        style={trackHeightStyle}
      >
        <div
          className={cn(
            "sticky top-0 z-0 w-full overflow-hidden",
            !containerQuery && "h-svh max-lg:h-dvh",
          )}
          style={stickyHeightStyle}
        >
          {gallerySection}
        </div>
      </div>
    );
  }

  return gallerySection;
}

export default ScrollGallery;
