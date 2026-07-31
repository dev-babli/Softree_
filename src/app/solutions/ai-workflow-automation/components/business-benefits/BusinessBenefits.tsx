"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  FastForward,
  TrendingDown,
  Brain,
  Zap,
  ShieldCheck,
  Maximize,
  CheckCircle2,
  Database,
  Bell,
  Check,
  Search,
  Settings,
  Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";
import CapabilitySectionBadge from '../Core-capabilities/CapabilitySectionBadge';

/* ================= TYPES & DATA ================= */

const leftBenefits = [
  {
    id: "faster-ops",
    icon: FastForward,
    title: "Accelerated Process Execution",
    description: "Automate repetitive workflows and reduce process completion times with AI-powered workflow automation.",
    status: "Faster Operations",
    statusColor: "text-green-600 bg-green-50 border-green-200",
    delay: 0,
  },
  {
    id: "lower-costs",
    icon: TrendingDown,
    title: "Reduced Operational Costs",
    description: "Minimize manual effort, eliminate repetitive tasks, and lower operational expenses through intelligent business process automation.",
    status: "Cost Optimized",
    statusColor: "text-green-600 bg-green-50 border-green-200",
    delay: 0.1,
  },
  {
    id: "intelligent-decisions",
    icon: Brain,
    title: "Smarter Business Decisions",
    description: "Leverage AI-powered insights, workflow intelligence, and real-time analytics for faster, data-driven decision-making.",
    status: "AI Powered",
    statusColor: "text-orange-600 bg-orange-50 border-orange-200",
    delay: 0.2,
  },
  {
    id: "higher-productivity",
    icon: Zap,
    title: "Increased Workforce Productivity",
    description: "Free employees from repetitive work so they can focus on innovation, customer engagement, and strategic initiatives.",
    status: "Productivity Boost",
    statusColor: "text-orange-600 bg-orange-50 border-orange-200",
    delay: 0.3,
  },
  {
    id: "improved-compliance",
    icon: ShieldCheck,
    title: "Improved Compliance & Governance",
    description: "Standardize business workflows with built-in approvals, audit trails, governance policies, and enterprise security.",
    status: "Secure & Compliant",
    statusColor: "text-blue-600 bg-blue-50 border-blue-200",
    delay: 0.4,
  },
  {
    id: "scalable-automation",
    icon: Maximize,
    title: "Enterprise-Scale Automation",
    description: "Deploy scalable AI workflow automation across departments while maintaining performance, security, and governance.",
    status: "Enterprise Ready",
    statusColor: "text-indigo-600 bg-indigo-50 border-indigo-200",
    delay: 0.5,
  },
];

const bottomBenefits = [
  {
    id: "process-analysis",
    icon: Search,
    title: "Process Discovery",
    description: "Identify repetitive business processes and automation opportunities across departments.",
  },
  {
    id: "ai-intelligence",
    icon: Brain,
    title: "AI Workflow Intelligence",
    description: "Analyze business rules, recommend automation paths, and optimize workflow execution using AI.",
  },
  {
    id: "workflow-execution",
    icon: Settings,
    title: "Intelligent Workflow Execution",
    description: "Automate approvals, document processing, notifications, integrations, and business actions.",
  },
  {
    id: "business-outcome",
    icon: CheckCircle2,
    title: "Measurable Business Outcomes",
    description: "Improve operational efficiency, reduce costs, increase productivity, and accelerate digital transformation with AI workflow automation.",
  },
];

/* ================= COMPONENTS ================= */

