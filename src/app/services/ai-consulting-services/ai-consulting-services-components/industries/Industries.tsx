"use client";

import { motion } from "framer-motion";

import { IndustryCarousel } from "./IndustryCarousel";

export const Industries = () => {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex items-center justify-center gap-4 md:gap-6"
          >
            <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
              <div className="absolute left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
            </div>
            <span className="text-[#FF5812] font-bold tracking-[0.2em] text-[11px] uppercase">
              Industries We Serve
            </span>
            <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
              <div className="absolute right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#111827] mb-6 tracking-tight leading-tight"
          >
            Industry-Specific <span className="text-[#FF5812]">AI Consulting Solutions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[15px] lg:text-[17px] text-[#6B7280] max-w-2xl mx-auto"
          >
            We help organisations across healthcare, manufacturing, finance, retail, logistics, and education implement AI solutions that solve real business challenges and deliver measurable ROI.
          </motion.p>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <IndustryCarousel />
        </motion.div>


      </div>
    </section>
  );
};
