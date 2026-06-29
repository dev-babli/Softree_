"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/homepage-light/SectionHeader";

const ACCENT = "#FF5812" as const;

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
      data-section="web-dev-quality"
      className="relative overflow-hidden py-16 md:py-20"
    >
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <SectionHeader
            badge="Quality framework"
            accent={ACCENT}
            headline="Our standard for building reliable, scalable web experiences"
            body="We follow a disciplined framework that ensures performance, security, and scalability at every stage — from thoughtful design to production-ready engineering."
            className="mx-auto items-center [&_p]:mx-auto"
          />
        </div>

        {/* ================= Timeline ================= */}
        <div className="relative">
          {/* line */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-[#0a0a1a]/10" />

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
                            bg-[#0a0a0a] text-white
                            shadow-[0_24px_60px_-24px_rgba(10,10,26,0.45)] scale-[1.02]
                          `
                          : `
                            border border-[#0a0a1a]/[0.06] bg-white
                            text-[#0a0a1a]
                            shadow-[0_12px_40px_-24px_rgba(10,10,26,0.12)] hover:shadow-[0_24px_60px_-32px_rgba(10,10,26,0.18)]
                          `
                      }
                    `}
                  >
                    {/* Title */}
                    <h3
                      className={`mb-6 text-lg font-semibold ${
                        isFeatured ? "text-white" : "text-[#0a0a1a]"
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Points */}
                    <ul
                      className={`space-y-4 text-left text-sm ${
                        isFeatured ? "text-white/70" : "text-[#0a0a1a]/65"
                      }`}
                    >
                      {item.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          {/* aligned icon */}
                          <span
                            className={`
                              flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5
                              ${isFeatured ? "bg-white/15" : "bg-[#FF5812]/10"}
                            `}
                          >
                            <CheckCircle2
                              className={`w-4 h-4 ${
                                isFeatured ? "text-white" : "text-[#FF5812]"
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
