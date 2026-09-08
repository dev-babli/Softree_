"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Enterprise AI Security & Governance Pillars
const roadmapPhases = [
  {
    number: "01",
    title: "Data Protection",
    description: "Protect sensitive business information across AI applications, knowledge systems, integrations, and workflows.",
  },
  {
    number: "02",
    title: "Identity & Access",
    description: "Control who can access AI applications, enterprise data, tools, and automated actions.",
  },
  {
    number: "03",
    title: "AI Guardrails",
    description: "Define boundaries for AI behavior, data access, tool usage, and automated actions.",
  },
  {
    number: "04",
    title: "Responsible AI",
    description: "Design AI systems with appropriate human oversight and responsible implementation practices.",
  },
  {
    number: "05",
    title: "Monitoring & Evaluation",
    description: "Measure AI quality, reliability, performance, cost, and behavior in production.",
  },
  {
    number: "06",
    title: "Auditability",
    description: "Maintain visibility into AI actions, workflow execution, system events, and relevant decisions.",
  },
];

// Custom advanced, high-fidelity conceptual SVGs representing each security & governance pillar
function PhaseIcon({ number }: { number: string }) {
  if (number === "01") {
    // Data Protection — Encrypted Shield & Vault
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        <defs>
          <linearGradient id="grad-sec-p1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {/* Shield Contour */}
        <path d="M24 4L8 10v12c0 10 7 18 16 22 9-4 16-12 16-22V10L24 4z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="url(#grad-sec-p1)" />
        {/* Internal Lock / Vault Core */}
        <rect x="18" y="21" width="12" height="10" rx="2" strokeWidth="1.5" />
        <path d="M21 21v-4a3 3 0 016 0v4" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="26" r="1.5" fill="currentColor" />
        <path d="M24 27.5v2" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }
  if (number === "02") {
    // Identity & Access — User Biometric & Key Access
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        <defs>
          <radialGradient id="grad-sec-p2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.7" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* User Identity Frame */}
        <circle cx="20" cy="18" r="6" strokeWidth="1.6" fill="url(#grad-sec-p2)" />
        <path d="M10 36c0-5.5 4.5-9 10-9s10 3.5 10 9" strokeWidth="1.6" strokeLinecap="round" />
        {/* Security Key / Permission Token */}
        <circle cx="34" cy="20" r="4" strokeWidth="1.5" />
        <path d="M34 24v12l3-2 3 2v-4h-2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Verification pulse ring */}
        <circle cx="20" cy="18" r="9" strokeWidth="0.8" strokeDasharray="3 3" className="opacity-40" />
      </svg>
    );
  }
  if (number === "03") {
    // AI Guardrails — Boundary Fence & Policy Enforcement Rails
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        {/* Outer Guardrail Boundary */}
        <rect x="6" y="10" width="36" height="28" rx="4" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-40" />
        {/* Protective Gate Pillars */}
        <line x1="15" y1="12" x2="15" y2="36" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="33" y1="12" x2="33" y2="36" strokeWidth="1.8" strokeLinecap="round" />
        {/* Interlocking Constraint Rails */}
        <path d="M15 18h18M15 24h18M15 30h18" strokeWidth="1.4" strokeLinecap="round" />
        {/* Active Policy Sensor Node */}
        <circle cx="24" cy="24" r="4" fill="currentColor" />
        <circle cx="24" cy="24" r="8" strokeWidth="1" strokeDasharray="2 2" className="opacity-60" />
      </svg>
    );
  }
  if (number === "04") {
    // Responsible AI — Ethical Balance & Human-in-the-Loop Oversight
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        {/* Central Balance Mast */}
        <line x1="24" y1="8" x2="24" y2="38" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="18" y1="38" x2="30" y2="38" strokeWidth="2" strokeLinecap="round" />
        {/* Horizontal Beam */}
        <line x1="10" y1="15" x2="38" y2="15" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="24" cy="15" r="2.5" fill="currentColor" />
        {/* Left Scale Pan */}
        <path d="M10 15l-4 10h8l-4-10z" strokeWidth="1.4" strokeLinejoin="round" />
        {/* Right Scale Pan */}
        <path d="M38 15l-4 10h8l-4-10z" strokeWidth="1.4" strokeLinejoin="round" />
        {/* Human Oversight Eye / Node */}
        <circle cx="24" cy="8" r="3" strokeWidth="1.2" fill="currentColor" fillOpacity="0.3" />
      </svg>
    );
  }
  if (number === "05") {
    // Monitoring & Evaluation — Live Metric Gauge & Waveform
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        <defs>
          <linearGradient id="grad-sec-p5" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Telemetry Gauge Arc */}
        <path d="M10 34A17 17 0 1138 34" strokeWidth="1.6" strokeLinecap="round" className="opacity-50" />
        <path d="M14 30A12 12 0 1134 30" strokeWidth="1" strokeDasharray="2 2" className="opacity-30" />
        {/* Live Evaluation Pulse Wave */}
        <path d="M7 24h7l3-7 4 14 3-10 2 3h15" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Dial Pointer & Core */}
        <circle cx="24" cy="24" r="2.5" fill="currentColor" />
        <line x1="24" y1="24" x2="31" y2="17" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (number === "06") {
    // Auditability — Immutable Audit Ledger & Decision Timeline
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        {/* Audit Document / Ledger Outline */}
        <rect x="10" y="8" width="28" height="34" rx="3" strokeWidth="1.6" />
        {/* Document Fold Tab */}
        <path d="M28 8v8h8" strokeWidth="1.4" strokeLinejoin="round" />
        {/* Checkpoint Audit Event Rows */}
        <circle cx="16" cy="20" r="1.5" fill="currentColor" />
        <line x1="21" y1="20" x2="32" y2="20" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="26" r="1.5" fill="currentColor" />
        <line x1="21" y1="26" x2="30" y2="26" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="32" r="1.5" fill="currentColor" />
        <line x1="21" y1="32" x2="28" y2="32" strokeWidth="1.5" strokeLinecap="round" />
        {/* Verification Stamp / Seal */}
        <circle cx="31" cy="32" r="4.5" strokeWidth="1.2" strokeDasharray="2 2" />
        <path d="M29.5 32l1 1 2-2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-[24px] bg-black text-white py-20 lg:py-24 shadow-2xl">
          
          {/* Background ambient lighting orbs */}
          <div className="absolute top-[-10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-[#FF6B2C]/5 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[#FF6B2C]/5 blur-[100px] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* ================= HEADER ================= */}
        <div className="max-w-4xl mb-12 lg:mb-20 text-left">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block"
          >
            <div className="shadow-[inset_2px_2px_5px_#27272a,inset_-2px_-2px_5px_#09090b] bg-zinc-900/80 px-4 py-1.5 rounded-full border border-white/10">
              <span className="text-[11px] font-bold text-[#FF6B2C] tracking-widest uppercase">
                SECURITY & GOVERNANCE
              </span>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4"
          >
            Enterprise AI Security & Governance: <span className="text-[#FF6B2C]">Intelligence With Security and Control</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[15px] lg:text-base text-slate-300 leading-relaxed max-w-2xl"
          >
            Enterprise AI needs more than intelligent outputs. AI systems must operate within appropriate security, identity, governance, monitoring, and human oversight controls.
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
                onClick={() => setActiveIdx(idx)}
                className="w-full cursor-pointer"
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
