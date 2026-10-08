"use client";

import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { FlowButton } from "@/components/ui/flow-button";

const REVIEWS = [
  {
    id: "01",
    title: "CEOs & Business Leaders",
    question: "Looking to modernize your analytics platform and reduce the complexity of managing Tableau Server?",
    asking: [
      "Can we migrate our Tableau Server environment to Tableau Cloud?",
      "How can we reduce infrastructure and maintenance overhead?",
      "Can we modernize analytics without disrupting the business?"
    ],
    howWeHelp: [
      "Assess your Tableau Server environment and migration readiness.",
      "Plan workbook, dashboard, and data source migration.",
      "Support validation and production transition."
    ],
    outcome: "A modern Tableau Cloud environment that supports scalable analytics with reduced infrastructure complexity.",
    imageSrc: "/images/serve/4.webp",
    thumbnailSrc: "/images/serve/4.webp",
  },
  {
    id: "02",
    title: "CTOs & Technology Leaders",
    question: "Planning a strategic move from Tableau Server to Tableau Cloud?",
    asking: [
      "What Tableau content should we migrate or modernize?",
      "How do we manage users, permissions, and data sources?",
      "How can we reduce migration risks and business disruption?"
    ],
    howWeHelp: [
      "Evaluate your Tableau Server architecture and dependencies.",
      "Define migration priorities and the Tableau Cloud roadmap.",
      "Support migration, validation, security, and optimization."
    ],
    outcome: "A structured Tableau Cloud migration strategy aligned with your technology and analytics goals.",
    imageSrc: "/images/serve/3.webp",
    thumbnailSrc: "/images/serve/3.webp",
  },
  {
    id: "03",
    title: "Microsoft Partners & Consultancies",
    question: "Need additional engineering capacity for Tableau Server to Tableau Cloud projects?",
    asking: [
      "Can Softree extend our Tableau migration team?",
      "Can you support workbook and dashboard migration?",
      "Can your team work alongside our consultants?"
    ],
    howWeHelp: [
      "Provide dedicated Tableau migration engineering support.",
      "Assist with assessment, workbook migration, data sources, and validation.",
      "Extend your delivery capacity while you retain client ownership."
    ],
    outcome: "Additional Tableau engineering capacity to deliver cloud migration projects efficiently.",
    imageSrc: "/images/serve/5.webp",
    thumbnailSrc: "/images/serve/5.webp",
  },
  {
    id: "04",
    title: "Data & Analytics Teams",
    question: "Ready to move your Tableau Server analytics to a scalable cloud platform?",
    asking: [
      "Can you migrate our workbooks and dashboards to Tableau Cloud?",
      "Can you validate data sources and analytics after migration?",
      "Can you support ongoing Tableau Cloud optimization?"
    ],
    howWeHelp: [
      "Migrate and validate Tableau workbooks, dashboards, and data sources.",
      "Support permissions, connectivity, and analytics validation.",
      "Optimize the Tableau Cloud environment after migration."
    ],
    outcome: "A scalable Tableau Cloud analytics environment built for modern reporting and business intelligence.",
    imageSrc: "/images/serve/2.webp",
    thumbnailSrc: "/images/serve/2.webp",
  },
  {
    id: "05",
    title: "Product & SaaS Companies",
    question: "Need to scale embedded or customer-facing Tableau analytics?",
    asking: [
      "Can you modernize our Tableau Server analytics environment?",
      "Can Tableau Cloud support our growing analytics requirements?",
      "Can you help migrate dashboards and data sources with minimal disruption?"
    ],
    howWeHelp: [
      "Assess Tableau Server workloads and analytics dependencies.",
      "Support workbook, dashboard, and data source migration.",
      "Help establish a scalable Tableau Cloud analytics environment."
    ],
    outcome: "A modern analytics foundation that supports product growth, reporting, and evolving business intelligence needs.",
    imageSrc: "/images/serve/1.webp",
    thumbnailSrc: "/images/serve/1.webp",
  },
];

export default function TableauMigrationWhoDoWeServeSection({ className }: { className?: string }) {
  return (
    <section className={`relative w-full pt-0 pb-8 md:pb-12 border-t border-[#0a0a1a]/[0.06] overflow-hidden ${className || "bg-white"}`}>
      <div className="mx-auto w-full max-w-[1400px]">

        {/* Main Component Content */}
        <TestimonialSlider
          reviews={REVIEWS}
          eyebrow="WHO DO WE SERVE"
          heading="Who Do We Serve?"
          description="We help businesses, analytics teams, consulting firms, technology partners, and data organizations modernize Tableau Server environments and migrate to scalable Tableau Cloud analytics."
        />

        {/* Bottom CTA */}
        <div className="mt-0 flex flex-col items-center text-center border-t border-[#0a0a1a]/[0.06] pt-6 md:pt-8 px-6">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#0a0a1a] w-full max-w-none md:whitespace-nowrap">
            Ready to modernize, migrate, and scale your Tableau analytics with Tableau Cloud?
          </h3>
          <FlowButton href="/who-do-we-serve" text="Explore Who We Serve" className="mt-6" />
        </div>

      </div>
    </section>
  );
}
