"use client";

import React from "react";
import { Gallery4, Gallery4Props } from "@/components/blocks/gallery4";
import { FlowButton } from "@/components/ui/flow-button";
import AnimatedGradient from "@/components/ui/animated-gradient";
import { typography } from "@/lib/typography";

const caseStudyData: Gallery4Props = {
  title: (
    <div className="flex flex-col items-start">
      <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 ${typography.caption.default} text-[#FF6B00] uppercase mb-4 w-fit`}>
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
        CLIENT SUCCESS STORIES
      </div>
      <span className={`${typography.heading.h2} text-slate-900 leading-tight text-left`}>
        AI Consulting Success Stories: <span className="text-orange-600">Real-World AI Solutions</span>
      </span>
    </div>
  ) as any,

  description:
    "Explore how businesses use AI for workflow automation, employee support, performance insights, and smarter healthcare, manufacturing, and logistics operations.",

  items: [
    {
      id: "hr-assistant-copilot",
      title: "HR Assistant Copilot Agent",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            An AI-powered HR Assistant built on Microsoft Power Platform that automates employee onboarding, leave management, HR requests and internal employee support.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "Automated", label: "HR Workflows" },
              { value: "Improved", label: "Employee Self-Service" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[70px]">
                  {result.value}
                </span>
                <span className={`text-white/80 ${typography.caption.meta} uppercase tracking-wider`}>
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      href: "/case-studies/how-an-enterprise-organization-automated-hr-operations-using-ai",
      bgComponent: (
        <AnimatedGradient
          config={{
            preset: "custom",
            color1: "#050505",
            color2: "#FF4500",
            color3: "#050505",
            rotation: 0,
            proportion: 33,
            scale: 0.48,
            speed: 39,
            distortion: 4,
            swirl: 65,
            swirlIterations: 5,
            softness: 100,
            offset: -235,
            shape: "Edge",
            shapeSize: 48,
          }}
        />
      ),
    },
    {
      id: "ai-performance-intelligence-report",
      title: "AI Performance Intelligence Report",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Softree Technology&apos;s AI Performance Intelligence Report identifies these issues in minutes using advanced AI analysis.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "5 Min", label: "Audit Completion" },
              { value: "100+", label: "Automated Performance Checks" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[55px]">
                  {result.value}
                </span>
                <span className={`text-white/80 ${typography.caption.meta} uppercase tracking-wider`}>
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      href: "/case-studies/ai-powered-website-performance-platform",
      bgComponent: <AnimatedGradient config={{ preset: "Lava" }} />,
    },
    {
      id: "ai-powered-healthcare-operations-platform",
      title: "AI-Powered Healthcare Operations Platform",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Softree helped a multi-specialty healthcare provider streamline operations using AI Agents and Microsoft Power Platform.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "58%", label: "Admin Work Reduction" },
              { value: "46%", label: "Faster Appointment Scheduling" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[50px]">
                  {result.value}
                </span>
                <span className={`text-white/80 ${typography.caption.meta} uppercase tracking-wider`}>
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      href: "/case-studies/ai-powered-healthcare-operations-platform",
      bgComponent: (
        <AnimatedGradient
          config={{
            preset: "custom",
            color1: "#050505",
            color2: "#FF6B00",
            color3: "#1a0b04",
            rotation: -50,
            proportion: 1,
            scale: 0.01,
            speed: 30,
            distortion: 0,
            swirl: 50,
            swirlIterations: 16,
            softness: 47,
            offset: -299,
            shape: "Checks",
            shapeSize: 45,
          }}
        />
      ),
    },
    {
      id: "ai-powered-manufacturing-operations-platform",
      title: "AI-Powered Manufacturing Operations Platform",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Developed an AI-powered manufacturing operations platform that automates production planning, predicts equipment failures, monitors factory performance and provides real-time operational intelligence.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "55%", label: "Manual Scheduling Reduction" },
              { value: "48%", label: "Unplanned Downtime Reduction" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[50px]">
                  {result.value}
                </span>
                <span className={`text-white/80 ${typography.caption.meta} uppercase tracking-wider`}>
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      href: "/case-studies/ai-powered-manufacturing-operations-platform",
      bgComponent: (
        <AnimatedGradient
          config={{
            preset: "custom",
            color1: "#FF7300",
            color2: "#000000",
            color3: "#000000",
            rotation: 0,
            proportion: 63,
            scale: 0.75,
            speed: 30,
            distortion: 5,
            swirl: 61,
            swirlIterations: 5,
            softness: 100,
            offset: -168,
            shape: "Checks",
            shapeSize: 28,
          }}
        />
      ),
    },
    {
      id: "ai-competitive-gap-report",
      title: "AI Competitive Gap Report That Helps Businesses Outperform Their Competitors",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Built an AI-powered Competitive Intelligence platform that automatically scans competitor websites, benchmarks capabilities, detects changes and generates executive-ready reports.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "85%", label: "Manual Analysis Reduction" },
              { value: "< 2 Min", label: "Website Analysis Completed" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[55px]">
                  {result.value}
                </span>
                <span className={`text-white/80 ${typography.caption.meta} uppercase tracking-wider`}>
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      href: "/case-studies/ai-competitive-gap-report-businesses-outperform-competitors",
      bgComponent: (
        <AnimatedGradient
          config={{
            preset: "custom",
            color1: "#0a0a0a",
            color2: "#FF5500",
            color3: "#150800",
            rotation: 45,
            proportion: 40,
            scale: 0.5,
            speed: 35,
            distortion: 6,
            swirl: 70,
            swirlIterations: 8,
            softness: 90,
            offset: 120,
            shape: "Edge",
            shapeSize: 35,
          }}
        />
      ),
    },
    {
      id: "ai-shipment-delay-prediction-platform",
      title: "AI-Powered Shipment Delay Prediction Platform",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Developed an AI-powered shipment prediction platform that analyzes logistics data, predicts delays, recommends optimal routes and provides real-time operational insights.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "91.2%", label: "Prediction Accuracy" },
              { value: "34%", label: "Fewer Delivery Delays" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[55px]">
                  {result.value}
                </span>
                <span className={`text-white/80 ${typography.caption.meta} uppercase tracking-wider`}>
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      href: "/case-studies/ai-shipment-delay-prediction-platform",
      bgComponent: (
        <AnimatedGradient
          config={{
            preset: "Lava",
            speed: 25,
            color1: "#FF8C00",
            color2: "#FF3B00",
            color3: "#050505",
          }}
        />
      ),
    },
  ],
};

export function SuccessStories() {
  return (
    <div className="relative bg-white flex flex-col items-center -mt-4 md:-mt-8 -mb-8 md:-mb-12">
      <div className="w-full">
        <Gallery4
          {...caseStudyData}
          action={
            <FlowButton
              href="/case-studies"
              text="Explore AI Consulting Case Studies"
              variant="orange-filled"
              className="py-3 px-6 text-xs sm:text-sm font-bold shadow-md"
            />
          }
        />
      </div>
    </div>
  );
}

export default SuccessStories;
