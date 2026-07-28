"use client";

import { motion } from "framer-motion";
import { Shield, Brain, TrendingUp, Bot } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "Enterprise-Ready AI",
    description: "Secure, scalable\nAI solutions",
  },
  {
    icon: Brain,
    title: "Custom AI Strategy",
    description: "Tailored for your\nbusiness goals",
  },
  {
    icon: TrendingUp,
    title: "Measurable ROI",
    description: "Reduce costs.\nIncrease productivity.",
  },
  {
    icon: Bot,
    title: "AI Agents & Automation",
    description: "Intelligent enterprise\nworkflows",
  },
];

export const TrustStrip = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-20 w-full max-w-[1200px] bg-white/80 backdrop-blur-md border border-[#ECECEC] rounded-[32px] flex flex-col md:flex-row relative z-20 shadow-[0_8px_30px_rgb(0,0,0,0.04),_0_20px_40px_rgb(255,107,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06),_0_20px_40px_rgb(255,107,0,0.08)] transition-shadow duration-300 py-2 px-2 lg:px-4"
    >
      {/* Subtle orange glow base */}
      <div className="absolute inset-0 rounded-[32px] shadow-[0_10px_40px_rgb(255,107,0,0.05)] pointer-events-none transition-shadow duration-300 group-hover:shadow-[0_10px_50px_rgb(255,107,0,0.1)]"></div>
      
      {trustItems.map((item, index) => (
        <div 
          key={index}
          className={`flex items-center lg:items-start gap-4 p-4 lg:py-3 lg:px-6 group flex-1 transition-transform duration-300 hover:-translate-y-[3px] relative z-10 ${
            index !== trustItems.length - 1 ? 'border-b md:border-b-0 md:border-r border-[#ECECEC]/70' : ''
          }`}
        >
          <div className="w-12 h-12 shrink-0 rounded-full bg-[#FFF3EB] flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.08]">
            <item.icon className="w-[22px] h-[22px] text-[#FF6B00]" strokeWidth={2} />
          </div>
          <div className="flex flex-col pt-0.5">
            <h3 className="text-[18px] font-bold text-[#111827] leading-tight mb-1 whitespace-nowrap">
              {item.title}
            </h3>
            <p className="text-[14px] font-medium text-[#6B7280] leading-[1.4] whitespace-pre-line">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  );
};
