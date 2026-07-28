"use client";

import { motion } from "framer-motion";

export const BusinessChallengesHeader = () => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-6 mb-6"
      >
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
        <span className="text-[#FF5812] font-bold tracking-[0.2em] text-sm uppercase">BUSINESS CHALLENGES</span>
        <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
          <div className="absolute right-0 w-2 h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-[44px] font-bold text-slate-900 mb-6 tracking-tight leading-[1.2]"
      >
        Which <span className="text-[#FF5812]">challenge</span> are you trying to solve?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg text-slate-600"
      >
        Explore the most common business challenges we help organizations solve with AI.
      </motion.p>
    </div>
  );
};
