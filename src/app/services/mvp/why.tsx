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
import { motion } from "framer-motion";

export default function WhyChooseSoftreeMvpDevelopment() {
  const stats = [
    { value: "10+", label: "Years of MVP & Product Experience", icon: Award },
    { value: "180+", label: "MVPs & Products Launched", icon: AppWindow },
    { value: "50+", label: "Product & MVP Specialists", icon: Users },
    { value: "400+", label: "Core MVP Features Built", icon: Settings },
    { value: "25+", label: "Industries Validated", icon: Briefcase },
    { value: "97%", label: "Founder Satisfaction Rate", icon: Smile },
  ];

  return (
    <section className="relative overflow-hidden py-28 bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="relative max-w-7xl mx-auto flex flex-col xl:flex-row gap-16 px-6">
        {/* ================= LEFT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
            MVP Development Experts
          </span>

          <h2 className="text-4xl xl:text-5xl font-bold leading-tight text-gray-900">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Softree
            </span>{" "}
            for MVP Development?
          </h2>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
            Softree helps startups and founders transform ideas into{" "}
            <span className="font-semibold text-gray-900">validated MVPs</span>{" "}
            that attract users, prove market demand, and impress investors.
          </p>

          <p className="mt-3 text-gray-500 leading-relaxed max-w-xl">
            We follow a lean MVP-first approach — building only what matters,
            reducing risk, accelerating time-to-market, and laying a strong
            foundation for scalability.
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
              Validate Your MVP Idea
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </motion.div>

        {/* ================= RIGHT ================= */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className="
                  relative p-8 rounded-3xl
                  bg-white/80 backdrop-blur-xl
                  border border-gray-200
                  shadow-md hover:shadow-xl
                  transition-all
                "
              >
                {/* Icon */}
                <div className="mb-5 w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 text-blue-600">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {item.value}
                </h3>

                <p className="mt-2 text-gray-600 text-sm">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
