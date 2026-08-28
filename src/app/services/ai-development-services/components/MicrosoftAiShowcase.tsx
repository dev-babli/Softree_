"use client";

import React from "react";
import { Cpu, Users, Settings, BarChart2, Database, Zap, RefreshCw, Wrench, Shield, Layers, HelpCircle, Eye, Sliders, Target, Lightbulb } from "lucide-react";

// Microsoft Capability Icons (Official designs recreated in high-fidelity vector formats)
const MicrosoftLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 23 23" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="10.5" height="10.5" fill="#F25022" />
    <rect x="11.5" y="0" width="10.5" height="10.5" fill="#7FBA00" />
    <rect x="0" y="12" width="10.5" height="10.5" fill="#00A4EF" />
    <rect x="11.5" y="12" width="10.5" height="10.5" fill="#FFB900" />
  </svg>
);

const AzureAiLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3L3 25.5h7.5L16 13.8l5.5 11.7H29z" fill="#0078D4" />
    <path d="M16 3l-4.8 8.5L16 20.2l4.8-8.7z" fill="#50E6FF" opacity="0.95" />
  </svg>
);

const OpenAiLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.3 10.6a5.5 5.5 0 00-2.3-4.1 5.6 5.6 0 00-5.7-.3 5.6 5.6 0 00-4.8-2.6 5.6 5.6 0 00-5.3 3.7 5.5 5.5 0 00-1.8 4.3 5.5 5.5 0 002.3 4.1 5.6 5.6 0 005.7.3 5.6 5.6 0 004.8 2.6 5.6 5.6 0 005.3-3.7 5.5 5.5 0 001.8-4.3z" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.7 4.8a4 4 0 011.9.5 6 6 0 00-2.3 4 V4.9a4 4 0 01.4-.1z" fill="#FFF" />
    <path d="M5.8 7.9a4 4 0 012.5-1.4 5.9 5.9 0 001.3 4.4 4 4 0 01-3.8-3z" fill="#FFF" />
    <path d="M4.7 13.2a4 4 0 01-.6-2 4 4 0 01.6-2 6 6 0 003.6 2.3 6 6 0 00-3.6 1.7z" fill="#FFF" />
    <path d="M11.3 19.2a4 4 0 01-1.9-.5 6 6 0 002.3-4 v4.4a4 4 0 01-.4.1z" fill="#FFF" />
    <path d="M18.2 16.1a4 4 0 01-2.5 1.4 5.9 5.9 0 00-1.3-4.4 4 4 0 013.8 3z" fill="#FFF" />
    <path d="M19.3 10.8a4 4 0 01.6 2 4 4 0 01-.6 2 6 6 0 00-3.6-2.3 6 6 0 003.6-1.7z" fill="#FFF" />
  </svg>
);

const CopilotLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2.5C8.5 2.5 2.5 8.5 2.5 16S8.5 29.5 16 29.5s13.5-6 13.5-13.5S23.5 2.5 16 2.5z" stroke="#3B82F6" strokeWidth="1.5" opacity="0.2" />
    <path d="M16 7c-4.97 0-9 4.03-9 9s4.03 9 9 9c2.18 0 4.18-.77 5.73-2.07L16 16h8.9c.07-.33.1-.66.1-1 0-4.97-4.03-9-9-9z" fill="#00C3FF" />
    <path d="M25 16c0 4.97-4.03 9-9 9-2.18 0-4.18-.77-5.73-2.07L16 16H7.1c-.07.33-.1.66-.1 1 0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.18-.77-4.18-2.07-5.73L16 16h9z" fill="#8A3FFC" opacity="0.85" />
  </svg>
);

const CopilotStudioLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" stroke="#00B4F0" strokeWidth="1.5" />
    <path d="M16 6v20M6 16h20" stroke="#00F0B4" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="16" cy="16" r="4.5" fill="#00B4F0" />
  </svg>
);

