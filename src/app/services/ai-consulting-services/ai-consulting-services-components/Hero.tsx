"use client";

import { motion } from "framer-motion";
import { HeroBadge } from "./HeroBadge";
import { HeroButtons } from "./HeroButtons";
import { TrustStrip } from "./TrustStrip";

import { HeroVideoCard } from "./HeroVideoCard";

export const Hero = () => {
  return (
    <section className="relative min-h-[100vh] lg:min-h-[90vh] overflow-hidden flex items-center pb-12 md:pb-16 lg:pb-20 pt-24 md:pt-32 lg:pt-36 bg-gradient-to-b from-zinc-50 via-white to-zinc-50">

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-[1440px] mx-auto w-full">

          {/* Main Hero Content - Stacked 12-Column Grid */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-y-8 xl:gap-y-10">

            {/* Top: Marketing Content */}
            <div className="col-span-12 flex flex-col items-center text-center max-w-4xl mx-auto w-full">
              <HeroBadge />

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold text-slate-900 leading-[1.15] md:leading-[1.1] tracking-tight mb-4 md:mb-5"
              >
                AI Consulting Services That Accelerate <span className="text-[#FF5812]">Business Transformation</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-6 md:mb-7 max-w-3xl px-2 sm:px-0"
              >
                Transform your business with enterprise AI consulting services that help you define an AI strategy, automate workflows, implement generative AI, and deliver measurable business outcomes using Microsoft and Azure AI technologies.
              </motion.p>

              <HeroButtons />
            </div>

            {/* Middle: Centered Interactive Video Showcase Card */}
            {/* Constrained on desktop to prevent excessive height from wide aspect ratio */}
            <div className="col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3 flex justify-center relative mt-4 lg:mt-6">
              <HeroVideoCard />
            </div>

            {/* Bottom: Centered Trust Strip */}
            <div className="col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3 flex justify-center mt-6 lg:mt-10">
              <TrustStrip />
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
