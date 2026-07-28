"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Database from "lucide-react/dist/esm/icons/database";
import Bot from "lucide-react/dist/esm/icons/bot";
import AppWindow from "lucide-react/dist/esm/icons/app-window";
import GitMerge from "lucide-react/dist/esm/icons/git-merge";
import Bell from "lucide-react/dist/esm/icons/bell";
import LineChart from "lucide-react/dist/esm/icons/line-chart";
import Cpu from "lucide-react/dist/esm/icons/cpu";
import Network from "lucide-react/dist/esm/icons/network";

const CARDS_DATA = [
  { id: 1, title: "DATA INPUT", desc: "Capture, extract and prepare data accurately.", icon: Database },
  { id: 2, title: "AI AGENTS", desc: "Intelligent agents that understand and act.", icon: Bot },
  { id: 3, title: "BUSINESS APPLICATIONS", desc: "Seamless integration with your business applications.", icon: AppWindow },
  { id: 4, title: "WORKFLOW AUTOMATION", desc: "Automate tasks and orchestrate complex workflows.", icon: GitMerge },
  { id: 5, title: "NOTIFICATIONS", desc: "Real-time alerts and smart notifications.", icon: Bell },
  { id: 6, title: "ANALYTICS & INSIGHTS", desc: "Actionable insights for continuous improvement.", icon: LineChart },
  { id: 7, title: "DECISIONS & ACTIONS", desc: "Smart decisions that drive better outcomes.", icon: Cpu },
  { id: 8, title: "INTEGRATIONS", desc: "Connect tools and systems effortlessly.", icon: Network }
];

export default function WorkflowHeroRight() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-[500px] w-full" />; // Prevent hydration mismatch

  return (
    <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center scale-95 lg:scale-100">
      
      {/* Background Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute w-[80%] h-[80%] rounded-full border border-blue-500/10 border-dashed"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          className="absolute w-[100%] h-[100%] rounded-full border border-orange-500/20 border-dashed opacity-50"
        />
      </div>

      {/* SVG Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
        <defs>
          <radialGradient id="glowGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Drawing solid curved lines from center (50,50) to the 8 card positions */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle - 90) * (Math.PI / 180);
          const x2 = 50 + 35 * Math.cos(rad);
          const y2 = 50 + 35 * Math.sin(rad);
          return (
            <motion.line 
              key={`line-${i}`}
              x1="50" y1="50" x2={x2} y2={y2} 
              stroke="#FF6B00" strokeWidth="0.2" strokeOpacity="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          );
        })}

        {/* Pulsing connection nodes at the ends */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle - 90) * (Math.PI / 180);
          const cx = 50 + 35 * Math.cos(rad);
          const cy = 50 + 35 * Math.sin(rad);
          return (
            <motion.circle 
              key={`node-${i}`}
              cx={cx} cy={cy} r="1.2" 
              fill="#FF6B00"
              animate={{ r: [1.2, 1.6, 1.2], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          );
        })}
      </svg>

      {/* Centerpiece: AI Robot */}
      <motion.div 
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-44 h-44 md:w-52 md:h-52 rounded-full flex items-center justify-center bg-gradient-to-b from-[#111] to-[#000] shadow-2xl border-[6px] border-[#111]"
      >
        {/* Removed orange blur shade from here */}
        <div className="text-white text-center flex flex-col items-center">
          <Bot className="w-14 h-14 mb-2 text-[#FF6B00]" strokeWidth={1.5} />
          <span className="font-extrabold tracking-wider text-xl">AI CORE</span>
        </div>
      </motion.div>

      {/* 8 Orbiting Glass Cards */}
      {CARDS_DATA.map((card, i) => {
        const angle = i * 45; // Start from top (0 is actually top since we subtract 90 in rad calculation)
        const radiusDesktop = 35; // dot radius percentage
        
        // Convert polar to cartesian coordinates (in percentages)
        const rad = (angle - 90) * (Math.PI / 180);
        const x = 50 + radiusDesktop * Math.cos(rad);
        const y = 50 + radiusDesktop * Math.sin(rad);

        // Adjust transform to connect the card exactly to the dot
        let transformStr = 'translate(-50%, -50%)';
        switch (angle) {
          case 0:   transformStr = 'translate(-50%, -100%) translateY(-10px)'; break; // Top
          case 45:  transformStr = 'translate(0%, -100%) translateY(-5px) translateX(5px)'; break; // Top Right
          case 90:  transformStr = 'translate(0%, -50%) translateX(10px)'; break; // Right
          case 135: transformStr = 'translate(0%, 0%) translateY(5px) translateX(5px)'; break; // Bottom Right
          case 180: transformStr = 'translate(-50%, 0%) translateY(10px)'; break; // Bottom
          case 225: transformStr = 'translate(-100%, 0%) translateY(5px) translateX(-5px)'; break; // Bottom Left
          case 270: transformStr = 'translate(-100%, -50%) translateX(-10px)'; break; // Left
          case 315: transformStr = 'translate(-100%, -100%) translateY(-5px) translateX(-5px)'; break; // Top Left
        }

        const Icon = card.icon;

        return (
          <div 
            key={card.id}
            className="absolute z-30 hidden sm:flex"
            style={{ 
              left: `${x}%`, 
              top: `${y}%`,
              transform: transformStr
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 + (i * 0.1) }}
              whileHover={{ scale: 1.05 }}
              className="w-[140px] p-3 rounded-xl bg-white shadow-xl border border-gray-100 flex-col items-center text-center group cursor-default flex"
            >
              <div className="w-10 h-10 rounded-full bg-[#FF6B00]/10 flex items-center justify-center mb-2 group-hover:bg-[#FF6B00] transition-colors duration-300">
                <Icon className="w-5 h-5 text-[#FF6B00] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
              </div>
              <h4 className="text-[10px] font-bold text-[#111827] mb-1">{card.title}</h4>
              <p className="text-[9px] text-[#6B7280] leading-tight">{card.desc}</p>
            </motion.div>
          </div>
        );
      })}

      <div className="sm:hidden absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none opacity-0">
      </div>
    </div>
  );
}
