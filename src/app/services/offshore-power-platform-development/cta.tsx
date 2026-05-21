"use client";

import { useState } from "react";

export default function CtaPowerApps() {
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
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div
          className="
          grid grid-cols-1 md:grid-cols-2 gap-10
          items-center
          rounded-[28px]
          bg-gradient-to-br from-[#0b3ea8] via-[#1557c0] to-[#1e73d8]
          p-8 md:p-10
          shadow-xl border border-white/10 text-white
        "
        >
          {/* ================= LEFT ================= */}
          <div className="flex flex-col justify-center">
            <span className="mb-2 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
              👨‍💻 Hire Power Apps Developers
            </span>

            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Hire expert{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Power Apps developers
              </span>{" "}
              to build smarter business apps
            </h2>

            <p className="mt-2 max-w-xl text-sm text-white/80">
              Accelerate your digital transformation with certified Power Apps
              developers who build secure, scalable, and high-performance
              applications tailored to your business needs.
            </p>

            <ul className="mt-4 space-y-1.5 text-xs text-white/80">
              <li>✔ Dedicated Power Apps Developers</li>
              <li>✔ Custom Canvas & Model-Driven Apps</li>
              <li>✔ Power Automate & SharePoint Integration</li>
              <li>✔ Flexible Hiring Models</li>
            </ul>

            <div className="mt-3 flex gap-8">
              <div>
                <p className="text-xl font-semibold">70+</p>
                <p className="text-[11px] text-white/60">Apps Delivered</p>
              </div>
              <div>
                <p className="text-xl font-semibold">98%</p>
                <p className="text-[11px] text-white/60">Client Satisfaction</p>
              </div>
              <div>
                <p className="text-xl font-semibold">2×</p>
                <p className="text-[11px] text-white/60">Faster Delivery</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT – FORM ================= */}
          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-white/10 blur-xl" />

            <div className="relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold">
                Free Automation Estimate
              </h3>

              <p className="mb-4 text-xs text-white/70">
                We reply within 24 hours
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

              <p className="mt-3 text-center text-[10px] text-white/60">
                🔒 100% Confidential
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}