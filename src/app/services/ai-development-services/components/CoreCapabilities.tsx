"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionBadge from './SectionBadge';
import { coreCapabilitiesData } from '../data/coreCapabilitiesData';

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
    <section className="relative w-full py-10 lg:py-14 bg-transparent overflow-hidden font-sans">
      {/* Background Decorators */}
      {/* Top Left */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] border-b border-r border-[#FF6B2C]/10 rounded-br-[100%] opacity-20 pointer-events-none -translate-x-1/4 -translate-y-1/4"></div>


      
      <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Matching SuccessStories) */}
        <div className="flex flex-col items-center w-full mb-8 lg:mb-10">
          <SectionBadge text="CORE CAPABILITIES" variant="line" />
          
          <h2 className="text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-[#111827] mb-2 md:mb-3 tracking-tight text-center leading-tight">
            Enterprise AI <span className="text-[#FF6B2C]">Engineering Capabilities</span>
          </h2>
          
          <p className="text-[15px] lg:text-base text-[#6B7280] mb-6 lg:mb-8 text-center max-w-2xl mx-auto leading-relaxed">
            Leverage our end-to-end AI engineering expertise to design, build, deploy, and optimize secure, scalable, and business-driven AI solutions that accelerate innovation and deliver measurable enterprise outcomes.
          </p>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row relative min-h-[500px]"
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Left Navigation (40%) */}
          <div className="w-full lg:w-[40%] flex flex-col gap-3 lg:gap-4 lg:pr-6 relative z-10">
            {coreCapabilitiesData.map((cap, idx) => {
              const isActive = idx === activeIndex;
              const Icon = cap.icon;
              
              return (
                <div 
                  key={cap.id}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  onClick={() => handleManualInteraction(idx)}
                  className={`
                    relative cursor-pointer transition-all duration-500 ease-out p-3 rounded-xl border
                    ${isActive 
                      ? 'bg-orange-50/50 border-orange-200 shadow-md transform scale-[1.02]' 
                      : 'bg-white border-gray-200 hover:border-orange-100 hover:shadow-sm hover:-translate-y-0.5'
                    }
                  `}
                >
                  {/* Left Active Indicator */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF6B2C] rounded-l-xl shadow-[0_0_10px_rgba(255,107,44,0.5)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-start gap-3">
                    <div className={`
                      flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
                      ${cap.color}
                    `}>
                      <Icon size={18} stroke={2} className={isActive ? "animate-pulse scale-110" : ""} />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
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

          {/* Right Showcase (60%) */}
          <div className="w-full lg:w-[60%] lg:pl-6 h-full flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
                className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(255,107,44,0.08)] overflow-hidden flex flex-col h-full border border-[#FF6B2C] flex-grow"
              >
                
                {/* Top Section (Split) */}
                <div className="flex flex-col md:flex-row flex-grow">
                  
                  {/* Image Area */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-full md:w-[45%] bg-[#F8F9FB] relative overflow-hidden flex items-center justify-center ${(activeData as any).image ? '' : 'p-6'} group border-r border-gray-100`}
                  >
                    {/* Abstract Illustration Based on Capability */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-105 min-h-[250px] lg:min-h-[300px]">
                       {(activeData as any).image ? (
                         <img src={(activeData as any).image} alt={activeData.title} className="w-full h-full object-cover absolute inset-0" />
                       ) : (
                         <AbstractIllustration type={activeData.illustration} />
                       )}
                    </div>
                  </motion.div>

                  {/* Content Area */}
                  <div className="w-full md:w-[55%] p-5 sm:p-6 lg:p-8 flex flex-col justify-center flex-grow">
                    
                    <div className="flex items-center gap-2 mb-4 lg:mb-5">
                      <span className="text-[#FF6B2C] font-semibold tracking-wide text-base">{activeData.id}</span>
                      <div className="h-0.5 w-8 bg-orange-200"></div>
                    </div>

                    <motion.h3 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xl lg:text-2xl font-bold text-[#0A0F3C] mb-3 lg:mb-4 tracking-tight leading-tight"
                    >
                      {activeData.title}
                    </motion.h3>
                    
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-[14px] lg:text-[15px] text-[#6B7280] mb-5 lg:mb-6 leading-snug"
                    >
                      {activeData.description}
                    </motion.p>

                    <motion.ul 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-4 lg:space-y-5"
                    >
                      {activeData.highlights.map((highlight, i) => {
                        const HLIcon = highlight.icon;
                        return (
                          <li key={i} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-orange-100 flex items-center justify-center text-[#FF6B2C] shadow-sm">
                              <HLIcon size={20} stroke={1.5} />
                            </div>
                            <div>
                              <h4 className="text-[#0A0F3C] font-semibold text-[14px] mb-0.5">{highlight.title}</h4>
                              <p className="text-[#6B7280] text-[13px] leading-snug">{highlight.desc}</p>
                            </div>
                          </li>
                        )
                      })}
                    </motion.ul>

                  </div>
                </div>

                {/* KPI Strip */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-2 sm:grid-cols-4 bg-white border-t border-gray-100 p-4 sm:p-5"
                >
                  {activeData.kpis.map((kpi, i) => (
                    <div 
                      key={i} 
                      className={`flex flex-col items-center justify-center text-center group/kpi cursor-default ${i !== activeData.kpis.length - 1 ? 'sm:border-r border-gray-100' : ''}`}
                    >
                      <div className="text-2xl lg:text-3xl font-bold text-[#FF6B2C] mb-1 group-hover/kpi:scale-105 transition-transform duration-300">
                        {kpi.value}
                      </div>
                      <div className="text-[11px] font-medium text-[#6B7280]">
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
  if (type === 'microsoft') {
    return (
      <svg viewBox="0 0 400 200" className="w-full h-full max-w-[300px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="140" y="40" width="50" height="50" fill="rgba(255,107,44,0.8)" />
        <rect x="210" y="40" width="50" height="50" fill="rgba(255,255,255,0.1)" />
        <rect x="140" y="110" width="50" height="50" fill="rgba(255,255,255,0.1)" />
        <rect x="210" y="110" width="50" height="50" fill="rgba(255,255,255,0.1)" />
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
