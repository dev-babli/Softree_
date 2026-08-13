"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Laptop, Smartphone, Database, Layers } from "lucide-react"

// Define the steps data
const STEPS = [
  {
    id: "step-01",
    num: "STEP 01",
    title: "Build Custom AI & Agent Workflows",
    description: "Accelerated offshore AI engineering combining custom LLM fine-tuning, retrieval-augmented generation (RAG) pipelines, and intelligent agent workflows built to automate business operations.",
    icon: Sparkles,
    color: "#8B5CF6" // AI Violet
  },
  {
    id: "step-02",
    num: "STEP 02",
    title: "Engineer High-Performance Web Apps",
    description: "Building enterprise-grade, custom React/Next.js and cloud-native web portals engineered for absolute speed, high-level responsiveness, and global scalability.",
    icon: Laptop,
    color: "#1852FF" // Softree Blue
  },
  {
    id: "step-03",
    num: "STEP 03",
    title: "Launch Seamless Mobile Applications",
    description: "Creating high-performing cross-platform iOS and Android mobile apps using React Native, backed by solid offline synchronizations and device integrations.",
    icon: Smartphone,
    color: "#EC4899" // Pink
  },
  {
    id: "step-04",
    num: "STEP 04",
    title: "Unlock Real-Time Business Intelligence",
    description: "Modern data engineering pipelines, comprehensive warehousing, and predictive reporting dashboards using Microsoft Fabric, Power BI, and Azure Synapse.",
    icon: Database,
    color: "#FF7A2F" // Softree Orange
  },
  {
    id: "step-05",
    num: "STEP 05",
    title: "Automate Workflows & Enterprise Portals",
    description: "Low-code canvas app workflow automations and customized SharePoint SPFx extensions developed to streamline enterprise governance, compliance, and portals.",
    icon: Layers,
    color: "#038387" // SharePoint Teal
  }
]

/* ════════════════════════════════════════════════════════════════
 *  Interactive Vector Scenes for Each Step (Left Column)
 * ════════════════════════════════════════════════════════════════ */

function Scene1() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full max-h-[240px]">
      <defs>
        <radialGradient id="scene1-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="60" fill="url(#scene1-glow)" />
      
      {/* Orbit Rings */}
      <circle cx="100" cy="100" r="45" fill="none" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="100" cy="100" r="68" fill="none" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="1" />
      
      {/* Central AI Node */}
      <motion.g
        animate={{ scale: [1, 1.06, 1], rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="100" cy="100" r="18" fill="rgba(139, 92, 246, 0.15)" stroke="#8B5CF6" strokeWidth="2" style={{ filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))" }} />
        <path d="M93,100 L100,93 L107,100 L100,107 Z" fill="none" stroke="#8B5CF6" strokeWidth="1.5" />
      </motion.g>

      {/* Orbiting Agent 1 */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "100px 100px" }}
      >
        <circle cx="100" cy="55" r="5" fill="#8B5CF6" style={{ filter: "drop-shadow(0 0 6px #8B5CF6)" }} />
        <circle cx="100" cy="55" r="9" fill="none" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1" />
      </motion.g>

      {/* Orbiting Agent 2 */}
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "100px 100px" }}
      >
        <circle cx="168" cy="100" r="4.5" fill="#a78bfa" style={{ filter: "drop-shadow(0 0 4px #a78bfa)" }} />
        <circle cx="32" cy="100" r="6" fill="#c084fc" style={{ filter: "drop-shadow(0 0 6px #c084fc)" }} />
      </motion.g>

      {/* Connecting Flow Rays */}
      <line x1="100" y1="100" x2="100" y2="55" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1.2" strokeDasharray="3 3" />
      <line x1="100" y1="100" x2="168" y2="100" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1.2" strokeDasharray="3 3" />
    </svg>
  )
}

