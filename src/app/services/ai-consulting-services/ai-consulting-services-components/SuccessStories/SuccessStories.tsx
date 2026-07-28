"use client";

import React from "react";
import { motion } from "framer-motion";
import { SuccessStoriesCarousel } from "./SuccessStoriesCarousel";
import { staggerContainer, fadeUpVariant } from "./animations";

export const SuccessStories = () => {
  return (
    <section className="relative w-full py-24 overflow-hidden font-sans bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          {/* Section Header */}
          <motion.div variants={fadeUpVariant} className="text-center mb-4">
            <div className="flex items-center justify-center gap-6 mb-6">
              <style>{`
                @keyframes line-stretch {
                  0%, 100% { width: 40px; opacity: 0.6; }
                  50% { width: 100px; opacity: 1; }
                }
                .animate-line-stretch {
                  animation: line-stretch 3s ease-in-out infinite;
                }
              `}</style>
              <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
                <div className="absolute left-0 w-2 h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
              </div>
              <span className="text-[#FF5812] font-bold tracking-[0.2em] text-sm uppercase">SUCCESS STORIES</span>
              <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
                <div className="absolute right-0 w-2 h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              Real Business Challenges. Real <span className="text-[#FF6A13]">AI Results.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto">
              See how we transform complex business challenges into measurable outcomes with intelligent AI solutions.
            </p>
          </motion.div>

          <SuccessStoriesCarousel />

        </motion.div>
      </div>
    </section>
  );
};
