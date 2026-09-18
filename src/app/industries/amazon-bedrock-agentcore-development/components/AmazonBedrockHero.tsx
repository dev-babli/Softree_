"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BedrockCodeHeroVisual from "./BedrockCodeHeroVisual";
import {
  Shield,
  Users,
  LayoutGrid,
  Lock,
  Calendar,
  ArrowRight,
  Globe2,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Main Component: AmazonBedrockHero
   ───────────────────────────────────────────────────────────── */
export default function AmazonBedrockHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#020306] text-white pt-24 pb-12 sm:pt-28 sm:pb-14 md:pt-32 md:pb-16 lg:pt-32 lg:pb-16">
      {/* ── AMBIENT GLOW BACKDROPS ── */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(255,107,44,0.12)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 right-[2%] w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle,rgba(255,107,44,0.2)_0%,rgba(255,75,0,0.06)_45%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#020306] to-transparent z-10"
        aria-hidden="true"
      />

      {/* Subtle background tech grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 z-20">
        {/* ══════════════════════════════════════════════
            HERO TOP ROW: SPLIT (LEFT 42% / RIGHT 58%)
           ══════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* ──────────────── LEFT COLUMN: COPY & CTA (42%) ──────────────── */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center z-10">
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 mb-5 text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#ff7a1a] uppercase select-none"
            >
              <Globe2 className="w-4 h-4 text-[#ff7a1a] shrink-0" />
              <span>AMAZON BEDROCK SOLUTIONS</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[48px] xl:text-[56px] font-bold text-white tracking-[-0.03em] leading-[1.08] mb-6"
            >
              Build with<br />
              <span className="text-[#ff6b2c] drop-shadow-[0_0_35px_rgba(255,107,44,0.55)]">
                Amazon Bedrock
              </span><br />
              Scale with Confidence
            </motion.h1>

            {/* Subtitle / Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-[17px] text-slate-300 font-normal leading-relaxed max-w-xl mb-8"
            >
              Accelerate generative AI innovation with Amazon Bedrock. Access
              leading foundation models, build secure applications, and deploy
              at scale with our expert team.
            </motion.p>

            {/* Primary Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 sm:py-4 rounded-full bg-[#ff5812] hover:bg-[#ff6826] text-white text-[15px] font-bold tracking-wide shadow-[0_12px_32px_rgba(255,88,18,0.45)] hover:shadow-[0_16px_44px_rgba(255,88,18,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Talk to Our AI Team</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* ──────────────── RIGHT COLUMN: INTERACTIVE BEDROCK HERO VISUAL (58%) ──────────────── */}
          <div className="lg:col-span-7 xl:col-span-7 relative flex items-center justify-center w-full">
            <BedrockCodeHeroVisual />
          </div>

        </div>

        {/* ══════════════════════════════════════════════
            BOTTOM TRUST / PROOF METRICS STRIP (5 COLUMNS)
           ══════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 lg:mt-12 w-full rounded-2xl border border-white/10 bg-[#090b10]/92 backdrop-blur-xl p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.1)]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-5 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {/* Column 1: AWS CERTIFIED */}
            <div className="flex items-center gap-3.5 sm:px-2 pt-3 sm:pt-0 first:pt-0">
              <div className="w-11 h-11 rounded-full border border-[#ff7a1a]/45 bg-[#ff7a1a]/10 flex items-center justify-center text-[#ff7a1a] shrink-0 shadow-[0_0_16px_rgba(255,122,26,0.25)]">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[12.5px] font-bold uppercase tracking-wider text-white">
                  AWS CERTIFIED
                </span>
                <span className="text-[11.5px] text-slate-400 leading-snug mt-0.5">
                  Trusted cloud delivery partner.
                </span>
              </div>
            </div>

            {/* Column 2: EXPERT AI TEAM */}
            <div className="flex items-center gap-3.5 sm:px-3 pt-3 sm:pt-0">
              <div className="w-11 h-11 rounded-full border border-[#ff7a1a]/45 bg-[#ff7a1a]/10 flex items-center justify-center text-[#ff7a1a] shrink-0 shadow-[0_0_16px_rgba(255,122,26,0.25)]">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[12.5px] font-bold uppercase tracking-wider text-white">
                  EXPERT AI TEAM
                </span>
                <span className="text-[11.5px] text-slate-400 leading-snug mt-0.5">
                  Build and scale with proven expertise.
                </span>
              </div>
            </div>

            {/* Column 3: LEADING MODELS */}
            <div className="flex items-center gap-3.5 sm:px-3 pt-3 sm:pt-0">
              <div className="w-11 h-11 rounded-full border border-[#ff7a1a]/45 bg-[#ff7a1a]/10 flex items-center justify-center text-[#ff7a1a] shrink-0 shadow-[0_0_16px_rgba(255,122,26,0.25)]">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[12.5px] font-bold uppercase tracking-wider text-white">
                  LEADING MODELS
                </span>
                <span className="text-[11.5px] text-slate-400 leading-snug mt-0.5">
                  Claude · Llama · Mistral · Titan
                </span>
              </div>
            </div>

            {/* Column 4: SECURE BY DESIGN */}
            <div className="flex items-center gap-3.5 sm:px-3 pt-3 sm:pt-0">
              <div className="w-11 h-11 rounded-full border border-[#ff7a1a]/45 bg-[#ff7a1a]/10 flex items-center justify-center text-[#ff7a1a] shrink-0 shadow-[0_0_16px_rgba(255,122,26,0.25)]">
                <Lock className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[12.5px] font-bold uppercase tracking-wider text-white">
                  SECURE BY DESIGN
                </span>
                <span className="text-[11.5px] text-slate-400 leading-snug mt-0.5">
                  Enterprise-grade security &amp; compliance.
                </span>
              </div>
            </div>

            {/* Column 5: DELIVERY EXCELLENCE */}
            <div className="flex items-center gap-3.5 sm:px-3 pt-3 sm:pt-0">
              <div className="w-11 h-11 rounded-full border border-[#ff7a1a]/45 bg-[#ff7a1a]/10 flex items-center justify-center text-[#ff7a1a] shrink-0 shadow-[0_0_16px_rgba(255,122,26,0.25)]">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[12.5px] font-bold uppercase tracking-wider text-white">
                  DELIVERY EXCELLENCE
                </span>
                <span className="text-[11.5px] text-slate-400 leading-snug mt-0.5">
                  13+ years of engineering impact.
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
