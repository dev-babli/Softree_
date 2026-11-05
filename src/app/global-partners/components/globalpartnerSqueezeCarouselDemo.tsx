"use client";

import React from "react";
import StickyContentWrapper, {
  type StickyContentItem,
} from "@/components/ui/sticky-content-wrapper";
import { typography } from "@/lib/typography";

const PARTNER_ITEMS: StickyContentItem[] = [
  {
    heading: (
      <>
        <span className="text-[#0a0a1a]">Microsoft Partners</span>{" "}
        <span className="text-[#FF5812] drop-shadow-[0_2px_12px_rgba(255,88,18,0.15)]">& Consultancies</span>
      </>
    ),
    paragraph:
      "Collaborate with Softree to extend your project delivery capacity and support your clients with additional engineering resources.",
    list: [
      "Dedicated Microsoft-certified engineers & architects",
      "SharePoint, Power Platform & M365 development",
      "Enterprise Azure cloud & data modernizations",
    ],
    link: { href: "/contact", text: "Partner with Softree" },
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
    alt: "Microsoft Partners & Consultancies",
  },
  {
    heading: (
      <>
        <span className="text-[#0a0a1a]">AI & Technology</span>{" "}
        <span className="text-[#FF5812] drop-shadow-[0_2px_12px_rgba(255,88,18,0.15)]">Companies</span>
      </>
    ),
    paragraph:
      "Work together to accelerate project execution, expand engineering capabilities and explore new technology opportunities.",
    list: [
      "Generative AI & autonomous agent workflows",
      "Accelerated roadmap delivery & specialized talent",
      "Scalable full-stack & cloud microservices",
    ],
    link: { href: "/contact", text: "Partner with Softree" },
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=80",
    alt: "AI & Technology Companies",
  },
  {
    heading: (
      <>
        <span className="text-[#0a0a1a]">Digital Agencies</span>{" "}
        <span className="text-[#FF5812] drop-shadow-[0_2px_12px_rgba(255,88,18,0.15)]">& IT Consulting Firms</span>
      </>
    ),
    paragraph:
      "Expand your service delivery capacity through a flexible offshore partnership while maintaining ownership of your client relationships.",
    list: [
      "100% white-label software engineering squads",
      "Retain full ownership of client relationships",
      "Flexible capacity scaling aligned with client demands",
    ],
    link: { href: "/contact", text: "Partner with Softree" },
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80",
    alt: "Digital Agencies & IT Consulting Firms",
  },
  {
    heading: (
      <>
        <span className="text-[#0a0a1a]">SaaS & Product</span>{" "}
        <span className="text-[#FF5812] drop-shadow-[0_2px_12px_rgba(255,88,18,0.15)]">Companies</span>
      </>
    ),
    paragraph:
      "Strengthen your development capacity and access dedicated engineering resources to support product development and business growth.",
    list: [
      "Dedicated product engineering pods & sprint velocity",
      "Continuous QA, DevOps governance & CI/CD automation",
      "Modern scalable cloud architectures & API integrations",
    ],
    link: { href: "/contact", text: "Partner with Softree" },
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
    alt: "SaaS & Product Companies",
  },
];

export function GlobalPartnersSqueezeCarouselDemo() {
  return (
    <section id="who-we-partner-with" className="w-full bg-white pt-6 sm:pt-10 md:pt-12 pb-0 border-t border-neutral-200/80">
      {/* Centered Section Header */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 text-center flex flex-col items-center mb-1 sm:mb-3">
        {/* Eyebrow Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FF5812]/20 bg-[#FF5812]/5 px-3.5 py-1.5 shadow-sm mb-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
          <span
            className={`${typography.caption.default} font-bold tracking-wider text-[#FF5812] uppercase font-mono`}
          >
            WHO WE PARTNER WITH
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`${typography.heading.h2} text-[#0a0a1a] leading-[1.15] tracking-tight`}
        >
          <span>Partnerships That </span>
          <span className="text-[#FF5812] drop-shadow-[0_2px_12px_rgba(255,88,18,0.15)]">
            Create Opportunities
          </span>
        </h2>

        {/* Subtitle / Description */}
        <p
          className={`${typography.description.default} text-zinc-600 max-w-3xl mt-2 leading-relaxed font-normal text-center`}
        >
          We collaborate with organizations looking for a reliable offshore
          engineering partner to expand their capabilities, strengthen delivery
          and support business growth.
        </p>
      </div>

      {/* Sticky Content Scrollytelling Carousel */}
      <div className="w-full relative">
        <StickyContentWrapper items={PARTNER_ITEMS} />
      </div>
    </section>
  );
}

export default GlobalPartnersSqueezeCarouselDemo;
