"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Layers,
  Workflow,
  BarChart3,
  Globe,
  Database,
  Bot,
  AlertTriangle,
  Cpu,
  CheckCircle2,
  TrendingUp,
  Zap,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StackItem {
  num: string;
  serviceTag: string;
  title: string;
  titleSplit: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
  highlightMetric: string;
  highlightLabel: string;
  coreCapabilities: string[];
  challenge: {
    title: string;
    description: string;
    points: string[];
  };
  approach: {
    title: string;
    description: string;
    points: string[];
  };
  outcome: {
    metric: string;
    metricLabel: string;
    resultText: string;
    tags: string[];
  };
  techBadges: string[];
  bg: string;
  text: string;
  accent: string;
  isLight: boolean;
  link: string;
}

const items: StackItem[] = [
  {
    num: "01",
    serviceTag: "POWER APPS MODERNIZATION",
    title: "Custom Power Apps Development",
    titleSplit: "Custom Power Apps<br /><span class=\"text-[#FF6B2C]\">Development &amp; Modernization</span>",
    icon: Layers,
    desc: "Engineer responsive Canvas and Model-Driven Microsoft Power Apps that replace error-prone spreadsheets, accelerate multi-department approvals, and connect seamlessly with your enterprise data.",
    highlightMetric: "70% Faster",
    highlightLabel: "Cycle times across field and back-office operations",
    coreCapabilities: [
      "Canvas apps with responsive UI/UX and offline data caching",
      "Model-Driven apps built on structured Microsoft Dataverse schemas",
      "Custom REST connectors for legacy ERPs, SQL & third-party APIs",
      "Role-based access control (RBAC) and enterprise DLP policy compliance",
    ],
    challenge: {
      title: "Manual Spreadsheets & Workflow Bottlenecks",
      description: "Critical business processes trapped in unmanaged Excel trackers, causing double-entry errors, lost audit trails, and multi-day approval delays.",
      points: ["Disconnected Excel trackers", "Multi-day approval lag", "Zero mobile access"],
    },
    approach: {
      title: "Enterprise Canvas & Model-Driven Architecture",
      description: "We design role-based Power Apps backed by Microsoft Dataverse, custom REST connectors, offline sync, and intuitive user experiences for web and mobile.",
      points: ["Custom Canvas UI/UX", "Dataverse CDM Schemas", "Role-Based Security (RBAC)"],
    },
    outcome: {
      metric: "70% Faster",
      metricLabel: "Process Turnaround",
      resultText: "Eliminated paper/spreadsheet dependencies with centralized audit trails, automated validation, and real-time operational visibility.",
      tags: ["100% Paperless", "Live Audit Trail", "Multi-Device Sync"],
    },
    techBadges: ["Canvas Apps", "Model-Driven", "Dataverse", "Custom Connectors", "Offline Sync"],
    bg: "#0A0D14",
    text: "#ffffff",
    accent: "#FF6B00",
    isLight: false,
    link: "/contact",
  },
  {
    num: "02",
    serviceTag: "ENTERPRISE AUTOMATION & RPA",
    title: "Power Automate & Enterprise RPA Workflows",
    titleSplit: "Power Automate<br /><span class=\"text-[#FF6B2C]\">&amp; Enterprise RPA Pipelines</span>",
    icon: Workflow,
    desc: "Eliminate repetitive manual handoffs and multi-system data entry by building resilient Cloud Flows, Desktop RPA bots, and AI Builder document extraction pipelines.",
    highlightMetric: "85% Reduction",
    highlightLabel: "In repetitive manual data processing effort",
    coreCapabilities: [
      "Multi-stage automated Cloud Flows with automated error handling & retries",
      "Desktop RPA bots for unattended legacy application data entry",
      "AI Builder document intelligence for invoice & receipt OCR extraction",
      "Native Microsoft Teams and Outlook actionable approval adaptive cards",
    ],
    challenge: {
      title: "Costly Human Handoffs & Repetitive Data Entry",
      description: "Employees lose hours re-entering invoice data, routing customer documents, and chasing approvals across disconnected legacy ERPs and email threads.",
      points: ["Manual invoice transcription", "Delayed cross-system sync", "Frequent human data errors"],
    },
    approach: {
      title: "Cloud Flows, RPA & AI Builder Document Intelligence",
      description: "We build self-healing multi-stage workflows with automated exception handling, AI Builder OCR extraction, and deep Microsoft 365 / Teams integrations.",
      points: ["Multi-Stage Cloud Flows", "AI Builder OCR Extraction", "Desktop RPA Bot Scripts"],
    },
    outcome: {
      metric: "85% Saved",
      metricLabel: "Manual Handling Time",
      resultText: "Sub-minute approvals delivered straight to Microsoft Teams and Outlook with 99.8% automated document processing accuracy.",
      tags: ["Sub-Minute Approvals", "Zero Transcription Errors", "24/7 Unattended RPA"],
    },
    techBadges: ["Cloud Flows", "Desktop RPA", "AI Builder OCR", "Teams Adaptive Cards", "REST Webhooks"],
    bg: "#0E1424",
    text: "#ffffff",
    accent: "#FF6B2C",
    isLight: false,
    link: "/contact",
  },
  {
    num: "03",
    serviceTag: "BUSINESS INTELLIGENCE & FABRIC",
    title: "Enterprise Power BI & Analytics Solutions",
    titleSplit: "Enterprise Power BI<br /><span class=\"text-[#FF6B2C]\">&amp; Advanced Analytics</span>",
    icon: BarChart3,
    desc: "Transform disparate enterprise databases and spreadsheets into interactive, real-time executive dashboards with tuned DAX modeling, Row-Level Security, and Microsoft Fabric integration.",
    highlightMetric: "Sub-Second",
    highlightLabel: "Query response on enterprise semantic datasets",
    coreCapabilities: [
      "High-performance DAX modeling and star-schema semantic data layers",
      "Sub-second executive dashboards with Direct Lake & Microsoft Fabric",
      "Granular Row-Level Security (RLS) and compliance-ready data governance",
      "Automated scheduled refreshes and cross-department KPI centralization",
    ],
    challenge: {
      title: "Fragmented Data Silos & Stale Reporting",
      description: "Decision-makers operate with lagging weekly spreadsheets, conflicting department metrics, and slow, un-optimized legacy BI reports.",
      points: ["Conflicting departmental KPIs", "Multi-day report generation", "Slow DAX query response"],
    },
    approach: {
      title: "Scalable Semantic Modeling & Fabric Architecture",
      description: "We architect star-schema semantic models, tune complex DAX measures, configure granular Row-Level Security (RLS), and integrate Direct Lake with Microsoft Fabric.",
      points: ["Optimized Star Schemas", "Executive KPI Dashboards", "Granular Row-Level Security"],
    },
    outcome: {
      metric: "< 1 Sec",
      metricLabel: "Dashboard Response",
      resultText: "Delivered a single source of truth with automated daily data refreshes and secure self-service analytics for enterprise leadership.",
      tags: ["Unified Single Source", "Automated Daily Refresh", "Enterprise RLS"],
    },
    techBadges: ["Power BI Service", "DAX Optimization", "Semantic Modeling", "Row-Level Security (RLS)", "Microsoft Fabric"],
    bg: "#111827",
    text: "#ffffff",
    accent: "#F59E0B",
    isLight: false,
    link: "/contact",
  },
  {
    num: "04",
    serviceTag: "SECURE EXTERNAL PORTALS",
    title: "Power Pages & Customer/Partner Portals",
    titleSplit: "Power Pages &amp;<br /><span class=\"text-[#FF6B2C]\">Secure External Portals</span>",
    icon: Globe,
    desc: "Deploy custom-branded, highly secure customer, partner, and vendor self-service web portals seamlessly unified with Microsoft Dataverse and Microsoft Entra ID authentication.",
    highlightMetric: "60% Lower Cost",
    highlightLabel: "Compared to custom ground-up portal development",
    coreCapabilities: [
      "Custom-branded Liquid web templates with responsive mobile UX",
      "Microsoft Entra ID & Azure AD B2C federated user authentication",
      "Granular Dataverse table permissions & encrypted data exchanges",
      "24/7 self-service case submission, order tracking & vendor workflows",
    ],
    challenge: {
      title: "Insecure Communication & Heavy Support Overhead",
      description: "External partners and clients face delayed email interactions, lack of real-time ticket visibility, and high costs of building custom standalone web portals.",
      points: ["Unsecured email document sharing", "Support ticket backlogs", "High custom portal build costs"],
    },
    approach: {
      title: "Enterprise Power Pages with Entra ID / B2C Auth",
      description: "We develop responsive Liquid templates, configure strict table permissions, and integrate Azure AD B2C / Microsoft Entra ID federated identity directly to Dataverse.",
      points: ["Custom Liquid Web Templates", "Entra ID / B2C Federation", "Dataverse Table Permissions"],
    },
    outcome: {
      metric: "60% Savings",
      metricLabel: "Build & Maintenance Cost",
      resultText: "24/7 automated client self-service with SOC 2 & GDPR compliant data boundaries and zero per-user external licensing friction.",
      tags: ["24/7 Self-Service", "Zero External License Friction", "SOC 2 & GDPR Aligned"],
    },
    techBadges: ["Power Pages", "Entra ID / Azure B2C", "Liquid Templates", "Table Permissions", "Dataverse Sync"],
    bg: "#090D16",
    text: "#ffffff",
    accent: "#FF7A00",
    isLight: false,
    link: "/contact",
  },
  {
    num: "05",
    serviceTag: "ENTERPRISE DATA ARCHITECTURE",
    title: "Microsoft Dataverse & CDM Architecture",
    titleSplit: "Microsoft Dataverse<br /><span class=\"text-[#FF6B2C]\">&amp; Common Data Model</span>",
    icon: Database,
    desc: "Architect scalable, normalized enterprise data layers using Microsoft Dataverse with Common Data Model (CDM) standards, strict DLP governance, and automated CI/CD ALM pipelines.",
    highlightMetric: "99.9% Consistency",
    highlightLabel: "Across interconnected business apps & data sources",
    coreCapabilities: [
      "Normalized Common Data Model (CDM) entity architecture & relations",
      "Tenant-wide Data Loss Prevention (DLP) & environment boundary controls",
      "Azure DevOps CI/CD pipelines for automated ALM solution releases",
      "Automated Dataflows ETL pipelines & Azure Synapse data synchronization",
    ],
    challenge: {
      title: "Data Duplication & Uncontrolled App Sprawl",
      description: "Rapid low-code adoption creates unmanaged database sprawl, duplicate entity records, weak Data Loss Prevention (DLP), and risky manual deployments.",
      points: ["Duplicate database records", "Unregulated connector sprawl", "Risky manual releases"],
    },
    approach: {
      title: "Normalized CDM Schemas & Azure DevOps ALM",
      description: "We design normalized Dataverse relational models, implement tenant-wide DLP security policies, and configure automated Azure DevOps solution packaging.",
      points: ["Normalized CDM Schemas", "Enterprise DLP Policy Rules", "Azure DevOps ALM Pipelines"],
    },
    outcome: {
      metric: "99.9%",
      metricLabel: "Data Consistency",
      resultText: "Unified relational schema across all business apps with automated multi-environment deployments and enterprise security compliance.",
      tags: ["Enterprise DLP Enforced", "Automated CI/CD ALM", "Zero Data Redundancy"],
    },
    techBadges: ["Dataverse Architecture", "Common Data Model (CDM)", "DLP Governance", "Azure DevOps ALM", "Dataflows ETL"],
    bg: "#13111C",
    text: "#ffffff",
    accent: "#FF6B00",
    isLight: false,
    link: "/contact",
  },
  {
    num: "06",
    serviceTag: "AGENTIC AI & COPILOT STUDIO",
    title: "Microsoft Copilot Studio & Generative AI Agents",
    titleSplit: "Copilot Studio &amp;<br /><span class=\"text-[#FF6B2C]\">Enterprise AI Agents</span>",
    icon: Bot,
    desc: "Empower your teams and customers with autonomous AI copilots built on Microsoft Copilot Studio, grounded in enterprise Dataverse, SharePoint, and custom API plugins.",
    highlightMetric: "50%+ Deflection",
    highlightLabel: "Of tier-1 internal & customer support inquiries",
    coreCapabilities: [
      "Semantic RAG agents grounded in SharePoint, Dataverse & enterprise docs",
      "Autonomous action triggers via custom Power Platform & REST API plugins",
      "Enterprise generative AI answers with verifiable citations & guardrails",
      "Multi-channel deployment across Microsoft Teams, portals & custom apps",
    ],
    challenge: {
      title: "Knowledge Locked in Silos & High Support Load",
      description: "Employees and customers waste time hunting through dense SharePoint docs and SOP PDFs, overwhelming support teams with repetitive queries.",
      points: ["Unstructured PDF & SOP silos", "High support desk escalations", "Slow manual multi-step tasks"],
    },
    approach: {
      title: "Semantic RAG Grounding & Autonomous Copilot Actions",
      description: "We build generative Copilot Studio agents grounded in enterprise knowledge bases with custom Power Automate action plugins and Azure OpenAI models.",
      points: ["Semantic RAG Grounding", "Custom Copilot Action Plugins", "Enterprise Security Guardrails"],
    },
    outcome: {
      metric: "50%+ Deflected",
      metricLabel: "Tier-1 Support Tickets",
      resultText: "Instant, citation-backed answers with autonomous multi-turn workflow execution directly within Microsoft Teams, web portals, and custom apps.",
      tags: ["Citation-Backed Answers", "Automated Action Execution", "Enterprise Guardrails"],
    },
    techBadges: ["Copilot Studio", "Generative Answers", "Enterprise RAG", "Power Platform Plugins", "Azure OpenAI"],
    bg: "#0C1017",
    text: "#ffffff",
    accent: "#FF5722",
    isLight: false,
    link: "/contact",
  },
];

