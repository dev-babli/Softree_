"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function SolutionsCTA() {
  return (
    <motion.button
      whileHover="hover"
      className="group relative flex items-center justify-center gap-3 bg-white text-[#FF6B2C] px-8 py-4 rounded-full font-bold text-[17px] border-[1.5px] border-[#FF6B2C] shadow-[0_8px_20px_rgba(255,107,44,0.12)] overflow-hidden transition-colors duration-300 hover:bg-[#FF6B2C] hover:text-white"
    >
      {/* Icon */}
      <motion.div 
        variants={{
          hover: { rotate: 20 }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l-8 4-4 8 8-4 4-8z" />
           <circle cx="12" cy="12" r="9" strokeWidth={2} />
        </svg>
      </motion.div>
      
      <span>Explore All Solutions</span>
      
      {/* Arrow */}
      <motion.div
        variants={{
          hover: { x: 4 }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </motion.div>
    </motion.button>
  );
}
