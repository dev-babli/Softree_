/* eslint-disable softree-design/no-untokenized-design-literals */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
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
  "AI for IT Services": {
    eyebrow: "AI FOR IT SERVICES",
    introHeading: "Next-Gen AI for IT Service Desks, AIOps & Incident Triage.",
    introDescription:
      "Accelerate IT service delivery, automated ticket triage, infrastructure anomaly detection, and autonomous Tier-1 support workflows.",
    introCtaText: "Explore AI for IT Services",
    introCtaUrl: "/industries/ai-for-it-services",
    featuredEyebrow: "IT OPERATIONS AI",
    featuredHeading: "Autonomous IT Services & Incident Deflection",
    featuredDescription:
      "Automate Tier-1/2 ticketing, runbook diagnostics, and multi-cloud observability with enterprise AI.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
};

// Compact, enterprise-grade descriptions tailored for sleek 2-column cards
const CATEGORY_SHORT_DESCS: Record<string, string> = {
  "AI & Automation":
    "Custom GenAI models, enterprise copilots & automated workflows",
  "Agentic Orchestration":
    "Multi-agent systems, LangGraph pipelines & reasoning swarms",
  "Testing & Quality Engineering":
    "Continuous QA automation, cybersecurity VAPT & AI testing",
  "Document & Process Intelligence":
    "Multimodal Document AI, smart OCR & Azure OpenAI pipelines",
  "Microsoft & Business Applications":
    "Enterprise Power Apps, Power Automate & Dataverse solutions",
  "Data & Analytics":
    "Executive Power BI dashboards, Fabric lakehouse & Databricks",
  "Digital Engineering":
    "Full-stack web apps, native mobile apps & cloud microservices",
  "Digital Workplace":
    "Modern SharePoint Online intranets & custom SPFx portals",
  "Migration & Modernization":
    "Cloud migrations across Tableau, SQL Server, ADF & Fabric",
  "Healthcare":
    "Clinical copilots, HIPAA document AI & digital health QA",
  "Logistics & Supply Chain":
    "Smart route optimization, warehouse automation & logistics QA",
  "AI for IT Services":
    "Autonomous IT service desk, AIOps monitoring & incident triage",
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
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="mx-auto w-full max-w-[1340px] overflow-hidden rounded-[22px] border border-black/[0.08] bg-white p-3 sm:p-3.5 lg:p-4 shadow-[0_24px_70px_-15px_rgba(10,10,26,0.16),0_4px_16px_rgba(0,0,0,0.04)] focus:outline-none transform-gpu will-change-[transform,opacity]"
    >
      {/* =================================================================== */}
      {/* 3-Column Layout: Left Intro | Center Services | Right Featured      */}
      {/* =================================================================== */}
      <div className="flex flex-col lg:flex-row gap-3.5 xl:gap-4 items-stretch w-full">
        {/* ================================================================= */}
        {/* LEFT PANEL: Selected Category Intro with Solid Orange-Red Gradient */}
        {/* ================================================================= */}
        <div className="relative w-full lg:w-[280px] xl:w-[300px] shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#FF6B2C] via-[#FF5812] to-[#D92C00] p-4.5 xl:p-5 flex flex-col justify-between shadow-[0_6px_24px_rgba(255,88,18,0.22)] border border-white/20">
          {/* Luminous inner depth highlight */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/15" />
          <div className="pointer-events-none absolute -top-12 -right-12 w-36 h-36 bg-white/15 rounded-full blur-2xl" />

          {/* Banner content */}
          <div className="relative z-10 flex flex-col justify-between h-full pointer-events-auto">
            <div>
              {/* Header with Eyebrow */}
              <div className="mb-2.5">
                <span className="text-[10px] font-extrabold tracking-[0.14em] text-white uppercase drop-shadow-sm bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full inline-block">
                  {meta.eyebrow}
                </span>
              </div>

              {/* Dynamic Content Based on Selected Category */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGroup.title}
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -2 }}
                  transition={{ duration: 0.08, ease: "easeOut" }}
                >
                  <h3 className="text-[18px] xl:text-[20px] font-extrabold leading-[1.2] tracking-tight text-white mb-2 drop-shadow-sm">
                    {meta.introHeading}
                  </h3>
                  <p className="text-[12.5px] xl:text-[13px] leading-relaxed text-white/90 font-medium line-clamp-3">
                    {meta.introDescription}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pt-4 mt-auto">
              <Link
                href={meta.introCtaUrl}
                prefetch={false}
                onClick={onClose}
                className="group inline-flex items-center gap-1.5 rounded-full bg-white text-slate-900 hover:bg-slate-100 px-4 py-2 text-[12px] font-bold shadow-[0_4px_14px_rgba(0,0,0,0.15)] transition-all duration-150"
              >
                <span>{meta.introCtaText}</span>
                <ArrowRight className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-1 text-[#FF5812]" />
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
            /* LEVEL 1: ALL 9 SERVICE CATEGORIES                               */
            /* ─────────────────────────────────────────────────────────────── */
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[10.5px] font-bold tracking-[0.14em] text-slate-400 uppercase">
                  OUR SERVICES
                </span>
                <span className="text-[10.5px] font-medium text-slate-400">
                  Select a category to view services
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 xl:gap-2">
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
                      className={`group w-full text-left relative flex items-center justify-between py-2 px-2.5 xl:py-2.5 xl:px-3 rounded-lg border transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? "bg-gradient-to-r from-[#FFF7F2] to-[#FFF1E8] border-[#FF5812]/40 shadow-[0_2px_10px_rgba(255,88,18,0.1)]"
                          : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/70"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 xl:gap-3 min-w-0 pr-1.5 flex-1">
                        {/* Solid Orange-Red Gradient Icon Badge */}
                        <div
                          className={`relative w-8 h-8 xl:w-8.5 xl:h-8.5 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150 ${
                            isSelected
                              ? "bg-gradient-to-br from-[#FF6B2C] via-[#FF5812] to-[#D92C00] text-white shadow-[0_3px_10px_rgba(255,88,18,0.35)] scale-[1.03]"
                              : "bg-gradient-to-br from-[#FF6B2C] via-[#FF5812] to-[#D92C00] text-white shadow-[0_2px_6px_rgba(255,88,18,0.22)] group-hover:scale-105"
                          }`}
                        >
                          <GroupIcon size={17} className="stroke-[2.2] transition-transform duration-150" />
                        </div>

                        {/* Title & Description */}
                        <div className="min-w-0 flex-1">
                          <span
                            className={`text-[12.5px] xl:text-[13px] font-bold block leading-tight transition-colors duration-150 ${
                              isSelected
                                ? "text-[#FF5812]"
                                : "text-[#0f172a] group-hover:text-[#FF5812]"
                            }`}
                          >
                            {group.title}
                          </span>
                          <span className="text-[12px] xl:text-[12.5px] text-slate-500 group-hover:text-slate-600 block leading-[1.3] mt-0.5 font-normal line-clamp-1">
                            {shortDesc}
                          </span>
                        </div>
                      </div>

                      {/* Premium Diagonal Arrow Badge with Glide Animation */}
                      <div
                        className={`relative w-6 h-6 xl:w-6.5 xl:h-6.5 rounded-full flex items-center justify-center shrink-0 border overflow-hidden transition-all duration-200 ml-1.5 ${
                          isSelected
                            ? "bg-[#FF5812] border-[#FF5812] text-white shadow-[0_2px_8px_rgba(255,88,18,0.35)]"
                            : "bg-[#FF5812]/[0.06] border-[#FF5812]/15 text-[#FF5812]/75 group-hover:bg-[#FF5812] group-hover:border-[#FF5812] group-hover:text-white group-hover:shadow-[0_2px_8px_rgba(255,88,18,0.35)]"
                        }`}
                      >
                        <ArrowUpRight
                          size={13}
                          className={`stroke-[2.3] transition-transform duration-200 ease-out absolute ${
                            isSelected
                              ? "translate-x-[0.5px] -translate-y-[0.5px] text-white"
                              : "group-hover:translate-x-4 group-hover:-translate-y-4"
                          }`}
                        />
                        {!isSelected && (
                          <ArrowUpRight
                            size={13}
                            className="stroke-[2.3] transition-transform duration-200 ease-out absolute -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 text-white"
                          />
                        )}
                      </div>
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
              <div className="flex items-center justify-between mb-3 px-1 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleBackToCategories}
                    aria-label="Back to all categories"
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-white bg-gradient-to-r from-[#FF6B2C] via-[#FF5812] to-[#E64A09] hover:from-[#FF5812] hover:to-[#D92C00] py-1.5 px-3.5 rounded-full shadow-[0_2px_8px_rgba(255,88,18,0.25)] hover:shadow-[0_4px_14px_rgba(255,88,18,0.35)] transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <ChevronLeft size={15} className="stroke-[2.5] transition-transform duration-200 group-hover:-translate-x-0.5" />
                    <span>Back to All Categories</span>
                  </button>
                  <span className="h-4 w-px bg-slate-200" />
                  <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.1em] text-slate-700 uppercase bg-slate-100/90 px-2.5 py-0.5 rounded-md border border-slate-200/60">
                    {currentGroup.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200/70 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812]" />
                    <span>{safeIdx + 1} of {availableGroups.length} categories</span>
                  </span>
                  <div className="hidden sm:flex items-center gap-0.5 border border-slate-200/80 rounded-full p-0.5 bg-white shadow-2xs">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous category"
                      className="w-5.5 h-5.5 rounded-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#FF5812] transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={12} className="stroke-[2.5]" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next category"
                      className="w-5.5 h-5.5 rounded-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#FF5812] transition-colors cursor-pointer"
                    >
                      <ChevronRight size={12} className="stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGroup.title}
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -2 }}
                  transition={{ duration: 0.08, ease: "easeOut" }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-1.5 xl:gap-2"
                >
                  {serviceLinks.map((link) => {
                    const LinkIcon = link.icon || Bot;
                    return (
                      <Link
                        key={link.label}
                        href={link.url}
                        prefetch={false}
                        onClick={onClose}
                        className="group relative flex items-center justify-between py-2 px-2.5 xl:py-2.5 xl:px-3 rounded-lg border border-slate-100 bg-white hover:border-[#FF5812]/30 hover:bg-slate-50/70 hover:shadow-[0_2px_8px_rgba(255,88,18,0.06)] transition-all duration-150"
                      >
                        <div className="flex items-center gap-2.5 xl:gap-3 min-w-0 pr-1.5 flex-1">
                          {/* Solid Orange-Red Gradient Icon Badge */}
                          <div className="relative w-8 h-8 xl:w-8.5 xl:h-8.5 rounded-lg bg-gradient-to-br from-[#FF6B2C] via-[#FF5812] to-[#D92C00] text-white shadow-[0_2px_6px_rgba(255,88,18,0.22)] group-hover:scale-105 flex items-center justify-center shrink-0 transition-all duration-150">
                            <LinkIcon size={17} className="stroke-[2.2] transition-transform duration-150" />
                          </div>

                          {/* Title & Description */}
                          <div className="min-w-0 flex-1">
                            <span className="text-[12.5px] xl:text-[13px] font-bold text-[#0f172a] group-hover:text-[#FF5812] transition-colors block leading-tight">
                              {link.label}
                            </span>
                            {link.description && (
                              <span className="text-[12px] xl:text-[12.5px] text-slate-500 group-hover:text-slate-600 block leading-[1.3] mt-0.5 font-normal line-clamp-1">
                                {link.description}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Premium Diagonal Arrow Badge with Glide Animation */}
                        <div className="relative w-6 h-6 xl:w-6.5 xl:h-6.5 rounded-full flex items-center justify-center shrink-0 border border-[#FF5812]/15 bg-[#FF5812]/[0.06] text-[#FF5812]/75 group-hover:bg-[#FF5812] group-hover:border-[#FF5812] group-hover:text-white group-hover:shadow-[0_2px_8px_rgba(255,88,18,0.35)] overflow-hidden transition-all duration-200 ml-1.5">
                          <ArrowUpRight
                            size={13}
                            className="stroke-[2.3] transition-transform duration-200 ease-out absolute group-hover:translate-x-4 group-hover:-translate-y-4"
                          />
                          <ArrowUpRight
                            size={13}
                            className="stroke-[2.3] transition-transform duration-200 ease-out absolute -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 text-white"
                          />
                        </div>
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
        <div className="w-full lg:w-[250px] xl:w-[270px] shrink-0 flex flex-col">
          <div className="text-[10.5px] font-bold tracking-[0.14em] text-slate-400 uppercase mb-2 px-1">
            FEATURED
          </div>

          <div className="relative flex-1 min-h-[260px] rounded-xl overflow-hidden group shadow-sm flex flex-col justify-end p-3.5 xl:p-4 text-white">
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
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -2 }}
                transition={{ duration: 0.08, ease: "easeOut" }}
                className="relative z-10 flex flex-col"
              >
                <span className="text-[10px] font-extrabold tracking-widest text-[#FF5812] uppercase mb-0.5 drop-shadow">
                  {meta.featuredEyebrow}
                </span>
                <h4 className="text-[14.5px] xl:text-[15.5px] font-extrabold leading-snug text-white mb-1">
                  {meta.featuredHeading}
                </h4>
                <p className="text-[11.5px] xl:text-[12px] text-slate-200 leading-normal mb-2.5 font-normal line-clamp-2">
                  {meta.featuredDescription}
                </p>
                <Link
                  href={meta.featuredCtaUrl}
                  prefetch={false}
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-[11.5px] py-2 px-3 shadow-md transition-all group/btn"
                >
                  <span>{meta.featuredCtaText}</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-150 group-hover/btn:translate-x-1 text-[#FF5812]" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


