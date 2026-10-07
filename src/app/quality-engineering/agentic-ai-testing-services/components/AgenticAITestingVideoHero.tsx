"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrustStrip from "@/components/sections/TrustStrip";
import { typography } from "@/lib/typography";

export default function AgenticAITestingVideoHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col overflow-hidden bg-zinc-950 font-sans">
      {/* Background Video Layer */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      >
        <source
          src="/ai-development-service-video/agentic-ai-testing-video.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-20 flex flex-1 w-full items-center justify-center px-4 py-20 sm:px-6 text-center">
        <div className={`container mx-auto flex flex-col items-center gap-5 sm:gap-8 max-w-5xl mt-10 sm:mt-12 transition-all duration-1000 ease-out transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-orange-400 uppercase tracking-widest text-[10px] sm:text-xs font-bold">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-500 animate-pulse" />
            AGENTIC AI TESTING SERVICES
          </div>

          {/* Headline */}
          <h1 className={`${typography.heading.h1} text-white drop-shadow-sm`}>
            Your Offshore <span className="text-[#FF6B2C]">Agentic AI Testing & Quality Engineering Partner</span>
          </h1>

          {/* Subheading */}
          <p className={`${typography.description.default} text-slate-300 max-w-3xl mt-2 sm:mt-4 drop-shadow-sm px-2 sm:px-0`}>
            Strengthen AI quality with Softree’s offshore agentic AI testing services, validating AI agents, LLM responses, autonomous workflows, tool usage, security, reliability, and end-to-end AI application interactions.
          </p>
        </div>
      </div>

      {/* Trust Strip anchored to bottom */}
      <div className="relative w-full z-20 pb-6 sm:pb-8 mt-auto">
        <TrustStrip theme="dark" />
      </div>

    </section>
  );
}
