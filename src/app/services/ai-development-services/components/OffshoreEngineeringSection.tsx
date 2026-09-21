"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import PhotoStackGallery from "./PhotoStackGallery";
import { FlowButton } from "@/components/ui/flow-button";

const ROLES = [
  {
    id: "01",
    domain: "ARCHITECTURE & STRATEGY",
    title: "AI / Solution Architects",
    description: "Define AI architecture, technology strategy, solution design, agent workflows, and governance.",
  },
  {
    id: "02",
    domain: "AI ENGINEERING",
    title: "AI Engineers",
    description: "Build agents, RAG systems, orchestration, AI services, tool integrations, and evaluation frameworks.",
  },
  {
    id: "03",
    domain: "APPLICATION DEV",
    title: "Full-Stack Engineers",
    description: "Build applications, APIs, interfaces, and experiences around your AI solutions.",
  },
  {
    id: "04",
    domain: "DATA PLATFORMS",
    title: "Data Engineers",
    description: "Build data pipelines, knowledge systems, retrieval infrastructure, and AI-ready data platforms.",
  },
  {
    id: "05",
    domain: "QUALITY & RELIABILITY",
    title: "QA Engineers",
    description: "Validate application quality, AI behavior, reliability, security, and performance.",
  },
  {
    id: "06",
    domain: "CLOUD & MLOPS",
    title: "Cloud & DevOps Engineers",
    description: "Deploy, secure, monitor, scale, and operate AI solutions in production.",
  },
];

export default function OffshoreEngineeringSection() {
  const [activeRole, setActiveRole] = useState(0);

  return (
    <section className="bg-white pt-24 pb-16 lg:pb-24 text-slate-900 relative overflow-hidden">
      {/* Subtle ambient backdrop lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Content Side - Typography-Led, Non-Card Editorial Layout */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5 text-left">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/80 px-4 py-1.5 rounded-full border border-white/80 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse" />
              <span className="typo-caption text-[#FF6B2C]">
                OFFSHORE AI ENGINEERING TEAMS
              </span>
            </div>

            {/* Headline - Title Case, NOT all uppercase */}
            <div className="space-y-1.5">
              <h2 className="typo-heading-2 text-slate-900">
                Dedicated Offshore{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] via-[#ea580c] to-[#c2410c]">
                  Agentic AI Engineering
                </span>
              </h2>
              <div className="flex items-center gap-2.5 pt-0.5">
                <div className="h-4 w-1 rounded-full bg-[#FF6B2C]" />
                <h3 className="typo-heading-4 text-slate-800">
                  Extend Your Team With Specialized Agentic AI Engineering Talent
                </h3>
              </div>
              <p className="typo-description text-slate-600 max-w-1.95xl pt-0.5">
                Build a dedicated offshore AI engineering team aligned with your technology stack, development processes, and business goals—from Agentic AI architecture and development to integration, testing, and production delivery.
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
                    className={`group cursor-pointer text-left transition-all duration-200 relative pl-3.5 py-1 border-l-2 border-[#FF6B2C] ${isActive ? "bg-orange-500/[0.06] rounded-r-md" : "hover:bg-orange-500/[0.02]"
                      }`}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className={`text-[11px] font-mono font-bold transition-colors ${isActive ? "text-[#FF6B2C]" : "text-slate-500 group-hover:text-[#FF6B2C]"
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
                      className={`typo-heading-4 transition-colors leading-snug ${isActive ? "text-[#FF6B2C]" : "text-slate-900 group-hover:text-[#FF6B2C]"
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

            {/* Extension Highlight Ribbon */}
            <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#FF6B2C] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[13.5px] sm:text-[14px] font-semibold text-slate-900 leading-snug">
                    A focused offshore AI engineering team that works as an extension of yours.
                  </p>
                  <div className="flex items-center gap-3 mt-1 flex-wrap text-[11.5px] text-slate-500 font-medium">
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> Direct Slack & Git Sync
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> US & EU Timezone Aligned
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> Enterprise IP Protection
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-0.5">
              <FlowButton
                href="/contact"
                text="Build Your Offshore AI Team"
                variant="orange-filled"
                className="shadow-lg shadow-orange-500/20"
              />
              <span className="text-xs text-slate-500 font-medium">
                ⚡ Pre-vetted senior engineers • Onboard in 1–2 weeks
              </span>
            </div>

          </div>

          {/* Right Side - Synchronized Interactive Photo Stack */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <PhotoStackGallery
              selectedIndex={activeRole}
              onSelectIndex={(idx) => setActiveRole(idx)}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
