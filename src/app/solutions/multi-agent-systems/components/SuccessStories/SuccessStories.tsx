"use client";

import React from "react";
import { motion } from "framer-motion";
import { SuccessStoriesCarousel } from "./SuccessStoriesCarousel";
import { staggerContainer, fadeUpVariant } from "./animations";
import SectionBadge from "../SectionBadge";

export const SuccessStories = () => {
  return (
    <section className="relative w-full py-24 overflow-hidden font-sans bg-transparent">
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
            <SectionBadge text="SUCCESS STORIES" variant="line" />
            <h2 className="text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-[#111827] mb-2 md:mb-3 tracking-tight text-center leading-tight">
              Multi-Agent Real-World <span className="text-[#FF6A13]"> Solutions & Business Impact</span>
            </h2>
            <p className="text-[15px] lg:text-base text-[#6B7280] mb-6 lg:mb-8 text-center max-w-2xl mx-auto leading-relaxed">
              See how coordinated AI agent teams turn complex multi-step work into measurable operational outcomes.
            </p>
          </motion.div>

          <SuccessStoriesCarousel />

        </motion.div>
      </div>
    </section>
  );
};
