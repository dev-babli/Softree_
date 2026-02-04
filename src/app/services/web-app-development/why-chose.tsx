"use client";

import {
  Award,
  Globe,
  Users,
  Settings,
  Briefcase,
  Smile,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function WhyChooseSoftreeWebDevelopment() {
  const stats = [
    { value: "10+", label: "Years of Web Development Expertise", icon: Award },
    { value: "200+", label: "Web Projects Delivered", icon: Globe },
    { value: "50+", label: "Skilled Web Engineers", icon: Users },
    { value: "400+", label: "Advanced Features Implemented", icon: Settings },
    { value: "25+", label: "Industries Served Worldwide", icon: Briefcase },
    { value: "98%", label: "Client Satisfaction Rate", icon: Smile },
  ];

  return (
    <section className="relative overflow-hidden py-10 bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="relative max-w-7xl mx-auto flex flex-col xl:flex-row gap-16 px-6">
        {/* ================= LEFT – CONTENT ================= */}
        <div
          className="
            flex-1 p-12 rounded-3xl
            bg-white/80 backdrop-blur-xl
            border border-gray-200
            shadow-xl
          "
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-wider">
            <Sparkles className="w-4 h-4" />
            Web Development Experts
          </span>

          <h2 className="text-4xl xl:text-5xl font-bold leading-tight text-gray-900">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Softree
            </span>{" "}
            for Web Development?
          </h2>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
            Softree builds high-performance, scalable web applications that help
            businesses grow, engage users, and stand out in competitive markets.
          </p>

          <p className="mt-3 text-gray-500 leading-relaxed max-w-xl">
            Our team combines modern technologies, clean architecture, and
            user-centric design to deliver secure, future-ready solutions that
            are easy to scale and maintain.
          </p>

          {/* CTA */}
          <div className="mt-8">
            <button
              className="
                group inline-flex items-center gap-3 px-8 py-4
                rounded-xl font-semibold
                bg-gradient-to-r from-blue-600 to-indigo-600
                text-white
                shadow-lg hover:shadow-xl
                hover:scale-105
                transition-all duration-300
              "
            >
              Talk to a Web Expert
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>

        {/* ================= RIGHT – STATS ================= */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  relative p-8 rounded-3xl
                  bg-white/80 backdrop-blur-xl
                  border border-gray-200
                  shadow-md hover:shadow-xl
                  hover:-translate-y-1
                  transition-all duration-300
                "
              >
                {/* Icon */}
                <div className="mb-5 w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 text-blue-600">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Number */}
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {item.value}
                </h3>

                {/* Label */}
                <p className="mt-2 text-gray-600 text-sm">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
