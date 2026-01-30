"use client";

import { Briefcase, TrendingUp, Layers, Globe } from "lucide-react";

export default function WhySoftreeSection() {
  return (
    <section
      id="HomeWhySoftree"
      className="relative bg-black text-white py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADING */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-12">
          Why Softree — Delivering Outcomes That Matter
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT CONTENT */}
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              Softree helps organizations turn complex challenges into scalable
              digital solutions. We partner with growth-focused companies to
              design, build, and modernize software using proven engineering
              practices and emerging technologies.
            </p>

            <p>
              With a global delivery model and deep technical expertise, we
              support startups and enterprises across product engineering,
              cloud, data, AI, and security initiatives.
            </p>

            <ul className="space-y-3 mt-6 list-disc list-inside">
              <li>Proven experience delivering complex software platforms</li>
              <li>Scalable, secure, and future-ready engineering practices</li>
              <li>Agile delivery aligned with your product roadmap</li>
              <li>Experienced teams operating across time zones</li>
              <li>Reusable accelerators to reduce delivery risk</li>
              <li>Clear communication and transparent processes</li>
            </ul>
          </div>

          {/* RIGHT STATS */}
          <div className="grid grid-cols-2 gap-6">
            <StatCard
              icon={Briefcase}
              value="250+"
              label="Successful Client Engagements"
            />
            <StatCard
              icon={TrendingUp}
              value="99%"
              label="Projects Meeting or Exceeding Goals"
            />
            <StatCard
              icon={Layers}
              value="12+"
              label="Industries Served Globally"
            />
            <StatCard
              icon={Globe}
              value="24/7"
              label="Global Delivery & Support Coverage"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* STAT CARD */
function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: any;
  value: string;
  label: string;
}) {
  return (
    <div
      className="bg-white/5 backdrop-blur-xl
      border border-white/10 rounded-2xl
      p-6 transition hover:border-blue-500/40"
    >
      <Icon className="w-8 h-8 text-blue-400 mb-4" strokeWidth={1.5} />

      <strong className="block text-4xl font-bold text-white mb-2">
        {value}
      </strong>

      <span className="text-sm text-gray-300">{label}</span>
    </div>
  );
}
