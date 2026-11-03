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
    controls: false,
};

type DemoProps = Partial<typeof settings>;

const slides: SqueezeSlide[] = [
    {
        id: "technology-partnerships",
        category: "Co-Engineering & Innovation",
        title: "Technology Partnerships",
        shortTitle: "Technology",
        description:
            "Extend your core engineering capabilities through collaborative technology partnerships. Work together with specialized engineering teams on AI development, Microsoft technologies, cloud architecture, and modern full-stack engineering.",
        bullets: [
            "Generative & Agentic AI",
            "M365 & Cloud Architecture",
            "Enterprise Data Platforms",
            "Modern Web & SaaS Apps",
        ],
        bulletTitle: "TECHNICAL COLLABORATION",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={0} totalParts={4} />,
    },
    {
        id: "business-partnerships",
        category: "Go-to-Market & Expansion",
        title: "Business Partnerships",
        shortTitle: "Business Growth",
        description:
            "Create sustainable revenue opportunities and business expansion through complementary services and shared objectives. Partner with Softree to expand your technical service portfolio, strengthen client relationships, and enter high-demand markets.",
        bullets: [
            "Ecosystem Co-Selling",
            "Expanded Service Offerings",
            "Client Retention Growth",
            "Joint Go-to-Market Programs",
        ],
        bulletTitle: "BUSINESS GROWTH DRIVERS",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={1} totalParts={4} />,
    },
    {
        id: "delivery-partnerships",
        category: "Scalable Execution",
        title: "Delivery Partnerships",
        shortTitle: "Project Delivery",
        description:
            "Strengthen your project execution and delivery velocity with dependable software engineering capacity. Tap on-demand domain expertise across frontend, backend, cloud, AI, and enterprise systems to ensure on-time, high-quality milestones.",
        bullets: [
            "Dedicated Dev Squads",
            "Full-Stack Engineering",
            "White-Label Sprints",
            "DevOps & QA Governance",
        ],
        bulletTitle: "DELIVERY CAPABILITIES",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={2} totalParts={4} />,
    },
    {
        id: "strategic-partnerships",
        category: "Long-Term Alliance",
        title: "Strategic Partnerships",
        shortTitle: "Strategic Alliances",
        description:
            "Build enduring, high-trust alliances focused on sustained growth and shared technological leadership. Combine deep domain knowledge, proprietary IP, and collaborative market execution to create compounding enterprise value.",
        bullets: [
            "Multi-Year Tech Roadmaps",
            "Executive Sponsorship",
            "Joint Solution Architecture",
            "Global Resource Scaling",
        ],
        bulletTitle: "STRATEGIC VALUE SCOPE",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={3} totalParts={4} />,
    },
];

export function GlobalPartnersSqueezeCarouselDemo(props: DemoProps) {
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
                {/* Header Section */}
                <div className="mb-8 sm:mb-10 md:mb-12 max-w-4xl">
                    {/* Eyebrow Pill Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#FF6B2C]/30 bg-[#FF6B2C]/10 px-3.5 py-1.5 shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-[#FF6B2C]" />
                        <span className={`${typography.caption.default} font-bold tracking-wider text-[#FF6B2C] uppercase font-mono`}>
                            PARTNERSHIP OPPORTUNITIES
                        </span>
                    </div>

                    {/* Big Heading */}
                    <h2 className={`mt-4 ${typography.heading.h2} text-[#0f172a] leading-[1.12]`}>
                        <span>Explore Technology </span>
                        <span className="text-[#FF6B2C]">Partnership Opportunities</span>
                    </h2>

                    {/* Description */}
                    <p className={`mt-5 ${typography.description.default} text-slate-600 max-w-3xl`}>
                        We work with organizations across the technology ecosystem to create partnerships that support innovation, business expansion, and scalable project delivery.
                    </p>
                </div>

                {/* Squeeze Carousel */}
                <div className="w-full">
                    <SqueezeCarousel
                        slides={slides}
                        label="Partnership Opportunities"
                        accent="#FF6B2C"
                        accentForeground="#ffffff"
                        {...options}
                    />
                </div>
            </div>
        </section>
    );
}

export default GlobalPartnersSqueezeCarouselDemo;
