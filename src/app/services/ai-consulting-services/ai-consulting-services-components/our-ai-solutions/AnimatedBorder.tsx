"use client";

import { motion } from "framer-motion";

interface AnimatedBorderProps {
  isHovered: boolean;
}

export const AnimatedBorder = ({ isHovered }: AnimatedBorderProps) => {
  return (
    <div className="absolute inset-0 rounded-[24px] pointer-events-none overflow-hidden z-20">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect
          width="100%"
          height="100%"
          rx="24"
          ry="24"
          fill="none"
          stroke="rgba(255, 90, 31, 0.15)"
          strokeWidth="2"
        />
        <motion.rect
          width="100%"
          height="100%"
          rx="24"
          ry="24"
          fill="none"
          stroke="#FF5A1F"
          strokeWidth="2"
          strokeDasharray="150 2500"
          animate={{ strokeDashoffset: [0, -2650] }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          style={{
            filter: isHovered 
              ? "drop-shadow(0 0 10px rgba(255, 90, 31, 0.9))" 
              : "drop-shadow(0 0 4px rgba(255, 90, 31, 0.5))"
          }}
        />
      </svg>
    </div>
  );
};
