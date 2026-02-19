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
    title: "Accelerated App Delivery",
    desc: "Launch high-quality mobile applications quickly using agile execution, rapid prototyping, and proven delivery frameworks that reduce risk and speed up results.",
  },
  {
    icon: Puzzle,
    title: "Seamless Platform Integration",
    desc: "Integrate your mobile apps with enterprise systems, APIs, and cloud services through secure, scalable architectures designed for long-term growth.",
  },
];

const bottomCards: FeatureCardProps[] = [
  {
    icon: Users,
    title: "Collaborative Product Teams",
    desc: "Designers, engineers, and business stakeholders align from strategy to release, ensuring transparency and successful outcomes.",
  },
  {
    icon: Lightbulb,
    title: "User-Centric Experiences",
    desc: "Deliver intuitive, engaging mobile journeys that delight users, strengthen loyalty, and drive higher retention.",
  },
  {
    icon: Rocket,
    title: "Performance at Scale",
    desc: "Build fast, reliable apps engineered to handle growth, heavy usage, and evolving business requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    desc: "Protect user data with modern security practices, governance standards, and continuous monitoring across devices.",
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
                Why Enterprises Trust Our Mobile Expertise
              </p>

              {/* headline */}
              <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-slate-900">
                Your Partner for{" "}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-bold">
                  Mobile App Innovation
                </span>
              </h2>

              {/* description */}
              <p className="mt-5 text-lg text-slate-600">
                We design, develop, and scale mobile applications that align
                with your strategy — enhancing engagement, enabling mobility,
                and accelerating digital growth.
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
