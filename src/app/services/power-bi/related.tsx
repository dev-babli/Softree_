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
    <section className="py-16 bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
            Related Services
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Explore complementary solutions designed to enhance your data
            strategy and accelerate business growth.
          </p>
        </div>

      {/* Cards */}
<div className="grid md:grid-cols-3 gap-8">
  {services.map((service, i) => {
    const Icon = service.icon;

    return (
      <div
        key={i}
        className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-transparent hover:from-indigo-500 hover:via-purple-500 transition duration-500"
      >
        {/* Inner Card */}
        <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white/40 shadow-md hover:shadow-2xl transition duration-500 overflow-hidden">
          
          {/* Glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />

          {/* Icon */}
          <div className="relative z-10 w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition duration-300">
            <Icon className="w-7 h-7" />
          </div>

          {/* Title */}
          <h3 className="relative z-10 text-xl font-semibold text-slate-900 mb-3 group-hover:text-indigo-600 transition">
            {service.title}
          </h3>

          {/* Description */}
          <p className="relative z-10 text-slate-600 leading-relaxed text-sm">
            {service.desc}
          </p>

          {/* CTA */}
          <div className="relative z-10 mt-6 flex items-center gap-2 text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition duration-300">
            Learn more →
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-indigo-500 to-purple-600 group-hover:w-full transition-all duration-500" />
        </div>
      </div>
    );
  })}
</div>
      </div>
    </section>
  );
}
