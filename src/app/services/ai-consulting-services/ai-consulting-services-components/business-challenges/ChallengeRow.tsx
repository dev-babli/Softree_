"use client";

import { motion } from "framer-motion";
import { Headphones, Database, FileText, BarChart3, Bot, Brain, Settings, Maximize, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { BusinessChallengePair } from "./types";

const iconMap: Record<string, React.ElementType> = {
  Headphones,
  Database,
  FileText,
  BarChart3,
  Bot,
  Brain,
  Settings,
  Maximize,
};

interface ChallengeRowProps {
  pair: BusinessChallengePair;
  isActive: boolean;
  onHover: () => void;
  index: number;
}

export const ChallengeRow = ({ pair, isActive, onHover, index }: ChallengeRowProps) => {
  const ChallengeIcon = iconMap[pair.challenge.iconName] || FileText;
  const SolutionIcon = iconMap[pair.solution.iconName] || Bot;

  return (
    <div 
      className="flex flex-col md:flex-row items-center w-full gap-4 md:gap-8"
      onMouseEnter={onHover}
      onClick={onHover}
    >
      {/* LEFT: Challenge Card */}
      <motion.div
        animate={{ 
          scale: isActive ? 1.02 : 1,
          y: isActive ? -2 : 0,
          boxShadow: isActive ? "0 20px 40px -10px rgba(255, 88, 18, 0.15)" : "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`relative w-full md:w-[47%] rounded-[20px] bg-white transition-all duration-300 cursor-pointer overflow-hidden border p-[3px] ${
          isActive ? "border-transparent shadow-[0_20px_40px_-10px_rgba(255,88,18,0.15)]" : "border-orange-100 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)]"
        }`}
      >
        {/* Top-Right Accent Curve */}
        <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none z-20 overflow-hidden rounded-tr-[17px]">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF5812] rounded-full translate-x-[55%] -translate-y-[55%] shadow-[0_0_10px_rgba(255,88,18,0.5)]"></div>
        </div>

        {/* Background Dot Pattern on the right */}
        <div className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none overflow-hidden rounded-r-[17px] opacity-20 z-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 3px 3px, #FF5812 2.5px, transparent 0)`,
            backgroundSize: `24px 24px`,
            backgroundPosition: `right center`,
            maskImage: `linear-gradient(to right, transparent, black 80%)`
          }}></div>
        </div>

        {/* Animated Glow Border */}
        {isActive && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] aspect-square bg-[conic-gradient(from_0deg,transparent_0_270deg,#FF5812_360deg)] opacity-90"
            />
          </div>
        )}
        
        <div className="relative z-10 flex items-center gap-6 p-4 md:px-6 md:py-4 bg-white rounded-[17px] h-full pl-5">
          {/* Embossed Icon Container with Arrow Shape */}
          <div 
            className="relative w-[100px] h-[84px] flex-shrink-0 flex items-center justify-center mr-6"
            style={{ filter: "drop-shadow(0 0 1px rgba(255,88,18,0.3)) drop-shadow(0 8px 16px rgba(255,88,18,0.12))" }}
          >
            {/* Main box */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-br from-[#FFF5F0] to-[#FFFFFF] rounded-2xl z-10"></div>
            {/* Pointed right edge (Arrow tip) */}
            <div className="absolute left-[36px] top-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-gradient-to-br from-[#FFF5F0] to-[#FFFFFF] rotate-45 rounded-[14px] z-0"></div>
            
            {/* Vertical Line Separator */}
            <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 h-16 w-[1.5px] bg-slate-200 z-10"></div>
            
            {/* Icon */}
            <ChallengeIcon className="relative z-20 w-10 h-10 md:w-11 md:h-11 text-[#FF5812] -ml-4" strokeWidth={2} />
          </div>
          <div className="relative z-10 pl-2">
            <h3 className={`text-lg md:text-xl font-bold mb-1.5 transition-colors duration-300 ${
              isActive ? "text-[#0f172a]" : "text-[#0f172a]"
            }`}>
              {pair.challenge.title}
            </h3>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
              {pair.challenge.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* CENTER: Connector Arrow & Dotted Lines */}
      <div className="hidden md:flex flex-row items-center justify-center flex-shrink-0 w-24 relative group">
        <style>{`
          @keyframes dash-move {
            0% { background-position: 0 0; }
            100% { background-position: 16px 0; }
          }
        `}</style>
        {/* Left Dotted Line */}
        <div 
          className="absolute left-[-2rem] right-1/2 top-1/2 -translate-y-1/2 h-[2px] pointer-events-none opacity-60"
          style={{
            backgroundImage: 'linear-gradient(to right, #f97316 50%, transparent 50%)',
            backgroundSize: '16px 2px',
            backgroundRepeat: 'repeat-x',
            animation: isActive ? 'dash-move 0.8s linear infinite' : 'none'
          }}
        ></div>
        {/* Right Dotted Line */}
        <div 
          className="absolute left-1/2 right-[-2rem] top-1/2 -translate-y-1/2 h-[2px] pointer-events-none opacity-60"
          style={{
            backgroundImage: 'linear-gradient(to right, #f97316 50%, transparent 50%)',
            backgroundSize: '16px 2px',
            backgroundRepeat: 'repeat-x',
            animation: isActive ? 'dash-move 0.8s linear infinite' : 'none'
          }}
        ></div>
        
        <motion.div 
          animate={{ 
            scale: isActive ? 1.1 : 1,
            backgroundColor: isActive ? "#FF5812" : "#fff5f0",
            color: isActive ? "#ffffff" : "#FF5812",
            boxShadow: isActive ? "0 0 15px rgba(255, 88, 18, 0.4)" : "0 2px 8px rgba(255,88,18,0.1)"
          }}
          className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 border border-orange-100"
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </div>
      
      {/* Mobile Connector Arrow */}
      <div className="md:hidden">
        <ArrowRight className={`w-5 h-5 ${isActive ? "text-[#FF5812]" : "text-slate-300"}`} />
      </div>

      {/* RIGHT: Solution Card */}
      <motion.div
        animate={{ 
          scale: isActive ? 1.02 : 1,
          y: isActive ? -2 : 0,
          boxShadow: isActive ? "0 20px 40px -10px rgba(255, 88, 18, 0.15)" : "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`relative w-full md:w-[47%] rounded-[20px] bg-white transition-all duration-300 cursor-pointer overflow-hidden border p-[3px] ${
          isActive ? "border-transparent shadow-[0_20px_40px_-10px_rgba(255,88,18,0.15)]" : "border-orange-100 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)]"
        }`}
      >
        {/* Top-Right Accent Curve */}
        <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none z-20 overflow-hidden rounded-tr-[17px]">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF5812] rounded-full translate-x-[55%] -translate-y-[55%] shadow-[0_0_10px_rgba(255,88,18,0.5)]"></div>
        </div>

        {/* Background Dot Pattern on the right */}
        <div className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none overflow-hidden rounded-r-[17px] opacity-20 z-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 3px 3px, #FF5812 2.5px, transparent 0)`,
            backgroundSize: `24px 24px`,
            backgroundPosition: `right center`,
            maskImage: `linear-gradient(to right, transparent, black 80%)`
          }}></div>
        </div>

        {/* Animated Glow Border */}
        {isActive && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] aspect-square bg-[conic-gradient(from_0deg,transparent_0_270deg,#FF5812_360deg)] opacity-90"
            />
          </div>
        )}
        
        <div className="relative z-10 flex items-center gap-6 p-4 md:px-6 md:py-4 bg-white rounded-[17px] h-full pl-5">
          {/* Embossed Icon Container with Arrow Shape */}
          <div 
            className="relative w-[100px] h-[84px] flex-shrink-0 flex items-center justify-center mr-6"
            style={{ filter: "drop-shadow(0 0 1px rgba(255,88,18,0.3)) drop-shadow(0 8px 16px rgba(255,88,18,0.12))" }}
          >
            {/* Main box */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-br from-[#FFF5F0] to-[#FFFFFF] rounded-2xl z-10"></div>
            {/* Pointed right edge (Arrow tip) */}
            <div className="absolute left-[36px] top-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-gradient-to-br from-[#FFF5F0] to-[#FFFFFF] rotate-45 rounded-[14px] z-0"></div>
            
            {/* Vertical Line Separator */}
            <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 h-16 w-[1.5px] bg-slate-200 z-10"></div>
            
            {/* Icon */}
            <SolutionIcon className="relative z-20 w-10 h-10 md:w-11 md:h-11 text-[#FF5812] -ml-4" strokeWidth={2} />
          </div>
          <div className="relative z-10 pl-2">
            <h3 className={`text-lg md:text-xl font-bold mb-1.5 transition-colors duration-300 ${
              isActive ? "text-[#0f172a]" : "text-[#0f172a]"
            }`}>
              {pair.solution.title}
            </h3>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
              {pair.solution.description}
            </p>
          </div>
        </div>
      </motion.div>

    </div>
  );
};
