"use client";

import { useState } from "react";

const stories = [
  {
    title: "Wellkies Doctor Mobile App",
    description:
      "Developed a dedicated doctor-facing mobile application with secure access to schedules, patient details, and consultation workflows.",
    image: "/images/1.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Doctor-Document.pdf",
  },
  {
    title: "Wellkies Clinic Management App",
    description:
      "Built a clinic management mobile app to handle scheduling, staff coordination, and operational workflows from one platform.",
    image: "/images/2.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Clinic-App.pdf",
  },
  {
    title: "Projects Portfolio Management",
    description:
      "A portfolio management application built on Microsoft Dataverse to manage projects, track progress, and improve decision-making across teams.",
    image: "/images/case-study/power-apps/project.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Projects-Portfolio-ManagementMicrosoft-Dataverse.pdf",
    category: "Power Apps",
  },
  {
    title: "Students Portal Mobile App",
    description:
      "A mobile application for students to access academic information, manage profiles, and interact with institutional services in one place.",
    image: "/images/case-study/power-apps/student.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Students-Portal-Mobile-App.pdf",
    category: "Power Apps",
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
        <div className="mb-12 max-w-4xl">
          <span className="inline-block mb-4 text-sm font-semibold tracking-widest uppercase text-cyan-300">
            Case Studies
          </span>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-2">
            Success Stories That Drive
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Real Business Impact
            </span>
          </h2>

          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />

          <p className="text-lg text-white/80 leading-relaxed">
            From simple CRM platforms to complex enterprise applications, our
            experts deliver scalable solutions tailored to business growth and
            performance.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {/* LEFT LARGE CARD */}
          <a
            href={leftStory.href}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer"
          >
            <img
              src={leftStory.image}
              alt={leftStory.title}
              className="h-[500px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute bottom-0 p-8 max-w-xl">
              <h3 className="text-2xl font-bold mb-2 group-hover:underline">
                {leftStory.title}
              </h3>
              <p className="text-white/80 text-sm">{leftStory.description}</p>
            </div>
          </a>

          {/* RIGHT SMALL CARD */}
          <a
            href={rightStory.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative rounded-3xl overflow-hidden group cursor-pointer"
          >
            <img
              src={rightStory.image}
              alt={rightStory.title}
              className="h-[500px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute bottom-0 p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:underline">
                {rightStory.title}
              </h3>
              <p className="text-white/80 text-sm">{rightStory.description}</p>
            </div>
          </a>
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
