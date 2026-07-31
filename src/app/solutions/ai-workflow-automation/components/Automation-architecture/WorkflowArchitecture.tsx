"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView, Variants, TargetAndTransition } from "framer-motion";
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

/* =====================================================================
   COMPONENT
   ===================================================================== */

export function WorkflowArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const controls = useAnimation();

  // Desktop vs Mobile layout detection for connectors
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 overflow-hidden font-sans bg-gradient-to-b from-zinc-50 via-white to-zinc-50"
    >

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col items-center"
        >
          {/* HEADER */}
          <motion.div variants={fadeUpVariant} className="text-center mb-16">
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
              ARCHITECTURE DIAGRAM
              ===================================================================== */}
          <div className="relative w-full flex flex-col items-center">
            {/* SVG CONNECTORS (Background Layer) */}
            {!isMobile && (
              <svg
                className="absolute inset-0 w-full h-[110%] pointer-events-none -z-10"
                style={{ top: "80px" }}
              >
                <defs>
                  <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF5812" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#FF5812" stopOpacity="1" />
                    <stop offset="100%" stopColor="#FF5812" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Vertical Center Lines */}
                {/* Trigger to Engine */}
                <line x1="50%" y1="30" x2="50%" y2="100" stroke="#FF5812" strokeWidth="2" strokeDasharray="6 6" opacity="0.8" className="animate-dash-flow" />
                <circle cx="50%" cy="65" r="3" fill="#FF5812" />

                {/* Engine to Features */}
                <line x1="50%" y1="200" x2="50%" y2="280" stroke="#FF5812" strokeWidth="2" strokeDasharray="6 6" opacity="0.8" className="animate-dash-flow" />
                <circle cx="50%" cy="240" r="3" fill="#FF5812" />

                {/* Features to Bottom */}
                <line x1="50%" y1="560" x2="50%" y2="660" stroke="#FF5812" strokeWidth="2" strokeDasharray="6 6" opacity="0.8" className="animate-dash-flow" />
                
                {/* Horizontal line spreading across bottom systems */}
                <line x1="15%" y1="660" x2="85%" y2="660" stroke="#FF5812" strokeWidth="1" strokeOpacity="0.3" />
                
                {/* Dropdowns to Bottom Systems */}
                {[15, 26.6, 38.3, 50, 61.6, 73.3, 85].map((x, i) => (
                  <line key={i} x1={`${x}%`} y1="660" x2={`${x}%`} y2="680" stroke="#FF5812" strokeWidth="1" strokeOpacity="0.3" />
                ))}
                
                {/* Center dot below features */}
                <circle cx="50%" cy="610" r="3" fill="#FF5812" />

                {/* SIDE WIDE CONNECTORS (From Trigger to Bottom) */}
                <path
                  d="M 40% 50 L 10% 50 A 20 20 0 0 0 8% 70 L 8% 680 A 20 20 0 0 0 10% 700 L 13% 700"
                  fill="none"
                  stroke="#FF5812"
                  strokeWidth="1.5"
                  strokeOpacity="0.3"
                />
                <circle cx="8%" cy="300" r="4" fill="#FF5812" className="animate-pulse" />
                <path
                  d="M 60% 50 L 90% 50 A 20 20 0 0 1 92% 70 L 92% 680 A 20 20 0 0 1 90% 700 L 87% 700"
                  fill="none"
                  stroke="#FF5812"
                  strokeWidth="1.5"
                  strokeOpacity="0.3"
                />
                <circle cx="92%" cy="300" r="4" fill="#FF5812" className="animate-pulse" />

                {/* Animated light pulses on the sides */}
                <motion.path
                  d="M 40% 50 L 10% 50 A 20 20 0 0 0 8% 70 L 8% 680"
                  fill="none"
                  stroke="url(#flow-gradient)"
                  strokeWidth="2"
                  strokeDasharray="200"
                  initial={{ strokeDashoffset: -200 }}
                  animate={{ strokeDashoffset: 1200 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                  d="M 60% 50 L 90% 50 A 20 20 0 0 1 92% 70 L 92% 680"
                  fill="none"
                  stroke="url(#flow-gradient)"
                  strokeWidth="2"
                  strokeDasharray="200"
                  initial={{ strokeDashoffset: -200 }}
                  animate={{ strokeDashoffset: 1200 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
                />
              </svg>
            )}

            {/* LAYER 1: TRIGGER */}
            <motion.div
              variants={fadeDownVariant}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative z-10 w-full max-w-lg mb-[60px]"
            >
              <div className="relative group bg-white/90 backdrop-blur-md border border-[#FF5812]/20 rounded-[28px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(255,88,18,0.1)] hover:border-[#FF5812]/40 transition-all duration-300 flex items-center gap-6 cursor-default">
                {/* Icon Wrapper */}
                <div className="relative flex-shrink-0 w-16 h-16 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#FF5812] opacity-0 group-hover:opacity-10 rounded-full blur-md transition-opacity duration-300" />
                  <motion.div animate={floatAnimation}>
                    <Rocket className="w-8 h-8 text-[#FF5812]" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Business Trigger</h3>
                  <p className="text-sm text-gray-500">Event or action initiates the workflow</p>
                </div>
              </div>
            </motion.div>

            {/* LAYER 2: AI DECISION ENGINE */}
            <motion.div
              variants={fadeUpVariant}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative z-10 w-full max-w-2xl mb-[60px]"
            >
              <div className="relative group bg-white/90 backdrop-blur-md border border-[#FF5812]/20 rounded-[28px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(255,88,18,0.15)] hover:border-[#FF5812]/40 transition-all duration-300 flex items-center gap-6 cursor-default overflow-hidden">
                
                {/* Circuit Graphics (Left) */}
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-48 h-full opacity-30 pointer-events-none flex flex-col justify-center gap-2">
                   <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FF5812] to-transparent translate-x-4" />
                   <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-[#FF5812] to-transparent -translate-x-2" />
                   <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FF5812] to-transparent translate-x-2" />
                </div>

                {/* Particles (Right) */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 pointer-events-none">
                   {[...Array(12)].map((_, i) => (
                     <motion.div
                       key={i}
                       animate={pulseAnimation}
                       style={{
                         animationDelay: `${i * 0.2}s`,
                         position: "absolute",
                         width: "3px",
                         height: "3px",
                         borderRadius: "50%",
                         backgroundColor: "#FF5812",
                         left: `${Math.random() * 100}%`,
                         top: `${Math.random() * 100}%`,
                         opacity: Math.random() * 0.5 + 0.2,
                       }}
                     />
                   ))}
                </div>

                {/* Icon Wrapper */}
                <div className="relative z-10 flex-shrink-0 w-20 h-20 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shadow-inner">
                  <div className="absolute inset-0 bg-[#FF5812] opacity-5 group-hover:opacity-15 rounded-full blur-md transition-opacity duration-300" />
                  <motion.div animate={floatAnimation}>
                    <BrainCircuit className="w-10 h-10 text-[#FF5812]" />
                  </motion.div>
                </div>
                <div className="relative z-10 pr-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">AI Decision Engine</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    AI models analyze data, understand context, apply business rules, and make intelligent decisions
                  </p>
                </div>
              </div>
            </motion.div>

            {/* LAYER 3: FEATURE BLOCKS */}
            <motion.div
              variants={fadeUpVariant}
              className="relative z-10 w-full max-w-6xl mb-[60px]"
            >
              <div className="bg-white/90 backdrop-blur-md border border-gray-200/60 rounded-[28px] p-6 lg:p-8 shadow-[0_10px_40px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)] transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-0 lg:divide-x divide-gray-100">
                  {FEATURE_BLOCKS.map((block, idx) => (
                    <motion.div
                      key={idx}
                      variants={staggerFadeVariant}
                      className="flex flex-col items-center text-center px-4 py-4 group"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-gray-100/50">
                        {block.icon}
                      </div>
                      <h4 className="text-base font-bold text-gray-900 mb-2">{block.title}</h4>
                      <p className="text-[13px] text-gray-500 leading-relaxed max-w-[200px]">
                        {block.subtitle}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* LAYER 4: BOTTOM SYSTEMS */}
            <motion.div
              variants={fadeUpVariant}
              className="relative z-10 w-full max-w-6xl"
            >
              <div className="bg-white/90 backdrop-blur-md border border-gray-200/60 rounded-[28px] py-8 px-6 lg:px-12 shadow-[0_10px_40px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)] transition-all duration-300">
                <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center gap-6 lg:gap-4">
                  {PLATFORMS.map((platform, idx) => (
                    <motion.div
                      key={idx}
                      variants={staggerFadeVariant}
                      whileHover={{ y: -4 }}
                      className="flex flex-col items-center min-w-[100px] group cursor-default"
                    >
                      <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-white group-hover:shadow-md border border-transparent group-hover:border-gray-100 transition-all duration-300 text-gray-700">
                        {platform.icon}
                      </div>
                      <span className={`text-sm font-semibold ${platform.color} group-hover:text-[#FF5812] transition-colors`}>
                        {platform.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
