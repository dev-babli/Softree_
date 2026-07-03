"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import type {
  SanityNavCategory,
  SanityNavCaseStudyCategory,
} from "@/sanity/types";
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
  RefreshCw,
} from "lucide-react";

type MenuLink = {
  label: string;
  url: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  description?: string;
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
    url: "/services",
    mega: true,
    children: [
      {
        title: "Business Applications",
        description: "Power Platform at enterprise scale.",
        links: [
          { label: "Power Apps", url: "/services/offshore-power-platform-development", icon: LayoutDashboard, description: "Low-code delivery" },
          { label: "Power Automate", url: "/services/offshore-power-platform-development", icon: Workflow, description: "Workflow automation" },
          { label: "Dataverse", url: "/services/offshore-power-platform-development", icon: Server, description: "Unified data layer" },
          { label: "MVP Development", url: "/services/mvp", icon: Rocket, description: "Launch faster" },
        ],
      },
      {
        title: "Data & Analytics",
        description: "Intelligence from raw data.",
        links: [
          { label: "Power BI", url: "/services/offshore-data-analytics", icon: LineChart, description: "Executive dashboards" },
          { label: "Microsoft Fabric", url: "/services/offshore-microsoft-fabric", icon: Boxes, description: "Unified analytics" },
          { label: "Databricks", url: "/services/offshore-data-analytics", icon: Cpu, description: "ML pipelines" },
          { label: "Snowflake", url: "/services/offshore-data-analytics", icon: CloudSnow, description: "Cloud warehouse" },
        ],
      },
      {
        title: "AI & Automation",
        description: "Intelligence in every workflow.",
        links: [
          { label: "Workflow Orchestration", url: "/ai-workflow-orchestration", icon: Workflow, description: "Autonomous pipeline agents" },
          { label: "AI Web Analyser", url: "/webanalyser", icon: Sparkles, description: "Instant website performance audit" },
          { label: "AI Test Automation", url: "/services/ai-powered-test-automation", icon: BrainCircuit, description: "Quality at speed" },
          { label: "AI Agents", url: "/services/offshore-ai-development", icon: Bot, description: "Autonomous tasks" },
          { label: "Generative AI", url: "/services/offshore-generative-ai-development", icon: WandSparkles, description: "RAG & copilots" },
        ],
      },
      {
        title: "Digital Workspace",
        description: "Modern apps for connected teams.",
        links: [
          { label: "Legacy Modernization", url: "/services/legacy-application-modernization", icon: Sparkles, description: "Architecture refresh" },
          { label: "SharePoint Online", url: "/services/offshore-sharepoint-development", icon: Building2, description: "Intranets" },
          { label: "SPFx Development", url: "/services/offshore-spfx-development", icon: Code2, description: "Custom SPFx" },
          { label: "Web Applications", url: "/services/offshore-web-app-development", icon: Globe2, description: "Portals & apps" },
          { label: "Mobile Applications", url: "/services/offshore-mobile-app-development", icon: Smartphone, description: "iOS & Android" },
        ],
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
      {
        title: "Microsoft",
        icon: LayoutDashboard,
        description: "Enterprise Microsoft solutions.",
        links: [],
      },
      {
        title: "Cloud & DevOps",
        icon: Server,
        description: "Infrastructure & architecture refresh.",
        links: [],
      },
      {
        title: "Data & Analytics",
        icon: LineChart,
        description: "Data intelligence platforms.",
        links: [],
      },
      {
        title: "Software Engineering",
        icon: Code2,
        description: "Custom software engineering.",
        links: [],
      },
      {
        title: "Quality Assurance",
        icon: BrainCircuit,
        description: "Production-grade testing.",
        links: [],
      },
      {
        title: "Digital Transformation",
        icon: Layers,
        description: "Modernize legacy systems.",
        links: [],
      },
    ],
  },
  { label: "Case Studies", url: "/case-studies", mega: true, children: [] },
  { label: "Blog", url: "/blog", mega: true, children: [] },
  { label: "Careers", url: "/careers" },
];

function buildBlogChildren(blogCategories: SanityNavCategory[]): MenuGroup[] {
  return blogCategories
    .filter((c) => c.posts?.length)
    .slice(0, 4)
    .map((cat) => ({
      title: cat.title,
      description: `Latest in ${cat.title.toLowerCase()}`,
      links: cat.posts.map((post) => ({
        label: post.title,
        url: `/blog/${post.slug.current}`,
        icon: FileText,
        description: post.excerpt || "",
      })),
    }));
}

