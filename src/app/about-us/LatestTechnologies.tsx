// Built using Hyperiux Vault: https://vault.hyperiux.com
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";
import { FlowButton } from "@/components/ui/flow-button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export type SlideItem = {
  image: string;
  text: string;
  badge?: string;
  description?: string;
  tags?: string[];
  link?: string;
};

type CSSLength = string | number;

export const CORE_EXPERTISE_ITEMS: SlideItem[] = [
  {
    text: "Agentic AI",
    badge: "01 // AUTONOMOUS AGENTS & ORCHESTRATION",
    description: "Multi-agent workflows, autonomous reasoning systems, and enterprise copilots engineered to execute complex business tasks with continuous human-in-the-loop governance.",
    tags: ["LangGraph", "LangChain", "Azure OpenAI", "Llama 3", "CrewAI"],
    image: "/whysoftree/ai.png",
    link: "/services/ai-development-services",
  },
  {
    text: "Power Platform",
    badge: "02 // MICROSOFT ECOSYSTEM",
    description: "Enterprise low-code business applications, automated cloud flows, interactive Power BI intelligence, and secure SharePoint portals built for operational scale.",
    tags: ["Power Apps", "Power Automate", "Power BI", "Dataverse", "SPFx"],
    image: "/whysoftree/powe-pltform.png",
    link: "/services/offshore-power-platform-development",
  },
  {
    text: "Modern Engineering",
    badge: "03 // CLOUD & FULL-STACK",
    description: "Cloud-native architectures, resilient microservices, high-throughput APIs, and modern web and mobile platforms built for continuous enterprise delivery.",
    tags: ["Next.js", "React", "Node.js", "Python / FastAPI", "Azure Cloud"],
    image: "/whysoftree/modern.png",
    link: "/services/offshore-web-app-development",
  },
  {
    text: "Data & Analytics",
    badge: "04 // BUSINESS INTELLIGENCE",
    description: "End-to-end real-time ETL pipelines, modern data warehousing, Microsoft Fabric analytics, and predictive executive dashboards turning data into action.",
    tags: ["Microsoft Fabric", "Azure Synapse", "Snowflake", "Databricks", "Power BI"],
    image: "/whysoftree/data-analytics.jpg",
    link: "/services/offshore-data-analytics",
  },
];

const DEFAULT_EASE = "cubic-bezier(1, -0.001, 0.159, 0.838)";
const CUBIC_BEZIER_RE = /^cubic-bezier\(\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]+)\)$/;

function resolveEase(ease: string): string {
  if (typeof window === "undefined" || !CustomEase) return "power4.inOut";
  const match = ease.match(CUBIC_BEZIER_RE);
  if (!match) return ease;

  const id = `ease-${match.slice(1, 5).join("_").replace(/[^\d.-]/g, "n")}`;
  if (!CustomEase.get(id)) {
    CustomEase.create(id, match.slice(1, 5).join(","));
  }
  return id;
}

function toCssLength(value: CSSLength) {
  return typeof value === "number" ? `${value}px` : value;
}

const EASE = "power4.inOut";
const DURATION = 0.9;
const TEXT_TRANSLATE_PERCENT = 40;
const TEXT_ROTATE_DEG = 45;
const OUTGOING_DURATION = DURATION * 0.45;
const VERTICAL_TEXT_TRANSLATE_PERCENT = 40;
const VERTICAL_TEXT_ROTATE_DEG = 45;
const VERTICAL_TEXT_ROTATE_REVERSED = true;
const VERTICAL_TEXT_TRANSLATE_REVERSED = true;
const VERTICAL_OUTGOING_DURATION = DURATION * 0.45;
const TEXT_Z = 60;

export interface DimensionalSwitchSliderProps {
  items?: SlideItem[];
  infinite?: boolean;
  ease?: string;
  textColor?: string;
  cardClassName?: string;
  cardWidth?: CSSLength;
  cardHeight?: CSSLength;
  direction?: "horizontal" | "vertical";
  textSize?: CSSLength;
  cardBorderRadius?: CSSLength;
  autoplay?: boolean;
  autoplayDelay?: number;
}

