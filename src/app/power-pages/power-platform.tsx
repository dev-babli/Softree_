"use client";
import React from "react";

type Service = {
  title: string;
  icon: string;
  desc: string;
};

const services: Service[] = [
  {
    title: "Power BI",
    icon: "/images/powerbi.webp",
    desc: "Transform raw data into interactive reports and dashboards. Enable stakeholders to make data-driven decisions with real-time analytics.",
  },
  {
    title: "Dynamics 365",
    icon: "/images/dynamics365.webp",
    desc: "Streamline your business processes with intelligent applications. Automate workflows, manage customer relationships, and optimize operations.",
  },
  {
    title: "Power Automate",
    icon: "/images/powerautomate.webp",
    desc: "Automate repetitive tasks across apps and services. Boost efficiency and reduce manual effort with easy-to-configure workflows.",
  },
  {
    title: "Power Apps",
    icon: "/images/powerapps.webp",
    desc: "Build low-code custom applications quickly to solve business challenges. Connect data, enhance processes, and empower users across your organization.",
  },
  {
    title: "SharePoint",
    icon: "/images/sharepoint.webp",
    desc: "Collaborate securely and efficiently. Share documents, manage content, and build intranet portals for seamless teamwork and communication.",
  },
  {
    title: "Copilot Studio",
    icon: "/images/copilot-logo-1.webp",
    desc: "Leverage AI-powered assistants to provide instant support. Enhance customer experiences with conversational intelligence and smart automation.",
  },
];

const MicrosoftCloudSection = () => {
  return (
    <section className="relative bg-black text-white py-28 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Power Pages & Microsoft Cloud
          </h2>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
            We craft dynamic Power Pages websites fully integrated with the
            Microsoft Cloud, enabling secure, interactive, and data-driven
            digital experiences that empower your business and engage your
            users.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((item) => (
            <div
              key={item.title}
              className="group relative rounded-3xl transition-transform duration-500 hover:scale-105"
            >
              {/* Card */}
              <div
                className="relative h-full rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-900
          border-t-4 border-l-4 border-white/20 p-6 shadow-xl backdrop-blur-xl transition-all duration-500
          group-hover:border-white/40 group-hover:shadow-2xl flex items-start gap-6"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-28 h-28 rounded-full bg-gradient-to-br from-white/10 via-white/5 to-white/10 border-4 border-white/20 flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-20 h-20 object-contain"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Title */}
                  <h3 className="text-2xl font-semibold mb-2 text-white group-hover:text-gray-200 transition">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MicrosoftCloudSection;
