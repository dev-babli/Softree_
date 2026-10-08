"use client";

import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { FlowButton } from "@/components/ui/flow-button";

const REVIEWS = [
  {
    id: "01",
    title: "CEOs & Business Leaders",
    question: "Looking to modernize your data platform and simplify your analytics environment?",
    asking: [
      "Can we move from Azure Synapse to Microsoft Fabric without disrupting the business?",
      "What benefits can Fabric bring to our data and analytics strategy?",
      "How can we reduce complexity while preparing for future analytics and AI needs?"
    ],
    howWeHelp: [
      "Assess your existing Synapse environment and define a practical migration strategy.",
      "Modernize data, analytics, and reporting workloads for Microsoft Fabric.",
      "Support migration, validation, and production readiness."
    ],
    outcome: "A modern Microsoft Fabric data platform that reduces complexity and provides a scalable foundation for analytics and AI.",
    imageSrc: "/images/serve/4.webp",
    thumbnailSrc: "/images/serve/4.webp",
  },
  {
    id: "02",
    title: "CTOs & Technology Leaders",
    question: "Need an experienced engineering team to plan and execute your Synapse-to-Fabric migration?",
    asking: [
      "Which Synapse workloads should we migrate, or redesign?",
      "How do we migrate data, pipelines while maintaining reliability?",
      "How do we validate performance, security, and data after migration?"
    ],
    howWeHelp: [
      "Assess Synapse workloads and design the appropriate Fabric migration architecture.",
      "Migrate and refactor compatible data, pipelines, and analytics workloads.",
      "Perform testing, validation, and production deployment support."
    ],
    outcome: "A validated Microsoft Fabric architecture with modernized workloads and a structured path from Synapse to production.",
    imageSrc: "/images/serve/3.webp",
    thumbnailSrc: "/images/serve/3.webp",
  },
  {
    id: "03",
    title: "Microsoft Partners & Consultancies",
    question: "Need additional engineering capacity for your Microsoft Fabric migration engagements?",
    asking: [
      "Can you support our Synapse-to-Fabric migration projects?",
      "Can your engineers work alongside our existing consulting and delivery teams?",
      "Can we retain ownership of the client relationship and overall engagement?"
    ],
    howWeHelp: [
      "Provide dedicated offshore engineering capacity for Fabric migration projects.",
      "Support workload assessment, migration, refactoring, testing, and deployment.",
      "Work as an extension of your delivery team while you retain client ownership."
    ],
    outcome: "More Azure Synapse to Microsoft Fabric projects delivered with specialized engineering capacity behind your team.",
    imageSrc: "/images/serve/5.webp",
    thumbnailSrc: "/images/serve/5.webp",
  },
  {
    id: "04",
    title: "Digital Agencies",
    question: "Want to add Microsoft Fabric migration services to your client offerings without building an internal migration team?",
    asking: [
      "Can you handle the technical migration behind our client-facing team?",
      "Can you support different Synapse workloads and Fabric requirements?",
      "Can the migration work be delivered under our brand?"
    ],
    howWeHelp: [
      "Provide offshore engineering support for Synapse-to-Fabric migration projects.",
      "Handle workload migration, data engineering, integrations, validation, and optimization.",
      "Support white-label delivery behind your client-facing team."
    ],
    outcome: "More data modernization projects delivered under your brand with specialized Microsoft Fabric migration expertise.",
    imageSrc: "/images/serve/2.webp",
    thumbnailSrc: "/images/serve/2.webp",
  },
  {
    id: "05",
    title: "Product & SaaS Companies",
    question: "Looking to modernize your data platform and build a stronger foundation for analytics and AI?",
    asking: [
      "Can we move our Synapse workloads to Fabric as our data requirements grow?",
      "How can Fabric simplify our data engineering and analytics environment?",
      "Can our existing data and reporting workflows be modernized during migration?"
    ],
    howWeHelp: [
      "Assess and modernize Synapse data workloads for Microsoft Fabric.",
      "Connect data engineering, analytics, and Power BI capabilities through Fabric.",
      "Optimize the migrated environment for scalability, analytics, and future AI workloads."
    ],
    outcome: "A modern and scalable data foundation that supports analytics, business intelligence, and future AI capabilities.",
    imageSrc: "/images/serve/1.webp",
    thumbnailSrc: "/images/serve/1.webp",
  },
];

export default function FabricMigrationWhoDoWeServeSection({ className }: { className?: string }) {
  return (
    <section className={`relative w-full pt-0 pb-8 md:pb-12 border-t border-[#0a0a1a]/[0.06] overflow-hidden ${className || "bg-white"}`}>
      <div className="mx-auto w-full max-w-[1400px]">

        {/* Main Component Content */}
        <TestimonialSlider
          reviews={REVIEWS}
          eyebrow="WHO DO WE SERVE"
          heading="Who Do We Serve?"
          description="We help businesses, technology teams, and service providers modernize Azure Synapse workloads and move to Microsoft Fabric with structured migration planning, workload assessment, engineering, validation, and production support."
        />

        {/* Bottom CTA */}
        <div className="mt-0 flex flex-col items-center text-center border-t border-[#0a0a1a]/[0.06] pt-6 md:pt-8 px-6">
          <h3 className="typo-heading-3 text-[#0a0a1a] w-full max-w-5xl text-balance">
            Whatever you&apos;re modernizing or migrating, we&apos;re ready to help you move to Microsoft Fabric.
          </h3>
          <FlowButton href="/who-do-we-serve" text="Explore Who We Serve" className="mt-6" />
        </div>

      </div>
    </section>
  );
}
