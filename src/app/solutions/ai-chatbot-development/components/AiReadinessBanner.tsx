"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bot, Users, Database, SlidersHorizontal, LucideIcon } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: Bot,
    title: "Custom AI Chatbot Development",
    description:
      "Build AI chatbots that understand user questions, retrieve relevant information, and provide contextual responses tailored to your business needs.",
  },
  {
    icon: Users,
    title: "Dedicated Offshore AI Engineers",
    description:
      "Extend your team with AI engineers and developers who support chatbot design, conversational workflows, system integration, and implementation.",
  },
  {
    icon: Database,
    title: "Conversational AI & RAG Expertise",
    description:
      "Connect AI chatbots with approved documents, knowledge bases, APIs, and business data to support relevant answers and context-aware conversations.",
  },
  {
    icon: SlidersHorizontal,
    title: "Flexible & White-Label Chatbot Delivery",
    description:
      "Choose dedicated offshore teams, project-based delivery, staff augmentation, or white-label AI chatbot development to fit your delivery model.",
  },
];

export default function AiReadinessBanner() {
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
          <div className="relative z-10 flex-[1.25] p-8 sm:p-12 lg:p-14 flex flex-col justify-center items-start">
            {/* Eyebrow Pill */}
            <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/70 px-4 py-1.5 rounded-full border border-white/60 mb-5 inline-block">
              <span className="typo-caption text-[#FF6B2C]">
                AI CHATBOT DEVELOPMENT &amp; ENGINEERING
              </span>
            </div>

            {/* Headline */}
            <h2 className="typo-heading-2 text-slate-900 mb-3.5 max-w-xl">
              Your Chatbot Vision. <br />
              <span className="text-[#FF6B2C]">Our Offshore AI Engineering Team.</span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-[15px] sm:text-base leading-relaxed text-slate-600 max-w-xl mb-6">
              Build custom AI chatbots with Softree Technology. Our offshore AI engineering team helps businesses develop conversational AI solutions for customer support, knowledge retrieval, workflow automation, and business application integration.
            </p>

            {/* 4 Feature Items List */}
            <div className="flex flex-col gap-4 sm:gap-4.5 w-full max-w-xl">
              {FEATURES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5 sm:gap-4 group">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-orange-200/80 bg-orange-50/80 flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:border-[#FF6B2C]/40 group-hover:bg-orange-100/60 transition-colors duration-200">
                      <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#FF6B2C]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[15px] sm:text-[15.5px] font-semibold text-slate-900 mb-0.5 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[13px] sm:text-[13.5px] leading-relaxed text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="inline-block mt-7 sm:mt-8">
              <FlowButton
                href="/contact"
                text="BUILD YOUR AI CHATBOT"
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
            <meta itemProp="name" content="Enterprise AI Chatbot Development & Conversational AI Overview" />
            <meta itemProp="description" content="Explore Softree Technology's AI chatbot development services, including custom LLM chatbots, enterprise RAG knowledge retrieval, customer support automation, and business workflow integrations." />
            <meta itemProp="thumbnailUrl" content="https://www.softreetechnology.com/ai-development-service-video/ai-agent-video-poster.webp" />
            <meta itemProp="uploadDate" content="2025-01-15T08:00:00+00:00" />
            <meta itemProp="duration" content="PT30S" />
            <meta itemProp="contentUrl" content="https://www.softreetechnology.com/ai-development-service-video/aichatbot.mp4" />
            <meta itemProp="embedUrl" content="https://www.softreetechnology.com/solutions/ai-chatbot-development" />

            <div itemProp="publisher" itemScope itemType="https://schema.org/Organization" className="hidden">
              <meta itemProp="name" content="Softree Technology" />
              <div itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
                <meta itemProp="url" content="https://www.softreetechnology.com/logo/logo.png" />
              </div>
            </div>

            {/* Video element with complete indexing, poster, and accessibility attributes */}
            <video
              ref={videoRef}
              itemProp="video"
              src="/ai-development-service-video/aichatbot.mp4"

              aria-label="Enterprise AI Chatbot Development & Conversational AI Overview"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onPlaying={() => setIsVideoPlaying(true)}
              onError={() => setIsVideoPlaying(false)}
              controls={false}
              className={`w-full h-full object-cover absolute inset-0 select-none pointer-events-none transition-opacity duration-700 ${
                isVideoPlaying ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src="/ai-development-service-video/aichatbot.mp4" type="video/mp4" />
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

export { AiReadinessBanner };
