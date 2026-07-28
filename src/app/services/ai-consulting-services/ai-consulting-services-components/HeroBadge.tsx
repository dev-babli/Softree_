"use client";

import { motion } from "framer-motion";

export const HeroBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FF5812]/20 bg-[#FF5812]/10 text-[#FF5812] text-xs font-semibold tracking-wider uppercase mb-8"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812] animate-pulse"></span>
      AI CONSULTING SERVICES
    </motion.div>
  );
};
