"use client";

import { Briefcase, TrendingUp, Layers, Globe } from "lucide-react";

export default function WhySoftreeSection() {
  return (
    <section
      id="HomeWhySoftree"
      className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-14"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-14">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Why Softree
          </span>{" "}
          <span className="text-zinc-900">
            — Delivering Outcomes That Matter
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT CONTENT */}
          <div className="space-y-6 text-zinc-600 leading-relaxed text-base">
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

            <ul className="space-y-3 mt-6 list-disc list-inside text-zinc-700">
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
  className="
    bg-white
    border border-zinc-200
    rounded-2xl
    p-7
    shadow-sm
    transition-all duration-300
    hover:-translate-y-1
    hover:shadow-lg
    hover:border-2
    hover:border-blue-400
  "
>
  <Icon className="w-8 h-8 text-blue-600 mb-4" strokeWidth={1.6} />

  <strong className="block text-4xl font-bold text-zinc-900 mb-2">
    {value}
  </strong>

  <span className="text-sm text-zinc-600">{label}</span>
</div>

  );
}
