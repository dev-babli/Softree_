'use client';

import * as React from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import type { LucideIcon } from 'lucide-react';
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
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

/* =========================
   LOGO
========================= */
const LOGO_URL =
  'https://www.softreetechnology.com/wp-content/uploads/elementor/thumbs/white-logo-soft-qt16xqrm9tl34ewl9f9uhep3zaj8m5zkpgualw8uf4.png';

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
  { label: 'Home', url: '/', icon: Home },
  { label: 'About', url: '/about-us', icon: Info },
  {
    label: 'Services',
    url: '/services',
    icon: Settings,
    mega: true,
    children: [
      {
        title: 'App Development',
        links: [
          {
            label: 'Softree for Startups',
            url: '/services/softree-for-startups',
            icon: Users,
            description: 'Custom app solutions for startups',
          },
          {
            label: 'Mobile App Development',
            url: '/services/mobile-app-development',
            icon: Smartphone,
            description: 'iOS & Android applications',
          },
          {
            label: 'Web App Development',
            url: '/services/web-app-development',
            icon: Laptop,
            description: 'Modern scalable web apps',
          },
        ],
      },
      {
        title: 'SharePoint Services',
        links: [
          {
            label: 'SharePoint Development',
            url: '/services/sharepoint',
            icon: Share2,
          },
          {
            label: 'SPFx Developments',
            url: '/services/spfx-developments',
            icon: FileText,
          },
          {
            label: 'PnP PowerShell',
            url: '/services/pnp-powershell',
            icon: Database,
          },
          {
            label: 'Teams App Development',
            url: '/services/teams-app-development',
            icon: Building2,
          },
        ],
      },
      {
        title: 'Power Platform',
        links: [
          {
            label: 'Power Apps',
            url: '/services/power-apps',
            icon: Building2,
          },
          {
            label: 'Power Pages',
            url: '/services/power-pages',
            icon: Building2,
          },
          {
            label: 'Power BI',
            url: '/services/power-bi',
            icon: BarChart3,
          },
        ],
      },
    ],
  },
  { label: 'Blog', url: '/blog/all-posts', icon: BookOpen },
  { label: 'Contact', url: '/contact', icon: Phone },
];

/* =========================
   HEADER
========================= */
export function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Image src={LOGO_URL} alt="Softree" width={120} height={24} priority />

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {menu.map((item) => {
                const Icon = item.icon;

                if (item.mega) {
                  return (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuTrigger className="bg-transparent">
                        {Icon && <Icon className="mr-2 h-4 w-4" />}
                        {item.label}
                      </NavigationMenuTrigger>

                      <NavigationMenuContent>
                        <div className="grid w-[900px] grid-cols-3 gap-6 p-6">
                          {item.children.map((section) => (
                            <div key={section.title}>
                              <h4 className="mb-3 text-sm font-semibold">
                                {section.title}
                              </h4>

                              <ul className="space-y-2">
                                {section.links.map((link) => {
                                  const LinkIcon = link.icon;
                                  return (
                                    <li key={link.label}>
                                      <a
                                        href={link.url}
                                        className="flex gap-3 rounded-md p-2 hover:bg-accent"
                                      >
                                        {LinkIcon && (
                                          <div className="flex h-9 w-9 items-center justify-center rounded-md border">
                                            <LinkIcon className="h-4 w-4" />
                                          </div>
                                        )}
                                        <div>
                                          <div className="text-sm font-medium">
                                            {link.label}
                                          </div>
                                          {link.description && (
                                            <div className="text-xs text-muted-foreground">
                                              {link.description}
                                            </div>
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

                return (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink asChild>
                      <a
                        href={item.url}
                        className="flex items-center gap-2 rounded-md px-4 py-2 hover:bg-accent"
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {item.label}
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Actions */}
        <div className="hidden md:flex gap-2">
          <Button variant="outline">Sign In</Button>
          <Button>Get Started</Button>
        </div>

        {/* Mobile Toggle */}
        <Button
          size="icon"
          variant="outline"
          className="md:hidden"
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
  if (!open || typeof window === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 top-14 z-40 bg-background p-4 md:hidden">
      <div className="space-y-4">{children}</div>
    </div>,
    document.body
  );
}
