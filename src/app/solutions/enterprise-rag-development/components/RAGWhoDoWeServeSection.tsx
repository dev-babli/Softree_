"use client";

import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { FlowButton } from "@/components/ui/flow-button";

const REVIEWS = [
  {
    id: "01",
    title: "CEOs & Business Leaders",
    question: "Looking to make your business knowledge more accessible and useful with AI?",
    asking: [
      "Can RAG give our teams reliable answers from internal business knowledge?",
      "Can we connect AI to our existing documents and business systems?",
      "Can you help us move from an AI idea to a production solution?"
    ],
    howWeHelp: [
      "Build secure RAG applications around your business data and knowledge.",
      "Connect documents, databases, applications, and enterprise information sources.",
      "Provide offshore RAG engineering from architecture through production."
    ],
    outcome: "A secure AI knowledge solution that helps teams access relevant business information faster and make better-informed decisions.",
    imageSrc: "/images/serve/4.webp",
    thumbnailSrc: "/images/serve/4.webp",
  },
  {
    id: "02",
    title: "CTOs & Technology Leaders",
    question: "Need an engineering team to build and integrate a production-ready RAG architecture?",
    asking: [
      "Can you handle ingestion, embeddings, vector search, retrieval, and LLM integration?",
      "Can RAG integrate with our existing APIs, databases, and enterprise systems?",
      "How do you handle security, evaluation, and production optimization?"
    ],
    howWeHelp: [
      "Engineer complete RAG pipelines from data ingestion to grounded LLM responses.",
      "Integrate vector/hybrid retrieval, reranking, APIs, databases, and enterprise systems.",
      "Support testing, evaluation, security, deployment, monitoring, and optimization."
    ],
    outcome: "A production-ready RAG architecture that fits your technology ecosystem and can scale with your AI requirements.",
    imageSrc: "/images/serve/3.webp",
    thumbnailSrc: "/images/serve/3.webp",
  },
  {
    id: "03",
    title: "Microsoft Partners & Consultancies",
    question: "Need additional RAG engineering capacity for your Microsoft AI and client engagements?",
    asking: [
      "Can you extend our team for RAG and Azure AI projects?",
      "Can you work within our existing delivery model and processes?",
      "Can you support white-label delivery behind our client relationship?"
    ],
    howWeHelp: [
      "Extend your delivery team with specialized offshore RAG engineers.",
      "Build solutions using Azure OpenAI, Azure AI Search, Microsoft 365, and SharePoint.",
      "Provide behind-the-scenes engineering for white-label RAG delivery."
    ],
    outcome: "More RAG projects delivered with specialized engineering capacity while you retain the client relationship and delivery ownership.",
    imageSrc: "/images/serve/5.webp",
    thumbnailSrc: "/images/serve/5.webp",
  },
  {
    id: "04",
    title: "Digital Agencies",
    question: "Want to add RAG-powered AI solutions to your client offerings without building an internal AI team?",
    asking: [
      "Can you build the RAG solution while we manage the client?",
      "Can you support different client data sources and use cases?",
      "Can the solution be delivered under our brand?"
    ],
    howWeHelp: [
      "Build custom RAG applications, knowledge assistants, and AI search experiences.",
      "Connect client documents, databases, APIs, and business applications.",
      "Provide white-label offshore engineering from development through deployment."
    ],
    outcome: "More AI projects delivered under your brand with flexible RAG engineering capacity behind your client-facing team.",
    imageSrc: "/images/serve/2.webp",
    thumbnailSrc: "/images/serve/2.webp",
  },
  {
    id: "05",
    title: "Product & SaaS Companies",
    question: "Looking to add secure, knowledge-aware AI capabilities to your product?",
    asking: [
      "Can you connect RAG to our product data and customer knowledge?",
      "Can you build contextual AI search or knowledge assistants?",
      "Can you help us scale AI capabilities without expanding our internal team?"
    ],
    howWeHelp: [
      "Build RAG-powered product features, knowledge assistants, and intelligent search.",
      "Integrate proprietary data, APIs, databases, and application workflows.",
      "Extend your product team with dedicated offshore RAG engineers."
    ],
    outcome: "Context-aware AI capabilities embedded into your product, backed by a scalable engineering team.",
    imageSrc: "/images/serve/1.webp",
    thumbnailSrc: "/images/serve/1.webp",
  },
];

export default function RAGWhoDoWeServeSection({ className }: { className?: string }) {
  return (
    <section className={`relative w-full pt-0 pb-8 md:pb-12 border-t border-[#0a0a1a]/[0.06] overflow-hidden ${className || "bg-white"}`}>
      <div className="mx-auto w-full max-w-[1400px]">

        {/* Main Component Content */}
        <TestimonialSlider
          reviews={REVIEWS}
          eyebrow="WHO DO WE SERVE"
          heading="Who Do We Serve?"
          description="We help enterprises and technology partners design, build, and scale secure RAG solutions—from data ingestion to production deployment—with dedicated offshore engineering teams."
        />

        {/* Bottom CTA */}
        <div className="mt-0 flex flex-col items-center text-center border-t border-[#0a0a1a]/[0.06] pt-6 md:pt-8 px-6">
          <h3 className="typo-heading-3 text-[#0a0a1a] w-full max-w-4xl text-balance">
            Whatever you&apos;re building, modernizing, or scaling, we&apos;re ready to work alongside you.
          </h3>
          <FlowButton href="/who-do-we-serve" text="Explore Who We Serve" className="mt-6" />
        </div>

      </div>
    </section>
  );
}
