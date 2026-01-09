"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const tabs = [
  {
    id: "canvas",
    title: "Canvas Apps",
    description:
      "Design highly interactive and responsive canvas apps that streamline workflows and provide seamless integration with your existing data sources.",
    image: "/images/power-apps/canvas.png",
  },
  {
    id: "powerapps",
    title: "Power Apps Development",
    description:
      "Deliver custom Power Apps solutions to automate business processes, increase efficiency, and drive productivity across your organization.",
    image: "/images/power-apps/power.png",
  },
  {
    id: "model",
    title: "Model-Driven Apps",
    description:
      "Build robust model-driven applications on Microsoft Dataverse, with scalable architecture, advanced automation, and role-based access control.",
    image: "/images/power-apps/model.png",
  },
  {
    id: "portals",
    title: "Power Pages & Portals",
    description:
      "Create secure, user-friendly portals for customers, partners, and external stakeholders to interact with your business data efficiently.",
    image: "/images/power-apps/portals.png",
  },
  {
    id: "ai",
    title: "Custom Connectors & AI Builder",
    description:
      "Enhance your apps with AI-driven insights, custom connectors, and intelligent automation to make smarter business decisions.",
    image: "/images/power-apps/custom.png",
  },
];

export default function PowerAppsServices() {
  const [activeTab, setActiveTab] = useState(tabs[4]);

  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black py-24">
      <div className="w-[88%] max-w-7xl mx-auto text-white">
        <div className="text-center max-w-5xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-[44px] font-semibold text-white">
            Build Smarter Apps with{" "}
            <span className="text-green-500">Expert Power Apps Consulting</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed">
            Our experts help organizations design, build, and scale Power Apps
            solutions — from Canvas and Model-Driven Apps to Portals and
            AI-powered automation — tailored to your business needs.
          </p>
        </div>

        {/* Tabs on Top */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => {
            const isActive = activeTab.id === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-base font-medium rounded-lg transition-all duration-200
          ${
            isActive
              ? "bg-white/10 text-white border-b-4 border-white"
              : "text-white/70 hover:text-white hover:bg-white/5"
          }`}
              >
                {tab.title}
              </button>
            );
          })}
        </div>

        {/* Content Boxes */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Box: Description + CTA */}
          <div className="bg-[#111111] border border-white/20 rounded-2xl p-8 flex flex-col justify-between shadow-lg">
            <p className="text-white/75 text-lg mb-6">
              {activeTab.description}
            </p>
            <Link
              href="/contact"
              className="mt-auto text-center py-4 bg-gradient-to-r from-[#2B2B2B] to-[#3F3F3F]
                         hover:from-[#3F3F3F] hover:to-[#525252]
                         text-white font-medium rounded-lg transition-all border border-white/20 shadow"
            >
              Book Free Consultation
            </Link>
          </div>
          {/* Right Box: Image */}
          <div className="bg-[#111111] border border-white/20 rounded-2xl shadow-lg overflow-hidden">
            <div className="w-full h-[400px] md:h-[500px] relative">
              <Image
                src={activeTab.image}
                alt={activeTab.title}
                fill
                className="rounded-xl object-cover border border-white/10 shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
