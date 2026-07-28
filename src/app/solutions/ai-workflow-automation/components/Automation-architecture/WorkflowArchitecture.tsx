"use client";

import React, { useRef } from "react";
import { motion, Variants, TargetAndTransition } from "framer-motion";
import {
  Rocket,
  BrainCircuit,
  Bot,
  Zap,
  FileCheck,
  Share2,
  Bell,
  Monitor,
  Users,
  Code,
  Database,
} from "lucide-react";

/* =====================================================================
   ICONS / SVG ASSETS
   ===================================================================== */

const Microsoft365Icon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="m365-bottom" x1="3" y1="17" x2="21" y2="17" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9254C8" />
        <stop offset="1" stopColor="#4A3CA5" />
      </linearGradient>
      <linearGradient id="m365-left" x1="3" y1="17" x2="12" y2="2" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9254C8" />
        <stop offset="1" stopColor="#1E65D0" />
      </linearGradient>
      <linearGradient id="m365-right" x1="12" y1="2" x2="21" y2="17" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1E65D0" />
        <stop offset="1" stopColor="#30C0E5" />
      </linearGradient>
    </defs>
    
    {/* Bottom Purple */}
    <path d="M 21 17 L 12 22 L 3 17 L 7.5 14.5 L 12 17 L 16.5 14.5 Z" fill="url(#m365-bottom)" />
    
    {/* Left Blue */}
    <path d="M 3 17 L 3 7 L 12 2 L 12 7 L 7.5 9.5 L 7.5 14.5 Z" fill="url(#m365-left)" />
    
    {/* Top-Right Light Blue */}
    <path d="M 12 2 L 21 7 L 21 17 L 16.5 14.5 L 16.5 9.5 L 12 7 Z" fill="url(#m365-right)" />
    
    {/* Patch Bottom-Right Purple (to create Penrose triangle overlap) */}
    <path d="M 21 17 L 12 22 L 12 17 L 16.5 14.5 Z" fill="url(#m365-bottom)" />
  </svg>
);

const SharePointIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="13" cy="7" r="5.5" fill="#06696C" />
    <circle cx="16.5" cy="13" r="5.5" fill="#0E8488" />
    <circle cx="12" cy="17.5" r="4.5" fill="#29B0C0" />
    <rect x="3" y="7.5" width="10" height="10" rx="1.5" fill="#007E82" />
    <text x="8" y="14.8" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="Arial, sans-serif" textAnchor="middle">S</text>
  </svg>
);

const DataverseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Dark Green Arc (Left) */}
    <path d="M 16.5 7.5 A 6.5 6.5 0 0 0 7.5 16.5" stroke="#3F7A59" strokeWidth="7" strokeLinecap="round" />
    {/* Medium Green Arc (Right) */}
    <path d="M 16.5 7.5 A 6.5 6.5 0 0 1 7.5 16.5" stroke="#59B77F" strokeWidth="7" strokeLinecap="round" />
    {/* Patch the bottom-left corner so Dark Green is on top */}
    <circle cx="7.5" cy="16.5" r="3.5" fill="#3F7A59" />
    {/* Light Green Center Circle */}
    <circle cx="12" cy="12" r="4.5" fill="#A0F0B1" />
  </svg>
);

const PowerAutomateIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2.5 3h10L10 12l-7.5-9z" fill="#094A9C"/>
    <path d="M12.5 3l7.5 9-7.5 9h-10l7.5-9-7.5-9h10z" fill="#3D8FEF"/>
    <path d="M10 12h10l-7.5 9h-10l7.5-9z" fill="#2878D7"/>
  </svg>
);

/* =====================================================================
   DATA
   ===================================================================== */

const FEATURE_BLOCKS = [
  {
    icon: <Bot className="w-8 h-8 text-gray-800" />,
    title: "AI Agent",
    subtitle: "Intelligent agent performs tasks and interacts autonomously",
  },
  {
    icon: <PowerAutomateIcon className="w-8 h-8" />,
    title: "Power Automate",
    subtitle: "Automate workflows, approvals, and business processes",
  },
  {
    icon: <FileCheck className="w-8 h-8 text-orange-600" />,
    title: "Business Rules",
    subtitle: "Apply policies, validations, and business logic consistently",
  },
  {
    icon: <Share2 className="w-8 h-8 text-red-500" />,
    title: "Integrations",
    subtitle: "Seamless integration with tools, platforms, and services",
  },
  {
    icon: <Bell className="w-8 h-8 text-orange-500" />,
    title: "Notifications",
    subtitle: "Real-time alerts and notifications across channels",
  },
];

