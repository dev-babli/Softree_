"use client";

import React from "react";
import { Gallery4, Gallery4Props } from "@/components/blocks/gallery4";
import { FlowButton } from "@/components/ui/flow-button";
import AnimatedGradient from "@/components/ui/animated-gradient";
import { typography } from "@/lib/typography";

export const CASE_STUDIES = [
  {
    title: "Operating Room Scheduling Automation & Coordination",
    description:
      "A Dubai hospital explores AI-powered operating room scheduling to identify resource conflicts, coordinate surgical teams, and improve operational visibility.",
    href: "/case-studies/operating-room-scheduling-optimization-agent",
    image:
      "https://cdn.sanity.io/images/1zmh4sfw/production/c003c4f562efd4f2a942e050daa7329078bd219a-1670x941.png",
    imageAlt: "Operating Room Scheduling Automation & Coordination",
    category: "ai",
    industry: "Healthcare & Hospital Operations",
    useCase:
      "AI Agents, Healthcare Operations, Scheduling Optimization, Resource Coordination",
    technologies: [
      "Amazon Bedrock",
      "Amazon Bedrock AgentCore",
      "Amazon Bedrock Knowledge Bases",
      "Amazon S3",
      "Amazon DynamoDB",
      "AWS Lambda",
      "Amazon EventBridge",
      "AWS Step Functions",
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Amazon Cognito",
      "AWS IAM",
      "AWS KMS",
      "Amazon CloudWatch",
      "FHIR APIs",
      "Hospital Information System APIs",
    ],
  },
  {
    title: "Proof Of Delivery & Logistics Dispute Resolution Agent",
    description:
      "Discover how an AI-powered logistics agent uses Amazon Bedrock and RAG to organize delivery evidence, detect documentation gaps, and streamline dispute resolution.",
    href: "/case-studies/proof-of-delivery-dispute-resolution-agent",
    image:
      "https://cdn.sanity.io/images/1zmh4sfw/production/02260dc9f32dd014b2f1ca3dd981d2fa8047f47f-1672x941.png",
    imageAlt: "Proof Of Delivery & Logistics Dispute Resolution Agent",
    category: "ai",
    industry: "Logistics & Supply Chain",
    useCase:
      "AI Agents, Process Automation, Logistics Operations, Dispute Resolution",
    technologies: [
      "Amazon Bedrock",
      "Amazon Bedrock AgentCore",
      "Amazon Bedrock Knowledge Bases",
      "Amazon S3",
      "AWS Lambda",
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Amazon DynamoDB",
      "AWS Step Functions",
      "Amazon EventBridge",
      "Amazon Cognito",
      "AWS IAM",
      "AWS KMS",
      "Amazon CloudWatch",
    ],
  },
  {
    title: "Clinical Trial Recruitment & Patient Eligibility Screening",
    description:
      "AI clinical trial eligibility agent uses Amazon Bedrock and RAG to organize authorized patient screening and prepare evidence-linked summaries for research teams.",
    href: "/case-studies/clinical-trial-recruitment-eligibility-agent",
    image:
      "https://cdn.sanity.io/images/1zmh4sfw/production/fdb79a669589d127555c826f2781c361940d6f13-1672x941.png",
    imageAlt: "Clinical Trial Recruitment & Patient Eligibility Screening",
    category: "ai",
    industry: "Healthcare & Clinical Research",
    useCase:
      "AI Agents, Clinical Trial Recruitment, Eligibility Screening, Healthcare Operations",
    technologies: [
      "Amazon Bedrock",
      "Amazon Bedrock AgentCore",
      "Amazon Bedrock Knowledge Bases",
      "Amazon S3",
      "Amazon Textract",
      "Amazon DynamoDB",
      "AWS Lambda",
      "AWS Step Functions",
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "AWS IAM",
      "AWS KMS",
      "Amazon CloudWatch",
      "FHIR APIs",
    ],
  },
  {
    title: "Healthcare Regression Testing with MedSynq Nexus",
    description:
      "MedSynq Nexus uses AI-assisted impact analysis to prioritize healthcare regression tests, targeting up to 60% shorter regression cycles in eligible scenarios.",
    href: "/case-studies/healthcare-regression-testing-medsynq-nexus",
    image:
      "https://cdn.sanity.io/images/1zmh4sfw/production/6fdaadbcc9bb27ce8388838d31769c2fb64a096e-1672x941.png",
    imageAlt: "Healthcare Regression Testing with MedSynq Nexus",
    category: "ai",
    industry: "Healthcare Technology & Digital Health",
    useCase:
      "AI Testing, Quality Engineering, Test Automation, Healthcare Operations",
    technologies: [
      "Python",
      "Playwright",
      "Selenium",
      "Postman / Newman",
      "REST Assured",
      "Azure DevOps",
      "GitHub Actions",
      "Azure Test Plans",
      "Jira",
      "TestRail",
      "SQL",
      "OpenAPI",
      "AI / LLM-based impact analysis",
    ],
  },
  {
    title: "AI Healthcare Inventory & Equipment Readiness Agent",
    description:
      "Softree designed an AI healthcare agent to monitor inventory, flag expiry risks, assess equipment readiness, and coordinate replenishment across hospital departments.",
    href: "/case-studies/ai-healthcare-inventory-equipment-readiness-agent",
    image:
      "https://cdn.sanity.io/images/1zmh4sfw/production/c20ae6c513ebff54b4a35dbc20c51a7c33053c52-1672x941.png",
    imageAlt: "AI Healthcare Inventory & Equipment Readiness Agent",
    category: "ai",
    industry: "Healthcare",
    useCase:
      "AI Agents, Healthcare Operations, Inventory Management, Process Automation",
    technologies: [
      "Amazon Bedrock",
      "Amazon Bedrock AgentCore",
      "Amazon Bedrock Knowledge Bases",
      "Amazon S3",
      "Python",
      "FastAPI",
      "AWS Lambda",
      "React",
      "TypeScript",
      "Amazon DynamoDB",
      "Amazon EventBridge",
      "AWS Step Functions",
      "Amazon Cognito",
      "AWS IAM",
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
        AMAZON BEDROCK SUCCESS STORIES
      </div>
      <span className={`${typography.heading.h2} text-slate-900 leading-tight text-left`}>
        Amazon Bedrock AgentCore Success Stories Built for <span className="text-orange-600">Real-World Business Challenges</span>
      </span>
    </div>
  ),

  description:
    "Explore how Amazon Bedrock AgentCore, autonomous multi-agent systems, and intelligent workflow automation help enterprises streamline operations, coordinate mission-critical workflows, and scale generative AI capabilities.",

  items: [
    {
      id: "operating-room-scheduling-automation",
      title: "Operating Room Scheduling Automation & Coordination",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            A Dubai hospital explores AI-powered operating room scheduling to identify resource conflicts, coordinate surgical teams, and improve operational visibility.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "40%", label: "Reduction in Manual Scheduling" },
              { value: "100%", label: "Resource Coordination Visibility" },
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
      href: "/case-studies/operating-room-scheduling-optimization-agent",
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
      id: "proof-of-delivery-logistics-dispute",
      title: "Proof Of Delivery & Logistics Dispute Resolution Agent",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Discover how an AI-powered logistics agent uses Amazon Bedrock and RAG to organize delivery evidence, detect documentation gaps, and streamline dispute resolution.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "80%", label: "Reduction in Manual Evidence Collection" },
              { value: "100%", label: "Evidence Traceability Target" },
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
      href: "/case-studies/proof-of-delivery-dispute-resolution-agent",
      bgComponent: <AnimatedGradient config={{ preset: "Lava" }} />,
    },
    {
      id: "clinical-trial-recruitment-screening",
      title: "Clinical Trial Recruitment & Patient Eligibility Screening",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            AI clinical trial eligibility agent uses Amazon Bedrock and RAG to organize authorized patient screening and prepare evidence-linked summaries for research teams.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "90%", label: "Target Screening Accuracy" },
              { value: "80%", label: "Screening Time Reduction" },
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
      href: "/case-studies/clinical-trial-recruitment-eligibility-agent",
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
      id: "healthcare-regression-testing-medsynq",
      title: "Healthcare Regression Testing with MedSynq Nexus",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            MedSynq Nexus uses AI-assisted impact analysis to prioritize healthcare regression tests, targeting up to 60% shorter regression cycles in eligible scenarios.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "60%", label: "Shorter Regression Cycles" },
              { value: "85%", label: "Automated Regression Coverage" },
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
      href: "/case-studies/healthcare-regression-testing-medsynq-nexus",
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
      id: "ai-healthcare-inventory-equipment-readiness",
      title: "AI Healthcare Inventory & Equipment Readiness Agent",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Softree designed an AI healthcare agent to monitor inventory, flag expiry risks, assess equipment readiness, and coordinate replenishment across hospital departments.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "80%", label: "Inventory Monitoring Coverage" },
              { value: "100%", label: "Equipment Readiness Visibility" },
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
      href: "/case-studies/ai-healthcare-inventory-equipment-readiness-agent",
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

export function AgentCoreSuccessStories() {
  return (
    <div className="relative bg-white flex flex-col items-center -mt-10 md:mt-12">
      <div className="w-full">
        <Gallery4
          {...caseStudyData}
          action={
            <FlowButton
              href="/case-studies"
              text="VIEW AMAZON BEDROCK SUCCESS STORIES"
              variant="orange-filled"
              className="py-3 px-6 text-xs sm:text-sm font-bold shadow-md"
            />
          }
        />
      </div>
    </div>
  );
}

export default AgentCoreSuccessStories;

