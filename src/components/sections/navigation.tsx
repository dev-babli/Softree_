/* eslint-disable softree-design/no-untokenized-design-literals */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  SanityNavCategory,
  SanityNavCaseStudyCategory,
} from "@/cms/lib/types";
import { MegaMenuPanel } from "./navigation-mega-menu";

import {
  LayoutDashboard,
  Workflow,
  Server,
  Rocket,
  LineChart,
  Boxes,
  Cpu,
  CloudSnow,
  BrainCircuit,
  ShieldCheck,
  Sparkles,
  Bot,
  WandSparkles,
  Building2,
  Code2,
  Globe2,
  Smartphone,
  Layers,
  FileText,
  Brain,
  Lightbulb,
  Database,
  Link2,
  Network,
  HeartPulse,
  Landmark,
  Factory,
  Truck,
  ShoppingBag,
  MapPin,
  RefreshCw,
  ScanText,
  Grid2X2,
  BarChart3,
  CloudUpload,
  Users,
} from "lucide-react";

type MenuLink = {
  label: string;
  url: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  description?: string;
  group?: string;
};

type MenuGroup = {
  title: string;
  url?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  description?: string;
  links: MenuLink[];
};

type MenuItem = {
  label: string;
  url?: string;
  mega?: boolean;
  children?: MenuGroup[];
};

const CLOSE_DELAY_MS = 220;

