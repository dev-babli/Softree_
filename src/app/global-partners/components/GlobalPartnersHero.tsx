"use client";

import React from "react";
import { motion } from "framer-motion";
import TrustStrip from "@/components/sections/TrustStrip";
import { HeroOrangeGlobe } from "./HeroOrangeGlobe";

export const GlobalPartnersHero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black font-sans text-white pt-20 pb-6 sm:pt-24 sm:pb-8 lg:min-h-[82svh] lg:pt-24 lg:pb-6 flex flex-col justify-between">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,88,18,0.14),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,88,18,0.08)_0%,transparent_65%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[#FF5812]/[0.06] rounded-full blur-[110px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-6 sm:px-8 lg:px-12 justify-between">
        {/* Main Content Area */}
        <div className="flex flex-1 flex-col justify-center pt-3 sm:pt-5 lg:pt-6 pb-6 lg:pb-10">
          {/* Responsive Layout: 
              Mobile: Content (Heading order-1 + Description order-2) -> Globe (order-3)
              Desktop: Three-Zone (Left Heading cols 1-4 -> Middle Globe cols 5-8 -> Right Description cols 9-12) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-5 lg:gap-y-6 lg:gap-x-8 xl:gap-x-12 items-center">
            {/* Left Column - Eyebrow & 4-Line Heading (order-1 on mobile, cols 1-4 on desktop) */}
            <div className="flex flex-col order-1 lg:order-1 lg:col-span-4 xl:col-span-4 lg:col-start-1 max-w-[420px] z-20">
              {/* Top Badge with Live Beacon Animation */}
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-2.5 self-start rounded-full bg-[#FF5812] px-3.5 py-1.5 shadow-[0_4px_24px_-4px_rgba(255,88,18,0.55)] cursor-default mb-4 sm:mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                <span className="typo-caption font-bold text-white tracking-wide uppercase">
                  GLOBAL TECHNOLOGY PARTNERSHIPS
                </span>
              </motion.div>

              {/* 4-Line Structured Heading - Part White, Part Orange */}
              <h1 className="typo-heading-3 sm:typo-heading-2 leading-[1.12] font-extrabold">
                <motion.span
                  initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="block whitespace-nowrap text-white"
                >
                  Your Global
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className="block whitespace-nowrap text-white"
                >
                  Technology Partner for
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
                  className="block whitespace-nowrap text-[#FF5812] drop-shadow-[0_0_25px_rgba(255,88,18,0.45)] mt-1"
                >
                  AI, Microsoft, Data &amp;
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  className="block whitespace-nowrap text-[#FF5812] drop-shadow-[0_0_25px_rgba(255,88,18,0.45)]"
                >
                  Software Engineering
                </motion.span>
              </h1>
            </div>

            {/* Right Column - Description (order-2 on mobile immediately under heading, cols 9-12 on desktop) */}
            <div className="flex flex-col justify-center order-2 lg:order-3 lg:col-span-4 xl:col-span-4 lg:col-start-9 xl:col-start-9 max-w-[420px] lg:ml-auto z-20">
              <motion.div
                initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3 sm:space-y-4 max-w-lg lg:max-w-none"
              >
                <p className="typo-description-sm text-zinc-300 leading-relaxed">
                  Softree partners with technology companies, Microsoft partners, digital agencies, SaaS providers, and businesses worldwide to accelerate AI development, Microsoft technology adoption, data engineering, and software development.
                </p>
                <p className="typo-description-sm text-zinc-400 leading-relaxed">
                  Extend your technical capabilities, scale engineering capacity, and deliver innovative digital products with a reliable technology partner.
                </p>
              </motion.div>
            </div>

            {/* Center Column - Interactive 3D Orange Network Globe with 13 Countries */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="order-3 lg:order-2 lg:col-span-4 xl:col-span-4 lg:col-start-5 xl:col-start-5 flex items-center justify-center relative z-10 py-2 sm:py-4 lg:py-0"
            >
              <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[390px] lg:max-w-[430px] xl:max-w-[460px] aspect-square flex items-center justify-center">
                {/* Ambient Softree Orange Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF5812]/25 via-[#FF6B00]/10 to-transparent blur-3xl pointer-events-none scale-105" />
                <HeroOrangeGlobe className="w-full h-full" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trust Strip - Last on mobile and desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mt-auto pt-6 sm:pt-8 lg:pt-0 [&>div]:!mt-0 [&>div]:!gap-4 sm:[&>div]:!gap-6"
        >
          <TrustStrip theme="dark" />
        </motion.div>
      </div>

      {/* Subtle bottom glowing orange accent line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.8 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF5812]/50 to-transparent"
      />
    </section>
  );
};

export default GlobalPartnersHero;