function Scene2() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full max-h-[240px]">
      <defs>
        <linearGradient id="scene2-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1852FF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00c6ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      <motion.g
        initial={{ rotateX: 18, rotateY: -18, rotateZ: 4 }}
        animate={{ y: [-4, 4, -4], rotateY: [-16, -20, -16] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", transformOrigin: "center" }}
      >
        {/* Browser Mockup */}
        <rect x="30" y="40" width="140" height="120" rx="8" fill="rgba(10, 10, 10, 0.85)" stroke="rgba(24, 82, 255, 0.35)" strokeWidth="2" style={{ filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.5))" }} />
        
        {/* Header bar */}
        <line x1="30" y1="62" x2="170" y2="62" stroke="rgba(24, 82, 255, 0.25)" strokeWidth="1.2" />
        <circle cx="44" cy="51" r="3" fill="#ef4444" opacity="0.8" />
        <circle cx="54" cy="51" r="3" fill="#f59e0b" opacity="0.8" />
        <circle cx="64" cy="51" r="3" fill="#10b981" opacity="0.8" />
        
        {/* Layout Blocks */}
        <motion.rect 
          x="44" y="74" width="45" height="18" rx="3" fill="url(#scene2-grad)" stroke="rgba(24, 82, 255, 0.5)" strokeWidth="1"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <rect x="95" y="74" width="60" height="18" rx="3" fill="rgba(24, 82, 255, 0.04)" stroke="rgba(24, 82, 255, 0.15)" strokeWidth="1" />
        
        <rect x="44" y="104" width="112" height="8" rx="2" fill="rgba(255,255,255,0.06)" />
        <rect x="44" y="118" width="85" height="8" rx="2" fill="rgba(255,255,255,0.06)" />
        
        {/* Developer Glyph */}
        <text x="132" y="142" fill="rgba(24, 82, 255, 0.65)" fontSize="20" fontWeight="bold" fontFamily="monospace" style={{ textShadow: "0 0 8px rgba(24, 82, 255, 0.4)" }}>&lt;/&gt;</text>
      </motion.g>
    </svg>
  )
}