const PLATFORMS = [
  { icon: <Monitor className="w-6 h-6" />, label: "ERP", color: "text-gray-900" },
  { icon: <Users className="w-6 h-6" />, label: "CRM", color: "text-gray-900" },
  { icon: <Microsoft365Icon className="w-7 h-7" />, label: "Microsoft 365", color: "text-blue-600" },
  { icon: <SharePointIcon className="w-7 h-7" />, label: "SharePoint", color: "text-teal-600" },
  { icon: <DataverseIcon className="w-7 h-7" />, label: "Dataverse", color: "text-green-600" },
  { icon: <Code className="w-6 h-6" />, label: "APIs", color: "text-gray-900" },
  { icon: <Database className="w-6 h-6" />, label: "Database", color: "text-gray-900" },
];

/* =====================================================================
   ANIMATION VARIANTS
   ===================================================================== */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeDownVariant: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerFadeVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const floatAnimation: TargetAndTransition = {
  y: [0, -6, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const pulseAnimation: TargetAndTransition = {
  scale: [1, 1.2, 1],
  opacity: [0.5, 1, 0.5],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const PARTICLE_POSITIONS = [
  { left: "19.26%", top: "54.64%", opacity: 0.45 },
  { left: "3.29%", top: "92.32%", opacity: 0.46 },
  { left: "55.91%", top: "87.79%", opacity: 0.48 },
  { left: "60.92%", top: "34.44%", opacity: 0.21 },
  { left: "91.06%", top: "39.48%", opacity: 0.33 },
  { left: "27.85%", top: "75.74%", opacity: 0.49 },
  { left: "0.42%", top: "47.36%", opacity: 0.37 },
  { left: "21.06%", top: "21.46%", opacity: 0.65 },
  { left: "80.37%", top: "19.01%", opacity: 0.26 },
  { left: "32.53%", top: "79.14%", opacity: 0.45 },
  { left: "80.11%", top: "95.02%", opacity: 0.49 },
  { left: "59.39%", top: "8.13%", opacity: 0.63 },
] as const;

/* =====================================================================
   COMPONENT
   ===================================================================== */

export function WorkflowArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-14 overflow-hidden font-sans bg-gradient-to-b from-zinc-50 via-white to-zinc-50"
    >

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          {/* HEADER */}
          <motion.div variants={fadeUpVariant} className="text-center mb-10">
            <div className="flex items-center justify-center gap-6 mb-6">
              <style>{`
                @keyframes line-stretch {
                  0%, 100% { width: 40px; opacity: 0.6; }
                  50% { width: 100px; opacity: 1; }
                }
                .animate-line-stretch {
                  animation: line-stretch 3s ease-in-out infinite;
                }
                @keyframes dash-flow {
                  to { stroke-dashoffset: -24; }
                }
                .animate-dash-flow {
                  animation: dash-flow 1s linear infinite;
                }
              `}</style>
              <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
                <div className="absolute left-0 w-2 h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
              </div>
              <span className="text-[#FF5812] font-bold tracking-[0.2em] text-sm uppercase">AI WORKFLOW AUTOMATION ARCHITECTURE</span>
              <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
                <div className="absolute right-0 w-2 h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              AI Workflow Automation{" "}
              <span className="text-[#FF6A13]">
                Architecture
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              An intelligent, secure, and scalable architecture that connects AI
              capabilities with your business systems to automate workflows, drive
              intelligent decisions, and deliver measurable business outcomes.
            </p>
          </motion.div>

          {/* =====================================================================
              ARCHITECTURE DIAGRAM (Responsive Grid Flow)
              ===================================================================== */}
          <div className="w-full mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center w-full max-w-6xl mx-auto">
              
              {/* LEFT COLUMN: TRIGGER -> ENGINE (5 Columns on Desktop) */}
              <div className="lg:col-span-5 flex flex-col justify-center gap-2 w-full">
                
                {/* LAYER 1: TRIGGER */}
                <motion.div
                  variants={fadeDownVariant}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="relative z-10 w-full"
                >
                  <div className="relative group bg-white/90 backdrop-blur-md border border-[#FF5812]/15 rounded-[22px] py-3.5 px-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(255,88,18,0.08)] hover:border-[#FF5812]/30 transition-all duration-300 flex items-center gap-4 cursor-default">
                    {/* Icon Wrapper */}
                    <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[#FF5812] opacity-0 group-hover:opacity-10 rounded-full blur-md transition-opacity duration-300" />
                      <motion.div animate={floatAnimation}>
                        <Rocket className="w-6 h-6 text-[#FF5812]" />
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-slate-800 mb-0.5">Business Trigger</h3>
                      <p className="text-xs text-slate-400">Event or action initiates the workflow</p>
                    </div>
                  </div>
                </motion.div>

                {/* Vertical Connector Pulse Line */}
                <div className="flex justify-center items-center py-1">
                  <div className="w-[1.5px] h-6 bg-gradient-to-b from-[#FF5812] to-orange-100/20" />
                </div>

                {/* LAYER 2: AI DECISION ENGINE */}
                <motion.div
                  variants={fadeUpVariant}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="relative z-10 w-full"
                >
                  <div className="relative group bg-white/90 backdrop-blur-md border border-[#FF5812]/15 rounded-[22px] py-3.5 px-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(255,88,18,0.1)] hover:border-[#FF5812]/30 transition-all duration-300 flex items-center gap-4 cursor-default overflow-hidden">
                    
                    {/* Circuit Graphics (Left) */}
                    <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-48 h-full opacity-20 pointer-events-none flex flex-col justify-center gap-2">
                       <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FF5812] to-transparent translate-x-4" />
                       <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-[#FF5812] to-transparent -translate-x-2" />
                    </div>

                    {/* Particles (Right) */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 pointer-events-none">
                        {PARTICLE_POSITIONS.slice(0, 6).map((pos, i) => (
                          <motion.div
                            key={i}
                            animate={pulseAnimation}
                            style={{
                              animationDelay: `${i * 0.2}s`,
                              position: "absolute",
                              width: "2.5px",
                              height: "2.5px",
                              borderRadius: "50%",
                              backgroundColor: "#FF5812",
                              left: pos.left,
                              top: pos.top,
                              opacity: pos.opacity,
                            }}
                          />
                        ))}
                    </div>

                    {/* Icon Wrapper */}
                    <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[#FF5812] opacity-5 group-hover:opacity-15 rounded-full blur-md transition-opacity duration-300" />
                      <motion.div animate={floatAnimation}>
                        <BrainCircuit className="w-7 h-7 text-[#FF5812]" />
                      </motion.div>
                    </div>
                    <div className="relative z-10 pr-6">
                      <h3 className="text-[16px] font-bold text-slate-800 mb-0.5">AI Decision Engine</h3>
                      <p className="text-xs text-slate-400 leading-normal">
                        AI models analyze context and make intelligent process decisions
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* MIDDLE COLUMN: FLOW LINK DIRECTION (1 Column on Desktop, horizontal arrow) */}
              <div className="hidden lg:flex items-center justify-center lg:col-span-1 py-4">
                <svg className="w-6 h-6 text-[#FF5812]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" className="animate-pulse" />
                </svg>
              </div>

              {/* RIGHT COLUMN: CAPABILITIES & SYSTEMS (6 Columns on Desktop) */}
              <div className="lg:col-span-6 flex flex-col gap-4 w-full">
                
                {/* LAYER 3: FEATURE BLOCKS (CAPABILITIES) */}
                <motion.div
                  variants={fadeUpVariant}
                  className="relative z-10 w-full"
                >
                  <div className="bg-white/90 backdrop-blur-md border border-gray-150 rounded-[24px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 text-center lg:text-left pl-1">Engine Capabilities</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                      {FEATURE_BLOCKS.map((block, idx) => (
                        <motion.div
                          key={idx}
                          variants={staggerFadeVariant}
                          className="flex flex-col items-center text-center p-1 group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-gray-100/50">
                            {React.cloneElement(block.icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5 text-[#FF5812]" })}
                          </div>
                          <h5 className="text-[11px] font-bold text-slate-800 mb-0.5">{block.title}</h5>
                          <p className="text-[9px] text-slate-400 leading-tight max-w-[100px] line-clamp-2">
                            {block.subtitle}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* LAYER 4: BOTTOM SYSTEMS (INTEGRATIONS) */}
                <motion.div
                  variants={fadeUpVariant}
                  className="relative z-10 w-full"
                >
                  <div className="bg-white/90 backdrop-blur-md border border-gray-150 rounded-[24px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 text-center lg:text-left pl-1">Connected Systems</h4>
                    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2">
                      {PLATFORMS.map((platform, idx) => (
                        <motion.div
                          key={idx}
                          variants={staggerFadeVariant}
                          whileHover={{ y: -2 }}
                          className="flex items-center gap-1.5 bg-slate-50 hover:bg-white hover:shadow-sm px-2.5 py-1.5 rounded-full border border-slate-100 hover:border-[#FF5812]/20 transition-all duration-300 text-gray-700 cursor-default"
                        >
                          <div className="flex-shrink-0">
                            {React.cloneElement(platform.icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4" })}
                          </div>
                          <span className={`text-[10px] font-bold ${platform.color} transition-colors`}>
                            {platform.label}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
