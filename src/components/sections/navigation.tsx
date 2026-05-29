"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { SanityNavCategory } from "@/sanity/types";

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
  Info,
  AppWindow,
  ArrowRight,
  ChevronDown,
  Laptop,
  Share2,
  BookOpen,
  Briefcase,
  FileText,
} from "lucide-react";

type MenuItem = {
  label: string;
  url?: string;
  icon?: any;
  mega?: boolean;
  children?: {
    title: string;
    image?: string;
    description?: string;
    links: {
      label: string;
      url: string;
      icon?: any;
      description?: string;
    }[];
  }[];
};

// Images for dropdown columns
const dropdownImages = [
  "/images/case-study/power-apps/automated.jpg", // Business Apps
  "/images/ai/analytics.jpg", // Data & Analytics
  "/images/ai/ai-agent.jpg", // AI & Automation
  "/images/case-study/mobile/education.png", // Digital Workspace
];

const colConfig = [
  { accent: "#FF7A2F", bg: "#E6F1FB", label: "Business Apps" },
  { accent: "#FF7A2F", bg: "#EAF3DE", label: "Data & Analytics" },
  { accent: "#FF7A2F", bg: "#FAEEDA", label: "AI & Automation" },
  { accent: "#FF7A2F", bg: "#FAEEDA", label: "Digital Workspace" },
];

const menu: MenuItem[] = [
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
            url: "/services/offshore-power-platform-development",
            icon: LayoutDashboard, // updated
            description: "Low-code app development",
          },
          {
            label: "Power Automate",
            url: "/services/offshore-power-platform-development", // fixed
            icon: Workflow, // updated
            description: "Workflow automation",
          },
          {
            label: "Dataverse",
            url: "/services/offshore-power-platform-development", // fixed
            icon: Server, // updated
            description: "Unified data platform",
          },
          {
            label: "MVP Development",
            url: "/services/mvp",
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
            url: "/services/offshore-data-analytics",
            icon: LineChart, // updated
            description: "Business dashboards",
          },
          {
            label: "Microsoft Fabric",
            url: "/services/offshore-microsoft-fabric", // fixed
            icon: Boxes, // updated
            description: "Unified analytics platform",
          },
          {
            label: "Databricks",
            url: "/services/offshore-data-analytics", // fixed
            icon: Cpu, // updated
            description: "Big data & ML pipelines",
          },
          {
            label: "Snowflake",
            url: "/services/offshore-data-analytics", // fixed
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
            label: "AI Powered Test Automation",
            url: "/services/ai-powered-test-automation",
            icon: BrainCircuit, // updated
            description: "Enterprise AI platform",
          },

          {
            label: "AI Agents",
            url: "/services/offshore-ai-development", // fixed
            icon: Bot,
            description: "Autonomous task execution",
          },
          {
            label: "Generative AI",
            url: "/services/offshore-generative-ai-development",
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
            label: "Legacy Modernization",
            url: "/services/legacy-application-modernization", // fixed
            icon: Sparkles, // updated
            description: "Transform outdated systems with modern architecture.",
          },
          {
            label: "SharePoint Online",
            url: "/services/offshore-sharepoint-development",
            icon: Building2, // updated
            description: "Intranet & collaboration",
          },
          {
            label: "SPFx Development",
            url: "/services/offshore-spfx-development", // fixed
            icon: Code2, // updated
            description: "Custom SharePoint Framework solutions",
          },
          {
            label: "Web Applications",
            url: "/services/offshore-web-app-development",
            icon: Globe2, // updated
            description: "Custom web portals & apps",
          },
          {
            label: "Mobile Applications",
            url: "/services/offshore-mobile-app-development",
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
  // Blog menu item — children are dynamically populated from Sanity
  {
    label: "Blog",
    url: "/blog",
    icon: BookOpen,
    mega: true,
    children: [], // populated at runtime from blogCategories prop
  },
  {
    label: "Careers",
    url: "/careers",
    icon: Briefcase,
  },

];

