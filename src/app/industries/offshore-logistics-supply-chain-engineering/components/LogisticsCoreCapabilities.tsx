"use client";

import React from "react";
import SqueezeCarousel, { SqueezeSlide } from "@/components/ui/carousel-squeeze";

const capabilitiesSlides: SqueezeSlide[] = [
  {
    id: "tms-wms-integration",
    category: "TMS & WMS INTEGRATION",
    title: "TMS & WMS Integration",
    description:
      "Connect custom software, automation, and AI models directly with leading transportation and warehouse management platforms.",
    bullets: [
      "SAP TM & Oracle OTM",
      "Manhattan & Blue Yonder",
      "Körber & HighJump WMS",
      "Custom in-house systems",
    ],
    image: "/images/solutions/ai-for-logistics/core-capabilities/cap-01.png",
    imageAlt: "Transportation and logistics management dashboard",
    action: "Explore Logistics Integration",
    href: "/contact",
  },
  {
    id: "edi-carrier-apis",
    category: "EDI & CARRIER NETWORKS",
    title: "EDI & Carrier API Networks",
    description:
      "Automate high-throughput electronic document exchange with 3PLs, carriers, shippers, and freight brokers.",
    bullets: [
      "EDI 204, 210, 214, 850",
      "Carrier REST & SOAP APIs",
      "Real-time event webhooks",
      "Automated tender & booking",
    ],
    image: "/images/solutions/ai-for-logistics/core-capabilities/cap-02.png",
    imageAlt: "Logistics electronic data interchange and carrier networks",
    action: "Explore Logistics Integration",
    href: "/contact",
  },
  {
    id: "supply-chain-data",
    category: "SUPPLY CHAIN DATA LAKEHOUSE",
    title: "Supply Chain Data Integration",
    description:
      "Harmonize fragmented logistics data into an enterprise lakehouse for real-time reporting and predictive operational insights.",
    bullets: [
      "Snowflake & Databricks",
      "Real-time GPS telematics",
      "Historical freight lanes",
      "Carrier performance metrics",
    ],
    image: "/images/solutions/ai-for-logistics/core-capabilities/cap-03.png",
    imageAlt: "Supply chain analytics and cloud data lakehouse platform",
    action: "Explore Logistics Integration",
    href: "/contact",
  },
  {
    id: "cloud-iot-telemetry",
    category: "CLOUD & IOT TELEMETRY",
    title: "Cloud & IoT Telemetry Architecture",
    description:
      "Ingest high-frequency sensor streams from reefer containers, fleet ELD devices, and automated warehouse robotics.",
    bullets: [
      "Azure IoT & AWS IoT Core",
      "Cold-chain temperature logging",
      "Driver hours & ELD streams",
      "Automated geofencing alerts",
    ],
    image: "/images/solutions/ai-for-logistics/core-capabilities/cap-04.png",
    imageAlt: "IoT telemetry and fleet tracking sensors",
    action: "Explore Logistics Integration",
    href: "/contact",
  },
  {
    id: "legacy-modernization",
    category: "LEGACY LOGISTICS MODERNIZATION",
    title: "Legacy Systems Modernization",
    description:
      "Wrap AS400, mainframe, and green-screen applications with modern APIs, cloud microservices, and responsive dispatch interfaces.",
    bullets: [
      "AS400 / iSeries modernization",
      "Legacy screen scrapers to APIs",
      "Incremental cloud migration",
      "Zero operational downtime",
    ],
    image: "/images/solutions/ai-for-logistics/core-capabilities/cap-05.png",
    imageAlt: "Modern dispatch interface replacing legacy green screen systems",
    action: "Explore Logistics Integration",
    href: "/contact",
  },
  {
    id: "dispatch-workflow-automation",
    category: "DISPATCH & WORKFLOW AUTOMATION",
    title: "Dispatch & Workflow Automation",
    description:
      "Streamline load assignment, driver dispatching, appointment scheduling, and exception handoffs across operations.",
    bullets: [
      "Automated load tendering",
      "Smart dock appointment booking",
      "Driver communications automation",
      "Human-in-the-loop escalation",
    ],
    image: "/images/solutions/ai-for-logistics/core-capabilities/cap-06.png",
    imageAlt: "Automated dispatching workflows and driver coordination",
    action: "Explore Logistics Integration",
    href: "/contact",
  },
  {
    id: "freight-document-intelligence",
    category: "DOCUMENT INTELLIGENCE",
    title: "Freight Document Intelligence",
    description:
      "Extract, validate, and index paper and PDF logistics documents to accelerate accounts payable and driver turnaround.",
    bullets: [
      "Bills of lading (BOL) OCR",
      "Proof of delivery (POD) capture",
      "Freight invoice audit & match",
      "Customs declaration filing",
    ],
    image: "/images/solutions/ai-for-logistics/use-cases/uc-01.png",
    imageAlt: "Digital freight document intelligence and optical recognition",
    action: "Explore Logistics Integration",
    href: "/contact",
  },
  {
    id: "enterprise-visibility-control-tower",
    category: "ENTERPRISE VISIBILITY",
    title: "Enterprise Supply Chain Control Tower",
    description:
      "Deliver unified, end-to-end visibility from purchase order to final-mile delivery across suppliers, 3PLs, and carriers.",
    bullets: [
      "Multi-modal tracking map",
      "Predictive delay notifications",
      "Detention & demurrage alerts",
      "Executive analytics portals",
    ],
    image: "/images/solutions/ai-for-logistics/use-cases/uc-03.png",
    imageAlt: "Enterprise supply chain control tower and global tracking",
    action: "Explore Logistics Integration",
    href: "/contact",
  },
];

export default function LogisticsCoreCapabilities() {
  return (
    <section className="w-full bg-white pt-8 md:pt-12 pb-16 md:pb-24 font-sans overflow-hidden">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-[2cm]">
        {/* Header */}
        <div className="flex flex-col items-center w-full mb-12 md:mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-xs sm:text-[12px] font-bold tracking-widest text-[#FF6B00] uppercase mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
            LOGISTICS SYSTEMS INTEGRATION &amp; MODERNIZATION
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 mb-5 tracking-tight leading-[1.12] max-w-4xl">
            Connect Software &amp; AI With Your Existing{" "}
            <span className="text-[#FF6B2C]">Supply Chain Technology Ecosystem</span>
          </h2>
          <p className="text-base sm:text-[16.5px] lg:text-[17px] text-slate-800 font-medium max-w-3xl mx-auto mb-3 leading-relaxed">
            Integrate intelligent capabilities into existing TMS, WMS, ERP, and carrier networks without rebuilding your technology stack.
          </p>
        
          <p className="text-[15px] sm:text-base font-semibold text-[#FF6B2C] italic">
            Modernize incrementally. Integrate intelligently. Scale without operational downtime.
          </p>
        </div>

        {/* Squeeze Carousel - 8 Enterprise Logistics Integration Cards */}
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
