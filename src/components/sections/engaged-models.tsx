import React from "react";

export default function SelectedEngagements() {
  const engagements = [
    {
      title: "Power Platform Automation Suite",
      tech: "Power Apps | Power Automate",
      result: "Processing reduced manual effort by 60%",
      icon: "⚙️",
    },
    {
      title: "Enterprise Data Modernization",
      tech: "Microsoft Fabric | Databricks | Power BI",
      result: "Delivering BI at scale analytics environment",
      icon: "📊",
    },
    {
      title: "AI Powered Support Agent",
      tech: "Azure AI | Dynamics 365 | Copilot Studio",
      result: "Improving response accuracy by 40%",
      icon: "🤖",
    },
  ];

  return (
    <section className="py-14 px-6 bg-gradient-to-b from-black via-[#020d1a] to-black text-white">
      {/* ================= HEADING ================= */}
      <div className="text-center mb-12">
        <h2
          className="
    text-3xl md:text-4xl
    font-semibold
    bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400
    bg-clip-text text-transparent
  "
        >
          Selected Engagements
        </h2>

        {/* subtle divider */}
        <div className="mt-4 flex justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
        </div>
      </div>
      {/* ================= CARDS ================= */}
      <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
        {engagements.map((item, i) => (
          <div
            key={i}
            className="
        group relative
        w-[380px]
        rounded-2xl
        p-7
        border border-white/10
        bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.15),transparent_40%),linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.03)_40%,rgba(0,0,0,0.4))]
        backdrop-blur-xl
        transition-all duration-500
        hover:-translate-y-3
        hover:border-blue-400/40
        hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)]
      "
          >
            {/* shine overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40" />

            {/* TOP */}
            <div className="flex items-start gap-4">
              {/* icon container */}
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-400/20 text-2xl">
                {item.icon}
              </div>

              <div className="flex-1">
                <h3
                  className="
  text-lg font-semibold leading-snug
  whitespace-nowrap overflow-hidden text-ellipsis
  bg-gradient-to-r from-blue-400 to-cyan-300
  bg-clip-text text-transparent
"
                >
                  {item.title}
                </h3>

                {/* tech */}
                <div className="mt-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-500 border border-white/10 text-white/70">
                    {item.tech}
                  </span>
                </div>
              </div>
            </div>

            {/* divider */}
            <div className="h-px bg-white/10 my-5" />

            {/* RESULT */}
            <p className="text-sm text-blue-300 font-medium leading-relaxed">
              {item.result}
            </p>

            {/* learn more */}
            <div className="mt-5 flex items-center text-xs text-white/60 group-hover:text-white transition">
              View Case Study
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
