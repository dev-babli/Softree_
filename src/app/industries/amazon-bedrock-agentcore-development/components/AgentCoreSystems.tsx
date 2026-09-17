"use client";

import React from "react";
import {
  Headphones, UserRound, Search, Users, Network, Plug, Server,
  Database, ContactRound, Building2, BriefcaseBusiness, Code2,
  Terminal, Cloud, Container, Boxes, Activity, Bot, ChevronRight, Target
} from "lucide-react";

// Isometric Stacked Blocks on circular pedestal SVG (High-fidelity vector design) with embedded floating animations
const IsometricBlocksLogo = () => (
  <div className="relative w-40 h-40 sm:w-52 sm:h-52 mx-auto flex items-center justify-center">
    <style>{`
      @keyframes floatTop {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      @keyframes floatMiddle {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
      }
      @keyframes pedestalGlow {
        0%, 100% { opacity: 0.45; stroke-width: 1.5px; }
        50% { opacity: 0.85; stroke-width: 2.2px; }
      }
      .animate-float-top {
        animation: floatTop 3s ease-in-out infinite;
      }
      .animate-float-middle {
        animation: floatMiddle 3.5s ease-in-out infinite;
      }
      .animate-pedestal-glow {
        animation: pedestalGlow 2.5s ease-in-out infinite;
      }
    `}</style>
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_24px_rgba(255,107,44,0.45)]">
      {/* Base pedestal circular light wave */}
      <ellipse cx="60" cy="102" rx="48" ry="14" fill="none" stroke="#FF6B2C" className="animate-pedestal-glow" strokeDasharray="3 3" />
      <ellipse cx="60" cy="102" rx="38" ry="10" fill="rgba(255,107,44,0.06)" stroke="#FF6B2C" strokeWidth="2" />
      <ellipse cx="60" cy="102" rx="26" ry="7" fill="none" stroke="#FF6B2C" strokeWidth="1" opacity="0.5" />
      <line x1="60" y1="102" x2="60" y2="92" stroke="#FF6B2C" strokeWidth="1" />

      {/* Stack pyramid bottom (3 cubes) */}
      <g>
        <path d="M42 90 L24 81 L42 72 L60 81 Z" fill="#1f1f1f" stroke="#FF6B2C" strokeWidth="1" />
        <path d="M24 81 L24 90 L42 99 L42 90 Z" fill="#111111" stroke="#FF6B2C" strokeWidth="1" />
        <path d="M42 90 L42 99 L60 90 L60 81 Z" fill="#000000" stroke="#FF6B2C" strokeWidth="1" />
        <path d="M78 90 L60 81 L78 72 L96 81 Z" fill="#1f1f1f" stroke="#FF6B2C" strokeWidth="1" />
        <path d="M60 81 L60 90 L78 99 L78 90 Z" fill="#111111" stroke="#FF6B2C" strokeWidth="1" />
        <path d="M78 90 L78 99 L96 90 L96 81 Z" fill="#000000" stroke="#FF6B2C" strokeWidth="1" />
      </g>

      {/* Center-Middle cube (Layer 2) - Animated Floating */}
      <g className="animate-float-middle">
        <path d="M60 76 L42 67 L60 58 L78 67 Z" fill="#1f1f1f" stroke="#FF6B2C" strokeWidth="1" />
        <path d="M42 67 L42 76 L60 85 L60 76 Z" fill="#111111" stroke="#FF6B2C" strokeWidth="1" />
        <path d="M60 76 L60 85 L78 76 L78 67 Z" fill="#000000" stroke="#FF6B2C" strokeWidth="1" />
      </g>

      {/* Top cube (Layer 3) - Animated Floating Higher */}
      <g className="animate-float-top">
        <path d="M60 55 L42 46 L60 37 L78 46 Z" fill="#1f1f1f" stroke="#FF6B2C" strokeWidth="1.2" />
        <path d="M42 46 L42 55 L60 64 L60 55 Z" fill="#111111" stroke="#FF6B2C" strokeWidth="1.2" />
        <path d="M60 55 L60 64 L78 55 L78 46 Z" fill="#000000" stroke="#FF6B2C" strokeWidth="1.2" />
      </g>
    </svg>
  </div>
);

