"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FlowButton } from "@/components/ui/flow-button";

export interface UseCaseSlide {
  id: string;
  domain: string;
  title: string;
  description: string;
  cardCategory: string;
  highlights: string[];
  tags: string[];
}

const SLIDES: UseCaseSlide[] = [
  {
    id: "01",
    domain: "DEDICATED LOGISTICS TESTING ENGINEER",
    title: "Dedicated Logistics Testing Engineer",
    description:
      "Work with a dedicated QA engineer focused on ongoing logistics application testing, regression coverage, integrations, and release quality.",
    cardCategory: "[ LOGISTICS TESTING ENGAGEMENT ]",
    highlights: [
      "TMS & WMS testing support",
      "Logistics test automation and regression coverage",
      "API, EDI, and integration validation",
      "Continuous QA and release support",
    ],
    tags: ["Dedicated QA", "Automation", "Integration Testing", "Continuous Support"],
  },
  {
    id: "02",
    domain: "OFFSHORE LOGISTICS TESTING DELIVERY",
    title: "Offshore Logistics Testing Delivery",
    description:
      "Extend your engineering organization with an offshore logistics QA team supporting TMS, WMS, APIs, EDI, warehouse systems, and supply chain applications.",
    cardCategory: "[ LOGISTICS TESTING ENGAGEMENT ]",
    highlights: [
      "Distributed logistics testing team working alongside your engineers",
      "Close collaboration with supply chain architects and product teams",
      "Flexible offshore delivery aligned with your release pipelines",
    ],
    tags: ["QA Team", "Offshore Delivery", "Supply Chain Focus"],
  },
  {
    id: "03",
    domain: "LOGISTICS TEST AUTOMATION",
    title: "Logistics Test Automation",
    description:
      "Build and maintain automated regression and end-to-end tests for transportation, warehouse, shipment, inventory, API, and integration workflows.",
    cardCategory: "[ LOGISTICS TESTING ENGAGEMENT ]",
    highlights: [
      "Automated regression suites for complex logistics workflows",
      "API and EDI test automation for robust integrations",
      "End-to-end automation across transportation and warehouse systems",
    ],
    tags: ["Test Automation", "Regression Suites", "API Automation"],
  },
  {
    id: "04",
    domain: "FLEXIBLE TESTING ENGAGEMENT",
    title: "Flexible Logistics Testing Engagement",
    description:
      "Scale logistics testing resources based on application complexity, release schedules, testing scope, automation needs, and ongoing QA requirements.",
    cardCategory: "[ LOGISTICS TESTING ENGAGEMENT ]",
    highlights: [
      "Logistics QA capacity aligned with your specific project requirements",
      "Scalable resources for peak release cycles and major migrations",
      "Flexible support covering functional, automation, and integration testing",
    ],
    tags: ["Flexible", "Scalable Resources", "Project QA"],
  },
  {
    id: "05",
    domain: "CONTINUOUS LOGISTICS QUALITY",
    title: "Continuous Logistics Quality",
    description:
      "Integrate testing into development and CI/CD workflows to continuously validate logistics functionality, integrations, performance, and reliability.",
    cardCategory: "[ LOGISTICS TESTING ENGAGEMENT ]",
    highlights: [
      "Automated logistics testing integrated into CI/CD pipelines",
      "Faster validation of TMS, WMS, and supply chain updates",
      "Improved release confidence with automated quality guardrails",
    ],
    tags: ["CI/CD Integration", "Continuous Validation", "Quality Engineering"],
  },
  {
    id: "06",
    domain: "ONGOING LOGISTICS QA SUPPORT",
    title: "Ongoing Logistics QA Support",
    description:
      "Support logistics applications through new releases, workflow changes, integrations, regression cycles, production improvements, and continuous quality initiatives.",
    cardCategory: "[ LOGISTICS TESTING ENGAGEMENT ]",
    highlights: [
      "Test suite maintenance across logistics application updates",
      "Comprehensive regression testing and integration validation",
      "Ongoing quality improvements to ensure system reliability",
    ],
    tags: ["Ongoing QA", "System Reliability", "Continuous Improvement"],
  },
];

