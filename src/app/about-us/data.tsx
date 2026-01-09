"use client";

import React, { useState } from "react";

// Portfolio Data
const portfolioData = [
  {
    title: "Aeronautical Parts Quality Inspection Platform",
    bullets: [
      "PowerApps Canvas App",
      "Dataverse Integration",
      "Automated Workflows",
    ],
    bulletColor: "green",
    description:
      "Designed a comprehensive ticketing and inspection system for aeronautical parts, enabling organizations to streamline quality checks, track issues in real-time, and optimize after-sales support for enhanced operational efficiency.",
    viewLink:
      "https://www.concettolabs.com/powerapps-portfolio/quality-inspection-tool",
    contactLink: "https://www.concettolabs.com/inquiry",
    image:
      "https://www.concettolabs.com/assets/images/hire/portfolio/portfolio-aerospace.webp",
  },
  {
    title: "Construction Vendor Management System",
    bullets: [
      "Microsoft PowerApps",
      "Flow Automation",
      "MS SQL Database",
      "Custom API Connectors",
    ],
    bulletColor: "pink",
    description:
      "Built an end-to-end vendor management solution for construction teams, enabling seamless assignment, performance tracking, and rating of contractors. Streamlined communication and ensured accountability across all vendor operations.",
    viewLink:
      "https://www.concettolabs.com/powerapps-portfolio/construction-vendor-management-app",
    contactLink: "https://www.concettolabs.com/inquiry",
    image:
      "https://www.concettolabs.com/assets/images/hire/portfolio/portfolio-construction-app.webp",
  },
  {
    title: "Incident Management & Audit Dashboard",
    bullets: [
      "PowerApps Canvas App",
      "Dataverse & SharePoint",
      "Power BI Analytics",
      "Active Directory Integration",
      "Custom Connectors",
    ],
    bulletColor: "violet",
    description:
      "Developed a robust incident reporting and audit system that tracks minor and major incidents across projects, providing detailed stage-wise reporting and actionable insights for improved compliance and operational safety.",
    viewLink:
      "https://www.concettolabs.com/powerapps-portfolio/incident-management-app",
    contactLink: "https://www.concettolabs.com/inquiry",
    image:
      "https://www.concettolabs.com/assets/images/hire/portfolio/portfolio-incident-management.webp",
  },
  {
    title: "Construction Site Inspection Log App",
    bullets: [
      "Microsoft PowerApps",
      "Automated Workflows",
      "MS SQL Database",
      "Azure Blob Storage",
    ],
    bulletColor: "blue",
    description:
      "Implemented a location-based inspection app for construction sites, allowing teams to log progress, capture work and issue images, generate inspection reports, and automate email notifications to stakeholders for improved project visibility and accountability.",
    viewLink:
      "https://www.concettolabs.com/powerapps-portfolio/construction-inspection-log-powerapps",
    contactLink: "https://www.concettolabs.com/inquiry",
    image:
      "https://www.concettolabs.com/assets/images/hire/portfolio/portfolio-inspection.webp",
  },
];

export default function PortfolioCarousel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? portfolioData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === portfolioData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="our-portfolio py-20 bg-black text-white relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 px-4">
          <h2 className="text-5xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Transforming Ideas Into Digital Experiences
          </h2>
          <p className="mt-6 text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            We craft intelligent, scalable, and user-centric solutions that
            empower businesses to thrive in a digital-first world. From
            enterprise-grade applications to cutting-edge automation, our
            portfolio showcases projects that merge creativity with technology
            to deliver measurable impact and innovation.
          </p>
        </div>

        {/* Carousel Wrapper with Gradient Background */}
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-12 px-4 rounded-xl">
          {/* Carousel */}
          <div className="relative overflow-hidden rounded-xl px-12">
            {portfolioData.map((item, idx) => (
              <div
                key={idx}
                className={`grid md:grid-cols-2 gap-6 items-center p-6 transition-all duration-500 ease-in-out ${
                  idx === current ? "opacity-100 block" : "opacity-0 hidden"
                }`}
              >
                {/* Text */}
                <div className="portfolio-text-content space-y-4 text-white">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <ul className={`grid grid-cols-2 gap-2`}>
                    {item.bullets.map((b, i) => (
                      <li
                        key={i}
                        className={`border-l-4 pl-2 border-${item.bulletColor}-500`}
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                  <p>{item.description}</p>
                  <div className="flex gap-4 flex-wrap">
                    <a
                      href={item.viewLink}
                      className="px-4 py-2 border border-gray-700 rounded hover:bg-gray-700 transition"
                    >
                      View Project
                    </a>
                    <a
                      href={item.contactLink}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>

                {/* Image */}
                <div className="portfolio-img">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons Below */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
            >
              &#10094; Previous
            </button>
            <button
              onClick={nextSlide}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
            >
              Next &#10095;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
