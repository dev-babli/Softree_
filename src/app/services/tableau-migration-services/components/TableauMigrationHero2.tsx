"use client";

import * as React from "react";
import TrustStrip from "@/components/sections/TrustStrip";
import CubeWave from "./cube-wave";
import { typography } from "@/lib/typography";

export default function TableauMigrationHero2() {
  return (
    <div className="bg-[#050909] text-white min-h-[90vh] lg:min-h-screen relative flex flex-col pt-16 lg:pt-20 w-full overflow-hidden">
      {/* Background Ambient Layer */}
      <div className="absolute inset-0 bg-[#050909] pointer-events-none" />

      {/* CubeWave Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <CubeWave
          className="w-full h-full"
          primaryColorHex="#ff5812"
          accentColorHex="#1a0b04"
        />
      </div>

      {/* Gradients for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050909]/80 via-[#050909]/40 to-[#050909]/90 z-[1] pointer-events-none" />

      {/* Main Content: Centered */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center mt-6 sm:mt-10 lg:mt-12 flex-1">

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/35 bg-orange-500/10 mb-5 backdrop-blur-md shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse shadow-[0_0_10px_rgba(255,107,44,0.9)]" />
          <span className={`${typography.caption.meta} text-[#FF6B2C] font-semibold tracking-wider uppercase`}>
            OFFSHORE TABLEAU MIGRATION SERVICES
          </span>
        </div>

        <h1 className={`${typography.heading.h1} text-white mb-6 max-w-[1000px]`}>
          Modernize Your Analytics with <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-[#FF6B2C] via-[#FF8A50] to-[#FFA756] bg-clip-text text-transparent">
            Expert Tableau Migration
          </span>{" "}
          Services
        </h1>

        <p className={`${typography.body.lg} text-zinc-300 max-w-[850px]`}>
          Migrate and modernize your Tableau environment with Softree’s offshore engineering team. We help businesses move  workbooks, dashboards, data sources, and analytics workloads to Tableau Cloud or modern platforms with structured planning, secure migration, validation, and optimization.
        </p>

      </div>

      {/* Trust Strip */}
      <div className="relative z-20 mt-auto pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 max-w-7xl mx-auto w-full">
        <TrustStrip theme="dark" />
      </div>
    </div>
  );
}
