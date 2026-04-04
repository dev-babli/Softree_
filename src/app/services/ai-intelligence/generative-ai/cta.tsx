"use client";

export default function CtaGenAI() {
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
            {/* badge */}
            <span className="inline-block mb-2 px-3 py-1 rounded-full bg-white/15 text-xs">
              ✨ Build Generative AI Solutions
            </span>

            {/* heading */}
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Hire experts to build
              <span className="block bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
                Enterprise GenAI Systems
              </span>
            </h2>

            {/* desc */}
            <p className="mt-1 text-sm text-white/85 max-w-lg">
              From copilots to knowledge assistants, we design generative AI
              platforms that reason over your data, automate workflows, and
              deliver measurable business outcomes.
            </p>

            {/* benefits */}
            <ul className="mt-3 space-y-1.5 text-xs text-white/85">
              <li>✔ LLM, RAG & Prompt Engineering</li>
              <li>✔ Secure Enterprise Data Integration</li>
              <li>✔ Guardrails, Evaluation & Governance</li>
              <li>✔ Continuous Optimization & Scaling</li>
            </ul>

            {/* stats */}
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

            {/* buttons */}
            <div className="mt-3 flex gap-3 flex-wrap">
              <a
                href="/contact"
                className="bg-white text-indigo-700 px-6 py-2.5 rounded-lg text-xs font-medium shadow hover:scale-105 transition"
              >
                Talk to GenAI Experts
              </a>
            </div>
          </div>

          {/* ================= RIGHT – MINI FORM ================= */}
          <div className="relative">
            <div className="absolute -inset-2 bg-white/10 blur-xl rounded-3xl" />

            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold">
                Get Free Generative AI Consultation
              </h3>

              <p className="text-xs text-white/70 mb-4">
                Tell us your use case — our specialists will reach out within 24
                hours.
              </p>

              <form className="space-y-3">
                <input
                  placeholder="Full Name"
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-300"
                />

                <input
                  placeholder="Work Email"
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-300"
                />

                <select className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-xs outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-cyan-300">
                  <option>Project Goal</option>
                  <option>Build AI Copilot</option>
                  <option>Enterprise Search / RAG</option>
                  <option>Content & Document Automation</option>
                  <option>Modernize Business Workflows</option>
                </select>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-400 to-indigo-500 py-2.5 rounded-lg text-xs font-medium shadow hover:scale-[1.03] transition"
                >
                  Get Free Estimate
                </button>
              </form>

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
