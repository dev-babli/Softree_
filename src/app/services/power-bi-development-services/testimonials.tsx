"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSplitSlider() {
  /* ================= DATA ================= */
  const testimonials = [
    {
      name: "Rachel Green",
      role: "HR Manager",
      company: "Accenture",
      rating: 5,
      logo: "https://cdn.simpleicons.org/accenture",
      text: "Softree implemented Power BI dashboards for our HR analytics, giving us real-time insights into employee performance, attrition, and hiring trends. Decision-making is now faster and completely data-driven.",
    },

    {
      name: "Olivia Carter",
      role: "UX Designer",
      company: "Infosys",
      rating: 5,
      logo: "https://cdn.simpleicons.org/infosys",
      text: "Their Power BI reports transformed how we analyze user behavior and engagement. Interactive dashboards and visual insights helped our design team make more informed and impactful decisions.",
    },

    {
      name: "Amit Sharma",
      role: "Digital Transformation Lead",
      company: "Wipro",
      rating: 5,
      logo: "https://cdn.simpleicons.org/wipro",
      text: "Softree helped us unify data from multiple systems into Power BI, enabling centralized reporting and real-time dashboards. Leadership now has complete visibility into business performance.",
    },

    {
      name: "Priya Nair",
      role: "System Administrator",
      company: "HCLTech",
      rating: 5,
      logo: "https://cdn.simpleicons.org/hcl",
      text: "With Power BI, we achieved accurate and automated reporting across departments. Scheduled refresh and secure access made data management seamless and highly efficient.",
    },

    {
      name: "Rohit Mehta",
      role: "IT Operations Head",
      company: "TCS",
      rating: 5,
      logo: "https://cdn.simpleicons.org/tcs",
      text: "Softree built real-time operational dashboards in Power BI that track KPIs, incidents, and performance metrics. Reporting is now automated and insights are instantly available.",
    },

    {
      name: "Elena Martin",
      role: "Digital Solutions Manager",
      company: "Sanofi",
      rating: 5,
      logo: "/images/logo/sanofi.jpg",
      text: "Their Power BI solutions helped us monitor compliance data and regulatory metrics through interactive dashboards. Data is centralized, accurate, and easy to analyze across teams.",
    },
  ];
  /* ================= SLIDER ================= */
  const [page, setPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const cardsPerPage = 2;
  const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setPage((p) => (p + 1) % totalPages);
    }, 3000);

    return () => clearInterval(timer);
  }, [totalPages, isPaused]);

  /* ================= UI ================= */
  return (
    <section className="relative py-14 overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      {/* ===== DARK PREMIUM WRAPPER ===== */}
      <div className="relative max-w-7xl mx-auto rounded-3xl px-10 py-10 text-white bg-gradient-to-r from-black via-[#0f2f7a] to-black overflow-hidden">
        {/* Glow background */}
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-600/30 blur-[120px] rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-indigo-600/30 blur-[120px] rounded-full" />

        <div className="relative flex flex-col items-center gap-10">
          {/* ================= HEADER ================= */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              What Our Clients Say
            </h2>

            <p className="text-blue-200 text-sm max-w-xl">
              Trusted by enterprises worldwide. See how our Power BI solutions
              transform business productivity.
            </p>
          </div>

          {/* ================= SLIDER ================= */}
          <div
            className="relative overflow-hidden w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* TRACK */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="min-w-full grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                >
                  {testimonials
                    .slice(
                      pageIndex * cardsPerPage,
                      pageIndex * cardsPerPage + cardsPerPage,
                    )
                    .map((t, i) => (
                      <div
                        key={i}
                        className="
    group
    h-full
    rounded-2xl
    p-6

    bg-white/10
    backdrop-blur-xl
    border border-white/20

    flex flex-col

    hover:-translate-y-2 hover:bg-white/15
    transition-all duration-300
  "
                      >
                        {/* ⭐ Quote */}
                        <Quote className="w-6 h-6 text-blue-300 mb-4" />

                        {/* ================= USER INFO ================= */}
                        <div className="flex items-center gap-3 mb-4">
                          <img
                            src={t.logo}
                            alt={t.company}
                            className="
    w-16 h-16
    rounded-xl
    bg-white
    p-2
    object-contain
    shadow-md
    group-hover:scale-110
    transition-transform duration-300
  "
                          />

                          <div>
                            <p className="text-sm font-semibold text-white">
                              {t.name}
                            </p>
                            <p className="text-xs text-blue-300">
                              {t.role} • {t.company}
                            </p>
                          </div>
                        </div>

                        {/* ================= TEXT BELOW USER ================= */}
                        <p className="text-sm leading-relaxed text-blue-100 line-clamp-4">
                          {t.text}
                        </p>
                        {/* ⭐ Stars */}
                        <div className="flex gap-1 mb-3">
                          {Array.from({ length: t.rating }).map((_, idx) => (
                            <Star
                              key={idx}
                              className="w-4 h-4 fill-yellow-400 stroke-none"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>

            {/* DOTS */}
            <div className="flex justify-center gap-3 mt-8">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`h-2 rounded-full transition-all ${
                    page === i
                      ? "w-8 bg-white"
                      : "w-3 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
