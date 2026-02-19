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
    title: "Faster Time to Launch",
    desc: "Turn ideas into production-ready digital products at speed. Our structured delivery model, modern frameworks, and proven engineering discipline reduce implementation risk while accelerating measurable business outcomes and early user value.",
  },
  {
    icon: Puzzle,
    title: "Seamless System Integration",
    desc: "Unify your web platforms with enterprise tools, APIs, and data ecosystems. We design secure, scalable architectures that enable interoperability today while providing the flexibility to evolve with future business needs.",
  },
];

const bottomCards: FeatureCardProps[] = [
  {
    icon: Users,
    title: "Collaborative Delivery",
    desc: "Designers, developers, and stakeholders work together in transparent workflows, ensuring alignment from discovery through deployment.",
  },
  {
    icon: Lightbulb,
    title: "Experience-Driven Design",
    desc: "Create intuitive, high-impact digital experiences that engage users, strengthen your brand, and increase conversion.",
  },
  {
    icon: Rocket,
    title: "Performance & Scalability",
    desc: "Build fast, resilient platforms optimized for growth, capable of supporting enterprise traffic and evolving business demands.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Reliability",
    desc: "Protect your digital assets with modern security standards, governance models, and continuous monitoring.",
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
                Why Leading Enterprises Choose Us
              </p>

              {/* headline */}
              <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-slate-900">
                Your Trusted Partner for{" "}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-bold">
                  Modern Web Development
                </span>
              </h2>

              {/* description */}
              <p className="mt-5 text-lg text-slate-600">
                We design, build, and scale modern web platforms aligned with
                your business goals — improving user engagement, streamlining
                operations, and driving sustainable digital growth.
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
