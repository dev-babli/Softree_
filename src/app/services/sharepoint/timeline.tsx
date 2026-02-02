"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "motion/react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export default function TimelinePage() {
  const data: TimelineEntry[] = [
    {
      title: "2016",
      content: (
        <p>
          Softree was founded with a clear vision to help organizations embrace
          digital transformation through reliable and scalable enterprise IT
          solutions. From the beginning, the company focused on Microsoft
          technologies, building a strong foundation in collaboration and modern
          workplace solutions.
        </p>
      ),
    },
    {
      title: "2019",
      content: (
        <p>
          With increasing enterprise demand, Softree strengthened its expertise
          in Microsoft 365 migration, governance, and security—helping
          organizations modernize legacy systems while ensuring compliance and
          seamless adoption.
        </p>
      ),
    },
    {
      title: "2022",
      content: (
        <p>
          Softree expanded into Power Platform solutions, delivering Power Apps
          and Power Automate workflows that empowered businesses to automate
          processes, innovate faster, and reduce operational complexity.
        </p>
      ),
    },
    {
      title: "2024",
      content: (
        <p>
          Today, Softree delivers end-to-end Microsoft ecosystem solutions
          across SharePoint, Microsoft 365, and enterprise automation—partnering
          with organizations to build future-ready digital workplaces.
        </p>
      ),
    },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const updateHeight = () => setHeight(ref.current!.scrollHeight);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 70%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <main className="min-h-screen">
      <div ref={containerRef} className="relative w-full md:px-10">
        {/* Header */}
        <div className="relative overflow-hidden py-28 px-4 text-center">
          {/* Content */}
          <div className="relative max-w-7xl mx-auto text-center px-4">
            {/* Badge */}
            <span
              className="
      inline-block mb-6 px-4 py-1.5
      text-xs md:text-sm font-semibold tracking-widest uppercase
      text-blue-600
    "
            >
              SharePoint & Microsoft 365 Solutions
            </span>

            {/* Heading */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
              SharePoint-Driven{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Digital Transformation
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm md:text-lg max-w-3xl mx-auto leading-relaxed">
              Exploring Softree’s journey in building secure, scalable
              SharePoint and Microsoft 365 solutions that empower modern
              enterprise collaboration, automation, and governance.
            </p>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="relative py-3">
          <div className="max-w-6xl mx-auto border border-white/10 rounded-3xl px-6 md:px-12 lg:px-16 relative overflow-hidden">
            {/* Timeline */}
            <div
              className="
    relative max-w-7xl mx-auto pb-32 pt-12 px-6 md:px-10

    rounded-3xl
    bg-gradient-to-b from-gray-50 via-white to-gray-100
    backdrop-blur-md

    border border-gray-200
    shadow-[0_25px_80px_rgba(0,0,0,0.06)]
  "
            >
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-12 pt-24 md:pt-32 relative"
                >
                  {/* ================= Dot + Year ================= */}
                  <div className="relative flex flex-col items-center w-24">
                    <div className="relative z-10 flex items-center justify-center">
                      {/* mirror blue dot */}
                      <div className="h-4 w-4 rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.45)]" />

                      {/* subtle ring */}
                      <div className="absolute h-9 w-9 rounded-full border border-blue-200" />
                    </div>

                    <span className="mt-6 text-gray-900 text-xl font-semibold">
                      {item.title}
                    </span>
                  </div>

                  {/* ================= Content Card ================= */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="
          relative

          bg-white/80 backdrop-blur-lg
          border border-gray-200
          rounded-2xl

          p-6 md:p-8
          text-gray-700
          text-sm md:text-base
          leading-relaxed
          max-w-xl

          shadow-[0_10px_30px_rgba(0,0,0,0.05)]
          hover:-translate-y-2
          hover:shadow-[0_25px_70px_rgba(37,99,235,0.12)]

          transition-all duration-300
        "
                  >
                    {item.content}
                  </motion.div>
                </div>
              ))}

              {/* ================= Vertical Line ================= */}
              <div
                style={{ height }}
                className="absolute left-[48px] top-0 w-[2px]"
              >
                {/* base line */}
                <div className="absolute inset-0 bg-gray-300" />

                {/* animated fill */}
                <motion.div
                  style={{ height: heightTransform, opacity: opacityTransform }}
                  className="absolute top-0 w-[2px] bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
