"use client";

export default function CtaSharePoint() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      {/* ===== BACKGROUND GLOW ===== */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-blue-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-indigo-400/10 blur-[120px] rounded-full" />

      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* ===== MAIN CARD ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center rounded-[32px] bg-gradient-to-br from-[#0b3ea8] via-[#1557c0] to-[#1e73d8] p-10 md:p-16 shadow-2xl border border-white/10 text-white">

          {/* ================= LEFT ================= */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
              🏢 SharePoint Development Services
            </span>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              Build smarter{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                SharePoint solutions
              </span>{" "}
              for your teams
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-xl text-lg text-white/80">
              We design modern SharePoint intranets, document management systems,
              and custom SPFx solutions that improve collaboration, automate
              workflows, and boost productivity across your organization.
            </p>

            {/* Benefits */}
            <ul className="mt-6 space-y-2 text-sm text-white/80">
              <li>✔ Intranet & Portals</li>
              <li>✔ Document Management Systems</li>
              <li>✔ Workflow Automation</li>
              <li>✔ SPFx Web Parts & Extensions</li>
            </ul>

            {/* Stats */}
            <div className="mt-8 flex gap-10">
              <div>
                <p className="text-2xl font-semibold">80+</p>
                <p className="text-xs text-white/60">Sites Delivered</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">70%</p>
                <p className="text-xs text-white/60">Process Automation</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">40%</p>
                <p className="text-xs text-white/60">Productivity Boost</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/book-call"
                className="rounded-xl bg-white text-blue-700 px-7 py-3 text-sm font-medium shadow-lg hover:scale-105 transition"
              >
                Talk to a SharePoint Expert
              </a>

              <a
                href="/services/sharepoint"
                className="rounded-xl border border-white/30 bg-white/10 px-7 py-3 text-sm font-medium backdrop-blur hover:bg-white/20 transition"
              >
                View Services
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
                Get Your Free SharePoint Consultation
              </h3>
              <p className="mb-6 text-sm text-white/70">
                Share your requirements — we’ll respond within 24 hours
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
                  placeholder="Organization Name"
                  className="w-full rounded-xl bg-black/30 px-4 py-3 text-sm outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-400"
                />

                <select className="w-full rounded-xl bg-black/30 px-4 py-3 text-sm outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-400">
                  <option>Requirement Type</option>
                  <option>Intranet Portal</option>
                  <option>Document Management</option>
                  <option>Workflow Automation</option>
                  <option>SPFx Customization</option>
                </select>

                <select className="w-full rounded-xl bg-black/30 px-4 py-3 text-sm outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-400">
                  <option>Project Scope</option>
                  <option>Small Team</option>
                  <option>Department Level</option>
                  <option>Enterprise Wide</option>
                </select>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 py-3 text-sm font-medium shadow-lg hover:scale-[1.03] transition"
                >
                  Get Free Consultation
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
