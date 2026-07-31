import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface KnowledgeSourceCardProps {
  icon: React.ElementType<{ className?: string }>;
  title: string;
  delay?: number;
  colorClass?: string;
  bgClass?: string;
  borderClass?: string;
  glowClass?: string;
  isActive?: boolean;
}

export const KnowledgeSourceCard: React.FC<KnowledgeSourceCardProps> = ({ 
  icon: Icon, 
  title, 
  delay = 0,
  colorClass = 'text-slate-500',
  bgClass = 'bg-zinc-50',
  borderClass = 'border-gray-100',
  glowClass = 'shadow-[0_4px_20px_rgba(0,0,0,0.1)]',
  isActive = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const active = isActive || isHovered;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: 1, 
        y: active ? -4 : 0, 
        scale: active ? 1.04 : 1,
      }}
      transition={{ delay: isHovered ? 0 : delay, duration: 0.4, type: 'spring', stiffness: 400, damping: 25 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex items-center gap-2 px-3 py-2 bg-white rounded-xl border transition-all duration-300 cursor-default overflow-hidden z-10 ${
        active ? `${borderClass} ${glowClass}` : 'border-gray-100/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
      }`}
    >
      <div className={`relative w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors duration-300 z-10 ${bgClass} ${active ? 'opacity-100' : 'opacity-80'}`}>
        <motion.div 
          animate={{ scale: active ? 1.12 : 1, rotate: active ? 4 : 0 }} 
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Icon className={`w-3.5 h-3.5 transition-colors duration-300 ${colorClass}`} />
        </motion.div>
      </div>
      <span className="text-[11px] font-bold text-slate-700 whitespace-nowrap z-10">{title}</span>
      
      {/* Subtle background multiplier */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${bgClass} ${active ? 'opacity-20' : 'opacity-0'}`} style={{ mixBlendMode: 'multiply' }} />
    </motion.div>
  );
};
