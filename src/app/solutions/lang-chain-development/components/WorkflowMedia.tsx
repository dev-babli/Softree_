"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Database, ShieldCheck, Check, Code, Search, FileText } from "lucide-react";
import { workflowSteps } from "../data/how-ai-works";

export default function WorkflowMedia({ activeStep }: { activeStep: number }) {
  const normalizedStep = activeStep % 4;
  const step = workflowSteps[normalizedStep];

  const renderStep0 = () => (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 text-slate-200">
      <div className="text-xs font-semibold text-slate-400 mb-6 uppercase tracking-wider font-mono">Chain Architecture</div>
      
      <div className="relative w-full max-w-sm h-64 flex flex-col justify-between items-center py-4">
        {/* Prompt */}
        <div className="z-10 flex items-center gap-3 bg-[#1A233D] border border-slate-700 px-4 py-2.5 rounded-xl w-60">
          <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-[#FF5812]">
            <span className="font-mono text-xs font-bold">&gt;_</span>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Prompt Template</div>
            <div className="text-[11px] font-semibold text-slate-300">Format variables: {'{query}'}</div>
          </div>
        </div>

        {/* LLM */}
        <div className="z-10 flex items-center gap-3 bg-[#1A233D] border border-slate-700 px-4 py-2.5 rounded-xl w-60">
          <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Cpu size={14} />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">LLM / ChatModel</div>
            <div className="text-[11px] font-semibold text-slate-300">gpt-4o-mini · temp: 0</div>
          </div>
        </div>

        {/* Parser */}
        <div className="z-10 flex items-center gap-3 bg-[#1A233D] border border-slate-700 px-4 py-2.5 rounded-xl w-60">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Check size={14} />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Output Parser</div>
            <div className="text-[11px] font-semibold text-slate-300">Structured JSON Output</div>
          </div>
        </div>

        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-700/60 stroke-[1.5] fill-none">
          <path d="M 192 65 L 192 115" className="stroke-[#FF5812]/50 stroke-[2] stroke-dasharray-[4]" />
          <path d="M 192 145 L 192 195" />
        </svg>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="relative h-full w-full flex-1">
      <img
        src="/images/lang-chain/dp-02.jpg"
        alt="Development"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FF5812]/15 via-transparent to-transparent" />
    </div>
  );

  const renderStep2 = () => (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 text-slate-200">
      <div className="text-xs font-semibold text-slate-400 mb-6 uppercase tracking-wider font-mono">Semantic RAG Pipeline</div>

      <div className="grid grid-cols-3 gap-6 w-full max-w-sm items-center relative">
        {/* User Query */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#1A233D] border border-slate-700 px-3 py-2 rounded-xl text-[10px] text-center">
            <div className="text-[8px] font-bold text-blue-400 uppercase">1. User Query</div>
            <div className="font-mono text-[9px] mt-1 text-slate-300">"API pricing?"</div>
          </div>
        </div>

        {/* Retriever */}
        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#121A33] border-2 border-dashed border-[#FF5812] h-28 relative">
          <Search className="text-[#FF5812] mb-1 animate-pulse" size={20} />
          <span className="text-[10px] font-bold text-center">Retriever</span>
          <span className="text-[8px] text-slate-400 font-mono mt-1">k=4 documents</span>
        </div>

        {/* Vector Store */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 bg-[#1A233D] border border-slate-700 px-3 py-2 rounded-xl text-[10px]">
            <Database size={13} className="text-indigo-400" />
            <span>Pinecone index</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="relative h-full w-full flex-1">
      <img
        src="/images/lang-chain/dp-04.jpg"
        alt="Deployment"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FF5812]/15 via-transparent to-transparent" />
    </div>
  );

  return (
    <div className="relative h-full w-full flex-1 min-h-[360px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={normalizedStep}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full flex flex-col justify-between"
        >
          {normalizedStep === 0 && renderStep0()}
          {normalizedStep === 1 && renderStep1()}
          {normalizedStep === 2 && renderStep2()}
          {normalizedStep === 3 && renderStep3()}

          {step && (
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF6A13]">
                Step 0{normalizedStep + 1}
              </p>
              <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                {step.title}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
