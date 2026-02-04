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

export default function WhyChooseSoftreeMobileAppDevelopment() {
  const stats = [
    { value: "10+", label: "Years of Mobile App Experience", icon: Award },
    { value: "150+", label: "Mobile Apps Delivered", icon: AppWindow },
    { value: "45+", label: "Certified Mobile Developers", icon: Users },
    { value: "300+", label: "App Features Implemented", icon: Settings },
    { value: "20+", label: "Industries Served", icon: Briefcase },
    { value: "98%", label: "Client Satisfaction Rate", icon: Smile },
  ];

  return (
    <section className="relative bg #141414  text-white overflow-hidden">
     

      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-16">
        {/* LEFT – CONTENT */}
        <div
          className="relative flex-1 p-9 rounded-[28px]
    bg-gradient-to-b from-white to-slate-50

    border border-gray-200

    transition-all duration-300"
        >
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full
      bg-gray-100 border border-gray-200
      text-xs uppercase tracking-[0.25em] text-gray-700"
          >
            <Sparkles className="w-4 h-4 text-cyan-500" />
            Mobile App Specialists
          </span>

          <h2 className="text-4xl xl:text-5xl font-extrabold leading-tight text-black">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Softree
            </span>{" "}
            for Mobile App Development?
          </h2>

          <p className="mt-6 text-gray-700 text-lg leading-relaxed max-w-xl">
            Softree helps businesses build high-performance mobile applications
            that deliver seamless user experiences across Android and iOS
            platforms.
          </p>

          <p className="mt-3 text-gray-600 text-base leading-relaxed max-w-xl">
            Our expert team designs secure, scalable, and user-centric mobile
            apps using modern frameworks, ensuring long-term performance and
            easy maintenance.
          </p>

          {/* CTA */}
          <div className="mt-8">
            <button
              className="
        group inline-flex items-center gap-3 px-8 py-4
        rounded-xl font-semibold
        bg-black text-white
        shadow-[0_12px_35px_rgba(0,0,0,0.15)]
        hover:bg-gray-900 hover:scale-105
        transition-all duration-300
      "
            >
              Talk to a Power Apps Expert
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>

        {/* RIGHT – STATS */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="relative p-7 rounded-[24px]
bg-gradient-to-b from-white via-slate-50 to-sky-50
          border border-gray-200
    
          transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className="mb-4 w-12 h-12 rounded-xl
            flex items-center justify-center
            bg-gray-100 border border-gray-200"
                >
                  <Icon className="w-6 h-6 text-cyan-600" />
                </div>

                <h3 className="text-3xl font-extrabold text-black">
                  {item.value}
                </h3>

                <p className="mt-2 text-gray-600 text-base">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
