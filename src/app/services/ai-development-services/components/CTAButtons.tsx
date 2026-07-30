"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CTAButtonsProps {
  primary: string;
}

export default function CTAButtons({ primary }: CTAButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <motion.a
        href="https://www.softreetechnology.com/contact"
        whileHover={{ scale: 1.02, backgroundColor: "#fff7ed", borderColor: "#fed7aa" }}
        whileTap={{ scale: 0.98 }}
        className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-800 rounded-xl text-[15px] font-semibold border border-slate-200 shadow-sm transition-colors hover:text-orange-600 cursor-pointer"
      >
        <span>{primary}</span>
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </motion.a>
    </div>
  );
}
