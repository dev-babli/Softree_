"use client";

import React from "react";
import {
  Cpu,
  Database,
  Zap,
  RefreshCw,
  Wrench,
  Layers,
  Settings,
  Brain,
  Search,
  MessageSquare,
  Bot,
  FileText,
  Activity,
  Network,
  Workflow,
  Target,
  Terminal,
  Code2,
  Server,
  Cloud,
  Boxes,
  Sparkles,
  Layers3,
  BrainCircuit,
} from "lucide-react";

// Cloud and AI vector logos
const AwsCloudLogo = ({ className = "w-5 h-5 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.5 13.5C5.1 13.5 4 12.4 4 11C4 9.8 4.8 8.7 6 8.5C6.4 6.5 8.2 5 10.5 5C12.4 5 14 6.1 14.7 7.7C15.2 7.3 15.8 7 16.5 7C18.4 7 20 8.6 20 10.5C20 12.4 18.4 14 16.5 14H6.5V13.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 18C10.5 20.5 16 20 19 17.5"
      stroke="#FF5812"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const BedrockLogo = ({ className = "w-5 h-5 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L2 7L12 12L22 7L12 2Z"
      stroke="#FF5812"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 17L12 22L22 17"
      stroke="#FF5812"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12L12 17L22 12"
      stroke="#FF5812"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Isometric Stacked Blocks on circular pedestal SVG with floating animation
const IsometricBlocksLogo = () => (
  <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto flex items-center justify-center">
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
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-[0_0_24px_rgba(255,88,18,0.35)]"
    >
      <ellipse
        cx="60"
        cy="102"
        rx="48"
        ry="14"
        fill="none"
        stroke="#FF5812"
        className="animate-pedestal-glow"
        strokeDasharray="3 3"
      />
      <ellipse
        cx="60"
        cy="102"
        rx="38"
        ry="10"
        fill="rgba(255,88,18,0.06)"
        stroke="#FF5812"
        strokeWidth="2"
      />
      <ellipse
        cx="60"
        cy="102"
        rx="26"
        ry="7"
        fill="none"
        stroke="#FF5812"
        strokeWidth="1"
        opacity="0.5"
      />
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
        <path d="M60 55 L42 46 L60 37 L78 46 Z" fill="#ff5812" stroke="#FF8542" strokeWidth="1.2" opacity="0.9" />
        <path d="M42 46 L42 55 L60 64 L60 55 Z" fill="#e04707" stroke="#FF8542" strokeWidth="1.2" />
        <path d="M60 55 L60 64 L78 55 L78 46 Z" fill="#b93800" stroke="#FF8542" strokeWidth="1.2" />
      </g>
    </svg>
  </div>
);

import { 
  SiConfluence, 
  SiClaude, 
  SiGooglegemini, 
  SiMeta 
} from "react-icons/si";
import { FaSalesforce, FaMicrosoft } from "react-icons/fa6";
import { TbBrandOpenai, TbBrandAzure } from "react-icons/tb";
import { DiMsqlServer } from "react-icons/di";
import { Share2 } from "lucide-react";

// Real Tech Icons
const PowerBiIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Power_bi_logo_black.svg" alt="Power BI" className={className} />
);

const AzureIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <TbBrandAzure className={className + " text-[#0089D6]"} />
);

const SparkIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg" alt="Apache Spark" className={className} />
);

const DynamicsIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <img src="https://cdn.simpleicons.org/microsoft/5E5E5E" alt="Dynamics" className={className} />
);

const SharePointIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <Share2 className={className + " text-[#0078D4]"} strokeWidth={2.5} />
);

const SqlIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <DiMsqlServer className={className + " text-[#CC292B] scale-125"} />
);

const ConfluenceIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <SiConfluence className={className + " text-[#172B4D]"} />
);

const SalesforceIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <FaSalesforce className={className + " text-[#00A1E0]"} />
);

const OpenAiIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <TbBrandOpenai className={className + " text-black"} />
);

const ClaudeIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <SiClaude className={className + " text-[#D97757]"} />
);

const GeminiIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <SiGooglegemini className={className + " text-[#8E75B2]"} />
);

const LlamaIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <SiMeta className={className + " text-[#0468FF]"} />
);

const Microsoft365Icon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <FaMicrosoft className={className + " text-[#D83B01]"} />
);

const AzureAiSearchIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <TbBrandAzure className={className + " text-[#0089D6]"} />
);

export default function RAGTechnologyStack() {
  // 5 Technology Stack Categories as requested
  const stackCategories = [
    {
      category: "STACK 01",
      title: "ENTERPRISE DATA",
      items: [
        { name: "SharePoint", icon: <SharePointIcon className="w-4 h-4" /> },
        { name: "PDFs", icon: <FileText className="w-4 h-4 text-slate-800" /> },
        { name: "SQL / Databases", icon: <SqlIcon className="w-4 h-4" /> },
        { name: "Confluence", icon: <ConfluenceIcon className="w-4 h-4" /> },
        { name: "CRM", icon: <SalesforceIcon className="w-4 h-4" /> },
      ],
    },
    {
      category: "STACK 02",
      title: "DOCUMENT PROCESSING",
      items: [
        { name: "Document Extraction", icon: <FileText className="w-4 h-4 text-orange-600" /> },
        { name: "Chunking", icon: <Layers3 className="w-4 h-4 text-purple-600" /> },
        { name: "Data Cleaning", icon: <RefreshCw className="w-4 h-4 text-blue-600" /> },
        { name: "Embeddings Preparation", icon: <Settings className="w-4 h-4 text-slate-700" /> },
      ],
    },
    {
      category: "STACK 03",
      title: "RETRIEVAL ENGINE",
      items: [
        { name: "Vector Search", icon: <Search className="w-4 h-4 text-orange-600" /> },
        { name: "Semantic Search", icon: <Brain className="w-4 h-4 text-purple-600" /> },
        { name: "Hybrid Search", icon: <Network className="w-4 h-4 text-cyan-600" /> },
        { name: "Metadata Filtering", icon: <Target className="w-4 h-4 text-slate-700" /> },
      ],
    },
    {
      category: "STACK 04",
      title: "LLM INTEGRATION",
      items: [
        { name: "Azure OpenAI", icon: <AzureIcon className="w-4 h-4" /> },
        { name: "OpenAI", icon: <OpenAiIcon className="w-4 h-4" /> },
        { name: "Claude", icon: <ClaudeIcon className="w-4 h-4" /> },
        { name: "Gemini", icon: <GeminiIcon className="w-4 h-4" /> },
        { name: "Llama", icon: <LlamaIcon className="w-4 h-4" /> },
      ],
    },
    {
      category: "STACK 05",
      title: "MICROSOFT AI",
      items: [
        { name: "Azure AI Search", icon: <AzureAiSearchIcon className="w-4 h-4" /> },
        { name: "Azure OpenAI", icon: <AzureIcon className="w-4 h-4" /> },
        { name: "Microsoft 365", icon: <Microsoft365Icon className="w-4 h-4" /> },
        { name: "Microsoft Foundry", icon: <Wrench className="w-4 h-4 text-slate-700" /> },
      ],
    },
  ];

  const rightCapabilities = [
    {
      title: "ENTERPRISE KNOWLEDGE INGESTION",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Database className="w-5 h-5 text-[#FF5812]" strokeWidth={2} />,
      desc: "Connect and prepare enterprise data from all sources for secure RAG.",
    },
    {
      title: "RAG DATA PROCESSING",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Layers3 className="w-5 h-5 text-[#FF5812]" strokeWidth={2} />,
      desc: "Transform documents into structured knowledge while preserving metadata.",
    },
    {
      title: "INTELLIGENT RETRIEVAL",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Search className="w-5 h-5 text-[#FF5812]" strokeWidth={2} />,
      desc: "Retrieve relevant knowledge using hybrid search before LLM context.",
    },
    {
      title: "GROUNDED AI RESPONSES",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Bot className="w-5 h-5 text-[#FF5812]" strokeWidth={2} />,
      desc: "Connect context with language models to generate grounded AI responses.",
    },
    {
      title: "SECURE ENTERPRISE RAG",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Settings className="w-5 h-5 text-[#FF5812]" strokeWidth={2} />,
      desc: "Build secure RAG solutions with data integration and ongoing optimization.",
    },
  ];

  const bottomStackSummary = [
    { title: "DATA", value: "SharePoint · SQL / DB · PDFs · APIs", icon: <Database className="w-4 h-4 text-[#FF5812]" /> },
    { title: "PROCESSING", value: "Chunking · Metadata · Embeddings", icon: <Layers3 className="w-4 h-4 text-[#FF5812]" /> },
    { title: "RETRIEVAL", value: "Vector · Semantic · Hybrid", icon: <Search className="w-4 h-4 text-[#FF5812]" /> },
    { title: "LLMs", value: "Azure OpenAI · OpenAI · Claude · Gemini", icon: <BrainCircuit className="w-4 h-4 text-[#FF5812]" /> },
    { title: "MICROSOFT AI", value: "Azure AI Search · Microsoft 365", icon: <Brain className="w-4 h-4 text-[#FF5812]" /> },
  ];

  return (
    <section className="w-full max-w-[1600px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 py-10 md:py-14 z-10 relative font-sans flex flex-col gap-6 sm:gap-10">
      {/* Section Heading */}
      <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-500/20 text-[#FF5812] typo-caption mb-4 shadow-xs">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF5812] animate-pulse" />
          RAG TECHNOLOGY STACK
        </div>
        <h2 className="typo-heading-2 text-slate-900 mb-3 sm:mb-4">
          Technology Stack for <br className="hidden sm:inline" />
          Enterprise RAG Development
        </h2>
        <p className="typo-description text-slate-600 max-w-3xl text-center">
          Build secure RAG applications connecting enterprise data, intelligent retrieval, and language models. We combine Microsoft AI with modern RAG components to deliver production-ready knowledge solutions.
        </p>

      </div>

      {/* Outer Dashboard Card */}
      <div className="relative overflow-hidden rounded-[20px] lg:rounded-[24px] border border-slate-200 bg-white p-4 sm:p-6 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] min-h-[580px] flex items-center text-slate-900 w-full">
        {/* Subtle radial reflections */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(255,88,18,0.03),transparent_40%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(255,88,18,0.04),transparent_45%)] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch w-full relative z-10">
          {/* Left Column: Heading, Isometric Stack */}
          <div className="lg:col-span-3 flex">
            <div className="relative overflow-hidden rounded-[18px] border border-orange-500/30 bg-slate-50 p-5 sm:p-6 shadow-[0_0_25px_rgba(255,88,18,0.05)] flex flex-col justify-between items-stretch w-full h-auto min-h-[300px] lg:min-h-[500px] z-10">
              <div className="space-y-1.5 text-left">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF5812] typo-caption font-mono mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812] animate-pulse" />
                  ENTERPRISE RAG PLATFORM
                </div>
                <h3 className="typo-heading-4 tracking-wider text-slate-900 uppercase leading-[1.1] mb-1">
                  ENTERPRISE
                  <br />
                  RAG
                </h3>
                <p className="typo-caption-meta font-bold text-orange-600">
                  DATA · RETRIEVAL · AI
                </p>
              </div>

              {/* 3D Stack illustration */}
              <div className="py-2 sm:py-4 flex items-center justify-center">
                <IsometricBlocksLogo />
              </div>

              <div className="typo-caption-meta font-mono text-slate-500 text-center border-t border-slate-200/80 pt-3">
                Enterprise Data Architecture
              </div>
            </div>
          </div>

          {/* Center-Right Columns: 5 Layers Stack + Glowing Core + 5 Capabilities */}
          <div className="lg:col-span-9 grid grid-cols-1 xl:grid-cols-12 gap-6 relative">

            {/* Unified SVG Branching Connection Overlay */}
            <div className="absolute inset-0 w-full h-full pointer-events-none hidden xl:block z-0">
              <svg className="w-full h-full" viewBox="0 0 900 500" fill="none" preserveAspectRatio="none">
                {/* Left Branches */}
                <path d="M 450 50 L 465 50 L 475 210" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 50 L 465 50 L 475 210" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 450 150 L 465 150 L 475 230" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 150 L 465 150 L 475 230" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 450 250 L 475 250" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 250 L 475 250" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 450 350 L 465 350 L 475 270" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 350 L 465 350 L 475 270" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 450 450 L 465 450 L 475 290" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 450 L 465 450 L 475 290" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Right Branches */}
                <path d="M 575 210 L 585 50 L 600 50" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 210 L 585 50 L 600 50" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 575 230 L 585 150 L 600 150" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 230 L 585 150 L 600 150" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 575 250 L 600 250" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 250 L 600 250" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 575 270 L 585 350 L 600 350" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 270 L 585 350 L 600 350" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 575 290 L 585 450 L 600 450" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 290 L 585 450 L 600 450" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Left Dot Animations */}
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="2.2s" repeatCount="indefinite" path="M 450 50 L 465 50 L 475 210" /></circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="1.8s" repeatCount="indefinite" path="M 450 150 L 465 150 L 475 230" /></circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="2.5s" repeatCount="indefinite" path="M 450 250 L 475 250" /></circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="2.0s" repeatCount="indefinite" path="M 450 350 L 465 350 L 475 270" /></circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="2.3s" repeatCount="indefinite" path="M 450 450 L 465 450 L 475 290" /></circle>

                {/* Right Dot Animations */}
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="2.2s" repeatCount="indefinite" path="M 575 210 L 585 50 L 600 50" /></circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="1.8s" repeatCount="indefinite" path="M 575 230 L 585 150 L 600 150" /></circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="2.5s" repeatCount="indefinite" path="M 575 250 L 600 250" /></circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="2.0s" repeatCount="indefinite" path="M 575 270 L 585 350 L 600 350" /></circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="2.3s" repeatCount="indefinite" path="M 575 290 L 585 450 L 600 450" /></circle>
              </svg>
            </div>

            {/* Col A (5 Stack Layers) */}
            <div className="xl:col-span-6 flex flex-col justify-between gap-3 xl:gap-4 py-1 h-auto xl:min-h-[500px] relative z-10">
              {stackCategories.map((cat, idx) => (
                <div
                  key={cat.category}
                  className="relative p-2.5 sm:p-3 rounded-[12px] border border-orange-500/20 bg-white hover:border-[#FF5812]/50 hover:shadow-sm transition-all duration-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                >
                  <div className="w-full sm:w-[130px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1 sm:pb-0 border-b sm:border-b-0 border-orange-500/15">
                    <div>
                      <span className="typo-caption-meta font-black text-orange-600 block mb-0.5">
                        {cat.category}
                      </span>
                      <span className="typo-caption font-black text-slate-900 tracking-tight uppercase leading-tight block">
                        {cat.title}
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:block w-[1px] h-8 bg-orange-500/20 self-center shrink-0" />

                  {/* Pills row */}
                  <div className="flex flex-wrap gap-1.5 flex-1 items-center">
                    {cat.items.map((item) => (
                      <span
                        key={item.name}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-50 border border-slate-200/80 hover:bg-orange-50/60 hover:border-orange-200 transition-colors typo-caption-meta font-semibold text-slate-700"
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Col B: Central Glowing Core */}
            <div className="xl:col-span-2 flex items-center justify-center relative z-10 py-8 xl:py-0">
              <div className="relative flex items-center justify-center w-[140px] h-[140px] sm:w-[160px] sm:h-[160px]">
                {/* Rotating orbital rings */}
                <div className="absolute inset-0 rounded-full border border-orange-500/30 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-2 sm:inset-3 rounded-full border border-orange-500/20 animate-[spin_12s_linear_infinite_reverse]" />

                <svg
                  className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite]"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    stroke="rgba(255,88,18,0.15)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="1 3"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="rgba(255,88,18,0.25)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="4 8"
                  />
                </svg>

                {/* Core dial */}
                <div className="absolute inset-4 sm:inset-5 rounded-full bg-white border-2 border-orange-400/50 shadow-[0_0_25px_rgba(255,88,18,0.15)] flex flex-col items-center justify-center gap-0.5 z-10">
                  <BrainCircuit className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500 mb-1 drop-shadow-md" strokeWidth={1.5} />
                  <span className="text-[10px] font-black tracking-widest text-slate-900 text-center mt-0.5">
                    ENTERPRISE
                  </span>
                  <span className="text-[9px] font-black tracking-widest text-[#FF5812] text-center mt-[-1px]">
                    RAG
                  </span>
                  <span className="text-[7px] font-bold tracking-widest text-slate-500 select-none text-center leading-tight">
                    ARCHITECTURE
                  </span>
                </div>
              </div>
            </div>

            {/* Col C: 5 Capabilities indicators */}
            <div className="xl:col-span-4 flex flex-col justify-between gap-3 xl:gap-4 py-1 h-auto xl:min-h-[500px] text-left pl-0 xl:pl-2 relative z-10">
              {rightCapabilities.map((cap, idx) => (
                <div key={idx} className="relative flex items-center pl-4 sm:pl-5 w-full group">
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white border-2 ${cap.borderClass} ${cap.glowClass} z-20 transition-all duration-300 group-hover:scale-110`}
                  >
                    {cap.icon}
                  </div>
                  <div
                    className={`w-full border ${cap.borderClass} bg-white p-2 sm:p-2.5 pl-7 sm:pl-8 rounded-lg text-left transition-all duration-300 ${cap.hoverBorder} shadow-[0_4px_12px_rgba(0,0,0,0.03)]`}
                  >
                    <span
                      className={`typo-caption font-black block mb-0.5 ${cap.textClass}`}
                    >
                      {cap.title}
                    </span>
                    <span className="typo-body-sm text-slate-500 leading-snug block font-medium group-hover:text-slate-700 transition-colors">
                      {cap.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Technology Stack Summary Strip */}
      <div className="relative overflow-hidden rounded-[20px] border border-orange-500/20 bg-white py-4 px-4 sm:px-6 md:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-6 z-10 text-slate-900 w-full">
        <div className="flex items-center gap-3 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200 pb-3 lg:pb-0 lg:pr-6 w-full lg:w-auto">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white border-2 border-orange-500/40 text-orange-600 shadow-[0_0_10px_rgba(255,88,18,0.05)] animate-pulse">
            <Target className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-left">
            <span className="typo-caption font-black text-orange-600 tracking-wider uppercase select-none">
              TECH STACK
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-nowrap justify-between items-center w-full gap-4">
          {bottomStackSummary.map((metric, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-3 text-left group">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-orange-500/20 shadow-[0_0_8px_rgba(255,88,18,0.05)] transition-all duration-300 group-hover:scale-110 shrink-0">
                  {metric.icon}
                </div>
                <div>
                  <span className="typo-caption font-black text-slate-900 block tracking-tight uppercase leading-none mb-0.5">
                    {metric.title}
                  </span>
                  <span className="typo-body-sm text-slate-500 font-semibold block leading-none">
                    {metric.value}
                  </span>
                </div>
              </div>
              {idx < bottomStackSummary.length - 1 && (
                <div className="hidden lg:block w-[1px] h-6 bg-slate-200" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
