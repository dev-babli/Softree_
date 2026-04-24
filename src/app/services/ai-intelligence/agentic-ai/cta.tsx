"use client";

import { useState } from "react";

export default function CtaAgenticAI() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

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

        // auto hide message after 3 sec
        setTimeout(() => setStatus(""), 3000);
      } else {
        setStatus("ERROR");
      }
    } catch {
      setStatus("ERROR");
    }

    setLoading(false);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div
          className="
            grid md:grid-cols-2 gap-10 items-center
            rounded-3xl
            bg-gradient-to-br from-indigo-700 via-blue-700 to-cyan-700
            p-8 md:p-10
            text-white
            shadow-xl
          "
        >
          {/* ================= LEFT ================= */}
          <div>
            <span className="inline-block mb-2 px-3 py-1 rounded-full bg-white/15 text-xs">
              🤖 Build Agentic AI Systems
            </span>

            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Hire experts to design
              <span className="block bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
                Autonomous AI Agents
              </span>
            </h2>

            <p className="mt-1 text-sm text-white/85 max-w-lg">
              Move beyond copilots. Build intelligent agents that plan, decide,
              act, and continuously improve across your enterprise workflows.
            </p>

            <ul className="mt-3 space-y-1.5 text-xs text-white/85">
              <li>✔ Multi-Agent Architecture & Orchestration</li>
              <li>✔ Secure Enterprise Integrations</li>
              <li>✔ Human-in-the-Loop & Governance</li>
              <li>✔ Continuous Learning & Optimization</li>
            </ul>

            <div className="mt-3 flex gap-8">
              <div>
                <p className="text-xl font-semibold">40+</p>
                <p className="text-[11px] text-white/70">
                  AI Engineers & Architects
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold">95%</p>
                <p className="text-[11px] text-white/70">Deployment Success</p>
              </div>
              <div>
                <p className="text-xl font-semibold">30 Days</p>
                <p className="text-[11px] text-white/70">POC to Production</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT – MINI FORM ================= */}
          <div className="relative">
            <div className="absolute -inset-2 bg-white/10 blur-xl rounded-3xl" />

            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold">
                Get Free Agentic AI Consultation
              </h3>

              <p className="text-xs text-white/70 mb-4">
                Share your use case — our architects will respond within 24
                hours.
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-400 to-indigo-500 py-2.5 rounded-lg text-xs font-medium shadow hover:scale-[1.03] transition disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Get Free Estimate"}
                </button>
              </form>

              {/* ✅ STATUS MESSAGE */}
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
