"use client";

import { useState } from "react";

export default function CtaSPFx() {
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
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div
          className="
            grid md:grid-cols-2 gap-10 items-center
            rounded-3xl
            bg-gradient-to-br from-blue-800 via-indigo-800 to-slate-900
            p-8 md:p-10
            text-white
            shadow-xl
          "
        >
          {/* ================= LEFT ================= */}
          <div>
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/10 text-xs">
              ⚙️ SharePoint Framework (SPFx)
            </span>

            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Build custom
              <span className="block bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                SPFx Web Parts & Extensions
              </span>
            </h2>

            <p className="mt-4 text-sm text-white/85 max-w-lg">
              Extend SharePoint with modern React-based web parts, command bars,
              dashboards, and enterprise solutions that integrate seamlessly
              with Microsoft 365 and Teams.
            </p>

            <ul className="mt-5 space-y-1.5 text-xs text-white/85">
              <li>✔ SPFx Web Parts & Extensions</li>
              <li>✔ React + TypeScript Development</li>
              <li>✔ Microsoft Graph & API Integration</li>
              <li>✔ Modern UI & Performance Optimized</li>
            </ul>

            <div className="mt-6 flex gap-8">
              <div>
                <p className="text-xl font-semibold">120+</p>
                <p className="text-[11px] text-white/70">Web Parts Built</p>
              </div>
              <div>
                <p className="text-xl font-semibold">95%</p>
                <p className="text-[11px] text-white/70">Faster Workflows</p>
              </div>
              <div>
                <p className="text-xl font-semibold">100%</p>
                <p className="text-[11px] text-white/70">Cloud Ready</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT – FORM ================= */}
          <div className="relative">
            <div className="absolute -inset-2 bg-white/10 blur-xl rounded-3xl" />

            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold">Get Free SPFx Estimate</h3>

              <p className="text-xs text-white/70 mb-4">
                Share your customization needs — we’ll reply within 24 hours
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
                <p className="mt-3 text-green-400 text-xs text-center">
                  ✅ Message sent successfully!
                </p>
              )}

              {status === "ERROR" && (
                <p className="mt-3 text-red-400 text-xs text-center">
                  ❌ Something went wrong. Try again.
                </p>
              )}

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