"use client";

import React from "react";
import { 
  ArrowUpRight, 
  Cpu, 
  Layers, 
  MessageSquare, 
  Database, 
  Search, 
  Mail, 
  FileText, 
  Globe, 
  Calendar, 
  Users, 
  HardDrive, 
  Link, 
  Zap, 
  Repeat, 
  Play, 
  CheckSquare, 
  Workflow, 
  Settings, 
  BarChart3, 
  Activity, 
  TrendingUp,
  Sparkles
} from "lucide-react";

const AzureLogo = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3L3 25.5h7.5L16 13.8l5.5 11.7H29z" fill="#0078D4" />
    <path d="M16 3l-4.8 8.5L16 20.2l4.8-8.7z" fill="#50E6FF" opacity="0.95" />
  </svg>
);

const CopilotStudioLogo = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" stroke="#00B4F0" strokeWidth="1.5" />
    <path d="M16 6v20M6 16h20" stroke="#00F0B4" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="16" cy="16" r="4.5" fill="#00B4F0" />
  </svg>
);

const PowerPlatformLogo = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3L4 9.5v13L16 29l12-6.5v-13L16 3z" fill="#7F00FF" />
    <path d="M16 8l7.5 4.5v7l-7.5 4.5-7.5-4.5v-7L16 8z" fill="#FFF" opacity="0.85" />
  </svg>
);

const FabricLogo = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3L5 9v14l11 6 11-6V9L16 3z" fill="#FF9800" />
    <path d="M16 9l7.5 4v6L16 23l-7.5-4v-6L16 9z" fill="#FFF" opacity="0.85" />
  </svg>
);

