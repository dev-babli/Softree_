"use client";

export default function CtaFabric() {
  return (
    <section className="relative isolate overflow-hidden ">
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* ===== MAIN CARD ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center rounded-[32px] bg-gradient-to-br from-[#0b3ea8] via-[#1557c0] to-[#1e73d8] p-10 md:p-16 shadow-2xl border border-white/10 text-white">
          
          {/* ================= LEFT ================= */}
          <div>
            {/* badge */}
            <span className="inline-block mb-2 px-3 py-1 rounded-full bg-white/15 text-xs">
              🚀 Hire Microsoft Fabric Experts
            </span>

            {/* heading */}
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Hire experts for
              <span className="block bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
                Microsoft Fabric Data & AI Platform
              </span>
            </h2>

            {/* desc */}
            <p className="mt-1 text-sm text-white/85 max-w-lg">
              Unify your data, analytics, and AI with Microsoft Fabric. Build scalable
              Lakehouse architectures, real-time pipelines, and intelligent insights
              with certified Fabric specialists.
            </p>

            {/* benefits */}
            <ul className="mt-3 space-y-1.5 text-xs text-white/85">
              <li>✔ Lakehouse, Data Warehouse & OneLake Setup</li>
              <li>✔ Data Engineering & Pipeline Automation</li>
              <li>✔ Real-time Analytics & AI Integration</li>
              <li>✔ Seamless Integration with Azure & Power Platform</li>
            </ul>

            {/* stats */}
            <div className="mt-3 flex gap-8">
              <div>
                <p className="text-xl font-semibold">80+</p>
                <p className="text-[11px] text-white/70">
                  Fabric Experts Available
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold">98%</p>
                <p className="text-[11px] text-white/70">Client Satisfaction</p>
              </div>
              <div>
                <p className="text-xl font-semibold">48 Hrs</p>
                <p className="text-[11px] text-white/70">Quick Onboarding</p>
              </div>
            </div>

            {/* buttons */}
            <div className="mt-3 flex gap-3 flex-wrap">
              <a
                href="/contact"
                className="bg-white text-indigo-700 px-6 py-2.5 rounded-lg text-xs font-medium shadow hover:scale-105 transition"
              >
                Hire Fabric Experts
              </a>
            </div>
          </div>

          {/* ================= RIGHT – FORM ================= */}
          <div className="relative">
            {/* glow */}
            <div className="absolute -inset-2 rounded-3xl bg-white/10 blur-xl" />

            {/* Glass Form Card */}
            <div className="relative rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-semibold">
                Get Your Free Fabric Estimate
              </h3>
              <p className="mb-6 text-sm text-white/70">
                Tell us your data needs — we’ll respond within 24 hours
              </p>

              <form className="space-y-4">
                <input
                  placeholder="Full Name"
                  className="w-full rounded-xl bg-black/30 px-4 py-3 text-sm outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-400"
                />

                <input
                  type="email"
                  placeholder="Work Email"
                  className="w-full rounded-xl bg-black/30 px-4 py-3 text-sm outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-400"
                />

                <input
                  placeholder="Company Name"
                  className="w-full rounded-xl bg-black/30 px-4 py-3 text-sm outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-400"
                />

                <select className="w-full rounded-xl bg-black/30 px-4 py-3 text-sm outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-400">
                  <option>Primary Need</option>
                  <option>Lakehouse Setup</option>
                  <option>Data Pipelines</option>
                  <option>Real-time Analytics</option>
                  <option>Full Fabric Implementation</option>
                </select>

                <select className="w-full rounded-xl bg-black/30 px-4 py-3 text-sm outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-400">
                  <option>Project Size</option>
                  <option>Startup / Small Team</option>
                  <option>Department Level</option>
                  <option>Enterprise Scale</option>
                </select>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 py-3 text-sm font-medium shadow-lg hover:scale-[1.03] transition"
                >
                  Get Free Estimate
                </button>
              </form>

              <p className="mt-4 text-center text-xs text-white/60">
                🔒 NDA Protected • No Spam • 100% Confidential
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}