const Microsoft365Logo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 10l10-5.5 10 5.5v12l-10 5.5-10-5.5z" stroke="#FF5722" strokeWidth="2" strokeLinejoin="round" />
    <path d="M16 4.5v23M6 10l10 6 10-6" stroke="#0078D4" strokeWidth="1.5" />
  </svg>
);

const PowerPlatformLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3L4 9.5v13L16 29l12-6.5v-13L16 3z" fill="#7F00FF" />
    <path d="M16 8l7.5 4.5v7l-7.5 4.5-7.5-4.5v-7L16 8z" fill="#FFF" opacity="0.85" />
  </svg>
);

const PowerAppsLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L4 8.5v15L16 30l12-6.5v-15L16 2z" fill="#C30052" />
    <path d="M16 8l6 3.5v7L16 22l-6-3.5v-7L16 8z" fill="#FFF" opacity="0.9" />
  </svg>
);

const PowerAutomateLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3L4 9.5v13L16 29l12-6.5v-13L16 3z" fill="#0078D4" />
    <path d="M9 16.5l4.5 4.5 9.5-9.5" stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AiAgentsLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} text-cyan-400`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16.01" />
    <line x1="16" y1="16" x2="16" y2="16.01" />
  </svg>
);

const AzureAiSearchLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="13" r="8.5" stroke="#0078D4" strokeWidth="2.5" />
    <path d="M19.5 19.5l8 8" stroke="#00C3FF" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="13" cy="13" r="3.5" fill="#0078D4" opacity="0.45" />
  </svg>
);

const FabricLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3L5 9v14l11 6 11-6V9L16 3z" fill="#FF9800" />
    <path d="M16 9l7.5 4v6L16 23l-7.5-4v-6L16 9z" fill="#FFF" opacity="0.85" />
  </svg>
);

const DataEngineeringLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} text-cyan-400`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

const RealTimeAnalyticsLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} text-amber-400`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const EnterpriseDataLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} text-blue-400`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

// Isometric Stacked Blocks on circular pedestal SVG (High-fidelity vector design) with embedded floating animations
const IsometricBlocksLogo = () => (
  <div className="relative w-52 h-52 mx-auto flex items-center justify-center">
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
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_24px_rgba(0,195,255,0.45)]">
      {/* Base pedestal circular light wave */}
      <ellipse cx="60" cy="102" rx="48" ry="14" fill="none" stroke="#00C3FF" className="animate-pedestal-glow" strokeDasharray="3 3" />
      <ellipse cx="60" cy="102" rx="38" ry="10" fill="rgba(0,195,255,0.06)" stroke="#00C3FF" strokeWidth="2" />
      <ellipse cx="60" cy="102" rx="26" ry="7" fill="none" stroke="#00C3FF" strokeWidth="1" opacity="0.5" />
      <line x1="60" y1="102" x2="60" y2="92" stroke="#00C3FF" strokeWidth="1" />

      {/* Stack pyramid bottom (3 cubes) */}
      <g>
        {/* Left-Bottom cube */}
        <path d="M42 90 L24 81 L42 72 L60 81 Z" fill="#0c1d3b" stroke="#00C3FF" strokeWidth="1" />
        <path d="M24 81 L24 90 L42 99 L42 90 Z" fill="#061226" stroke="#00C3FF" strokeWidth="1" />
        <path d="M42 90 L42 99 L60 90 L60 81 Z" fill="#030914" stroke="#00C3FF" strokeWidth="1" />

        {/* Right-Bottom cube */}
        <path d="M78 90 L60 81 L78 72 L96 81 Z" fill="#0c1d3b" stroke="#00C3FF" strokeWidth="1" />
        <path d="M60 81 L60 90 L78 99 L78 90 Z" fill="#061226" stroke="#00C3FF" strokeWidth="1" />
        <path d="M78 90 L78 99 L96 90 L96 81 Z" fill="#030914" stroke="#00C3FF" strokeWidth="1" />
      </g>

      {/* Center-Middle cube (Layer 2) - Animated Floating */}
      <g className="animate-float-middle">
        <path d="M60 76 L42 67 L60 58 L78 67 Z" fill="#2a124d" stroke="#8A3FFC" strokeWidth="1" />
        <path d="M42 67 L42 76 L60 85 L60 76 Z" fill="#1b0b30" stroke="#8A3FFC" strokeWidth="1" />
        <path d="M60 76 L60 85 L78 76 L78 67 Z" fill="#0d0517" stroke="#8A3FFC" strokeWidth="1" />
      </g>

      {/* Top cube (Layer 3) - Animated Floating Higher */}
      <g className="animate-float-top">
        <path d="M60 55 L42 46 L60 37 L78 46 Z" fill="#062e3d" stroke="#00F0B4" strokeWidth="1.2" />
        <path d="M42 46 L42 55 L60 64 L60 55 Z" fill="#041f29" stroke="#00F0B4" strokeWidth="1.2" />
        <path d="M60 55 L60 64 L78 55 L78 46 Z" fill="#020f14" stroke="#00F0B4" strokeWidth="1.2" />
      </g>
    </svg>
  </div>
);

