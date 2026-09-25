"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaPaintBrush,
  FaBolt,
  FaDatabase,
  FaGlobe,
  FaRobot,
  FaCloud,
  FaCheckDouble,
  FaClock,
  FaProjectDiagram,
  FaDesktop,
  FaSync,
  FaSitemap,
  FaShieldAlt,
  FaPlug,
  FaServer,
  FaChartPie,
  FaFileAlt,
  FaChartLine,
  FaChartArea,
  FaLightbulb,
  FaUsers,
  FaHandshake,
  FaUserCog,
  FaLock,
  FaCommentDots,
  FaCogs,
  FaBrain,
} from "react-icons/fa";

/* =========================
   DATA
========================= */
const servicesData = [
  {
    name: "Power Apps",
    headingPrefix: "Power Apps",
    headingHighlight: "Consulting & Development",
    headingSuffix: "Services",
    subtitle: "At Softree, we design and build scalable Power Apps solutions tailored to modern business workflows.",
    badge: "Power Apps Capabilities",
    shortDescription: "Explore our core Power Apps capabilities for custom business applications and connected workflows.",
    capabilities: [
      {
        title: "Canvas Apps",
        icon: <FaPaintBrush />,
        shortDesc: "Custom UI apps for mobile, tablet & desktop workflows.",
        description:
          "We create intuitive Canvas Apps that offer complete design flexibility, allowing businesses to build task-focused applications tailored to their unique workflows. These apps deliver a seamless user experience across mobile, tablet, and desktop devices.",
        image: "/images/power-apps/1.png",
      },
      {
        title: "Power Apps",
        icon: <FaBolt />,
        shortDesc: "Rapid low-code apps to streamline business operations.",
        description:
          "Our Power Apps solutions enable organizations to rapidly build secure and scalable applications using low-code capabilities, helping teams streamline operations, reduce development time, and improve productivity.",
        image: "/images/power-apps/2.png",
      },
      {
        title: "Model-Driven Apps",
        icon: <FaDatabase />,
        shortDesc: "Enterprise, data-driven solutions using Dataverse.",
        description:
          "We develop robust Model-Driven Apps that leverage structured data and business rules to deliver consistent, data-centric experiences, ideal for complex business processes and data-driven applications.",
        image: "/images/power-apps/3.png",
      },
      {
        title: "Portals",
        icon: <FaGlobe />,
        shortDesc: "Secure external portals for customers & partners.",
        description:
          "Our portal solutions provide secure, role-based access for customers, partners, and employees, enabling seamless external collaboration while maintaining security and performance.",
        image: "/images/power-apps/4.png",
      },
      {
        title: "Custom Connectors & AI Builder",
        icon: <FaRobot />,
        shortDesc: "Integrations, automation & AI-powered intelligence.",
        description:
          "We enhance Power Apps with custom connectors and AI Builder capabilities to integrate external systems, automate workflows, and introduce intelligent capabilities into business applications.",
        image: "/images/power-apps/5.png",
      },
    ],
  },
  {
    name: "Power Automate",
    headingPrefix: "Power Automate",
    headingHighlight: "Consulting & Development",
    headingSuffix: "Services",
    subtitle: "At Softree, we design and develop Power Automate solutions that streamline business processes, automate repetitive tasks, and improve workflow efficiency.",
    badge: "Power Automate Capabilities",
    shortDescription: "Explore workflow automation capabilities for approvals, processes, notifications, and repetitive tasks.",
    capabilities: [
      {
        title: "Cloud Flows",
        icon: <FaCloud />,
        shortDesc: "Automate cloud-based business processes across connected services.",
        description: "We build cloud-based Power Automate flows that connect applications and services to automate business processes, trigger actions, and reduce repetitive manual work.",
        image: "/images/power-apps/automate-5.png",
      },
      {
        title: "Approval Workflows",
        icon: <FaCheckDouble />,
        shortDesc: "Streamline approvals with automated routing and notifications.",
        description: "We automate approval workflows with defined routing, notifications, conditions, and actions to help teams reduce delays and maintain consistent business processes.",
        image: "/images/power-apps/automate-1.png",
      },
      {
        title: "Scheduled Flows",
        icon: <FaClock />,
        shortDesc: "Run recurring business processes automatically on defined schedules.",
        description: "We create scheduled Power Automate flows that execute recurring tasks and business processes automatically based on defined schedules and operational requirements.",
        image: "/images/power-apps/automate-2.png",
      },
      {
        title: "Business Process Flows",
        icon: <FaProjectDiagram />,
        shortDesc: "Guide users through consistent business processes and stages.",
        description: "We implement Business Process Flows to guide users through structured stages, improve process consistency, and support standardized business operations.",
        image: "/images/power-apps/automate-3.png",
      },
      {
        title: "Desktop Flows",
        icon: <FaDesktop />,
        shortDesc: "Automate repetitive desktop tasks with Microsoft RPA.",
        description: "We use Power Automate Desktop to automate repetitive desktop tasks and selected legacy application processes through robotic process automation.",
        image: "/images/power-apps/automate-4.png",
      },
      {
        title: "Error Handling & Retry",
        icon: <FaSync />,
        shortDesc: "Improve workflow reliability with handling, retry logic, and recovery.",
        description: "We design reliable Power Automate workflows with appropriate error handling, retry logic, and recovery mechanisms to support consistent process execution.",
        image: "/images/power-apps/automate-6.png",
      },
    ],
  },
  {
    name: "Dataverse",
    headingPrefix: "Dataverse",
    headingHighlight: "Consulting & Development",
    headingSuffix: "Services",
    subtitle: "At Softree, we design secure and structured Dataverse solutions that provide a reliable data foundation for connected Power Platform applications.",
    badge: "Dataverse Capabilities",
    shortDescription: "Explore data capabilities for structured, secure, and connected Power Platform solutions.",
    capabilities: [
      {
        title: "Data Modeling",
        icon: <FaSitemap />,
        shortDesc: "Structured data models for connected Power Platform applications.",
        description: "We design structured Dataverse data models that provide a reliable foundation for Power Apps, Power Automate, Power BI, Power Pages, and connected business solutions.",
        image: "/images/power-apps/data-1.png",
      },
      {
        title: "Business Data",
        icon: <FaDatabase />,
        shortDesc: "Centralize and organize business data for connected solutions.",
        description: "We help organize and centralize business data in Dataverse to support connected applications, workflows, reporting, and business processes.",
        image: "/images/power-apps/data-2.png",
      },
      {
        title: "Security",
        icon: <FaShieldAlt />,
        shortDesc: "Protect business data with roles, permissions, and controlled access.",
        description: "We configure Dataverse security using appropriate roles, permissions, and access controls to help protect business data across Power Platform solutions.",
        image: "/images/power-apps/data-3.png",
      },
      {
        title: "Integration",
        icon: <FaPlug />,
        shortDesc: "Connect Dataverse with applications, APIs, and business systems.",
        description: "We integrate Dataverse with Power Platform applications, APIs, Microsoft services, and existing business systems to support connected data and workflows.",
        image: "/images/power-apps/data-4.png",
      },
      {
        title: "Data Management",
        icon: <FaServer />,
        shortDesc: "Maintain consistent, structured, and reliable business data.",
        description: "We support structured Dataverse data management to improve consistency, reliability, and usability across connected Power Platform solutions.",
        image: "/images/power-apps/data-5.png",
      },
    ],
  },
  {
    name: "Power BI",
    headingPrefix: "Power BI",
    headingHighlight: "Consulting & Development",
    headingSuffix: "Services",
    subtitle: "At Softree, we design and develop Power BI solutions that transform business data into actionable insights through dashboards, reporting, and analytics.",
    badge: "Power BI Capabilities",
    shortDescription: "Explore reporting and analytics capabilities for dashboards, insights, and business intelligence.",
    capabilities: [
      {
        title: "Dashboards",
        icon: <FaChartPie />,
        shortDesc: "Interactive dashboards for operational and management visibility.",
        description: "We develop interactive Power BI dashboards that bring business metrics and operational data together for clear, actionable visibility.",
        image: "/images/power-apps/powerbi-1.png",
      },
      {
        title: "Reports",
        icon: <FaFileAlt />,
        shortDesc: "Business reports that turn complex data into clear insights.",
        description: "We build Power BI reports that organize business data into clear and useful views for operational reporting and decision support.",
        image: "/images/power-apps/powerbi-2.png",
      },
      {
        title: "Analytics",
        icon: <FaChartLine />,
        shortDesc: "Analyze data to identify trends, performance, and opportunities.",
        description: "We develop analytics solutions that help teams understand trends, monitor performance, and identify opportunities within their business data.",
        image: "/images/power-apps/powerbi-3.png",
      },
      {
        title: "Data Visualization",
        icon: <FaChartArea />,
        shortDesc: "Present business information through clear and interactive visuals.",
        description: "We create meaningful Power BI visualizations that make complex business information easier to understand and act upon.",
        image: "/images/power-apps/powerbi-4.png",
      },
      {
        title: "Business Intelligence",
        icon: <FaLightbulb />,
        shortDesc: "Connected insights for informed business decision-making.",
        description: "We connect business data sources and Power BI capabilities to support reporting, analytics, and data-driven decision-making.",
        image: "/images/power-apps/powerbi-5.png",
      },
    ],
  },
  {
    name: "Power Pages",
    headingPrefix: "Power Pages",
    headingHighlight: "Consulting & Development",
    headingSuffix: "Services",
    subtitle: "At Softree, we design and develop secure Power Pages solutions for customer, partner, and self-service business experiences.",
    badge: "Power Pages Capabilities",
    shortDescription: "Explore secure portal capabilities for customers, partners, and self-service experiences.",
    capabilities: [
      {
        title: "Customer Portals",
        icon: <FaUsers />,
        shortDesc: "Secure self-service experiences for customers and external users.",
        description: "We build secure Power Pages customer portals that provide controlled access to information, requests, forms, and business processes.",
        image: "/images/power-apps/pages-1.png",
      },
      {
        title: "Partner Portals",
        icon: <FaHandshake />,
        shortDesc: "Connected portal experiences for partners and business networks.",
        description: "We develop partner portals that connect external business users with the information and processes they need to collaborate effectively.",
        image: "/images/power-apps/pages-2.png",
      },
      {
        title: "Self-Service",
        icon: <FaUserCog />,
        shortDesc: "Give users secure access to requests, information, and processes.",
        description: "We create self-service Power Pages experiences that allow users to securely access information, submit requests, and interact with business processes.",
        image: "/images/power-apps/pages-3.png",
      },
      {
        title: "Dataverse Integration",
        icon: <FaDatabase />,
        shortDesc: "Connect Power Pages with Dataverse and business applications.",
        description: "We connect Power Pages with Microsoft Dataverse and related business applications to support connected data and process experiences.",
        image: "/images/power-apps/pages-4.png",
      },
      {
        title: "Secure External Access",
        icon: <FaLock />,
        shortDesc: "Controlled external access to business data and processes.",
        description: "We build Power Pages experiences with appropriate access controls to provide secure external access to business information and processes.",
        image: "/images/power-apps/pages-5.png",
      },
    ],
  },
  {
    name: "Copilot Studio & AI",
    headingPrefix: "Copilot Studio & AI",
    headingHighlight: "Development",
    headingSuffix: "Services",
    subtitle: "At Softree, we build Copilot Studio and AI-powered solutions that automate tasks, assist users, and improve intelligent business workflows.",
    badge: "Copilot Studio & AI Capabilities",
    shortDescription: "Explore AI capabilities for assistants, intelligent automation, workflows, and business applications.",
    capabilities: [
      {
        title: "AI Assistants",
        icon: <FaRobot />,
        shortDesc: "Intelligent assistants for information and business tasks.",
        description: "We build AI assistants that help users access information, interact with business knowledge, and complete supported business tasks.",
        image: "/images/power-apps/copilot-1.png",
      },
      {
        title: "Copilot Studio",
        icon: <FaCommentDots />,
        shortDesc: "Build AI-powered conversational experiences with Copilot Studio.",
        description: "We build and configure Microsoft Copilot Studio solutions for conversational experiences, business assistance, and connected workflows.",
        image: "/images/power-apps/copilot-2.png",
      },
      {
        title: "AI Automation",
        icon: <FaCogs />,
        shortDesc: "Use AI to automate repetitive tasks and business processes.",
        description: "We combine AI capabilities with Power Platform automation to support repetitive tasks, intelligent processing, and more efficient business operations.",
        image: "/images/power-apps/copilot-3.png",
      },
      {
        title: "AI Workflows",
        icon: <FaProjectDiagram />,
        shortDesc: "Combine AI with Power Automate and business processes.",
        description: "We integrate AI capabilities with Power Automate and business workflows to create intelligent process automation and connected business experiences.",
        image: "/images/power-apps/copilot-4.png",
      },
      {
        title: "Business AI",
        icon: <FaBrain />,
        shortDesc: "Apply AI across applications, workflows, data, and business operations.",
        description: "We apply AI capabilities across Power Platform applications, workflows, and business data to support intelligent business operations and user experiences.",
        image: "/images/power-apps/copilot-5.png",
      },
    ],
  },
];

