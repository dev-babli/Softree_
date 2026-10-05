"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrustStrip from "@/components/sections/TrustStrip";
import AgenticFactory3D from "./agentic-factory-3d";

export default function LogisticsAgenticHero() {
  return (
    <section
      aria-labelledby="logistics-testing-hero-title"
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-[#020713] pb-4 pt-[104px] font-sans text-white md:pt-[112px]"
    >
      {/* 3D Background Factory Scene */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* We use the embed prop so it shifts to the right on wide screens */}
        <AgenticFactory3D height="100%" embed={true} />
      </div>
      
      {/* Overlay to ensure text readability on mobile if they overlap */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020713] via-[#020713]/80 to-transparent lg:w-[60%] pointer-events-none z-0" />

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="max-w-[640px] pointer-events-auto">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[3px] w-8 rounded-full bg-[#ff6b1a]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ff7a24] sm:text-xs">
              Logistics Testing Services
            </span>
          </div>

          <h1
            id="logistics-testing-hero-title"
            className="font-['Plus_Jakarta_Sans',sans-serif] text-[clamp(2.2rem,3.4vw,3.75rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-white"
          >
            <span className="block">Validate Every Layer of</span>
            <span className="block">
              Your <span className="text-[#ff6b1a]">Logistics Systems</span>
            </span>
          </h1>

          <p className="mt-5 text-lg font-semibold text-[#d5deef] sm:text-xl">
            Your Offshore Logistics Software Testing & QA Partner
          </p>

          <p className="mt-4 max-w-[540px] text-[15px] leading-7 text-slate-400">
            Test TMS, WMS, warehouse automation, visibility platforms, and EDI
            integrations before they hit production. Softree validates
            dispatch, inventory, carrier data, APIs, performance, and security
            across the supply chain stack.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#ff6b00] px-6 text-sm font-semibold text-white shadow-[0_0_28px_rgba(255,107,0,0.32)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ff7b22]"
            >
              Talk to Our Logistics Testing Team
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#what-we-test"
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-[#ff7823]/70 bg-[#071326]/80 px-6 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#0b1b32]"
            >
              Explore What We Test
              <ArrowRight className="h-4 w-4 text-[#ff7823] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-20 w-full pb-3 pt-2 pointer-events-auto">
        <TrustStrip theme="dark" />
      </div>
    </section>
  );
}