export const DimensionalSwitchSlider = ({
  items = CORE_EXPERTISE_ITEMS,
  infinite = true,
  ease = DEFAULT_EASE,
  textColor = "#ffffff",
  cardClassName = "w-full max-w-7xl h-[500px] sm:h-[560px] md:h-[620px] lg:h-[640px]",
  cardWidth,
  cardHeight,
  direction = "horizontal",
  textSize,
  cardBorderRadius = 32,
  autoplay = true,
  autoplayDelay = 3500,
}: DimensionalSwitchSliderProps = {}) => {
  const isVertical = direction === "vertical";
  const flipAxis = isVertical ? "rotateX" : "rotateY";
  const flipperRef = useRef<HTMLDivElement>(null);
  const prevTextRef = useRef<HTMLDivElement>(null);
  const nextTextRef = useRef<HTMLDivElement>(null);
  const showingNextRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const rotationRef = useRef(0);
  const resolvedEase = useMemo(() => resolveEase(ease), [ease]);
  const resolvedCardWidth = cardWidth ? toCssLength(cardWidth) : undefined;
  const resolvedCardHeight = cardHeight ? toCssLength(cardHeight) : undefined;
  const resolvedTextSize = textSize ? toCssLength(textSize) : undefined;
  const resolvedCardBorderRadius = toCssLength(cardBorderRadius);

  const [frontIndex, setFrontIndex] = useState(0);
  const [backIndex, setBackIndex] = useState(1 % items.length);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (prevTextRef.current && nextTextRef.current) {
      gsap.set([prevTextRef.current, nextTextRef.current], { z: TEXT_Z });
    }
  }, []);

  useEffect(() => {
    gsap.killTweensOf([flipperRef.current, prevTextRef.current, nextTextRef.current]);

    const wasShowingNext = showingNextRef.current;
    rotationRef.current = wasShowingNext ? 180 : 0;
    if (flipperRef.current) {
      gsap.set(flipperRef.current, { rotateX: 0, rotateY: 0, [flipAxis]: rotationRef.current });
    }

    const visibleRef = wasShowingNext ? nextTextRef : prevTextRef;
    const hiddenRef = wasShowingNext ? prevTextRef : nextTextRef;
    if (visibleRef.current && hiddenRef.current) {
      gsap.set(visibleRef.current, { xPercent: 0, yPercent: 0, rotateX: 0, rotateY: 0, opacity: 1 });
      gsap.set(hiddenRef.current, { xPercent: 0, yPercent: 0, rotateX: 0, rotateY: 0, opacity: 0 });
    }

    isAnimatingRef.current = false;
  }, [direction, flipAxis]);

  const flipTo = useCallback(
    (directionType: "prev" | "next", newIndex: number) => {
      const goingNext = directionType === "next";
      if (isAnimatingRef.current) return;
      const wasShowingNext = showingNextRef.current;

      flushSync(() => {
        setCurrentIndex(newIndex);
        if (wasShowingNext) {
          setFrontIndex(newIndex);
        } else {
          setBackIndex(newIndex);
        }
      });

      showingNextRef.current = !wasShowingNext;

      const outgoingRef = wasShowingNext ? nextTextRef : prevTextRef;
      const incomingRef = wasShowingNext ? prevTextRef : nextTextRef;
      const flipGoingNext = isVertical ? !goingNext : goingNext;
      rotationRef.current += flipGoingNext ? 180 : -180;
      const rotateValue = rotationRef.current;

      if (prefersReducedMotion()) {
        if (flipperRef.current) {
          gsap.set(flipperRef.current, { [flipAxis]: rotateValue });
        }
        if (outgoingRef.current && incomingRef.current) {
          gsap.set(outgoingRef.current, {
            xPercent: 0,
            yPercent: 0,
            rotateX: 0,
            rotateY: 0,
            opacity: 0,
          });
          gsap.set(incomingRef.current, {
            xPercent: 0,
            yPercent: 0,
            rotateX: 0,
            rotateY: 0,
            opacity: 1,
          });
        }
        isAnimatingRef.current = false;
        return;
      }

      isAnimatingRef.current = true;

      const tl = gsap.timeline({
        defaults: { duration: DURATION, ease: EASE },
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });

      // Card flip
      if (flipperRef.current) {
        tl.to(
          flipperRef.current,
          { [flipAxis]: rotateValue, ease: resolvedEase, duration: 0.75 },
          0,
        );
      }

      const textTl = gsap.timeline();

      if (isVertical) {
        const rotateGoingNext = VERTICAL_TEXT_ROTATE_REVERSED ? !goingNext : goingNext;
        const translateGoingNext = VERTICAL_TEXT_TRANSLATE_REVERSED ? !goingNext : goingNext;

        const outgoingEndRotate = rotateGoingNext
          ? VERTICAL_TEXT_ROTATE_DEG
          : -VERTICAL_TEXT_ROTATE_DEG;
        const outgoingEndY = translateGoingNext
          ? -VERTICAL_TEXT_TRANSLATE_PERCENT * 2
          : VERTICAL_TEXT_TRANSLATE_PERCENT * 2;
        const incomingStartRotate = rotateGoingNext
          ? -VERTICAL_TEXT_ROTATE_DEG
          : VERTICAL_TEXT_ROTATE_DEG;
        const incomingStartY = translateGoingNext
          ? VERTICAL_TEXT_TRANSLATE_PERCENT * 2
          : -VERTICAL_TEXT_TRANSLATE_PERCENT * 2;

        if (outgoingRef.current && incomingRef.current) {
          textTl.to(
            outgoingRef.current,
            {
              yPercent: outgoingEndY,
              rotateX: outgoingEndRotate,
              duration: VERTICAL_OUTGOING_DURATION * 1.5,
              ease: resolvedEase,
            },
            0,
          );
          textTl.to(outgoingRef.current, { opacity: 0, delay: -0.3, duration: 0 });
          textTl.fromTo(
            incomingRef.current,
            { yPercent: incomingStartY, rotateX: incomingStartRotate, opacity: 0 },
            {
              yPercent: 0,
              rotateX: 0,
              opacity: 1,
              duration: VERTICAL_OUTGOING_DURATION * 1.5,
              ease: resolvedEase,
            },
            0.15,
          );
        }
      } else {
        const outgoingEndRotate = goingNext ? TEXT_ROTATE_DEG : -TEXT_ROTATE_DEG;
        const outgoingEndX = goingNext
          ? TEXT_TRANSLATE_PERCENT
          : -TEXT_TRANSLATE_PERCENT;
        const incomingStartRotate = goingNext ? -TEXT_ROTATE_DEG : TEXT_ROTATE_DEG;
        const incomingStartX = goingNext
          ? -TEXT_TRANSLATE_PERCENT
          : TEXT_TRANSLATE_PERCENT;

        if (outgoingRef.current && incomingRef.current) {
          textTl.to(
            outgoingRef.current,
            {
              xPercent: outgoingEndX,
              rotateY: outgoingEndRotate,
              duration: OUTGOING_DURATION * 1.5,
              ease: resolvedEase,
            },
            0,
          );
          textTl.to(outgoingRef.current, { opacity: 0, delay: -0.3, duration: 0 });
          textTl.fromTo(
            incomingRef.current,
            { xPercent: incomingStartX, rotateY: incomingStartRotate, opacity: 0 },
            {
              xPercent: 0,
              rotateY: 0,
              opacity: 1,
              duration: OUTGOING_DURATION * 1.5,
              ease: resolvedEase,
            },
            0.15,
          );
        }
      }

      tl.add(textTl, 0);
    },
    [flipAxis, isVertical, resolvedEase],
  );

  const switchTo = useCallback(
    (directionType: "prev" | "next") => {
      const goingNext = directionType === "next";
      const wasShowingNext = showingNextRef.current;
      const currentVisibleIndex = wasShowingNext ? backIndex : frontIndex;
      const rawIndex = currentVisibleIndex + (goingNext ? 1 : -1);
      const newIndex = infinite
        ? ((rawIndex % items.length) + items.length) % items.length
        : rawIndex;

      if (!infinite && (newIndex < 0 || newIndex >= items.length)) return;

      flipTo(directionType, newIndex);
    },
    [backIndex, flipTo, frontIndex, infinite, items.length],
  );

  useEffect(() => {
    if (!autoplay || autoplayDelay <= 0 || prefersReducedMotion()) return;

    const intervalId = window.setInterval(() => {
      switchTo("next");
    }, autoplayDelay);

    return () => window.clearInterval(intervalId);
  }, [autoplay, autoplayDelay, switchTo]);

  const goToIndex = useCallback(
    (targetIndex: number) => {
      if (targetIndex === currentIndex) return;

      let directionType: "prev" | "next";
      if (infinite) {
        const forwardDistance =
          ((targetIndex - currentIndex) % items.length + items.length) %
          items.length;
        directionType = forwardDistance <= items.length - forwardDistance ? "next" : "prev";
      } else {
        directionType = targetIndex > currentIndex ? "next" : "prev";
      }

      flipTo(directionType, targetIndex);
    },
    [currentIndex, flipTo, infinite, items.length],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") switchTo("prev");
    if (e.key === "ArrowRight") switchTo("next");
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full relative outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* 3D Stage Area */}
      <div className="relative w-full flex items-center justify-center">
        {/* Flipping 3D Card Box — Full 7xl width */}
        <div
          className={`dimensional-card relative ${cardClassName}`}
          style={{
            perspective: "1400px",
            width: resolvedCardWidth,
            height: resolvedCardHeight,
          }}
        >
          <div
            ref={flipperRef}
            className="relative h-full w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front face */}
            <div
              className="absolute inset-0 h-full w-full overflow-hidden border border-zinc-200/70 bg-zinc-950 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.25)] prev-card-face"
              style={{
                borderRadius: resolvedCardBorderRadius,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <img
                src={items[frontIndex].image}
                className="w-full h-full object-cover scale-105"
                alt={items[frontIndex].text}
              />
              {/* Premium Multi-Stop Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/75 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />
            </div>

            {/* Back face */}
            <div
              className="absolute inset-0 h-full w-full overflow-hidden border border-zinc-200/70 bg-zinc-950 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.25)] next-card-face"
              style={{
                borderRadius: resolvedCardBorderRadius,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: isVertical ? "rotateX(180deg)" : "rotateY(180deg)",
              }}
            >
              <img
                src={items[backIndex].image}
                className="w-full h-full object-cover scale-105"
                alt={items[backIndex].text}
              />
              {/* Premium Multi-Stop Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/75 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 3D Rotating Floating Typography & Content */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ perspective: "1400px", fontSize: resolvedTextSize }}
        >
          {/* Front text */}
          <div
            ref={prevTextRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-12 md:px-16 pointer-events-none prev-text"
            style={{ color: textColor, transformStyle: "preserve-3d" }}
          >
            {/* Category Badge Capsule */}
            {items[frontIndex].badge && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md shadow-sm mb-4 sm:mb-5">
                <span className="h-2 w-2 rounded-full bg-[#FF5812] shadow-[0_0_8px_#FF5812] animate-pulse" />
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-white/90 uppercase">
                  {items[frontIndex].badge}
                </span>
              </div>
            )}

            {/* Main 3D Title with Brand Dot */}
            <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-black tracking-tight leading-[1.05] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] max-w-4xl">
              {items[frontIndex].text}
              <span className="text-[#FF5812]">.</span>
            </h3>

            {/* Description */}
            {items[frontIndex].description && (
              <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-white/85 max-w-2xl font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] line-clamp-3 sm:line-clamp-none">
                {items[frontIndex].description}
              </p>
            )}

            {/* Tech Stack Chips */}
            {items[frontIndex].tags && items[frontIndex].tags.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-5 max-w-2xl px-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold text-[#FF5812] uppercase tracking-wider mr-1">
                  Tech Stack:
                </span>
                {items[frontIndex].tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium text-white/95 bg-white/10 border border-white/20 backdrop-blur-md shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action FlowButton */}
            {items[frontIndex].link && (
              <div className="mt-5 sm:mt-6 pointer-events-auto">
                <FlowButton
                  href={items[frontIndex].link}
                  variant="orange-filled"
                  text="Explore Solution"
                  className="!bg-gradient-to-r !from-[#FF5812] !via-[#c51c10] !to-[#07080c] !border-white/30 text-white shadow-[0_8px_25px_rgba(255,88,18,0.4)] hover:shadow-[0_12px_32px_rgba(197,28,16,0.5)]"
                />
              </div>
            )}
          </div>

          {/* Back text */}
          <div
            ref={nextTextRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-12 md:px-16 pointer-events-none next-text opacity-0"
            style={{ color: textColor, transformStyle: "preserve-3d" }}
          >
            {/* Category Badge Capsule */}
            {items[backIndex].badge && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md shadow-sm mb-4 sm:mb-5">
                <span className="h-2 w-2 rounded-full bg-[#FF5812] shadow-[0_0_8px_#FF5812] animate-pulse" />
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-white/90 uppercase">
                  {items[backIndex].badge}
                </span>
              </div>
            )}

            {/* Main 3D Title with Brand Dot */}
            <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-black tracking-tight leading-[1.05] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] max-w-4xl">
              {items[backIndex].text}
              <span className="text-[#FF5812]">.</span>
            </h3>

            {/* Description */}
            {items[backIndex].description && (
              <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-white/85 max-w-2xl font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] line-clamp-3 sm:line-clamp-none">
                {items[backIndex].description}
              </p>
            )}

            {/* Tech Stack Chips */}
            {items[backIndex].tags && items[backIndex].tags.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-5 max-w-2xl px-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold text-[#FF5812] uppercase tracking-wider mr-1">
                  Tech Stack:
                </span>
                {items[backIndex].tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium text-white/95 bg-white/10 border border-white/20 backdrop-blur-md shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action FlowButton */}
            {items[backIndex].link && (
              <div className="mt-5 sm:mt-6 pointer-events-auto">
                <FlowButton
                  href={items[backIndex].link}
                  variant="orange-filled"
                  text="Explore Solution"
                  className="!bg-gradient-to-r !from-[#FF5812] !via-[#c51c10] !to-[#07080c] !border-white/30 text-white shadow-[0_8px_25px_rgba(255,88,18,0.4)] hover:shadow-[0_12px_32px_rgba(197,28,16,0.5)]"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls Container: Indicator Capsule + Advanced Flow Navigation Dock */}
      <div className="flex justify-center mt-6 sm:mt-8 z-30 px-3 select-none">
        {/* Master Orange-Red-Black Flight-Deck Pod with Ambient Glow */}
        <div className="relative group/dock">
          {/* Atmospheric Orange-Red-Black Glow behind the dock */}
          <div
            className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#FF5812]/50 via-[#c51c10]/45 to-black/40 blur-xl opacity-75 group-hover/dock:opacity-100 transition-opacity duration-700 pointer-events-none"
            aria-hidden
          />

          {/* Master Orange-Red-Black Glass Capsule Surface */}
          <div className="relative flex items-center gap-2.5 sm:gap-3.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#FF5812] via-[#c51c10] to-[#07080c] border border-white/30 shadow-[0_16px_40px_-8px_rgba(255,88,18,0.35),0_4px_16px_rgba(197,28,16,0.25),inset_0_1px_1px_rgba(255,255,255,0.45)]">
            {/* Previous Flow Arrow Button */}
            <button
              type="button"
              onClick={() => switchTo("prev")}
              aria-label="Previous capability"
              disabled={!infinite && currentIndex === 0}
              className="group relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-black/25 text-white shadow-sm transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white hover:border-white hover:text-[#FF5812] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:scale-105 active:scale-95 disabled:opacity-25 disabled:pointer-events-none cursor-pointer select-none"
            >
              {/* Expanding White Circle on hover */}
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:w-32 group-hover:h-32 group-hover:opacity-100 transition-all duration-600 ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none" />

              {/* Outgoing Center Arrow: Slides Left */}
              <ArrowLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-white stroke-[2.2] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10 group-hover:-translate-x-7 group-hover:opacity-0 group-hover:stroke-[#FF5812]" />

              {/* Incoming Right Arrow: Slides In From Right */}
              <ArrowLeft className="absolute w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[#FF5812] stroke-[2.2] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10 translate-x-7 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
            </button>

            {/* Segmented Indicator Capsule with Tooltips */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/30 border border-white/20 shadow-inner backdrop-blur-md">
              {items.map((item, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={item.text}
                    type="button"
                    onClick={() => goToIndex(idx)}
                    aria-label={`Go to ${item.text}`}
                    aria-current={isActive}
                    className={`group relative h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer ${
                      isActive
                        ? "w-7 sm:w-9 bg-white shadow-[0_0_12px_rgba(255,255,255,0.95)]"
                        : "w-2 bg-white/35 hover:bg-white/70 hover:w-4"
                    }`}
                  >
                    {/* Floating Glass Tooltip */}
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-950/95 px-2 py-0.5 text-[10px] font-medium text-white opacity-0 shadow-xl backdrop-blur-md transition-all duration-200 group-hover:-top-9 group-hover:opacity-100 z-50 border border-white/15 flex items-center gap-1">
                      <span className="text-[#FF5812] font-mono font-semibold">0{idx + 1}</span>
                      <span>{item.text}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Center Telemetry Pod - Compact & High Contrast */}
            <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 rounded-full border border-white/20 bg-black/30 backdrop-blur-md shadow-inner">
              {/* Live White Pulse + Index */}
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white shadow-[0_0_6px_#fff]"></span>
                </span>
                <span className="text-[11px] sm:text-xs font-mono font-bold text-white tracking-wider">
                  {`0${currentIndex + 1}`}
                </span>
              </div>

              <span className="h-3 w-[1px] bg-white/25" aria-hidden />

              {/* Capability Title */}
              <span className="text-[11px] sm:text-xs font-semibold text-white tracking-tight max-w-[90px] sm:max-w-[140px] truncate">
                {items[currentIndex].text}
              </span>

              <span className="h-3 w-[1px] bg-white/25" aria-hidden />

              {/* Total Count */}
              <span className="text-[11px] sm:text-xs font-mono text-white/70 font-medium">
                {`0${items.length}`}
              </span>
            </div>

            {/* Next Flow Arrow Button */}
            <button
              type="button"
              onClick={() => switchTo("next")}
              aria-label="Next capability"
              disabled={!infinite && currentIndex === items.length - 1}
              className="group relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-black/25 text-white shadow-sm transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white hover:border-white hover:text-[#FF5812] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:scale-105 active:scale-95 disabled:opacity-25 disabled:pointer-events-none cursor-pointer select-none"
            >
              {/* Expanding White Circle on hover */}
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:w-32 group-hover:h-32 group-hover:opacity-100 transition-all duration-600 ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none" />

              {/* Outgoing Center Arrow: Slides Right */}
              <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-white stroke-[2.2] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10 group-hover:translate-x-7 group-hover:opacity-0 group-hover:stroke-[#FF5812]" />

              {/* Incoming Left Arrow: Slides In From Left */}
              <ArrowRight className="absolute w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[#FF5812] stroke-[2.2] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10 -translate-x-7 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LatestTechnologies() {
  return (
    <section className="w-full py-16 md:py-24 bg-white text-zinc-900 relative overflow-hidden">
      {/* Subtle soft warm ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-[#FF5812]/04 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14 flex flex-col items-center max-w-5xl mx-auto">
          <span className="typo-caption inline-flex items-center gap-2 rounded-full border border-[#FF5812]/20 bg-[#FF5812]/05 px-4 py-1.5 text-[#FF5812] mb-4 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
            CORE EXPERTISE
          </span>

          <h2 className="typo-heading-2 text-zinc-900 mb-4 sm:whitespace-nowrap">
            Enterprise Technologies & <span className="text-[#FF5812]">Engineering Pillars</span>
          </h2>

          <p className="typo-description text-zinc-600 leading-relaxed max-w-3xl">
            From autonomous Agentic AI to enterprise Microsoft Power Platform and scalable modern engineering, explore our core technology capabilities.
          </p>
        </div>

        {/* Dimensional Switch Slider with 7xl card */}
        <DimensionalSwitchSlider />
      </div>
    </section>
  );
}
