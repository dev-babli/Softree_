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
        AI AGENT DEVELOPMENT SUCCESS STORIES
      </div>
      <span className={`${typography.heading.h2} text-slate-900 leading-tight text-left`}>
        Successful AI Agent Implementations Built for <span className="text-orange-600">Enterprise Automation</span>
      </span>
    </div>
  ),

  description:
    "Explore how AI agents help organizations connect enterprise systems, streamline business workflows, and improve access to information through intelligent automation and custom AI solutions.",

  items: [
    {
      id: "ai-voice-assistant-logistics",
      title: "AI Voice Assistant for Logistics Operations",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            A South Korean logistics company planned a voice AI agent to reduce shipment-status enquiries by up to 35% and streamline operations.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "35%", label: "Fewer Shipment Enquiries" },
              { value: "30%", label: "Faster Delay Identification" },
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
      href: "/case-studies/ai-voice-assistant-logistics-operations-agent",
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
      id: "agentic-ai-supply-chain",
      title: "Agentic AI for Supply Chain Procurement",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            See how Softree used Agentic AI, Amazon Bedrock and Nova 2 Sonic to automate procurement, supplier coordination, and supply-chain monitoring.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "40%", label: "Less Coordination Effort" },
              { value: "100%", label: "Human Oversight for Decisions" },
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
      href: "/case-studies/agentic-ai-supply-chain-procurement",
      bgComponent: <AnimatedGradient config={{ preset: "Lava" }} />,
    },
    {
      id: "enterprise-employee-knowledge-search",
      title: "Employee Knowledge Discovery & Search Assistant",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            A leading IT services organization improved employee knowledge access with a SharePoint-based AI assistant, reducing manual document search effort.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "Faster", label: "Knowledge Discovery" },
              { value: "100%", label: "RAG-Based Grounding" },
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
      href: "/case-studies/enterprise-employee-knowledge-search-assistant",
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
      id: "ai-healthcare-patient-care-coordinator",
      title: "AI Healthcare Patient Care Coordinator",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Manual patient coordination created administrative workload. Softree built an AI agent to streamline routine appointments, follow-ups, and patient requests.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "40%", label: "Reduced Coordination Work" },
              { value: "35%", label: "Faster Routine Scheduling" },
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
      href: "/case-studies/ai-healthcare-patient-care-coordinator",
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
      id: "automated-hr-operations-ai",
      title: "Enterprise HR Operations Automation Using AI",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            An AI-powered HR Assistant built on Microsoft Power Platform that automates employee onboarding, leave management, and HR workflows with 24/7 self-service.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "24/7", label: "HR Self-Service" },
              { value: "100%", label: "Automated Lifecycle" },
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
      href: "/case-studies/how-an-enterprise-organization-automated-hr-operations-using-ai",
      bgComponent: (
        <AnimatedGradient
          config={{
            preset: "custom",
            color1: "#111111",
            color2: "#EA3C12",
            color3: "#0a0f1d",
            rotation: 45,
            proportion: 50,
            scale: 0.5,
            speed: 25,
            distortion: 3,
            swirl: 40,
            swirlIterations: 4,
            softness: 80,
            offset: -100,
            shape: "Checks",
            shapeSize: 35,
          }}
        />
      ),
    },
  ],
};

export function AIAgentsSuccessStories() {
  return (
    <div className="relative bg-white flex flex-col items-center -mt-4 md:-mt-8 -mb-8 md:-mb-12">
      <div className="w-full">
        <Gallery4
          {...caseStudyData}
          action={
            <FlowButton
              href="/case-studies"
              text="VIEW AI AGENT SUCCESS STORIES"
              variant="orange-filled"
              className="py-3 px-6 text-xs sm:text-sm font-bold shadow-md"
            />
          }
        />
      </div>
    </div>
  );
}

export default AIAgentsSuccessStories;
