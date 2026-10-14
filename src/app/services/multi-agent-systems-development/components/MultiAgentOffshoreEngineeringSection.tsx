"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import PhotoStackGallery, { StackPhoto } from "@/app/services/microsoft-fabric-development-services/components/PhotoStackGallery";
import { FlowButton } from "@/components/ui/flow-button";

const AI_AGENT_PHOTOS: StackPhoto[] = [
  {
    id: "01",
    title: "Multi-Agent AI Architects",
    caption: "Architect autonomous agent systems, multi-agent orchestration frameworks, inter-agent communication protocols, and governance guardrails.",
    location: "01 • Architecture & Orchestration",
    category: "[ ARCHITECTURE & ORCHESTRATION ]",
    status: "● OFFSHORE AI TEAMS",
    specs: [
      { label: "ROLE", value: "Multi-Agent AI Architects" },
      { label: "FOCUS", value: "Architecture & Orchestration" },
      { label: "DELIVERY", value: "Dedicated Engineering" }
    ]
  },
  {
    id: "02",
    title: "Multi-Agent AI Engineers",
    caption: "Develop autonomous agent swarms, implement task routing and handoffs, and integrate leading LLMs, LangGraph, AutoGen, and CrewAI.",
    location: "02 • AI Engineering",
    category: "[ AI ENGINEERING ]",
    status: "● OFFSHORE AI TEAMS",
    specs: [
      { label: "ROLE", value: "Multi-Agent AI Engineers" },
      { label: "FOCUS", value: "LLMs, Frameworks & Agents" },
      { label: "DELIVERY", value: "Dedicated Engineering" }
    ]
  },
  {
    id: "03",
    title: "Full-Stack Engineers",
    caption: "Engineer enterprise web applications, real-time agent dashboards, and secure APIs connecting multi-agent systems to business workflows.",
    location: "03 • Application Development",
    category: "[ APPLICATION DEVELOPMENT ]",
    status: "● OFFSHORE AI TEAMS",
    specs: [
      { label: "ROLE", value: "Full-Stack Engineers" },
      { label: "FOCUS", value: "APIs & Web Interfaces" },
      { label: "DELIVERY", value: "Dedicated Engineering" }
    ]
  },
  {
    id: "04",
    title: "Data & RAG Engineers",
    caption: "Build enterprise RAG pipelines, vector search databases, shared memory contexts, and data integrations for coordinated agent execution.",
    location: "04 • Data & Knowledge Engineering",
    category: "[ DATA & KNOWLEDGE ]",
    status: "● OFFSHORE AI TEAMS",
    specs: [
      { label: "ROLE", value: "Data & RAG Engineers" },
      { label: "FOCUS", value: "Shared Memory & RAG" },
      { label: "DELIVERY", value: "Dedicated Engineering" }
    ]
  },
  {
    id: "05",
    title: "AI QA & Testing Engineers",
    caption: "Validate multi-agent collaboration, evaluate task completion accuracy, assess tool calling safety, and benchmark response quality.",
    location: "05 • Quality & Governance",
    category: "[ QUALITY & GOVERNANCE ]",
    status: "● OFFSHORE AI TEAMS",
    specs: [
      { label: "ROLE", value: "AI QA & Testing Engineers" },
      { label: "FOCUS", value: "Multi-Agent Evaluation & QA" },
      { label: "DELIVERY", value: "Dedicated Engineering" }
    ]
  },
  {
    id: "06",
    title: "Cloud & DevOps Engineers",
    caption: "Deploy, monitor, secure, and scale multi-agent architectures on Azure, AWS, and GCP with production MLOps and observability.",
    location: "06 • Cloud & MLOps",
    category: "[ CLOUD & MLOPS ]",
    status: "● OFFSHORE AI TEAMS",
    specs: [
      { label: "ROLE", value: "Cloud & DevOps Engineers" },
      { label: "FOCUS", value: "MLOps & Cloud Infrastructure" },
      { label: "DELIVERY", value: "Dedicated Engineering" }
    ]
  }
];

