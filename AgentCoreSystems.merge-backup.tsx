"use client";

import React from "react";
import {
  Bot, Network, Database, ChevronRight, Zap, Plug, Shield, Target,
  Cpu, GitFork, Key, ShieldCheck
} from "lucide-react";
import { FaReact, FaNodeJs, FaPython, FaAws } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiLanggraph,
  SiModelcontextprotocol,
  SiAnthropic
} from "react-icons/si";

// ==========================================
// OFFICIAL BRAND & ARCHITECTURE LOGOS
// ==========================================

// Official Amazon Bedrock AWS Architecture SVG
const BedrockOfficialLogo = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none">
    <rect width="80" height="80" rx="16" fill="#01A88D" fillOpacity="0.15" />
    <g transform="translate(12, 12)" fill="#01A88D">
      <path d="M52,26.9998918 C50.897,26.9998918 50,26.1028918 50,24.9998918 C50,23.8968918 50.897,22.9998918 52,22.9998918 C53.103,22.9998918 54,23.8968918 54,24.9998918 C54,26.1028918 53.103,26.9998918 52,26.9998918 Z M20.113,53.9078918 L16.865,52.0138918 L23.53,47.8478918 L22.47,46.1518918 L14.913,50.8748918 L9,47.4258918 L9,38.5348918 L14.555,34.8318918 L13.445,33.1678918 L7.959,36.8248918 L2,33.4198918 L2,28.5798918 L8.496,24.8678918 L7.504,23.1318918 L2,26.2768918 L2,22.5798918 L8,19.1518918 L14,22.5798918 L14,26.4338918 L9.485,29.1428918 L10.515,30.8568918 L15,28.1658918 L19.485,30.8568918 L20.515,29.1428918 L16,26.4338918 L16,22.5348918 L21.555,18.8318918 C21.833,18.6458918 22,18.3338918 22,17.9998918 L22,10.9998918 L20,10.9998918 L20,17.4648918 L14.959,20.8248918 L9,17.4198918 L9,8.57389181 L14,5.65789181 L14,13.9998918 L16,13.9998918 L16,4.49089181 L20.113,2.09189181 L28,4.72089181 L28,33.4338918 L13.485,42.1428918 L14.515,43.8568918 L28,35.7658918 L28,51.2788918 L20.113,53.9078918 Z M50,37.9998918 C50,39.1028918 49.103,39.9998918 48,39.9998918 C46.897,39.9998918 46,39.1028918 46,37.9998918 C46,36.8968918 46.897,35.9998918 48,35.9998918 C49.103,35.9998918 50,36.8968918 50,37.9998918 Z M40,47.9998918 C40,49.1028918 39.103,49.9998918 38,49.9998918 C36.897,49.9998918 36,49.1028918 36,47.9998918 C36,46.8968918 36.897,45.9998918 38,45.9998918 C39.103,45.9998918 40,46.8968918 40,47.9998918 Z M39,7.99989181 C39,6.89689181 39.897,5.99989181 41,5.99989181 C42.103,5.99989181 43,6.89689181 43,7.99989181 C43,9.10289181 42.103,9.99989181 41,9.99989181 C39.897,9.99989181 39,9.10289181 39,7.99989181 Z" />
    </g>
  </svg>
);

// AWS CloudWatch Telemetry Icon
const CloudWatchTelemetryIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect width="24" height="24" rx="4" fill="#FF4F8B" fillOpacity="0.14" stroke="#FF4F8B" strokeWidth="0.8" />
    <path d="M4 14L8 14L10.5 7L13.5 17L16 11.5L18 14L20 14" stroke="#E11D48" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// AWS IAM Key Badge Icon
const AwsIamKeyIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect width="24" height="24" rx="4" fill="#DD344C" fillOpacity="0.14" stroke="#DD344C" strokeWidth="0.8" />
    <circle cx="9.5" cy="12" r="3.5" stroke="#DD344C" strokeWidth="1.6" />
    <path d="M13 12H19.5V15H17.5V17H15.5V14L13 12Z" fill="#DD344C" />
  </svg>
);

