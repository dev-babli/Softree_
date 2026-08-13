"use client";

import { useState } from "react";

const accordionData = [
  {
    title: "Workshops That Unlock Insight",
    content:
      "At DATSWATECH, we conduct collaborative workshops with your stakeholders and our experts to define business goals, identify opportunities, and ensure alignment before any development begins.",
  },
  {
    title: "Industry & User Research",
    content:
      "We analyze your industry landscape and target audience to shape solutions that are data-driven and grounded in real needs, ensuring your product achieves maximum impact.",
  },
  {
    title: "Technical Assessments",
    content:
      "Our technical and AI readiness assessments evaluate your current systems, identify gaps, and provide actionable recommendations for scalability, efficiency, and innovation.",
  },
  {
    title: "Strategic Roadmap You Can Trust",
    content:
      "DATSWATECH delivers a clear, actionable roadmap balancing speed, cost, and scalability, giving you confidence that your idea will move forward successfully.",
  },
];

export default function ConsultingApproach() {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-indigo-900 py-24 text-white">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Our Consulting-First Approach at DATSWATECH
          </h2>

          <p className="text-blue-100 text-lg leading-relaxed mb-10">
            At DATSWATECH, every successful project begins with understanding your
            unique challenges. We uncover critical insights, validate assumptions,
            and define strategic directions before a single line of code is written,
            ensuring reduced risks and higher success rates.
          </p>

          <a
            href="https://datswatech.com/consulting-services/"
            target="_blank"
            className="inline-flex items-center gap-3 font-medium text-blue-900 bg-white px-7 py-3 rounded-full hover:bg-gray-100 transition shadow-lg"
          >
            View Our Consulting Services
          </a>
        </div>

        {/* Right Accordion */}
        <div className="space-y-5">
          {accordionData.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/15"
            >
              <button
                className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-lg"
                onClick={() => toggleAccordion(index)}
              >
                {item.title}

                <span
                  className={`text-2xl transition-transform duration-300 ${
                    activeIndex === index ? "rotate-45 text-blue-300" : ""
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  activeIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden px-6 pb-6 text-blue-100 leading-relaxed">
                  {item.content}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}