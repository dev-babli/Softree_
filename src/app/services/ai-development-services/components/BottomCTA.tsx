"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function BottomCTA() {
  return (
    <div className="flex justify-center w-full mt-12 lg:mt-16 relative z-20">
      <motion.button
        whileHover="hover"
        className="group relative flex items-center justify-center gap-3 bg-white text-[#FF6B2C] px-8 py-4 rounded-full font-bold text-[17px] border-[1.5px] border-[#FF6B2C] shadow-[0_8px_20px_rgba(255,107,44,0.12)] overflow-hidden transition-colors duration-300 hover:bg-[#FF6B2C] hover:text-white"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>

        <span>Let's Build Something Intelligent Together</span>
        
        {/* Arrow */}
        <motion.div
          variants={{ hover: { x: 4 } }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      </motion.button>
    </div>
  );
}
