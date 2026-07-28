import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Activity, Cpu, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SuccessStory } from "./successStoriesData";
import Link from 'next/link';

interface Props {
  story: SuccessStory;
  isActive: boolean;
}

const imageMap: Record<string, string> = {
  heart: '/images/ai-consulting-service-image/success-stories/how-1.png',
  bank: '/images/ai-consulting-service-image/success-stories/how-2.png',
  cart: '/images/ai-consulting-service-image/success-stories/how-3.png',
  manufacturing: '/images/ai-consulting-service-image/success-stories/how-4.png',
  'cross-industry': '/images/ai-consulting-service-image/success-stories/how-5.png',
  logistics: '/images/ai-consulting-service-image/success-stories/how-6.png',
};

const renderHighlightedText = (text: string) => {
  return text.split(/(\d+(?:\.\d+)?%?)/).map((part, i) =>
    /^\d+(?:\.\d+)?%?$/.test(part) ? <span key={i} className="text-[#FF6A13] font-bold">{part}</span> : part
  );
};

export const SuccessStoryCard: React.FC<Props> = ({ story, isActive }) => {
  const [activeTab, setActiveTab] = useState<"problem" | "solution" | "results">("problem");
  const imageUrl = imageMap[story.icon] || imageMap['heart'];

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
        <Link href={story.caseStudyUrl} className="block relative w-full h-[120px] sm:h-[135px] overflow-hidden cursor-pointer shrink-0 group/img">
          <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-slate-100">
            <span className="text-[#FF6A13]">
              <Activity className="w-3 h-3" />
            </span>
            <span className="text-[9px] font-bold tracking-widest uppercase text-slate-800">{story.industryLabel}</span>
          </div>
          <Image
            src={imageUrl}
            alt={story.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
          />
        </Link>

        {/* Content Area */}
        <div className="p-4 sm:p-5 flex flex-col bg-white flex-1 justify-between">
          <div>
            <h3 className="text-[17px] sm:text-[18px] leading-tight font-bold text-slate-900 mb-4 line-clamp-2 min-h-[44px]">
              {story.title}
            </h3>

            {/* Interactive Tabs Selector */}
            <div className="flex border-b border-slate-100 mb-4 justify-between gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("problem")}
                className={`flex-1 flex items-center justify-center gap-1 pb-1.5 text-[10px] font-bold uppercase tracking-wider border-b-[2px] transition-all duration-200 ${
                  activeTab === "problem" 
                    ? "border-[#FF6A13] text-[#FF6A13]" 
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Problem</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("solution")}
                className={`flex-1 flex items-center justify-center gap-1 pb-1.5 text-[10px] font-bold uppercase tracking-wider border-b-[2px] transition-all duration-200 ${
                  activeTab === "solution" 
                    ? "border-[#FF6A13] text-[#FF6A13]" 
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Solution</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("results")}
                className={`flex-1 flex items-center justify-center gap-1 pb-1.5 text-[10px] font-bold uppercase tracking-wider border-b-[2px] transition-all duration-200 ${
                  activeTab === "results" 
                    ? "border-[#FF6A13] text-[#FF6A13]" 
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Results</span>
              </button>
            </div>

            {/* Active Content Display */}
            <div className="min-h-[135px] flex flex-col justify-start pb-4">
              <AnimatePresence mode="wait">
                {activeTab === "problem" && (
                  <motion.div
                    key="problem"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="text-[12.5px] sm:text-[13px] text-slate-500 leading-relaxed font-normal"
                  >
                    {story.problem}
                  </motion.div>
                )}

                {activeTab === "solution" && (
                  <motion.div
                    key="solution"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="text-[12.5px] sm:text-[13px] text-slate-500 leading-relaxed font-normal"
                  >
                    {story.solution}
                  </motion.div>
                )}

                {activeTab === "results" && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="w-full"
                  >
                    <ul className="flex flex-col gap-1.5">
                      {story.results.map((result, i) => (
                        <li key={i} className="flex items-start gap-1.5 bg-slate-50/50 p-1.5 rounded-md border border-slate-100 transition-all duration-300">
                          <div className="mt-[2px] shrink-0 w-3.5 h-3.5 rounded-full bg-[#FF6A13]/10 flex items-center justify-center">
                             <svg className="w-2 h-2 text-[#FF6A13]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4.5}>
                               <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                             </svg>
                          </div>
                          <span className="text-[11.5px] sm:text-[12px] text-slate-700 leading-snug font-medium">{renderHighlightedText(result)}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center pt-3 border-t border-slate-100 shrink-0">
            <Link
              href={story.caseStudyUrl}
              className="inline-flex items-center gap-1.5 text-[#FF6A13] font-semibold text-xs transition-all duration-300 hover:text-orange-600 group/cta"
            >
              <span>View Case Study</span>
              <div className="w-5 h-5 rounded-full bg-[#FF6A13] text-white flex items-center justify-center transition-all duration-300 group-hover/cta:translate-x-1 shadow-sm">
                <ArrowRight className="w-2.5 h-2.5" strokeWidth={2.5} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
