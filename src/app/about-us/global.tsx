"use client";

const locations = [
  { top: "42.6%", left: "19.1%" },
  { top: "52.3%", left: "70.1%" },
  { top: "71.2%", left: "29.1%" },
  { top: "34.5%", left: "56.5%" },
];

export default function GlobalDelivery() {
  return (
    <section className="w-full py-10 lg:py-10 text-white">
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* ===== IMAGE WRAPPER ===== */}
        <div className="relative w-full h-[600px] rounded-3xl overflow-hidden">
          {/* Background Image */}
          <img
            src="/images/map.png"
            alt="Global delivery map"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />

          {/* Overlay gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

          {/* Pins */}
          {locations.map((loc, i) => (
            <span
              key={i}
              className="
            absolute
            w-3 h-3
            rounded-full
            bg-cyan-400
            shadow-[0_0_15px_rgba(34,211,238,0.9)]
            animate-pulse
          "
              style={{ top: loc.top, left: loc.left }}
            />
          ))}

          {/* ===== CONTENT CARD ===== */}
          <div
            className="
          absolute
          right-6
          top-12
          bottom-12
          w-full
          max-w-xl
          rounded-3xl
          p-10
          bg-gradient-to-br
          from-neutral-900/95
          via-neutral-900/90
          to-neutral-800/90
          backdrop-blur-2xl
          border border-white/10
          shadow-[0_40px_120px_rgba(0,0,0,0.6)]
          overflow-y-auto
        "
          >
            {/* Glow border */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/20 via-transparent to-purple-500/20" />

            {/* Content */}
            <div className="relative z-10">
              {/* Label */}
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400 mb-4">
                Our Reach
              </p>

              {/* Heading */}
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2">
                Global Delivery,
                <span className="block text-cyan-400">Local Expertise</span>
              </h2>

              {/* Body */}
              <div className="space-y-5 text-neutral-300 leading-relaxed text-[12px]">
                <p>
                  Our global delivery model combines worldwide reach with deep
                  regional expertise. With teams across the United States, Latin
                  America, Europe, and India, we deliver consistently
                  high-quality outcomes—anywhere in the world.
                </p>

                <p>
                  Certified to ISO 27001 standards, we operate with security,
                  compliance, and reliability at the core of every engagement.
                </p>
              </div>

              {/* Locations */}
              <div className="grid grid-cols-2 gap-3 mt-8 text-sm">
                {["United States", "Latin America", "Europe", "India"].map(
                  (place) => (
                    <div
                      key={place}
                      className="
                  flex items-center gap-3
                  px-4 py-3
                  rounded-xl
                  bg-white/5
                  border border-white/10
                  hover:bg-white/10
                  transition
                  cursor-pointer
                "
                    >
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                      <span className="font-medium">{place}</span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Bottom fade for scroll */}
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-14 bg-gradient-to-t from-neutral-900/95 to-transparent rounded-b-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
