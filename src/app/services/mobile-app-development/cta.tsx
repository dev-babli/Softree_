"use client";

export default function CtaMobile() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
    
      {/* ===== CONTAINER CARD ===== */}
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center rounded-[32px] bg-gradient-to-br from-[#0b3ea8] via-[#1557c0] to-[#1e73d8] p-10 md:p-16 shadow-2xl border border-white/10">
          {/* ================= LEFT ================= */}
          <div className="flex flex-col justify-center text-white">
            {/* Badge */}
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
              📱 Mobile App Development Company
            </span>

            {/* Heading (stronger typography) */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              Launch high-performance{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                mobile apps
              </span>{" "}
              faster
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-xl text-lg text-white/80">
              We design, develop, and scale Android & iOS apps that deliver
              seamless user experiences and real business results.
            </p>

            {/* Quick Benefits */}
            <ul className="mt-6 space-y-2 text-sm text-white/80">
              <li>✔ MVP to Enterprise Apps</li>
              <li>✔ Android • iOS • Cross-Platform</li>
              <li>✔ Scalable & Secure Architecture</li>
            </ul>

            {/* Stats (bigger + cleaner) */}
            <div className="mt-8 flex gap-10">
              <div>
                <p className="text-2xl font-semibold">150+</p>
                <p className="text-xs text-white/60">Apps Delivered</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">10+ yrs</p>
                <p className="text-xs text-white/60">Experience</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">98%</p>
                <p className="text-xs text-white/60">Satisfaction</p>
              </div>
            </div>

            {/* CTA Buttons (more premium) */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/book-call"
                className="rounded-xl bg-white text-blue-700 px-7 py-3 text-sm font-medium shadow-lg hover:scale-105 transition"
              >
                Book Free Strategy Call
              </a>

              <a
                href="https://wa.me/91XXXXXXXXXX"
                className="rounded-xl border border-white/30 bg-white/10 px-7 py-3 text-sm font-medium backdrop-blur hover:bg-white/20 transition"
              >
                WhatsApp Our Team
              </a>
            </div>
          </div>

          {/* ================= RIGHT – FORM ================= */}
          <div className="relative">
            {/* glass glow */}
            <div className="absolute -inset-2 rounded-3xl bg-white/10 blur-xl" />

            {/* Form Card */}
            <div className="relative rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl p-8 shadow-2xl text-white">
              <h3 className="text-xl font-semibold">
                Get Your Free App Estimate
              </h3>
              <p className="mb-6 text-sm text-white/70">
                Share a few details. We’ll reply within 24 hours.
              </p>

              <form className="space-y-4">
                <input
                  placeholder="Full Name"
                  className="w-full rounded-xl bg-black/30 px-4 py-3 text-sm ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-400 outline-none"
                />

                <input
                  type="email"
                  placeholder="Work Email"
                  className="w-full rounded-xl bg-black/30 px-4 py-3 text-sm ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-400 outline-none"
                />

                <input
                  placeholder="Phone / WhatsApp"
                  className="w-full rounded-xl bg-black/30 px-4 py-3 text-sm ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-400 outline-none"
                />

                <select className="w-full rounded-xl bg-black/30 px-4 py-3 text-sm ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-400 outline-none">
                  <option>Platform</option>
                  <option>Android</option>
                  <option>iOS</option>
                  <option>Both</option>
                </select>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 py-3 text-sm font-medium text-white shadow-lg hover:scale-[1.03] transition"
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
