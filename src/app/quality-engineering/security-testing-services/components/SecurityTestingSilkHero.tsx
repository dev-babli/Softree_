"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Terminal, ShieldAlert, Bug, Lock, Sparkles, Sliders } from "lucide-react";
import { MatrixCodeRain } from "@/components/ui/matrix-code-rain";
import TrustStrip from "@/components/sections/TrustStrip";

const COLOR_PRESETS = [
  { name: "Orange-Red Flame", mode: "orange-red" as const, color: "#FF6B2C", gradient: "from-[#FF6B2C] to-[#EF4444]" },
  { name: "Neon Orange", mode: "monochrome" as const, color: "#FF6B2C", gradient: "from-[#FF6B2C] to-[#FF8A00]" },
  { name: "Crimson Red", mode: "monochrome" as const, color: "#EF4444", gradient: "from-[#EF4444] to-[#991B1B]" },
  { name: "Matrix Green", mode: "monochrome" as const, color: "#00FF41", gradient: "from-[#00FF41] to-[#008F11]" },
];

export default function SecurityTestingSilkHero() {
  const [activePreset, setActivePreset] = useState(COLOR_PRESETS[0]);
  const [speed, setSpeed] = useState(0.5);
  const [density, setDensity] = useState(1.3);
  const [showHud, setShowHud] = useState(false);

  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-black flex flex-col justify-between items-center text-center px-4 sm:px-6 lg:px-8 border-b border-white/10">
      {/* Background Matrix Rain - Orange to Red Flame Stream */}
      <div className="absolute inset-0 z-0">
        <MatrixCodeRain
          textColor={activePreset.color}
          colorMode={activePreset.mode}
          speed={speed}
          density={density}
          fontSize={15}
          className="absolute inset-0 w-full h-full"
          preventPageScroll={false}
        />
        {/* Soft edge fade only at the very bottom so rain is brightly visible across the screen */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/25 via-transparent to-black/85" />
      </div>

      {/* Hero Foreground Content with frosted text backdrop */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-1 flex-col items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-6 md:pb-8">
        {/* Terminal Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-orange-500/35 bg-black/80 backdrop-blur-md mb-6 shadow-[0_0_25px_rgba(255,107,44,0.3)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r from-orange-500 to-red-500" />
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-200">
            APPLICATION SECURITY & QUALITY ASSURANCE
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-orange-500/40 bg-orange-950/60 text-orange-400 hidden sm:inline">
            DEVSECOPS
          </span>
        </div>


        {/* Main Heading - Orange-Red Gradient Text */}
        <div className="p-4 sm:p-6 rounded-3xl bg-black/40 backdrop-blur-[2px]">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.12] max-w-4xl text-center mx-auto">
            Comprehensive
            <br />
            <span className="bg-gradient-to-r from-[#FF8A00] via-[#FF5500] to-[#EF4444] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,107,44,0.4)] inline-block">
              Application Security
            </span>
            <br />
            Quality Assurance Services
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-center mt-5 font-normal drop-shadow-md">
            Strengthen software defenses and protect critical assets with full-scope
            vulnerability assessments, penetration testing (VAPT), offensive security
            emulation, and continuous DevSecOps pipeline verification.
          </p>
        </div>
      </div>

      {/* Trust Strip anchored to bottom border of the hero */}
      <div className="relative w-full z-20 pb-6 sm:pb-8 mt-auto [&>div]:!mt-2 [&>div]:!gap-4 sm:[&>div]:!gap-6">
        <TrustStrip theme="dark" />
      </div>

      {/* Subtle bottom glowing orange accent line at border */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B2C]/40 to-transparent" />
    </section>
  );
}
