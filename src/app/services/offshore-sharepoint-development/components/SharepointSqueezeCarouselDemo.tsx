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

const slides: SqueezeSlide[] = [
    {
        id: "custom-sharepoint",
        category: "SharePoint Development",
        title: "Custom SharePoint Development",
        shortTitle: "Custom SPFx",
        description:
            "Build customized SharePoint applications, web parts, extensions, and components tailored to specific business processes, user requirements, and collaboration needs.",
        bullets: [
            "SPFx Client-Side Web Parts",
            "Custom Extensions & Add-ins",
            "Tailored Business Logic",
            "Role-Based Access Control",
        ],
        bulletTitle: "DEVELOPMENT CAPABILITIES",
        image: "/images/spfx/sharepoint-card-1.jpg",
        imageAlt: "Custom SharePoint applications, intranet and interactive dashboards",
    },
    {
        id: "intranet-portals",
        category: "Digital Workplace",
        title: "SharePoint Intranet & Portals",
        shortTitle: "Intranet & Portals",
        description:
            "Create modern SharePoint intranets and portals that centralize company information, simplify content discovery, and provide employees with a connected digital workplace.",
        bullets: [
            "Centralized Knowledge Hubs",
            "Enterprise News & Feeds",
            "Targeted Content Delivery",
            "Cross-Device Experience",
        ],
        bulletTitle: "PORTAL ARCHITECTURE",
        image: "/images/spfx/sharepoint-card-2.jpg",
        imageAlt: "SharePoint Document Management and Cloud Storage Interface",
    },
    {
        id: "document-management",
        category: "Governance & Storage",
        title: "SharePoint Document Management",
        shortTitle: "Document Management",
        description:
            "Improve how teams organize, access, share, and manage business documents using structured libraries, metadata, content types, permissions, and version control.",
        bullets: [
            "Structured Metadata & Tags",
            "Audit Logs & Version History",
            "Automated Retention Policies",
            "Granular File Permissions",
        ],
        bulletTitle: "INFORMATION ARCHITECTURE",
        image: "/images/spfx/sharepoint-card-3.jpg",
        imageAlt: "SharePoint Workflow and Approval Automation Interface",
    },
    {
        id: "workflow-automation",
        category: "Process Engineering",
        title: "SharePoint Workflow Automation",
        shortTitle: "Workflow Automation",
        description:
            "Automate repetitive business processes with SharePoint, Power Automate, and Microsoft 365. Simplify approvals, notifications, task assignments, and document-based workflows.",
        bullets: [
            "Multi-stage Approval Paths",
            "Instant Teams & Email Alerts",
            "Power Automate Integration",
            "Error Trapping & SLA Tracking",
        ],
        bulletTitle: "AUTOMATION ENGINE",
        image: "/images/spfx/sharepoint-card-4.jpg",
        imageAlt: "SharePoint Project Team Site, Collaboration and Meeting Interface",
    },
    {
        id: "integration-modernization",
        category: "Cloud Migration & Power Platform",
        title: "SharePoint Integration & Modernization",
        shortTitle: "Integration & Cloud",
        description:
            "Connect SharePoint with Microsoft 365, Power Apps, Power BI, and existing business applications while modernizing legacy SharePoint environments for better usability, scalability, and performance.",
        bullets: [
            "Microsoft Graph & REST APIs",
            "Power Apps & Power BI Sync",
            "Legacy On-Prem Migration",
            "Cloud Security & Performance",
        ],
        bulletTitle: "ECOSYSTEM CONNECTIVITY",
        image: "/images/spfx/sharepoint-card-5.jpg",
        imageAlt: "SharePoint Cloud Ecosystem, Microsoft 365, Power BI and Connected Workplaces",
    },
];

export function SqueezeCarouselDemo(props: DemoProps) {
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
                            SHAREPOINT DEVELOPMENT SOLUTIONS
                        </span>
                    </div>

                    {/* Big Heading: Dark Charcoal / Black + Softree Orange Highlight */}
                    <h2 className={`mt-4 ${typography.heading.h2} text-[#0f172a] leading-[1.12]`}>
                        <span>Modernize Business Collaboration with</span>
                        <span className="text-[#FF6B2C]"> SharePoint Development</span>
                    </h2>

                    {/* Description in balanced dark neutral */}
                    <p className={`mt-5 ${typography.description.default} text-slate-600 max-w-3xl`}>
                        Softree Technology builds modern SharePoint solutions that help businesses improve
                        collaboration, document management, intranet experiences, and workflow automation.
                        Our development approach combines SharePoint, SPFx, Microsoft 365, and Power Platform
                        to create scalable solutions that integrate with existing business processes and applications.
                    </p>
                </div>

                {/* Squeeze Carousel with controls turned off and clean panels */}
                <div className="w-full">
                    <SqueezeCarousel
                        slides={slides}
                        label="SharePoint Development Solutions"
                        accent="#FF6B2C"
                        accentForeground="#ffffff"
                        {...options}
                    />
                </div>
            </div>
        </section>
    );
}

export default SqueezeCarouselDemo;
