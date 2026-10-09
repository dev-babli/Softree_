"use client";

import React from "react";
import {
  Database, Network, ChevronRight, Zap, Cloud, Shield, Target,
  Cpu, GitFork, Activity, Server, FileCode, Workflow, Layers
} from "lucide-react";

// Using some standard icons for Fabric / Data Engineering
function AzureIcon({ className = "w-[28px] h-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L2 19H13L22 4L12 2Z" fill="#0078D4"/>
    </svg>
  );
}

function PowerBIIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect x="4" y="10" width="4" height="10" fill="#F2C811"/>
      <rect x="10" y="6" width="4" height="14" fill="#F2C811"/>
      <rect x="16" y="2" width="4" height="18" fill="#F2C811"/>
    </svg>
  );
}

// 3D ISOMETRIC STACK PEDESTAL LOGO (Reused from Bedrock Systems)
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
      <ellipse cx="60" cy="102" rx="48" ry="14" fill="none" stroke="#FF5812" className="animate-pedestal-glow" strokeDasharray="3 3" />
      <ellipse cx="60" cy="102" rx="38" ry="10" fill="rgba(255,88,18,0.06)" stroke="#FF5812" strokeWidth="2" />
      <ellipse cx="60" cy="102" rx="26" ry="7" fill="none" stroke="#FF5812" strokeWidth="1" opacity="0.5" />
      <line x1="60" y1="102" x2="60" y2="92" stroke="#FF5812" strokeWidth="1" />

      <g>
        <path d="M42 90 L24 81 L42 72 L60 81 Z" fill="#1e293b" stroke="#FF5812" strokeWidth="1" />
        <path d="M24 81 L24 90 L42 99 L42 90 Z" fill="#0f172a" stroke="#FF5812" strokeWidth="1" />
        <path d="M42 90 L42 99 L60 90 L60 81 Z" fill="#020617" stroke="#FF5812" strokeWidth="1" />

        <path d="M78 90 L60 81 L78 72 L96 81 Z" fill="#1e293b" stroke="#FF5812" strokeWidth="1" />
        <path d="M60 81 L60 90 L78 99 L78 90 Z" fill="#0f172a" stroke="#FF5812" strokeWidth="1" />
        <path d="M78 90 L78 99 L96 90 L96 81 Z" fill="#020617" stroke="#FF5812" strokeWidth="1" />
      </g>

      <g className="animate-float-middle">
        <path d="M60 76 L42 67 L60 58 L78 67 Z" fill="#1e293b" stroke="#FF5812" strokeWidth="1" />
        <path d="M42 67 L42 76 L60 85 L60 76 Z" fill="#0f172a" stroke="#FF5812" strokeWidth="1" />
        <path d="M60 76 L60 85 L78 76 L78 67 Z" fill="#020617" stroke="#FF5812" strokeWidth="1" />
      </g>

      <g className="animate-float-top">
        <path d="M60 55 L42 46 L60 37 L78 46 Z" fill="#FF6B2C" stroke="#FF6B2C" strokeWidth="1.2" />
        <path d="M42 46 L42 55 L60 64 L60 55 Z" fill="#E55416" stroke="#FF6B2C" strokeWidth="1.2" />
        <path d="M60 55 L60 64 L78 55 L78 46 Z" fill="#C4400A" stroke="#FF6B2C" strokeWidth="1.2" />
      </g>
    </svg>
  </div>
);

