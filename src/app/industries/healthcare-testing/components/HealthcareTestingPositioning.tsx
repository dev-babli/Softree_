"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, CheckCircle, LucideIcon } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";
import Image from "next/image";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: Activity,
    title: "Healthcare Quality",
    description:
      "Accuracy • Functional Validation • Data Integrity • Workflow Validation • Usability",
  },
  {
    icon: ShieldCheck,
    title: "Healthcare Security",
    description:
      "Data Privacy • Access Control • Vulnerability Testing • API Security • Compliance",
  },
  {
    icon: CheckCircle,
    title: "Healthcare Reliability",
    description:
      "Regression • Performance • Availability • Integration • End-to-End Workflows",
  },
];

export default function HealthcareTestingPositioning() {
  return (
    <section className="relative w-full pt-4 lg:pt-6 pb-4 lg:pb-6 bg-transparent overflow-hidden font-sans">
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
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#ea580c]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Content Side */}
          <div className="relative z-10 flex-[1.25] p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start">

            {/* WHY SOFTREE Eyebrow Pill */}
            <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/70 px-4 py-1.5 rounded-full border border-white/60 mb-5 inline-block">
              <span className="typo-caption text-[#ea580c] uppercase">
                WHY SOFTREE
              </span>
            </div>

            {/* Headline */}
            <h2 className="typo-heading-2 text-slate-900 mb-4 max-w-xl">
              Healthcare Applications Need <br className="hidden lg:block" />
              <span className="text-[#ea580c]">Engineering-Grade Testing</span>
            </h2>

            {/* Description Paragraph */}
            <div className="typo-description text-slate-600 max-w-xl mb-8 space-y-4">
              <p>
                Traditional software testing isn&apos;t enough for healthcare applications that handle sensitive patient data, clinical workflows, APIs, and critical healthcare processes.
              </p>
              <p>
                Softree combines healthcare testing + test automation + security testing to help healthcare organizations validate applications before and after production.
              </p>
            </div>

            {/* 3 Feature Items List */}
            <div className="flex flex-col gap-5 w-full max-w-xl">
              {FEATURES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full border border-orange-200/80 bg-orange-50/80 flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:border-[#ea580c]/40 group-hover:bg-orange-100/60 transition-colors duration-200">
                      <Icon className="w-5 h-5 text-[#ea580c]" />
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
                text="TALK TO OUR HEALTHCARE TESTING TEAM"
                variant="orange-filled"
              />
            </div>

          </div>

          {/* Right Image Side */}
          <div className="relative flex-1 min-h-[360px] sm:min-h-[440px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-100 flex items-center justify-center bg-slate-900">
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
