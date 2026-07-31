"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function SolutionCard({ item, index, isActive, onInteractionStart, onInteractionEnd }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      animate={{
        y: isActive ? -9 : 0,
        backgroundColor: isActive ? "#FFFFFF" : "#FAFAFA",
        boxShadow: isActive 
          ? 'inset 0 0 0 1.5px rgba(255,107,44,0.5), 0 4px 0 #EAE6DF, 0 5px 0 rgba(255,107,44,0.6), 0 20px 40px rgba(255,88,18,0.15), 0 12px 24px rgba(0,0,0,0.08)'
          : 'inset 0 0 0 1px #ECECEC, 0 4px 0 #F0F0F0, 0 5px 0 rgba(255,107,44,0.2), 0 8px 18px rgba(0,0,0,0.06), 0 18px 40px rgba(255,88,18,0.10)'
      }}
      transition={{ duration: 0.4, ease: "easeOut", type: "spring", stiffness: 250, damping: 24, delay: index * 0.05 }}
      className="rounded-[28px] p-5 lg:p-6 flex flex-col items-center text-center cursor-pointer relative outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
      onMouseEnter={onInteractionStart}
      onMouseLeave={onInteractionEnd}
      onTouchStart={onInteractionStart}
      onTouchEnd={onInteractionEnd}
      onFocus={onInteractionStart}
      onBlur={onInteractionEnd}
      tabIndex={0}
    >
      <motion.div 
        animate={{ 
          scale: isActive ? 1.08 : 1,
          rotate: isActive ? 3 : 0
        }}
        transition={{ duration: 0.4, ease: "easeOut", type: "spring", stiffness: 300, damping: 20 }}
        className="w-12 h-12 rounded-full bg-orange-50 text-[#FF6B2C] flex items-center justify-center mb-3 shadow-[inset_0_1px_4px_rgba(0,0,0,0.04)]"
      >
        {item.icon && <item.icon className="w-6 h-6" />}
      </motion.div>
      
      <motion.h3 
        animate={{ fontWeight: isActive ? 800 : 700 }}
        className="text-[17px] text-[#111827] mb-2"
      >
        {item.title}
      </motion.h3>
      
      <motion.div 
        animate={{ width: isActive ? 90 : 50 }}
        transition={{ duration: 0.4, ease: "easeOut", type: "spring", stiffness: 200, damping: 20 }}
        className="h-[2px] bg-[#FF6B2C] rounded-full mb-3"
      />
      
      <motion.p 
        animate={{ color: isActive ? "#374151" : "#6B7280" }}
        className="text-[14px] leading-snug"
      >
        {item.description}
      </motion.p>
    </motion.div>
  );
}
