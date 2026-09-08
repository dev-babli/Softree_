"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Plus, Cpu, Sparkles, Terminal } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom Text Scramble Effect (Clean React + GSAP implementation, zero paid dependencies)
interface ScrambleTextProps {
  text: string;
  trigger?: "hover" | "scroll" | "load";
  className?: string;
}

export function ScrambleText({ text, trigger = "hover", className = "" }: ScrambleTextProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState(text);
  const isRunning = useRef(false);
  
  const chars = " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

  const runScramble = () => {
    if (isRunning.current) return;
    isRunning.current = true;
    
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
        isRunning.current = false;
        setDisplayText(text);
      }
      iterations += 1 / 2; // Scramble speed factor
    }, 25);
  };

  useEffect(() => {
    if (trigger === "load") {
      runScramble();
    } else if (trigger === "scroll" && elementRef.current) {
      ScrollTrigger.create({
        trigger: elementRef.current,
        start: "top 85%",
        onEnter: () => runScramble(),
      });
    }
  }, [text, trigger]);

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      runScramble();
    }
  };

  return (
    <span
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      className={`font-mono ${className}`}
      style={{ display: "inline-block" }}
    >
      {displayText}
    </span>
  );
}

// Custom Text Reveal Component (Scroll-driven word reveal, zero paid dependencies)
interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, className = "", delay = 0 }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const words = containerRef.current.querySelectorAll(".reveal-word-inner");
    gsap.set(words, { y: "100%" });

    gsap.to(words, {
      y: "0%",
      duration: 0.95,
      ease: "power4.out",
      stagger: 0.025,
      delay,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: containerRef });

  const wordList = children.split(" ");

  return (
    <div ref={containerRef} className={`flex flex-wrap overflow-hidden py-1 ${className}`}>
      {wordList.map((word, idx) => (
        <span key={idx} className="relative inline-flex overflow-hidden mr-3 mb-1">
          <span className="reveal-word-inner inline-block transform will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </div>
  );
}

// Interactive GSAP Accordion Component
interface AccordionItem {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ReactNode;
}

const accordionData: AccordionItem[] = [
  {
    id: "llm-ops",
    title: "Enterprise LLMOps & Fine-Tuning",
    subtitle: "PHASE 01 · MODEL OPTIMIZATION",
    desc: "We adapt foundation open-source models (Llama 3, Qwen, Mistral) and proprietary endpoints (Azure OpenAI) using domain-specific telemetry. Setup model guards, quantization pipelines, and scalable hosting architecture.",
    icon: <Cpu className="w-5 h-5 text-[#FF5812]" />,
  },
  {
    id: "rag-agents",
    title: "Multi-Agent & RAG Systems",
    subtitle: "PHASE 02 · ORCHESTRATION LAYER",
    desc: "Autonomous workflow agents utilizing LangGraph and LangChain for complex tasks. Integrated with dense vector retrieval (Pinecone, Qdrant) and hybrid semantic search to eliminate hallucination vectors.",
    icon: <Sparkles className="w-5 h-5 text-[#FF5812]" />,
  },
  {
    id: "cognitive-pipelines",
    title: "Cognitive Document Automation",
    subtitle: "PHASE 03 · INGESTION & PARSING",
    desc: "Structure dark data from PDFs, legacy logs, and database schemas automatically. Integrated classification, entity extractors, and automated mapping to downstream APIs.",
    icon: <Terminal className="w-5 h-5 text-[#FF5812]" />,
  },
];

export default function AnnnimateStarterPack() {
  const [openId, setOpenId] = useState<string | null>("llm-ops");
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Animate item content expansion
    accordionData.forEach((item) => {
      const element = document.getElementById(`content-${item.id}`);
      if (!element) return;
      
      const isOpen = openId === item.id;
      gsap.to(element, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.45,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    });
  }, { scope: containerRef, dependencies: [openId] });

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-20 bg-[#FBF9F6] border-y border-zinc-200 overflow-hidden font-sans"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-radial from-orange-500/5 to-transparent rounded-full pointer-events-none blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-radial from-orange-500/5 to-transparent rounded-full pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#FF5812] bg-[#FF5812]/10 uppercase mb-4">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            Motion Showcase
          </span>
          
          {/* TextReveal Header */}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#121417] leading-tight tracking-tight">
            <TextReveal>Engineered Offshore AI Teams Ready to Ship.</TextReveal>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
            Interact with our animated starter pack modules demonstrating premium B2B visuals, scroll-driven typography, and custom micro-interactions.
          </p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {accordionData.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? "border-[#FF5812]/30 bg-white shadow-xl shadow-orange-500/5" 
                      : "border-zinc-200 bg-transparent hover:border-zinc-300"
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full text-left p-6 sm:p-8 flex items-start gap-4 focus:outline-none"
                  >
                    <div className={`p-3 rounded-xl transition-colors duration-300 ${
                      isOpen ? "bg-[#FF5812]/10" : "bg-zinc-100 group-hover:bg-zinc-200"
                    }`}>
                      {item.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <span className="block text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-1">
                        {item.subtitle}
                      </span>
                      <h3 className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                        isOpen ? "text-[#121417]" : "text-zinc-700 group-hover:text-[#121417]"
                      }`}>
                        {item.title}
                      </h3>
                    </div>

                    <div className={`p-1.5 rounded-full border transition-all duration-300 ${
                      isOpen 
                        ? "border-[#FF5812] bg-[#FF5812] text-white rotate-45" 
                        : "border-zinc-200 text-zinc-400 group-hover:border-zinc-300"
                    }`}>
                      <Plus className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Expandable Content Container */}
                  <div
                    id={`content-${item.id}`}
                    className="overflow-hidden h-0"
                    style={{ opacity: 0 }}
                  >
                    <div className="px-6 pb-6 sm:px-8 sm:pb-8 pl-16 sm:pl-20 border-t border-zinc-100/50 pt-4">
                      <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                        {item.desc}
                      </p>
                      
                      <div className="mt-6 flex flex-wrap gap-4">
                        <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5812] hover:text-[#c84c16] transition-colors">
                          <span>Build this capability</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Code & Scramble Visualizer Card */}
          <div className="lg:col-span-5 bg-[#121417] rounded-3xl p-6 sm:p-8 text-zinc-300 border border-zinc-800 shadow-2xl relative overflow-hidden group">
            {/* Specular overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
                interactive_sandbox.js
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <span className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">
                  // Hover to trigger scramble
                </span>
                <div className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight cursor-default">
                  <ScrambleText text="INTELLIGENT AGENTS" trigger="hover" className="text-[#FF5812]" />
                </div>
              </div>

              <div>
                <span className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">
                  // Scroll-driven bloom trigger
                </span>
                <div className="text-base sm:text-lg font-mono font-medium text-zinc-400">
                  <ScrambleText text="SYSTEM_DIAGNOSIS: SUCCESS" trigger="scroll" className="text-emerald-400" />
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[#FF5812] select-none">&gt;</span>
                  <p className="font-mono text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    Deploying models directly on custom Kubernetes runtime clusters with hot-swapping enabled.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="font-mono text-[#FF5812] select-none">&gt;</span>
                  <p className="font-mono text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    Connecting agent networks with local semantic indexing pools. Zero leaks, encrypted channels.
                  </p>
                </div>
              </div>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#FF5812] hover:bg-[#c84c16] text-white font-bold text-sm transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-orange-500/10">
                  <span>Start AI Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/services/ai-development-services/curtain-slider" className="inline-flex items-center justify-center gap-2 p-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 font-bold text-sm transition-all duration-300 hover:scale-[1.02] shadow-lg">
                  <span>Curtain Slider Demo</span>
                  <Sparkles className="w-4 h-4 text-[#FF5812]" />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
