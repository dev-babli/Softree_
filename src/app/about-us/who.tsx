"use client";

import React from "react";

export default function WhoWeAre() {
  return (
    <section className="w-full  py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-10 md:p-14">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT IMAGE */}
            <div className="w-full">
              <img
                src="/images/business.png"
                alt="Team Meeting"
                className="rounded-2xl shadow-lg w-full object-cover"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div>
              <h2 className="text-3xl font-bold text-indigo-700 mb-4">
                Who We Are
              </h2>

              <p className="text-slate-600 mb-8 leading-relaxed">
                Softree is an engineering-driven technology company empowering
                enterprises and consulting partners to drive digital
                transformation.
              </p>

              {/* SERVICES GRID */}
              <div className="grid sm:grid-cols-2 gap-x-12">
                {/* Column 1 */}
                <ul>
                  {[
                    "Microsoft Business Applications",
                    "Data & AI Platforms",
                    "Modern Web & Mobile Engineering",
                  ].map((service, index) => (
                    <li
                      key={index}
                      className="
              group relative
              flex items-center gap-4
              py-4
              border-b border-slate-200
              cursor-pointer
            "
                    >
                      <span
                        className="
              flex items-center justify-center
              w-6 h-6 rounded-full
              bg-indigo-50 text-indigo-600
              transition duration-300
              group-hover:bg-indigo-600
              group-hover:text-white
            "
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>

                      <span
                        className="
              text-slate-700 font-medium
              transition duration-300
              group-hover:text-indigo-600
            "
                      >
                        {service}
                      </span>

                      {/* Animated Hover Border */}
                      <span
                        className="
                absolute bottom-0 left-0
                h-[2px] w-0
                bg-indigo-600
                transition-all duration-300
                group-hover:w-full
              "
                      ></span>
                    </li>
                  ))}
                </ul>

                {/* Column 2 */}
                <ul>
                  {["Cloud & DevOps Solutions", "Intelligent Automation"].map(
                    (service, index) => (
                      <li
                        key={index}
                        className="
              group relative
              flex items-center gap-4
              py-4
              border-b border-slate-200
              cursor-pointer
            "
                      >
                        <span
                          className="
              flex items-center justify-center
              w-6 h-6 rounded-full
              bg-indigo-50 text-indigo-600
              transition duration-300
              group-hover:bg-indigo-600
              group-hover:text-white
            "
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>

                        <span
                          className="
              text-slate-700 font-medium
              transition duration-300
              group-hover:text-indigo-600
            "
                        >
                          {service}
                        </span>

                        <span
                          className="
                absolute bottom-0 left-0
                h-[2px] w-0
                bg-indigo-600
                transition-all duration-300
                group-hover:w-full
              "
                        ></span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
