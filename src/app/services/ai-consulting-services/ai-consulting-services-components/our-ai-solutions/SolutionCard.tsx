"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Headphones, Network, Search, FileText, Sparkles } from "lucide-react";
import { AISolution } from "./types";
import { AnimatedBorder } from "./AnimatedBorder";

const iconMap: Record<string, React.ElementType> = {
  Bot,
  Headphones,
  Network,
  Search,
  FileText,
  Sparkles,
};

interface SolutionCardProps {
  solution: AISolution;
  index: number;
}

export const SolutionCard = ({ solution, index }: SolutionCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[solution.iconName] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        animate={{ y: isHovered ? -8 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative h-full z-10"
      >
        <AnimatedBorder isHovered={isHovered} />

        {/* Card Body */}
        <div className="relative h-full flex flex-col sm:flex-row items-center sm:items-start gap-6 p-8 bg-white/95 backdrop-blur-sm rounded-[24px] transition-shadow duration-300"
             style={{ boxShadow: isHovered ? "0 25px 50px -12px rgba(0, 0, 0, 0.1)" : "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
          
          {/* Icon Section */}
          <div className="relative flex-shrink-0">
            {/* Background Glow */}
            <motion.div 
              animate={{ 
                scale: isHovered ? 1.2 : 1,
                opacity: isHovered ? 0.6 : 0.3
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-[#FF5A1F] blur-xl rounded-full"
            ></motion.div>
            
            {/* Icon Circle */}
            <motion.div 
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#FF5A1F] to-[#E64D16] flex items-center justify-center shadow-lg border-2 border-white/20"
            >
              <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
            </motion.div>
          </div>

          {/* Vertical Divider (Desktop/Tablet only) */}
          <div className="hidden sm:block w-[1px] self-stretch bg-gradient-to-b from-transparent via-slate-200 to-transparent my-2"></div>

          {/* Text Content */}
          <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
            <h3 className="text-xl font-bold text-slate-900 mb-3">{solution.title}</h3>
            <p className="text-slate-600 leading-relaxed text-[15px]">{solution.description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
