"use client";

export default function SharePointMigrationProcess() {
  const steps = [
    {
      step: "01",
      title: "Assessment & Planning",
      icon: "//evolvous.com/wp-content/uploads/2024/02/expand.png",
      points: [
        "Comprehensive assessment of existing SharePoint environments and data",
        "Migration roadmap aligned with business objectives and compliance needs",
        "Information architecture and modern site structure planning",
      ],
    },
    {
      step: "02",
      title: "Migration & Modernization",
      icon: "//evolvous.com/wp-content/uploads/2024/02/maximize.png",
      points: [
        "Secure migration of sites, lists, libraries, permissions, and metadata",
        "Modernization of classic SharePoint sites to modern experiences",
        "Hybrid and SharePoint Online configuration with minimal downtime",
      ],
    },
    {
      step: "03",
      title: "Validation & Knowledge Transfer",
      icon: "https://evolvous.com/wp-content/uploads/2024/03/file.png",
      points: [
        "Data validation, integrity checks, and user acceptance testing (UAT)",
        "Governance setup and best practices post migration",
        "Role-based training for administrators, developers, and business users",
      ],
    },
    {
      step: "04",
      title: "Support, Optimization & Governance",
      icon: "https://evolvous.com/wp-content/uploads/2024/03/nfc-symbol.png",
      points: [
        "Continuous monitoring, performance tuning, and security optimization",
        "Cost optimization and licensing best practices for Microsoft 365",
        "Ongoing support, enhancements, and governance management",
      ],
    },
  ];

  return (
    <section className="relative py-24  overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-5xl mx-auto mb-24 px-4">
          {/* Eyebrow badge */}
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-widest uppercase border border-blue-400/20">
            Migration Services
          </span>

          {/* Title */}
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-400 bg-clip-text text-transparent">
            Our SharePoint Migration Services
          </h2>

          {/* Description */}
          <p className="mt-6 text-gray-900 leading-relaxed text-lg max-w-2xl mx-auto">
            At <span className="text-black font-medium">Softree</span>, we
            deliver secure, reliable, and error-free SharePoint migrations that
            ensure smooth transitions, minimal downtime, and complete data
            integrity.
          </p>
        </div>

        {/* Cards Section Wrapper */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="
          relative group rounded-3xl p-[1px]
          bg-gradient-to-br from-white/10 to-white/0
          overflow-hidden
        "
              >
                <div
                  className="
            relative h-full rounded-3xl p-8 overflow-hidden
            bg-gradient-to-b from-[#0b1220] via-[#0e1628] to-[#050814]
            border-b-4 border-white/10
          "
                >
                  {/* Hover Background Animation */}
                  <div
                    className="
              absolute inset-0 z-0
              bg-gradient-to-t from-blue-500/40 via-purple-500/30 to-transparent
              translate-y-full
              group-hover:translate-y-0
              transition-transform duration-700 ease-out
            "
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Step Number */}
                    <span className="text-sm font-semibold text-blue-400">
                      {step.step}
                    </span>

                    {/* Icon */}
                    <div
                      className="
                mt-6 w-18 h-18 flex items-center justify-center rounded-2xl
                bg-gradient-to-br from-blue-400 to-purple-500 shadow-xl
              "
                    >
                      <img
                        src={step.icon}
                        alt={step.title}
                        className="w-8 h-8"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="mt-6 text-xl font-semibold text-white">
                      {step.title}
                    </h3>

                    {/* Points */}
                    <ul className="mt-5 space-y-3 text-gray-300 text-sm leading-relaxed">
                      {step.points.map((point, i) => (
                        <li key={i}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
