"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SolutionCard from './SolutionCard';

export default function SolutionPlatform({ items }: { items: any[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-[1100px] mx-auto relative pt-2 pb-4"
    >
      {/* 3D Platform Base */}
      <div 
        className="w-full bg-[#FAF8F6] rounded-[36px] lg:rounded-[48px] p-4 sm:p-5 lg:p-6 relative"
        style={{
          boxShadow: `
            inset 0px 2px 4px rgba(255, 255, 255, 1),
            inset 0px 0px 0px 1px rgba(255, 107, 44, 0.15),
            0px 6px 0px #EAE6DF,
            0px 8px 0px rgba(255, 107, 44, 0.35),
            0px 35px 70px rgba(255, 88, 18, 0.16),
            0px 15px 25px rgba(0, 0, 0, 0.06)
          `
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 relative z-10">
          {items.map((item, index) => (
            <SolutionCard 
              key={item.id || index} 
              item={item} 
              index={index} 
              isActive={activeIndex === index}
              onInteractionStart={() => setActiveIndex(index)}
              onInteractionEnd={() => setActiveIndex(null)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
