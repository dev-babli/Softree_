"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const caseStudies = [
  {
    id: "wellkies-doctor",
    accent: "#22C55E",
    categories: ["Mobile App", "Healthcare"],
    title: "Wellkies Doctor Mobile App",
    image: "/images/1.png",
    link: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Doctor-Document.pdf",
    innovation:
      "Secure mobile-first platform with real-time patient management and smart scheduling for improved clinical efficiency.",
    tech: ["React Native", "Node.js", "MongoDB", "AWS"],
  },
  {
    id: "wellkies-clinic",
    accent: "#0EA5E9",
    categories: ["Mobile App", "Clinic Management"],
    title: "Wellkies Clinic Management App",
    image: "/images/2.png",
    link: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Clinic-App.pdf",
    innovation:
      "All-in-one clinic system with automation, centralized dashboards, and analytics to streamline operations.",
    tech: ["React", "NestJS", "PostgreSQL", "Azure"],
  },
];

export default function CaseStudiesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let index = 0;

    const cardWidth = 920; // card width + gap (900 + 20)

    const interval = setInterval(() => {
      index++;

      if (index >= caseStudies.length) index = 0;

      container.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }, 3000); // 👉 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= PREMIUM HEADER ================= */}
        <div className="mb-7 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT SIDE */}
            <div>
              {/* Eyebrow */}
              <span
                className="
          inline-flex items-center
          px-4 py-1.5 mb-6
          rounded-full
          bg-blue-50 text-blue-600
          text-xs font-semibold tracking-widest uppercase
        "
              >
                Success Stories
              </span>

              {/* Heading */}
              <h2
                className="
          text-4xl md:text-5xl lg:text-6xl
          font-semibold
          text-zinc-900
          leading-tight
        "
              >
                Delivering{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Real Impact
                </span>{" "}
                Through Smart Solutions
              </h2>

              {/* subtle divider */}
              <div className="mt-8 h-[2px] w-20 bg-gradient-to-r from-blue-600 to-transparent rounded-full" />
            </div>

            {/* RIGHT SIDE – CLEAN (NO BOX) */}
            <div className="relative pl-8">
              {/* subtle vertical accent line */}
              <span className="absolute left-0 top-2 bottom-2 w-[3px] bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full" />

              {/* description */}
              <p className="text-lg text-zinc-600 leading-relaxed">
                Explore how we help healthcare and digital businesses modernize
                operations, improve efficiency, and build scalable technology
                platforms that deliver measurable business outcomes with
                confidence.
              </p>

              {/* stats */}
              <div className="flex gap-12 mt-8">
                <div>
                  <p className="text-blue-600 font-semibold text-2xl">20+</p>
                  <p className="text-sm text-zinc-500">Projects Delivered</p>
                </div>

                <div>
                  <p className="text-blue-600 font-semibold text-2xl">99%</p>
                  <p className="text-sm text-zinc-500">Client Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BIG HORIZONTAL AUTO SLIDER ================= */}
        <div className="overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-6 scroll-smooth overflow-x-hidden"
          >
            {caseStudies.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                target="_blank"
                className="
                  group
                  w-[900px]
                  flex-shrink-0
                  transition-all duration-500
                  hover:-translate-y-3
                "
              >
                <div
                  className="
                    grid md:grid-cols-2
                    bg-gradient-to-b from-white to-zinc-50
                    border border-zinc-200
                    rounded-3xl
                    overflow-hidden
                    shadow-sm
                    hover:shadow-2xl
                    transition
                  "
                >
                  {/* ================= IMAGE ================= */}
                  <div className="relative h-[380px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="
                        object-cover
                        transition-transform duration-700
                        group-hover:scale-105
                      "
                    />
                  </div>

                  {/* ================= CONTENT ================= */}
                  <div className="p-10 flex flex-col justify-center">
                    {/* Categories */}
                    <div className="flex gap-2 flex-wrap mb-4">
                      {item.categories.map((cat) => (
                        <span
                          key={cat}
                          className="text-xs px-3 py-1 rounded-full bg-zinc-100 text-zinc-600"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-semibold text-zinc-900 mb-4 group-hover:text-blue-600 transition">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-600 mb-6 leading-relaxed line-clamp-3">
                      {item.innovation}
                    </p>

                    {/* Tech */}
                    <div className="flex gap-2 flex-wrap mb-6">
                      {item.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs border border-zinc-200 rounded-md bg-white text-zinc-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <span className="text-blue-600 font-medium">
                      View Case Study →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
