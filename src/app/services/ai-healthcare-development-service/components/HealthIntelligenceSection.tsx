"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Heart, Dna, Brain } from "lucide-react";

interface HealthCategory {
  id: string;
  tabLabel: string;
  icon: React.ElementType;
  leftTitle: string;
  leftDesc: string;
  leftImage: string;
  leftStat: string;
  leftStatLabel: string;
  leftStatTrend: string;
  rightTitle: string;
  bioAge: string;
  bioAgeLabel: string;
  metric1: {
    name: string;
    status: string;
    val: string;
    color: string;
  };
  metric2: {
    name: string;
    status: string;
    val: string;
    color: string;
  };
}

const healthCategories: HealthCategory[] = [
  {
    id: "patient-assistant",
    tabLabel: "AI Patient Assistant",
    icon: Heart,
    leftTitle: "AI Patient Assistant",
    leftDesc: "Help patients find information, schedule appointments and navigate healthcare services effortlessly.",
    leftImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop",
    leftStat: "24/7",
    leftStatLabel: "Patient Concierge Availability",
    leftStatTrend: "zero wait time • instant answers",
    rightTitle: "AI Patient Assistant",
    bioAge: "98%",
    bioAgeLabel: "Patient satisfaction rate",
    metric1: {
      name: "Appointment Booking",
      status: "Automated",
      val: "< 1 min",
      color: "#FF5812",
    },
    metric2: {
      name: "Triage & Navigation",
      status: "Active",
      val: "HIPAA Secure",
      color: "#FF5812",
    },
  },
  {
    id: "doc-intelligence",
    tabLabel: "Medical Document Intelligence",
    icon: Activity,
    leftTitle: "Medical Document Intelligence",
    leftDesc: "Extract and organize information from complex healthcare documents, clinical notes, and lab reports.",
    leftImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1000&auto=format&fit=crop",
    leftStat: "99.4%",
    leftStatLabel: "Document Extraction Accuracy",
    leftStatTrend: "OCR + Clinical NLP",
    rightTitle: "Medical Document Intelligence",
    bioAge: "4.5X",
    bioAgeLabel: "Faster medical charting",
    metric1: {
      name: "EHR Parsing",
      status: "Structured",
      val: "SOAP Notes",
      color: "#FF5812",
    },
    metric2: {
      name: "Claims OCR",
      status: "Instant",
      val: "Automated",
      color: "#FF5812",
    },
  },
  {
    id: "ai-copilot",
    tabLabel: "Healthcare AI Copilot",
    icon: Brain,
    leftTitle: "Healthcare AI Copilot",
    leftDesc: "Help clinical and admin teams search knowledge, summarize information and automate repetitive tasks.",
    leftImage: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1000&auto=format&fit=crop",
    leftStat: "40%",
    leftStatLabel: "Reduction in Administrative Overhead",
    leftStatTrend: "RAG LLM • Knowledge Base",
    rightTitle: "Healthcare AI Copilot",
    bioAge: "10X",
    bioAgeLabel: "Faster protocol search",
    metric1: {
      name: "Clinical Search",
      status: "Instant",
      val: "RAG Verified",
      color: "#FF5812",
    },
    metric2: {
      name: "Task Automation",
      status: "Active",
      val: "Staff Copilot",
      color: "#FF5812",
    },
  },
  {
    id: "analytics-platform",
    tabLabel: "Healthcare Analytics Platform",
    icon: Dna,
    leftTitle: "Healthcare Analytics Platform",
    leftDesc: "Turn healthcare data into actionable operational insights, diagnostic trends, and population risk scoring.",
    leftImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop",
    leftStat: "125+",
    leftStatLabel: "Clinical Parameters Analyzed",
    leftStatTrend: "Real-time Dashboards",
    rightTitle: "Healthcare Analytics Platform",
    bioAge: "360°",
    bioAgeLabel: "Patient risk visibility",
    metric1: {
      name: "Risk Scoring",
      status: "Predictive",
      val: "Early Warning",
      color: "#FF5812",
    },
    metric2: {
      name: "Data Integration",
      status: "FHIR / HL7",
      val: "Live Pipeline",
      color: "#FF5812",
    },
  },
];

