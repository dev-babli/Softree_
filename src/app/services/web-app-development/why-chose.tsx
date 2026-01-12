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
    <section className="relative bg-gradient-to-br from-black via-[#0B1220] to-[#0F1A2E] py-32 text-white overflow-hidden">
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
          {/* Faded Border */}
          <span className="absolute inset-0 pointer-events-none rounded-[28px]">
            <span className="absolute top-0 left-0 w-2/3 h-[2px] bg-gradient-to-r from-cyan-400/70 via-purple-500/35 to-transparent" />
            <span className="absolute top-0 left-0 h-2/3 w-[2px] bg-gradient-to-b from-cyan-400/70 via-purple-500/35 to-transparent" />
            <span className="absolute bottom-0 right-0 w-1/3 h-[1px] bg-gradient-to-l from-purple-500/30 to-transparent" />
            <span className="absolute bottom-0 right-0 h-1/3 w-[1px] bg-gradient-to-t from-purple-500/30 to-transparent" />
          </span>

          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full
            bg-white/10 border border-white/20
            text-xs uppercase tracking-[0.25em]"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Web Development Experts
          </span>

          <h2 className="text-4xl xl:text-5xl font-extrabold leading-tight">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Softree
            </span>{" "}
            for Web Development?
          </h2>

          <p className="mt-6 text-gray-300 text-lg leading-relaxed max-w-xl">
            Softree builds high-performance, scalable web applications that help
            businesses grow, engage users, and stand out in competitive digital
            markets.
          </p>

          <p className="mt-3 text-gray-400 text-base leading-relaxed max-w-xl">
            Our web development team combines modern technologies, clean
            architecture, and user-centric design to deliver secure,
            future-ready solutions that are easy to scale and maintain.
          </p>

          {/* CTA */}
          <div className="mt-8">
            <button
              className="group inline-flex items-center gap-3 px-8 py-4
              rounded-xl font-semibold
              bg-gradient-to-r from-cyan-500 to-purple-600
              shadow-[0_18px_50px_rgba(56,189,248,0.4)]
              hover:shadow-[0_22px_70px_rgba(168,85,247,0.55)]
              transition-all duration-300"
            >
              Talk to a Web Development Expert
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
                {/* Faded Border */}
                <span className="absolute inset-0 pointer-events-none rounded-[24px]">
                  <span className="absolute top-0 left-0 w-2/3 h-[2px] bg-gradient-to-r from-cyan-400/60 via-purple-500/30 to-transparent" />
                  <span className="absolute top-0 left-0 h-2/3 w-[2px] bg-gradient-to-b from-cyan-400/60 via-purple-500/30 to-transparent" />
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

                <h3 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
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
