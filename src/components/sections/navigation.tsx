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
            label: "PnP PowerShell",
            url: "/services/pnp-powershell",
            icon: Database,
            description: "Automate and manage SharePoint efficiently",
          },
          {
            label: "Teams App Development",
            url: "/services/teams-app-development",
            icon: Building2,
            description: "Build powerful apps for Microsoft Teams",
          },
        ],
      },
      {
        title: "Power Platform",
        links: [
          {
            label: "Power Apps",
            url: "/services/power-apps",
            icon: Building2,
            description: "Low-code apps for rapid business solutions",
          },
          {
            label: "Power Pages",
            url: "/services/power-pages",
            icon: Building2,
            description: "Secure external portals for your organization",
          },
          {
            label: "Power BI",
            url: "/services/power-bi",
            icon: BarChart3,
            description: "Data visualization and business intelligence",
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
    url: "/blog/all-posts",
    icon: BookOpen,
  },
  {
    label: "Contact",
    url: "/contact",
    icon: Phone,
  },
];

/* =========================
   HEADER
========================= */
export function Navigation() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80   backdrop-blur">
      <nav className="mx-auto  flex h-16 max-w-7xl items-center justify-between rounded-full border bg-background/80 px-6 shadow-lg backdrop-blur-xl">
        {/* LEFT: Logo + Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" aria-label="Go to homepage">
            <Image
              src={LOGO_URL}
              alt="Softree"
              width={130}
              height={28}
              priority
              className="pl-2 cursor-pointer"
            />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex items-center gap-1">
              {menu.map((item) => {
                const Icon = item.icon;

                /* =======================
         SHARED PILL CLASS
      ======================= */
                const navPillClass = `
        px-5 py-2.5
        rounded-full
        overflow-hidden

        text-[15px] font-medium leading-none
        text-foreground

        !bg-transparent
        hover:bg-blue-500/10
        focus:bg-blue-500/10

        shadow-[inset_0_-4px_0_0_rgba(0,0,0,0)]
        hover:shadow-[inset_0_-4px_0_0_rgb(59,130,246)]

        hover:text-blue-500
        transition-all duration-300
      `;

                /* =======================
         SERVICES (MEGA MENU)
      ======================= */
                if (item.mega) {
                  return (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuTrigger
                        className={`
        ${navPillClass}
        data-[state=open]:bg-blue-500/10
        data-[state=open]:shadow-[inset_0_-4px_0_0_rgb(59,130,246)]
        data-[state=open]:text-blue-500
      `}
                      >
                        <span className="flex items-center gap-2">
                          {Icon && (
                            <Icon className="h-[18px] w-[18px] shrink-0 opacity-90" />
                          )}

                          {/* CLICK → /services */}
                          <Link
                            href="/services"
                            className="whitespace-nowrap hover:text-blue-400"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {item.label}
                          </Link>
                        </span>
                      </NavigationMenuTrigger>

                      <NavigationMenuContent>
                        <div
                          className="
          mt-3 grid w-[980px] grid-cols-3 gap-8
          rounded-2xl border p-8 shadow-xl backdrop-blur-lg
          bg-gradient-to-br from-black via-zinc-900 to-zinc-800
        "
                        >
                          {item.children.map((section) => (
                            <div key={section.title}>
                              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
                        group flex items-start gap-4 rounded-xl p-3
                        border border-transparent
                        transition-all duration-300
                        hover:border-foreground/20
                        hover:shadow-sm
                        hover:-translate-y-[1px]
                      "
                                      >
                                        {LinkIcon && (
                                          <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background group-hover:border-primary/40 group-hover:bg-primary/5">
                                            <LinkIcon className="h-4 w-4" />
                                          </div>
                                        )}
                                        <div className="flex flex-col">
                                          <span className="text-sm font-medium text-foreground/90">
                                            {link.label}
                                          </span>
                                          {link.description && (
                                            <span className="text-xs text-muted-foreground">
                                              {link.description}
                                            </span>
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

                /* =======================
         NORMAL LINKS
      ======================= */
                return (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink asChild>
                      <a
                        href={item.url}
                        className={`
                ${navPillClass}
                active:bg-blue-500/10
                active:shadow-[inset_0_-4px_0_0_rgb(59,130,246)]
                active:text-blue-500
              `}
                      >
                        <span className="flex items-center gap-2">
                          {Icon && (
                            <Icon className="h-[18px] w-[18px] shrink-0 opacity-90" />
                          )}
                          <span className="whitespace-nowrap">
                            {item.label}
                          </span>
                        </span>
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* RIGHT: Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" className="rounded-full px-5 text-sm">
            Sign In
          </Button>
          <Button className="rounded-full px-6 shadow-md">Get Started</Button>
        </div>

        {/* Mobile Toggle */}
        <Button
          size="icon"
          variant="outline"
          className="rounded-full md:hidden"
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
