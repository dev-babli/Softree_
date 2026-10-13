"use client";

import * as React from "react";
import TrustStrip from "@/components/sections/TrustStrip";
import CubeWave from "./cube-wave";
import { typography } from "@/lib/typography";

export default function TableauMigrationHero2() {
  return (
    <div className="bg-[#050909] text-white min-h-[90vh] lg:min-h-screen relative flex flex-col pt-20 lg:pt-28 w-full overflow-hidden">
      {/* Background Ambient Layer */}
      <div className="absolute inset-0 bg-[#050909] pointer-events-none" />

      {/* 3D Instanced CubeWave Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <CubeWave
          className="w-full h-full"
          primaryColorHex="#ff5812"
          accentColorHex="#1a0b04"
        />
      </div>

      {/* Subtle top/bottom vignette overlay for crisp readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050909]/70 via-transparent to-[#050909]/90 z-[1] pointer-events-none" />

      {/* Main Content: Centered */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center mt-4 sm:mt-8 lg:mt-10 flex-1">

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/40 bg-orange-500/10 mb-6 backdrop-blur-md shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse shadow-[0_0_10px_rgba(255,107,44,0.9)]" />
          <span className={`${typography.caption.meta} text-[#FF6B2C] font-semibold tracking-widest uppercase text-xs sm:text-sm`}>
            TABLEAU TO POWER BI MIGRATION SERVICES
          </span>
        </div>

        {/* Main H1 Headline matching Image 1 */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 max-w-[1050px] leading-[1.15] tracking-tight">
          Modernize Your Analytics with <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-[#FF6B2C] via-[#FF8A50] to-[#FFA756] bg-clip-text text-transparent">
            Expert Tableau to Power BI
          </span>{" "}
          Migration Services
        </h1>

        {/* Subtitle Description */}
        <p className="text-base sm:text-lg lg:text-xl text-zinc-300 max-w-[880px] leading-relaxed font-normal">
          Migrate and modernize your Tableau environment with Softree’s offshore BI engineering team. We help businesses convert Tableau workbooks, dashboards, calculated fields (LODs), and data sources into high-performance Microsoft Power BI semantic models and interactive reports with structured planning, DAX optimization, and metric validation.
        </p>

        {/* Divider & Sub-caption matching Image 1 */}
        <div className="w-full max-w-2xl mt-12 mb-4 flex items-center justify-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
          <span className="text-[11px] font-bold text-zinc-400 tracking-[0.2em] uppercase">
            TRUSTED BY BUSINESSES AND TECHNOLOGY PARTNERS WORLDWIDE
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        </div>

      </div>

      {/* Floating Trust Strip at Bottom */}
      <div className="relative z-20 mt-auto pt-4 sm:pt-6 pb-6 sm:pb-8 px-4 max-w-7xl mx-auto w-full">
        <TrustStrip theme="dark" />
      </div>
    </div>
  );
}
