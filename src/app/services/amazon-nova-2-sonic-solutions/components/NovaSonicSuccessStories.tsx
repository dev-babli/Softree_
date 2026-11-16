"use client";

import React from "react";
import { Gallery4, Gallery4Props } from "@/components/blocks/gallery4";
import { FlowButton } from "@/components/ui/flow-button";
import AnimatedGradient from "@/components/ui/animated-gradient";
import { typography } from "@/lib/typography";

export const CASE_STUDIES = [
  {
    title: "Intelligent AI for Warehouse & Dock Scheduling",
    description:
      "An AI-powered scheduling agent to analyze warehouse operations, identify dock conflicts, recommend feasible rescheduling options, and improve coordination across carriers, planners, and warehouse teams.",
    href: "/case-studies/intelligent-ai-warehouse-dock-scheduling",
    image:
      "https://cdn.sanity.io/images/1zmh4sfw/production/baf1e6c844e8493df45caab01c7fa8adb3725a82-1672x941.png",
    imageAlt: "Intelligent AI for Warehouse & Dock Scheduling",
    category: "ai",
    industry: "Warehousing, Distribution & Logistics",
    useCase: "AI Agents, Operations, Process Automation, Warehouse Scheduling",
    technologies: [
      "Amazon Bedrock",
      "Amazon Bedrock AgentCore",
      "Amazon Nova 2 Sonic",
      "WMS/TMS APIs",
      "Appointment APIs",
      "Integration & Event Layer",
      "Identity & Access Controls",
      "Monitoring & Operational Reporting",
    ],
  },
  {
    title: "AI Voice Assistant for Logistics Operations and Shipment Management",
    description:
      "A South Korean logistics company planned a voice AI agent to reduce shipment-status enquiries by up to 35% and streamline operations.",
    href: "/case-studies/ai-voice-assistant-logistics-operations-agent",
    image:
      "https://cdn.sanity.io/images/1zmh4sfw/production/362ba72281acb558f2125aa5ffc2cea7fb4f822e-1672x941.png",
    imageAlt: "AI Voice Assistant for Logistics Operations and Shipment Management",
    category: "ai",
    industry: "Logistics",
    useCase: "AI Agents, Voice AI, Shipment Visibility, Logistics Automation, Operations",
    technologies: [
      "Amazon Nova 2 Sonic",
      "Amazon Bedrock",
      "Amazon Bedrock AgentCore",
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Amazon DynamoDB",
      "Amazon S3",
      "AWS Lambda",
      "Amazon EventBridge",
      "AWS IAM",
      "Amazon CloudWatch",
    ],
  },
  {
    title: "Agentic AI for Supply Chain Procurement",
    description:
      "See how Softree used Agentic AI, Amazon Bedrock and Nova 2 Sonic to automate procurement, supplier coordination and supply-chain monitoring.",
    href: "/case-studies/agentic-ai-supply-chain-procurement",
    image:
      "https://cdn.sanity.io/images/1zmh4sfw/production/3ecea41d03cc8ee00e1905abec47b41953ee137a-1672x941.png",
    imageAlt: "Agentic AI for Supply Chain Procurement",
    category: "ai",
    industry: "Healthcare Supply Chain & Procurement",
    useCase: "Agentic AI, Supply Chain Automation, Procurement Intelligence, Voice AI, Operations",
    technologies: [
      "Amazon Bedrock",
      "Amazon Bedrock AgentCore",
      "Amazon Nova 2 Sonic",
      "Amazon Bedrock Knowledge Bases",
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Amazon DynamoDB",
      "Amazon S3",
      "AWS Lambda",
      "Amazon EventBridge",
      "AWS IAM",
      "Amazon CloudWatch",
    ],
  },
  {
    title: "AI Healthcare Patient Care Coordinator",
    description:
      "Manual patient coordination created repetitive administrative work, delayed responses, and limited support availability, making it difficult for care teams to efficiently manage routine appointments, follow-ups and patient requests.",
    href: "/case-studies/ai-healthcare-patient-care-coordinator",
    image:
      "https://cdn.sanity.io/images/1zmh4sfw/production/4838577d97c413adf034c1909b79897e19e4e7d0-1672x941.png",
    imageAlt: "AI Healthcare Patient Care Coordinator",
    category: "ai",
    industry: "Healthcare",
    useCase: "AI Agents, Process Automation, Customer Experience, Healthcare Operations",
    technologies: [
      "Amazon Nova 2 Sonic",
      "Amazon Bedrock",
      "Amazon Bedrock AgentCore",
      "AgentCore Gateway",
      "AgentCore Identity",
      "AgentCore Memory",
      "Amazon Bedrock Knowledge Bases",
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "Amazon DynamoDB",
      "Amazon S3",
      "AWS Lambda",
      "Amazon EventBridge",
      "Amazon Connect",
      "AWS IAM",
      "AWS KMS",
      "Amazon Cognito",
      "Amazon CloudWatch",
    ],
  },
  {
    title: "Logistics Control Tower for Shipment Exception Management",
    description:
      "A Canadian logistics organization uses an AI-powered control tower to monitor shipments, detect exceptions, and coordinate resolution through Agentic AI and RAG.",
    href: "/case-studies/ai-logistics-control-tower-shipment-exception-management",
    image:
      "https://cdn.sanity.io/images/1zmh4sfw/production/e73b22dd440b5c124809b6294d489fb8274aeb05-1672x941.png",
    imageAlt: "Logistics Control Tower for Shipment Exception Management",
    category: "ai",
    industry: "Logistics & Supply Chain",
    useCase: "AI Agents, Operations, Exception Resolution, Shipment Visibility",
    technologies: [
      "Amazon Bedrock",
      "Amazon Bedrock AgentCore",
      "Amazon Bedrock Knowledge Bases",
      "Amazon Bedrock Foundation Models",
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Amazon DynamoDB",
      "Amazon S3",
      "AWS Lambda",
      "Amazon EventBridge",
      "AWS IAM",
      "Amazon Cognito",
      "AWS KMS",
      "Amazon CloudWatch",
    ],
  },
];

