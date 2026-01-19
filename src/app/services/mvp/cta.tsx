"use client";

export default function CtaMvp() {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      {/* ===== Background ===== */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-30%] h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600/40 via-indigo-500/40 to-fuchsia-600/40 blur-[140px]" />
        <div className="absolute right-[-15%] bottom-[-35%] h-[600px] w-[600px] rounded-full bg-violet-500/30 blur-[140px]" />
      </div>

      {/* ===== Layout ===== */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-28 md:grid-cols-2">
        {/* ================= LEFT ================= */}
        <div className="flex flex-col justify-center">
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
            🚀 MVP Development Company
          </span>

          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
            Build{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              MVPs that validate ideas
            </span>{" "}
            and attract users
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/70">
            From idea validation to market-ready MVPs — trusted by founders,
            startups, and product teams worldwide.
          </p>

          {/* Social Proof */}
          <div className="mt-8 grid grid-cols-3 gap-6 max-w-md text-white">
            <div>
              <p className="text-2xl font-semibold">180+</p>
              <p className="text-sm text-white/60">MVPs Launched</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">10+ yrs</p>
              <p className="text-sm text-white/60">Product Experience</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">97%</p>
              <p className="text-sm text-white/60">Founder Satisfaction</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/book-call"
              className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-7 py-3 text-sm font-medium text-white transition hover:scale-[1.05]"
            >
              Book Free MVP Strategy Call
            </a>

            <a
              href="https://wa.me/91XXXXXXXXXX"
              className="rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
            >
              WhatsApp Our MVP Team
            </a>
          </div>
        </div>

        {/* ================= RIGHT – FORM ================= */}
        <div className="relative">
          {/* Gradient Border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/40 to-fuchsia-600/40 blur-[1px]" />

          <div className="relative rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="text-xl font-semibold text-white">
              Get Your MVP Cost Estimate
            </h3>
            <p className="mb-6 text-sm text-white/60">
              Share a few details — we’ll respond within 24 hours
            </p>

            <form className="space-y-5">
              {/* Row 1 */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-white/70">
                    Full Name
                  </label>
                  <input
                    placeholder="John Doe"
                    className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/15 focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-white/70">
                    Work Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@startup.com"
                    className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/15 focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-white/70">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/15 focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-white/70">
                    MVP Platform
                  </label>
                  <select className="w-full appearance-none rounded-xl bg-black/40 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/15 focus:ring-2 focus:ring-violet-500">
                    <option value="">Select platform</option>
                    <option>Web MVP</option>
                    <option>Mobile MVP</option>
                    <option>Web + Mobile MVP</option>
                    <option>Not Sure</option>
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-white/70">
                    Product Category
                  </label>
                  <select className="w-full appearance-none rounded-xl bg-black/40 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/15 focus:ring-2 focus:ring-violet-500">
                    <option value="">Select category</option>
                    <option>SaaS</option>
                    <option>Marketplace</option>
                    <option>On-Demand</option>
                    <option>FinTech</option>
                    <option>HealthTech</option>
                    <option>EdTech</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-white/70">
                    Estimated MVP Budget
                  </label>
                  <select className="w-full appearance-none rounded-xl bg-black/40 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/15 focus:ring-2 focus:ring-violet-500">
                    <option value="">Select budget</option>
                    <option>Under $5k</option>
                    <option>$5k – $15k</option>
                    <option>$15k – $30k</option>
                    <option>$30k+</option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-sm font-medium text-white shadow-lg transition hover:scale-[1.03]"
              >
                Get Free MVP Estimate
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-white/50">
              🔒 NDA Protected • No Spam • 100% Confidential
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
