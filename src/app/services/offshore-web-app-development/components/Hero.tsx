"use client";

import React from "react";
import TrustStrip from "@/components/sections/TrustStrip";
import { typography } from "@/lib/typography";
import { ImageStreamHero, StreamImage } from "./ImageStreamHero";

/* ── Web Application CDN Images ──────────────────────────────────
 * High-resolution imagery representing modern web applications:
 * SaaS dashboards, code IDE screens, analytics portals,
 * cloud architecture, and responsive interface engineering.
 * ─────────────────────────────────────────────────────────────── */

const WEB_APP_IMAGES: StreamImage[] = [
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=80",
    alt: "Real-time SaaS analytics and data visualization dashboard",
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80",
    alt: "Full-stack web application code on dual monitors",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    alt: "Web application financial performance and metrics dashboard",
  },
  {
    src: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&auto=format&fit=crop&q=80",
    alt: "Modern web user experience and interface mockup",
  },
  {
    src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop&q=80",
    alt: "Full-stack developer building enterprise web app",
  },
];

export function Hero() {
  return (
    <section className="relative w-full bg-[#07080b] text-white overflow-hidden border-b border-white/10">
      {/* ─────────────────────────────────────────────────────────────
          MOBILE VIEW (< lg): Stacked Order
          1. First Content
          2. In the Middle: The 3D Cards Corridor
          3. Below: Bottom Trust Strip
          ───────────────────────────────────────────────────────────── */}
      <div className="block lg:hidden relative w-full pt-24 sm:pt-28 pb-8 flex flex-col items-center">
        {/* Ambient background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-1/2 h-80 w-80 translate-x-1/2 rounded-full bg-gradient-to-br from-[#FF5812]/20 via-orange-600/5 to-transparent blur-3xl z-[1]"
        />

        {/* 1. FIRST: Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 flex flex-col items-center text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-black/70 backdrop-blur-md mb-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2C] animate-pulse shrink-0" />
            <span className={`${typography.caption.default} font-semibold text-[#FF6B2C] text-[10px] tracking-wider uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]`}>
              OFFSHORE WEB APP DEVELOPMENT
            </span>
          </div>

          {/* H1 Heading */}
          <h1 className={`${typography.title} font-bold text-white tracking-tight leading-[1.08] max-w-4xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]`}>
            Custom Web Application{" "}
            <span className="block sm:inline">Development Services for</span>{" "}
            <span className="bg-gradient-to-r from-[#FF5812] via-[#FF7A3D] to-[#FFA756] bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(255,88,18,0.4)]">
              Business Growth
            </span>
          </h1>

          {/* Description */}
          <p className={`mt-3 max-w-2xl text-balance ${typography.description.default} text-zinc-300 leading-relaxed font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]`}>
            Build secure, scalable web applications with Softree Technology. Our offshore web developers deliver custom web apps, enterprise solutions, and seamless API integrations to support business growth.
          </p>
        </div>

        {/* 2. IN THE MIDDLE: The 3D Cards Corridor */}
        <div className="relative w-full h-[240px] sm:h-[280px] my-3 overflow-hidden">
          <ImageStreamHero
            images={WEB_APP_IMAGES}
            cards={8}
            speed={20}
            axis={50}
            className="w-full h-full bg-transparent overflow-hidden"
          >
            {/* Subtle top & bottom edge fades */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-[#07080b] to-transparent z-[1]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#07080b] to-transparent z-[1]"
            />
          </ImageStreamHero>
        </div>

        {/* 3. BELOW: Bottom Trust Strip */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-4">
          <TrustStrip theme="dark" className="!mt-0" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          DESKTOP VIEW (>= lg): Preserved Full Stage 3D Corridor Layout
          (Unchanged - Perfect on desktop)
          ───────────────────────────────────────────────────────────── */}
      <ImageStreamHero
        images={WEB_APP_IMAGES}
        cards={10}
        speed={22}
        axis={62}
        className="hidden lg:flex relative w-full min-h-[820px] sm:min-h-[880px] lg:min-h-[940px] flex-col justify-between items-center pt-20 sm:pt-24 lg:pt-20 pb-6 sm:pb-8 bg-transparent"
      >
        {/* Ambient background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-1/2 h-96 w-96 translate-x-1/2 rounded-full bg-gradient-to-br from-[#FF5812]/20 via-orange-600/5 to-transparent blur-3xl z-[1]"
        />

        {/* Soft radial contrast mask behind top text to make headline super crisp */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[450px] bg-[radial-gradient(ellipse_at_50%_30%,rgba(7,8,11,0.92)_0%,rgba(7,8,11,0.6)_50%,transparent_80%)] z-[2]"
        />

        {/* Subtle edge fades top and bottom */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#07080b] to-transparent z-[3]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#07080b] via-[#07080b]/90 to-transparent z-[3]"
        />

        {/* 1. TOP: Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 flex flex-col items-center text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/15 bg-black/70 backdrop-blur-md mb-3 sm:mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF6B2C] animate-pulse shrink-0" />
            <span className={`${typography.caption.default} font-semibold text-[#FF6B2C] text-[10px] sm:text-xs tracking-wider uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]`}>
              OFFSHORE WEB APP DEVELOPMENT
            </span>
          </div>

          {/* H1 Heading */}
          <h1 className={`${typography.title} font-bold text-white tracking-tight leading-[1.08] max-w-4xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]`}>
            Custom Web Application{" "}
            <span className="block sm:inline">Development Services for</span>{" "}
            <span className="bg-gradient-to-r from-[#FF5812] via-[#FF7A3D] to-[#FFA756] bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(255,88,18,0.4)]">
              Business Growth
            </span>
          </h1>

          {/* Description */}
          <p className={`mt-3 sm:mt-4 max-w-2xl text-balance ${typography.description.default} text-zinc-300 leading-relaxed font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]`}>
            Build secure, scalable web applications with Softree Technology. Our offshore web developers deliver custom web apps, enterprise solutions, and seamless API integrations to support business growth.
          </p>
        </div>

        {/* 2. MIDDLE: Perspective Corridor Breathing Area */}
        <div className="relative z-10 w-full flex-1 min-h-[60px] sm:min-h-[100px] pointer-events-none" />

        {/* 3. BOTTOM: Trust Strip */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8">
          <TrustStrip theme="dark" className="!mt-0" />
        </div>
      </ImageStreamHero>
    </section>
  );
}

export default Hero;
