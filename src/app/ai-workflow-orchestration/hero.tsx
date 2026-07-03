"use client";

import React, { useState, useEffect } from "react";
import { Zap, Cpu, UserCheck, RefreshCw, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const flowSteps = [
    {
      id: 0,
      label: "Trigger Event",
      desc: "Webhook / API / SharePoint File",
      icon: Zap,
      color: "#F0A83C",
    },
    {
      id: 1,
      label: "AI Processing",
      desc: "Agent Classification & Extraction",
      icon: Cpu,
      color: "#3ED9B8",
    },
    {
      id: 2,
      label: "Human Review",
      desc: "Human-in-the-loop Approval",
      icon: UserCheck,
      color: "#E8747C",
    },
    {
      id: 3,
      label: "System Sync",
      desc: "ERP / CRM Database Write",
      icon: RefreshCw,
      color: "#9B8CF2",
    },
  ];

  return (
    <section className="relative w-full bg-white px-6 py-20 sm:px-10 lg:px-16 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .ws-display { font-family: 'Space Grotesk', sans-serif; }
        .ws-body { font-family: 'Inter', sans-serif; }
        .ws-mono { font-family: 'JetBrains Mono', monospace; }

        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        .active-pulse {
          animation: pulse-ring 2s infinite ease-in-out;
        }

        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .flow-line {
          stroke-dasharray: 5, 5;
          animation: dash 1.5s linear infinite;
        }
      `}</style>

      {/* Background radial grids and gradient blobs */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#F0A83C 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />
      <div className="pointer-events-none absolute -left-48 top-12 h-96 w-96 rounded-full bg-[#F0A83C]/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-48 bottom-12 h-96 w-96 rounded-full bg-[#3ED9B8]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Tag Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-100 bg-neutral-50 px-3 py-1.5 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F0A83C]" />
              <span className="ws-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                Enterprise Automation Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="ws-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.08] mb-6">
              Orchestrate Your <span className="text-[#F0A83C]">AI Workflows</span> on Autopilot
            </h1>

            {/* Sub-headline Description */}
            <p className="ws-body text-base sm:text-lg text-neutral-500 leading-relaxed mb-8">
              Connect process agents, databases, and manual approvals into a single operational pipeline. Automate complex enterprise workflows with full 24/7 run transparency.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#services"
                className="ws-mono inline-flex items-center justify-center gap-2 rounded-lg bg-[#F0A83C] px-6 py-3.5 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#d9902b] hover:shadow-lg hover:-translate-y-0.5"
              >
                Explore Modules
                <ArrowRight size={14} />
              </a>
              <a
                href="/contact"
                className="ws-mono inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-white px-6 py-3.5 text-xs font-semibold text-neutral-700 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:bg-neutral-50 hover:-translate-y-0.5"
              >
                Book a Demo
              </a>
            </div>

            {/* Real-time Status Counter */}
            <div className="mt-10 flex items-center gap-6 border-t border-neutral-100 pt-8 w-full">
              <div>
                <p className="ws-mono text-[10px] uppercase tracking-wider text-neutral-400">Total Run Executions</p>
                <p className="ws-display text-2xl font-bold text-neutral-900 mt-1">4.2M+</p>
              </div>
              <div className="h-8 w-px bg-neutral-100" />
              <div>
                <p className="ws-mono text-[10px] uppercase tracking-wider text-neutral-400">Success Rate</p>
                <p className="ws-display text-2xl font-bold text-neutral-900 mt-1">99.98%</p>
              </div>
            </div>
          </div>

          {/* Hero Right Visual: Live Pipeline Orchestration Graphic */}
          <div className="lg:col-span-6 w-full flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl border border-neutral-100 bg-[#FBFBFA] p-6 shadow-sm overflow-hidden">
              <div className="absolute top-4 left-6 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#EF4444] opacity-80" />
                <span className="h-2 w-2 rounded-full bg-[#F59E0B] opacity-80" />
                <span className="h-2 w-2 rounded-full bg-[#10B981] opacity-80" />
                <span className="ml-2 ws-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                  Live workflow trace
                </span>
              </div>

              {/* Grid backdrop */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
                style={{
                  backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                  backgroundSize: "16px 16px"
                }}
              />

              {/* Pipeline Flows */}
              <div className="h-full flex flex-col justify-center gap-5 mt-4 relative z-10">
                {flowSteps.map((step) => {
                  const StepIcon = step.icon;
                  const isActive = activeStep === step.id;

                  return (
                    <div
                      key={step.id}
                      className="group flex items-center gap-4 transition-all duration-300 cursor-pointer"
                      onClick={() => setActiveStep(step.id)}
                    >
                      {/* Node Icon Circle */}
                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-all duration-500"
                        style={{
                          borderColor: isActive ? step.color : "rgba(10,10,10,0.06)",
                          backgroundColor: isActive ? `${step.color}08` : "#FFFFFF",
                          boxShadow: isActive ? `0 0 16px ${step.color}15` : "none"
                        }}
                      >
                        {isActive && (
                          <div className="absolute inset-0 rounded-lg active-pulse bg-current opacity-10" style={{ color: step.color }} />
                        )}
                        <StepIcon size={18} style={{ color: isActive ? step.color : "#9CA3AF" }} />
                      </div>

                      {/* Node Texts */}
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h4 className="ws-display text-sm font-semibold text-neutral-800 transition-colors duration-200 group-hover:text-neutral-900">
                            {step.label}
                          </h4>
                          {isActive && (
                            <span className="ws-mono text-[9px] uppercase font-bold tracking-wider text-neutral-400 animate-pulse">
                              Processing
                            </span>
                          )}
                        </div>
                        <p className="ws-body text-xs text-neutral-400 mt-0.5">
                          {step.desc}
                        </p>
                      </div>
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
