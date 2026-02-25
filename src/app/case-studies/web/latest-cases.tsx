"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, TrendingUp, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================
   CASE STUDIES DATA
========================= */
const caseStudies = [
  {
    title: "Shopping E-Commerce Platform",
    description:
      "A scalable e-commerce web platform with product management, secure payments, and optimized checkout flow.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/12/Shopping-E-Commerce.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/ShoppingEcommerce.pdf",
    challenge:
      "The client needed a scalable online store capable of handling high traffic, secure transactions, and smooth product management without performance issues.",
    solution:
      "Built a high-performance e-commerce platform with optimized checkout flow, secure payment gateway integration, and advanced product management system.",
    result:
      "Increased conversion rates by 35%, improved checkout speed, and delivered a seamless shopping experience across devices.",
  },

  {
    title: "Pet Care Management Platform",
    description:
      "A web-based system for managing pet care services, bookings, and customer interactions.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/12/Pet-care.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/PET_CARE.pdf",
    challenge:
      "Manual appointment scheduling and fragmented customer records were causing operational inefficiencies and missed bookings.",
    solution:
      "Developed a centralized platform with online booking, customer management system, and automated notifications.",
    result:
      "Reduced booking errors by 50% and improved customer satisfaction with streamlined service management.",
  },

  {
    title: "Business Consultation Platform",
    description:
      "A professional consultation platform enabling client management, scheduling, and service tracking.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/12/Business-Consultation-App.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Business-Consultation-App-case-study-1.pdf",
    challenge:
      "Consultants struggled with managing appointments, tracking services, and maintaining organized client records.",
    solution:
      "Created a structured consultation platform with automated scheduling, CRM features, and service tracking dashboards.",
    result:
      "Improved workflow efficiency by 40% and enhanced overall client engagement.",
  },

  {
    title: "Public Blogging Website",
    description:
      "A full-stack blogging platform built with MERN stack supporting publishing, comments, and user authentication.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/Node.js-Express.js-HTML-editor.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Public-Blogging-Website-Using-the-MERN-Stack.pdf",
    challenge:
      "The platform required secure authentication, scalable backend, and real-time content updates for public users.",
    solution:
      "Developed a MERN-based full-stack blogging system with JWT authentication, dynamic content rendering, and optimized APIs.",
    result:
      "Achieved high user engagement and scalable performance for concurrent users.",
  },

  {
    title: "Food & Wine Website",
    description:
      "A visually rich marketing website designed for food and beverage brands with content-focused UX.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/FOOD-WINE-WEBSITE.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/FOOD-WINE-WEBSITE.pdf",
    challenge:
      "The brand needed a visually appealing website that showcased products while maintaining performance and SEO optimization.",
    solution:
      "Designed a responsive, content-focused website with high-quality visuals, optimized performance, and SEO-friendly structure.",
    result:
      "Increased online brand visibility and boosted user engagement through immersive design.",
  },
];
export default function WebCaseStudies() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % caseStudies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const study = caseStudies[index];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-6 text-left max-w-3xl">
          <span className="inline-block px-4 py-1.5 rounded-full bbg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider border border-purple-500/20">
            Featured
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-black leading-tight">
            Featured Web App{" "}
            <span className="bg-blue-500/10 text-blue-400 bg-clip-text ">
              Success Stories
            </span>
          </h2>

          <p className="mt-4 text-gray-600 text-base leading-relaxed">
            Discover how we design and develop powerful web applications that
            deliver seamless user experiences, real-time performance, and
            scalable backend systems across healthcare, fintech, education, and
            entertainment.
          </p>
        </div>
        {/* ================= SLIDER ================= */}
        <div className="relative overflow-hidden">
          <div className="relative h-[520px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ x: 1000 }}
                animate={{ x: 0 }}
                exit={{ x: -1000 }}
                transition={{
                  duration: 0.7,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="absolute inset-0 grid md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-black via-zinc-900 to-gray-800 rounded-3xl border border-slate-200 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.25)] p-10"
              >
                {/* LEFT CONTENT */}
                <div className="space-y-6 md:pr-10 md:border-r md:border-white/10">
                  <span className="inline-block text-[11px] uppercase tracking-widest text-blue-400 font-semibold">
                    Web App Case Study
                  </span>

                  <h2 className="text-2xl md:text-3xl font-semibold text-white leading-snug">
                    {study.title}
                  </h2>

                  <div className="w-14 h-px bg-gradient-to-r from-blue-500 via-blue-400/40 to-transparent"></div>

                  <div className="space-y-5 pt-2">
                    {/* Challenge */}
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                        <AlertTriangle size={15} />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-semibold text-red-400 uppercase tracking-wider">
                          Challenge
                        </h4>
                        <p className="text-white/70 text-xs mt-1 leading-relaxed">
                          {study.challenge}
                        </p>
                      </div>
                    </div>
                    {/* Solution */}
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        <Lightbulb size={15} />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">
                          Solution
                        </h4>
                        <p className="text-white/70 text-xs mt-1 leading-relaxed">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    {/* Result */}
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                        <TrendingUp size={15} />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">
                          Results
                        </h4>
                        <p className="text-white/70 text-xs mt-1 leading-relaxed">
                          {study.result}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={study.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2  bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-600/30"
                  >
                    View Full Case Study
                    <span className="text-lg">→</span>
                  </Link>
                </div>

                {/* RIGHT IMAGE */}
                <div>
                  <Image
                    src={study.image}
                    alt={study.title}
                    width={1000}
                    height={600}
                    className="w-full h-[420px] object-cover rounded-2xl"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
