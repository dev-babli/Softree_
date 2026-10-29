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
        id: "white-label-mobile-app",
        category: "MOBILE APP DEVELOPMENT PARTNERSHIP",
        title: "White-Label Mobile App Development",
        shortTitle: "White-Label App Dev",
        description:
            "Deliver mobile applications under your own brand while Softree supports the engineering, development, and quality assurance behind the scenes.",
        bullets: [
            "Confidential White-Label App Development",
            "Dedicated Mobile Engineering Support",
            "Client-Ready Application Delivery",
            "Flexible Development Engagements",
        ],
        bulletTitle: "DELIVERY CAPABILITIES",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={0} totalParts={5} />,
    },
    {
        id: "offshore-mobile-capacity",
        category: "Engineering Capacity",
        title: "Offshore Engineering Capacity",
        shortTitle: "Engineering Capacity",
        description:
            "Scale your mobile development capabilities with dedicated offshore software developers from India, providing agile sprint delivery and cost-efficient staffing across global markets including the USA, UK, UAE, and Europe.",
        bullets: [
            "Dedicated Mobile Developer Pods",
            "Agile Offshore Sprint Velocity",
            "Flexible Staff Augmentation",
            "Timezone-Aligned Communication",
        ],
        bulletTitle: "CAPACITY ADVANTAGES",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={1} totalParts={5} />,
    },
    {
        id: "ios-android-cross-platform",
        category: "Mobile Platforms & Frameworks",
        title: "iOS, Android & Cross-Platform Development",
        shortTitle: "Native & Cross-Platform",
        description:
            "Build high-performance native iOS (Swift) and Android (Kotlin) apps, or build versatile cross-platform solutions with React Native and Flutter designed for seamless multi-platform user experiences.",
        bullets: [
            "Native iOS & Swift Development",
            "Native Android & Kotlin Apps",
            "React Native & Flutter Solutions",
            "Responsive Cross-Device UI/UX",
        ],
        bulletTitle: "PLATFORM EXPERTISE",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={2} totalParts={5} />,
    },
    {
        id: "tech-api-integrations",
        category: "Backend & Ecosystem",
        title: "Technology & API Integrations",
        shortTitle: "API & Backend Integrations",
        description:
            "Seamlessly connect your mobile apps to enterprise backend systems, REST & GraphQL APIs, cloud databases, CRM/ERP platforms, payment gateways, and real-time notification services.",
        bullets: [
            "Cloud API & Microservices Connectivity",
            "Payment Gateways & In-App Purchases",
            "Enterprise CRM, ERP & Data Sync",
            "Real-Time Push Notifications & Analytics",
        ],
        bulletTitle: "INTEGRATION CAPABILITIES",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={3} totalParts={5} />,
    },
    {
        id: "app-quality-security",
        category: "Quality Assurance & Compliance",
        title: "Mobile App Quality & Security",
        shortTitle: "Quality & Security",
        description:
            "Deliver secure, compliant, store-ready mobile applications with comprehensive automated testing, device matrix validation, biometric authentication, OWASP mobile security, and seamless app store approval.",
        bullets: [
            "End-to-End Automated & Manual QA",
            "OWASP Mobile Security & Data Encryption",
            "Biometric Authentication & RBAC",
            "App Store & Google Play Publishing",
        ],
        bulletTitle: "QUALITY & COMPLIANCE",
        background: <WavyBrandBackground className="absolute inset-0" partIndex={4} totalParts={5} />,
    },
];

export function MobileAppDevAIReadinessBanner(props: DemoProps) {
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
                            Mobile App Development Solutions
                        </span>
                    </div>

                    {/* Big Heading: Dark Charcoal / Black + Softree Orange Highlight */}
                    <h2 className={`mt-4 ${typography.heading.h2} text-[#0f172a] leading-[1.12]`}>
                        <span>An Offshore Mobile App Development Partner That </span>
                        <span className="text-[#FF6B2C]">Extends Your Team</span>
                    </h2>

                    {/* Description in balanced dark neutral */}
                    <p className={`mt-5 ${typography.description.default} text-slate-600 max-w-3xl`}>
                        Softree provides offshore mobile app development services for businesses, startups, digital agencies, and technology partners. Extend your engineering capacity with custom iOS and Android applications, cross-platform development, backend integrations, and white-label delivery—all aligned with your product requirements and business goals.
                    </p>
                </div>

                {/* Squeeze Carousel with controls turned off and clean panels */}
                <div className="w-full">
                    <SqueezeCarousel
                        slides={slides}
                        label="Offshore Mobile App Development Capabilities"
                        accent="#FF6B2C"
                        accentForeground="#ffffff"
                        {...options}
                    />
                </div>
            </div>
        </section>
    );
}


export default MobileAppDevAIReadinessBanner;