// AWS VPC Network Shield Icon
const AwsVpcNetworkIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect width="24" height="24" rx="4" fill="#8C4FFF" fillOpacity="0.14" stroke="#8C4FFF" strokeWidth="0.8" />
    <path d="M12 4L4 8V13C4 17.5 7.4 20.5 12 21.5C16.6 20.5 20 17.5 20 13V8L12 4Z" stroke="#8C4FFF" strokeWidth="1.5" />
    <path d="M9 12H15M12 9V15" stroke="#8C4FFF" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// ==========================================
// 3D ISOMETRIC STACK PEDESTAL LOGO
// ==========================================
const IsometricBlocksLogo = () => (
  <div className="relative w-36 h-36 sm:w-44 sm:h-44 xl:w-40 xl:h-40 2xl:w-48 2xl:h-48 mx-auto flex items-center justify-center">
    <style>{`
      @keyframes floatTop {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-7px); }
      }
      @keyframes floatMiddle {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-3.5px); }
      }
      @keyframes pedestalGlow {
        0%, 100% { opacity: 0.45; stroke-width: 1.5px; }
        50% { opacity: 0.85; stroke-width: 2.2px; }
      }
      .animate-float-top {
        animation: floatTop 3s ease-in-out infinite;
      }
      .animate-float-middle {
        animation: floatMiddle 3.5s ease-in-out infinite;
      }
      .animate-pedestal-glow {
        animation: pedestalGlow 2.5s ease-in-out infinite;
      }
    `}</style>
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_24px_rgba(255,88,18,0.35)]">
      {/* Base pedestal circular light wave */}
      <ellipse cx="60" cy="102" rx="48" ry="14" fill="none" stroke="#FF5812" className="animate-pedestal-glow" strokeDasharray="3 3" />
      <ellipse cx="60" cy="102" rx="38" ry="10" fill="rgba(255,88,18,0.06)" stroke="#FF5812" strokeWidth="2" />
      <ellipse cx="60" cy="102" rx="26" ry="7" fill="none" stroke="#FF5812" strokeWidth="1" opacity="0.5" />
      <line x1="60" y1="102" x2="60" y2="92" stroke="#FF5812" strokeWidth="1" />

      {/* Layer 1 bottom cubes */}
      <g>
        <path d="M42 90 L24 81 L42 72 L60 81 Z" fill="#1e293b" stroke="#FF5812" strokeWidth="1" />
        <path d="M24 81 L24 90 L42 99 L42 90 Z" fill="#0f172a" stroke="#FF5812" strokeWidth="1" />
        <path d="M42 90 L42 99 L60 90 L60 81 Z" fill="#020617" stroke="#FF5812" strokeWidth="1" />

        <path d="M78 90 L60 81 L78 72 L96 81 Z" fill="#1e293b" stroke="#FF5812" strokeWidth="1" />
        <path d="M60 81 L60 90 L78 99 L78 90 Z" fill="#0f172a" stroke="#FF5812" strokeWidth="1" />
        <path d="M78 90 L78 99 L96 90 L96 81 Z" fill="#020617" stroke="#FF5812" strokeWidth="1" />
      </g>

      {/* Layer 2 middle cube */}
      <g className="animate-float-middle">
        <path d="M60 76 L42 67 L60 58 L78 67 Z" fill="#1e293b" stroke="#FF5812" strokeWidth="1" />
        <path d="M42 67 L42 76 L60 85 L60 76 Z" fill="#0f172a" stroke="#FF5812" strokeWidth="1" />
        <path d="M60 76 L60 85 L78 76 L78 67 Z" fill="#020617" stroke="#FF5812" strokeWidth="1" />
      </g>

      {/* Layer 3 top cube */}
      <g className="animate-float-top">
        <path d="M60 55 L42 46 L60 37 L78 46 Z" fill="#FF6B2C" stroke="#FF6B2C" strokeWidth="1.2" />
        <path d="M42 46 L42 55 L60 64 L60 55 Z" fill="#E55416" stroke="#FF6B2C" strokeWidth="1.2" />
        <path d="M60 55 L60 64 L78 55 L78 46 Z" fill="#C4400A" stroke="#FF6B2C" strokeWidth="1.2" />
      </g>
    </svg>
  </div>
);

