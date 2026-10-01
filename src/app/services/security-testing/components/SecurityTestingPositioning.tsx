"use client";

import React from "react";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Network, Repeat, Zap, RefreshCcw, LucideIcon } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

import { typography } from "@/lib/typography";
interface FeatureItem {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    number: "01",
    icon: Monitor,
    title: "Web Application Security Testing",
    description:
      "Identify security vulnerabilities across websites, portals, dashboards, and enterprise applications through comprehensive application security testing.",
  },
  {
    number: "02",
    icon: Smartphone,
    title: "Mobile Application Security Testing",
    description:
      "Assess Android and iOS applications for security weaknesses across authentication, data protection, APIs, device interactions, and application workflows.",
  },
  {
    number: "03",
    icon: Network,
    title: "API & Integration Security Testing",
    description:
      "Test REST and SOAP APIs, integrations, authentication mechanisms, authorization controls, data flows, and backend services for security vulnerabilities.",
  },
  {
    number: "04",
    icon: Repeat,
    title: "Vulnerability Assessment",
    description:
      "Identify, analyze, and prioritize application vulnerabilities to help development teams address security risks before they impact production environments.",
  },
  {
    number: "05",
    icon: Zap,
    title: "Penetration Testing",
    description:
      "Simulate controlled security attacks to identify exploitable vulnerabilities and evaluate the effectiveness of application security controls.",
  },
  {
    number: "06",
    icon: RefreshCcw,
    title: "Continuous Security Testing & DevSecOps",
    description:
      "Integrate security testing into CI/CD pipelines to continuously validate application changes, identify vulnerabilities earlier, and support secure software releases.",
  },
];

export default function SecurityTestingPositioning() {
  return (
    <section className="relative w-full pt-2 lg:pt-3 pb-4 lg:pb-6 bg-transparent overflow-hidden font-sans">
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

          {/* Light orange background glow */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#ea580c]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Content Side (50% width on desktop) */}
          <div className="relative z-10 flex-1 lg:w-1/2 p-6 sm:p-8 lg:p-8 xl:p-9 flex flex-col justify-center items-start">

            {/* WHAT WE TEST Eyebrow Pill */}
            <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/70 px-3.5 py-1 rounded-full border border-white/60 mb-3 inline-block">
              <span className={`${typography.caption.default} text-[#ea580c] uppercase font-semibold text-[11px] sm:text-xs`}>
                WHAT WE TEST
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight leading-snug mb-2.5 max-w-2xl">
              From Applications to APIs,{" "}
              <span className="text-[#ea580c]">
                We Test the Complete Security Lifecycle
              </span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal max-w-2xl mb-5">
              Softree provides end-to-end security testing services across web, mobile, APIs, enterprise applications, and software environments—helping teams identify vulnerabilities, validate security controls, protect sensitive data, and improve application resilience.
            </p>

            {/* 6 Feature Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-3xl mb-5">
              {FEATURES.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.number} className="flex items-start gap-3 group p-1.5 sm:p-2 rounded-xl hover:bg-slate-50/80 transition-colors duration-200">
                    <div className="w-[34px] h-[34px] rounded-lg border border-orange-200/80 bg-orange-50/80 flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:border-[#ea580c]/40 group-hover:bg-orange-100/60 transition-colors duration-200">
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
                text="TALK TO OUR SECURITY TESTING TEAM"
                variant="orange-filled"
              />
            </div>

          </div>

          {/* Right Image Side */}
          <div className="relative flex-1 min-h-[360px] sm:min-h-[440px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-100 flex items-center justify-center bg-slate-900">
            {/* The background video */}
            <video
              src="/ai-development-service-video/security-position-video.mp4"
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
