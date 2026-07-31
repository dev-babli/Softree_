"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Shield, Database, LayoutGrid, Brain, Cog } from "lucide-react";

const floatingCards = [
  {
    id: "m365",
    title: "Microsoft 365",
    top: "3%",
    left: "50%",
    transform: "translate(-50%, -100%)",
    icons: ["/images/office-icons/outlook.svg", "/images/office-icons/teams.svg", "/images/office-icons/word.svg", "/images/office-icons/excel.svg"],
    fallbackIcons: ["O", "T", "W", "X"],
    colors: ["bg-blue-600", "bg-indigo-600", "bg-blue-500", "bg-green-600"],
    delay: 0.1
  },
  {
    id: "crm",
    title: "CRM",
    subtitle: "Dynamics 365",
    top: "19%",
    left: "18%",
    transform: "translate(-100%, -100%)",
    icon: <Cog className="w-5 h-5 text-indigo-600" />,
    delay: 0.2
  },
  {
    id: "erp",
    title: "ERP",
    subtitle: "Dynamics 365",
    top: "19%",
    left: "82%",
    transform: "translate(0%, -100%)",
    icon: <Cog className="w-5 h-5 text-blue-600" />,
    delay: 0.3
  },
  {
    id: "apps",
    title: "Enterprise",
    subtitle: "Applications",
    top: "50%",
    left: "4%",
    transform: "translate(-100%, -50%)",
    icon: <LayoutGrid className="w-5 h-5 text-orange-500" />,
    delay: 0.4
  },
  {
    id: "data",
    title: "Data & Knowledge",
    top: "50%",
    left: "96%",
    transform: "translate(0%, -50%)",
    icon: <Database className="w-5 h-5 text-orange-500" />,
    delay: 0.5
  },
  {
    id: "ai",
    title: "AI Models",
    subtitle: "& Services",
    top: "81%",
    left: "18%",
    transform: "translate(-100%, 0%)",
    icon: <Brain className="w-5 h-5 text-red-500" />,
    delay: 0.6
  },
  {
    id: "security",
    title: "Security &",
    subtitle: "Governance",
    top: "81%",
    left: "82%",
    transform: "translate(0%, 0%)",
    icon: <Shield className="w-5 h-5 text-orange-600" />,
    delay: 0.7
  },
  {
    id: "power",
    title: "Power Platform",
    top: "96%",
    left: "50%",
    transform: "translate(-50%, 0%)",
    icons: ["/images/power-platform/power-apps.svg", "/images/power-platform/power-automate.svg", "/images/power-platform/copilot-studio.svg", "/images/power-platform/power-bi.svg"],
    fallbackIcons: ["A", "P", "C", "B"],
    colors: ["bg-purple-600", "bg-blue-500", "bg-green-500", "bg-yellow-500"],
    delay: 0.8
  }
];

