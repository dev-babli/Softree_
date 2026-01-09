"use client";
import React from "react";

const features = [
  "Seamless Visual Experience",
  "Customizable Templates & Themes",
  "Multi-Device Responsive Design",
  "Enhanced Design Studio",
  "Integrated Learning & Documentation",
  "Advanced Developer Tools",
  "Dataverse Integration & Compatibility",
  "Extensible Data Architecture",
  "Optimized Rendering Performance",
  "Simplified Page Authoring",
  "Edge Caching for Faster Delivery",
  "Enterprise-Grade Security & WAF",
];

const PowerPagesSection = () => {
  return (
    <section className="bg-black py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading above image */}
        <h2 className="text-4xl md:text-4xl font-extrabold text-center mb-8">
          Power Pages: Features That Transform Your Web Experience
        </h2>
        {/* Big Horizontal Image */}
        <div className="mb-12">
          <img
            src="/images/data.avif"
            alt="Microsoft Power Pages Features"
            className="w-full rounded-xl shadow-xl object-cover"
            style={{ height: "25rem" }} // Decrease to 16rem (~256px)
          />
        </div>

        {/* Description */}
        <p className="text-gray-300 text-center text-lg mb-12 max-w-3xl mx-auto">
          Our team helps businesses use all the features of Power Pages to
          create, configure, and eventually publish stunning web pages, sites,
          and web-based assets rapidly. Here are some integral Microsoft Power
          Pages features.
        </p>

        {/* Features Grid - 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-900 via-black to-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-b-4 border-blue-500"
            >
              {/* Icon circle */}
              <div className="w-12 h-12 flex items-center justify-center bg-gray-700 rounded-full border-2 border-gray-500">
                {/* Replace with an actual icon if needed */}
                <span className="text-white font-bold">{idx + 1}</span>
              </div>
              <p className="text-gray-200 font-medium">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PowerPagesSection;
