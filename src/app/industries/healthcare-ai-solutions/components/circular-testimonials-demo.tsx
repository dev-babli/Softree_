"use client";

import React from "react";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { ArrowRight } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

const ecosystemCards = [
  {
    id: "01",
    title: "Healthcare Application Integration",
    caption:
      "Connect AI with clinical, administrative, patient, and enterprise applications.",
    location: "01",
    deliverables: [
      "Clinical Applications",
      "Patient Portals",
      "Provider Platforms",
    ],
    imageSrc: "/images/ai-healthcare-images/health-1.png",
  },
  {
    id: "02",
    title: "API & Microservices Integration",
    caption:
      "Integrate AI solutions with APIs, microservices, and third-party systems.",
    location: "02",
    deliverables: [
      "FHIR & HL7 APIs",
      "Microservices Architecture",
      "Third-Party Systems",
    ],
    imageSrc: "/images/ai-healthcare-images/health-2.png",
  },
  {
    id: "03",
    title: "Healthcare Data Integration",
    caption:
      "Connect AI applications with databases, data warehouses, lakes, and data pipelines.",
    location: "03",
    deliverables: [
      "Databases & Stores",
      "Warehouses & Lakes",
      "Data Pipelines",
    ],
    imageSrc: "/images/ai-healthcare-images/health-3.png",
  },
  {
    id: "04",
    title: "Cloud AI Integration",
    caption:
      "Integrate AI services across cloud and hybrid healthcare environments.",
    location: "04",
    deliverables: [
      "Cloud Environments",
      "Hybrid Architectures",
      "Scalable Serving",
    ],
    imageSrc: "/images/ai-healthcare-images/health-4.png",
  },
  {
    id: "05",
    title: "Legacy Application Modernization",
    caption:
      "Introduce modern AI capabilities into legacy systems without unnecessary disruption.",
    location: "05",
    deliverables: [
      "Legacy Systems Wrapping",
      "Zero Disruption",
      "Modern AI Capabilities",
    ],
    imageSrc: "/images/ai-healthcare-images/health-5.png",
  },
  {
    id: "06",
    title: "Healthcare Workflow Integration",
    caption:
      "Embed AI into operational workflows, automation platforms, and business processes.",
    location: "06",
    deliverables: [
      "Operational Workflows",
      "Automation Platforms",
      "Business Processes",
    ],
    imageSrc: "/images/ai-healthcare-images/health-6.png",
  },
  {
    id: "07",
    title: "Enterprise Knowledge Integration",
    caption:
      "Connect AI with internal documents, knowledge bases, repositories, and organizational data.",
    location: "07",
    deliverables: [
      "Internal Documents",
      "Knowledge Bases",
      "Organizational Repositories",
    ],
    imageSrc: "/images/ai-healthcare-images/health-7.png",
  },
  {
    id: "08",
    title: "AI Platform Integration",
    caption:
      "Integrate AI models and intelligent services into existing enterprise technology architectures.",
    location: "08",
    deliverables: [
      "Enterprise Architectures",
      "Model Management",
      "Intelligent Services",
    ],
    imageSrc: "/images/ai-healthcare-images/health-8.png",
  },
];

// Map the raw data into Testimonial format with ReactNode content
const testimonials = ecosystemCards.map((photo) => ({
  id: photo.id,
  title: photo.title,
  caption: photo.caption,
  location: photo.location,
  deliverables: photo.deliverables,
  content: (
    <div className="w-full max-w-[500px] h-[390px] lg:h-[400px] flex flex-col overflow-hidden rounded-[22px] border border-[#ff6b2c]/35 shadow-[0_14px_35px_rgba(201,71,22,0.2)] bg-gradient-to-b from-[#C94716] via-[#B83E10] to-[#8C2704] text-white relative select-none mx-auto">
      {/* Top Image */}
      <div className="h-[210px] lg:h-[220px] w-full relative shrink-0 overflow-hidden group">
        <img
          src={photo.imageSrc}
          alt={photo.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#C94716] via-transparent to-black/35 pointer-events-none" />
      </div>

      {/* Bottom Content: ONLY Title and Description */}
      <div className="flex-1 p-6 flex flex-col justify-center relative z-10">
        <h3 className="text-white font-extrabold leading-snug tracking-tight text-xl lg:text-[22px] font-['Plus_Jakarta_Sans',sans-serif] mb-2">
          {photo.title}
        </h3>
        <p className="text-sm text-white/90 leading-relaxed line-clamp-3">
          {photo.caption}
        </p>
      </div>
    </div>
  ),
}));

export const CircularTestimonialsDemo = () => {
  const renderRightSide = (activeTestimonial: any) => {
    return (
      <div className="flex flex-col justify-between h-[390px] lg:h-[400px] text-left md:pl-2 lg:pl-4">
        {/* Top Header Block */}
        <div className="shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-orange-200/90 bg-orange-50 text-[10px] font-bold tracking-widest text-[#FF6B00] uppercase mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
            HEALTHCARE AI INTEGRATION &amp; MODERNIZATION
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold tracking-tight text-slate-900 leading-[1.16] font-['Plus_Jakarta_Sans',sans-serif] mb-1.5">
            Healthcare AI Integration Services for Your{" "}
            <span className="text-[#FF6B2C]">Existing Technology Ecosystem</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed max-w-xl line-clamp-2">
            Integrate intelligent systems into existing healthcare applications, data platforms, enterprise systems, and workflows without replacing your technology stack. Softree connects intelligent systems while protecting your technology investments.
          </p>
        </div>

        {/* Middle: Active Module Architecture & Systems Showcase */}
        <div className="my-1.5 rounded-xl border border-slate-200/90 bg-gradient-to-br from-slate-50/90 via-white to-orange-50/20 p-3.5 sm:p-4 shadow-xs relative overflow-hidden">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono font-bold tracking-wider text-[#FF6B2C] uppercase bg-orange-100/90 px-2 py-0.5 rounded-md border border-orange-200/60">
              {activeTestimonial.location}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] mb-0.5 tracking-tight">
            {activeTestimonial.title}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-2.5 line-clamp-1">
            {activeTestimonial.caption}
          </p>

          {/* Scope Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-2 border-t border-slate-200/80">
            {activeTestimonial.deliverables?.map(
              (item: string, iIdx: number) => (
                <div
                  key={iIdx}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs hover:border-[#FF6B2C]/50 transition-all duration-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2C] shrink-0" />
                  <span className="text-[11px] font-medium text-slate-800 leading-snug truncate">
                    {item}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom Action Row: Supporting Line + CTA Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-0.5 w-full shrink-0">
          <FlowButton
            href="/contact"
            text="Explore Healthcare AI Integration Services"
            variant="orange-filled"
            className="text-xs sm:text-[13px] py-2.5 px-6 shrink-0"
          />

          <p className="text-[11.5px] font-medium text-slate-500 italic">
            Modernize incrementally. Integrate intelligently. Scale AI without unnecessary disruption.
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white pt-16 pb-16 lg:pb-20 text-slate-900 overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm] relative flex items-center justify-center">
        <CircularTestimonials
          testimonials={testimonials}
          autoplay={true}
          intervalMs={4000}
          reverseLayout={true}
          renderRightSide={renderRightSide}
        />
      </div>
    </section>
  );
};
