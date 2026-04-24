"use client";

import { Clock, Users, Headset, CheckCircle2, ArrowRight } from "lucide-react";

export default function FlexibleEngagementModels() {
  return (
    <section
      id="flexible-engagement-models"
      className="relative py-24 bg-gradient-to-b from-black via-[#020d1a] to-black"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* ================= HEADING ================= */}
        <h2 className="mb-6 text-center text-4xl font-semibold text-gray-100">
          Flexible Engagement Models for{" "}
          <span
            className="inline-block bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #ff7a2f 0%, #c75a2a 35%, #6b5b5b 70%, #3a3a3a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Consulting Partners
          </span>
        </h2>

        <p className="mb-16 text-center text-gray-400 max-w-2xl mx-auto">
          Structured to align with your delivery strategy and project lifecycle.
        </p>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          {/* ================= LEFT HIGHLIGHTS ================= */}
          <div className="h-full flex flex-col gap-6">
            {[
              { icon: Users, title: "Dedicated Engineering Teams" },
              { icon: Clock, title: "Project-Based Delivery" },
              { icon: Headset, title: "On-Demand Technical Support" },
            ].map((item, i) => (
              <div
                key={i}
                className="
        group relative overflow-hidden
        flex items-center gap-5
        rounded-2xl
        bg-white/5
        backdrop-blur-md
        border border-white/10
        p-6
        transition-all duration-300
        hover:bg-white/10
        hover:shadow-[0_0_25px_rgba(255,122,47,0.15)]
      "
              >
                {/* Left Accent Line */}
                <span
                  className="absolute left-0 top-0 h-full w-1 opacity-80 group-hover:opacity-100 transition"
                  style={{
                    background:
                      "linear-gradient(180deg, #ff7a2f 0%, #c75a2a 35%, #6b5b5b 70%, #3a3a3a 100%)",
                  }}
                />

                {/* Icon */}
                <div
                  className="
          flex h-12 w-12 items-center justify-center
          rounded-xl
          text-white
          shadow-md
          group-hover:scale-110
          transition
        "
                  style={{
                    background:
                      "linear-gradient(135deg, #ff7a2f 0%, #c75a2a 35%, #3a3a3a 100%)",
                  }}
                >
                  <item.icon className="h-6 w-6" />
                </div>

                {/* Text */}
                <h3 className="text-base font-bold tracking-tight text-white">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          {/* ================= ENGAGEMENT CARDS ================= */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:col-span-3 items-stretch">
            {[
              {
                title: "Dedicated Engineering Teams",
                highlight: true,
                features: [
                  "White-label support",
                  "Direct PM collaboration",
                  "Scalable team structure",
                  "Microsoft & modern engineering expertise",
                  "Long-term delivery continuity & knowledge retention",
                ],
              },
              {
                title: "Project-Based Delivery",
                features: [
                  "Defined scope & SLAs",
                  "Architecture-to-deployment delivery",
                  "Transparent reporting",
                  "On-time implementation",
                  " Risk-managed execution with governance controls",
                ],
              },
              {
                title: "On-Demand Technical Support",
                features: [
                  "Architecture advisory",
                  "Code audits & optimization",
                  "Performance tuning",
                  "Production support",
                  "Rapid issue resolution & expert escalation support",
                ],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative group h-full ${plan.highlight ? "scale-[1.04]" : ""}`}
              >
                {!plan.highlight ? (
                  /* ================= NORMAL CARDS ================= */
                  <div
                    className="h-full rounded-[28px] p-[1.5px] transition duration-500 group-hover:opacity-90"
                    style={{
                      background:
                        "linear-gradient(135deg, #ff7a2f 0%, #c75a2a 35%, #6b5b5b 70%, #3a3a3a 100%)",
                    }}
                  >
                    <div
                      className="
    h-full rounded-[28px] p-[1.5px]
    transition-all duration-500
    group-hover:scale-[1.02]
    group-hover:shadow-[0_0_40px_rgba(255,122,47,0.35)]
  "
                      style={{
                        background:
                          "linear-gradient(135deg, #ff7a2f 0%, #c75a2a 35%, #6b5b5b 70%, #3a3a3a 100%)",
                      }}
                    >
                      <div className="h-full rounded-[28px] bg-[#0b1220] p-8 backdrop-blur-md flex flex-col">
                        <h3 className="mb-6 text-xl font-bold text-white tracking-tight">
                          {plan.title}
                        </h3>

                        <ul className="space-y-4 text-sm text-gray-300 flex-grow">
                          {plan.features.map((f, idx) => (
                            <li
                              key={idx}
                              className="flex gap-3 leading-relaxed"
                            >
                              {/* Updated Icon Color */}
                              <CheckCircle2 className="h-5 w-5 shrink-0 text-orange-400" />

                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ================= HIGHLIGHT CARD ================= */
                  <div
                    className="h-full relative rounded-[28px] p-8 text-white shadow-[0_25px_70px_rgba(0,0,0,0.6)] flex flex-col"
                    style={{
                      background:
                        "linear-gradient(90deg, #ff7a2f 0%, #c75a2a 35%, #6b5b5b 70%, #3a3a3a 100%)",
                    }}
                  >
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-5 py-1 text-xs font-bold text-black shadow-lg tracking-wide">
                      RECOMMENDED
                    </span>

                    <h3 className="mb-6 text-xl font-bold tracking-tight">
                      {plan.title}
                    </h3>

                    <ul className="space-y-4 text-sm text-white/90 flex-grow">
                      {plan.features.map((f, idx) => (
                        <li key={idx} className="flex gap-3 leading-relaxed">
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-white" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ================= CTA ================= */}
        <div className="mt-14 text-center">
          <a
            href="/contact"
            className="
      group inline-flex items-center gap-3
      rounded-full
      px-10 py-4
      text-sm font-semibold
      text-white
      shadow-md
      hover:shadow-lg
      hover:scale-105
      transition-all duration-300
    "
            style={{
              background:
                "linear-gradient(90deg, #ff7a2f 0%, #c75a2a 35%, #2a2525ff 70%, #3a3a3a 100%)",
            }}
          >
            Discuss Your Engagement Model
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
