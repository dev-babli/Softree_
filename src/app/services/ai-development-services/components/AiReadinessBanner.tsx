"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Users, Cloud, SlidersHorizontal, LucideIcon } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: Bot,
    title: "Agentic AI Expertise",
    description:
      "Build AI agents, multi-agent systems, RAG solutions, and intelligent workflows designed around real business processes.",
  },
  {
    icon: Users,
    title: "Dedicated Offshore AI Engineers",
    description:
      "Extend your team with AI architects, engineers, data specialists, QA, and cloud experts to support Agentic AI development from architecture through production.",
  },
  {
    icon: Cloud,
    title: "Microsoft + AWS AI Expertise",
    description:
      "Build Agentic AI solutions across Azure AI, Azure OpenAI, Copilot, Amazon Bedrock, and other supported cloud services.",
  },
  {
    icon: SlidersHorizontal,
    title: "Flexible & White-Label Delivery",
    description:
      "Choose dedicated teams, project delivery, staff augmentation, managed engineering, or white-label AI development based on your delivery model.",
  },
];

export default function AiReadinessBanner() {
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

            {/* WHY SOFTREE Eyebrow Pill */}
            <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/70 px-4 py-1.5 rounded-full border border-white/60 mb-5 inline-block">
              <span className="typo-caption text-[#FF6B2C]">
                WHY SOFTREE
              </span>
            </div>

            {/* Headline */}
            <h2 className="typo-heading-2 text-slate-900 mb-4 max-w-xl">
              Your AI Practice. <br />
              <span className="text-[#FF6B2C]">Our Agentic AI Engineering Team.</span>
            </h2>

            {/* Description Paragraph */}
            <p className="typo-description text-slate-600 max-w-xl mb-8">
              Build and scale Agentic AI solutions with an experienced offshore engineering team. From AI agents and RAG to automation and integrations, Softree provides the engineering capacity to extend your team, deliver projects or support white-label engagements.
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
                      <h4 className="typo-heading-4 text-slate-900 mb-1">
                        {item.title}
                      </h4>
                      <p className="typo-body-sm text-slate-500">
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
                text="BUILD YOUR AI TEAM"
                variant="orange-filled"
              />
            </div>

          </div>

          {/* Right Video Side */}
          <div className="relative flex-1 min-h-[360px] sm:min-h-[440px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-100 flex items-center justify-center bg-slate-900">
            {/* The background video */}
            <video
              src="/ai-development-service-video/ai-2.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover absolute inset-0 select-none pointer-events-none"
            />
            {/* Subtle shade vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

        </motion.div>

      </div>
    </section>
  );
}
