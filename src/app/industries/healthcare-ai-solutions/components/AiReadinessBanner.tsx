"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Tag, Users, CheckCircle2, UserPlus } from "lucide-react";
import Link from "next/link";
import { FlowButton } from "@/components/ui/flow-button";

export default function AiReadinessBanner() {
  return (
    <section className="relative w-full pt-2 lg:pt-4 pb-8 lg:pb-10 bg-transparent overflow-hidden font-sans">
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm]">

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
          <div className="relative z-10 flex-1 lg:flex-[0.95] xl:flex-[0.85] p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center items-start">

            {/* Insight tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
              How We Partner
            </div>

            {/* Headline */}
            <h2 className="typo-heading-2 leading-[1.05] mb-4">
              <span className="text-slate-900 block sm:whitespace-nowrap">Your Project. Your Brand.</span>
              <span className="text-[#FF6B2C] block sm:whitespace-nowrap">Our Engineering Team.</span>
            </h2>

            {/* Description Paragraph */}
            <p className="typo-description text-slate-500 max-w-lg mb-5 text-left">
              Choose the engagement model that works best for your business. We can work behind the scenes, alongside your team, or take ownership of project delivery.
            </p>

            {/* Vertical List of Items */}
            <div className="flex flex-col w-full max-w-xl mb-5">

              {/* Item 1 */}
              <div className="flex items-start gap-3 py-2.5 border-b border-slate-100">
                <div className="relative shrink-0 mt-0.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#FF6B2C]/30 flex items-center justify-center bg-white shadow-sm">
                    <Tag className="w-[15px] h-[15px] sm:w-4 sm:h-4 text-[#FF6B2C]" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="typo-heading-4 text-slate-900 mb-0.5">01 — White-Label Partnership</h4>
                  <p className="typo-body-sm text-slate-500">
                    Your brand and client relationship stay with you. Softree provides the healthcare engineering team behind the scenes.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3 py-2.5 border-b border-slate-100">
                <div className="relative shrink-0 mt-0.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#FF6B2C]/30 flex items-center justify-center bg-white shadow-sm">
                    <Users className="w-[15px] h-[15px] sm:w-4 sm:h-4 text-[#FF6B2C]" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="typo-heading-4 text-slate-900 mb-0.5">02 — Dedicated Healthcare Team</h4>
                  <p className="typo-body-sm text-slate-500">
                    Build a dedicated team aligned with your product, roadmap, and long-term requirements.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3 py-2.5 border-b border-slate-100">
                <div className="relative shrink-0 mt-0.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#FF6B2C]/30 flex items-center justify-center bg-white shadow-sm">
                    <CheckCircle2 className="w-[15px] h-[15px] sm:w-4 sm:h-4 text-[#FF6B2C]" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="typo-heading-4 text-slate-900 mb-0.5">03 — Project Delivery</h4>
                  <p className="typo-body-sm text-slate-500">
                    Bring us the requirement and we provide the engineering team to design, build, test, and deliver the solution.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-start gap-3 pt-2.5">
                <div className="relative shrink-0 mt-0.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#FF6B2C]/30 flex items-center justify-center bg-white shadow-sm">
                    <UserPlus className="w-[15px] h-[15px] sm:w-4 sm:h-4 text-[#FF6B2C]" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="typo-heading-4 text-slate-900 mb-0.5">04 — Team Augmentation</h4>
                  <p className="typo-body-sm text-slate-500">
                    Extend your existing team with healthcare-focused engineers and technical specialists.
                  </p>
                </div>
              </div>

            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <FlowButton
                href="/contact"
                text="BUILD YOUR MEDICAL AI TEAM"
                variant="orange-filled"
              />
            </div>

          </div>

          {/* Right Image Side */}
          <div className="relative flex-1 lg:flex-[1.05] xl:flex-[1.15] min-h-[280px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-100 flex items-center justify-center bg-slate-900">
            {/* The robot image / background video */}
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

