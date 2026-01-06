"use client";
import React from "react";

const WhyChooseUs = () => {
  const points = [
    {
      title: "Expertise",
      desc: "Our Softree team specializes in creating advanced digital solutions, ensuring we stay updated with the latest Microsoft Power Pages capabilities and best practices.",
    },
    {
      title: "Integrated Solutions",
      desc: "We seamlessly integrate Power Pages with Microsoft 365, Dynamics 365, Power BI, and other cloud services to deliver end-to-end business solutions.",
    },
    {
      title: "Global Experience",
      desc: "Softree has successfully delivered projects for clients worldwide, providing value-driven Power Pages solutions tailored to diverse business needs.",
    },
    {
      title: "Transparency",
      desc: "We maintain transparent communication throughout the project, keeping clients informed and ensuring smooth collaboration at every step.",
    },
    {
      title: "Dedicated Support",
      desc: "Our experts provide dedicated assistance and guidance, helping clients achieve their goals efficiently and effectively.",
    },
    {
      title: "Quality and Efficiency",
      desc: "We focus on delivering high-quality solutions with optimal time management, ensuring both performance and excellence.",
    },
  ];

  return (
    <section className="relative py-24 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-stretch gap-12">
        {/* Left Column - Text */}
        <div className="lg:w-1/2 flex flex-col justify-center order-1 lg:order-1">
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8 rounded-3xl shadow-2xl h-full flex flex-col justify-between border-b-4 border-blue-500">
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
                Why Choose Softree for Power Pages Solutions?
              </h3>

              <ul className="space-y-6 mb-12">
                {points.map((point, idx) => (
                  <li
                    key={idx}
                    className="text-gray-300 flex items-start gap-3"
                  >
                    <span className="text-blue-500 font-bold mt-1">•</span>
                    <div>
                      <b className="text-white">{point.title}:</b> {point.desc}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end order-2 lg:order-2">
          <div className="rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105 h-full w-full">
            <img
              src="/images/team.avif"
              alt="Softree Power Pages Solutions"
              title="Softree Power Pages Solutions"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
