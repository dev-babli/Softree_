"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BedrockCodeHeroVisual from "./BedrockCodeHeroVisual";
import TrustStrip from "@/components/sections/TrustStrip";
import { FlowButton } from "@/components/ui/flow-button";
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
    <>
      <section className="relative w-full overflow-hidden bg-[#020306] text-white pt-20 pb-12 sm:pt-20 sm:pb-14 md:pt-24 md:pb-16 lg:pt-24 lg:pb-16">
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
              HERO TOP ROW: SPLIT (LEFT 50% / RIGHT 50%)
             ══════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center lg:items-start">

            {/* ──────────────── LEFT COLUMN: COPY & CTA (50%) ──────────────── */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center z-10 pt-2 lg:pt-4 lg:pl-6 xl:pl-10">
              {/* Eyebrow Label */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 mb-5 text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#ff7a1a] uppercase select-none"
              >
                <Globe2 className="w-4 h-4 text-[#ff7a1a] shrink-0" />
                <span>AMAZON BEDROCK AGENTCORE DEVELOPMENT</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="typo-heading-2 sm:text-5xl lg:text-[48px] xl:text-[56px] font-bold text-white tracking-[-0.03em] leading-[1.08] mb-6"
              >
                Build Production-Ready{" "}
                <span className="text-[#ff6b2c] drop-shadow-[0_0_35px_rgba(255,107,44,0.55)]">
                  AI Agents
                </span>
                <span className="block mt-2 sm:mt-3">
                  With Your Offshore Engineering Partner
                </span>
              </motion.h1>

              {/* Subtitle / Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="typo-description text-base sm:text-lg lg:text-[17px] text-slate-300 font-normal leading-relaxed max-w-xl mb-8"
              >
                Build, deploy and operate AI agents that can reason, use tools, access enterprise data and take real business actions.
              </motion.p>


            </div>

            {/* ──────────────── RIGHT COLUMN: INTERACTIVE BEDROCK HERO VISUAL (50%) ──────────────── */}
            <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center w-full">
              <BedrockCodeHeroVisual />
            </div>

          </div>
        </div>
      </section>

      {/* Trust Strip anchored below hero */}
      <div className="relative z-20 w-full bg-[#05050a] pb-12 pt-4 border-t border-white/10">
        <div className="px-3 sm:px-5 lg:px-[1cm] max-w-[1800px] mx-auto">
          <TrustStrip theme="dark" />
        </div>
      </div>
    </>
  );
}
