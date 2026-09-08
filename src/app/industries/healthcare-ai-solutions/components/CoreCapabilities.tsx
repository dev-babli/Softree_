"use client";

import React from "react";
import SqueezeCarousel, { SqueezeSlide } from "@/components/ui/carousel-squeeze";

const capabilitiesSlides: SqueezeSlide[] = [
  {
    id: "app-integration",
    category: "HEALTHCARE APPLICATION INTEGRATION",
    title: "Healthcare Application Integration",
    description:
      "Connect AI capabilities with existing healthcare applications to enhance functionality without replacing critical systems.",
    bullets: [
      "Clinical applications",
      "Patient portals",
      "Provider platforms",
      "Enterprise software",
    ],
    image: "/images/ai-healthcare-images/health-4.png",
    imageAlt: "Clinician using healthcare application interface on tablet",
    action: "Explore Healthcare AI Integration",
    href: "/contact",
  },
  {
    id: "api-microservices",
    category: "API & MICROSERVICES INTEGRATION",
    title: "API & Microservices Integration",
    description:
      "Connect AI solutions with enterprise systems through secure APIs and scalable microservices architectures.",
    bullets: [
      "REST APIs",
      "Microservices",
      "System-to-system integration",
      "Third-party APIs",
    ],
    image: "/images/ai-healthcare-images/health-7.png",
    imageAlt: "Physician working with connected medical system terminal and APIs",
    action: "Explore Healthcare AI Integration",
    href: "/contact",
  },
  {
    id: "data-integration",
    category: "HEALTHCARE DATA INTEGRATION",
    title: "Healthcare Data Integration",
    description:
      "Bring AI closer to trusted healthcare data across structured and unstructured environments.",
    bullets: [
      "Healthcare databases",
      "Data warehouses",
      "Data lakes",
      "Data pipelines",
    ],
    image: "/images/ai-healthcare-images/health-3.png",
    imageAlt: "Scientist analyzing neural data networks and laboratory databases",
    action: "Explore Healthcare AI Integration",
    href: "/contact",
  },
  {
    id: "cloud-ai",
    category: "CLOUD AI ARCHITECTURE",
    title: "Cloud AI Integration",
    description:
      "Integrate AI capabilities across cloud environments to support scalable, flexible, and modern healthcare technology architectures.",
    bullets: [
      "Cloud platforms",
      "AI services",
      "Cloud data platforms",
      "Hybrid environments",
    ],
    image: "/images/ai-healthcare-images/health-8.png",
    imageAlt: "Cloud-connected laboratory researcher evaluating data analytics",
    action: "Explore Healthcare AI Integration",
    href: "/contact",
  },
  {
    id: "legacy-modernization",
    category: "LEGACY SYSTEM MODERNIZATION",
    title: "Legacy System Modernization",
    description:
      "Introduce modern AI capabilities into legacy environments while reducing disruption and protecting existing technology investments.",
    bullets: [
      "Legacy applications",
      "Existing infrastructure",
      "Modernization layers",
      "Hybrid systems",
    ],
    image: "/images/ai-healthcare-images/health-1.png",
    imageAlt: "Clinical care environment modernized with digital monitoring infrastructure",
    action: "Explore Healthcare AI Integration",
    href: "/contact",
  },
  {
    id: "workflow-integration",
    category: "WORKFLOW INTEGRATION",
    title: "Workflow Integration",
    description:
      "Embed AI into existing healthcare workflows to automate tasks, support decisions, and improve operational efficiency.",
    bullets: [
      "Workflow management systems",
      "Business process automation",
      "Task orchestration",
      "Human-in-the-loop workflows",
    ],
    image: "/images/ai-healthcare-images/health-2.png",
    imageAlt: "Doctor and patient consultation in a human-in-the-loop intelligent workflow",
    action: "Explore Healthcare AI Integration",
    href: "/contact",
  },
  {
    id: "knowledge-repository",
    category: "KNOWLEDGE & REPOSITORY INTEGRATION",
    title: "Knowledge & Repository Integration",
    description:
      "Connect AI applications with internal knowledge sources to enable intelligent search, retrieval, and context-aware assistance.",
    bullets: [
      "Knowledge repositories",
      "Enterprise content",
      "Document stores",
      "Internal databases",
    ],
    image: "/images/ai-healthcare-images/health-6.png",
    imageAlt: "Laboratory scientists indexing clinical document repositories and specimen data",
    action: "Explore Healthcare AI Integration",
    href: "/contact",
  },
  {
    id: "enterprise-modernization",
    category: "ENTERPRISE AI MODERNIZATION",
    title: "Enterprise AI Modernization",
    description:
      "Create a practical path toward AI adoption by integrating intelligent capabilities across applications, data, and enterprise technology environments.",
    bullets: [
      "AI-ready architectures",
      "Enterprise integration",
      "Platform modernization",
      "Incremental AI adoption",
    ],
    image: "/images/ai-healthcare-images/health-5.png",
    imageAlt: "Enterprise healthcare specialists collaborating on digital diagnostics and modernization",
    action: "Explore Healthcare AI Integration",
    href: "/contact",
  },
];

export default function CoreCapabilities() {
  return (
    <section className="w-full bg-white pt-8 md:pt-12 pb-16 md:pb-24 font-sans overflow-hidden">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-[2cm]">
        {/* Header */}
        <div className="flex flex-col items-center w-full mb-10 md:mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 text-[10px] sm:text-[11px] font-bold tracking-widest text-[#FF6B00] uppercase mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
            HEALTHCARE AI INTEGRATION & MODERNIZATION
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 mb-5 tracking-tight leading-tight max-w-4xl">
            Connect AI With Your Existing{" "}
            <span className="text-[#FF6B2C]">Healthcare Technology Ecosystem</span>
          </h2>
          <p className="text-[15px] md:text-base text-slate-800 font-medium max-w-3xl mx-auto mb-3">
            Integrate intelligent capabilities into existing applications, data environments, and enterprise workflows without rebuilding your technology stack.
          </p>
        
          <p className="text-[14px] sm:text-[15px] font-semibold text-[#FF6B2C] italic">
            Modernize incrementally. Integrate intelligently. Scale without unnecessary disruption.
          </p>
        </div>

        {/* Squeeze Carousel - 8 Enterprise AI Integration Cards */}
        <div className="w-full">
          <SqueezeCarousel
            slides={capabilitiesSlides}
            height="clamp(480px, 44vw, 560px)"
            radius={20}
            duration={700}
            accent="#FF6B2C"
            accentForeground="#FFFFFF"
            autoplay={true}
            interval={6000}
            hoverGrow={true}
            controls={true}
          />
        </div>
      </div>
    </section>
  );
}
