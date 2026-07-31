import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PipelineNodeProps {
  icon: React.ElementType<{ className?: string }>;
  title: string;
  isHighlighted?: boolean;
  delay?: number;
  accent?: 'blue' | 'purple' | 'cyan' | 'orange';
  isActive?: boolean;
  tooltipText?: string;
}

export const PipelineNode: React.FC<PipelineNodeProps> = ({ 
  icon: Icon, 
  title, 
  isHighlighted = false, 
  delay = 0,
  accent = 'blue',
  isActive = false,
  tooltipText
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const active = isActive || isHovered || showTooltip;
  const nodeRef = useRef<HTMLDivElement>(null);

  // Close tooltip on click outside
  useEffect(() => {
    if (!showTooltip) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (nodeRef.current && !nodeRef.current.contains(e.target as Node)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showTooltip]);

  let iconBgClass = 'bg-blue-100';
  let iconColorClass = 'text-blue-600';
  let hoverBorderClass = 'border-blue-300';
  let glowClass = 'shadow-[0_4px_20px_rgba(37,99,235,0.2)]';

  let gradientStr = 'conic-gradient(transparent, #2563EB, #3B82F6, transparent)';
  let pulseShadow = ['0 0 10px rgba(59,130,246,0.1)', '0 0 25px rgba(59,130,246,0.3)', '0 0 10px rgba(59,130,246,0.1)'];
  let highlightBgClass = 'bg-blue-50/50';

  if (accent === 'orange') {
    iconBgClass = 'bg-orange-100';
    iconColorClass = 'text-[#FF6B00]';
    hoverBorderClass = 'border-[#FF6B00]';
    glowClass = 'shadow-[0_4px_30px_rgba(255,107,0,0.3)]';
    gradientStr = 'conic-gradient(transparent, #FF5812, #FF6B00, transparent)';
    pulseShadow = ['0 0 10px rgba(255,107,0,0.1)', '0 0 25px rgba(255,107,0,0.3)', '0 0 10px rgba(255,107,0,0.1)'];
    highlightBgClass = 'bg-orange-50/50';
  } else if (accent === 'purple') {
    iconBgClass = 'bg-purple-100';
    iconColorClass = 'text-purple-600';
    hoverBorderClass = 'border-purple-300';
    glowClass = 'shadow-[0_4px_20px_rgba(147,51,234,0.2)]';
    gradientStr = 'conic-gradient(transparent, #7C3AED, #8B5CF6, transparent)';
    pulseShadow = ['0 0 10px rgba(139,92,246,0.1)', '0 0 25px rgba(139,92,246,0.3)', '0 0 10px rgba(139,92,246,0.1)'];
    highlightBgClass = 'bg-purple-50/50';
  } else if (accent === 'cyan') {
    iconBgClass = 'bg-cyan-100';
    iconColorClass = 'text-cyan-600';
    hoverBorderClass = 'border-cyan-300';
    glowClass = 'shadow-[0_4px_20px_rgba(6,182,212,0.2)]';
    gradientStr = 'conic-gradient(transparent, #0891B2, #06B6D4, transparent)';
    pulseShadow = ['0 0 10px rgba(6,182,212,0.1)', '0 0 25px rgba(6,182,212,0.3)', '0 0 10px rgba(6,182,212,0.1)'];
    highlightBgClass = 'bg-cyan-50/50';
  }

  return (
    <div className="relative z-20" ref={nodeRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: active ? 1.025 : 1
        }}
        transition={{ delay: delay, duration: 0.4, type: 'spring', stiffness: 300 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-48 py-2.5 px-4 rounded-xl flex items-center justify-center gap-3 backdrop-blur-sm bg-white transition-all duration-300 cursor-pointer ${
          isHighlighted ? '' : `border ${active ? `${hoverBorderClass} ${glowClass}` : 'border-gray-200 shadow-sm'}`
        }`}
      >
        {/* Conic Gradient Border */}
        {isHighlighted && (
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none p-[2px]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-100%]"
              style={{
                background: gradientStr,
              }}
            />
            <div className="absolute inset-[2px] bg-white rounded-[10px]" />
          </div>
        )}

        {/* Soft background glow */}
        {isHighlighted && (
          <div className={`absolute inset-0 rounded-xl pointer-events-none mix-blend-multiply ${highlightBgClass}`} />
        )}

        {/* Animated outer pulse */}
        {isHighlighted && (
          <motion.div
            animate={{ boxShadow: pulseShadow }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-xl pointer-events-none"
          />
        )}

        <div className={`relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 z-10 ${iconBgClass}`}>
          <motion.div animate={{ rotate: active ? 10 : 0, scale: active ? 1.15 : 1 }}>
            <Icon className={`w-4 h-4 ${iconColorClass}`} />
          </motion.div>
        </div>
        
        <span className="text-xs font-bold text-[#0A0A1A] z-10">{title}</span>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && tooltipText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute left-full ml-4 top-1/2 -translate-y-1/2 w-48 p-3 bg-[#0A0A1A] text-white text-[11px] leading-relaxed rounded-lg shadow-xl z-50 pointer-events-none border border-white/10"
          >
            {/* Arrow */}
            <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-[#0A0A1A] border-l border-b border-white/10 rotate-45" />
            <span className="relative z-10">{tooltipText}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
