"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, HelpCircle, Shield, Award, Sparkles } from "lucide-react";
import SectionBadge from "./SectionBadge";
import { coreCapabilitiesData } from "../data/coreCapabilitiesData";

export default function CoreCapabilities() {
  // Find capability data by ID for accurate mapping
  const strategy = coreCapabilitiesData.find((c) => c.id === "01") || coreCapabilitiesData[0];
  const architecture = coreCapabilitiesData.find((c) => c.id === "02") || coreCapabilitiesData[1];
  const automation = coreCapabilitiesData.find((c) => c.id === "03") || coreCapabilitiesData[2];
  const security = coreCapabilitiesData.find((c) => c.id === "04") || coreCapabilitiesData[3];
  const microsoft = coreCapabilitiesData.find((c) => c.id === "05") || coreCapabilitiesData[4];
  const optimization = coreCapabilitiesData.find((c) => c.id === "06") || coreCapabilitiesData[5];

  return (
    <section className="relative w-full pb-16 lg:pb-24 pt-4 lg:pt-8 bg-white overflow-hidden font-sans">
      {/* Background Decorators */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] border-b border-r border-zinc-200/40 rounded-br-[100%] opacity-40 pointer-events-none -translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-zinc-200/10 rounded-full blur-3xl opacity-30 pointer-events-none translate-x-1/4 translate-y-1/4" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center w-full mb-12 lg:mb-16">
          <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-4 py-1.5 rounded-full border border-white/60 mb-4 inline-block">
            <span className="text-[11px] font-bold text-[#FF6B2C] tracking-widest uppercase">
              CORE CAPABILITIES
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-slate-850 mb-4 tracking-tight text-center leading-tight drop-shadow-[1px_1px_0px_rgba(255,255,255,0.9)]">
            Enterprise AI Development <span className="text-[#FF6B2C]">Capabilities</span>
          </h2>

          <p className="text-[15px] lg:text-base text-slate-500 text-center max-w-2xl mx-auto leading-relaxed">
            From AI strategy and development to deployment and optimization, we build secure, scalable AI solutions that help enterprises automate processes, solve complex challenges, and accelerate business growth.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* LEFT COLUMN (Spans 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Left Top: Tall Silicon Chip / Architecture Card */}
            <div className="flex-1 min-h-[380px] rounded-[28px] bg-gradient-to-br from-neutral-950 via-[#121217] to-neutral-950 border border-zinc-800/80 p-8 relative overflow-hidden flex flex-col justify-between group shadow-[0_15px_35px_rgba(0,0,0,0.55)] hover:border-orange-500/35 hover:scale-[1.015] hover:shadow-[0_25px_45px_rgba(255,88,18,0.12)] transition-all duration-300">
              {/* Matrix/Binary background grid in light gray */}
              <div className="absolute inset-0 opacity-[0.015] select-none font-mono text-[9px] leading-tight text-white overflow-hidden pointer-events-none p-4 break-all">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className="whitespace-nowrap">010101100110010101100011011101001010101100110</div>
                ))}
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />

              {/* Glowing Background Radial */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FF5812]/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

              {/* High-Fidelity Silicon Chip Illustration (Skeuomorphic) */}
              <div className="relative z-10 flex-1 flex items-center justify-center py-4">
                <svg className="w-48 h-48 text-[#FF6B2C]/20" viewBox="0 0 100 100" fill="none">
                  {/* Outer motherboard grid tracks */}
                  <g stroke="#27272a" strokeWidth="0.8" strokeOpacity="0.8">
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
                    <circle cx="30" cy="30" r="1.2" fill="#3f3f46" />
                    <circle cx="70" cy="30" r="1.2" fill="#3f3f46" />
                    <circle cx="30" cy="70" r="1.2" fill="#3f3f46" />
                    <circle cx="70" cy="70" r="1.2" fill="#3f3f46" />
                  </g>

                  {/* Main Socket with 3D bevel looks */}
                  <rect x="24" y="24" width="52" height="52" rx="8" fill="#09090b" stroke="#18181b" strokeWidth="1.5" />
                  <rect x="28" y="28" width="44" height="44" rx="6" fill="#121215" stroke="#27272a" strokeWidth="1.5" />

                  {/* Pins (Gold/Coral edge pins) */}
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <g key={idx} strokeWidth="1.2">
                      <line x1={32 + idx * 5} y1="19" x2={32 + idx * 5} y2="24" stroke="#FF5812" />
                      <line x1={32 + idx * 5} y1="76" x2={32 + idx * 5} y2="81" stroke="#FF5812" />
                      <line x1="19" y1={32 + idx * 5} x2="24" y2={32 + idx * 5} stroke="#FF5812" />
                      <line x1="76" y1={32 + idx * 5} x2="81" y2={32 + idx * 5} stroke="#FF5812" />
                    </g>
                  ))}

                  {/* Silicon Die (Center Chip) with sunken gradient */}
                  <rect x="36" y="36" width="28" height="28" rx="4" fill="url(#dieGradDark)" stroke="#27272a" strokeWidth="1.5" />

                  {/* Central glowing processor icon */}
                  <motion.g
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  >
                    <rect x="42" y="42" width="16" height="16" rx="3.5" fill="#FF5812" />
                    <circle cx="50" cy="50" r="3.5" fill="white" />
                  </motion.g>

                  {/* Definitions for Gradients */}
                  <defs>
                    <radialGradient id="dieGradDark" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#2e1005" />
                      <stop offset="100%" stopColor="#09090b" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>

              <div className="relative z-10">
                <div className="inline-block bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full mb-3 text-[10px] font-bold text-[#FF6B2C] tracking-wider uppercase select-none">
                  {architecture.id} • {architecture.title}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Designing Scalable AI Foundations</h4>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {architecture.shortDesc}
                </p>
              </div>
            </div>

            {/* Left Bottom: Toggle Switch / Automation Card */}
            <div className="rounded-[28px] bg-gradient-to-br from-neutral-950 via-[#121217] to-neutral-950 border border-zinc-800/80 p-6 flex flex-row items-center justify-between gap-6 shadow-[0_15px_35px_rgba(0,0,0,0.55)] hover:border-orange-500/35 hover:scale-[1.015] hover:shadow-[0_25px_45px_rgba(255,88,18,0.12)] transition-all duration-300 group relative overflow-hidden">
              <div className="flex-1">
                <div className="inline-block bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-full mb-2 text-[9px] font-bold text-[#FF6B2C] tracking-wider uppercase select-none">
                  {automation.id} • {automation.title}
                </div>
                <p className="text-[14px] text-white font-bold leading-snug">
                  Automate Workflows With AI-Powered Solutions.
                </p>
                <p className="text-[12px] text-zinc-400 mt-1">
                  {automation.shortDesc}
                </p>
              </div>

              {/* Recessed Switch Container (Skeuomorphic Slot) */}
              <div className="shrink-0 relative flex items-center justify-center p-3 rounded-2xl shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] bg-black/40 border border-white/5 w-24 h-16 overflow-hidden">
                {/* Switch capsule */}
                <div className="w-12 h-6 rounded-full bg-zinc-950/80 shadow-inner border border-zinc-800 relative flex items-center px-0.5">
                  <motion.div
                    layout
                    className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981,1px_1px_2px_rgba(0,0,0,0.15)]"
                    initial={{ x: 0 }}
                    animate={{ x: 24 }}
                    transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  />
                </div>
                {/* Mouse Cursor click vector */}
                <svg className="absolute bottom-1.5 right-4 w-4 h-4 text-white drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.2)] fill-current pointer-events-none" viewBox="0 0 24 24">
                  <path d="M4 2 L22 10 L13 13 L10 22 Z" stroke="white" strokeWidth="1" />
                </svg>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (Spans 7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

            {/* Top: Optimization & Cost Card (Spans 2 columns on desktop) */}
            <div className="md:col-span-2 rounded-[28px] bg-gradient-to-br from-neutral-950 via-[#121217] to-neutral-950 border border-zinc-800/80 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_15px_35px_rgba(0,0,0,0.55)] hover:border-orange-500/35 hover:scale-[1.015] hover:shadow-[0_25px_45px_rgba(255,88,18,0.12)] transition-all duration-300 relative overflow-hidden group">

              {/* Recessed Cost bars graphic (Molded into the card) */}
              <div className="flex items-end gap-2 h-16 w-36 shrink-0 justify-center shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] bg-black/40 border border-white/5 rounded-xl p-3 select-none">
                {Array.from({ length: 8 }).map((_, idx) => {
                  const height = 36 - idx * 4;
                  const op = 0.3 + idx * 0.1;
                  return (
                    <div
                      key={idx}
                      style={{ height: `${height}px`, opacity: op }}
                      className="w-1.5 rounded-t bg-[#FF6B2C] shadow-[0.5px_0.5px_1px_rgba(0,0,0,0.05)]"
                    />
                  );
                })}
                {/* Golden glowing coin dot */}
                <div className="relative">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-4 h-4 rounded-full bg-amber-400 border border-amber-300 shadow-[0_0_8px_#f59e0b,1px_1px_2px_rgba(0,0,0,0.15)] flex items-center justify-center text-[8px] font-black text-white"
                  >
                    $
                  </motion.div>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="inline-block bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-full mb-2 text-[9px] font-bold text-[#FF6B2C] tracking-wider uppercase select-none">
                  {optimization.id} • {optimization.title}
                </div>
                <p className="text-[14.5px] text-white font-bold leading-relaxed mb-1">
                  Continuously Improve AI Performance.
                </p>
                <p className="text-[12px] text-zinc-400">
                  {optimization.shortDesc}
                </p>
              </div>
            </div>

            {/* Middle Left: Strategy Touch Card */}
            <div className="rounded-[28px] bg-gradient-to-br from-neutral-950 via-[#121217] to-neutral-950 border border-zinc-800/80 p-6 flex flex-col items-center justify-center text-center shadow-[0_15px_35px_rgba(0,0,0,0.55)] hover:border-orange-500/35 hover:scale-[1.015] hover:shadow-[0_25px_45px_rgba(255,88,18,0.12)] transition-all duration-300 group relative overflow-hidden">
              <div className="inline-block bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-full mb-3 text-[9px] font-bold text-[#FF6B2C] tracking-wider uppercase select-none">
                {strategy.id} • {strategy.title}
              </div>
              {/* Central lightning glow */}
              <div className="absolute w-16 h-16 bg-[#FF5812]/5 rounded-full blur-xl pointer-events-none" />

              {/* AI Brain Lightbulb Illustration inside recessed viewport */}
              <div className="relative h-24 w-full flex items-center justify-center mb-3 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] bg-black/40 border border-white/5 rounded-2xl select-none">
                {/* Glowing background gradient backing the lightbulb */}
                <div
                  className="absolute w-28 h-20 rounded-full blur-xl opacity-50 pointer-events-none z-0"
                  style={{
                    background: "radial-gradient(circle, rgba(255, 107, 44, 0.18) 0%, transparent 70%)"
                  }}
                />

                <svg className="w-20 h-20 relative z-10" viewBox="0 0 100 100" fill="none">
                  <defs>
                    {/* Inner bulb filament glow gradient */}
                    <linearGradient id="bulbGlow" x1="0" y1="100" x2="0" y2="0">
                      <stop offset="0%" stopColor="#FF6B2C" stopOpacity="0.16" />
                      <stop offset="60%" stopColor="#FF6B2C" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#FF6B2C" stopOpacity="0" />
                    </linearGradient>
                    {/* Glowing node connections gradient */}
                    <linearGradient id="netLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B2C" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#27272a" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>

                  {/* Lightbulb Glass Outline with Gradient Fill */}
                  <path
                    d="M 50 16 C 35 16, 28 28, 28 44 C 28 54, 35 63, 39 69 L 39 78 C 39 80, 41 82, 44 82 L 56 82 C 59 82, 61 80, 61 78 L 61 69 C 65 63, 72 54, 72 44 C 72 28, 65 16, 50 16 Z"
                    fill="url(#bulbGlow)"
                    stroke="#52525b"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Threaded Base */}
                  <line x1="42" y1="82" x2="58" y2="82" stroke="#3f3f46" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="44" y1="86" x2="56" y2="86" stroke="#3f3f46" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="47" y1="90" x2="53" y2="90" stroke="#27272a" strokeWidth="3" strokeLinecap="round" />

                  {/* Neural Network Nodes & Filaments with Gradient Stroke */}
                  <g stroke="url(#netLineGrad)" strokeWidth="0.8" strokeDasharray="2,2">
                    <line x1="50" y1="28" x2="38" y2="44" />
                    <line x1="50" y1="28" x2="62" y2="44" />
                    <line x1="38" y1="44" x2="50" y2="60" />
                    <line x1="62" y1="44" x2="50" y2="60" />
                    <line x1="38" y1="44" x2="62" y2="44" />
                    <line x1="50" y1="28" x2="50" y2="60" />
                  </g>

                  {/* Top Node */}
                  <motion.circle
                    cx="50"
                    cy="28"
                    r="3.5"
                    fill="#FF6B2C"
                    animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  />
                  <circle cx="50" cy="28" r="6.5" stroke="#FF6B2C" strokeWidth="0.8" strokeOpacity="0.25" />

                  {/* Left Node */}
                  <motion.circle
                    cx="38"
                    cy="44"
                    r="3"
                    fill="#FF6B2C"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 2.2, delay: 0.3, ease: "easeInOut" }}
                  />
                  <circle cx="38" cy="44" r="5.5" stroke="#FF6B2C" strokeWidth="0.8" strokeOpacity="0.25" />

                  {/* Right Node */}
                  <motion.circle
                    cx="62"
                    cy="44"
                    r="3"
                    fill="#FF6B2C"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 1.8, delay: 0.6, ease: "easeInOut" }}
                  />
                  <circle cx="62" cy="44" r="5.5" stroke="#FF6B2C" strokeWidth="0.8" strokeOpacity="0.25" />

                  {/* Bottom Node */}
                  <motion.circle
                    cx="50"
                    cy="60"
                    r="3.5"
                    fill="#FF6B2C"
                    animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 2.4, delay: 0.1, ease: "easeInOut" }}
                  />
                  <circle cx="50" cy="60" r="6.5" stroke="#FF6B2C" strokeWidth="0.8" strokeOpacity="0.25" />
                </svg>
              </div>

              <p className="text-[12px] text-zinc-400 leading-relaxed px-2 font-medium">
                We help partners turn business requirements into practical AI strategies, use cases, and scalable development roadmaps.
              </p>
            </div>

            {/* Middle Right: Certified Microsoft Competencies */}
            <div className="rounded-[28px] bg-gradient-to-br from-neutral-950 via-[#121217] to-neutral-950 border border-zinc-800/80 p-6 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.55)] hover:border-orange-500/35 hover:scale-[1.015] hover:shadow-[0_25px_45px_rgba(255,88,18,0.12)] transition-all duration-300 relative group overflow-hidden">

              {/* Recessed Icon Badge */}
              <div className="p-2.5 rounded-xl shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] bg-black/40 border border-white/5 text-[#FF6B2C] w-fit mb-4 select-none">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="inline-block bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full mb-2 text-[9px] font-bold text-[#FF6B2C] tracking-wider uppercase select-none">
                  {microsoft.id} • {microsoft.title}
                </div>
                <h5 className="text-[13.5px] text-white font-bold leading-relaxed mb-1">
                  Extend Microsoft Platforms With AI
                </h5>
                <p className="text-[11.5px] text-zinc-400 leading-relaxed">
                  Our team integrates AI solutions across Microsoft Teams, Power Platform, Azure, Copilot, and enterprise business systems.
                </p>
              </div>
            </div>

            {/* Bottom Left: Secure Governance Card */}
            <div className="rounded-[28px] bg-gradient-to-br from-neutral-950 via-[#121217] to-neutral-950 border border-zinc-800/80 p-6 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.55)] hover:border-orange-500/35 hover:scale-[1.015] hover:shadow-[0_25px_45px_rgba(255,88,18,0.12)] transition-all duration-300 relative group overflow-hidden">

              {/* Recessed Icon Badge */}
              <div className="p-2.5 rounded-xl shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] bg-black/40 border border-white/5 text-[#FF6B2C] w-fit mb-4 select-none">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="inline-block bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full mb-2 text-[9px] font-bold text-[#FF6B2C] tracking-wider uppercase select-none">
                  {security.id} • {security.title}
                </div>
                <h5 className="text-[13.5px] text-white font-bold leading-relaxed mb-1">
                  Building Secure & Responsible AI Solutions
                </h5>
                <p className="text-[11.5px] text-zinc-400 leading-relaxed">
                  We implement enterprise-ready security, governance, data protection, and responsible AI practices across AI applications.
                </p>
              </div>
            </div>

            {/* Bottom Right: Digital Terminal Integration Card */}
            <div className="rounded-[28px] bg-gradient-to-br from-neutral-950 via-[#121217] to-neutral-950 border border-zinc-800/80 p-4 relative overflow-hidden flex items-center justify-center shadow-[0_15px_35px_rgba(0,0,0,0.55)] hover:border-orange-500/35 hover:scale-[1.015] hover:shadow-[0_25px_45px_rgba(255,88,18,0.12)] transition-all duration-300 group min-h-[160px]">
              <div className="absolute inset-0 font-mono text-[8px] leading-none text-white/5 overflow-hidden pointer-events-none p-4 select-none">
                <div className="opacity-45">
                  01010101 01 01 01 01 01 01<br />
                  10101100 11 00 11 00 11 00<br />
                  01010101 01 01 01 01 01 01<br />
                  00110011 00 11 00 11 00 11<br />
                  11001100 11 00 11 00 11 00
                </div>
              </div>

              {/* Shell container (sunken neumorphic shell look) */}
              <div className="relative z-10 w-full shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] bg-black/40 border border-white/5 rounded-2xl p-4 font-mono text-[10px] text-zinc-300 select-none">
                <div className="flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
                  <span className="w-2 h-2 rounded-full bg-green-400/80" />
                  <span className="text-[8px] text-slate-500 ml-auto">copilot-setup.py</span>
                </div>
                <div className="text-[9px] text-zinc-400">
                  <span className="text-orange-600 font-bold">import</span> microsoft.ai as ai<br />
                  model = ai.integrate(<span className="text-emerald-600 font-medium">"azure-openai"</span>)<br />
                  <span className="text-slate-500"># Output: SUCCESS (Active)</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
