"use client";

import React, { useState, useEffect } from "react";
import { SqueezeCarousel, type SqueezeSlide } from "@/components/ui/carousel-squeeze";
import { typography } from "@/lib/typography";
import { WavyBrandBackground } from "@/components/ui/wavy-brand-background";

export const settings = {
    height: 520,
    radius: 18,
    duration: 700,
    hoverGrow: true,
    openOnHover: true,
    autoplay: false,
    interval: 6000,
    controls: false, // Arrows / navigation control buttons removed
};

type DemoProps = Partial<typeof settings>;

const slides: SqueezeSlide[] = [
    {
        id: "white-label-rag",
        category: "Partnership & Delivery",
        title: "White-Label RAG Delivery",
        shortTitle: "White-Label RAG",
        description:
            "Deliver Enterprise RAG projects under your own brand while Softree works behind the scenes as your dedicated engineering partner.",
        bullets: [
            "Confidential White-Label Delivery",
            "Dedicated Partner Engineering",
            "Client-Ready Architecture & QA",
            "Flexible Delivery Engagements",
        ],
        bulletTitle: "DELIVERY CAPABILITIES",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={0} totalParts={5} />,
    },
    {
        id: "offshore-rag-engineering",
        category: "Engineering Capacity",
        title: "Offshore RAG Engineering Capability",
        shortTitle: "Engineering Capacity",
        description:
            "Add experienced AI engineers across RAG architecture, data ingestion, retrieval, LLM integration, testing, and production deployment without building a larger in-house team.",
        bullets: [
            "Data Ingestion & Preprocessing",
            "Hybrid Search & Indexing",
            "LLM Integration & Prompt Tuning",
            "Production Evaluation & QA",
        ],
        bulletTitle: "ENGINEERING STACK",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={1} totalParts={5} />,
    },
    {
        id: "microsoft-ai-expertise",
        category: "Microsoft Cloud & AI",
        title: "Microsoft AI Technology Expertise",
        shortTitle: "Microsoft AI Stack",
        description:
            "Build RAG solutions using Azure OpenAI, Azure AI Search, Microsoft 365, SharePoint, and related Microsoft AI technologies.",
        bullets: [
            "Azure OpenAI & Foundry Integration",
            "Azure AI Search & Vector Indexing",
            "SharePoint & M365 Data Connectors",
            "Enterprise Role-Based Security",
        ],
        bulletTitle: "MICROSOFT AI CAPABILITIES",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={2} totalParts={5} />,
    },
    {
        id: "built-for-partners",
        category: "Ecosystem & Collaboration",
        title: "Built for Technology Partners",
        shortTitle: "Technology Partners",
        description:
            "Support your client engagements with flexible RAG engineering capacity while you maintain ownership of the client relationship, delivery strategy, and brand.",
        bullets: [
            "Client Relationship Ownership",
            "Scalable Pod & Team Sizing",
            "Transparent Workflow & Sprints",
            "On-Demand Expertise Ramp-up",
        ],
        bulletTitle: "PARTNER COLLABORATION",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={3} totalParts={5} />,
    },
    {
        id: "production-rag-governance",
        category: "Enterprise Security & Scale",
        title: "Production RAG Security & Evaluation",
        shortTitle: "Security & Governance",
        description:
            "Deploy production-ready Enterprise RAG solutions with secure knowledge access, enterprise governance, observability, evaluation, and continuous optimization.",
        bullets: [
            "Granular RBAC & Access Control",
            "Evaluation & Groundedness Metrics",
            "Continuous Latency & Cost Tuning",
            "Production Observability & Tracing",
        ],
        bulletTitle: "SECURITY & GOVERNANCE",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={4} totalParts={5} />,
    },
];

export function AIReadinessBanner(props: DemoProps) {
    const [carouselHeight, setCarouselHeight] = useState<number | string>(520);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setCarouselHeight(680);
                setIsTouchDevice(true);
            } else if (width < 1024) {
                setCarouselHeight(600);
                setIsTouchDevice(true);
            } else {
                setCarouselHeight(520);
                setIsTouchDevice(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const options = {
        ...settings,
        height: carouselHeight,
        openOnHover: !isTouchDevice,
        ...props,
    };

    return (
        <section className="w-full bg-white py-12 sm:py-16 md:py-20 overflow-hidden">
            <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-8 lg:px-12">
                {/* Header with White Background Styling: Dark text with Softree Orange */}
                <div className="mb-8 sm:mb-10 md:mb-12 max-w-4xl">
                    {/* Eyebrow Pill Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#FF6B2C]/30 bg-[#FF6B2C]/10 px-3.5 py-1.5 shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-[#FF6B2C]" />
                        <span className={`${typography.caption.default} font-bold tracking-wider text-[#FF6B2C] uppercase font-mono`}>
                            RAG DEVELOPMENT CAPABILITIES
                        </span>
                    </div>

                    {/* Big Heading: Dark Charcoal / Black + Softree Orange Highlight */}
                    <h2 className={`mt-4 ${typography.heading.h2} text-[#0f172a] leading-[1.12]`}>
                        <span>An Offshore RAG Engineering Team That </span>
                        <span className="text-[#FF6B2C]">Extends Your AI Delivery</span>
                    </h2>

                    {/* Description in balanced dark neutral */}
                    <p className={`mt-5 ${typography.description.default} text-slate-600 max-w-3xl`}>
                        Softree provides the engineering capacity to build and scale secure RAG solutions without expanding your internal AI team.
                    </p>
                </div>

                {/* Squeeze Carousel with controls turned off and clean panels */}
                <div className="w-full">
                    <SqueezeCarousel
                        slides={slides}
                        label="Enterprise RAG Development Capabilities"
                        accent="#FF6B2C"
                        accentForeground="#ffffff"
                        {...options}
                    />
                </div>
            </div>
        </section>
    );
}

export default AIReadinessBanner;
