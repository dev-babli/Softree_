"use client";

import {
  Award,
  AppWindow,
  Users,
  Settings,
  Briefcase,
  Smile,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function WhyChooseSoftreePowerApps() {
  const stats = [
    { value: "10+", label: "Years of Power Platform Experience", icon: Award },
    { value: "200+", label: "Power Apps Delivered", icon: AppWindow },
    { value: "50+", label: "Certified Power Platform Experts", icon: Users },
    { value: "400+", label: "Automations & Workflows Built", icon: Settings },
    { value: "25+", label: "Industries Served", icon: Briefcase },
    { value: "98%", label: "Client Satisfaction Rate", icon: Smile },
  ];

  return (
    <section className="relative bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col xl:flex-row gap-16">

        {/* ================= LEFT CONTENT ================= */}
        <div
          className="
            flex-1 p-10 rounded-[28px]
            bg-gradient-to-b from-white to-gray-50
            border border-gray-200

            shadow-[0_10px_30px_rgba(0,0,0,0.05)]
            hover:shadow-[0_35px_80px_rgba(37,99,235,0.15)]
            hover:-translate-y-2
            hover:scale-[1.01]

            transition-all duration-500 ease-out
            will-change-transform
          "
        >
          {/* Badge */}
          <span
            className="
              inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full
              bg-blue-50 text-blue-600 text-xs font-semibold
              tracking-[0.2em] uppercase
            "
          >
            <Sparkles className="w-4 h-4" />
            Power Apps Specialists
          </span>

          {/* Heading */}
          <h2 className="text-4xl xl:text-5xl font-bold leading-tight text-gray-900">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Softree
            </span>{" "}
            for Power Apps Development?
          </h2>

          {/* Description */}
          <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
            We design and build scalable Microsoft Power Apps solutions that
            automate workflows, streamline operations, and improve productivity
            across your organization.
          </p>

          <p className="mt-3 text-gray-500 leading-relaxed max-w-xl">
            From Canvas Apps to Model-Driven Apps and Power Automate, our team
            delivers secure, enterprise-ready solutions integrated with
            SharePoint, Dataverse, and Microsoft 365.
          </p>

          {/* CTA */}
          <div className="mt-8">
            <button
              className="
                group inline-flex items-center gap-3 px-8 py-4
                rounded-xl font-semibold

                bg-blue-600 text-white
                hover:bg-blue-700
                hover:-translate-y-1
                hover:shadow-[0_18px_45px_rgba(37,99,235,0.35)]

                transition-all duration-300
              "
            >
              Talk to a Power Apps Expert
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>

        {/* ================= RIGHT STATS ================= */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  p-7 rounded-[24px]
                  bg-white
                  border border-gray-200

                  shadow-[0_8px_25px_rgba(0,0,0,0.04)]
                  hover:shadow-[0_30px_70px_rgba(37,99,235,0.18)]

                  hover:-translate-y-3
                  hover:scale-[1.04]

                  transition-all duration-500 ease-out
                  will-change-transform
                "
              >
                {/* Icon */}
                <div
                  className="
                    mb-4 w-12 h-12 rounded-xl
                    flex items-center justify-center
                    bg-blue-50
                  "
                >
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>

                {/* Value */}
                <h3 className="text-3xl font-bold text-gray-900">
                  {item.value}
                </h3>

                {/* Label */}
                <p className="mt-2 text-gray-600 text-base">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
