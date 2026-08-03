"use client";

import { motion } from "framer-motion";

export const AnimatedCardBorder = () => {
  return (
    <div className="absolute inset-[-2px] rounded-[30px] pointer-events-none overflow-hidden z-20">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect
          width="100%"
          height="100%"
          rx="30"
          ry="30"
          fill="none"
          stroke="rgba(255, 106, 19, 0.3)"
          strokeWidth="2"
        />
        <motion.rect
          width="100%"
          height="100%"
          rx="30"
          ry="30"
          fill="none"
          stroke="#FF6A13"
          strokeWidth="3"
          strokeDasharray="200 2500"
          animate={{ strokeDashoffset: [0, -2700] }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          style={{
            filter: "drop-shadow(0 0 12px rgba(255, 106, 19, 0.9))"
          }}
        />
      </svg>
    </div>
  );
};
