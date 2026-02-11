import { Phone, Lightbulb, Rocket } from "lucide-react";
import Link from "next/link";

export default function ProjectProcessSection() {
  return (
    <section
      className="bg-gradient-to-b from-zinc-100 via-white to-zinc-100
py-24"
    >
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* ================= HEADER ================= */}
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
          <span className="text-blue-600">Transform Your Ideas</span> into
          Software with Softree
        </h2>

        <p className="mt-1 mx-auto max-w-3xl text-slate-600">
          Partner with a team that understands your vision and delivers
          measurable results. Our proven engagement process ensures clarity,
          speed, and success from day one.
        </p>

        {/* CTA */}
        <div className="mt-3">
          <Link
            href="/contact"
            className="
      inline-flex items-center gap-2 rounded-full
      bg-blue-600 px-8 py-4
      text-white font-semibold
      transition hover:scale-105 hover:bg-blue-700
    "
          >
            Book a Free Consultation →
          </Link>
        </div>

        {/* ================= GLASS STEPS WRAPPER ================= */}
        <div
          className="
        relative mt-10 mx-auto max-w-7xl rounded-[32px] p-[1px]
        bg-gradient-to-br
        from-slate-200
        via-white
        to-slate-300
      "
        >
          {/* Inner glass */}
          <div
            className="
          relative rounded-[30px]
          bg-white/80 backdrop-blur-xl
          border border-slate-200
          px-12 py-16
          shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)]
        "
          >
            {/* Soft highlight */}
            <div
              className="
            pointer-events-none absolute inset-0 rounded-[30px]
            bg-gradient-to-tr from-white/60 via-transparent to-transparent
          "
            />

            {/* ================= GRID ================= */}
            <div className="relative grid gap-16 md:grid-cols-3 text-left">
              {/* Vertical Dividers (Desktop Only) */}
              <div
                className="
              pointer-events-none absolute inset-y-0 left-1/3 hidden w-px md:block
              bg-gradient-to-b from-transparent via-slate-300 to-transparent
            "
              />
              <div
                className="
              pointer-events-none absolute inset-y-0 left-2/3 hidden w-px md:block
              bg-gradient-to-b from-transparent via-slate-300 to-transparent
            "
              />

              {/* ================= STEP 01 ================= */}
              <div className="relative">
                <span
                  className="
              absolute -top-16 left-0
              text-[160px] font-bold
              text-slate-300 leading-none
            "
                >
                  01
                </span>

                <div className="relative z-10">
                  <div
                    className="
                  mb-6 flex h-12 w-12 items-center justify-center rounded-full
                  bg-gradient-to-br from-blue-500 to-blue-700
                  shadow-md
                "
                  >
                    <Phone className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">
                    Initial Discovery Call
                  </h3>

                  <p className="mt-3 text-slate-600 leading-relaxed">
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
              text-slate-300 leading-none
            "
                >
                  02
                </span>

                <div className="relative z-10">
                  <div
                    className="
                  mb-6 flex h-12 w-12 items-center justify-center rounded-full
                  bg-gradient-to-br from-indigo-500 to-indigo-700
                  shadow-md
                "
                  >
                    <Lightbulb className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">
                    Solution Design & Team Alignment
                  </h3>

                  <p className="mt-3 text-slate-600 leading-relaxed">
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
              text-slate-300 leading-none
            "
                >
                  03
                </span>

                <div className="relative z-10">
                  <div
                    className="
                  mb-6 flex h-12 w-12 items-center justify-center rounded-full
                  bg-gradient-to-br from-orange-500 to-orange-600
                  shadow-md
                "
                  >
                    <Rocket className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">
                    Project Execution & Ongoing Delivery
                  </h3>

                  <p className="mt-3 text-slate-600 leading-relaxed">
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
