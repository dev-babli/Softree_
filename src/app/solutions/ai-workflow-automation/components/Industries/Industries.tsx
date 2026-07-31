"use client";

import { motion } from "framer-motion";

import { IndustryCarousel } from "./IndustryCarousel";
import CapabilitySectionBadge from "../Core-capabilities/CapabilitySectionBadge";

export const Industries = () => {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-8 px-4">
          <CapabilitySectionBadge text="INDUSTRIES WE SERVE" variant="line" />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#111827] mb-6 tracking-tight leading-tight"
          >
            AI Workflow Automation <span className="text-[#FF5812]">Across Industries</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[15px] lg:text-[17px] text-[#6B7280] max-w-2xl mx-auto"
          >
            Empower healthcare, manufacturing, finance, retail, logistics, and other industries with intelligent workflow automation that improves efficiency and business agility.
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
