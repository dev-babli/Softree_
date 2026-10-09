"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import Grainient from "@/components/homepage-light/Grainient";
import { FlowButton } from "@/components/ui/flow-button";

type StickyFooterProps = React.ComponentProps<"footer">;

const CREAM = "#F6F1E6";
const LOGO_LIGHT = "/logo/Softree-Technology-Final-Logo.png";

const footerColumns = [
  {
    label: "Company",
    links: [
      { title: "Home", href: "/", external: true },
      { title: "About Us", href: "/about-us", external: true },
      { title: "Contact", href: "/contact", external: true },
      { title: "Careers", href: "/careers", external: true },
      { title: "Who Do We Serve", href: "https://www.softreetechnology.com/who-do-we-serve", external: true },
      { title: "AI Development Services", href: "https://www.softreetechnology.com/services/ai-development-services", external: true },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "Case Studies", href: "/case-studies", external: true },
      { title: "Blog", href: "https://www.softreetechnology.com/blog", external: true },
      { title: "Privacy Policy", href: "/privacy-policy", external: true },
      { title: "Terms of Service", href: "/terms", external: true },
    ],
  },
  {
    label: "Connect",
    links: [],
  },
];

const SOCIAL_PILLS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/softree-technology-pvt-ltd/",
    icon: Linkedin,
    gradient: "linear-gradient(135deg, #0A66C2 0%, #004182 100%)",
  },
];

function SocialPillRow() {
  return (
    <div className="flex h-11 items-center gap-2">
      {SOCIAL_PILLS.map((pill) => {
        const Icon = pill.icon;
        return (
          <Link
            key={pill.id}
            href={pill.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={pill.label}
            className="group flex items-center gap-3 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50 rounded-lg pr-2"
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full text-white group-hover:opacity-85"
              style={{ background: pill.gradient }}
            >
              <Icon className="h-[18px] w-[18px]" />
            </div>
            <span className="inline-flex items-center typo-body-sm font-medium text-black transition-colors group-hover:text-black/70">
              {pill.label}
              <Arrow />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

/* Tiny external-link arrow */
function Arrow() {
  return (
    <svg 
      width="9" 
      height="9" 
      viewBox="0 0 10 10" 
      fill="none" 
      className="ml-1 inline-block text-[#FF5812] transition-all duration-300 group-hover:scale-125 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:drop-shadow-[0_0_8px_rgba(255,88,18,0.8)]"
    >
      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

        {/* Layer 1 — Purple Grainient full-bleed */}
        <div className="absolute inset-0 z-0">
          <Grainient
            color1="#ff7a2f"
            color2="#b84500"
            color3="#0d0500"
            grainAmount={0.22}
            grainAnimated
            warpStrength={1.5}
            warpFrequency={4.5}
            warpSpeed={1.0}
            warpAmplitude={32}
            contrast={1.7}
            saturation={1.4}
            zoom={0.9}
          />
        </div>

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
            <Link href="/privacy-policy" className="inline-flex py-2 items-center rounded-lg typo-caption text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
              Privacy Policy
            </Link>
            <Link href="/terms" className="inline-flex py-2 items-center rounded-lg typo-caption text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
              Terms of Service
            </Link>
            <p className="typo-caption text-white/70">
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
              <FlowButton 
                href="/contact" 
                text="Get in Touch" 
                variant="orange-filled" 
              />
            </div>
          </div>

          {/* 3-COLUMN NAV */}
          <div className="mt-8 grid flex-1 grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
            {footerColumns.map((col) => (
              <div key={col.label} className="flex flex-col">
                <div className={cn("mb-4 flex flex-col items-start", col.label === "Connect" && "ml-[56px]")}>
                  <p className="typo-caption text-[#FF5812] uppercase font-bold tracking-wider border-b-[2px] border-[#FF5812] pb-1.5">
                    {col.label}
                  </p>
                </div>
                <ul className="space-y-1">
                  {col.links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="group inline-flex py-1.5 items-center rounded-lg typo-body-sm font-medium text-black transition-colors hover:text-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
                      >
                        {link.title}
                        {link.external && <Arrow />}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* SOCIAL CTAs — flex row, hover expands like mission/vision cards */}
                {col.label === "Connect" && (
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
