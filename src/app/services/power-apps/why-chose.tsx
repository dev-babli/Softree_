"use client";
import { Users, Zap, ShieldCheck, Clock } from "lucide-react";

export default function WhyChooseSoftree() {
  const items = [
    {
      icon: Users,
      stat: "500+",
      title: "Projects Delivered",
      desc: "Successfully delivered Power Platform & SharePoint solutions worldwide",
    },
    {
      icon: Zap,
      stat: "35%",
      title: "Productivity Boost",
      desc: "Automation reduced manual work and accelerated business processes",
    },
    {
      icon: ShieldCheck,
      stat: "99.9%",
      title: "Secure & Reliable",
      desc: "Enterprise-grade security with governance and compliance standards",
    },
    {
      icon: Clock,
      stat: "24/7",
      title: "Support Available",
      desc: "Dedicated support team ensuring smooth operations and quick resolutions",
    },
  ];

  return (
    <section className="py-1">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">
            Why Clients Choose Softree
          </h2>
          <p className="mt-3 text-zinc-600 max-w-2xl mx-auto">
            Trusted Microsoft Power Platform, SharePoint and automation experts
            delivering measurable business impact.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="
    group
    relative overflow-hidden
    rounded-2xl
    p-7
    bg-gradient-to-br from-white to-blue-50
    border border-zinc-200
    shadow-md
    hover:shadow-xl
    hover:-translate-y-1
    transition-all duration-300
  "
              >
                {/* Curved Bottom Border Accent */}
                <span
                  className="
    absolute bottom-0 left-0 w-full h-1.5
    bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500
    rounded-b-2xl
  "
                />

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>

                <h3 className="text-3xl font-bold text-blue-700">
                  {item.stat}
                </h3>
                <p className="mt-1 font-semibold text-zinc-900">{item.title}</p>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
