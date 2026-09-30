"use client";

import React from "react";
import {
  Cpu, Users, Settings, BarChart2, Database, Zap, RefreshCw, Wrench, Shield,
  Layers, HelpCircle, Eye, Sliders, Target, Lightbulb, Layers3, Network,
  Workflow, ChartNoAxesCombined, Scaling, Brain, ShieldCheck, Search,
  User, MessageSquare, Star, Bot, FileText, Activity
} from "lucide-react";
import { 
  SiSelenium, SiCypress, SiAppium, SiPostman, SiPython, SiJenkins, SiGithubactions, SiMysql, SiSwagger 
} from "react-icons/si";
import { FaJava, FaAws, FaMicrosoft } from "react-icons/fa";

const PlaywrightIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6v20l14-10z" fill="#2EAD33" />
  </svg>
);

// Isometric Stacked Blocks on circular pedestal SVG (High-fidelity vector design) with embedded floating animations
const IsometricBlocksLogo = () => (
  <div className="relative w-36 h-36 sm:w-44 sm:h-44 xl:w-48 xl:h-48 mx-auto flex items-center justify-center">
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
        {/* Left-Bottom cube */}
        <path d="M42 90 L24 81 L42 72 L60 81 Z" fill="#1f1f1f" stroke="#FF6B2C" strokeWidth="1" />
        <path d="M24 81 L24 90 L42 99 L42 90 Z" fill="#111111" stroke="#FF6B2C" strokeWidth="1" />
        <path d="M42 90 L42 99 L60 90 L60 81 Z" fill="#000000" stroke="#FF6B2C" strokeWidth="1" />

        {/* Right-Bottom cube */}
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

export default function AutomationTechnologyTesting() {
  const layer1Caps = [
    { name: "Selenium", sub: "Web Automation", logo: <SiSelenium color="#43B02A" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform group-hover:scale-110" /> },
    { name: "Playwright", sub: "Modern Web Testing", logo: <PlaywrightIcon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform group-hover:scale-110" /> },
    { name: "Cypress", sub: "Frontend Testing", logo: <SiCypress color="#17202C" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform group-hover:scale-110" /> },
  ];

  const layer2Caps = [
    { name: "Appium", sub: "Mobile Automation", logo: <SiAppium color="#662D91" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform group-hover:scale-110" /> },
    { name: "REST Assured", sub: "API Automation", logo: <SiSwagger color="#85EA2D" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform group-hover:scale-110" /> },
    { name: "Postman", sub: "API Testing", logo: <SiPostman color="#FF6C37" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform group-hover:scale-110" /> },
  ];

  const layer3Caps = [
    { name: "Java", sub: "Automation Programming", logo: <FaJava color="#f89820" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform group-hover:scale-110" /> },
    { name: "Python", sub: "Test Automation", logo: <SiPython color="#3776AB" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform group-hover:scale-110" /> },
    { name: "SQL", sub: "Data Validation", logo: <SiMysql color="#4479A1" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform group-hover:scale-110" /> },
  ];

  const layer4Caps = [
    { name: "Jenkins", sub: "CI/CD Automation", logo: <SiJenkins color="#D24939" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform group-hover:scale-110" /> },
    { name: "GitHub Actions", sub: "DevOps Integration", logo: <SiGithubactions color="#2088FF" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform group-hover:scale-110" /> },
    { name: "Azure / AWS", sub: "Cloud Testing", logo: <div className="flex gap-1 items-center"><FaMicrosoft color="#0078D4" className="w-4 h-4 shrink-0" /><FaAws color="#232F3E" className="w-5 h-5 shrink-0" /></div> },
  ];

  const rightCapabilities = [
    { title: "WEB & UI TESTING", borderClass: "border-[#FF6B2C]/30", textClass: "text-[#FF6B2C]", glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]", hoverBorder: "group-hover:border-[#FF6B2C]/60", icon: <Search className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-[#FF6B2C]" strokeWidth={2} />, desc: "Automated functional, regression, cross-browser, and end-to-end testing for web and enterprise applications." },
    { title: "API & INTEGRATION TESTING", borderClass: "border-[#FF6B2C]/30", textClass: "text-[#FF6B2C]", glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]", hoverBorder: "group-hover:border-[#FF6B2C]/60", icon: <Network className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-[#FF6B2C]" strokeWidth={2} />, desc: "Automated validation of APIs, backend services, integrations, data flows, and application business logic." },
    { title: "MOBILE TESTING", borderClass: "border-[#FF6B2C]/30", textClass: "text-[#FF6B2C]", glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]", hoverBorder: "group-hover:border-[#FF6B2C]/60", icon: <Target className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-[#FF6B2C]" strokeWidth={2} />, desc: "Automated testing for Android and iOS applications across devices, operating systems, and critical workflows." },
    { title: "CONTINUOUS TESTING", borderClass: "border-[#FF6B2C]/30", textClass: "text-[#FF6B2C]", glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]", hoverBorder: "group-hover:border-[#FF6B2C]/60", icon: <RefreshCw className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-[#FF6B2C]" strokeWidth={2} />, desc: "CI/CD-integrated automation for continuous validation, faster feedback, automated regression, and reliable releases." },
  ];

  const businessImpactMetrics = [
    { title: "Healthcare Quality", value: "Reliable Healthcare Applications", icon: <Star className="w-5 h-5 text-orange-400" /> },
    { title: "Interoperability", value: "HL7 & FHIR Testing", icon: <RefreshCw className="w-5 h-5 text-orange-400" /> },
    { title: "Data Quality", value: "Validated Healthcare Data", icon: <Database className="w-5 h-5 text-orange-400" /> },
    { title: "Secure Healthcare", value: "Security & Compliance Testing", icon: <ShieldCheck className="w-5 h-5 text-orange-400" /> },
    { title: "Automated Quality", value: "Functional, API, UI & Regression Testing", icon: <Bot className="w-5 h-5 text-orange-400" /> },
  ];

  return (
    <section className="w-full max-w-[1600px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 mt-4 sm:mt-8 md:mt-12 mb-0 z-10 relative font-sans flex flex-col gap-6 sm:gap-10">

      {/* Section Heading */}
      <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-500/20 text-[#FF5812] typo-caption mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF5812] animate-pulse" />
          TECHNOLOGY WE WORK WITH
        </div>
        <h2 className="typo-heading-2 text-slate-900 leading-[1.1] mb-2 sm:mb-4">
          Technology We Use for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5812] to-amber-500">Automation Testing</span>
        </h2>
        <p className="typo-description text-slate-600 max-w-2xl text-center">
          We work with modern automation testing tools, frameworks, programming languages, CI/CD platforms, and cloud technologies to build scalable, maintainable, and reliable automated testing solutions.
        </p>
      </div>

      {/* Outer Dashboard Card */}
      <div className="relative overflow-hidden rounded-[20px] lg:rounded-[24px] border border-slate-200 bg-white p-4 sm:p-6 lg:p-6 xl:p-8 2xl:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] min-h-[580px] flex items-center text-slate-900 w-full">

        {/* Mirror-morphism reflection glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(255,107,44,0.03),transparent_40%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(255,107,44,0.04),transparent_45%)] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-5 xl:gap-7 items-stretch w-full relative z-10">

          {/* Left Column: Heading, Isometric Stack (contained inside a glowing card) */}
          <div className="lg:col-span-3 flex">
            <div className="relative overflow-hidden rounded-[18px] border border-orange-500/30 bg-slate-50 p-4 sm:p-5 xl:p-6 shadow-[0_0_25px_rgba(255,107,44,0.05)] flex flex-col justify-between items-stretch w-full h-auto min-h-[280px] lg:h-[440px] z-10">
              <div className="space-y-1.5 text-left">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF5812] typo-caption uppercase mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812] animate-pulse" />
                  AUTOMATION TESTING ECOSYSTEM
                </div>
                <h2 className="typo-heading-4 tracking-wider text-slate-900 uppercase leading-[1.1] mb-1">
                  CORE<br />TECHNOLOGY
                </h2>
                <p className="typo-caption font-bold text-orange-600 tracking-wider uppercase">
                  FRAMEWORKS • TOOLS • CLOUD • CI/CD
                </p>
              </div>

              {/* 3D Stack pedestal illustration with smooth floating animation */}
              <div className="py-2 sm:py-3 flex items-center justify-center">
                <IsometricBlocksLogo />
              </div>
            </div>
          </div>

          {/* Center-Right Columns holding the 4 layers stack, branch lines, and the glowing core next to 4 capabilities */}
          <div className="lg:col-span-9 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3 xl:gap-5 relative">

            {/* Unified SVG Branching Connection Overlay */}
            <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0">
              <svg className="w-full h-full" viewBox="0 0 900 350" fill="none" preserveAspectRatio="none">
                {/* Left Branches (Layers -> Central Core) - Advanced Dual-Layer Neon Glowing Lines */}
                {/* Layer 01 */}
                <path d="M 450 35 L 465 35 L 475 145" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 35 L 465 35 L 475 145" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Layer 02 */}
                <path d="M 450 128 L 465 128 L 475 165" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 128 L 465 128 L 475 165" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Layer 03 */}
                <path d="M 450 222 L 465 222 L 475 185" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 222 L 465 222 L 475 185" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Layer 04 */}
                <path d="M 450 315 L 465 315 L 475 205" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 315 L 465 315 L 475 205" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Right Branches (Central Core -> 4 Capabilities) - Advanced Dual-Layer Neon Glowing Lines */}
                {/* 1 */}
                <path d="M 575 150 L 585 55 L 600 55" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 150 L 585 55 L 600 55" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* 2 */}
                <path d="M 575 165 L 585 135 L 600 135" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 165 L 585 135 L 600 135" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* 3 */}
                <path d="M 575 185 L 585 215 L 600 215" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 185 L 585 215 L 600 215" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* 4 */}
                <path d="M 575 200 L 585 295 L 600 295" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 200 L 585 295 L 600 295" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />


                {/* Left Flowing Dot Animations */}
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 450 35 L 465 35 L 475 145" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path="M 450 128 L 465 128 L 475 165" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 450 222 L 465 222 L 475 185" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.0s" repeatCount="indefinite" path="M 450 315 L 465 315 L 475 205" />
                </circle>

                {/* Right Flowing Dot Animations */}
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 575 150 L 585 55 L 600 55" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path="M 575 165 L 585 135 L 600 135" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 575 185 L 585 215 L 600 215" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.0s" repeatCount="indefinite" path="M 575 200 L 585 295 L 600 295" />
                </circle>
              </svg>
            </div>

            {/* Col A (4 Layers stack) - lg:col-span-6 */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-3 lg:gap-0 py-1 h-auto lg:h-[440px] relative z-10">

              {/* Layer 01: HEALTHCARE SYSTEMS */}
              <div className="relative p-2.5 sm:p-3 lg:p-2 xl:p-2.5 rounded-[14px] lg:rounded-[12px] border border-orange-500/25 bg-white shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-1.5 min-h-[66px]">
                <div className="w-full sm:w-[90px] lg:w-[80px] xl:w-[90px] 2xl:w-[100px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1.5 sm:pb-0 border-b sm:border-b-0 border-orange-500/15 pl-0.5">
                  <div>
                    <span className="text-[8.5px] sm:text-[9px] font-black text-orange-600 block tracking-wider uppercase mb-0.5">CATEGORY 01</span>
                    <span className="text-[9px] sm:text-[9.5px] xl:text-[10px] font-black text-slate-900 tracking-tight uppercase leading-[1.15] block">UI AUTOMATION</span>
                  </div>
                </div>
                <div className="hidden sm:block w-[1px] h-8 bg-orange-500/20 self-center shrink-0 mx-0.5" />
                <div className="grid grid-cols-3 sm:flex sm:items-center sm:justify-between gap-1.5 sm:gap-1 pl-0 sm:pl-1 flex-1 min-w-0 w-full">
                  {layer1Caps.map((cap, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-start text-center gap-1 sm:gap-1.5 group cursor-pointer bg-slate-50/70 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-none transition-all duration-200 hover:bg-orange-50/50 sm:hover:bg-transparent w-full sm:flex-1 sm:min-w-0 h-full">
                      <div className="transition-all duration-300 group-hover:scale-110 shrink-0 h-5 sm:h-7 flex items-center justify-center drop-shadow-sm">
                        {cap.logo}
                      </div>
                      <div className="flex flex-col items-center leading-tight w-full mt-0.5 sm:mt-0">
                        <span className="text-[8px] xs:text-[9px] sm:text-[10px] lg:text-[9.5px] xl:text-[10.5px] font-extrabold text-slate-800 group-hover:text-orange-600 transition-colors duration-200 text-center whitespace-normal sm:whitespace-nowrap leading-[1.1]">{cap.name}</span>
                        <span className="text-[7px] xs:text-[7.5px] sm:text-[8.5px] lg:text-[8px] xl:text-[9px] font-medium text-slate-500 group-hover:text-orange-500 transition-colors duration-200 text-center whitespace-normal sm:whitespace-nowrap mt-[2px] leading-[1.1]">{cap.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 02: INTEROPERABILITY */}
              <div className="relative p-2.5 sm:p-3 lg:p-2 xl:p-2.5 rounded-[14px] lg:rounded-[12px] border border-orange-500/25 bg-white shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-1.5 min-h-[66px]">
                <div className="w-full sm:w-[90px] lg:w-[80px] xl:w-[90px] 2xl:w-[100px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1.5 sm:pb-0 border-b sm:border-b-0 border-orange-500/15 pl-0.5">
                  <div>
                    <span className="text-[8.5px] sm:text-[9px] font-black text-orange-600 block tracking-wider uppercase mb-0.5">CATEGORY 02</span>
                    <span className="text-[9px] sm:text-[9.5px] xl:text-[10px] font-black text-slate-900 tracking-tight uppercase leading-[1.15] block">MOBILE & API</span>
                  </div>
                </div>
                <div className="hidden sm:block w-[1px] h-8 bg-orange-500/20 self-center shrink-0 mx-0.5" />
                <div className="grid grid-cols-3 sm:flex sm:items-center sm:justify-between gap-1.5 sm:gap-1 pl-0 sm:pl-1 flex-1 min-w-0 w-full">
                  {layer2Caps.map((cap, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-start text-center gap-1 sm:gap-1.5 group cursor-pointer bg-slate-50/70 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-none transition-all duration-200 hover:bg-orange-50/50 sm:hover:bg-transparent w-full sm:flex-1 sm:min-w-0 h-full">
                      <div className="transition-all duration-300 group-hover:scale-110 shrink-0 h-5 sm:h-7 flex items-center justify-center drop-shadow-sm">
                        {cap.logo}
                      </div>
                      <div className="flex flex-col items-center leading-tight w-full mt-0.5 sm:mt-0">
                        <span className="text-[8px] xs:text-[9px] sm:text-[10px] lg:text-[9.5px] xl:text-[10.5px] font-extrabold text-slate-800 group-hover:text-orange-600 transition-colors duration-200 text-center whitespace-normal sm:whitespace-nowrap leading-[1.1]">{cap.name}</span>
                        <span className="text-[7px] xs:text-[7.5px] sm:text-[8.5px] lg:text-[8px] xl:text-[9px] font-medium text-slate-500 group-hover:text-orange-500 transition-colors duration-200 text-center whitespace-normal sm:whitespace-nowrap mt-[2px] leading-[1.1]">{cap.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 03: DATA & AI */}
              <div className="relative p-2.5 sm:p-3 lg:p-2 xl:p-2.5 rounded-[14px] lg:rounded-[12px] border border-orange-500/25 bg-white shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-1.5 min-h-[66px]">
                <div className="w-full sm:w-[90px] lg:w-[80px] xl:w-[90px] 2xl:w-[100px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1.5 sm:pb-0 border-b sm:border-b-0 border-orange-500/15 pl-0.5">
                  <div>
                    <span className="text-[8.5px] sm:text-[9px] font-black text-orange-600 block tracking-wider uppercase mb-0.5">CATEGORY 03</span>
                    <span className="text-[9px] sm:text-[9.5px] xl:text-[10px] font-black text-slate-900 tracking-tight uppercase leading-[1.15] block">LANGUAGES & DATA</span>
                  </div>
                </div>
                <div className="hidden sm:block w-[1px] h-8 bg-orange-500/20 self-center shrink-0 mx-0.5" />
                <div className="grid grid-cols-3 sm:flex sm:items-center sm:justify-between gap-1.5 sm:gap-1 pl-0 sm:pl-1 flex-1 min-w-0 w-full">
                  {layer3Caps.map((cap, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-start text-center gap-1 sm:gap-1.5 group cursor-pointer bg-slate-50/70 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-none transition-all duration-200 hover:bg-orange-50/50 sm:hover:bg-transparent w-full sm:flex-1 sm:min-w-0 h-full">
                      <div className="transition-all duration-300 group-hover:scale-110 shrink-0 h-5 sm:h-7 flex items-center justify-center drop-shadow-sm">
                        {cap.logo}
                      </div>
                      <div className="flex flex-col items-center leading-tight w-full mt-0.5 sm:mt-0">
                        <span className="text-[8px] xs:text-[9px] sm:text-[10px] lg:text-[9.5px] xl:text-[10.5px] font-extrabold text-slate-800 group-hover:text-orange-600 transition-colors duration-200 text-center whitespace-normal sm:whitespace-nowrap leading-[1.1]">{cap.name}</span>
                        <span className="text-[7px] xs:text-[7.5px] sm:text-[8.5px] lg:text-[8px] xl:text-[9px] font-medium text-slate-500 group-hover:text-orange-500 transition-colors duration-200 text-center whitespace-normal sm:whitespace-nowrap mt-[2px] leading-[1.1]">{cap.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 04: QUALITY ENGINEERING */}
              <div className="relative p-2.5 sm:p-3 lg:p-2 xl:p-2.5 rounded-[14px] lg:rounded-[12px] border border-orange-500/25 bg-white shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-1.5 min-h-[66px]">
                <div className="w-full sm:w-[90px] lg:w-[80px] xl:w-[90px] 2xl:w-[100px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1.5 sm:pb-0 border-b sm:border-b-0 border-orange-500/15 pl-0.5">
                  <div>
                    <span className="text-[8.5px] sm:text-[9px] font-black text-orange-600 block tracking-wider uppercase mb-0.5">CATEGORY 04</span>
                    <span className="text-[9px] sm:text-[9.5px] xl:text-[10px] font-black text-slate-900 tracking-tight uppercase leading-[1.15] block">CI/CD & CLOUD</span>
                  </div>
                </div>
                <div className="hidden sm:block w-[1px] h-8 bg-orange-500/20 self-center shrink-0 mx-0.5" />
                <div className="grid grid-cols-3 sm:flex sm:items-center sm:justify-between gap-1.5 sm:gap-1 pl-0 sm:pl-1 flex-1 min-w-0 w-full">
                  {layer4Caps.map((cap, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-start text-center gap-1 sm:gap-1.5 group cursor-pointer bg-slate-50/70 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-none transition-all duration-200 hover:bg-orange-50/50 sm:hover:bg-transparent w-full sm:flex-1 sm:min-w-0 h-full">
                      <div className="transition-all duration-300 group-hover:scale-110 shrink-0 h-5 sm:h-7 flex items-center justify-center drop-shadow-sm">
                        {cap.logo}
                      </div>
                      <div className="flex flex-col items-center leading-tight w-full mt-0.5 sm:mt-0">
                        <span className="text-[8px] xs:text-[9px] sm:text-[10px] lg:text-[9.5px] xl:text-[10.5px] font-extrabold text-slate-800 group-hover:text-orange-600 transition-colors duration-200 text-center whitespace-normal sm:whitespace-nowrap leading-[1.1]">{cap.name}</span>
                        <span className="text-[7px] xs:text-[7.5px] sm:text-[8.5px] lg:text-[8px] xl:text-[9px] font-medium text-slate-500 group-hover:text-orange-500 transition-colors duration-200 text-center whitespace-normal sm:whitespace-nowrap mt-[2px] leading-[1.1]">{cap.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Col B (Central Glowing Core - Sci-fi dial design) */}
            <div className="lg:col-span-2 flex items-center justify-center relative z-10 py-6 lg:py-0">
              <div className="relative flex items-center justify-center w-[130px] h-[130px] sm:w-[160px] sm:h-[160px]">
                {/* Concentric rotating neon circles with technical cockpit ticks */}
                <div className="absolute inset-0 rounded-full border border-orange-500/30 animate-[spin_20s_linear_infinite] shadow-[0_0_40px_rgba(255,107,44,0.05)]" />
                <div className="absolute inset-2 sm:inset-3 rounded-full border border-orange-500/20 animate-[spin_12s_linear_infinite_reverse]" />

                <svg className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" stroke="rgba(255,107,44,0.12)" strokeWidth="1" fill="none" strokeDasharray="1 3" />
                  <circle cx="50" cy="50" r="42" stroke="rgba(255,107,44,0.22)" strokeWidth="1" fill="none" strokeDasharray="4 8" />
                </svg>

                {/* Core content with inner reflection */}
                <div className="absolute inset-3.5 sm:inset-4 rounded-full bg-white border-2 border-orange-400/50 shadow-[inset_0_0_20px_rgba(255,107,44,0.05),0_0_30px_rgba(255,107,44,0.15)] flex flex-col items-center justify-center gap-0.5 sm:gap-1 z-10">
                  <Activity className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform duration-500 hover:scale-110 hover:rotate-[360deg] cursor-pointer text-orange-600" />
                  <span className="text-[10px] sm:text-[11px] lg:text-[10.5px] font-black tracking-widest text-slate-900 select-none text-center mt-0.5">AUTOMATION</span>
                  <span className="text-[8.5px] sm:text-[9.5px] lg:text-[9px] font-black tracking-widest text-orange-600 select-none text-center mt-[-1px]">CORE</span>
                  <span className="text-[6.5px] sm:text-[7.5px] lg:text-[7px] font-bold tracking-widest text-slate-500 mt-0.5 select-none text-center px-1 leading-tight">UI • API • MOBILE • CI/CD</span>
                </div>
              </div>
            </div>

            {/* Col C (4 Capabilities indicators - Overlapping Circular Buttons on Glow Cards) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-2.5 lg:gap-0 py-1 h-auto lg:h-[440px] text-left pl-0 lg:pl-3 relative z-10">
              {rightCapabilities.map((cap, idx) => (
                <div key={idx} className="relative flex items-center pl-4 sm:pl-5 lg:pl-4 xl:pl-5 w-full group">
                  {/* Circular indicator button offset to the left */}
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 flex h-8 w-8 sm:h-9 sm:w-9 lg:h-8 lg:w-8 xl:h-9 xl:w-9 items-center justify-center rounded-full bg-white border-2 ${cap.borderClass} ${cap.glowClass} z-20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[15deg]`}>
                    {cap.icon}
                  </div>
                  {/* Text banner with matching card border color */}
                  <div className={`w-full border ${cap.borderClass} bg-white p-2 sm:p-2.5 lg:p-2 xl:p-2.5 pl-6 sm:pl-7 lg:pl-6 xl:pl-7 rounded-lg text-left transition-all duration-300 ${cap.hoverBorder} shadow-[0_4px_12px_rgba(0,0,0,0.05)]`}>
                    <span className={`text-[9.5px] sm:text-[10px] lg:text-[9px] xl:text-[10px] font-black block tracking-wider uppercase mb-0.5 ${cap.textClass}`}>
                      {cap.title}
                    </span>
                    <span className="text-[10.5px] sm:text-[11px] lg:text-[9.5px] xl:text-[11px] 2xl:text-[11.5px] text-slate-500 block group-hover:text-slate-700 transition-colors duration-200 leading-snug mt-1">
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
