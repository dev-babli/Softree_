"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { industriesList } from "../data/industries";

export default function Industries() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Find the active industry (defaults to Healthcare if nothing is hovered)
  const activeIndustry = industriesList.find((item) => item.id === hoveredId)
    || industriesList.find((item) => item.id === "healthcare")
    || industriesList[0];

  return (
    <section className="bg-white relative w-full overflow-hidden font-sans">
      
      {/* Wrapper 7xl containing the joint background card */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 bg-white">
        
        {/* JOINT SOLID ORANGE PANEL CARD */}
        <div className="relative w-full rounded-[32px] border border-[#FF6B2C] bg-[#FF6B2C] shadow-[0_12px_40px_rgba(255,107,44,0.15)] overflow-hidden">
          
          {/* BACKGROUND DECORATIONS inside the joint card */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
            
            {/* Fine-line grid pattern (white color with opacity) */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="advanced-grid-white" width="64" height="64" patternUnits="userSpaceOnUse">
                  <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#advanced-grid-white)" />
            </svg>

            {/* Drifting white particle nodes */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-white/20 pointer-events-none"
                style={{
                  left: `${15 + i * 14}%`,
                  top: `${20 + i * 10}%`,
                }}
                animate={{
                  x: [0, Math.sin(i) * 35, 0],
                  y: [0, Math.cos(i) * 35, 0],
                  opacity: [0.15, 0.5, 0.15],
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Diagonal high-end architectural skewed slabs (subtle white tints) */}
            <div className="absolute top-0 right-0 w-[55%] h-full bg-white/5 border-l border-white/5 -skew-x-12" />

            {/* Spotlights and orbs */}
            <div className="absolute top-[20%] left-[8%] w-32 h-32 rounded-full bg-white/10 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[15%] w-48 h-48 rounded-full bg-white/10 blur-[90px] pointer-events-none" />

            {/* Dynamic white spotlight tracking hovered id */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] transition-all duration-700 ease-out pointer-events-none">
              <div className="absolute inset-0 rounded-full bg-white blur-[80px] opacity-[0.12] transition-all duration-700" />
            </div>
          </div>

          {/* Content Layout Grid inside the joint card container */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center px-8 sm:px-12 lg:px-16 py-12 lg:py-16">
            
            {/* LEFT COLUMN: Editorial Text, CTA, & Explorer Card */}
            <div className="lg:col-span-5 flex flex-col items-start text-left relative z-10">
              
              {/* Accent Eyebrow */}
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xs font-bold uppercase tracking-[0.25em] text-white/80 mb-3.5 block"
              >
                Enterprise Integration
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-[2.75rem] font-black text-white tracking-tight leading-[1.05] mb-5"
              >
                Industries We Serve
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[14px] lg:text-[15px] text-orange-100/90 leading-relaxed mb-8 max-w-lg"
              >
                Partnering with Softree means working with an elite offshore team dedicated to scaling your business with intelligent technology. We deliver data-driven AI systems, custom automated agents, and measurable ROI that makes your enterprise stand out.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <Link
                  href="/contact"
                  className="relative overflow-hidden inline-flex items-center gap-2.5 bg-white text-[#FF6B2C] font-bold text-[12px] tracking-wider uppercase px-9 py-4.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  {/* Glossy sheen sweep effect on hover */}
                  <span className="absolute inset-0 w-full h-full bg-orange-500/5 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                  
                  <span className="relative z-10">Contact Now</span>
                  <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>

              {/* Dynamic AI Integration Explorer Card (Glassmorphic) */}
              <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-5 shadow-sm relative overflow-hidden hidden sm:block mt-8 min-h-[135px] flex flex-col justify-center">
                {/* Subtle ambient blur behind */}
                <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-white/5 blur-xl pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndustry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-start"
                  >
                    {/* Eyebrow badge representing the category */}
                    <span className="text-[10px] font-bold tracking-wider text-[#FF6B2C] uppercase mb-1.5 px-2 py-0.5 bg-white rounded">
                      {activeIndustry.title} Integration
                    </span>
                    {/* Big title of use case */}
                    <h4 className="text-[15px] font-bold text-white leading-tight mb-1.5">
                      {activeIndustry.subtitle}
                    </h4>
                    {/* Full explanation of how Softree implements it */}
                    <p className="text-[12px] text-orange-100/90 leading-relaxed">
                      {activeIndustry.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* RIGHT COLUMN: Floating Staggered Capsules (Constellation Network Grid) */}
            <div className="lg:col-span-7 relative flex items-center justify-center min-h-[400px] lg:min-h-[460px] w-full perspective-1000 z-10">
              
              {/* DESKTOP LAYOUT (Wave / Diamond Staggered Pattern) inside a beautifully locked-width container */}
              <div className="hidden lg:flex flex-col gap-5 w-full max-w-[500px] mx-auto items-center select-none relative">
                
                {/* Row 1: 1 Item (offset right) */}
                <div className="flex w-full justify-end pr-16">
                  <CapsuleCard 
                    item={industriesList[0]} 
                    floatDelay={0} 
                    floatDuration={5} 
                    onHoverStart={() => setHoveredId(industriesList[0].id)}
                    onHoverEnd={() => setHoveredId(null)}
                  />
                </div>

                {/* Row 2: 2 Items (offset left) */}
                <div className="flex w-full justify-start pl-6 gap-6">
                  <CapsuleCard 
                    item={industriesList[1]} 
                    floatDelay={0.5} 
                    floatDuration={5.5} 
                    onHoverStart={() => setHoveredId(industriesList[1].id)}
                    onHoverEnd={() => setHoveredId(null)}
                  />
                  <CapsuleCard 
                    item={industriesList[2]} 
                    floatDelay={1} 
                    floatDuration={6} 
                    onHoverStart={() => setHoveredId(industriesList[2].id)}
                    onHoverEnd={() => setHoveredId(null)}
                  />
                </div>

                {/* Row 3: 2 Items (offset right) */}
                <div className="flex w-full justify-end pr-8 gap-6">
                  <CapsuleCard 
                    item={industriesList[3]} 
                    floatDelay={1.5} 
                    floatDuration={5.2} 
                    onHoverStart={() => setHoveredId(industriesList[3].id)}
                    onHoverEnd={() => setHoveredId(null)}
                  />
                  <CapsuleCard 
                    item={industriesList[4]} 
                    floatDelay={0.2} 
                    floatDuration={5.8} 
                    onHoverStart={() => setHoveredId(industriesList[4].id)}
                    onHoverEnd={() => setHoveredId(null)}
                  />
                </div>

                {/* Row 4: 2 Items (offset left) */}
                <div className="flex w-full justify-start pl-2 gap-6">
                  <CapsuleCard 
                    item={industriesList[5]} 
                    floatDelay={0.8} 
                    floatDuration={6.2} 
                    onHoverStart={() => setHoveredId(industriesList[5].id)}
                    onHoverEnd={() => setHoveredId(null)}
                  />
                  <CapsuleCard 
                    item={industriesList[6]} 
                    floatDelay={1.2} 
                    floatDuration={5.6} 
                    onHoverStart={() => setHoveredId(industriesList[6].id)}
                    onHoverEnd={() => setHoveredId(null)}
                  />
                </div>

                {/* Row 5: 2 Items (centered) */}
                <div className="flex w-full justify-center gap-6">
                  <CapsuleCard 
                    item={industriesList[7]} 
                    floatDelay={0.4} 
                    floatDuration={6.4} 
                    onHoverStart={() => setHoveredId(industriesList[7].id)}
                    onHoverEnd={() => setHoveredId(null)}
                  />
                  <CapsuleCard 
                    item={industriesList[8]} 
                    floatDelay={0.7} 
                    floatDuration={5.4} 
                    onHoverStart={() => setHoveredId(industriesList[8].id)}
                    onHoverEnd={() => setHoveredId(null)}
                  />
                </div>
              </div>

              {/* MOBILE / TABLET LAYOUT (Translucent wrapping tags) */}
              <div className="flex lg:hidden flex-wrap justify-center gap-4 w-full relative z-10">
                {industriesList.map((item, idx) => (
                  <CapsuleCard 
                    key={item.id} 
                    item={item} 
                    floatDelay={idx * 0.15}
                    floatDuration={5.5}
                  />
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

interface CapsuleCardProps {
  item: typeof industriesList[0];
  floatDelay: number;
  floatDuration: number;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

function CapsuleCard({ item, floatDelay, floatDuration, onHoverStart, onHoverEnd }: CapsuleCardProps) {
  if (!item) return null;

  return (
    <motion.div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      // Perpetual floating micro-interaction
      animate={{
        y: [0, -6, 0]
      }}
      transition={{
        repeat: Infinity,
        duration: floatDuration,
        delay: floatDelay,
        ease: "easeInOut"
      }}
      // 3D tactile tilt effect on hover
      whileHover={{ 
        y: -10, 
        scale: 1.04,
        rotateX: -4,
        rotateY: 4,
        transition: { type: "spring", stiffness: 350, damping: 18 }
      }}
      className="flex items-center gap-4 px-5 py-3.5 bg-white/92 backdrop-blur-md border border-white/20 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(255,255,255,0.22)] hover:border-white hover:bg-white transition-all duration-300 group cursor-pointer relative overflow-hidden flex-shrink-0"
    >
      {/* Active node pulsing indicator on the top-right of the card (brand orange colored) */}
      <span className="absolute top-2 right-4 flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B2C] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF6B2C] opacity-80"></span>
      </span>

      {/* Circle cropped thumbnail */}
      <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-slate-100 group-hover:border-slate-200 transition-colors duration-300 z-10">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="36px"
          className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
          unoptimized
        />
      </div>

      {/* Label Text Details */}
      <div className="flex flex-col items-start pr-3 z-10 py-0.5">
        <span className="text-[14.5px] font-bold text-slate-800 group-hover:text-slate-900 transition-colors duration-300 whitespace-nowrap leading-snug mb-0.5">
          {item.title}
        </span>
        <span className="text-[10px] text-slate-400 font-medium tracking-wide leading-normal whitespace-nowrap">
          {item.subtitle}
        </span>
      </div>
    </motion.div>
  );
}
