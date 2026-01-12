"use client";

const locations = [
  { top: "42.6%", left: "19.1%" },
  { top: "52.3%", left: "70.1%" },
  { top: "71.2%", left: "29.1%" },
  { top: "34.5%", left: "56.5%" },
];

export default function GlobalDelivery() {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      {/* ===== Background Map ===== */}
      <div className="absolute inset-0">
        <img
          src="/images/global.png"
          alt="Global delivery map"
          className="w-full h-full object-cover opacity-80"
        />

        {/* Pins */}
        {locations.map((loc, i) => (
          <span
            key={i}
            className="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.9)] animate-pulse"
            style={{ top: loc.top, left: loc.left }}
          />
        ))}
      </div>

      {/* ===== Content Wrapper ===== */}
      <div className="relative container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* ===== Left Spacer (map visible) ===== */}
          <div className="hidden lg:block" />

          {/* ===== Content Card ===== */}
          <div className="bg-neutral-900/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl">
            {/* Label */}
            <p className="text-sm uppercase tracking-widest text-cyan-400 mb-3">
              Our reach
            </p>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Global Delivery, Local Expertise
            </h2>

            {/* Body */}
            <div className="space-y-4 text-neutral-300 leading-relaxed">
              <p>
                Our global delivery model combines worldwide reach with deep
                regional expertise. With teams across the United States, Latin
                America, Europe, and India, we deliver consistently high-quality
                outcomes—anywhere in the world.
              </p>

              <p>
                Certified to ISO 27001 standards, we operate with security,
                compliance, and reliability at the core of every engagement.
              </p>

              <p>
                From development and testing to long-term support, our
                distributed teams work seamlessly to accelerate delivery,
                optimize costs, and drive measurable results.
              </p>
            </div>

            {/* ===== Locations ===== */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <ul className="space-y-3">
                <li className="font-semibold tracking-wide hover:text-cyan-400 cursor-pointer">
                  United States
                </li>
                <li className="font-semibold tracking-wide hover:text-cyan-400 cursor-pointer">
                  Latin America
                </li>
              </ul>

              <ul className="space-y-3">
                <li className="font-semibold tracking-wide hover:text-cyan-400 cursor-pointer">
                  Europe
                </li>
                <li className="font-semibold tracking-wide hover:text-cyan-400 cursor-pointer">
                  India
                </li>
              </ul>
            </div>

            {/* ===== CTA ===== */}
            <div className="mt-10">
              <a
                href="/who-we-are/global-delivery"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full 
                           bg-cyan-500 text-black font-semibold 
                           hover:bg-cyan-400 transition"
              >
                Explore Global Delivery
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
