/* eslint-disable softree-design/no-untokenized-design-literals */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  ChevronLeft,
  ChevronRight,
  Code2,
  ShieldCheck,
  Cloud,
  FileText,
  Network,
  LayoutDashboard,
  BrainCircuit,
  LineChart,
  Users,
  Sparkles,
  Workflow,
  Server,
  Layers,
  Database,
  Brain,
  Lightbulb,
  WandSparkles,
  HeartPulse,
  Truck,
  Building2,
  Globe2,
  Smartphone,
  Boxes,
  Cpu,
  CloudSnow,
  Factory,
  Link2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type MegaMenuLink = {
  label: string;
  url: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  description?: string;
  group?: string;
};

export type MegaMenuGroup = {
  title: string;
  url?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  description?: string;
  links: MegaMenuLink[];
};

import { FluidFieldBackground } from "@/components/ui/fluid-field";

/* -------------------------------------------------------------------------- */
/*  Editorial Headlines and Introductions for Service Categories               */
/* -------------------------------------------------------------------------- */

const CATEGORY_META: Record<
  string,
  {
    eyebrow: string;
    introHeading: string;
    introDescription: string;
    introCtaText: string;
    introCtaUrl: string;
    featuredEyebrow: string;
    featuredHeading: string;
    featuredDescription: string;
    featuredImage: string;
    featuredCtaText: string;
    featuredCtaUrl: string;
  }
