"use client";

export default function CtaStartup() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      {/* ===== BACKGROUND GLOWS ===== */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-indigo-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-cyan-400/10 blur-[120px] rounded-full" />

      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* ===== MAIN CARD ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center rounded-[32px] bg-gradient-to-br from-[#0b3ea8] via-[#1557c0] to-[#1e73d8] p-10 md:p-16 shadow-2xl border border-white/10 text-white">

          {/* ================= LEFT ================= */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
              🚀 Softree for Startups
            </span>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              Build • Launch • Scale{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                your startup faster
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-xl text-lg text-white/80">
              From idea validation to market-ready products, Softree helps startups
              design, build and ship MVPs quickly with scalable architecture and
              modern tech stacks.
            </p>

            {/* Benefits */}
            <ul className="mt-6 space-y-2 text-sm text-white/80">
              <li>✔ MVP in 4–8 weeks</li>
              <li>✔ Web & Mobile Apps</li>
              <li>✔ Lean & Scalable Architecture</li>
              <li>✔ Dedicated Product Team</li>
            </ul>

            {/* Stats */}
            <div className="mt-8 flex gap-10">
              <div>
                <p className="text-2xl font-semibold">50+</p>
                <p className="text-xs text-white/60">Startups Served</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">4–8 Weeks</p>
                <p className="text-xs text-white/60">Avg. Launch</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">95%</p>
                <p className="text-xs text-white/60">Retention Rate</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/book-call"
                className="rounded-xl bg-white text-blue-700 px-7 py-3 text-sm font-medium shadow-lg hover:scale-105 transition"
              >
                Book Free Strategy Call
              </a>

              <a
                href="/contact"
                className="rounded-xl border border-white/30 bg-white/10 px-7 py-3 text-sm font-medium backdrop-blur hover:bg-white/20 transition"
              >
                Talk to Our Team
              </a>
            </div>
          </div>

          {/* ================= RIGHT – FORM ================= */}
          <div className="relative">
            {/* glow */}
            <div className="absolute -inset-2 rounded-3xl bg-white/10 blur-xl" />

            {/* Glass Form */}
            <div className="relative rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-semibold">
                Get Your Free Startup Plan
              </h3>
              <p className="mb-6 text-sm text-white/70">
                Tell us about your idea — we’ll get back within 24 hours
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
                  placeholder="Startup / Company Name"
                  className="w-full rounded-xl bg-black/30 px-4 py-3 text-sm outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-400"
                />

                <select className="w-full rounded-xl bg-black/30 px-4 py-3 text-sm outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-400">
                  <option>Product Type</option>
                  <option>Web App</option>
                  <option>Mobile App</option>
                  <option>SaaS Platform</option>
                  <option>Marketplace</option>
                </select>

                <select className="w-full rounded-xl bg-black/30 px-4 py-3 text-sm outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-400">
                  <option>Budget Range</option>
                  <option>Under $10k</option>
                  <option>$10k – $25k</option>
                  <option>$25k – $50k</option>
                  <option>$50k+</option>
                </select>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 py-3 text-sm font-medium shadow-lg hover:scale-[1.03] transition"
                >
                  Get Free Plan
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
