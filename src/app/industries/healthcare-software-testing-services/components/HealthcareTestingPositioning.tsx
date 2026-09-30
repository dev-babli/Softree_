"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AppWindow,
  Workflow,
  Bot,
  Database,
  Activity,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

interface FeatureItem {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    number: "01",
    icon: AppWindow,
    title: "Healthcare Applications",
    description:
      "Web, mobile, portals, dashboards, and healthcare management applications.",
  },
  {
    number: "02",
    icon: Workflow,
    title: "APIs & Integrations",
    description:
      "APIs, backend services, databases, third-party integrations, and data flows.",
  },
  {
    number: "03",
    icon: Bot,
    title: "AI Applications",
    description:
      "AI assistants, generative AI applications, conversational systems, and AI workflows.",
  },
  {
    number: "04",
    icon: Database,
    title: "RAG Applications",
    description:
      "Knowledge retrieval, document grounding, source relevance, and generated responses.",
  },
  {
    number: "05",
    icon: Activity,
    title: "Application Performance",
    description:
      "Response times, scalability, stability, and workload behavior.",
  },
  {
    number: "06",
    icon: ShieldCheck,
    title: "Security",
    description:
      "Authentication, authorization, access controls, APIs, and application security.",
  },
];

export default function HealthcareTestingPositioning() {
  return (
    <section className="relative w-full pt-2 lg:pt-3 pb-2 lg:pb-3 bg-white overflow-hidden font-sans">
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Banner Container (Light Theme Matching Page) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full rounded-[28px] overflow-hidden bg-white border border-slate-200/80 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row items-stretch"
        >
          {/* Subtle grid background overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />

          {/* Light peach background glow */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#ea580c]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Content Side (50% width on desktop) */}
          <div className="relative z-10 flex-1 lg:w-1/2 p-6 sm:p-8 lg:p-8 xl:p-9 flex flex-col justify-center items-start">
            {/* Eyebrow Pill */}
            <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/70 px-3.5 py-1 rounded-full border border-white/60 mb-3 inline-block">
              <span className="typo-caption text-[#ea580c] uppercase font-semibold text-[11px] sm:text-xs">
                WHAT WE TEST
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight leading-snug mb-2.5 max-w-2xl">
              From Healthcare Workflows to AI Responses,{" "}
              <span className="text-[#ea580c]">
                We Test the Complete Experience
              </span>
            </h2>

            {/* Subheading Paragraph */}
            <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal max-w-2xl mb-5">
              Softree provides end-to-end healthcare software testing across
              applications, APIs, integrations, automation workflows, and
              AI-powered functionality.
            </p>

            {/* 6 Feature Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-3xl mb-5">
              {FEATURES.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.number}
                    className="flex items-start gap-3 group p-1.5 sm:p-2 rounded-xl hover:bg-slate-50/80 transition-colors duration-200"
                  >
                    <div className="w-8.5 h-8.5 rounded-lg border border-orange-200/80 bg-orange-50/80 flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:border-[#ea580c]/40 group-hover:bg-orange-100/60 transition-colors duration-200">
                      <Icon className="w-4 h-4 text-[#ea580c]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13.5px] sm:text-[14px] font-bold text-slate-900 tracking-tight mb-0.5 leading-snug">
                        <span className="text-[#ea580c] font-mono mr-1">
                          {item.number} —
                        </span>
                        {item.title}
                      </h4>
                      <p className="text-[11.5px] sm:text-[12px] text-slate-600 leading-snug font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="inline-block">
              <FlowButton
                href="/contact"
                text="TALK TO OUR HEALTHCARE TESTING TEAM"
                variant="orange-filled"
              />
            </div>
          </div>

          {/* Right Video Side (50% width on desktop) */}
          <div className="relative flex-1 lg:w-1/2 min-h-[360px] sm:min-h-[440px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-100 flex items-center justify-center bg-slate-900">
            {/* The background video */}
            <video
              src="/ai-development-service-video/Healhcare-ai-video.mp4"
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
