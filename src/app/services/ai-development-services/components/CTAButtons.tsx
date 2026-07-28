"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CTAButtonsProps {
  primary: string;
  secondary: string;
}

export default function CTAButtons({ primary, secondary }: CTAButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8">

      <motion.button
        whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
        whileTap={{ scale: 0.98 }}
        className="group inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-slate-800 rounded-lg text-sm font-semibold border border-slate-200 shadow-sm transition-colors"
      >
        <span>{secondary}</span>
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </motion.button>
    </div>
  );
}
