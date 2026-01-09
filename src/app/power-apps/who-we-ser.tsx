"use client";

import React from "react";

const clients = [
  "Startups and SMBs accelerating digital transformation",
  "IT and Digital Teams driving automation and innovation",
  "Business Units like Operations, HR, and Finance improving workflows",
  "Enterprises leveraging Microsoft ecosystem at scale",
];

const WhoWeServe = () => {
  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text + Cards */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Who We Serve
            </h2>
            <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
              Softree Technology partners with organizations of all sizes to help
              them modernize, automate, and innovate using SharePoint, Power
              Platform, and Microsoft 365 solutions.
            </p>

            <div className="grid gap-6">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex items-start gap-4 hover:scale-105 transition-transform duration-500 shadow-lg hover:shadow-2xl"
                >
                  <span className="text-green-400 mt-2 flex-shrink-0">
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                    </svg>
                  </span>
                  <p className="text-left text-gray-100 text-lg md:text-xl">
                    {client}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="/about-us/"
                className="inline-block px-8 py-3 bg-green-500 text-gray-900 font-semibold rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
              >
                Learn More About Softree
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/images/power-apps/who.png"
              alt="Strategic Consulting Illustration"
              className="w-full max-w-xl md:max-w-3xl h-[500px] md:h-[600px] object-cover rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;
