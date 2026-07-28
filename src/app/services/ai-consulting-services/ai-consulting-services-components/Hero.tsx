"use client";

import { motion } from "framer-motion";
import { HeroBadge } from "./HeroBadge";
import { HeroButtons } from "./HeroButtons";
import { TrustStrip } from "./TrustStrip";

import { HeroVideoCard } from "./HeroVideoCard";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] overflow-hidden flex items-center pb-20 lg:pb-32 pt-36 lg:pt-44 bg-gradient-to-b from-zinc-50 via-white to-zinc-50">

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col items-center max-w-[1440px] mx-auto w-full text-center">

          {/* Top: Marketing Content */}
          <div className="w-full max-w-5xl flex flex-col items-center">
            <HeroBadge />

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-8"
            >
              Enterprise AI Solutions That Deliver <span className="text-[#FF5812]">Measurable Business Outcomes</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6 max-w-3xl"
            >
              We help organizations automate workflows, build AI agents, and transform business operations with secure enterprise AI.
            </motion.p>

            <HeroButtons />
          </div>
            
          {/* Centered Trust Strip */}
          <div className="w-full flex justify-center mt-2 mb-8">
            <TrustStrip />
          </div>

          {/* Bottom: Interactive Video Showcase Card */}
          <div className="w-full flex justify-center relative mt-4">
            <HeroVideoCard />
          </div>

        </div>
      </div>


    </section>
  );
};
