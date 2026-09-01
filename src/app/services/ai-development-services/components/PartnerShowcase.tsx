"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Target, Shield, Cpu, Zap, Layers, Sliders } from "lucide-react";
import MicrosoftAiShowcase from "./MicrosoftAiShowcase";

// Microsoft Capability Icons (Official designs recreated in high-fidelity vector formats)
const MicrosoftLogo = () => (
  <svg viewBox="0 0 23 23" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="10.5" height="10.5" fill="#F25022" />
    <rect x="11.5" y="0" width="10.5" height="10.5" fill="#7FBA00" />
    <rect x="0" y="12" width="10.5" height="10.5" fill="#00A4EF" />
    <rect x="11.5" y="12" width="10.5" height="10.5" fill="#FFB900" />
  </svg>
);

const AzureAiLogo = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3L3 25.5h7.5L16 13.8l5.5 11.7H29z" fill="#0078D4" />
    <path d="M16 3l-4.8 8.5L16 20.2l4.8-8.7z" fill="#50E6FF" opacity="0.95" />
  </svg>
);

const OpenAiLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.3 10.6a5.5 5.5 0 00-2.3-4.1 5.6 5.6 0 00-5.7-.3 5.6 5.6 0 00-4.8-2.6 5.6 5.6 0 00-5.3 3.7 5.5 5.5 0 00-1.8 4.3 5.5 5.5 0 002.3 4.1 5.6 5.6 0 005.7.3 5.6 5.6 0 004.8 2.6 5.6 5.6 0 005.3-3.7 5.5 5.5 0 001.8-4.3z" stroke="#10A37F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.7 4.8a4 4 0 011.9.5 6 6 0 00-2.3 4 V4.9a4 4 0 01.4-.1z" fill="#10A37F" />
    <path d="M5.8 7.9a4 4 0 012.5-1.4 5.9 5.9 0 001.3 4.4 4 4 0 01-3.8-3z" fill="#10A37F" />
    <path d="M4.7 13.2a4 4 0 01-.6-2 4 4 0 01.6-2 6 6 0 003.6 2.3 6 6 0 00-3.6 1.7z" fill="#10A37F" />
    <path d="M11.3 19.2a4 4 0 01-1.9-.5 6 6 0 002.3-4 v4.4a4 4 0 01-.4.1z" fill="#10A37F" />
    <path d="M18.2 16.1a4 4 0 01-2.5 1.4 5.9 5.9 0 00-1.3-4.4 4 4 0 013.8 3z" fill="#10A37F" />
    <path d="M19.3 10.8a4 4 0 01.6 2 4 4 0 01-.6 2 6 6 0 00-3.6-2.3 6 6 0 003.6-1.7z" fill="#10A37F" />
  </svg>
);

const CopilotLogo = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2.5C8.5 2.5 2.5 8.5 2.5 16S8.5 29.5 16 29.5s13.5-6 13.5-13.5S23.5 2.5 16 2.5z" stroke="#3B82F6" strokeWidth="1.5" opacity="0.2" />
    <path d="M16 7c-4.97 0-9 4.03-9 9s4.03 9 9 9c2.18 0 4.18-.77 5.73-2.07L16 16h8.9c.07-.33.1-.66.1-1 0-4.97-4.03-9-9-9z" fill="#3B82F6" />
    <path d="M25 16c0 4.97-4.03 9-9 9-2.18 0-4.18-.77-5.73-2.07L16 16H7.1c-.07.33-.1.66-.1 1 0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.18-.77-4.18-2.07-5.73L16 16h9z" fill="#E91E63" opacity="0.85" />
  </svg>
);

const CopilotStudioLogo = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" stroke="#00B4F0" strokeWidth="1.5" />
    <path d="M16 6v20M6 16h20" stroke="#00F0B4" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="16" cy="16" r="4.5" fill="#00B4F0" />
  </svg>
);

const Microsoft365Logo = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 10l10-5.5 10 5.5v12l-10 5.5-10-5.5z" stroke="#FF5722" strokeWidth="2" strokeLinejoin="round" />
    <path d="M16 4.5v23M6 10l10 6 10-6" stroke="#FF5722" strokeWidth="1.5" />
  </svg>
);

