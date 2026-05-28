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
    <section className="relative py-16">
      <div ref={containerRef} className="relative w-full md:px-10">
        {/* Header */}
        <div className="relative overflow-hidden px-4 text-center">
          {/* Content */}
          <div className="relative max-w-7xl mx-auto text-center px-4">
            {/* Badge */}
            <span
              className="
                inline-block mb-1 px-4 py-1.5
                text-xs md:text-sm font-semibold tracking-widest uppercase
                text-orange-600
              "
            >
              SharePoint & Microsoft 365 Solutions
            </span>

            {/* Heading */}
            <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold leading-tight text-gray-900 mb-6">
              SharePoint-Driven{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                Digital Transformation
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-4 text-sm md:text-lg max-w-3xl mx-auto leading-relaxed">
              Exploring Softree’s journey in building secure, scalable
              SharePoint and Microsoft 365 solutions that empower modern
              enterprise collaboration, automation, and governance.
            </p>
          </div>
        </div>

        {/* ================= Timeline Section ================= */}
        <div className="relative ">
          <div className="max-w-6xl mx-auto border border-white/10 rounded-3xl px-6 md:px-12 lg:px-16">
            {/* ================= Timeline Wrapper ================= */}
            <div
              className="
                relative
                max-w-7xl mx-auto
                py-16 px-6 md:px-10
                rounded-3xl
                bg-gradient-to-b from-gray-50 via-white to-gray-100
                border border-gray-200
                shadow-[0_25px_80px_rgba(0,0,0,0.06)]
              "
            >
              {/* ================= Vertical Line (AUTO HEIGHT - FIXED) ================= */}
              <div className="absolute left-12 top-0 bottom-0 w-[2px] z-0">
                {/* base line */}
                <div className="absolute inset-0 bg-gray-300" />

                {/* animated fill */}
                <motion.div
                  style={{ scaleY: heightTransform, originY: 0 }}
                  className="absolute inset-0 bg-gradient-to-b from-orange-600 to-amber-500 rounded-full"
                />
              </div>

              {/* ================= Timeline Items ================= */}
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-10 pt-16 md:pt-20 relative z-10"
                >
                  <div className="relative flex items-center justify-center">
                    {/* animated dot */}
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0.3 }}
                      whileInView={{ scale: 1.2, opacity: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.15 }}
                      viewport={{ once: true }}
                      className="h-4 w-4 rounded-full bg-orange-600 shadow-[0_0_14px_rgba(249,115,22,0.6)]"
                    />

                    {/* animated ring */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1.4, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      viewport={{ once: true }}
                      className="absolute h-9 w-9 rounded-full border border-orange-200"
                    />
                  </div>

                  {/* ===== Card ===== */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="
                      relative z-10
                      bg-white
                      border border-gray-200
                      rounded-2xl
                      p-6 md:p-8
                      text-gray-700
                      max-w-xl
                      shadow-md
                      hover:-translate-y-1
                      transition
                    "
                  >
                    {item.content}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
