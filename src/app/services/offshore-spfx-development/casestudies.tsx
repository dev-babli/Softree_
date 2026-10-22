"use client";

import React from "react";
import { Gallery4, Gallery4Props } from "@/components/blocks/gallery4";
import { FlowButton } from "@/components/ui/flow-button";
import AnimatedGradient from "@/components/ui/animated-gradient";
import { typography } from "@/lib/typography";

export const caseStudies = [
  {
    title: "LabTrack Pro Pathology Reports",
    category: "SharePoint",
    summary:
      "A SharePoint Online pathology reporting platform ensuring regulatory standards compliance and secure, automated PDF diagnostics dispatch.",
    challenge:
      "Medical lab reporting suffered from manual processing lag and compliance risks due to decentralized diagnostic record storage.",
    solution:
      "Built a custom SPFx dashboard integrated with Power Automate and secure SharePoint document library indexing.",
    impact:
      "Reduced report generation time by 80% and achieved 100% HIPAA compliance audits.",
    tech: ["SharePoint Online", "SPFx", "Power Automate", "Office 365 Groups"],
    image: "/images/case-study/sharepoint/pdf.webp",
    href: "https://www.softreetechnology.com/case-studies/labtrack-pro-pathology-report-management",
  },
  {
    title: "SharePoint Asset Tracker",
    category: "SharePoint",
    summary:
      "100% asset traceability platform built for enterprise retail inventory control and checkout tracking.",
    challenge:
      "Retail stock counts and store floor IT gear checkouts were untracked, causing inventory losses and accounting conflicts.",
    solution:
      "Developed a real-time barcode-scanning responsive SPFx interface and integrated Power Automate stock level alerts.",
    impact:
      "Eliminated retail inventory leakages, saving thousands in annual hardware replacement costs.",
    tech: ["SharePoint Online", "SPFx", "Power Automate", "Barcode Scanner"],
    image: "/images/case-study/sharepoint/contact.webp",
    href: "https://www.softreetechnology.com/case-studies/sharepoint-asset-tracker-app",
  },
  {
    title: "SharePoint Site Pages to PDF",
    category: "SharePoint",
    summary:
      "Automated high-fidelity PDF generation from SharePoint Site Pages for regulatory compliance and document archival.",
    challenge:
      "Standard browser print actions generated misaligned headers, broken page layouts, and missed crucial metadata.",
    solution:
      "Designed a custom SPFx solution to render pixel-perfect PDF documents preserving typography, branding, and layouts.",
    impact:
      "Reduced manual layout adjustments by 95% and automated PDF compilation workflows for auditing.",
    tech: ["SPFx", "PDF Engine", "SharePoint API", "TypeScript"],
    image: "/images/case-study/sharepoint/pdf.webp",
    href: "https://www.softreetechnology.com/case-studies/sharepoint-site-pages-to-pdf",
  },
  {
    title: "SharePoint & SPFx Automation Testing",
    category: "SharePoint",
    summary:
      "Automated validation framework for SPFx components to secure continuous delivery pipelines.",
    challenge:
      "Manual QA checks on dynamic custom web parts delayed code releases and risked visual regression on live portals.",
    solution:
      "Designed a comprehensive unit, integration, and UI testing framework using Jest and Playwright.",
    impact:
      "Accelerated release cycles by 70% and captured 99% of regression bugs before staging deployment.",
    tech: ["SPFx", "Jest", "Playwright", "CI/CD Pipeline"],
    image: "/images/case-study/sharepoint/sp.webp",
    href: "https://www.softreetechnology.com/case-studies/sharepoint-spfx-automation-testing-quality-assurance",
  },
  {
    title: "CareSync 360 Multilingual Patient Portal",
    category: "SharePoint",
    summary:
      "Built a secure multilingual appointment management and customer support system inside SharePoint Online.",
    challenge:
      "Managing patient scheduling across different language barriers created high administrative burden and scheduling errors.",
    solution:
      "Created a multilingual patient portal inside SharePoint using React SPFx web parts and Azure Cognitive Services.",
    impact:
      "Handled over 50k monthly patient requests, improving patient onboarding speed by 60%.",
    tech: ["SharePoint Online", "SPFx", "React", "Azure AI Translation"],
    image: "/images/case-study/sharepoint/claim.webp",
    href: "https://www.softreetechnology.com/case-studies/multilingual-patient-appointment-portal",
  },
];

