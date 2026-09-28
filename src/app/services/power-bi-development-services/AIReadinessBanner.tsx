"use client";

import React from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Database, Boxes, Rocket, Users, LucideIcon } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";
import { typography } from "@/lib/typography";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: LayoutDashboard,
    title: "Power BI Dashboard & Report Development",
    description:
      "Build interactive Power BI dashboards and reports that turn complex business data into clear, actionable insights.",
  },
  {
    icon: Database,
    title: "Data Integration & Power Query",
    description:
      "Connect, transform, and prepare data from databases, business applications, cloud platforms, Excel, and other enterprise data sources.",
  },
  {
    icon: Boxes,
    title: "Data Modeling & DAX",
    description:
      "Design scalable semantic data models and optimized DAX measures for accurate, high-performing analytics.",
  },
  {
    icon: Rocket,
    title: "Power BI Implementation & Optimization",
    description:
      "Take Power BI solutions from requirements through development, deployment, security, performance optimization, and ongoing enhancements.",
  },
  {
    icon: Users,
    title: "Offshore Power BI Engineering",
    description:
      "Extend your team with dedicated Power BI developers for ongoing development, support, maintenance, and new analytics initiatives.",
  },
];

export default function AIReadinessBanner() {
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
              <span className={`${typography.caption.default} text-[#FF6B2C]`}>
                POWER BI DEVELOPMENT SERVICES
              </span>
            </div>

            {/* Headline */}
            <h2 className={`${typography.heading.h2} text-slate-900 mb-4 max-w-xl`}>
              An Offshore Power BI Team That Turns Data Into <br />
              <span className="text-[#FF6B2C]">Business Decisions</span>
            </h2>

            {/* Description Paragraph */}
            <p className={`${typography.description.default} text-slate-600 max-w-xl mb-8`}>
              Extend your analytics capabilities with a dedicated offshore Power BI team that builds dashboards, reports, data models, and business intelligence solutions around your data and business goals.
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
                      <h4 className={`${typography.heading.h4} text-slate-900 mb-1`}>
                        {item.title}
                      </h4>
                      <p className={`${typography.body.sm} text-slate-500`}>
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
                text="BUILD YOUR POWER BI TEAM"
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
