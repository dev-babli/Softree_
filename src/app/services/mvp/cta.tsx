"use client";

import { useState } from "react";

export default function CtaMVP() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mbdwbkad", {
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
            bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900
            p-8 md:p-10
            text-white
            shadow-xl
          "
        >
          {/* ================= LEFT ================= */}
          <div>
            <span className="inline-block mb-2 px-3 py-1 rounded-full bg-white/15 text-xs">
              🚀 MVP Development Services
            </span>

            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Build & launch your
              <span className="block bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
                MVP Faster & Smarter
              </span>
            </h2>

            <p className="mt-1 text-sm text-white/85 max-w-lg">
              Validate your idea quickly with a scalable MVP built by
              experienced product engineers. We help startups and enterprises
              turn concepts into market-ready products with speed and precision.
            </p>

            <ul className="mt-3 space-y-1.5 text-xs text-white/85">
              <li>✔ Rapid MVP Design & Development</li>
              <li>✔ Web, Mobile & Power Platform MVPs</li>
              <li>✔ Cloud, API & Database Integration</li>
              <li>✔ Iterative Delivery & Product Scaling</li>
            </ul>

            <div className="mt-3 flex gap-8">
              <div>
                <p className="text-xl font-semibold">50+</p>
                <p className="text-[11px] text-white/70">MVPs Launched</p>
              </div>
              <div>
                <p className="text-xl font-semibold">90%</p>
                <p className="text-[11px] text-white/70">Ideas Validated</p>
              </div>
              <div>
                <p className="text-xl font-semibold">4–6 Weeks</p>
                <p className="text-[11px] text-white/70">Go-to-Market</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT – FORM ================= */}
          <div className="relative">
            <div className="absolute -inset-2 bg-white/10 blur-xl rounded-3xl" />

            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold">
                Request Expert Consultation
              </h3>

              <p className="text-xs text-white/70 mb-4">
                Discuss your challenges with an MVP specialist
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
                🔒 Confidential • NDA Available • No Spam
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}