const caseStudyData: Gallery4Props = {
  title: (
    <div className="flex flex-col items-start">
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 ${typography.caption.default} text-[#FF6B00] uppercase mb-4 w-fit`}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
        SPFX DEVELOPMENT CASE STUDIES
      </div>
      <span
        className={`${typography.heading.h2} text-slate-900 leading-tight text-left`}
      >
        Offshore SPFx Development{" "}
        <span className="text-orange-600">Solutions in Action</span>
      </span>
    </div>
  ) as any,

  description:
    "Explore how SharePoint Framework solutions can help businesses customize SharePoint Online, enhance Microsoft 365 collaboration, streamline business workflows, and build modern SharePoint experiences through custom web parts and extensions.",

  items: [
    {
      id: "labtrack-pro-pathology-reports",
      title: caseStudies[0].title,
      label: "SharePoint Online · SPFx",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p
            className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}
          >
            {caseStudies[0].summary}
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "80%", label: "Reduced Report Time" },
              { value: "100%", label: "HIPAA Compliance" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[55px]">
                  {result.value}
                </span>
                <span
                  className={`text-white/80 ${typography.caption.meta} uppercase tracking-wider`}
                >
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      href: "/case-studies/labtrack-pro-pathology-report-management",
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
      id: "sharepoint-asset-tracker",
      title: caseStudies[1].title,
      label: "SPFx · Power Automate",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p
            className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}
          >
            {caseStudies[1].summary}
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "100%", label: "Asset Traceability" },
              { value: "Zero", label: "Inventory Leakages" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[55px]">
                  {result.value}
                </span>
                <span
                  className={`text-white/80 ${typography.caption.meta} uppercase tracking-wider`}
                >
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      href: "/case-studies/sharepoint-asset-tracker-app",
      bgComponent: <AnimatedGradient config={{ preset: "Lava" }} />,
    },
    {
      id: "sharepoint-site-pages-to-pdf",
      title: caseStudies[2].title,
      label: "SPFx · PDF Engine",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p
            className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}
          >
            {caseStudies[2].summary}
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "95%", label: "Reduced Manual Effort" },
              { value: "100%", label: "Pixel-Perfect Archival" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[55px]">
                  {result.value}
                </span>
                <span
                  className={`text-white/80 ${typography.caption.meta} uppercase tracking-wider`}
                >
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      href: "/case-studies/sharepoint-site-pages-to-pdf",
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
      id: "sharepoint-spfx-automation-testing",
      title: caseStudies[3].title,
      label: "SPFx · Jest · Playwright",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p
            className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}
          >
            {caseStudies[3].summary}
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "70%", label: "Faster Release Cycles" },
              { value: "99%", label: "Regression Bugs Caught" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[55px]">
                  {result.value}
                </span>
                <span
                  className={`text-white/80 ${typography.caption.meta} uppercase tracking-wider`}
                >
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      href: "/case-studies/sharepoint-spfx-automation-testing-quality-assurance",
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
      id: "caresync-360-multilingual-patient-portal",
      title: caseStudies[4].title,
      label: "SPFx · Azure AI Translation",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p
            className={`text-white/90 ${typography.body.sm} leading-relaxed mb-3 border-b border-white/10 pb-3`}
          >
            {caseStudies[4].summary}
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { value: "50k+", label: "Monthly Patient Requests" },
              { value: "60%", label: "Faster Onboarding" },
            ].map((result, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#FF6B2C] font-mono font-bold tracking-tight shrink-0 min-w-[55px]">
                  {result.value}
                </span>
                <span
                  className={`text-white/80 ${typography.caption.meta} uppercase tracking-wider`}
                >
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      href: "/case-studies/multilingual-patient-appointment-portal",
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

export function SharePointCaseStudies() {
  return (
    <div className="relative flex flex-col items-center -mt-4 md:-mt-8 -mb-8 md:-mb-12">
      <div className="w-full">
        <Gallery4
          {...caseStudyData}
          action={
            <FlowButton
              href="/case-studies"
              text="Explore SPFx Solutions"
              variant="orange-filled"
              className="py-3 px-6 text-xs sm:text-sm font-bold shadow-md"
            />
          }
        />
      </div>
    </div>
  );
}

export default SharePointCaseStudies;
