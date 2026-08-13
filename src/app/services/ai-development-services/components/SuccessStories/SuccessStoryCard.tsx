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
 
  const isProductOverview = !!story.productOverview;
 
  return (
    <motion.div
      animate={{
        scale: isActive ? 1.02 : 0.96,
        opacity: isActive ? 1 : 0.6,
        y: isActive ? -8 : 0,
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
      className={`relative w-full rounded-[24px] group flex flex-col h-full ${
        isActive ? 'bg-gradient-to-br from-white to-[#FFFBF9]' : 'bg-white'
      }`}
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
      <div className={`relative h-full w-full rounded-[24px] overflow-hidden flex flex-col border border-slate-100/80 z-10 transition-colors duration-300 group-hover:border-[#FF6A13]/20 ${
        isActive ? 'bg-gradient-to-br from-white to-[#FFFBF9]' : 'bg-white'
      }`}>
       
        {/* Top Image Banner with solid background gradient and floating padding */}
        <Link 
          href={story.caseStudyUrl || "#"} 
          className="block relative w-full h-[160px] sm:h-[180px] overflow-hidden cursor-pointer shrink-0 group/img bg-gradient-to-br from-[#FFFBF9] via-[#FFF5EF] to-[#FFEBE0] border-b border-slate-100/60 p-4"
        >
          {/* Industry Tag */}
          <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center gap-1.5 transition-transform duration-300 group-hover/img:-translate-y-0.5 group-hover/img:shadow-md border border-slate-100">
            <span className="text-[9px] font-bold tracking-wider uppercase text-slate-700">{story.industryLabel}</span>
            <span className="text-[#FF6A13]">
              <Activity className="w-3 h-3" />
            </span>
          </div>

          {/* Inner image frame to look like a floating device mockup */}
          <div className="relative w-full h-full rounded-lg overflow-hidden transition-transform duration-500 ease-out group-hover/img:scale-[1.03]">
            <Image
              src={imageUrl}
              alt={story.title}
              fill
              className="object-contain p-2"
            />
          </div>
        </Link>
 
        {/* Content Area */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-[17px] md:text-[19px] leading-tight font-bold text-slate-900 mb-3">{story.title}</h3>
 
          {/* Client/Product Overview - Solid gradient backdrop with layout text */}
          <div className="bg-gradient-to-br from-slate-50 to-[#FFF7F2]/45 rounded-2xl p-4 mb-4 border border-slate-100/70 shadow-[inset_0_1px_2px_rgba(255,106,19,0.015)]">
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-[#FF6A13] mb-3 flex items-center gap-1.5 pl-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A13] animate-pulse" />
              {isProductOverview ? 'Product Overview' : 'Client Overview'}
            </h4>
            
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 pl-0.5">
              <div>
                <span className="block text-[8px] font-bold tracking-wider text-slate-400 uppercase mb-0.5">
                  {isProductOverview ? 'Developed By' : 'Name'}
                </span>
                <span className="block text-[12px] font-semibold text-slate-800 leading-tight">
                  {isProductOverview ? story.productOverview?.developedBy : story.clientOverview?.name}
                </span>
              </div>
              
              <div>
                <span className="block text-[8px] font-bold tracking-wider text-slate-400 uppercase mb-0.5">
                  {isProductOverview ? 'Solution Type' : 'Industry'}
                </span>
                <span className="block text-[12px] font-semibold text-slate-800 leading-tight">
                  {isProductOverview ? story.productOverview?.solutionType : story.clientOverview?.industry}
                </span>
              </div>
              
              <div>
                <span className="block text-[8px] font-bold tracking-wider text-slate-400 uppercase mb-0.5">
                  {isProductOverview ? 'Primary Use' : 'Country'}
                </span>
                <span className="block text-[12px] font-semibold text-slate-800 leading-tight">
                  {isProductOverview ? story.productOverview?.primaryUse : story.clientOverview?.country}
                </span>
              </div>
 
              <div>
                <span className="block text-[8px] font-bold tracking-wider text-slate-400 uppercase mb-0.5">
                  {isProductOverview ? 'Target Users' : 'Business Type'}
                </span>
                <span className="block text-[12px] font-semibold text-slate-800 leading-tight">
                  {isProductOverview ? story.productOverview?.targetUsers : story.clientOverview?.businessType}
                </span>
              </div>
            </div>
          </div>
 
          {/* Segmented Tab Controls */}
          <div className="flex p-1 bg-slate-50 border border-slate-100 rounded-xl mb-4">
            <button
              onClick={(e) => { e.stopPropagation(); setActiveTab('PROBLEM'); }}
              className={`flex-grow flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all duration-200 ${
                activeTab === 'PROBLEM' 
                  ? 'bg-white text-[#FF6A13] shadow-[0_2px_8px_rgba(255,106,19,0.08)] border border-slate-200/30' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Target className="w-3.5 h-3.5" strokeWidth={activeTab === 'PROBLEM' ? 2.5 : 2} />
              <span className="text-[9.5px] font-bold tracking-wider uppercase">Problem</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveTab('SOLUTION'); }}
              className={`flex-grow flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all duration-200 ${
                activeTab === 'SOLUTION' 
                  ? 'bg-white text-[#FF6A13] shadow-[0_2px_8px_rgba(255,106,19,0.08)] border border-slate-200/30' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" strokeWidth={activeTab === 'SOLUTION' ? 2.5 : 2} />
              <span className="text-[9.5px] font-bold tracking-wider uppercase">Solution</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveTab('RESULTS'); }}
              className={`flex-grow flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all duration-200 ${
                activeTab === 'RESULTS' 
                  ? 'bg-white text-[#FF6A13] shadow-[0_2px_8px_rgba(255,106,19,0.08)] border border-slate-200/30' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Activity className="w-3.5 h-3.5" strokeWidth={activeTab === 'RESULTS' ? 2.5 : 2} />
              <span className="text-[9.5px] font-bold tracking-wider uppercase">Results</span>
            </button>
          </div>
 
          {/* Tab Content */}
          <div className="flex-grow min-h-[90px] mb-4">
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
 
          {/* CTA - Premium Button */}
          <div className="pt-4 border-t border-slate-100/80 mt-auto">
            <Link
              href={story.caseStudyUrl || "#"}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-[#FF6A13] to-orange-500 text-white font-bold text-[13px] tracking-wider uppercase shadow-[0_4px_14px_rgba(255,106,19,0.15)] transition-all duration-300 hover:shadow-[0_6px_22px_rgba(255,106,19,0.28)] hover:scale-[1.01] active:scale-[0.99] group/cta"
            >
              <span>View Case Study</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