export default function StackedSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const totalTransitions = items.length - 1;

      // Set initial states for all slide cards
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        if (index > 0) {
          gsap.set(card, {
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
            scale: 1,
            opacity: 1,
            transformOrigin: "center center",
            willChange: "clip-path, transform, opacity",
          });
        } else {
          gsap.set(card, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scale: 1,
            opacity: 1,
            transformOrigin: "center center",
            willChange: "transform, opacity",
          });
        }
      });

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalTransitions * 1100}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 1; i < items.length; i++) {
        const prevCard = cardRefs.current[i - 1];
        const currentCard = cardRefs.current[i];

        if (!currentCard) continue;

        const slideTl = gsap.timeline();

        // 1. Wipe in the current card smoothly with power2 easing
        slideTl.fromTo(
          currentCard,
          {
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power2.inOut",
            duration: 1,
          },
          0
        );

        // 2. Add subtle scale and dimming depth to previous card
        if (prevCard) {
          slideTl.to(
            prevCard,
            {
              scale: 0.96,
              opacity: 0.8,
              ease: "power2.inOut",
              duration: 1,
            },
            0
          );
        }

        masterTl.add(slideTl);

        // Rest buffer so each slide lingers comfortably before the next wipe
        if (i < items.length - 1) {
          masterTl.to({}, { duration: 0.25 });
        }
      }

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [items.length] }
  );

  return (
    <>
      {/* Section Header: Microsoft Power Platform Engineering */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-8 sm:pb-12 flex flex-col items-center text-center bg-white">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-4 shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse"></div>
          MICROSOFT POWER PLATFORM ENGINEERING
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          Enterprise Power Platform Capabilities <br className="hidden md:block" />
          <span className="text-[#FF6B2C]">From Challenge to Measurable Outcome</span>
        </h2>

        <p className="text-base sm:text-lg md:text-[1.1rem] leading-relaxed text-slate-600 max-w-3xl mx-auto">
          Explore how Softree engineers end-to-end Microsoft Power Platform solutions across Power Apps, Power Automate, Power BI, Power Pages, Dataverse, and Copilot Studio to resolve critical enterprise bottlenecks and drive high-ROI business outcomes.
        </p>
      </div>

      <section
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden bg-white"
      >
        <div className="absolute inset-0 w-full h-full">
          {items.map((card, i) => {
            const IconComp = card.icon;
            return (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)] max-w-7xl h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)] max-h-[1000px] min-h-[700px] rounded-2xl flex flex-col justify-between text-left p-5 sm:p-7 md:p-8 lg:p-10 shadow-2xl overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden transform-gpu"
                style={{
                  backgroundColor: card.bg,
                  color: card.text,
                  zIndex: i + 1,
                  border: "1px solid rgba(255,255,255,0.1)",
                  willChange: "clip-path, transform, opacity",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                {/* Top Bar / Slide Header */}
                <div className="w-full shrink-0">
                  <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono tracking-wider bg-white/10 text-[#FF6B00] border border-white/10">
                        {card.num} / 06
                      </span>
                      <p className="typo-caption-meta font-bold tracking-widest uppercase opacity-90 text-zinc-300">
                        {card.serviceTag}
                      </p>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase border border-white/15 bg-white/5 text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                      OFFSHORE ENGINEERING &amp; ALM
                    </span>
                  </div>
                  <hr className="w-full border-t border-white/10 mb-4 sm:mb-6" />
                </div>

                {/* Slide Body Grid: Left Summary + Right Challenge/Approach/Outcome Matrix */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 w-full my-auto items-stretch">

                  {/* Left Column: Title, Core Value Proposition & Primary Action */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3.5 mb-4">
                        <div
                          className="p-3 rounded-xl border border-white/15 shadow-lg backdrop-blur-md"
                          style={{
                            backgroundColor: "rgba(255, 107, 0, 0.12)",
                          }}
                        >
                          <IconComp className="w-7 h-7 text-[#FF6B00]" />
                        </div>
                        <span className="text-xs font-mono font-medium text-[#FF6B00] uppercase tracking-wider bg-[#FF6B00]/10 px-2.5 py-1 rounded-md border border-[#FF6B00]/20">
                          {card.title}
                        </span>
                      </div>

                      <h3
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 sm:mb-5 leading-[1.15]"
                        dangerouslySetInnerHTML={{ __html: card.titleSplit }}
                      />

                      <p className="text-sm sm:text-base leading-relaxed text-zinc-300 opacity-90 mb-6">
                        {card.desc}
                      </p>

                      {/* Highlight Metric Card */}
                      <div className="p-4 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md mb-6 flex items-center gap-4">
                        <div className="p-2.5 rounded-lg bg-[#FF6B00]/15 text-[#FF6B00] shrink-0">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                            <span>{card.highlightMetric}</span>

                          </div>
                          <div className="text-xs text-zinc-400 mt-0.5">
                            {card.highlightLabel}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Architectural & Delivery Capabilities Bullet Points */}
                    <div className="pt-3 border-t border-white/10 mt-auto">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B00] mb-2.5">
                        Key Capabilities &amp; Scope
                      </div>
                      <ul className="space-y-2">
                        {card.coreCapabilities.map((point, ptIdx) => (
                          <li
                            key={ptIdx}
                            className="group/item flex items-start gap-3 text-xs sm:text-[13px] text-zinc-300 leading-snug p-1 -mx-1 rounded-md transition-colors hover:bg-white/[0.02]"
                          >
                            <div className="w-4 h-4 rounded-md bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:border-[#FF6B00]/60 group-hover/item:bg-[#FF6B00]/25 transition-all shadow-[0_0_8px_rgba(255,107,0,0.15)]">
                              <svg
                                width="8"
                                height="8"
                                viewBox="0 0 10 10"
                                fill="none"
                                className="text-[#FF6B00]"
                              >
                                <path
                                  d="M2 5L4.2 7.2L8 3"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <span className="group-hover/item:text-white transition-colors">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Advanced Challenge ➔ Approach ➔ Outcome Delivery System */}
                  <div className="lg:col-span-7 flex flex-col justify-center">
                    <div className="relative rounded-2xl border border-white/15 bg-black/40 backdrop-blur-xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4">

                      {/* Ambient Glow */}
                      <div
                        className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
                        style={{ backgroundColor: card.accent }}
                      />

                      {/* 1. CHALLENGE PILLAR (Shade 1: Warm Rust / Terracotta Orange) */}
                      <div className="rounded-xl border border-[#EA580C]/30 bg-[#EA580C]/[0.08] p-3.5 sm:p-4 transition-all hover:border-[#EA580C]/50">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-[#FB923C] shrink-0" />
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FED7AA]">
                              THE ENTERPRISE CHALLENGE
                            </h4>
                          </div>
                          <span className="text-[10px] text-[#FDBA74]/70 font-mono">Bottleneck</span>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-300 font-medium mb-2.5 leading-snug">
                          {card.challenge.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {card.challenge.points.map((p, pIdx) => (
                            <span
                              key={pIdx}
                              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#EA580C]/15 text-[#FED7AA] border border-[#EA580C]/30 flex items-center gap-1.5"
                            >
                              <span className="text-[#FB923C] text-[10px] font-bold">✕</span> {p}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 2. APPROACH PILLAR (Shade 2: Pure Electric / Vivid Orange) */}
                      <div className="rounded-xl border border-[#FF6B00]/35 bg-[#FF6B00]/[0.10] p-3.5 sm:p-4 transition-all hover:border-[#FF6B00]/55">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-[#FF7A00] shrink-0" />
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFA756]">
                              SOFTREE ENGINEERING APPROACH
                            </h4>
                          </div>
                          <span className="text-[10px] text-[#FF8A3D]/70 font-mono">Methodology</span>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-300 font-medium mb-2.5 leading-snug">
                          {card.approach.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {card.approach.points.map((p, pIdx) => (
                            <span
                              key={pIdx}
                              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#FF6B00]/20 text-[#FFEDD5] border border-[#FF6B00]/35 flex items-center gap-1.5"
                            >
                              <Zap className="w-3 h-3 text-[#FF6B00]" />
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 3. OUTCOME PILLAR (Shade 3: Luminous Amber / Warm Glow Orange) */}
                      <div className="rounded-xl border border-[#F97316]/40 bg-[#F97316]/[0.14] p-3.5 sm:p-4 transition-all hover:border-[#F97316]/60 shadow-lg shadow-orange-950/20">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#FED7AA] shrink-0" />
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFF7ED]">
                              DELIVERED BUSINESS OUTCOME
                            </h4>
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#FF6B00]/30 text-[#FFF7ED] text-[10px] font-bold font-mono border border-[#FF6B00]/50">
                            <span>{card.outcome.metric}</span>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-100 font-medium mb-2.5 leading-snug">
                          {card.outcome.resultText}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {card.outcome.tags.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#F97316]/20 text-[#FFF7ED] border border-[#F97316]/40 flex items-center gap-1"
                            >
                              <span className="text-[#FFA756] font-bold">✓</span> {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* SEO Technology Tag Strip */}
                      <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2 text-[11px] text-zinc-400">
                        <span className="font-semibold text-zinc-300 uppercase tracking-wider text-[10px]">
                          Tech Stack:
                        </span>
                        {card.techBadges.map((badge, bIdx) => (
                          <span
                            key={bIdx}
                            className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 font-mono text-[10px]"
                          >
                            #{badge}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

