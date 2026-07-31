"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Shield, Layers, Puzzle, Rocket } from "lucide-react";

/* =====================================================================
   ICONS (Approximations of Official Microsoft Logos)
   ===================================================================== */

const CopilotIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11 2H5C3.34315 2 2 3.34315 2 5V11C2 12.6569 3.34315 14 5 14H11C12.6569 14 14 12.6569 14 11V5C14 3.34315 12.6569 2 11 2Z" fill="url(#copilot-1)" />
    <path d="M19 10H13C11.3431 10 10 11.3431 10 13V19C10 20.6569 11.3431 22 13 22H19C20.6569 22 22 20.6569 22 19V13C22 11.3431 20.6569 10 19 10Z" fill="url(#copilot-2)" />
    <path d="M22 5C22 6.65685 20.6569 8 19 8C17.3431 8 16 6.65685 16 5C16 3.34315 17.3431 2 19 2C20.6569 2 22 3.34315 22 5Z" fill="url(#copilot-3)" />
    <defs>
      <linearGradient id="copilot-1" x1="2" y1="2" x2="14" y2="14" gradientUnits="userSpaceOnUse">
        <stop stopColor="#30C0E5" />
        <stop offset="1" stopColor="#1E65D0" />
      </linearGradient>
      <linearGradient id="copilot-2" x1="10" y1="10" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9254C8" />
        <stop offset="1" stopColor="#4A3CA5" />
      </linearGradient>
      <linearGradient id="copilot-3" x1="16" y1="2" x2="22" y2="8" gradientUnits="userSpaceOnUse">
        <stop stopColor="#55D1A4" />
        <stop offset="1" stopColor="#1E65D0" />
      </linearGradient>
    </defs>
  </svg>
);

const AzureAIIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M13.5 2.5L21.5 20.5H16.5L13.5 13.5H7.5L10.5 6.5L13.5 2.5Z" fill="#0078D4" />
    <path d="M10.5 6.5L2.5 20.5H7.5L13.5 13.5L10.5 6.5Z" fill="#50E6FF" opacity="0.8" />
  </svg>
);

const OpenAIIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20.25 10.3C20.45 9.4 20.45 8.5 20.15 7.6C19.75 6.2 18.75 5 17.35 4.5C16.85 4.3 16.35 4.2 15.85 4.2C15.05 4.2 14.35 4.4 13.65 4.8C12.85 3.3 11.35 2.3 9.65 2.3C7.65 2.3 5.85 3.6 5.15 5.5C4.95 6.1 4.85 6.7 4.85 7.4C3.85 7.9 3.05 8.8 2.65 9.9C2.25 11.2 2.35 12.6 3.05 13.8C3.35 14.3 3.65 14.7 4.05 15C3.85 15.9 3.85 16.8 4.15 17.7C4.55 19.1 5.55 20.3 6.95 20.8C7.45 21 7.95 21.1 8.45 21.1C9.25 21.1 9.95 20.9 10.65 20.5C11.45 22 12.95 23 14.65 23C16.65 23 18.45 21.7 19.15 19.8C19.35 19.2 19.45 18.6 19.45 17.9C20.45 17.4 21.25 16.5 21.65 15.4C22.05 14.1 21.95 12.7 21.25 11.5C20.95 11 20.65 10.6 20.25 10.3ZM16.35 19.1C15.55 19.5 14.65 19.6 13.75 19.4L13.85 19.2C13.85 19.2 16.55 14.6 16.65 14.4C16.75 14.2 16.65 13.9 16.45 13.8L11.85 11.1L11.75 12.2V17.9C10.75 18.1 9.65 17.9 8.85 17.3C8.15 16.8 7.65 16.1 7.45 15.2C7.25 14.4 7.35 13.5 7.75 12.8L12.35 4.8C12.35 4.8 12.45 4.7 12.55 4.7C13.35 4.3 14.25 4.2 15.15 4.4L15.05 4.6C15.05 4.6 12.35 9.2 12.25 9.4C12.15 9.6 12.25 9.9 12.45 10L17.05 12.7L17.15 11.6V5.9C18.15 5.7 19.25 5.9 20.05 6.5C20.75 7 21.25 7.7 21.45 8.6C21.65 9.4 21.55 10.3 21.15 11L16.55 19ZM5.65 16.6C5 15.9 4.7 14.9 4.9 14L5 13.8C5 13.8 9.6 11.1 9.8 11C10 10.9 10.3 11 10.4 11.2L13.1 15.8L12.1 16.4L7.1 19.3C6.3 18.6 5.8 17.7 5.6 16.6ZM8.65 4.8C9.45 4.4 10.35 4.3 11.25 4.5L11.15 4.7C11.15 4.7 8.45 9.3 8.35 9.5C8.25 9.7 8.35 10 8.55 10.1L13.15 12.8L13.25 11.7V6C14.25 5.8 15.35 6 16.15 6.6C16.85 7.1 17.35 7.8 17.55 8.7C17.75 9.5 17.65 10.4 17.25 11.1L12.65 19.1C12.65 19.1 12.55 19.2 12.45 19.2C11.65 19.6 10.75 19.7 9.85 19.5L9.95 19.3C9.95 19.3 12.65 14.7 12.75 14.5C12.85 14.3 12.75 14 12.55 13.9L7.95 11.2L7.85 12.3V18C6.85 17.8 5.75 17.6 4.95 17C4.25 16.5 3.75 15.8 3.55 14.9C3.35 14.1 3.45 13.2 3.85 12.5L8.45 4.5C8.55 4.6 8.55 4.7 8.65 4.8Z" fill="#10A37F" />
  </svg>
);

const AzureOpenAIIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L20 12L12 22L4 12L12 2Z" fill="url(#azure-openai-1)" />
    <path d="M12 7L16 12L12 17L8 12L12 7Z" fill="#10A37F" />
    <defs>
      <linearGradient id="azure-openai-1" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0078D4" />
        <stop offset="1" stopColor="#50E6FF" />
      </linearGradient>
    </defs>
  </svg>
);

const PowerAutomateIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2.5 3h10L10 12l-7.5-9z" fill="#094A9C"/>
    <path d="M12.5 3l7.5 9-7.5 9h-10l7.5-9-7.5-9h10z" fill="#3D8FEF"/>
    <path d="M10 12h10l-7.5 9h-10l7.5-9z" fill="#2878D7"/>
  </svg>
);

const PowerAppsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M3 12L12 3L21 12L12 21L3 12Z" fill="#742774" />
    <path d="M8 12L12 8L16 12L12 16L8 12Z" fill="#E6A0F1" opacity="0.9" />
  </svg>
);

const DataverseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M 16.5 7.5 A 6.5 6.5 0 0 0 7.5 16.5" stroke="#3F7A59" strokeWidth="7" strokeLinecap="round" />
    <path d="M 16.5 7.5 A 6.5 6.5 0 0 1 7.5 16.5" stroke="#59B77F" strokeWidth="7" strokeLinecap="round" />
    <circle cx="7.5" cy="16.5" r="3.5" fill="#3F7A59" />
    <circle cx="12" cy="12" r="4.5" fill="#A0F0B1" />
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

const MicrosoftGraphIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z" fill="#0078D4" />
    <path d="M12 5.5L17.63 8.75V15.25L12 18.5L6.37 15.25V8.75L12 5.5Z" fill="#50E6FF" opacity="0.6" />
    <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
    <line x1="12" y1="12" x2="20.66" y2="7" stroke="#FFFFFF" strokeWidth="1" />
    <line x1="12" y1="12" x2="3.34" y2="17" stroke="#FFFFFF" strokeWidth="1" />
    <line x1="12" y1="12" x2="12" y2="22" stroke="#FFFFFF" strokeWidth="1" />
  </svg>
);

const APIIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="3" y="6" width="18" height="12" rx="3" fill="#FF6B00" opacity="0.1" />
    <path d="M8 10L6 12L8 14" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 10L18 12L16 14" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 8L10 16" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* =====================================================================
   DATA
   ===================================================================== */

