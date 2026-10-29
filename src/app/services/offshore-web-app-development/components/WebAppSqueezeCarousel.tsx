"use client";

import React, { useState, useEffect } from "react";
import { SqueezeCarousel, type SqueezeSlide } from "@/components/ui/carousel-squeeze";
import { WavyBrandBackground } from "@/components/ui/wavy-brand-background";
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
    id: "custom-web-apps",
    category: "BUSINESS-FOCUSED SOLUTIONS",
    title: "Custom Web Application Development",
    shortTitle: "Custom Applications",
    description:
      "Build tailored web applications that align with your business requirements, streamline workflows, and deliver intuitive user experiences.",
    bullets: [
      "Custom Business Applications",
      "Responsive User Interfaces",
      "Scalable Application Architecture",
      "Workflow Optimization",
    ],
    bulletTitle: "DEVELOPMENT CAPABILITIES",
    background: <WavyBrandBackground className="absolute inset-0" partIndex={0} totalParts={5} />,
  },
  {
    id: "enterprise-applications",
    category: "ENTERPRISE SOLUTIONS",
    title: "Enterprise Web Application Development",
    shortTitle: "Enterprise Applications",
    description:
      "Develop enterprise-grade web applications that connect teams, simplify complex business processes, and support evolving operational needs.",
    bullets: [
      "Enterprise Web Portals",
      "Business Process Integration",
      "Role-Based Access Control",
      "Scalable Architecture",
    ],
    bulletTitle: "ENTERPRISE CAPABILITIES",
    background: <WavyBrandBackground className="absolute inset-0" partIndex={1} totalParts={5} />,
  },
  {
    id: "web-portals-platforms",
    category: "CONNECTED DIGITAL PLATFORMS",
    title: "Web Portal Development",
    shortTitle: "Portals & Platforms",
    description:
      "Create customer portals, employee platforms, and business dashboards that centralize information and improve collaboration across your organization.",
    bullets: [
      "Customer & Employee Portals",
      "Interactive Business Dashboards",
      "Secure User Authentication",
      "Personalized User Experiences",
    ],
    bulletTitle: "PORTAL ARCHITECTURE",
    background: <WavyBrandBackground className="absolute inset-0" partIndex={2} totalParts={5} />,
  },
  {
    id: "workflow-automation",
    category: "BUSINESS PROCESS AUTOMATION",
    title: "Web Application Workflow Automation",
    shortTitle: "Workflow Automation",
    description:
      "Automate repetitive business tasks and connect applications to reduce manual effort, improve process efficiency, and simplify daily operations.",
    bullets: [
      "Workflow Automation",
      "Third-Party API Integration",
      "Automated Data Processing",
      "Business System Connectivity",
    ],
    bulletTitle: "AUTOMATION ENGINE",
    background: <WavyBrandBackground className="absolute inset-0" partIndex={3} totalParts={5} />,
  },
  {
    id: "integration-modernization",
    category: "INTEGRATION & APPLICATION MODERNIZATION",
    title: "Web Application Integration & Modernization",
    shortTitle: "Integration & Modernization",
    description:
      "Connect web applications with existing business systems, modernize legacy platforms, and improve application performance, maintainability, and scalability.",
    bullets: [
      "REST API & Third-Party Integrations",
      "Legacy Application Modernization",
      "Cloud Migration & Integration",
      "Performance & Scalability Improvements",
    ],
    bulletTitle: "ECOSYSTEM CONNECTIVITY",
    background: <WavyBrandBackground className="absolute inset-0" partIndex={4} totalParts={5} />,
  },
];

export function WebAppSqueezeCarousel(props: DemoProps) {
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
              WEB APPLICATION DEVELOPMENT SOLUTIONS
            </span>
          </div>

          {/* Big Heading: Dark Charcoal / Black + Softree Orange Highlight */}
          <h2 className={`mt-4 ${typography.heading.h2} text-[#0f172a] leading-[1.12]`}>
            <span>Offshore Web App Development for </span><br />
            <span className="text-[#FF6B2C]">Scalable Business Solutions</span>
          </h2>

          {/* Description in balanced dark neutral */}
          <p className={`mt-5 ${typography.description.default} text-slate-600 max-w-3xl`}>
            Softree Technology delivers custom web application development services to build secure, scalable applications that streamline business operations and support digital growth.
          </p>
        </div>

        {/* Squeeze Carousel with controls turned off and clean panels */}
        <div className="w-full">
          <SqueezeCarousel
            slides={slides}
            label="Web Application Development Solutions"
            accent="#FF6B2C"
            accentForeground="#ffffff"
            {...options}
          />
        </div>
      </div>
    </section>
  );
}

export const SqueezeCarouselDemo = WebAppSqueezeCarousel;
export default WebAppSqueezeCarousel;