export function SlidingMarquee({ icons, speed = "18s" }: { icons: React.ReactNode[]; speed?: string }) {
  return (
    <div className="relative flex overflow-hidden w-full py-3 mt-4 bg-white/[0.02] border border-white/5 rounded-xl select-none">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slide {
          animation: marqueeSlide ${speed} linear infinite;
        }
      `}} />
      <div className="flex gap-8 shrink-0 animate-marquee-slide whitespace-nowrap min-w-full justify-around items-center">
        {icons.map((icon, idx) => (
          <div key={idx} className="flex items-center justify-center shrink-0">
            {icon}
          </div>
        ))}
      </div>
      <div className="flex gap-8 shrink-0 animate-marquee-slide whitespace-nowrap min-w-full justify-around items-center" aria-hidden="true">
        {icons.map((icon, idx) => (
          <div key={`dup-${idx}`} className="flex items-center justify-center shrink-0">
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MicrosoftAiBentoGrid() {
  const cards = [
    {
      colSpan: "lg:col-span-3 md:col-span-2",
      eyebrow: "LLM FOUNDATION",
      title: "Azure OpenAI Service",
      desc: "Deploy and orchestrate domain-optimized foundation models (GPT-4o, o1, and specialized LLMs) securely inside your dedicated virtual network.",
      logo: <AzureLogo />,
      colorClass: "border-cyan-500/25 hover:border-cyan-400/40 text-cyan-400 bg-gradient-to-r from-black via-[#4c1c02] to-black",
      accentBg: "bg-cyan-500/10",
      features: ["Private Virtual Network", "Zero Data Leaks", "Custom Model Fine-tuning"],
      illustration: (
        <SlidingMarquee 
          speed="18s" 
          icons={[
            <div key="o1" className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-400 font-mono text-[10px] font-black border border-orange-500/20">
              <Sparkles className="w-3 h-3 text-orange-450" />
              o1-preview
            </div>,
            <div key="4o" className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-400 font-mono text-[10px] font-black border border-orange-500/20">
              <Cpu className="w-3 h-3 text-orange-450" />
              gpt-4o
            </div>,
            <div key="d3" className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-400 font-mono text-[10px] font-black border border-orange-500/20">
              <Sparkles className="w-3 h-3 text-orange-450" />
              dall-e-3
            </div>,
            <div key="wh" className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-400 font-mono text-[10px] font-black border border-orange-500/20">
              <Sparkles className="w-3 h-3 text-orange-450" />
              whisper
            </div>,
            <div key="cd" className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-400 font-mono text-[10px] font-black border border-orange-500/20">
              <Cpu className="w-3 h-3 text-orange-450" />
              codex
            </div>
          ]} 
        />
      )
    },
    {
      colSpan: "lg:col-span-2 md:col-span-1",
      eyebrow: "AGENT SWARMS",
      title: "Copilot Studio",
      desc: "Build custom autonomous agent networks and multi-agent workflows connected directly to Microsoft 365, SharePoint, and Teams.",
      logo: <CopilotStudioLogo />,
      colorClass: "border-emerald-500/25 hover:border-emerald-400/40 text-emerald-400 bg-gradient-to-r from-black via-[#4c1c02] to-black",
      accentBg: "bg-emerald-500/10",
      features: ["Multi-Agent Orchestration", "Teams Bots Integration", "Cognitive Actions API"],
      illustration: (
        <SlidingMarquee 
          speed="15s" 
          icons={[
            <div key="msg" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <MessageSquare className="w-4 h-4 text-orange-400" />
              <span>MS Teams</span>
            </div>,
            <div key="mail" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Mail className="w-4 h-4 text-orange-400" />
              <span>Outlook</span>
            </div>,
            <div key="file" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <FileText className="w-4 h-4 text-orange-400" />
              <span>SharePoint</span>
            </div>,
            <div key="web" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Globe className="w-4 h-4 text-orange-400" />
              <span>Web Apps</span>
            </div>,
            <div key="cal" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span>Calendar</span>
            </div>,
            <div key="crm" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Users className="w-4 h-4 text-orange-400" />
              <span>Dynamics</span>
            </div>
          ]} 
        />
      )
    },
    {
      colSpan: "lg:col-span-2 md:col-span-1",
      eyebrow: "COGNITIVE RAG",
      title: "Azure AI Search",
      desc: "Implement hybrid semantic vector search engines to power high-fidelity Retrieval-Augmented Generation (RAG) pipelines and private knowledge bases.",
      logo: <AzureLogo />,
      colorClass: "border-indigo-500/25 hover:border-indigo-400/40 text-indigo-400 bg-gradient-to-r from-black via-[#4c1c02] to-black",
      accentBg: "bg-indigo-500/10",
      features: ["Hybrid Semantic Ranker", "Vector Indexing", "Document Intelligence API"],
      illustration: (
        <SlidingMarquee 
          speed="16s" 
          icons={[
            <div key="pdf" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <FileText className="w-4 h-4 text-orange-400" />
              <span>Documents</span>
            </div>,
            <div key="db" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Database className="w-4 h-4 text-orange-400" />
              <span>SQL DB</span>
            </div>,
            <div key="blob" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <HardDrive className="w-4 h-4 text-orange-400" />
              <span>Blob Store</span>
            </div>,
            <div key="url" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Link className="w-4 h-4 text-orange-400" />
              <span>Web URLs</span>
            </div>,
            <div key="vec" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Layers className="w-4 h-4 text-orange-400" />
              <span>Vector Index</span>
            </div>,
            <div key="rank" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Search className="w-4 h-4 text-orange-400" />
              <span>Hybrid Ranker</span>
            </div>
          ]} 
        />
      )
    },
    {
      colSpan: "lg:col-span-1 md:col-span-1",
      eyebrow: "WORKFLOWS",
      title: "Power Automate",
      desc: "Integrate Agentic triggers directly with databases, custom APIs, and legacy systems.",
      logo: <PowerPlatformLogo />,
      colorClass: "border-purple-500/25 hover:border-purple-400/40 text-purple-400 bg-gradient-to-r from-black via-[#4c1c02] to-black",
      accentBg: "bg-purple-500/10",
      features: ["Desktop RPA Flow", "Dataverse API"],
      illustration: (
        <SlidingMarquee 
          speed="14s" 
          icons={[
            <div key="zp" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Zap className="w-4 h-4 text-orange-400" />
              <span>Triggers</span>
            </div>,
            <div key="rp" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Repeat className="w-4 h-4 text-orange-400" />
              <span>Schedule</span>
            </div>,
            <div key="pl" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Play className="w-4 h-4 text-orange-400" />
              <span>RPA Flows</span>
            </div>,
            <div key="chk" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <CheckSquare className="w-4 h-4 text-orange-400" />
              <span>Approvals</span>
            </div>,
            <div key="wf" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Workflow className="w-4 h-4 text-orange-400" />
              <span>Pipelines</span>
            </div>,
            <div key="st" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Settings className="w-4 h-4 text-orange-400" />
              <span>Actions</span>
            </div>
          ]} 
        />
      )
    },
    {
      colSpan: "lg:col-span-2 md:col-span-1",
      eyebrow: "DATA ENGINE",
      title: "Microsoft Fabric",
      desc: "Consolidate siloed databases into a single OneLake data lakehouse to run real-time analytics and data engineering pipelines.",
      logo: <FabricLogo />,
      colorClass: "border-orange-500/25 hover:border-orange-400/40 text-orange-400 bg-gradient-to-r from-black via-[#4c1c02] to-black",
      accentBg: "bg-orange-500/10",
      features: ["OneLake Storage", "Synapse Data Warehouses", "Real-Time ETL Flows"],
      illustration: (
        <SlidingMarquee 
          speed="18s" 
          icons={[
            <div key="lake" className="flex items-center gap-2 text-xs font-semibold text-orange-400/95">
              <Database className="w-4 h-4 text-orange-400" />
              <span>OneLake</span>
            </div>,
            <div key="strm" className="flex items-center gap-2 text-xs font-semibold text-orange-400/95">
              <Activity className="w-4 h-4 text-orange-400" />
              <span>Eventhouse</span>
            </div>,
            <div key="etl" className="flex items-center gap-2 text-xs font-semibold text-orange-400/95">
              <Layers className="w-4 h-4 text-orange-400" />
              <span>Factory ETL</span>
            </div>,
            <div key="pbi" className="flex items-center gap-2 text-xs font-semibold text-orange-400/95">
              <BarChart3 className="w-4 h-4 text-orange-400" />
              <span>Power BI</span>
            </div>,
            <div key="syn" className="flex items-center gap-2 text-xs font-semibold text-orange-400/95">
              <Cpu className="w-4 h-4 text-orange-400" />
              <span>Synapse SQL</span>
            </div>,
            <div key="sci" className="flex items-center gap-2 text-xs font-semibold text-orange-400/95">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              <span>Notebooks</span>
            </div>
          ]} 
        />
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-[1400px] mx-auto mt-6 text-left items-stretch px-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`group relative rounded-[20px] border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden ${card.colorClass} ${card.colSpan}`}
        >
          {/* Accent glow on card backgrounds */}
          <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${card.accentBg}`} />

          <div className="space-y-4 w-full">
            {/* Logo row */}
            <div className="flex items-center justify-between w-full">
              <div className="shadow-md border border-white/10 bg-white/5 p-2 rounded-xl">
                {card.logo}
              </div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                {card.eyebrow}
              </span>
            </div>

            {/* Content info */}
            <div className="space-y-2">
              <h3 className="text-lg lg:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>{card.title}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-slate-400" />
              </h3>
              <p className="text-[13px] lg:text-[13.5px] text-slate-400 leading-normal">
                {card.desc}
              </p>
            </div>

            {/* Vector illustration component */}
            {card.illustration}
          </div>

          {/* Features list */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-1.5 w-full">
            {card.features.map((feat, fIdx) => (
              <span key={fIdx} className="inline-flex items-center text-[11px] font-semibold text-slate-300">
                <span className="w-1 h-1 rounded-full bg-[#FF6B00] mr-1.5" />
                {feat}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
