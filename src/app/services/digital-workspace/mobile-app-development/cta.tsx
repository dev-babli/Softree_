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
            <span className="inline-block mb-2 px-3 py-1 rounded-full bg-white/15 text-xs">
              👨‍💻 Hire Mobile App Developers
            </span>

            {/* heading */}
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Hire expert developers for
              <span className="block bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
                iOS & Android Applications
              </span>
            </h2>

            {/* desc */}
            <p className="mt-1 text-sm text-white/85 max-w-lg">
              Scale your development team with experienced mobile app developers
              who build secure, high-performance applications aligned with your
              business goals.
            </p>

            {/* benefits */}
            <ul className="mt-3 space-y-1.5 text-xs text-white/85">
              <li>✔ Dedicated iOS & Android Developers</li>
              <li>✔ Flutter, React Native & Power Apps Expertise</li>
              <li>✔ API, Backend & Cloud Integration</li>
              <li>✔ Flexible Hiring Models</li>
            </ul>

            {/* stats */}
            <div className="mt-3 flex gap-8">
              <div>
                <p className="text-xl font-semibold">60+</p>
                <p className="text-[11px] text-white/70">
                  Developers Available
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold">95%</p>
                <p className="text-[11px] text-white/70">Client Retention</p>
              </div>
              <div>
                <p className="text-xl font-semibold">48 Hrs</p>
                <p className="text-[11px] text-white/70">Team Onboarding</p>
              </div>
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

              <form
                action="https://formspree.io/f/myklkyya"
                method="POST"
                className="space-y-3"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-300"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Work Email"
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-300"
                  required
                />

                {/* NEW TEXTAREA */}
                <textarea
                  name="project_details"
                  placeholder="Brief about your project..."
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-300 resize-none"
                />

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
