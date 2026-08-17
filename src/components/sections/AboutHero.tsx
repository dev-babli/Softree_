"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Cpu, LayoutGrid } from "lucide-react";
import { Globe } from "../homepage/globe";
import type { COBEOptions } from "cobe";

const LIGHT_GLOBE_CONFIG: COBEOptions = {
  width: 900,
  height: 900,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0.15,
  theta: 0.22,
  dark: 0,
  diffuse: 1.2,
  mapSamples: 22000,
  mapBrightness: 1.5,
  baseColor: [0.8, 0.8, 0.82],
  markerColor: [255 / 255, 88 / 255, 18 / 255], // Orange
  glowColor: [1, 1, 1],
  markers: [
    { location: [20.5937, 78.9629], size: 0.04 }, // India
    { location: [37.7749, -122.4194], size: 0.04 }, // San Francisco
  ],
};

const MicrosoftIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 23 23" fill="none">
    <rect width="10" height="10" fill="#F25022" />
    <rect x="12" width="10" height="10" fill="#7FBA00" />
    <rect y="12" width="10" height="10" fill="#00A1F1" />
    <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
  </svg>
);

export default function AboutHero() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white pt-4 pb-16 md:pt-6 md:pb-24">
      {/* Subtle light background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.04) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          
          {/* Left Column: Heading (Col Span 5) */}
          <div className="flex flex-col items-start gap-8 lg:col-span-5">
            {/* 1. Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/50 px-4 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-xs"
            >
              <span className="h-2 w-2 rounded-full bg-[#FF5812] shadow-[0_0_6px_rgba(255,88,18,0.4)]" />
              YOUR OFFSHORE ENGINEERING PARTNER
            </motion.div>

            {/* Softree Technology Brand Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[84px] font-bold tracking-tight text-[#0a0a1a] leading-[1.05] shrink-0"
            >
              Softree<sup className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-400 ml-0.5">®</sup>
              <br />
              <span className="text-[#0a0a1a]">Technology</span>
            </motion.h1>
          </div>

          {/* Middle Column: Supporting Copy & Action (Col Span 3) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-6 lg:col-span-3 lg:pt-12"
          >
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0a0a1a]">
              Your engineering team, extended.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
              AI, modern engineering, and Microsoft expertise — delivered by a reliable offshore team built to work as an extension of your business.
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center justify-between rounded-full bg-black pl-6 pr-2.5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-neutral-850 transition-all duration-300 shadow-sm"
            >
              <span>LET'S TALK</span>
              <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-0.5 shadow-xs">
                <svg className="h-4 w-4 text-[#FF5812]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </motion.div>

          {/* Right Column: 3D Platform illustration and Globe (Col Span 4) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-4 w-full aspect-square max-w-[440px] mx-auto flex items-center justify-center select-none bg-white/95 rounded-full border border-slate-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
          >
            {/* Globe Background */}
            <div className="absolute inset-0 z-0 scale-[0.85]">
              <Globe config={LIGHT_GLOBE_CONFIG} className="!max-w-none" />
            </div>

            {/* Circular Stand 3D Stack */}
            <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[78%] h-[12%] pointer-events-none select-none z-10">
              {/* Disc 1 (Bottom Shadow/Base) */}
              <div className="absolute inset-x-[2%] bottom-0 h-[80%] rounded-full bg-slate-200/40 border border-slate-300/20 shadow-[0_16px_32px_rgba(0,0,0,0.06)]" />
              {/* Disc 2 (Middle Layer) */}
              <div className="absolute inset-x-[6%] bottom-[12%] h-[80%] rounded-full bg-gradient-to-b from-white to-slate-100 border border-slate-200/80 shadow-[0_8px_16px_rgba(0,0,0,0.04)]" />
              {/* Disc 3 (Top Plate) */}
              <div className="absolute inset-x-[12%] bottom-[24%] h-[76%] rounded-full bg-white border border-slate-200 shadow-[inset_0_4px_8px_rgba(0,0,0,0.02)]" />
            </div>

            {/* Platform Technology Standing Blocks */}
            
            {/* 1. Modern Engineering (Left) */}
            <motion.div
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute left-[2%] bottom-[14%] z-20 cursor-pointer scale-90 lg:scale-[0.92] origin-bottom"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-100 shadow-[0_12px_24px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] p-4 flex flex-col items-center gap-3.5 w-[108px] aspect-[1/1.22] text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-500">
                  <Code2 className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-extrabold tracking-wider text-slate-800 leading-tight uppercase whitespace-pre-line">
                  {"MODERN\nENGINEERING"}
                </span>
              </div>
            </motion.div>

            {/* 2. AI & Automation (Center-top) */}
            <motion.div
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-[34%] z-20 cursor-pointer scale-90 lg:scale-[0.92] origin-bottom"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-100 shadow-[0_12px_24px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] p-4 flex flex-col items-center gap-3.5 w-[108px] aspect-[1/1.22] text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 border border-orange-100 text-[#FF5812]">
                  <Cpu className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-extrabold tracking-wider text-slate-800 leading-tight uppercase whitespace-pre-line">
                  {"AI &\nAUTOMATION"}
                </span>
              </div>
            </motion.div>

            {/* 3. Microsoft & Data (Right) */}
            <motion.div
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute right-[2%] bottom-[14%] z-20 cursor-pointer scale-90 lg:scale-[0.92] origin-bottom"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-100 shadow-[0_12px_24px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] p-4 flex flex-col items-center gap-3.5 w-[108px] aspect-[1/1.22] text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 border border-red-100">
                  <MicrosoftIcon />
                </div>
                <span className="text-[10px] font-extrabold tracking-wider text-slate-800 leading-tight uppercase whitespace-pre-line">
                  {"MICROSOFT\n& DATA"}
                </span>
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* Bottom Partner Logos Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center gap-8 w-full text-center"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
            TRUSTED BY BUSINESSES AND PARTNERS WORLDWIDE
          </span>

          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-75">
            {/* Microsoft Solutions Partner */}
            <div className="flex items-center gap-2.5">
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 23 23" fill="none">
                <rect width="10" height="10" fill="#F25022" />
                <rect x="12" width="10" height="10" fill="#7FBA00" />
                <rect y="12" width="10" height="10" fill="#00A1F1" />
                <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
              </svg>
              <div className="flex flex-col text-left leading-none">
                <span className="text-sm font-bold text-slate-700">Microsoft</span>
                <span className="text-[10px] font-semibold text-slate-400 mt-0.5">Solutions Partner</span>
              </div>
            </div>

            {/* SharePoint */}
            <div className="flex items-center gap-2.5">
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 32 32" fill="none">
                <path d="M16 0C7.16 0 0 7.16 0 16s7.16 16 16 16 16-7.16 16-16S24.84 0 16 0zm-2 22h-3v-6h3v6zm0-8h-3v-3h3v3zm6 8h-3v-9h3v9zm0-11h-3v-3h3v3z" fill="#107C41" />
              </svg>
              <span className="text-sm font-bold text-slate-700 tracking-tight">SharePoint</span>
            </div>

            {/* Power Platform */}
            <div className="flex items-center gap-2.5">
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L3 9.5v13L16 30l13-7.5v-13L16 2zm0 4.5l8.5 4.9v9.8L16 26.1l-8.5-4.9v-9.8L16 6.5z" fill="#742774" />
              </svg>
              <span className="text-sm font-bold text-slate-700 tracking-tight">Power Platform</span>
            </div>

            {/* Azure */}
            <div className="flex items-center gap-2.5">
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 32 32" fill="none">
                <path d="M19.5 5.5l-8 13.5L5 25.5h22l-7.5-20z" fill="#0078D4" />
                <path d="M11.5 19L5 25.5h13l-6.5-6.5z" fill="#50E4FF" />
              </svg>
              <span className="text-sm font-bold text-slate-700 tracking-tight">Azure</span>
            </div>

            {/* Power BI */}
            <div className="flex items-center gap-2.5">
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 32 32" fill="none">
                <rect x="6" y="16" width="4" height="10" rx="1" fill="#E6A100" />
                <rect x="14" y="10" width="4" height="16" rx="1" fill="#F2C811" />
                <rect x="22" y="4" width="4" height="22" rx="1" fill="#FFF176" />
              </svg>
              <span className="text-sm font-bold text-slate-700 tracking-tight">Power BI</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