const menu: MenuItem[] = [
  { label: "About", url: "/about-us" },
  { label: "Who Do We Serve", url: "/who-do-we-serve" },
  { label: "Global Partners", url: "/global-partners" },
  {
    label: "Services",
    mega: true,
    children: [
      {
        title: "AI & Automation",
        icon: BrainCircuit,
        description: "Build intelligent agents, automate workflows and unlock AI-powered business innovation.",
        links: [
          { label: "AI Development Services", url: "/services/ai-development-services", icon: Brain, description: "Custom GenAI models, predictive algorithms & enterprise AI solutions" },
          { label: "AI Copilot Development", url: "/solutions/ai-copilot-development", icon: WandSparkles, description: "Context-aware AI copilots embedded directly into employee workflows" },
          { label: "Generative AI Development", url: "/services/generative-ai", icon: Sparkles, description: "Production LLM applications with fine-tuning & safety guardrails" },
          { label: "Enterprise RAG Development", url: "/solutions/enterprise-rag-development", icon: Database, description: "Secure Retrieval-Augmented Generation with hybrid vector search" },
          { label: "AI Consulting Services", url: "/services/ai-consulting-services", icon: Lightbulb, description: "Strategic AI roadmaps, technical feasibility & deployment advisory" },
          { label: "AI Chatbot Development", url: "/solutions/ai-chatbot-development", icon: Bot, description: "Contextual conversational assistants with omni-channel integration" },
          { label: "Amazon Bedrock AgentCore Development", url: "/services/amazon-bedrock-agentcore-development", icon: Bot, description: "Scalable generative AI agents deployed on enterprise AWS Bedrock" },
          { label: "Amazon Nova 2 Sonic Solutions", url: "/services/amazon-nova-2-sonic-solutions", icon: BrainCircuit, description: "Ultra-low latency voice intelligence & conversational speech AI" }
        ],
      },
      {
        title: "Agentic Orchestration",
        icon: Workflow,
        description: "Build stateful multi-agent workflows, autonomous agent networks and complex chain-of-thought LLM pipelines.",
        links: [
          { label: "AI Agents Development", url: "/solutions/ai-agents-development", icon: Bot, description: "Autonomous reasoning agents executing complex multi-step workflows" },
          { label: "Multi-Agent Systems", url: "/solutions/multi-agent-systems", icon: BrainCircuit, description: "Collaborative multi-agent networks coordinating across business domains" },
          { label: "LangChain Development", url: "/solutions/lang-chain-development", icon: Link2, description: "Production LLM pipelines with structured outputs, tools & memory" },
          { label: "LangGraph Development", url: "/solutions/lang-graph-development", icon: Network, description: "Stateful agent graphs, cyclical workflows & human-in-the-loop logic" },
        ],
      },
      {
        title: "Microsoft & Business Applications",
        icon: Grid2X2,
        description: "Optimize operations and accelerate growth with enterprise-grade business applications built on Power Platform.",
        links: [
          { label: "Power Apps", url: "/services/offshore-power-platform-development", icon: LayoutDashboard, description: "Custom low-code business applications connected to Dataverse & M365" },
          { label: "Power Automate", url: "/services/offshore-power-platform-development", icon: Workflow, description: "Robotic process automation (RPA) & end-to-end cloud workflow integration" },
          { label: "Dataverse", url: "/services/offshore-power-platform-development", icon: Server, description: "Unified, secure enterprise data architecture for Microsoft 365" },
        ],
      },
      {
        title: "Data & Analytics",
        icon: BarChart3,
        description: "Transform raw data into actionable intelligence and drive decision-making with modern analytics platforms.",
        links: [
          { label: "Power BI", url: "/services/power-bi-development-services", icon: LineChart, description: "Executive dashboards, KPI telemetry & interactive business analytics" },
          { label: "Microsoft Fabric", url: "/services/microsoft-fabric-development-services", icon: Boxes, description: "Unified OneLake analytics, lakehouse architecture & real-time compute" },
          { label: "Databricks", url: "/services/power-bi-development-services", icon: Cpu, description: "High-performance Apache Spark data engineering & production ML pipelines" },
          { label: "Snowflake", url: "/services/power-bi-development-services", icon: CloudSnow, description: "Elastic cloud data warehousing, data mesh & secure enterprise sharing" },
        ],
      },
      {
        title: "Digital Engineering",
        icon: Code2,
        description: "Build high-performance web applications, robust APIs, and custom software systems tailored to your business operations.",
        links: [
          { label: "Web Applications", url: "/services/offshore-web-app-development", icon: Globe2, description: "High-concurrency React/Next.js portals with cloud-native backends" },
          { label: "Mobile Applications", url: "/services/offshore-mobile-app-development", icon: Smartphone, description: "Feature-rich native iOS & Android applications with fluid interactions" },
          { label: "Legacy Modernization", url: "/services/legacy-application-modernization", icon: Sparkles, description: "Monolith to microservices refactoring & cloud-native modernizations" },
        ],
      },
      {
        title: "Digital Workplace",
        icon: Users,
        description: "Empower your workforce with modern collaboration portals, secure intranets, and customized SharePoint environments.",
        links: [
          { label: "SharePoint Online", url: "/services/offshore-sharepoint-development", icon: Building2, description: "Corporate intranet portals, document management & knowledge repositories" },
          { label: "SPFx Development", url: "/services/offshore-spfx-development", icon: Code2, description: "Custom SharePoint Framework extensions & Microsoft 365 web parts" },
        ]
      },
      {
        title: "Migration & Modernization",
        icon: CloudUpload,
        description: "Modernize legacy platforms, migrate analytics workloads, and build scalable data environments.",
        links: [
          { label: "Tableau Migration Services", url: "/services/tableau-migration-services", icon: LineChart, description: "Frictionless migration from legacy Tableau to modern cloud analytics" },
          { label: "Azure Synapse to Fabric Migration", url: "/services/azure-synapse-to-microsoft-fabric-migration", icon: Server, description: "Modernize dedicated SQL pools and ETL pipelines into Microsoft Fabric" },
          {
            label: "SQL Server to Microsoft Fabric Migration",
            url: "/services/sql-server-to-microsoft-fabric-migration",
            icon: Server,
            description: "Schema and pipeline migration from on-prem SQL to Fabric OneLake",
          },
          {
            label: "Tableau Server to Tableau Cloud Migration",
            url: "/services/tableau-server-to-tableau-cloud-migration",
            icon: LineChart,
            description: "Zero-downtime migration of workbooks, security & permissions to cloud",
          },
          {
            label: "Azure Data Factory to Microsoft Fabric",
            url: "/services/azure-data-factory-to-microsoft-fabric-migration",
            icon: Factory,
            description: "Automate transition of legacy ADF pipelines into Fabric Data Factory",
          },
          {
            label: "Power BI to Microsoft Fabric Migration",
            url: "/services/power-bi-to-microsoft-fabric-migration",
            icon: LineChart,
            description: "Direct Lake mode integration for high-speed enterprise Power BI models",
          }
        ]
      },
      {
        title: "Testing & Quality Engineering",
        icon: ShieldCheck,
        description: "Ensure software quality, security, reliability, and AI performance with end-to-end testing and quality engineering services.",
        links: [
          {
            label: "Automation Testing Services",
            url: "/quality-engineering/automation-testing-services",
            icon: Workflow,
            description: "Continuous automated test suites across web, mobile, API & enterprise apps"
          },
          {
            label: "Security Testing Services",
            url: "/quality-engineering/security-testing-services",
            icon: ShieldCheck,
            description: "Penetration testing, OWASP Top 10 vulnerability assessments & DevSecOps"
          },
          {
            label: "Agentic AI Testing Services",
            url: "/quality-engineering/agentic-ai-testing-services",
            icon: BrainCircuit,
            description: "Testing AI agent hallucinations, drift, prompt injections & guardrails"
          },
          {
            label: "Healthcare Software Testing Services",
            url: "/industries/healthcare-software-testing-services",
            icon: HeartPulse,
            description: "HIPAA/FDA verification, EHR interoperability & digital health compliance QA",
          },
          {
            label: "Logistics Testing Services",
            url: "/quality-engineering/logistics-testing-services",
            icon: Truck,
            description: "Comprehensive testing across TMS, WMS, EDI protocols & fleet logistics",
          },
        ],
      },
      {
        title: "Document & Process Intelligence",
        icon: ScanText,
        description: "Extract value from unstructured documents and orchestrate complex workflows using advanced Document AI and process mining.",
        links: [
          { label: "Document AI Solutions", url: "/solutions/document-ai-solutions", icon: FileText, description: "Automated OCR extraction from unstructured PDFs, invoices & contracts" },
          { label: "Azure OpenAI Solutions", url: "/solutions/azure-openai-development", icon: Sparkles, description: "Private, enterprise-grade GPT-4 integrations on dedicated Azure cloud" },
        ],
      },


    ],
  },
  {
    label: "Industries",
    mega: true,
    children: [
      {
        title: "Healthcare",
        icon: HeartPulse,
        description: "Intelligent clinical copilots, medical document AI, and next-generation healthcare digital platforms.",
        links: [
          {
            label: "Healthcare AI Solutions",
            url: "/industries/healthcare-ai-solutions",
            icon: HeartPulse,
            description: "Clinical copilots, medical document AI & patient engagement platforms",
          },
          {
            label: "Healthcare Software Testing Services",
            url: "/industries/healthcare-software-testing-services",
            icon: HeartPulse,
            description: "HIPAA-compliant software validation, EHR integration testing & security",
          },
        ],
      },
      {
        title: "Logistics & Supply Chain",
        icon: Truck,
        description: "AI-driven route optimization, warehouse automation, document processing, and supply chain intelligence.",
        links: [
          {
            label: "Logistics Engineering Excellence",
            url: "/industries/offshore-logistics-supply-chain-engineering",
            icon: Truck,
            description: "AI route optimization, real-time tracking & warehouse software solutions",
          },
        ],
      },
    ],
  },

  { label: "Case Studies", url: "/case-studies", mega: true, children: [] },
  { label: "Blog", url: "/blog" },
  { label: "Careers", url: "/careers" },
];

