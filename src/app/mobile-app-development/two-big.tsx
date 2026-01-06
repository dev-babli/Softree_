"use client";

import React from "react";

const expertise = [
  {
    title: "Cross-Platform Development",
    desc: "Build once, deploy across iOS and Android.",
  },
  {
    title: "Low-Code/No-Code App Development",
    desc: "Use platforms like Flutter Flow, Webflow, and Bubble to reduce development time and cost.",
  },
  {
    title: "Real-time Updates & Offline Capabilities",
    desc: "Ensure users can interact offline; changes sync automatically when back online.",
  },
];

const technologies = [
  {
    title: "Mobile Technology",
    desc: "Native iOS and Android development for platform-specific solutions.",
  },
  {
    title: "Flutter and React Native",
    desc: "Cross-platform development that ensures native performance.",
  },
  {
    title: "Low-Code/No-Code",
    desc: "Rapid app development with minimal coding using Flutterflow, Bubble, Webflow.",
  },
  {
    title: "Ionic",
    desc: "Single codebase apps for both iOS and Android, cost-efficient and streamlined UX.",
  },
];

export default function TwoBigCards() {
  return (
    <section className="py-24 bg-gray-900 text-white">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16 px-6">
        <h1 className="text-4xl font-bold mb-4">Our Mobile Development Solutions</h1>
        <p className="text-lg text-gray-300">
          We specialize in creating high-quality apps with the latest technologies for the best user experience.
        </p>
      </div>

      {/* Impressive Gray-Black Gradient Container */}
      <div className="relative container mx-auto px-6 py-12 rounded-3xl bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-2xl overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/5 rounded-full filter blur-3xl"></div>

        {/* Cards */}
        <div className="relative flex flex-col md:flex-row gap-12 justify-center">
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl flex flex-col w-full max-w-[600px]">
            <h2 className="text-4xl font-bold mb-6">Our Mobile Development Expertise</h2>
            {expertise.map((item, idx) => (
              <details key={idx} className="mb-4 border-b border-white/20 pb-2">
                <summary className="cursor-pointer text-lg font-semibold">{item.title}</summary>
                <p className="mt-2 text-gray-200">{item.desc}</p>
              </details>
            ))}
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl flex flex-col w-full max-w-[600px]">
            <h2 className="text-4xl font-bold mb-6">Technologies We Use</h2>
            {technologies.map((item, idx) => (
              <details key={idx} className="mb-4 border-b border-white/20 pb-2">
                <summary className="cursor-pointer text-lg font-semibold">{item.title}</summary>
                <p className="mt-2 text-gray-200">{item.desc}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
