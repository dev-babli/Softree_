"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  ClipboardCheck, 
  FileText, 
  Settings, 
  AlertCircle,
  MinusCircle,
  Download,
  Check
} from 'lucide-react';

export const HeroAgenticAIGraphic = () => {
  
  // Animation variants for staggering list items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2, delayChildren: 0.5 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    // Increased the wrapper height slightly (680px unscaled) to give plenty of breathing room at the bottom.
    <div className="w-full flex justify-center overflow-hidden h-[240px] sm:h-[320px] md:h-[450px] lg:h-[580px] xl:h-[680px] mt-8 mb-4">
      <div className="relative w-[1100px] h-[680px] origin-top scale-[0.32] sm:scale-[0.45] md:scale-[0.65] lg:scale-[0.85] xl:scale-100">
        
        {/* SVG Connecting Lines with Orthogonal Rounded Corners */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1100 680">
          
          {/* Scripts to AI */}
          <motion.path
            d="M 285 140 L 330 140 Q 340 140 340 150 L 340 190 Q 340 200 350 200 L 410 200"
            fill="none"
            stroke="#FF6B2C"
            strokeWidth="2.5"
            strokeDasharray="6 8"
            animate={{ strokeDashoffset: [28, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          <path d="M 402 192 L 412 200 L 402 208" fill="none" stroke="#FF6B2C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Cases to Laptop */}
          <motion.path
            d="M 285 440 L 295 440 Q 305 440 305 450 L 305 470 Q 305 480 315 480 L 325 480"
            fill="none"
            stroke="#FF6B2C"
            strokeWidth="2.5"
            strokeDasharray="6 8"
            animate={{ strokeDashoffset: [28, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          <path d="M 317 472 L 327 480 L 317 488" fill="none" stroke="#FF6B2C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* AI to Results */}
          <motion.path
            d="M 690 200 L 750 200 Q 760 200 760 190 L 760 150 Q 760 140 770 140 L 815 140"
            fill="none"
            stroke="#FF6B2C"
            strokeWidth="2.5"
            strokeDasharray="6 8"
            animate={{ strokeDashoffset: [28, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          <path d="M 807 132 L 817 140 L 807 148" fill="none" stroke="#FF6B2C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Laptop to Reports */}
          <motion.path
            d="M 775 480 L 785 480 Q 795 480 795 470 L 795 450 Q 795 440 805 440 L 815 440"
            fill="none"
            stroke="#FF6B2C"
            strokeWidth="2.5"
            strokeDasharray="6 8"
            animate={{ strokeDashoffset: [28, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          <path d="M 807 432 L 817 440 L 807 448" fill="none" stroke="#FF6B2C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* 1. Test Scripts (Top Left) */}
        <div className="absolute z-20" style={{ left: 160, top: 140, transform: 'translate(-50%, -50%)' }}>
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-[250px] h-[250px] bg-white rounded-[24px] shadow-[0_12px_40px_rgba(255,107,44,0.12)] p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-[52px] h-[52px] rounded-[16px] bg-[#f8fafc] flex items-center justify-center text-[#FF6B2C] shrink-0 shadow-[6px_6px_12px_#e2e8f0,-6px_-6px_12px_#ffffff,inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.05)] border border-slate-50/50">
                <Code2 className="w-7 h-7" strokeWidth={1.8} />
              </div>
              <span className="font-extrabold text-slate-800 text-[18px]">Test Scripts</span>
            </div>
            <motion.div 
              className="flex flex-col gap-4 mt-1"
              initial="hidden" animate="visible" variants={containerVariants}
            >
              {[
                { icon: Code2, text: "auth_flow.spec.ts" },
                { icon: Code2, text: "checkout_ui.spec.ts" },
                { icon: Code2, text: "payment_api.spec.ts" }
              ].map((script, idx) => (
                <motion.div key={idx} variants={itemVariants} className="flex items-center gap-3 text-[14.5px] text-[#1e293b] font-bold px-1">
                  <script.icon className="w-[20px] h-[20px] text-[#FF6B2C] shrink-0" strokeWidth={2.5} /> {script.text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* 2. Test Cases (Bottom Left) */}
        <div className="absolute z-20" style={{ left: 160, top: 440, transform: 'translate(-50%, -50%)' }}>
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-[250px] h-[250px] bg-white rounded-[24px] shadow-[0_12px_40px_rgba(255,107,44,0.12)] p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-[52px] h-[52px] rounded-[16px] bg-[#f8fafc] flex items-center justify-center text-[#FF6B2C] shrink-0 shadow-[6px_6px_12px_#e2e8f0,-6px_-6px_12px_#ffffff,inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.05)] border border-slate-50/50">
                <ClipboardCheck className="w-7 h-7" strokeWidth={1.8} />
              </div>
              <span className="font-extrabold text-slate-800 text-[18px]">Test Cases</span>
            </div>
            <motion.div 
              className="flex flex-col gap-4 mt-1"
              initial="hidden" animate="visible" variants={containerVariants}
            >
              {[
                { line1: "Verify user", line2: "authentication" },
                { line1: "Validate payment", line2: "gateway" },
                { line1: "Check cart persistence", line2: null }
              ].map((tc, idx) => (
                <motion.div key={idx} variants={itemVariants} className="flex items-center gap-3 px-1">
                  <div className="bg-[#22c55e] rounded-full w-[24px] h-[24px] shrink-0 flex items-center justify-center shadow-sm">
                    <Check className="w-4 h-4 text-white" strokeWidth={4} />
                  </div>
                  <span className="text-[14.5px] font-bold text-[#1e293b] leading-tight text-center w-full">
                    {tc.line1}{tc.line2 && <><br/>{tc.line2}</>}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* 3. AI Robot (Top Center) */}
        <div className="absolute z-0" style={{ left: 550, top: 200, transform: 'translate(-50%, -50%)' }}>
          <div className="w-[280px] h-[280px] bg-[#FFF6F3] rounded-full flex items-center justify-center relative border-[1px] border-orange-50/50 shadow-inner">
            <div className="absolute inset-4 bg-orange-100/40 rounded-full blur-xl" />

            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 280">
               <path d="M 60 140 L 100 140" stroke="#FF6B2C" strokeWidth="2.5" strokeLinecap="round" />
               <circle cx="60" cy="140" r="4" fill="#FF6B2C" />
               <path d="M 80 90 L 115 125" stroke="#FF6B2C" strokeWidth="2.5" strokeLinecap="round" />
               <circle cx="80" cy="90" r="4" fill="#FF6B2C" />
               <path d="M 80 190 L 115 155" stroke="#FF6B2C" strokeWidth="2.5" strokeLinecap="round" />
               <circle cx="80" cy="190" r="4" fill="#FF6B2C" />

               <path d="M 220 140 L 180 140" stroke="#FF6B2C" strokeWidth="2.5" strokeLinecap="round" />
               <circle cx="220" cy="140" r="4" fill="#FF6B2C" />
               <path d="M 200 90 L 165 125" stroke="#FF6B2C" strokeWidth="2.5" strokeLinecap="round" />
               <circle cx="200" cy="90" r="4" fill="#FF6B2C" />
               <path d="M 200 190 L 165 155" stroke="#FF6B2C" strokeWidth="2.5" strokeLinecap="round" />
               <circle cx="200" cy="190" r="4" fill="#FF6B2C" />
            </svg>

            <motion.div 
              className="bg-[#1e293b] w-[140px] h-[95px] rounded-[35px] flex flex-col items-center justify-center relative z-10 shadow-2xl border-b-[6px] border-[#0f172a]"
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-5 h-5 bg-[#FF6B2C] rounded-full shadow-[0_0_20px_rgba(255,107,44,1)] z-10" />
                <div className="w-2 h-6 bg-[#334155]" />
              </div>
              
              <div className="flex gap-6 mt-2">
                <svg width="26" height="16" viewBox="0 0 26 16" fill="none">
                  <path d="M 3 13 Q 13 -2 23 13" stroke="#FF9B71" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <svg width="26" height="16" viewBox="0 0 26 16" fill="none">
                  <path d="M 3 13 Q 13 -2 23 13" stroke="#FF9B71" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
              
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-12 bg-[#334155] rounded-l-lg" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-12 bg-[#334155] rounded-r-lg" />

              <div className="absolute -bottom-[32px] bg-[#FF6B2C] text-white font-black text-2xl px-6 py-2 rounded-xl shadow-lg border-[3px] border-[#FF6B2C]/50 tracking-wider">
                AI
              </div>
            </motion.div>
          </div>
        </div>

        {/* 4. Laptop (Bottom Center) */}
        <div className="absolute z-30" style={{ left: 550, top: 480, transform: 'translate(-50%, -50%)' }}>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[540px] h-[35px] bg-[#f0f4f8] rounded-[100%] blur-[2px] -z-10" />

            <div className="w-[450px] h-[290px] bg-white border-[14px] border-[#1e293b] rounded-t-2xl p-7 relative shadow-2xl flex flex-col mx-auto z-10">
              <div className="flex items-center gap-4 mb-5">
                <Settings className="w-8 h-8 text-[#FF6B2C] animate-[spin_4s_linear_infinite]" strokeWidth={2.5} />
                <span className="font-extrabold text-slate-800 text-[22px]">Running Tests...</span>
              </div>
              
              <div className="w-full bg-[#f1f5f9] rounded-full h-4 mb-5 overflow-hidden relative">
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 bg-[#22c55e] rounded-full" 
                  animate={{ width: ["0%", "85%"] }} 
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
                />
              </div>
              
              <div className="flex flex-col gap-3.5">
                {['Functional Testing', 'UI Testing', 'API Testing', 'Performance Testing'].map((t, idx) => {
                  const isLast = idx === 3;
                  return (
                    <div key={t} className="flex items-center gap-3.5 text-[17px] font-extrabold text-slate-700">
                      <motion.div 
                        className="rounded-full p-1 shrink-0 flex items-center justify-center shadow-sm"
                        animate={isLast ? { backgroundColor: ["#dcfce7", "#dcfce7", "#22c55e"] } : { backgroundColor: "#22c55e" }}
                        transition={isLast ? { duration: 3.5, times: [0, 0.7, 1], repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } : {}}
                        style={{ backgroundColor: isLast ? "#dcfce7" : "#22c55e" }}
                      >
                        <motion.div
                          animate={isLast ? { color: ["#22c55e", "#22c55e", "#ffffff"] } : { color: "#ffffff" }}
                          transition={isLast ? { duration: 3.5, times: [0, 0.7, 1], repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } : {}}
                          style={{ color: isLast ? "#22c55e" : "#ffffff" }}
                        >
                          <Check className="w-3.5 h-3.5" strokeWidth={4.5} />
                        </motion.div>
                      </motion.div>
                      {t}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-[#1e293b] h-[24px] rounded-b-[18px] w-[510px] mx-auto relative shadow-2xl z-20 border-t-2 border-slate-700 flex justify-center">
              <div className="w-32 h-2.5 bg-[#334155] rounded-b-lg" />
            </div>
          </motion.div>
        </div>

        {/* 5. Test Results (Top Right) */}
        <div className="absolute z-20" style={{ left: 940, top: 140, transform: 'translate(-50%, -50%)' }}>
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-[250px] h-[250px] bg-white rounded-[24px] shadow-[0_12px_40px_rgba(255,107,44,0.12)] p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-[52px] h-[52px] rounded-[16px] bg-[#f8fafc] flex items-center justify-center text-[#FF6B2C] shrink-0 shadow-[6px_6px_12px_#e2e8f0,-6px_-6px_12px_#ffffff,inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.05)] border border-slate-50/50">
                <Check className="w-7 h-7" strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-slate-800 text-[18px] leading-tight">Test Results</span>
            </div>
            <motion.div 
              className="flex flex-col gap-0 text-[16px] font-bold text-slate-600 mt-2"
              initial="hidden" animate="visible" variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="flex justify-between items-center border-b border-slate-100 py-3">
                <div className="flex items-center gap-3">
                  <div className="bg-[#22c55e] rounded-full p-1 shadow-sm"><Check className="w-3 h-3 text-white" strokeWidth={4}/></div> 
                  Passed
                </div>
                <span className="text-slate-900 font-extrabold">24</span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex justify-between items-center border-b border-slate-100 py-3">
                <div className="flex items-center gap-3">
                  <div className="bg-[#ef4444] rounded-full p-1 shadow-sm"><AlertCircle className="w-3 h-3 text-white" strokeWidth={4}/></div> 
                  Failed
                </div>
                <span className="text-slate-900 font-extrabold">2</span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex justify-between items-center py-3">
                <div className="flex items-center gap-3">
                  <div className="bg-[#94a3b8] rounded-full p-1 shadow-sm"><MinusCircle className="w-3 h-3 text-white" strokeWidth={4}/></div> 
                  Skipped
                </div>
                <span className="text-slate-900 font-extrabold">1</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* 6. Reports (Bottom Right) */}
        <div className="absolute z-20" style={{ left: 940, top: 440, transform: 'translate(-50%, -50%)' }}>
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-[250px] h-[250px] bg-white rounded-[24px] shadow-[0_12px_40px_rgba(255,107,44,0.12)] p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-[52px] h-[52px] rounded-[16px] bg-[#f8fafc] flex items-center justify-center text-[#FF6B2C] shrink-0 shadow-[6px_6px_12px_#e2e8f0,-6px_-6px_12px_#ffffff,inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.05)] border border-slate-50/50">
                <FileText className="w-7 h-7" strokeWidth={1.8} />
              </div>
              <span className="font-extrabold text-slate-800 text-[18px]">Reports</span>
            </div>
            <motion.div 
              className="flex flex-col gap-5 mt-2 mb-6 px-1"
              initial="hidden" animate="visible" variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="flex justify-between items-center">
                <span className="text-[14.5px] font-bold text-[#1e293b]">Test Coverage</span>
                <span className="text-[14.5px] font-black text-[#22c55e]">94.2%</span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex justify-between items-center">
                <span className="text-[14.5px] font-bold text-[#1e293b]">Execution Time</span>
                <span className="text-[14.5px] font-black text-[#FF6B2C]">1m 24s</span>
              </motion.div>
            </motion.div>
            <motion.button 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="w-full mt-2 py-3 bg-[#FF6B2C] text-white rounded-[12px] flex justify-center items-center gap-2 text-[15px] font-bold hover:bg-[#FF5812] transition-colors shadow-lg shadow-orange-500/30"
            >
              <Download className="w-4 h-4" /> Download
            </motion.button>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
