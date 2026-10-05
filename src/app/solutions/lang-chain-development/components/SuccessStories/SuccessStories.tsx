"use client";

import React from "react";
import { Gallery4, Gallery4Props } from "@/components/blocks/gallery4";
import { FlowButton } from "@/components/ui/flow-button";

const caseStudyData: Gallery4Props = {
  title: (
    <div className="flex flex-col items-start">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-4 w-fit">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
        LANGCHAIN CASE STUDIES
      </div>
      <span className="typo-heading-2 text-slate-900 leading-tight text-left">
        LangChain in Action <span className="text-orange-600">Across Real-World Applications</span>
      </span>
    </div>
  ) as any,

  description:
    "Explore how LangChain development, RAG pipelines, LangGraph agents, and tool integrations help improve AI reliability, accelerate execution, and automate enterprise workflows.",

  items: [
    {
      id: "langchain-hr-knowledge-agent",
      title: "LangChain HR Knowledge Agent & Enterprise RAG Platform",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className="text-white/90 typo-body-sm leading-relaxed mb-3 border-b border-white/10 pb-3">
            Built a RAG-grounded LangChain agent with tool calling for HR requests and scoped access to internal documents, reducing HR support volume.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "60%", label: "Support Ticket Deflection" },
              { value: "3.5x", label: "Faster Policy Answers" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[36px]">
                  {result.value}
                </span>
                <span className="text-white/80 typo-caption-meta uppercase tracking-wider">
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      href: "/case-studies/how-an-enterprise-organization-automated-hr-operations-using-ai",
      image: "/images/ai-development-services/step-1.jpg",
    },
    {
      id: "langchain-performance-insights-pipeline",
      title: "LangChain Automated Performance Insights & Audit Pipeline",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className="text-white/90 typo-body-sm leading-relaxed mb-3 border-b border-white/10 pb-3">
            Softree built a LangChain multi-step pipeline that automatically analyzes conversion, SEO, and performance signals in minutes.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "5 min", label: "Full Audit Completion" },
              { value: "100+", label: "Automated Signal Checks" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[36px]">
                  {result.value}
                </span>
                <span className="text-white/80 typo-caption-meta uppercase tracking-wider">
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      href: "/case-studies/ai-powered-website-performance-platform",
      image: "/images/ai-development-services/step-2.jpg",
    },
    {
      id: "langgraph-scheduling-agent-team",
      title: "LangGraph Multi-Agent Appointment & Follow-Up Automation",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className="text-white/90 typo-body-sm leading-relaxed mb-3 border-b border-white/10 pb-3">
            Stateful LangGraph agents orchestrate appointment scheduling, reminders, and patient follow-ups with clinical oversight and tool integrations.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "58%", label: "Scheduling Effort Reduction" },
              { value: "3.5x", label: "Faster Inquiry Responses" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[36px]">
                  {result.value}
                </span>
                <span className="text-white/80 typo-caption-meta uppercase tracking-wider">
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      href: "/case-studies/ai-powered-patient-appointment-and-follow-up-automation",
      image: "/images/ai-healthcare-images/health-7.webp",
    },
    {
      id: "enterprise-rag-langchain-copilot",
      title: "Enterprise LangChain RAG & Multi-Tool Copilot Platform",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className="text-white/90 typo-body-sm leading-relaxed mb-3 border-b border-white/10 pb-3">
            Deployed a production LangChain RAG system connected to SharePoint, vector databases, and enterprise APIs with LangSmith observability.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "85%", label: "Knowledge Retrieval Precision" },
              { value: "70%", label: "Faster Research Velocity" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[36px]">
                  {result.value}
                </span>
                <span className="text-white/80 typo-caption-meta uppercase tracking-wider">
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      href: "/case-studies",
      image: "/images/ai-healthcare-images/health-8.webp",
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
              text="Explore LangChain Case Studies"
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
