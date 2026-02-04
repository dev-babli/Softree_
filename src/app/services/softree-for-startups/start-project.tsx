"use client";

export default function CtaStartup() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <div
          className="
            grid md:grid-cols-2 gap-8 items-center
            rounded-3xl
            bg-gradient-to-br from-indigo-900 via-slate-900 to-black
            p-7 md:p-9
            text-white
            shadow-xl
          "
        >

          {/* ================= LEFT ================= */}
          <div>

            {/* Badge */}
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/10 text-xs">
              🚀 Softree for Startups
            </span>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Launch your
              <span className="block bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                MVP faster
              </span>
            </h2>

            {/* Description */}
            <p className="mt-4 text-sm text-white/80 max-w-lg">
              Turn your idea into a scalable digital product with Softree.
              We design, build, and launch MVPs, SaaS platforms, and web apps
              quickly — helping startups validate, grow, and scale with confidence.
            </p>

            {/* Benefits */}
            <ul className="mt-5 space-y-1.5 text-xs text-white/80">
              <li>✔ MVP in 4–6 weeks</li>
              <li>✔ React / Next.js / Node / Cloud</li>
              <li>✔ Cost-effective development</li>
              <li>✔ Scale-ready architecture</li>
            </ul>

            {/* Stats */}
            <div className="mt-6 flex gap-8">
              <div>
                <p className="text-xl font-semibold">50+</p>
                <p className="text-[11px] text-white/60">Products Launched</p>
              </div>
              <div>
                <p className="text-xl font-semibold">40%</p>
                <p className="text-[11px] text-white/60">Faster Go-to-Market</p>
              </div>
              <div>
                <p className="text-xl font-semibold">3×</p>
                <p className="text-[11px] text-white/60">Startup Growth</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 flex gap-3 flex-wrap">
              <a
                href="/contact"
                className="bg-white text-indigo-900 px-6 py-2.5 rounded-lg text-xs font-medium shadow hover:scale-105 transition"
              >
                Build My MVP
              </a>

              <a
                href="/services/startup-development"
                className="border border-white/30 bg-white/10 px-6 py-2.5 rounded-lg text-xs font-medium backdrop-blur hover:bg-white/20 transition"
              >
                View Startup Services
              </a>
            </div>
          </div>



          {/* ================= RIGHT – QUICK FORM ================= */}
          <div className="relative">

            <div className="absolute -inset-2 bg-white/10 blur-xl rounded-3xl" />

            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-5">

              <h3 className="text-lg font-semibold">
                Get Free MVP Consultation
              </h3>

              <p className="text-xs text-white/70 mb-4">
                Share your idea — we’ll guide you within 24 hours
              </p>

              <form className="space-y-3">

                <input
                  placeholder="Founder Name"
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-300"
                />

                <input
                  placeholder="Work Email"
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-300"
                />

                <select className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-300">
                  <option>Project Stage</option>
                  <option>Idea Stage</option>
                  <option>MVP Development</option>
                  <option>Scaling Product</option>
                </select>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-400 to-indigo-500 py-2.5 rounded-lg text-xs font-medium shadow hover:scale-[1.03] transition"
                >
                  Get Free Plan
                </button>
              </form>

              <p className="mt-3 text-[10px] text-center text-white/60">
                🔒 NDA Protected • Confidential • No Spam
              </p>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