function buildBlogChildren(blogCategories: SanityNavCategory[]): MenuGroup[] {
  return blogCategories
    .filter((c) => c.posts?.length)
    .slice(0, 4)
    .map((cat) => ({
      title: cat.title,
      url: `/blog?category=${encodeURIComponent(cat.title.toLowerCase().trim().replace(/\s+/g, '-'))}`,
      description: `Latest in ${cat.title.toLowerCase()}`,
      links: cat.posts.map((post) => {
        const cleanedTitle = post.title.replace(/^\d+\s+Best\s+/i, "").replace(/^Best\s+/i, "");
        return {
          label: cleanedTitle,
          url: `/blog/${post.slug.current}`,
          icon: FileText,
          description: post.excerpt || "",
        };
      }),
    }));
}

const CASE_STUDY_TECH_MAP: Record<string, string> = {
  "Power Platform": "power-platform",
  "SharePoint": "sharepoint",
  "Data & Analytics": "data-analytics",
  "Web": "web",
  "Mobile": "mobile",
  "AI": "ai",
};

function buildCaseStudyChildren(
  caseStudyCategories: SanityNavCaseStudyCategory[],
): MenuGroup[] {
  return caseStudyCategories
    .filter((c) => c.links?.length)
    .slice(0, 4)
    .map((cat) => ({
      title: cat.title,
      description: cat.description,
      links: cat.links.map((link) => {
        const techKey = CASE_STUDY_TECH_MAP[link.label];
        const targetUrl = techKey ? `/case-studies?tech=${techKey}` : link.href;
        return {
          label: link.label,
          url: targetUrl,
          icon: Layers,
          description: link.description,
        };
      }),
    }));
}

