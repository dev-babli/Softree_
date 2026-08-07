"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Shield, Database, Sparkles, Code, Eye, Workflow, GitBranch, Users, Sliders, Play, Search } from "lucide-react";
import SectionBadge from "./SectionBadge";

const PORTFOLIO_DATA = [
  {
    index: "01 - 06",
    tabLabel: "Graph Architecture",
    title: "Production Stateful Graph Architectures",
    description: "Design robust, cycle-aware graphs using LangGraph with nodes, edges, conditional routing, and thread-level state memory.",
    icon: GitBranch,
    accordions: [
      {
        id: "01",
        title: "Cycles & Conditional Routing",
        content: "Model complex business processes as cyclic graphs where agents query, evaluate, and self-correct outputs in loops."
      },
      {
        id: "02",
        title: "Durable Thread Memory",
        content: "Persist execution state across steps, allowing long-running tasks to survive server cold starts and system interruptions."
      },
      {
        id: "03",
        title: "Custom Graph State Schema",
        content: "Design structured schema states that variables pass between nodes, guaranteeing complete type safety."
      }
    ]
  },
  {
    index: "02 - 06",
    tabLabel: "Multi-Agent Teams",
    title: "Coordinated Multi-Agent Orchestration",
    description: "Deploy specialized agent networks where sub-graphs delegate tasks to task-scoped agents under supervisor oversight.",
    icon: Users,
    accordions: [
      {
        id: "01",
        title: "Supervisor Agent Patterns",
        content: "Design centralized router agents that coordinate, distribute task payloads, and gather outputs from specialized sub-agents."
      },
      {
        id: "02",
        title: "Hierarchical Agent Teams",
        content: "Orchestrate nested sub-graphs where teams of developers, researchers, and editors collaborate on dedicated scopes."
      },
      {
        id: "03",
        title: "Autonomous Payload Handoffs",
        content: "Manage seamless data transfer between agents, ensuring context remains clean and focused across delegations."
      }
    ]
  },
  {
    index: "03 - 06",
    tabLabel: "Human-in-the-Loop",
    title: "Human-in-the-Loop Approvals & Gates",
    description: "Build validation check gates directly into graph transitions, requiring human sign-off before executing high-risk operations.",
    icon: Sliders,
    accordions: [
      {
        id: "01",
        title: "Interactive State Interruption",
        content: "Interrupt graph executions automatically at critical nodes (e.g., executing DB transactions or sending client emails)."
      },
      {
        id: "02",
        title: "Manual Payload Overrides",
        content: "Allow supervisors to modify the current graph state memory variables directly in the dashboard before resuming."
      },
      {
        id: "03",
        title: "Time-Travel Debugging",
        content: "Replay, fork, or rewind agent state trajectories to audit, debug, and fix failures in historical runs."
      }
    ]
  },
  {
    index: "04 - 06",
    tabLabel: "Secure Tool Kits",
    title: "Least-Privilege Tool Execution",
    description: "Equip graph runtimes with granular, isolated tools that safely interact with databases, legacy systems, and corporate APIs.",
    icon: Code,
    accordions: [
      {
        id: "01",
        title: "Scoped Credential Sandboxing",
        content: "Restrict tool scopes and handle API tokens with strict encryption, preventing prompt injection bypass attempts."
      },
      {
        id: "02",
        title: "Pydantic State Validation",
        content: "Enforce strict JSON schemas on inputs and outputs for every tool, preventing model-generated payload corruption."
      },
      {
        id: "03",
        title: "Rate-Limit & Error Failovers",
        content: "Integrate robust error boundaries and automatic back-offs for third-party API tool calls."
      }
    ]
  },
  {
    index: "05 - 06",
    tabLabel: "State & Streaming",
    title: "Persistent Session Memory & Streaming",
    description: "Deliver real-time responses with chunked token streaming while maintaining persistent long-term cross-session memory.",
    icon: Play,
    accordions: [
      {
        id: "01",
        title: "Real-Time Node Streaming",
        content: "Stream token chunks and intermediate graph node updates instantly to the user interface, optimizing UX responsiveness."
      },
      {
        id: "02",
        title: "Episodic vs Semantic Memory",
        content: "Maintain immediate thread state (episodic) and long-term user preferences (semantic) across different execution sessions."
      },
      {
        id: "03",
        title: "Token-Efficient Pruning",
        content: "Dynamically prune redundant chat histories to minimize context size and contain LLM transaction costs."
      }
    ]
  },
  {
    index: "06 - 06",
    tabLabel: "Observability & Evals",
    title: "Observability & Golden Dataset Evals",
    description: "Trace every node execution step in LangSmith and run continuous regression testing against golden datasets.",
    icon: Eye,
    accordions: [
      {
        id: "01",
        title: "LangSmith Execution Tracing",
        content: "Inspect prompt variables, latencies, model parameters, and raw JSON payloads for all active agent runtimes."
      },
      {
        id: "02",
        title: "Golden Set Regression Evals",
        content: "Test graph changes against curated dataset suites in your CI/CD pipelines to guard against accuracy regressions."
      },
      {
        id: "03",
        title: "Cost & Latency Attribution",
        content: "Track micro-costs, token usage, and latency metrics per node to identify processing bottlenecks."
      }
    ]
  }
];

