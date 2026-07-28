"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroVideoCard({ videoCard }: { videoCard: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-white/90 backdrop-blur-md rounded-lg p-2.5 sm:p-3 shadow-lg max-w-[140px] sm:max-w-[150px] border border-white/40"
    >
      <h4 className="text-[11px] sm:text-[12px] font-bold leading-tight text-slate-900">
        {videoCard.title.split(' ').map((word: string, i: number, arr: string[]) => {
          if (word === 'AI' || word === 'Solution') {
             return <span key={i} className="text-orange-500">{word} </span>;
          }
          return word + ' ';
        })}
      </h4>
    </motion.div>
  );
}
