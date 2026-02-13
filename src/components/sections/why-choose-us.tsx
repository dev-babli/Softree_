"use client";

import {
  Calendar,
  Handshake,
  Rocket,
  Users,
  Sliders,
  RefreshCcw,
} from "lucide-react";

const timeline = [
  {
    icon: Calendar,
    title: "Since 2013",
    desc: "A decade of proven delivery across industries, technologies, and global clients.",
  },
  {
    icon: Handshake,
    title: "White-Label Friendly Delivery",
    desc: "We work behind the scenes as your trusted execution partner while you own the spotlight.",
  },
  {
    icon: Rocket,
    title: "Agile Engineering",
    desc: "Rapid iterations, continuous delivery, and fast adaptation to change.",
  },
  {
    icon: Users,
    title: "Direct Leadership Access",
    desc: "Stay connected with decision-makers for faster communication and alignment.",
  },
  {
    icon: Sliders,
    title: "Flexible Engagement",
    desc: "Team structures and models that scale as your business evolves.",
  },
  {
    icon: RefreshCcw,
    title: "Long-Term Partnership",
    desc: "We stay beyond launch with optimization, innovation, and support.",
  },
];

export default function WhyChooseUsTimeline() {
  return (
    <section className="relative py-24 text-white bg-gradient-to-b from-black via-[#020d1a] to-black overflow-hidden">
      {/* glow lights */}
      <div className="absolute top-24 left-10 w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-24 right-10 w-72 h-72 bg-indigo-600/20 blur-[120px] rounded-full" />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="relative text-center max-w-4xl mx-auto mb-14">
          {/* small top label */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-blue-400 tracking-wide mb-6">
            Our Difference
          </div>

          {/* main heading */}
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Why{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 bg-clip-text text-transparent">
              Softree
            </span>
          </h2>

          {/* description */}
          <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
            Delivering reliable software through proven expertise, agile
            execution, and direct leadership involvement in every engagement.
          </p>

          {/* divider line */}
          <div className="mt-10 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />
        </div>

        {/* vertical line */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-600 via-indigo-600 to-transparent" />

          {/* items */}
          <div className="space-y-14">
            {timeline.map((item, i) => {
              const Icon = item.icon;

              return (
                <div key={i} className="relative flex gap-6 group items-start">
                  {/* icon */}
                  <div
                    className="relative z-10 flex items-center justify-center w-12 h-12 rounded-xl 
  bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg
  transition-all duration-300 group-hover:scale-105 group-hover:shadow-blue-500/40"
                  >
                    <Icon size={20} />
                  </div>

                  {/* content */}
                  <div
                    className="flex-1 relative p-7 rounded-2xl border border-white/10 
    bg-gradient-to-b from-white/5 to-white/[0.03] 
    backdrop-blur-md
    transition-all duration-300
    group-hover:border-white/20 group-hover:from-white/10 group-hover:to-white/5"
                  >
                    {/* subtle hover glow */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-r from-blue-600/10 to-indigo-600/10" />

                    {/* title */}
                    <h3 className="relative text-xl md:text-2xl font-semibold tracking-tight mb-3 text-white">
                      {item.title}
                    </h3>

                    {/* description */}
                    <p className="relative text-white/65 leading-relaxed text-[15px] md:text-base">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
