"use client";

import React from "react";
import { Gallery4, Gallery4Props } from "@/components/blocks/gallery4";
import { FlowButton } from "@/components/ui/flow-button";

const caseStudyData: Gallery4Props = {
  title: (
    <div className="flex flex-col items-start">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-4 w-fit">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
        HEALTHCARE TESTING CASE STUDIES
      </div>
      <span className="typo-heading-2 text-slate-900 leading-tight text-left">
        Healthcare Testing in Action Across Real-World Applications
      </span>
    </div>
  ) as any,

  description:
    "Explore how healthcare testing, test automation, analytics, and quality engineering help improve application reliability, accelerate releases, and strengthen critical healthcare workflows.",

  items: [
    {
      id: "healthcare-ai-test-automation",
      title: "Healthcare AI Test Automation for Patient Management Platform",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className="text-white/90 typo-body-sm leading-relaxed mb-3 border-b border-white/10 pb-3">
            Softree Technology helped a leading healthcare provider achieve 85% test automation coverage across their patient management platform, ensuring zero-defect EHR workflows and HIPAA compliance.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "85%", label: "Automation Coverage" },
              { value: "60%", label: "Faster Releases" },
              { value: "95%", label: "Critical Pass Rate" },
              { value: "40%", label: "Fewer Defects" },
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
      href: "/case-studies/healthcare-ai-test-automation-patient-management-platform",
      image: "/images/ai-healthcare-images/health-5.png",
    },
    {
      id: "predictive-hospital-bed-occupancy",
      title: "Predictive Hospital Bed Occupancy Analytics",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className="text-white/90 typo-body-sm leading-relaxed mb-3 border-b border-white/10 pb-3">
            A multi-specialty hospital network improved bed allocation efficiency by 35% and reduced emergency wait times by 28% using AI-powered...
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "90%", label: "Forecast Accuracy" },
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
      href: "/case-studies/predictive-hospital-bed-occupancy-analytics",
      image: "/images/ai-healthcare-images/health-6.png",
    },
    {
      id: "emergency-department-performance",
      title: "Emergency Department Performance Analytics Platform",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className="text-white/90 typo-body-sm leading-relaxed">
            A Microsoft Fabric and Power BI analytics platform helped a multi-specialty healthcare network reduce emergency department wait times by approximately 34%.
          </p>
        </div>
      ),
      href: "/case-studies/emergency-department-performance-analytics",
      image: "/images/ai-healthcare-images/health-7.png",
    },
    {
      id: "healthcare-patient-intelligence",
      title: "Healthcare Patient Intelligence Platform",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className="text-white/90 typo-body-sm leading-relaxed mb-3 border-b border-white/10 pb-3">
            Built an AI-powered healthcare intelligence platform that reduced claims denials from 18% t...
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "10%", label: "Claims Denial Reduction" },
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
      href: "/case-studies/healthcare-patient-intelligence-platform",
      image: "/images/ai-healthcare-images/health-8.png",
    }
  ],
};

export function HealthcareTestingCaseStudies() {
  return (
    <div className="relative bg-white flex flex-col items-center -mt-4 md:-mt-8">
      <div className="w-full">
        <Gallery4 
          {...caseStudyData} 
          action={
            <FlowButton 
              href="/case-studies" 
              text="Explore Healthcare Case Studies"
              variant="orange-filled"
              className="py-3 px-6 text-xs sm:text-sm font-bold shadow-md"
            />
          }
        />
      </div>
    </div>
  );
}

export default HealthcareTestingCaseStudies;
