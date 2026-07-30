"use client";

import { motion } from "framer-motion";

export const SectionHeader = () => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-6 mb-6"
      >
        <div className="mb-4 flex items-center justify-center gap-4 md:gap-6">
          <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
            <div className="absolute left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
          </div>
          <span className="text-[#FF5812] font-bold tracking-[0.2em] text-[11px] uppercase">
            OUR AI SOLUTIONS
          </span>
          <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
            <div className="absolute right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
          </div>
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
      >
        Intelligent Solutions for <br className="hidden sm:block" />
        <span className="text-[#FF5A1F]">Smarter Enterprises</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg text-slate-600"
      >
        AI-powered solutions designed to automate, optimize, and accelerate every aspect of your business.
      </motion.p>
    </div>
  );
};
