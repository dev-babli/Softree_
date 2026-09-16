"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { FlowButton } from "@/components/ui/flow-button";

export interface UseCaseSlide {
  id: string;
  domain: string;
  title: string;
  description: string;
  cardCategory: string;
  cardStatus: string;
  supportingPoints?: { label?: string; value: string }[];
  integrationLine?: string;
  additionalDescription?: string;
  workflowSteps?: string;
}

const SLIDES: UseCaseSlide[] = [
  {
    id: "01",
    domain: "USER REQUEST",
    title: "Procurement Request",
    description: "Understand purchasing requirements, product specifications, budgets, quantities, and delivery needs from the user's request.",
    cardCategory: "[ INTENT PREPARATION ]",
    cardStatus: "● NATURAL LANGUAGE",
  },
  {
    id: "02",
    domain: "PROCUREMENT AGENT",
    title: "AI-Powered Procurement Orchestration",
    description: "Coordinate specialized AI agents to manage the procurement workflow from supplier research through purchase order generation.",
    cardCategory: "[ MULTI-AGENT SWARM ]",
    cardStatus: "● ORCHESTRATION",
    supportingPoints: [
      { label: "Research Agent", value: "Find and compare suitable suppliers." },
      { label: "Pricing Agent", value: "Analyze pricing, availability, and commercial terms." },
      { label: "Compliance Agent", value: "Validate policies, requirements, and supplier compliance." },
      { label: "Approval Agent", value: "Route purchase decisions through the required approval workflow." },
    ]
  },
  {
    id: "03",
    domain: "AGENTCORE",
    title: "Amazon Bedrock AgentCore",
    description: "Use Amazon Bedrock AgentCore to orchestrate production-ready AI agents with secure access to enterprise tools, data, APIs, and business applications.",
    cardCategory: "[ AWS INFRASTRUCTURE ]",
    cardStatus: "● SECURE RUNTIME",
    supportingPoints: [
      { value: "Agent orchestration" },
      { value: "Secure tool access" },
      { value: "Enterprise data connectivity" },
      { value: "Production-ready agent execution" },
    ]
  },
  {
    id: "04",
    domain: "ENTERPRISE CONNECTIONS",
    title: "Connect Procurement Systems",
    description: "Integrate AI agents with the systems already used by your business.",
    cardCategory: "[ SYSTEM INTEGRATION ]",
    cardStatus: "● MCP SERVERS",
    integrationLine: "ERP · Supplier APIs · Databases · Email · Business Applications",
    additionalDescription: "Enable agents to retrieve information, communicate with systems, and execute procurement actions across connected enterprise workflows."
  },
  {
    id: "05",
    domain: "INTELLIGENT DECISION",
    title: "Automated Procurement Decisions",
    description: "Combine supplier research, pricing information, compliance requirements, and approval rules to support faster and more consistent procurement decisions.",
    cardCategory: "[ AI REASONING ]",
    cardStatus: "● DECISION ENGINE",
    supportingPoints: [
      { value: "Supplier evaluation" },
      { value: "Price comparison" },
      { value: "Compliance validation" },
      { value: "Approval routing" },
    ]
  },
  {
    id: "06",
    domain: "BUSINESS ACTION",
    title: "Purchase Order Automation",
    description: "Turn an approved procurement decision into a completed business action by generating and processing the purchase order through connected enterprise systems.",
    cardCategory: "[ WORKFLOW EXECUTION ]",
    cardStatus: "● AUTOMATED ACTION",
    workflowSteps: "USER REQUEST → AI AGENTS → AGENTCORE → ENTERPRISE SYSTEMS → PURCHASE ORDER"
  }
];

const TILTS = [-3.5, 4, -6, 2.5, -2, 5.5];

