export default function OurStorySection() {
  return (
    <section className="relative  py-10 overflow-hidden">
      {/* ===== CONTENT WRAPPER WITH BG ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* subtle gradient border */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/20 via-neutral-300/20 to-transparent">
          {/* MAIN CARD */}
          <div
            className="
      rounded-3xl
      bg-gradient-to-br from-neutral-50 via-white to-gray-50
      p-12
      transition-all duration-300
      hover:-translate-y-1
      hover:shadow-[0_15px_40px_rgba(15,23,42,0.10),0_60px_160px_-20px_rgba(15,23,42,0.25)]
    "
          >
            {/* ================= HEADER ================= */}
            <div className="mb-14">
              <h2 className="text-sky-500 font-extrabold tracking-widest text-sm mb-4">
                OUR STORY
              </h2>

              <p className="text-3xl md:text-4xl font-semibold leading-snug max-w-3xl text-slate-900">
                Your challenges. Our technology. Real impact. We help businesses{" "}
                <span className="font-bold text-sky-500">
                  build scalable software, streamline operations, and accelerate
                  growth.
                </span>
              </p>
            </div>

            {/* ================= CONTENT GRID ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              {/* LEFT BIG IMAGE */}
              <div
                className="
          h-full
          rounded-3xl
          overflow-hidden
          shadow-[0_20px_60px_-25px_rgba(15,23,42,0.20)]
        "
              >
                <img
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
                  alt="Softree team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* RIGHT CONTENT */}
              <div className="flex flex-col gap-10 h-full">
                {/* TOP SMALL IMAGES */}
                <div className="grid grid-cols-2 gap-6">
                  <div
                    className="
            rounded-2xl
            overflow-hidden
            shadow-[0_15px_40px_-10px_rgba(15,23,42,0.15)]
          "
                  >
                    <img
                      src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                      alt="Software planning session"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    className="
            rounded-2xl
            overflow-hidden
            shadow-[0_15px_40px_-10px_rgba(15,23,42,0.15)]
          "
                  >
                    <img
                      src="https://images.unsplash.com/photo-1557804506-669a67965ba0"
                      alt="Product discussion"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* STORY TEXT */}
                <div className="text-slate-900 leading-relaxed space-y-5 max-w-xl text-lg">
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
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                  <StatItem value="200+" label="Projects Delivered" />
                  <StatItem value="98%" label="Client Satisfaction" />
                  <StatItem value="13+" label="Years of Experience" />
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
      <p className="text-3xl font-extrabold text-sky-500">{value}</p>
      <p className="text-gray-900 text-sm mt-1">{label}</p>
    </div>
  );
}
