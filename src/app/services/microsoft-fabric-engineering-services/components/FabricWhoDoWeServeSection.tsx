"use client";

import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { FlowButton } from "@/components/ui/flow-button";

const REVIEWS = [
  {
    id: "01",
    title: "CEOs & Business Leaders",
    question: "Looking to modernize your data and analytics capabilities with Microsoft Fabric?",
    asking: [
      "Can Fabric help us modernize our data platform?",
      "Can we scale without expanding our internal team?",
      "Can you provide reliable engineering support?"
    ],
    howWeHelp: [
      "Provide dedicated Microsoft Fabric engineering capacity.",
      "Build and modernize data, analytics, and reporting solutions.",
      "Support your team from architecture through production."
    ],
    outcome: "A modern, scalable data and analytics foundation that helps your business make better decisions without increasing internal engineering overhead.",
    imageSrc: "/images/serve/4.webp",
    thumbnailSrc: "/images/serve/4.webp",
  },
  {
    id: "02",
    title: "CTOs & Technology Leaders",
    question: "Need specialized Microsoft Fabric expertise to extend your engineering team?",
    asking: [
      "Can you extend our existing engineering team?",
      "Can you handle complex Fabric engineering requirements?",
      "Can your team work with our technology stack?"
    ],
    howWeHelp: [
      "Provide specialized Fabric engineers across data and analytics.",
      "Integrate Fabric with Microsoft and enterprise systems.",
      "Work as an extension of your existing engineering organization."
    ],
    outcome: "Extended engineering capacity with specialized Microsoft Fabric expertise that helps your team deliver data and analytics initiatives faster.",
    imageSrc: "/images/serve/3.webp",
    thumbnailSrc: "/images/serve/3.webp",
  },
  {
    id: "03",
    title: "Microsoft Partners & Consultancies",
    question: "Need a trusted Fabric engineering partner behind your client engagements?",
    asking: [
      "Can you deliver Fabric projects under our brand?",
      "Can you support our existing consulting team?",
      "Can you handle the engineering delivery?"
    ],
    howWeHelp: [
      "Provide white-label Microsoft Fabric engineering support.",
      "Extend your delivery capacity across Fabric, Power BI, and data engineering.",
      "Work behind your brand while you maintain the client relationship."
    ],
    outcome: "Additional Fabric delivery capacity that helps you take on more client projects while maintaining your client relationships and delivery ownership.",
    imageSrc: "/images/serve/5.webp",
    thumbnailSrc: "/images/serve/5.webp",
  },
  {
    id: "04",
    title: "Digital Agencies",
    question: "Need additional data and analytics engineering capacity for your client projects?",
    asking: [
      "Can you support our Fabric development requirements?",
      "Can your engineers work as an extension of our team?",
      "Can we scale delivery without hiring internally?"
    ],
    howWeHelp: [
      "Add dedicated Fabric engineering capacity to your delivery team.",
      "Build data platforms, analytics, Power BI, and integrations.",
      "Scale engineering support based on your project requirements."
    ],
    outcome: "A reliable Fabric engineering partner that expands your delivery capabilities without requiring you to build a larger internal team.",
    imageSrc: "/images/serve/2.webp",
    thumbnailSrc: "/images/serve/2.webp",
  },
  {
    id: "05",
    title: "Product & SaaS Companies",
    question: "Need to build or scale a modern data platform around your product?",
    asking: [
      "Can you help us build a Fabric-based data platform?",
      "Can you connect our product data with Fabric?",
      "Can you support our growing data engineering needs?"
    ],
    howWeHelp: [
      "Build scalable Fabric data and analytics foundations.",
      "Connect product, cloud, SaaS, and enterprise data sources.",
      "Extend your product engineering team with specialized Fabric expertise."
    ],
    outcome: "A scalable Fabric data foundation that supports product analytics, business intelligence, integrations, and future AI initiatives.",
    imageSrc: "/images/serve/1.webp",
    thumbnailSrc: "/images/serve/1.webp",
  },
];

export default function FabricWhoDoWeServeSection({ className }: { className?: string }) {
  return (
    <section className={`relative w-full pt-0 pb-8 md:pb-12 border-t border-[#0a0a1a]/[0.06] overflow-hidden ${className || "bg-white"}`}>
      <div className="mx-auto w-full max-w-[1400px]">

        {/* Main Component Content */}
        <TestimonialSlider
          reviews={REVIEWS}
          eyebrow="WHO DO WE SERVE"
          heading="Who Do We Serve?"
          description="We help businesses, technology teams, consultancies, and service providers extend their data and analytics capabilities with Microsoft Fabric engineering expertise."
        />

        {/* Bottom CTA */}
        <div className="mt-0 flex flex-col items-center text-center border-t border-[#0a0a1a]/[0.06] pt-6 md:pt-8 px-6">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#0a0a1a] w-full max-w-none md:whitespace-nowrap">
            Whatever you&apos;re building, modernizing, or scaling, we&apos;re ready to work alongside you.
          </h3>
          <FlowButton href="/who-do-we-serve" text="Explore Who We Serve" className="mt-6" />
        </div>

      </div>
    </section>
  );
}
