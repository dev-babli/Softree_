"use client";

import React from "react";
import SqueezeCarousel, { SqueezeSlide } from "@/components/ui/carousel-squeeze";

const capabilitiesSlides: SqueezeSlide[] = [
  {
    id: "patient-provider-workflows",
    category: "PATIENT & PROVIDER WORKFLOWS",
    title: "Patient & Provider Workflows",
    description:
      "Design AI and digital solutions around the real workflows of patients, providers, care teams, and healthcare organizations.",
    bullets: [
      "Patient engagement",
      "Provider workflows",
      "Care coordination",
      "Patient portals",
    ],
    image: "/images/ai-healthcare-images/health-4.png",
    imageAlt:
      "Healthcare professional working with a digital patient and provider workflow",
    action: "Explore Healthcare Expertise",
    href: "/contact",
  },

  {
    id: "clinical-workflows",
    category: "CLINICAL WORKFLOWS",
    title: "Clinical Workflows",
    description:
      "Build intelligent solutions that support clinical workflows, healthcare knowledge, documentation, decision support, and care delivery processes.",
    bullets: [
      "Clinical operations",
      "Clinical documentation",
      "Medical knowledge",
      "Decision support",
    ],
    image: "/images/ai-healthcare-images/health-7.png",
    imageAlt:
      "Healthcare professional working with a digital clinical workflow system",
    action: "Explore Healthcare Expertise",
    href: "/contact",
  },

  {
    id: "healthcare-operations",
    category: "HEALTHCARE OPERATIONS",
    title: "Healthcare Operations",
    description:
      "Improve healthcare operations with AI, automation, and digital solutions that streamline administrative and operational processes.",
    bullets: [
      "Healthcare administration",
      "Workflow automation",
      "Scheduling operations",
      "Operational intelligence",
    ],
    image: "/images/ai-healthcare-images/health-3.png",
    imageAlt:
      "Healthcare team using digital systems to manage healthcare operations",
    action: "Explore Healthcare Expertise",
    href: "/contact",
  },

  {
    id: "claims-revenue-cycle",
    category: "CLAIMS & REVENUE CYCLE",
    title: "Claims & Revenue Cycle",
    description:
      "Apply AI and automation to claims, billing, revenue cycle, and document-intensive healthcare processes to reduce manual effort and improve operational efficiency.",
    bullets: [
      "Claims processing",
      "Revenue cycle management",
      "Billing workflows",
      "Claims documentation",
    ],
    image: "/images/ai-healthcare-images/health-8.png",
    imageAlt:
      "Healthcare operations team working with digital claims and revenue cycle systems",
    action: "Explore Healthcare Expertise",
    href: "/contact",
  },

  {
    id: "prior-authorization",
    category: "PRIOR AUTHORIZATION",
    title: "Prior Authorization",
    description:
      "Automate prior authorization workflows with AI-powered document processing, data extraction, validation, summarization, and workflow orchestration.",
    bullets: [
      "Authorization requests",
      "Document extraction",
      "Data validation",
      "Workflow automation",
    ],
    image: "/images/ai-healthcare-images/health-1.png",
    imageAlt:
      "Healthcare professional reviewing digital prior authorization information",
    action: "Explore Healthcare Expertise",
    href: "/contact",
  },

  {
    id: "healthcare-documents",
    category: "HEALTHCARE DOCUMENTS",
    title: "Healthcare Documents",
    description:
      "Transform complex healthcare documents into structured, usable information with AI-powered document processing, extraction, classification, and summarization.",
    bullets: [
      "Medical documents",
      "Document AI",
      "Data extraction",
      "AI summarization",
    ],
    image: "/images/ai-healthcare-images/health-2.png",
    imageAlt:
      "Healthcare professional processing digital medical documents with AI",
    action: "Explore Healthcare Expertise",
    href: "/contact",
  },

  {
    id: "healthcare-data-analytics",
    category: "HEALTHCARE DATA & ANALYTICS",
    title: "Healthcare Data & Analytics",
    description:
      "Turn healthcare data into trusted insights with data engineering, analytics, integration, and AI-ready data platforms that support better decisions.",
    bullets: [
      "Healthcare data engineering",
      "Data integration",
      "Healthcare analytics",
      "AI-ready data",
    ],
    image: "/images/ai-healthcare-images/health-6.png",
    imageAlt:
      "Healthcare data specialists analyzing digital healthcare data and analytics",
    action: "Explore Healthcare Expertise",
    href: "/contact",
  },

  {
    id: "interoperability",
    category: "HEALTHCARE INTEROPERABILITY",
    title: "Interoperability",
    description:
      "Connect healthcare applications, data, and AI solutions across EHRs, APIs, and enterprise platforms to enable connected healthcare ecosystems.",
    bullets: [
      "EHR / EMR integration",
      "FHIR",
      "Healthcare APIs",
      "System interoperability",
    ],
    image: "/images/ai-healthcare-images/health-5.png",
    imageAlt:
      "Healthcare technology specialists working with connected interoperability systems",
    action: "Explore Healthcare Expertise",
    href: "/contact",
  },
];

export default function CoreCapabilities() {
  return (
    <section className="w-full bg-white pt-8 md:pt-12 pb-8 md:pb-12 font-sans overflow-hidden">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-[2cm]">
        {/* Header */}
        <div className="flex flex-col items-center w-full mb-10 md:mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 text-[10px] sm:text-[11px] font-bold tracking-widest text-[#FF6B00] uppercase mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
            Healthcare Expertise
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 mb-5 tracking-tight leading-tight max-w-4xl">
            Industry Expertise That <br className="hidden sm:block" />
            <span className="text-[#FF6B2C]">Goes Beyond Technology</span>
          </h2>
          <p className="text-[15px] md:text-base text-slate-800 font-medium max-w-3xl mx-auto mb-3">
            Healthcare projects require an understanding of industry workflows, data, integrations, users, and operational challenges. Our teams bring healthcare context together with engineering expertise.
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
