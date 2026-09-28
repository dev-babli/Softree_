"use client";

import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { FlowButton } from "@/components/ui/flow-button";

const REVIEWS = [
  {
    id: "01",
    title: "CEOs & Business Leaders",
    question: "Looking to turn AI investment into measurable business outcomes?",
    asking: [
      "Where can Agentic AI create real business value?",
      "Which AI use cases are practical for our organization?",
      "Can you help us move from AI ideas to production?"
    ],
    howWeHelp: [
      "Identify practical Agentic AI and automation opportunities.",
      "Build production-ready AI agents and intelligent workflows.",
      "Provide dedicated offshore AI engineering support."
    ],
    outcome: "More AI initiatives moving from strategy to production with clear business value and the engineering capacity to scale.",
    imageSrc: "/images/serve/4.jpg",
    thumbnailSrc: "/images/serve/4.jpg",
  },
  {
    id: "02",
    title: "CTOs & Technology Leaders",
    question: "Need an engineering partner to design, integrate, and scale production AI systems?",
    asking: [
      "Can you integrate AI agents with our existing architecture?",
      "Can you handle RAG, APIs, tools, and enterprise data?",
      "Can you support production deployment and ongoing engineering?"
    ],
    howWeHelp: [
      "Build AI agents, multi-agent systems, and RAG solutions.",
      "Integrate APIs, databases, SaaS platforms, and enterprise systems.",
      "Support architecture, development, testing, and deployment."
    ],
    outcome: "Production-ready AI systems integrated into your technology ecosystem with the engineering support to scale confidently.",
    imageSrc: "/images/serve/3.jpg",
    thumbnailSrc: "/images/serve/3.jpg",
  },
  {
    id: "03",
    title: "Microsoft Partners & Consultancies",
    question: "Need an AI engineering team to extend your Microsoft delivery capabilities?",
    asking: [
      "Can you support our Azure AI and Microsoft projects?",
      "Can you work as an extension of our delivery team?",
      "Do you support white-label AI delivery?"
    ],
    howWeHelp: [
      "Extend your delivery team with specialized Agentic AI engineers.",
      "Build Azure AI, RAG, AI agent, and automation solutions.",
      "Provide offshore and white-label engineering support."
    ],
    outcome: "More Microsoft and AI projects delivered with the expertise and capacity to grow your client portfolio.",
    imageSrc: "/images/serve/5.jpg",
    thumbnailSrc: "/images/serve/5.jpg",
  },
  {
    id: "04",
    title: "Digital Agencies",
    question: "Need reliable AI engineering capability for your client projects?",
    asking: [
      "Can you build AI solutions while we manage the client relationship?",
      "Can you support multiple AI projects as our engineering partner?",
      "Can you deliver solutions under our brand?"
    ],
    howWeHelp: [
      "Act as an offshore AI engineering extension of your team.",
      "Build AI agents, RAG applications, and intelligent workflows.",
      "Support white-label AI development from build to deployment."
    ],
    outcome: "More AI projects delivered under your brand with reliable engineering capacity and specialized AI expertise.",
    imageSrc: "/images/serve/2.jpg",
    thumbnailSrc: "/images/serve/2.jpg",
  },
  {
    id: "05",
    title: "Product & SaaS Companies",
    question: "Looking for an engineering partner to add AI capabilities to your product roadmap?",
    asking: [
      "Can you help us ship AI features faster?",
      "Can you integrate AI agents into our existing product?",
      "Can you build RAG and contextual AI experiences?"
    ],
    howWeHelp: [
      "Extend your product team with specialized AI engineers.",
      "Build AI agents, RAG features, and contextual AI applications.",
      "Integrate AI with your product, APIs, databases, and cloud environment."
    ],
    outcome: "AI-powered product capabilities delivered faster with the engineering expertise and capacity to accelerate your roadmap.",
    imageSrc: "/images/serve/1.jpg",
    thumbnailSrc: "/images/serve/1.jpg",
  },
];

export default function NewWhoDoWeServeSection({ className }: { className?: string }) {
  return (
    <section className={`relative w-full pt-0 pb-8 md:pb-12 border-t border-[#0a0a1a]/[0.06] overflow-hidden ${className || "bg-[#F8F9FC]"}`}>
      <div className="mx-auto w-full max-w-[1400px]">

        {/* Main Component Content */}
        <TestimonialSlider
          reviews={REVIEWS}
          eyebrow="WHO DO WE SERVE"
          heading="Who Do We Serve?"
          description="We help businesses, technology teams, and service providers extend their capabilities with offshore engineering, Agentic AI, and Microsoft expertise."
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
