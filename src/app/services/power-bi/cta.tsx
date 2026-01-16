"use client";

import { useState } from "react";

export default function CtaAbout() {
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
            📊 Power BI Consulting Partner
          </span>

          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
            We build{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Power BI dashboards
            </span>{" "}
            that turn data into decisions
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/70">
            From data modeling to executive dashboards — we help organizations
            unlock insights using Microsoft Power BI.
          </p>

          {/* Social Proof */}
          <div className="mt-8 grid grid-cols-3 gap-6 max-w-md text-white">
            <div>
              <p className="text-2xl font-semibold">300+</p>
              <p className="text-sm text-white/60">Dashboards Delivered</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">7+ yrs</p>
              <p className="text-sm text-white/60">BI Experience</p>
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
              Book Free Power BI Consultation
            </a>

            <a
              href="https://wa.me/91XXXXXXXXXX"
              className="rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/40 to-fuchsia-600/40 blur-[1px]" />

          <div className="relative rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="text-xl font-semibold text-white">
              Get Your Power BI Cost Estimate
            </h3>
            <p className="mb-6 text-sm text-white/60">
              Tell us about your reporting & analytics requirement
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
                    <option>Power BI Service Type</option>
                    <option>Dashboard Development</option>
                    <option>Data Modeling (DAX)</option>
                    <option>Report Optimization</option>
                    <option>Data Integration / ETL</option>
                    <option>Power BI Migration</option>
                    <option>Support & Governance</option>
                  </select>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <select className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white ring-1 ring-white/15 focus:ring-2 focus:ring-violet-500">
                    <option>Analytics Use Case</option>
                    <option>Executive Dashboards</option>
                    <option>Sales & Marketing Analytics</option>
                    <option>Financial Reporting</option>
                    <option>Operations / Supply Chain</option>
                    <option>HR Analytics</option>
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
                  <option>Under $3k</option>
                  <option>$3k – $10k</option>
                  <option>$10k – $25k</option>
                  <option>$25k+</option>
                </select>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-sm font-medium text-white shadow-lg transition hover:scale-[1.03]"
                >
                  Get Free Power BI Estimate
                </button>
              </form>
            )}

            <p className="mt-4 text-center text-xs text-white/50">
              🔒 NDA Protected • Microsoft BI Experts • No Spam
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
