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
  { title: "Travel", icon: Plane },

  { title: "Energy & Utilities", icon: Zap },
  { title: "Petrochemical", icon: Droplet },
  { title: "Fintech", icon: Landmark },
  { title: "Sports", icon: Trophy },
  { title: "Real Estate", icon: Building2 },
  { title: "Social Media", icon: MessageSquare },

  { title: "Oil & Gas", icon: Flame },
  { title: "Healthcare", icon: HeartPulse },
  { title: "Fitness", icon: Dumbbell },
  { title: "E-commerce", icon: ShoppingCart },
  { title: "Construction", icon: HardHat },
  { title: "Restaurant", icon: ChefHat },

  { title: "Telecom", icon: Smartphone },
  { title: "Banking", icon: Banknote },
];

export default function IndustriesSection() {
  return (
    <section className="relative py-10 bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="mx-auto max-w-7xl px-6">
        {/* Top label */}
        <p className="text-center text-sm font-semibold tracking-widest text-fuchsia-600 mb-6">
          INDUSTRIES WE FOCUS ON
        </p>

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-5xl font-semibold leading-tight text-zinc-900">
          Specialized Agentic AI Solutions Designed for Regulated Industries
        </h2>

        {/* Description */}
        <p className="mt-6 text-center text-zinc-600 max-w-3xl mx-auto">
          With deep knowledge in various industries, TechAhead speeds up your
          Agentic AI development journey. Our skilled team leverages
          specialized insights and proven strategies to craft custom Agentic AI
          solutions tailored to your specific challenges.
        </p>

        {/* Pills */}
        <div className="mt-14 flex flex-wrap justify-center gap-4">
          {industries.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-5 py-3 shadow-sm transition hover:shadow-md hover:border-fuchsia-400"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-fuchsia-50 border border-fuchsia-200 group-hover:bg-fuchsia-100">
                  <Icon size={18} className="text-fuchsia-600" />
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
