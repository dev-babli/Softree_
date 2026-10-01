"use client";

import React from "react";
import { Gallery4, Gallery4Props } from "@/components/blocks/gallery4";
import { FlowButton } from "@/components/ui/flow-button";

export type CaseStudy = {
  id: string;
  tags: string[];
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  image: string;
  company: string;
  link: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "healthcare-ai-test-automation",
    tags: ["Healthcare", "AI Test Automation"],
    title: "Healthcare AI Test Automation for Patient Management Platform",
    description:
      "Softree Technology helped a leading healthcare provider achieve 85% test automation coverage and 60% faster... releases using AI-powered test automation.",
    metrics: [], // No specific inline metrics visible beneath description
    image: "/images/ai-development-services/step-1.jpg", // Abstract tech background
    company: "Softree Technology",
    link: "/case-studies/healthcare-ai-test-automation-patient-management-platform",
  },
  {
    id: "neucart-qa-testing",
    tags: [
      "Retail & E-Commerce",
      "Power Platform Quality Assurance & Test Automation",
    ],
    title: "NeuCart PowerApps & Power Automate QA Testing Success Story",
    description:
      "NeuCart improved release speed by 40% and achieved a 94% test pass rate through comprehensive PowerApps...",
    metrics: [

    ],
    image: "/images/ai-development-services/step-2.jpg", // Abstract tech background
    company: "Softree Technology",
    link: "/case-studies/neucart-powerapps-power-automate-qa-testing-case-study",
  },
  {
    id: "sharepoint-spfx-automation",
    tags: [
      "Manufacturing & Distribution",
      "Quality Engineering & Test Automation",
    ],
    title: "SharePoint SPFx Automation Testing & Quality Assurance",
    description:
      "Implemented automated SharePoint and SPFx testing using Selenium, reducing production defects by 50% an... achieving a 98% test pass rate.",
    metrics: [], // No specific inline metrics visible beneath description
    image: "/images/ai-development-services/step-3.jpg", // Abstract tech background
    company: "Softree Technology",
    link: "/case-studies/sharepoint-spfx-automation-testing-quality-assurance",
  },
];

const caseStudyData: Gallery4Props = {
  title: (
    <div className="flex flex-col items-start">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-4 w-fit">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
        AGENTIC AI TESTING CASE STUDIES
      </div>
      <span className="typo-heading-2 text-slate-900 leading-tight text-left">
        Agentic AI Testing in Action <span className="text-orange-600">Across Modern AI Applications</span>
      </span>
    </div>
  ) as any,

  description:
    "Explore how AI testing, agent evaluation, automation, and quality engineering practices help organizations validate intelligent applications, improve AI reliability, and accelerate AI-powered software delivery.",

  items: caseStudies.map((study) => ({
    id: study.id,
    title: study.title,
    href: study.link,
    image: study.image,
    description: (
      <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
        {study.tags && study.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {study.tags.map((tag, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full border border-white/20 bg-white/5 text-[10px] font-semibold text-white/80 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        )}
        <p className={`text-white/90 typo-body-sm leading-relaxed ${study.metrics && study.metrics.length > 0 ? "mb-3 border-b border-white/10 pb-3" : ""}`}>
          {study.description}
        </p>
        {study.metrics && study.metrics.length > 0 && (
          <div className="flex flex-col gap-2.5">
            {study.metrics.map((result, idx) => (
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
        )}
      </div>
    )
  })),
};

export function AgenticAITestingCaseStudies() {
  return (
    <div className="relative bg-white flex flex-col items-center -mt-4 md:-mt-8 -mb-8 md:-mb-12">
      <div className="w-full">
        <Gallery4
          {...caseStudyData}
          action={
            <FlowButton
              href="/case-studies"
              text="Explore Agentic AI Case Studies"
              variant="orange-filled"
              className="py-3 px-6 text-xs sm:text-sm font-bold shadow-md"
            />
          }
        />
      </div>
    </div>
  );
}

export default AgenticAITestingCaseStudies;
