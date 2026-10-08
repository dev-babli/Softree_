"use client";

import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { FlowButton } from "@/components/ui/flow-button";

const REVIEWS = [
  {
    id: "01",
    title: "CEOs & Business Leaders",
    question: "Looking to modernize your analytics environment and simplify your Tableau platform?",
    asking: [
      "Can we migrate from Tableau Server to Tableau Cloud without disrupting the business?",
      "What will Tableau migration mean for our existing dashboards, data, and reporting?",
      "How can we reduce analytics complexity while preparing for future growth?"
    ],
    howWeHelp: [
      "Assess your Tableau environment and define a practical migration strategy.",
      "Plan and migrate critical dashboards, workbooks, data sources, and analytics workloads.",
      "Support validation, production cutover, and post-migration optimization."
    ],
    outcome: "A modern, reliable Tableau environment that reduces migration complexity and supports scalable business analytics.",
    imageSrc: "/images/serve/4.webp",
    thumbnailSrc: "/images/serve/4.webp",
  },
  {
    id: "02",
    title: "CTOs & Technology Leaders",
    question: "Need to migrate Tableau workloads while maintaining security, integrations, and performance?",
    asking: [
      "How do we assess Tableau Server dependencies before migration?",
      "How can we migrate workbooks, data sources, users, and permissions securely?",
      "How do we validate performance and connectivity after migration?"
    ],
    howWeHelp: [
      "Analyze Tableau Server architecture, integrations, and dependencies.",
      "Migrate dashboards, data sources, permissions, and related configurations.",
      "Validate security, connectivity, functionality, and performance after migration."
    ],
    outcome: "A controlled Tableau migration with validated workloads, secure access, reliable integrations, and production readiness.",
    imageSrc: "/images/serve/3.webp",
    thumbnailSrc: "/images/serve/3.webp",
  },
  {
    id: "03",
    title: "Microsoft Partner & Consultancy",
    question: "Need additional Tableau migration engineering capacity for your client engagements?",
    asking: [
      "Can we extend our team with specialized Tableau migration engineers?",
      "Can Softree support assessment and migration execution behind scenes?",
      "Can you help with Tableau-to-Power BI or modern analytics platform transitions?"
    ],
    howWeHelp: [
      "Provide dedicated offshore Tableau migration engineering capacity.",
      "Support planning, workbook migration, data migration, and validation.",
      "Work within your delivery model supporting Tableau modernization and BI transitions."
    ],
    outcome: "Additional Tableau migration engineering capacity that helps you deliver client projects faster while retaining engagement ownership.",
    imageSrc: "/images/serve/5.webp",
    thumbnailSrc: "/images/serve/5.webp",
  },
  {
    id: "04",
    title: "Digital Agencies",
    question: "Need a reliable engineering team to handle complex Tableau migration work?",
    asking: [
      "Can you handle Tableau dashboards, workbooks, and data sources?",
      "Can you support migration validation and post-migration fixes?",
      "Can your team work as an extension of our existing delivery team?"
    ],
    howWeHelp: [
      "Provide offshore Tableau migration engineers for project delivery.",
      "Handle workbook, dashboard, data source, connectivity, and validation activities.",
      "Support migration optimization and production readiness alongside your team."
    ],
    outcome: "Reliable Tableau migration delivery without requiring you to expand your internal engineering team.",
    imageSrc: "/images/serve/2.webp",
    thumbnailSrc: "/images/serve/2.webp",
  },
  {
    id: "05",
    title: "Product & SaaS Companies",
    question: "Need to modernize Tableau analytics as your data and reporting requirements grow?",
    asking: [
      "How can we migrate Tableau workloads without affecting reporting continuity?",
      "Can we modernize Tableau data connections and analytics architecture?",
      "How do we improve scalability and performance after migration?"
    ],
    howWeHelp: [
      "Assess Tableau workloads, data sources, integrations, and reporting dependencies.",
      "Migrate and modernize dashboards, workbooks, and analytics workloads.",
      "Optimize the target environment for scalability, performance, and reliable reporting."
    ],
    outcome: "A scalable analytics environment that supports growing data volumes, modern reporting, and evolving business requirements.",
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
          description="We help business leaders, technology teams, consulting firms, digital agencies, and product companies modernize their Tableau environments with structured migration planning, workload assessment, dashboard and data migration, validation, and ongoing optimization."
        />

        {/* Bottom CTA */}
        <div className="mt-0 flex flex-col items-center text-center border-t border-[#0a0a1a]/[0.06] pt-6 md:pt-8 px-6">
          <h3 className="typo-heading-3 text-[#0a0a1a] w-full max-w-5xl text-balance">
            Whatever you&apos;re modernizing or migrating, we&apos;re ready to help you with your Tableau migration journey.
          </h3>
          <FlowButton href="/who-do-we-serve" text="Explore Who We Serve" className="mt-6" />
        </div>

      </div>
    </section>
  );
}
