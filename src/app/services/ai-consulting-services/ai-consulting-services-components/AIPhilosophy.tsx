"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIPhilosophy() {
  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden bg-white font-sans text-slate-900">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-slate-50 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="text-[#FF5812] font-bold tracking-[0.2em] text-[11px] uppercase mb-4">
            OUR PHILOSOPHY
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl mb-4">
           The Principles Behind <span className="text-[#FF5812]">Strategic AI Advisory</span>
          </h2>
          <p className="text-[16px] lg:text-[17px] text-slate-500 max-w-2xl mx-auto leading-relaxed">
            We align technology potential with organizational readiness. Our consulting philosophy focuses on building clear roadmaps, structuring sound architecture blueprints, and establishing responsible AI frameworks.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
          
          {/* Pillar 1 */}
          <div className="flex flex-col">
            {/* Animated Graph Illustration Card */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950 border border-white/10 flex items-center justify-center group mb-6 shadow-md">
              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
              
              {/* Central Glow */}
              <div className="absolute w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />

              {/* Bars */}
              <div className="relative z-10 w-full h-full flex items-end justify-center gap-3 px-12 pb-10">
                <motion.div initial={{ height: 0 }} whileInView={{ height: "30%" }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-8 bg-white/10 rounded-t-lg border border-white/20" />
                <motion.div initial={{ height: 0 }} whileInView={{ height: "50%" }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="w-8 bg-white/15 rounded-t-lg border border-white/20" />
                <motion.div initial={{ height: 0 }} whileInView={{ height: "70%" }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="w-8 bg-white/25 rounded-t-lg border border-white/25" />
                <motion.div initial={{ height: 0 }} whileInView={{ height: "90%" }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="w-8 bg-white/40 rounded-t-lg border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
              </div>
              
              {/* Arrow SVG overlay */}
              <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none p-12" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path 
                  d="M 18 80 L 82 18" 
                  fill="none" 
                  stroke="#FF5812" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                <motion.path 
                  d="M 60 18 L 82 18 L 82 40" 
                  fill="none" 
                  stroke="#FF5812" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                />
              </svg>
            </div>

            {/* Content */}
            <span className="text-[#FF5812] text-[11px] font-bold uppercase tracking-widest mb-2 block">
              PILLAR 01
            </span>
            <h3 className="text-slate-900 text-xl font-bold mb-3">
              Strategic Value Assessment
            </h3>
            <p className="text-slate-500 text-[14.5px] leading-relaxed">
              We identify where AI can drive actual business value. Through deep discovery, we evaluate your operational readiness and map out high-ROI use cases, ensuring every proposed initiative has a clear path to measurable outcomes.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col">
            {/* Animated Cloud Connections Illustration Card */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-950 via-cyan-950 to-slate-950 border border-white/10 flex items-center justify-center group mb-6 shadow-md">
              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
              
              {/* Central Glow */}
              <div className="absolute w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />

              {/* Vector cloud nodes */}
              <svg className="relative z-10 w-36 h-36 text-blue-400/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-3.21-3.5-3.5-3.5-.71-4.71-5-5-5-5C8 7 8 11.5 8 11.5c-2.43.29-3.5 2-3.5 3.5A3.5 3.5 0 0 0 8 19Z" fill="currentColor" fillOpacity="0.05" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" />
                <circle cx="20" cy="6" r="1" fill="currentColor" stroke="none" />
                <circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" />
                <path d="M4.5 7 L10 11.5" strokeDasharray="3 3" />
                <path d="M19.5 7 L14 11.5" strokeDasharray="3 3" />
                <path d="M12 7.5 L12 4.5" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* Content */}
            <span className="text-[#FF5812] text-[11px] font-bold uppercase tracking-widest mb-2 block">
              PILLAR 02
            </span>
            <h3 className="text-slate-900 text-xl font-bold mb-3">
              Architectural Blueprints
            </h3>
            <p className="text-slate-500 text-[14.5px] leading-relaxed">
              We design the foundation for enterprise scale. From choosing between pre-built copilots and custom LLMs to auditing your data layer, we construct architecture blueprints aligned with the Microsoft Cloud ecosystems you trust.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="flex flex-col">
            {/* Animated Shield Illustration Card */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 border border-white/10 flex items-center justify-center group mb-6 shadow-md">
              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
              
              {/* Central Glow */}
              <div className="absolute w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />

              {/* Shield Vector */}
              <svg className="relative z-10 w-24 h-24 text-emerald-400/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.05" />
                <motion.path 
                  d="M9 11l2 2 4-4" 
                  stroke="#FF5812" 
                  strokeWidth="2" 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </svg>
            </div>

            {/* Content */}
            <span className="text-[#FF5812] text-[11px] font-bold uppercase tracking-widest mb-2 block">
              PILLAR 03
            </span>
            <h3 className="text-slate-900 text-xl font-bold mb-3">
              Governance & Risk Mitigation
            </h3>
            <p className="text-slate-500 text-[14.5px] leading-relaxed">
              Trust is non-negotiable for enterprise deployment. We define responsible AI guidelines, risk management policies, and compliance guardrails to help your security and IT teams confidently support organizational adoption.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
