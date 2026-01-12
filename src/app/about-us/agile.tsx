export default function AboutGlassSection() {
  return (
    <section className="bg-black py-16">
      {/* 7XL CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* ================= CORE VALUES ================= */}
          <div className="lg:col-span-2 h-full relative rounded-3xl p-[1px] bg-gradient-to-br from-black via-neutral-500/10 to-transparent">
            <div className="rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black backdrop-blur-xl p-8 md:p-10 h-full flex flex-col">
              <h2 className="text-3xl font-bold text-white mb-6">
                Core Values
              </h2>

              <div className="space-y-5 text-gray-300 leading-relaxed flex-1">
                <ValueItem
                  title="Agility"
                  desc="Embracing change and swiftly adapting to evolving market demands. Our customer-centric solutions are built on robust, scalable frameworks."
                />
                <ValueItem
                  title="Accountability"
                  desc="We take responsibility for every action, individually and collectively, setting benchmarks for dependable success."
                />
                <ValueItem
                  title="Trailblazing"
                  desc="Innovation drives us. We constantly challenge the status quo to remain leaders in technological advancement."
                />
                <ValueItem
                  title="Customer First"
                  desc="Understanding client needs enables us to deliver tailored solutions that exceed expectations and build lasting partnerships."
                />
                <ValueItem
                  title="Integrity"
                  desc="Transparency, honesty, and ethical excellence define every solution we deliver."
                />
              </div>
            </div>
          </div>

          {/* ================= MISSION & VISION ================= */}
          <div className="flex flex-col gap-8 h-full">
            <div className="flex-1">
              <GlassCard
                title="Our Mission"
                border="from-cyan-400/30 via-white/10 to-transparent"
              >
                <MissionSVG />
                <p className="text-gray-300 leading-relaxed">
                  We empower businesses through complete digital transformation
                  by engineering scalable and future-ready solutions that drive
                  measurable growth.
                </p>
              </GlassCard>
            </div>

            <div className="flex-1">
              <GlassCard
                title="Our Vision"
                border="from-purple-400/30 via-white/10 to-transparent"
              >
                <VisionSVG />
                <p className="text-gray-300 leading-relaxed">
                  To lead technological innovation by crafting cutting-edge
                  digital ecosystems that redefine industries and accelerate
                  evolution.
                </p>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= GLASS CARD ================= */

function GlassCard({
  title,
  border,
  children,
}: {
  title: string;
  border: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative rounded-3xl p-[1px] bg-gradient-to-br ${border} h-full`}
    >
      <div className="rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black backdrop-blur-xl p-8 h-full flex flex-col">
        <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>

        <div className="flex items-start gap-5 flex-1">{children}</div>
      </div>
    </div>
  );
}

/* ================= SVG ICONS ================= */

function MissionSVG() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M12 2L15 8L22 9L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9L9 8L12 2Z"
        stroke="url(#missionGrad)"
        strokeWidth="1.5"
      />
      <defs>
        <linearGradient id="missionGrad" x1="0" y1="0" x2="24" y2="24">
          <stop stopColor="#22d3ee" />
          <stop offset="1" stopColor="#67e8f9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function VisionSVG() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M1.5 12C3.5 7 7.5 4 12 4C16.5 4 20.5 7 22.5 12C20.5 17 16.5 20 12 20C7.5 20 3.5 17 1.5 12Z"
        stroke="url(#visionGrad)"
        strokeWidth="1.5"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="url(#visionGrad)"
        strokeWidth="1.5"
      />
      <defs>
        <linearGradient id="visionGrad" x1="0" y1="0" x2="24" y2="24">
          <stop stopColor="#c084fc" />
          <stop offset="1" stopColor="#f0abfc" />
        </linearGradient>
      </defs>
    </svg>
  );
}
function ValueItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-4 items-start">
      <CheckCircleSVG />

      <p>
        <span className="font-semibold text-white">{title}:</span> {desc}
      </p>
    </div>
  );
}

function CheckCircleSVG() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className="mt-1 shrink-0"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="url(#checkGrad)"
        strokeWidth="1.5"
      />
      <path
        d="M7 12.5L10.5 16L17 9"
        stroke="url(#checkGrad)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="checkGrad" x1="0" y1="0" x2="24" y2="24">
          <stop stopColor="#22d3ee" />
          <stop offset="1" stopColor="#67e8f9" />
        </linearGradient>
      </defs>
    </svg>
  );
}