const TILTS = [-3.5, 4, -6, 2.5, -2, 5.5];

function OffshoreTeamStack({
  photos = SLIDES,
  className = "",
  selectedIndex,
  onSelectIndex,
}: {
  photos?: UseCaseSlide[];
  className?: string;
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
}) {
  const [order, setOrder] = useState<number[]>(() => photos.map((_, i) => i));
  const [hovered, setHovered] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);

  const displayOrder =
    order[0] === selectedIndex
      ? order
      : [selectedIndex, ...order.filter((i) => i !== selectedIndex)];

  useEffect(() => {
    setOrder((prev) => {
      if (prev[0] === selectedIndex) return prev;
      const rest = prev.filter((i) => i !== selectedIndex);
      return [selectedIndex, ...rest];
    });
    setDragX(0);
  }, [selectedIndex]);

  const advance = (direction: 1 | -1) => {
    if (direction === 1) {
      const nextIndex = selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1;
      onSelectIndex(nextIndex);
    } else {
      const prevIndex = selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1;
      onSelectIndex(prevIndex);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (displayOrder.length < 2) return;
    setDragging(true);
    dragStartX.current = e.clientX;
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragX(e.clientX - dragStartX.current);
  };

  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    const threshold = 90;
    if (dragX > threshold) {
      advance(-1);
    } else if (dragX < -threshold) {
      advance(1);
    } else {
      setDragX(0);
    }
  };

  const total = photos.length;

  return (
    <div className={`flex flex-col items-center justify-between gap-4 ${className}`}>
      <div
        className="relative w-[320px] sm:w-[420px] h-[500px] sm:h-[520px] mb-3"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {displayOrder.map((photoIndex, depth) => {
          const photo = photos[photoIndex];
          const isFront = depth === 0;
          const tilt = TILTS[photoIndex % TILTS.length];

          const spread = hovered ? 1.7 : 1;
          const translateX = isFront
            ? dragX
            : depth * 7 * (depth % 2 === 0 ? 1 : -1) * spread;
          const translateY = depth * 9 * spread;
          const rotate = isFront
            ? tilt * 0.2 + dragX / 14
            : tilt + depth * (depth % 2 === 0 ? 1.5 : -1.5) * spread;
          const scale = 1 - depth * 0.045;

          return (
            <motion.button
              key={photo.id}
              type="button"
              aria-label={isFront ? `Send "${photo.title}" to the back of the stack` : undefined}
              tabIndex={isFront ? 0 : -1}
              onClick={() => isFront && !dragging && advance(1)}
              onPointerDown={isFront ? onPointerDown : undefined}
              onPointerMove={isFront ? onPointerMove : undefined}
              onPointerUp={isFront ? endDrag : undefined}
              onPointerCancel={isFront ? endDrag : undefined}
              className="absolute top-0 left-0 w-full h-[460px] sm:h-[480px] overflow-hidden rounded-2xl border border-white/20 focus:outline-none focus-visible:ring-2 flex flex-col items-start justify-start gap-4 p-6 sm:p-7 text-left select-none"
              animate={{
                x: translateX,
                y: translateY,
                rotate: rotate,
                scale: scale,
                zIndex: total - depth,
                boxShadow: isFront
                  ? "0 22px 36px -10px rgba(234, 88, 12, 0.45), 0 10px 18px -6px rgba(0,0,0,0.15)"
                  : "0 8px 16px -8px rgba(0,0,0,0.22)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
              style={{
                cursor: isFront ? (dragging ? "grabbing" : "grab") : "default",
                background: "linear-gradient(145deg, #FF6B2C 0%, #EA580C 52%, #C2410C 100%)",
                // @ts-expect-error -- tw-ring-color custom property
                "--tw-ring-color": "#FFFFFF",
              }}
            >
              {/* Solid Grain Texture Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  opacity: 0.22,
                  mixBlendMode: "overlay",
                  pointerEvents: "none",
                }}
              />

              {/* Monospace Header */}
              <div className="relative z-10 w-full flex items-center justify-between typo-caption text-white/80 select-none pointer-events-none mb-1">
                <span className="font-mono text-xs tracking-wider uppercase">{photo.cardCategory}</span>
                <span className="font-mono text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">{photo.id} / {String(total).padStart(2, "0")}</span>
              </div>

              {/* Main Title & Description */}
              <div className="relative z-10 w-full flex flex-col gap-1.5 select-none pointer-events-none">
                <h3
                  className="text-white font-bold leading-snug tracking-tight pr-2"
                  style={{ fontSize: "22px" }}
                >
                  {photo.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-white/90">
                  {photo.description}
                </p>
              </div>

              {/* Divider */}
              <div className="relative z-10 w-full h-px bg-white/20 my-1" />

              {/* Highlights / Deliverables */}
              <div className="relative z-10 w-full flex flex-col gap-2 select-none pointer-events-none">
                <span className="text-[11px] font-mono tracking-wider text-white/75 uppercase font-semibold">
                  Core Highlights:
                </span>
                <ul className="space-y-2">
                  {photo.highlights.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-[12.5px] sm:text-[13px] leading-snug text-white/95">
                      <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Tags */}
              <div className="relative z-10 w-full mt-auto pt-3 border-t border-white/20 flex flex-wrap gap-1.5 select-none pointer-events-none">
                {photo.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-sm text-[11px] font-semibold text-white tracking-tight"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default function OffshoreLogisticsTestingTeam() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="bg-white pt-12 md:pt-16 pb-12 md:pb-20 text-slate-900 relative overflow-hidden">
      {/* Subtle ambient backdrop lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Content Side */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5 text-left">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/80 px-4 py-1.5 rounded-full border border-white/80 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse" />
              <span className="typo-caption text-[#FF6B2C] uppercase font-semibold text-xs">
                OFFSHORE LOGISTICS TESTING TEAM
              </span>
            </div>

            {/* Headline & Subheading */}
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-[1.2]">
                Extend Your QA & Engineering{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] via-[#ea580c] to-[#c2410c]">
                  Team With Softree
                </span>
              </h2>
              <p className="typo-description text-slate-600 max-w-2xl pt-1 text-sm sm:text-base leading-relaxed">
                Get an offshore logistics testing team that works alongside your developers, architects, product teams, and existing QA organization to validate logistics applications, integrations, and end-to-end supply chain workflows.
              </p>
            </div>

            {/* 6 Slides List - Pure Editorial Swiss Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 pt-2 mb-3">
              {SLIDES.map((slide, idx) => {
                const isActive = activeSlide === idx;
                return (
                  <div
                    key={slide.id}
                    onClick={() => setActiveSlide(idx)}
                    onMouseEnter={() => setActiveSlide(idx)}
                    className={`group cursor-pointer text-left transition-all duration-200 relative pl-3.5 py-1.5 border-l-2 border-[#FF6B2C] ${isActive ? "bg-orange-500/[0.06] rounded-r-md" : "hover:bg-orange-500/[0.02]"
                      }`}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className={`typo-caption transition-colors text-xs font-mono font-bold ${isActive ? "text-[#FF6B2C]" : "text-slate-500 group-hover:text-[#FF6B2C]"
                          }`}
                      >
                        {slide.id}
                      </span>
                      <span className="typo-caption text-slate-400 uppercase text-[11px]">
                        {slide.domain}
                      </span>
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF6B2C] animate-ping" />
                      )}
                    </div>
                    <h4
                      className={`text-sm sm:text-[15px] font-bold transition-colors leading-snug ${isActive ? "text-[#FF6B2C]" : "text-slate-900 group-hover:text-[#FF6B2C]"
                        }`}
                    >
                      {slide.title}
                    </h4>
                    <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5 line-clamp-2 pr-2 leading-relaxed">
                      {slide.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-3 border-t border-slate-100">
              <FlowButton
                href="/contact"
                text="EXPLORE LOGISTICS TESTING SERVICES "
                variant="orange-filled"
                className="shadow-lg shadow-orange-500/20"
              />
            </div>
          </div>

          {/* Right Side - Synchronized Interactive Photo Stack */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-8 lg:mt-0">
            <OffshoreTeamStack
              photos={SLIDES}
              selectedIndex={activeSlide}
              onSelectIndex={(idx) => setActiveSlide(idx)}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
