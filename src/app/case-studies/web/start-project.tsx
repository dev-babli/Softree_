"use client";

export default function CtaWebApps() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div
          className="
            grid md:grid-cols-2 gap-10 items-center
            rounded-3xl
            bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900
            p-8 md:p-10
            text-white
            shadow-xl
          "
        >
          {/* ================= LEFT ================= */}
          {/* ================= LEFT ================= */}
          <div>
            {/* badge */}
            <span className="inline-block mb-2 px-3 py-1 rounded-full bg-white/15 text-xs">
              👨‍💻 Hire Web Developers
            </span>

            {/* heading */}
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Hire expert developers for
              <span className="block bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
                Modern Web Applications
              </span>
            </h2>

            {/* desc */}
            <p className="mt-1 text-sm text-white/85 max-w-lg">
              Strengthen your digital presence by hiring skilled web developers
              who build fast, secure, and scalable web applications tailored to
              your business needs.
            </p>

            {/* benefits */}
            <ul className="mt-3 space-y-1.5 text-xs text-white/85">
              <li>✔ Frontend & Backend Web Developers</li>
              <li>✔ React, Next.js, Angular & Vue Expertise</li>
              <li>✔ API, Cloud & Database Integration</li>
              <li>✔ Flexible Engagement & Hiring Models</li>
            </ul>

            {/* stats */}
            <div className="mt-3 flex gap-8">
              <div>
                <p className="text-xl font-semibold">70+</p>
                <p className="text-[11px] text-white/70">
                  Web Developers Available
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold">96%</p>
                <p className="text-[11px] text-white/70">Client Retention</p>
              </div>
              <div>
                <p className="text-xl font-semibold">48 Hrs</p>
                <p className="text-[11px] text-white/70">Team Onboarding</p>
              </div>
            </div>

            {/* buttons */}
            <div className="mt-3 flex gap-3 flex-wrap">
              <a
                href="/contact"
                className="bg-white text-indigo-700 px-6 py-2.5 rounded-lg text-xs font-medium shadow hover:scale-105 transition"
              >
                Hire Web Developers
              </a>
            </div>
          </div>

          {/* ================= RIGHT – MINI FORM ================= */}
          <div className="relative">
            <div className="absolute -inset-2 bg-white/10 blur-xl rounded-3xl" />

            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold">
                Get Free Web App Estimate
              </h3>

              <p className="text-xs text-white/70 mb-4">
                Tell us your requirements — we’ll reply within 24 hours
              </p>

              <form className="space-y-3">
                <input
                  placeholder="Full Name"
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-300"
                />

                <input
                  placeholder="Work Email"
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-300"
                />

                <select className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-300">
                  <option>Project Type</option>
                  <option>Dashboard</option>
                  <option>Portal</option>
                  <option>SaaS Platform</option>
                  <option>Enterprise App</option>
                </select>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-400 to-indigo-500 py-2.5 rounded-lg text-xs font-medium shadow hover:scale-[1.03] transition"
                >
                  Get Free Estimate
                </button>
              </form>

              <p className="mt-3 text-[10px] text-center text-white/60">
                🔒 Secure • NDA Protected • No Spam
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
