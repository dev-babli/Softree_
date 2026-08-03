"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { cn } from "@/lib/utils";

type StickyFooterProps = React.ComponentProps<"footer">;

const CREAM = "#F6F1E6";
const LOGO_LIGHT = "/logo/Softree-Technology-Final-Logo.png";

const footerColumns = [
  {
    label: "Company",
    links: [
      { title: "Home", href: "/" },
      { title: "AI Solutions", href: "/ai" },
      { title: "Case Studies", href: "/case-studies" },
      { title: "About Us", href: "/about-us" },
      { title: "Careers", href: "/careers" },
      { title: "Contact", href: "/contact" },
      { title: "Book a Call 🤝", href: "/book-meeting" },
    ],
  },
  {
    label: "Connect",
    links: [
      { title: "LinkedIn", href: "https://www.linkedin.com/company/softree-technology-pvt-ltd/", external: true },
      { title: "Twitter", href: "https://x.com/softreetechnology", external: true },
      { title: "Facebook", href: "https://www.facebook.com/softreetechnology", external: true },
      { title: "Instagram", href: "https://www.instagram.com/softreetechnology/", external: true },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "Blog", href: "https://www.softreetechnology.com/blog", external: true },
      { title: "Services", href: "/services" },
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Terms of Service", href: "/terms" },
    ],
  },
];

const SOCIAL_PILLS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/softree-technology-pvt-ltd/",
    icon: FaLinkedinIn,
    gradient: "linear-gradient(135deg, #0A66C2 0%, #004182 100%)",
  },
  {
    id: "twitter",
    label: "Twitter",
    href: "https://x.com/softreetechnology",
    icon: FaTwitter,
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #000000 100%)",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/softreetechnology",
    icon: FaFacebookF,
    gradient: "linear-gradient(135deg, #1877F2 0%, #0a4dbb 100%)",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/softreetechnology/",
    icon: FaInstagram,
    gradient: "linear-gradient(135deg, #F58529 0%, #DD2A7B 45%, #8134AF 75%, #515BD4 100%)",
  },
];

function SocialPillRow() {
  return (
    <div className="mt-4 flex h-11 items-center gap-2">
      {SOCIAL_PILLS.map((pill) => {
        const Icon = pill.icon;
        return (
          <Link
            key={pill.id}
            href={pill.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={pill.label}
            className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            style={{ background: pill.gradient }}
          >
            <Icon className="h-4.5 w-4.5" />
          </Link>
        );
      })}
    </div>
  );
}

/* Tiny external-link arrow */
function Arrow() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" className="ml-0.5 inline-block opacity-50">
      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StickyFooter({ className, ...props }: StickyFooterProps) {
  return (
    <footer
      className={cn("w-full bg-black", className)}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .sticky-footer-container {
          --dark-left: max(220px, 43svh);
          --dark-right: max(180px, 35svh);
        }
        @media (min-width: 768px) {
          .sticky-footer-container {
            --dark-left: max(300px, 43svh);
            --dark-right: max(240px, 35svh);
          }
        }
      `}} />
      {/* FULL-WIDTH CARD — fills entire viewport height */}
      <div className="sticky-footer-container relative w-full overflow-hidden" style={{ minHeight: "100svh" }}>

        {/* Layer 1 — Softree orange gradient full-bleed */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at 22% 36%, rgba(255,176,89,0.42), transparent 36%), radial-gradient(circle at 82% 70%, rgba(255,28,18,0.62), transparent 42%), linear-gradient(120deg, #ff7a00 0%, #ff5812 48%, #ff2214 100%)",
          }}
        />

        {/* Layer 2 — Cream shape with stepped diagonal */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: CREAM,
            clipPath: "polygon(0 0, 100% 0, 100% calc(100% - var(--dark-right)), 40% calc(100% - var(--dark-right)), 32% calc(100% - var(--dark-left)), 0 calc(100% - var(--dark-left)))",
          }}
        />

        {/* Layer 3 — Purple zone: wordmark + metadata stacked at bottom-left, logo at bottom-right */}
        <div 
          className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-stretch justify-end pb-6 md:pb-8 px-8 md:px-12 lg:px-16" 
          style={{ height: "var(--dark-left)" }}
        >
          {/* Giant white SOFTREE. wordmark */}
          <div aria-hidden className="w-full overflow-hidden leading-none mb-3">
            <span
              className="select-none font-black leading-none tracking-[-0.045em] text-white whitespace-nowrap block"
              style={{ fontSize: "clamp(72px, 12vw, 190px)", opacity: 1, lineHeight: 0.88, transform: "translateX(-0.02em)" }}
            >
              SOFTREE.
            </span>
          </div>
          {/* Metadata row below wordmark */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <Link href="/privacy-policy" className="inline-flex py-2 items-center rounded-lg text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
              Privacy Policy
            </Link>
            <Link href="/terms" className="inline-flex py-2 items-center rounded-lg text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
              Terms of Service
            </Link>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
              © {new Date().getFullYear()} Softree Technology
            </p>
          </div>
        </div>

        {/* Layer 4 — All content */}
        <div 
          className="relative z-30 flex min-h-[100svh] flex-col px-5 pt-7 sm:px-8 md:px-12 md:pt-8 lg:px-16"
          style={{ paddingBottom: "calc(var(--dark-left) + 32px)" }}
        >

          {/* TOP BAR — real logo + CTAs */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              aria-label="Softree home"
              className="inline-flex min-h-11 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
            >
              <Image
                src={LOGO_LIGHT}
                alt="Softree Technology"
                width={130}
                height={32}
                className="h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/ai"
                className="flex h-11 items-center rounded-full border border-black/25 px-4 text-[12px] font-semibold text-black transition-colors hover:border-black/60 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
              >
                AI Solutions
              </Link>
              <Link
                href="/services"
                className="flex h-11 items-center rounded-full border border-black/25 px-4 text-[12px] font-semibold text-black transition-colors hover:border-black/60 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
              >
                Services
              </Link>
              <Link
                href="/book-meeting"
                className="flex h-11 items-center rounded-full border border-black/25 px-4 text-[12px] font-semibold text-black transition-colors hover:border-black/60 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
              >
                Book a Call
              </Link>
              <Link
                href="/contact"
                className="flex h-11 items-center rounded-full px-5 text-[12px] font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
                style={{ background: "linear-gradient(135deg, rgba(255,122,47,0.97) 0%, rgba(200,80,20,0.92) 100%)" }}
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* 3-COLUMN NAV */}
          <div className="mt-8 grid flex-1 grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
            {footerColumns.map((col) => (
              <div key={col.label} className="flex flex-col">
                <p className="mb-3 text-[12px] font-extrabold uppercase tracking-[0.18em] text-black">
                  {col.label}
                </p>
                <ul className="space-y-1">
                  {col.links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="inline-flex py-1.5 items-center rounded-lg text-[14px] font-medium text-black transition-colors hover:text-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
                      >
                        {link.title}
                        {link.external && <Arrow />}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* SOCIAL CTAs — flex row, hover expands like mission/vision cards */}
                {col.label === "Resources" && (
                  <SocialPillRow />
                )}
              </div>
            ))}
          </div>

          {/* CREAM-ZONE BOTTOM — spacer so content ends above diagonal */}
          <div className="pt-3 pb-1" />
        </div>
      </div>
    </footer>
  );
}