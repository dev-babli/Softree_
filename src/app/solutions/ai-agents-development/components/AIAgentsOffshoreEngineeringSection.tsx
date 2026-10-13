"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import PhotoStackGallery, { StackPhoto } from "@/app/services/microsoft-fabric-development-services/components/PhotoStackGallery";
import { FlowButton } from "@/components/ui/flow-button";

const AI_AGENT_PHOTOS: StackPhoto[] = [
  {
    id: "01",
    title: "AI / Solution Architects",
    caption: "Define AI agent architecture, technology selection, solution design, orchestration patterns, and governance requirements.",
    location: "01 • Architecture & Strategy",
    category: "[ ARCHITECTURE & STRATEGY ]",
    status: "● OFFSHORE AI TEAMS",
    specs: [
      { label: "ROLE", value: "AI / Solution Architects" },
      { label: "FOCUS", value: "Architecture & Strategy" },
      { label: "DELIVERY", value: "Dedicated Engineering" }
    ]
  },
  {
    id: "02",
    title: "AI Engineers",
    caption: "Build custom AI agents, integrate language models, implement RAG pipelines, and develop tool-calling and orchestration workflows.",
    location: "02 • AI Engineering",
    category: "[ AI ENGINEERING ]",
    status: "● OFFSHORE AI TEAMS",
    specs: [
      { label: "ROLE", value: "AI Engineers" },
      { label: "FOCUS", value: "LLMs, RAG & Agents" },
      { label: "DELIVERY", value: "Dedicated Engineering" }
    ]
  },
  {
    id: "03",
    title: "Full-Stack Engineers",
    caption: "Build applications, APIs, interfaces, and user experiences that connect AI agents with business systems and end users.",
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
    title: "Data Engineers",
    caption: "Build data pipelines, knowledge retrieval systems, and data infrastructure to support AI agent applications.",
    location: "04 • Data Platforms",
    category: "[ DATA PLATFORMS ]",
    status: "● OFFSHORE AI TEAMS",
    specs: [
      { label: "ROLE", value: "Data Engineers" },
      { label: "FOCUS", value: "Pipelines & Knowledge Bases" },
      { label: "DELIVERY", value: "Dedicated Engineering" }
    ]
  },
  {
    id: "05",
    title: "QA Engineers",
    caption: "Validate application functionality, AI responses, integration behavior, security controls, and performance against defined requirements.",
    location: "05 • Quality & Reliability",
    category: "[ QUALITY & RELIABILITY ]",
    status: "● OFFSHORE AI TEAMS",
    specs: [
      { label: "ROLE", value: "QA Engineers" },
      { label: "FOCUS", value: "AI Validation & Quality" },
      { label: "DELIVERY", value: "Dedicated Engineering" }
    ]
  },
  {
    id: "06",
    title: "Cloud & DevOps Engineers",
    caption: "Deploy, secure, monitor, scale, and maintain AI agent applications across suitable cloud environments.",
    location: "06 • Cloud & MLOps",
    category: "[ CLOUD & MLOPS ]",
    status: "● OFFSHORE AI TEAMS",
    specs: [
      { label: "ROLE", value: "Cloud & DevOps Engineers" },
      { label: "FOCUS", value: "Deployment & MLOps" },
      { label: "DELIVERY", value: "Dedicated Engineering" }
    ]
  }
];

const ROLES = [
  {
    id: "01",
    domain: "ARCHITECTURE & STRATEGY",
    title: "AI / Solution Architects",
    description: "Design agent architectures, orchestration patterns, and enterprise governance.",
  },
  {
    id: "02",
    domain: "AI ENGINEERING",
    title: "AI Engineers",
    description: "Develop custom AI agents, LLM integrations, RAG pipelines, and tool workflows.",
  },
  {
    id: "03",
    domain: "APPLICATION DEVELOPMENT",
    title: "Full-Stack Engineers",
    description: "Build responsive UIs, APIs, and integrations connecting agents to business systems.",
  },
  {
    id: "04",
    domain: "DATA PLATFORMS",
    title: "Data Engineers",
    description: "Build data pipelines, retrieval systems, and infrastructure for AI knowledge.",
  },
  {
    id: "05",
    domain: "QUALITY & RELIABILITY",
    title: "QA Engineers",
    description: "Validate AI accuracy, security controls, integrations, and response quality.",
  },
  {
    id: "06",
    domain: "CLOUD & MLOPS",
    title: "Cloud & DevOps Engineers",
    description: "Deploy, secure, monitor, and scale AI agent infrastructure in cloud environments.",
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
                OFFSHORE AI ENGINEERING TEAMS
              </span>
            </div>

            {/* Headline & Description */}
            <div className="space-y-1.5">
              <h2 className="typo-heading-2 text-slate-900">
                Dedicated Offshore{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] via-[#ea580c] to-[#c2410c]">
                  AI Agent Engineering Teams
                </span>
              </h2>
              <p className="typo-body-lg font-semibold text-slate-800">
                Extend Your Team with Specialized AI Agent Development Talent
              </p>
              <p className="typo-description text-slate-600 max-w-1.95xl pt-0.5">
                Build a dedicated offshore AI engineering team aligned with your technology stack, development processes, and business goals—from AI agent architecture and custom development to enterprise integration, testing, and production deployment.
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
                    <p className="typo-body-sm text-slate-500 mt-0.5 line-clamp-2">
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
                    A dedicated offshore AI engineering team that works as an extension of yours.
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
