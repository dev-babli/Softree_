"use client";

export default function CtaPowerApps() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {" "}
        {/* smaller */}
        <div
          className="
          grid grid-cols-1 md:grid-cols-2 gap-10
          items-center
          rounded-[28px]
          bg-gradient-to-br from-[#0b3ea8] via-[#1557c0] to-[#1e73d8]
          p-8 md:p-10
          shadow-xl border border-white/10 text-white
        "
        >
          {/* ================= LEFT ================= */}
          <div className="flex flex-col justify-center">
            <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
              ⚡ Power Apps Development Services
            </span>

            {/* Smaller heading */}
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Automate workflows with{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                custom Power Apps
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm text-white/80">
              Build secure, scalable business applications that digitize
              processes and integrate seamlessly with Microsoft 365 &
              SharePoint.
            </p>

            {/* Benefits compact */}
            <ul className="mt-4 space-y-1.5 text-xs text-white/80">
              <li>✔ Custom Business Apps</li>
              <li>✔ Workflow Automation</li>
              <li>✔ SharePoint Integration</li>
              <li>✔ Fast Deployment</li>
            </ul>

            {/* Stats compact */}
            <div className="mt-6 flex gap-8">
              <div>
                <p className="text-xl font-semibold">60+</p>
                <p className="text-[11px] text-white/60">Apps Delivered</p>
              </div>
              <div>
                <p className="text-xl font-semibold">65%</p>
                <p className="text-[11px] text-white/60">Automation Boost</p>
              </div>
              <div>
                <p className="text-xl font-semibold">50%</p>
                <p className="text-[11px] text-white/60">Time Saved</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 flex gap-3">
              <a
                href="/book-call"
                className="rounded-lg bg-white text-blue-700 px-6 py-2.5 text-xs font-medium shadow hover:scale-105 transition"
              >
                Talk to Expert
              </a>

              <a
                href="/services/power-apps"
                className="rounded-lg border border-white/30 bg-white/10 px-6 py-2.5 text-xs font-medium backdrop-blur hover:bg-white/20 transition"
              >
                View Services
              </a>
            </div>
          </div>

          {/* ================= RIGHT – FORM ================= */}
          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-white/10 blur-xl" />

            <div className="relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold">
                Free Automation Estimate
              </h3>

              <p className="mb-4 text-xs text-white/70">
                We reply within 24 hours
              </p>

              {/* Compact form */}
              <form className="space-y-3">
                <input
                  placeholder="Full Name"
                  className="w-full rounded-lg bg-black/30 px-3 py-2.5 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-400"
                />

                <input
                  type="email"
                  placeholder="Work Email"
                  className="w-full rounded-lg bg-black/30 px-3 py-2.5 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-400"
                />

                <input
                  placeholder="Organization"
                  className="w-full rounded-lg bg-black/30 px-3 py-2.5 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-400"
                />

                <select className="w-full rounded-lg bg-black/30 px-3 py-2.5 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-400">
                  <option>Use Case</option>
                  <option>Business App</option>
                  <option>Automation</option>
                </select>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 py-2.5 text-xs font-medium shadow hover:scale-[1.03] transition"
                >
                  Get Free Estimate
                </button>
              </form>

              <p className="mt-3 text-center text-[10px] text-white/60">
                🔒 100% Confidential
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