const caseStudyData: Gallery4Props = {
  title: (
    <div className="flex flex-col items-start">
      <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 ${typography.caption.default} text-[#FF6B00] uppercase mb-4 w-fit`}>
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
        AMAZON NOVA 2 SONIC SUCCESS STORIES
      </div>
      <span className={`${typography.heading.h2} text-slate-900 leading-tight text-left`}>
        Amazon Nova 2 Sonic Success Stories Built for <span className="text-orange-600">Real-World Business Challenges</span>
      </span>
    </div>
  ),

  description:
    "Explore how real-time voice AI agents, speech-to-speech intelligence, and autonomous workflow automation built with Amazon Nova 2 Sonic and Bedrock help businesses streamline logistics, healthcare coordination, and operations.",

  items: [
    {
      id: "warehouse-dock-scheduling-ai",
      title: "Intelligent AI for Warehouse & Dock Scheduling",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            An AI-powered scheduling agent to analyze warehouse operations, identify dock conflicts, recommend feasible rescheduling options, and improve coordination across carriers, planners, and warehouse teams.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "80%", label: "Automated Scheduling Recommendations" },
              { value: "100%", label: "Schedule Visibility" },
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
      href: "/case-studies/intelligent-ai-warehouse-dock-scheduling",
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
      id: "ai-voice-assistant-logistics-operations",
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
      bgComponent: <AnimatedGradient config={{ preset: "Lava" }} />,
    },
    {
      id: "agentic-ai-supply-chain-procurement",
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
            Manual patient coordination created repetitive administrative work, delayed responses, and limited support availability. Softree built an AI agent to streamline routine appointments and care follow-ups.
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
      id: "logistics-control-tower-shipment-exception",
      title: "Logistics Control Tower for Shipment Exception Management",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            A Canadian logistics organization uses an AI-powered control tower to monitor shipments, detect exceptions, and coordinate resolution through Agentic AI and RAG.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "45%", label: "Faster Exception Resolution" },
              { value: "100%", label: "End-to-End Visibility" },
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
      href: "/case-studies/ai-logistics-control-tower-shipment-exception-management",
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

export function NovaSonicSuccessStories() {
  return (
    <div className="relative bg-white flex flex-col items-center -mt-8 md:mt-10">
      <div className="w-full">
        <Gallery4
          {...caseStudyData}
          action={
            <FlowButton
              href="/case-studies"
              text="VIEW AMAZON NOVA SUCCESS STORIES"
              variant="orange-filled"
              className="py-3 px-6 text-xs sm:text-sm font-bold shadow-md"
            />
          }
        />
      </div>
    </div>
  );
}

export default NovaSonicSuccessStories;