export default function PowerAppsServices() {
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [activeCapabilityIdx, setActiveCapabilityIdx] = useState(0);

  const handleServiceChange = (index: number) => {
    setActiveServiceIdx(index);
    setActiveCapabilityIdx(0);
  };

  const activeService = servicesData[activeServiceIdx];
  const activeCapability = activeService.capabilities[activeCapabilityIdx];

  return (
    <section className="relative overflow-hidden">
      <div className="relative w-full px-6 max-w-7xl mx-auto py-6">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-5 px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {activeService.headingPrefix}{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              {activeService.headingHighlight}
            </span>{" "}
            <br />
            {activeService.headingSuffix}
          </h2>

          <p className="text-lg md:text-[1.1rem] leading-relaxed text-gray-600 max-w-3xl mx-auto mt-3">
            {activeService.subtitle}
          </p>
        </div>

        {/* ================= MAIN SERVICE SELECTOR ================= */}
        <div className="mb-10 flex flex-wrap justify-center gap-2 md:gap-6 border-b border-gray-200 pb-1">
          {servicesData.map((service, idx) => {
            const isActive = activeServiceIdx === idx;
            return (
              <button
                key={idx}
                aria-label={`Select service ${service.name}`}
                onClick={() => handleServiceChange(idx)}
                className={`cursor-pointer relative pb-3 text-sm md:text-base font-medium transition px-2 ${isActive
                  ? "text-orange-600"
                  : "text-gray-800 hover:text-gray-600"
                  }`}
              >
                {service.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-orange-600" />
                )}
              </button>
            );
          })}
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* ================= LEFT PANEL ================= */}
          <div className="md:col-span-1 md:sticky top-20 flex">
            <div
              className="
      relative
  bg-gradient-to-r from-black via-[#4c1c02] to-black
      backdrop-blur-xl
      p-5
      rounded-2xl
      border border-white/10
      shadow-lg

      flex flex-col
      h-full
      w-full
    "
            >
              {/* Badge */}
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-200">
                {activeService.badge}
              </span>

              {/* ===== NEW SHORT DESCRIPTION ===== */}
              <p className="text-xs text-white/60 leading-relaxed mb-5">
                {activeService.shortDescription}
              </p>

              {/* Tabs */}
              <div className="flex md:flex-col gap-3 flex-1 overflow-x-auto md:overflow-visible">
                {activeService.capabilities.map((cap, index) => {
                  const isActive = activeCapabilityIdx === index;

                  return (
                    <button
                      key={index}
                      aria-label={`Select capability ${cap.title}`}
                      onClick={() => setActiveCapabilityIdx(index)}
                      className={`
    group
    min-w-[220px]
    px-4 py-3
    rounded-xl
    text-left
    border transition-all duration-300
    ${isActive
                          ? "bg-white/10 border-white/20 text-white"
                          : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                        }
  `}
                    >
                      <div className="flex flex-col gap-1.5">
                        {/* title */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm">{cap.icon}</span>
                          <span className="text-sm font-medium">
                            {cap.title}
                          </span>
                        </div>

                        {/* short description */}
                        <p
                          className={`
        text-xs leading-relaxed line-clamp-2
        ${isActive ? "text-white/75" : "text-white/40 group-hover:text-white/60"
                            }
      `}
                        >
                          {cap.shortDesc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= RIGHT PANEL ================= */}
          <div className="md:col-span-2 md:sticky top-20 flex">
            <div
              className="
        relative
      bg-gradient-to-r from-black via-[#4c1c02] to-black
        backdrop-blur-xl
        p-6
        rounded-2xl
        border border-white/10
        shadow-lg

        flex flex-col
        h-full
        w-full
        gap-5
      "
            >
              {/* ================= TEXT ================= */}
              <div className="bg-black/30 p-5 rounded-xl border border-white/10">
                <p className="text-sm text-white/90 text-center leading-relaxed">
                  {activeCapability.description}
                </p>
              </div>

              {/* ================= DYNAMIC HEIGHT IMAGE ================= */}
              <Image
                src={activeCapability.image}
                alt={activeCapability.title}
                width={1000}
                height={590}
                className="
          w-full
          flex-1
          min-h-[250px]
          rounded-xl
          object-cover
          shadow-lg
          transition
          hover:scale-[1.02]
        "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
