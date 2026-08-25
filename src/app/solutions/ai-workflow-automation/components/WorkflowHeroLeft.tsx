"use client";

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Sparkles, MessageCircle, GitMerge, ShieldCheck, BarChart3, Users, Network, ArrowRight } from 'lucide-react';

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
          AI Workflow Automation Services
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1 
        variants={itemVariants}
        className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.1] mb-6"
      >
        <div className="text-[#111827]">Your Offshore AI Delivery Partner</div>
        <div className="text-[#FF5812]">
          for Workflow Automation
        </div>
      </motion.h1>

      {/* Description */}
      <motion.p 
        variants={itemVariants}
        className="text-base md:text-lg text-[#4B5563] leading-relaxed mb-10 max-w-[550px]"
      >
        Extend your delivery capacity with Softree's AI engineering team for workflow automation, AI agents, Power Automate, Azure AI, and enterprise system integrations.
      </motion.p>

      {/* Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14 w-full sm:w-auto"
      >
        <Link 
          href="/contact"
          className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FF6B00] text-white border-2 border-[#FF6B00] px-8 py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-1 hover:bg-white hover:text-[#FF6B00] hover:shadow-lg hover:shadow-[#FF6B00]/30"
        >
          <MessageCircle className="w-5 h-5" />
          Talk to Our AI Experts
        </Link>
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
            <span className="text-sm font-semibold text-[#111827] leading-tight">Microsoft Solutions<br />Partner</span>
          </div>

          <div className="flex flex-col gap-1 md:px-4">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-[#FF6B00]" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold text-[#111827] leading-tight">Enterprise Grade<br />Security</span>
          </div>

          <div className="flex flex-col gap-1 md:px-4">
            <div className="flex items-center gap-2 mb-1">
              <GitMerge className="w-4 h-4 text-[#FF6B00]" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold text-[#111827] leading-tight">100+ Automation<br />Projects Delivered</span>
          </div>

          <div className="flex flex-col gap-1 md:pl-4">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-4 h-4 text-[#FF6B00]" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold text-[#111827] leading-tight">ROI Driven<br />Automation</span>
          </div>

        </div>
      </motion.div>

    </motion.div>
  );
}