const CrossedWrenchesIcon = ({ className = "w-6 h-6 text-white" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const CloudCheckIcon = ({ className = "w-6 h-6 text-white" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19A5.5 5.5 0 0 0 18 8h-1.26A8 8 0 1 0 3 15.28" />
    <path d="M9 13l2 2 4-4" />
  </svg>
);

export default function MicrosoftAiShowcase() {
  const layer1Caps = [
    { name: "Azure AI", logo: <AzureAiLogo className="w-6 h-6 shrink-0" /> },
    { name: "Azure OpenAI", logo: <OpenAiLogo className="w-6 h-6 shrink-0" /> },
    { name: "Azure AI Search", logo: <AzureAiSearchLogo className="w-6 h-6 shrink-0" /> },
  ];

  const layer2Caps = [
    { name: "Microsoft Copilot", logo: <CopilotLogo className="w-6 h-6 shrink-0" /> },
    { name: "Copilot Studio", logo: <CopilotStudioLogo className="w-6 h-6 shrink-0" /> },
    { name: "Microsoft 365", logo: <Microsoft365Logo className="w-6 h-6 shrink-0" /> },
  ];

  const layer3Caps = [
    { name: "Power Platform", logo: <PowerPlatformLogo className="w-6 h-6 shrink-0" /> },
    { name: "Power Apps", logo: <PowerAppsLogo className="w-6 h-6 shrink-0" /> },
    { name: "Power Automate", logo: <PowerAutomateLogo className="w-6 h-6 shrink-0" /> },
    { name: "AI Agents", logo: <AiAgentsLogo className="w-6 h-6 shrink-0" /> },
  ];

  const layer4Caps = [
    { name: "Microsoft Fabric", logo: <FabricLogo className="w-6 h-6 shrink-0" /> },
    { name: "Data Engineering", logo: <DataEngineeringLogo className="w-6 h-6 shrink-0" /> },
    { name: "Real-time Analytics", logo: <RealTimeAnalyticsLogo className="w-6 h-6 shrink-0" /> },
    { name: "Enterprise Data", logo: <EnterpriseDataLogo className="w-6 h-6 shrink-0" /> },
  ];

  const rightCapabilities = [
    { title: "BUILD", borderClass: "border-[#00C3FF]/30", textClass: "text-[#00C3FF]", glowClass: "shadow-[0_0_15px_rgba(0,195,255,0.25)]", hoverBorder: "group-hover:border-[#00C3FF]/60", icon: <CrossedWrenchesIcon className="w-7 h-7 text-white" />, desc: "Build intelligent solutions with Azure AI services & models" },
    { title: "CONNECT", borderClass: "border-[#8A3FFC]/30", textClass: "text-[#8A3FFC]", glowClass: "shadow-[0_0_15px_rgba(138,63,252,0.25)]", hoverBorder: "group-hover:border-[#8A3FFC]/60", icon: <Users className="w-7 h-7 text-white" />, desc: "Bring AI to people with Copilot, M365 & conversational experiences" },
    { title: "AUTOMATE", borderClass: "border-[#E91E63]/30", textClass: "text-[#E91E63]", glowClass: "shadow-[0_0_15px_rgba(233,30,99,0.25)]", hoverBorder: "group-hover:border-[#E91E63]/60", icon: <Settings className="w-7 h-7 text-white" />, desc: "Automate processes and workflows across business applications" },
    { title: "ANALYZE", borderClass: "border-[#FFB900]/30", textClass: "text-[#FFB900]", glowClass: "shadow-[0_0_15px_rgba(255,185,0,0.25)]", hoverBorder: "group-hover:border-[#FFB900]/60", icon: <BarChart2 className="w-7 h-7 text-white" />, desc: "Unify and analyze data to drive smarter business decisions" },
    { title: "SCALE", borderClass: "border-[#0078D4]/30", textClass: "text-[#0078D4]", glowClass: "shadow-[0_0_15px_rgba(0,120,212,0.25)]", hoverBorder: "group-hover:border-[#0078D4]/60", icon: <CloudCheckIcon className="w-7 h-7 text-white" />, desc: "Enterprise-grade security, governance & scalability on Azure" },
  ];

  const businessImpactMetrics = [
    { title: "Accelerate", value: "Time to Market", icon: <Zap className="w-5 h-5 text-cyan-400" /> },
    { title: "Reduce", value: "Operational Costs", icon: <RefreshCw className="w-5 h-5 text-cyan-400" /> },
    { title: "Improve", value: "Productivity", icon: <BarChart2 className="w-5 h-5 text-cyan-400" /> },
    { title: "Enhance", value: "Customer Experience", icon: <Target className="w-5 h-5 text-cyan-400" /> },
    { title: "Drive", value: "Innovation at Scale", icon: <Lightbulb className="w-5 h-5 text-cyan-400" /> },
  ];

  return (
    <div className="flex flex-col gap-6 w-full z-10 relative font-sans">
      {/* Outer Dashboard Card */}
      <div className="relative overflow-hidden rounded-[24px] border border-slate-800 bg-[#020813] p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[580px] flex items-center text-white w-full">
        
        {/* Mirror-morphism reflection glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(0,195,255,0.06),transparent_40%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(138,63,252,0.08),transparent_45%)] pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full relative z-10">
          
          {/* Left Column: Heading, Isometric Stack (contained inside a glowing card) */}
          <div className="lg:col-span-3 flex">
            <div className="relative overflow-hidden rounded-[18px] border border-cyan-500/30 bg-[#030914]/80 p-6 shadow-[0_0_25px_rgba(0,195,255,0.15)] flex flex-col justify-between items-stretch w-full h-[360px] z-10">
              <div className="space-y-2 text-left">
                <h2 className="text-[26px] lg:text-[30px] font-black tracking-wider text-white uppercase leading-tight">
                  MICROSOFT AI
                </h2>
                <p className="text-[14px] font-bold text-cyan-400 tracking-wider uppercase">
                  Intelligent. Connected. Secured.
                </p>
              </div>

              {/* 3D Stack pedestal illustration with smooth floating animation */}
              <div className="py-4 flex items-center justify-center">
                <IsometricBlocksLogo />
              </div>
            </div>
          </div>

          {/* Center-Right Columns holding the 4 layers stack, branch lines, and the glowing core next to 5 capabilities */}
          <div className="lg:col-span-9 grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
            
            {/* Unified SVG Branching Connection Overlay */}
            <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0">
              <svg className="w-full h-full" viewBox="0 0 900 350" fill="none" preserveAspectRatio="none">
                {/* Left Branches (Layers -> Central Core) - Advanced Dual-Layer Neon Glowing Lines */}
                {/* Layer 01 Cyan */}
                <path d="M 450 35 L 465 35 L 475 145" stroke="#00C3FF" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 35 L 465 35 L 475 145" stroke="#00C3FF" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Layer 02 Purple */}
                <path d="M 450 128 L 465 128 L 475 165" stroke="#8A3FFC" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 128 L 465 128 L 475 165" stroke="#8A3FFC" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Layer 03 Pink */}
                <path d="M 450 222 L 465 222 L 475 185" stroke="#E91E63" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 222 L 465 222 L 475 185" stroke="#E91E63" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Layer 04 Green */}
                <path d="M 450 315 L 465 315 L 475 205" stroke="#00F0B4" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 315 L 465 315 L 475 205" stroke="#00F0B4" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Right Branches (Central Core -> 5 Capabilities) - Advanced Dual-Layer Neon Glowing Lines */}
                {/* BUILD Cyan */}
                <path d="M 575 145 L 585 35 L 600 35" stroke="#00C3FF" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 145 L 585 35 L 600 35" stroke="#00C3FF" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* CONNECT Purple */}
                <path d="M 575 165 L 585 105 L 600 105" stroke="#8A3FFC" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 165 L 585 105 L 600 105" stroke="#8A3FFC" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* AUTOMATE Pink */}
                <path d="M 575 175 L 600 175" stroke="#E91E63" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 175 L 600 175" stroke="#E91E63" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* ANALYZE Yellow */}
                <path d="M 575 185 L 585 245 L 600 245" stroke="#FFB900" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 185 L 585 245 L 600 245" stroke="#FFB900" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* SCALE Blue */}
                <path d="M 575 205 L 585 315 L 600 315" stroke="#0078D4" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 205 L 585 315 L 600 315" stroke="#0078D4" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Left Flowing Dot Animations (Thicker data packages) */}
                <circle r="4.5" fill="#00C3FF" opacity="1">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 450 35 L 465 35 L 475 145" />
                </circle>
                <circle r="4.5" fill="#8A3FFC" opacity="1">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path="M 450 128 L 465 128 L 475 165" />
                </circle>
                <circle r="4.5" fill="#E91E63" opacity="1">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 450 222 L 465 222 L 475 185" />
                </circle>
                <circle r="4.5" fill="#00F0B4" opacity="1">
                  <animateMotion dur="2.0s" repeatCount="indefinite" path="M 450 315 L 465 315 L 475 205" />
                </circle>

                {/* Right Flowing Dot Animations (Thicker data packages) */}
                <circle r="4.5" fill="#00C3FF" opacity="1">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 575 145 L 585 35 L 600 35" />
                </circle>
                <circle r="4.5" fill="#8A3FFC" opacity="1">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path="M 575 165 L 585 105 L 600 105" />
                </circle>
                <circle r="4.5" fill="#E91E63" opacity="1">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 575 175 L 600 175" />
                </circle>
                <circle r="4.5" fill="#FFB900" opacity="1">
                  <animateMotion dur="2.0s" repeatCount="indefinite" path="M 575 185 L 585 245 L 600 245" />
                </circle>
                <circle r="4.5" fill="#0078D4" opacity="1">
                  <animateMotion dur="2.3s" repeatCount="indefinite" path="M 575 205 L 585 315 L 600 315" />
                </circle>
              </svg>
            </div>

            {/* Col A (4 Layers stack) - lg:col-span-6 */}
            <div className="lg:col-span-6 flex flex-col justify-between py-1 h-[360px] relative z-10">
              
              {/* Layer 01: AI Foundation */}
              <div className="relative p-3 rounded-[12px] border border-cyan-500/25 bg-slate-950/60 shadow-[0_0_15px_rgba(0,195,255,0.02)] flex items-center gap-3 min-h-[66px]">
                <div className="w-[88px] shrink-0 text-left pl-0.5">
                  <span className="text-[11px] font-black text-cyan-400 block tracking-wider uppercase mb-0.5">LAYER 01</span>
                  <span className="text-[13px] font-black text-white tracking-tight uppercase leading-snug">AI FOUNDATION</span>
                </div>
                <div className="w-[1px] h-9 bg-cyan-500/25 self-center" />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pl-1 flex-1">
                  {layer1Caps.map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 group cursor-pointer">
                      <div className="transition-all duration-300 group-hover:scale-120 group-hover:rotate-[6deg]">
                        {cap.logo}
                      </div>
                      <span className="text-[14px] font-bold text-slate-300 group-hover:text-white transition-colors duration-200">{cap.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 02: Intelligent Experiences */}
              <div className="relative p-3 rounded-[12px] border border-purple-500/25 bg-slate-950/60 shadow-[0_0_15px_rgba(138,63,252,0.02)] flex items-center gap-3 min-h-[66px]">
                <div className="w-[88px] shrink-0 text-left pl-0.5">
                  <span className="text-[11px] font-black text-purple-400 block tracking-wider uppercase mb-0.5">LAYER 02</span>
                  <span className="text-[13px] font-black text-white tracking-tight uppercase leading-snug">INTELLIGENT EXP.</span>
                </div>
                <div className="w-[1px] h-9 bg-purple-500/25 self-center" />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pl-1 flex-1">
                  {layer2Caps.map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 group cursor-pointer">
                      <div className="transition-all duration-300 group-hover:scale-120 group-hover:rotate-[6deg]">
                        {cap.logo}
                      </div>
                      <span className="text-[14px] font-bold text-slate-300 group-hover:text-white transition-colors duration-200">{cap.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 03: Business Automation */}
              <div className="relative p-3 rounded-[12px] border border-pink-500/25 bg-slate-950/60 shadow-[0_0_15px_rgba(233,30,99,0.02)] flex items-center gap-3 min-h-[66px]">
                <div className="w-[88px] shrink-0 text-left pl-0.5">
                  <span className="text-[11px] font-black text-pink-400 block tracking-wider uppercase mb-0.5">LAYER 03</span>
                  <span className="text-[13px] font-black text-white tracking-tight uppercase leading-snug">BUSINESS AUTO.</span>
                </div>
                <div className="w-[1px] h-9 bg-pink-500/25 self-center" />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pl-1 flex-1">
                  {layer3Caps.map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 group cursor-pointer">
                      <div className="transition-all duration-300 group-hover:scale-120 group-hover:rotate-[6deg]">
                        {cap.logo}
                      </div>
                      <span className="text-[14px] font-bold text-slate-300 group-hover:text-white transition-colors duration-200">{cap.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 04: Data & Intelligence */}
              <div className="relative p-3 rounded-[12px] border border-emerald-500/25 bg-slate-950/60 shadow-[0_0_15px_rgba(16,185,129,0.02)] flex items-center gap-3 min-h-[66px]">
                <div className="w-[88px] shrink-0 text-left pl-0.5">
                  <span className="text-[11px] font-black text-emerald-400 block tracking-wider uppercase mb-0.5">LAYER 04</span>
                  <span className="text-[13px] font-black text-white tracking-tight uppercase leading-snug">DATA & INTEL.</span>
                </div>
                <div className="w-[1px] h-9 bg-emerald-500/25 self-center" />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pl-1 flex-1">
                  {layer4Caps.map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 group cursor-pointer">
                      <div className="transition-all duration-300 group-hover:scale-120 group-hover:rotate-[6deg]">
                        {cap.logo}
                      </div>
                      <span className="text-[14px] font-bold text-slate-300 group-hover:text-white transition-colors duration-200">{cap.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Col B (Central Glowing Microsoft Core - Sci-fi dial design) */}
            <div className="lg:col-span-2 flex items-center justify-center relative z-10">
              <div className="relative flex items-center justify-center w-[210px] h-[210px]">
                {/* Concentric rotating neon circles with technical cockpit ticks */}
                <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-[spin_20s_linear_infinite] shadow-[0_0_40px_rgba(0,195,255,0.2)]" />
                <div className="absolute inset-3 rounded-full border border-indigo-500/20 animate-[spin_12s_linear_infinite_reverse]" />
                
                <svg className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" stroke="rgba(0,195,255,0.12)" strokeWidth="1" fill="none" strokeDasharray="1 3" />
                  <circle cx="50" cy="50" r="42" stroke="rgba(0,195,255,0.22)" strokeWidth="1" fill="none" strokeDasharray="4 8" />
                </svg>

                {/* Core content with inner reflection */}
                <div className="absolute inset-6 rounded-full bg-slate-950/85 border-2 border-cyan-400/50 shadow-[inset_0_0_20px_rgba(0,195,255,0.3),0_0_30px_rgba(0,195,255,0.4)] flex flex-col items-center justify-center gap-1.5 z-10">
                  <MicrosoftLogo className="w-10 h-10 shrink-0 transition-transform duration-500 hover:scale-110 hover:rotate-[360deg] cursor-pointer" />
                  <span className="text-[16px] lg:text-[18px] font-black tracking-[0.12em] text-white select-none">ENTERPRISE</span>
                  <span className="text-[13.5px] lg:text-[15px] font-black tracking-[0.05em] text-cyan-400 select-none">AI</span>
                </div>
              </div>
            </div>

            {/* Col C (5 Capabilities indicators - Overlapping Circular Buttons on Glow Cards) */}
            <div className="lg:col-span-4 flex flex-col justify-between py-1 h-[360px] text-left pl-3 relative z-10">
              {rightCapabilities.map((cap, idx) => (
                <div key={idx} className="relative flex items-center pl-6 w-full group">
                  {/* Circular indicator button offset to the left */}
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 border-2 ${cap.borderClass} ${cap.glowClass} z-20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[15deg]`}>
                    {cap.icon}
                  </div>
                  {/* Text banner with matching card border color */}
                  <div className={`w-full border ${cap.borderClass} bg-[#030914]/80 p-3 pl-10 rounded-lg text-left transition-all duration-300 ${cap.hoverBorder} shadow-[0_4px_12px_rgba(0,0,0,0.2)]`}>
                    <span className={`text-[13.5px] lg:text-[14px] font-black block tracking-wider uppercase mb-0.5 ${cap.textClass}`}>
                      {cap.title}
                    </span>
                    <span className="text-[11.5px] lg:text-[12px] text-slate-400 leading-normal block font-semibold group-hover:text-slate-300 transition-colors duration-200">
                      {cap.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Integrated bottom delivering business impact banner */}
      <div className="relative overflow-hidden rounded-[20px] border border-cyan-500/30 bg-[#020813] py-4 px-6 md:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col lg:flex-row items-center justify-between gap-6 z-10 text-white w-full">
        
        {/* Mirror-morphism reflection glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,195,255,0.06),transparent_50%)] pointer-events-none" />
        
        {/* Header left */}
        <div className="flex items-center gap-3 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-800/80 pb-4 lg:pb-0 lg:pr-6 w-full lg:w-auto">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 border-2 border-cyan-500/40 text-cyan-400 shadow-[0_0_10px_rgba(0,195,255,0.35)] animate-pulse">
            <Target className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-left">
            <span className="text-[14.5px] lg:text-[15px] font-black text-cyan-400 tracking-wider uppercase select-none">DELIVERING BUSINESS IMPACT</span>
          </div>
        </div>

        {/* 5 Metrics row */}
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center w-full gap-4">
          {businessImpactMetrics.map((metric, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-3 text-left group">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 border border-cyan-500/30 shadow-[0_0_8px_rgba(0,195,255,0.2)] transition-all duration-300 group-hover:scale-115 group-hover:rotate-6">
                  {React.cloneElement(metric.icon, { className: "w-4.5 h-4.5 text-cyan-400 animate-pulse" })}
                </div>
                <div>
                  <span className="text-[13px] font-black text-white block tracking-tight uppercase leading-none mb-0.5">{metric.title}</span>
                  <span className="text-[11.5px] lg:text-[12px] text-slate-400 font-semibold block leading-none">{metric.value}</span>
                </div>
              </div>
              {idx < businessImpactMetrics.length - 1 && (
                <div className="hidden md:block w-[1px] h-6 bg-slate-800" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
