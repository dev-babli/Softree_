"use client";

export default function TestimonialsSplitSlider() {
  const testimonials = [
    {
      name: "Rachel Green",
      role: "HR Manager",
      text: "Softree automated our HR workflows using Power Platform, reducing manual tasks and saving hours every week.",
    },
    {
      name: "Olivia Carter",
      role: "UX Designer",
      text: "Their SharePoint and Power Apps solutions improved collaboration and centralized content across teams.",
    },
    {
      name: "Allison Lee",
      role: "Operations Lead",
      text: "Power Automate flows built by Softree streamlined approvals and boosted efficiency across departments.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-4">
      {/* Blue wrapper ONLY around 7xl */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white rounded-3xl px-8 py-12 shadow-2xl">
        <div className="flex flex-col items-center gap-12">
          {/* ================= TOP PANEL ================= */}
          <div className="relative space-y-4 text-center max-w-2xl">
            {/* quote circle */}
            <div className="mx-auto w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl font-bold shadow">
              "
            </div>

            {/* heading */}
            <h2 className="text-3xl md:text-4xl font-semibold leading-snug">
              What Our Clients Say
            </h2>

            {/* description */}
            <p className="text-blue-100 text-sm md:text-base leading-relaxed">
              Trusted by enterprises worldwide. Discover how our Power Platform,
              SharePoint and automation solutions transform businesses.
            </p>

            {/* rating */}
            <div className="flex items-center justify-center gap-3 text-sm">
              <div className="text-yellow-400">★★★★★</div>
              <span className="text-blue-200">4.9/5 • 200+ reviews</span>
            </div>

            {/* CTA */}
            <button
              className="
            mt-2 px-5 py-2.5
            bg-white text-blue-900
            rounded-xl font-medium
            shadow-md
            hover:shadow-xl hover:-translate-y-0.5
            transition
          "
            >
              Contact Us →
            </button>
          </div>

          {/* ================= BOTTOM SLIDER ================= */}
          <div className="relative overflow-hidden w-full">
            <div className="mask-fade">
              <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-6">
                    {testimonials.map((t, index) => (
                      <div
                        key={index + i}
                        className="
                group relative
                w-[300px]
                rounded-2xl
                p-6 space-y-4
                bg-gradient-to-br from-zinc-900/90 via-white/80 to-blue-100/80
                backdrop-blur-xl
                border border-white/40
                shadow-lg
                transition-all duration-300
                hover:-translate-y-2
                hover:shadow-2xl
              "
                      >
                        {/* mirror shine */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-60 pointer-events-none" />

                        <div className="relative space-y-4 text-zinc-800">
                          {/* top row */}
                          <div className="flex items-center justify-between">
                            <span className="text-blue-600 text-2xl font-bold">
                              "
                            </span>
                            <div className="text-yellow-400 text-xs">★★★★★</div>
                          </div>

                          {/* text */}
                          <p className="text-sm text-zinc-700 leading-relaxed">
                            {t.text}
                          </p>

                          {/* ================= USER ================= */}
                          <div className="pt-3">
                            {/* ✅ FIXED WIDTH DIVIDER */}
                            <div className="w-16 h-px bg-zinc-400/60 mb-3 rounded-full" />

                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-semibold shadow-md text-sm">
                                {t.name.charAt(0)}
                              </div>

                              <div>
                                <p className="font-semibold text-sm">
                                  {t.name}
                                </p>
                                <p className="text-xs text-zinc-500">
                                  {t.role}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
