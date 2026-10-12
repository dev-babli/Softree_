"use client";

import React, { useEffect, useState } from "react";
import TrustStrip from "@/components/sections/TrustStrip";
import BallStudy from "@/components/ui/ball-study";

export default function AgenticAITestingVideoHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full min-h-[95svh] md:min-h-screen flex flex-col justify-between overflow-hidden bg-zinc-950 font-sans">
      {/* Hero Content - 3 Column Layout with Grand Scale */}
      <div className="relative z-20 flex flex-1 w-full items-center justify-center px-4 sm:px-8 lg:px-12 xl:px-16 pt-24 pb-8 lg:pt-28 lg:pb-6">
        <div
          className={`w-full max-w-[1680px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-12 items-stretch transition-all duration-1000 ease-out transform ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {/* Column 1 (Left): Eyebrow & Prominent Headline */}
          <div className="lg:col-span-4 flex flex-col justify-center items-start text-left h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[520px] py-2">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-orange-400 uppercase tracking-widest text-[11px] sm:text-xs font-bold mb-6">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              AGENTIC AI TESTING SERVICES
            </div>
            {/* Headline - Slightly Smaller & Responsive */}
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[40px] 2xl:text-[44px] font-extrabold tracking-tight text-white leading-[1.14] drop-shadow-sm">
              Agentic AI Testing &{" "}
              <span className="text-[#FF6B2C]">
                Quality Assurance Services
              </span>{" "}
              with Offshore Engineering Expertise
            </h1>          
          </div>

          {/* Column 2 (Middle): Giant Rotating Transparent Globe */}
          <div className="lg:col-span-4 relative w-full h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[520px] flex items-center justify-center">
            <div className="relative w-full aspect-square max-h-[420px] sm:max-h-[460px] lg:max-h-[500px] xl:max-h-[540px] flex items-center justify-center">
              <BallStudy className="block h-full w-full" />
            </div>
          </div>

          {/* Column 3 (Right): Subheading Description & Capability Points */}
          <div className="lg:col-span-4 flex flex-col justify-center items-start text-left h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[520px] py-2 space-y-6">
            <p className="text-slate-200 text-base sm:text-lg lg:text-lg xl:text-xl leading-relaxed drop-shadow-sm font-normal">
              Strengthen AI quality with Softree’s offshore agentic AI testing services, validating AI agents, LLM responses, autonomous workflows, tool usage, security, reliability, and end-to-end AI application interactions.
            </p>

            <div className="pt-6 border-t border-white/10 w-full space-y-3.5">
              <div className="flex items-start gap-3 text-sm sm:text-base lg:text-base text-slate-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#FF6B2C] mt-2 shrink-0 shadow-[0_0_8px_#FF6B2C]" />
                <span>Autonomous Workflow & Multi-Step Tool Testing</span>
              </div>
              <div className="flex items-start gap-3 text-sm sm:text-base lg:text-base text-slate-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#FF6B2C] mt-2 shrink-0 shadow-[0_0_8px_#FF6B2C]" />
                <span>LLM Hallucination & Deterministic Output Evals</span>
              </div>
              <div className="flex items-start gap-3 text-sm sm:text-base lg:text-base text-slate-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#FF6B2C] mt-2 shrink-0 shadow-[0_0_8px_#FF6B2C]" />
                <span>Multi-Agent Swarm Validation & Security Benchmarks</span>
              </div>
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
