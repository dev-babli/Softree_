"use client";

export default function ContactPage() {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* MAIN GRID */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-20 items-stretch">
        {/* LEFT CONTENT */}
        <div className="h-full flex flex-col justify-between">
          {/* TOP TEXT */}
          <div>
            <span className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-white/10 border border-white/20">
              Trusted Digital Engineering Partner
            </span>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Powering Businesses with <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Scalable Digital <br /> Engineering Solutions
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-300 max-w-xl">
              Softree helps organizations design, develop, and modernize digital
              platforms with a focus on performance, security, and long-term
              scalability.
            </p>
          </div>

          {/* FEATURE CARDS */}
          <div className="mt-16 grid sm:grid-cols-2 gap-10 max-w-4xl">
            {[
              {
                title: "Share Your Requirements",
                desc: "Tell us about your business goals, technical needs, and challenges.",
                icon: "🧠",
              },
              {
                title: "Expert Consultation",
                desc: "Engage with Softree’s solution architects for a focused discussion.",
                icon: "🤝",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-cyan-400/40 to-blue-600/40 hover:from-cyan-400 hover:to-blue-600 transition-all duration-500"
              >
                <div className="relative h-full rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 overflow-hidden hover:-translate-y-3 transition duration-500 shadow-lg hover:shadow-[0_40px_80px_rgba(0,255,255,0.18)]">
                  {/* Glow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition" />

                  {/* Icon */}
                  <div className="relative w-12 h-12 mb-6 flex items-center justify-center rounded-xl bg-white/15 border border-white/20 text-xl">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <h3 className="relative text-lg font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="relative text-sm text-gray-300 leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Shine sweep */}
                  <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-full transition-all duration-700" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="relative h-full flex flex-col bg-white/95 text-black rounded-[32px] shadow-[0_40px_120px_rgba(0,0,0,0.4)] p-10">
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-2xl opacity-60" />

          <div>
            <h3 className="text-2xl font-semibold mb-2">
              Start Your Digital Transformation
            </h3>
            <p className="text-sm text-gray-500 mb-8">
              Share your requirements and our Softree experts will connect with
              you to discuss the best solution for your business.
            </p>
          </div>

          <form className="space-y-6 flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <input className="input" placeholder="Full Name" />
                <input className="input" placeholder="Business Email" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <select className="input">
                  <option>Estimated Project Budget</option>
                  <option>$5k – $10k</option>
                  <option>$10k – $25k</option>
                  <option>$25k+</option>
                </select>
                <input className="input" placeholder="Contact Number" />
              </div>

              <textarea
                rows={4}
                className="input resize-none"
                placeholder="Briefly describe your project goals, scope, or challenges..."
              />

              <label className="group relative cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center transition hover:border-cyan-500 hover:bg-cyan-50">
                <input
                  type="file"
                  multiple
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg"
                />

                {/* Icon */}
                <svg
                  className="w-8 h-8 mb-3 text-gray-400 group-hover:text-cyan-500 transition"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16v-8m0 0l-3 3m3-3l3 3M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                  />
                </svg>

                {/* Text */}
                <p className="text-sm font-medium text-gray-700">
                  Upload project brief, RFP, or reference files
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF, DOCX, PPT, XLS, JPG (Max 10MB)
                </p>
              </label>

              <div className="space-y-3 text-sm text-gray-700">
                <label className="flex gap-2 items-center">
                  <input type="checkbox" defaultChecked />
                  Request a confidentiality agreement (NDA)
                </label>
                <label className="flex gap-2 items-center">
                  <input type="checkbox" />
                  Subscribe to Softree technology insights
                </label>
              </div>
            </div>

            <button className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition">
              Request Consultation
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
