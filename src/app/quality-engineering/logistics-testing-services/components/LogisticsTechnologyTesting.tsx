"use client";

import React from "react";
import {
  Cpu, Users, Settings, BarChart2, Database, Zap, RefreshCw, Wrench, Shield,
  Layers, HelpCircle, Eye, Sliders, Target, Lightbulb, Layers3, Network,
  Workflow, ChartNoAxesCombined, Scaling, Brain, ShieldCheck, Search,
  User, MessageSquare, Star, Bot, FileText, Activity, Server, Lock,
  Truck, Building, Send, Code, Globe, Play, Repeat, Flame, CheckCircle,
  UserCog, Github, CloudCog, Cloud
} from "lucide-react";
import { FaTruck, FaWarehouse, FaBuilding, FaEye, FaNetworkWired, FaExchangeAlt, FaCode, FaRobot, FaSync, FaTachometerAlt, FaCheckDouble, FaAws } from "react-icons/fa";
import { SiPostman, SiSelenium, SiApachejmeter, SiJenkins, SiGithubactions, SiMysql } from "react-icons/si";
import { VscAzureDevops, VscAzure } from "react-icons/vsc";

const PlaywrightLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M720.5 137.5L343.8 300.9v289.4l376.7 163.4V137.5z" fill="#45BA4B"/>
    <path d="M343.8 300.9l-190.2 82.5v289.4l190.2 82.5v-454.4z" fill="#E24F54"/>
    <path d="M720.5 454.2l190.2 82.5V826.1L720.5 743.6V454.2z" fill="#E24F54"/>
    <path d="M532.1 382.4l188.4-81.5v289.4L532.1 671.8V382.4z" fill="#32973F"/>
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

