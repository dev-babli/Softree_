"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionBadge from '../../../services/ai-development-services/components/SectionBadge';
import { coreCapabilitiesData } from '../data/coreCapabilities';

export default function CoreCapabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeOffset, setActiveOffset] = useState(60);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Update SVG offset when active index changes
  useEffect(() => {
    const card = cardRefs.current[activeIndex];
    if (card) {
      setActiveOffset(card.offsetTop + card.offsetHeight / 2);
    }
  }, [activeIndex]);

  // Auto rotation
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % coreCapabilitiesData.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleManualInteraction = (index: number) => {
    setActiveIndex(index);
    setIsHovered(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 5000);
  };

  const activeData = coreCapabilitiesData[activeIndex];

  return (
    <section className="relative w-full overflow-hidden bg-transparent py-12 font-sans lg:py-16">
      {/* Background Decorators */}
      {/* Top Left */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] border-b border-r border-[#FF6B2C]/10 rounded-br-[100%] opacity-20 pointer-events-none -translate-x-1/4 -translate-y-1/4"></div>

      <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header (Matching SuccessStories) */}
        <div className="flex flex-col items-center w-full mb-8 lg:mb-10">
          <SectionBadge text="CORE CAPABILITIES" variant="line" />

          <h2 className="text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-[#111827] mb-3 tracking-tight text-center leading-tight">
            Enterprise LangChain Development{" "}
            <span className="text-[#FF6B2C]">Capabilities</span>
          </h2>

          <p className="text-[15px] lg:text-base text-[#6B7280] text-center max-w-2xl leading-snug">
            Softree LangChain development capabilities cover production chains and APIs, enterprise RAG, LangGraph multi-agent workflows, tool integrations, memory and observability, and continuous evaluation.
          </p>
        </div>

        {/* Main Layout — equal-height columns; showcase size stays fixed while tabs change */}
        <div
          className="relative flex flex-col gap-8 lg:flex-row lg:items-stretch"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >

          {/* Left Navigation (40%) */}
          <div className="relative z-10 flex w-full flex-col gap-2 lg:w-[40%] lg:gap-3">
            {coreCapabilitiesData.map((cap, idx) => {
              const isActive = idx === activeIndex;
              const Icon = cap.icon;

              return (
                <div
                  key={cap.id}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  onClick={() => handleManualInteraction(idx)}
                  className={`
                    relative min-h-[52px] cursor-pointer rounded-xl border p-3.5 transition-colors duration-300 ease-out
                    ${isActive
                      ? 'border-orange-200 bg-orange-50/50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-orange-100 hover:shadow-sm'
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 top-0 w-1 rounded-l-xl bg-[#FF6B2C] shadow-[0_0_10px_rgba(255,107,44,0.5)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-start gap-3">
                    <div className={`
                      flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300
                      ${cap.color}
                    `}>
                      <Icon size={18} stroke={2} className={isActive ? "animate-pulse" : ""} />
                    </div>

                    <div className="min-w-0">
                      <div className="mb-0.5 flex items-center gap-2">
                        <h3 className={`text-base transition-all duration-300 ${isActive ? 'font-bold text-[#111827]' : 'font-semibold text-gray-700'}`}>
                          {cap.title}
                        </h3>
                      </div>
                      <p className={`text-[13px] leading-snug transition-colors duration-300 ${isActive ? 'text-gray-700' : 'text-gray-500'}`}>
                        {cap.shortDesc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Showcase (60%) — content-sized on mobile; equal-height frame on desktop */}
          <div className="relative w-full lg:w-[60%] lg:min-h-[560px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col overflow-hidden rounded-3xl border border-[#FF6B2C] bg-white shadow-[0_10px_40px_rgba(255,107,44,0.08)] lg:absolute lg:inset-0"
              >
                <div className="flex min-h-0 flex-1 flex-col md:flex-row">
                  {/* Image Area */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.45 }}
                    className={`group relative flex w-full flex-1 items-center justify-center overflow-hidden border-r border-gray-100 bg-[#0B0F19] md:w-[45%] md:flex-none ${(activeData as any).image ? '' : 'p-6'}`}
                  >
                    <div className="relative z-10 flex h-full min-h-[220px] w-full items-center justify-center md:absolute md:inset-0 md:min-h-0">
                      {(activeData as any).image ? (
                        <>
                          <img
                            src={(activeData as any).image}
                            alt={activeData.title}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FF5812]/15 via-transparent to-transparent opacity-80" />
                          <div className="absolute bottom-4 left-4 right-4 z-20">
                            <span className="inline-flex rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                              {activeData.title}
                            </span>
                          </div>
                        </>
                      ) : (
                        <AbstractIllustration type={activeData.illustration} />
                      )}
                    </div>
                  </motion.div>

                  {/* Content Area */}
                  <div className="flex w-full min-h-0 flex-1 flex-col justify-center overflow-y-auto p-5 sm:p-6 md:w-[55%] lg:p-8">
                    <div className="mb-4 flex items-center gap-2 lg:mb-5">
                      <span className="text-base font-semibold tracking-wide text-[#FF6B2C]">{activeData.id}</span>
                      <div className="h-0.5 w-8 bg-orange-200" />
                    </div>

                    <motion.h3
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mb-3 text-xl font-bold leading-tight tracking-tight text-[#0A0F3C] lg:mb-4 lg:text-2xl"
                    >
                      {activeData.title}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="mb-5 text-[14px] leading-snug text-[#6B7280] lg:mb-6 lg:text-[15px]"
                    >
                      {activeData.description}
                    </motion.p>

                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4 lg:space-y-5"
                    >
                      {activeData.highlights.map((highlight, i) => {
                        const HLIcon = highlight.icon;
                        return (
                          <li key={i} className="flex items-start gap-3">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-orange-100 bg-white text-[#FF6B2C] shadow-sm">
                              <HLIcon size={20} stroke={1.5} />
                            </div>
                            <div className="min-w-0">
                              <h4 className="mb-0.5 text-[14px] font-semibold text-[#0A0F3C]">{highlight.title}</h4>
                              <p className="text-[13px] leading-snug text-[#6B7280]">{highlight.desc}</p>
                            </div>
                          </li>
                        );
                      })}
                    </motion.ul>
                  </div>
                </div>

                {/* KPI Strip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="grid shrink-0 grid-cols-2 border-t border-gray-100 bg-white p-4 sm:grid-cols-4 sm:p-5"
                >
                  {activeData.kpis.map((kpi, i) => (
                    <div
                      key={i}
                      className={`group/kpi flex min-w-0 cursor-default flex-col items-center justify-center px-1 text-center ${i !== activeData.kpis.length - 1 ? 'sm:border-r border-gray-100' : ''}`}
                    >
                      <div className="mb-1 text-2xl font-bold text-[#FF6B2C] transition-transform duration-300 group-hover/kpi:scale-105 lg:text-3xl">
                        {kpi.value}
                      </div>
                      <div className="break-words text-[11px] font-medium text-[#6B7280]">
                        {kpi.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

// Helper component for abstract illustrations
function AbstractIllustration({ type }: { type: string }) {
  if (type === 'strategy') {
    return (
      <svg viewBox="0 0 400 200" className="w-full h-full max-w-[300px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="40" width="120" height="120" rx="8" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        <rect x="230" y="40" width="120" height="120" rx="8" stroke="rgba(255,107,44,0.3)" strokeWidth="2" />
        <path d="M170 100 L230 100" stroke="#FF6B2C" strokeWidth="2" strokeDasharray="4 4" />
        <circle cx="110" cy="100" r="30" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <rect x="260" y="70" width="60" height="10" rx="4" fill="rgba(255,107,44,0.5)" />
        <rect x="260" y="95" width="40" height="10" rx="4" fill="rgba(255,255,255,0.2)" />
        <rect x="260" y="120" width="50" height="10" rx="4" fill="rgba(255,255,255,0.2)" />
      </svg>
    );
  }
  if (type === 'architecture') {
    return (
      <svg viewBox="0 0 400 200" className="w-full h-full max-w-[300px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="150" y="20" width="100" height="40" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
        <rect x="70" y="100" width="80" height="80" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
        <rect x="160" y="100" width="80" height="80" rx="6" fill="rgba(255,107,44,0.1)" stroke="#FF6B2C" strokeWidth="2" />
        <rect x="250" y="100" width="80" height="80" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
        <path d="M200 60 V100" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <path d="M110 80 H290" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <path d="M110 80 V100" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <path d="M290 80 V100" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <circle cx="200" cy="140" r="15" fill="rgba(255,107,44,0.3)" />
      </svg>
    );
  }
  if (type === 'automation') {
    return (
      <svg viewBox="0 0 400 200" className="w-full h-full max-w-[300px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="40" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <circle cx="200" cy="100" r="40" fill="rgba(255,107,44,0.1)" stroke="#FF6B2C" strokeWidth="2" />
        <circle cx="300" cy="100" r="40" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <path d="M140 100 L160 100" stroke="#FF6B2C" strokeWidth="2" markerEnd="url(#arrow)" />
        <path d="M240 100 L260 100" stroke="rgba(255,255,255,0.2)" strokeWidth="2" markerEnd="url(#arrowGray)" />
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#FF6B2C" />
          </marker>
          <marker id="arrowGray" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.2)" />
          </marker>
        </defs>
        <path d="M190 90 L210 110 M210 90 L190 110" stroke="#FF6B2C" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'security') {
    return (
      <svg viewBox="0 0 400 200" className="w-full h-full max-w-[300px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M200 30 L280 60 V120 C280 160 200 190 200 190 C200 190 120 160 120 120 V60 L200 30 Z" fill="rgba(255,107,44,0.1)" stroke="#FF6B2C" strokeWidth="2" />
        <circle cx="200" cy="110" r="30" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
        <path d="M190 110 L197 117 L215 100" stroke="#FF6B2C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === 'observability') {
    return (
      <svg viewBox="0 0 400 200" className="w-full h-full max-w-[300px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="60" y="50" width="280" height="100" rx="12" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
        <path d="M90 120 L140 90 L180 110 L230 70 L300 95" stroke="#FF6B2C" strokeWidth="2.5" fill="none" />
        <circle cx="140" cy="90" r="5" fill="#FF6B2C" />
        <circle cx="230" cy="70" r="5" fill="#FF6B2C" />
        <rect x="80" y="160" width="40" height="8" rx="2" fill="rgba(255,107,44,0.4)" />
        <rect x="130" y="160" width="60" height="8" rx="2" fill="rgba(255,255,255,0.15)" />
        <rect x="200" y="160" width="50" height="8" rx="2" fill="rgba(255,255,255,0.15)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full max-w-[300px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 150 L120 100 L180 120 L260 60 L350 90" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
      <path d="M50 150 L120 100 L180 120 L260 60 L350 90" stroke="#FF6B2C" strokeWidth="3" fill="none" strokeDasharray="400" strokeDashoffset="0" className="animate-pulse" />
      <circle cx="120" cy="100" r="6" fill="rgba(255,255,255,0.5)" />
      <circle cx="180" cy="120" r="6" fill="rgba(255,255,255,0.5)" />
      <circle cx="260" cy="60" r="8" fill="#FF6B2C" />
      <circle cx="350" cy="90" r="6" fill="rgba(255,255,255,0.5)" />
      <rect x="240" y="30" width="40" height="15" rx="4" fill="rgba(255,107,44,0.2)" />
    </svg>
  );
}
