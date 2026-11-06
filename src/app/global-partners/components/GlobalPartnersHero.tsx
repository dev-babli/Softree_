"use client";

import React from "react";
import { motion } from "framer-motion";
import { typography } from "@/lib/typography";
import TrustStrip from "@/components/sections/TrustStrip";
import { HeroOrangeGlobe } from "./HeroOrangeGlobe";

export const GlobalPartnersHero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black font-sans text-white pt-20 pb-6 sm:pt-24 sm:pb-8 lg:min-h-[82svh] lg:pt-24 lg:pb-6 flex flex-col justify-between">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,88,18,0.16),transparent_70%)]" />
      <div className="pointer-events-none absolute right-[5%] top-[40%] -translate-y-1/2 w-[650px] h-[650px] bg-[#FF5812]/[0.12] rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute left-[15%] bottom-[15%] w-[480px] h-[480px] bg-[#FF5812]/[0.05] rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1240px] xl:max-w-[1300px] flex-1 flex-col px-6 sm:px-8 lg:px-10 justify-between">
        {/* Main Content Area */}
        <div className="flex flex-1 flex-col justify-center pt-3 sm:pt-5 lg:pt-6 pb-6 lg:pb-8">
          {/* Responsive Layout: 
              Left: Eyebrow + Heading + Description
              Right: 3D Orange Network Globe */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-y-0 lg:gap-x-6 xl:gap-x-8 items-center">
            {/* Left Column - Eyebrow, Heading & Description */}
            <div className="flex flex-col lg:col-span-6 xl:col-span-6 max-w-xl z-20">
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
                <span className={`${typography.caption.default} font-bold text-white tracking-wide uppercase`}>
                  GLOBAL TECHNOLOGY PARTNERSHIPS
                </span>
              </motion.div>

              {/* Structured Heading - Using centralized typography and 'Team, Extended.' on one line */}
              <h1 className={`${typography.heading.h2} leading-[1.08] font-extrabold tracking-tight`}>
                <motion.span
                  initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-white"
                >
                  Your Global Offshore<br className="hidden sm:inline" /> Engineering Partner
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[#FF5812] drop-shadow-[0_0_25px_rgba(255,88,18,0.45)] mt-1.5 sm:mt-2"
                >
                  Your Engineering<br className="hidden sm:inline" /> Team, Extended.
                </motion.span>
              </h1>

              {/* Description - Using centralized typography system */}
              <motion.p
                initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className={`mt-5 sm:mt-6 ${typography.description.default} text-zinc-300 leading-relaxed max-w-[470px] font-normal`}
              >
                Scale your engineering capabilities with reliable offshore development teams and white-label technology partnerships.
              </motion.p>
            </div>

            {/* Right Column - Interactive 3D Orange Network Globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center lg:justify-start lg:col-span-6 xl:col-span-6 relative z-10 py-4 sm:py-6 lg:py-0 lg:pl-4 xl:pl-6"
            >
              <div className="relative w-full max-w-[290px] sm:max-w-[350px] md:max-w-[390px] lg:max-w-[430px] xl:max-w-[470px] aspect-square flex items-center justify-center">
                {/* Ambient Softree Orange Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF5812]/35 via-[#FF6B00]/15 to-transparent blur-3xl pointer-events-none scale-110" />
                <HeroOrangeGlobe className="w-full h-full" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trust Strip - Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mt-auto pt-6 sm:pt-8 lg:pt-0 [&>div]:!mt-0 [&>div]:!gap-4 sm:[&>div]:!gap-6"
        >
          <TrustStrip theme="dark" />
        </motion.div>
      </div>

      {/* Subtle bottom glowing orange accent line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.8 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.55 }}
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF5812]/50 to-transparent"
      />
    </section>
  );
};

export default GlobalPartnersHero;
