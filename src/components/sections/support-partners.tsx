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
      <h2 className="text-center text-3xl font-semibold mb-6">
        How We Support{" "}
        <span
          className="inline-block bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #ff7a2f 0%, #c75a2a 35%, #6b5b5b 70%, #3a3a3a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Microsoft & Consulting Partners
        </span>
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
                <h3 className="text-lg font-bold bg-white to-cyan-300 bg-clip-text text-transparent">
                  {card.title}
                </h3>

                <p className="text-sm text-white/60 mt-1 max-w-md">
                  {card.desc}
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-white/10 mb-4" />

            <div className="grid grid-cols-2 gap-6">
              {/* TECH LIST */}
              <ul className="space-y-4">
                {card.tech.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-3 text-sm text-gray-600 group transition"
                  >
                    {/* TICK ICON */}
                    <div className="flex items-center justify-center w-7 h-7 rounded-full  bg-blue-900 group-hover:bg-orange-600 transition text-white text-xs font-bold">
                      ✓
                    </div>

                    {/* TEXT */}
                    <span className="group-hover:text-gray-900 transition font-medium">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>

              {/* PARTNER VALUE */}
              <div
                className="
      relative
      rounded-2xl
      p-6
      bg-white
      border border-gray-200
      shadow-[0_4px_20px_rgba(0,0,0,0.04)]
      transition-all duration-300
      hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)]
      hover:-translate-y-1
      hover:border-orange-300
    "
              >
                {/* TOP ACCENT LINE */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-400 via-orange-300 to-transparent rounded-t-2xl" />

                {/* TITLE */}
                <p className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-3 flex items-center gap-2">
                  <span className="text-orange-500 text-base">*</span>
                  <span className="font-semibold text-gray-900">
                    Partner Value
                  </span>
                </p>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-600 leading-relaxed">
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
