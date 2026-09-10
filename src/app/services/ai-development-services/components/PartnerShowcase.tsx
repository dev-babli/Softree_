"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Check, Target, Shield, Cpu, Zap, Layers, Sliders } from "lucide-react";
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
      badge: "Architecture",
      exp: "Principal",
      icon: <AIArchitectsIcon />,
      color: "text-[#FF5812] border-[#FF5812]/40 shadow-[0_0_15px_rgba(255,88,18,0.12)] bg-orange-50/40",
      bullets: ["Solution Architecture", "LLM Strategy", "Agentic AI Design", "Technology Advisory"],
    },
    {
      num: "02",
      role: "AI Engineers",
      badge: "Intelligence",
      exp: "Senior AI",
      icon: <AIEngineersIcon />,
      color: "text-[#FF5812] border-[#FF5812]/40 shadow-[0_0_15px_rgba(255,88,18,0.12)] bg-orange-50/40",
      bullets: ["LLM Development", "RAG & AI Agents", "Model Fine-tuning", "Prompt Engineering"],
    },
    {
      num: "03",
      role: "Full-Stack Engineers",
      badge: "Full-Stack",
      exp: "Senior Dev",
      icon: <FullStackIcon />,
      color: "text-[#FF5812] border-[#FF5812]/40 shadow-[0_0_15px_rgba(255,88,18,0.12)] bg-orange-50/40",
      bullets: ["Web & Mobile Apps", "APIs & Microservices", "System Integration", "UI/UX Engineering"],
    },
    {
      num: "04",
      role: "Data Engineers",
      badge: "Data Systems",
      exp: "Data Lead",
      icon: <DataEngineersIcon />,
      color: "text-[#FF5812] border-[#FF5812]/40 shadow-[0_0_15px_rgba(255,88,18,0.12)] bg-orange-50/40",
      bullets: ["Data Engineering", "Pipelines & ETL", "Vector Databases", "Data Governance"],
    },
    {
      num: "05",
      role: "QA & AI Testing",
      badge: "Verification",
      exp: "QA Lead",
      icon: <QAEngineersIcon />,
      color: "text-[#FF5812] border-[#FF5812]/40 shadow-[0_0_15px_rgba(255,88,18,0.12)] bg-orange-50/40",
      bullets: ["AI Model Validation", "Test Automation", "Performance Testing", "Quality Assurance"],
    },
    {
      num: "06",
      role: "Cloud / DevOps",
      badge: "Cloud & Ops",
      exp: "DevOps",
      icon: <GlobeIcon />,
      color: "text-[#FF5812] border-[#FF5812]/40 shadow-[0_0_15px_rgba(255,88,18,0.12)] bg-orange-50/40",
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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,88,18,0.04),transparent_60%)] pointer-events-none" />

      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-8 lg:px-12 space-y-8 flex flex-col items-stretch">

        {/* ==================== SECTION 07 — OFFSHORE AI ENGINEERING TEAMS ==================== */}
        <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-10 md:p-12 md:py-14 shadow-[0_10px_40px_rgba(0,0,0,0.05)] min-h-[540px] flex flex-col justify-between z-10 text-slate-900">

          {/* Mirror-morphism reflection glows */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(255,88,18,0.04),transparent_40%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(255,88,18,0.03),transparent_45%)] pointer-events-none" />

          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6 mb-8">
            <div className="flex items-center gap-4">

              <div className="space-y-2">
                <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-4 py-1.5 rounded-full border border-white/60 mb-2 inline-block w-fit">
                  <span className="text-[11px] font-bold text-[#FF6B2C] tracking-widest uppercase">
                    AI DEVELOPMENT DELIVERY MODEL
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight uppercase">
                  END-TO-END AI DEVELOPMENT & <span className="text-[#FF6B2C]">ENGINEERING SERVICES</span>
                </h2>
                <p className="text-[15px] lg:text-base text-slate-500 max-w-2xl leading-relaxed">
                  From AI strategy and architecture to development, testing, data, and cloud deployment, we deliver production-ready AI solutions.
                </p>
              </div>
            </div>
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
            <div className="w-full mt-2 relative rounded-2xl border border-orange-200/80 bg-orange-50/20 p-4 shadow-[inset_0_1px_4px_rgba(255,88,18,0.04)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-orange-500/10 to-orange-500/5 pointer-events-none" />

              {/* Pipeline nodes flow */}
              <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="flex flex-nowrap items-center justify-between gap-4 min-w-[900px] w-full text-center pb-1">
                  {[
                    { name: "AI Architects", color: "text-orange-600" },
                    { name: "AI Engineers", color: "text-orange-600" },
                    { name: "Full-Stack Engineers", color: "text-orange-600" },
                    { name: "Data Engineers", color: "text-orange-600" },
                    { name: "QA & AI Testing", color: "text-orange-600" },
                    { name: "Cloud / DevOps", color: "text-orange-600" }
                  ].map((node, nIdx) => (
                    <React.Fragment key={nIdx}>
                      <div className="flex-1 min-w-[120px] py-2.5 px-3 rounded-lg bg-white border border-orange-200/80 shadow-sm transition-colors hover:border-orange-400">
                        <span className={`text-[12px] md:text-[13px] font-black uppercase tracking-wider ${node.color}`}>
                          {node.name}
                        </span>
                      </div>
                      {nIdx < 5 && (
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white border border-orange-200 shadow-sm text-orange-400 shrink-0 select-none">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 6 Connected Role Nodes */}
          <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
            <div className="relative z-10 flex flex-nowrap items-stretch justify-between gap-4 py-4 min-w-[1100px] w-full">
              {teamRoles.map((item, idx) => (
                <React.Fragment key={idx}>
                  {/* Role card node */}
                  <div className="flex flex-col items-center text-center flex-1 min-w-[150px] self-stretch">
                    {/* Circle Node with glowing border */}
                    <div className="relative shrink-0 mb-4">
                      {/* Circle */}
                      <div className={`flex h-[88px] w-[88px] items-center justify-center rounded-full bg-slate-50 border-2 ${item.color} shadow-sm transition-transform duration-300 hover:scale-105`}>
                        {item.icon}
                      </div>
                      {/* Floating number badge */}
                      <div className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-orange-200 text-[10px] font-black text-[#FF5812] shadow-[0_0_10px_rgba(255,88,18,0.15)]">
                        {item.num}
                      </div>
                    </div>

                    {/* Details from Upstream */}
                    <div className="w-full flex flex-col items-center flex-1">
                      {/* Fixed-height role title container for seamless cross-column alignment */}
                      <div className="min-h-[42px] flex items-center justify-center w-full px-1 mb-3 shrink-0">
                        <span className="text-[13px] xl:text-[14px] font-black text-slate-900 uppercase tracking-wider text-center leading-tight">
                          {item.role}
                        </span>
                      </div>

                      {/* Advanced Precision Engineering Card - Uniform Height */}
                      <div className="w-full flex-1 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(255,88,18,0.11)] hover:border-orange-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group/card">
                        {/* Top Dual-Tone Glowing Accent Stroke */}
                        <div className="h-[3px] w-full bg-gradient-to-r from-orange-500 via-amber-400 to-[#FF5812] shrink-0" />

                        {/* Micro Header Bar with Live Pulse & Category */}
                        <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-slate-100 bg-slate-50/60 shrink-0">
                          <div className="flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-[10px] xl:text-[10.5px] font-extrabold uppercase tracking-wider text-slate-600">
                              {item.badge}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold font-mono text-orange-600 bg-orange-50 border border-orange-200/70 px-1.5 py-0.5 rounded leading-none">
                            {item.num}
                          </span>
                        </div>

                        {/* Capabilities Bullet Rows - Equal row height so all rows and footers align across cards */}
                        <div className="p-2 xl:p-2.5 flex-1 flex flex-col justify-between">
                          <ul className="flex flex-col gap-1.5 w-full flex-1">
                            {item.bullets.map((bullet, bIdx) => (
                              <li
                                key={bIdx}
                                className="group/item relative flex items-center gap-1.5 p-1.5 xl:p-2 rounded-lg bg-slate-50/80 hover:bg-gradient-to-r hover:from-orange-50/90 hover:via-white hover:to-orange-50/40 border border-slate-200/60 hover:border-orange-300/80 transition-all duration-200 cursor-default shadow-[0_1px_2px_rgba(0,0,0,0.015)] min-h-[40px] xl:min-h-[42px]"
                              >
                                {/* Left hairline accent revealed on hover */}
                                <div className="absolute left-0 top-1 bottom-1 w-[2.5px] rounded-r-full bg-[#FF5812] opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" />

                                {/* Futuristic micro-tech icon */}
                                <div className="flex items-center justify-center w-4 h-4 rounded-[5px] bg-white border border-slate-200/90 group-hover/item:bg-[#FF5812] group-hover/item:border-[#FF5812] shadow-xs shrink-0 transition-all duration-200">
                                  <ChevronRight className="w-2.5 h-2.5 text-orange-500 group-hover/item:text-white stroke-[3] transition-colors duration-200" />
                                </div>

                                {/* Bullet text - strictly single/two lines without dots */}
                                <span className="text-[11px] xl:text-[12px] font-bold text-slate-800 group-hover/item:text-slate-950 leading-tight tracking-tight text-left break-normal whitespace-normal">
                                  {bullet}
                                </span>
                              </li>
                            ))}
                          </ul>

                          {/* Card Footer: SLA / Experience Badge - Strictly single line */}
                          <div className="mt-auto pt-2.5 border-t border-slate-100/80 flex items-center justify-between text-[9.5px] xl:text-[10px] px-0.5 whitespace-nowrap shrink-0">
                            <span className="font-bold text-slate-500 flex items-center gap-1.5 whitespace-nowrap shrink-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812] shrink-0" />
                              Dedicated
                            </span>
                            <span className="font-bold text-slate-800 font-mono bg-slate-100 border border-slate-200/60 px-1.5 py-0.5 rounded leading-none whitespace-nowrap shrink-0">
                              {item.exp}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Advanced tech animated arrow connector between role nodes - Bold & Prominent */}
                  {idx < teamRoles.length - 1 && (
                    <div className="flex items-center justify-center shrink-0 self-start mt-[26px] -mx-1 select-none">
                      <div className="relative flex items-center justify-center">
                        <svg width="76" height="36" viewBox="0 0 76 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 lg:w-14 xl:w-16 h-8 lg:h-9 overflow-visible">
                          <defs>
                            <linearGradient id={`arrowGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#FF5812" stopOpacity="0.2" />
                              <stop offset="50%" stopColor="#FF5812" stopOpacity="0.85" />
                              <stop offset="100%" stopColor="#FF5812" stopOpacity="1" />
                            </linearGradient>
                            <filter id={`arrowGlow-${idx}`} x="-30%" y="-30%" width="160%" height="160%">
                              <feGaussianBlur stdDeviation="2.5" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                          </defs>

                          {/* Faint static guide track */}
                          <line x1="4" y1="18" x2="48" y2="18" stroke="#FF5812" strokeWidth="2.5" strokeOpacity="0.2" strokeLinecap="round" />

                          {/* Bold continuous flowing dashed laser */}
                          <line
                            x1="4"
                            y1="18"
                            x2="48"
                            y2="18"
                            stroke={`url(#arrowGrad-${idx})`}
                            strokeWidth="3.5"
                            strokeDasharray="6 5"
                            strokeLinecap="round"
                          >
                            <animate attributeName="stroke-dashoffset" from="22" to="0" dur="0.85s" repeatCount="indefinite" />
                          </line>

                          {/* Traveling photon beam particle */}
                          <circle r="3.5" fill="#FF5812" filter={`url(#arrowGlow-${idx})`}>
                            <animateMotion path="M 4 18 L 48 18" dur="1.1s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0;1;1;0" dur="1.1s" repeatCount="indefinite" />
                          </circle>

                          {/* Trailing chevron with subtle glow */}
                          <g>
                            <path d="M38 9L47 18L38 27" stroke="#FF5812" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <animate attributeName="opacity" values="0.35;0.95;0.35" dur="1.1s" repeatCount="indefinite" />
                            </path>
                          </g>

                          {/* Leading bold arrowhead with smooth glide */}
                          <g>
                            <path d="M49 7L60 18L49 29" stroke="#FF5812" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" filter={`url(#arrowGlow-${idx})`}>
                              <animateTransform
                                attributeName="transform"
                                type="translate"
                                values="0,0; 4,0; 0,0"
                                dur="1.1s"
                                repeatCount="indefinite"
                              />
                            </path>
                          </g>

                          {/* Pulsing leading energy tip */}
                          <circle cx="60" cy="18" r="3" fill="#FF5812">
                            <animateTransform
                              attributeName="transform"
                              type="translate"
                              values="0,0; 4,0; 0,0"
                              dur="1.1s"
                              repeatCount="indefinite"
                            />
                            <animate attributeName="r" values="2.5; 4.5; 2.5" dur="1.1s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.8; 1; 0.8" dur="1.1s" repeatCount="indefinite" />
                          </circle>
                        </svg>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Connected timeline footer phase navigator */}
          <div className="border-t border-slate-200 pt-6 mt-8 relative z-10 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center justify-between w-full">
              {timelinePhases.map((phase, pIdx) => (
                <React.Fragment key={pIdx}>
                  <div className="flex items-center gap-2 group cursor-default">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white border border-orange-500/30 text-[#FF5812] group-hover:border-[#FF5812] group-hover:bg-[#FF5812] group-hover:text-white shadow-sm transition-all duration-300">
                      {phase.icon}
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 tracking-wider group-hover:text-orange-600 transition-colors duration-300">
                      {phase.name}
                    </span>
                  </div>
                  {pIdx < timelinePhases.length - 1 && (
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-orange-200/80 to-orange-100/40 mx-2 hidden md:block" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>

        {/* Separator / Powered by microsoft AI tag bridge */}
        {/* <div className="relative flex items-center justify-center my-[-8px] z-20">

          <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 border border-orange-400/30 text-[10px] tracking-[0.2em] font-black text-white px-6 py-2 rounded-full uppercase shadow-[0_0_20px_rgba(255,107,44,0.25)]">
            MICROSOFT AI ECOSYSTEM
          </div>
        </div> */}

        {/* ==================== SECTION 08 — MICROSOFT AI ==================== */}
        {/* <MicrosoftAiShowcase /> */}


      </div>
    </section>
  );
}