export default function LangGraphPortfolio() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const currentTab = PORTFOLIO_DATA[activeTab];
  const IconComponent = currentTab.icon;

  return (
    <section className="relative w-full py-16 md:py-24 bg-transparent overflow-hidden font-sans">
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
          <SectionBadge text="PORTFOLIO OF SERVICES" variant="line" />
          <h2 className="mt-4 text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-[#111827] mb-3 md:mb-4 tracking-tight text-center leading-tight">
            Choose from Our Time-Tested Portfolio of <span className="text-[#FF5812]">LangGraph Services</span>
          </h2>
          <p className="text-[15px] lg:text-base text-[#6B7280] text-center max-w-2xl mx-auto leading-relaxed">
            Resilient agentic pipelines built using stateful graph orchestration, collaborative multi-agent teams, and human-in-the-loop validation check gates.
          </p>
        </div>

        {/* Card Component */}
        <div className="mx-auto max-w-7xl rounded-3xl border border-zinc-200/60 bg-zinc-950 overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[520px]">
          
          {/* Left Column */}
          <div className="relative w-full md:w-[38%] bg-gradient-to-br from-[#FF6B00] via-[#FF5812] to-[#E64C00] p-8 md:p-10 flex flex-col justify-between text-white overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_70%)] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col gap-10 h-full justify-between">
              <div>
                <span className="text-[11px] font-bold tracking-[0.25em] text-white/80 uppercase">
                  {currentTab.index}
                </span>
              </div>

              <div className="flex flex-col gap-6 my-auto">
                {PORTFOLIO_DATA.map((item, idx) => {
                  const isActive = idx === activeTab;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveTab(idx);
                        setActiveAccordion(0);
                      }}
                      className={`text-left transition-all duration-300 focus:outline-none ${
                        isActive 
                          ? "text-white font-extrabold text-lg md:text-xl translate-x-2" 
                          : "text-white/60 hover:text-white/90 hover:translate-x-1 text-base md:text-lg"
                      }`}
                    >
                      {item.tabLabel}
                    </button>
                  );
                })}
              </div>

              <div className="hidden md:block">
                <span className="text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase">SOFTREE LANGGRAPH SOLUTIONS</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-[62%] bg-[#0B0F19] p-8 md:p-12 flex flex-col justify-between text-zinc-100 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,88,18,0.03),transparent_50%)] pointer-events-none" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex justify-between items-start gap-4 mb-6">
                <div className="min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
                    {currentTab.title}
                  </h3>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF5812]/10 to-[#FF6B00]/20 border border-[#FF5812]/20 text-[#FF5812] shadow-[0_8px_20px_-6px_rgba(255,88,18,0.3)]">
                  <IconComponent size={22} strokeWidth={1.5} />
                </div>
              </div>

              {/* Description */}
              <p className="text-[14px] leading-relaxed text-zinc-400 mb-8 max-w-xl">
                {currentTab.description}
              </p>

              {/* Accordion list */}
              <div className="flex flex-col gap-4">
                {currentTab.accordions.map((acc, index) => {
                  const isAccOpen = activeAccordion === index;
                  return (
                    <div 
                      key={index}
                      className="border-b border-zinc-800/80 pb-4 transition-colors duration-200"
                    >
                      <button
                        onClick={() => setActiveAccordion(isAccOpen ? null : index)}
                        className="flex w-full items-center justify-between text-left text-[14px] sm:text-[15px] font-semibold text-white hover:text-[#FF5812] transition-colors py-2 focus:outline-none"
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-[#FF5812] font-mono text-sm">{acc.id}.</span>
                          <span>{acc.title}</span>
                        </span>
                        <ChevronDown 
                          size={18} 
                          className={`text-zinc-500 transition-transform duration-300 ${isAccOpen ? 'rotate-180 text-[#FF5812]' : ''}`} 
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isAccOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="text-[13px] leading-relaxed text-zinc-400 pt-2 pl-8 pr-4">
                              {acc.content}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