function BenefitCard({ 
  item, 
  isActive, 
  onHover 
}: { 
  item: typeof leftBenefits[0]; 
  isActive: boolean;
  onHover: () => void;
}) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: item.delay }}
      onMouseEnter={onHover}
      className={cn(
        "relative flex items-start gap-3 p-3 rounded-2xl transition-all duration-300 z-20 group cursor-pointer border",
        isActive 
          ? "bg-white border-transparent shadow-[0_10px_30px_rgba(0,0,0,0.15)] scale-[1.01]" 
          : "bg-white/10 border-white/5 hover:bg-white/20 hover:border-white/10"
      )}
    >
      <div className={cn(
        "shrink-0 flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300",
        isActive ? "bg-orange-500 text-white animate-pulse" : "bg-white/20 text-white"
      )}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className={cn(
            "font-semibold text-xs sm:text-sm truncate transition-colors duration-300",
            isActive ? "text-gray-900" : "text-white"
          )}>{item.title}</h4>
          <span className={cn(
            "text-[9px] font-medium px-2 py-0.5 rounded-full border shrink-0 transition-all duration-300",
            isActive ? "text-orange-600 bg-orange-50 border-orange-200" : "text-white bg-white/20 border-white/10"
          )}>
            {item.status}
          </span>
        </div>
        
        <div 
          className="grid transition-all duration-300 ease-in-out overflow-hidden"
          style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
        >
          <div className="min-h-0">
            <p className={cn(
              "text-xs leading-relaxed mt-1.5 transition-colors duration-300",
              isActive ? "text-gray-500" : "text-white/80"
            )}>
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}



