import React from 'react';
import { motion } from 'framer-motion';

export interface ParticleConfig {
  color: string;
  glow: string;
  delay: number;
}

interface AnimatedConnectionProps {
  height?: number;
  particles?: ParticleConfig[];
  showEnergyLine?: boolean;
}

export const AnimatedConnection: React.FC<AnimatedConnectionProps> = ({ 
  height = 40, 
  particles = [],
  showEnergyLine = true
}) => {
  return (
    <div className="relative flex justify-center items-center w-full z-0 overflow-hidden" style={{ height }}>
      {/* Base Dotted Line */}
      <div className="absolute top-0 bottom-0 w-px border-l-[1.5px] border-dotted border-gray-300 opacity-60" />
      
      {/* Energy Gradient Line */}
      {showEnergyLine && (
        <motion.div
          animate={{ y: [-height, height] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[1.5px] h-full"
          style={{
            background: 'linear-gradient(to bottom, transparent, #3B82F6, #8B5CF6, #FF6B00, #06B6D4, transparent)'
          }}
        />
      )}
      
      {/* Flowing Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ y: -height / 2 - 10, opacity: 0 }}
          animate={{ y: height / 2, opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1.2, 0.5] }}
          transition={{
            duration: 0.7, // Travel speed
            repeat: Infinity,
            repeatDelay: 8.3, // 9s total loop (0.7s travel + 8.3s wait)
            ease: "easeIn",
            delay: p.delay,
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: p.color,
            boxShadow: `0 0 10px 2px ${p.glow}`
          }}
        />
      ))}
    </div>
  );
};
