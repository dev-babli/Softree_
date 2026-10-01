"use client";

import React from "react";
import { motion } from "framer-motion";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export const BentoCapabilities: React.FC = () => {
  return (
    <section className="relative w-full py-24 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 flex justify-center overflow-hidden">
      {/* Background Decorators matching the dark theme subtle glows */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-orange-500/5 rounded-br-[100%] blur-3xl pointer-events-none -translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none translate-x-1/4 translate-y-1/4" />

      <div className="w-full max-w-6xl px-4 md:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <div className="shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),inset_-2px_-2px_5px_rgba(255,255,255,0.8)] bg-zinc-50/50 px-4 py-1.5 rounded-full border border-black/5 mb-4 inline-block">
            <span className="text-[11px] font-bold text-[#FF6B2C] tracking-widest uppercase">
              AI TESTING CAPABILITIES
            </span>
          </div>
          <h2 className={cn("text-slate-900 mb-4", typography.heading.h2)}>
            Comprehensive AI Testing <span className="text-[#FF6B2C]">Capabilities</span>
          </h2>
          <p className={cn("text-slate-500 max-w-2xl mx-auto", typography.description.default)}>
            From single-prompt evaluations to complex multi-agent workflows, our testing methodologies cover the entire AI spectrum.
          </p>
        </div>

        {/* CSS Grid Bento Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 grid-flow-dense">
          
          {/* Card 1: LLM Applications - col-span-2 */}
          <motion.div
            initial="idle"
            whileHover="hover"
            className="group relative flex flex-col bg-[#121217] border border-zinc-800/80 rounded-[28px] p-6 sm:p-8 shadow-[-10px_-10px_30px_rgba(255,255,255,0.02),10px_10px_30px_rgba(0,0,0,0.6)] hover:border-orange-500/35 hover:shadow-[-10px_-10px_30px_rgba(255,255,255,0.03),10px_10px_30px_rgba(255,88,18,0.15)] transition-all duration-300 overflow-hidden col-span-1 md:col-span-2 lg:col-span-2 min-h-[300px]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none opacity-50" />
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-[#FF5812]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6 relative">
                <div className="bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-[#FF6B2C] tracking-wider uppercase select-none">
                  01 • LLM
                </div>
              </div>

              {/* Unique SVG: AI Document Scanner */}
              <div className="absolute top-0 right-4 h-36 w-36 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="absolute w-24 h-24 rounded-full blur-2xl opacity-40 pointer-events-none z-0 bg-[#FF6B2C]" />
                <svg className="w-28 h-28 relative z-10" viewBox="0 0 100 100" fill="none">
                  <rect x="25" y="20" width="50" height="60" rx="4" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
                  <line x1="35" y1="35" x2="65" y2="35" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round" />
                  <line x1="35" y1="45" x2="65" y2="45" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round" />
                  <line x1="35" y1="55" x2="55" y2="55" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round" />
                  
                  <motion.g
                    variants={{
                      idle: { y: 0 },
                      hover: { y: [0, 35, 0], transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } }
                    }}
                  >
                    <line x1="15" y1="25" x2="85" y2="25" stroke="#FF6B2C" strokeWidth="1.5" />
                    <polygon points="45,25 55,25 50,30" fill="#FF6B2C" />
                    <rect x="15" y="25" width="70" height="20" fill="url(#scanGrad)" opacity="0.3" />
                  </motion.g>
                  <defs>
                    <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF6B2C" stopOpacity="1" />
                      <stop offset="100%" stopColor="#FF6B2C" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="mt-auto pr-24">
                <h3 className={cn("text-white mb-2", typography.heading.h4)}>
                  LLM Applications
                </h3>
                <p className={cn("text-zinc-400", typography.body.sm)}>
                  Test response quality, hallucination, safety
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: RAG Applications - col-span-2 */}
          <motion.div
            initial="idle"
            whileHover="hover"
            className="group relative flex flex-col bg-[#121217] border border-zinc-800/80 rounded-[28px] p-6 sm:p-8 shadow-[-10px_-10px_30px_rgba(255,255,255,0.02),10px_10px_30px_rgba(0,0,0,0.6)] hover:border-orange-500/35 hover:shadow-[-10px_-10px_30px_rgba(255,255,255,0.03),10px_10px_30px_rgba(255,88,18,0.15)] transition-all duration-300 overflow-hidden col-span-1 md:col-span-1 lg:col-span-2 min-h-[300px]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none opacity-50" />
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-[#FF5812]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-[#FF6B2C] tracking-wider uppercase select-none">
                  02 • RAG
                </div>
              </div>

              {/* Unique SVG: Database Stack */}
              <div className="absolute top-4 right-8 h-32 w-32 flex items-center justify-center">
                <svg className="w-24 h-24 opacity-90 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 100" fill="none">
                  <ellipse cx="50" cy="70" rx="30" ry="12" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
                  <path d="M20 70 v-18 a30 12 0 0 0 60 0 v18" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
                  
                  <ellipse cx="50" cy="52" rx="30" ry="12" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
                  <path d="M20 52 v-18 a30 12 0 0 0 60 0 v18" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
                  
                  <ellipse cx="50" cy="34" rx="30" ry="12" fill="#18181b" stroke="#FF6B2C" strokeWidth="2.5" />
                  <ellipse cx="50" cy="34" rx="20" ry="6" fill="#FF5812" opacity="0.2" />

                  <motion.circle cx="40" cy="34" r="3" fill="#FF6B2C" 
                    variants={{
                      idle: { y: 0, opacity: 0 },
                      hover: { y: [0, -25], opacity: [1, 0], transition: { repeat: Infinity, duration: 1.5, ease: "easeOut" } }
                    }}
                  />
                  <motion.circle cx="55" cy="34" r="4" fill="#FF6B2C" 
                    variants={{
                      idle: { y: 0, opacity: 0 },
                      hover: { y: [0, -30], opacity: [1, 0], transition: { repeat: Infinity, duration: 2, delay: 0.5, ease: "easeOut" } }
                    }}
                  />
                  <motion.circle cx="65" cy="34" r="2.5" fill="#FF6B2C" 
                    variants={{
                      idle: { y: 0, opacity: 0 },
                      hover: { y: [0, -20], opacity: [1, 0], transition: { repeat: Infinity, duration: 1.2, delay: 1, ease: "easeOut" } }
                    }}
                  />
                  <motion.circle cx="30" cy="34" r="2" fill="#FF6B2C" 
                    variants={{
                      idle: { y: 0, opacity: 0 },
                      hover: { y: [0, -15], opacity: [1, 0], transition: { repeat: Infinity, duration: 1.8, delay: 0.2, ease: "easeOut" } }
                    }}
                  />
                </svg>
              </div>

              <div className="mt-auto pr-10">
                <h3 className={cn("text-white mb-2", typography.heading.h4)}>
                  RAG Applications
                </h3>
                <p className={cn("text-zinc-400", typography.body.sm)}>
                  Validate retrieval quality, grounding, context relevance
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Agentic AI - col-span-2 */}
          <motion.div
            initial="idle"
            whileHover="hover"
            className="group relative flex flex-col bg-[#121217] border border-zinc-800/80 rounded-[28px] p-6 sm:p-8 shadow-[-10px_-10px_30px_rgba(255,255,255,0.02),10px_10px_30px_rgba(0,0,0,0.6)] hover:border-orange-500/35 hover:shadow-[-10px_-10px_30px_rgba(255,255,255,0.03),10px_10px_30px_rgba(255,88,18,0.15)] transition-all duration-300 overflow-hidden col-span-1 md:col-span-2 lg:col-span-2 min-h-[300px]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FF5812]/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <div className="bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-[#FF6B2C] tracking-wider uppercase select-none">
                  03 • AGENTIC
                </div>
              </div>

              {/* Unique SVG: Orbital Core */}
              <div className="relative z-10 flex-1 flex items-center justify-center py-2">
                <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none">
                  {/* Orbits */}
                  <circle cx="50" cy="50" r="35" stroke="#27272a" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="50" cy="50" r="20" stroke="#3f3f46" strokeWidth="1" />
                  
                  {/* Central Node */}
                  <motion.circle cx="50" cy="50" r="8" fill="#FF6B2C" 
                    variants={{
                      idle: { scale: 1, opacity: 0.8 },
                      hover: { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } }
                    }}
                  />
                  <circle cx="50" cy="50" r="11" stroke="#FF6B2C" strokeWidth="1" strokeOpacity="0.4" />

                  {/* Orbital Nodes */}
                  <motion.g 
                    style={{ originX: "50px", originY: "50px" }}
                    variants={{
                      idle: { rotate: 0 },
                      hover: { rotate: 360, transition: { repeat: Infinity, duration: 12, ease: "linear" } }
                    }}
                  >
                    <circle cx="50" cy="15" r="5" fill="#18181b" stroke="#FF6B2C" strokeWidth="2" />
                    <circle cx="20" cy="67" r="4" fill="#FF5812" />
                    <circle cx="80" cy="67" r="6" fill="#18181b" stroke="#FF6B2C" strokeWidth="1.5" />
                  </motion.g>
                  
                  {/* Inner Fast Orbit */}
                  <motion.g 
                    style={{ originX: "50px", originY: "50px" }}
                    variants={{
                      idle: { rotate: 0 },
                      hover: { rotate: -360, transition: { repeat: Infinity, duration: 6, ease: "linear" } }
                    }}
                  >
                    <circle cx="30" cy="50" r="3" fill="#FF6B2C" />
                    <circle cx="70" cy="50" r="2" fill="#FF6B2C" />
                  </motion.g>
                </svg>
              </div>

              <div className="mt-auto">
                <h3 className={cn("text-white mb-2", typography.heading.h4)}>
                  Agentic AI
                </h3>
                <p className={cn("text-zinc-400", typography.body.sm)}>
                  Test planning, reasoning, tool usage, memory
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Generative AI - col-span-1 */}
          <motion.div
            initial="idle"
            whileHover="hover"
            className="group relative flex flex-col bg-[#121217] border border-zinc-800/80 rounded-[28px] p-6 sm:p-8 shadow-[-10px_-10px_30px_rgba(255,255,255,0.02),10px_10px_30px_rgba(0,0,0,0.6)] hover:border-orange-500/35 hover:shadow-[-10px_-10px_30px_rgba(255,255,255,0.03),10px_10px_30px_rgba(255,88,18,0.15)] transition-all duration-300 overflow-hidden col-span-1 md:col-span-1 lg:col-span-1 min-h-[300px]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none opacity-50" />
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-[#FF5812]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-[#FF6B2C] tracking-wider uppercase select-none">
                  04 • GENAI
                </div>
              </div>

              {/* Unique SVG: Prism and Sparkles */}
              <div className="absolute top-8 right-6 h-28 w-28 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
                  <motion.path 
                    d="M50 20 L65 50 L50 80 L35 50 Z" 
                    fill="url(#prismGrad)" 
                    stroke="#FF6B2C" 
                    strokeWidth="1.5"
                    variants={{
                      idle: { y: 0 },
                      hover: { y: [-5, 5, -5], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } }
                    }}
                  />
                  <defs>
                    <linearGradient id="prismGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FF6B2C" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#121215" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  
                  {/* Twinkling stars */}
                  <motion.path d="M25 35 Q 30 35 30 30 Q 30 35 35 35 Q 30 35 30 40 Q 30 35 25 35 Z" fill="#FF6B2C" 
                    style={{ originX: "30px", originY: "35px" }} 
                    variants={{
                      idle: { scale: 0, rotate: 0 },
                      hover: { scale: [0, 1, 0], rotate: 180, transition: { repeat: Infinity, duration: 2, delay: 0.2 } }
                    }}
                  />
                  <motion.path d="M70 25 Q 73 25 73 22 Q 73 25 76 25 Q 73 25 73 28 Q 73 25 70 25 Z" fill="#FF5812" 
                    style={{ originX: "73px", originY: "25px" }} 
                    variants={{
                      idle: { scale: 0, rotate: 0 },
                      hover: { scale: [0, 1, 0], rotate: -180, transition: { repeat: Infinity, duration: 1.5, delay: 0.8 } }
                    }}
                  />
                  <motion.path d="M65 70 Q 68 70 68 67 Q 68 70 71 70 Q 68 70 68 73 Q 68 70 65 70 Z" fill="#FF6B2C" 
                    style={{ originX: "68px", originY: "70px" }} 
                    variants={{
                      idle: { scale: 0, rotate: 0 },
                      hover: { scale: [0, 1, 0], rotate: 90, transition: { repeat: Infinity, duration: 2.5, delay: 1.2 } }
                    }}
                  />
                </svg>
              </div>

              <div className="mt-auto pr-4">
                <h3 className={cn("text-white mb-2", typography.heading.h4)}>
                  Generative AI
                </h3>
                <p className={cn("text-zinc-400", typography.body.sm)}>
                  Test AI-generated text, documents, code
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 5: AI APIs & Integrations - col-span-1 */}
          <motion.div
            initial="idle"
            whileHover="hover"
            className="group relative flex flex-col bg-[#121217] border border-zinc-800/80 rounded-[28px] p-6 sm:p-8 shadow-[-10px_-10px_30px_rgba(255,255,255,0.02),10px_10px_30px_rgba(0,0,0,0.6)] hover:border-orange-500/35 hover:shadow-[-10px_-10px_30px_rgba(255,255,255,0.03),10px_10px_30px_rgba(255,88,18,0.15)] transition-all duration-300 overflow-hidden col-span-1 md:col-span-1 lg:col-span-1 min-h-[300px]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none opacity-50" />
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-[#FF5812]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-[#FF6B2C] tracking-wider uppercase select-none">
                  05 • APIS
                </div>
              </div>

              {/* Unique SVG: API Gateway Network */}
              <div className="absolute top-6 right-6 h-28 w-28 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
                  <path d="M36 50 C 50 50, 50 30, 64 30" stroke="#3f3f46" strokeWidth="2" fill="none" />
                  <path d="M36 50 C 50 50, 50 70, 64 70" stroke="#3f3f46" strokeWidth="2" fill="none" />

                  <motion.path 
                    d="M36 50 C 50 50, 50 30, 64 30" 
                    stroke="#FF6B2C" strokeWidth="2" fill="none" 
                    strokeDasharray="10 60" 
                    variants={{
                      idle: { strokeDashoffset: 70 },
                      hover: { strokeDashoffset: [70, 0], transition: { repeat: Infinity, duration: 1.8, ease: "linear" } }
                    }}
                  />
                  <motion.path 
                    d="M36 50 C 50 50, 50 70, 64 70" 
                    stroke="#FF6B2C" strokeWidth="2" fill="none" 
                    strokeDasharray="10 60" 
                    variants={{
                      idle: { strokeDashoffset: 70 },
                      hover: { strokeDashoffset: [70, 0], transition: { repeat: Infinity, duration: 1.8, delay: 0.9, ease: "linear" } }
                    }}
                  />
                  
                  <rect x="20" y="40" width="16" height="20" rx="3" fill="#09090b" stroke="#FF6B2C" strokeWidth="1.5" />
                  <rect x="64" y="20" width="16" height="20" rx="3" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
                  <rect x="64" y="60" width="16" height="20" rx="3" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />

                  <motion.circle cx="28" cy="50" r="2" fill="#FF6B2C" 
                    variants={{
                      idle: { opacity: 1 },
                      hover: { opacity: [1, 0.2, 1], transition: { repeat: Infinity, duration: 1 } }
                    }}
                  />
                </svg>
              </div>

              <div className="mt-auto pr-4">
                <h3 className={cn("text-white mb-2", typography.heading.h4)}>
                  AI APIs & Integrations
                </h3>
                <p className={cn("text-zinc-400", typography.body.sm)}>
                  Ensure robust data flow and integration reliability
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 6: AI-Powered Applications (Test Dashboard) - col-span-4 */}
          <motion.div
            initial="idle"
            whileHover="hover"
            className="group relative flex flex-col md:flex-row bg-[#121217] border border-zinc-800/80 rounded-[28px] p-6 sm:p-8 shadow-[-10px_-10px_30px_rgba(255,255,255,0.02),10px_10px_30px_rgba(0,0,0,0.6)] hover:border-orange-500/35 hover:shadow-[-10px_-10px_30px_rgba(255,255,255,0.03),10px_10px_30px_rgba(255,88,18,0.15)] transition-all duration-300 overflow-hidden col-span-1 md:col-span-3 lg:col-span-4 min-h-[220px]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none opacity-50" />
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-[#FF5812]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row h-full w-full justify-between gap-8 md:gap-16">
              
              <div className="flex flex-col max-w-sm">
                <div className="bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-[#FF6B2C] tracking-wider uppercase select-none w-fit mb-6">
                  06 • APPS
                </div>

                <div className="mt-auto">
                  <h3 className={cn("text-white mb-2", typography.heading.h4)}>
                    AI-Powered Applications
                  </h3>
                  <p className={cn("text-zinc-400", typography.body.sm)}>
                    End-to-end testing of full-stack AI features and user workflows
                  </p>
                </div>
              </div>

              {/* Unique SVG/UI: Test Automation Dashboard */}
              <div className="relative w-full md:w-[350px] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] bg-[#0a0a0c]/80 border border-white/5 rounded-2xl p-4 md:p-6 font-mono text-[10.5px] md:text-[11px] text-zinc-300 select-none flex flex-col gap-3 shrink-0">
                <div className="flex items-center gap-1.5 border-b border-zinc-800 pb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="text-[10px] text-slate-500 ml-auto flex items-center gap-1.5 font-bold tracking-widest uppercase">
                    <motion.span 
                      className="text-[#FF6B2C]"
                      variants={{
                        idle: { opacity: 1 },
                        hover: { opacity: [1, 0, 1], transition: { repeat: Infinity, duration: 1.2 } }
                      }}
                    >●</motion.span> RUNNING E2E
                  </span>
                </div>
                
                <div className="flex flex-col gap-3 w-full mt-1">
                  <div>
                    <div className="flex justify-between text-[9.5px] text-zinc-400 mb-1.5 uppercase font-semibold">
                      <span>Unit & API Tests</span>
                      <span className="text-emerald-500">100%</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-1">
                      <div className="bg-emerald-500 h-1 rounded-full w-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-[9.5px] text-zinc-400 mb-1.5 uppercase font-semibold">
                      <span>LLM Hallucination Checks</span>
                      <span className="text-orange-400">Running...</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-1 overflow-hidden relative">
                      <motion.div 
                        className="bg-[#FF6B2C] h-1 rounded-full" 
                        variants={{
                          idle: { width: "0%" },
                          hover: { width: ["0%", "75%", "75%"], transition: { repeat: Infinity, duration: 3, ease: "circOut" } }
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[9.5px] text-zinc-400 mb-1.5 uppercase font-semibold">
                      <span>Security & Safety</span>
                      <span className="text-zinc-500">Pending</span>
                    </div>
                    <div className="w-full bg-zinc-800/50 border border-dashed border-zinc-700 rounded-full h-1"></div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
