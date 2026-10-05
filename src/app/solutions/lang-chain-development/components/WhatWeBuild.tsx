"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useAnimationControls,
  type PanInfo,
} from "framer-motion";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
} from "@tabler/icons-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import SectionBadge from "./SectionBadge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ─── Easing ────────────────────────────────────────────────── */

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/* ─── Context ───────────────────────────────────────────────── */

type CarouselContextValue = {
  carouselId: string;
  orientation: CarouselOrientation;
  index: number;
  count: number;
  loop: boolean;
  direction: number;
  autoplay: boolean;
  autoplayInterval: number;
  select: (next: number) => void;
  next: () => void;
  prev: () => void;
  canPrev: boolean;
  canNext: boolean;
  registerCount: (n: number) => void;
  setIsDragging: (v: boolean) => void;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

const CarouselAutoplayPauseContext = React.createContext<boolean>(false);

function useCarouselContext() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) {
    throw new Error("Carousel compound components must be used within <Carousel>");
  }
  return ctx;
}

function useCarouselAutoplayPaused() {
  return React.useContext(CarouselAutoplayPauseContext);
}

function handleTabRovingKeyDown(
  e: React.KeyboardEvent<HTMLButtonElement>,
  isVertical: boolean,
  onActivate: (index: number) => void,
) {
  const tabs = Array.from(
    e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
      '[data-slot="carousel-tab"]',
    ) ?? [],
  );
  const idx = tabs.indexOf(e.currentTarget);
  const nextKey = isVertical ? "ArrowDown" : "ArrowRight";
  const prevKey = isVertical ? "ArrowUp" : "ArrowLeft";

  if (e.key === nextKey) {
    e.preventDefault();
    const next = tabs[(idx + 1) % tabs.length];
    next?.focus();
    onActivate(tabs.indexOf(next));
  } else if (e.key === prevKey) {
    e.preventDefault();
    const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
    prev?.focus();
    onActivate(tabs.indexOf(prev));
  } else if (e.key === "Home") {
    e.preventDefault();
    tabs[0]?.focus();
    onActivate(0);
  } else if (e.key === "End") {
    e.preventDefault();
    tabs[tabs.length - 1]?.focus();
    onActivate(tabs.length - 1);
  }
}

function directionFor(from: number, to: number, count: number, loop: boolean): number {
  if (to === from) return 1;
  if (!loop || count <= 2) return to > from ? 1 : -1;
  const diff = ((to - from) % count + count) % count;
  return diff <= count / 2 ? 1 : -1;
}

/* ─── Root ──────────────────────────────────────────────────── */

export interface CarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  pauseOnHover?: boolean;
  orientation?: CarouselOrientation;
  children: React.ReactNode;
}

