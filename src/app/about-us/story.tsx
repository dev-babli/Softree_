export default function OurStorySection() {
  return (
    <section className="relative  py-36 overflow-hidden">
      {/* ===== Optional Noise Overlay ===== */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-[0.025]" />
      {/* ===== CONTENT WRAPPER WITH BG ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/10 via-neutral-500/10 to-transparent">
          <div className="rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-gray-900 backdrop-blur-xl p-10">
            {/* ================= HEADER ================= */}
            <div className="mb-14">
              <h2 className="text-sky-400 font-extrabold tracking-widest text-sm mb-4">
                OUR STORY
              </h2>

              <p className="text-3xl md:text-4xl font-semibold leading-snug max-w-3xl text-white">
                Your challenges. Our technology. Real impact. We help businesses{" "}
                <span className="font-bold text-sky-400">
                  build scalable software, streamline operations, and accelerate
                  growth.
                </span>
              </p>
            </div>

            {/* ================= CONTENT GRID ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              {/* LEFT BIG IMAGE */}
              <div className="h-full rounded-3xl overflow-hidden shadow-lg shadow-black/40">
                <img
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
                  alt="Softree team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* RIGHT CONTENT */}
              <div className="flex flex-col gap-8 h-full">
                {/* TOP SMALL IMAGES */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="rounded-2xl overflow-hidden shadow-md shadow-black/40">
                    <img
                      src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                      alt="Software planning session"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="rounded-2xl overflow-hidden shadow-md shadow-black/40">
                    <img
                      src="https://images.unsplash.com/photo-1557804506-669a67965ba0"
                      alt="Product discussion"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* STORY TEXT */}
                <div className="text-gray-300 leading-relaxed space-y-4 max-w-xl flex-1">
                  <p>
                    Softree was founded with a clear vision: to build reliable,
                    high-performance software solutions that solve real business
                    challenges. In an ever-evolving digital world, we focus on
                    engineering technology that is secure, scalable, and
                    future-ready.
                  </p>

                  <p>
                    From custom software development and cloud-native
                    applications to enterprise platforms and digital
                    transformation, everything we create is designed to improve
                    efficiency, enhance user experience, and deliver measurable
                    business value.
                  </p>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                  <StatItem value="200+" label="Projects Delivered" />
                  <StatItem value="120+" label="Global Clients" />
                  <StatItem value="10+" label="Years of Experience" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= STATS ITEM ================= */

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-3xl font-extrabold text-sky-400">{value}</p>
      <p className="text-gray-400 text-sm mt-1">{label}</p>
    </div>
  );
}
