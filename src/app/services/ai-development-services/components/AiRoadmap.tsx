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

// Custom advanced, high-fidelity conceptual SVGs representing each roadmap phase conceptually
function PhaseIcon({ number }: { number: string }) {
  if (number === "01") {
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        <defs>
          <linearGradient id="grad-p1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Outer compass ring */}
        <circle cx="24" cy="24" r="21" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
        <circle cx="24" cy="24" r="16" strokeWidth="0.8" className="opacity-30" />
        {/* Target reticle */}
        <path d="M24 3v6M24 39v6M3 24h6M39 24h6" strokeWidth="1.8" strokeLinecap="round" />
        {/* Center node with gradient glow */}
        <circle cx="24" cy="24" r="7" fill="url(#grad-p1)" strokeWidth="1.2" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
        {/* Angled tracking lines */}
        <path d="M12 12l5 5M36 36l-5-5M36 12l-5 5M12 36l5-5" strokeWidth="0.8" strokeLinecap="round" className="opacity-50" />
        {/* Outer ticks */}
        <path d="M10 24h2M36 24h2M24 10v2M24 36v2" strokeWidth="1.2" />
      </svg>
    );
  }
  if (number === "02") {
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        <defs>
          <linearGradient id="grad-p2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {/* Stacked Storage Cylinders */}
        {/* Cylinder 1 (Top) */}
        <path d="M10 12c0-2.8 6.3-5 14-5s14 2.2 14 5-6.3 5-14 5-14-2.2-14-5z" fill="url(#grad-p2)" strokeWidth="1.2" />
        {/* Cylinder 2 (Middle) */}
        <path d="M10 20c0 2.8 6.3 5 14 5s14-2.2 14-5" strokeWidth="1.2" />
        <path d="M10 12v8c0 2.8 6.3 5 14 5s14-2.2 14-5v-8" strokeWidth="0.8" strokeDasharray="2 2" className="opacity-50" />
        {/* Cylinder 3 (Bottom) */}
        <path d="M10 28c0 2.8 6.3 5 14 5s14-2.2 14-5" strokeWidth="1.2" />
        <path d="M10 20v8c0 2.8 6.3 5 14 5s14-2.2 14-5v-8" strokeWidth="1.2" />
        {/* Ingestion Stream Core */}
        <path d="M24 5v18" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M20 19l4 4 4-4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="5" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  if (number === "03") {
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        <defs>
          <radialGradient id="grad-p3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Neural Core */}
        <rect x="18" y="18" width="12" height="12" rx="3" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="5" fill="url(#grad-p3)" strokeWidth="1" />
        <circle cx="24" cy="24" r="1.5" fill="currentColor" />
        {/* Circuit Tracks */}
        <path d="M24 18V8h-8M18 24H8v-8M24 30v8h8M30 24h8v8" strokeWidth="1.2" strokeLinecap="round" />
        {/* Neural nodes */}
        <circle cx="16" cy="8" r="2.5" fill="currentColor" />
        <circle cx="8" cy="16" r="2.5" fill="currentColor" />
        <circle cx="32" cy="38" r="2" />
        <circle cx="38" cy="32" r="2" />
        {/* Synaptic paths */}
        <path d="M12 12l4 4M36 12l-6 6" strokeWidth="0.8" strokeDasharray="2 2" className="opacity-60" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="36" cy="12" r="1.5" />
      </svg>
    );
  }
  if (number === "04") {
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        {/* Isometric Stacked Modules */}
        {/* Top Layer */}
        <path d="M24 6l12 7-12 7-12-7 12-7z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
        <path d="M12 13v9l12 7v-9l-12-7z" strokeWidth="1.2" className="opacity-80" />
        <path d="M36 13v9l-12 7v-9l12-7z" strokeWidth="1.2" className="opacity-80" />
        {/* Middle Floating Plate */}
        <path d="M12 21l12 7 12-7" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
        {/* Floating Data Nodes */}
        <circle cx="24" cy="13" r="2.5" fill="currentColor" />
        <circle cx="18" cy="16" r="1.5" />
        <circle cx="30" cy="16" r="1.5" />
        {/* API Connection rails */}
        <path d="M6 18v8l18 10.5 18-10.5v-8" strokeWidth="1" strokeLinecap="round" className="opacity-30" />
        <path d="M24 20v14" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    );
  }
  if (number === "05") {
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        <defs>
          <linearGradient id="grad-p5" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.7" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {/* Telemetry Gauge Arc */}
        <path d="M10 34A17 17 0 1138 34" strokeWidth="1.5" strokeLinecap="round" className="opacity-55" />
        <path d="M14 30A12 12 0 1134 30" strokeWidth="1" strokeDasharray="2 2" className="opacity-30" />
        {/* Heartbeat Sine Wave Grid */}
        <path d="M7 24h6l3-8 4 16 3-12 2 4h16" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Scanning Grid Line */}
        <line x1="24" y1="7" x2="24" y2="41" stroke="url(#grad-p5)" strokeWidth="1.5" className="opacity-60" />
        {/* Dial Pointer */}
        <circle cx="24" cy="24" r="2.5" fill="currentColor" />
        <path d="M24 24l8-8" strokeWidth="2" strokeLinecap="round" />
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
    <div className="w-full flex flex-col">
      {/* The phase timeline row */}
      <div
        className={`pl-8 md:pl-14 py-8 relative transition-all duration-500 border-l-2 group ${
          isActive
            ? "border-[#FF6B2C]" // Highlighted segment
            : "border-zinc-800/80 hover:border-zinc-700" // Inactive track segment
        }`}
      >
        {/* Timeline Node Dot/Bullet directly centered on the vertical left line */}
        <div className="absolute left-[-7px] md:left-[-9px] top-9 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black border border-zinc-700 pointer-events-none z-20">
          <div className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
            isActive ? "bg-[#FF6B2C] scale-125" : "bg-zinc-700"
          }`} />
        </div>

        {/* Trigger Row info */}
        <div className="w-full flex items-center justify-between gap-6 text-left select-none">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Number tag */}
            <span className={`text-[14px] sm:text-[16px] font-mono font-bold transition-colors duration-300 ${
              isActive ? "text-[#FF6B2C]" : "text-zinc-500"
            }`}>
              [{phase.number}]
            </span>
            {/* Title */}
            <h3 className={`text-lg sm:text-xl md:text-2xl font-extrabold transition-colors duration-300 ${
              isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
            }`}>
              {phase.title}
            </h3>
          </div>

          {/* Dynamic Graphic Indicator (Bespoke Advanced SVG on the right) */}
          <div className={`flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full transition-all duration-500 shrink-0 ${
            isActive 
              ? "bg-transparent text-[#FF6B2C] shadow-none rotate-0 group-hover:scale-115" 
              : "bg-transparent text-zinc-600 rotate-[-45deg] group-hover:rotate-0 group-hover:scale-110 group-hover:text-zinc-300"
          }`}>
            <PhaseIcon number={phase.number} />
          </div>
        </div>

        {/* Accordion Content Panel */}
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-2 pr-4 sm:pr-8">
                {/* Description text */}
                <p className="text-[13.5px] sm:text-[14.5px] text-zinc-400 leading-relaxed max-w-3xl text-justify">
                  {phase.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
    <section className="w-full bg-white pt-8 md:pt-12 pb-8 md:pb-12 font-sans relative overflow-hidden">
      <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-black text-white py-20 lg:py-24 shadow-2xl">
          
          {/* Background ambient lighting orbs */}
          <div className="absolute top-[-10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-[#FF6B2C]/5 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[#FF6B2C]/5 blur-[100px] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* ================= HEADER ================= */}
        <div className="max-w-4xl mb-12 lg:mb-20">
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

        {/* ================= ROADMAP TIMELINE CONTAINER ================= */}
        <div className="relative w-full pl-2 sm:pl-4">
          {/* Vertical Stack of Scroll-Driven Items */}
          <div className="relative z-10 flex flex-col gap-0">
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
        </div>

      </div>
        </div>
      </div>
    </section>
  );
}