export type CarouselOrientation = "horizontal" | "vertical";

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  function Carousel(
    {
      index: indexProp,
      defaultIndex = 0,
      onIndexChange,
      loop = false,
      autoplay = false,
      autoplayInterval = 4000,
      pauseOnHover = true,
      orientation = "horizontal",
      className,
      children,
      onKeyDown,
      ...props
    },
    ref,
  ) {
    const carouselId = React.useId();
    const [count, setCount] = React.useState(0);
    const [internalIndex, setInternalIndex] = React.useState(defaultIndex);
    const [direction, setDirection] = React.useState(1);
    const [isHovering, setIsHovering] = React.useState(false);
    const [isFocusWithin, setIsFocusWithin] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const prefersReducedMotion = useReducedMotion();

    const isControlled = indexProp !== undefined;
    const requestedIndex = isControlled ? indexProp : internalIndex;
    const index =
      count > 0 ? Math.min(requestedIndex, count - 1) : requestedIndex;

    if (!isControlled && count > 0 && internalIndex > count - 1) {
      setInternalIndex(count - 1);
      setDirection(-1);
    }

    const select = React.useCallback(
      (next: number, dir?: number) => {
        if (count === 0) return;
        const clamped = loop
          ? ((next % count) + count) % count
          : Math.max(0, Math.min(next, count - 1));
        setDirection(dir ?? directionFor(index, clamped, count, loop));
        if (!isControlled) setInternalIndex(clamped);
        onIndexChange?.(clamped);
      },
      [count, index, loop, isControlled, onIndexChange],
    );

    const next = React.useCallback(() => select(index + 1, 1), [select, index]);
    const prev = React.useCallback(() => select(index - 1, -1), [select, index]);

    const canPrev = loop ? count > 1 : index > 0;
    const canNext = loop ? count > 1 : index < count - 1;

    React.useEffect(() => {
      if (isControlled && count > 0 && requestedIndex > count - 1) {
        onIndexChange?.(count - 1);
      }
    }, [count, isControlled, requestedIndex, onIndexChange]);

    const indexRef = React.useRef(index);
    const selectRef = React.useRef(select);
    React.useEffect(() => {
      indexRef.current = index;
      selectRef.current = select;
    });

    React.useEffect(() => {
      if (!autoplay || count <= 1) return;
      if (prefersReducedMotion) return;
      if (pauseOnHover && (isHovering || isFocusWithin || isDragging)) return;
      if (!canNext) return;
      const id = setInterval(() => {
        selectRef.current(indexRef.current + 1, 1);
      }, autoplayInterval);
      return () => clearInterval(id);
    }, [
      autoplay,
      autoplayInterval,
      count,
      canNext,
      isHovering,
      isFocusWithin,
      isDragging,
      pauseOnHover,
      prefersReducedMotion,
    ]);

    const registerCount = React.useCallback((n: number) => setCount(n), []);
    const isAutoplayPaused =
      Boolean(prefersReducedMotion) ||
      (pauseOnHover && (isHovering || isFocusWithin || isDragging));

    const ctx = React.useMemo<CarouselContextValue>(
      () => ({
        carouselId,
        orientation,
        index,
        count,
        loop,
        direction,
        autoplay,
        autoplayInterval,
        select,
        next,
        prev,
        canPrev,
        canNext,
        registerCount,
        setIsDragging,
      }),
      [
        carouselId,
        orientation,
        index,
        count,
        loop,
        direction,
        autoplay,
        autoplayInterval,
        select,
        next,
        prev,
        canPrev,
        canNext,
        registerCount,
      ],
    );

    return (
      <CarouselContext.Provider value={ctx}>
        <CarouselAutoplayPauseContext.Provider value={isAutoplayPaused}>
          <div data-wensity-primitive=""
            ref={ref}
            role="region"
            aria-roledescription="carousel"
            aria-orientation={orientation}
            className={cn("relative", className)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onFocusCapture={() => setIsFocusWithin(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                setIsFocusWithin(false);
              }
            }}
            onKeyDown={(e) => {
              const previousKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
              const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
              if (e.key === previousKey) {
                e.preventDefault();
                prev();
              } else if (e.key === nextKey) {
                e.preventDefault();
                next();
              }
              onKeyDown?.(e);
            }}
            {...props}
          >
            {children}
          </div>
        </CarouselAutoplayPauseContext.Provider>
      </CarouselContext.Provider>
    );
  },
);

/* ─── Item ──────────────────────────────────────────────────── */

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CarouselItem({ className, children, ...props }: CarouselItemProps) {
  return (
    <div className={cn("h-full w-full shrink-0", className)} {...props}>
      {children}
    </div>
  );
}

/* ─── Content (viewport + drag + directional slide) ───────────── */

const SWIPE_DISTANCE_THRESHOLD = 60;
const SWIPE_VELOCITY_THRESHOLD = 500;

export interface CarouselContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: React.ReactNode;
  draggable?: boolean;
}

