"use client";

import { motion } from "framer-motion";

export const HeroBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl sm:rounded-full border border-[#FF5812]/20 bg-[#FF5812]/10 text-[#FF5812] text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-4 max-w-[95%] sm:max-w-none text-center"
    >
      <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#FF5812] animate-pulse"></span>
      <span>Enterprise AI Consulting</span>
    </motion.div>
  );
};
