"use client";

import { useState } from "react";

interface AccordionItem {
  title: string;
  description: string;
  img: string;
}

interface Tab {
  title: string;
  key: string;
  accordions: AccordionItem[];
}

// Tabs Data
const tabs: Tab[] = [
  {
    key: "enterprise",
    title: "Enterprise - Grade",
    accordions: [
      {
        title: "Secure by Design",
        description:
          "Built on Azure App Service, Power Pages provides enterprise-level security, compliance, and role-based access controls.",
        img: "/secure-by-design.jpg",
      },
      {
        title: "AI-Enhanced Productivity",
        description:
          "Leverage Copilot in Power Pages to generate layouts, forms, and content faster using natural language.",
        img: "/ai-productivity.jpg",
      },
      {
        title: "Scalable Websites",
        description:
          "Deliver responsive, modern, and data-driven experiences for customers, partners, and communities.",
        img: "/scalable-websites.jpg",
      },
    ],
  },
  {
    key: "customization",
    title: "Rich Customization",
    accordions: [
      {
        title: "Flexible Templates",
        description:
          "Start with industry-based starter sites and extend with custom branding and workflows.",
        img: "/flexible-templates.jpg",
      },
      {
        title: "Visual & Pro-Dev Tools",
        description:
          "Use the Design Studio for drag-and-drop editing, or extend with Visual Studio Code, GitHub, and CLI.",
        img: "/pro-dev-tools.jpg",
      },
      {
        title: "Advanced Styling",
        description:
          "Apply custom CSS and branding for a consistent, tailored user experience.",
        img: "/advanced-styling.jpg",
      },
    ],
  },
  {
    key: "learning",
    title: "Integrated Learning Hub",
    accordions: [
      {
        title: "Guided Authoring",
        description:
          "Built-in learning resources and AI prompts simplify onboarding for new makers.",
        img: "/guided-authoring.jpg",
      },
      {
        title: "Accelerated Site Building",
        description:
          "Templates and wizards help teams move from concept to launch quickly.",
        img: "/accelerated-building.jpg",
      },
      {
        title: "Tailored Support",
        description:
          "Access Microsoft’s best practices, documentation, and partner expertise for scalable solutions.",
        img: "/tailored-support.jpg",
      },
    ],
  },
  {
    key: "shared-data",
    title: "Shared Business Data",
    accordions: [
      {
        title: "Seamless Dataverse Integration",
        description:
          "Connect directly with Microsoft Dataverse to securely manage and share data.",
        img: "/dataverse-integration.jpg",
      },
      {
        title: "Connected Power Platform",
        description:
          "Extend capabilities with Power Apps, Power BI, and Power Automate for a unified business ecosystem.",
        img: "/connected-platform.jpg",
      },
      {
        title: "Consistent Data & Processes",
        description:
          "Ensure accuracy and standardization across apps, workflows, and websites.",
        img: "/consistent-data.jpg",
      },
    ],
  },
];

export default function BenefitsSection() {
  const [activeTab, setActiveTab] = useState("shared-data");
  const [activeAccordion, setActiveAccordion] = useState(0);

  const currentTab = tabs.find((t) => t.key === activeTab)!;

  return (
    <section className="bg-black text-gray-100 py-20">
      <div className="container mx-auto px-6">
        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-16 text-white text-center">
          Benefits of using Power Pages
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Vertical Tabs + Accordion */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            {/* Vertical Tabs */}
            <div className="flex flex-row lg:flex-col gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`px-5 py-3 rounded-xl font-semibold text-left transition-all duration-300 ${
                    activeTab === tab.key
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setActiveAccordion(0);
                  }}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Accordion */}
            <div className="mt-6 space-y-4">
              {currentTab.accordions.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-700 rounded-xl overflow-hidden"
                >
                  <button
                    className="w-full flex justify-between items-center px-5 py-3 bg-gray-800 hover:bg-gray-700 text-gray-100 font-semibold transition-colors duration-300"
                    onClick={() => setActiveAccordion(index)}
                  >
                    {item.title}
                    <span className="text-xl">
                      {activeAccordion === index ? "−" : "+"}
                    </span>
                  </button>
                  {activeAccordion === index && (
                    <div className="p-4 bg-gray-900 text-gray-200 transition-all duration-300">
                      {item.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image + Cards */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            {/* Image */}
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl">
              <img
                src={currentTab.accordions[activeAccordion].img}
                alt={currentTab.accordions[activeAccordion].title}
                className="w-full object-cover h-80 lg:h-[28rem] transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
            </div>

            {/* Cards below */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentTab.accordions.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