export default function AgentCoreSystems() {
  const layer1Caps = [
    { name: "Customer Support", logo: <Headphones className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "Sales Agents", logo: <UserRound className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "Research Agents", logo: <Search className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "Employee Agents", logo: <Users className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "Multi-Agent Systems", logo: <Network className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
  ];

  const layer2Caps = [
    { name: "APIs", logo: <Plug className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "MCP Servers", logo: <Server className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "Databases", logo: <Database className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "CRM", logo: <ContactRound className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "ERP", logo: <Building2 className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "Business Applications", logo: <BriefcaseBusiness className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
  ];

  const layer3Caps = [
    { name: "Python", logo: <Code2 className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "FastAPI", logo: <Terminal className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "AWS", logo: <Cloud className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "Docker", logo: <Container className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "Kubernetes", logo: <Boxes className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "RAG", logo: <Database className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "Observability", logo: <Activity className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
  ];

  const rightCapabilities = [
    { 
      title: "AI AGENTS", 
      subtitle: "Production-Ready AI Agents",
      borderClass: "border-[#FF6B2C]/30", 
      textClass: "text-[#FF6B2C]", 
      glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]", 
      hoverBorder: "group-hover:border-[#FF6B2C]/60", 
      icon: <Bot className="w-6 h-6 lg:w-[26px] lg:h-[26px] text-[#FF6B2C]" strokeWidth={2} />, 
      desc: "Build agents that reason, plan, use tools, and automate workflows." 
    },
    { 
      title: "AGENT INTEGRATIONS", 
      subtitle: "AgentCore Integrations",
      borderClass: "border-[#FF6B2C]/30", 
      textClass: "text-[#FF6B2C]", 
      glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]", 
      hoverBorder: "group-hover:border-[#FF6B2C]/60", 
      icon: <Network className="w-6 h-6 lg:w-[26px] lg:h-[26px] text-[#FF6B2C]" strokeWidth={2} />, 
      desc: "Connect agents with APIs, MCP servers, databases, and business applications." 
    },
    { 
      title: "PRODUCTION ENGINEERING", 
      subtitle: "Offshore AgentCore Engineering",
      borderClass: "border-[#FF6B2C]/30", 
      textClass: "text-[#FF6B2C]", 
      glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]", 
      hoverBorder: "group-hover:border-[#FF6B2C]/60", 
      icon: <Terminal className="w-6 h-6 lg:w-[26px] lg:h-[26px] text-[#FF6B2C]" strokeWidth={2} />, 
      desc: "Build, deploy, monitor, and scale secure AI agent solutions on AWS." 
    },
  ];

  const workflowSteps = [
    "USER", "AGENT", "AGENTCORE", "TOOLS", "BUSINESS SYSTEM", "ACTION"
  ];

  return (
    <section className="w-full max-w-[1600px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 mt-4 sm:mt-8 md:mt-12 mb-0 z-10 relative flex flex-col gap-6 sm:gap-10">

      {/* Section Heading */}
      <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-500/20 typo-caption text-[#FF5812] uppercase mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF5812] animate-pulse" />
          03 — WHAT WE BUILD
        </div>
        <h2 className="typo-heading-2 text-slate-900 mb-2 sm:mb-4">
          Agentic AI Systems Built Around <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5812] to-amber-500">AgentCore</span>
        </h2>
      </div>

      {/* Outer Dashboard Card */}
      <div className="relative overflow-hidden rounded-[20px] lg:rounded-[24px] border border-slate-200 bg-white p-4 sm:p-6 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] min-h-[500px] flex items-center text-slate-900 w-full">

        {/* Mirror-morphism reflection glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(255,107,44,0.03),transparent_40%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(255,107,44,0.04),transparent_45%)] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch w-full relative z-10">

          {/* Left Column: Heading, Isometric Stack (contained inside a glowing card) */}
          <div className="lg:col-span-3 flex">
            <div className="relative overflow-hidden rounded-[18px] border border-orange-500/30 bg-slate-50 p-5 sm:p-6 shadow-[0_0_25px_rgba(255,107,44,0.05)] flex flex-col justify-between items-stretch w-full h-auto min-h-[300px] lg:h-[360px] z-10">
              <div className="space-y-1.5 text-left">
                <h2 className="typo-heading-3 text-slate-900 uppercase mb-1">
                  AGENTIC AI
                </h2>
              </div>

              {/* 3D Stack pedestal illustration with smooth floating animation */}
              <div className="py-2 sm:py-4 flex items-center justify-center">
                <IsometricBlocksLogo />
              </div>
            </div>
          </div>

          {/* Center-Right Columns holding the 3 layers stack, branch lines, and the glowing core next to 3 capabilities */}
          <div className="lg:col-span-9 grid grid-cols-1 lg:grid-cols-12 gap-6 relative">

            {/* Unified SVG Branching Connection Overlay */}
            <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0">
              <svg className="w-full h-full" viewBox="0 0 900 350" fill="none" preserveAspectRatio="none">
                {/* Left Branches (3 Layers -> Central Core) - Advanced Dual-Layer Neon Glowing Lines */}
                {/* Layer 01 */}
                <path d="M 450 60 L 465 60 L 475 175" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 60 L 465 60 L 475 175" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Layer 02 */}
                <path d="M 450 175 L 475 175" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 175 L 475 175" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Layer 03 */}
                <path d="M 450 290 L 465 290 L 475 175" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 290 L 465 290 L 475 175" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Right Branches (Central Core -> 3 Capabilities) - Advanced Dual-Layer Neon Glowing Lines */}
                {/* Card 01 */}
                <path d="M 575 175 L 585 60 L 600 60" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 175 L 585 60 L 600 60" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Card 02 */}
                <path d="M 575 175 L 600 175" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 175 L 600 175" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Card 03 */}
                <path d="M 575 175 L 585 290 L 600 290" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 175 L 585 290 L 600 290" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Left Flowing Dot Animations (Thicker data packages) */}
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 450 60 L 465 60 L 475 175" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path="M 450 175 L 475 175" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 450 290 L 465 290 L 475 175" />
                </circle>

                {/* Right Flowing Dot Animations (Thicker data packages) */}
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 575 175 L 585 60 L 600 60" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path="M 575 175 L 600 175" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 575 175 L 585 290 L 600 290" />
                </circle>
              </svg>
            </div>

            {/* Col A (3 Layers stack) - lg:col-span-6 */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-3 lg:gap-0 py-1 h-auto lg:h-[360px] relative z-10">

              {/* Layer 01: AI AGENTS */}
              <div className="relative p-3 sm:p-3.5 lg:p-3 rounded-[14px] lg:rounded-[12px] border border-orange-500/25 bg-white shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-2 min-h-[90px]">
                <div className="w-full sm:w-[115px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1.5 sm:pb-0 border-b sm:border-b-0 border-orange-500/15 pl-0.5">
                  <div>
                    <span className="typo-caption text-orange-600 block uppercase mb-0.5">CATEGORY 01</span>
                    <span className="typo-caption-meta text-slate-900 block uppercase">AI AGENTS</span>
                  </div>
                </div>
                <div className="hidden sm:block w-[1px] h-9 bg-orange-500/25 self-center shrink-0" />
                <div className="grid grid-cols-3 lg:grid-cols-5 gap-1.5 sm:gap-1 pl-0 sm:pl-1 flex-1 items-start justify-center w-full">
                  {layer1Caps.map((cap, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-start text-center gap-1 sm:gap-1.5 group cursor-pointer bg-slate-50/70 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-none transition-all duration-200 hover:bg-orange-50/50 sm:hover:bg-transparent min-w-0">
                      <div className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-[6deg] shrink-0 h-5 flex items-center justify-center">
                        {cap.logo}
                      </div>
                      <span className="text-[8.5px] lg:text-[7.5px] xl:text-[8px] font-bold text-slate-700 group-hover:text-orange-600 transition-colors duration-200 leading-[1.1] px-0.5 break-words w-full">{cap.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 02: ENTERPRISE CONNECTIONS */}
              <div className="relative p-3 sm:p-3.5 lg:p-3 rounded-[14px] lg:rounded-[12px] border border-orange-500/25 bg-white shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-2 min-h-[90px]">
                <div className="w-full sm:w-[115px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1.5 sm:pb-0 border-b sm:border-b-0 border-orange-500/15 pl-0.5">
                  <div>
                    <span className="typo-caption text-orange-600 block uppercase mb-0.5">CATEGORY 02</span>
                    <span className="typo-caption-meta text-slate-900 block uppercase">ENTERPRISE CONNECTIONS</span>
                  </div>
                </div>
                <div className="hidden sm:block w-[1px] h-9 bg-orange-500/25 self-center shrink-0" />
                <div className="grid grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-1 pl-0 sm:pl-1 flex-1 items-start justify-center w-full">
                  {layer2Caps.map((cap, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-start text-center gap-1 sm:gap-1.5 group cursor-pointer bg-slate-50/70 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-none transition-all duration-200 hover:bg-orange-50/50 sm:hover:bg-transparent min-w-0">
                      <div className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-[6deg] shrink-0 h-5 flex items-center justify-center">
                        {cap.logo}
                      </div>
                      <span className="text-[8.5px] lg:text-[7.5px] xl:text-[8px] font-bold text-slate-700 group-hover:text-orange-600 transition-colors duration-200 leading-[1.1] px-0.5 break-words w-full">{cap.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 03: PRODUCTION ENGINEERING */}
              <div className="relative p-3 sm:p-3.5 lg:p-3 rounded-[14px] lg:rounded-[12px] border border-orange-500/25 bg-white shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-2 min-h-[90px]">
                <div className="w-full sm:w-[115px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1.5 sm:pb-0 border-b sm:border-b-0 border-orange-500/15 pl-0.5">
                  <div>
                    <span className="typo-caption text-orange-600 block uppercase mb-0.5">CATEGORY 03</span>
                    <span className="typo-caption-meta text-slate-900 block uppercase">PRODUCTION ENGINEERING</span>
                  </div>
                </div>
                <div className="hidden sm:block w-[1px] h-9 bg-orange-500/25 self-center shrink-0" />
                <div className="grid grid-cols-3 lg:grid-cols-7 gap-1.5 sm:gap-1 pl-0 sm:pl-1 flex-1 items-start justify-center w-full">
                  {layer3Caps.map((cap, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-start text-center gap-1 sm:gap-1.5 group cursor-pointer bg-slate-50/70 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-none transition-all duration-200 hover:bg-orange-50/50 sm:hover:bg-transparent min-w-0">
                      <div className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-[6deg] shrink-0 h-5 flex items-center justify-center">
                        {cap.logo}
                      </div>
                      <span className="text-[8.5px] lg:text-[7.5px] xl:text-[8px] font-bold text-slate-700 group-hover:text-orange-600 transition-colors duration-200 leading-[1.1] px-0.5 break-words w-full">{cap.name}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Col B (Central Glowing Core) */}
            <div className="lg:col-span-2 flex items-center justify-center relative z-10 py-6 lg:py-0">
              <div className="relative flex items-center justify-center w-[150px] h-[150px] sm:w-[180px] sm:h-[180px]">
                {/* Concentric rotating neon circles */}
                <div className="absolute inset-0 rounded-full border border-orange-500/30 animate-[spin_20s_linear_infinite] shadow-[0_0_40px_rgba(255,107,44,0.05)]" />
                <div className="absolute inset-2 sm:inset-3 rounded-full border border-orange-500/20 animate-[spin_12s_linear_infinite_reverse]" />

                <svg className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" stroke="rgba(255,107,44,0.12)" strokeWidth="1" fill="none" strokeDasharray="1 3" />
                  <circle cx="50" cy="50" r="42" stroke="rgba(255,107,44,0.22)" strokeWidth="1" fill="none" strokeDasharray="4 8" />
                </svg>

                {/* Core content */}
                <div className="absolute inset-4 sm:inset-5 rounded-full bg-white border-2 border-orange-400/50 shadow-[inset_0_0_20px_rgba(255,107,44,0.05),0_0_30px_rgba(255,107,44,0.15)] flex flex-col items-center justify-center gap-0.5 sm:gap-1 z-10">
                  <Bot className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 transition-transform duration-500 hover:scale-110 hover:rotate-[360deg] cursor-pointer text-orange-600" />
                  <span className="typo-caption text-slate-900 uppercase select-none text-center mt-0.5">AGENTCORE</span>
                </div>
              </div>
            </div>

            {/* Col C (3 Capabilities indicators) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-3 lg:gap-0 py-1 h-auto lg:h-[360px] text-left pl-0 lg:pl-3 relative z-10">
              {rightCapabilities.map((cap, idx) => (
                <div key={idx} className="relative flex items-center pl-5 sm:pl-6 w-full group">
                  {/* Circular indicator button offset to the left */}
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white border-2 ${cap.borderClass} ${cap.glowClass} z-20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[15deg]`}>
                    {cap.icon}
                  </div>
                  {/* Text banner with matching card border color */}
                  <div className={`w-full min-h-[90px] flex flex-col justify-center border ${cap.borderClass} bg-white p-2.5 sm:p-2.5 lg:p-2 xl:p-2.5 pl-8 sm:pl-10 lg:pl-9 xl:pl-10 rounded-lg text-left transition-all duration-300 ${cap.hoverBorder} shadow-[0_4px_12px_rgba(0,0,0,0.05)]`}>
                    <span className={`text-[9px] sm:text-[10px] font-bold tracking-[0.15em] block uppercase mb-0.5 ${cap.textClass}`}>
                      {cap.title}
                    </span>
                    <span className="text-sm sm:text-[15px] font-bold text-slate-900 leading-tight block mb-1">
                      {cap.subtitle}
                    </span>
                    <span className="text-[9px] sm:text-[10px] leading-[1.35] font-medium text-slate-500 block group-hover:text-slate-700 transition-colors duration-200 pr-1">
                      {cap.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Integrated bottom delivering business impact banner -> Workflow Flow */}
      <div className="relative overflow-hidden rounded-[20px] border border-orange-500/20 bg-white py-4 px-4 sm:px-6 md:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center gap-5 lg:gap-6 z-10 text-slate-900 w-full overflow-x-auto no-scrollbar">

        {/* Mirror-morphism reflection glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,44,0.03),transparent_50%)] pointer-events-none" />

        <div className="flex flex-nowrap items-center justify-between sm:justify-center w-max sm:w-full min-w-full gap-2 sm:gap-4 lg:gap-6 relative z-10 whitespace-nowrap px-4 sm:px-0">
          {workflowSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-50 border border-orange-500/30 shadow-[0_0_8px_rgba(255,107,44,0.05)] transition-all duration-300 group-hover:scale-110 group-hover:border-orange-500/60 shrink-0">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 animate-pulse" />
                </div>
                <span className="typo-caption text-slate-900 uppercase select-none transition-colors group-hover:text-orange-600">
                  {step}
                </span>
              </div>
              {idx < workflowSteps.length - 1 && (
                <div className="shrink-0 flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
