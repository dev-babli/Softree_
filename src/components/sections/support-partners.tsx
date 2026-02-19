export default function SupportPartners() {
  const data = [
    {
      title: "Business Applications Delivery Support",
      desc: "Helping partners execute Power Platform and Dynamics implementations.",
      tech: ["Power Apps", "Power Automate", "Dataverse", "Dynamics 365 F&O"],
      partner: "We operate as your extended Power Platform engineering team.",
      icon: "💼",
    },
    {
      title: "Data & Analytics Execution",
      desc: "Building scalable data solutions and BI environments for partners.",
      tech: ["Power BI", "Microsoft Fabric", "Databricks", "Snowflake"],
      partner:
        "We bring reliable data engineering and up-to-date analytics expertise.",
      icon: "📊",
    },
    {
      title: "AI & Intelligent Automation",
      desc: "Integrating AI solutions to improve business processes and experiences.",
      tech: [
        "Azure AI Foundry",
        "Copilot Integration",
        "AI Agents",
        "RAG Workflows",
      ],
      partner: "Operate with confidence using our AI integration expertise.",
      icon: "🤖",
    },
    {
      title: "Digital Workspace & App Engineering",
      desc: "Enhancing and extending your Microsoft 365 collaboration environments.",
      tech: [
        "SharePoint Online",
        "Microsoft 365",
        "Web Applications",
        "Mobile Applications",
      ],
      partner: "Securely deliver and support modern workspace solutions.",
      icon: "💻",
    },
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-black via-[#020d1a] to-black text-white">
      {/* ================= HEADING ================= */}
      <h2 className="text-center text-3xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
        How We Support Microsoft & Consulting Partners
      </h2>

      <p className="text-center text-white/70 max-w-3xl mx-auto">
        We collaborate with Microsoft partners and consulting firms to extend
        delivery capacity, accelerate implementations, and provide deep
        technical expertise across business applications, data, AI, and modern
        workplace solutions.
      </p>

      {/* ================= GRID ================= */}
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mt-6">
        {data.map((card, i) => (
          <div
            key={i}
            className="
              relative
              rounded-2xl
              p-6
              border border-white/10
           bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_40%,rgba(0,0,0,0.25))]

              hover:border-blue-400/40
              hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]
              transition-all duration-300
            "
          >
            {/* TITLE */}
            <div className="flex items-start gap-3 mb-3">
              <div className="text-2xl">{card.icon}</div>

              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {card.title}
                </h3>

                <p className="text-sm text-white/60 mt-1 max-w-md">
                  {card.desc}
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-white/10 mb-4" />

            <div className="grid grid-cols-2 gap-4">
              {/* TECH LIST */}
              <ul className="space-y-3">
                {card.tech.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-3 text-sm text-blue-100"
                  >
                    <svg
                      className="w-5 h-5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="12"
                        className="fill-blue-500/15"
                      />
                      <path
                        d="M7 12.5l3.2 3.2L17 9"
                        stroke="rgb(96 165 250)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    {t}
                  </li>
                ))}
              </ul>

              {/* PARTNER VALUE */}
              <div
                className="
    relative
    rounded-xl
    p-5
    border border-blue-400/30   /* always visible light border */
    bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_40%,rgba(0,0,0,0.25))]
    transition-all duration-300
    hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]
  "
              >
                <p className="text-[16px] tracking-wider uppercase text-blue-300 mb-2 flex items-center gap-1 font-bold">
                  <span className="text-blue-400 font-bold">*</span>
                  Partner Value
                </p>

                {/* description */}
                <p className="text-sm text-gray-200 leading-relaxed">
                  {card.partner}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
