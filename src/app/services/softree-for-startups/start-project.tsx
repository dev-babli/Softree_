import { Phone, Lightbulb, Rocket } from "lucide-react";

export default function ProjectProcessSection() {
  return (
    <section className="bg-gradient-to-b from-black via-neutral-950 to-black py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* ================= HEADER ================= */}
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Transform Your Ideas
          </span>{" "}
          into Software with Softree
        </h2>

        <p className="mt-4 mx-auto max-w-3xl text-gray-400">
          Partner with a team that understands your vision and delivers
          measurable results. Our proven engagement process ensures clarity,
          speed, and success from day one.
        </p>

        {/* CTA */}
        <div className="mt-8">
          <button
            className="
              inline-flex items-center gap-2 rounded-full
              bg-gradient-to-r from-blue-500 to-cyan-500
              px-8 py-4 text-white font-semibold
              transition hover:scale-105 hover:opacity-90
            "
          >
            Book a Free Consultation →
          </button>
        </div>

        {/* ================= GLASS STEPS WRAPPER ================= */}
        <div
          className="
            relative mt-20 mx-auto max-w-7xl rounded-[32px] p-[1px]
         bg-white/5
          "
        >
          {/* Inner glass */}
          <div
            className="
              relative rounded-[30px]
              bg-white/5 backdrop-blur-xl
              border border-white/10
              px-12 py-16
              shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]
            "
          >
            {/* ================= GRID ================= */}
            <div className="relative grid gap-16 md:grid-cols-3 text-left">
              {/* Vertical Dividers (Desktop Only) */}
              <div
                className="
                  pointer-events-none absolute inset-y-0 left-1/3 hidden w-px md:block
                bg-white/5
                "
              />
              <div
                className="
                  pointer-events-none absolute inset-y-0 left-2/3 hidden w-px md:block
                  bg-gradient-to-b from-transparent via-white/20 to-transparent
                "
              />

              {/* ================= STEP 01 ================= */}
              <div className="relative">
                <span
                  className="
                  absolute -top-16 left-0
                  text-[160px] font-bold
                  text-white/5 leading-none
                "
                >
                  01
                </span>

                <div className="relative z-10">
                  <div
                    className="
                      mb-6 flex h-12 w-12 items-center justify-center rounded-full
                      bg-gradient-to-br from-blue-500 to-blue-700
                      shadow-lg
                    "
                  >
                    <Phone className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    Initial Discovery Call
                  </h3>

                  <p className="mt-3 text-gray-400 leading-relaxed">
                    Share your business goals, challenges, and expectations. We
                    listen, ask the right questions, and align on success
                    criteria. You’ll know exactly how to move forward and what
                    success looks like.
                  </p>
                </div>
              </div>

              {/* ================= STEP 02 ================= */}
              <div className="relative">
                <span
                  className="
                  absolute -top-16 left-0
                  text-[160px] font-bold
                  text-white/5 leading-none
                "
                >
                  02
                </span>

                <div className="relative z-10">
                  <div
                    className="
                      mb-6 flex h-12 w-12 items-center justify-center rounded-full
                      bg-gradient-to-br from-indigo-500 to-indigo-700
                      shadow-lg
                    "
                  >
                    <Lightbulb className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    Solution Design & Team Alignment
                  </h3>

                  <p className="mt-3 text-gray-400 leading-relaxed">
                    We define the optimal technical approach, finalize
                    requirements, and assemble a dedicated team tailored to your
                    project needs.
                  </p>
                </div>
              </div>

              {/* ================= STEP 03 ================= */}
              <div className="relative">
                <span
                  className="
                  absolute -top-16 left-0
                  text-[160px] font-bold
                  text-white/5 leading-none
                "
                >
                  03
                </span>

                <div className="relative z-10">
                  <div
                    className="
                      mb-6 flex h-12 w-12 items-center justify-center rounded-full
                      bg-gradient-to-br from-orange-500 to-orange-600
                      shadow-lg
                    "
                  >
                    <Rocket className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    Project Execution & Ongoing Delivery
                  </h3>

                  <p className="mt-3 text-gray-400 leading-relaxed">
                    Development begins with full transparency. We deliver
                    iteratively, track progress closely, and adapt quickly to
                    changing requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
