"use client";

import { motion } from "framer-motion";
import { Target } from "lucide-react";

export const BusinessChallengesCTA = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-16 lg:mt-24 w-full max-w-5xl mx-auto"
    >
      <div className="relative bg-white rounded-2xl border border-[#FF5A1F]/30 shadow-[0_8px_30px_rgb(255,90,31,0.06)] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden group hover:border-[#FF5A1F]/50 transition-colors duration-300">
        
        {/* Left: Icon */}
        <div className="flex-shrink-0 w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center">
          <Target className="w-10 h-10 text-[#FF5A1F]" />
        </div>

        {/* Middle: Content */}
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-2xl font-bold text-slate-900 mb-2">
            Every challenge has an AI-powered solution.
          </h4>
          <p className="text-slate-600 text-lg">
            Let's turn your challenges into measurable business outcomes.
          </p>
        </div>

        {/* Right: Decorative dotted pattern */}
        <div className="hidden md:flex flex-shrink-0 gap-2 opacity-40 group-hover:opacity-60 transition-opacity duration-300">
          {[...Array(5)].map((_, col) => (
            <div key={col} className="flex flex-col gap-2">
              {[...Array(4)].map((_, row) => (
                <div key={`${col}-${row}`} className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]"></div>
              ))}
            </div>
          ))}
        </div>
        
      </div>
    </motion.div>
  );
};