const TOP_ROW = [
  {
    id: "copilot-studio",
    num: "01",
    title: "Copilot Studio",
    desc: "Build, customize, and deploy enterprise AI Copilots with Microsoft Copilot Studio.",
    icon: CopilotIcon,
  },
  {
    id: "azure-ai",
    num: "02",
    title: "Azure AI",
    desc: "Access Azure AI services including Vision, Speech, Language, and AI Foundry capabilities.",
    icon: AzureAIIcon,
  },
  {
    id: "azure-openai",
    num: "03",
    title: "Azure OpenAI",
    desc: "Leverage enterprise-grade GPT models securely through Azure OpenAI Service.",
    icon: AzureOpenAIIcon,
  },
  {
    id: "openai",
    num: "04",
    title: "OpenAI",
    desc: "Power advanced reasoning, natural conversations, summarization, and intelligent assistance.",
    icon: OpenAIIcon,
  },
  {
    id: "power-automate",
    num: "05",
    title: "Power Automate",
    desc: "Automate business processes and orchestrate enterprise workflows across connected systems.",
    icon: PowerAutomateIcon,
  },
];

const BOTTOM_ROW = [
  {
    id: "power-apps",
    num: "06",
    title: "Power Apps",
    desc: "Build custom business applications that extend AI Copilot capabilities.",
    icon: PowerAppsIcon,
  },
  {
    id: "dataverse",
    num: "07",
    title: "Dataverse",
    desc: "Securely store enterprise business data and knowledge used by AI Copilots.",
    icon: DataverseIcon,
  },
  {
    id: "sharepoint",
    num: "08",
    title: "SharePoint",
    desc: "Provide enterprise documents, knowledge, and collaboration content to AI Copilots.",
    icon: SharePointIcon,
  },
  {
    id: "microsoft-graph",
    num: "09",
    title: "Microsoft Graph",
    desc: "Connect Microsoft 365 users, calendars, files, Teams, Outlook, and organizational data.",
    icon: MicrosoftGraphIcon,
  },
  {
    id: "apis",
    num: "10",
    title: "APIs",
    desc: "Integrate ERP, CRM, legacy applications, SaaS platforms, and third-party services.",
    icon: APIIcon,
  },
];

const FEATURES = [
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "Built with Zero Trust security, Microsoft identity protection, compliance, governance, and enterprise-grade data privacy.",
  },
  {
    icon: Layers,
    title: "Scalable & Flexible",
    desc: "Designed to scale from departmental copilots to enterprise-wide AI assistant deployments.",
  },
  {
    icon: Puzzle,
    title: "Seamless Integration",
    desc: "Works across Microsoft 365, Dynamics 365, SharePoint, Dataverse, Azure, ERP, CRM, and third-party APIs.",
  },
  {
    icon: Rocket,
    title: "Future Ready",
    desc: "Continuously evolving using Microsoft's AI ecosystem, Azure AI innovations, and the latest OpenAI models.",
  },
];

/* =====================================================================
   COMPONENTS
   ===================================================================== */

const HexagonIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-slate-50 drop-shadow-sm">
      <path
        d="M50 3 L93 25 L93 75 L50 97 L7 75 L7 25 Z"
        fill="currentColor"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
    </svg>
    <div className="relative z-10 w-8 h-8">
      {children}
    </div>
  </div>
);

const TechCard = ({ item }: { item: any }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative z-20 flex flex-col items-center group transition-all duration-300 w-full h-full"
    >
      {/* Blurred Glow */}
      <div className="absolute -inset-[3px] rounded-[26px] overflow-hidden pointer-events-none z-0 blur-lg opacity-40">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#FF6B00_360deg)]"
        />
      </div>
      {/* Sharp Border */}
      <div className="absolute -inset-[2px] rounded-[26px] overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#FF6B00_360deg)]"
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center p-6 bg-white rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 transition-all duration-300 group-hover:shadow-[0_20px_40px_-10px_rgba(255,107,0,0.15)] group-hover:border-transparent">
        <HexagonIcon>
          <item.icon className="w-full h-full transition-transform duration-500 group-hover:scale-110" />
        </HexagonIcon>
        <span className="text-[#FF6B00] font-bold text-xs mb-2">{item.num}</span>
        <h3 className="text-[17px] font-bold text-[#111827] text-center mb-3">
          {item.title}
        </h3>
        <p className="text-sm text-center text-[#6B7280] leading-relaxed">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
};

