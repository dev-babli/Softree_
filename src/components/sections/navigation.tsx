/* eslint-disable softree-design/no-untokenized-design-literals */
"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
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

const CLOSE_DELAY_MS = 280;

const menu: MenuItem[] = [
  { label: "About", url: "/about-us" },
  {
    label: "Services",
    mega: true,
    children: [
      {
        title: "AI & Automation",
        icon: Bot,
        description: "Build intelligent agents, automate workflows and unlock AI-powered business innovation.",
        links: [
          { label: "AI Development Services", url: "/services/ai-development-services", icon: Brain, description: "Custom AI solutions for your business" },
          { label: "AI Copilot Development", url: "/solutions/ai-copilot-development", icon: WandSparkles, description: "Intelligent copilots for productivity" },
          { label: "Generative AI Development", url: "/services/generative-ai", icon: Sparkles, description: "Build smart generative AI applications" },
          { label: "Enterprise RAG Development", url: "/solutions/enterprise-rag-development", icon: Database, description: "Secure knowledge retrieval at scale" },
          { label: "AI Consulting Services", url: "/services/ai-consulting-services", icon: Lightbulb, description: "Strategy, roadmap & implementation" },
          { label: "AI Workflow Automation", url: "/solutions/ai-workflow-automation", icon: Workflow, description: "Automate processes with AI" },
          { label: "AI Chatbot Development", url: "/solutions/ai-chatbot-development", icon: Bot, description: "Conversational AI for better engagement" },
          { label: "AI Test Automation", url: "/services/ai-powered-test-automation", icon: BrainCircuit, description: "Intelligent test automation at speed" },
        ],
      },
      {
        title: "Agentic Orchestration",
        icon: Network,
        description: "Build stateful multi-agent workflows, autonomous agent networks and complex chain-of-thought LLM pipelines.",
        links: [
          { label: "AI Agents Development", url: "/solutions/ai-agents-development", icon: Bot, description: "Autonomous agents for complex tasks" },
          { label: "Multi-Agent Systems", url: "/solutions/multi-agent-systems", icon: BrainCircuit, description: "Orchestrate collaborative agents" },
          { label: "LangChain Development", url: "/solutions/lang-chain-development", icon: Link2, description: "LLM apps with LangChain framework" },
          { label: "LangGraph Development", url: "/solutions/lang-graph-development", icon: Network, description: "Stateful multi-agent workflows" },
        ],
      },
      {
        title: "Document & Process Intelligence",
        icon: FileText,
        description: "Extract value from unstructured documents and orchestrate complex workflows using advanced Document AI and process mining.",
        links: [
          { label: "Document AI Solutions", url: "/solutions/document-ai-solutions", icon: FileText, description: "Automate data extraction from docs" },
          { label: "Azure OpenAI Solutions", url: "/solutions/azure-openai-development", icon: Sparkles, description: "Enterprise Generative AI integrations" },
        ],
      },
      {
        title: "Microsoft & Business Applications",
        icon: LayoutDashboard,
        description: "Optimize operations and accelerate growth with enterprise-grade business applications built on Power Platform.",
        links: [
          { label: "Power Apps", url: "/services/offshore-power-platform-development", icon: LayoutDashboard, description: "Custom low-code business apps" },
          { label: "Power Automate", url: "/services/offshore-power-platform-development", icon: Workflow, description: "Automated workflows and integration" },
          { label: "Dataverse", url: "/services/offshore-power-platform-development", icon: Server, description: "Secure, unified enterprise data layer" },
          { label: "MVP Development", url: "/services/mvp", icon: Rocket, description: "Rapid prototyping and fast-track MVP launch" },
        ],
      },
      {
        title: "Data & Analytics",
        icon: LineChart,
        description: "Transform raw data into actionable intelligence and drive decision-making with modern analytics platforms.",
        links: [
          { label: "Power BI", url: "/services/offshore-data-analytics", icon: LineChart, description: "Interactive executive dashboards" },
          { label: "Microsoft Fabric", url: "/services/offshore-microsoft-fabric", icon: Boxes, description: "All-in-one unified analytics platform" },
          { label: "Databricks", url: "/services/offshore-data-analytics", icon: Cpu, description: "Enterprise machine learning pipelines" },
          { label: "Snowflake", url: "/services/offshore-data-analytics", icon: CloudSnow, description: "Cloud-native data warehousing and sharing" },
        ],
      },
      {
        title: "Digital Engineering",
        icon: Code2,
        description: "Build high-performance web applications, robust APIs, and custom software systems tailored to your business operations.",
        links: [
          { label: "Web Applications", url: "/services/offshore-web-app-development", icon: Globe2, description: "Bespoke web apps and customer portals" },
          { label: "Mobile Applications", url: "/services/offshore-mobile-app-development", icon: Smartphone, description: "Native iOS & Android app development" },
          { label: "Legacy Modernization", url: "/services/legacy-application-modernization", icon: Sparkles, description: "Re-architecting legacy software systems" },
        ],
      },
      {
        title: "Digital Workplace",
        icon: Building2,
        description: "Empower your workforce with modern collaboration portals, secure intranets, and customized SharePoint environments.",
        links: [
          { label: "SharePoint Online", url: "/services/offshore-sharepoint-development", icon: Building2, description: "Intranet portals and document management" },
          { label: "SPFx Development", url: "/services/offshore-spfx-development", icon: Code2, description: "Custom web parts and platform extensions" },
        ]
      },
    ],
  },
  {
    label: "Products",
    mega: true,
    children: [
      {
        title: "AI & Automation",
        icon: Bot,
        description: "Intelligent autonomous tools & agents.",
        links: [
          { label: "AI Growth Intelligence", url: "/webanalyser", icon: Sparkles, description: "AI-Powered Website Intelligence" },
          { label: "GEO", url: "/geo", icon: Globe2, description: "AI Growth Intelligence | AI-Powered Website Intelligence" },
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

export default function Navigation({
  blogCategories = [],
  caseStudyCategories = [],
}: {
  blogCategories?: SanityNavCategory[];
  caseStudyCategories?: SanityNavCaseStudyCategory[];
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  const dynamicMenu = useMemo(() => {
    const caseStudyChildren = buildCaseStudyChildren(caseStudyCategories);

    return menu.map((item) => {
      if (item.label === "Case Studies" && caseStudyChildren.length > 0) {
        return { ...item, children: caseStudyChildren };
      }
      return item;
    });
  }, [caseStudyCategories]);

  const activeMegaItem = useMemo(
    () => dynamicMenu.find((i) => i.label === open && i.mega) ?? null,
    [dynamicMenu, open],
  );

  const hasMegaContent = (activeMegaItem?.children?.length ?? 0) > 0;

  const [renderedMegaItem, setRenderedMegaItem] = useState<MenuItem | null>(null);
  if (activeMegaItem && renderedMegaItem !== activeMegaItem) {
    setRenderedMegaItem(activeMegaItem);
  }

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
    closeTimer.current = setTimeout(() => setOpen(null), CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  useEffect(() => {
    const onScroll = () => {
      if (mobileOpen) return;
      const y = window.scrollY;
      if (y < 20 || y < lastScrollY.current) setShowNav(true);
      else {
        setShowNav(false);
        setOpen(null);
      }
      lastScrollY.current = y;
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
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${showNav ? "translate-y-0" : "-translate-y-full"
          }`}
        aria-hidden={!showNav}
        inert={!showNav ? true : undefined}
        onMouseLeave={scheduleCloseMenu}
      >
        <div className="mx-auto max-w-[1280px] px-5 pt-2.5 lg:px-10">
          <nav className="relative flex h-[64px] items-center justify-between rounded-2xl border border-black/[0.06] bg-white/95 px-4 shadow-[0_8px_32px_-10px_rgba(10,10,26,0.12)] backdrop-blur-xl lg:px-6">
            <Link
              href="/"
              onMouseEnter={closeMenu}
              className="inline-flex min-h-11 shrink-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/45"
            >
              <img
                src="/logo/Softree-Technology-Final-Logo.png"
                alt="Softree"
                className="h-8 w-auto lg:h-[34px]"
              />
            </Link>

            <div className="hidden items-center gap-0.5 lg:flex">
              {dynamicMenu.map((item) => {
                if (!item.mega) {
                  return (
                    <Link
                      key={item.label}
                      href={item.url || "#"}
                      onMouseEnter={closeMenu}
                      className="inline-flex min-h-11 items-center rounded-lg px-3.5 py-2 text-[13px] font-medium text-[#0a0a1a]/60 transition-colors duration-100 hover:bg-[#F3F0EE] hover:text-[#0a0a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/45"
                    >
                      {item.label}
                    </Link>
                  );
                }

                const isOpen = open === item.label;
                const canOpen = (item.children?.length ?? 0) > 0;

                return (
                  <div
                    key={item.label}
                    onMouseEnter={() => canOpen && openMenu(item.label)}
                  >
                    {item.url ? (
                      <Link
                        href={item.url}
                        aria-expanded={isOpen}
                        aria-haspopup={canOpen ? "true" : undefined}
                        onFocus={() => canOpen && openMenu(item.label)}
                        onMouseEnter={() => canOpen && openMenu(item.label)}
                        className={`relative inline-flex min-h-11 items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/45 ${isOpen
                          ? "text-[#FF5812]"
                          : "text-[#0a0a1a]/60 hover:text-[#0a0a1a]"
                          }`}
                      >
                        {item.label}
                        {canOpen && (
                          <ChevronDown
                            size={13}
                            className={`transition-transform duration-100 ${isOpen ? "rotate-180 text-[#FF5812]" : "text-[#0a0a1a]/25"
                              }`}
                          />
                        )}
                        {isOpen && (
                          <motion.span
                            layoutId="activeNavBorder"
                            className="absolute bottom-[-10px] left-3.5 right-3.5 h-[2.5px] bg-[#FF5812]"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-haspopup={canOpen ? "true" : undefined}
                        onClick={() => (isOpen ? closeMenu() : openMenu(item.label))}
                        onFocus={() => canOpen && openMenu(item.label)}
                        onMouseEnter={() => canOpen && openMenu(item.label)}
                        className={`relative inline-flex min-h-11 items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/45 ${isOpen
                          ? "text-[#FF5812]"
                          : "text-[#0a0a1a]/60 hover:text-[#0a0a1a]"
                          }`}
                      >
                        {item.label}
                        {canOpen && (
                          <ChevronDown
                            size={13}
                            className={`transition-transform duration-100 ${isOpen ? "rotate-180 text-[#FF5812]" : "text-[#0a0a1a]/25"
                              }`}
                          />
                        )}
                        {isOpen && (
                          <motion.span
                            layoutId="activeNavBorder"
                            className="absolute bottom-[-10px] left-3.5 right-3.5 h-[2.5px] bg-[#FF5812]"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="hidden items-center gap-2 lg:flex" onMouseEnter={closeMenu}>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center rounded-full bg-[#FF5812] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_14px_rgba(255,88,18,0.3)] transition-[transform,box-shadow] duration-150 hover:shadow-[0_6px_18px_rgba(255,88,18,0.36)] active:scale-[0.97]"
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

          {/* Mega menu — new left-rail layout via MegaMenuPanel */}
          <div
            className="relative hidden lg:block"
            onMouseEnter={clearCloseTimer}
            aria-hidden={!hasMegaContent}
          >
            <div
              className={`absolute left-0 right-0 top-0 z-40 pt-2 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${hasMegaContent
                ? "pointer-events-auto opacity-100 translate-y-0"
                : "pointer-events-none opacity-0 -translate-y-1.5"
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
                          className="flex-1 rounded-lg py-4 text-base font-semibold text-[#0a0a1a] hover:text-[#FF5812] transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/45"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="flex-1 py-4 text-base font-semibold text-[#0a0a1a]">
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
                      className="block rounded-lg py-4 text-base font-semibold text-[#0a0a1a] hover:text-[#FF5812] transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/45"
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
                                  <span className="text-[13px] font-semibold text-[#0a0a1a] leading-tight group-hover:text-[#FF5812]">
                                    {group.title}
                                  </span>
                                  {group.description && (
                                    <span className="mt-0.5 text-[11px] text-[#0a0a1a]/40 leading-snug line-clamp-2">
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
                              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#0a0a1a]/45">
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
                                        <span className="text-[13px] font-semibold text-[#0a0a1a] leading-tight group-hover:text-[#FF5812]">
                                          {link.label}
                                        </span>
                                        {link.description && (
                                          <span className="mt-0.5 text-[11px] text-[#0a0a1a]/40 leading-snug line-clamp-2">
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
                  className="rounded-full bg-[#FF5812] py-3.5 text-center text-sm font-semibold text-white shadow-[0_4px_14px_rgba(255,88,18,0.3)] transition-[transform,box-shadow] duration-150 hover:shadow-[0_6px_18px_rgba(255,88,18,0.36)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/45"
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