const ROLES = [
  {
    id: "01",
    domain: "ARCHITECTURE & ORCHESTRATION",
    title: "Multi-Agent AI Architects",
    description: "Design multi-agent architectures, roles, and coordination workflows.",
  },
  {
    id: "02",
    domain: "AI ENGINEERING",
    title: "Multi-Agent AI Engineers",
    description: "Build autonomous agents, task handoffs, and LLM framework integrations.",
  },
  {
    id: "03",
    domain: "APPLICATION DEVELOPMENT",
    title: "Full-Stack Engineers",
    description: "Develop APIs, interfaces, and tools connecting agents to business apps.",
  },
  {
    id: "04",
    domain: "DATA & KNOWLEDGE ENGINEERING",
    title: "Data & RAG Engineers",
    description: "Build retrieval pipelines, vector stores, and shared context systems.",
  },
  {
    id: "05",
    domain: "QUALITY & GOVERNANCE",
    title: "AI QA & Testing Engineers",
    description: "Test agent collaboration, tool accuracy, safety, and failure recovery.",
  },
  {
    id: "06",
    domain: "CLOUD & MLOPS",
    title: "Cloud & DevOps Engineers",
    description: "Deploy, scale, monitor, and secure multi-agent systems in cloud environments.",
  },
];

export function AIAgentsOffshoreEngineeringSection() {
  const [activeRole, setActiveRole] = useState(0);

  return (
    <section className="bg-white pt-8 md:pt-12 pb-8 lg:pb-12 text-slate-900 relative overflow-hidden">
      {/* Subtle ambient backdrop lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 gap-y-6 lg:gap-y-8 items-center">

          {/* Left Content Side - Typography-Led, Non-Card Editorial Layout */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5 text-left">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/80 px-4 py-1.5 rounded-full border border-white/80 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse" />
              <span className="typo-caption text-[#FF6B2C]">
                OFFSHORE MULTI-AGENT AI ENGINEERING TEAMS
              </span>
            </div>

            {/* Headline & Description */}
            <div className="space-y-1.5">
              <h2 className="typo-heading-2 text-slate-900">
                Dedicated Offshore{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] via-[#ea580c] to-[#c2410c]">
                  Multi-Agent AI Engineering Teams
                </span>
              </h2>
              <p className="typo-body-lg font-semibold text-slate-800">
                Extend Your Team with Specialized Multi-Agent AI Development Talent
              </p>
              <p className="typo-description text-slate-600 max-w-1.95xl pt-0.5">
                Scale your engineering capacity with offshore multi-agent specialists—covering agent architecture, orchestration, enterprise integrations, testing, and production deployment.
              </p>
            </div>

            {/* 6 Roles - Pure Editorial Swiss Layout with ALL LEFT BORDERS IN ORANGE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 pt-1">
              {ROLES.map((role, idx) => {
                const isActive = activeRole === idx;
                return (
                  <div
                    key={role.id}
                    onClick={() => setActiveRole(idx)}
                    onMouseEnter={() => setActiveRole(idx)}
                    className={`group cursor-pointer text-left transition-all duration-200 relative pl-3.5 py-1 border-l-2 border-[#FF6B2C] ${
                      isActive ? "bg-orange-500/[0.06] rounded-r-md" : "hover:bg-orange-500/[0.02]"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className={`text-[11px] font-mono font-bold transition-colors ${
                          isActive ? "text-[#FF6B2C]" : "text-slate-500 group-hover:text-[#FF6B2C]"
                        }`}
                      >
                        {role.id}
                      </span>
                      <span className="typo-caption-meta text-slate-400">
                        {role.domain}
                      </span>
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF6B2C] animate-ping" />
                      )}
                    </div>
                    <h4
                      className={`typo-heading-4 transition-colors leading-snug ${
                        isActive ? "text-[#FF6B2C]" : "text-slate-900 group-hover:text-[#FF6B2C]"
                      }`}
                    >
                      {role.title}
                    </h4>
                    <p className="typo-body-sm text-slate-500 mt-0.5">
                      {role.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Side - Synchronized Interactive Photo Stack */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end self-end">
            <PhotoStackGallery
              photos={AI_AGENT_PHOTOS}
              selectedIndex={activeRole}
              onSelectIndex={(idx: number) => setActiveRole(idx)}
            />
          </div>

          {/* Bottom Row: Extension Highlight Ribbon (Left) & CTA Button (Right) */}
          <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 items-center pt-4 border-t border-slate-100">
            <div className="lg:col-span-7 flex flex-col gap-2">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#FF6B2C] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="typo-body-sm font-semibold text-slate-900 leading-snug">
                    A dedicated offshore multi-agent AI engineering team that works as an extension of yours.
                  </p>
                  <div className="flex items-center gap-3 mt-1 flex-wrap typo-caption-meta text-slate-500 font-medium">
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> Dedicated AI Talent
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> Seamless Integration
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> Production-Ready Delivery
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <FlowButton
                href="/contact"
                text="Build Your AI Team"
                variant="orange-filled"
                className="shadow-lg shadow-orange-500/20"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AIAgentsOffshoreEngineeringSection;
