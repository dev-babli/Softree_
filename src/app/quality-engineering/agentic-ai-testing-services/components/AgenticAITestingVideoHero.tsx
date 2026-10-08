"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrustStrip from "@/components/sections/TrustStrip";
import { typography } from "@/lib/typography";
import { LogoBurst } from "@/components/ui/logo-burst";

export default function AgenticAITestingVideoHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col overflow-hidden bg-zinc-950 font-sans">
      {/* Hero Content */}
      <div className="relative z-20 flex flex-1 w-full items-center justify-center px-4 pt-32 pb-16 lg:pt-[120px] lg:pb-0 sm:px-6">
        <div className={`container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl transition-all duration-1000 ease-out transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Left Side: Text Content */}
          <div className="flex flex-col items-start text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-orange-400 uppercase tracking-widest text-[10px] sm:text-xs font-bold mb-6">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-500 animate-pulse" />
              AGENTIC AI TESTING SERVICES
            </div>

            {/* Headline */}
            <h1 className={`${typography.heading.h1} text-white drop-shadow-sm`}>
              Your Offshore <br className="hidden lg:block" />
              <span className="text-[#FF6B2C]">Agentic AI Testing & <br className="hidden lg:block" />Quality Engineering Partner</span>
            </h1>

            {/* Subheading */}
            <p className={`${typography.description.default} text-slate-300 max-w-2xl mt-4 sm:mt-6 drop-shadow-sm`}>
              Strengthen AI quality with Softree’s offshore agentic AI testing services, validating AI agents, LLM responses, autonomous workflows, tool usage, security, reliability, and end-to-end AI application interactions.
            </p>
          </div>

          {/* Right Side: LogoBurst */}
          <div className="relative w-full aspect-square max-h-[350px] lg:max-h-[450px] flex items-center justify-center mx-auto lg:ml-auto">
            <div className="absolute inset-0">
              <LogoBurst color="#FF5812" />
            </div>
          </div>
        </div>
      </div>

      {/* Trust Strip anchored to bottom */}
      <div className="relative w-full z-20 pb-6 sm:pb-8 mt-auto">
        <TrustStrip theme="dark" />
      </div>

    </section>
  );
}
