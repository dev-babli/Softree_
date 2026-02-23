import React from "react";
import {
  BarChart3,
  Database,
  Users,
  Lightbulb,
  ShieldCheck,
  Rocket,
  LucideIcon,
} from "lucide-react";

/* ================= TYPES ================= */

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

/* ================= DATA ================= */

const topCards: FeatureCardProps[] = [
  {
    icon: BarChart3,
    title: "Interactive Dashboard Development",
    desc: "Design executive-ready Power BI dashboards that transform complex data into clear, actionable insights. We focus on intuitive layouts, drill-down capabilities, and real-time KPI tracking to support faster and smarter decision-making across departments.",
  },
  {
    icon: Database,
    title: "Enterprise Data Modeling",
    desc: "Build scalable data models using best-practice star schemas, optimized DAX calculations, and performance-tuned datasets. We ensure your reporting foundation is structured, governed, and built to handle growing data volumes.",
  },
];

const bottomCards: FeatureCardProps[] = [
  {
    icon: Users,
    title: "Business-Driven Analytics",
    desc: "Align reporting strategy with leadership objectives to deliver meaningful insights, not just visuals. We collaborate with stakeholders to define KPIs that directly impact performance and growth.",
  },
  {
    icon: Lightbulb,
    title: "Advanced Insights & Forecasting",
    desc: "Leverage advanced analytics, trend analysis, and predictive modeling to uncover patterns, forecast outcomes, and drive proactive decision-making.",
  },
  {
    icon: Rocket,
    title: "Scalable BI Architecture",
    desc: "Develop flexible Power BI solutions integrated with Azure, Microsoft 365, and enterprise systems, enabling secure, scalable, and future-ready analytics platforms.",
  },
  {
    icon: ShieldCheck,
    title: "Data Governance & Security",
    desc: "Implement role-based access, row-level security (RLS), compliance controls, and governance frameworks aligned with Microsoft best practices to protect sensitive data.",
  },
];

/* ================= COMPONENT ================= */

export default function WhyChooseUs() {
  return (
    <section className="py-25 bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= TOP SECTION ================= */}
        <div className="grid lg:grid-cols-3 gap-12 items-stretch">
          {/* LEFT HEADING */}
          <div className="flex">
            <div className="my-auto max-w-xl">
              {/* eyebrow */}
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-4">
                Why Organizations Choose Us
              </p>

              {/* headline */}
              <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-slate-900">
                Your Strategic Partner for{" "}
                <span className="bg-gradient-to-r from-blue-500 to-blue-500 bg-clip-text text-transparent font-bold">
                  Power BI Excellence
                </span>
              </h2>

              {/* description */}
              <p className="mt-5 text-lg text-slate-600">
                We design, build, and scale modern business intelligence
                solutions that transform data into strategic advantage across
                your Microsoft ecosystem.
              </p>
            </div>
          </div>

          {/* RIGHT TWO CARDS */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8 h-full">
            {topCards.map((item, i) => (
              <FeatureCard key={i} {...item} />
            ))}
          </div>
        </div>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {bottomCards.map((item, i) => (
            <FeatureCard key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= REUSABLE CARD ================= */

function FeatureCard({ icon: Icon, title, desc }: FeatureCardProps) {
  return (
    <div className="group rounded-3xl p-8 text-white bg-gradient-to-r from-black via-[#0f2f7a] to-black shadow-lg hover:-translate-y-2 transition duration-300">
      <Icon className="w-8 h-8 text-blue-400 mb-6" />

      <h3 className="text-xl font-semibold mb-3">{title}</h3>

      <p className="text-slate-300 leading-relaxed">{desc}</p>
    </div>
  );
}
