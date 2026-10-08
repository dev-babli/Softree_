"use client";

import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { FlowButton } from "@/components/ui/flow-button";

const REVIEWS = [
  {
    id: "01",
    title: "CEOs & Business Leaders",
    question: "Looking to modernize your SQL Server data platform?",
    asking: [
      "Can you help us migrate our SQL Server workloads to Microsoft Fabric?",
      "How can we modernize our existing data architecture?",
      "Can you support migration without disrupting business operations?"
    ],
    howWeHelp: [
      "Assess SQL Server databases, workloads, and dependencies.",
      "Design a Microsoft Fabric migration and modernization roadmap.",
      "Migrate and validate data and workloads in controlled phases."
    ],
    outcome: "A modern, scalable data platform designed to support enterprise analytics, reporting, and future data initiatives.",
    imageSrc: "/images/serve/4.webp",
    thumbnailSrc: "/images/serve/4.webp",
  },
  {
    id: "02",
    title: "CIOs, CTOs & Technology Leaders",
    question: "Planning a strategic move from traditional SQL Server environments to Microsoft Fabric?",
    asking: [
      "What should we migrate, modernize, consolidate, or retire?",
      "What will our target Fabric architecture look like?",
      "How can we reduce migration risks and business disruption?"
    ],
    howWeHelp: [
      "Evaluate your current SQL Server environment and migration readiness.",
      "Define target architecture and migration priorities.",
      "Support planning, migration, validation, and optimization."
    ],
    outcome: "A structured modernization strategy that aligns your data platform with long-term business and analytics goals.",
    imageSrc: "/images/serve/3.webp",
    thumbnailSrc: "/images/serve/3.webp",
  },
  {
    id: "03",
    title: "Microsoft Partners & Consultancies",
    question: "Need additional engineering capacity for SQL Server and Microsoft Fabric migration projects?",
    asking: [
      "Can Softree extend our data engineering capabilities?",
      "Can you support SQL Server assessment and migration activities?",
      "Can your team work alongside our architects and consultants?"
    ],
    howWeHelp: [
      "Provide SQL Server and Microsoft Fabric engineering support.",
      "Extend project teams with migration and data engineering expertise.",
      "Support assessment, implementation, testing, and optimization."
    ],
    outcome: "Additional engineering capacity to deliver Microsoft Fabric migration projects more efficiently.",
    imageSrc: "/images/serve/5.webp",
    thumbnailSrc: "/images/serve/5.webp",
  },
  {
    id: "04",
    title: "Data & Analytics Teams",
    question: "Ready to modernize SQL Server-based analytics and reporting workloads?",
    asking: [
      "Can you migrate our SQL Server data warehouse workloads?",
      "Can you modernize our ETL and data integration processes?",
      "How can we connect our modernized data platform with Power BI?"
    ],
    howWeHelp: [
      "Assess SQL Server databases, data warehouses, and integration workflows.",
      "Modernize data engineering and analytics workloads for Fabric.",
      "Validate Power BI, semantic models, data, and reporting dependencies."
    ],
    outcome: "A unified data and analytics environment that supports modern engineering, warehousing, reporting, and business intelligence.",
    imageSrc: "/images/serve/2.webp",
    thumbnailSrc: "/images/serve/2.webp",
  },
  {
    id: "05",
    title: "Product & SaaS Companies",
    question: "Need to scale your data platform as your product and customer base grow?",
    asking: [
      "Can you help modernize our SQL Server-based data platform?",
      "Can you migrate our analytical workloads to Microsoft Fabric?",
      "Can you support our growing data engineering requirements?"
    ],
    howWeHelp: [
      "Assess SQL Server architecture and workload requirements.",
      "Design scalable Fabric-based data and analytics solutions.",
      "Extend your product engineering team with migration and data expertise."
    ],
    outcome: "A scalable modern data foundation that supports product analytics, business intelligence, integrations, and future growth.",
    imageSrc: "/images/serve/1.webp",
    thumbnailSrc: "/images/serve/1.webp",
  },
];

export default function MigrationWhoDoWeServeSection({ className }: { className?: string }) {
  return (
    <section className={`relative w-full pt-0 pb-8 md:pb-12 border-t border-[#0a0a1a]/[0.06] overflow-hidden ${className || "bg-white"}`}>
      <div className="mx-auto w-full max-w-[1400px]">

        {/* Main Component Content */}
        <TestimonialSlider
          reviews={REVIEWS}
          eyebrow="WHO DO WE SERVE"
          heading="Who Do We Serve?"
          description="We help businesses, technology teams, Microsoft partners, and data organizations modernize SQL Server environments and build scalable analytics platforms with Microsoft Fabric expertise."
        />

        {/* Bottom CTA */}
        <div className="mt-0 flex flex-col items-center text-center border-t border-[#0a0a1a]/[0.06] pt-6 md:pt-8 px-6">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#0a0a1a] w-full max-w-none md:whitespace-nowrap">
            Ready to modernize, migrate, and scale your SQL Server environment with Microsoft Fabric?
          </h3>
          <FlowButton href="/who-do-we-serve" text="Explore who we serve" className="mt-6" />
        </div>

      </div>
    </section>
  );
}