> = {
  "AI & Automation": {
    eyebrow: "AI & AUTOMATION",
    introHeading: "Build AI Solutions for Real Business Impact",
    introDescription:
      "Build intelligent agents, automate workflows and unlock AI-powered business innovation.",
    introCtaText: "Explore AI & Automation",
    introCtaUrl: "/services/ai-development-services",
    featuredEyebrow: "AI & AUTOMATION",
    featuredHeading: "Turn Strategy into Real Results",
    featuredDescription:
      "Build, scale, and deliver digital products with dedicated engineering squads.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
  "Agentic Orchestration": {
    eyebrow: "AUTONOMOUS SYSTEMS",
    introHeading: "Autonomous Multi-Agent Systems at Scale & Intelligent Workflows.",
    introDescription:
      "Architect stateful multi-agent systems, collaborative agent pods, and LangChain/LangGraph pipelines to orchestrate complex operations.",
    introCtaText: "Explore Agentic Systems",
    introCtaUrl: "/solutions/ai-agents-development",
    featuredEyebrow: "AGENTIC ORCHESTRATION",
    featuredHeading: "Scale Autonomous Decision Workflows",
    featuredDescription:
      "Deploy multi-agent networks that coordinate, reason, and execute end-to-end tasks.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
  "Testing & Quality Engineering": {
    eyebrow: "QUALITY & ASSURANCE",
    introHeading: "Zero-Defect Quality, Security & Autonomous AI Testing.",
    introDescription:
      "Ensure software reliability, security validation, and agentic AI accuracy across web, mobile, and mission-critical enterprise systems.",
    introCtaText: "Explore Quality Engineering",
    introCtaUrl: "/quality-engineering/automation-testing-services",
    featuredEyebrow: "QUALITY ENGINEERING",
    featuredHeading: "Elevate Software Excellence & Trust",
    featuredDescription:
      "Modernize QA pipelines with autonomous test generation and continuous compliance.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
  "Document & Process Intelligence": {
    eyebrow: "INTELLIGENT PROCESSING",
    introHeading: "Automate Document Workflows & Extract Actionable Insights.",
    introDescription:
      "Extract structured data from unstructured contracts, invoices, and records with multimodal Document AI and Azure OpenAI systems.",
    introCtaText: "Explore Document Intelligence",
    introCtaUrl: "/solutions/document-ai-solutions",
    featuredEyebrow: "DOCUMENT & PROCESS INTELLIGENCE",
    featuredHeading: "Automate High-Volume Data Ingestion",
    featuredDescription:
      "Achieve straight-through document processing and remove manual data bottlenecks.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
  "Microsoft & Business Applications": {
    eyebrow: "MICROSOFT ECOSYSTEM",
    introHeading: "Enterprise Low-Code, Cloud Solutions & Power Platform.",
    introDescription:
      "Optimize business operations and accelerate productivity with bespoke Power Apps, automated Power Automate flows, and Dataverse architectures.",
    introCtaText: "Explore Microsoft Solutions",
    introCtaUrl: "/services/offshore-power-platform-development",
    featuredEyebrow: "MICROSOFT APPLICATIONS",
    featuredHeading: "Unify Workflows Across Microsoft 365",
    featuredDescription:
      "Scale enterprise workflows with custom Power Apps and automated Power Platform flows.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
  "Data & Analytics": {
    eyebrow: "DATA & ANALYTICS",
    introHeading: "Turn Enterprise Data into Actionable Insight & Strategic Value.",
    introDescription:
      "Transform raw data into real-time decision intelligence with modern analytics platforms like Power BI, Microsoft Fabric, Databricks, and Snowflake.",
    introCtaText: "Explore Data & Analytics",
    introCtaUrl: "/services/power-bi-development-services",
    featuredEyebrow: "DATA & ANALYTICS",
    featuredHeading: "Unified Lakehouse & Real-Time BI",
    featuredDescription:
      "Turn raw enterprise data into executive dashboards with Microsoft Fabric and Power BI.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
  "Digital Engineering": {
    eyebrow: "ENGINEERING EXCELLENCE",
    introHeading: "High-Performance Web, Mobile & Cloud Applications.",
    introDescription:
      "Build scalable digital products, cloud-native microservices, bespoke customer portals, and modernize legacy software systems.",
    introCtaText: "Explore Digital Engineering",
    introCtaUrl: "/services/offshore-web-app-development",
    featuredEyebrow: "DIGITAL ENGINEERING",
    featuredHeading: "Ship Resilient Products at Market Speed",
    featuredDescription:
      "Scale your engineering velocity with dedicated developers, architects, and DevOps specialists.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
  "Digital Workplace": {
    eyebrow: "DIGITAL WORKPLACE",
    introHeading: "Modern Collaboration Portals, Intranets & Digital Workspaces.",
    introDescription:
      "Empower your distributed workforce with secure SharePoint Online intranets, knowledge centers, and custom SPFx platform extensions.",
    introCtaText: "Explore Digital Workplace",
    introCtaUrl: "/services/offshore-sharepoint-development",
    featuredEyebrow: "DIGITAL WORKPLACE",
    featuredHeading: "Modern Collaboration & Intranet Portals",
    featuredDescription:
      "Connect and empower distributed teams across Microsoft 365 and SharePoint intranets.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
  "Migration & Modernization": {
    eyebrow: "MIGRATION & MODERNIZATION",
    introHeading: "Seamless Analytics, Lakehouse & Cloud Modernization.",
    introDescription:
      "Modernize legacy platforms with confidence: migrate Tableau, SQL Server, Azure Data Factory, and Synapse directly into Microsoft Fabric.",
    introCtaText: "Explore Modernization",
    introCtaUrl: "/services/tableau-migration-services",
    featuredEyebrow: "MIGRATION & MODERNIZATION",
    featuredHeading: "Seamless Analytics & Cloud Modernization",
    featuredDescription:
      "Migrate databases, BI reports, and ETL pipelines smoothly to Microsoft Fabric.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
};

// Concise, clear micro-descriptions tailored for the 2-column cards
const CATEGORY_SHORT_DESCS: Record<string, string> = {
  "AI & Automation": "Intelligent agents & workflows",
  "Agentic Orchestration": "Multi-agent systems & pipelines",
  "Testing & Quality Engineering": "Software QA & AI testing",
  "Document & Process Intelligence": "Document AI & process workflows",
  "Microsoft & Business Applications": "Power Apps & Dataverse solutions",
  "Data & Analytics": "Power BI & Fabric analytics",
  "Digital Engineering": "Web apps, APIs & cloud platforms",
  "Digital Workplace": "SharePoint & collaboration portals",
  "Migration & Modernization": "Cloud, Tableau & Fabric migrations",
};

/* -------------------------------------------------------------------------- */
/*  Main Component: MegaMenuPanel                                             */
/* -------------------------------------------------------------------------- */

export function MegaMenuPanel({
  label: _label,
  groups,
  onClose,
}: {
  label: string;
  groups?: MegaMenuGroup[];
  onClose: () => void;
}) {
  // Navigation view level: "categories" (overview of all 9 categories) or "services" (inside a selected category)
  const [viewLevel, setViewLevel] = useState<"categories" | "services">("categories");
  const [activeIdx, setActiveIdx] = useState(0);

  const availableGroups = groups && groups.length > 0 ? groups : [];
  if (availableGroups.length === 0) return null;

  const safeIdx = activeIdx < availableGroups.length ? activeIdx : 0;
  const currentGroup = availableGroups[safeIdx];
  const meta = CATEGORY_META[currentGroup.title] || {
    eyebrow: _label ? _label.toUpperCase() : "SERVICES & SOLUTIONS",
    introHeading: currentGroup.description || `${currentGroup.title} Solutions`,
    introDescription:
      _label === "Case Studies"
        ? "Explore real-world client success stories, enterprise architecture deployments, and business transformation outcomes."
        : "Comprehensive digital solutions, specialized engineering squads, and modern enterprise services.",
    introCtaText: _label === "Case Studies" ? "View All Case Studies" : `Explore ${currentGroup.title}`,
    introCtaUrl: currentGroup.links[0]?.url || (_label === "Case Studies" ? "/case-studies" : "/services"),
    featuredEyebrow: currentGroup.title.toUpperCase(),
    featuredHeading: _label === "Case Studies" ? "Client Success & Proven Impact" : "Turn Strategy into Real Results",
    featuredDescription:
      _label === "Case Studies"
        ? "Discover how Softree partners with enterprise leaders to deliver measurable business outcomes."
        : "Work with our specialized engineering teams to build, scale, and deliver digital products.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + availableGroups.length) % availableGroups.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % availableGroups.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIdx((prev) => (prev - 1 + availableGroups.length) % availableGroups.length);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIdx((prev) => (prev + 1) % availableGroups.length);
    } else if (e.key === "Escape" && viewLevel === "services") {
      e.preventDefault();
      setViewLevel("categories");
    }
  };

  const handleSelectCategory = (idx: number) => {
    setActiveIdx(idx);
    setViewLevel("services");
  };

  const handleBackToCategories = () => {
    setViewLevel("categories");
  };

  const serviceLinks = currentGroup.links || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.995 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="mx-auto w-full max-w-[1380px] overflow-hidden rounded-[28px] border border-black/[0.08] bg-white p-4 sm:p-5 lg:p-6 shadow-[0_28px_80px_-15px_rgba(10,10,26,0.18),0_4px_20px_rgba(0,0,0,0.04)] focus:outline-none"
    >
      {/* =================================================================== */}
      {/* 3-Column Layout from Image 1: Left Intro | Center Services | Right Featured */}
      {/* =================================================================== */}
      <div className="flex flex-col lg:flex-row gap-5 xl:gap-6 items-stretch w-full">
        {/* ================================================================= */}
        {/* LEFT PANEL: Selected Category Intro + FluidFieldBackground         */}
        {/* ================================================================= */}
        <div className="relative w-full lg:w-[320px] xl:w-[350px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#050508] p-6 xl:p-7 flex flex-col justify-between shadow-sm">
          {/* WebGL Fluid Field Shader Animation (Softree Orange & Red) */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <FluidFieldBackground className="w-full h-full" />
            {/* Subtle radial dark overlay for high text legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/60 via-[#050508]/40 to-[#050508]/80 pointer-events-none" />
          </div>

          {/* Banner content */}
          <div className="relative z-10 flex flex-col justify-between h-full pointer-events-auto">
            <div>
              {/* Header with Eyebrow */}
              <div className="mb-4">
                <span className="text-[11px] font-bold tracking-[0.14em] text-[#FF5812] uppercase drop-shadow-sm">
                  {meta.eyebrow}
                </span>
              </div>

              {/* Dynamic Content Based on Selected Category */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGroup.title}
                  initial={{ opacity: 0.8, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0.8, y: -3 }}
                  transition={{ duration: 0.15 }}
                >
                  <h3 className="text-[22px] xl:text-[25px] font-extrabold leading-[1.18] tracking-tight text-white mb-3">
                    {meta.introHeading}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-slate-300 font-normal">
                    {meta.introDescription}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pt-7 mt-auto">
              <Link
                href={meta.introCtaUrl}
                onClick={onClose}
                className="group inline-flex items-center gap-2 rounded-full bg-[#FF5812] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(255,88,18,0.36)] transition-all duration-150 hover:bg-[#e64a09] hover:shadow-[0_6px_20px_rgba(255,88,18,0.45)]"
              >
                <span>{meta.introCtaText}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CENTER PANEL: Two-Level Interactive Category & Services View      */}
        {/* ================================================================= */}
        <div className="flex-1 min-w-0 flex flex-col justify-start">
          {viewLevel === "categories" ? (
            /* ─────────────────────────────────────────────────────────────── */
            /* LEVEL 1: ALL 9 SERVICE CATEGORIES (Matching Image 2)            */
            /* ─────────────────────────────────────────────────────────────── */
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[11px] font-bold tracking-[0.14em] text-slate-400 uppercase">
                  OUR SERVICES
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  Select a category to view services
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {availableGroups.map((group, idx) => {
                  const isSelected = activeIdx === idx;
                  const GroupIcon = group.icon || Bot;

                  const shortDesc =
                    CATEGORY_SHORT_DESCS[group.title] ||
                    group.description ||
                    "Specialized enterprise solutions";

                  return (
                    <button
                      key={group.title}
                      type="button"
                      onClick={() => handleSelectCategory(idx)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      className={`group w-full text-left relative flex items-center justify-between p-3 xl:p-3.5 rounded-xl border transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? "bg-slate-50/80 border-[#FF5812]/30 shadow-[0_2px_10px_rgba(255,88,18,0.08)]"
                          : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/60"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0 pr-2 flex-1">
                        {/* Icon container with warm peach background */}
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-150 ${
                            isSelected
                              ? "bg-[#FFE8DC] text-[#FF5812]"
                              : "bg-[#FFF2EB] text-[#FF5812] group-hover:bg-[#FFE8DC]"
                          }`}
                        >
                          <GroupIcon size={18} />
                        </div>

                        {/* Title & Description */}
                        <div className="min-w-0 flex-1">
                          <span
                            className={`text-[13px] font-bold block leading-snug transition-colors duration-150 ${
                              isSelected
                                ? "text-[#FF5812]"
                                : "text-[#0f172a] group-hover:text-[#FF5812]"
                            }`}
                          >
                            {group.title}
                          </span>
                          <span className="text-[11.5px] text-slate-500 block leading-tight mt-0.5 font-normal">
                            {shortDesc}
                          </span>
                        </div>
                      </div>

                      {/* Right Orange Arrow Indicator */}
                      <ArrowRight
                        className={`w-4 h-4 shrink-0 transition-all duration-150 ${isSelected
                            ? "text-[#FF5812] translate-x-0.5"
                            : "text-[#FF5812]/50 group-hover:text-[#FF5812] group-hover:translate-x-0.5"
                          }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ─────────────────────────────────────────────────────────────── */
            /* LEVEL 2: SELECTED CATEGORY'S SERVICES + BACK BUTTON            */
            /* ─────────────────────────────────────────────────────────────── */
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleBackToCategories}
                    aria-label="Back to all categories"
                    className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-white bg-[#FF5812] hover:bg-[#e64a09] transition-all py-1 px-3 rounded-full shadow-sm cursor-pointer active:scale-95"
                  >
                    <ChevronLeft size={14} className="stroke-[2.5]" />
                    <span>Back to All Categories</span>
                  </button>
                  <span className="text-slate-300">|</span>
                  <span className="text-[11px] font-bold tracking-[0.14em] text-slate-500 uppercase">
                    {currentGroup.title}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">
                  {safeIdx + 1} of {availableGroups.length} categories
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGroup.title}
                  initial={{ opacity: 0.75, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0.75, y: -4 }}
                  transition={{ duration: 0.12 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-2.5"
                >
                  {serviceLinks.map((link) => {
                    const LinkIcon = link.icon || Bot;
                    return (
                      <Link
                        key={link.label}
                        href={link.url}
                        onClick={onClose}
                        className="group relative flex items-center justify-between p-3 xl:p-3.5 rounded-xl border border-slate-100 bg-white hover:border-[#FF5812]/30 hover:bg-slate-50/70 hover:shadow-[0_2px_10px_rgba(255,88,18,0.06)] transition-all duration-150"
                      >
                        <div className="flex items-center gap-3.5 min-w-0 pr-2 flex-1">
                          {/* Icon container with warm peach background */}
                          <div className="w-9 h-9 rounded-lg bg-[#FFF2EB] text-[#FF5812] group-hover:bg-[#FFE8DC] flex items-center justify-center shrink-0 transition-colors duration-150">
                            <LinkIcon size={18} />
                          </div>

                          {/* Title & Description */}
                          <div className="min-w-0 flex-1">
                            <span className="text-[13px] font-bold text-[#0f172a] group-hover:text-[#FF5812] transition-colors block leading-snug">
                              {link.label}
                            </span>
                            {link.description && (
                              <span className="text-[11.5px] text-slate-500 block leading-tight mt-0.5 font-normal line-clamp-2">
                                {link.description}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Right Orange Arrow Indicator */}
                        <ArrowRight className="w-4 h-4 text-[#FF5812]/40 group-hover:text-[#FF5812] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                      </Link>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* RIGHT PANEL: FEATURED Promotional Card                            */}
        {/* ================================================================= */}
        <div className="w-full lg:w-[280px] xl:w-[310px] shrink-0 flex flex-col">
          <div className="text-[11px] font-bold tracking-[0.14em] text-slate-400 uppercase mb-3 px-1">
            FEATURED
          </div>

          <div className="relative flex-1 min-h-[380px] rounded-2xl overflow-hidden group shadow-sm flex flex-col justify-end p-4 sm:p-5 text-white">
            {/* Background Image */}
            <img
              src={meta.featuredImage}
              alt={meta.featuredHeading}
              className="absolute inset-0 w-full h-full object-cover object-[center_15%] transition-transform duration-500 ease-out group-hover:scale-105"
            />

            {/* Dark gradient overlay anchored to lower portion */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 via-42% to-transparent pointer-events-none" />

            {/* Featured inner content - dynamically updated */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGroup.title}
                initial={{ opacity: 0.85, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0.85, y: -2 }}
                transition={{ duration: 0.15 }}
                className="relative z-10 flex flex-col"
              >
                <span className="text-[10.5px] font-extrabold tracking-widest text-[#FF5812] uppercase mb-1 drop-shadow">
                  {meta.featuredEyebrow}
                </span>
                <h4 className="text-[16px] xl:text-[17px] font-extrabold leading-snug text-white mb-1.5">
                  {meta.featuredHeading}
                </h4>
                <p className="text-[11.5px] text-slate-200 leading-relaxed mb-3.5 font-normal">
                  {meta.featuredDescription}
                </p>
                <Link
                  href={meta.featuredCtaUrl}
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-[12px] py-2.5 px-3.5 shadow-md transition-all group/btn"
                >
                  <span>{meta.featuredCtaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover/btn:translate-x-1 text-[#FF5812]" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


