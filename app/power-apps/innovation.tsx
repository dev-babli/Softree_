"use client";

import React from "react";

const innovationPoints = [
  "We don’t just build apps; we create frameworks that empower your people to solve problems securely.",
];

const powerBIDeliverables = [
  "Dashboard design and data storytelling",
  "Power Query, DAX, and modeling setup",
  "Scheduled refresh & data gateway configuration",
  "Report sharing, embedding, and access control",
  "Workspace and governance setup",
];

const InnovationAndPowerBI = () => {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white">

      {/* Innovation Section */}
      <section className="relative py-24 px-6 md:px-16 overflow-hidden">
        {/* Background shapes */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gray-700 rounded-full opacity-10 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gray-600 rounded-full opacity-10 animate-pulse-slow"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Left: Text */}
          <div className="md:w-1/2 space-y-6 bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
              Innovation should be{" "}
              <span className="text-gray-300 underline decoration-gray-500">
                fast, secure, and human-centered
              </span>.
            </h2>

            <p className="text-gray-300">
              We’ve seen how SMEs and enterprises often get stuck between overworked IT and underutilized software. Softree changes that by blending scalable technology with enablement-first strategy.
            </p>

            {innovationPoints.map((point, idx) => (
              <p key={idx} className="text-gray-400 italic border-l-4 border-gray-500 pl-4">
                {point}
              </p>
            ))}

            <a
              href="/about-us/"
              className="inline-block mt-4 bg-gray-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
            >
              Know More About Us
            </a>
          </div>

          {/* Right: Image */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src="/images/power-apps/innovate.png"
              alt="Progress Overview"
              className="rounded-xl shadow-2xl w-full md:max-w-3xl h-[500px] md:h-[600px] object-cover transform transition-all duration-700 hover:scale-105 hover:-rotate-3"
            />
          </div>
        </div>
      </section>

      {/* Power BI Section */}
      <section className="relative py-24 px-6 md:px-16 overflow-hidden">
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Left: Image */}
          <div className="md:w-1/2 flex justify-center md:justify-start">
            <img
              src="/images/power-apps/power-apps.png"
              alt="Power BI Overview"
              className="rounded-2xl shadow-2xl w-full md:max-w-3xl h-[500px] md:h-[600px] object-cover transform transition-all duration-700 hover:scale-105 hover:-rotate-2"
            />
          </div>

          {/* Right: Text */}
          <div className="md:w-1/2 space-y-6 bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
              What We Deliver with <span className="text-gray-300">Power BI</span>
            </h2>

            <ul className="space-y-3">
              {powerBIDeliverables.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
                  </svg>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-gray-400 mt-2">
              Whether you’re starting from scratch or scaling across departments, we build reports your business can rely on.
            </p>

            <a
              href="/about-us/"
              className="inline-block mt-4 bg-gray-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
            >
              Know More About Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InnovationAndPowerBI;
