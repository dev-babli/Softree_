"use client";

import * as React from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  Info,
  Settings,
  Users,
  Smartphone,
  Laptop,
  Share2,
  FileText,
  Database,
  BarChart3,
  BookOpen,
  Phone,
  Building2,
  Brain,
  Layers,
  Globe,
  AppWindow,
  Bot,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

/* =========================
   LOGO
========================= */
const LOGO_URL =
  "https://www.softreetechnology.com/wp-content/uploads/elementor/thumbs/white-logo-soft-qt16xqrm9tl34ewl9f9uhep3zaj8m5zkpgualw8uf4.png";

/* =========================
   TYPES
========================= */
type MenuLink = {
  label: string;
  url: string;
  icon?: LucideIcon;
  description?: string;
};

type MegaSection = {
  title: string;
  links: MenuLink[];
};

/* 🔥 DISCRIMINATED UNION */
type MenuItem =
  | {
      label: string;
      url: string;
      icon?: LucideIcon;
      mega: true;
      children: MegaSection[];
    }
  | {
      label: string;
      url: string;
      icon?: LucideIcon;
      mega?: false;
      children?: MenuLink[];
    };

/* =========================
   MENU CONFIG
========================= */
const menu: MenuItem[] = [
  {
    label: "Home",
    url: "/",
    icon: Home,
  },
  {
    label: "About",
    url: "/about-us",
    icon: Info,
  },
  {
    label: "Services",
    url: "/services",
    icon: Settings,
    mega: true,

    children: [
      {
        title: "App Development",
        links: [
          {
            label: "Softree for Startups",
            url: "/services/softree-for-startups",
            icon: Laptop,
            description:
              "End-to-end product development to help startups launch faster, scale smarter, and succeed",
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
        title: "SharePoint Services",
        links: [
          {
            label: "SharePoint Development",
            url: "/services/sharepoint",
            icon: Share2,
            description: "Enterprise SharePoint solutions and customization",
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
            description: "Low-code apps for rapid business solutions",
          },

          {
            label: "Power BI",
            url: "/services/power-bi",
            icon: BarChart3,
            description: "Data visualization and business intelligence",
          },
        ],
      },

      // ⭐ NEW SECTION
      {
        title: "AI Services",
        links: [
          {
            label: "Agentic AI Solutions",
            url: "/services/agentic-ai",
            icon: Bot,
            description:
              "Autonomous AI agents that plan, act, and execute complex business workflows",
          },
          {
            label: "Generative AI",
            url: "/services/generative-ai",
            icon: Sparkles,
            description:
              "LLM-powered solutions for content generation, automation, and intelligence",
          },
          {
            label: "AI Chatbot Development",
            url: "/services/ai-chatbot",
            icon: MessageSquare,
            description:
              "Smart conversational bots for customer support, sales, and operations",
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
            description: "Real-world low-code business solutions",
          },
          {
            label: "AI & Copilot Case Studies",
            url: "/case-studies/ai",
            icon: Brain,
            description: "AI-driven automation and insights",
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
            description: "Scalable Android & iOS solutions",
          },
          {
            label: "Web App Case Studies",
            url: "/case-studies/web",
            icon: Laptop,
            description: "High-performance web platforms",
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
            description: "Enterprise collaboration solutions",
          },
          {
            label: "SPFx Case Studies",
            url: "/case-studies/spfx",
            icon: Globe,
            description: "Custom SPFx web parts & extensions",
          },
        ],
      },
    ],
  },
  {
    label: "Blog",
    url: "/blog",
    icon: FileText,
  },
];

/* =========================
   HEADER
========================= */
export function Navigation() {
  const [open, setOpen] = React.useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full 
  bg-gradient-to-b from-zinc-50 via-white to-zinc-50
  backdrop-blur-md border-b border-zinc-200/60"
    >
      <nav
        className="
    mx-auto
    flex
    h-16
    max-w-5xl
    items-center
    justify-start
    gap-10
    rounded-full
    px-6

    bg-white/80
    backdrop-blur-xl

    border border-zinc-200
    shadow-lg
  "
      >
        {/* ================= LEFT: Logo + Menu ================= */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <Link href="/" aria-label="Go to homepage" className="inline-block">
            <Image
              src="https://www.softreetechnology.com/wp-content/uploads/elementor/thumbs/white-logo-soft-qt16xqrm9tl34ewl9f9uhep3zaj8m5zkpgualw8uf4.png"
              alt="Softree"
              width={150}
              height={40}
              className="invert object-contain cursor-pointer"
              priority
            />
          </Link>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex items-center gap-1">
              {menu.map((item) => {
                const Icon = item.icon;

                const navPillClass = `
            px-5 py-2.5
            rounded-full
            text-[15px] font-medium
            text-zinc-800

            bg-transparent
            hover:bg-blue-500/10

            hover:text-blue-600
            hover:shadow-[inset_0_-4px_0_0_rgb(59,130,246)]

            transition-all duration-300
          `;

                /* ================= MEGA MENU ================= */
                if (item.mega) {
                  return (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuTrigger
                        className={`
    ${navPillClass}
    data-[state=open]:bg-blue-500/10
    data-[state=open]:text-blue-600
    data-[state=open]:shadow-[inset_0_-4px_0_0_rgb(59,130,246)]
  `}
                      >
                        <span className="flex items-center gap-2.5">
                          {Icon && (
                            <Icon className="h-4 w-4 text-zinc-600 group-hover:text-blue-600 transition" />
                          )}

                          {/* CLICK → /services */}
                          <a
                            href="/services"
                            className="font-semibold"
                            onClick={(e) => {
                              e.stopPropagation(); // ✅ allow navigation
                            }}
                          >
                            {item.label}
                          </a>
                        </span>
                      </NavigationMenuTrigger>

                      {/* Mega dropdown */}
                      <NavigationMenuContent>
                        <div
                          className="
                      relative mt-4
                      grid w-[980px] grid-cols-3 gap-10
                      p-10 rounded-3xl

                      bg-gradient-to-b from-white via-zinc-50 to-white
                      backdrop-blur-2xl
                      border border-zinc-200/70
                      shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                    "
                        >
                          {item.children.map((section) => (
                            <div key={section.title}>
                              <h4 className="mb-5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                {section.title}
                              </h4>

                              <ul className="space-y-3">
                                {section.links.map((link) => {
                                  const LinkIcon = link.icon;

                                  return (
                                    <li key={link.label}>
                                      <a
                                        href={link.url}
                                        className="
                                    group flex items-start gap-4
                                    rounded-xl p-4
                                    bg-white/60
                                    hover:bg-white
                                    hover:shadow-md
                                    hover:-translate-y-1
                                    transition
                                  "
                                      >
                                        {LinkIcon && (
                                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 group-hover:bg-blue-50">
                                            <LinkIcon className="h-4 w-4 text-zinc-700 group-hover:text-blue-600" />
                                          </div>
                                        )}

                                        <div>
                                          <p className="text-sm font-medium text-zinc-900 group-hover:text-blue-600">
                                            {link.label}
                                          </p>

                                          {link.description && (
                                            <p className="text-xs text-zinc-500">
                                              {link.description}
                                            </p>
                                          )}
                                        </div>
                                      </a>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                /* ================= NORMAL LINKS ================= */
                return (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink asChild>
                      <a href={item.url} className={navPillClass}>
                        <span className="flex items-center gap-2.5">
                          {Icon && (
                            <Icon className="h-4 w-4 text-zinc-600 group-hover:text-blue-600 transition" />
                          )}

                          <span className="font-semibold">{item.label}</span>
                        </span>
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* ================= RIGHT SIDE CTA (Desktop only) ================= */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <Link
            href="/contact"
            className="
    inline-flex items-center gap-2
    px-2 py-1.5
    rounded-full
    bg-blue-600
    text-white
    text-sm
    font-medium
    shadow-md
    hover:bg-blue-700
    transition
  "
          >
            <Phone size={16} />
            Contact Us
          </Link>
        </div>

        {/* ================= MOBILE TOGGLE ================= */}
        <Button
          size="icon"
          variant="outline"
          className="rounded-full md:hidden ml-auto"
          onClick={() => setOpen(!open)}
        >
          <MenuToggleIcon open={open} className="h-5 w-5" />
        </Button>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu open={open}>
        {menu.map((item) => {
          const Icon = item.icon;

          if (item.mega) {
            return (
              <div key={item.label}>
                <div className="font-semibold">{item.label}</div>
                <div className="ml-4 mt-2 space-y-4">
                  {item.children.map((section) => (
                    <div key={section.title}>
                      <p className="text-sm text-muted-foreground">
                        {section.title}
                      </p>
                      {section.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <a
              key={item.label}
              href={item.url}
              className="flex items-center gap-2 rounded-md p-2 hover:bg-accent"
            >
              {Icon && <Icon className="h-4 w-4" />}
              {item.label}
            </a>
          );
        })}
      </MobileMenu>
    </header>
  );
}

/* =========================
   MOBILE MENU
========================= */
function MobileMenu({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  if (!open || typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 top-14 z-40 bg-background p-4 md:hidden">
      <div className="space-y-4">{children}</div>
    </div>,
    document.body,
  );
}
