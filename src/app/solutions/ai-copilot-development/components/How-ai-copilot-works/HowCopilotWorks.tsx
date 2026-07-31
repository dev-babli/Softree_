"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import {
  MessageSquare,
  MessageCircle,
  Globe,
  Mic,
  Brain,
  Sparkles,
  BrainCircuit,
  List,
  Database,
  BookOpen,
  Cloud,
  Cpu,
  Wand2,
  ShieldCheck,
  Award,
  ListChecks,
  Zap,
  Share2,
  CheckCircle,
  ArrowRight,
  ArrowDown
} from "lucide-react";

/* =====================================================================
   DATA
   ===================================================================== */
const workflowSteps = [
  {
    step: "01",
    title: "Receive Query",
    description: "The user asks a question or requests assistance through the copilot interface.",
    icon: <MessageSquare className="w-10 h-10 text-[#FF5812]" strokeWidth={1.5} />,
    features: [
      { icon: <MessageCircle className="w-4 h-4" />, text: "Microsoft 365 Chat" },
      { icon: <Globe className="w-4 h-4" />, text: "Web / Teams / App" },
      { icon: <Mic className="w-4 h-4" />, text: "Voice / Mobile" },
    ],
  },
  {
    step: "02",
    title: "Understand Intent",
    description: "AI Copilot analyzes the query using NLP and identifies the intent and required information.",
    icon: <Brain className="w-10 h-10 text-[#FF5812]" strokeWidth={1.5} />,
    features: [
      { icon: <Sparkles className="w-4 h-4" />, text: "Natural Language Processing" },
      { icon: <BrainCircuit className="w-4 h-4" />, text: "Intent Detection" },
      { icon: <List className="w-4 h-4" />, text: "Context Awareness" },
    ],
  },
  {
    step: "03",
    title: "Retrieve Knowledge",
    description: "Relevant information is retrieved from enterprise systems, knowledge bases, and data sources.",
    icon: <Database className="w-10 h-10 text-[#FF5812]" strokeWidth={1.5} />,
    features: [
      { icon: <Database className="w-4 h-4" />, text: "Enterprise Data" },
      { icon: <BookOpen className="w-4 h-4" />, text: "Knowledge Base" },
      { icon: <Cloud className="w-4 h-4" />, text: "APIs & Connectors" },
    ],
  },
  {
    step: "04",
    title: "Generate Response",
    description: "AI models synthesize the information and generate an accurate, contextual, and secure response.",
    icon: <Cpu className="w-10 h-10 text-[#FF5812]" strokeWidth={1.5} />,
    features: [
      { icon: <Sparkles className="w-4 h-4" />, text: "LLM / Foundation Models" },
      { icon: <Wand2 className="w-4 h-4" />, text: "Prompt Engineering" },
      { icon: <Award className="w-4 h-4" />, text: "Response Validation" },
    ],
  },
  {
    step: "05",
    title: "Execute Action",
    description: "The copilot can perform actions across systems to complete tasks and deliver outcomes.",
    icon: <ListChecks className="w-10 h-10 text-[#FF5812]" strokeWidth={1.5} />,
    features: [
      { icon: <Zap className="w-4 h-4" />, text: "Workflow Automation" },
      { icon: <Share2 className="w-4 h-4" />, text: "System Integrations" },
      { icon: <CheckCircle className="w-4 h-4" />, text: "Task Completion" },
    ],
  },
];

/* =====================================================================
   ANIMATION VARIANTS
   ===================================================================== */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeDownVariant: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* =====================================================================
   COMPONENT
   ===================================================================== */
