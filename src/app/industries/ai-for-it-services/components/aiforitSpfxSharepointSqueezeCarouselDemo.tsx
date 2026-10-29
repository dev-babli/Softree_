"use client";

import React, { useState, useEffect } from "react";
import { SqueezeCarousel, type SqueezeSlide } from "@/components/ui/carousel-squeeze";
import { typography } from "@/lib/typography";

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

import { WavyBrandBackground } from "@/components/ui/wavy-brand-background";

const slides: SqueezeSlide[] = [
    {
        id: "assess-it-operations",
        category: "Step 01",
        title: "Assess IT Operations",
        shortTitle: "Assess Operations",
        description:
            "Evaluate existing IT workflows, incident management processes, data sources, and repetitive tasks to identify opportunities for AI-powered IT automation.",
        bullets: [
            "IT Workflow & Process Audit",
            "Incident Management Evaluation",
            "Data Source & Log Mapping",
            "Repetitive Task Identification",
        ],
        bulletTitle: "ASSESSMENT FOCUS",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={0} totalParts={5} />,
    },
    {
        id: "design-ai-solution",
        category: "Step 02",
        title: "Design the AI Solution",
        shortTitle: "Design Architecture",
        description:
            "Define the AI architecture, data flow, system integrations, security requirements, and human approval checkpoints to align the solution with IT operations.",
        bullets: [
            "AI System & Copilot Architecture",
            "Data Flow & Privacy Engineering",
            "Security & Compliance Protocols",
            "Human-in-the-Loop Checkpoints",
        ],
        bulletTitle: "DESIGN BLUEPRINT",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={1} totalParts={5} />,
    },
    {
        id: "develop-ai-solutions",
        category: "Step 03",
        title: "Develop AI Solutions",
        shortTitle: "Develop & Build",
        description:
            "Build custom AI copilots, AI agents, RAG-based knowledge assistants, and intelligent automation workflows tailored to IT service and operational requirements.",
        bullets: [
            "Custom IT Operations Copilots",
            "Autonomous Incident & Triage Agents",
            "RAG Knowledge Assistants",
            "Intelligent Workflow Automation",
        ],
        bulletTitle: "DEVELOPMENT CAPABILITIES",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={2} totalParts={5} />,
    },
    {
        id: "integrate-it-systems",
        category: "Step 04",
        title: "Integrate IT Systems",
        shortTitle: "Integrate Systems",
        description:
            "Connect AI solutions with IT service management (ITSM) platforms, monitoring tools, enterprise knowledge bases, and business systems to support connected IT workflows.",
        bullets: [
            "ITSM & Helpdesk Integrations",
            "Infrastructure & APM Monitoring",
            "Enterprise Knowledge Repositories",
            "End-to-End Workflow Connectivity",
        ],
        bulletTitle: "INTEGRATION SCOPE",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={3} totalParts={5} />,
    },
    {
        id: "optimize-ai-performance",
        category: "Step 05",
        title: "Optimize AI Performance",
        shortTitle: "Optimize & Refine",
        description:
            "Monitor solution performance, evaluate workflow outcomes, refine AI responses, and improve automation processes as business and IT requirements evolve.",
        bullets: [
            "Telemetry & Outcome Evaluation",
            "Model Tuning & Response Refinement",
            "Continuous Automation Enhancement",
            "Scalable IT Lifecycle Governance",
        ],
        bulletTitle: "OPTIMIZATION LIFECYCLE",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={4} totalParts={5} />,
    },
];

export function AiforitSpfxSharepointSqueezeCarouselDemo(props: DemoProps) {
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
                            AI FOR IT DEVELOPMENT OPERATIONS
                        </span>
                    </div>

                    {/* Big Heading: Dark Charcoal / Black + Softree Orange Highlight */}
                    <h2 className={`mt-4 ${typography.heading.h2} text-[#0f172a] leading-[1.12]`}>
                        <span>Our AI for IT Development and </span>
                        <span className="text-[#FF6B2C]">Implementation Process</span>
                    </h2>

                    {/* Description in balanced dark neutral */}
                    <p className={`mt-5 ${typography.description.default} text-slate-600 max-w-3xl`}>
                        Softree follows a structured approach to AI development for IT operations, from identifying automation opportunities to deploying and optimizing AI-powered solutions. We help businesses integrate AI copilots, intelligent agents, knowledge retrieval, and automated workflows into IT processes to improve efficiency, accelerate issue resolution, and support scalable IT operations.
                    </p>
                </div>

                {/* Squeeze Carousel with controls turned off and clean panels */}
                <div className="w-full">
                    <SqueezeCarousel
                        slides={slides}
                        label="AI for IT Development Operations Process"
                        accent="#FF6B2C"
                        accentForeground="#ffffff"
                        {...options}
                    />
                </div>
            </div>
        </section>
    );
}

export default AiforitSpfxSharepointSqueezeCarouselDemo;
