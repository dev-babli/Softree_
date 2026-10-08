"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FlowButton } from "@/components/ui/flow-button";

export interface MethodologySlide {
  id: string;
  domain: string;
  title: string;
  description: string;
  cardCategory: string;
  highlights: string[];
  tags: string[];
}

const SLIDES: MethodologySlide[] = [
  {
    id: "01",
    domain: "SQL SERVER DATABASES",
    title: "SQL Server Databases",
    description:
      "Migrate SQL Server databases, schemas, tables, views, and related database structures into the target Microsoft Fabric environment.",
    cardCategory: "[ MIGRATION SCOPE ]",
    highlights: [
      "Database & schema migration",
      "Table & view transition",
      "Target environment planning",
    ],
    tags: ["Databases", "Migration", "Schemas"],
  },
  {
    id: "02",
    domain: "SQL WORKLOADS",
    title: "SQL Workloads",
    description:
      "Assess and modernize queries, stored procedures, functions, and analytical workloads for Microsoft Fabric.",
    cardCategory: "[ MIGRATION SCOPE ]",
    highlights: [
      "Query modernization",
      "Stored procedure conversion",
      "Analytical workload mapping",
    ],
    tags: ["Workloads", "Modernization", "Queries"],
  },
  {
    id: "03",
    domain: "DATA WAREHOUSING",
    title: "Data Warehouse Workloads",
    description:
      "Modernize SQL Server data warehouse structures, analytical tables, and workloads for Microsoft Fabric Warehouse.",
    cardCategory: "[ MIGRATION SCOPE ]",
    highlights: [
      "Warehouse structure migration",
      "Analytical table transition",
      "Fabric Warehouse alignment",
    ],
    tags: ["Data Warehouse", "Analytics", "Structure"],
  },
  {
    id: "04",
    domain: "POWER BI & SEMANTIC MODELS",
    title: "Power BI & Semantic Models",
    description:
      "Align Power BI reports, datasets, and semantic models with the modernized Fabric data environment for continued enterprise analytics.",
    cardCategory: "[ MIGRATION SCOPE ]",
    highlights: [
      "Power BI report alignment",
      "Dataset migration",
      "Semantic model transition",
    ],
    tags: ["Power BI", "Semantic Models", "Analytics"],
  },
  {
    id: "05",
    domain: "SECURITY & ACCESS",
    title: "Security & Access",
    description:
      "Address users, roles, permissions, authentication, access controls, and governance requirements throughout the migration.",
    cardCategory: "[ MIGRATION SCOPE ]",
    highlights: [
      "Role & permission mapping",
      "Authentication alignment",
      "Governance establishment",
    ],
    tags: ["Security", "Access", "Governance"],
  },
  {
    id: "06",
    domain: "DATA INTEGRATIONS",
    title: "Data Integrations",
    description:
      "Connect external systems, applications, APIs, ETL workflows, and downstream dependencies with the modernized Fabric environment.",
    cardCategory: "[ MIGRATION SCOPE ]",
    highlights: [
      "System & API connections",
      "ETL workflow migration",
      "Downstream dependency mapping",
    ],
    tags: ["Integrations", "ETL", "Connections"],
  },
];

const TILTS = [-3.5, 4, -6, 2.5, -2, 5];

function MethodologyStack({
  slides = SLIDES,
  className = "",
  selectedIndex,
  onSelectIndex,
}: {
  slides?: MethodologySlide[];
  className?: string;
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
}) {
  const [order, setOrder] = useState<number[]>(() => slides.map((_, i) => i));
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
      const nextIndex = selectedIndex === slides.length - 1 ? 0 : selectedIndex + 1;
      onSelectIndex(nextIndex);
    } else {
      const prevIndex = selectedIndex === 0 ? slides.length - 1 : selectedIndex - 1;
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

  const total = slides.length;

  return (
    <div className={`flex flex-col items-center justify-between gap-4 ${className}`}>
      <div
        className="relative w-[320px] sm:w-[420px] h-[500px] sm:h-[520px] mb-3"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {displayOrder.map((slideIndex, depth) => {
          const slide = slides[slideIndex];
          const isFront = depth === 0;
          const tilt = TILTS[slideIndex % TILTS.length];

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
              key={slide.id}
              type="button"
              aria-label={isFront ? `Send "${slide.title}" to the back of the stack` : undefined}
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
                <span className="font-mono text-xs tracking-wider uppercase">{slide.cardCategory}</span>
                <span className="font-mono text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">{slide.id} / {String(total).padStart(2, "0")}</span>
              </div>

              {/* Main Title & Description */}
              <div className="relative z-10 w-full flex flex-col gap-1.5 select-none pointer-events-none">
                <h3
                  className="text-white font-bold leading-snug tracking-tight pr-2"
                  style={{ fontSize: "22px" }}
                >
                  {slide.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-white/90">
                  {slide.description}
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
                  {slide.highlights.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-[12.5px] sm:text-[13px] leading-snug text-white/95">
                      <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Tags */}
              <div className="relative z-10 w-full mt-auto pt-3 border-t border-white/20 flex flex-wrap gap-1.5 select-none pointer-events-none">
                {slide.tags.map((tag, tIdx) => (
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

export default function MigrationMethodology() {
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
                MIGRATION SCOPE
              </span>
            </div>

            {/* Headline & Subheading */}
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-[1.2]">
                Migrate Your SQL Server Workloads with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] via-[#ea580c] to-[#c2410c]">
                  Minimal Disruption
                </span>
              </h2>
              <p className="typo-description text-slate-600 max-w-2xl pt-1 text-sm sm:text-base leading-relaxed">
                Softree delivers structured SQL Server to Microsoft Fabric migrations, transitioning databases, SQL workloads, data warehouses, integrations, and Power BI assets into a modern, scalable data environment.
              </p>
            </div>

            {/* 5 Slides List */}
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
                text="START YOUR MIGRATION JOURNEY"
                variant="orange-filled"
                className="shadow-lg shadow-orange-500/20"
              />
            </div>
          </div>

          {/* Right Side - Synchronized Interactive Photo Stack */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-8 lg:mt-0">
            <MethodologyStack
              slides={SLIDES}
              selectedIndex={activeSlide}
              onSelectIndex={(idx) => setActiveSlide(idx)}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