function Scene3() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full max-h-[240px]">
      <defs>
        <radialGradient id="scene3-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      <circle cx="100" cy="100" r="70" fill="url(#scene3-glow)" />

      <motion.g
        animate={{ y: [-5, 5, -5], rotate: [-6, -10, -6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      >
        {/* Phone mock body */}
        <rect x="62" y="32" width="76" height="136" rx="15" fill="rgba(10, 10, 10, 0.9)" stroke="rgba(236, 72, 153, 0.45)" strokeWidth="2" style={{ filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.6))" }} />
        
        {/* Island */}
        <rect x="83" y="40" width="34" height="7" rx="3.5" fill="#111" />
        
        {/* UI Widget top */}
        <motion.g
          animate={{ x: [-2, 3, -2] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="36" y="62" width="60" height="38" rx="6" fill="rgba(18, 18, 18, 0.92)" stroke="rgba(236, 72, 153, 0.55)" strokeWidth="1.2" style={{ filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.5))" }} />
          <circle cx="49" cy="74" r="5" fill="#EC4899" />
          <line x1="59" y1="71" x2="84" y2="71" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
          <line x1="59" y1="77" x2="76" y2="77" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        </motion.g>
        
        {/* UI Widget bottom */}
        <motion.g
          animate={{ x: [3, -2, 3] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="104" y="108" width="60" height="32" rx="6" fill="rgba(18, 18, 18, 0.92)" stroke="rgba(236, 72, 153, 0.35)" strokeWidth="1.2" style={{ filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.5))" }} />
          <line x1="115" y1="118" x2="148" y2="118" stroke="#EC4899" strokeWidth="2" />
          <line x1="115" y1="124" x2="136" y2="124" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        </motion.g>
      </motion.g>
    </svg>
  )
}

function Scene4() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full max-h-[240px]">
      <defs>
        <linearGradient id="bar-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#FF7A2F" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FFA364" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      
      {/* Grid lines */}
      <line x1="35" y1="150" x2="165" y2="150" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      <line x1="35" y1="110" x2="165" y2="110" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="35" y1="70" x2="165" y2="70" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

      {/* Dynamic Bars */}
      <motion.g
        animate={{ scaleY: [0.94, 1.06, 0.94] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "bottom", display: "flex" }}
      >
        <rect x="45" y="80" width="18" height="70" rx="3.5" fill="url(#bar-grad)" stroke="#FF7A2F" strokeWidth="1.2" />
        <rect x="72" y="60" width="18" height="90" rx="3.5" fill="url(#bar-grad)" stroke="#FF7A2F" strokeWidth="1.2" />
        <rect x="99" y="95" width="18" height="55" rx="3.5" fill="url(#bar-grad)" stroke="#FF7A2F" strokeWidth="1.2" />
        <rect x="126" y="45" width="18" height="105" rx="3.5" fill="url(#bar-grad)" stroke="#FF7A2F" strokeWidth="1.2" style={{ filter: "drop-shadow(0 0 6px rgba(255,122,47,0.4))" }} />
      </motion.g>

      {/* Trend Line Indicator */}
      <motion.path
        d="M 54 90 L 81 70 L 108 105 L 135 55"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
      />
      
      {/* Target Marker */}
      <motion.circle
        cx="135"
        cy="55"
        r="4.5"
        fill="#FF7A2F"
        style={{ filter: "drop-shadow(0 0 10px #FF7A2F)" }}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
    </svg>
  )
}

function Scene5() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full max-h-[240px]">
      <defs>
        <radialGradient id="scene5-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#038387" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#038387" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="100" r="60" fill="url(#scene5-glow)" />

      {/* Workflow nodes */}
      <g>
        {/* Node Left */}
        <rect x="30" y="85" width="30" height="30" rx="6" fill="rgba(12, 12, 12, 0.95)" stroke="rgba(3, 131, 135, 0.45)" strokeWidth="1.5" />
        <polygon points="41,95 41,105 51,100" fill="#038387" />
        
        {/* Connector Line 1 */}
        <line x1="60" y1="100" x2="105" y2="100" stroke="rgba(3, 131, 135, 0.3)" strokeWidth="2" strokeDasharray="4 4" />
        
        {/* Flowing Pulse 1 */}
        <motion.circle
          cx="60"
          cy="100"
          r="3"
          fill="#038387"
          animate={{ cx: [60, 105] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        />

        {/* Central Hub */}
        <motion.g
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="100" y="80" width="40" height="40" rx="8" fill="rgba(10, 10, 10, 0.95)" stroke="#038387" strokeWidth="2" style={{ filter: "drop-shadow(0 6px 16px rgba(3, 131, 135, 0.35))" }} />
          <circle cx="120" cy="100" r="8" fill="none" stroke="#038387" strokeWidth="2" />
          <path d="M116,100 L119,103 L124,97" fill="none" stroke="#038387" strokeWidth="2" strokeLinecap="round" />
        </motion.g>

        {/* Connector Line 2 */}
        <line x1="140" y1="100" x2="185" y2="100" stroke="rgba(3, 131, 135, 0.3)" strokeWidth="2" strokeDasharray="4 4" />
        
        {/* Flowing Pulse 2 */}
        <motion.circle
          cx="140"
          cy="100"
          r="3"
          fill="#038387"
          animate={{ cx: [140, 185] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 1.1 }}
        />
      </g>
    </svg>
  )
}

/* ════════════════════════════════════════════════════════════════
 *  Main WhySoftree component
 * ════════════════════════════════════════════════════════════════ */

export default function WhySoftree() {
  const [activeStep, setActiveStep] = useState("step-01")
  const activeIndex = STEPS.findIndex((s) => s.id === activeStep)
  const progressPercent = activeIndex / (STEPS.length - 1)

  return (
    <section className="relative w-full py-10 md:py-14 bg-white text-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-neutral-950 border border-neutral-800/40 p-8 sm:p-10 md:p-14 lg:p-16 text-white shadow-2xl">
          
          {/* Dynamic Background Glows shifting color with active step */}
          <motion.div 
            className="pointer-events-none absolute -left-1/4 top-1/3 h-[600px] w-[600px] rounded-full blur-[130px]"
            animate={{ backgroundColor: `${STEPS[activeIndex].color}12` }}
            transition={{ duration: 0.6 }}
          />
          <motion.div 
            className="pointer-events-none absolute -right-1/4 bottom-1/3 h-[600px] w-[600px] rounded-full blur-[130px]"
            animate={{ backgroundColor: `${STEPS[activeIndex].color}08` }}
            transition={{ duration: 0.6 }}
          />

          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Column: Stacking Text & Animation Separately */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Text Description Card */}
                <div className="relative rounded-[32px] border border-white/[0.08] bg-gradient-to-b from-neutral-900 to-neutral-950 p-8 md:p-10 shadow-2xl">
                  {/* Subtle sweep highlight grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                  <div className="relative z-20 space-y-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-orange-400">
                        The Softree Advantage
                      </span>
                      <h2 className="text-3xl md:text-[34px] font-semibold tracking-tight text-white mt-2 leading-[1.25]">
                        Why Enterprises Partner With Us
                      </h2>
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      We combine certified Microsoft ecosystem development with custom AI engineering to deliver secure, high-performing digital systems. No middle layers—just transparent, milestone-driven delivery led by senior engineers who build for reliability.
                    </p>
                  </div>
                </div>

                {/* Animation Showcase Card */}
                <div className="relative flex-grow min-h-[300px] lg:min-h-0 rounded-[32px] overflow-hidden border border-white/[0.08] bg-gradient-to-b from-neutral-900 to-neutral-950 p-8 flex flex-col items-center justify-center shadow-2xl">
                  {/* Subtle sweep highlight grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                  <div className="relative w-full h-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, scale: 0.85, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -15 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        {activeStep === "step-01" && <Scene1 />}
                        {activeStep === "step-02" && <Scene2 />}
                        {activeStep === "step-03" && <Scene3 />}
                        {activeStep === "step-04" && <Scene4 />}
                        {activeStep === "step-05" && <Scene5 />}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Footer Tag */}
                  <div className="absolute bottom-4 left-8 right-8 pt-3 border-t border-neutral-800/40 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-orange-400 font-mono">
                      Engineered for Reliability
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Step Accordions */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="relative pl-6 md:pl-10 space-y-4">
                  
                  {/* Background Dotted Line */}
                  <svg 
                    className="absolute left-[79px] md:left-[95px] top-[38px] bottom-[38px] w-[2px] pointer-events-none z-0"
                  >
                    <line 
                      x1="1" 
                      y1="0" 
                      x2="1" 
                      y2="100%" 
                      stroke="rgba(255, 255, 255, 0.12)" 
                      strokeWidth="2" 
                      strokeDasharray="1 6"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Active Neon Glow Connector Line */}
                  <div
                    className="absolute left-[79px] md:left-[95px] top-[38px] bottom-[38px] w-[2px] pointer-events-none z-0"
                  >
                    <motion.div
                      className="absolute top-0 left-0 w-full rounded-full"
                      style={{
                        backgroundColor: STEPS[activeIndex].color,
                        boxShadow: `0 0 12px ${STEPS[activeIndex].color}, 0 0 4px ${STEPS[activeIndex].color}`,
                        transformOrigin: "top"
                      }}
                      animate={{
                        height: `${progressPercent * 100}%`,
                        backgroundColor: STEPS[activeIndex].color,
                        boxShadow: `0 0 12px ${STEPS[activeIndex].color}, 0 0 4px ${STEPS[activeIndex].color}`
                      }}
                      transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    />
                  </div>

                  {/* Active Tip Glowing Pulse Indicator */}
                  <div
                    className="absolute left-[79px] md:left-[95px] top-[38px] bottom-[38px] w-[2px] pointer-events-none z-10"
                  >
                    <motion.div
                      className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: STEPS[activeIndex].color,
                        boxShadow: `0 0 10px ${STEPS[activeIndex].color}, 0 0 4px ${STEPS[activeIndex].color}`,
                        top: 0
                      }}
                      animate={{ 
                        y: `calc(${progressPercent * 100}% - 5px)`,
                        backgroundColor: STEPS[activeIndex].color,
                        boxShadow: `0 0 10px ${STEPS[activeIndex].color}, 0 0 4px ${STEPS[activeIndex].color}`
                      }}
                      transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    />
                  </div>

                  {STEPS.map((step) => {
                    const isActive = activeStep === step.id
                    const StepIcon = step.icon

                    return (
                      <div 
                        key={step.id}
                        onClick={() => setActiveStep(step.id)}
                        className={`group relative flex gap-4 md:gap-6 items-start rounded-2xl p-4 transition-all duration-300 cursor-pointer select-none border ${
                          isActive 
                            ? "bg-neutral-900/60 shadow-lg" 
                            : "bg-transparent border-transparent hover:bg-neutral-900/20"
                        }`}
                        style={isActive ? {
                          boxShadow: `0 8px 30px rgba(0,0,0,0.3), 0 0 1px ${step.color}30`,
                          borderColor: `${step.color}30`
                        } : {}}
                      >
                        
                        {/* Step Circle Indicator Badge */}
                        <div className="relative z-10 flex items-center justify-center shrink-0">
                          <motion.div
                            animate={{ 
                              borderColor: isActive ? step.color : "rgb(38, 38, 38)",
                              backgroundColor: isActive ? step.color : "rgb(10, 10, 10)"
                            }}
                            transition={{ duration: 0.3 }}
                            className={`h-11 w-20 rounded-full border-2 flex items-center justify-center text-[10px] font-bold font-mono tracking-wider`}
                            style={{ 
                              color: isActive ? "#ffffff" : "rgb(115, 115, 115)",
                              boxShadow: isActive ? `0 0 20px ${step.color}40, inset 0 1px 0 rgba(255,255,255,0.2)` : "none"
                            }}
                          >
                            <span className="flex items-center gap-1.5">
                              {step.num}
                              {isActive && (
                                <span className="block h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                              )}
                            </span>
                          </motion.div>
                        </div>

                        {/* Step Info content */}
                        <div className="flex-1 pt-1.5 space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className={`text-base md:text-lg font-semibold transition-colors duration-300 ${
                              isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"
                            }`}>
                              {step.title}
                            </h3>
                            {isActive && (
                              <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="h-5 w-5 rounded-full flex items-center justify-center bg-white/5"
                              >
                                <StepIcon className="h-3 w-3" style={{ color: step.color }} />
                              </motion.div>
                            )}
                          </div>

                          {/* Expandable explanation block */}
                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <p className="text-xs md:text-sm text-neutral-400 leading-relaxed mt-2 pr-4">
                                  {step.description}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    )
                  })}

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