export default function LogisticsTechnologyTesting() {
  const layer1Caps = [
    { name: "TMS", label: <>TMS<br />Transportation</>, logo: <FaTruck className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 text-[#2C5282] group-hover:text-[#2B6CB0] transition-colors" /> },
    { name: "WMS", label: <>WMS<br />Warehouse</>, logo: <FaWarehouse className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 text-[#D69E2E] group-hover:text-[#D69E2E]/80 transition-colors" /> },
    { name: "ERP", label: <>ERP<br />Enterprise</>, logo: <FaBuilding className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 text-[#6B46C1] group-hover:text-[#805AD5] transition-colors" /> },
    { name: "Visibility", label: <>Visibility<br />Platforms</>, logo: <FaEye className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 text-[#319795] group-hover:text-[#38B2AC] transition-colors" /> },
  ];

  const layer2Caps = [
    { name: "REST APIs", label: <>REST APIs<br />API Testing</>, logo: <FaNetworkWired className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 text-[#DD6B20] group-hover:text-[#ED8936] transition-colors" /> },
    { name: "EDI", label: <>EDI<br />Data Exchange</>, logo: <FaExchangeAlt className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 text-[#3182CE] group-hover:text-[#4299E1] transition-colors" /> },
    { name: "Postman", label: <>Postman<br />API Validation</>, logo: <SiPostman className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 text-[#FF6C37] group-hover:text-[#FF6C37]/80 transition-colors" /> },
    { name: "REST Assured", label: <>REST Assured<br />API Automation</>, logo: <FaCode className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 text-[#38A169] group-hover:text-[#48BB78] transition-colors" /> },
  ];

  const layer3Caps = [
    { name: "Selenium", label: <>Selenium<br />Web Automation</>, logo: <SiSelenium className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 text-[#43B02A] group-hover:text-[#43B02A]/80 transition-colors" /> },
    { name: "Playwright", label: <>Playwright<br />Modern Web</>, logo: <PlaywrightLogo className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 transition-transform group-hover:scale-110" /> },
    { name: "Test Automation", label: <>Automation<br />Functional</>, logo: <FaRobot className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 text-[#4A5568] group-hover:text-[#2D3748] transition-colors" /> },
    { name: "Regression", label: <>Regression<br />Continuous</>, logo: <FaSync className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 text-[#3182CE] group-hover:text-[#2B6CB0] transition-colors" /> },
  ];

  const layer4Caps = [
    { name: "SQL", label: <>SQL<br />Database</>, logo: <SiMysql className="w-4.5 h-4.5 sm:w-6 sm:h-6 shrink-0 text-[#4479A1] group-hover:text-[#4479A1]/80 transition-colors" /> },
    { name: "JMeter", label: <>JMeter<br />Performance</>, logo: <SiApachejmeter className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 text-[#D22128] group-hover:text-[#D22128]/80 transition-colors" /> },
    { name: "Load Testing", label: <>Load Testing<br />Scalability</>, logo: <FaTachometerAlt className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 text-[#DD6B20] group-hover:text-[#ED8936] transition-colors" /> },
    { name: "Data Validation", label: <>Data Validation<br />Testing</>, logo: <FaCheckDouble className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 text-[#38A169] group-hover:text-[#48BB78] transition-colors" /> },
  ];

  const layer5Caps = [
    { name: "Jenkins", label: <>Jenkins<br />CI/CD</>, logo: <SiJenkins className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 text-[#D33833] group-hover:text-[#D33833]/80 transition-colors" /> },
    { name: "GitHub Actions", label: <>GitHub Actions<br />DevOps</>, logo: <SiGithubactions className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 text-[#2088FF] group-hover:text-[#2088FF]/80 transition-colors" /> },
    { name: "Azure DevOps", label: <>Azure DevOps<br />Testing</>, logo: <VscAzureDevops className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 text-[#0078D7] group-hover:text-[#0078D7]/80 transition-colors" /> },
    { name: "AWS / Azure", label: <>AWS / Azure<br />Cloud Testing</>, logo: <div className="flex -space-x-1"><FaAws className="w-4 sm:w-4.5 h-4 sm:h-4.5 text-[#FF9900]" /><VscAzure className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#008AD7] bg-white rounded-full p-0.5" /></div> },
  ];

  const rightCapabilities = [
    { title: "LOGISTICS APPLICATION TESTING", borderClass: "border-[#FF6B2C]/30", textClass: "text-[#FF6B2C]", glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]", hoverBorder: "group-hover:border-[#FF6B2C]/60", icon: <Search className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-[#FF6B2C]" strokeWidth={2} />, desc: "Functional, workflow, usability, integration, and performance testing for logistics applications." },
    { title: "LOGISTICS INTEGRATION TESTING", borderClass: "border-[#FF6B2C]/30", textClass: "text-[#FF6B2C]", glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]", hoverBorder: "group-hover:border-[#FF6B2C]/60", icon: <Network className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-[#FF6B2C]" strokeWidth={2} />, desc: "EDI, API, carrier, TMS, WMS, ERP, and logistics data exchange testing." },
    { title: "LOGISTICS SECURITY TESTING", borderClass: "border-[#FF6B2C]/30", textClass: "text-[#FF6B2C]", glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]", hoverBorder: "group-hover:border-[#FF6B2C]/60", icon: <Lock className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-[#FF6B2C]" strokeWidth={2} />, desc: "Shipment data privacy, access control, authentication, vulnerability, and compliance testing." },
    { title: "LOGISTICS TEST AUTOMATION", borderClass: "border-[#FF6B2C]/30", textClass: "text-[#FF6B2C]", glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]", hoverBorder: "group-hover:border-[#FF6B2C]/60", icon: <Bot className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-[#FF6B2C]" strokeWidth={2} />, desc: "Functional, API, UI, regression, and CI/CD automation for faster and more reliable logistics releases." },
  ];

  const businessImpactMetrics = [
    { title: "Logistics Quality", value: "Reliable Logistics Applications", icon: <Star className="w-5 h-5 text-orange-400" /> },
    { title: "Interoperability", value: "EDI & APIs Testing", icon: <RefreshCw className="w-5 h-5 text-orange-400" /> },
    { title: "Data Quality", value: "Validated Logistics Data", icon: <Database className="w-5 h-5 text-orange-400" /> },
    { title: "Secure Logistics", value: "Security & Compliance Testing", icon: <ShieldCheck className="w-5 h-5 text-orange-400" /> },
    { title: "Automated Quality", value: "Functional, API, UI & Regression Testing", icon: <Bot className="w-5 h-5 text-orange-400" /> },
  ];

  return (
    <section className="bg-white w-full pt-8 pb-10 lg:pt-12 lg:pb-12 z-10 relative font-sans">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-10">

        {/* Section Heading */}
        <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-500/20 text-[#FF5812] typo-caption mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF5812] animate-pulse" />
            TECHNOLOGY WE WORK WITH
          </div>
          <h2 className="typo-heading-2 text-slate-900 leading-[1.1] mb-2 sm:mb-4">
            Technology We Use <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5812] to-amber-500">for Logistics Testing</span>
          </h2>
          <p className="typo-description text-slate-600 max-w-2xl text-center">
            We work with the technologies and platforms that support reliable logistics applications, secure data, seamless integrations, test automation, and continuous quality engineering.
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
              <div className="relative overflow-hidden rounded-[18px] border border-orange-500/30 bg-slate-50 p-4 sm:p-5 xl:p-6 shadow-[0_0_25px_rgba(255,107,44,0.05)] flex flex-col justify-between items-stretch w-full h-auto min-h-[280px] lg:h-[550px] z-10">
                <div className="space-y-1.5 text-left">
                  <h2 className="typo-heading-4 tracking-wider text-slate-900 uppercase leading-[1.1] mb-1">
                    CORE<br />TECHNOLOGY
                  </h2>
                  <p className="typo-caption font-bold text-orange-600 tracking-wider uppercase">
                    TMS • WMS • APIs • DATA • CLOUD • AUTOMATION
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
                  <path d="M 450 35 L 465 35 L 475 135" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 450 35 L 465 35 L 475 135" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Layer 02 */}
                  <path d="M 450 105 L 465 105 L 475 155" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 450 105 L 465 105 L 475 155" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Layer 03 */}
                  <path d="M 450 175 L 465 175 L 475 175" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 450 175 L 465 175 L 475 175" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Layer 04 */}
                  <path d="M 450 245 L 465 245 L 475 195" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 450 245 L 465 245 L 475 195" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Layer 05 */}
                  <path d="M 450 315 L 465 315 L 475 215" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 450 315 L 465 315 L 475 215" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

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
                    <animateMotion dur="2.2s" repeatCount="indefinite" path="M 450 35 L 465 35 L 475 135" />
                  </circle>
                  <circle r="4.5" fill="#FF6B2C" opacity="1">
                    <animateMotion dur="1.8s" repeatCount="indefinite" path="M 450 105 L 465 105 L 475 155" />
                  </circle>
                  <circle r="4.5" fill="#FF6B2C" opacity="1">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M 450 175 L 465 175 L 475 175" />
                  </circle>
                  <circle r="4.5" fill="#FF6B2C" opacity="1">
                    <animateMotion dur="2.0s" repeatCount="indefinite" path="M 450 245 L 465 245 L 475 195" />
                  </circle>
                  <circle r="4.5" fill="#FF6B2C" opacity="1">
                    <animateMotion dur="2.3s" repeatCount="indefinite" path="M 450 315 L 465 315 L 475 215" />
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

              {/* Col A (5 Layers stack) - lg:col-span-6 */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-3 lg:gap-0 py-1 h-auto lg:h-[550px] relative z-10">

                {/* Layer 01: LOGISTICS SYSTEMS */}
                <div className="relative p-2.5 sm:p-3 lg:p-2 xl:p-2.5 rounded-[14px] lg:rounded-[12px] border border-orange-500/25 bg-white shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-1.5 min-h-[66px]">
                  <div className="w-full sm:w-[90px] lg:w-[80px] xl:w-[90px] 2xl:w-[100px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1.5 sm:pb-0 border-b sm:border-b-0 border-orange-500/15 pl-0.5">
                    <div>
                      <span className="text-[8.5px] sm:text-[9px] font-black text-orange-600 block tracking-wider uppercase mb-0.5">CATEGORY 01</span>
                      <span className="text-[9px] sm:text-[9.5px] xl:text-[10px] font-black text-slate-900 tracking-tight uppercase leading-[1.15] block">LOGISTICS SYSTEMS</span>
                    </div>
                  </div>
                  <div className="hidden sm:block w-[1px] h-8 bg-orange-500/20 self-center shrink-0 mx-0.5" />
                  <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-1.5 sm:gap-1 pl-0 sm:pl-1 flex-1 min-w-0 w-full">
                    {layer1Caps.map((cap, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center text-center gap-0.5 sm:gap-1 group cursor-pointer bg-slate-50/70 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-none transition-all duration-200 hover:bg-orange-50/50 sm:hover:bg-transparent shrink-0 w-1/2 sm:w-1/4">
                        <div className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-[6deg] shrink-0 h-4.5 sm:h-5 flex items-center justify-center">
                          {cap.logo}
                        </div>
                        <span className="text-[8.5px] sm:text-[9px] lg:text-[8px] xl:text-[9px] 2xl:text-[9.5px] font-bold text-slate-700 group-hover:text-orange-600 transition-colors duration-200 leading-[1.15] text-center px-0 block whitespace-nowrap">{cap.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Layer 02: API & INTEGRATION */}
                <div className="relative p-2.5 sm:p-3 lg:p-2 xl:p-2.5 rounded-[14px] lg:rounded-[12px] border border-orange-500/25 bg-white shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-1.5 min-h-[66px]">
                  <div className="w-full sm:w-[90px] lg:w-[80px] xl:w-[90px] 2xl:w-[100px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1.5 sm:pb-0 border-b sm:border-b-0 border-orange-500/15 pl-0.5">
                    <div>
                      <span className="text-[8.5px] sm:text-[9px] font-black text-orange-600 block tracking-wider uppercase mb-0.5">CATEGORY 02</span>
                      <span className="text-[9px] sm:text-[9.5px] xl:text-[10px] font-black text-slate-900 tracking-tight uppercase leading-[1.15] block">API &<br />INTEGRATION</span>
                    </div>
                  </div>
                  <div className="hidden sm:block w-[1px] h-8 bg-orange-500/20 self-center shrink-0 mx-0.5" />
                  <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-1.5 sm:gap-1 pl-0 sm:pl-1 flex-1 min-w-0 w-full">
                    {layer2Caps.map((cap, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center text-center gap-0.5 sm:gap-1 group cursor-pointer bg-slate-50/70 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-none transition-all duration-200 hover:bg-orange-50/50 sm:hover:bg-transparent shrink-0 w-1/2 sm:w-1/4">
                        <div className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-[6deg] shrink-0 h-4.5 sm:h-5 flex items-center justify-center">
                          {cap.logo}
                        </div>
                        <span className="text-[8.5px] sm:text-[9px] lg:text-[8px] xl:text-[9px] 2xl:text-[9.5px] font-bold text-slate-700 group-hover:text-orange-600 transition-colors duration-200 leading-[1.15] text-center px-0 block whitespace-nowrap">{cap.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Layer 03: TEST AUTOMATION */}
                <div className="relative p-2.5 sm:p-3 lg:p-2 xl:p-2.5 rounded-[14px] lg:rounded-[12px] border border-orange-500/25 bg-white shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-1.5 min-h-[66px]">
                  <div className="w-full sm:w-[90px] lg:w-[80px] xl:w-[90px] 2xl:w-[100px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1.5 sm:pb-0 border-b sm:border-b-0 border-orange-500/15 pl-0.5">
                    <div>
                      <span className="text-[8.5px] sm:text-[9px] font-black text-orange-600 block tracking-wider uppercase mb-0.5">CATEGORY 03</span>
                      <span className="text-[9px] sm:text-[9.5px] xl:text-[10px] font-black text-slate-900 tracking-tight uppercase leading-[1.15] block">TEST<br />AUTOMATION</span>
                    </div>
                  </div>
                  <div className="hidden sm:block w-[1px] h-8 bg-orange-500/20 self-center shrink-0 mx-0.5" />
                  <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-1.5 sm:gap-1 pl-0 sm:pl-1 flex-1 min-w-0 w-full">
                    {layer3Caps.map((cap, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center text-center gap-0.5 sm:gap-1 group cursor-pointer bg-slate-50/70 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-none transition-all duration-200 hover:bg-orange-50/50 sm:hover:bg-transparent shrink-0 w-1/2 sm:w-1/4">
                        <div className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-[6deg] shrink-0 h-4.5 sm:h-5 flex items-center justify-center">
                          {cap.logo}
                        </div>
                        <span className="text-[8.5px] sm:text-[9px] lg:text-[8px] xl:text-[9px] 2xl:text-[9.5px] font-bold text-slate-700 group-hover:text-orange-600 transition-colors duration-200 leading-[1.15] text-center px-0 block whitespace-nowrap">{cap.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Layer 04: DATA & PERFORMANCE */}
                <div className="relative p-2.5 sm:p-3 lg:p-2 xl:p-2.5 rounded-[14px] lg:rounded-[12px] border border-orange-500/25 bg-white shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-1.5 min-h-[66px]">
                  <div className="w-full sm:w-[90px] lg:w-[80px] xl:w-[90px] 2xl:w-[100px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1.5 sm:pb-0 border-b sm:border-b-0 border-orange-500/15 pl-0.5">
                    <div>
                      <span className="text-[8.5px] sm:text-[9px] font-black text-orange-600 block tracking-wider uppercase mb-0.5">CATEGORY 04</span>
                      <span className="text-[9px] sm:text-[9.5px] xl:text-[10px] font-black text-slate-900 tracking-tight uppercase leading-[1.15] block">DATA &<br />PERFORMANCE</span>
                    </div>
                  </div>
                  <div className="hidden sm:block w-[1px] h-8 bg-orange-500/20 self-center shrink-0 mx-0.5" />
                  <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-1.5 sm:gap-1 pl-0 sm:pl-1 flex-1 min-w-0 w-full">
                    {layer4Caps.map((cap, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center text-center gap-0.5 sm:gap-1 group cursor-pointer bg-slate-50/70 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-none transition-all duration-200 hover:bg-orange-50/50 sm:hover:bg-transparent shrink-0 w-1/2 sm:w-1/4">
                        <div className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-[6deg] shrink-0 h-4.5 sm:h-5 flex items-center justify-center">
                          {cap.logo}
                        </div>
                        <span className="text-[8.5px] sm:text-[9px] lg:text-[8px] xl:text-[9px] 2xl:text-[9.5px] font-bold text-slate-700 group-hover:text-orange-600 transition-colors duration-200 leading-[1.15] text-center px-0 block whitespace-nowrap">{cap.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Layer 05: CI/CD & CLOUD */}
                <div className="relative p-2.5 sm:p-3 lg:p-2 xl:p-2.5 rounded-[14px] lg:rounded-[12px] border border-orange-500/25 bg-white shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-1.5 min-h-[66px]">
                  <div className="w-full sm:w-[90px] lg:w-[80px] xl:w-[90px] 2xl:w-[100px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1.5 sm:pb-0 border-b sm:border-b-0 border-orange-500/15 pl-0.5">
                    <div>
                      <span className="text-[8.5px] sm:text-[9px] font-black text-orange-600 block tracking-wider uppercase mb-0.5">CATEGORY 05</span>
                      <span className="text-[9px] sm:text-[9.5px] xl:text-[10px] font-black text-slate-900 tracking-tight uppercase leading-[1.15] block">CI/CD &<br />CLOUD</span>
                    </div>
                  </div>
                  <div className="hidden sm:block w-[1px] h-8 bg-orange-500/20 self-center shrink-0 mx-0.5" />
                  <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-1.5 sm:gap-1 pl-0 sm:pl-1 flex-1 min-w-0 w-full">
                    {layer5Caps.map((cap, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center text-center gap-0.5 sm:gap-1 group cursor-pointer bg-slate-50/70 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-none transition-all duration-200 hover:bg-orange-50/50 sm:hover:bg-transparent shrink-0 w-1/2 sm:w-1/4">
                        <div className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-[6deg] shrink-0 h-4.5 sm:h-5 flex items-center justify-center">
                          {cap.logo}
                        </div>
                        <span className="text-[8.5px] sm:text-[9px] lg:text-[8px] xl:text-[9px] 2xl:text-[9.5px] font-bold text-slate-700 group-hover:text-orange-600 transition-colors duration-200 leading-[1.15] text-center px-0 block whitespace-nowrap">{cap.label}</span>
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
                    <span className="text-[10px] sm:text-[11px] lg:text-[10.5px] font-black tracking-widest text-slate-900 select-none text-center mt-0.5">LOGISTICS</span>
                    <span className="text-[8.5px] sm:text-[9.5px] lg:text-[9px] font-black tracking-widest text-orange-600 select-none text-center mt-[-1px]">CORE</span>
                    <span className="text-[6.5px] sm:text-[7.5px] lg:text-[7px] font-bold tracking-widest text-slate-500 mt-0.5 select-none text-center px-1 leading-tight">AI • DATA • APPS</span>
                  </div>
                </div>
              </div>

              {/* Col C (4 Capabilities indicators - Overlapping Circular Buttons on Glow Cards) */}
              <div className="lg:col-span-4 flex flex-col justify-center gap-3 sm:gap-4 lg:gap-5 py-1 h-auto lg:h-[550px] text-left pl-0 lg:pl-3 relative z-10">
                {rightCapabilities.map((cap, idx) => (
                  <div key={idx} className="relative flex items-center pl-4 sm:pl-5 lg:pl-4 xl:pl-5 w-full group">
                    {/* Circular indicator button offset to the left */}
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 lg:h-8 lg:w-8 xl:h-10 xl:w-10 items-center justify-center rounded-full bg-white border-2 ${cap.borderClass} ${cap.glowClass} z-20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[15deg]`}>
                      {cap.icon}
                    </div>
                    {/* Text banner with matching card border color */}
                    <div className={`w-full border ${cap.borderClass} bg-white p-2 sm:p-2.5 lg:p-2 xl:p-2.5 pl-6 sm:pl-8 lg:pl-6 xl:pl-8 rounded-lg text-left transition-all duration-300 ${cap.hoverBorder} shadow-[0_4px_12px_rgba(0,0,0,0.05)]`}>
                      <span className={`text-[9.5px] sm:text-[10.5px] lg:text-[9.5px] xl:text-[10.5px] font-black block tracking-wider uppercase mb-0.5 ${cap.textClass}`}>
                        {cap.title}
                      </span>
                      <span className="text-[11px] sm:text-[12px] lg:text-[10.5px] xl:text-[12px] 2xl:text-[13px] text-slate-500 block group-hover:text-slate-700 transition-colors duration-200 leading-snug mt-1">
                        {cap.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
