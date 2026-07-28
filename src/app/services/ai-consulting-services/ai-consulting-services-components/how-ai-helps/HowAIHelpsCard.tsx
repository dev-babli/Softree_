"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HowAIHelpsStep } from "./how-ai-helps-data";
import { Check } from "lucide-react";

interface HowAIHelpsCardProps {
  step: HowAIHelpsStep;
  index: number;
  activeIndex: number;
  onClick: () => void;
  isLast: boolean;
}

export function HowAIHelpsCard({
  step,
  index,
  activeIndex,
  onClick,
  isLast,
}: HowAIHelpsCardProps) {
  const Icon = step.icon;
  const isActive = index === activeIndex;
  const isCompleted = index < activeIndex;

  return (
    <div className="relative flex items-stretch cursor-pointer group" onClick={onClick}>
      {/* Timeline Column */}
      <div className="relative flex flex-col items-center mr-6 md:mr-10 w-16 shrink-0">
        {/* Vertical Line */}
        {!isLast && (
          <div className="absolute top-14 bottom-[-1.5rem] w-[2px] bg-gray-200 overflow-hidden rounded-full left-1/2 -translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 right-0 bg-[#FF5812] origin-top"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isCompleted ? 1 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ height: "100%" }}
            />
          </div>
        )}
        
        {/* Timeline Node */}
        <div className="relative z-10 flex items-center justify-center w-16 h-16 mt-2">
          {isActive && (
            <motion.div
              layoutId="how-ai-helps-active-bubble"
              className="absolute flex items-center justify-center w-14 h-14"
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <motion.div 
                className="w-full h-full bg-[#FF5812]/15 rounded-full"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          )}

          {isActive ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full border-[2px] border-[#FF5812] shadow-[0_0_15px_rgba(255,88,18,0.2)] z-10"
            >
              <span className="text-[#FF5812] text-base font-bold leading-none">{index + 1}</span>
            </motion.div>
          ) : isCompleted ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex items-center justify-center w-10 h-10 bg-[#FF5812] rounded-full shadow-[0_0_10px_rgba(255,88,18,0.3)] z-10"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <Check className="w-5 h-5 text-white" strokeWidth={3} />
              </motion.div>
            </motion.div>
          ) : (
            <div className="relative flex items-center justify-center w-5 h-5 bg-gray-100 rounded-full border border-gray-300 z-10" />
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 pb-8">
        <div
          className={cn(
            "relative rounded-2xl transition-all duration-300 ease-out overflow-hidden",
            "group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]",
            isActive
              ? "shadow-[0_8px_30px_rgb(255,107,0,0.15)] scale-[1.02] -translate-y-1 z-10 p-[1.5px]"
              : "shadow-sm border border-gray-100 group-hover:border-orange-300"
          )}
        >
          {/* Animated Glow Border (The moving ball effect) */}
          {isActive && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-2xl bg-orange-100">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] aspect-square bg-[conic-gradient(from_0deg,transparent_0_350deg,#FF5812_360deg)] opacity-100"
              />
            </div>
          )}

          {/* Card Inner */}
          <div className={cn(
            "relative z-10 flex items-start gap-4 p-6 rounded-[15px] h-full",
            isActive ? "bg-[#fff7f2]" : "bg-white/80 backdrop-blur-sm"
          )}>
            <div
              className={cn(
                "p-3 rounded-xl transition-all duration-300",
                "group-hover:scale-110",
                isActive ? "bg-white text-[#FF5812] shadow-sm" : "bg-gray-50 text-gray-500 group-hover:bg-orange-50/50 group-hover:text-[#FF5812]"
              )}
            >
              <Icon className="w-6 h-6" />
            </div>
            
            <div className="flex-1 pt-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Status Badge */}
            <div className="hidden sm:block shrink-0 mt-1">
              <span
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-full border transition-colors duration-300",
                  isCompleted
                    ? "bg-green-50 text-green-700 border-green-200"
                    : isActive
                    ? "bg-white text-[#FF5812] border-[#FF5812]/20 shadow-sm"
                    : "bg-gray-50 text-gray-600 border-gray-200"
                )}
              >
                {isCompleted ? "Completed" : isActive ? "In Progress" : "Upcoming"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
