"use client";

import React from "react";
import { 
  CheckCircle2, 
  Shield, 
  Activity, 
  ChevronRight, 
  ChevronsRight,
  Target,
  Cpu,
  Layers,
  ShieldCheck,
  TrendingUp,
  ArrowDown,
  FileSearch,
  Swords,
  Gauge
} from "lucide-react";
import { motion } from "framer-motion";

export interface DimensionCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  points: string[];
}

const defaultCards: DimensionCard[] = [
  {
    id: "ai-quality",
    title: "AI Quality",
    icon: <CheckCircle2 className="w-8 h-8 text-[#FF6B2C]" strokeWidth={1.5} />,
    points: [
      "Accuracy",
      "Relevance",
      "Grounding",
      "Hallucination",
    ],
  },
  {
    id: "ai-security",
    title: "AI Security",
    icon: <Shield className="w-8 h-8 text-[#FF6B2C]" strokeWidth={1.5} />,
    points: [
      "Prompt Injection",
      "Jailbreaks",
      "Data Leakage",
      "Agent Security",
    ],
  },
  {
    id: "ai-reliability",
    title: "AI Reliability",
    icon: <Activity className="w-8 h-8 text-[#FF6B2C]" strokeWidth={1.5} />,
    points: [
      "Regression",
      "Performance",
      "Tool Calls",
      "Workflows",
    ],
  },
];

interface StackedDimensionCardsProps {
  cards?: DimensionCard[];
}

