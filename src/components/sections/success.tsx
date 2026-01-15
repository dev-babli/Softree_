"use client";

import { useState } from "react";

const stories = [
  {
    title: "Digital Learning Platform Transformation",
    description:
      "Engineered a unified digital learning ecosystem that improved academic workflows, centralized student information, and enabled data-driven decision-making.",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1400",
  },
  {
    title: "End-to-End Logistics Optimization System",
    description:
      "Delivered a smart logistics solution that enhanced shipment visibility, optimized route planning, and improved operational efficiency at scale.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200",
  },
  {
    title: "Patient-Centric Healthcare Engagement Suite",
    description:
      "Built a secure healthcare engagement platform designed to streamline patient interactions, automate clinical workflows, and protect sensitive medical data.",
    image:
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df44?q=80&w=1200",
  },
  {
    title: "Enterprise Workflow Automation Platform",
    description:
      "Implemented an automation-first platform to streamline business processes, integrate enterprise systems, and significantly reduce manual operational overhead.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200",
  },
  {
    title: "Cloud-Native Business Intelligence Solution",
    description:
      "Designed a cloud-based analytics platform delivering real-time insights, advanced reporting, and scalable data visualization for executive decision-making.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
  },
];

export default function SuccessStories() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? stories.length - 1 : i - 1));

  const next = () => setIndex((i) => (i === stories.length - 1 ? 0 : i + 1));

  const leftStory = stories[index];
  const rightStory = stories[(index + 1) % stories.length];

  return (
    <section className="relative py-28 bg-gradient-to-b from-black via-[#020d1a] to-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20 max-w-4xl">
          <span className="inline-block mb-4 text-sm font-semibold tracking-widest uppercase text-cyan-300">
            Case Studies
          </span>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Success Stories That Drive
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Real Business Impact
            </span>
          </h2>

          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-6" />

          <p className="text-lg text-white/80 leading-relaxed">
            From simple CRM platforms to complex enterprise applications, our
            experts deliver scalable solutions tailored to business growth and
            performance.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT LARGE CARD */}
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden">
            <img
              src={leftStory.image}
              alt={leftStory.title}
              className="h-[420px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute bottom-0 p-8 max-w-xl">
              <h3 className="text-2xl font-bold mb-2">{leftStory.title}</h3>
              <p className="text-white/80 text-sm">{leftStory.description}</p>
            </div>
          </div>

          {/* RIGHT SMALL CARD */}
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src={rightStory.image}
              alt={rightStory.title}
              className="h-[420px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute bottom-0 p-6">
              <h3 className="text-xl font-bold mb-2">{rightStory.title}</h3>
              <p className="text-white/80 text-sm">{rightStory.description}</p>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center hover:bg-white hover:text-black transition"
          >
            ←
          </button>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center hover:bg-white hover:text-black transition"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
