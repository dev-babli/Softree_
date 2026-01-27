"use client";

export default function QualityBenchmarkUltra() {
  const steps = [
    {
      step: "01",
      title: "Experience-Driven Design",
      points: [
        "User-first UX strategy backed by research",
        "Consistent brand identity across interfaces",
        "Mobile-first, fully responsive layouts",
        "Modern UI crafted for engagement & conversion",
      ],
    },
    {
      step: "02",
      title: "Engineering Excellence",
      points: [
        "Clean, modular & scalable code architecture",
        "Industry-proven development standards",
        "Git-driven workflows with version control",
        "Automated testing for reliability & quality",
      ],
    },
    {
      step: "03",
      title: "Enterprise-Grade Security",
      points: [
        "Security-first development lifecycle",
        "Continuous vulnerability monitoring",
        "Secure cloud & infrastructure hardening",
        "Data encryption and access control policies",
      ],
    },
  ];

  return (
    <section
      id="plan-pricing"
      className="relative overflow-hidden bg-gradient-to-b from-black via-[#020d1a] to-black
  py-36"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        {/* ===== Heading ===== */}
        <div className="mx-auto mb-32 max-w-4xl text-center">
          {/* Eyebrow */}
          <span className="relative mb-6 inline-block text-xs uppercase tracking-[0.3em] text-gray-400">
            Quality Framework
            <span className="absolute left-1/2 top-full mt-2 h-[2px] w-10 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-emerald-400" />
          </span>

          {/* Main Heading */}
          <h2 className="mt-6 text-4xl lg:text-4xl font-light leading-tight text-white">
            Our Standard for Building{" "}
            <span className="italic text-emerald-400">Reliable, Scalable</span>{" "}
            <br />
            Web Experiences
            <span className="text-cyan-400">.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-center text-base lg:text-lg leading-relaxed text-gray-400">
            Our development process is built on proven standards that ensure
            performance, security, and scalability at every stage. From
            thoughtful design to production-ready engineering, we follow a
            disciplined framework that delivers reliable, high-impact digital
            products.
          </p>
        </div>
        {/* ===== Timeline ===== */}
        <div className="relative">
          {/* Timeline Line */}
          <div
            className="absolute top-7 left-0 right-0 h-px 
               bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          />

          {/* Steps Grid */}
          <div
            className="relative grid grid-cols-1 md:grid-cols-3 
               gap-10 items-stretch"
          >
            {steps.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col items-center w-full h-full"
              >
                {/* Step Node */}
                <div className="relative z-10 mb-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#05070C]">
                  <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-md opacity-0 group-hover:opacity-100 transition" />
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full 
                       border border-white/20 text-sm font-semibold 
                       tracking-widest text-white backdrop-blur"
                  >
                    {item.step}
                  </div>
                </div>

                {/* Card */}
                <div
                  className="relative flex h-full w-full flex-col 
                     min-h-[380px] 
                     rounded-3xl border border-white/10 
                     bg-gradient-to-br from-white/[0.08] to-white/[0.02] 
                     p-10 backdrop-blur-xl 
                     transition-all duration-300 
                     group-hover:border-cyan-400/40 
                     group-hover:scale-[1.02]"
                >
                  {/* FULL DIV bottom glow */}
                  <span
                    className="pointer-events-none absolute inset-0 rounded-3xl 
                       bg-gradient-to-t from-cyan-400/20 via-cyan-400/10 to-transparent
                       opacity-60 blur-2xl"
                  />

                  {/* Title */}
                  <h3 className="relative z-10 mb-6 text-center">
                    <span
                      className="inline-block rounded-full 
                         bg-cyan-400/10 
                         px-4 py-1.5
                         text-xl font-medium text-white
                         border border-cyan-400/20"
                    >
                      {item.title}
                    </span>
                  </h3>

                  {/* Content */}
                  <ul
                    className="relative z-10 mt-auto space-y-4 text-left text-gray-300 
                       text-[15.5px] leading-relaxed"
                  >
                    {item.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {/* Circle + Tick */}
                        <span
                          className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center 
                             rounded-full border border-cyan-400/40 
                             bg-cyan-400/10"
                        >
                          <svg
                            className="h-3 w-3 text-cyan-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </span>

                        <span className="break-words">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