export function CarouselContent({
  className,
  children,
  draggable = true,
  ...props
}: CarouselContentProps) {
  const {
    carouselId,
    orientation,
    index,
    count,
    loop,
    direction,
    next,
    prev,
    canPrev,
    canNext,
    setIsDragging,
    registerCount,
  } = useCarouselContext();
  const prefersReducedMotion = useReducedMotion();
  const items = React.useMemo(() => React.Children.toArray(children), [children]);

  React.useEffect(() => {
    registerCount(items.length);
  }, [items.length, registerCount]);

  const active = items[index];

  const slideVariants = {
    enter: (dir: number) => ({
      x: orientation === "horizontal" && !prefersReducedMotion ? (dir > 0 ? "14%" : "-14%") : 0,
      y: orientation === "vertical" && !prefersReducedMotion ? (dir > 0 ? "14%" : "-14%") : 0,
      opacity: 0,
    }),
    center: { x: "0%", y: "0%", opacity: 1 },
    exit: (dir: number) => ({
      x: orientation === "horizontal" && !prefersReducedMotion ? (dir > 0 ? "-14%" : "14%") : 0,
      y: orientation === "vertical" && !prefersReducedMotion ? (dir > 0 ? "-14%" : "14%") : 0,
      opacity: 0,
    }),
  };

  function handleDragEnd(_event: PointerEvent, info: PanInfo) {
    setIsDragging(false);
    const { offset, velocity } = info;
    const dragOffset = orientation === "vertical" ? offset.y : offset.x;
    const dragVelocity = orientation === "vertical" ? velocity.y : velocity.x;
    const swipedForward =
      dragOffset < -SWIPE_DISTANCE_THRESHOLD || dragVelocity < -SWIPE_VELOCITY_THRESHOLD;
    const swipedBackward =
      dragOffset > SWIPE_DISTANCE_THRESHOLD || dragVelocity > SWIPE_VELOCITY_THRESHOLD;
    if (swipedForward && (canNext || loop)) next();
    else if (swipedBackward && (canPrev || loop)) prev();
  }

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={count > 0 ? `${index + 1} of ${count}` : undefined}
      className={cn(
        "relative isolate overflow-hidden rounded-[var(--primitive-radius-surface,1rem)] transform-gpu",
        className,
      )}
      {...props}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={`${carouselId}-${index}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: prefersReducedMotion ? 0.12 : 0.28, ease: EASE_OUT }}
          drag={draggable && count > 1 ? (orientation === "vertical" ? "y" : "x") : false}
          dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
          dragElastic={prefersReducedMotion ? 0 : 0.65}
          dragTransition={
            prefersReducedMotion
              ? { bounceStiffness: 0, bounceDamping: 1000 }
              : { bounceStiffness: 600, bounceDamping: 40 }
          }
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          className={cn(
            "h-full",
            draggable && count > 1 && "cursor-grab active:cursor-grabbing flex",
          )}
        >
          {active}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── Previous / Next controls ─────────────────────────────── */

const navButtonClass = cn(
  "flex size-12 items-center justify-center rounded-full border-none outline-none",
  "bg-[#FF5812] text-white shadow-md",
  "transition-transform duration-150 hover:scale-105 active:scale-95",
  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5812]",
  "disabled:pointer-events-none disabled:opacity-40",
  "[&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0",
);

export type CarouselControlProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
>;

export function CarouselPrevious({ className, ...props }: CarouselControlProps) {
  const { orientation, prev, canPrev } = useCarouselContext();
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.button
      type="button"
      aria-label="Previous slide"
      onClick={prev}
      disabled={!canPrev}
      whileTap={canPrev && !prefersReducedMotion ? { scale: 0.94 } : undefined}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 500, damping: 32 }
      }
      className={cn(navButtonClass, className)}
      {...props}
    >
      {orientation === "vertical" ? (
        <IconChevronUp className="size-4" stroke={1.9} />
      ) : (
        <IconChevronLeft className="size-4" stroke={1.9} />
      )}
    </motion.button>
  );
}

export function CarouselNext({ className, ...props }: CarouselControlProps) {
  const { orientation, next, canNext } = useCarouselContext();
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.button
      type="button"
      aria-label="Next slide"
      onClick={next}
      disabled={!canNext}
      whileTap={canNext && !prefersReducedMotion ? { scale: 0.94 } : undefined}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 500, damping: 32 }
      }
      className={cn(navButtonClass, className)}
      {...props}
    >
      {orientation === "vertical" ? (
        <IconChevronDown className="size-4" stroke={1.9} />
      ) : (
        <IconChevronRight className="size-4" stroke={1.9} />
      )}
    </motion.button>
  );
}

function useAutoplayProgress(
  active: boolean,
  resetKey: unknown,
  autoplayInterval: number,
  isAutoplayPaused: boolean,
) {
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimationControls();

  React.useEffect(() => {
    if (!active) return;
    controls.set({ scaleX: 0 });
  }, [active, resetKey, controls]);

  React.useEffect(() => {
    if (!active) return;
    if (isAutoplayPaused) {
      controls.stop();
      return;
    }
    controls.start({
      scaleX: 1,
      transition: { duration: prefersReducedMotion ? 0 : autoplayInterval / 1000, ease: "linear" },
    });
  }, [active, resetKey, isAutoplayPaused, autoplayInterval, controls, prefersReducedMotion]);

  return controls;
}

function AutoplayDotFill({ isActive, isComplete }: { isActive: boolean; isComplete: boolean }) {
  const { autoplayInterval } = useCarouselContext();
  const isAutoplayPaused = useCarouselAutoplayPaused();
  const controls = useAutoplayProgress(isActive, isActive, autoplayInterval, isAutoplayPaused);

  if (isActive) {
    return (
      <span className="relative block h-1 w-6 overflow-hidden rounded-full bg-[color:var(--primitive-surface-selected,color-mix(in_srgb,var(--foreground)_6%,transparent))]">
        <motion.span
          animate={controls}
          initial={{ scaleX: 0 }}
          style={{ transformOrigin: "left" }}
          className="absolute inset-0 rounded-full bg-[#FF5812]"
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "block size-1.5 rounded-full",
        isComplete
          ? "bg-[#FF5812]"
          : "bg-[color:var(--primitive-surface-selected,color-mix(in_srgb,var(--foreground)_6%,transparent))]",
      )}
    />
  );
}

export type CarouselDotsProps = React.HTMLAttributes<HTMLDivElement>;

export function CarouselDots({ className, ...props }: CarouselDotsProps) {
  const { carouselId, orientation, index, count, autoplay, select } = useCarouselContext();
  const isVertical = orientation === "vertical";
  const prefersReducedMotion = useReducedMotion();

  if (count <= 1) return null;

  const dotButtonClass =
    "flex outline-none rounded-full focus-visible:ring-2 focus-visible:ring-[color:var(--primitive-ring,color-mix(in_srgb,var(--foreground)_45%,transparent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

  if (autoplay) {
    return (
      <div
        role="tablist"
        aria-label="Slide navigation"
        className={cn("flex items-center justify-center gap-1.5", className)}
        {...props}
      >
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            data-slot="carousel-tab"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
            tabIndex={i === index ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => handleTabRovingKeyDown(e, isVertical, select)}
            className={dotButtonClass}
          >
            <AutoplayDotFill isActive={i === index} isComplete={i < index} />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      role="tablist"
      aria-label="Slide navigation"
      className={cn("flex items-center justify-center gap-1.5", className)}
      {...props}
    >
      {Array.from({ length: count }, (_, i) => {
        const isActive = i === index;
        return (
          <button
            key={i}
            type="button"
            data-slot="carousel-tab"
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${i + 1}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => handleTabRovingKeyDown(e, isVertical, select)}
            className={cn("relative flex h-4 w-4 items-center justify-center group", dotButtonClass)}
          >
            <span className="relative h-2 w-2 overflow-hidden rounded-full bg-zinc-300 transition-colors group-hover:bg-[#FF5812]">
              {isActive && (
                <motion.span
                  layoutId={prefersReducedMotion ? undefined : `${carouselId}-active-dot`}
                  className="absolute inset-0 rounded-full bg-[#FF5812]"
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: "spring", duration: 0.35, bounce: 0.15 }
                  }
                />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}


const photos = [
  {
    src: "https://cdn.21st.dev/assets/mirror/aa/aa6da4bbc7cc5432b413d76979a5b3809d395f7a2a12614440cc7abac327a47e.webp",
    label: "01 — LANGCHAIN AI APPLICATION DEVELOPMENT",
    caption: "Build production-ready AI applications using LangChain for LLM orchestration, prompts, chains, workflows, and business-specific AI experiences."
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/09/091e5592c27370a519d663ceb93d72fa86c80268a6a9587e0a2c15663cfa08a7.webp",
    label: "02 — LANGCHAIN RAG DEVELOPMENT",
    caption: "Build context-aware RAG applications that connect enterprise documents, databases, vector search, and knowledge sources to deliver grounded AI responses."
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/10/10575677c5c3f1bc4ded0fc34fb4199d654f985ba6b32473b1b98703d18c844b.webp",
    label: "03 — LANGGRAPH & AI AGENT DEVELOPMENT",
    caption: "Build stateful AI agents and multi-step workflows with LangGraph for tool use, decision-making, human-in-the-loop processes, and controlled execution."
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/92/92a251c940d9c98cff5418fbf020d107270599849001a5b1690c380263c5b063.webp",
    label: "04 — LANGCHAIN TOOL & API INTEGRATION",
    caption: "Connect LangChain applications with business APIs, databases, CRM, ERP, search systems, and external tools to enable AI-powered actions and workflows."
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/1b/1b8c1ffca81cf911f20092f66cde1d6351dcf29e15482e22c6c9e313f6ef12ab.webp",
    label: "05 — LANGCHAIN EVALUATION & OBSERVABILITY",
    caption: "Evaluate, trace, monitor, and optimize LangChain applications using testing, observability, feedback, and performance analysis for reliable production AI."
  },
];

function PhotoSlide({
  photo,
  caption,
  className,
}: {
  photo: { src: string; label: string };
  caption?: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-black/10 ${className ?? "h-[360px] sm:h-[420px] lg:h-[480px] w-full group"}`}>
      <img src={photo.src} alt={photo.label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
      <div className="relative flex h-full flex-col justify-end gap-2 p-6 sm:p-8 lg:p-10">
        {caption && <span className="text-sm md:text-base font-bold text-[#FF5812] tracking-wider uppercase">{caption}</span>}
        <span className="block text-xl md:text-2xl lg:text-3xl font-semibold text-white/95 max-w-4xl leading-tight">{photo.label}</span>
      </div>
    </div>
  );
}

