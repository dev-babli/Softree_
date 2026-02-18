export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/globe.png')", // change path
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl pl-6 md:pl-16 lg:pl-24 text-white">
        {/* Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
              alt="Microsoft"
              className="h-5 w-5"
            />
            Microsoft Partner
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Your Trusted{" "}
          <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Global Microsoft
          </span>{" "}
          Technology Delivery Partner
        </h1>

        {/* Sub text */}
        <p className="text-lg text-white/80 max-w-2xl mb-8">
          Engineering support across Power Platform, Data, AI & Modern
          Applications.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
            Partner With Us
          </button>

          <button className="px-6 py-3 rounded-lg border border-white/30 hover:bg-white/10 transition">
            Schedule a Strategy Call
          </button>
        </div>

        {/* Bottom line */}
        <div className="mt-8 flex items-center text-sm text-white/60">
          <span>White-Label Friendly</span>

          <span className="mx-3 h-4 w-px bg-white/30" />

          <span>NDA-Driven</span>

          <span className="mx-3 h-4 w-px bg-white/30" />

          <span>Since 2013</span>
        </div>
        {/* ISO Certifications */}
        {/* ISO Certifications */}
        <div className="mt-10 flex flex-wrap gap-8">
          {[
            { title: "ISO 9001", subtitle: "Quality Management" },
            { title: "ISO 27001", subtitle: "Information Security" },
          ].map((item, i) => (
            <div key={i} className="relative">
              {/* Bigger Floating Tick */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-10">
                <div className="h-14 w-14 rounded-full border-2 border-blue-300 bg-blue-900/90 backdrop-blur-md flex items-center justify-center shadow-[0_0_18px_rgba(59,130,246,0.5)]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7 text-blue-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    {/* Bigger inner circle */}
                    <circle cx="12" cy="12" r="10" />

                    {/* Bigger tick */}
                    <path
                      d="M7.5 12.5l3 3L17 8.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Glass Card */}
              <div
                className="
          pl-16 pr-8 py-5
          rounded-xl
          bg-gradient-to-br 
          from-blue-900/70 
          via-blue-800/40 
          to-blue-900/70
          border border-blue-400/30
          backdrop-blur-xl
          shadow-[0_0_25px_rgba(59,130,246,0.15)]
          hover:shadow-[0_0_35px_rgba(59,130,246,0.35)]
          transition-all duration-300
        "
              >
                <div className="text-white">
                  <p className="text-base font-semibold tracking-wide">
                    {item.title}
                  </p>
                  <p className="text-xs text-blue-200/80 uppercase tracking-wider">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
