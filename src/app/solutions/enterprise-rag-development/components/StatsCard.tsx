import React from 'react';
import { motion } from 'framer-motion';

export const StatsCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.7 }}
      className="mt-12 w-full max-w-lg bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200/60">
        <div className="flex flex-col items-center justify-center text-center px-4 pt-2 sm:pt-0">
          <h4 className="text-2xl font-bold text-[#0A0A1A] tracking-tight">500M+</h4>
          <p className="text-[11px] uppercase tracking-[0.05em] text-slate-500 font-medium mt-1">Documents Indexed</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center px-4 pt-4 sm:pt-0">
          <h4 className="text-2xl font-bold text-[#0A0A1A] tracking-tight">&lt;1.5s</h4>
          <p className="text-[11px] uppercase tracking-[0.05em] text-slate-500 font-medium mt-1">Avg. Retrieval Time</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center px-4 pt-4 sm:pt-0">
          <h4 className="text-2xl font-bold text-[#0A0A1A] tracking-tight">99.9%</h4>
          <p className="text-[11px] uppercase tracking-[0.05em] text-slate-500 font-medium mt-1">Enterprise Uptime</p>
        </div>
      </div>
    </motion.div>
  );
};
