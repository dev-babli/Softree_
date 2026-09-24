"use client";

import React from "react";
import {
  Headphones, UserRound, Search, Users, Network, Plug, Server,
  Database, ContactRound, Building2, BriefcaseBusiness, Code2,
  Terminal, Cloud, Container, Boxes, Activity, Bot, ChevronRight, Target, Shield, Cpu, Zap, Library
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
  const stacksData = [
    {
      category: "STACK 01",
      name: "AI AGENTS & MODELS",
      items: [
        { name: "Amazon Bedrock", logo: <Cloud className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
        { name: "Bedrock AgentCore", logo: <Cpu className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
        { name: "Foundation Models", logo: <Bot className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
        { name: "Strands Agents", logo: <Network className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
        { name: "LangGraph", logo: <Network className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
      ]
    },
    {
      category: "STACK 02",
      name: "AGENTCORE SERVICES",
      items: [
        { name: "AgentCore Runtime", logo: <Zap className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
        { name: "AgentCore Memory", logo: <Database className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
        { name: "AgentCore Gateway", logo: <Plug className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
        { name: "AgentCore Identity", logo: <Shield className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
        { name: "AgentCore Evaluations", logo: <Target className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
      ]
    },
    {
      category: "STACK 03",
      name: "BACKEND & API DEVELOPMENT",
      items: [
        { name: "Python", logo: <Code2 className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
        { name: "Node.js", logo: <Terminal className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
        { name: "FastAPI", logo: <Terminal className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
        { name: "REST APIs", logo: <Plug className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
        { name: "AWS Lambda", logo: <Server className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
        { name: "MCP", logo: <Network className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
      ]
    },
    {
      category: "STACK 04",
      name: "CLOUD & SECURITY",
      items: [
        { name: "AWS", logo: <Cloud className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
        { name: "Amazon CloudWatch", logo: <Activity className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
        { name: "IAM", logo: <Users className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
        { name: "VPC", logo: <Network className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
        { name: "API Security", logo: <Shield className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
        { name: "Secure Agent Access", logo: <Shield className="w-4 h-4 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
      ]
    }
  ];

  const rightCapabilities = [
    {
      title: "CAPABILITY 01",
      subtitle: "01 — AI AGENT DEVELOPMENT",
      borderClass: "border-[#FF6B2C]/30",
      textClass: "text-[#FF6B2C]",
      glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]",
      hoverBorder: "group-hover:border-[#FF6B2C]/60",
      icon: <Bot className="w-5 h-5 lg:w-[22px] lg:h-[22px] text-[#FF6B2C]" strokeWidth={2} />,
      desc: "Build, deploy, and scale AI agents with AgentCore Runtime, flexible frameworks, models, tools, and secure execution environments."
    },
    {
      title: "CAPABILITY 02",
      subtitle: "02 — AGENTCORE INTEGRATIONS",
      borderClass: "border-[#FF6B2C]/30",
      textClass: "text-[#FF6B2C]",
      glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]",
      hoverBorder: "group-hover:border-[#FF6B2C]/60",
      icon: <Network className="w-5 h-5 lg:w-[22px] lg:h-[22px] text-[#FF6B2C]" strokeWidth={2} />,
      desc: "Connect AI agents with APIs, Lambda functions, MCP servers, applications, and business systems through AgentCore Gateway."
    },
    {
      title: "CAPABILITY 03",
      subtitle: "03 — AGENT MEMORY & CONTEXT",
      borderClass: "border-[#FF6B2C]/30",
      textClass: "text-[#FF6B2C]",
      glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]",
      hoverBorder: "group-hover:border-[#FF6B2C]/60",
      icon: <Database className="w-5 h-5 lg:w-[22px] lg:h-[22px] text-[#FF6B2C]" strokeWidth={2} />,
      desc: "Build agents that maintain relevant context across interactions using AgentCore Memory for short-term and long-term memory capabilities."
    }
  ];

  const workflowSteps = [
    "USER", "AGENT", "AGENTCORE", "TOOLS", "BUSINESS SYSTEM", "ACTION"
  ];

  return (
    <section className="w-full max-w-[1600px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 mt-2 sm:mt-4 md:mt-6 mb-0 z-10 relative flex flex-col gap-6 sm:gap-10">

      {/* Section Heading */}
      <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-500/20 typo-caption text-[#FF5812] uppercase mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF5812] animate-pulse" />
          HOW WE BUILD IT · TECHNOLOGY STACK
        </div>
        <h2 className="typo-heading-2 text-slate-900 mb-2 sm:mb-4">
          Amazon Bedrock AgentCore <span className="text-orange-600">Technology Stack for AI Agent Development</span>
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-4">
          Softree combines Amazon Bedrock AgentCore with AI agent frameworks, application integrations, secure cloud infrastructure, backend technologies, and data systems to build, deploy, and operate production-ready AI agents.
        </p>

      </div>

      {/* Outer Dashboard Card */}
      <div className="relative overflow-hidden rounded-[20px] lg:rounded-[24px] border border-slate-200 bg-white p-4 sm:p-6 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] min-h-[420px] flex items-center text-slate-900 w-full">

        {/* Mirror-morphism reflection glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(255,107,44,0.03),transparent_40%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(255,107,44,0.04),transparent_45%)] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch w-full relative z-10">

          {/* Left Column: Heading, Isometric Stack (contained inside a glowing card) */}
          <div className="lg:col-span-3 flex">
            <div className="relative overflow-hidden rounded-[18px] border border-orange-500/30 bg-slate-50 p-5 sm:p-6 shadow-[0_0_25px_rgba(255,107,44,0.05)] flex flex-col justify-between items-stretch w-full h-auto min-h-[300px] lg:min-h-[420px] z-10">
              <div className="space-y-1.5 text-left">
                <span className="typo-caption text-orange-600 uppercase block mb-1">
                  AGENTCORE AI ECOSYSTEM
                </span>
                <h2 className="typo-heading-3 text-slate-900 uppercase mb-1">
                  AGENTCORE AI STACK
                </h2>
                <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider block">
                  AGENTCORE · AWS · AI AGENTS
                </span>
              </div>

              {/* 3D Stack pedestal illustration with smooth floating animation */}
              <div className="py-2 sm:py-4 flex items-center justify-center">
                <IsometricBlocksLogo />
              </div>


            </div>
          </div>

          {/* Center-Right Columns holding the 4 layers stack, branch lines, and the glowing core next to 3 capabilities */}
          <div className="lg:col-span-9 grid grid-cols-1 lg:grid-cols-12 gap-6 relative">

            {/* Unified SVG Branching Connection Overlay */}
            <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0">
              <svg className="w-full h-full" viewBox="0 0 900 420" fill="none" preserveAspectRatio="none">
                {/* Left Branches (4 Layers -> Central Core) - Advanced Dual-Layer Neon Glowing Lines */}

                {/* Layer 01 */}
                <path d="M 450 42 L 465 42 L 475 210" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 42 L 465 42 L 475 210" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Layer 02 */}
                <path d="M 450 153 L 465 153 L 475 210" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 153 L 465 153 L 475 210" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Layer 03 */}
                <path d="M 450 264 L 465 264 L 475 210" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 264 L 465 264 L 475 210" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Layer 04 */}
                <path d="M 450 375 L 465 375 L 475 210" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 375 L 465 375 L 475 210" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Right Branches (Central Core -> 3 Capabilities) */}
                {/* Card 01 */}
                <path d="M 575 210 L 585 53 L 600 53" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 210 L 585 53 L 600 53" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Card 02 */}
                <path d="M 575 210 L 600 210" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 210 L 600 210" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Card 03 */}
                <path d="M 575 210 L 585 368 L 600 368" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 210 L 585 368 L 600 368" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Left Flowing Dot Animations (Thicker data packages) */}
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 450 42 L 465 42 L 475 210" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path="M 450 153 L 465 153 L 475 210" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.1s" repeatCount="indefinite" path="M 450 264 L 465 264 L 475 210" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.6s" repeatCount="indefinite" path="M 450 375 L 465 375 L 475 210" />
                </circle>

                {/* Right Flowing Dot Animations (Thicker data packages) */}
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 575 210 L 585 53 L 600 53" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path="M 575 210 L 600 210" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 575 210 L 585 368 L 600 368" />
                </circle>
              </svg>
            </div>

            {/* Col A (4 Layers stack) - lg:col-span-6 */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-3 lg:gap-0 py-1 h-auto lg:h-[420px] relative z-10">

              {stacksData.map((stack, sIdx) => (
                <div key={sIdx} className="relative p-3 rounded-[14px] lg:rounded-[12px] border border-orange-500/25 bg-white shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-2 min-h-[85px]">
                  <div className="w-full sm:w-[130px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1.5 sm:pb-0 border-b sm:border-b-0 border-orange-500/15 pl-0.5">
                    <div>
                      <span className="text-[8px] font-bold tracking-[0.15em] text-orange-600 block uppercase mb-0.5">{stack.category}</span>
                      <span className="text-[9px] font-bold text-slate-900 block uppercase leading-tight">{stack.name}</span>
                    </div>
                  </div>
                  <div className="hidden sm:block w-[1px] h-9 bg-orange-500/25 self-center shrink-0" />
                  <div className="grid grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-1 pl-0 sm:pl-1 flex-1 items-start justify-center w-full">
                    {stack.items.map((cap, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-start text-center gap-1 sm:gap-1.5 group cursor-pointer bg-slate-50/70 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-none transition-all duration-200 hover:bg-orange-50/50 sm:hover:bg-transparent min-w-0">
                        <div className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-[6deg] shrink-0 h-4 flex items-center justify-center">
                          {cap.logo}
                        </div>
                        <span className="text-[7.5px] lg:text-[7px] xl:text-[7.5px] font-bold text-slate-700 group-hover:text-orange-600 transition-colors duration-200 leading-[1.1] px-0.5 break-words w-full">{cap.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

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
            <div className="lg:col-span-4 flex flex-col justify-between gap-3 lg:gap-0 py-1 h-auto lg:h-[420px] text-left pl-0 lg:pl-3 relative z-10">
              {rightCapabilities.map((cap, idx) => (
                <div key={idx} className="relative flex items-center pl-5 sm:pl-6 w-full group">
                  {/* Circular indicator button offset to the left */}
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white border-2 ${cap.borderClass} ${cap.glowClass} z-20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[15deg]`}>
                    {cap.icon}
                  </div>
                  {/* Text banner with matching card border color */}
                  <div className={`w-full min-h-[105px] flex flex-col justify-center border ${cap.borderClass} bg-white p-2.5 sm:p-2.5 lg:p-2 xl:p-2.5 pl-8 sm:pl-10 lg:pl-9 xl:pl-10 rounded-lg text-left transition-all duration-300 ${cap.hoverBorder} shadow-[0_4px_12px_rgba(0,0,0,0.05)]`}>
                    <span className={`text-[8px] sm:text-[9px] font-bold tracking-[0.15em] block uppercase mb-0.5 ${cap.textClass}`}>
                      {cap.title}
                    </span>
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight block mb-1">
                      {cap.subtitle}
                    </span>
                    <span className="text-[8px] sm:text-[9px] leading-[1.35] font-medium text-slate-500 block group-hover:text-slate-700 transition-colors duration-200 pr-1 mt-1">
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