export default function CopilotTechnologyStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Animated line drawing based on scroll
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const pathLength = useTransform(smoothProgress, [0, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full py-24 overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">


      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-6 mb-6">
            <style>{`
              @keyframes line-stretch-tech {
                0%, 100% { width: 40px; opacity: 0.6; }
                50% { width: 100px; opacity: 1; }
              }
              .animate-line-stretch-tech {
                animation: line-stretch-tech 3s ease-in-out infinite;
              }
            `}</style>
            <div className="animate-line-stretch-tech flex items-center relative h-[1.5px] bg-[#FF5812]">
              <div className="absolute left-0 w-2 h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
            </div>
            <span className="text-[#FF5812] font-bold tracking-[0.2em] text-sm uppercase">BUILT ON MICROSOFT TECHNOLOGIES. POWERED BY AI.</span>
            <div className="animate-line-stretch-tech flex items-center relative h-[1.5px] bg-[#FF5812]">
              <div className="absolute right-0 w-2 h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#111827]">
            AI Copilot{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF8C33] bg-clip-text text-transparent">
              Technology Stack
            </span>
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-base md:text-xl text-[#6B7280] leading-relaxed">
            A modern, secure, and enterprise-ready technology stack that powers intelligent AI Copilots, enterprise knowledge retrieval, workflow automation, and seamless business integrations.
          </p>
        </motion.div>

        {/* Desktop Layout - 5x2 Grid with SVG Connectors */}
        <div className="hidden lg:block relative w-full mb-24">
          {/* Background SVG Connectors */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#FF6B00" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.3" />
                </linearGradient>
                <style>
                  {`
                    @keyframes dash {
                      to { stroke-dashoffset: -20; }
                    }
                    .animated-dash {
                      stroke-dasharray: 6, 6;
                      animation: dash 1s linear infinite;
                    }
                  `}
                </style>
              </defs>

              {/* The primary looping path from Card 1 to Card 10 */}
              <motion.path
                d="M 10% 25% L 90% 25% C 100% 25% 100% 75% 90% 75% L 10% 75%"
                fill="none"
                stroke="url(#line-gradient)"
                strokeWidth="2"
                className="animated-dash"
                style={{ pathLength }}
              />

              {/* Connection points for Top Row */}
              {[10, 30, 50, 70, 90].map((x, i) => (
                <g key={`top-${i}`}>
                  <circle cx={`${x}%`} cy="25%" r="12" fill="white" stroke="#FF6B00" strokeWidth="1.5" />
                  <circle cx={`${x}%`} cy="25%" r="4" fill="#FF6B00" />
                  <circle cx={`${x}%`} cy="25%" r="12" fill="none" stroke="#FF6B00" strokeWidth="1" className="animate-ping opacity-20" />
                </g>
              ))}

              {/* Connection points for Bottom Row */}
              {[10, 30, 50, 70, 90].map((x, i) => (
                <g key={`bottom-${i}`}>
                  <circle cx={`${x}%`} cy="75%" r="12" fill="white" stroke="#FF6B00" strokeWidth="1.5" />
                  <circle cx={`${x}%`} cy="75%" r="4" fill="#FF6B00" />
                  <circle cx={`${x}%`} cy="75%" r="12" fill="none" stroke="#FF6B00" strokeWidth="1" className="animate-ping opacity-20" />
                </g>
              ))}
            </svg>
          </div>

          <div className="grid grid-cols-5 gap-6 gap-y-24 relative z-10">
            {TOP_ROW.map((item) => (
              <TechCard key={item.id} item={item} />
            ))}
            {BOTTOM_ROW.map((item) => (
              <TechCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Mobile / Tablet Layout */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 relative">
          {/* Vertical line for mobile */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-orange-200 border-l border-dashed border-orange-400 hidden md:block" />
          
          {[...TOP_ROW, ...BOTTOM_ROW].map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TechCard item={item} />
            </motion.div>
          ))}
        </div>

        {/* Bottom Feature Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full bg-[#111827] rounded-[32px] p-8 md:p-12 shadow-[0_20px_50px_-12px_rgba(17,24,39,0.5)] relative overflow-hidden"
        >
          {/* Glow effects inside banner */}
          <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row lg:flex-col gap-4 group">
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-slate-700 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-[#FF6B00] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">{feature.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
