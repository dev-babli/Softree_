"use client";

import React from "react";
import { motion } from "framer-motion";
import { SuccessStoriesCarousel } from "./SuccessStoriesCarousel";
import { staggerContainer, fadeUpVariant } from "./animations";
import SectionBadge from "../SectionBadge";

export const SuccessStories = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-12 font-sans lg:py-16">
      <div className="relative z-10 mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
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
              LangChain Development{" "}
              <span className="text-[#FF6A13]">Real-World Solutions & Business Impact</span>
            </h2>
            <p className="text-[15px] lg:text-base text-[#6B7280] mb-6 lg:mb-8 text-center max-w-2xl mx-auto leading-relaxed">
              Explore Softree LangChain development case studies—RAG chains, LangGraph agents, and tool integrations that deliver measurable operational outcomes.
            </p>
          </motion.div>

          <SuccessStoriesCarousel />

        </motion.div>
      </div>
    </section>
  );
};
