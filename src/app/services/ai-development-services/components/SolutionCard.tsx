"use client";
import React from 'react';
import { motion } from 'framer-motion';

const getIcon = (type: string) => {
  switch (type) {
    case 'bot': return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v2m-3 0h6m-9 4h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2zm3 6h.01M15 14h.01M9 18h6" />
      </svg>
    );
    case 'sparkles': return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    );
    case 'workflow': return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM9 8h2v5h3" />
      </svg>
    );
    case 'search': return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    );
    case 'document': return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
    case 'brain': return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    );
    default: return <div />;
  }
};

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
        {getIcon(item.icon)}
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
