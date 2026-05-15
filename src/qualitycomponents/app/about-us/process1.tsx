"use client";

import { useState } from "react";

export default function OriginalSVGStepper() {
  const steps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: `We start by understanding your business needs and project goals.  
Our consultants schedule a call to gather requirements, answer questions, and provide initial guidance.`,
      staff: ["Consultant", "Business Analyst"],
    },
    {
      number: "02",
      title: "Project Analysis",
      description: `Our team analyzes your project requirements in detail, identifying key features, integrations, and challenges.  
We prepare a roadmap and preliminary architecture to align with your objectives.`,
      staff: ["Project Manager", "Solution Architect", "Business Analyst"],
    },
    {
      number: "03",
      title: "UI/UX Planning",
      description: `We design wireframes, user flows, and visual concepts to ensure the user experience is intuitive and engaging.  
Designs are reviewed with your team before final approval.`,
      staff: ["UI/UX Designer", "Product Manager"],
    },
    {
      number: "04",
      title: "Development Sprints",
      description: `Our development team works in agile sprints, delivering incremental features.  
You receive regular updates and demos to track progress and provide feedback.`,
      staff: [
        "Frontend Developer",
        "Backend Developer",
        "Mobile Developer",
        "QA Engineer",
      ],
    },
    {
      number: "05",
      title: "Quality Assurance",
      description: `Rigorous testing is performed to identify bugs, validate functionality, and ensure performance across devices.  
We guarantee that your product meets the highest quality standards.`,
      staff: ["QA Engineer", "Test Automation Specialist"],
    },
    {
      number: "06",
      title: "Deployment & Launch",
      description: `We assist with deploying your application to production environments, app stores, or cloud platforms.  
Post-deployment monitoring ensures a smooth launch experience for your users.`,
      staff: ["DevOps Engineer", "Project Manager", "Developers"],
    },
    {
      number: "07",
      title: "Post-Launch Support",
      description: `Our support team provides ongoing maintenance, performance optimization, and feature enhancements.  
We ensure your product evolves to meet user needs and business growth.`,
      staff: ["Support Engineer", "Developers", "QA Engineer"],
    },
  ];

  const [active, setActive] = useState(0);
  const colors = [
    "#06F",
    "#005FEC",
    "#005BE0",
    "#05C",
    "#0047C1",
    "#003FB2",
    "#039",
  ];

  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Our Process Explained
        </h2>
        <p className="text-gray-600 text-lg md:text-xl">
          Follow each step of our process, see who’s involved, and understand
          how we bring your project to life.
        </p>
      </div>

      <div className="overflow-x-auto mb-12 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1321"
          height="150" // increased height to make room for tabs
          viewBox="0 0 1321 150"
          className="w-full min-w-[1321px]"
        >
          {steps.map((step, index) => {
            const x = index * 180;

            return (
              <g key={index}>
                {/* Step box */}
                <path
                  d={`M${x} 23H${x + 180}V72H${x}z`}
                  fill={index <= active ? colors[index] : "#ccc"}
                  className="cursor-pointer"
                  onClick={() => setActive(index)}
                />

                {/* Step number */}
                <text
                  x={x + 90} // center inside the box
                  y={56}
                  fill="#FFF"
                  fontFamily="Montserrat-Bold, Montserrat"
                  fontSize="28"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="cursor-pointer select-none"
                  onClick={() => setActive(index)}
                >
                  {step.number}
                </text>

                <foreignObject x={x} y={95} width={180} height={50}>
                  <div className="flex justify-center">
                    <button
                      onClick={() => setActive(index)}
                      className={`w-full py-2 rounded-b-xl font-medium transition-all duration-300
                        ${
                          active === index
                            ? "bg-white text-black shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {step.title}
                    </button>
                  </div>
                </foreignObject>
              </g>
            );
          })}

          {/* Arrow at the end */}
          <path
            fill={active === 6 ? "#039" : "#ccc"}
            fillRule="nonzero"
            d="M1262.899 97L1321 48.505 1262.899 0 1262.899 29.103 1245 29.108 1245 67.906 1262.899 67.906z"
          />
        </svg>
      </div>
      {/* Process Content */}
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="bg-gradient-to-r from-blue-100 via-blue-50 to-indigo-100 
                  p-10 rounded-3xl 
                  border border-blue-200 
                  shadow-lg 
                  transition-all duration-300 
                  hover:shadow-2xl hover:scale-[1.01]"
        >
          <h3 className="text-3xl font-bold mb-6 text-blue-900">
            {steps[active].title}
          </h3>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {steps[active].description}
          </p>
        </div>
      </div>
    </section>
  );
}
