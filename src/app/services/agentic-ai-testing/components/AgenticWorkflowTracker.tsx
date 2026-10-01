"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Compass, BrainCircuit, Wrench, Play, Eye, RotateCcw,
  Target, TrendingUp, Network, CalendarX,
  MessageSquareWarning, Ghost, DatabaseZap, Bug,
  PenTool, ShieldAlert, ZapOff, Puzzle,
  Hourglass, FileCode, AlertOctagon, Activity,
  FileQuestion, SearchX, ShieldOff, Split,
  RefreshCcw, Repeat, Link2Off, ArrowDownCircle, ArrowRight
} from "lucide-react";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

type VectorItem = {
  title: string;
  icon: React.ElementType;
  color: "rose" | "blue" | "emerald" | "purple";
};

type WorkflowNode = {
  id: string;
  label: string;
  icon: React.ElementType;
  imageSrc: string;
  description: string;
  vectors: VectorItem[];
};

const nodes: WorkflowNode[] = [
  {
    id: "plan",
    label: "Plan",
    icon: Compass,
    imageSrc: "/images/ai-development-service/whysoftree-4.png",
    description: "We evaluate how the agent breaks down the user goal, identifying strategic misalignment, goal drift, and poor task decomposition before execution.",
    vectors: [
      { title: "Strategic misalignment", icon: Target, color: "rose" },
      { title: "Goal drift", icon: TrendingUp, color: "blue" },
      { title: "Poor task decomposition", icon: Network, color: "emerald" },
      { title: "Infeasible planning", icon: CalendarX, color: "purple" }
    ],
  },
  {
    id: "reason",
    label: "Reason",
    icon: BrainCircuit,
    imageSrc: "/images/ai-development-service/agenticAi-7.png",
    description: "We validate the agent's logic steps, testing for hallucination, context loss, and memory issues during the critical reasoning phase.",
    vectors: [
      { title: "Agent hallucination", icon: Ghost, color: "rose" },
      { title: "Context loss", icon: MessageSquareWarning, color: "blue" },
      { title: "Memory issues", icon: DatabaseZap, color: "emerald" },
      { title: "Flawed logic steps", icon: Bug, color: "purple" }
    ],
  },
  {
    id: "select-tool",
    label: "Select Tool",
    icon: Wrench,
    imageSrc: "/images/ai-development-service/agenticAi-1.png",
    description: "We ensure the agent selects the correct tools securely, preventing unauthorized actions, missing arguments, and API failures.",
    vectors: [
      { title: "Incorrect tool selection", icon: PenTool, color: "rose" },
      { title: "Unauthorized actions", icon: ShieldAlert, color: "blue" },
      { title: "API failures", icon: ZapOff, color: "emerald" },
      { title: "Missing arguments", icon: Puzzle, color: "purple" }
    ],
  },
  {
    id: "execute",
    label: "Execute",
    icon: Play,
    imageSrc: "/images/ai-development-service/agenticAi-2.png",
    description: "We monitor the execution phase for timeouts, malformed payloads, system crashes, and unintended side effects across integrations.",
    vectors: [
      { title: "Execution timeout", icon: Hourglass, color: "rose" },
      { title: "Malformed payload", icon: FileCode, color: "blue" },
      { title: "System crash", icon: AlertOctagon, color: "emerald" },
      { title: "Side-effect anomalies", icon: Activity, color: "purple" }
    ],
  },
  {
    id: "observe",
    label: "Observe",
    icon: Eye,
    imageSrc: "/images/ai-development-service/agenticAi-3.png",
    description: "We test the agent's ability to parse output and identify errors, ensuring no blind spots or state mismatches occur.",
    vectors: [
      { title: "Failure to parse output", icon: FileQuestion, color: "rose" },
      { title: "Blind spots in validation", icon: SearchX, color: "blue" },
      { title: "Ignored errors", icon: ShieldOff, color: "emerald" },
      { title: "State mismatch", icon: Split, color: "purple" }
    ],
  },
  {
    id: "recover",
    label: "Recover",
    icon: RotateCcw,
    imageSrc: "/images/ai-consulting-service-image/industries/ind-2.png",
    description: "We validate the agent's fallback mechanisms, preventing infinite loops, repeated failures, and inability to self-correct.",
    vectors: [
      { title: "Infinite loops", icon: RefreshCcw, color: "rose" },
      { title: "Repeated failures", icon: Repeat, color: "blue" },
      { title: "Inability to self-correct", icon: Link2Off, color: "emerald" },
      { title: "Fallback breakdown", icon: ArrowDownCircle, color: "purple" }
    ],
  },
];


