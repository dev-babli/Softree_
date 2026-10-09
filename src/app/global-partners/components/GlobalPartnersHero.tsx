"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import TrustStrip from "@/components/sections/TrustStrip";
import ShaderBackground from "@/components/ui/shader-background";

export const GlobalPartnersHero: React.FC = () => {
  return (
    <section className="relative flex min-h-[auto] w-full flex-col overflow-hidden bg-[#060403] font-sans text-white pt-24 pb-4 sm:pt-28 sm:pb-6 lg:min-h-[85svh] lg:pt-32 lg:pb-6">
      {/* WebGL Plasma Grid Shader Background in Orange Shade (Smooth Untwisted Waves) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <ShaderBackground
          theme="orange"
          animate={true}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Ambient Breathing Glow Orb behind typography */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-[#FF5812]/15 blur-[120px]"
      />

      {/* Warm ember overlays — shader stays glowing and vibrant; text is crystal clear */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#060403]/85 via-[#060403]/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#060403] via-transparent to-[#060403]/40" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-6 sm:px-8 lg:px-12">
        
        {/* Main Content Centered */}
        <div className="flex flex-1 flex-col justify-center gap-6 sm:gap-8 pt-4 pb-12 lg:pt-8 lg:pb-16">
          {/* Top Badge with Live Beacon Animation */}
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center gap-2.5 self-start rounded-full bg-[#FF5812] px-3.5 py-1.5 shadow-[0_4px_24px_-4px_rgba(255,88,18,0.55)] cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <span className="typo-caption font-bold text-white tracking-wide uppercase">
              GLOBAL TECHNOLOGY PARTNERSHIPS
            </span>
          </motion.div>

          {/* Two-Column Editorial Layout: Title Left, Description Right */}
          <div className="grid grid-cols-1 items-start gap-x-12 gap-y-6 lg:grid-cols-12 xl:gap-x-20">
            {/* Left Column - 3-Line Heading */}
            <div className="flex flex-col lg:col-span-7 xl:col-span-7">
              <h1 className="typo-heading-2 text-white leading-tight font-extrabold">
                <motion.span
                  initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Build More. 
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Deliver More.{" "}
                  <span className="text-[#FF5812] drop-shadow-[0_0_25px_rgba(255,88,18,0.45)]">
                    Together.
                  </span>
                </motion.span>
              </h1>
            </div>

            {/* Right Column - Description and CTA */}
            <div className="flex flex-col justify-start lg:col-span-5 xl:col-span-5 lg:pt-1.5">
              <motion.p
                initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="typo-description-sm text-zinc-300 leading-relaxed max-w-xl"
              >
                Softree partners with technology companies, Microsoft partners, digital agencies, SaaS companies and businesses worldwide to extend their AI, Microsoft, Data and Software Engineering capabilities.
              </motion.p>
              
              {/* Added Primary CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 sm:mt-8"
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#FF5812] px-6 py-3 text-[13px] font-bold tracking-[0.1em] text-white uppercase transition-all hover:bg-[#FF4500] hover:shadow-[0_0_20px_rgba(255,88,18,0.4)]"
                >
                  Become a Partner
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Trust Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mt-auto [&>div]:!mt-0 [&>div]:!gap-4 sm:[&>div]:!gap-6"
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
