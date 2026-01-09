"use client";

import React from "react";
import { FaLaptopCode, FaChartBar, FaUsers, FaServer, FaCloud } from "react-icons/fa";

const services = [
  {
    title: "Microsoft 365",
    img: "/images/1.png",
    sideImg: "/images/1.png",
    points: [
      { icon: <FaUsers />, label: "Business Application Development" },
      { icon: <FaLaptopCode />, label: "Custom Workflow Development" },
      { icon: <FaChartBar />, label: "BI, Data Analytics & Visualization" },
    ],
    gradient: "from-indigo-700 via-purple-700 to-pink-700",
  },
  {
    title: "SharePoint",
    img: "/images/about-us/about-sharepoint.png",
    sideImg: "/images/2.png",
    points: [
      { icon: <FaServer />, label: "Document Management & Collaboration" },
      { icon: <FaCloud />, label: "Cloud Integration & Sites" },
      { icon: <FaLaptopCode />, label: "Custom Web Parts & Workflows" },
    ],
    gradient: "from-green-600 via-teal-600 to-cyan-500",
  },
];

export default function ConnectedBoxesWithFullRightImage() {
  return (
    <section className="bg-black text-white py-32">
      <div className="container mx-auto px-4">
        {/* Header & Subheader */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wide mb-4">
            Our Expertise
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            We deliver top-notch solutions in Microsoft 365, SharePoint, and more to help
            businesses streamline processes, collaborate efficiently, and make data-driven decisions.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 relative">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`flex flex-col md:flex-row flex-1 items-stretch 
              bg-gradient-to-br ${service.gradient} rounded-xl border border-white/20
              shadow-2xl transform transition-transform duration-500 hover:scale-105`}
            >
              {/* Left content */}
              <div className="flex-1 flex flex-col items-center md:items-start p-8 relative z-10">
                {/* Main Image */}
                <div className="w-24 h-24 mb-6 flex items-center justify-center rounded-full 
                  bg-white/20 shadow-lg transform transition-transform duration-500 hover:scale-110">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-16 h-16 object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-center md:text-left tracking-wide uppercase">
                  {service.title}
                </h3>
                <p className="text-gray-200 mb-6 text-center md:text-left">
                  Key services we offer in this domain:
                </p>

                {/* Points */}
                <div className="relative w-full flex flex-col gap-6">
                  {service.points.map((point, i) => (
                    <div
                      key={i}
                      className="relative flex items-center w-full group cursor-pointer"
                    >
                      {/* Connecting line */}
                      <div className="absolute left-0 top-1/2 w-8 h-px bg-white/50 group-hover:bg-white transition-all duration-300"></div>

                      <div className="flex items-center gap-4 ml-10">
                        <span className="text-xl text-white/80 group-hover:text-white transition-colors duration-300">
                          {point.icon}
                        </span>
                        <span className="text-base">{point.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right full-height image */}
              <div className="flex-1 hidden md:flex items-center justify-center overflow-hidden rounded-r-xl">
                <img
                  src={service.sideImg}
                  alt={`${service.title} illustration`}
                  className="h-full w-auto object-cover transform transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
