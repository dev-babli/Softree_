"use client";

import { useState } from "react";

export default function CtaSharePoint() {
  const [step] = useState(3);

  return (
    <section className="relative isolate overflow-hidden bg-black">
      {/* ===== Background ===== */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-30%] h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600/40 via-indigo-500/40 to-fuchsia-600/40 blur-[140px]" />
        <div className="absolute right-[-15%] bottom-[-35%] h-[600px] w-[600px] rounded-full bg-violet-500/30 blur-[140px]" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-28 md:grid-cols-2">
        {/* ================= LEFT ================= */}
        <div className="flex flex-col justify-center">
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
            🧩 SharePoint Framework (SPFx) Experts
          </span>

          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
            We build{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              scalable SPFx solutions
            </span>{" "}
            for modern SharePoint
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/70">
            From custom SPFx web parts and extensions to tenant-wide application
            customizers — we help organizations enhance SharePoint Online with
            performant, reusable, and future-ready solutions.
          </p>

          {/* Social Proof */}
          <div className="mt-8 grid grid-cols-3 gap-6 max-w-md text-white">
            <div>
              <p className="text-2xl font-semibold">150+</p>
              <p className="text-sm text-white/60">SPFx Implementations</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">6+ yrs</p>
              <p className="text-sm text-white/60">SPFx Experience</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">99%</p>
              <p className="text-sm text-white/60">Client Satisfaction</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/book-call"
              className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-7 py-3 text-sm font-medium text-white transition hover:scale-[1.05]"
            >
              Book Free SPFx Consultation
            </a>

            <a
              href="https://wa.me/91XXXXXXXXXX"
              className="rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
            >
              WhatsApp Our SPFx Team
            </a>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/40 to-fuchsia-600/40 blur-[1px]" />

          <div className="relative rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="text-xl font-semibold text-white">
              Get Your SPFx Project Estimate
            </h3>
            <p className="mb-6 text-sm text-white/60">
              Tell us about your SharePoint Framework requirement
            </p>

            {step === 3 && (
              <form className="space-y-5">
                {/* Row 1 */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    placeholder="Full Name"
                    className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white ring-1 ring-white/15 focus:ring-2 focus:ring-violet-500"
                  />
                  <input
                    placeholder="Work Email"
                    className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white ring-1 ring-white/15 focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    placeholder="Phone / Microsoft Teams"
                    className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white ring-1 ring-white/15 focus:ring-2 focus:ring-violet-500"
                  />

                  <select className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white ring-1 ring-white/15 focus:ring-2 focus:ring-violet-500">
                    <option>SPFx Service Type</option>
                    <option>Custom SPFx Web Parts</option>
                    <option>SPFx Extensions</option>
                    <option>Application Customizers</option>
                    <option>Tenant-wide Branding</option>
                    <option>Microsoft Graph Integration</option>
                    <option>Support & Enhancements</option>
                  </select>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <select className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white ring-1 ring-white/15 focus:ring-2 focus:ring-violet-500">
                    <option>SPFx Use Case</option>
                    <option>Intranet Components</option>
                    <option>List / Library Customization</option>
                    <option>Header / Footer Extensions</option>
                    <option>Workflow UI Enhancements</option>
                    <option>Custom Business Interfaces</option>
                  </select>

                  <select className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white ring-1 ring-white/15 focus:ring-2 focus:ring-violet-500">
                    <option>Company Size</option>
                    <option>Startup (1–10)</option>
                    <option>SMB (11–50)</option>
                    <option>Mid-size (51–200)</option>
                    <option>Enterprise (200+)</option>
                  </select>
                </div>

                {/* Row 4 */}
                <select className="w-full md:w-1/2 rounded-xl bg-black/40 px-4 py-3 text-sm text-white ring-1 ring-white/15 focus:ring-2 focus:ring-violet-500">
                  <option>Estimated Budget</option>
                  <option>Under $5k</option>
                  <option>$5k – $15k</option>
                  <option>$15k – $30k</option>
                  <option>$30k+</option>
                </select>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-sm font-medium text-white shadow-lg transition hover:scale-[1.03]"
                >
                  Get Free SPFx Estimate
                </button>
              </form>
            )}

            <p className="mt-4 text-center text-xs text-white/50">
              🔒 NDA Protected • SPFx Specialists • No Spam
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
