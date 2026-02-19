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
/* ================= DATA ================= */

const topCards: FeatureCardProps[] = [
  {
    icon: ClipboardCheck,
    title: "Modern SharePoint Intranet Solutions",
    desc: "Design and deploy engaging, user-friendly SharePoint intranet portals that centralize communication, improve collaboration, and enhance employee experience. We build structured, scalable digital workplaces aligned with your business goals.",
  },
  {
    icon: Puzzle,
    title: "Seamless Microsoft 365 Integration",
    desc: "Extend SharePoint capabilities by integrating with Microsoft Teams, Power Platform, OneDrive, and Dynamics 365. We create connected digital ecosystems that unify content, automate workflows, and streamline enterprise collaboration.",
  },
];

const bottomCards: FeatureCardProps[] = [
  {
    icon: Users,
    title: "Collaboration & Communication",
    desc: "Enable secure document sharing, team sites, and communication hubs that improve cross-department collaboration and knowledge management.",
  },
  {
    icon: Lightbulb,
    title: "Workflow Automation",
    desc: "Automate document approvals, task management, and business processes using SharePoint workflows and Power Automate to reduce manual effort.",
  },
  {
    icon: Rocket,
    title: "Scalable & Structured Architecture",
    desc: "Implement well-structured site architecture, metadata management, and governance models that support long-term scalability and performance.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Governance",
    desc: "Ensure enterprise-grade security, compliance policies, role-based access control, and data protection aligned with Microsoft best practices.",
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
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-slate-900">
                Your Trusted Partner for {}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-bold">
                  SharePoint Solutions & Modern Workplace
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
