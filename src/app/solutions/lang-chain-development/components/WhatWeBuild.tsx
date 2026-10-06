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
  IconBrain,
  IconDatabase,
  IconRobot,
  IconPlugConnected,
  IconActivity,
  IconSparkles,
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
      index,
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
      x: orientation === "horizontal" && !prefersReducedMotion ? (dir >= 0 ? "100%" : "-100%") : 0,
      y: orientation === "vertical" && !prefersReducedMotion ? (dir >= 0 ? "100%" : "-100%") : 0,
      opacity: 1,
    }),
    center: { x: "0%", y: "0%", opacity: 1 },
    exit: (dir: number) => ({
      x: orientation === "horizontal" && !prefersReducedMotion ? (dir >= 0 ? "-100%" : "100%") : 0,
      y: orientation === "vertical" && !prefersReducedMotion ? (dir >= 0 ? "-100%" : "100%") : 0,
      opacity: 1,
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
        "relative isolate overflow-hidden rounded-3xl transform-gpu w-full h-[380px] sm:h-[440px] md:h-[500px] lg:h-[540px] select-none",
        className,
      )}
      {...props}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={`${carouselId}-${index}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: prefersReducedMotion
              ? { duration: 0.1 }
              : { type: "spring", stiffness: 190, damping: 26, mass: 0.8 },
          }}
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
            "absolute inset-0 h-full w-full will-change-transform",
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


export function CarouselSlideCounter({ className }: { className?: string }) {
  const { index, count } = useCarouselContext();
  if (count <= 1) return null;
  return (
    <div
      className={cn(
        "flex items-center gap-2 font-mono text-xs font-semibold text-zinc-600 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
        className
      )}
    >
      <span className="text-[#FF5812] font-extrabold text-sm">0{index + 1}</span>
      <span className="text-zinc-300 font-light">/</span>
      <span className="text-zinc-400">0{count}</span>
    </div>
  );
}

export function CarouselCapabilityTabs({ className }: { className?: string }) {
  const { index, select } = useCarouselContext();
  const tabs = [
    { id: 0, tag: "01", title: "AI Applications", icon: IconBrain },
    { id: 1, tag: "02", title: "Enterprise RAG", icon: IconDatabase },
    { id: 2, tag: "03", title: "LangGraph Agents", icon: IconRobot },
    { id: 3, tag: "04", title: "Tool & APIs", icon: IconPlugConnected },
    { id: 4, tag: "05", title: "Observability", icon: IconActivity },
  ];

  return (
    <div className={cn("w-full overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", className)}>
      <div className="flex items-center justify-start lg:justify-between gap-2 p-1.5 bg-zinc-100/90 rounded-2xl border border-zinc-200/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)] backdrop-blur-md min-w-max lg:min-w-0">
        {tabs.map((tab) => {
          const isActive = tab.id === index;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => select(tab.id)}
              className={cn(
                "relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all duration-300 outline-none flex-1 justify-center",
                isActive
                  ? "text-white shadow-[0_4px_16px_rgba(255,88,18,0.35)]"
                  : "text-zinc-600 hover:text-zinc-950 hover:bg-white/60"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-capability-pill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FF5812] to-[#FF7A00]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span className={cn("relative z-10 font-mono text-[10px] sm:text-[11px] font-bold opacity-80", isActive ? "text-white" : "text-[#FF5812]")}>
                {tab.tag}
              </span>
              <Icon className={cn("relative z-10 h-4 w-4 shrink-0 transition-transform duration-300", isActive ? "text-white scale-110" : "text-zinc-400")} stroke={2} />
              <span className="relative z-10 whitespace-nowrap">{tab.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CarouselPrevious({ className, ...props }: CarouselControlProps) {
  const { orientation, prev, canPrev } = useCarouselContext();
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.button
      type="button"
      aria-label="Previous slide"
      onClick={prev}
      disabled={!canPrev}
      whileTap={canPrev && !prefersReducedMotion ? { scale: 0.9 } : undefined}
      whileHover={canPrev && !prefersReducedMotion ? { scale: 1.06 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full border border-zinc-200/90 bg-white text-zinc-800 shadow-[0_4px_14px_rgba(0,0,0,0.06)] backdrop-blur-md",
        "transition-all duration-300 hover:border-[#FF5812] hover:bg-[#FF5812] hover:text-white hover:shadow-[0_8px_25px_rgba(255,88,18,0.35)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812] focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-30 disabled:border-zinc-200 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:shadow-none",
        className
      )}
      {...props}
    >
      {orientation === "vertical" ? (
        <IconChevronUp className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5" stroke={2.4} />
      ) : (
        <IconChevronLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" stroke={2.4} />
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
      whileTap={canNext && !prefersReducedMotion ? { scale: 0.9 } : undefined}
      whileHover={canNext && !prefersReducedMotion ? { scale: 1.06 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full border border-zinc-200/90 bg-white text-zinc-800 shadow-[0_4px_14px_rgba(0,0,0,0.06)] backdrop-blur-md",
        "transition-all duration-300 hover:border-[#FF5812] hover:bg-[#FF5812] hover:text-white hover:shadow-[0_8px_25px_rgba(255,88,18,0.35)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812] focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-30 disabled:border-zinc-200 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:shadow-none",
        className
      )}
      {...props}
    >
      {orientation === "vertical" ? (
        <IconChevronDown className="h-5 w-5 transition-transform duration-200 group-hover:translate-y-0.5" stroke={2.4} />
      ) : (
        <IconChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" stroke={2.4} />
      )}
    </motion.button>
  );
}


export type CarouselDotsProps = React.HTMLAttributes<HTMLDivElement>;

export function CarouselDots({ className, ...props }: CarouselDotsProps) {
  const { index, count, select } = useCarouselContext();

  if (count <= 1) return null;

  return (
    <div
      role="tablist"
      aria-label="Slide navigation"
      className={cn(
        "flex items-center justify-center gap-2 rounded-full border border-zinc-200/90 bg-white/95 p-2 px-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-md",
        className
      )}
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
            className="group relative flex h-7 items-center justify-center rounded-full px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]"
          >
            <span
              className={cn(
                "block h-2 rounded-full transition-all duration-300",
                isActive
                  ? "w-8 bg-gradient-to-r from-[#FF5812] to-[#FF7A00] shadow-[0_2px_8px_rgba(255,88,18,0.5)]"
                  : "w-2 bg-zinc-300 group-hover:w-3.5 group-hover:bg-zinc-400"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}


const photos = [
  {
    src: "/images/solutions/lang-chain-development/what-we-build/01-ai-apps.jpg",
    label: "01 — LANGCHAIN AI APPLICATION DEVELOPMENT",
    caption: "Build production-ready AI applications using LangChain for LLM orchestration, prompts, chains, workflows, and business-specific AI experiences.",
    stage: "01 / 05",
    tag: "ORCHESTRATION & CHAINS"
  },
  {
    src: "/images/solutions/lang-chain-development/what-we-build/02-rag.jpg",
    label: "02 — LANGCHAIN RAG DEVELOPMENT",
    caption: "Build context-aware RAG applications that connect enterprise documents, databases, vector search, and knowledge sources to deliver grounded AI responses.",
    stage: "02 / 05",
    tag: "VECTOR SEARCH & RETRIEVAL"
  },
  {
    src: "/images/solutions/lang-chain-development/what-we-build/03-langgraph-agents.jpg",
    label: "03 — LANGGRAPH & AI AGENT DEVELOPMENT",
    caption: "Build stateful AI agents and multi-step workflows with LangGraph for tool use, decision-making, human-in-the-loop processes, and controlled execution.",
    stage: "03 / 05",
    tag: "MULTI-AGENT STATE MACHINES"
  },
  {
    src: "/images/solutions/lang-chain-development/what-we-build/04-tools-integration.jpg",
    label: "04 — LANGCHAIN TOOL & API INTEGRATION",
    caption: "Connect LangChain applications with business APIs, databases, CRM, ERP, search systems, and external tools to enable AI-powered actions and workflows.",
    stage: "04 / 05",
    tag: "DYNAMIC TOOL CALLING"
  },
  {
    src: "/images/solutions/lang-chain-development/what-we-build/05-observability.jpg",
    label: "05 — LANGCHAIN EVALUATION & OBSERVABILITY",
    caption: "Evaluate, trace, monitor, and optimize LangChain applications using testing, observability, feedback, and performance analysis for reliable production AI.",
    stage: "05 / 05",
    tag: "LANGSMITH METRICS & EVALS"
  },
];

function PhotoSlide({
  photo,
  caption,
  stage,
  tag,
  className,
}: {
  photo: { src: string; label: string };
  caption?: string;
  stage?: string;
  tag?: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-black/10 shadow-2xl ${className ?? "h-full w-full group"}`}>
      {/* Background artwork */}
      <img
        src={photo.src}
        alt={photo.label}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
      />

      {/* Cinematic dark gradients for crystal-clear readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

      {/* Top Meta Badges */}
      <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-6 flex items-center justify-between z-10">
        <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-black/50 border border-white/20 backdrop-blur-md shadow-lg">
          <span className="h-2 w-2 rounded-full bg-[#FF5812] shadow-[0_0_8px_#FF5812] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-white uppercase">
            {tag ?? "ENTERPRISE AI CAPABILITY"}
          </span>
        </div>

        {stage && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-md text-white/90 text-[11px] font-mono font-bold shadow-lg">
            <span>{stage}</span>
          </div>
        )}
      </div>

     

      {/* Bottom Editorial Content */}
      <div className="relative flex h-full flex-col justify-end gap-2.5 p-6 sm:p-8 lg:p-10 z-10 max-w-4xl">
        {caption && (
          <span className="text-xs sm:text-sm md:text-base font-bold text-[#FF5812] tracking-wider uppercase drop-shadow-sm">
            {caption}
          </span>
        )}
        <span className="block text-xl md:text-2xl lg:text-3xl xl:text-[2rem] font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
          {photo.label}
        </span>
      </div>
    </div>
  );
}

export function CarouselPreview() {
  return (
    <div className="w-full space-y-6 sm:space-y-8">
      <Carousel loop autoplay autoplayInterval={4000} pauseOnHover={true}>
        {/* Top Interactive Segmented Capability Selector Tabs */}
        <CarouselCapabilityTabs />

        {/* Carousel Visual Frame */}
        <CarouselContent>
          {photos.map((photo, i) => (
            <CarouselItem key={photo.label}>
              <PhotoSlide
                photo={{ src: photo.src, label: photo.caption }}
                caption={photo.label}
                stage={photo.stage}
                tag={photo.tag}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
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

        <div className="w-full">
          <CarouselPreview />
        </div>
      </div>
    </section>
  );
}
