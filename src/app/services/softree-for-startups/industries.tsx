"use client";

import Link from "next/link";
import {
  HeartPulse,
  ShoppingCart,
  Truck,
  Landmark,
  Film,
  GraduationCap,
  Building2,
  Car,
  Factory,
  Radio,
  Zap,
  Plane,
} from "lucide-react";

const industries = [
  { name: "Healthcare & Life Sciences", icon: HeartPulse, link: "/healthcare" },
  {
    name: "Retail & E-commerce",
    icon: ShoppingCart,
    link: "/retail-ecommerce",
  },
  { name: "Logistics", icon: Truck, link: "/logistics" },
  { name: "Banking & Finance", icon: Landmark, link: "/banking-finance" },
  { name: "Media & Publishing", icon: Film, link: "/media-publishing" },
  { name: "Education", icon: GraduationCap, link: "/education" },
  { name: "Real Estate", icon: Building2, link: "/real-estate" },
  { name: "Automotive", icon: Car, link: "/automotive" },
  { name: "Manufacturing", icon: Factory, link: "/manufacturing" },
  { name: "Telecom", icon: Radio, link: "/telecom" },
  { name: "Energy & Utilities", icon: Zap, link: "/energy-utilities" },
  { name: "Travel & Hospitality", icon: Plane, link: "/travel-hospitality" },
];

export default function IndustriesSection() {
  return (
    <section
      id="industries"
      className="relative bg-black text-white py-28 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        {/* HEADING */}
        <div className="mb-20 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-semibold mb-3">
            Industries We Empower
          </h2>
          <p className="text-gray-400 text-lg">
            Deep domain expertise across diverse industries, delivering scalable
            and future-ready solutions.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {industries.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.link}
                className="group relative rounded-2xl p-[1px]
                bg-gradient-to-br from-white/15 via-white/5 to-white/15
                hover:from-blue-500/40 hover:to-cyan-400/40 transition"
              >
                <div
                  className="h-full rounded-2xl bg-black/80 backdrop-blur-xl
                  border border-white/10
                  p-7 flex flex-col items-center text-center
                  transform transition-all duration-300
                  group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(0,150,255,0.15)]"
                >
                  {/* ICON */}
                  <div
                    className="mb-5 w-14 h-14 rounded-xl
                    bg-white/10 border border-white/15
                    flex items-center justify-center
                    group-hover:bg-blue-500/20 transition"
                  >
                    <Icon className="w-7 h-7 text-blue-400" strokeWidth={1.5} />
                  </div>

                  {/* TEXT */}
                  <p className="text-sm font-medium text-gray-200 leading-snug">
                    {item.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
