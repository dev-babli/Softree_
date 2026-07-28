"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle";
import GitMerge from "lucide-react/dist/esm/icons/git-merge";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import BarChart3 from "lucide-react/dist/esm/icons/bar-chart-3";
import Users from "lucide-react/dist/esm/icons/users";
import Network from "lucide-react/dist/esm/icons/network";

export default function WorkflowHeroLeft() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className="flex flex-col items-start text-left"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Badge */}
      <motion.div 
        variants={itemVariants}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#FF6B00]/30 shadow-sm mb-8"
      >
        <Sparkles className="w-4 h-4 text-[#FF6B00]" />
        <span className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-[#111827] uppercase">
          AI POWERED. AUTOMATION DRIVEN. BUSINESS TRANSFORMED.
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1 
        variants={itemVariants}
        className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
      >
        <div className="text-[#111827] mb-2">AI Workflow</div>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8C33]">
          Automation Services
        </div>
      </motion.h1>

      {/* Description */}
      <motion.p 
        variants={itemVariants}
        className="text-lg text-[#4B5563] leading-relaxed mb-10 max-w-[550px]"
      >
        Automate repetitive business processes with AI-powered workflows, intelligent agents, and enterprise automation that improve productivity, reduce costs, and accelerate digital transformation.
      </motion.p>

      {/* Buttons */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center gap-4 mb-14 w-full sm:w-auto"
      >
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FF6B00] text-white border-2 border-[#FF6B00] px-8 py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#FF6B00]/30">
          <MessageCircle className="w-5 h-5" />
          Talk to Our AI Experts
        </button>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#111827] border-2 border-[#E5E7EB] px-8 py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-1 hover:border-[#FF6B00] hover:text-[#FF6B00] shadow-sm">
          <Network className="w-5 h-5" />
          See Automation Architecture
        </button>
      </motion.div>

      {/* Trust Strip */}
      <motion.div 
        variants={itemVariants}
        className="w-full"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-gray-200">
          
          <div className="flex flex-col gap-1 md:pr-4">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-[#FF6B00]" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold text-[#111827] leading-tight">Microsoft Solutions<br/>Partner</span>
          </div>

          <div className="flex flex-col gap-1 md:px-4">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-[#FF6B00]" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold text-[#111827] leading-tight">Enterprise Grade<br/>Security</span>
          </div>

          <div className="flex flex-col gap-1 md:px-4">
            <div className="flex items-center gap-2 mb-1">
              <GitMerge className="w-4 h-4 text-[#FF6B00]" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold text-[#111827] leading-tight">100+ Automation<br/>Projects Delivered</span>
          </div>

          <div className="flex flex-col gap-1 md:pl-4">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-4 h-4 text-[#FF6B00]" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold text-[#111827] leading-tight">ROI Driven<br/>Automation</span>
          </div>

        </div>
      </motion.div>
      
    </motion.div>
  );
}
