"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Cpu, Database, Workflow, ShieldCheck, LucideIcon } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: Cpu,
    title: "LLM Integration & Agent Architecture",
    description:
      "Integrate suitable large language models and design agent architectures that support task reasoning, planning, and business-specific requirements.",
  },
  {
    icon: Database,
    title: "RAG & Enterprise Knowledge Integration",
    description:
      "Connect AI agents with internal documents, knowledge bases, and enterprise data to retrieve relevant information and generate context-aware responses.",
  },
  {
    icon: Workflow,
    title: "Tool Calling & Workflow Automation",
    description:
      "Enable AI agents to interact with APIs, databases, CRM, ERP, and business applications to retrieve information and execute configured workflow actions.",
  },
  {
    icon: ShieldCheck,
    title: "Security, Governance & Monitoring",
    description:
      "Implement access controls, workflow validation, monitoring, and human approval where required to support secure and controlled enterprise AI operations.",
  },
];

export default function AIAgentsAIReadinessBanner() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && !videoRef.current.paused && videoRef.current.readyState >= 3) {
      setIsVideoPlaying(true);
    }
  }, []);
  return (
    <section className="relative w-full pt-4 lg:pt-6 pb-12 lg:pb-16 bg-transparent overflow-hidden font-sans">
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* Main Banner Container (Light Theme Matching Page) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full rounded-[32px] overflow-hidden bg-white border border-slate-200/80 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row items-stretch"
        >
          {/* Subtle grid background overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />

          {/* Light peach background glow */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#FF6B2C]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Content Side */}
          <div className="relative z-10 flex-[1.25] p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start">

            {/* Eyebrow Pill */}
            <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/70 px-4 py-1.5 rounded-full border border-white/60 mb-5 inline-block">
              <span className="typo-caption font-bold tracking-wider text-[#FF6B2C] uppercase">
                ENTERPRISE AI AGENT DEVELOPMENT CAPABILITIES
              </span>
            </div>

            {/* Headline */}
            <h2 className="typo-heading-2 font-bold tracking-tight text-slate-900 mb-4 max-w-[580px]">
              Build Enterprise-Ready AI Agents for{" "}
              <span className="text-[#FF6B2C]">Intelligent Automation</span>
            </h2>

            {/* Description Paragraph */}
            <p className="typo-description text-slate-600 font-normal leading-relaxed max-w-[550px] mb-8">
              Develop custom AI agents that connect enterprise knowledge, core applications, and automated workflows. Softree Technology engineers production-grade agentic solutions to execute complex tasks, integrate systems, and deliver reliable business automation.
            </p>

            {/* 4 Feature Items List */}
            <div className="flex flex-col gap-5 w-full max-w-xl">
              {FEATURES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full border border-orange-200/80 bg-orange-50/80 flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:border-[#FF6B2C]/40 group-hover:bg-orange-100/60 transition-colors duration-200">
                      <Icon className="w-5 h-5 text-[#FF6B2C]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="typo-heading-4 font-semibold text-slate-900 mb-1">
                        {item.title}
                      </h4>
                      <p className="typo-body-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="inline-block mt-9">
              <FlowButton
                href="/contact"
                text="EXPLORE AI AGENT DEVELOPMENT"
                variant="orange-filled"
              />
            </div>

          </div>

          {/* Right Video Side */}
          <div className="relative flex-1 min-h-[360px] sm:min-h-[440px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-100 flex items-center justify-center bg-slate-900">
            {/* The background video with SEO / Indexing attributes */}
            <video
              ref={videoRef}
              src="/ai-development-service-video/ai-agent-video.mp4"

              title="Enterprise AI Agent Architecture & Workflow Automation Overview"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onPlaying={() => setIsVideoPlaying(true)}
              onError={() => setIsVideoPlaying(false)}
              className={`w-full h-full object-cover absolute inset-0 select-none pointer-events-none transition-opacity duration-700 ${
                isVideoPlaying ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src="/ai-development-service-video/ai-agent-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Subtle shade vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

        </motion.div>

      </div>
    </section>
  );
}
