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
      <h2 className={`${typography.heading.h2} text-slate-900 leading-tight text-left`}>
        AI Copilot Development Success Stories: <span className="text-orange-600">Real-World AI Solutions</span>
      </h2>
    </div>
  ) as any,

  description:
    "Explore how Softree Technology helps businesses build custom AI copilots to automate workflows, improve knowledge access, and integrate AI into existing business applications with offshore AI engineering support.",

  items: [
    {
      id: "healthcare",
      title: "Multi-Specialty Healthcare Network",
      label: "Healthcare",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Softree streamlined Electronic Medical Records (EMR) workflows for a multi-specialty healthcare network using an AI Copilot, reducing manual record processing and improving approval efficiency.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "↑ 70%", label: "Faster Information Retrieval" },
              { value: "↑ 55%", label: "Reduced Administrative Work" },
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
      href: "/case-studies/electronic-medical-records-workflow-automation",
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
      id: "hr",
      title: "HR Assistant Copilot Agent",
      label: "Human Resources",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            An AI-powered HR Assistant built on Microsoft Power Platform that automates employee onboarding, leave management, HR policy search, employee queries, and internal knowledge retrieval.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "↑ 75%", label: "HR Productivity" },
              { value: "↑ 65%", label: "Employee Satisfaction" },
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
      bgComponent: <AnimatedGradient config={{ preset: "Lava" }} />,
    },

    {
      id: "process-automation",
      title: "AI-Powered Process Discovery Copilot",
      label: "Process Automation",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Built an AI-powered Process Discovery Copilot that identifies business bottlenecks, analyses operational processes, recommends automation opportunities, and accelerates digital transformation.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "↑ 50%", label: "Reduced Bottlenecks" },
              { value: "↑ 80%", label: "Process Visibility" },
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
      href: "/case-studies/ai-powered-process-discovery-copilot",
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
      id: "it",
      title: "AI-Powered Task Automation in Power Apps",
      label: "Information Technology",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}>
            Developed an AI Copilot integrated with Microsoft Power Apps that automates repetitive tasks, streamlines approvals, enhances productivity, and reduces manual effort across enterprise workflows.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "↑ 60%", label: "Task Automation" },
              { value: "↑ 40%", label: "Manual Effort Reduction" },
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
      href: "/case-studies/ai-powered-task-automation-copilot-power-apps",
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

export function CopilotCaseStudies() {
  return (
    <div className="relative bg-white flex flex-col items-center -mt-4 md:-mt-8 -mb-8 md:-mb-12">
      <div className="w-full">
        <Gallery4
          {...caseStudyData}
          action={
            <FlowButton
              href="/case-studies"
              text="Explore AI Copilot Case Studies"
              variant="orange-filled"
              className="py-3 px-6 text-xs sm:text-sm font-bold shadow-md"
            />
          }
        />
      </div>
    </div>
  );
}

export default CopilotCaseStudies;
