"use client";

export default function CtaWebApps() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
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
          <div>
            {/* badge */}
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/10 text-xs">
              🌐 Web Application Development
            </span>

            {/* heading */}
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Build scalable
              <span className="block bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                modern web apps
              </span>
            </h2>

            {/* description */}
            <p className="mt-4 text-sm text-white/80 max-w-lg">
              We design and develop fast, secure, and responsive web
              applications including portals, dashboards, SaaS platforms, and
              enterprise systems tailored to your business needs.
            </p>

            {/* benefits */}
            <ul className="mt-5 space-y-1.5 text-xs text-white/80">
              <li>✔ React / Next.js / SPFx / .NET</li>
              <li>✔ Custom Dashboards & Portals</li>
              <li>✔ API & Database Integration</li>
              <li>✔ Cloud Deployment & Scaling</li>
            </ul>

            {/* stats */}
            <div className="mt-6 flex gap-8">
              <div>
                <p className="text-xl font-semibold">80+</p>
                <p className="text-[11px] text-white/60">Web Apps Delivered</p>
              </div>
              <div>
                <p className="text-xl font-semibold">99.9%</p>
                <p className="text-[11px] text-white/60">Uptime</p>
              </div>
              <div>
                <p className="text-xl font-semibold">3×</p>
                <p className="text-[11px] text-white/60">Performance Boost</p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="mt-6 flex gap-3 flex-wrap">
              <a
                href="/contact"
                className="bg-white text-indigo-900 px-6 py-2.5 rounded-lg text-xs font-medium shadow hover:scale-105 transition"
              >
                Talk to Expert
              </a>

              <a
                href="/services/web-development"
                className="border border-white/30 bg-white/10 px-6 py-2.5 rounded-lg text-xs font-medium backdrop-blur hover:bg-white/20 transition"
              >
                View Services
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
