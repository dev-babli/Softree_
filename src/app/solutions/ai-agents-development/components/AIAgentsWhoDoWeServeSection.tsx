"use client";

import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { FlowButton } from "@/components/ui/flow-button";

const REVIEWS = [
  {
    id: "01",
    title: "CEOs & Business Leaders",
    question: "Looking to turn AI investment into practical business outcomes?",
    asking: [
      "Which business processes are suitable for AI agent automation?",
      "How can AI agents work with our existing business systems?",
      "How do we move from AI ideas to production-ready solutions?"
    ],
    howWeHelp: [
      "Identify and prioritize AI agent use cases based on business needs.",
      "Develop agents for defined workflows and operational tasks.",
      "Plan integrations, governance, and implementation with your team."
    ],
    outcome: "A practical AI agent roadmap aligned with business priorities and a clear path toward implementation.",
    imageSrc: "/images/serve/4.webp",
    thumbnailSrc: "/images/serve/4.webp",
  },
  {
    id: "02",
    title: "CTOs & Technology Leaders",
    question: "Need engineering expertise to design and deploy enterprise AI agents?",
    asking: [
      "Which AI models and agent frameworks fit our architecture?",
      "How can agents connect securely with APIs and enterprise data?",
      "How will we evaluate, monitor, and maintain agent performance?"
    ],
    howWeHelp: [
      "Design agent architectures using suitable models, tools, and orchestration.",
      "Integrate RAG, APIs, knowledge sources, and enterprise applications.",
      "Support testing, deployment, monitoring, and ongoing optimization."
    ],
    outcome: "An AI agent architecture and implementation approach aligned with your existing technology stack and operational requirements.",
    imageSrc: "/images/serve/3.webp",
    thumbnailSrc: "/images/serve/3.webp",
  },
  {
    id: "03",
    title: "Microsoft Partners & Consultancies",
    question: "Want to extend your service portfolio with AI agent development?",
    asking: [
      "How can we add AI agents to our Microsoft client engagements?",
      "Can agents work with Azure AI, Copilot Studio, and Power Platform?",
      "Can we extend our delivery capacity without expanding our permanent team?"
    ],
    howWeHelp: [
      "Develop AI agents and integrations for suitable Microsoft environments.",
      "Connect agents with enterprise knowledge and business workflows.",
      "Provide offshore engineering and white-label delivery options."
    ],
    outcome: "Additional AI engineering capacity to support client projects and expand your AI service offerings.",
    imageSrc: "/images/serve/5.webp",
    thumbnailSrc: "/images/serve/5.webp",
  },
  {
    id: "04",
    title: "Digital Agencies",
    question: "Need a technical partner to bring AI-powered features into client projects?",
    asking: [
      "How can we add AI assistants and intelligent workflows to digital products?",
      "Can AI agents connect to client APIs, content, and business tools?",
      "How can we deliver AI functionality alongside our existing services?"
    ],
    howWeHelp: [
      "Build custom AI agents and conversational experiences.",
      "Integrate APIs, knowledge sources, and supported business applications.",
      "Extend your delivery team with AI engineering and implementation support."
    ],
    outcome: "A technical delivery partner to help bring AI-powered features into client solutions.",
    imageSrc: "/images/serve/2.webp",
    thumbnailSrc: "/images/serve/2.webp",
  },
  {
    id: "05",
    title: "Product & SaaS Companies",
    question: "Planning to embed AI agents into your product or SaaS platform?",
    asking: [
      "How can AI agents support product-specific tasks and user workflows?",
      "How can agents use application data and approved tools?",
      "What is needed to test and operate AI features at scale?"
    ],
    howWeHelp: [
      "Design agents around product requirements and user journeys.",
      "Connect AI capabilities with application APIs, data, and business logic.",
      "Support evaluation, integration testing, deployment, and iteration."
    ],
    outcome: "A structured engineering approach for integrating AI agent capabilities into your product.",
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
          description="We help business leaders, technology teams, consulting firms, digital agencies, and product companies build custom AI agents, integrate enterprise systems, and automate workflows with specialized AI engineering support."
        />

        {/* Bottom CTA */}
        <div className="mt-0 flex flex-col items-center text-center border-t border-[#0a0a1a]/[0.06] pt-6 md:pt-8 px-6">
          <h3 className="typo-heading-3 text-[#0a0a1a] w-full max-w-5xl text-balance">
            Whatever your AI goals, we&apos;re ready to help you build and deliver custom AI agent solutions.
          </h3>
          <FlowButton href="/contact" text="EXPLORE AI AGENT DEVELOPMENT" className="mt-6" />
        </div>

      </div>
    </section>
  );
}
