import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const ResponseCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
      className="mt-6 bg-white/90 backdrop-blur-xl border border-orange-100 rounded-2xl p-4 shadow-lg shadow-orange-500/5 max-w-sm w-full relative z-20 cursor-default"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF5812] flex items-center justify-center shrink-0 shadow-inner">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Trusted AI Response</h5>
          <p className="text-sm font-medium text-[#0A0A1A] leading-snug">
            &quot;Grounded, context-aware answers generated from enterprise knowledge.&quot;
          </p>
        </div>
      </div>
    </motion.div>
  );
};
