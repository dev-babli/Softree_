"use client";

import React from "react";
import {
  Bot, Network, Database, ChevronRight, Zap, Plug, Shield, Target,
  Cpu, GitFork, Key, ShieldCheck
} from "lucide-react";
import { FaReact, FaNodeJs, FaPython, FaAws } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiLanggraph,
  SiModelcontextprotocol,
  SiAnthropic
} from "react-icons/si";

// ==========================================
// OFFICIAL BRAND & ARCHITECTURE LOGOS
// ==========================================

// Official Amazon Bedrock AWS Architecture SVG
const BedrockOfficialLogo = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none">
    <rect width="80" height="80" rx="16" fill="#01A88D" fillOpacity="0.15" />
    <g transform="translate(12, 12)" fill="#01A88D">
      <path d="M52,26.9998918 C50.897,26.9998918 50,26.1028918 50,24.9998918 C50,23.8968918 50.897,22.9998918 52,22.9998918 C53.103,22.9998918 54,23.8968918 54,24.9998918 C54,26.1028918 53.103,26.9998918 52,26.9998918 Z M20.113,53.9078918 L16.865,52.0138918 L23.53,47.8478918 L22.47,46.1518918 L14.913,50.8748918 L9,47.4258918 L9,38.5348918 L14.555,34.8318918 L13.445,33.1678918 L7.959,36.8248918 L2,33.4198918 L2,28.5798918 L8.496,24.8678918 L7.504,23.1318918 L2,26.2768918 L2,22.5798918 L8,19.1518918 L14,22.5798918 L14,26.4338918 L9.485,29.1428918 L10.515,30.8568918 L15,28.1658918 L19.485,30.8568918 L20.515,29.1428918 L16,26.4338918 L16,22.5348918 L21.555,18.8318918 C21.833,18.6458918 22,18.3338918 22,17.9998918 L22,10.9998918 L20,10.9998918 L20,17.4648918 L14.959,20.8248918 L9,17.4198918 L9,8.57389181 L14,5.65789181 L14,13.9998918 L16,13.9998918 L16,4.49089181 L20.113,2.09189181 L28,4.72089181 L28,33.4338918 L13.485,42.1428918 L14.515,43.8568918 L28,35.7658918 L28,51.2788918 L20.113,53.9078918 Z M50,37.9998918 C50,39.1028918 49.103,39.9998918 48,39.9998918 C46.897,39.9998918 46,39.1028918 46,37.9998918 C46,36.8968918 46.897,35.9998918 48,35.9998918 C49.103,35.9998918 50,36.8968918 50,37.9998918 Z M40,47.9998918 C40,49.1028918 39.103,49.9998918 38,49.9998918 C36.897,49.9998918 36,49.1028918 36,47.9998918 C36,46.8968918 36.897,45.9998918 38,45.9998918 C39.103,45.9998918 40,46.8968918 40,47.9998918 Z M39,7.99989181 C39,6.89689181 39.897,5.99989181 41,5.99989181 C42.103,5.99989181 43,6.89689181 43,7.99989181 C43,9.10289181 42.103,9.99989181 41,9.99989181 C39.897,9.99989181 39,9.10289181 39,7.99989181 Z" />
    </g>
  </svg>
);

// AWS CloudWatch Telemetry Icon
const CloudWatchTelemetryIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect width="24" height="24" rx="4" fill="#FF4F8B" fillOpacity="0.14" stroke="#FF4F8B" strokeWidth="0.8" />
    <path d="M4 14L8 14L10.5 7L13.5 17L16 11.5L18 14L20 14" stroke="#E11D48" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// AWS IAM Key Badge Icon
const AwsIamKeyIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect width="24" height="24" rx="4" fill="#DD344C" fillOpacity="0.14" stroke="#DD344C" strokeWidth="0.8" />
    <circle cx="9.5" cy="12" r="3.5" stroke="#DD344C" strokeWidth="1.6" />
    <path d="M13 12H19.5V15H17.5V17H15.5V14L13 12Z" fill="#DD344C" />
  </svg>
);

// AWS VPC Network Shield Icon
const AwsVpcNetworkIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect width="24" height="24" rx="4" fill="#8C4FFF" fillOpacity="0.14" stroke="#8C4FFF" strokeWidth="0.8" />
    <path d="M12 4L4 8V13C4 17.5 7.4 20.5 12 21.5C16.6 20.5 20 17.5 20 13V8L12 4Z" stroke="#8C4FFF" strokeWidth="1.5" />
    <path d="M9 12H15M12 9V15" stroke="#8C4FFF" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// ==========================================
