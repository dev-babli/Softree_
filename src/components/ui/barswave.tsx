"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BarsWaveProps {
  barCount?: number;
  minHeight?: number;
  maxHeight?: number;
  fillColor?: string;
  borderColor?: string;
  barOpacity?: number;
  animationDuration?: number;
  variant?: "filled" | "outlined" | "gradient" | "red-orange";
  className?: string;
  barClassName?: string;
  children?: React.ReactNode;
}

export function BarsWave({
  barCount = 18,
  minHeight = 8,
  maxHeight = 48,
  fillColor,
  borderColor,
  barOpacity = 1,
  animationDuration = 2.8,
  variant = "gradient",
  className,
  barClassName,
  children,
}: BarsWaveProps) {
  const halfCount = Math.ceil(barCount / 2);

  const [barAnimations] = useState(() => {
    return Array.from({ length: halfCount }, (_, i) => {
      const h1 = Math.random() * (maxHeight - minHeight) + minHeight;
      const h2 = Math.random() * (maxHeight - minHeight) + minHeight;
      const h3 = Math.random() * (maxHeight - minHeight) + minHeight;
      const h4 = Math.random() * (maxHeight - minHeight) + minHeight;

      return {
        id: i,
        heights: [h1, h2, h3, h4, h1],
        delay: (i / halfCount) * 0.8 + Math.random() * 0.4,
        duration: animationDuration + (i % 3) * 0.4,
      };
    });
  });

  const allBars = useMemo(() => {
    const leftBars = barAnimations.map((bar, i) => ({
      ...bar,
      id: `left-${i}`,
      position: i,
    }));

    const rightBars = [...barAnimations].reverse().map((bar, i) => ({
      ...bar,
      id: `right-${i}`,
      position: halfCount + i,
    }));

    return [...leftBars, ...rightBars].slice(0, barCount);
  }, [barAnimations, halfCount, barCount]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 flex items-end justify-between gap-1 sm:gap-2 px-2 sm:px-6 pointer-events-none">
        {allBars.map((bar) => (
          <motion.div
            key={bar.id}
            className={cn(
              "w-full rounded-t-lg transition-colors",
              (variant === "gradient" || variant === "red-orange") &&
                "bg-gradient-to-t from-[#B91C1C]/40 via-[#FF5812]/55 to-[#FFA066]/90 border-t-2 border-[#FFD0B0] shadow-[0_-4px_25px_rgba(255,88,18,0.5),0_0_15px_rgba(185,28,28,0.4)]",
              variant === "filled" &&
                !fillColor &&
                "bg-gradient-to-t from-[#B91C1C]/30 via-[#FF5812]/45 to-[#FFA066]/70 border-t-2 border-[#FFA066] shadow-[0_0_20px_rgba(255,88,18,0.35)]",
              variant === "outlined" &&
                !borderColor &&
                "bg-transparent border-2 border-[#FF5812]/40 hover:border-[#FF5812]/80",
              barClassName
            )}
            style={{
              ...(fillColor &&
                variant === "filled" && { backgroundColor: fillColor }),
              ...(borderColor &&
                variant === "outlined" && { borderColor: borderColor }),
              opacity: barOpacity,
            }}
            initial={{ height: `${bar.heights[0]}%` }}
            animate={{
              height: bar.heights.map((h) => `${h}%`),
            }}
            transition={{
              duration: bar.duration,
              delay: bar.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {children && <div className="relative z-10 w-full h-full">{children}</div>}
    </div>
  );
}

export default BarsWave;
