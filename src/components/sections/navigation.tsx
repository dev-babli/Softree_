"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import {
  Home,
  Info,
  Settings,
  Laptop,
  Users,
  Smartphone,
  Share2,
  FileText,
  Building2,
  BarChart3,
  Bot,
  Sparkles,
  MessageSquare,
  Layers,
  AppWindow,
  Brain,
  Globe,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

type MenuItem = {
  label: string;
  url?: string;
  icon?: any;
  mega?: boolean;
  children?: {
    title: string;
    links: {
      label: string;
      url: string;
      icon?: any;
      description?: string;
    }[];
  }[];
};

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
        title: "AI Services",
        links: [
          {
            label: "Agentic AI Solutions",
            url: "/services/agentic-ai",
            icon: Bot,
            description: "Autonomous AI agents",
          },
          {
            label: "Generative AI",
            url: "/services/generative-ai",
            icon: Sparkles,
            description: "LLM-powered solutions",
          },
        ],
      },
      {
        title: "App Development",
        links: [
          {
            label: "Softree for Startups",
            url: "/services/softree-for-startups",
            icon: Laptop,
            description:
              "End-to-end product development to help startups launch faster",
          },
          {
            label: "MVP Development Services",
            url: "/services/mvp",
            icon: Users,
            description: "End-to-end product development for startups",
          },
          {
            label: "Mobile App Development",
            url: "/services/mobile-app-development",
            icon: Smartphone,
            description: "Native and cross-platform mobile applications",
          },
          {
            label: "Web App Development",
            url: "/services/web-app-development",
            icon: Laptop,
            description: "High-performance and scalable web applications",
          },
        ],
      },
      {
        title: "SharePoint & Power Platform Engineering",
        links: [
          {
            label: "SharePoint Development",
            url: "/services/sharepoint",
            icon: Share2,
            description: "Enterprise SharePoint solutions",
          },
          {
            label: "SPFx Developments",
            url: "/services/spfx-developments",
            icon: FileText,
            description: "Custom SPFx web parts and extensions",
          },
          {
            label: "Power Apps",
            url: "/services/power-apps",
            icon: Building2,
            description: "Low-code apps for business solutions",
          },
          {
            label: "Power BI",
            url: "/services/power-bi",
            icon: BarChart3,
            description: "Data visualization & BI",
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
            url: "/case-studies/power-apps",
            icon: AppWindow,
            description: "Real-world low-code solutions",
          },
          {
            label: "AI Case Studies",
            url: "/case-studies/ai",
            icon: Brain,
            description: "AI-driven automation",
          },
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

  { label: "Blog", url: "/blog", icon: FileText },
];

export default function Navigation() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShowNav(false); // hide
      } else {
        setShowNav(true); // show
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const LOGO_URL =
    "https://www.softreetechnology.com/wp-content/uploads/elementor/thumbs/white-logo-soft-qt16xqrm9tl34ewl9f9uhep3zaj8m5zkpgualw8uf4.png%22";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-transform duration-300 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav
        className="
      w-full max-w-5xl
      px-6 lg:px-10
      h-16
      flex items-center justify-between
      rounded-full
      bg-white
      border border-black/5
      shadow-[0_10px_40px_rgba(0,0,0,0.08)]
    "
      >
        <Link href="/" className="inline-block mt-1">
          <img
            src={LOGO_URL}
            alt="Softree"
            className="h-10 w-auto object-contain invert"
          />
        </Link>

        {/* ================= DESKTOP ================= */}
        <div className="hidden lg:flex items-center gap-8">
          {menu.map((item) => {
            if (!item.mega) {
              return (
                <Link
                  key={item.label}
                  href={item.url || "#"}
                  className="group relative px-4 py-2 text-l font-semibold text-gray-700"
                >
                  {/* Dark mirror pill */}
                  <span
                    className="
      absolute inset-0
      rounded-full
      bg-gradient-to-r from-zinc-700 via-zinc-900 to-black
      opacity-0 scale-90
      transition-all duration-300
      group-hover:opacity-100 group-hover:scale-100
    "
                  />

                  {/* TEXT */}
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
                  {/* pill */}
                  <span
                    className={`
      absolute inset-0
      rounded-full
      bg-gradient-to-r from-gray-500 via-gray-700 to-black
      transition-all duration-300
      ${open === item.label ? "opacity-100 scale-100" : "opacity-0 scale-75"}
      group-hover:opacity-100 group-hover:scale-100
    `}
                  />

                  {/* label */}
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    {item.label}
                  </span>

                  {/* icon */}
                  <ChevronDown
                    size={16}
                    className={`
      relative z-10 mt-[1px]
      transition-all duration-300
      group-hover:text-white
      ${open === item.label ? "rotate-180 text-white" : ""}
    `}
                  />
                </Link>

                {/* ================= MEGA ================= */}
                <AnimatePresence>
                  {open === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="
    fixed top-18 left-1/2 -translate-x-1/2
    w-[1100px]
    bg-white
    rounded-3xl
    border border-black/5
    shadow-[0_20px_70px_rgba(0,0,0,0.15)]
    p-10
    grid grid-cols-3 gap-10
  "
                    >
                      {item.children?.map((group) => (
                        <div key={group.title}>
                          <h4 className="text-sm font-bold text-gray-900 mb-4">
                            {group.title}
                          </h4>

                          <div className="space-y-3">
                            {group.links.map((link) => {
                              const Icon = link.icon;

                              return (
                                <Link
                                  key={link.label}
                                  href={link.url}
                                  className="
    group relative flex items-start gap-3
    p-3 rounded-xl
    border border-transparent
    hover:border-zinc-300
    hover:bg-zinc-50
    hover:-translate-y-0.5
    transition-all duration-200
  "
                                >
                                  {/* icon */}
                                  {Icon && (
                                    <div
                                      className="
        w-10 h-10 flex items-center justify-center
        rounded-lg bg-white
        border border-zinc-200
        transition-all duration-200
        group-hover:bg-black
      "
                                    >
                                      <Icon
                                        size={18}
                                        className="
          text-zinc-700
          group-hover:text-white
          transition-colors
        "
                                      />
                                    </div>
                                  )}

                                  {/* text */}
                                  <div className="pr-6">
                                    <p className="text-sm font-semibold text-zinc-900">
                                      {link.label}
                                    </p>

                                    <p className="text-xs text-zinc-500 mt-1 group-hover:text-zinc-700">
                                      {link.description}
                                    </p>
                                  </div>

                                  {/* arrow */}
                                  <ArrowRight
                                    size={16}
                                    className="
      absolute right-3 top-4
      opacity-0 -translate-x-1
      group-hover:opacity-100 group-hover:translate-x-0
      transition-all duration-200
      text-zinc-400
    "
                                  />
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ================= CTA ================= */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact"
            className="
          px-5 py-2.5
          text-sm font-semibold
          text-white bg-black
          rounded-full
          hover:scale-105 hover:shadow-lg
          transition
        "
          >
            Get Started
          </Link>
        </div>

        {/* ================= MOBILE ================= */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
    </header>
  );
}
