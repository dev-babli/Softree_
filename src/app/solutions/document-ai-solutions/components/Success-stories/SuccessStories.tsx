"use client";

import React from "react";
import { motion } from "framer-motion";
import { SuccessStoriesCarousel } from "./SuccessStoriesCarousel";
import { staggerContainer, fadeUpVariant } from "./animations";

export const SuccessStories = () => {
  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden font-sans bg-white">
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
            <div className="mb-4 flex items-center justify-center gap-4 md:gap-6">
              <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
                <div className="absolute left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
              </div>
              <span className="text-[#FF5812] font-bold tracking-[0.2em] text-[11px] uppercase">
                Client Success Stories
              </span>
              <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
                <div className="absolute right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-gray-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              Real Business Results with <span className="text-[#FF6A13]">AI-Powered Document Processing</span>
            </h2>
            <p className="text-[15px] lg:text-[17px] text-gray-500 max-w-3xl mx-auto">
              Discover how organizations streamline document-intensive workflows, automate data extraction, improve accuracy, and accelerate business operations with Softree's Document AI Solutions powered by Intelligent Document Processing (IDP) and Azure AI Document Intelligence.
            </p>
          </motion.div>

          <SuccessStoriesCarousel />

        </motion.div>
      </div>
    </section>
  );
};