export const AgenticWorkflowTracker: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>(nodes[0].id as string);
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-cycle through phases every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNode((current) => {
        const currentIndex = nodes.findIndex((n) => n.id === current);
        const nextIndex = (currentIndex + 1) % nodes.length;
        return nodes[nextIndex].id;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [activeNode]);

  // GSAP Animation when node changes
  useEffect(() => {
    if (contentRef.current) {
      gsap.killTweensOf(contentRef.current);
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [activeNode]);

  const activeContent = nodes.find((n) => n.id === activeNode);
  const activeIndex = nodes.findIndex((n) => n.id === activeNode);

  return (
    <section className="w-full py-24 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 flex justify-center overflow-hidden">
      <div className="w-full max-w-7xl px-4 md:px-8">

        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <span className={cn("inline-block px-6 py-2.5 bg-white rounded-full text-[#FF6B2C] border border-zinc-200/80 shadow-sm", typography.caption.default)}>
              AGENT TRACKING
            </span>
          </div>
          <h2 className={cn("text-slate-900 mb-4", typography.heading.h2)}>
            Agentic Workflow Vulnerabilities
          </h2>
          <p className={cn("text-slate-500 max-w-2xl mx-auto", typography.description.default)}>
            Agents operate autonomously in loops. We intercept and test their thought process across every step of their execution chain.
          </p>
        </div>

        {/* Stepper / Timeline UI */}
        <div className="mb-16 max-w-5xl mx-auto px-4 sm:px-8">

          <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-0">
            {/* Horizontal Line Background (Desktop) */}
            <div className="absolute top-6 left-[8.33%] right-[8.33%] h-[2px] bg-zinc-300 hidden md:block" />
            {nodes.map((node, index) => {
              const isActive = activeNode === node.id;
              const Icon = node.icon;

              return (
                <div key={node.id} className="relative flex flex-col items-center flex-1 z-10 w-full md:w-auto">
                  {/* Vertical Line for mobile */}
                  {index !== nodes.length - 1 && (
                    <div className="absolute top-12 left-1/2 w-[2px] h-full bg-zinc-300 -translate-x-1/2 block md:hidden" />
                  )}

                  <button
                    onClick={() => setActiveNode(node.id as string)}
                    className={`flex items-center justify-center w-12 h-12 rounded-full border mb-3 transition-all duration-300 relative ${isActive
                      ? "bg-[#FF6B2C] text-white ring-4 ring-orange-100 border-[#FF6B2C] shadow-md"
                      : "bg-zinc-100 text-zinc-500 border-zinc-200 hover:bg-zinc-200"
                      }`}
                  >

                  </button>
                  <span className={`text-sm font-semibold tracking-tight transition-colors text-center ${isActive ? "text-[#FF6B2C]" : "text-slate-500"
                    }`}>
                    {node.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Content Box */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {activeContent && (
            <div
              ref={contentRef}
              className="w-full relative"
            >

              <div className="w-full relative bg-gradient-to-br from-white to-zinc-50/80 rounded-[2rem] p-6 md:p-8 shadow-sm flex flex-col lg:flex-row items-stretch gap-8 lg:gap-10 border border-zinc-100">

                {/* Left Side: Content */}
                <div className="w-full lg:w-1/2 flex flex-col gap-5 items-start justify-center py-2">

                  {/* Eyebrow */}
                  <div className="flex items-center gap-3 text-[#FF6B2C] uppercase tracking-widest font-bold">
                    <span className="text-xs opacity-80">PHASE 0{activeIndex + 1}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="flex flex-col gap-3">
                    <h3 className={cn("text-[#FF6B2C] uppercase", typography.heading.h3)}>
                      {activeContent.label} PHASE
                    </h3>
                    <p className={cn("text-[#0B1221]", typography.heading.h4)}>
                      Common failure modes <br className="hidden md:block" /> we validate against.
                    </p>
                  </div>

                  {/* Paragraph */}
                  <p className={cn("text-zinc-500 max-w-lg", typography.body.default)}>
                    {activeContent.description}
                  </p>

                  {/* Pills */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {activeContent.vectors.map((vector, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200/60 text-zinc-600 text-[12px] font-bold uppercase tracking-widest transition-colors hover:bg-zinc-200"
                      >
                        {vector.title}
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <button className="mt-4 bg-[#FF6B2C] hover:bg-[#E85D25] transition-colors text-white px-6 py-3 rounded-full font-bold flex items-center gap-3 shadow-lg shadow-orange-500/20 group">
                    Start a Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Right Side: Image */}
                <div className="w-full lg:w-1/2 relative rounded-[1.5rem] overflow-hidden bg-zinc-100/50 shadow-sm aspect-video lg:aspect-auto">
                  <img
                    src={activeContent.imageSrc}
                    alt={activeContent.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
};
