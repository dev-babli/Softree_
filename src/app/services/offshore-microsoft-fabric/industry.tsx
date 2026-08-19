"use client";

import {
  Rocket,
  Factory,
  Shield,
  GraduationCap,
  Plane,
  Zap,
  Droplet,
  Landmark,
  Trophy,
  Building2,
  MessageSquare,
  Flame,
  HeartPulse,
  Dumbbell,
  ShoppingCart,
  HardHat,
  ChefHat,
  Smartphone,
  Banknote,
} from "lucide-react";

const industries = [
  { title: "Aerospace & Defence", icon: Rocket },
  { title: "Industrial Manufacturing", icon: Factory },
  { title: "Insurtech", icon: Shield },
  { title: "Education", icon: GraduationCap },
  { title: "Travel & Tourism", icon: Plane },
  { title: "Energy & Utilities", icon: Zap },
  { title: "Petrochemical", icon: Droplet },
  { title: "Fintech", icon: Landmark },
  { title: "Sports Analytics", icon: Trophy },
  { title: "Real Estate & Housing", icon: Building2 },
  { title: "Social Media & Advertising", icon: MessageSquare },
  { title: "Oil & Gas", icon: Flame },
  { title: "Healthcare & Life Sciences", icon: HeartPulse },
  { title: "Fitness & Wellness", icon: Dumbbell },
  { title: "E-commerce & Retail", icon: ShoppingCart },
  { title: "Construction & Infrastructure", icon: HardHat },
  { title: "Hospitality & Restaurant", icon: ChefHat },
  { title: "Telecom & Network Operations", icon: Smartphone },
  { title: "Banking & Financial Services", icon: Banknote },
];

export default function IndustriesSection() {
  return (
    <section className="relative py-14 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Top label */}
        <p className="text-center text-sm font-semibold tracking-widest text-orange-600 mb-6">
          INDUSTRIES WE FOCUS ON
        </p>

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-5xl font-semibold leading-tight text-zinc-900">
          Tailored Microsoft Fabric Analytics Designed for Key Industries
        </h2>

        {/* Description */}
        <p className="mt-6 text-center text-zinc-600 max-w-3xl mx-auto">
          Deploying high-performance Microsoft Fabric data architectures, real-time OneLake streaming, and customized Power BI reports across diverse sectors. Softree accelerates your analytics journey with domain-specific governance, security compliance, and direct-lake optimizations.
        </p>

        {/* Pills */}
        <div className="mt-14 flex flex-wrap justify-center gap-4">
          {industries.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-5 py-3 shadow-sm transition hover:shadow-md hover:border-orange-400"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 border border-orange-200 group-hover:bg-orange-100">
                  <Icon size={18} className="text-orange-600" />
                </div>

                <span className="text-sm md:text-base text-zinc-800">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
