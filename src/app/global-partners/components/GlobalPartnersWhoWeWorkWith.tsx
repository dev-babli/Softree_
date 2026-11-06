"use client";

import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { FlowButton } from "@/components/ui/flow-button";

const REVIEWS = [
  {
    id: "01",
    title: "CEOs & Business Leaders",
    question: "Looking for a Reliable Technology Partner to Support Business Growth?",
    asking: [
      "How can we expand our technology capabilities without increasing operational costs?",
      "Can we rely on an offshore engineering partner for project delivery?",
      "How can we explore new technology opportunities and grow our business?",
    ],
    howWeHelp: [
      "Flexible offshore software development and engineering support.",
      "Access to AI, Microsoft, cloud, and digital engineering expertise.",
      "Collaboration models aligned with your business goals and growth plans.",
    ],
    outcome:
      "A reliable technology partnership that strengthens delivery capabilities and supports sustainable business growth.",
    imageSrc: "/images/serve/4.webp",
    thumbnailSrc: "/images/serve/4.webp",
  },
  {
    id: "02",
    title: "CTOs & Technology Leaders",
    question: "Need Additional Engineering Expertise to Deliver Complex Technology Projects?",
    asking: [
      "Can your engineers integrate with our existing architecture and technology stack?",
      "Can you support complex AI, cloud, and software engineering requirements?",
      "How do you maintain development quality and reliable project delivery?",
    ],
    howWeHelp: [
      "Experienced engineers across AI, Microsoft, cloud, data, and modern application development.",
      "Dedicated engineering teams that align with your architecture, tools, and workflows.",
      "Structured development practices focused on quality, scalability, and delivery.",
    ],
    outcome:
      "Additional engineering capacity and technical expertise to move complex initiatives forward with confidence.",
    imageSrc: "/images/serve/3.webp",
    thumbnailSrc: "/images/serve/3.webp",
  },
  {
    id: "03",
    title: "Microsoft Partners & Consultancies",
    question: "Looking to Expand Your Microsoft Project Delivery Capabilities?",
    asking: [
      "Can you support our Microsoft implementation and development projects?",
      "Can your engineers extend our existing project delivery teams?",
      "Can we collaborate on Microsoft Azure, Fabric, and Power Platform initiatives?",
    ],
    howWeHelp: [
      "Engineering expertise across Azure, Microsoft Fabric, Power BI, and Power Platform.",
      "Support for SharePoint, Microsoft 365, integrations, and custom applications.",
      "Flexible offshore development and white-label collaboration models.",
    ],
    outcome:
      "Expanded Microsoft engineering capabilities and additional delivery support for client projects.",
    imageSrc: "/images/serve/5.webp",
    thumbnailSrc: "/images/serve/5.webp",
  },
  {
    id: "04",
    title: "Digital Agencies & IT Consulting Firms",
    question: "Need a Dependable Offshore Development Partner for Your Client Projects?",
    asking: [
      "Can you deliver development work under our brand?",
      "Can you support multiple client projects and changing workloads?",
      "Can we maintain direct ownership of our client relationships?",
    ],
    howWeHelp: [
      "White-label software development and offshore engineering support.",
      "Web, mobile, API, AI, and custom application development.",
      "Flexible project-based collaboration and dedicated engineering resources.",
    ],
    outcome:
      "Greater delivery capacity, expanded service offerings, and more opportunities to serve your clients.",
    imageSrc: "/images/serve/2.webp",
    thumbnailSrc: "/images/serve/2.webp",
  },
  {
    id: "05",
    title: "SaaS & Product Companies",
    question: "Looking to Strengthen Product Development and Engineering Capacity?",
    asking: [
      "Can you support our product development roadmap?",
      "Can we access dedicated engineers for ongoing development?",
      "Can you help modernize applications and integrate new technologies?",
    ],
    howWeHelp: [
      "Dedicated engineering teams for product development and enhancement.",
      "Cloud engineering, API integration, and application modernization.",
      "AI integration and full-stack software development expertise.",
    ],
    outcome:
      "Stronger product engineering capabilities and the technical support to evolve and scale your solutions.",
    imageSrc: "/images/serve/1.webp",
    thumbnailSrc: "/images/serve/1.webp",
  },
];

export function GlobalPartnersWhoWeWorkWith({ className }: { className?: string }) {
  return (
    <section
      id="who-we-work-with"
      className={`relative w-full pt-0 pb-8 md:pb-12 border-t border-[#0a0a1a]/[0.06] overflow-hidden ${className || "bg-white"
        }`}
    >
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Main Component Content */}
        <TestimonialSlider
          reviews={REVIEWS}
          eyebrow="WHO DO WE SERVE"
          heading={
            <>
              <span className="text-[#0a0a1a]">Who Do  <span className="text-[#FF5812] drop-shadow-[0_2px_12px_rgba(255,88,18,0.15)]">
                We Serve?
              </span></span>

            </>
          }
          description="We help businesses, technology teams, and service providers extend their capabilities with offshore engineering, Agentic AI, and Microsoft expertise."
        />

        {/* Bottom CTA */}
        <div className="mt-0 flex flex-col items-center text-center border-t border-[#0a0a1a]/[0.06] pt-6 md:pt-8 px-6">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#0a0a1a] w-full max-w-none text-balance">
            Whatever your business goals or technology requirements, we&apos;re ready to collaborate and grow together.
          </h3>
          <FlowButton
            href="/who-do-we-serve"
            text="Explore Who We Serve"
            className="mt-6"
          />
        </div>
      </div>
    </section>
  );
}

export const NewWhoDoWeServeSection = GlobalPartnersWhoWeWorkWith;
export default GlobalPartnersWhoWeWorkWith;

