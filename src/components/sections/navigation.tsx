"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import {
  Settings,
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
  Home,
  Info,
  AppWindow,
  ArrowRight,
  ChevronDown,
  Laptop,
  Share2,
} from "lucide-react";

type MenuItem = {
  label: string;
  url?: string;
  icon?: any;
  mega?: boolean;
  children?: {
    title: string;
    description?: string;
    links: {
      label: string;
      url: string;
      icon?: any;
      description?: string;
    }[];
  }[];
};

const COL_ICONS = [
  (accent: string) => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={accent}
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  (accent: string) => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={accent}
      strokeWidth="2"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  (accent: string) => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={accent}
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  (_accent: string) => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#888780"
      strokeWidth="2"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
];

function ColIcon({ idx, accent }: { idx: number; accent: string | null }) {
  const render = COL_ICONS[idx];
  if (!render) return null;
  return render(accent ?? "#888780");
}

const colConfig = [
  { accent: "#185FA5", bg: "#E6F1FB", label: "Business Apps" },
  { accent: "#185FA5", bg: "#EAF3DE", label: "Data & Analytics" },
  { accent: "#185FA5", bg: "#FAEEDA", label: "AI & Automation" },
  { accent: "#185FA5", bg: "#FAEEDA", label: "Digital Workspace" },
];

const menu: MenuItem[] = [
  { label: "Home", url: "/", icon: Home },
  { label: "About", url: "/about-us", icon: Info },

  {
    label: "Services",
    url: "/services",
    icon: Settings,
    mega: true,
    children: [
      {
        title: "Business Applications Delivery Support",
        description:
          "Scalable Power Platform solutions built for enterprise delivery.",
        links: [
          {
            label: "Power Apps",
            url: "/services/business-applications/power-platform",
            icon: LayoutDashboard, // updated
            description: "Low-code app development",
          },
          {
            label: "Power Automate",
            url: "/services/business-applications/power-platform", // fixed
            icon: Workflow, // updated
            description: "Workflow automation",
          },
          {
            label: "Dataverse",
            url: "/services/business-applications/power-platform", // fixed
            icon: Server, // updated
            description: "Unified data platform",
          },
          {
            label: "MVP Development",
            url: "/services/business-applications/mvp",
            icon: Rocket,
            description: "Build and launch your product",
          },
        ],
      },
      {
        title: "Data & Analytics Execution",
        description: "Turn raw data into strategic intelligence at any scale.",
        links: [
          {
            label: "Power BI",
            url: "/services/data-analytics/power-bi",
            icon: LineChart, // updated
            description: "Business dashboards",
          },
          {
            label: "Microsoft Fabric",
            url: "/services/data-analytics/microsoft-fabric", // fixed
            icon: Boxes, // updated
            description: "Unified analytics platform",
          },
          {
            label: "Databricks",
            url: "/services/data-analytics/power-bi", // fixed
            icon: Cpu, // updated
            description: "Big data & ML pipelines",
          },
          {
            label: "Snowflake",
            url: "/services/data-analytics/power-bi", // fixed
            icon: CloudSnow, // 🔥 best match
            description: "Cloud data warehousing",
          },
        ],
      },
      {
        title: "AI & Intelligent Automation",
        description: "Embed intelligence into every process and workflow.",
        links: [
          {
            label: "Azure AI Foundry",
            url: "/services/ai-intelligence/agentic-ai", // fixed
            icon: BrainCircuit, // updated
            description: "Enterprise AI platform",
          },
          {
            label: "Copilot Integration",
            url: "/services/ai-intelligence/agentic-ai", // fixed
            icon: Sparkles, // updated
            description: "Intelligent assistant embedding",
          },
          {
            label: "AI Agents",
            url: "/services/ai-intelligence/agentic-ai", // fixed
            icon: Bot,
            description: "Autonomous task execution",
          },
          {
            label: "Generative AI",
            url: "/services/ai-intelligence/generative-ai",
            icon: WandSparkles, // updated
            description: "Retrieval-augmented generation",
          },
        ],
      },
      {
        title: "Digital Workspace & App Engineering",
        description:
          "Modern digital experiences for connected, productive teams.",
        links: [
          {
            label: "SharePoint Online",
            url: "/services/digital-workspace/sharepoint",
            icon: Building2, // updated
            description: "Intranet & collaboration",
          },
          {
            label: "SPFx Development",
            url: "/services/digital-workspace/spfx-developments", // fixed
            icon: Code2, // updated
            description: "Custom SharePoint Framework solutions",
          },
          {
            label: "Web Applications",
            url: "/services/digital-workspace/web-app-development",
            icon: Globe2, // updated
            description: "Custom web portals & apps",
          },
          {
            label: "Mobile Applications",
            url: "/services/digital-workspace/mobile-app-development",
            icon: Smartphone,
            description: "Cross-platform mobile apps",
          },
        ],
      },
    ],
  },
  {
    label: "Case Studies",
    url: "/case-studies",
    icon: Layers,
    mega: true,
    children: [
      {
        title: "Microsoft Power Platform",
        links: [
          {
            label: "Power Apps Case Studies",
            url: "/case-studies/power-platform",
            icon: AppWindow,
            description: "Real-world low-code solutions",
          },
          // {
          //   label: "AI Case Studies",
          //   url: "/case-studies/ai",
          //   icon: Brain,
          //   description: "AI-driven automation",
          // },
        ],
      },
      {
        title: "Application Development",
        links: [
          {
            label: "Mobile App Case Studies",
            url: "/case-studies/mobile",
            icon: Smartphone,
            description: "Android & iOS solutions",
          },
          {
            label: "Web App Case Studies",
            url: "/case-studies/web",
            icon: Laptop,
            description: "High-performance platforms",
          },
        ],
      },
      {
        title: "Microsoft 365 & SharePoint",
        links: [
          {
            label: "SharePoint Case Studies",
            url: "/case-studies/sharepoint",
            icon: Share2,
            description: "Enterprise collaboration",
          },
        ],
      },
    ],
  },
];