function AwsIcon({ className = "w-[22px] h-[15px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4.2 4.2h1.6l2 7.2H6.3l-.4-1.6H3.7l-.4 1.6H1.8l2.4-7.2zm1.4 4.4L4.9 5.8 4.2 8.6h1.4z" fill="#232F3E" />
      <path d="M8.2 4.2h1.5l1 4.5 1.1-4.5h1.3l1.1 4.5 1-4.5h1.5l-1.7 7.2h-1.5l-1.1-4.4-1.1 4.4H9.9L8.2 4.2z" fill="#232F3E" />
      <path d="M19.8 6.4c-.4-.4-1-.7-1.7-.7-.8 0-1.3.4-1.3.9 0 .5.4.8 1.2 1 1.4.4 2.2 1 2.2 2.2 0 1.2-1 2-2.4 2-1 0-1.8-.4-2.4-1l.9-1.1c.4.4.9.7 1.5.7.7 0 1.1-.3 1.1-.8 0-.5-.4-.8-1.2-1-1.4-.4-2.2-1-2.2-2.1 0-1.2 1-2 2.4-2 .8 0 1.6.3 2.1.8l-.8 1.1z" fill="#232F3E" />
      <path d="M21 13.2c-4.2 2.2-10 2.2-14.5-.2-.3-.2-.5-.1-.6.2-.1.3.1.6.3.7 4.9 2.5 11.2 2.5 15.7 0 .3-.2.3-.5.1-.7-.2-.2-.6-.2-.9 0z" fill="#FF9900" />
      <path d="M22.5 12l-2.6 2.1c-.2.2-.6.1-.7-.2-.1-.2 0-.5.2-.7l1.7-1.3-2.1-.4c-.3-.1-.5-.4-.4-.7.1-.3.4-.5.7-.4l3.1.6c.3.1.4.4.3.7z" fill="#FF9900" />
    </svg>
  );
}

function PythonIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 110" className={className}>
      <path fill="#3776ab" d="M54.1 11.3c-21.6 0-20.6 9.4-20.6 9.4l.1 9.7h21v3h-29S9 32.7 9 54c0 21.3 12.3 20.6 12.3 20.6l9.6.1v-14s-1-10.8 10.3-10.8h21.4s9.8-1 9.8-10.5V19.8s1.6-8.5-18.3-8.5zm-8.8 6.6c1.8 0 3.3 1.5 3.3 3.3s-1.5 3.3-3.3 3.3-3.3-1.5-3.3-3.3 1.5-3.3 3.3-3.3z" />
      <path fill="#ffd343" d="M54.9 98c21.6 0 20.6-9.4 20.6-9.4l-.1-9.7h-21v-3h29s16.5.7 16.5-20.6c0-21.3-12.3-20.6-12.3-20.6l-9.6-.1v14s1 10.8-10.3 10.8H46.3s-9.8 1-9.8 10.5V89s-1.6 8.5 18.4 8.5zm8.8-6.6c-1.8 0-3.3-1.5-3.3-3.3s1.5-3.3 3.3-3.3 3.3 1.5 3.3 3.3-1.5 3.3-3.3 3.3z" />
    </svg>
  );
}

function NodeJsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 114.71 128" className={className}>
      <path fill="#68a063" d="M57.48,0,0,32V96l57.48,32L114.71,96V32ZM93,80.12a2.38,2.38,0,0,1-1.12,2L58.55,101.4a2.21,2.21,0,0,1-2.22,0L22.84,82.11a2.33,2.33,0,0,1-1.11-2V41.6a2.36,2.36,0,0,1,1.11-2L56.33,20.31a2.21,2.21,0,0,1,2.22,0L91.87,39.6a2.34,2.34,0,0,1,1.12,2Z" />
      <path fill="#333333" d="M80,72.93l-22.18,13a1.45,1.45,0,0,1-1.5,0L34,72.93a1.45,1.45,0,0,1-.75-1.28V46a1.48,1.48,0,0,1,.75-1.29l22.18-13a1.44,1.44,0,0,1,1.5,0l22.18,13A1.48,1.48,0,0,1,80.64,46V71.65A1.45,1.45,0,0,1,80,72.93ZM38.41,70l18.59,10.87,18.59-10.87V48l-18.59-10.88L38.41,48Z" />
    </svg>
  );
}

function FastApiIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="50" fill="#009688" />
      <path fill="#fff" d="M53 20 L30 55 H50 L47 80 L70 45 H50 Z" />
    </svg>
  );
}

function AwsLambdaIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" className={className}>
      <rect width="256" height="256" fill="#F90" rx="16" />
      <path fill="#FFF" d="M149.6 195.9l-33.8-77.9L80 167.3H63.6l45.4-66.2-22.1-49h19.5l26.2 59.9 29.8-59.9H183l-45.7 87.2 19 46.6h-6.7zm-22.3-51.1h-4.5l-2.1-4.8h6.6v4.8z" />
    </svg>
  );
}

export default function AgentCoreSystems() {
  const stacksData = [
    {
      category: "STACK 01",
      name: "AI AGENTS & MODELS",
      items: [
        { line1: "Amazon", line2: "Bedrock", logo: <BedrockOfficialLogo className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 transition-transform group-hover:scale-110" /> },
        { line1: "Bedrock", line2: "AgentCore", logo: <Cpu className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#FF5812] transition-transform group-hover:scale-110" /> },
        { line1: "Foundation", line2: "Models", logo: <SiAnthropic className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#CC785C] transition-transform group-hover:scale-110" /> },
        { line1: "Strands", line2: "Agents", logo: <GitFork className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-sky-600 transition-transform group-hover:scale-110" /> },
        { line1: "LangGraph", line2: "", logo: <SiLanggraph className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#FF5812] transition-transform group-hover:scale-110" /> },
        { line1: "MCP", line2: "", logo: <SiModelcontextprotocol className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#D97706] transition-transform group-hover:scale-110" /> },
        { name: "Amazon Bedrock", logo: <AwsIcon className="w-[28px] h-[18px] shrink-0 transition-transform group-hover:scale-110" /> },
        { name: "Bedrock AgentCore", logo: <Cpu className="w-5 h-5 shrink-0 text-orange-500 transition-transform group-hover:scale-110" /> },
        { name: "Foundation Models", logo: <Bot className="w-5 h-5 shrink-0 text-purple-500 transition-transform group-hover:scale-110" /> },
        { name: "Strands Agents", logo: <Network className="w-5 h-5 shrink-0 text-blue-500 transition-transform group-hover:scale-110" /> },
        { name: "LangGraph", logo: <Network className="w-5 h-5 shrink-0 text-emerald-500 transition-transform group-hover:scale-110" /> },
      ]
    },
    {
      category: "STACK 02",
      name: "AGENTCORE SERVICES",
      items: [
        { line1: "AgentCore", line2: "Runtime", logo: <Zap className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-amber-500 transition-transform group-hover:scale-110" /> },
        { line1: "AgentCore", line2: "Memory", logo: <Database className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-blue-600 transition-transform group-hover:scale-110" /> },
        { line1: "AgentCore", line2: "Gateway", logo: <Plug className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-teal-600 transition-transform group-hover:scale-110" /> },
        { line1: "AgentCore", line2: "Identity", logo: <Shield className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-indigo-600 transition-transform group-hover:scale-110" /> },
        { line1: "AgentCore", line2: "Evaluations", logo: <Target className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-rose-600 transition-transform group-hover:scale-110" /> },
        { name: "AgentCore Runtime", logo: <Zap className="w-5 h-5 shrink-0 text-amber-500 transition-transform group-hover:scale-110" /> },
        { name: "AgentCore Memory", logo: <Database className="w-5 h-5 shrink-0 text-cyan-500 transition-transform group-hover:scale-110" /> },
        { name: "AgentCore Gateway", logo: <Plug className="w-5 h-5 shrink-0 text-indigo-500 transition-transform group-hover:scale-110" /> },
        { name: "AgentCore Identity", logo: <Shield className="w-5 h-5 shrink-0 text-rose-500 transition-transform group-hover:scale-110" /> },
        { name: "AgentCore Evaluations", logo: <Target className="w-5 h-5 shrink-0 text-red-500 transition-transform group-hover:scale-110" /> },
      ]
    },
    {
      category: "STACK 03",
      name: "FULL-STACK & BACKEND",
      items: [
        { line1: "Python", line2: "", logo: <FaPython className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#3776AB] transition-transform group-hover:scale-110" /> },
        { line1: "Node.js", line2: "", logo: <FaNodeJs className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#539E43] transition-transform group-hover:scale-110" /> },
        { line1: "TypeScript", line2: "", logo: <SiTypescript className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#3178C6] transition-transform group-hover:scale-110" /> },
        { line1: "React", line2: "", logo: <FaReact className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#61DAFB] transition-transform group-hover:scale-110" /> },
        { line1: "Next.js", line2: "", logo: <SiNextdotjs className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-slate-900 transition-transform group-hover:scale-110" /> },
        { line1: "Tailwind", line2: "CSS", logo: <SiTailwindcss className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#06B6D4] transition-transform group-hover:scale-110" /> },
        { name: "Python", logo: <PythonIcon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" /> },
        { name: "Node.js", logo: <NodeJsIcon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" /> },
        { name: "FastAPI", logo: <FastApiIcon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" /> },
        { name: "REST APIs", logo: <Plug className="w-5 h-5 shrink-0 text-blue-600 transition-transform group-hover:scale-110" /> },
        { name: "AWS Lambda", logo: <AwsLambdaIcon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" /> },
        { name: "MCP", logo: <Network className="w-5 h-5 shrink-0 text-teal-500 transition-transform group-hover:scale-110" /> },
      ]
    },
    {
      category: "STACK 04",
      name: "CLOUD & SECURITY",
      items: [
        { line1: "AWS", line2: "", logo: <FaAws className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-[#FF9900] transition-transform group-hover:scale-110" /> },
        { line1: "Amazon", line2: "CloudWatch", logo: <CloudWatchTelemetryIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 transition-transform group-hover:scale-110" /> },
        { line1: "IAM", line2: "", logo: <AwsIamKeyIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 transition-transform group-hover:scale-110" /> },
        { line1: "VPC", line2: "", logo: <AwsVpcNetworkIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 transition-transform group-hover:scale-110" /> },
        { line1: "API", line2: "Security", logo: <ShieldCheck className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-emerald-600 transition-transform group-hover:scale-110" /> },
        { line1: "Secure", line2: "Agent Access", logo: <Key className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 text-orange-500 transition-transform group-hover:scale-110" /> },
        { name: "AWS", logo: <AwsIcon className="w-[28px] h-[18px] shrink-0 transition-transform group-hover:scale-110" /> },
        { name: "Amazon CloudWatch", logo: <Activity className="w-5 h-5 shrink-0 text-pink-500 transition-transform group-hover:scale-110" /> },

        { name: "VPC", logo: <Network className="w-5 h-5 shrink-0 text-purple-500 transition-transform group-hover:scale-110" /> },
        { name: "API Security", logo: <Shield className="w-5 h-5 shrink-0 text-orange-500 transition-transform group-hover:scale-110" /> },
        { name: "Secure Agent Access", logo: <Shield className="w-5 h-5 shrink-0 text-emerald-500 transition-transform group-hover:scale-110" /> },
      ]
    }
  ];

  const rightCapabilities = [
    {
      title: "CAPABILITY 01",
      subtitle: "01 — AI AGENT DEVELOPMENT",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF5812]" strokeWidth={2} />,
      subtitle: "AI Agent Development",
      borderClass: "border-[#FF6B2C]/30",
      textClass: "text-[#FF6B2C]",
      glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]",
      hoverBorder: "group-hover:border-[#FF6B2C]/60",
      icon: <Bot className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-[#FF6B2C]" strokeWidth={2} />,
      desc: "Build, deploy, and scale AI agents with AgentCore Runtime, flexible frameworks, models, tools, and secure execution environments."
    },
    {
      title: "CAPABILITY 02",
      subtitle: "02 — AGENTCORE INTEGRATIONS",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Network className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF5812]" strokeWidth={2} />,
      subtitle: "AgentCore Integrations",
      borderClass: "border-[#FF6B2C]/30",
      textClass: "text-[#FF6B2C]",
      glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]",
      hoverBorder: "group-hover:border-[#FF6B2C]/60",
      icon: <Network className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-[#FF6B2C]" strokeWidth={2} />,
      desc: "Connect AI agents with APIs, Lambda functions, MCP servers, applications, and business systems through AgentCore Gateway."
    },
    {
      title: "CAPABILITY 03",
      subtitle: "03 — AGENT MEMORY & CONTEXT",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Database className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF5812]" strokeWidth={2} />,
      subtitle: "Agent Memory & Context",
      borderClass: "border-[#FF6B2C]/30",
      textClass: "text-[#FF6B2C]",
      glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]",
      hoverBorder: "group-hover:border-[#FF6B2C]/60",
      icon: <Database className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-[#FF6B2C]" strokeWidth={2} />,
      desc: "Build agents that maintain relevant context across interactions using AgentCore Memory for short-term and long-term memory capabilities."
    }
  ];

  const workflowSteps = [
    "USER", "AGENT", "AGENTCORE", "TOOLS", "BUSINESS SYSTEM", "ACTION"
  ];

  return (
    <section className="w-full max-w-[1600px] mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mt-2 sm:mt-4 md:mt-6 mb-0 z-10 relative flex flex-col gap-6 sm:gap-8">

      {/* Section Heading */}
      <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-500/20 typo-caption text-[#FF5812] uppercase mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF5812] animate-pulse" />
          HOW WE BUILD IT · TECHNOLOGY STACK
        </div>
        <h2 className="typo-heading-2 text-slate-900 mb-2 sm:mb-4">
          Amazon Bedrock AgentCore <span className="text-orange-600">Technology Stack for AI Agent Development</span>
        </h2>
        <p className="typo-description text-slate-600 max-w-2xl mx-auto mb-2">
          Enable enterprise AI agents with Amazon Bedrock AgentCore, connecting intelligent agents with models, tools, memory, applications, and business workflows.
        </p>
      </div>

      {/* Outer Dashboard Card */}
      <div className="relative overflow-hidden rounded-[20px] lg:rounded-[24px] border border-slate-200 bg-white p-3.5 sm:p-5 md:p-6 lg:p-6 xl:p-7 2xl:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] h-auto min-h-fit flex flex-col justify-between text-slate-900 w-full gap-5 sm:gap-6">

        {/* Mirror-morphism reflection glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(255,88,18,0.03),transparent_40%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(255,88,18,0.04),transparent_45%)] pointer-events-none" />

        {/* Main Grid: Left Column + Architecture Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-4 xl:gap-5 2xl:gap-6 items-stretch w-full relative z-10">

          {/* Left Column: Heading, Isometric Stack Card */}
          <div className="lg:col-span-4 xl:col-span-3 flex">
            <div className="relative overflow-hidden rounded-[18px] border border-orange-500/30 bg-slate-50/70 p-4 sm:p-5 xl:p-5 2xl:p-6 shadow-[0_0_25px_rgba(255,88,18,0.05)] flex flex-col justify-between items-stretch w-full h-full min-h-[240px] sm:min-h-[280px] z-10">
              <div className="space-y-1 text-left">
                <span className="typo-caption text-orange-600 uppercase block mb-1">
                  AGENTCORE AI ECOSYSTEM
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[28px] xl:text-3xl font-extrabold tracking-tight leading-tight text-slate-900 uppercase mb-1">
                  AGENTCORE AI STACK
                </h2>
                <span className="typo-caption-meta text-slate-600 font-semibold uppercase block">
                  AGENTCORE · AWS · AI AGENTS
                </span>
              </div>

              {/* 3D Stack pedestal illustration with smooth floating animation */}
              <div className="py-2 sm:py-3 flex items-center justify-center">
                <IsometricBlocksLogo />
              </div>
            </div>
          </div>

          {/* Center-Right Columns holding the 4 layers stack, branch lines, and the glowing core next to 3 capabilities */}
          <div className="lg:col-span-9 grid grid-cols-1 lg:grid-cols-12 gap-6 relative">

            {/* Unified SVG Branching Connection Overlay */}
            <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0">
              <svg className="w-full h-full" viewBox="0 0 900 420" fill="none" preserveAspectRatio="none">
                {/* Left Branches (4 Layers -> Central Core) - Advanced Dual-Layer Neon Glowing Lines */}

                {/* Layer 01 */}
                <path d="M 525 42 L 540 42 L 550 210" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 525 42 L 540 42 L 550 210" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Layer 02 */}
                <path d="M 525 153 L 540 153 L 550 210" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 525 153 L 540 153 L 550 210" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Layer 03 */}
                <path d="M 525 264 L 540 264 L 550 210" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 525 264 L 540 264 L 550 210" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Layer 04 */}
                <path d="M 525 375 L 540 375 L 550 210" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 525 375 L 540 375 L 550 210" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Right Branches (Central Core -> 3 Capabilities) */}
                {/* Card 01 */}
                <path d="M 650 210 L 665 53 L 675 53" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 650 210 L 665 53 L 675 53" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Card 02 */}
                <path d="M 650 210 L 675 210" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 650 210 L 675 210" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Card 03 */}
                <path d="M 650 210 L 665 368 L 675 368" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 650 210 L 665 368 L 675 368" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Left Flowing Dot Animations (Thicker data packages) */}
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 525 42 L 540 42 L 550 210" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path="M 525 153 L 540 153 L 550 210" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.1s" repeatCount="indefinite" path="M 525 264 L 540 264 L 550 210" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.6s" repeatCount="indefinite" path="M 525 375 L 540 375 L 550 210" />
                </circle>

                {/* Right Flowing Dot Animations (Thicker data packages) */}
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 650 210 L 665 53 L 675 53" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path="M 650 210 L 675 210" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 650 210 L 665 368 L 675 368" />
                </circle>
              </svg>
            </div>

            {/* Col A (4 Layers stack) - lg:col-span-7 */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-3 lg:gap-3 xl:gap-4 py-1 h-auto min-h-[420px] relative z-10">

              {stacksData.map((stack, sIdx) => (
                <div key={sIdx} className="relative p-3 rounded-[14px] lg:rounded-[12px] border border-orange-500/25 bg-white shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-2 min-h-[85px] min-w-0">
                  <div className="w-full sm:w-[120px] lg:w-[110px] xl:w-[130px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1.5 sm:pb-0 border-b sm:border-b-0 border-orange-500/15 pl-0.5">
                    <div>
                      <span className="text-[8px] font-bold tracking-[0.15em] text-orange-600 block uppercase mb-0.5">{stack.category}</span>
                      <span className="text-[9px] font-bold text-slate-900 block uppercase leading-tight">{stack.name}</span>
                    </div>
                  </div>
                  <div className="hidden sm:block w-[1px] h-9 bg-orange-500/25 self-center shrink-0" />
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-1.5 xl:gap-2 pl-0 sm:pl-2 flex-1 items-start justify-center sm:justify-start w-full min-w-0">
                    {stack.items.map((cap, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-start text-center gap-1 sm:gap-1.5 group cursor-pointer bg-slate-50/70 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-none transition-all duration-200 hover:bg-orange-50/50 sm:hover:bg-transparent flex-1 min-w-[50px] max-w-[70px] lg:max-w-[65px] xl:max-w-[75px]">
                        <div className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-[6deg] shrink-0 h-5 sm:h-6 flex items-center justify-center">
                          {cap.logo}
                        </div>
                        <span className="text-[8.5px] sm:text-[8px] lg:text-[7.5px] xl:text-[8.5px] font-bold text-slate-700 group-hover:text-orange-600 transition-colors duration-200 leading-[1.15] px-0.5 break-normal">{cap.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            </div>

            {/* Col B (Central Glowing Core) */}
            <div className="lg:col-span-2 flex items-center justify-center relative z-10 py-6 lg:py-0">
              <div className="relative flex items-center justify-center w-[150px] h-[150px] sm:w-[180px] sm:h-[180px]">
                {/* Concentric rotating neon circles */}
                <div className="absolute inset-0 rounded-full border border-orange-500/30 animate-[spin_20s_linear_infinite] shadow-[0_0_40px_rgba(255,107,44,0.05)]" />
                <div className="absolute inset-2 sm:inset-3 rounded-full border border-orange-500/20 animate-[spin_12s_linear_infinite_reverse]" />

                <svg className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" stroke="rgba(255,107,44,0.12)" strokeWidth="1" fill="none" strokeDasharray="1 3" />
                  <circle cx="50" cy="50" r="42" stroke="rgba(255,107,44,0.22)" strokeWidth="1" fill="none" strokeDasharray="4 8" />
                </svg>

                {/* Core content */}
                <div className="absolute inset-4 sm:inset-5 rounded-full bg-white border-2 border-orange-400/50 shadow-[inset_0_0_20px_rgba(255,107,44,0.05),0_0_30px_rgba(255,107,44,0.15)] flex flex-col items-center justify-center gap-0.5 sm:gap-1 z-10">
                  <Bot className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 transition-transform duration-500 hover:scale-110 hover:rotate-[360deg] cursor-pointer text-orange-600" />
                  <span className="typo-caption text-slate-900 uppercase select-none text-center mt-0.5">AGENTCORE</span>
                </div>
              </div>
            </div>

            {/* Col C (3 Capabilities indicators) */}
            <div className="lg:col-span-3 flex flex-col justify-between gap-3 lg:gap-3 xl:gap-4 py-1 h-auto min-h-[420px] text-left pl-0 lg:pl-3 relative z-10">
              {rightCapabilities.map((cap, idx) => (
                <div key={idx} className="relative flex items-center pl-5 sm:pl-6 w-full group">
                  {/* Circular indicator button offset to the left */}
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white border-2 ${cap.borderClass} ${cap.glowClass} z-20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[15deg]`}>
                    {cap.icon}
                  </div>
                  {/* Text banner with matching card border color */}
                  <div className={`w-full min-h-[105px] flex flex-col justify-center border ${cap.borderClass} bg-white p-2.5 sm:p-2.5 lg:p-2 xl:p-2.5 pl-8 sm:pl-10 lg:pl-9 xl:pl-10 rounded-lg text-left transition-all duration-300 ${cap.hoverBorder} shadow-[0_4px_12px_rgba(0,0,0,0.05)]`}>
                    <span className="text-[11px] sm:text-xs lg:text-[11px] xl:text-xs font-bold text-orange-600 leading-tight block mb-1">
                      {cap.subtitle}
                    </span>
                    <span className="text-[8px] sm:text-[9px] leading-[1.35] font-medium text-slate-500 block group-hover:text-slate-700 transition-colors duration-200 pr-1 mt-1">
                      {cap.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Integrated bottom delivering business impact banner -> Workflow Flow */}
      <div className="relative overflow-hidden rounded-[20px] border border-orange-500/20 bg-white py-4 px-4 sm:px-6 md:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center gap-5 lg:gap-6 z-10 text-slate-900 w-full overflow-x-auto no-scrollbar">

        {/* Mirror-morphism reflection glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,44,0.03),transparent_50%)] pointer-events-none" />

        <div className="flex flex-nowrap items-center justify-between w-max sm:w-full min-w-full gap-2 sm:gap-4 lg:gap-6 relative z-10 whitespace-nowrap px-4 sm:px-2 md:px-6">
          {workflowSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-50 border border-orange-500/30 shadow-[0_0_8px_rgba(255,107,44,0.05)] transition-all duration-300 group-hover:scale-110 group-hover:border-orange-500/60 shrink-0">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 animate-pulse" />
                </div>
                <span className="typo-caption text-slate-900 uppercase select-none transition-colors group-hover:text-orange-600">
                  {step}
                </span>
              </div>
              {idx < workflowSteps.length - 1 && (
                <div className="shrink-0 flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
