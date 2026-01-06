"use client";

import React from "react";

const services = [
  {
    title: "SPFx Development",
    description:
      "Custom SharePoint Framework solutions that modernize your SharePoint environment and enhance collaboration.",
    image:
      "https://powercraft.co/wp-content/uploads/2025/04/PowerApps_scalable.svg",
    link: "/services/spfx-development/",
  },
  {
    title: "Power Platform Consulting",
    description:
      "Expert guidance in Power Apps, Power Automate, and Power BI to streamline business processes and automate workflows.",
    image:
      "https://powercraft.co/wp-content/uploads/2025/04/PowerAutomate_scalable.svg",
    link: "/services/power-platform-consulting/",
  },
  {
    title: "SharePoint Migration",
    description:
      "Seamless migration from classic SharePoint or other platforms to modern SharePoint Online without downtime.",
    image:
      "https://powercraft.co/wp-content/uploads/2025/04/PowerBI_scalable.svg",
    link: "/services/sharepoint-migration/",
  },
  {
    title: "Custom Web Parts",
    description:
      "Tailored web parts to enhance SharePoint sites, improve UX, and provide custom functionality for your team.",
    image:
      "https://powercraft.co/wp-content/uploads/2025/04/CopilotStudio_scalable.svg",
    link: "/services/custom-web-parts/",
  },
  {
    title: "Governance & CoE",
    description:
      "Set up governance, environment strategy, and Centers of Excellence to ensure secure and scalable SharePoint adoption.",
    image:
      "https://powercraft.co/wp-content/uploads/2025/04/Microsoft-Entra-Private-Access-color-icon.svg",
    link: "/services/governance-center-of-excellence/",
  },
  {
    title: "Training & Support",
    description:
      "Empower your team with training and ongoing support for SharePoint and Power Platform adoption.",
    image:
      "https://powercraft.co/wp-content/uploads/2025/04/MRPortal_scalable.svg",
    link: "/services/training-support/",
  },
];

const ServicesSection = () => {
  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 px-6 md:px-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Our Services</h2>
        <p className="text-gray-300 max-w-xl mx-auto">
          Softree Technology provides expert SharePoint and Power Platform
          consulting services to modernize your business processes, automate
          workflows, and enhance collaboration.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <a
            key={index}
            href={service.link}
            className="group relative bg-gray-800 bg-opacity-30 backdrop-blur-md rounded-xl p-6 flex flex-col items-start text-left shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-24 h-24 mb-4 self-center transition-transform duration-500 group-hover:scale-110"
            />
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-300 mb-4">{service.description}</p>
            <span className="text-green-400 font-semibold group-hover:underline">
              Explore →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
