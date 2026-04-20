"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Mail,
} from "lucide-react";
import { CenterUnderline } from "../sections/underline-animation";

const LOGO_URL =
  "https://www.softreetechnology.com/wp-content/uploads/elementor/thumbs/white-logo-soft-qt16xqrm9tl34ewl9f9uhep3zaj8m5zkpgualw8uf4.png";

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}
interface FooterLinkGroup {
  label: string;
  links: FooterLink[];
}

type StickyFooterProps = React.ComponentProps<"footer">;

const socialLinks = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/softreetechnology",
    icon: Facebook,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/softreetechnology/",
    icon: Instagram,
  },
  {
    title: "Youtube",
    href: "https://www.youtube.com/@softreetechnologypvt.ltd.9452",
    icon: Youtube,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/company/softree-technology-pvt-ltd/",
    icon: Linkedin,
  },
];

const footerLinkGroups: FooterLinkGroup[] = [
  {
    label: "Digital Engineering",
    links: [
      { title: "Web App Development", href: "/services/digital-workspace/web-app-development" },
      {
        title: "Mobile App Development",
        href: "/services/digital-workspace/mobile-app-development",
      },
      // { title: "Softree for Startups", href: "/services/softree-for-startups" },
      { title: "MVP Development", href: "/services/business-applications/mvp" },
    ],
  },
  {
    label: "SharePoint & M365",
    links: [
      { title: "SharePoint Development", href: "/services/digital-workspace/sharepoint" },
      { title: "SPFx Solutions", href: "/services/digital-workspace/spfx-developments" },
    ],
  },
  {
    label: "Power Platform",
    links: [
      { title: "Power Apps", href: "/services/business-applications/power-apps" },
      { title: "Power BI", href: "/services/data-analytics/power-bi" },
       { title: "Microsoft Fabric", href: "/services/data-analytics/microsoft-fabric" },
    ],
  },
  {
    label: "AI Services",
    links: [
      { title: "Agentic AI", href: "/services/ai-intelligence/agentic-ai" },
      { title: "Generative AI", href: "/services/ai-intelligence/generative-ai" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "About Us", href: "/about-us" },
      { title: "Contact", href: "/contact" },
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Terms", href: "/terms" },
    ],
  },
];

function AnimatedContainer({
  delay = 0.1,
  children,
  ...props
}: React.ComponentProps<typeof motion.div> & {
  children?: React.ReactNode;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StickyFooter({ className, ...props }: StickyFooterProps) {
  return (
    <footer
      className={cn("w-full border-t border-slate-200 bg-white", className)}
      {...props}
    >
      <div className="relative mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-12 lg:px-16">
        {/* Background orbs - overflow-hidden only on this decorative layer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg"
        >
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.04)_0%,transparent_70%)]" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.03)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          {/* Brand block */}
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
            <div className="space-y-6">
              <Link href="/" className="inline-block">
                <Image
                  src={LOGO_URL}
                  alt="Softree Technology"
                  width={140}
                  height={36}
                  className="h-9 w-auto object-contain invert opacity-90 hover:opacity-100 transition-opacity"
                />
              </Link>
              <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                Building scalable, secure digital experiences for startups and
                enterprises worldwide. Expert engineering across Power Platform,
                Data, AI & Modern Applications.
              </p>
              <div className="flex gap-2">
                {socialLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.title}
                    className="flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <link.icon className="size-4" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-slate-900 text-xs font-semibold uppercase tracking-wider mb-5">
                Contact
              </h3>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link
                    href="tel:+917008699927"
                    className="group inline-flex items-center gap-2.5 text-slate-600 hover:text-slate-900"
                  >
                    <Phone className="size-4 shrink-0 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    <CenterUnderline
                      label="+91 70086 99927"
                      className="text-inherit"
                      underlineClassName="bg-blue-600"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:sales@softreetechnology.com"
                    className="group inline-flex items-center gap-2.5 text-slate-600 hover:text-slate-900"
                  >
                    <Mail className="size-4 shrink-0 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    <CenterUnderline
                      label="sales@softreetechnology.com"
                      className="text-inherit"
                      underlineClassName="bg-blue-600"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Link groups */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {footerLinkGroups.map((group, index) => (
              <AnimatedContainer key={group.label} delay={0.05 + index * 0.05}>
                <h3 className="text-slate-900 text-xs font-semibold uppercase tracking-wider mb-6">
                  {group.label}
                </h3>
                <ul className="space-y-4 text-sm">
                  {group.links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"
                      >
                        {link.icon && <link.icon className="size-4 shrink-0" />}
                        <CenterUnderline
                          label={link.title}
                          className="text-inherit"
                          underlineClassName="bg-blue-600"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </AnimatedContainer>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Softree Technology. All rights
            reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="/privacy-policy"
              className="text-slate-500 hover:text-slate-900"
            >
              <CenterUnderline
                label="Privacy Policy"
                className="text-inherit"
                underlineClassName="bg-blue-600"
              />
            </Link>
            <Link href="/terms" className="text-slate-500 hover:text-slate-900">
              <CenterUnderline
                label="Terms"
                className="text-inherit"
                underlineClassName="bg-blue-600"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