function buildCaseStudyChildren(
  caseStudyCategories: SanityNavCaseStudyCategory[],
): MenuGroup[] {
  return caseStudyCategories
    .filter((c) => c.links?.length)
    .slice(0, 4)
    .map((cat) => ({
      title: cat.title,
      description: cat.description,
      links: cat.links.map((link) => ({
        label: link.label,
        url: link.href,
        icon: Layers,
        description: link.description,
      })),
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

  const dynamicMenu = useMemo(() => {
    const blogChildren = buildBlogChildren(blogCategories);
    const caseStudyChildren = buildCaseStudyChildren(caseStudyCategories);

    return menu.map((item) => {
      if (item.label === "Blog" && blogChildren.length > 0) {
        return { ...item, children: blogChildren };
      }
      if (item.label === "Case Studies" && caseStudyChildren.length > 0) {
        return { ...item, children: caseStudyChildren };
      }
      return item;
    });
  }, [blogCategories, caseStudyCategories]);

  const activeMegaItem = useMemo(
    () => dynamicMenu.find((i) => i.label === open && i.mega) ?? null,
    [dynamicMenu, open],
  );

  const hasMegaContent = (activeMegaItem?.children?.length ?? 0) > 0;

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
        onMouseLeave={scheduleCloseMenu}
      >
        <div className="mx-auto max-w-[1280px] px-5 pt-2.5 lg:px-10">
          <nav className="relative flex h-[64px] items-center justify-between rounded-2xl border border-black/[0.06] bg-white/95 px-4 shadow-[0_8px_32px_-10px_rgba(10,10,26,0.12)] backdrop-blur-xl lg:px-6">
            <Link href="/" className="shrink-0">
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
                      className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-[#0a0a1a]/60 transition-colors duration-100 hover:bg-[#F3F0EE] hover:text-[#0a0a1a]"
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
                        className={`inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-100 ${isOpen
                          ? "bg-[rgba(255,88,18,0.1)] text-[#FF5812]"
                          : "text-[#0a0a1a]/60 hover:bg-[#F3F0EE] hover:text-[#0a0a1a]"
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
                      </Link>
                    ) : (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-haspopup={canOpen ? "true" : undefined}
                        className={`inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-100 outline-none ${isOpen
                          ? "bg-[rgba(255,88,18,0.1)] text-[#FF5812]"
                          : "text-[#0a0a1a]/60 hover:bg-[#F3F0EE] hover:text-[#0a0a1a]"
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
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              <Link
                href="/book-meeting"
                className="rounded-full bg-[#FF5812] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_14px_rgba(255,88,18,0.3)] transition-[transform,box-shadow] duration-150 hover:shadow-[0_6px_18px_rgba(255,88,18,0.36)] active:scale-[0.97]"
              >
                Book a Call
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-black/[0.08] px-5 py-2.5 text-[13px] font-semibold text-[#0a0a1a] transition-colors duration-150 hover:bg-[#F3F0EE] active:scale-[0.97]"
              >
                Get Started
              </Link>
            </div>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-[#0a0a1a] hover:bg-[#F3F0EE] transition-colors duration-150 lg:hidden"
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
              className={`absolute left-0 right-0 top-0 z-40 pt-2 transition-none ${hasMegaContent
                ? "pointer-events-auto visible opacity-100"
                : "pointer-events-none invisible opacity-0"
                }`}
            >
              {activeMegaItem?.children && hasMegaContent && (
                <MegaMenuPanel
                  label={activeMegaItem.label}
                  groups={activeMegaItem.children}
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
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
                          className="flex-1 py-4 text-base font-semibold text-[#0a0a1a] hover:text-[#FF5812] transition-colors duration-100"
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
                        className="p-4 -mr-4 flex items-center justify-center text-[#0a0a1a]/40 hover:text-[#FF5812] transition-colors duration-100"
                        aria-label={`Toggle ${item.label} dropdown`}
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-150 ${
                            mobileDropdown === item.label ? "rotate-180 text-[#FF5812]" : ""
                          }`}
                        />
                      </button>
                    </div>
                  ) : (
                    <Link
                      href={item.url || "#"}
                      onClick={() => setMobileOpen(false)}
                      className="block py-4 text-base font-semibold text-[#0a0a1a] hover:text-[#FF5812] transition-colors duration-100"
                    >
                      {item.label}
                    </Link>
                  )}

                  {item.mega && mobileDropdown === item.label && item.children && (
                    <div className="flex flex-col gap-5 pl-4 pr-2 pb-6 pt-2">
                      {item.children.map((group, groupIdx) => {
                        const GroupIcon = group.icon;
                        const hasLinks = (group.links?.length ?? 0) > 0;

                        if (group.url && !hasLinks) {
                          return (
                            <div key={groupIdx}>
                              <Link
                                href={group.url}
                                onClick={() => setMobileOpen(false)}
                                className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors duration-100 hover:bg-black/[0.03] active:bg-black/[0.05]"
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
                                      className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors duration-100 hover:bg-black/[0.03] active:bg-black/[0.05]"
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
                  href="/book-meeting"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-[#FF5812] py-3.5 text-center text-sm font-semibold text-white shadow-[0_4px_14px_rgba(255,88,18,0.3)] transition-[transform,box-shadow] duration-150 hover:shadow-[0_6px_18px_rgba(255,88,18,0.36)] active:scale-[0.97]"
                >
                  Book a Call
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full border border-black/[0.08] py-3.5 text-center text-sm font-semibold text-[#0a0a1a] transition-colors duration-150 hover:bg-[#F3F0EE] active:scale-[0.97]"
                >
                  Get Started
                </Link>
              </div>            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
