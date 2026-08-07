"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Activity, Cpu, Target, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SuccessStory } from "./successStoriesData";
import Link from 'next/link';

interface Props {
  story: SuccessStory;
  isActive: boolean;
}

const imageMap: Record<string, string> = {
  heart: '/images/ai-development-services/success-stories/ai-healthcare-operations.png',
  bank: '/images/ai-development-services/success-stories/hr-assistant.png',
  cart: '/images/ai-development-services/success-stories/ai-performance-report.png',
  manufacturing: '/images/ai-development-services/success-stories/ai-manufacturing.png',
  'cross-industry': '/images/ai-development-services/success-stories/ai-competitive-gap.png',
  logistics: '/images/ai-development-services/success-stories/ai-shipment-delay.png',
};

const renderHighlightedText = (text: string) => {
  return text.split(/(\d+(?:\.\d+)?%?)/).map((part, i) =>
    /^\d+(?:\.\d+)?%?$/.test(part) ? <span key={i} className="text-[#FF6A13] font-bold">{part}</span> : part
  );
};

export const SuccessStoryCard: React.FC<Props> = ({ story, isActive }) => {
  const [activeTab, setActiveTab] = useState<'PROBLEM' | 'SOLUTION' | 'RESULTS'>('PROBLEM');
  const imageUrl = imageMap[story.icon] || imageMap['heart'];
  
  const isProductOverview =
    story.clientOverview.name === 'Softree Technology' ||
    story.title === 'LangGraph Performance Insights Pipeline';

  return (
    <motion.div
      animate={{
        scale: isActive ? 1 : 0.98,
        opacity: isActive ? 1 : 0.7,
        y: 0,
        zIndex: isActive ? 20 : 0,
        boxShadow: isActive 
          ? "0 30px 60px -15px rgba(255, 106, 19, 0.2)" 
          : "0 10px 30px -5px rgba(0, 0, 0, 0.05)"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 250, 
        damping: 30, 
        mass: 1 
      }}
      className="relative w-full rounded-[24px] bg-white group flex flex-col h-full"
    >
      {/* Animated Glowing Border for Active Card */}
      {isActive && (
        <>
          {/* Blurred Glow */}
          <div className="absolute -inset-[3px] rounded-[26px] overflow-hidden pointer-events-none z-0 blur-lg opacity-40">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#FF6A13_360deg)]"
            />
          </div>
          {/* Sharp Border */}
          <div className="absolute -inset-[2px] rounded-[26px] overflow-hidden pointer-events-none z-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#FF6A13_360deg)]"
            />
          </div>
        </>
      )}

      {/* Main Card Content */}
      <div className="relative h-full w-full rounded-[24px] bg-white overflow-hidden flex flex-col border border-slate-100/80 z-10 transition-colors duration-300 group-hover:border-[#FF6A13]/20">
        
        {/* Top Image Banner */}
        <Link href={story.caseStudyUrl} className="block relative w-full h-[150px] sm:h-[170px] overflow-hidden cursor-pointer shrink-0 group/img">
          <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 transition-transform duration-300 group-hover/img:-translate-y-1 group-hover/img:shadow-md border border-slate-100">
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-800">{story.industryLabel}</span>
            <span className="text-[#FF6A13]">
              <Activity className="w-3.5 h-3.5" />
            </span>
          </div>
          <Image
            src={imageUrl}
            alt={story.title}
            fill
            sizes="(max-width: 768px) 85vw, 32vw"
            className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
          />
        </Link>

        {/* Content Area */}
        <div className="p-4 flex flex-col bg-white flex-grow">
          <h3 className="text-[17px] md:text-[19px] leading-tight font-bold text-slate-900 mb-2">{story.title}</h3>

          {/* Client Overview */}
          <div className="bg-slate-50/70 rounded-xl p-3 mb-3 border border-[#FF6A13]">
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A13] mb-2">
              {isProductOverview ? 'Product Overview' : 'Client Overview'}
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-3">
              <div>
                <div className="text-[9px] font-bold tracking-wider text-[#94a3b8] uppercase mb-0.5">
                  {isProductOverview ? 'Developed By' : 'Name'}
                </div>
                <div className="text-[12px] font-semibold text-slate-800 leading-tight">{story.clientOverview.name}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-wider text-[#94a3b8] uppercase mb-0.5">Industry</div>
                <div className="text-[12px] font-semibold text-slate-800 leading-tight">{story.clientOverview.industry}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-wider text-[#94a3b8] uppercase mb-0.5">Country</div>
                <div className="text-[12px] font-semibold text-slate-800 leading-tight">{story.clientOverview.country}</div>
              </div>

              <div>
                <div className="text-[9px] font-bold tracking-wider text-[#94a3b8] uppercase mb-0.5">Business Type</div>
                <div className="text-[12px] font-semibold text-slate-800 leading-tight">{story.clientOverview.businessType}</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex w-full border-b border-slate-100 mb-3">
            <button 
              onClick={(e) => { e.stopPropagation(); setActiveTab('PROBLEM'); }}
              className={`flex min-h-[44px] flex-1 items-center justify-center gap-1 border-b-2 py-2.5 transition-colors ${
                activeTab === 'PROBLEM' ? 'border-[#FF6A13] text-[#FF6A13]' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Target className="w-3.5 h-3.5" strokeWidth={2} />
              <span className="text-[9.5px] font-bold tracking-widest uppercase">Problem</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setActiveTab('SOLUTION'); }}
              className={`flex min-h-[44px] flex-1 items-center justify-center gap-1 border-b-2 py-2.5 transition-colors ${
                activeTab === 'SOLUTION' ? 'border-[#FF6A13] text-[#FF6A13]' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" strokeWidth={2} />
              <span className="text-[9.5px] font-bold tracking-widest uppercase">Solution</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setActiveTab('RESULTS'); }}
              className={`flex min-h-[44px] flex-1 items-center justify-center gap-1 border-b-2 py-2.5 transition-colors ${
                activeTab === 'RESULTS' ? 'border-[#FF6A13] text-[#FF6A13]' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Activity className="w-3.5 h-3.5" strokeWidth={2} />
              <span className="text-[9.5px] font-bold tracking-widest uppercase">Results</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-grow min-h-[90px] mb-3">
            <AnimatePresence mode="wait">
              {activeTab === 'PROBLEM' && (
                <motion.div
                  key="problem"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-[14px] md:text-[15px] text-[#64748b] leading-[1.6] font-medium">{story.problem}</p>
                </motion.div>
              )}
              {activeTab === 'SOLUTION' && (
                <motion.div
                  key="solution"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-[14px] md:text-[15px] text-[#64748b] leading-[1.6] font-medium">{story.solution}</p>
                </motion.div>
              )}
              {activeTab === 'RESULTS' && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ul className="flex flex-col gap-2.5">
                    {story.results.map((result, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="mt-1 shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-[#FF6A13]" strokeWidth={2.5} />
                        </div>
                        <span className="text-[14px] md:text-[15px] text-[#64748b] leading-[1.5] font-medium">{renderHighlightedText(result)}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <div className="flex justify-center pt-5 border-t border-slate-100 mt-auto">
            <Link
              href={story.caseStudyUrl}
              className="inline-flex items-center gap-2 text-[#FF6A13] font-bold text-[14px] transition-all duration-300 hover:text-orange-600 group/cta"
            >
              <span>View Case Study</span>
              <div className="w-5 h-5 rounded-full bg-[#FF6A13] text-white flex items-center justify-center transition-all duration-300 group-hover/cta:translate-x-1 shadow-sm">
                <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
