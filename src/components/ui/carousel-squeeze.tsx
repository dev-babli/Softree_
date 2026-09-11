"use client";

import React, {
    type ComponentProps,
    type KeyboardEvent,
    type ReactNode,
    useCallback,
    useEffect,
    useId,
    useRef,
    useState,
} from "react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   types                                    */
/* -------------------------------------------------------------------------- */

export type SqueezeSlide = {
    /** Stable key. Falls back to index. */
    id?: string | number;
    /** Professional category eyebrow (e.g. "APPLICATION CONNECTIVITY"). */
    category?: string;
    /** The headline title. */
    title: string;
    /** The descriptive text. */
    description?: string;
    /** Picture for the panel. */
    image?: string;
    /** Alt text for that picture. */
    imageAlt?: string;
    /** Any CSS background — gradient or color. */
    background?: string;
    /** Glassmorphic badge or widget overlay. */
    overlay?: ReactNode;
    /** Key capability bullet points. */
    bullets?: string[];
    /** Text on the button. */
    action?: string;
    /** Where the button goes. */
    href?: string;
    /** Opens link in new tab. */
    target?: string;
    /** Action callback. */
    onAction?: () => void;
};

export type SqueezeCarouselProps = {
    slides: SqueezeSlide[];
    defaultIndex?: number;
    onIndexChange?: (index: number) => void;
    height?: number | string;
    radius?: number | string;
    duration?: number;
    hoverGrow?: boolean;
    autoplay?: boolean;
    interval?: number;
    controls?: boolean;
    accent?: string;
    accentForeground?: string;
    label?: string;
    panelClassName?: string;
} & Omit<ComponentProps<"div">, "onSelect">;

/* -------------------------------------------------------------------------- */
/*                                 component                                  */
/* -------------------------------------------------------------------------- */

