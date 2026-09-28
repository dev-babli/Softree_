"use client";

import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { FlowButton } from "@/components/ui/flow-button";
import { typography } from "@/lib/typography";

const REVIEWS = [
  {
    id: "01",
    title: "CEOs & Business Leaders",
    question: "Looking to turn your business data into faster, better decisions?",
    asking: [
      "Can Power BI give us a clearer view of business performance?",
      "Can you connect our existing business data into one reporting environment?",
      "Can you build dashboards that our teams can actually use?"
    ],
    howWeHelp: [
      "Build executive dashboards and business performance reports in Power BI.",
      "Connect and consolidate data from business applications and enterprise sources.",
      "Deliver scalable analytics solutions through dedicated offshore Power BI expertise."
    ],
    outcome: "A clearer view of business performance that helps your leadership team make faster, data-driven decisions.",
    imageSrc: "/images/serve/4.jpg",
    thumbnailSrc: "/images/serve/4.jpg",
  },
  {
    id: "02",
    title: "CTOs & Technology Leaders",
    question: "Need a Power BI engineering team that can work with your existing data ecosystem?",
    asking: [
      "Can you integrate Power BI with our existing systems and databases?",
      "Can you build scalable data models and optimized DAX solutions?",
      "Can your team support development through deployment and ongoing optimization?"
    ],
    howWeHelp: [
      "Build semantic data models, DAX solutions, reports, and dashboards.",
      "Integrate Power BI with databases, APIs, cloud platforms, and enterprise systems.",
      "Support development, deployment, performance optimization, and ongoing engineering."
    ],
    outcome: "Reliable, scalable Power BI solutions that fit your existing technology environment and support long-term analytics growth.",
    imageSrc: "/images/serve/3.jpg",
    thumbnailSrc: "/images/serve/3.jpg",
  },
  {
    id: "03",
    title: "Microsoft Partners & Consultancies",
    question: "Need additional Power BI engineering capacity for your client engagements?",
    asking: [
      "Can you extend our Power BI delivery team when project capacity is limited?",
      "Can you support dashboard, reporting, modeling, and migration work?",
      "Can we rely on your team to work within our delivery model?"
    ],
    howWeHelp: [
      "Extend your delivery capacity with experienced offshore Power BI engineers.",
      "Support dashboards, reports, data modeling, DAX, integration, and migration projects.",
      "Work as an engineering extension of your existing consulting or delivery team."
    ],
    outcome: "More Power BI projects delivered with the expertise and engineering capacity to expand your client engagements.",
    imageSrc: "/images/serve/5.jpg",
    thumbnailSrc: "/images/serve/5.jpg",
  },
  {
    id: "04",
    title: "Digital Agencies",
    question: "Need a reliable Power BI engineering partner for your client projects?",
    asking: [
      "Can you build Power BI solutions while we manage the client relationship?",
      "Can you support projects from dashboard development through deployment?",
      "Can you provide flexible engineering capacity as our workload grows?"
    ],
    howWeHelp: [
      "Deliver Power BI dashboards, reports, models, and analytics solutions for your clients.",
      "Provide offshore engineering support across development, testing, and deployment.",
      "Scale Power BI delivery capacity without requiring additional in-house specialists."
    ],
    outcome: "More Power BI projects delivered reliably with flexible engineering capacity behind your client-facing team.",
    imageSrc: "/images/serve/2.jpg",
    thumbnailSrc: "/images/serve/2.jpg",
  },
  {
    id: "05",
    title: "Product & SaaS Companies",
    question: "Looking to add analytics and embedded reporting capabilities to your product?",
    asking: [
      "Can you integrate Power BI into our product or application?",
      "Can you build dashboards around our product and customer data?",
      "Can you help us scale analytics as our product grows?"
    ],
    howWeHelp: [
      "Build product analytics dashboards, reports, and semantic data models.",
      "Integrate Power BI with applications, APIs, databases, and cloud data platforms.",
      "Support embedded analytics, performance optimization, and ongoing enhancements."
    ],
    outcome: "Power BI-powered analytics capabilities that strengthen your product experience and help your customers make better decisions.",
    imageSrc: "/images/serve/1.jpg",
    thumbnailSrc: "/images/serve/1.jpg",
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
          description="We help businesses, technology teams, consultancies, and service providers extend their data and analytics capabilities with Power BI development and offshore engineering expertise."
        />

        {/* Bottom CTA */}
        <div className="mt-0 flex flex-col items-center text-center border-t border-[#0a0a1a]/[0.06] pt-6 md:pt-8 px-6">
          <h3 className={`${typography.heading.h4} text-[#0a0a1a] w-full max-w-none md:whitespace-nowrap`}>
            Whatever you&apos;re building, modernizing, or scaling, we&apos;re ready to work alongside you.
          </h3>
          <FlowButton href="/who-do-we-serve" text="Explore Who We Serve" className="mt-6" />
        </div>

      </div>
    </section>
  );
}