export const StackedDimensionCards: React.FC<StackedDimensionCardsProps> = ({
  cards = defaultCards,
}) => {
  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 overflow-hidden font-sans">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#FF6B2C 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 flex flex-col items-center relative z-10">
        
        {/* Top Header Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-6 py-2.5 bg-white rounded-full text-[#FF6B2C] font-bold tracking-widest uppercase text-[13px] border border-zinc-200/80 shadow-sm mb-3"
        >
          AI TESTING DIMENSIONS
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#FF6B2C] mb-10 flex flex-col items-center"
        >
          <div className="w-[1px] h-6 bg-gradient-to-b from-[#FF6B2C] to-transparent mb-1 opacity-50" />
          <ArrowDown className="w-4 h-4 animate-bounce opacity-80" />
        </motion.div>

        {/* Horizontal Pipeline Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl flex justify-center mb-16 hidden md:flex"
        >
           <div className="flex items-center justify-between w-full bg-orange-50/60 p-2.5 rounded-full border border-orange-100 shadow-sm backdrop-blur-sm">
              {cards.map((card, i) => (
                 <React.Fragment key={card.id}>
                   <div className="flex-1 text-center px-6 py-3 rounded-full border border-orange-200/80 bg-white text-[#FF6B2C] font-extrabold text-[13px] tracking-widest uppercase shadow-sm whitespace-nowrap">
                     {card.title}
                   </div>
                   {i < cards.length - 1 && (
                     <div className="text-[#FF6B2C] px-4 md:px-6">
                       <motion.div 
                         animate={{ x: [0, 5, 0] }} 
                         transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                       >
                         <ChevronRight className="w-5 h-5 md:w-6 md:h-6 drop-shadow-sm" strokeWidth={3} />
                       </motion.div>
                     </div>
                   )}
                 </React.Fragment>
              ))}
           </div>
        </motion.div>

        {/* The Grid of Stages */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-x-6 gap-y-12 items-stretch relative mt-4">
          
          {cards.map((card, index) => {
            const num = `0${index + 1}`;
            return (
              <React.Fragment key={card.id}>
                {/* Column */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, type: "spring", stiffness: 200, damping: 20 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center relative z-10 w-full h-full"
                >
                  {/* Circular Icon Header */}
                  <div className="relative mb-6 group cursor-default">
                    <div className="absolute -top-1 -right-5 text-[11px] font-extrabold text-[#FF6B2C] tracking-wider transition-transform group-hover:scale-110">
                      {num}
                    </div>
                    <div className="w-20 h-20 rounded-full border-[3px] border-orange-100 bg-white flex items-center justify-center shadow-lg shadow-orange-500/5 group-hover:border-[#FF6B2C] transition-colors duration-300">
                      {/* React.cloneElement allows passing additional classes to the icon */}
                      {React.isValidElement(card.icon) 
                        ? React.cloneElement(card.icon as React.ReactElement, { className: "w-8 h-8 text-[#FF6B2C] transition-transform duration-300 group-hover:scale-110" })
                        : card.icon}
                    </div>
                  </div>

                  <h4 className="text-[16px] font-extrabold text-slate-900 mb-6 uppercase tracking-[0.15em] text-center">
                    {card.title}
                  </h4>

                  {/* Content Card */}
                  <div className="w-full h-full flex flex-col max-w-[320px] bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(255,107,44,0.08)] transition-all duration-300 hover:border-orange-200 hover:-translate-y-1 group/card">
                    {/* Card Header */}
                    <div className="flex justify-between items-center mb-5 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-[11px] font-extrabold text-slate-700 tracking-widest uppercase">
                          {card.title.replace("AI ", "")}
                        </span>
                      </div>
                      <div className="text-[10px] font-extrabold text-[#FF6B2C] bg-orange-50 px-2 py-0.5 rounded shadow-sm border border-orange-100/50">
                        {num}
                      </div>
                    </div>

                    {/* List Items */}
                    <ul className="flex flex-col gap-2.5 flex-1">
                      {card.points.map((point, i) => (
                        <li key={i} className="flex items-center gap-3 hover:bg-orange-50/50 p-2 -mx-2 rounded-lg transition-colors group/item cursor-default">
                          <ChevronRight className="w-3.5 h-3.5 text-[#FF6B2C] group-hover/item:translate-x-1 transition-transform shrink-0" strokeWidth={3} />
                          <span className="text-[13.5px] font-bold text-slate-600 group-hover/item:text-slate-900 transition-colors">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Card Footer */}
                    <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B2C]" />
                        <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Automated</span>
                      </div>
                      <div className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded shadow-sm border border-slate-200/50">
                        Test Suite
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Arrow Between Columns (Desktop) */}
                {index < cards.length - 1 && (
                  <div className="hidden md:flex flex-col items-center justify-center relative mt-[140px] h-[calc(100%-140px)]">
                    <motion.div 
                      animate={{ x: [0, 8, 0] }} 
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="bg-white rounded-full p-2 shadow-[0_0_15px_rgba(255,107,44,0.15)] border border-orange-100/50"
                    >
                      <ChevronsRight className="w-6 h-6 text-[#FF6B2C]" strokeWidth={2.5} />
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Bottom Legend (Perfectly Aligned to Cards) */}
        <div className="w-full max-w-5xl mt-20 pt-8 border-t-2 border-dashed border-slate-200">
          <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-x-6 gap-y-6 items-center">
             
             {/* Legend 1 */}
             <div className="flex justify-center w-full">
               <motion.div whileHover={{ y: -2 }} className="flex items-center gap-2.5 transition-colors cursor-pointer text-[#FF6B2C]">
                 <div className="p-2 rounded-full transition-all bg-orange-50 border border-orange-200 shadow-sm">
                   <FileSearch className="w-5 h-5" />
                 </div>
                 <span className="text-[11px] font-extrabold tracking-widest uppercase">Evaluation</span>
               </motion.div>
             </div>

             {/* Spacer to match Chevrons */}
             <div className="hidden md:block w-8" />

             {/* Legend 2 */}
             <div className="flex justify-center w-full">
               <motion.div whileHover={{ y: -2 }} className="flex items-center gap-2.5 transition-colors cursor-pointer text-[#FF6B2C]">
                 <div className="p-2 rounded-full transition-all bg-orange-50 border border-orange-200 shadow-sm">
                   <Swords className="w-5 h-5" />
                 </div>
                 <span className="text-[11px] font-extrabold tracking-widest uppercase">Red Teaming</span>
               </motion.div>
             </div>

             {/* Spacer to match Chevrons */}
             <div className="hidden md:block w-8" />

             {/* Legend 3 */}
             <div className="flex justify-center w-full">
               <motion.div whileHover={{ y: -2 }} className="flex items-center gap-2.5 transition-colors cursor-pointer text-[#FF6B2C]">
                 <div className="p-2 rounded-full transition-all bg-orange-50 border border-orange-200 shadow-sm">
                   <Gauge className="w-5 h-5" />
                 </div>
                 <span className="text-[11px] font-extrabold tracking-widest uppercase">Monitoring</span>
               </motion.div>
             </div>

          </div>
        </div>

      </div>
    </section>
  );
};
