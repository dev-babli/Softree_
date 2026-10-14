"use client";

import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { FlowButton } from "@/components/ui/flow-button";

const REVIEWS = [
  {
    id: "01",
    title: "CEOs & Business Leaders",
    question: "Looking to leverage Azure OpenAI to transform your business operations and unlock AI-driven growth?",
    asking: [
      "How can we deploy Azure OpenAI securely inside our existing Azure environment?",
      "What will AI mean for our existing workflows, data security, and compliance requirements?",
      "How can we start with a pilot and scale AI adoption across the business?",
    ],
    howWeHelp: [
      "Define your Azure OpenAI strategy, use case prioritisation, and AI readiness roadmap.",
      "Architect and deploy GPT-4o applications, RAG pipelines, and Copilot integrations within your private Azure subscription.",
      "Support production launch, ongoing evaluation, cost optimization, and AI governance.",
    ],
    outcome: "A production-ready Azure OpenAI solution that delivers measurable business value while meeting your security, compliance, and governance requirements.",
    imageSrc: "/images/serve/4.webp",
    thumbnailSrc: "/images/serve/4.webp",
  },
  {
    id: "02",
    title: "CTOs & Technology Leaders",
    question: "Need to architect production Azure OpenAI solutions with proper security, RAG accuracy, and scalability?",
    asking: [
      "How do we design a secure Azure OpenAI landing zone with VNet isolation and Entra ID RBAC?",
      "How can we build an accurate RAG system using Azure AI Search with semantic re-ranking?",
      "How do we optimize token costs and manage model versions across production deployments?",
    ],
    howWeHelp: [
      "Design and provision secure Azure AI Foundry environments with private endpoints, Key Vault, and compliance controls.",
      "Build production RAG pipelines with hybrid retrieval, semantic re-ranking, citation grounding, and evaluation suites.",
      "Implement token governance, semantic caching, model tiering, and Azure Cost Management controls.",
    ],
    outcome: "A governed, scalable Azure OpenAI architecture with production-grade security, RAG accuracy, and controlled operational costs.",
    imageSrc: "/images/serve/3.webp",
    thumbnailSrc: "/images/serve/3.webp",
  },
  {
    id: "03",
    title: "Microsoft Partner & Consultancy",
    question: "Need additional Azure OpenAI engineering capacity for your client AI project engagements?",
    asking: [
      "Can we extend our team with specialized Azure OpenAI engineers for client projects?",
      "Can Softree handle RAG architecture and Copilot development behind the scenes?",
      "Can you support Microsoft 365, Teams, and Power Platform AI integrations?",
    ],
    howWeHelp: [
      "Provide dedicated offshore Azure OpenAI engineering teams for client project delivery.",
      "Support GPT-4o development, RAG pipelines, Copilot extensions, and Microsoft 365 integrations.",
      "Work within your delivery model as a white-label AI engineering partner.",
    ],
    outcome: "Additional Azure OpenAI engineering capacity that helps you deliver client AI projects faster while retaining full engagement ownership.",
    imageSrc: "/images/serve/5.webp",
    thumbnailSrc: "/images/serve/5.webp",
  },
  {
    id: "04",
    title: "Digital Agencies",
    question: "Need a reliable offshore Azure OpenAI engineering team to handle complex AI builds?",
    asking: [
      "Can you handle GPT-4o API development, RAG systems, and Azure AI Search integrations?",
      "Can you support prompt engineering, evaluation, and production deployment?",
      "Can your team work as an extension of our existing delivery team?",
    ],
    howWeHelp: [
      "Provide offshore Azure OpenAI engineers for end-to-end application development.",
      "Handle architecture, API engineering, RAG indexing, Copilot development, and security implementation.",
      "Support production deployment, monitoring, cost optimization, and ongoing AI governance.",
    ],
    outcome: "Reliable Azure OpenAI delivery without requiring you to expand your internal AI engineering team.",
    imageSrc: "/images/serve/2.webp",
    thumbnailSrc: "/images/serve/2.webp",
  },
  {
    id: "05",
    title: "Product & SaaS Companies",
    question: "Need to embed Azure OpenAI capabilities into your product or platform at scale?",
    asking: [
      "How can we add AI features to our product without disrupting existing customers?",
      "Can we build a secure, multi-tenant Azure OpenAI architecture for our SaaS platform?",
      "How do we manage costs and ensure AI accuracy at production scale?",
    ],
    howWeHelp: [
      "Design multi-tenant Azure OpenAI architectures with tenant-level isolation, RBAC, and data privacy controls.",
      "Build AI features, intelligent search, document processing, and Copilot-style assistants inside your product.",
      "Implement token governance, semantic caching, evaluation frameworks, and scalable model deployment pipelines.",
    ],
    outcome: "A scalable, secure Azure OpenAI integration that adds differentiated AI capabilities to your product while controlling costs and maintaining performance at scale.",
    imageSrc: "/images/serve/1.webp",
    thumbnailSrc: "/images/serve/1.webp",
  },
];

export default function AzureOpenAIWhoDoWeServeSection({ className }: { className?: string }) {
  return (
    <section className={`relative w-full pt-0 pb-8 md:pb-12 border-t border-[#0a0a1a]/[0.06] overflow-hidden ${className || "bg-white"}`}>
      <div className="mx-auto w-full max-w-[1400px]">

        {/* Main Component Content */}
        <TestimonialSlider
          reviews={REVIEWS}
          eyebrow="WHO DO WE SERVE"
          heading="Who Do We Serve?"
          description="We help business leaders, technology teams, consulting firms, digital agencies, and SaaS companies design, build, and deploy production Azure OpenAI solutions — from GPT-4o applications and RAG pipelines to Microsoft Copilot extensions and governed AI Foundry deployments."
        />

        {/* Bottom CTA */}
        <div className="mt-0 flex flex-col items-center text-center border-t border-[#0a0a1a]/[0.06] pt-6 md:pt-8 px-6">
          <h3 className="typo-heading-3 text-[#0a0a1a] w-full max-w-5xl text-balance">
            Whatever you&apos;re building, automating, or transforming with AI, we&apos;re ready to help you deploy it on Azure.
          </h3>
          <FlowButton href="/who-do-we-serve" text="Explore Who We Serve" className="mt-6" />
        </div>

      </div>
    </section>
  );
}
