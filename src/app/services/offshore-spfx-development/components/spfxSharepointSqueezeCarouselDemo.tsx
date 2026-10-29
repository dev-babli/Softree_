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
        id: "spfx-web-parts",
        category: "SPFx Development",
        title: "Custom SPFx Web Parts",
        shortTitle: "Custom Web Parts",
        description:
            "Develop reusable and responsive SPFx web parts tailored to business requirements, including dashboards, forms, data views, search experiences, and custom user interfaces.",
        bullets: [
            "Reusable Client-Side Web Parts",
            "Custom Enterprise Dashboards",
            "Tailored Forms & Data Views",
            "Responsive Search Experiences",
        ],
        bulletTitle: "DEVELOPMENT CAPABILITIES",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={0} totalParts={5} />,
    },
    {
        id: "spfx-extensions",
        category: "SharePoint Customization",
        title: "SPFx Extensions & Customization",
        shortTitle: "SPFx Extensions",
        description:
            "Extend SharePoint functionality with Application Customizers, Field Customizers, List View Command Sets, and other SPFx extensions designed around specific business workflows.",
        bullets: [
            "Application Customizers",
            "Field Customizers & Formatters",
            "List View Command Sets",
            "Tailored Workflow Actions",
        ],
        bulletTitle: "EXTENSION ARCHITECTURE",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={1} totalParts={5} />,
    },
    {
        id: "react-typescript",
        category: "Modern Front-End",
        title: "React & TypeScript Development",
        shortTitle: "React & TypeScript",
        description:
            "Build maintainable SharePoint solutions using React, TypeScript, Fluent UI, and modern front-end development practices for consistent and responsive user experiences.",
        bullets: [
            "React & Fluent UI Components",
            "Type-Safe TypeScript Architecture",
            "Modern Front-End Standards",
            "Consistent Responsive UX",
        ],
        bulletTitle: "FRONT-END ARCHITECTURE",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={2} totalParts={5} />,
    },
    {
        id: "m365-integration",
        category: "Ecosystem Connectivity",
        title: "Microsoft 365 Integration",
        shortTitle: "M365 Integration",
        description:
            "Connect SPFx applications with SharePoint APIs, Microsoft Graph, Power Platform, and other Microsoft 365 capabilities to create connected business applications.",
        bullets: [
            "Microsoft Graph API Integration",
            "Power Platform Connectivity",
            "SharePoint REST APIs & SDKs",
            "Cross-Service Authentication",
        ],
        bulletTitle: "INTEGRATION CAPABILITIES",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={3} totalParts={5} />,
    },
    {
        id: "spfx-modernization",
        category: "Performance & Lifecycle",
        title: "SPFx Modernization & Optimization",
        shortTitle: "Modernization",
        description:
            "Modernize existing SharePoint customizations, improve application performance, optimize components, and enhance SPFx solutions for scalable and maintainable Microsoft 365 environments.",
        bullets: [
            "Legacy Customization Modernization",
            "Bundle Size & Runtime Tuning",
            "Component Lifecycle Optimization",
            "Scalable M365 Governance",
        ],
        bulletTitle: "OPTIMIZATION SCOPE",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={4} totalParts={5} />,
    },
];

export function SpfxSharepointSqueezeCarouselDemo(props: DemoProps) {
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
                            SPFX DEVELOPMENT SOLUTIONS
                        </span>
                    </div>

                    {/* Big Heading: Dark Charcoal / Black + Softree Orange Highlight */}
                    <h2 className={`mt-4 ${typography.heading.h2} text-[#0f172a] leading-[1.12]`}>
                        <span>Build Modern SharePoint Experiences with</span>
                        <span className="text-[#FF6B2C]"> SPFx Development</span>
                    </h2>

                    {/* Description in balanced dark neutral */}
                    <p className={`mt-5 ${typography.description.default} text-slate-600 max-w-3xl`}>
                        Softree Technology builds modern SharePoint experiences using the SharePoint Framework (SPFx),
                        React, TypeScript, and Microsoft 365. We develop customized web parts, extensions, applications,
                        and integrations that enhance SharePoint functionality, improve user experiences, and support evolving business requirements.
                    </p>
                </div>

                {/* Squeeze Carousel with controls turned off and clean panels */}
                <div className="w-full">
                    <SqueezeCarousel
                        slides={slides}
                        label="SPFx Development Solutions"
                        accent="#FF6B2C"
                        accentForeground="#ffffff"
                        {...options}
                    />
                </div>
            </div>
        </section>
    );
}

export default SpfxSharepointSqueezeCarouselDemo;
