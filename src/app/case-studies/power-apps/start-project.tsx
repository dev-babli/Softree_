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
            {/* Badge */}
            <span className="mb-2 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
              👨‍💻 Hire Power Apps Developers
            </span>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Hire expert{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Power Apps developers
              </span>{" "}
              to build smarter business apps
            </h2>

            {/* Description */}
            <p className="mt-2 max-w-xl text-sm text-white/80">
              Accelerate your digital transformation with certified Power Apps
              developers who build secure, scalable, and high-performance
              applications tailored to your business needs.
            </p>

            {/* Benefits */}
            <ul className="mt-4 space-y-1.5 text-xs text-white/80">
              <li>✔ Dedicated Power Apps Developers</li>
              <li>✔ Custom Canvas & Model-Driven Apps</li>
              <li>✔ Power Automate & SharePoint Integration</li>
              <li>✔ Flexible Hiring Models</li>
            </ul>

            {/* Stats */}
            <div className="mt-3 flex gap-8">
              <div>
                <p className="text-xl font-semibold">70+</p>
                <p className="text-[11px] text-white/60">Apps Delivered</p>
              </div>
              <div>
                <p className="text-xl font-semibold">98%</p>
                <p className="text-[11px] text-white/60">Client Satisfaction</p>
              </div>
              <div>
                <p className="text-xl font-semibold">2×</p>
                <p className="text-[11px] text-white/60">Faster Delivery</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-3 flex gap-3">
              <a
                href="/contact"
                className="rounded-lg bg-white text-blue-700 px-6 py-2.5 text-xs font-medium shadow hover:scale-105 transition"
              >
                Hire Developers
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