export function HowCopilotWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 overflow-hidden font-sans bg-gradient-to-b from-zinc-50 via-white to-zinc-50"
    >

      <div className="relative z-10 max-w-[1500px] mx-auto px-4 md:px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center"
        >
          {/* ================= HEADER ================= */}
          <motion.div variants={fadeDownVariant} className="text-center mb-20 max-w-4xl mx-auto">
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
              <span className="text-[#FF5812] font-bold tracking-[0.2em] text-sm uppercase">HOW IT WORKS</span>
              <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
                <div className="absolute right-0 w-2 h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
              How <span className="text-[#FF6B00]">AI Copilot</span> Works
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed mx-auto">
              A seamless enterprise AI workflow that transforms user queries into intelligent responses and automated business actions using AI models, enterprise knowledge, Microsoft technologies, and workflow automation.
            </p>
          </motion.div>

          {/* ================= WORKFLOW CARDS ================= */}
          <div className="relative w-full flex flex-col lg:flex-row gap-8 lg:gap-4 xl:gap-6 justify-center mt-6">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={cardVariant}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative flex-1 w-full max-w-md mx-auto lg:max-w-none group"
              >
                {/* 
                  CARD CONTAINER 
                */}
                <div className="relative bg-white border border-transparent rounded-[32px] p-6 lg:p-7 pt-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(255,107,0,0.1)] transition-all duration-300 h-full flex flex-col group-hover:border-transparent z-10">
                  
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-[32px] pointer-events-none overflow-hidden z-20">
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <rect
                        width="100%"
                        height="100%"
                        rx="32"
                        ry="32"
                        fill="none"
                        stroke="rgba(255, 90, 31, 0.15)"
                        strokeWidth="2"
                      />
                      <motion.rect
                        width="100%"
                        height="100%"
                        rx="32"
                        ry="32"
                        fill="none"
                        stroke="#FF5A1F"
                        strokeWidth="2"
                        strokeDasharray="150 2500"
                        animate={{ strokeDashoffset: [0, -2650] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                        className="opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          filter: "drop-shadow(0 0 6px rgba(255, 90, 31, 0.6))"
                        }}
                      />
                    </svg>
                  </div>
                  
                  {/* Number Badge */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-[#FF5812] text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-[#FF5812]/30 relative"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {step.step}
                    </motion.div>
                  </div>

                  {/* Icon Block */}
                  <div className="relative mx-auto mb-6 w-24 h-24 lg:w-28 lg:h-28 rounded-3xl bg-gradient-to-br from-orange-50/80 to-white border border-orange-100 shadow-sm flex items-center justify-center overflow-hidden group-hover:shadow-md transition-shadow">
                    <div className="absolute inset-0 bg-[#FF5812] opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-300" />
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                      className="relative z-10"
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  {/* Text Content */}
                  <div className="text-center flex-1">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-gray-100 mb-6" />

                  {/* Bottom Features */}
                  <ul className="space-y-4">
                    {step.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-[13px] text-gray-600 font-medium">
                        <div className="text-orange-500 opacity-80 shrink-0">
                          {feature.icon}
                        </div>
                        <span className="leading-tight text-left">{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* 
                  CONNECTOR ARROW (Desktop only - absolute right) 
                */}
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:flex absolute top-[110px] -right-2 xl:-right-3 translate-x-1/2 z-10 items-center justify-center pointer-events-none">
                    
                    {/* Glowing Trail Line */}
                    <motion.div 
                      className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-12 xl:w-16 h-px"
                      style={{
                        background: "linear-gradient(90deg, rgba(255,88,18,0) 0%, rgba(255,88,18,0.5) 50%, rgba(255,88,18,0) 100%)"
                      }}
                      animate={{
                        x: ['-50%', '50%'],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 0.3
                      }}
                    />

                    {/* Circular Arrow Badge */}
                    <motion.div 
                      className="relative z-10 w-8 h-8 rounded-full bg-white border border-orange-100 shadow-sm flex items-center justify-center text-[#FF5812]"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                )}

                {/* 
                  CONNECTOR ARROW (Mobile only - absolute bottom) 
                */}
                {index < workflowSteps.length - 1 && (
                  <div className="lg:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 translate-y-1/2 z-10 flex items-center justify-center pointer-events-none">
                    <motion.div 
                      className="relative z-10 w-8 h-8 rounded-full bg-white border border-orange-100 shadow-sm flex items-center justify-center text-[#FF5812]"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