export function HealthIntelligenceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % healthCategories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const activeCategory = healthCategories[activeIndex];

  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 text-neutral-900 relative overflow-hidden border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
            AI Healthcare Solutions
            <span className="block text-[#FF5812] font-semibold mt-1">
              We Can Build For You
            </span>
          </h2>
        </div>

        {/* Interactive Animated Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {healthCategories.map((cat, idx) => {
            const Icon = cat.icon;
            const isActive = idx === activeIndex;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "bg-black text-white shadow-md scale-105"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-black"
                }`}
              >
                <Icon size={16} className={isActive ? "text-[#FF5812]" : "text-zinc-400"} />
                <span>{cat.tabLabel}</span>

                {/* Animated active underline / ring indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 border-2 border-[#FF5812]/40 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Unified 2-Column Cards Grid with Single Synchronized AnimatePresence */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative min-h-[460px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
            >
              {/* Card 1: Left Showcase Image Card */}
              <div className="relative rounded-3xl overflow-hidden min-h-[460px] flex flex-col justify-end p-8 sm:p-10 shadow-lg border border-zinc-200 group">
                {/* Background Image */}
                <Image
                  src={activeCategory.leftImage}
                  alt={activeCategory.leftTitle}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {activeCategory.leftTitle}
                  </h3>

                  <p className="text-white/80 text-sm sm:text-base font-normal max-w-md mb-6 leading-relaxed">
                    {activeCategory.leftDesc}
                  </p>

                  {/* Bottom Metric Box */}
                  <div className="bg-black/85 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 flex items-center justify-between shadow-xl">
                    <div>
                      <span className="text-4xl sm:text-5xl font-bold text-[#FF5812] tracking-tight">
                        {activeCategory.leftStat}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-sm font-semibold">
                        {activeCategory.leftStatLabel}
                      </p>
                      <p className="text-white/60 text-xs mt-0.5 capitalize">
                        {activeCategory.leftStatTrend}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Right Animated Health Card (Matching Screenshot exactly) */}
              <div className="bg-black border border-zinc-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-sm relative overflow-hidden">
                {/* Top Header Title */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {activeCategory.rightTitle}
                  </h3>
                </div>

                {/* Biological Age Inner Card */}
                <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-6 text-center shadow-xs mb-6 relative overflow-hidden group">
                  <div className="text-4xl sm:text-5xl font-extrabold text-[#FF5812] mb-1 tracking-tight">
                    {activeCategory.bioAge}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-zinc-400">
                    {activeCategory.bioAgeLabel}
                  </div>
                </div>

                {/* Live Animated Heartbeat ECG Waveform */}
                <div className="my-4 w-full flex justify-center items-center relative overflow-hidden py-2">
                  <svg
                    viewBox="0 0 500 80"
                    className="w-full h-16 text-[#FF5812]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Base static faint path */}
                    <path
                      d="M0 40 H100 L110 35 L120 45 L130 10 L145 70 L160 30 L170 45 L180 40 H260 L270 35 L280 45 L290 5 L305 75 L320 25 L330 45 L340 40 H420 L430 35 L440 45 L450 15 L465 65 L480 40 H500"
                      opacity="0.25"
                    />

                    {/* Smooth flowing ECG pulse stroke */}
                    <motion.path
                      d="M0 40 H100 L110 35 L120 45 L130 10 L145 70 L160 30 L170 45 L180 40 H260 L270 35 L280 45 L290 5 L305 75 L320 25 L330 45 L340 40 H420 L430 35 L440 45 L450 15 L465 65 L480 40 H500"
                      initial={{ strokeDasharray: "650 650", strokeDashoffset: 650 }}
                      animate={{ strokeDashoffset: [650, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear",
                      }}
                    />
                  </svg>

                  {/* Traveling glowing pulse dot */}
                  <motion.div
                    className="absolute w-3 h-3 bg-[#FF5812] rounded-full shadow-[0_0_12px_#FF5812]"
                    animate={{
                      left: ["0%", "100%"],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {/* Bottom Indicators Grid */}
                <div className="grid grid-cols-2 gap-4 border-t border-zinc-800 pt-6">
                  {/* Metric 1 */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-1.5 h-10 rounded-full shrink-0 mt-1"
                      style={{ backgroundColor: activeCategory.metric1.color }}
                    />
                    <div>
                      <div className="text-sm font-bold text-white">
                        {activeCategory.metric1.name}
                      </div>
                      <div className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
                        <span>{activeCategory.metric1.status}</span>
                        <span>•</span>
                        <span
                          className="font-semibold"
                          style={{ color: activeCategory.metric1.color }}
                        >
                          {activeCategory.metric1.val}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-1.5 h-10 rounded-full shrink-0 mt-1"
                      style={{ backgroundColor: activeCategory.metric2.color }}
                    />
                    <div>
                      <div className="text-sm font-bold text-white">
                        {activeCategory.metric2.name}
                      </div>
                      <div className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
                        <span>{activeCategory.metric2.status}</span>
                        <span>•</span>
                        <span
                          className="font-semibold"
                          style={{ color: activeCategory.metric2.color }}
                        >
                          {activeCategory.metric2.val}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
