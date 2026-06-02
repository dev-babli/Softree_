"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Grainient from "@/components/homepage-light/Grainient";

type StickyFooterProps = React.ComponentProps<"footer">;

const CREAM = "#F6F1E6";
const LOGO_LIGHT = "/logo/Softree-Technology-Final-Logo.png";
const LOGO_LIGHT_BG = "/logo/Softree-Technology-Final-Logo-Light-BG.png";

const footerColumns = [
  {
    label: "Company",
    links: [
      { title: "Home", href: "/" },
      { title: "About Us", href: "/about-us" },
      { title: "Case Studies", href: "/case-studies" },
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
    icon: Linkedin,
    gradient: "linear-gradient(135deg, #0A66C2 0%, #004182 100%)",
  },
  {
    id: "twitter",
    label: "Twitter",
    href: "https://x.com/softreetechnology",
    icon: Twitter,
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #000000 100%)",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/softreetechnology",
    icon: Facebook,
    gradient: "linear-gradient(135deg, #1877F2 0%, #0a4dbb 100%)",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/softreetechnology/",
    icon: Instagram,
    gradient: "linear-gradient(135deg, #F58529 0%, #DD2A7B 45%, #8134AF 75%, #515BD4 100%)",
  },
];

/* Social pills row — exact same flex-expand mechanic as mission/vision cards */
function SocialPillRow() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="mt-8 flex h-11 items-center gap-2">
      {SOCIAL_PILLS.map((pill) => {
        const Icon = pill.icon;
        const isHovered = hovered === pill.id;
        return (
          <motion.div
            key={pill.id}
            animate={{ width: isHovered ? "auto" : 44 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-11 overflow-hidden rounded-full"
            style={{ background: pill.gradient, minWidth: 44 }}
            onMouseEnter={() => setHovered(pill.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <Link
              href={pill.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={pill.label}
              className="flex h-full items-center text-white"
              style={{ width: "max-content" }}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <motion.span
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2, delay: isHovered ? 0.18 : 0 }}
                className="whitespace-nowrap pr-4 text-[13px] font-semibold"
              >
                {pill.label}
              </motion.span>
            </Link>
          </motion.div>
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
      {/* FULL-WIDTH CARD — fills entire viewport height */}
      <div className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 560 }}>

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
            clipPath: "polygon(0 0, 100% 0, 100% 65%, 40% 65%, 32% 57%, 0 57%)",
          }}
        />

        {/* Layer 3 — Purple zone: wordmark + metadata stacked at bottom-left, logo at bottom-right */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-start justify-end pb-5 px-8 md:px-12 lg:px-16" style={{ height: "43%" }}>
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
            <Link href="/privacy-policy" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
              © {new Date().getFullYear()} Softree Technology
            </p>
          </div>
        </div>

        {/* Logo — bottom-right of purple zone */}
        <div className="absolute bottom-5 right-8 z-20 md:right-12 lg:right-16">
          <Image
            src={LOGO_LIGHT_BG}
            alt="Softree Technology"
            width={120}
            height={30}
            className="h-7 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>

        {/* Layer 4 — All content */}
        <div className="relative z-30 flex h-full flex-col px-8 pt-7 pb-6 md:px-12 md:pt-8 lg:px-16">

          {/* TOP BAR — real logo + CTAs */}
          <div className="flex items-center justify-between">
            <Link href="/" aria-label="Softree home">
              <Image
                src={LOGO_LIGHT}
                alt="Softree Technology"
                width={130}
                height={32}
                className="h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <div className="flex items-center gap-2.5">
              <Link
                href="/services"
                className="flex h-9 items-center rounded-full border border-black/25 px-4 text-[12px] font-semibold text-black transition-all hover:border-black/60 hover:bg-black/5"
              >
                Our Services
              </Link>
              <Link
                href="/book-meeting"
                className="flex h-9 items-center rounded-full border border-black/25 px-4 text-[12px] font-semibold text-black transition-all hover:border-black/60 hover:bg-black/5"
              >
                Book a Call
              </Link>
              <Link
                href="/contact"
                className="flex h-9 items-center rounded-full px-5 text-[12px] font-bold text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, rgba(255,122,47,0.97) 0%, rgba(200,80,20,0.92) 100%)" }}
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* 3-COLUMN NAV */}
          <div className="mt-12 grid flex-1 grid-cols-3 gap-x-12 gap-y-6 md:mt-14">
            {footerColumns.map((col) => (
              <div key={col.label} className="flex flex-col">
                <p className="mb-5 text-[12px] font-extrabold uppercase tracking-[0.18em] text-black">
                  {col.label}
                </p>
                <ul className="space-y-[10px]">
                  {col.links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center text-[14px] font-medium text-black transition-colors hover:text-black/70"
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
