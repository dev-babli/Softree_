"use client";

import { useState } from "react";

export default function CtaPowerBI() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/myklkyya", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setStatus("SUCCESS");
        form.reset();

        setTimeout(() => setStatus(""), 3000);
      } else {
        setStatus("ERROR");
      }
    } catch {
      setStatus("ERROR");
    }
  };

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* ===== MAIN CARD ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center rounded-[32px] bg-gradient-to-br from-[#0b3ea8] via-[#1557c0] to-[#1e73d8] p-10 md:p-16 shadow-2xl border border-white/10 text-white">
          {/* ================= LEFT ================= */}
          <div>
            <span className="inline-block mb-2 px-3 py-1 rounded-full bg-white/15 text-xs">
              📊 Hire Power BI Developers
            </span>

            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Hire experts for
              <span className="block bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
                Power BI Analytics & Dashboards
              </span>
            </h2>

            <p className="mt-1 text-sm text-white/85 max-w-lg">
              Turn raw data into actionable insights by hiring experienced Power
              BI developers who design secure, scalable dashboards and analytics
              solutions for data-driven decision making.
            </p>

            <ul className="mt-3 space-y-1.5 text-xs text-white/85">
              <li>✔ Interactive Dashboards & Reports</li>
              <li>✔ DAX, Power Query & Data Modeling</li>
              <li>✔ Power BI with SharePoint, SQL & Azure</li>
              <li>✔ Flexible Hiring & Engagement Models</li>
            </ul>

            <div className="mt-3 flex gap-8">
              <div>
                <p className="text-xl font-semibold">80+</p>
                <p className="text-[11px] text-white/70">
                  Power BI Experts Available
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold">98%</p>
                <p className="text-[11px] text-white/70">Client Satisfaction</p>
              </div>
              <div>
                <p className="text-xl font-semibold">48 Hrs</p>
                <p className="text-[11px] text-white/70">Quick Onboarding</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT – FORM ================= */}
          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-white/10 blur-xl" />

            <div className="relative rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-semibold">
                Get Your Free Analytics Estimate
              </h3>

              <p className="mb-6 text-sm text-white/70">
                Tell us your reporting needs — we’ll respond within 24 hours
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
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

                <textarea
                  name="project_details"
                  placeholder="Brief about your project..."
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-300 resize-none"
                />

                {/* ✅ BUTTON UNCHANGED */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-400 to-indigo-500 py-2.5 rounded-lg text-xs font-medium shadow hover:scale-[1.03] transition"
                >
                  Get Free Estimate
                </button>
              </form>

              {/* ✅ SUCCESS / ERROR MESSAGE */}
              {status === "SUCCESS" && (
                <p className="mt-4 text-green-400 text-xs text-center">
                  ✅ Message sent successfully!
                </p>
              )}

              {status === "ERROR" && (
                <p className="mt-4 text-red-400 text-xs text-center">
                  ❌ Something went wrong. Try again.
                </p>
              )}

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