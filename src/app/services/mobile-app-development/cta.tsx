"use client";

export default function CtaMobileApps() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className="
            grid md:grid-cols-2 gap-10 items-center
            rounded-3xl
            bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500
            p-8 md:p-10
            text-white
            shadow-xl
          "
        >
          {/* ================= LEFT ================= */}
          <div>
            {/* badge */}
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/15 text-xs">
              📱 Mobile App Development
            </span>

            {/* heading */}
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Launch powerful
              <span className="block bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
                iOS & Android Apps
              </span>
            </h2>

            {/* desc */}
            <p className="mt-4 text-sm text-white/85 max-w-lg">
              We design and build scalable mobile apps that improve customer
              engagement, automate workflows, and accelerate business growth.
            </p>

            {/* benefits */}
            <ul className="mt-5 space-y-1.5 text-xs text-white/85">
              <li>✔ Native & Cross-Platform Apps</li>
              <li>✔ Flutter / React Native / Power Apps</li>
              <li>✔ API & Backend Integration</li>
              <li>✔ App Store Deployment</li>
            </ul>

            {/* stats */}
            <div className="mt-6 flex gap-8">
              <div>
                <p className="text-xl font-semibold">45+</p>
                <p className="text-[11px] text-white/70">Apps Built</p>
              </div>
              <div>
                <p className="text-xl font-semibold">99%</p>
                <p className="text-[11px] text-white/70">Client Satisfaction</p>
              </div>
              <div>
                <p className="text-xl font-semibold">2×</p>
                <p className="text-[11px] text-white/70">Faster Delivery</p>
              </div>
            </div>

            {/* buttons */}
            <div className="mt-6 flex gap-3 flex-wrap">
              <a
                href="/contact"
                className="bg-white text-indigo-700 px-6 py-2.5 rounded-lg text-xs font-medium shadow hover:scale-105 transition"
              >
                Talk to Expert
              </a>

              <a
                href="/services/mobile-app-development"
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
                Get Free App Consultation
              </h3>

              <p className="text-xs text-white/70 mb-4">
                Share your idea — we’ll reply within 24 hours
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
                  <option>Platform</option>
                  <option>iOS</option>
                  <option>Android</option>
                  <option>Both</option>
                </select>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-400 to-indigo-500 py-2.5 rounded-lg text-xs font-medium shadow hover:scale-[1.03] transition"
                >
                  Get Free Estimate
                </button>
              </form>

              <p className="mt-3 text-[10px] text-center text-white/60">
                🔒 100% Confidential
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