function GlowingAIEngine() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center z-20">
      {/* Platform */}
      <div className="absolute bottom-10 w-[280px] h-[140px]">
        {/* Layered rings for pedestal */}
        <div className="absolute inset-0 rounded-[50%] border-4 border-orange-100/50 transform rotate-x-[60deg] shadow-[0_20px_50px_rgba(255,107,0,0.2)]" />
        <div className="absolute inset-4 rounded-[50%] border-2 border-orange-300 transform rotate-x-[60deg] shadow-[0_0_30px_rgba(255,107,0,0.4)] animate-[spin_10s_linear_infinite]" />
        <div className="absolute inset-8 rounded-[50%] bg-gradient-to-t from-orange-500/20 to-transparent transform rotate-x-[60deg] backdrop-blur-md" />
        <div className="absolute inset-10 rounded-[50%] bg-orange-500/40 transform rotate-x-[60deg] blur-md animate-pulse" />
      </div>

      {/* AI Chip */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative mb-16 w-32 h-32"
      >
        {/* Outer Glow */}
        <div className="absolute inset-0 bg-[#FF6B00] blur-2xl opacity-40 animate-pulse" />
        
        {/* Physical Chip Structure */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-gray-800 to-black border border-gray-700 shadow-[inset_0_2px_20px_rgba(255,255,255,0.1),0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
          {/* Inner orange circuit glow */}
          <div className="absolute inset-2 rounded-2xl bg-gradient-to-tr from-[#FF6B00]/20 to-transparent shadow-[inset_0_0_20px_rgba(255,107,0,0.5)]" />
          
          <span className="relative text-5xl font-bold bg-gradient-to-b from-white to-orange-200 bg-clip-text text-transparent filter drop-shadow-[0_0_10px_rgba(255,107,0,0.8)]">
            AI
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function WorkflowDashboard({ 
  activeIndex, 
  setActiveIndex 
}: { 
  activeIndex: number; 
  setActiveIndex: React.Dispatch<React.SetStateAction<number>> 
}) {
  const flowNodes = [
    { label: "Business Request", icon: CheckCircle2, color: "text-slate-400" },
    { label: "AI Request Analysis", icon: Brain, color: "text-[#FF6B00]" },
    { label: "Intelligent Workflow Routing", icon: Settings, color: "text-blue-400" },
    { label: "Automated Approval", icon: Check, color: "text-green-400" },
    { label: "ERP / CRM Integration", icon: Database, color: "text-indigo-400" },
    { label: "Notifications & Actions", icon: Bell, color: "text-yellow-400" },
    { label: "Workflow Completed", icon: CheckCircle2, color: "text-green-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-sm mx-auto bg-gradient-to-br from-slate-900 via-zinc-950 to-slate-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-800/80 overflow-hidden z-20 flex flex-col h-[500px]"
    >
      {/* Mac-like Window Header */}
      <div className="flex items-center px-6 py-4 border-b border-slate-800/60 bg-slate-950/40">
        <div className="flex gap-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 text-center font-medium text-sm text-slate-300">
          AI Workflow Automation
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 p-8 overflow-y-auto relative hide-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Connection Line */}
        <div className="absolute left-[47px] top-12 bottom-12 w-0.5 bg-slate-800/80 overflow-hidden rounded-full">
          <motion.div
            className="w-full bg-gradient-to-b from-[#FF6B00] to-[#FF8C00] rounded-full"
            initial={{ height: "0%" }}
            animate={{ height: `${(activeIndex / (flowNodes.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>
        
        <div className="flex flex-col gap-6 relative">
          {flowNodes.map((node, i) => {
            const Icon = node.icon;
            const isCompleted = i < activeIndex;
            const isActive = i === activeIndex;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4 group relative"
              >
                <div className={cn(
                  "relative z-10 shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500",
                  (isActive || isCompleted)
                    ? "bg-slate-900 border-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,0.3)]" 
                    : "bg-slate-950 border-slate-800 shadow-sm",
                  isActive && "scale-110"
                )}>
                  <Icon className={cn("w-4 h-4 transition-colors duration-500", (isActive || isCompleted) ? "text-[#FF6B00]" : "text-slate-500")} />
                </div>
                <div className={cn(
                  "flex-1 p-3 rounded-xl border transition-all duration-500 cursor-pointer",
                  isActive 
                    ? "bg-orange-500/10 border-orange-500/30 text-white font-medium" 
                    : isCompleted
                      ? "bg-slate-900/30 border-slate-800/40 text-slate-300"
                      : "bg-slate-950/20 border-slate-900/60 text-slate-500"
                )}
                onClick={() => setActiveIndex(i)}
                >
                  <span className="text-sm font-medium transition-colors duration-300">{node.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Anchor point for SVG line */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#FF6B00] shadow-[0_0_10px_rgba(255,107,0,0.5)] opacity-0 md:opacity-100 z-10" />
    </motion.div>
  );
}

function ConnectingLines() {
  // We use a fixed absolute SVG canvas to draw connecting lines. 
  // Because it's responsive, these static coordinates are an approximation.
  // In a truly responsive 3D diagram, these lines would need to resize dynamically.
  // We'll use a responsive container and hide lines on mobile.
  
  return (
    <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block overflow-visible">
      <svg className="w-full h-full" style={{ filter: "drop-shadow(0 0 8px rgba(255, 107, 0, 0.4))" }}>
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#FF6B00" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* 
          Approximated SVG paths connecting:
          Left Cards (33% width) -> Center AI (50% width)
          Center AI -> Right Dashboard (66% width)
          Center AI -> Bottom Cards
          Since percentages in path 'd' attribute are complex without JS, 
          we rely on the parent div's absolute layout and soft gradients to imply connection.
        */}

        {/* Left Side Lines (x1: ~33%, x2: ~50%) */}
        {/* Line 1 */}
        <path d="M 33% 20% C 42% 20%, 42% 50%, 50% 50%" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" filter="url(#glow)"/>
        {/* Line 2 */}
        <path d="M 33% 32% C 42% 32%, 42% 50%, 50% 50%" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" filter="url(#glow)"/>
        {/* Line 3 */}
        <path d="M 33% 44% C 42% 44%, 42% 50%, 50% 50%" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" filter="url(#glow)"/>
        {/* Line 4 */}
        <path d="M 33% 56% C 42% 56%, 42% 50%, 50% 50%" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" filter="url(#glow)"/>
        {/* Line 5 */}
        <path d="M 33% 68% C 42% 68%, 42% 50%, 50% 50%" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" filter="url(#glow)"/>
        {/* Line 6 */}
        <path d="M 33% 80% C 42% 80%, 42% 50%, 50% 50%" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" filter="url(#glow)"/>

        {/* Right Side Line */}
        <path d="M 50% 50% C 58% 50%, 58% 50%, 66% 50%" fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeDasharray="10,5" className="animate-[dash_10s_linear_infinite_reverse]" filter="url(#glow)"/>

        {/* Bottom Lines */}
        <path d="M 50% 70% C 50% 85%, 25% 85%, 25% 90%" fill="none" stroke="url(#lineGrad)" strokeWidth="2" />
        <path d="M 50% 70% C 50% 85%, 41% 85%, 41% 90%" fill="none" stroke="url(#lineGrad)" strokeWidth="2" />
        <path d="M 50% 70% C 50% 85%, 58% 85%, 58% 90%" fill="none" stroke="url(#lineGrad)" strokeWidth="2" />
        <path d="M 50% 70% C 50% 85%, 75% 85%, 75% 90%" fill="none" stroke="url(#lineGrad)" strokeWidth="2" />
        
        <style>{`
          @keyframes dash {
            to {
              stroke-dashoffset: -1000;
            }
          }
        `}</style>
      </svg>
    </div>
  );
}


/* ================= MAIN SECTION ================= */

export function BusinessBenefits() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % 7);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-6 lg:mb-8">
          <CapabilitySectionBadge text="BUSINESS OUTCOMES" variant="line" />

          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold text-[#111827] mb-3 tracking-tight text-center leading-tight">
            Measurable Business Outcomes with <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] bg-clip-text text-transparent">
              AI Workflow Automation
            </span>
          </h2>

          <p className="text-[15px] lg:text-[17px] text-[#6B7280] text-center max-w-2xl leading-snug mx-auto">
            Transform business operations with AI workflow automation that streamlines processes, reduces operational costs, improves productivity, and delivers measurable business outcomes through intelligent automation and enterprise workflow optimization.
          </p>
        </div>

        {/* 3D DIAGRAM LAYOUT */}
        <div className="relative w-full mb-16 pt-4">
          
          {/* Animated SVG Lines Background */}
          <ConnectingLines />

          <div 
            className="grid lg:grid-cols-3 gap-12 lg:gap-8 items-center relative z-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            
            {/* LEFT: Benefit Cards */}
            <div className="relative w-full max-w-md mx-auto bg-gradient-to-br from-[#FF6B00] via-[#FF5812] to-[#FF6B00] rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(255,107,0,0.15)] border border-orange-400/20 z-20 flex flex-col gap-3 justify-center h-[500px]">
              {leftBenefits.map((item, index) => {
                const isActive = index === (activeIndex % leftBenefits.length);
                return (
                  <BenefitCard 
                    key={item.id} 
                    item={item} 
                    isActive={isActive} 
                    onHover={() => setActiveIndex(index)}
                  />
                );
              })}
            </div>

            {/* CENTER: AI Engine */}
            <div className="flex justify-center">
              <GlowingAIEngine />
            </div>

            {/* RIGHT: Workflow Dashboard */}
            <div className="flex justify-center lg:justify-end">
              <WorkflowDashboard activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            </div>

          </div>
        </div>

        {/* BOTTOM FLOW */}
        <div className="relative z-10 pt-10 border-t border-slate-800/40">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-gradient-to-br from-slate-900 via-zinc-950 to-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.4)] z-20 overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[150px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 relative z-10 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
              {bottomBenefits.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.id} 
                    className="relative flex flex-col items-center text-center px-6 py-4 lg:py-0 group cursor-pointer overflow-hidden rounded-2xl lg:rounded-none transition-all duration-500 hover:bg-slate-800/20"
                  >
                    {/* Big background step number */}
                    <div className="absolute right-4 top-2 text-5xl font-black text-slate-850 select-none group-hover:text-orange-500/10 transition-colors duration-500" style={{ color: '#1e293b2a' }}>
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Glowing Icon Container */}
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700/60 text-slate-400 group-hover:bg-[#FF6B00] group-hover:border-transparent group-hover:text-white group-hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all duration-500 mb-5 relative">
                      <Icon className="w-6 h-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" />
                      <div className="absolute inset-0 rounded-2xl bg-orange-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <h4 className="font-bold text-slate-200 text-sm mb-3 transition-colors duration-300 group-hover:text-orange-500">
                      {item.title}
                    </h4>
                    
                    <p className="text-xs text-slate-400 leading-relaxed max-w-[220px] transition-colors duration-300 group-hover:text-slate-300">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
