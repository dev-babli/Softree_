"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass, Cpu, RefreshCw, Terminal } from "lucide-react";

const steps = [
  {
    id: "understand",
    title: "1. Understand",
    desc: "AI connects to your unstructured data lakes and APIs to build context.",
    icon: Search,
  },
  {
    id: "plan",
    title: "2. Plan",
    desc: "Agents formulate multi-step strategies using chain-of-thought reasoning.",
    icon: Compass,
  },
  {
    id: "execute",
    title: "3. Execute",
    desc: "Autonomous actions are taken across your existing software stack.",
    icon: Cpu,
  },
  {
    id: "improve",
    title: "4. Improve",
    desc: "Continuous learning loop refines accuracy based on human feedback.",
    icon: RefreshCw,
  },
];

export function InteractiveStepper() {
  const [activeStep, setActiveStep] = useState(steps[0].id);
  const activeIndex = steps.findIndex((step) => step.id === activeStep);

  return (
    <section className="bg-linear-to-b from-zinc-50 via-white to-zinc-50 py-8 lg:py-12">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200/50 bg-orange-50/50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812] animate-pulse" />
            How AI Helps
          </div>
          <h2 className="section-h2 text-center text-[#0a0a1a]">
            How Softree{" "}
            <span className="bg-linear-to-r from-[#FF5812] to-[#FF7A2F] bg-clip-text text-transparent font-bold">
              AI Works
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#0a0a1a]/70">
            A connected AI workspace that understands context, plans actions,
            executes across tools, and improves continuously.
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.10)]">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#FF6B00] text-white shadow-[0_8px_18px_rgba(255,107,0,0.25)]">
                <Cpu className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0a0a1a]">Softree AI Workspace</p>
                <p className="text-xs text-[#0a0a1a]/45">Enterprise agent orchestration</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
                Step {activeIndex + 1} of {steps.length}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                Live
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 p-4 sm:p-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          
          {/* Left Side: Stepper List */}
          <div className="flex flex-col justify-between gap-4 h-full bg-linear-to-b from-zinc-950 via-[#1c0b02] to-zinc-950 border border-orange-950/40 rounded-3xl p-4 sm:p-5">
            <div className="flex flex-col gap-2">
              {steps.map((step) => {
                const isActive = activeStep === step.id;
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    onMouseEnter={() => setActiveStep(step.id)}
                    className={`relative flex cursor-pointer items-start gap-4 overflow-hidden rounded-2xl border p-4 transition-all duration-300 ${
                      isActive 
                        ? "border-[#FF5812]/50 bg-white/5 shadow-[0_10px_25px_rgba(255,88,18,0.15)]" 
                        : "border-transparent bg-transparent opacity-75 hover:bg-white/5 hover:opacity-100"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-step-edge"
                        className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-[#FF5812]"
                      />
                    )}
                    <div className={`shrink-0 rounded-xl p-2.5 transition-colors ${
                      isActive ? "bg-[#FF5812] text-white" : "bg-zinc-800 text-zinc-400"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className={`text-sm font-semibold transition-colors ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                        {step.title}
                      </h3>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-xs text-zinc-300/80 mt-1.5 overflow-hidden"
                          >
                            {step.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* System Status Panel */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-zinc-400">
                    System Operations
                  </span>
                </div>
                <span className="text-[10px] rounded-md bg-emerald-950 px-1.5 py-0.5 font-bold text-emerald-400">
                  Active
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-zinc-400/80">
                <div className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#FF5812]" />
                  Azure Security Vault
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#FF5812]" />
                  SOC2 Type II compliant
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#FF5812]" />
                  System Latency: ~140ms
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#FF5812]" />
                  Model: GPT-4o Enterprise
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Dark Visualizer Window */}
          <div className="relative flex min-h-[350px] flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            {/* Window Header */}
            <div className="mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <div className="ml-4 flex items-center gap-2 font-mono text-xs text-slate-500">
                <Terminal className="h-4 w-4" /> agent-console / {activeStep}
              </div>
              <span className="ml-auto rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">
                Production
              </span>
            </div>

            {/* Visualizer Content */}
            <div className="flex-1 relative flex items-center justify-center">
              <AnimatePresence mode="wait">
                {activeStep === "understand" && (
                  <motion.div
                    key="understand"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center gap-4 text-emerald-400 font-mono text-sm w-full"
                  >
                    <Search className="h-12 w-12 text-emerald-400 mb-2 animate-pulse" />
                    <p className="w-full text-center bg-emerald-400/10 p-2 rounded">Ingesting CRM Data... [OK]</p>
                    <p className="w-full text-center bg-emerald-400/10 p-2 rounded delay-75">Parsing Support Tickets... [OK]</p>
                    <p className="w-full text-center bg-emerald-400/10 p-2 rounded delay-150">Building Vector Graph... [98%]</p>
                  </motion.div>
                )}

                {activeStep === "plan" && (
                  <motion.div
                    key="plan"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="flex flex-col items-center gap-4 w-full"
                  >
                    <Compass className="h-12 w-12 text-blue-400 mb-2 animate-spin-slow" />
                    <div className="flex gap-2 w-full justify-center text-blue-400 font-mono text-xs">
                      <div className="p-3 border border-blue-400/30 rounded-lg">Goal State</div>
                      <div className="flex items-center">{"->"}</div>
                      <div className="p-3 border border-blue-400/30 rounded-lg bg-blue-400/10">Sub-task 1</div>
                      <div className="flex items-center">{"->"}</div>
                      <div className="p-3 border border-blue-400/30 rounded-lg">Sub-task 2</div>
                    </div>
                    <p className="text-slate-400 text-xs font-mono mt-4">Generating chain of thought...</p>
                  </motion.div>
                )}

                {activeStep === "execute" && (
                  <motion.div
                    key="execute"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="w-full rounded-xl border border-slate-700/80 bg-[#171e2d] p-5 font-mono text-[11px] leading-7 shadow-[0_18px_40px_rgba(0,0,0,0.20)] sm:p-7 sm:text-sm"
                  >
                    <div>
                      <span className="text-blue-400">import</span>{" "}
                      <span className="text-slate-300">{"{"}</span>{" "}
                      <span className="text-emerald-400">AI_Agent</span>{" "}
                      <span className="text-slate-300">{"}"}</span>{" "}
                      <span className="text-blue-400">from</span>{" "}
                      <span className="text-orange-300">&apos;@enterprise/core&apos;</span>
                      <span className="text-slate-300">;</span>
                    </div>
                    <div>
                      <span className="text-blue-400">const</span>{" "}
                      <span className="text-emerald-400">agent</span>{" "}
                      <span className="text-slate-300">= new</span>{" "}
                      <span className="text-emerald-400">AI_Agent</span>
                      <span className="text-slate-300">();</span>
                    </div>

                    <div className="mt-3">
                      <span className="text-emerald-400">agent.initialize</span>
                      <span className="text-slate-300">({"{"}</span>
                    </div>
                    <div className="pl-6">
                      <span className="text-emerald-300">model</span>
                      <span className="text-slate-300">: </span>
                      <span className="text-orange-300">&apos;gpt-4-enterprise&apos;</span>
                      <span className="text-slate-300">,</span>
                    </div>
                    <div className="pl-6">
                      <span className="text-emerald-300">secure</span>
                      <span className="text-slate-300">: </span>
                      <span className="text-purple-400">true</span>
                      <span className="text-slate-300">,</span>
                    </div>
                    <div className="pl-6">
                      <span className="text-emerald-300">integration</span>
                      <span className="text-slate-300">: [</span>
                      <span className="text-orange-300">&apos;Dynamics365&apos;</span>
                      <span className="text-slate-300">, </span>
                      <span className="text-orange-300">&apos;Azure&apos;</span>
                      <span className="text-slate-300">]</span>
                    </div>
                    <div className="text-emerald-400">{"});"}</div>

                    <div className="mt-3 text-slate-500">
                      ~ Deploying agent architecture...
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-emerald-400"
                    >
                      ✓ System online and secure.
                    </motion.div>
                  </motion.div>
                )}

                {activeStep === "improve" && (
                  <motion.div
                    key="improve"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="relative flex items-center justify-center h-32 w-32">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-4 border-dashed border-purple-500/50"
                      />
                      <RefreshCw className="h-12 w-12 text-purple-400" />
                    </div>
                    <div className="text-purple-400 font-mono text-sm text-center">
                      <p>Loss: 0.042 ↓</p>
                      <p>Accuracy: 99.2% ↑</p>
                      <p className="text-xs text-slate-500 mt-2">Model weights updated</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] pointer-events-none" />
          </div>
          </div>

          <div className="relative overflow-hidden grid grid-cols-3 border-t border-[#FF5812]/10 bg-linear-to-r from-[#FF5812] to-[#FF7A2F] text-white">
            {/* Tactile Dot Grid Texture */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(#fff_0.8px,transparent_0.8px)] [background-size:10px_10px]"
            />

            {[
              ["12", "Connected sources"],
              ["48", "Active automations"],
              ["98.7%", "Average accuracy"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="relative z-10 border-r border-white/15 px-4 py-5 text-center last:border-r-0 sm:px-6 flex flex-col items-center justify-center"
              >
                <p className="text-xl font-black tabular-nums text-white sm:text-2xl leading-none">
                  {value}
                </p>
                <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white/80 sm:text-[10px]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