export default function Navigation() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY <= 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const LOGO_URL =
    "https://www.softreetechnology.com/wp-content/uploads/elementor/thumbs/white-logo-soft-qt16xqrm9tl34ewl9f9uhep3zaj8m5zkpgualw8uf4.png";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-transform duration-300 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="relative w-full max-w-4xl px-6 lg:px-10 h-16 flex items-center justify-between rounded-full bg-white border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
        <Link href="/" className="inline-block mt-1">
          <img
            src={LOGO_URL}
            alt="Softree"
            className="h-10 w-auto object-contain invert"
          />
        </Link>

        {/* ── DESKTOP ── */}
        <div className="hidden lg:flex items-center gap-8">
          {menu.map((item) => {
            if (!item.mega) {
              return (
                <Link
                  key={item.label}
                  href={item.url || "#"}
                  className="group relative px-4 py-2 text-l font-semibold text-gray-700"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-zinc-700 via-zinc-900 to-black opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />
                  <span className="relative z-10 transition-colors group-hover:text-white">
                    {item.label}
                  </span>
                </Link>
              );
            }

            return (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setOpen(item.label)}
                onMouseLeave={() => setOpen(null)}
              >
                <Link
                  href={item.url || "#"}
                  className="group relative inline-flex items-center gap-1 px-4 py-2 text-l font-semibold text-gray-700"
                >
                  <span
                    className={`absolute inset-0 rounded-full bg-gradient-to-r from-gray-500 via-gray-700 to-black transition-all duration-300 ${
                      open === item.label
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-75"
                    } group-hover:opacity-100 group-hover:scale-100`}
                  />
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    {item.label}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`relative z-10 mt-[1px] transition-all duration-300 group-hover:text-white ${
                      open === item.label ? "rotate-180 text-white" : ""
                    }`}
                  />
                </Link>

                {/* ── MEGA MENU ── */}
                <AnimatePresence>
                  {open === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="fixed top-18 left-1/2 -translate-x-1/2 w-[960px] bg-white rounded-3xl border border-black/5 shadow-[0_20px_70px_rgba(0,0,0,0.15)] overflow-hidden"
                    >
                      {/* columns */}
                      <div className="grid grid-cols-4 gap-0">
                        {item.children?.map((group, idx) => {
                          const cfg = colConfig[idx] ?? {
                            accent: null,
                            bg: null,
                            label: group.title,
                          };

                          return (
                            <div
                              key={group.title}
                              className={`px-[22px] py-6 ${
                                idx < item.children!.length - 1
                                  ? "border-r border-black/[0.06]"
                                  : ""
                              }`}
                            >
                              {/* column header */}
                              <div className="flex items-left border-b border-black/[0.05]">
                                <div className="w-[30px] h-[30px] rounded-[9px] flex items-center justify-center shrink-0 "></div>
                                <span
                                  className="text-[14px] font-medium tracking-[0.055em] uppercase"
                                  style={{ color: cfg.accent ?? "#888780" }}
                                >
                                  {cfg.label}
                                </span>
                              </div>

                              {/* links */}
                              <div className="flex flex-col gap-[3px]">
                                {group.links.map((link) => {
                                  const Icon = link.icon;
                                  return (
                                    <Link
                                      key={link.label}
                                      href={link.url}
                                      className="group/link flex items-center gap-2.5 px-2.5 py-2 rounded-[9px] border border-transparent hover:border-black/[0.1] hover:bg-zinc-50/80 transition-all duration-150"
                                    >
                                      <div
                                        className="w-8 h-8 rounded-[7px] flex items-center justify-center shrink-0
  bg-gradient-to-br from-gray-900 via-gray-900 to-transparent
  backdrop-blur-md
  border border-gray-300
  shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_3px_rgba(0,0,0,0.08)]
  transition-all duration-200
  group-hover/link:from-gray-300/50 group-hover/link:via-gray-200/40 group-hover/link:border-gray-400/40"
                                      >
                                        {Icon && (
                                          <Icon
                                            size={20}
                                            className="text-gray-100 group-hover/link:text-gray-900"
                                          />
                                        )}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-medium text-zinc-900 leading-tight">
                                          {link.label}
                                        </p>
                                        {link.description && (
                                          <p className="text-[11px] text-zinc-700 mt-[1px] leading-tight">
                                            {link.description}
                                          </p>
                                        )}
                                      </div>
                                      <ArrowRight
                                        size={13}
                                        className="text-zinc-400 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-150 shrink-0"
                                      />
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* footer */}
                      <div className="border-t border-black/[0.06] bg-zinc-50/60 px-[22px] py-3.5 flex items-center justify-between">
                        <p className="text-[12px] text-zinc-400">
                          Need guidance?{" "}
                          <Link
                            href="/contact"
                            className="text-zinc-700 font-medium underline underline-offset-2 hover:text-black transition-colors"
                          >
                            Talk to a specialist
                          </Link>
                        </p>
                        <div className="flex items-center gap-5">
                          <Link
                            href="/services"
                            className="text-[12px] font-medium text-zinc-700 hover:text-black flex items-center gap-1 transition-colors group/f"
                          >
                            All services
                            <ArrowRight
                              size={11}
                              className="group-hover/f:translate-x-0.5 transition-transform"
                            />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact"
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-black rounded-full hover:scale-105 hover:shadow-lg transition"
          >
            Get Started
            <svg
              viewBox="0 0 16 16"
              fill="none"
              style={{ width: 16, height: 16 }}
            >
              <path
                d="M4 12L12 4M12 4H7M12 4v5"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* ── MOBILE TOGGLE ── */}
        <button
          className="lg:hidden absolute right-6 top-1/2 -translate-y-1/2 z-[60] text-black shrink-0 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* ── MOBILE PANEL ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="fixed top-0 left-0 w-full h-screen bg-white z-40 px-6 pt-24 pb-10 overflow-y-auto lg:hidden"
            >
              <div className="flex flex-col gap-4">
                {menu.map((item) => (
                  <div key={item.label}>
                    {item.mega ? (
                      <button
                        onClick={() => {
                          setMobileDropdown(
                            mobileDropdown === item.label ? null : item.label,
                          );
                        }}
                        className="w-full flex items-center justify-between py-4 border-b border-gray-200 text-left"
                      >
                        <span className="text-lg font-semibold text-gray-900">
                          {item.label}
                        </span>
                        <ChevronDown
                          size={20}
                          className={`text-gray-900 transition-transform ${
                            mobileDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.url || "#"}
                        onClick={() => setMobileOpen(false)}
                        className="w-full flex items-center justify-between py-4 border-b border-gray-200 text-left"
                      >
                        <span className="text-lg font-semibold text-gray-900">
                          {item.label}
                        </span>
                      </Link>
                    )}

                    {item.mega && mobileDropdown === item.label && (
                      <div className="pl-4 mt-3 space-y-6 pb-2">
                        {item.children?.map((group, idx) => (
                          <div key={idx} className="space-y-3">
                            <h4 className="text-sm font-bold text-gray-900 tracking-wide uppercase">
                              {group.title}
                            </h4>
                            <div className="flex flex-col gap-3 pl-2 border-l-2 border-gray-100">
                              {group.links.map((link) => (
                                <Link
                                  key={link.label}
                                  href={link.url}
                                  onClick={() => setMobileOpen(false)}
                                  className="block py-1 text-sm font-medium text-gray-600 hover:text-black transition-colors"
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-6 flex items-center justify-center gap-2 px-5 py-3 bg-black text-white rounded-full font-semibold"
                >
                  Get Started
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    style={{ width: 16, height: 16 }}
                  >
                    <path
                      d="M4 12L12 4M12 4H7M12 4v5"
                      stroke="rgba(255,255,255,0.8)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
