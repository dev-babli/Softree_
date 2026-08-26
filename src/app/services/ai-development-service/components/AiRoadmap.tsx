"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Completely unique, professional B2B engineering roadmap phases
const roadmapPhases = [
  {
    number: "01",
    title: "Strategic Exploration & Objective Mapping",
    description: "We partner with your team to evaluate current software configurations, pinpoint high-value automation use cases, and outline target performance metrics. By mapping constraints early, we establish a robust engineering blueprint that aligns directly with corporate key results.",
  },
  {
    number: "02",
    title: "Structured Data Pipelines & Ingestion",
    description: "We construct clean, secure ETL pipelines and index your proprietary knowledge bases into dedicated vector search databases. This prepares your document stores for semantic retrieval models while maintaining absolute data privacy boundaries.",
  },
  {
    number: "03",
    title: "Cognitive Design & Custom Runtimes",
    description: "Our engineering squad designs custom agentic workflows using LangGraph and tests leading LLMs against your dataset. We run iterative evaluations to fine-tune response accuracies and prompt logic, ensuring highly structured outputs.",
  },
  {
    number: "04",
    title: "Production Integration & Orchestration",
    description: "We dockerize model microservices and orchestrate secure deployments on Kubernetes. Using optimized REST APIs, we embed these intelligent capabilities directly into your existing enterprise ERP, CRM, and cloud systems.",
  },
  {
    number: "05",
    title: "Continuous Telemetry & Guardrails",
    description: "We deploy real-time monitoring dashboard tools to audit model latency, prompt drifts, and compliance rules. Through automated feedback logging loops, we systematically refine model performance to guarantee long-term operational accuracy.",
  },
];

// Custom high-fidelity, highly meaningful SVGs representing each roadmap phase conceptually
function PhaseIcon({ number }: { number: string }) {
  if (number === "01") {
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Document grid backdrop */}
        <path d="M8 12h32M8 20h20M8 28h16M8 36h24" strokeWidth="1" strokeLinecap="round" className="opacity-30" />
        {/* Magnifying Glass representing Exploration & Discovery */}
        <circle cx="28" cy="22" r="8" fill="currentColor" fillOpacity="0.05" strokeWidth="1.8" />
        <line x1="22" y1="28" x2="14" y2="36" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M25 18a4 4 0 014 4" strokeWidth="1" strokeLinecap="round" />
      </svg>
    );
  }
  if (number === "02") {
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Server Stack representing Data Infrastructure */}
        <rect x="12" y="10" width="24" height="8" rx="2" fill="currentColor" fillOpacity="0.05" strokeWidth="1.8" />
        <rect x="12" y="22" width="24" height="8" rx="2" fill="currentColor" fillOpacity="0.05" strokeWidth="1.8" />
        <rect x="12" y="34" width="24" height="8" rx="2" fill="currentColor" fillOpacity="0.05" strokeWidth="1.8" />
        {/* Server LEDs */}
        <circle cx="17" cy="14" r="1" fill="currentColor" />
        <circle cx="21" cy="14" r="1" />
        <circle cx="17" cy="26" r="1" fill="currentColor" />
        <circle cx="21" cy="26" r="1" />
        <circle cx="17" cy="38" r="1" fill="currentColor" />
        <circle cx="21" cy="38" r="1" />
        {/* Ingestion transfer flow arrows */}
        <path d="M6 14h3M6 26h3M6 38h3" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M38 10l4 4-4 4M38 22l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (number === "03") {
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Brain outline representing Cognitive Design */}
        <path d="M24 10c-5.5 0-10 4-10 9 0 2.5 1.5 4.5 3.5 6-.5 1.5-1.5 2.5-3.5 3 0 4 3 6 7 6a6 6 0 003-.8M24 10c5.5 0 10 4 10 9 0 2.5-1.5 4.5-3.5 6 .5 1.5 1.5 2.5 3.5 3 0 4-3 6-7 6a6 6 0 01-3-.8" strokeWidth="1.8" />
        {/* Central stem */}
        <path d="M24 10v23" strokeWidth="1" strokeDasharray="2 2" className="opacity-50" />
        {/* Digital node circuit connections inside brain */}
        <circle cx="19" cy="15" r="1.5" fill="currentColor" />
        <circle cx="29" cy="15" r="1.5" fill="currentColor" />
        <circle cx="17" cy="22" r="1.5" fill="currentColor" />
        <circle cx="31" cy="22" r="1.5" fill="currentColor" />
        <circle cx="21" cy="29" r="1.5" fill="currentColor" />
        <circle cx="27" cy="29" r="1.5" fill="currentColor" />
        <path d="M19 15h10M17 22h14" strokeWidth="0.8" className="opacity-40" />
      </svg>
    );
  }
  if (number === "04") {
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Interlocking Gears representing Orchestration & Integration */}
        {/* Gear 1 (Active/Primary) */}
        <circle cx="20" cy="28" r="7" fill="currentColor" fillOpacity="0.05" strokeWidth="1.8" />
        <circle cx="20" cy="28" r="2.5" />
        {/* Gear teeth */}
        <path d="M20 18v3M20 35v3M10 28h3M30 28h3" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M13 21l2 2M27 35l2 2M27 21l-2 2M13 35l-2 2" strokeWidth="1.8" strokeLinecap="round" />
        
        {/* Gear 2 (Secondary/Integrator) */}
        <circle cx="32" cy="16" r="4.5" fill="currentColor" fillOpacity="0.05" strokeWidth="1.5" />
        <circle cx="32" cy="16" r="1.5" />
        <path d="M32 9v2.5M32 20.5V23M25 16h2.5M38.5 16H41" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M27.5 11.5l2 2M36.5 20.5l2 2" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (number === "05") {
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Speedometer Gauge representing Telemetry monitoring */}
        <path d="M10 28A13 13 0 1138 28" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M14 25A9 9 0 0134 25" strokeDasharray="2 2" className="opacity-45" />
        {/* Gauge needle */}
        <path d="M24 28l6-10" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="24" cy="28" r="3" fill="currentColor" />
        
        {/* Shield representing safety Guardrails */}
        <path d="M32 30v4.5c0 2.2 2 4.5 4 4.5s4-2.3 4-4.5V30l-4-2-4 2z" fill="currentColor" fillOpacity="0.05" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }
  return null;
}

