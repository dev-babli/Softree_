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
    <section className="relative bg #141414 py-12 text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-25%] left-[-15%] w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-25%] right-[-15%] w-[500px] h-[500px] bg-purple-600/20 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-16">
        {/* LEFT – CONTENT */}
        <div
          className="relative flex-1 p-9 rounded-[28px]
          bg-gradient-to-br from-gray-500/[0.10] via-black/[0.35] to-transparent
          backdrop-blur-2xl
          shadow-[0_30px_90px_rgba(0,0,0,0.4)]"
        >
          {/* Faded Border – Extra Bold */}
          <span className="absolute inset-0 pointer-events-none rounded-[28px]">
            <span
              className="absolute top-0 left-0 w-2/3 h-[4px]
    bg-gradient-to-r from-white/35 via-white/20 to-transparent"
            />

            <span
              className="absolute top-0 left-0 h-2/3 w-[4px]
    bg-gradient-to-b from-white/35 via-white/20 to-transparent"
            />

            <span
              className="absolute bottom-0 right-0 w-1/3 h-[3px]
    bg-gradient-to-l from-white/22 to-transparent"
            />

            <span
              className="absolute bottom-0 right-0 h-1/3 w-[3px]
    bg-gradient-to-t from-white/22 to-transparent"
            />
          </span>

          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full
            bg-white/10 border border-white/20
            text-xs uppercase tracking-[0.25em]"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Mobile App Specialists
          </span>

          <h2 className="text-4xl xl:text-5xl font-extrabold leading-tight">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-cyan-100 via-gray-300 to-pink-100 bg-clip-text text-transparent">
              Softree
            </span>{" "}
            for Mobile App Development?
          </h2>

          <p className="mt-6 text-gray-300 text-lg leading-relaxed max-w-xl">
            Softree helps businesses build high-performance mobile applications
            that deliver seamless user experiences across Android and iOS
            platforms.
          </p>

          <p className="mt-3 text-gray-400 text-base leading-relaxed max-w-xl">
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
      bg-white text-black
      shadow-[0_20px_60px_rgba(0,0,0,0.6)]
      hover:bg-gray-200
      hover:scale-105
      transition-all duration-300
    "
            >
              Talk to a Power Apps Expert
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>

        {/* RIGHT – STATS */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-12">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative p-7 rounded-[24px]
                bg-gradient-to-br from-gray-500/[0.10] via-black/[0.35] to-transparent
                backdrop-blur-2xl
                shadow-[0_25px_70px_rgba(0,0,0,0.35)]
                hover:-translate-y-2 transition-all duration-300"
              >
                {/* Faded Border – Extra Bold */}
                <span className="absolute inset-0 pointer-events-none rounded-[28px]">
                  <span
                    className="absolute top-0 left-0 w-2/3 h-[4px]
    bg-gradient-to-r from-white/35 via-white/20 to-transparent"
                  />

                  <span
                    className="absolute top-0 left-0 h-2/3 w-[4px]
    bg-gradient-to-b from-white/35 via-white/20 to-transparent"
                  />

                  <span
                    className="absolute bottom-0 right-0 w-1/3 h-[3px]
    bg-gradient-to-l from-white/22 to-transparent"
                  />

                  <span
                    className="absolute bottom-0 right-0 h-1/3 w-[3px]
    bg-gradient-to-t from-white/22 to-transparent"
                  />
                </span>

                {/* Icon */}
                <div
                  className="relative mb-4 w-12 h-12 rounded-xl
                  flex items-center justify-center
                  bg-gradient-to-br from-cyan-400/20 to-purple-500/20
                  border border-white/20"
                >
                  <Icon className="w-6 h-6 text-cyan-400 relative z-10" />
                </div>

                <h3 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-100 to-purple-500 bg-clip-text text-transparent">
                  {item.value}
                </h3>

                <p className="mt-2 text-gray-300 text-base">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