// Fallback stub for HMR cache safety
const TubelightGlow = () => null;

export default function Navigation({
  blogCategories = [],
  caseStudyCategories = [],
}: {
  blogCategories?: SanityNavCategory[];
  caseStudyCategories?: SanityNavCaseStudyCategory[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  const isItemActive = useCallback(
    (url?: string) => {
      if (!url || !pathname) return false;
      if (url === "/") return pathname === "/";
      return pathname.startsWith(url);
    },
    [pathname]
  );

  const dynamicMenu = useMemo(() => {
    const caseStudyChildren = buildCaseStudyChildren(caseStudyCategories);

    return menu.map((item) => {
      if (item.label === "Case Studies" && caseStudyChildren.length > 0) {
        return { ...item, children: caseStudyChildren };
      }
      return item;
    });
  }, [caseStudyCategories]);

  const activeItem = useMemo(() => {
    if (open) return open;
    const match = dynamicMenu.find((item) => isItemActive(item.url));
    return match?.label || null;
  }, [open, dynamicMenu, isItemActive]);

  const highlightedItem = hoveredItem ?? activeItem;

  const activeMegaItem = useMemo(
    () => dynamicMenu.find((i) => i.label === open && i.mega) ?? null,
    [dynamicMenu, open],
  );

  const hasMegaContent = (activeMegaItem?.children?.length ?? 0) > 0;

  const lastMegaItemRef = useRef<MenuItem | null>(null);
  if (activeMegaItem) {
    lastMegaItemRef.current = activeMegaItem;
  }
  const renderedMegaItem = activeMegaItem || lastMegaItemRef.current;

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openMenu = useCallback(
    (label: string) => {
      clearCloseTimer();
      setOpen(label);
    },
    [clearCloseTimer],
  );

  const closeMenu = useCallback(() => {
    clearCloseTimer();
    setOpen(null);
  }, [clearCloseTimer]);

  const scheduleCloseMenu = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      setOpen(null);
      setHoveredItem(null);
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  useEffect(() => {
    let ticking = false;
    const SCROLL_THRESHOLD = 8; // Ignore micro-jitters (< 8px)

    const onScroll = () => {
      if (mobileOpen) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          const diff = y - lastScrollY.current;

          if (y < 40) {
            setShowNav(true);
          } else if (Math.abs(diff) >= SCROLL_THRESHOLD) {
            if (diff < 0) {
              // Scrolling up
              setShowNav(true);
            } else {
              // Scrolling down
              setShowNav(false);
              setOpen(null);
            }
            lastScrollY.current = y;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${showNav ? "translate-y-0" : "-translate-y-full"
          }`}
        aria-hidden={!showNav}
        inert={!showNav ? true : undefined}
        onMouseLeave={() => {
          setHoveredItem(null);
          scheduleCloseMenu();
        }}
      >
        <div className="mx-auto max-w-[1440px] px-3 sm:px-5 pt-2.5 lg:px-6 xl:px-8">
          <nav className="relative flex h-[64px] items-center justify-between rounded-2xl border border-black/[0.06] bg-white/95 px-3 shadow-[0_8px_32px_-10px_rgba(10,10,26,0.12)] backdrop-blur-xl lg:px-4 xl:px-6">
            <Link
              href="/"
              prefetch={true}
              onMouseEnter={() => {
                setHoveredItem(null);
                closeMenu();
              }}
              className="inline-flex min-h-11 shrink-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/45"
            >
              <img
                src="/logo/Softree-Technology-Final-Logo.png"
                alt="Softree"
                className="h-7 lg:h-8 xl:h-[34px] w-auto shrink-0"
              />
            </Link>

            <div
              className="hidden items-center gap-0 lg:flex shrink-0"
              onMouseLeave={() => setHoveredItem(null)}
            >
              {dynamicMenu.map((item) => {
                const isSelected = highlightedItem === item.label;

                if (!item.mega) {
                  return (
                    <Link
                      key={item.label}
                      href={item.url || "#"}
                      prefetch={true}
                      onMouseEnter={() => {
                        setHoveredItem(item.label);
                        closeMenu();
                      }}
                      className={cn(
                        "group relative cursor-pointer inline-flex min-h-11 items-center rounded-full px-2 lg:px-2.5 xl:px-3 2xl:px-3.5 py-2 typo-nav-link text-xs lg:text-[13px] xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/45",
                        isSelected
                          ? "text-[#FF5812]"
                          : "text-[#0a0a1a]/70 hover:text-[#0a0a1a]"
                      )}
                    >
                      <span className="whitespace-nowrap">{item.label}</span>
                      {isSelected && (
                        <motion.div
                          layoutId="navLampIndicator"
                          className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#FF5812] rounded-full transform-gpu"
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 450, damping: 32 }
                          }
                        />
                      )}
                    </Link>
                  );
                }

                const isOpen = open === item.label;
                const canOpen = (item.children?.length ?? 0) > 0;

                return (
                  <div
                    key={item.label}
                    onMouseEnter={() => {
                      setHoveredItem(item.label);
                      if (canOpen) openMenu(item.label);
                    }}
                  >
                    {item.url ? (
                      <Link
                        href={item.url}
                        prefetch={true}
                        aria-expanded={isOpen}
                        aria-haspopup={canOpen ? "true" : undefined}
                        onFocus={() => {
                          setHoveredItem(item.label);
                          if (canOpen) openMenu(item.label);
                        }}
                        className={cn(
                          "group relative cursor-pointer inline-flex min-h-11 items-center gap-1 rounded-full px-2 lg:px-2.5 xl:px-3 2xl:px-3.5 py-2 typo-nav-link text-xs lg:text-[13px] xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/45",
                          isSelected
                            ? "text-[#FF5812]"
                            : "text-[#0a0a1a]/70 hover:text-[#0a0a1a]"
                        )}
                      >
                        <span className="whitespace-nowrap">{item.label}</span>
                        {canOpen && (
                          <ChevronDown
                            size={14}
                            className={cn(
                              "transition-transform duration-150 shrink-0",
                              isOpen
                                ? "rotate-180 text-[#FF5812]"
                                : isSelected
                                  ? "text-[#FF5812]"
                                  : "text-[#0a0a1a]/30 group-hover:text-[#0a0a1a]"
                            )}
                          />
                        )}
                        {isSelected && (
                          <motion.div
                            layoutId="navLampIndicator"
                            className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#FF5812] rounded-full transform-gpu"
                            transition={
                              reduceMotion
                                ? { duration: 0 }
                                : { type: "spring", stiffness: 450, damping: 32 }
                            }
                          />
                        )}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-haspopup={canOpen ? "true" : undefined}
                        onClick={() => (isOpen ? closeMenu() : openMenu(item.label))}
                        onFocus={() => {
                          setHoveredItem(item.label);
                          if (canOpen) openMenu(item.label);
                        }}
                        className={cn(
                          "group relative cursor-pointer inline-flex min-h-11 items-center gap-1 rounded-full px-2 lg:px-2.5 xl:px-3 2xl:px-3.5 py-2 typo-nav-link text-xs lg:text-[13px] xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/45",
                          isSelected
                            ? "text-[#FF5812]"
                            : "text-[#0a0a1a]/70 hover:text-[#0a0a1a]"
                        )}
                      >
                        <span className="whitespace-nowrap">{item.label}</span>
                        {canOpen && (
                          <ChevronDown
                            size={14}
                            className={cn(
                              "transition-transform duration-150 shrink-0",
                              isOpen
                                ? "rotate-180 text-[#FF5812]"
                                : isSelected
                                  ? "text-[#FF5812]"
                                  : "text-[#0a0a1a]/30 group-hover:text-[#0a0a1a]"
                            )}
                          />
                        )}
                        {isSelected && (
                          <motion.div
                            layoutId="navLampIndicator"
                            className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#FF5812] rounded-full transform-gpu"
                            transition={
                              reduceMotion
                                ? { duration: 0 }
                                : { type: "spring", stiffness: 450, damping: 32 }
                            }
                          />
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div
              className="hidden items-center gap-2 lg:flex shrink-0"
              onMouseEnter={() => {
                setHoveredItem(null);
                closeMenu();
              }}
            >
              <Link
                href="/contact"
                prefetch={true}
                className="inline-flex min-h-11 items-center rounded-full bg-[#FF5812] px-4 xl:px-5 py-2.5 typo-button-sm text-xs xl:text-sm text-white whitespace-nowrap shrink-0 shadow-[0_4px_14px_rgba(255,88,18,0.3)] transition-[transform,box-shadow] duration-150 hover:shadow-[0_6px_18px_rgba(255,88,18,0.36)] active:scale-[0.97]"
              >
                Schedule a Call
              </Link>
            </div>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-lg text-[#0a0a1a] hover:bg-[#F3F0EE] transition-colors duration-150 lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>

          {/* Mega menu — left-rail layout via MegaMenuPanel */}
          <div
            className="relative hidden lg:block"
            onMouseEnter={clearCloseTimer}
            aria-hidden={!hasMegaContent}
          >
            <div
              className={`absolute left-0 right-0 top-0 z-40 pt-2 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-[transform,opacity] ${hasMegaContent
                ? "pointer-events-auto opacity-100 translate-y-0"
                : "pointer-events-none opacity-0 -translate-y-2"
                }`}
            >
              {renderedMegaItem?.children && (
                <MegaMenuPanel
                  label={renderedMegaItem.label}
                  groups={renderedMegaItem.children}
                  onClose={closeMenu}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-[#FAFAF9] text-[#0a0a1a] px-5 pb-10 pt-24 lg:hidden"
          >
            <div className="mx-auto max-w-lg">
              {dynamicMenu.map((item) => (
                <div key={item.label} className="border-b border-black/[0.06]">
                  {item.mega && item.children && item.children.length > 0 ? (
                    <div className="flex w-full items-center justify-between">
                      {item.url ? (
                        <Link
                          href={item.url}
                          onClick={() => setMobileOpen(false)}
                          className="flex-1 rounded-lg py-4 typo-body font-semibold text-[#0a0a1a] hover:text-[#FF5812] transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/45"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="flex-1 py-4 typo-body font-semibold text-[#0a0a1a]">
                          {item.label}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setMobileDropdown((d) =>
                            d === item.label ? null : item.label,
                          )
                        }
                        className="p-4 -mr-4 flex items-center justify-center text-[#0a0a1a]/40 hover:text-[#FF5812] transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/45"
                        aria-label={`Toggle ${item.label} dropdown`}
                        aria-expanded={mobileDropdown === item.label}
                        aria-controls={`mobile-nav-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-150 ${mobileDropdown === item.label ? "rotate-180 text-[#FF5812]" : ""
                            }`}
                        />
                      </button>
                    </div>
                  ) : (
                    <Link
                      href={item.url || "#"}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg py-4 typo-body font-semibold text-[#0a0a1a] hover:text-[#FF5812] transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/45"
                    >
                      {item.label}
                    </Link>
                  )}

                  {item.mega && mobileDropdown === item.label && item.children && (
                    <div id={`mobile-nav-${item.label.replace(/\s+/g, "-").toLowerCase()}`} className="flex flex-col gap-5 pl-4 pr-2 pb-6 pt-2">
                      {item.children.map((group, groupIdx) => {
                        const GroupIcon = group.icon;
                        const hasLinks = (group.links?.length ?? 0) > 0;

                        if (group.url && !hasLinks) {
                          return (
                            <div key={groupIdx}>
                              <Link
                                href={group.url}
                                onClick={() => setMobileOpen(false)}
                                className="group flex min-h-11 items-start gap-3 rounded-xl p-2.5 transition-colors duration-100 hover:bg-black/[0.03] active:bg-black/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/45"
                              >
                                {GroupIcon ? (
                                  <GroupIcon
                                    size={18}
                                    className="mt-0.5 shrink-0 text-[#0a0a1a]/30 group-hover:text-[#FF5812]"
                                  />
                                ) : (
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5812]" />
                                )}
                                <div className="flex flex-col min-w-0">
                                  <span className="typo-button-sm font-semibold text-[#0a0a1a] leading-tight group-hover:text-[#FF5812]">
                                    {group.title}
                                  </span>
                                  {group.description && (
                                    <span className="mt-0.5 typo-caption-meta text-[#0a0a1a]/40 leading-snug line-clamp-2">
                                      {group.description}
                                    </span>
                                  )}
                                </div>
                              </Link>
                            </div>
                          );
                        }

                        return (
                          <div key={groupIdx} className="flex flex-col gap-2.5">
                            <div className="flex items-center gap-2">
                              {GroupIcon ? (
                                <GroupIcon
                                  size={14}
                                  className="shrink-0 text-[#0a0a1a]/30"
                                />
                              ) : (
                                <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
                              )}
                              <h4 className="typo-caption-meta font-bold uppercase tracking-[0.15em] text-[#0a0a1a]/45">
                                {group.title}
                              </h4>
                            </div>

                            <ul className="flex flex-col gap-1.5">
                              {group.links.map((link, linkIdx) => {
                                const LinkIcon = link.icon;
                                return (
                                  <li key={linkIdx}>
                                    <Link
                                      href={link.url}
                                      onClick={() => setMobileOpen(false)}
                                      className="group flex min-h-11 items-start gap-3 rounded-xl p-2.5 transition-colors duration-100 hover:bg-black/[0.03] active:bg-black/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/45"
                                    >
                                      {LinkIcon && (
                                        <LinkIcon
                                          size={18}
                                          className="mt-0.5 shrink-0 text-[#0a0a1a]/30 group-hover:text-[#FF5812]"
                                        />
                                      )}
                                      <div className="flex flex-col min-w-0">
                                        <span className="typo-button-sm font-semibold text-[#0a0a1a] leading-tight group-hover:text-[#FF5812]">
                                          {link.label}
                                        </span>
                                        {link.description && (
                                          <span className="mt-0.5 typo-caption-meta text-[#0a0a1a]/40 leading-snug line-clamp-2">
                                            {link.description}
                                          </span>
                                        )}
                                      </div>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-6 flex flex-col gap-2">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-[#FF5812] py-3.5 text-center typo-button text-white shadow-[0_4px_14px_rgba(255,88,18,0.3)] transition-[transform,box-shadow] duration-150 hover:shadow-[0_6px_18px_rgba(255,88,18,0.36)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/45"
                >
                  Schedule a Call
                </Link>
              </div>            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
