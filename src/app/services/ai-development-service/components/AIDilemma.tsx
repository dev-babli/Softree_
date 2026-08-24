"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, HelpCircle } from "lucide-react";

export default function AIDilemma() {
  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden bg-slate-950 font-sans text-white">
      {/* Subtle deep blue background glow */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <span className="text-[#FF5812] font-bold tracking-[0.2em] text-[11px] uppercase mb-4">
            SOLVING COMPLEXITY
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-tight mb-6">
            How We Solve Your <span className="text-[#FF5812]">Enterprise AI Dilemma</span>
          </h2>
          <p className="text-[15px] lg:text-[16px] text-slate-400 leading-relaxed">
            Taking an industry-first approach, we combine tailored consulting services with specialized Microsoft AI technologies to improve your top and bottom line, enhance organizational agility, and advance digital maturity.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT COLUMN (Spans 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Left Top: Tall CPU/Silicon Card */}
            <div className="flex-1 min-h-[320px] rounded-3xl bg-slate-900/30 border border-slate-800/60 p-8 relative overflow-hidden flex flex-col justify-between group shadow-lg">
              {/* Binary background grid */}
              <div className="absolute inset-0 opacity-[0.03] select-none font-mono text-[9px] leading-tight text-blue-400 overflow-hidden pointer-events-none p-4 break-all">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className="whitespace-nowrap">010101100110010101100011011101001010101100110</div>
                ))}
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />

              {/* Glowing Background Radial */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

              {/* High-Fidelity Silicon Chip Illustration */}
              <div className="relative z-10 flex-1 flex items-center justify-center py-6">
                <svg className="w-52 h-52 text-blue-500/60" viewBox="0 0 100 100" fill="none">
                  {/* Outer motherboard grid tracks */}
                  <g stroke="#3b82f6" strokeWidth="0.8" strokeOpacity="0.25">
                    <line x1="10" y1="30" x2="30" y2="30" />
                    <line x1="10" y1="50" x2="30" y2="50" />
                    <line x1="10" y1="70" x2="30" y2="70" />
                    <line x1="70" y1="30" x2="90" y2="30" />
                    <line x1="70" y1="50" x2="90" y2="50" />
                    <line x1="70" y1="70" x2="90" y2="70" />
                    <line x1="30" y1="10" x2="30" y2="30" />
                    <line x1="50" y1="10" x2="50" y2="30" />
                    <line x1="70" y1="10" x2="70" y2="30" />
                    <line x1="30" y1="70" x2="30" y2="90" />
                    <line x1="50" y1="70" x2="50" y2="90" />
                    <line x1="70" y1="70" x2="70" y2="90" />
                    {/* Track nodes */}
                    <circle cx="30" cy="30" r="1.5" fill="#3b82f6" />
                    <circle cx="70" cy="30" r="1.5" fill="#3b82f6" />
                    <circle cx="30" cy="70" r="1.5" fill="#3b82f6" />
                    <circle cx="70" cy="70" r="1.5" fill="#3b82f6" />
                  </g>

                  {/* Main Socket */}
                  <rect x="24" y="24" width="52" height="52" rx="8" fill="#080C16" stroke="#1e3a8a" strokeWidth="2" />
                  <rect x="28" y="28" width="44" height="44" rx="6" fill="#0d1527" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.4" />

                  {/* Pins (Gold/Blue edge pins) */}
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <g key={idx} strokeWidth="1.2">
                      {/* Top pins */}
                      <line x1={32 + idx * 5} y1="19" x2={32 + idx * 5} y2="24" stroke="#fbbf24" />
                      {/* Bottom pins */}
                      <line x1={32 + idx * 5} y1="76" x2={32 + idx * 5} y2="81" stroke="#fbbf24" />
                      {/* Left pins */}
                      <line x1="19" y1={32 + idx * 5} x2="24" y2={32 + idx * 5} stroke="#fbbf24" />
                      {/* Right pins */}
                      <line x1="76" y1={32 + idx * 5} x2="81" y2={32 + idx * 5} stroke="#fbbf24" />
                    </g>
                  ))}

                  {/* Silicon Die (Center Chip) */}
                  <rect x="36" y="36" width="28" height="28" rx="4" fill="url(#dieGrad)" stroke="#60a5fa" strokeWidth="1.5" />
                  
                  {/* Central glowing processor icon */}
                  <motion.g
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  >
                    {/* Sci-fi micro-processor symbol */}
                    <rect x="42" y="42" width="16" height="16" rx="3.5" fill="#3b82f6" />
                    <circle cx="50" cy="50" r="3.5" fill="white" />
                  </motion.g>

                  {/* Definitions for Gradients */}
                  <defs>
                    <radialGradient id="dieGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1d4ed8" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>

              <div className="relative z-10">
                <h4 className="text-lg font-bold text-white mb-2">Architecting Modern Foundations</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  We build custom, enterprise-ready infrastructure integrations connecting cognitive services directly with core systems.
                </p>
              </div>
            </div>

            {/* Left Bottom: Toggle Switch Card */}
            <div className="rounded-3xl bg-slate-900/30 border border-slate-800/60 p-6 flex flex-row items-center justify-between gap-6 group shadow-lg">
              <div className="flex-1">
                <p className="text-[14px] text-slate-300 font-semibold leading-snug">
                  We optimize your value chains and business processes.
                </p>
              </div>
              <div className="shrink-0 relative flex items-center justify-center p-3 bg-slate-950/80 rounded-2xl border border-slate-800 w-24 h-16 overflow-hidden">
                {/* Switch capsule */}
                <div className="w-12 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 relative flex items-center px-0.5">
                  <motion.div 
                    layout
                    className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"
                    initial={{ x: 0 }}
                    animate={{ x: 24 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  />
                </div>
                {/* Mouse Cursor click vector (pointing right at the knob) */}
                <svg className="absolute bottom-1.5 right-4 w-4 h-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] fill-current pointer-events-none" viewBox="0 0 24 24">
                  <path d="M4 2 L22 10 L13 13 L10 22 Z" stroke="black" strokeWidth="1" />
                </svg>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (Spans 7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Top Cost Reduction Card (Spans 2 columns on desktop) */}
            <div className="md:col-span-2 rounded-3xl bg-slate-900/30 border border-slate-800/60 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg relative overflow-hidden group">
              {/* Falling cost bars graphic */}
              <div className="flex items-end gap-2 h-16 w-36 shrink-0 justify-center">
                {Array.from({ length: 8 }).map((_, idx) => {
                  const height = 45 - idx * 5;
                  const op = 0.2 + idx * 0.11;
                  return (
                    <div 
                      key={idx} 
                      style={{ height: `${height}px`, opacity: op }} 
                      className="w-1.5 rounded-t bg-yellow-500" 
                    />
                  );
                })}
                {/* Golden glowing coin dot */}
                <div className="relative select-none">
                  <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-4 h-4 rounded-full bg-yellow-500 border border-yellow-300 shadow-[0_0_10px_#facc15] flex items-center justify-center text-[8px] font-black text-slate-950"
                  >
                    $
                  </motion.div>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <p className="text-[14.5px] text-slate-300 font-semibold leading-relaxed">
                  We reduce your costs and complexity of developing <span className="text-white">in-house AI solutions</span>.
                </p>
              </div>
            </div>

            {/* Middle Left: Hands shaking / Touch Card */}
            <div className="rounded-3xl bg-slate-900/30 border border-slate-800/60 p-6 flex flex-col items-center justify-center text-center shadow-lg group relative overflow-hidden">
              {/* Central lightning glow */}
              <div className="absolute w-16 h-16 bg-yellow-500/10 rounded-full blur-xl pointer-events-none" />

              {/* Hand Vector touch */}
              <div className="relative h-28 w-full flex items-center justify-center mb-4">
                <svg className="w-44 h-24 text-slate-500" viewBox="0 0 100 50" fill="none">
                  {/* Human Hand Silhouette (Left) */}
                  <path 
                    d="M 5 30 L 22 30 C 25 30, 27 28, 29 25 L 34 25 C 38 25, 41 23, 44 24 L 46 25" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                  />
                  {/* Robot Hand Silhouette with joint circles (Right) */}
                  <path 
                    d="M 95 30 L 78 30 C 75 30, 73 28, 71 25 L 66 25 C 62 25, 59 23, 56 24 L 54 25" 
                    stroke="#60a5fa" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                  />
                  {/* Robotic joint dots */}
                  <circle cx="78" cy="30" r="2.5" fill="#1d2d44" stroke="#60a5fa" strokeWidth="1" />
                  <circle cx="71" cy="25" r="2.5" fill="#1d2d44" stroke="#60a5fa" strokeWidth="1" />
                  <circle cx="66" cy="25" r="2.5" fill="#1d2d44" stroke="#60a5fa" strokeWidth="1" />
                  
                  {/* Central glowing lightning spark */}
                  <motion.path 
                    d="M 50 15 L 53 23 L 47 25 L 50 33" 
                    stroke="#fbbf24" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    initial={{ opacity: 0.4, scale: 0.9 }}
                    animate={{ 
                      opacity: [0.4, 1, 0.4], 
                      scale: [0.9, 1.15, 0.9],
                      filter: ["drop-shadow(0 0 2px rgba(251,191,36,0.3))", "drop-shadow(0 0 8px rgba(251,191,36,0.8))", "drop-shadow(0 0 2px rgba(251,191,36,0.3))"]
                    }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  />
                  {/* Small extra sparks */}
                  <circle cx="49" cy="21" r="0.75" fill="#fbbf24" />
                  <circle cx="52" cy="29" r="0.75" fill="#fbbf24" />
                </svg>
              </div>
              
              <p className="text-[12.5px] text-slate-400 leading-relaxed">
                Seamlessly bridging human capability and machine intelligence.
              </p>
            </div>

            {/* Middle Right: Certified Expertise text card */}
            <div className="rounded-3xl bg-slate-900/30 border border-slate-800/60 p-6 flex flex-col justify-between shadow-lg relative group">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 w-fit mb-4">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[14px] text-slate-300 font-semibold leading-relaxed mb-2">
                  Certified Microsoft Competencies
                </p>
                <p className="text-[12.5px] text-slate-400 leading-relaxed">
                  We bring in advanced, certified expertise to integrate AI models directly into your existing Power Platform, Teams, and Azure workflows.
                </p>
              </div>
            </div>

            {/* Bottom Left: Remove Barriers text card */}
            <div className="rounded-3xl bg-slate-900/30 border border-slate-800/60 p-6 flex flex-col justify-between shadow-lg relative group">
              <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 w-fit mb-4">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[14px] text-slate-300 font-semibold leading-relaxed mb-2">
                  Removing Strategic Roadblocks
                </p>
                <p className="text-[12.5px] text-slate-400 leading-relaxed">
                  We remove adoption barriers stemming from compliance constraints, scalability challenges, or complex vendor customization frameworks.
                </p>
              </div>
            </div>

            {/* Bottom Right: Matrix digital screen Card */}
            <div className="rounded-3xl bg-slate-900/30 border border-slate-800/60 p-4 relative overflow-hidden flex items-center justify-center shadow-lg group min-h-[160px]">
              {/* Matrix waterfall effect */}
              <div className="absolute inset-0 font-mono text-[8px] leading-none text-emerald-500/30 overflow-hidden pointer-events-none p-4 select-none">
                <div className="animate-pulse">
                  01010101 01 01 01 01 01 01<br />
                  10101100 11 00 11 00 11 00<br />
                  01010101 01 01 01 01 01 01<br />
                  00110011 00 11 00 11 00 11<br />
                  11001100 11 00 11 00 11 00<br />
                  01100110 01 10 01 10 01 10
                </div>
              </div>
              
              {/* Code shell container */}
              <div className="relative z-10 w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 font-mono text-[10px] text-emerald-400 shadow-inner">
                <div className="flex items-center gap-1.5 mb-2 border-b border-slate-800 pb-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                  <span className="w-2 h-2 rounded-full bg-green-500/80" />
                  <span className="text-[8px] text-slate-500 ml-auto">model.py</span>
                </div>
                <div className="text-[9px] text-slate-400">
                  <span className="text-blue-400">import</span> azure.ai as ai<br />
                  model = ai.deploy(<span className="text-emerald-300">"copilot-v2"</span>)<br />
                  <span className="text-slate-500"># Output: 200 OK</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