export function SqueezeCarousel({
    slides,
    defaultIndex = 0,
    onIndexChange,
    height = "clamp(460px, 42vw, 540px)",
    radius = 20,
    duration = 700,
    hoverGrow = true,
    autoplay = true,
    interval = 6000,
    controls = true,
    accent = "#FF6B2C",
    accentForeground = "#FFFFFF",
    label = "Healthcare Capabilities",
    panelClassName,
    className,
    style,
    ...props
}: SqueezeCarouselProps) {
    const count = slides.length;
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [paused, setPaused] = useState(false);
    const ids = useId();
    const containerRef = useRef<HTMLDivElement>(null);

    const goTo = useCallback(
        (index: number) => {
            const next = ((index % count) + count) % count;
            setActiveIndex(next);
            onIndexChange?.(next);
        },
        [count, onIndexChange]
    );

    const step = useCallback(
        (by: number) => {
            goTo(activeIndex + by);
        },
        [activeIndex, goTo]
    );

    // Autoplay timer
    useEffect(() => {
        if (!autoplay || paused || count < 2) return;
        const timer = setInterval(() => {
            step(1);
        }, interval);
        return () => clearInterval(timer);
    }, [autoplay, paused, count, interval, step]);

    // Keyboard navigation
    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
        }
    };

    if (!count) return null;

    const formattedHeight = typeof height === "number" ? `${height}px` : height;
    const formattedRadius = typeof radius === "number" ? `${radius}px` : radius;

    return (
        <div
            className={cn("flex w-full flex-col font-sans", className)}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
                setPaused(false);
                setHoverIndex(null);
            }}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            onKeyDown={onKeyDown}
            tabIndex={0}
            role="region"
            aria-label={label}
            style={style}
            {...props}
        >
            {/* Top Controls: Counter, Progress Dots & Arrows */}
            {controls && count > 1 && (
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold tracking-widest text-slate-500">
                            0{activeIndex + 1} <span className="text-slate-300">/</span> 0{count}
                        </span>
                        <div className="flex items-center gap-1.5 ml-1">
                            {slides.map((_, dotIdx) => (
                                <button
                                    key={dotIdx}
                                    type="button"
                                    onClick={() => goTo(dotIdx)}
                                    aria-label={`Go to capability ${dotIdx + 1}`}
                                    className={cn(
                                        "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                                        dotIdx === activeIndex
                                            ? "w-6 bg-[#FF6B2C]"
                                            : "w-1.5 bg-slate-200 hover:bg-slate-300"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Arrow back label="Previous capability" onClick={() => step(-1)} />
                        <Arrow label="Next capability" onClick={() => step(1)} />
                    </div>
                </div>
            )}

            {/* Accordion Panels Container */}
            <div
                ref={containerRef}
                className="w-full overflow-hidden min-h-[600px] lg:min-h-0"
                style={{ height: formattedHeight }}
            >
                <div className="flex flex-col lg:flex-row w-full h-full gap-2 lg:gap-3 items-stretch">
                    {slides.map((slide, idx) => {
                        const isActive = idx === activeIndex;
                        const isHovered = hoverIndex === idx;

                        return (
                            <div
                                key={slide.id ?? idx}
                                onClick={() => goTo(idx)}
                                onMouseEnter={() => {
                                    if (hoverGrow && !isActive) setHoverIndex(idx);
                                }}
                                onMouseLeave={() => setHoverIndex(null)}
                                role="tab"
                                aria-selected={isActive}
                                aria-label={slide.title}
                                className={cn(
                                    "relative overflow-hidden cursor-pointer select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group",
                                    isActive
                                        ? "flex-[6] lg:flex-[7.5] min-h-[220px] lg:min-h-0 lg:min-w-[280px] shadow-xl ring-1 ring-slate-900/10"
                                        : isHovered
                                        ? "flex-[1.4] lg:flex-[1.7] min-h-[48px] lg:min-h-0 lg:min-w-[75px]"
                                        : "flex-[1] min-h-[42px] lg:min-h-0 lg:min-w-[62px] opacity-95 hover:opacity-100",
                                    panelClassName
                                )}
                                style={{ borderRadius: formattedRadius }}
                            >
                                {/* Background Image */}
                                {slide.image ? (
                                    <img
                                        src={slide.image}
                                        alt={slide.imageAlt ?? slide.title}
                                        draggable={false}
                                        className={cn(
                                            "absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out",
                                            isActive
                                                ? "scale-100"
                                                : "scale-105 group-hover:scale-110"
                                        )}
                                    />
                                ) : (
                                    <div
                                        className="absolute inset-0 w-full h-full"
                                        style={{ background: slide.background }}
                                    />
                                )}

                                {/* ACTIVE CARD: PROFESSIONAL IN-CARD LAYOUT */}
                                {isActive ? (
                                    <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-8 lg:p-10 overflow-y-auto">
                                        {/* Rich directional gradient for optimal text readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/35 pointer-events-none -z-10" />

                                        {/* Top Bar: Professional Category Eyebrow & Index */}
                                        <div className="flex items-center justify-between gap-3 w-full">
                                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase shadow-sm">
                                                <span className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse" />
                                                <span>{slide.category ?? `CAPABILITY 0${idx + 1}`}</span>
                                            </div>
                                            <span className="text-xs font-mono font-bold tracking-widest text-white/75 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                                0{idx + 1} <span className="text-white/40">/</span> 0{count}
                                            </span>
                                        </div>

                                        {/* Bottom Content Cluster: Title, Description, Clean Bullets & Designed CTA */}
                                        <div className="flex flex-col gap-3.5 sm:gap-4 max-w-2xl mt-auto pt-6">
                                            <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-tight drop-shadow-md">
                                                {slide.title}
                                            </h3>

                                            {slide.description && (
                                                <p className="text-white/90 text-sm sm:text-[15px] leading-relaxed max-w-xl drop-shadow-sm font-normal">
                                                    {slide.description}
                                                </p>
                                            )}

                                            {/* Advanced Architecture Telemetry Specification Matrix */}
                                            {slide.bullets && slide.bullets.length > 0 && (
                                                <div className="max-w-xl pt-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF6B2C] uppercase">
                                                            INTEGRATION SCOPE
                                                        </span>
                                                        <div className="h-px flex-1 bg-white/20" />
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 rounded-xl bg-black/45 backdrop-blur-md border border-white/15 divide-y sm:divide-y-0 sm:divide-x divide-white/10 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
                                                        <div className="flex flex-col divide-y divide-white/10">
                                                            {slide.bullets.slice(0, 2).map((bullet, bIdx) => (
                                                                <div
                                                                    key={bIdx}
                                                                    className="group/item flex items-center justify-between px-3.5 py-2.5 hover:bg-white/[0.08] transition-colors duration-200"
                                                                >
                                                                    <div className="flex items-center gap-2.5 min-w-0">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2C] shadow-[0_0_8px_rgba(255,107,44,0.9)] shrink-0 group-hover/item:scale-125 transition-transform" />
                                                                        <span className="text-white/95 text-xs sm:text-[13px] font-medium tracking-tight truncate">
                                                                            {bullet}
                                                                        </span>
                                                                    </div>
                                                                    <span className="text-[10px] font-mono font-bold text-white/40 group-hover/item:text-[#FF6B2C] transition-colors ml-2 shrink-0">
                                                                        0{bIdx + 1}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="flex flex-col divide-y divide-white/10">
                                                            {slide.bullets.slice(2, 4).map((bullet, bIdx) => (
                                                                <div
                                                                    key={bIdx + 2}
                                                                    className="group/item flex items-center justify-between px-3.5 py-2.5 hover:bg-white/[0.08] transition-colors duration-200"
                                                                >
                                                                    <div className="flex items-center gap-2.5 min-w-0">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2C] shadow-[0_0_8px_rgba(255,107,44,0.9)] shrink-0 group-hover/item:scale-125 transition-transform" />
                                                                        <span className="text-white/95 text-xs sm:text-[13px] font-medium tracking-tight truncate">
                                                                            {bullet}
                                                                        </span>
                                                                    </div>
                                                                    <span className="text-[10px] font-mono font-bold text-white/40 group-hover/item:text-[#FF6B2C] transition-colors ml-2 shrink-0">
                                                                        0{bIdx + 3}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Crafted Designed CTA */}
                                            {slide.action && (
                                                <div className="pt-2">
                                                    <Action slide={slide} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    /* COLLAPSED CARD VIEW - Clean, Organized & NOT Clumsy */
                                    <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors duration-300 flex flex-row lg:flex-col justify-between items-center py-0 px-4 lg:py-5 lg:px-2">
                                        {/* Mono Number Badge */}
                                        <span className="text-[11px] font-mono font-bold text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10 shadow-sm shrink-0">
                                            0{idx + 1}
                                        </span>

                                        {/* Label */}
                                        <div className="flex-1 flex items-center justify-start lg:justify-center overflow-hidden my-0 mx-3 lg:my-4 lg:mx-0">
                                            <span
                                                className="text-white/85 group-hover:text-white text-[13px] lg:text-[12.5px] font-semibold tracking-wide whitespace-nowrap truncate select-none drop-shadow-md transition-colors lg:[writing-mode:vertical-rl] lg:rotate-180"
                                            >
                                                {slide.title.replace(/\.$/, "")}
                                            </span>
                                        </div>

                                        {/* Indicator Dot */}
                                        <div className="w-1.5 h-1.5 shrink-0 rounded-full bg-white/40 group-hover:bg-[#FF6B2C] group-hover:scale-125 transition-all duration-300" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   pieces                                   */
/* -------------------------------------------------------------------------- */

function Arrow({
    back = false,
    label,
    onClick,
}: {
    back?: boolean;
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className={cn(
                "grid size-9 cursor-pointer place-items-center rounded-full",
                "border border-slate-200 bg-white text-slate-800",
                "transition-all duration-200 hover:bg-[#FF6B2C] hover:text-white hover:border-[#FF6B2C] shadow-sm outline-none",
                "focus-visible:ring-2 focus-visible:ring-[#FF6B2C] focus-visible:ring-offset-2",
            )}
        >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path
                    d={
                        back
                            ? "M9.6 2.6 5.1 7.1h9.1v1.8H5.1l4.5 4.5-1.2 1.2-6-6L1.8 8l.6-.6 6-6 1.2 1.2Z"
                            : "M6.4 2.6l4.5 4.5H1.8v1.8h9.1l-4.5 4.5 1.2 1.2 6-6 .6-.6-.6-.6-6-6-1.2 1.2Z"
                    }
                />
            </svg>
        </button>
    );
}

function Action({ slide }: { slide: SqueezeSlide }) {
    const inside = (
        <>
            <span>{slide.action ?? "Explore Healthcare AI Integration"}</span>
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#FF6B2C] flex items-center justify-center shadow-sm transition-transform duration-300 group-hover/cta:translate-x-1">
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
            </span>
        </>
    );

    const dress = cn(
        "group/cta inline-flex items-center gap-3.5 pl-5 sm:pl-6 pr-2.5 py-2.5 rounded-full",
        "bg-gradient-to-r from-[#FF6B2C] to-[#ff8346] text-white text-xs sm:text-[13.5px] font-semibold tracking-wide",
        "shadow-[0_4px_22px_rgba(255,107,44,0.38)] hover:shadow-[0_6px_28px_rgba(255,107,44,0.55)]",
        "transition-all duration-300 hover:scale-[1.02] active:scale-95 outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#FF6B2C] focus-visible:ring-offset-2",
    );

    if (slide.href) {
        return (
            <a
                href={slide.href}
                target={slide.target}
                rel={slide.target === "_blank" ? "noreferrer" : undefined}
                onClick={(e) => {
                    e.stopPropagation();
                    slide.onAction?.();
                }}
                className={dress}
            >
                {inside}
            </a>
        );
    }

    return (
        <button
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                slide.onAction?.();
            }}
            className={dress}
        >
            {inside}
        </button>
    );
}

export default SqueezeCarousel;