export default function Navigation({
  blogCategories,
}: {
  blogCategories?: SanityNavCategory[];
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  // Build the dynamic Blog menu children from Sanity categories
  const dynamicMenu = useMemo(() => {
    if (!blogCategories || blogCategories.length === 0) return menu;

    return menu.map((item) => {
      if (item.label !== "Blog") return item;

      // Convert Sanity categories into mega menu columns (max 4)
      const children = blogCategories
        .filter((cat) => cat.posts && cat.posts.length > 0)
        .slice(0, 4)
        .map((cat) => ({
          title: cat.title,
          description: `Latest ${cat.title.toLowerCase()} articles`,
          links: cat.posts.map((post) => ({
            label: post.title,
            url: `/blog/${post.slug.current}`,
            icon: FileText,
            description: post.excerpt || "",
          })),
        }));

      return { ...item, children };
    });
  }, [blogCategories]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 20 || currentScrollY < lastScrollY.current) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500 ease-[var(--legacy-ease-0_23_1_0_32_1)] ${showNav ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <nav className="relative w-full max-w-7xl mx-6 lg:mx-12 mt-2 px-6 lg:px-12 h-[72px] flex items-center justify-between rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        <Link href="/" className="inline-block shrink-0">
          <img
            src="/logo/Softree-Technology-Final-Logo.png"
            alt="Softree"
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* ── DESKTOP ── */}
        <div className="hidden lg:flex items-center gap-1">
          {dynamicMenu.map((item) => {
            if (!item.mega) {
              return (
                <Link
                  key={item.label}
                  href={item.url || "#"}
                  className="group relative px-4 py-2 text-sm font-medium text-gray-600 rounded-lg transition-all duration-200 hover:text-gray-900 hover:bg-gray-100/50"
                >
                  {item.label}
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
                  className="group relative inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 rounded-lg transition-all duration-200 hover:text-orange-600 hover:bg-orange-50/50"
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${open === item.label ? "rotate-180 text-orange-600" : "text-gray-400 group-hover:text-orange-500"}`}
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
                      className="fixed top-[95px] left-1/2 -translate-x-1/2 w-[1100px] bg-white rounded-3xl border border-gray-100 shadow-[0_24px_80px_rgba(0,0,0,0.15),0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden"
                    >
                      {/* Header */}
                      <div className="px-8 pt-5 pb-4 border-b border-gray-100">
                        <Link
                          href={item.url || "#"}
                          className="group/drawer-title flex items-center gap-x-2"
                        >
                          <span className="text-xl font-semibold text-gray-900">
                            {item.label}
                          </span>
                          <ArrowRight
                            size={18}
                            className="text-gray-400 transition-transform group-hover/drawer-title:translate-x-1"
                          />
                        </Link>
                      </div>

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
                              className={`px-5 py-5 ${idx < item.children!.length - 1
                                ? "border-r border-gray-100"
                                : ""
                                }`}
                            >
                              {/* Service Visual - Image at top */}
                              <div className="relative h-[110px] overflow-hidden rounded-xl border border-gray-200 bg-gray-900 mb-4 group/image">
                                <img
                                  alt={cfg.label}
                                  className="h-full w-full object-cover object-center opacity-95 transition-all duration-500 group-hover/image:scale-105"
                                  src={group.image || dropdownImages[idx]}
                                  onError={(e) => {
                                    // Fallback: hide image and show gradient background
                                    (
                                      e.target as HTMLImageElement
                                    ).style.display = "none";
                                    (
                                      e.target as HTMLImageElement
                                    ).parentElement!.style.background =
                                      `linear-gradient(135deg, ${cfg.bg} 0%, ${cfg.accent}20 100%)`;
                                  }}
                                />
                                <div className="absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                                <span className="absolute bottom-2.5 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-900 shadow-sm">
                                  {cfg.label}
                                </span>
                              </div>

                              {/* links */}
                              <div className="flex flex-col gap-0.5">
                                {group.links.map((link) => {
                                  const Icon = link.icon;
                                  return (
                                    <Link
                                      key={link.label}
                                      href={link.url}
                                      className="group/link flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 transition-all duration-150"
                                    >
                                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-gray-100 group-hover/link:bg-orange-500 transition-all duration-200">
                                        {Icon && (
                                          <Icon
                                            size={17}
                                            className="text-gray-600 group-hover/link:text-white transition-colors"
                                          />
                                        )}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-medium text-gray-900 leading-snug">
                                          {link.label}
                                        </p>
                                        {link.description && (
                                          <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                                            {link.description}
                                          </p>
                                        )}
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* footer */}
                      <div className="border-t border-gray-100 bg-gray-50/80 px-6 py-4 flex items-center justify-between">
                        <p className="text-[13px] text-gray-500">
                          Need guidance?{" "}
                          <Link
                            href="/contact"
                            className="text-gray-900 font-semibold hover:text-orange-600 transition-colors"
                          >
                            Talk to a specialist →
                          </Link>
                        </p>
                        <div className="flex items-center gap-6">
                          <Link
                            href="/services"
                            className="text-[13px] font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1.5 transition-colors group/f"
                          >
                            Explore all services
                            <ArrowRight
                              size={14}
                              className="group-hover/f:translate-x-0.5 transition-transform"
                            />
                          </Link>
                          <Link
                            href="/contact"
                            className="text-[13px] font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1.5 transition-colors group/f"
                          >
                            Get a quote
                            <ArrowRight
                              size={14}
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
            className="inline-flex items-center transition-all duration-300 ease-out active:scale-95 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #FF7A2F 0%, #E85A1F 100%)",
              borderRadius: "10px",
              boxShadow: "0 4px 14px 0 rgba(255, 122, 47, 0.35)",
              padding: "12px 28px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#fff",
            }}
          >
            Get Started
          </Link>
        </div>

        {/* ── MOBILE TOGGLE ── */}
        <button
          className="lg:hidden relative z-[60] text-gray-700 shrink-0 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <motion.div
            initial={false}
            animate={{ rotate: mobileOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.div>
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
                {dynamicMenu.map((item) => (
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
                          className={`text-gray-900 transition-transform ${mobileDropdown === item.label ? "rotate-180" : ""
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
                  style={{
                    backgroundColor: "#FF7759",
                    boxShadow: "0 6px 20px -4px rgba(255,119,89,0.5)",
                  }}
                  className="mt-6 flex items-center justify-center gap-2 px-6 py-3.5 text-white rounded-xl font-semibold"
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