export function CopilotIllustration() {
  return (
    <div className="w-full relative mx-auto overflow-hidden sm:overflow-visible flex items-center justify-center h-[280px] sm:h-[350px] md:h-[420px] lg:h-[450px] xl:h-[500px]">
      <div className="absolute w-[500px] h-[500px] flex items-center justify-center scale-[0.45] sm:scale-[0.65] md:scale-[0.8] lg:scale-[0.85] xl:scale-95 origin-center">

      {/* Background Animated Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-full h-full border border-orange-100 rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[80%] h-[80%] border border-orange-200/50 rounded-full"
          animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Connection Lines (SVG) */}
      <svg className="absolute inset-[-100px] w-[calc(100%+200px)] h-[calc(100%+200px)] pointer-events-none z-0">
        <defs>
          <linearGradient id="glowLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#FF6B00" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Draw a static subtle line to all anchor points */}
        {[
          { x: 350, y: 130 },   // Top
          { x: 195, y: 195 },   // Top Left
          { x: 505, y: 195 },   // Top Right
          { x: 130, y: 350 },   // Middle Left
          { x: 570, y: 350 },   // Middle Right
          { x: 195, y: 505 },   // Bottom Left
          { x: 505, y: 505 },   // Bottom Right
          { x: 350, y: 570 }    // Bottom
        ].map((pt, i) => (
          <g key={i}>
            <line
              x1="350" y1="350"
              x2={pt.x} y2={pt.y}
              stroke="#FF6B00"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.4"
            />
            {/* Static dot at the end of the line */}
            <circle cx={pt.x} cy={pt.y} r="5" fill="white" stroke="#FF6B00" strokeWidth="2" />
            <circle cx={pt.x} cy={pt.y} r="2" fill="#FF6B00" />

            {/* Animated dot on line */}
            <circle r="3" fill="#FF6B00" filter="drop-shadow(0 0 4px #FF6B00)">
              <animateMotion
                dur={`${3 + (i % 3)}s`}
                repeatCount="indefinite"
                path={`M 350,350 L ${pt.x},${pt.y}`}
              />
            </circle>
          </g>
        ))}
      </svg>

      {/* Floating Cards */}
      {floatingCards.map((card, i) => (
        <div
          key={`wrap-${card.id}`}
          className="absolute z-10"
          style={{ top: card.top, left: card.left, transform: card.transform }}
        >
          <motion.div
            className="bg-white/90 backdrop-blur-md rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-white p-3 min-w-[120px] flex flex-col items-center justify-center cursor-default hover:shadow-[0_12px_25px_rgba(255,107,0,0.15)]"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: card.delay, duration: 0.6, ease: "backOut" }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            {card.icon ? (
              <div className="flex items-center gap-2 mb-1">
                {card.icon}
                <span className="font-bold text-xs text-gray-800">{card.title}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-xs text-gray-800">{card.title}</span>
              </div>
            )}

            {card.subtitle && (
              <span className="text-[10px] text-gray-500">{card.subtitle}</span>
            )}

            {card.icons && (
              <div className="flex gap-1.5 mt-1">
                {card.icons.map((imgSrc, idx) => (
                  <div key={idx} className={`w-5 h-5 rounded flex items-center justify-center text-[9px] text-white font-bold ${card.colors ? card.colors[idx] : 'bg-gray-200'}`}>
                    {card.fallbackIcons ? card.fallbackIcons[idx] : ""}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      ))}

      {/* Central Robot / Platform area */}
      <div className="relative z-20 w-[240px] h-[300px] flex flex-col items-center justify-end">

        {/* Hexagonal glowing frame */}
        <div className="absolute top-0 w-full h-[240px]">
          <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_20s_linear_infinite]">
            <polygon
              points="100,5 190,50 190,150 100,195 10,150 10,50"
              fill="none"
              stroke="url(#hexGradient)"
              strokeWidth="2"
              opacity="0.5"
            />
            <defs>
              <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* The Robot (Using Bot icon styled premiumly) */}
        <motion.div
          className="relative z-30 mb-8"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,107,0,0.3)] border-4 border-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-white" />
            <Bot className="w-16 h-16 text-gray-800 relative z-10" />

            {/* Robot Eyes Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-4 flex justify-between z-20 pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] shadow-[0_0_10px_#FF6B00] animate-pulse" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] shadow-[0_0_10px_#FF6B00] animate-pulse" />
            </div>
          </div>

          <div className="mt-4 px-4 py-1.5 bg-gradient-to-r from-[#FF6B00] to-orange-400 rounded-full text-[10px] font-bold text-white text-center shadow-lg">
            AI COPILOT
          </div>
        </motion.div>

        {/* Base Platform */}
        <div className="relative w-full h-[60px]">
          {/* Cylinder top */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-300 rounded-[50%] border-2 border-white shadow-[0_10px_30px_rgba(255,107,0,0.2)]" />
          {/* Cylinder side/depth */}
          <div className="absolute top-[30px] w-full h-[30px] bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-[50%]" />

          {/* Rotating scanner ring on base */}
          <div className="absolute top-2 left-4 right-4 h-[40px] rounded-[50%] border border-[#FF6B00]/40 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#FF6B00]/40 to-transparent blur-md origin-right"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>

      </div>

    </div>
    </div>
  );
}