// 3D ISOMETRIC STACK PEDESTAL LOGO
// ==========================================
const IsometricBlocksLogo = () => (
  <div className="relative w-36 h-36 sm:w-44 sm:h-44 xl:w-40 xl:h-40 2xl:w-48 2xl:h-48 mx-auto flex items-center justify-center">
    <style>{`
      @keyframes floatTop {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-7px); }
      }
      @keyframes floatMiddle {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-3.5px); }
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
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_24px_rgba(255,88,18,0.35)]">
      {/* Base pedestal circular light wave */}
      <ellipse cx="60" cy="102" rx="48" ry="14" fill="none" stroke="#FF5812" className="animate-pedestal-glow" strokeDasharray="3 3" />
      <ellipse cx="60" cy="102" rx="38" ry="10" fill="rgba(255,88,18,0.06)" stroke="#FF5812" strokeWidth="2" />
      <ellipse cx="60" cy="102" rx="26" ry="7" fill="none" stroke="#FF5812" strokeWidth="1" opacity="0.5" />
      <line x1="60" y1="102" x2="60" y2="92" stroke="#FF5812" strokeWidth="1" />

      {/* Layer 1 bottom cubes */}
      <g>
        <path d="M42 90 L24 81 L42 72 L60 81 Z" fill="#1e293b" stroke="#FF5812" strokeWidth="1" />
        <path d="M24 81 L24 90 L42 99 L42 90 Z" fill="#0f172a" stroke="#FF5812" strokeWidth="1" />
        <path d="M42 90 L42 99 L60 90 L60 81 Z" fill="#020617" stroke="#FF5812" strokeWidth="1" />

        <path d="M78 90 L60 81 L78 72 L96 81 Z" fill="#1e293b" stroke="#FF5812" strokeWidth="1" />
        <path d="M60 81 L60 90 L78 99 L78 90 Z" fill="#0f172a" stroke="#FF5812" strokeWidth="1" />
        <path d="M78 90 L78 99 L96 90 L96 81 Z" fill="#020617" stroke="#FF5812" strokeWidth="1" />
      </g>

      {/* Layer 2 middle cube */}
      <g className="animate-float-middle">
        <path d="M60 76 L42 67 L60 58 L78 67 Z" fill="#1e293b" stroke="#FF5812" strokeWidth="1" />
        <path d="M42 67 L42 76 L60 85 L60 76 Z" fill="#0f172a" stroke="#FF5812" strokeWidth="1" />
        <path d="M60 76 L60 85 L78 76 L78 67 Z" fill="#020617" stroke="#FF5812" strokeWidth="1" />
      </g>

      {/* Layer 3 top cube */}
      <g className="animate-float-top">
        <path d="M60 55 L42 46 L60 37 L78 46 Z" fill="#1e293b" stroke="#FF5812" strokeWidth="1.2" />
        <path d="M42 46 L42 55 L60 64 L60 55 Z" fill="#0f172a" stroke="#FF5812" strokeWidth="1.2" />
        <path d="M60 55 L60 64 L78 55 L78 46 Z" fill="#020617" stroke="#FF5812" strokeWidth="1.2" />
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
        { line1: "Amazon", line2: "Bedrock", logo: <BedrockOfficialLogo className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 transition-transform group-hover:scale-110" /> },
        { line1: "Bedrock", line2: "AgentCore", logo: <Cpu className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#FF5812] transition-transform group-hover:scale-110" /> },
        { line1: "Foundation", line2: "Models", logo: <SiAnthropic className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#CC785C] transition-transform group-hover:scale-110" /> },
        { line1: "Strands", line2: "Agents", logo: <GitFork className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-sky-600 transition-transform group-hover:scale-110" /> },
        { line1: "LangGraph", line2: "", logo: <SiLanggraph className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#FF5812] transition-transform group-hover:scale-110" /> },
        { line1: "MCP", line2: "", logo: <SiModelcontextprotocol className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#D97706] transition-transform group-hover:scale-110" /> },
      ]
    },
    {
      category: "STACK 02",
      name: "AGENTCORE SERVICES",
      items: [
        { line1: "AgentCore", line2: "Runtime", logo: <Zap className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-amber-500 transition-transform group-hover:scale-110" /> },
        { line1: "AgentCore", line2: "Memory", logo: <Database className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-blue-600 transition-transform group-hover:scale-110" /> },
        { line1: "AgentCore", line2: "Gateway", logo: <Plug className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-teal-600 transition-transform group-hover:scale-110" /> },
        { line1: "AgentCore", line2: "Identity", logo: <Shield className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-indigo-600 transition-transform group-hover:scale-110" /> },
        { line1: "AgentCore", line2: "Evaluations", logo: <Target className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-rose-600 transition-transform group-hover:scale-110" /> },
      ]
    },
    {
      category: "STACK 03",
      name: "FULL-STACK & BACKEND",
      items: [
        { line1: "Python", line2: "", logo: <FaPython className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#3776AB] transition-transform group-hover:scale-110" /> },
        { line1: "Node.js", line2: "", logo: <FaNodeJs className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#539E43] transition-transform group-hover:scale-110" /> },
        { line1: "TypeScript", line2: "", logo: <SiTypescript className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#3178C6] transition-transform group-hover:scale-110" /> },
        { line1: "React", line2: "", logo: <FaReact className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#61DAFB] transition-transform group-hover:scale-110" /> },
        { line1: "Next.js", line2: "", logo: <SiNextdotjs className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-slate-900 transition-transform group-hover:scale-110" /> },
        { line1: "Tailwind", line2: "CSS", logo: <SiTailwindcss className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#06B6D4] transition-transform group-hover:scale-110" /> },
      ]
    },
    {
      category: "STACK 04",
      name: "CLOUD & SECURITY",
      items: [
        { line1: "AWS", line2: "", logo: <FaAws className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#FF9900] transition-transform group-hover:scale-110" /> },
        { line1: "Amazon", line2: "CloudWatch", logo: <CloudWatchTelemetryIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 transition-transform group-hover:scale-110" /> },
        { line1: "IAM", line2: "", logo: <AwsIamKeyIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 transition-transform group-hover:scale-110" /> },
        { line1: "VPC", line2: "", logo: <AwsVpcNetworkIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 transition-transform group-hover:scale-110" /> },
        { line1: "API", line2: "Security", logo: <ShieldCheck className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-emerald-600 transition-transform group-hover:scale-110" /> },
        { line1: "Secure", line2: "Agent Access", logo: <Key className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-orange-500 transition-transform group-hover:scale-110" /> },
      ]
    }
  ];

  const rightCapabilities = [
    {
      title: "CAPABILITY 01",
      subtitle: "01 ÔÇö AI AGENT DEVELOPMENT",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF5812]" strokeWidth={2} />,
      desc: "Build, deploy, and scale AI agents with AgentCore Runtime, flexible frameworks, models, tools, and secure execution environments."
    },
    {
      title: "CAPABILITY 02",
      subtitle: "02 ÔÇö AGENTCORE INTEGRATIONS",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Network className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF5812]" strokeWidth={2} />,
      desc: "Connect AI agents with APIs, Lambda functions, MCP servers, applications, and business systems through AgentCore Gateway."
    },
    {
      title: "CAPABILITY 03",
      subtitle: "03 ÔÇö AGENT MEMORY & CONTEXT",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Database className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF5812]" strokeWidth={2} />,
      desc: "Build agents that maintain relevant context across interactions using AgentCore Memory for short-term and long-term memory capabilities."
    }
  ];

  const workflowSteps = [
    "USER", "AGENT", "AGENTCORE", "TOOLS", "BUSINESS SYSTEM", "ACTION"
  ];

  return (
    <section className="w-full max-w-[1600px] mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mt-2 sm:mt-4 md:mt-6 mb-0 z-10 relative flex flex-col gap-6 sm:gap-8">

      {/* Section Heading */}
      <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-500/20 typo-caption text-[#FF5812] uppercase mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF5812] animate-pulse" />
          HOW WE BUILD IT ┬À TECHNOLOGY STACK
        </div>
        <h2 className="typo-heading-2 text-slate-900 mb-2 sm:mb-4">
          Amazon Bedrock AgentCore <span className="text-orange-600">Technology Stack for AI Agent Development</span>
        </h2>
        <p className="typo-description text-slate-600 max-w-2xl mx-auto mb-2">
          Enable enterprise AI agents with Amazon Bedrock AgentCore, connecting intelligent agents with models, tools, memory, applications, and business workflows.
        </p>
      </div>

      {/* Outer Dashboard Card */}
      <div className="relative overflow-hidden rounded-[20px] lg:rounded-[24px] border border-slate-200 bg-white p-3.5 sm:p-5 md:p-6 lg:p-6 xl:p-7 2xl:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] h-auto min-h-fit flex flex-col justify-between text-slate-900 w-full gap-5 sm:gap-6">

        {/* Mirror-morphism reflection glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(255,88,18,0.03),transparent_40%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(255,88,18,0.04),transparent_45%)] pointer-events-none" />

        {/* Main Grid: Left Column + Architecture Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-4 xl:gap-5 2xl:gap-6 items-stretch w-full relative z-10">

          {/* Left Column: Heading, Isometric Stack Card */}
          <div className="lg:col-span-4 xl:col-span-3 flex">
            <div className="relative overflow-hidden rounded-[18px] border border-orange-500/30 bg-slate-50/70 p-4 sm:p-5 xl:p-5 2xl:p-6 shadow-[0_0_25px_rgba(255,88,18,0.05)] flex flex-col justify-between items-stretch w-full h-full min-h-[240px] sm:min-h-[280px] z-10">
              <div className="space-y-1 text-left">
                <span className="typo-caption text-orange-600 uppercase block mb-1">
                  AGENTCORE AI ECOSYSTEM
                </span>
                <h2 className="typo-heading-3 text-slate-900 uppercase mb-1">
                  AGENTCORE AI STACK
                </h2>
                <span className="typo-caption-meta text-slate-600 font-semibold uppercase block">
                  AGENTCORE ┬À AWS ┬À AI AGENTS
                </span>
              </div>

              {/* 3D Stack pedestal illustration with smooth floating animation */}
              <div className="py-2 sm:py-3 flex items-center justify-center">
                <IsometricBlocksLogo />
              </div>
            </div>
          </div>

          {/* Center-Right Architecture Section */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col xl:flex-row items-stretch gap-4 xl:gap-2 2xl:gap-3 relative min-w-0">

            {/* Stacks Column (4 Layers) */}
            <div className="flex-[1.3] flex flex-col justify-between gap-2.5 sm:gap-3 py-0.5 h-full relative z-10 min-w-0">
              {stacksData.map((stack, sIdx) => (
                <div
                  key={sIdx}
                  className="relative p-2 sm:p-2.5 xl:p-3 rounded-xl border border-orange-500/20 bg-gradient-to-r from-orange-50/40 via-slate-50/70 to-white shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 hover:border-orange-500/40 hover:shadow-sm transition-all min-w-0"
                >
                  {/* Category Header */}
                  <div className="w-full sm:w-24 md:w-26 xl:w-28 shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1 sm:pb-0 border-b sm:border-b-0 border-orange-500/15">
                    <div className="px-1.5 py-1 rounded-lg bg-white/80 border border-orange-500/15 shadow-2xs inline-block sm:block">
                      <span className="text-[7.5px] font-bold tracking-[0.12em] text-orange-600 block uppercase mb-0.5">{stack.category}</span>
                      <span className="text-[8.5px] sm:text-[9px] font-bold text-slate-900 block uppercase leading-tight">{stack.name}</span>
                    </div>
                  </div>

                  {/* Vertical divider */}
                  <div className="hidden sm:block w-[1px] h-8 bg-orange-500/20 self-center shrink-0" />

                  {/* Tech Stack Items with exact logos and neatly aligned 2-line labels */}
                  <div className={`grid ${stack.items.length === 6 ? 'grid-cols-6' : 'grid-cols-5'} gap-0.5 sm:gap-1 flex-1 items-center justify-between w-full min-w-0`}>
                    {stack.items.map((cap, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center justify-center text-center gap-1 group cursor-pointer p-0.5 sm:p-1 rounded-lg hover:bg-white/90 transition-all min-w-0"
                      >
                        {/* Icon badge background tile */}
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex items-center justify-center shrink-0 group-hover:border-orange-400 group-hover:scale-110 group-hover:shadow-xs transition-all duration-200">
                          {cap.logo}
                        </div>
                        <div className="text-[7px] sm:text-[7.5px] xl:text-[8px] font-semibold text-slate-700 group-hover:text-orange-600 transition-colors leading-[1.1] text-center w-full min-w-0">
                          <span className="block truncate">{cap.line1}</span>
                          {cap.line2 ? (
                            <span className="block truncate">{cap.line2}</span>
                          ) : (
                            <span className="block h-[8px] sm:h-[9px] select-none opacity-0">-</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Center Connector with Brackets & Glowing AGENTCORE Orb */}
            <div className="hidden xl:flex items-center justify-center relative z-10 px-0.5 shrink-0">
              <div className="flex items-center gap-0 relative">

                {/* Left Bracket Line with 3 Connector Dots */}
                <svg viewBox="0 0 32 320" className="w-5 2xl:w-6 h-[290px] 2xl:h-[320px]" fill="none">
                  <path d="M26 16 C6 80 6 240 26 304" stroke="#FF5812" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="26" cy="16" r="3.5" fill="#FF5812" />
                  <circle cx="11" cy="160" r="4.5" fill="#FF5812" />
                  <circle cx="26" cy="304" r="3.5" fill="#FF5812" />
                </svg>

                {/* Central AGENTCORE Node */}
                <div className="relative flex flex-col items-center justify-center shrink-0 my-auto">
                  <div className="relative flex items-center justify-center w-20 h-20 2xl:w-24 2xl:h-24 rounded-full border-2 border-orange-500/40 bg-white shadow-[0_0_25px_rgba(255,88,18,0.2)]">
                    <div className="absolute inset-1 rounded-full border border-orange-500/20 animate-[spin_20s_linear_infinite]" />
                    <div className="absolute inset-2.5 rounded-full border border-orange-500/15" />
                    <div className="flex flex-col items-center justify-center gap-0.5 z-10">
                      <Bot className="w-5 h-5 2xl:w-6 2xl:h-6 text-[#FF5812] transition-transform duration-300 hover:scale-110" />
                      <span className="text-[7.5px] 2xl:text-[8.5px] font-bold text-slate-900 uppercase select-none text-center tracking-wider">
                        AGENTCORE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Bracket Line with 3 Connector Dots */}
                <svg viewBox="0 0 32 320" className="w-5 2xl:w-6 h-[290px] 2xl:h-[320px]" fill="none">
                  <path d="M6 16 C26 80 26 240 6 304" stroke="#FF5812" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="6" cy="16" r="3.5" fill="#FF5812" />
                  <circle cx="21" cy="160" r="4.5" fill="#FF5812" />
                  <circle cx="6" cy="304" r="3.5" fill="#FF5812" />
                </svg>

              </div>
            </div>

            {/* Mobile / Tablet Connector Badge */}
            <div className="xl:hidden flex items-center justify-center my-2 z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-400/40 shadow-sm text-[#FF5812]">
                <Bot className="w-4 h-4 animate-bounce" />
                <span className="typo-caption uppercase font-bold text-slate-900">AGENTCORE ENGINE</span>
              </div>
            </div>

            {/* Capabilities Column (3 Cards) */}
            <div className="flex-1 flex flex-col justify-between gap-2.5 sm:gap-3 py-0.5 h-full text-left relative z-10 min-w-0">
              {rightCapabilities.map((cap, idx) => (
                <div key={idx} className="relative flex items-center pl-3.5 sm:pl-4 w-full group">
                  {/* Left circular indicator badge */}
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 flex h-7 w-7 sm:h-8 sm:w-8 2xl:h-9 2xl:w-9 items-center justify-center rounded-full bg-white border-2 ${cap.borderClass} ${cap.glowClass} z-20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[12deg]`}>
                    {cap.icon}
                  </div>
                  {/* Card Content */}
                  <div className={`w-full min-h-[88px] sm:min-h-[92px] 2xl:min-h-[98px] flex flex-col justify-center border ${cap.borderClass} bg-white p-2.5 sm:p-3 2xl:p-3.5 pl-5 sm:pl-6 2xl:pl-7 rounded-xl text-left transition-all duration-300 ${cap.hoverBorder} shadow-[0_4px_12px_rgba(0,0,0,0.03)]`}>
                    <span className={`text-[7.5px] sm:text-[8px] 2xl:text-[8.5px] font-bold tracking-[0.15em] block uppercase mb-0.5 ${cap.textClass}`}>
                      {cap.title}
                    </span>
                    <span className="typo-heading-4 text-slate-900 leading-tight block mb-0.5">
                      {cap.subtitle}
                    </span>
                    <span className="typo-caption-meta leading-relaxed font-medium text-slate-500 block group-hover:text-slate-700 transition-colors duration-200">
                      {cap.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
