"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function QualityBenchmarkUltra() {
  const steps = [
    {
      step: "01",
      title: "Experience-Driven Design",
      points: [
        "User-first UX strategy backed by research",
        "Consistent brand identity across interfaces",
        "Mobile-first, fully responsive layouts",
        "Modern UI crafted for engagement & conversion",
      ],
    },
    {
      step: "02",
      title: "Engineering Excellence",
      points: [
        "Clean, modular & scalable code architecture",
        "Industry-proven development standards",
        "Git-driven workflows with version control",
        "Automated testing for reliability & quality",
      ],
    },
    {
      step: "03",
      title: "Enterprise-Grade Security",
      points: [
        "Security-first development lifecycle",
        "Continuous vulnerability monitoring",
        "Secure cloud & infrastructure hardening",
        "Data encryption and access control policies",
      ],
    },
  ];

  return (
    <section
      id="plan-pricing"
      className="relative overflow-hidden py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        {/* ================= Header ================= */}
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-orange-600">
            Quality Framework
          </span>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
            Our Standard for Building{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Reliable, Scalable
            </span>{" "}
            Web Experiences
          </h2>

          <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We follow a disciplined framework that ensures performance,
            security, and scalability at every stage — from thoughtful design to
            production-ready engineering.
          </p>
        </div>

        {/* ================= Timeline ================= */}
        <div className="relative">
          {/* line */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-gray-200" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((item, index) => {
              const isFeatured = index === 1; // middle card highlighted

              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* ================= Step Number (mirror style) ================= */}
                  <div
                    className="
                      relative z-10 mb-10
                      flex h-14 w-14 items-center justify-center
                      rounded-full
                      bg-gradient-to-br from-white via-gray-100 to-gray-300
                      border border-gray-200
                      shadow-lg
                      before:absolute before:inset-0 before:rounded-full
                      before:bg-gradient-to-t before:from-white/40 before:to-transparent
                    "
                  >
                    <span className="text-sm font-semibold text-gray-900">
                      {item.step}
                    </span>
                  </div>

                  {/* ================= Card ================= */}
                  <div
                    className={`
                      w-full min-h-[340px]
                      rounded-3xl p-10
                      transition-all duration-300

                      ${
                        isFeatured
                          ? `
                            bg-gradient-to-r from-black via-[#4c1c02] to-black
                            text-white
                            shadow-2xl scale-[1.04]
                          `
                          : `
                            bg-white/80 backdrop-blur-xl
                            border border-gray-200
                            text-gray-900
                            shadow-md hover:shadow-xl
                          `
                      }
                    `}
                  >
                    {/* Title */}
                    <h3
                      className={`mb-6 text-lg font-semibold ${
                        isFeatured ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Points */}
                    <ul
                      className={`space-y-4 text-sm text-left ${
                        isFeatured ? "text-zinc-300" : "text-gray-600"
                      }`}
                    >
                      {item.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          {/* aligned icon */}
                          <span
                            className={`
                              flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5
                              ${isFeatured ? "bg-white/20" : "bg-orange-50"}
                            `}
                          >
                            <CheckCircle2
                              className={`w-4 h-4 ${
                                isFeatured ? "text-white" : "text-orange-600"
                              }`}
                            />
                          </span>

                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
