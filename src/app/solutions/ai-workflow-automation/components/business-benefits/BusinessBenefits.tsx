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

/* ================= TYPES & DATA ================= */

const leftBenefits = [
  {
    id: "faster-ops",
    icon: FastForward,
    title: "Faster Operations",
    description: "Automate repetitive workflows and complete business processes significantly faster.",
    status: "Completed",
    statusColor: "text-green-600 bg-green-50 border-green-200",
    delay: 0,
  },
  {
    id: "lower-costs",
    icon: TrendingDown,
    title: "Lower Costs",
    description: "Reduce operational expenses by minimizing manual effort and increasing automation.",
    status: "Completed",
    statusColor: "text-green-600 bg-green-50 border-green-200",
    delay: 0.1,
  },
  {
    id: "intelligent-decisions",
    icon: Brain,
    title: "Intelligent Decisions",
    description: "Use AI-driven insights to make faster and more accurate business decisions.",
    status: "AI Powered",
    statusColor: "text-orange-600 bg-orange-50 border-orange-200",
    delay: 0.2,
  },
  {
    id: "higher-productivity",
    icon: Zap,
    title: "Higher Productivity",
    description: "Empower employees to focus on high-value work while AI handles repetitive tasks.",
    status: "In Progress",
    statusColor: "text-orange-600 bg-orange-50 border-orange-200",
    delay: 0.3,
  },
  {
    id: "improved-compliance",
    icon: ShieldCheck,
    title: "Improved Compliance",
    description: "Ensure consistent workflows with built-in governance, audit trails, and compliance.",
    status: "Protected",
    statusColor: "text-blue-600 bg-blue-50 border-blue-200",
    delay: 0.4,
  },
  {
    id: "scalable-automation",
    icon: Maximize,
    title: "Scalable Automation",
    description: "Scale automation across departments without increasing operational complexity.",
    status: "Enterprise Ready",
    statusColor: "text-indigo-600 bg-indigo-50 border-indigo-200",
    delay: 0.5,
  },
];

const bottomBenefits = [
  {
    id: "process-analysis",
    icon: Search,
    title: "Process Analysis",
    description: "Identify repetitive workflows suitable for automation.",
  },
  {
    id: "ai-intelligence",
    icon: Brain,
    title: "AI Intelligence",
    description: "Analyze requests and determine the best automation path.",
  },
  {
    id: "workflow-execution",
    icon: Settings,
    title: "Workflow Execution",
    description: "Automate approvals, integrations, and business actions.",
  },
  {
    id: "business-outcome",
    icon: CheckCircle2,
    title: "Business Outcome",
    description: "Deliver faster operations, reduced costs, and improved productivity.",
  },
];

/* ================= COMPONENTS ================= */

