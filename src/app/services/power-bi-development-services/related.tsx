import { BarChart3, PieChart, LineChart } from "lucide-react";

export default function RelatedServices() {
  const services = [
    {
      title: "Tableau Dashboard Engineering",
      desc: "Develop enterprise-grade Tableau dashboards that deliver real-time insights through intuitive, high-performance visualizations.",
      icon: BarChart3,
    },
    {
      title: "Advanced Data Analytics",
      desc: "Transform raw data into strategic intelligence using advanced analytics, enabling organizations to make proactive, data-driven decisions.",
      icon: PieChart,
    },
    {
      title: "Data Visualization Excellence",
      desc: "Elevate data storytelling with visually compelling, user-centric designs that simplify complexity and enhance business understanding.",
      icon: LineChart,
    },
  ];

  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
            Related Services
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Explore complementary solutions designed to enhance your data
            strategy and accelerate business growth.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, i) => {
            const Icon = service.icon;

            return (
              <div
                key={i}
                className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-transparent hover:from-indigo-500 hover:via-purple-500 transition duration-500 hover:-translate-y-3"
              >
                {/* Glass Card */}
                <div className="relative h-full rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/40 p-8 shadow-md hover:shadow-2xl transition duration-500 overflow-hidden">
                  {/* 🔥 Spotlight Hover Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_70%)]" />

                  {/* 💡 Floating Glow */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl group-hover:scale-125 transition duration-700" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition duration-300">
                      <Icon className="w-7 h-7" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-indigo-600 transition">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
