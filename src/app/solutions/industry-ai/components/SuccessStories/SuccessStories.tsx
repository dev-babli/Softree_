"use client";

import React from "react";
import { motion } from "framer-motion";
import { SuccessStoriesCarousel } from "./SuccessStoriesCarousel";
import { staggerContainer, fadeUpVariant } from "./animations";
import SectionBadge from "../SectionBadge";
import { useIndustryConfig } from "../../context";

export const SuccessStories = () => {
  const { sections } = useIndustryConfig();
  const copy = sections.successStories;

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
          <motion.div variants={fadeUpVariant} className="mb-4 text-center">
            <SectionBadge text={copy.badge} variant="line" />
            <h2 className="mb-2 text-center text-2xl font-extrabold leading-tight tracking-tight text-[#111827] md:mb-3 md:text-4xl lg:text-[2.25rem]">
              {copy.title}{" "}
              <span className="text-[#FF6A13]">{copy.highlight}</span>
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-center text-[15px] leading-relaxed text-[#6B7280] lg:mb-8 lg:text-base">
              {copy.description}
            </p>
          </motion.div>

          <SuccessStoriesCarousel />
        </motion.div>
      </div>
    </section>
  );
};
