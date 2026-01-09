"use client";

import React from "react";

const servicesData = [
  {
    title: "Strategic Consulting",
    description:
      "Our experts help you define strategies, optimize processes, and implement solutions that drive business growth and innovation.",
    icon: "💼",
    href: "/services/consultants",
  },
  {
    title: "Talent Acquisition",
    description:
      "We source and attract top-tier IT and business professionals, ensuring your teams have the right skills to succeed.",
    icon: "🧑‍💻",
    href: "/services/recruitment",
  },
  {
    title: "Nearshoring Solutions",
    description:
      "Access skilled teams from Eastern Europe with competitive rates, fluent communication, and experience delivering global projects.",
    icon: "🌍",
    href: "/services/nearshoring",
  },
  {
    title: "Emerging Talent Programs",
    description:
      "We connect you with young IT professionals through try-and-hire services, bringing innovation and energy to your projects.",
    icon: "⭐",
    href: "/services/try-and-hire",
  },
];

export default function ServicesSection() {
  return (
    <div className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Tailored Solutions for Every Challenge
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            From consulting and recruitment to nearshoring and talent programs, we provide end-to-end solutions designed to empower your business and drive measurable results.
          </p>
        </div>

        {/* Cards Section */}
        <div className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-3xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesData.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="relative group block rounded-2xl overflow-hidden"
              >
                {/* Black Card */}
                <div className="relative bg-black rounded-2xl p-6 flex flex-col h-full z-10">
                  {/* Icon */}
                  <div className="text-5xl mb-4">{item.icon}</div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-6 flex-grow">
                    {item.description}
                  </p>

                  {/* Gradient Bottom Border */}
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-b-lg opacity-70 transition-all duration-300 group-hover:opacity-100"></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