interface RoadmapItemProps {
  phase: typeof roadmapPhases[0];
  isActive: boolean;
}

function RoadmapItem({ phase, isActive }: RoadmapItemProps) {
  return (
    <div className="w-full flex flex-col pt-4 first:pt-0">
      {/* The phase card */}
      <div
        className={`py-6 sm:py-8 px-4 sm:px-8 rounded-[24px] transition-all duration-500 border group ${
          isActive
            ? "bg-white border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] scale-[1.01]"
            : "bg-transparent border-transparent hover:bg-slate-50/50"
        }`}
      >
        {/* Trigger Row */}
        <div className="w-full flex items-center justify-between gap-6 text-left select-none">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Number tag */}
            <span className={`text-[14px] sm:text-[16px] font-mono font-bold transition-colors duration-300 ${
              isActive ? "text-[#FF6B2C]" : "text-slate-400"
            }`}>
              [{phase.number}]
            </span>
            {/* Title */}
            <h3 className={`text-lg sm:text-xl md:text-2xl font-extrabold transition-colors duration-300 ${
              isActive ? "text-slate-900" : "text-slate-800 group-hover:text-black"
            }`}>
              {phase.title}
            </h3>
          </div>

          {/* Dynamic Graphic Indicator (Bespoke Advanced SVG) */}
          <div className={`flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full transition-all duration-500 shrink-0 ${
            isActive 
              ? "bg-transparent text-[#FF6B2C] shadow-none rotate-0 group-hover:scale-115" 
              : "bg-transparent text-slate-300 rotate-[-45deg] group-hover:rotate-0 group-hover:scale-110 group-hover:text-black"
          }`}>
            <PhaseIcon number={phase.number} />
          </div>
        </div>

        {/* Accordion Content Panel (Without duplicate icon) */}
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-6 pb-2 pl-10 sm:pl-12">
                {/* Description text */}
                <p className="text-[13.5px] sm:text-[14.5px] text-slate-600 leading-relaxed max-w-3xl text-justify">
                  {phase.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Solid Bottom Underline Indicator */}
      <div className="w-full h-[1.5px] relative mt-4 px-4">
        {isActive ? (
          <motion.div
            layoutId="activeUnderline"
            className="absolute inset-x-4 inset-y-0 bg-black h-[2px]"
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
          />
        ) : (
          <div className="absolute inset-x-4 inset-y-0 bg-slate-100 h-[1px]" />
        )}
      </div>
    </div>
  );
}

export default function AiRoadmap() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (itemRefs.current.length === 0) return;

      const viewportCenter = window.innerHeight / 2;
      let closestIdx = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((ref, idx) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        // Calculate distance based on the trigger row center (constant height)
        // to prevent height-expansion feedback jitter loops
        const triggerCenter = rect.top + 40; 
        const distance = Math.abs(triggerCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveIdx(closestIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    // Initialize active index
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const currentActiveIdx = hoveredIdx !== null ? hoveredIdx : activeIdx;

  return (
    <section className="bg-black text-white py-20 lg:py-24 relative overflow-hidden font-sans">
      
      {/* Background ambient lighting orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-[#FF6B2C]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[#FF6B2C]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= HEADER ================= */}
        <div className="max-w-4xl mb-12 lg:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF6B2C] mb-4 block"
          >
            Delivery Process
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-6"
          >
            Our Structured Delivery Framework for Custom Enterprise AI Solutions
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm md:text-[15px] text-slate-400 leading-relaxed max-w-3xl"
          >
            We guide your enterprise through a streamlined model integration lifecycle—eliminating technical debt, mitigating deployment risks, and accelerating business outcomes.
          </motion.p>
        </div>

        {/* ================= ROADMAP CARDS PANEL ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="w-full bg-white text-slate-900 rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden border border-white/10"
        >
          {/* Subtle grid pattern inside card for hi-tech touch */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

          {/* Vertical Stack of Scroll-Driven Items */}
          <div className="relative z-10 flex flex-col gap-1.5">
            {roadmapPhases.map((phase, idx) => (
              <div 
                key={phase.number} 
                ref={(el) => { itemRefs.current[idx] = el; }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="w-full"
              >
                <RoadmapItem
                  phase={phase}
                  isActive={currentActiveIdx === idx}
                />
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