export function CarouselPreview() {
  return (
    <div className="w-full max-w-6xl space-y-8">
      <Carousel loop>
        <CarouselContent>
          {photos.map((photo, i) => (
            <CarouselItem key={photo.label}>
              <PhotoSlide photo={{ src: photo.src, label: photo.caption }} caption={photo.label} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-8 flex items-center justify-between px-4">
          <CarouselPrevious />
          <CarouselDots />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}

export default function WhatWeBuild() {
  return (
    <section className="bg-white pt-8 md:pt-12 pb-8 md:pb-12 text-slate-900 scroll-mt-24 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col mb-8 sm:mb-12">
          <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block self-start">
            <span className="typo-caption text-[#FF5812] uppercase">
              WHAT WE BUILD
            </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-6 items-start">
            <h2 className="typo-heading-2 text-slate-900 lg:pr-12 xl:pr-24">
              LangChain Solutions Built for <span className="text-[#FF5812]">Production AI Applications</span>
            </h2>
            
            <p className="typo-description text-slate-500 w-full pt-1.5 lg:max-w-xl">
              Build production-ready LangChain solutions that connect enterprise data, RAG, AI agents, tools, APIs, and large language models into secure and scalable AI applications.
            </p>
          </div>
        </div>

        <div className="flex justify-center w-full">
          <CarouselPreview />
        </div>
      </div>
    </section>
  );
}
