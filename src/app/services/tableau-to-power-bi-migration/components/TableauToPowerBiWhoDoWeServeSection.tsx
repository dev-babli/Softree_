"use client";

import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { FlowButton } from "@/components/ui/flow-button";

const REVIEWS = [
  {
    id: "01",
    title: "CEOs & Business Leaders",
    question: "Looking to lower BI licensing costs and consolidate reporting in Microsoft Power BI?",
    asking: [
      "Can we migrate our Tableau dashboards to Power BI without business disruption?",
      "How much can we save by consolidating Tableau licenses into Microsoft 365 / Fabric?",
      "Will business users get the same or better report interactivity in Power BI?"
    ],
    howWeHelp: [
      "Audit existing Tableau reports and prioritize high-value migration targets.",
      "Convert calculations, parameters, and visuals to Power BI with exact metric accuracy.",
      "Provide user onboarding and governance to drive seamless Power BI adoption."
    ],
    outcome: "A modernized Microsoft Power BI ecosystem that cuts licensing costs, streamlines governance, and boosts adoption.",
    imageSrc: "/images/serve/4.webp",
    thumbnailSrc: "/images/serve/4.webp",
  },
  {
    id: "02",
    title: "CTOs & Technology Leaders",
    question: "Need expert BI engineers to migrate complex Tableau workbooks, calculations, and RLS to Power BI?",
    asking: [
      "How do we translate Tableau LOD expressions (FIXED, INCLUDE) into Power BI DAX?",
      "Can our Tableau data extracts and live connections be migrated cleanly?",
      "How do we map Tableau Row-Level Security (RLS) to Power BI and Entra ID?"
    ],
    howWeHelp: [
      "Re-architect Tableau data sources into optimized Power BI semantic models.",
      "Manually translate and validate all complex Tableau calculations to DAX.",
      "Implement automated refresh gateways and Entra ID-based RLS security."
    ],
    outcome: "High-performance Power BI semantic models and reports with zero metric drift and robust security.",
    imageSrc: "/images/serve/3.webp",
    thumbnailSrc: "/images/serve/3.webp",
  },
  {
    id: "03",
    title: "Microsoft Partners & Consultancies",
    question: "Need offshore Power BI developers to handle Tableau migration projects for your clients?",
    asking: [
      "Can your team handle bulk Tableau workbook conversion and DAX refactoring?",
      "Can your BI engineers work alongside our solution architects and delivery leads?",
      "Can we retain full client management while Softree handles technical execution?"
    ],
    howWeHelp: [
      "Supply dedicated offshore Power BI engineering teams tailored to project scope.",
      "Perform report inventorying, DAX conversion, semantic modeling, and QA testing.",
      "Operate as a seamless extension of your team with transparent daily communication."
    ],
    outcome: "Faster delivery of Tableau to Power BI migration projects with higher margin and guaranteed quality.",
    imageSrc: "/images/serve/5.webp",
    thumbnailSrc: "/images/serve/5.webp",
  },
  {
    id: "04",
    title: "Digital Agencies",
    question: "Want to deliver white-label Power BI dashboard migration services under your own brand?",
    asking: [
      "Can you convert client Tableau dashboards to sleek, modern Power BI designs?",
      "Can the migration project be executed entirely under white-label terms?",
      "Do you provide ongoing Power BI maintenance and report enhancement after migration?"
    ],
    howWeHelp: [
      "Provide complete white-label Tableau to Power BI migration services.",
      "Apply custom themes, corporate branding, and mobile layout optimization to Power BI reports.",
      "Deliver full documentation, dataset definitions, and post-migration support."
    ],
    outcome: "Expanded agency service offerings and satisfied clients with beautiful, high-impact Power BI reports.",
    imageSrc: "/images/serve/2.webp",
    thumbnailSrc: "/images/serve/2.webp",
  },
  {
    id: "05",
    title: "Product & SaaS Companies",
    question: "Looking to replace embedded Tableau dashboards with native Power BI Embedded analytics?",
    asking: [
      "Can we replace Tableau Server/Cloud embedded analytics with Power BI Embedded?",
      "How do we handle multi-tenant data security and customer-level filtering?",
      "Can Power BI reports be embedded into our web app seamlessly?"
    ],
    howWeHelp: [
      "Architect Power BI Embedded solutions with App-Owns-Data or User-Owns-Data authentication.",
      "Convert embedded Tableau views to interactive Power BI visuals and REST API integrations.",
      "Optimize query performance for high concurrency and fast customer load times."
    ],
    outcome: "Scalable embedded analytics built directly into your application using cost-effective Power BI capacity.",
    imageSrc: "/images/serve/1.webp",
    thumbnailSrc: "/images/serve/1.webp",
  },
];

export default function TableauToPowerBiWhoDoWeServeSection({ className }: { className?: string }) {
  return (
    <section className={`relative w-full pt-0 pb-8 md:pb-12 border-t border-[#0a0a1a]/[0.06] overflow-hidden ${className || "bg-white"}`}>
      <div className="mx-auto w-full max-w-[1400px]">

        {/* Main Component Content */}
        <TestimonialSlider
          reviews={REVIEWS}
          eyebrow="WHO DO WE SERVE"
          heading="Who Do We Serve?"
          description="We help businesses, technology teams, consultancies, and partners execute seamless Tableau to Power BI migrations with dedicated offshore engineering support, precise DAX conversion, semantic modeling, and production readiness."
        />

        {/* Bottom CTA */}
        <div className="mt-0 flex flex-col items-center text-center border-t border-[#0a0a1a]/[0.06] pt-6 md:pt-8 px-6">
          <h3 className="typo-heading-3 text-[#0a0a1a] w-full max-w-5xl text-balance">
            Whatever your BI migration goals, we&apos;re ready to help you transition from Tableau to Power BI.
          </h3>
          <FlowButton href="/who-do-we-serve" text="Explore Who We Serve" className="mt-6" />
        </div>

      </div>
    </section>
  );
}