const PowerPlatformLogo = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3L4 9.5v13L16 29l12-6.5v-13L16 3z" fill="#7F00FF" />
    <path d="M16 8l7.5 4.5v7l-7.5 4.5-7.5-4.5v-7L16 8z" fill="#FFF" opacity="0.85" />
  </svg>
);

const AzureAiSearchLogo = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="13" r="8.5" stroke="#0078D4" strokeWidth="2.5" />
    <path d="M19.5 19.5l8 8" stroke="#0078D4" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="13" cy="13" r="3.5" fill="#0078D4" opacity="0.45" />
  </svg>
);

const FabricLogo = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3L5 9v14l11 6 11-6V9L16 3z" fill="#FF9800" />
    <path d="M16 9l7.5 4v6L16 23l-7.5-4v-6L16 9z" fill="#FFF" opacity="0.85" />
  </svg>
);

// Isometric Stacked Blocks on circular pedestal SVG
const IsometricBlocksLogo = () => (
  <svg viewBox="0 0 120 120" className="w-28 h-28 mx-auto drop-shadow-[0_0_15px_rgba(0,195,255,0.4)]">
    {/* Base pedestal */}
    <ellipse cx="60" cy="105" rx="45" ry="12" fill="none" stroke="#00C3FF" strokeWidth="1" strokeDasharray="3 3" />
    <ellipse cx="60" cy="105" rx="35" ry="9" fill="rgba(0,195,255,0.05)" stroke="#00C3FF" strokeWidth="1.5" />
    <line x1="60" y1="105" x2="60" y2="90" stroke="#00C3FF" strokeWidth="1" />

    {/* Bottom block */}
    <path d="M60 90 L30 75 L60 60 L90 75 Z" fill="#0c1d3b" stroke="#00C3FF" strokeWidth="1" />
    <path d="M30 75 L30 85 L60 100 L60 90 Z" fill="#061226" stroke="#00C3FF" strokeWidth="1" />
    <path d="M60 90 L60 100 L90 85 L90 75 Z" fill="#030914" stroke="#00C3FF" strokeWidth="1" />

    {/* Middle block */}
    <path d="M60 67 L30 52 L60 37 L90 52 Z" fill="#2a124d" stroke="#8A3FFC" strokeWidth="1" />
    <path d="M30 52 L30 62 L60 77 L60 67 Z" fill="#1b0b30" stroke="#8A3FFC" strokeWidth="1" />
    <path d="M60 67 L60 77 L90 62 L90 52 Z" fill="#0d0517" stroke="#8A3FFC" strokeWidth="1" />

    {/* Top block */}
    <path d="M60 44 L30 29 L60 14 L90 29 Z" fill="#062e3d" stroke="#00F0B4" strokeWidth="1" />
    <path d="M30 29 L30 39 L60 54 L60 44 Z" fill="#041f29" stroke="#00F0B4" strokeWidth="1" />
    <path d="M60 44 L60 54 L90 39 L90 29 Z" fill="#020f14" stroke="#00F0B4" strokeWidth="1" />
  </svg>
);

// High-fidelity role SVGs matching the icons inside circles
const AIArchitectsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    <line x1="9" y1="11" x2="9" y2="15" strokeDasharray="2 2" />
  </svg>
);

const AIEngineersIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const FullStackIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <path d="M10 8l-2 2 2 2M14 8l2 2-2 2" />
  </svg>
);

const DataEngineersIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

const QAEngineersIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 11l2 2 4-4" />
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19A5.5 5.5 0 0 0 18 8h-1.26A8 8 0 1 0 3 15.28" />
    <circle cx="12" cy="14" r="2" />
    <path d="M12 12v-2m-2 4H8m6 0h2" />
  </svg>
);