function BenefitCard({ item }: { item: typeof leftBenefits[0] }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: item.delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative flex items-start gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-orange-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(255,107,0,0.1)] transition-all z-20 group"
    >
      <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-white transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
          <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full border", item.statusColor)}>
            {item.status}
          </span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          {item.description}
        </p>
      </div>
      {/* Moving orange ball around the card */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-10 hidden md:block">
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-[#FF6B00] shadow-[0_0_10px_rgba(255,107,0,0.8)]"
          animate={{
            top: ["0%", "0%", "100%", "100%", "0%"],
            left: ["0%", "100%", "100%", "0%", "0%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ x: "-50%", y: "-50%" }}
        />
      </div>
    </motion.div>
  );
}

function BottomCard({ item, index }: { item: typeof bottomBenefits[0], index: number }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="relative flex flex-col items-center text-center p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-orange-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(255,107,0,0.1)] transition-all z-20 group h-full"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-50 text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-white transition-colors mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="font-semibold text-gray-900 text-sm mb-2">{item.title}</h4>
      <p className="text-xs text-gray-500 leading-relaxed">
        {item.description}
      </p>
      {/* Moving orange ball around the card */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-10 hidden lg:block">
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-[#FF6B00] shadow-[0_0_10px_rgba(255,107,0,0.8)]"
          animate={{
            top: ["0%", "0%", "100%", "100%", "0%"],
            left: ["0%", "100%", "100%", "0%", "0%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ x: "-50%", y: "-50%" }}
        />
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

function WorkflowDashboard() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % 7);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const flowNodes = [
    { label: "Business Request", icon: CheckCircle2, color: "text-gray-600" },
    { label: "AI Analysis", icon: Brain, color: "text-[#FF6B00]" },
    { label: "Workflow Routing", icon: Settings, color: "text-blue-600" },
    { label: "Approval", icon: Check, color: "text-green-600" },
    { label: "ERP / CRM Update", icon: Database, color: "text-indigo-600" },
    { label: "Notification Sent", icon: Bell, color: "text-yellow-600" },
    { label: "Completed", icon: CheckCircle2, color: "text-green-600" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-sm mx-auto bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden z-20 flex flex-col h-[580px]"
    >
      {/* Mac-like Window Header */}
      <div className="flex items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex gap-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 text-center font-medium text-sm text-gray-700">
          AI Workflow Automation
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 p-8 overflow-y-auto relative">
        {/* Connection Line */}
        <div className="absolute left-[47px] top-12 bottom-12 w-0.5 bg-gray-100 overflow-hidden rounded-full">
          <motion.div
            className="w-full bg-[#FF6B00] rounded-full"
            initial={{ height: "0%" }}
            animate={{ height: `${(activeIndex / (flowNodes.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>
        
        <div className="flex flex-col gap-6 relative">
          {flowNodes.map((node, i) => {
            const Icon = node.icon;
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
                  "relative z-10 shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                  i <= activeIndex 
                    ? "bg-white border-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,0.3)]" 
                    : "bg-white border-gray-100 shadow-sm",
                  i === activeIndex && "scale-110"
                )}>
                  <Icon className={cn("w-4 h-4 transition-colors duration-500", i <= activeIndex ? "text-[#FF6B00]" : node.color)} />
                </div>
                <div className={cn(
                  "flex-1 p-3 rounded-xl border transition-all duration-500",
                  i <= activeIndex ? "bg-orange-50/50 border-orange-200" : "bg-gray-50 border-gray-100"
                )}>
                  <span className="text-sm font-medium text-gray-800">{node.label}</span>
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
  return (
    <section className="relative py-24 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center justify-center gap-6 mb-6">
            <style>{`
              @keyframes line-stretch {
                0%, 100% { width: 40px; opacity: 0.6; }
                50% { width: 100px; opacity: 1; }
              }
              .animate-line-stretch {
                animation: line-stretch 3s ease-in-out infinite;
              }
            `}</style>
            <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
              <div className="absolute left-0 w-2 h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
            </div>
            <span className="text-[#FF5812] font-bold tracking-[0.2em] text-sm uppercase">
              BUSINESS BENEFITS
            </span>
            <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
              <div className="absolute right-0 w-2 h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Business Benefits of <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] bg-clip-text text-transparent">
              AI Workflow Automation
            </span>
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Discover how AI-powered workflow automation transforms business operations by increasing efficiency, reducing costs, improving decision-making, and enabling scalable enterprise automation.
          </p>
        </div>

        {/* 3D DIAGRAM LAYOUT */}
        <div className="relative w-full mb-16 pt-10">
          
          {/* Animated SVG Lines Background */}
          <ConnectingLines />

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8 items-center relative z-10">
            
            {/* LEFT: Benefit Cards */}
            <div className="flex flex-col gap-4">
              {leftBenefits.map((item) => (
                <BenefitCard key={item.id} item={item} />
              ))}
            </div>

            {/* CENTER: AI Engine */}
            <div className="flex justify-center">
              <GlowingAIEngine />
            </div>

            {/* RIGHT: Workflow Dashboard */}
            <div className="flex justify-center lg:justify-end">
              <WorkflowDashboard />
            </div>

          </div>
        </div>

        {/* BOTTOM FLOW */}
        <div className="relative z-10 pt-10 border-t border-orange-100/50">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bottomBenefits.map((item, index) => (
              <BottomCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
