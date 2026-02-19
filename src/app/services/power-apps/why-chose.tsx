import React from "react";
import {
  ClipboardCheck,
  Puzzle,
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
    icon: ClipboardCheck,
    title: "Rapid Solution Delivery",
    desc: "Transform manual, paper-based, or disconnected processes into powerful digital workflows in a matter of weeks. Our structured discovery, rapid prototyping, and iterative delivery model accelerates validation, minimizes implementation risk, and demonstrates measurable business value early in the journey.",
  },
  {
    icon: Puzzle,
    title: "Microsoft Ecosystem Integration",
    desc: "Extend the value of your Microsoft investments by seamlessly connecting Power Apps with Microsoft 365, SharePoint, Teams, Dynamics, and external enterprise platforms. We design secure, scalable, and future-ready architectures that unify data, automate operations, and enable connected experiences across your organization.",
  },
];

const bottomCards: FeatureCardProps[] = [
  {
    icon: Users,
    title: "Business & IT Alignment",
    desc: "Empower citizen developers while maintaining IT governance, ensuring innovation happens safely and strategically.",
  },
  {
    icon: Lightbulb,
    title: "Process Optimization",
    desc: "Digitize operations, eliminate inefficiencies, and enable smarter decisions with automated workflows and real-time data.",
  },
  {
    icon: Rocket,
    title: "Scalable Platforms",
    desc: "Build flexible applications that evolve with your organization, supporting growth without reengineering.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    desc: "Maintain enterprise-grade security, role-based access, and governance aligned with Microsoft best practices.",
  },
];

/* ================= COMPONENT ================= */

export default function WhyChooseUs() {
  return (
    <section className="py-15 bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= TOP SECTION ================= */}
        <div className="grid lg:grid-cols-3 gap-12 items-stretch">
          {/* LEFT HEADING */}
          <div className="flex">
            <div className="my-auto max-w-xl">
              {/* eyebrow */}
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-600 mb-4">
                Why Organizations Choose Us
              </p>

              {/* headline */}
              <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-slate-900">
                Your Trusted Partner for{" "}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-bold">
                  Power Apps Transformation
                </span>
              </h2>

              {/* description */}
              <p className="mt-5 text-lg text-slate-600">
                We design, build, and scale low-code solutions that modernize
                operations, empower teams, and unlock productivity across the
                Microsoft platform.
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
    <div
      className="group rounded-3xl p-8 text-white bg-gradient-to-br from-blue-900 to-indigo-800
 shadow-lg hover:-translate-y-2 transition duration-300"
    >
      <Icon className="w-8 h-8 text-emerald-300 mb-6" />

      <h3 className="text-xl font-semibold mb-3">{title}</h3>

      <p className="text-emerald-100/80 leading-relaxed">{desc}</p>
    </div>
  );
}
