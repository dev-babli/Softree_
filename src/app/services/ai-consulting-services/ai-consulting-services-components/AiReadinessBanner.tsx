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
    title: "Agentic AI Consulting & Development",
    description:
      "Plan and build AI agents, multi-agent systems, RAG solutions, and intelligent workflows aligned with your business needs.",
  },
  {
    icon: Users,
    title: "Dedicated Offshore AI Engineers",
    description:
      "Extend your team with AI engineers, architects, data specialists, QA professionals, and cloud experts to support AI implementation.",
  },
  {
    icon: Cloud,
    title: "Microsoft & AWS AI Solutions",
    description:
      "Explore AI solutions using Azure AI, Azure OpenAI, Microsoft Copilot, Amazon Bedrock, and other suitable cloud services.",
  },
  {
    icon: SlidersHorizontal,
    title: "Flexible & White-Label AI Delivery",
    description:
      "Choose dedicated offshore teams, project-based delivery, staff augmentation, managed engineering, or white-label AI development to fit your delivery model.",
  },
];

export default function AiReadinessBanner() {
  return (
    <section className="relative w-full pt-4 lg:pt-6 pb-12 lg:pb-16 bg-transparent overflow-hidden font-sans">
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* Main Banner Container */}
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

            {/* AI CONSULTING & ENGINEERING Eyebrow Pill */}
            <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/70 px-4 py-1.5 rounded-full border border-white/60 mb-5 inline-block">
              <span className="typo-caption text-[#FF6B2C]">
                AI CONSULTING &amp; ENGINEERING
              </span>
            </div>

            {/* Headline */}
            <h2 className="typo-heading-2 text-slate-900 mb-4 max-w-xl">
              Your AI Strategy. <br />
              <span className="text-[#FF6B2C]">Our Offshore AI Engineering Team.</span>
            </h2>

            {/* Description Paragraph */}
            <p className="typo-description text-slate-600 max-w-xl mb-8">
              Turn business challenges into practical AI solutions with Softree Technology. Our offshore AI consulting and engineering team helps you plan and implement AI agents, RAG solutions, workflow automation, and cloud-based AI applications.
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
                      <h3 className="typo-heading-4 text-slate-900 mb-1">
                        {item.title}
                      </h3>
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
          <div
            itemScope
            itemType="https://schema.org/VideoObject"
            className="relative flex-1 min-h-[360px] sm:min-h-[440px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-100 flex items-center justify-center bg-slate-900"
          >
            <meta itemProp="name" content="Enterprise AI Consulting Services & Strategic Implementation Overview" />
            <meta itemProp="description" content="Explore Softree Technology's AI consulting services, including AI readiness assessment, enterprise AI strategy, Microsoft AI architecture, and offshore engineering delivery." />
            <meta itemProp="thumbnailUrl" content="https://www.softreetechnology.com/ai-development-service-video/ai-agent-video-poster.webp" />
            <meta itemProp="uploadDate" content="2025-01-15T08:00:00+00:00" />
            <meta itemProp="duration" content="PT30S" />
            <meta itemProp="contentUrl" content="https://www.softreetechnology.com/ai-development-service-video/ai-2.mp4" />
            <meta itemProp="embedUrl" content="https://www.softreetechnology.com/services/ai-consulting-services" />

            <div itemProp="publisher" itemScope itemType="https://schema.org/Organization" className="hidden">
              <meta itemProp="name" content="Softree Technology" />
              <div itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
                <meta itemProp="url" content="https://www.softreetechnology.com/logo/logo.png" />
              </div>
            </div>

            {/* Video element with complete indexing, poster, and accessibility attributes */}
            <video
              itemProp="video"
              src="/ai-development-service-video/ai-2.mp4"
              poster="/ai-development-service-video/ai-agent-video-poster.webp"
              aria-label="Enterprise AI Consulting Services & Strategic Implementation Overview"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              controls={false}
              className="w-full h-full object-cover absolute inset-0 select-none pointer-events-none"
            >
              <source src="/ai-development-service-video/ai-2.mp4" type="video/mp4" />
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
