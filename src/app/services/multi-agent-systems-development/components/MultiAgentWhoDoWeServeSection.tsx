"use client";

import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { FlowButton } from "@/components/ui/flow-button";

const REVIEWS = [
  {
    id: "01",
    title: "CEOs & Business Leaders",
    question: "Looking to turn complex business workflows into coordinated AI-powered processes?",
    asking: [
      "Which business processes can benefit from multiple collaborating AI agents?",
      "How can specialized agents work together across our business systems?",
      "How do we move from a multi-agent AI concept to a working solution?"
    ],
    howWeHelp: [
      "Identify suitable multi-agent use cases and define the solution architecture.",
      "Design coordinated workflows with specialized agents and defined responsibilities.",
      "Plan integrations, governance, and implementation around business requirements."
    ],
    outcome: "A practical multi-agent AI roadmap aligned with business priorities and implementation requirements.",
    imageSrc: "/images/serve/4.webp",
    thumbnailSrc: "/images/serve/4.webp",
  },
  {
    id: "02",
    title: "CTOs & Technology Leaders",
    question: "Need engineering expertise to build and orchestrate multi-agent systems?",
    asking: [
      "Which agent frameworks and orchestration patterns fit our architecture?",
      "How can agents share context and use enterprise tools securely?",
      "How should we test, monitor, and maintain coordinated agent workflows?"
    ],
    howWeHelp: [
      "Design agent orchestration, communication, and task-routing workflows.",
      "Integrate LLMs, shared context, RAG, APIs, and enterprise applications.",
      "Support evaluation, observability, deployment, and ongoing improvements."
    ],
    outcome: "A multi-agent architecture designed around your existing technology stack and operational requirements.",
    imageSrc: "/images/serve/3.webp",
    thumbnailSrc: "/images/serve/3.webp",
  },
  {
    id: "03",
    title: "Microsoft Partners & Consultancies",
    question: "Want to expand your client delivery capabilities with multi-agent AI?",
    asking: [
      "How can we incorporate multi-agent systems into client projects?",
      "How can AI agents connect with Microsoft and enterprise platforms?",
      "Can we extend delivery capacity without building every capability in-house?"
    ],
    howWeHelp: [
      "Develop coordinated AI agent solutions and enterprise integrations.",
      "Support suitable Azure AI, Copilot, and Power Platform use cases.",
      "Provide offshore and white-label engineering support for client engagements."
    ],
    outcome: "Additional AI engineering capacity to help deliver multi-agent solutions under your own brand.",
    imageSrc: "/images/serve/5.webp",
    thumbnailSrc: "/images/serve/5.webp",
  },
  {
    id: "04",
    title: "Digital Agencies",
    question: "Looking to deliver more advanced AI-powered solutions for your clients?",
    asking: [
      "Can multiple AI agents coordinate tasks within digital products?",
      "How can agent workflows connect with APIs and existing applications?",
      "How can we add multi-agent capabilities to our service portfolio?"
    ],
    howWeHelp: [
      "Build multi-agent workflows for defined client use cases.",
      "Connect agents with approved APIs, knowledge sources, and business tools.",
      "Extend your delivery team with specialized AI engineering support."
    ],
    outcome: "A technical delivery partner for bringing coordinated AI capabilities into client projects.",
    imageSrc: "/images/serve/2.webp",
    thumbnailSrc: "/images/serve/2.webp",
  },
  {
    id: "05",
    title: "Product & SaaS Companies",
    question: "Planning to introduce coordinated AI agents into your product?",
    asking: [
      "How can multiple agents support complex product workflows?",
      "How can agents use application data and authorized tools?",
      "What is needed to evaluate and maintain multi-agent functionality?"
    ],
    howWeHelp: [
      "Design agent roles and orchestration around product requirements.",
      "Integrate agents with application APIs, knowledge sources, and business logic.",
      "Support testing, deployment, monitoring, and iterative development."
    ],
    outcome: "A structured engineering approach for integrating multi-agent capabilities into your product.",
    imageSrc: "/images/serve/1.webp",
    thumbnailSrc: "/images/serve/1.webp",
  },
];

export default function AIAgentsWhoDoWeServeSection({ className }: { className?: string }) {
  return (
    <section className={`relative w-full pt-0 pb-8 md:pb-12 border-t border-[#0a0a1a]/[0.06] overflow-hidden ${className || "bg-white"}`}>
      <div className="mx-auto w-full max-w-[1400px]">

        {/* Main Component Content */}
        <TestimonialSlider
          reviews={REVIEWS}
          eyebrow="WHO DO WE SERVE"
          heading="Who Do We Serve?"
          description="We help tech companies, consultancies, agencies, and product teams architect and deliver coordinated AI agent systems with offshore engineering and white-label delivery."
        />

        {/* Bottom CTA */}
        <div className="mt-0 flex flex-col items-center text-center border-t border-[#0a0a1a]/[0.06] pt-6 md:pt-8 px-6">
          <h3 className="typo-heading-3 text-[#0a0a1a] w-full max-w-5xl text-balance">
            Ready to build and deliver coordinated AI agent solutions?
          </h3>
          <FlowButton href="/contact" text="EXPLORE MULTI-AGENT DEVELOPMENT" className="mt-6" />
        </div>

      </div>
    </section>
  );
}
