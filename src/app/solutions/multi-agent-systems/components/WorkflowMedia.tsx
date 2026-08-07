import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Database, ShieldCheck, Check, Code, Search, FileText } from "lucide-react";

export default function WorkflowMedia({ activeStep }: { activeStep: number }) {
  const normalizedStep = activeStep % 4;

  const renderStep0 = () => (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 text-slate-200">
      <div className="text-xs font-semibold text-slate-400 mb-6 uppercase tracking-wider font-mono">Active Orchestration Graph</div>
      
      <div className="relative w-full max-w-sm h-64 flex flex-col justify-between items-center">
        {/* Central Orchestrator */}
        <div className="z-10 flex flex-col items-center justify-center w-28 h-28 rounded-full bg-[#121A33] border-2 border-[#FF5812] shadow-[0_0_20px_rgba(255,88,18,0.2)]">
          <Cpu className="text-[#FF5812] mb-1" size={24} />
          <span className="text-[11px] font-bold tracking-tight">Orchestrator</span>
          <span className="text-[9px] text-[#FF5812]/80 font-mono">Routing Active</span>
        </div>

        {/* Connected Sub-agents */}
        <div className="w-full flex justify-between px-2">
          {/* Sub-agent 1 */}
          <div className="z-10 flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-[#1A233D] border border-slate-700 shadow-lg">
            <Code className="text-blue-400 mb-1" size={16} />
            <span className="text-[10px] font-semibold">Coder</span>
            <span className="text-[8px] text-slate-400 font-mono">Idle</span>
          </div>

          {/* Sub-agent 2 */}
          <div className="z-10 flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-[#1A233D] border border-slate-700 shadow-lg">
            <Search className="text-indigo-400 mb-1" size={16} />
            <span className="text-[10px] font-semibold">Searcher</span>
            <span className="text-[8px] text-indigo-400 font-mono animate-pulse">Running</span>
          </div>

          {/* Sub-agent 3 */}
          <div className="z-10 flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-[#1A233D] border border-slate-700 shadow-lg">
            <ShieldCheck className="text-emerald-400 mb-1" size={16} />
            <span className="text-[10px] font-semibold">Verifier</span>
            <span className="text-[8px] text-slate-400 font-mono">Idle</span>
          </div>
        </div>

        {/* Connecting Lines SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-700/60 stroke-[1.5] fill-none">
          <path d="M 192 100 L 96 215" />
          <path d="M 192 100 L 192 215" className="stroke-[#FF5812]/50 stroke-[2] stroke-dasharray-[4]" />
          <path d="M 192 100 L 288 215" />
        </svg>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="flex flex-col h-full w-full p-6 text-slate-200 justify-between">
      <div className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider text-center font-mono">Agent Collaboration Logs</div>
      
      <div className="flex-1 bg-[#121A33] border border-slate-800 rounded-xl p-5 font-mono text-[11px] leading-relaxed overflow-y-auto space-y-4 shadow-inner">
        <div className="flex gap-2.5">
          <span className="text-slate-400">[09:30:12]</span>
          <span className="text-blue-400 font-bold">[Planner]</span>
          <span className="text-slate-300">Goal defined: Write and test migration patch.</span>
        </div>
        
        <div className="flex gap-2.5">
          <span className="text-slate-400">[09:30:14]</span>
          <span className="text-orange-400 font-bold">[Coder]</span>
          <span className="text-slate-300">Created file `migration_v2.sql`. Writing indices...</span>
        </div>

        <div className="flex gap-2.5">
          <span className="text-slate-400">[09:30:18]</span>
          <span className="text-indigo-400 font-bold">[Executor]</span>
          <span className="text-slate-300">Applying SQL patch on staging database...</span>
        </div>

        <div className="flex gap-2.5 items-center">
          <span className="text-slate-400">[09:30:21]</span>
          <span className="text-emerald-400 font-bold">[Verifier]</span>
          <span className="text-emerald-300 flex items-center gap-1">
            <Check size={11} className="stroke-[3]" /> Migration check passed. No issues found.
          </span>
        </div>
      </div>
      <div className="text-[10px] text-slate-500 font-mono mt-3 text-center">Orchestrator sync rate: 100% · Protocol: Auto-Delegator</div>
    </div>
  );

  const renderStep2 = () => (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 text-slate-200">
      <div className="text-xs font-semibold text-slate-400 mb-6 uppercase tracking-wider font-mono">Semantic Knowledge Mesh</div>

      <div className="grid grid-cols-3 gap-6 w-full max-w-sm items-center relative">
        {/* Sources */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 bg-[#1A233D] border border-slate-700 px-3 py-2 rounded-xl text-[10px]">
            <FileText size={13} className="text-blue-400" />
            <span>Manuals.pdf</span>
          </div>
          <div className="flex items-center gap-2 bg-[#1A233D] border border-slate-700 px-3 py-2 rounded-xl text-[10px]">
            <Database size={13} className="text-indigo-400" />
            <span>Enterprise DB</span>
          </div>
        </div>

        {/* Central Vector Matcher */}
        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#121A33] border-2 border-dashed border-[#FF5812] h-28 relative">
          <Search className="text-[#FF5812] mb-1 animate-pulse" size={20} />
          <span className="text-[10px] font-bold text-center">Vector Index</span>
          <span className="text-[8px] text-slate-400 font-mono mt-1">Cosine Match</span>
        </div>

        {/* Grounded Context Out */}
        <div className="flex flex-col gap-4 items-end">
          <div className="bg-[#1A233D] border border-emerald-500/30 px-3 py-2 rounded-xl text-[10px] text-center w-full">
            <div className="text-[8px] font-bold text-emerald-400 uppercase">Context Grounding</div>
            <div className="font-mono text-[9px] mt-1 text-slate-300">Ref: DB_8849-A</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="flex flex-col h-full w-full p-6 text-slate-200 justify-between">
      <div className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider text-center font-mono">Production Guardrail Metrics</div>

      <div className="grid grid-cols-2 gap-4 flex-1">
        {/* Latency */}
        <div className="bg-[#121A33] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-[10px] text-slate-400 font-semibold uppercase">Response Latency</div>
          <div className="text-2xl font-bold text-blue-400 font-mono mt-1">124ms</div>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-blue-500 w-[20%]" />
          </div>
        </div>

        {/* Accuracy */}
        <div className="bg-[#121A33] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-[10px] text-slate-400 font-semibold uppercase">Hallucination Risk</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">&lt; 0.1%</div>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-emerald-500 w-[5%]" />
          </div>
        </div>

        {/* Security Gate */}
        <div className="col-span-2 bg-[#121A33] border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="text-[11px] font-bold">Policy compliance gate passed</div>
              <div className="text-[9px] text-slate-400 font-mono">Toxicity: Clean · Token usage: 1042</div>
            </div>
          </div>
          <div className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            GOVERNED
          </div>
        </div>
      </div>
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
