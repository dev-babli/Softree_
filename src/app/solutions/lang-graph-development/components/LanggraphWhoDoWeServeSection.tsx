"use client";

import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { FlowButton } from "@/components/ui/flow-button";

const REVIEWS = [
  {
    id: "01",
    title: "CTOs & Technology Leaders",
    question: "Need an engineering team to build reliable, production-ready AI agent workflows?",
    asking: [
      "Can you build stateful AI agents that work with our existing systems?",
      "Can you manage multi-step workflows, tools, and human approvals?",
      "Can the architecture scale as our AI requirements grow?"
    ],
    howWeHelp: [
      "Design and build LangGraph-based agent and workflow architectures.",
      "Integrate tools, APIs, RAG, databases, and enterprise systems.",
      "Add state management, checkpoints, evaluation, and production monitoring."
    ],
    outcome: "A scalable LangGraph architecture that supports reliable AI agents, controlled workflows, and evolving business requirements.",
    imageSrc: "/images/serve/4.webp",
    thumbnailSrc: "/images/serve/4.webp",
  },
  {
    id: "02",
    title: "Microsoft & AI Technology Partners",
    question: "Need additional LangGraph engineering capacity for your AI and client engagements?",
    asking: [
      "Can you support our existing AI delivery team?",
      "Can your engineers work within our architecture and delivery process?",
      "Can we use your team for client-facing AI projects?"
    ],
    howWeHelp: [
      "Provide dedicated offshore LangGraph engineering capacity.",
      "Extend projects with agent, RAG, tool integration, and workflow expertise.",
      "Work as a white-label engineering extension of your delivery team."
    ],
    outcome: "More AI agent and workflow projects delivered with specialized LangGraph engineering capacity while you retain client ownership.",
    imageSrc: "/images/serve/3.webp",
    thumbnailSrc: "/images/serve/3.webp",
  },
  {
    id: "03",
    title: "Digital Agencies & Consultancies",
    question: "Want to add production AI agents to your client offerings without building an internal LangGraph team?",
    asking: [
      "Can you build LangGraph solutions behind our client-facing team?",
      "Can you support different AI use cases and workflows?",
      "Can delivery remain under our brand?"
    ],
    howWeHelp: [
      "Build custom LangGraph agents and multi-step workflows.",
      "Support RAG, tool calling, integrations, and evaluation.",
      "Provide flexible offshore and white-label engineering support."
    ],
    outcome: "More AI projects delivered under your brand with specialized LangGraph engineering behind your client-facing team.",
    imageSrc: "/images/serve/5.webp",
    thumbnailSrc: "/images/serve/5.webp",
  },
  {
    id: "04",
    title: "Product & SaaS Companies",
    question: "Looking to add intelligent, stateful AI agents to your product?",
    asking: [
      "Can LangGraph support complex product workflows?",
      "Can agents use our APIs, tools, and business data?",
      "How do we maintain reliability as usage grows?"
    ],
    howWeHelp: [
      "Build stateful AI agents aligned with your product workflows.",
      "Connect agents with APIs, databases, RAG pipelines, and business tools.",
      "Implement evaluation, observability, and production optimization."
    ],
    outcome: "Context-aware and action-oriented AI capabilities embedded into your product, backed by a scalable engineering approach.",
    imageSrc: "/images/serve/2.webp",
    thumbnailSrc: "/images/serve/2.webp",
  },
  {
    id: "05",
    title: "Enterprises",
    question: "Need to modernize complex business workflows with production-ready AI agents?",
    asking: [
      "Can LangGraph work with our enterprise data and systems?",
      "How can we control agent actions and human approvals?",
      "Can the solution be secured, evaluated, and monitored in production?"
    ],
    howWeHelp: [
      "Build enterprise LangGraph agents and multi-agent workflows.",
      "Integrate RAG, enterprise APIs, databases, and business applications.",
      "Add guardrails, human-in-the-loop controls, evaluation, and observability."
    ],
    outcome: "Secure, controlled AI workflows that automate complex processes while keeping enterprise systems, data, and human oversight connected.",
    imageSrc: "/images/serve/1.webp",
    thumbnailSrc: "/images/serve/1.webp",
  },
];

export default function LanggraphWhoDoWeServeSection({ className }: { className?: string }) {
  return (
    <section className={`relative w-full pt-0 pb-8 md:pb-12 border-t border-[#0a0a1a]/[0.06] overflow-hidden ${className || "bg-white"}`}>
      <div className="mx-auto w-full max-w-[1400px]">

        {/* Main Component Content */}
        <TestimonialSlider
          reviews={REVIEWS}
          eyebrow="WHO DO WE SERVE"
          heading="Who Do We Serve?"
          description="We help businesses, technology teams, and service providers build and scale production-ready AI agents and workflows with offshore LangGraph engineering expertise."
        />

        {/* Bottom CTA */}
        <div className="mt-0 flex flex-col items-center text-center border-t border-[#0a0a1a]/[0.06] pt-6 md:pt-8 px-6">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#0a0a1a] w-full max-w-3xl mx-auto">
            Whatever you&apos;re building, modernizing, or scaling, we&apos;re ready to engineer reliable LangGraph AI solutions alongside you.
          </h3>
          <FlowButton href="/who-do-we-serve" text="Explore Our LangGraph Expertise" className="mt-6" />
        </div>

      </div>
    </section>
  );
}