export default function PartnerShowcase() {
  const teamRoles = [
    {
      num: "01",
      role: "AI Architects",
      icon: <AIArchitectsIcon />,
      color: "text-[#00C3FF] border-[#00C3FF]/30 shadow-[#00C3FF]/10",
      bullets: ["Solution Architecture", "LLM Strategy", "Agentic AI Design", "Technology Advisory"],
    },
    {
      num: "02",
      role: "AI Engineers",
      icon: <AIEngineersIcon />,
      color: "text-[#00F0B4] border-[#00F0B4]/30 shadow-[#00F0B4]/10",
      bullets: ["LLM Development", "RAG & AI Agents", "Model Fine-tuning", "Prompt Engineering"],
    },
    {
      num: "03",
      role: "Full-Stack Engineers",
      icon: <FullStackIcon />,
      color: "text-[#8A3FFC] border-[#8A3FFC]/30 shadow-[#8A3FFC]/10",
      bullets: ["Web & Mobile Apps", "APIs & Microservices", "System Integration", "UI/UX Engineering"],
    },
    {
      num: "04",
      role: "Data Engineers",
      icon: <DataEngineersIcon />,
      color: "text-[#FFB900] border-[#FFB900]/30 shadow-[#FFB900]/10",
      bullets: ["Data Engineering", "Pipelines & ETL", "Vector Databases", "Data Governance"],
    },
    {
      num: "05",
      role: "QA & AI Testing",
      icon: <QAEngineersIcon />,
      color: "text-[#E91E63] border-[#E91E63]/30 shadow-[#E91E63]/10",
      bullets: ["AI Model Validation", "Test Automation", "Performance Testing", "Quality Assurance"],
    },
    {
      num: "06",
      role: "Cloud / DevOps",
      icon: <GlobeIcon />,
      color: "text-[#0078D4] border-[#0078D4]/30 shadow-[#0078D4]/10",
      bullets: ["Azure Infrastructure", "CI/CD & MLOps", "Monitoring & Security", "Scalability & Reliability"],
    },
  ];

  const timelinePhases = [
    { name: "STRATEGY", icon: <Target className="w-4 h-4" /> },
    { name: "BUILD", icon: <Cpu className="w-4 h-4" /> },
    { name: "INTEGRATE", icon: <Layers className="w-4 h-4" /> },
    { name: "TEST", icon: <Shield className="w-4 h-4" /> },
    { name: "DEPLOY", icon: <Zap className="w-4 h-4" /> },
    { name: "SCALE", icon: <Sliders className="w-4 h-4" /> },
  ];


  return (
    <section className="w-full bg-white pt-4 md:pt-6 pb-8 md:pb-12 font-sans relative overflow-hidden">
      {/* Background Grid Pattern & Ambient Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(0,195,255,0.03),transparent_60%)] pointer-events-none" />

      <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-8 space-y-8 flex flex-col items-stretch">
        
        {/* ==================== SECTION 07 — OFFSHORE AI ENGINEERING TEAMS ==================== */}
        <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-10 md:p-12 md:py-14 shadow-[0_10px_40px_rgba(0,0,0,0.05)] min-h-[540px] flex flex-col justify-between z-10 text-slate-900">
          
          {/* Mirror-morphism reflection glows */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(255,88,18,0.03),transparent_40%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(0,195,255,0.04),transparent_45%)] pointer-events-none" />
          
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6 mb-8">
            <div className="flex items-center gap-4">
            
              <div className="space-y-1">
                <h2 className="text-[20px] md:text-[24px] font-black tracking-wide text-slate-900 uppercase">
                  OFFSHORE AI ENGINEERING TEAMS
                </h2>
                <p className="text-[12px] md:text-[13px] font-bold text-cyan-600 uppercase tracking-wider">
                  End-to-End AI Engineering Excellence
                </p>
              </div>
            </div>
          </div>

          {/* Dotted Network Dome Background (Full 7XL Wide Span) */}
          <div className="absolute inset-x-0 bottom-0 w-full h-full opacity-10 pointer-events-none hidden lg:block z-0">
            <svg className="w-full h-full" viewBox="0 0 1000 300" fill="none" preserveAspectRatio="none">
              <g stroke="#00C3FF" strokeWidth="1.2" strokeDasharray="3 6">
                <path d="M 50 300 Q 500 20 950 300" />
                <path d="M 100 300 Q 500 65 900 300" />
                <path d="M 150 300 Q 500 110 850 300" />
                <path d="M 200 300 Q 500 155 800 300" />
              </g>
            </svg>
          </div>
          {/* ==================== HORIZONTAL AI DELIVERY PIPELINE VISUALIZER ==================== */}
          <div className="relative z-10 w-full mb-10 max-w-6xl mx-auto flex flex-col items-center">
            {/* Input Phase: AI Strategy & Architecture */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 text-white font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(251,146,60,0.15)]">
                AI Strategy & Architecture
              </div>
              <div className="text-orange-500 font-extrabold text-xl animate-bounce">↓</div>
            </div>
 
            {/* Horizontal pipeline chamber */}
            <div className="w-full mt-2 relative rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-purple-500/5 pointer-events-none" />
              
              {/* Pipeline nodes flow */}
              <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 w-full text-center">
                {[
                  { name: "AI Architects", color: "text-cyan-600" },
                  { name: "AI Engineers", color: "text-emerald-600" },
                  { name: "Full-Stack Engineers", color: "text-purple-600" },
                  { name: "Data Engineers", color: "text-orange-600" },
                  { name: "QA & AI Testing", color: "text-pink-600" },
                  { name: "Cloud / DevOps", color: "text-blue-600" }
                ].map((node, nIdx) => (
                  <React.Fragment key={nIdx}>
                    <div className="flex-1 min-w-[120px] py-2.5 px-3 rounded-lg bg-white border border-slate-200 shadow-sm">
                      <span className={`text-[12px] md:text-[13px] font-black uppercase tracking-wider ${node.color}`}>
                        {node.name}
                      </span>
                    </div>
                    {nIdx < 5 && (
                      <div className="hidden lg:flex items-center justify-center w-6 h-6 rounded-full bg-white border border-slate-200 shadow-sm text-slate-400 shrink-0 select-none">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* 6 Connected Role Nodes */}
          <div className="relative z-10 flex flex-wrap lg:flex-nowrap items-stretch justify-between gap-6 lg:gap-3 py-4 w-full">
            {teamRoles.map((item, idx) => (
              <React.Fragment key={idx}>
                {/* Role card node */}
                <div className="flex flex-col items-center text-center flex-1 min-w-[150px] space-y-4">
                  {/* Circle Node with glowing border */}
                  <div className="relative">
                    {/* Circle */}
                    <div className={`flex h-[88px] w-[88px] items-center justify-center rounded-full bg-slate-50 border-2 ${item.color} shadow-sm transition-transform duration-300 hover:scale-105`}>
                      {item.icon}
                    </div>
                    {/* Floating number badge */}
                    <div className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-slate-200 text-[10px] font-black text-cyan-600 shadow-[0_0_10px_rgba(0,195,255,0.05)]">
                      {item.num}
                    </div>
                  </div>
 
                  {/* Details */}
                  <div className="space-y-3 w-full">
                    <span className="text-[13px] font-black text-slate-900 uppercase tracking-wider block">
                      {item.role}
                    </span>
                    <ul className="text-[11px] text-slate-500 space-y-1 text-center font-medium leading-relaxed">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="truncate">
                          • {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right angle connector separator (hidden on last node or mobile) */}
                {idx < teamRoles.length - 1 && (
                  <div className="hidden lg:flex items-center text-slate-300 self-start mt-10">
                    <ChevronRight className="w-5 h-5 animate-pulse" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
 
          {/* Connected timeline footer phase navigator */}
          <div className="border-t border-slate-200 pt-6 mt-8 relative z-10 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center justify-between w-full">
              {timelinePhases.map((phase, pIdx) => (
                <React.Fragment key={pIdx}>
                  <div className="flex items-center gap-2 group cursor-default">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white border border-cyan-500/30 text-cyan-600 group-hover:border-cyan-400 shadow-sm transition-all duration-300">
                      {phase.icon}
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 tracking-wider group-hover:text-slate-900 transition-colors duration-300">
                      {phase.name}
                    </span>
                  </div>
                  {pIdx < timelinePhases.length - 1 && (
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-slate-200 to-slate-100 mx-2 hidden md:block" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>

        {/* Separator / Powered by microsoft AI tag bridge */}
        <div className="relative flex items-center justify-center my-[-8px] z-20">
          <div className="absolute w-[2px] h-10 bg-gradient-to-b from-orange-400 to-orange-600" />
          <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 border border-orange-400/30 text-[10px] tracking-[0.2em] font-black text-white px-6 py-2 rounded-full uppercase shadow-[0_0_20px_rgba(255,107,44,0.25)]">
            POWERED BY MICROSOFT AI ECOSYSTEM
          </div>
        </div>

        {/* ==================== SECTION 08 — MICROSOFT AI ==================== */}
        <MicrosoftAiShowcase />


      </div>
    </section>
  );
}
