"use client";

const industries = [
  "Healthcare",
  "Finance",
  "Restaurant",
  "eCommerce",
  "Logistics",
  "Social Networking",
  "Games and Sports",
  "Travel",
  "Aviation",
  "Real Estate",
  "Education",
  "On-Demand",
  "Entertainment",
  "Government",
  "Agriculture",
];

export default function IndustriesGrid() {
  return (
    <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* ===== Heading ===== */}
        <div className="max-w-3xl mx-auto text-center mb-5">
          {/* eyebrow */}
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-2">
            Industries
          </div>

          {/* title */}
          <h2 className="text-4xl md:text-5xl font-semibold text-zinc-900 leading-tight">
            Expertise Across Every Sector
          </h2>

          {/* description */}
          <p className="mt-3 text-lg text-zinc-600 leading-relaxed">
            We partner with organizations across industries to design, build,
            and scale intelligent digital solutions that create measurable
            impact.
          </p>

          {/* accent line */}
          <div className="mt-8 flex justify-center">
            <div className="h-px w-24 bg-zinc-300" />
          </div>
        </div>

        {/* ===== Grid ===== */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-zinc-200 rounded-3xl overflow-hidden shadow-sm">
          {industries.map((item, i) => (
            <div
              key={i}
              className="
        group
        relative
        bg-white
        flex flex-col items-center justify-center
        text-center
        gap-6
        px-6 py-14
        transition
        hover:bg-zinc-50
      "
            >
              {/* icon */}
              <div
                className="
          w-14 h-14
          rounded-2xl
          bg-zinc-900
          text-white
          flex items-center justify-center
          shadow-sm
          group-hover:scale-110
          transition
        "
              >
                ✦
              </div>

              {/* title */}
              <p className="text-zinc-800 font-medium">{item}</p>

              {/* subtle hover highlight */}
              <div className="absolute inset-0 border border-transparent group-hover:border-zinc-300 rounded-3xl pointer-events-none transition" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
