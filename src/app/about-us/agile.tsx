export default function AboutGlassSection() {
  return (
    <section className="">
      {/* 7XL CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* ================= CORE VALUES ================= */}
          <div className="lg:col-span-2">
            <div
              className="
                rounded-3xl
                bg-white
                p-10
                h-full
                flex flex-col

               border border-white/10
    backdrop-blur-2xl
    shadow-[0_40px_120px_rgba(0,0,0,0.75)]
              "
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Core Values
              </h2>

              <div className="space-y-6 text-slate-600 leading-relaxed flex-1">
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
            <LightCard title="Our Mission">
              <MissionSVG />
              <p className="text-slate-600 leading-relaxed">
                We empower businesses through complete digital transformation by
                engineering scalable and future-ready solutions that drive
                measurable growth.
              </p>
            </LightCard>

            <LightCard title="Our Vision">
              <VisionSVG />
              <p className="text-slate-600 leading-relaxed">
                To lead technological innovation by crafting cutting-edge
                digital ecosystems that redefine industries and accelerate
                evolution.
              </p>
            </LightCard>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= LIGHT CARD ================= */

function LightCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-8
        h-full
        flex flex-col gap-5

       border border-white/10
    backdrop-blur-2xl
    shadow-[0_40px_120px_rgba(0,0,0,0.75)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_30px_80px_-15px_rgba(15,23,42,0.18)]
      "
    >
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>

      <div className="flex items-start gap-4 flex-1">{children}</div>
    </div>
  );
}

/* ================= VALUE ITEM ================= */

function ValueItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-4 items-start">
      <CheckCircleSVG />

      <p className="text-slate-600">
        <span className="font-semibold text-slate-900">{title}:</span> {desc}
      </p>
    </div>
  );
}

/* ================= SVG ICONS (same gradients kept) ================= */

function CheckCircleSVG() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className="mt-1 shrink-0"
    >
      <circle cx="12" cy="12" r="10" stroke="#06b6d4" strokeWidth="1.5" />
      <path
        d="M7 12.5L10.5 16L17 9"
        stroke="#06b6d4"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function MissionSVG() {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="missionGrad" x1="0" y1="0" x2="24" y2="24">
          <stop stopColor="#06b6d4" /> {/* cyan-500 */}
          <stop offset="1" stopColor="#2563eb" /> {/* blue-600 */}
        </linearGradient>
      </defs>

      <path
        d="M12 2L15 8L22 9L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9L9 8L12 2Z"
        stroke="url(#missionGrad)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function VisionSVG() {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="visionGrad" x1="0" y1="0" x2="24" y2="24">
          <stop stopColor="#06b6d4" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      <path
        d="M1.5 12C3.5 7 7.5 4 12 4C16.5 4 20.5 7 22.5 12C20.5 17 16.5 20 12 20C7.5 20 3.5 17 1.5 12Z"
        stroke="url(#visionGrad)"
        strokeWidth="1.8"
      />

      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="url(#visionGrad)"
        strokeWidth="1.8"
      />
    </svg>
  );
}