function AgentCorePhotoStack({
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

  useEffect(() => {
    if (hovered || dragging) return;
    const intervalId = setInterval(() => {
      const nextIndex = selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1;
      onSelectIndex(nextIndex);
    }, 4500); // Slightly longer for reading dense text
    return () => clearInterval(intervalId);
  }, [hovered, dragging, selectedIndex, photos.length, onSelectIndex]);

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

  const frontPhoto = photos[selectedIndex];
  const total = photos.length;
  const frameNumber = String(selectedIndex + 1).padStart(2, "0");

  return (
    <div className={`flex flex-col items-center justify-between gap-4 ${className}`}>
      <div
        className="relative w-[320px] sm:w-[420px] h-[520px] sm:h-[540px] mb-3"
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
              className="absolute top-0 left-0 w-full h-[480px] sm:h-[500px] overflow-hidden rounded-2xl border border-white/20 focus:outline-none focus-visible:ring-2 flex flex-col items-start justify-start gap-4 p-6 sm:p-7 text-left select-none"
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
              <div className="relative z-10 w-full flex items-center justify-between text-[10px] font-mono tracking-wider text-white/80 select-none pointer-events-none mb-2">
                <span>{photo.cardCategory}</span>
                <span className="font-bold text-white">{photo.cardStatus}</span>
              </div>
              
              {/* Main Title & Description */}
              <div className="relative z-10 w-full flex flex-col gap-2 select-none pointer-events-none">
                <h3 
                  className="text-white font-bold leading-snug tracking-tight pr-2"
                  style={{ fontSize: "22px" }}
                >
                  {photo.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-white/90">
                  {photo.description}
                </p>
              </div>

              {/* Dynamic Bottom Content Area based on Prompt */}
              <div className="relative z-10 w-full mt-auto">
                {/* 1. Supporting Points with Labels (e.g. Slide 02) */}
                {photo.supportingPoints && photo.supportingPoints[0].label && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] text-white/90">
                    {photo.supportingPoints.map((sp, idx) => (
                      <div key={idx} className="flex flex-col border-l border-white/20 pl-2.5">
                        <span className="opacity-70 text-[9px] uppercase tracking-wider mb-0.5 font-mono">{sp.label}</span>
                        <span className="font-semibold text-[11px] text-white leading-snug">{sp.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* 2. Supporting Points without Labels (e.g. Slide 03, 05) */}
                {photo.supportingPoints && !photo.supportingPoints[0].label && (
                  <div className="flex flex-wrap gap-2 text-white/90 text-[11px] font-semibold mt-2">
                    {photo.supportingPoints.map((sp, idx) => (
                      <span key={idx} className="bg-white/10 px-2.5 py-1.5 rounded-md border border-white/20">
                        {sp.value}
                      </span>
                    ))}
                  </div>
                )}

                {/* 3. Integration Line & Additional Desc (e.g. Slide 04) */}
                {photo.integrationLine && (
                  <div className="flex flex-col gap-3">
                    <div className="font-mono text-[10px] tracking-wide text-white bg-white/10 inline-block px-2.5 py-1.5 rounded-md border border-white/20 w-fit">
                      {photo.integrationLine}
                    </div>
                    {photo.additionalDescription && (
                      <p className="text-[12px] text-white/80 leading-relaxed border-l-2 border-[#ffb18d] pl-3">
                        {photo.additionalDescription}
                      </p>
                    )}
                  </div>
                )}

                {/* 4. Workflow Steps (e.g. Slide 06) */}
                {photo.workflowSteps && (
                  <div className="flex flex-col gap-2 mt-2">
                    <span className="opacity-70 text-[10px] font-mono uppercase tracking-wider">Workflow</span>
                    <div className="font-mono text-[11px] font-bold text-white tracking-wide leading-relaxed bg-black/15 p-3 rounded-lg border border-white/10 shadow-inner">
                      {photo.workflowSteps}
                    </div>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex w-[320px] sm:w-[420px] items-start justify-between gap-3 px-2">
        <div className="min-w-0">
          <p className="text-[16px] font-bold leading-normal text-slate-900 line-clamp-1">
            {frontPhoto.title}
          </p>
          <p className="mt-1 text-[13px] text-slate-500 font-mono tracking-tight">
            {frontPhoto.domain}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3 pt-0.5">
          <span
            className="text-[12px] tabular-nums text-slate-500"
            style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace" }}
          >
            {frameNumber}/{String(total).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => advance(-1)}
            aria-label="Previous photo"
            className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 transition-colors hover:border-[#FF6B2C] hover:text-[#FF6B2C] focus:outline-none focus-visible:ring-2 text-slate-800"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => advance(1)}
            aria-label="Next photo"
            className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 transition-colors hover:border-[#FF6B2C] hover:text-[#FF6B2C] focus:outline-none focus-visible:ring-2 text-slate-800"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      style={{ transform: direction === "left" ? "rotate(180deg)" : undefined }}
    >
      <path
        d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AgentCoreFeaturedUseCase() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="bg-white pt-24 pb-16 lg:pb-24 text-slate-900 relative overflow-hidden">
      {/* Subtle ambient backdrop lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Content Side */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5 text-left">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/80 px-4 py-1.5 rounded-full border border-white/80 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse" />
              <span className="text-[11px] font-bold text-[#FF6B2C] tracking-widest uppercase font-mono">
                FEATURED AGENTIC AI USE CASE
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-[1.12] font-['Plus_Jakarta_Sans',sans-serif]">
                Multi-Agent{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] via-[#ea580c] to-[#c2410c]">
                  Procurement Automation
                </span>
              </h2>
              <p className="text-slate-600 text-[14.5px] sm:text-[15.5px] leading-relaxed max-w-2xl pt-1">
                Automate complex procurement workflows with AI agents that research suppliers, evaluate pricing, validate compliance, and coordinate approvals through Amazon Bedrock AgentCore.
              </p>
            </div>

            {/* 6 Slides List - Pure Editorial Swiss Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 pt-4 mb-4">
              {SLIDES.map((slide, idx) => {
                const isActive = activeSlide === idx;
                return (
                  <div
                    key={slide.id}
                    onClick={() => setActiveSlide(idx)}
                    onMouseEnter={() => setActiveSlide(idx)}
                    className={`group cursor-pointer text-left transition-all duration-200 relative pl-3.5 py-1.5 border-l-2 border-[#FF6B2C] ${
                      isActive ? "bg-orange-500/[0.06] rounded-r-md" : "hover:bg-orange-500/[0.02]"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[11px] font-mono font-bold transition-colors ${
                          isActive ? "text-[#FF6B2C]" : "text-slate-500 group-hover:text-[#FF6B2C]"
                        }`}
                      >
                        {slide.id}
                      </span>
                      <span className="text-[10px] font-mono tracking-wider font-semibold text-slate-400 uppercase">
                        {slide.domain}
                      </span>
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF6B2C] animate-ping" />
                      )}
                    </div>
                    <h4
                      className={`text-[15px] sm:text-[16px] font-bold transition-colors leading-snug ${
                        isActive ? "text-[#FF6B2C]" : "text-slate-900 group-hover:text-[#FF6B2C]"
                      }`}
                    >
                      {slide.title}
                    </h4>
                    <p className="text-[12.5px] text-slate-500 leading-relaxed mt-1 line-clamp-2 pr-2">
                      {slide.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-slate-100">
              <FlowButton 
                href="/contact"
                text="SEE HOW WE BUILD AGENTIC WORKFLOWS"
                variant="orange-filled"
                className="shadow-lg shadow-orange-500/20"
              />
            </div>
          </div>

          {/* Right Side - Synchronized Interactive Photo Stack */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-10 lg:mt-0">
            <AgentCorePhotoStack 
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