export default function AdfToFabricSystems() {
  const stacksData = [
    {
      category: "STACK 01",
      name: "LEGACY AZURE DATA",
      items: [
        { name: "Azure Data Factory", logo: <Workflow className="w-5 h-5 shrink-0 text-blue-500 transition-transform group-hover:scale-110" /> },
        { name: "Synapse SQL", logo: <Server className="w-5 h-5 shrink-0 text-blue-600 transition-transform group-hover:scale-110" /> },
        { name: "ADLS Gen2", logo: <Cloud className="w-5 h-5 shrink-0 text-sky-500 transition-transform group-hover:scale-110" /> },
        { name: "SSIS", logo: <FileCode className="w-5 h-5 shrink-0 text-indigo-500 transition-transform group-hover:scale-110" /> },
        { name: "Power BI Pro", logo: <PowerBIIcon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" /> },
      ]
    },
    {
      category: "STACK 02",
      name: "FABRIC ENGINE",
      items: [
        { name: "OneLake", logo: <Database className="w-5 h-5 shrink-0 text-cyan-500 transition-transform group-hover:scale-110" /> },
        { name: "Fabric Data Factory", logo: <Layers className="w-5 h-5 shrink-0 text-blue-500 transition-transform group-hover:scale-110" /> },
        { name: "Synapse Spark", logo: <Cpu className="w-5 h-5 shrink-0 text-orange-500 transition-transform group-hover:scale-110" /> },
        { name: "DirectLake", logo: <Zap className="w-5 h-5 shrink-0 text-amber-500 transition-transform group-hover:scale-110" /> },
        { name: "Delta Parquet", logo: <Target className="w-5 h-5 shrink-0 text-teal-500 transition-transform group-hover:scale-110" /> },
      ]
    },
    {
      category: "STACK 03",
      name: "DATA ENGINEERING",
      items: [
        { name: "PySpark", logo: <Network className="w-5 h-5 shrink-0 text-yellow-500 transition-transform group-hover:scale-110" /> },
        { name: "Notebooks", logo: <FileCode className="w-5 h-5 shrink-0 text-orange-500 transition-transform group-hover:scale-110" /> },
        { name: "Dataflows Gen2", logo: <Workflow className="w-5 h-5 shrink-0 text-emerald-500 transition-transform group-hover:scale-110" /> },
        { name: "DAX", logo: <FileCode className="w-5 h-5 shrink-0 text-blue-600 transition-transform group-hover:scale-110" /> },
      ]
    },
    {
      category: "STACK 04",
      name: "GOVERNANCE & CI/CD",
      items: [
        { name: "Microsoft Purview", logo: <Shield className="w-5 h-5 shrink-0 text-purple-500 transition-transform group-hover:scale-110" /> },
        { name: "Azure DevOps", logo: <GitFork className="w-5 h-5 shrink-0 text-blue-500 transition-transform group-hover:scale-110" /> },
        { name: "Fabric Git", logo: <GitFork className="w-5 h-5 shrink-0 text-orange-600 transition-transform group-hover:scale-110" /> },
        { name: "Data Lineage", logo: <Network className="w-5 h-5 shrink-0 text-green-500 transition-transform group-hover:scale-110" /> },
      ]
    }
  ];

  const rightCapabilities = [
    {
      title: "CAPABILITY 01",
      subtitle: "OneLake Architecture",
      borderClass: "border-[#FF6B2C]/30",
      textClass: "text-[#FF6B2C]",
      glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]",
      hoverBorder: "group-hover:border-[#FF6B2C]/60",
      icon: <Database className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-[#FF6B2C]" strokeWidth={2} />,
      desc: "Consolidate scattered Azure data silos into a unified SaaS data lakehouse without duplicating data."
    },
    {
      title: "CAPABILITY 02",
      subtitle: "Fabric Data Pipelines",
      borderClass: "border-[#FF6B2C]/30",
      textClass: "text-[#FF6B2C]",
      glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]",
      hoverBorder: "group-hover:border-[#FF6B2C]/60",
      icon: <Layers className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-[#FF6B2C]" strokeWidth={2} />,
      desc: "Convert legacy ADF pipelines and SSIS packages into modern, high-speed Fabric cloud pipelines."
    },
    {
      title: "CAPABILITY 03",
      subtitle: "DirectLake Power BI",
      borderClass: "border-[#FF6B2C]/30",
      textClass: "text-[#FF6B2C]",
      glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]",
      hoverBorder: "group-hover:border-[#FF6B2C]/60",
      icon: <Zap className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-[#FF6B2C]" strokeWidth={2} />,
      desc: "Eliminate import refresh delays with sub-second DirectLake BI queries executing directly on OneLake."
    }
  ];

  const workflowSteps = [
    "ADF", "SYNAPSE", "MIGRATION", "ONELAKE", "DIRECTLAKE", "BUSINESS IMPACT"
  ];

  return (
    <section className="w-full max-w-[1600px] mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mt-2 sm:mt-4 md:mt-6 mb-0 z-10 relative flex flex-col gap-6 sm:gap-8">
      <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center px-4">
        <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
          <span className="typo-caption text-[#FF6B2C] uppercase">
            HOW WE BUILD IT · TECHNOLOGY STACK
          </span>
        </div>
        <h2 className="typo-heading-2 text-slate-900 mb-2 sm:mb-4">
          Azure Data Factory to <span className="text-orange-600">Microsoft Fabric</span> Technology Stack
        </h2>
        <p className="typo-description text-slate-600 max-w-2xl mx-auto mb-2">
          Modernize legacy Azure Data Factory pipelines, Synapse data warehouses, and Power BI models into Microsoft Fabric's unified data platform.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[20px] lg:rounded-[24px] border border-slate-200 bg-white p-3.5 sm:p-5 md:p-6 lg:p-6 xl:p-7 2xl:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] h-auto min-h-fit flex flex-col justify-between text-slate-900 w-full gap-5 sm:gap-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(255,88,18,0.03),transparent_40%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(255,88,18,0.04),transparent_45%)] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-4 xl:gap-5 2xl:gap-6 items-stretch w-full relative z-10">
          <div className="lg:col-span-4 xl:col-span-3 flex">
            <div className="relative overflow-hidden rounded-[18px] border border-orange-500/30 bg-slate-50/70 p-4 sm:p-5 xl:p-5 2xl:p-6 shadow-[0_0_25px_rgba(255,88,18,0.05)] flex flex-col justify-start gap-8 items-stretch w-full h-full min-h-[240px] sm:min-h-[280px] z-10">
              <div className="space-y-1 text-left">
                <span className="typo-caption text-orange-600 uppercase block mb-1">
                  UNIFIED DATA PLATFORM
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[28px] xl:text-3xl font-extrabold tracking-tight leading-tight text-slate-900 uppercase mb-1">
                  MICROSOFT FABRIC <br /> STACK
                </h2>
                <span className="typo-caption-meta text-slate-600 font-semibold uppercase block">
                  FABRIC · ONELAKE · PIPELINES
                </span>
              </div>

              <div className="py-2 sm:py-3 flex items-center justify-center">
                <IsometricBlocksLogo />
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 xl:col-span-9 grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
            <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0">
              <svg className="w-full h-full" viewBox="0 0 900 420" fill="none" preserveAspectRatio="none">
                <path d="M 525 42 L 540 42 L 550 210" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 525 42 L 540 42 L 550 210" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 525 153 L 540 153 L 550 210" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 525 153 L 540 153 L 550 210" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 525 264 L 540 264 L 550 210" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 525 264 L 540 264 L 550 210" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 525 375 L 540 375 L 550 210" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 525 375 L 540 375 L 550 210" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 650 210 L 665 53 L 675 53" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 650 210 L 665 53 L 675 53" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 650 210 L 675 210" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 650 210 L 675 210" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 650 210 L 665 368 L 675 368" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 650 210 L 665 368 L 675 368" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 525 42 L 540 42 L 550 210" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path="M 525 153 L 540 153 L 550 210" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.1s" repeatCount="indefinite" path="M 525 264 L 540 264 L 550 210" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.6s" repeatCount="indefinite" path="M 525 375 L 540 375 L 550 210" />
                </circle>

                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 650 210 L 665 53 L 675 53" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path="M 650 210 L 675 210" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 650 210 L 665 368 L 675 368" />
                </circle>
              </svg>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between gap-3 lg:gap-3 xl:gap-4 py-1 h-auto min-h-[420px] relative z-10">
              {stacksData.map((stack, sIdx) => (
                <div key={sIdx} className="relative p-3 rounded-[14px] lg:rounded-[12px] border border-orange-500/25 bg-white shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-2 min-h-[85px] min-w-0">
                  <div className="w-full sm:w-[120px] lg:w-[110px] xl:w-[130px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1.5 sm:pb-0 border-b sm:border-b-0 border-orange-500/15 pl-0.5">
                    <div>
                      <span className="text-[8px] font-bold tracking-[0.15em] text-orange-600 block uppercase mb-0.5">{stack.category}</span>
                      <span className="text-[9px] font-bold text-slate-900 block uppercase leading-tight">{stack.name}</span>
                    </div>
                  </div>
                  <div className="hidden sm:block w-[1px] h-9 bg-orange-500/25 self-center shrink-0" />
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-1.5 xl:gap-2 pl-0 sm:pl-2 flex-1 items-start justify-center sm:justify-start w-full min-w-0">
                    {stack.items.map((cap, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-start text-center gap-1 sm:gap-1.5 group cursor-pointer bg-slate-50/70 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-none transition-all duration-200 hover:bg-orange-50/50 sm:hover:bg-transparent flex-1 min-w-[50px] max-w-[70px] lg:max-w-[65px] xl:max-w-[75px]">
                        <div className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-[6deg] shrink-0 h-5 sm:h-6 flex items-center justify-center">
                          {cap.logo}
                        </div>
                        <span className="text-[8.5px] sm:text-[8px] lg:text-[7.5px] xl:text-[8.5px] font-bold text-slate-700 group-hover:text-orange-600 transition-colors duration-200 leading-[1.15] px-0.5 break-normal">{cap.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2 flex items-center justify-center relative z-10 py-6 lg:py-0">
              <div className="relative flex items-center justify-center w-[150px] h-[150px] sm:w-[180px] sm:h-[180px]">
                <div className="absolute inset-0 rounded-full border border-orange-500/30 animate-[spin_20s_linear_infinite] shadow-[0_0_40px_rgba(255,107,44,0.05)]" />
                <div className="absolute inset-2 sm:inset-3 rounded-full border border-orange-500/20 animate-[spin_12s_linear_infinite_reverse]" />

                <svg className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" stroke="rgba(255,107,44,0.12)" strokeWidth="1" fill="none" strokeDasharray="1 3" />
                  <circle cx="50" cy="50" r="42" stroke="rgba(255,107,44,0.22)" strokeWidth="1" fill="none" strokeDasharray="4 8" />
                </svg>

                <div className="absolute inset-4 sm:inset-5 rounded-full bg-white border-2 border-orange-400/50 shadow-[inset_0_0_20px_rgba(255,107,44,0.05),0_0_30px_rgba(255,107,44,0.15)] flex flex-col items-center justify-center gap-0.5 sm:gap-1 z-10">
                  <Layers className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 transition-transform duration-500 hover:scale-110 hover:rotate-[360deg] cursor-pointer text-orange-600" />
                  <span className="typo-caption text-slate-900 uppercase select-none text-center mt-0.5">FABRIC<br/>ENGINE</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col justify-between gap-3 lg:gap-3 xl:gap-4 py-1 h-auto min-h-[420px] text-left pl-0 lg:pl-3 relative z-10">
              {rightCapabilities.map((cap, idx) => (
                <div key={idx} className="relative flex items-center pl-5 sm:pl-6 w-full group">
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white border-2 ${cap.borderClass} ${cap.glowClass} z-20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[15deg]`}>
                    {cap.icon}
                  </div>
                  <div className={`w-full min-h-[105px] flex flex-col justify-center border ${cap.borderClass} bg-white p-2.5 sm:p-2.5 lg:p-2 xl:p-2.5 pl-8 sm:pl-10 lg:pl-9 xl:pl-10 rounded-lg text-left transition-all duration-300 ${cap.hoverBorder} shadow-[0_4px_12px_rgba(0,0,0,0.05)]`}>
                    <span className="text-[11px] sm:text-xs lg:text-[11px] xl:text-xs font-bold text-orange-600 leading-tight block mb-1">
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

      <div className="relative overflow-hidden rounded-[20px] border border-orange-500/20 bg-white py-4 px-4 sm:px-6 md:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center gap-5 lg:gap-6 z-10 text-slate-900 w-full overflow-x-auto no-scrollbar">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,44,0.03),transparent_50%)] pointer-events-none" />

        <div className="flex flex-nowrap items-center justify-between w-max sm:w-full min-w-full gap-2 sm:gap-4 lg:gap-6 relative z-10 whitespace-nowrap px-4 sm:px-2 md:px-6">
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
