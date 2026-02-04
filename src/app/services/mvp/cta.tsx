"use client";

export default function CtaMVP() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div
          className="
            grid md:grid-cols-2 gap-10 items-center
            rounded-3xl
            bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900
            p-8 md:p-10
            text-white
            shadow-xl
          "
        >
          {/* ================= LEFT ================= */}
          <div>
            {/* badge */}
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/10 text-xs">
              🏆 Microsoft MVP Consulting
            </span>

            {/* heading */}
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Get guidance from
              <span className="block bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Microsoft MVP Experts
              </span>
            </h2>

            {/* description */}
            <p className="mt-4 text-sm text-white/85 max-w-lg">
              Work directly with experienced Microsoft MVPs for architecture
              design, SharePoint & Power Platform strategy, performance
              optimization, and enterprise best practices.
            </p>

            {/* benefits */}
            <ul className="mt-5 space-y-1.5 text-xs text-white/85">
              <li>✔ Architecture & Solution Design</li>
              <li>✔ SPFx / Power Platform Code Reviews</li>
              <li>✔ Performance Optimization</li>
              <li>✔ Governance & Security Best Practices</li>
            </ul>

            {/* credibility stats */}
            <div className="mt-6 flex gap-8">
              <div>
                <p className="text-xl font-semibold">15+</p>
                <p className="text-[11px] text-white/70">Years Experience</p>
              </div>
              <div>
                <p className="text-xl font-semibold">200+</p>
                <p className="text-[11px] text-white/70">Projects Delivered</p>
              </div>
              <div>
                <p className="text-xl font-semibold">Global</p>
                <p className="text-[11px] text-white/70">Enterprise Clients</p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="mt-6 flex gap-3 flex-wrap">
              <a
                href="/book-call"
                className="bg-white text-indigo-900 px-6 py-2.5 rounded-lg text-xs font-medium shadow hover:scale-105 transition"
              >
                Book Free Consultation
              </a>

              <a
                href="/services/mvp-consulting"
                className="border border-white/30 bg-white/10 px-6 py-2.5 rounded-lg text-xs font-medium backdrop-blur hover:bg-white/20 transition"
              >
                View Expertise
              </a>
            </div>
          </div>

          {/* ================= RIGHT – FORM ================= */}
          <div className="relative">
            <div className="absolute -inset-2 bg-white/10 blur-xl rounded-3xl" />

            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold">
                Request Expert Consultation
              </h3>

              <p className="text-xs text-white/70 mb-4">
                Discuss your challenges with an MVP specialist
              </p>

              <form className="space-y-3">
                <input
                  placeholder="Full Name"
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-300"
                />

                <input
                  type="email"
                  placeholder="Work Email"
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-300"
                />

                <select className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-300">
                  <option>Consultation Type</option>
                  <option>Architecture Review</option>
                  <option>SPFx Guidance</option>
                  <option>Power Platform Strategy</option>
                  <option>Performance Optimization</option>
                </select>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-400 to-indigo-500 py-2.5 rounded-lg text-xs font-medium shadow hover:scale-[1.03] transition"
                >
                  Schedule Free Call
                </button>
              </form>

              <p className="mt-3 text-[10px] text-center text-white/60">
                🔒 Confidential • NDA Available • No Spam
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
