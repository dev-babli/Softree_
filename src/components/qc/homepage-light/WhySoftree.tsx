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
    color: "#ff7a2f" // Softree Orange
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

export default function WhySoftree() {
  const [activeStep, setActiveStep] = useState("step-01")

  return (
    <section className="relative w-full py-16 md:py-24 bg-white text-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-neutral-950 border border-neutral-800/40 p-8 sm:p-10 md:p-14 lg:p-16 text-white shadow-2xl">
          {/* Background Glows */}
          <div className="pointer-events-none absolute -left-1/4 top-1/3 h-[600px] w-[600px] rounded-full bg-orange-500/5 blur-[130px]" />
          <div className="pointer-events-none absolute -right-1/4 bottom-1/3 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-[130px]" />

          <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: What Sets Us Apart Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative h-full min-h-[480px] lg:min-h-0 rounded-[32px] overflow-hidden border border-white/5 bg-[#0f0f0f] p-8 md:p-10 flex flex-col justify-between shadow-2xl">
              
              {/* Card Glow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
              
              {/* Graphic Grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

              {/* Text Area */}
              <div className="relative z-20 space-y-6 max-w-[70%] md:max-w-[60%] lg:max-w-[65%]">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-orange-400">
                    The Softree Advantage
                  </span>
                  <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mt-2 leading-tight">
                    Why Enterprises Partner With Us
                  </h2>
                </div>
                <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                  We combine certified Microsoft ecosystem development with custom AI engineering to deliver secure, high-performing digital systems. No middle layers—just transparent, milestone-driven delivery led by senior engineers who build for reliability.
                </p>
              </div>

              {/* Faded AI Robot Image Placement */}
              <div className="absolute right-0 bottom-0 top-0 w-1/2 overflow-hidden pointer-events-none flex items-end justify-end">
                <div className="relative w-full h-[85%] flex items-end justify-end">
                  {/* Subtle fade gradient overlay matching the solid card background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent z-10" />
                  
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/whysoftree/why-softree-ai-robot.png" 
                    alt="Softree AI Intelligence" 
                    className="object-cover object-left h-full w-[130%] opacity-90 scale-105 select-none"
                  />
                </div>
              </div>

              {/* Bottom tag */}
              <div className="relative z-10 mt-8 pt-4 border-t border-neutral-800/40">
                <p className="text-[10px] uppercase tracking-wider text-orange-400 font-mono">
                  Engineered for Reliability
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Step Accodions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative pl-6 md:pl-10 space-y-4">
              
              {/* Connected Line Background */}
              <div 
                className="absolute left-[55px] top-10 bottom-10 w-[2px] pointer-events-none opacity-40" 
                style={{
                  backgroundImage: "linear-gradient(to bottom, #ff7a2f 0%, #1852FF 50%, #8B5CF6 100%)",
                  backgroundSize: "2px 6px",
                  backgroundRepeat: "repeat-y"
                }}
              />

              {STEPS.map((step) => {
                const isActive = activeStep === step.id
                const StepIcon = step.icon

                return (
                  <div 
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`group relative flex gap-4 md:gap-6 items-start rounded-2xl p-4 transition-all duration-300 cursor-pointer select-none border ${
                      isActive 
                        ? "bg-neutral-900/60 border-neutral-800 shadow-lg" 
                        : "bg-transparent border-transparent hover:bg-neutral-900/20"
                    }`}
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
                          color: isActive ? "#ffffff" : "rgb(115, 115, 115)"
                        }}
                      >
                        {step.num}
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
