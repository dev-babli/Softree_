"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";

export default function WorkflowAutomationTestimonials() {
  /* ================= DATA ================= */
  const testimonials = [
    {
      text: "SOFTREE staff worked with us to deeply understand our manual operations and built exactly the AI workflow automation we needed to scale.",
      name: "Darrell Trimble",
      role: "CEO",
      location: "California",
      company: "SP Marketplace",
      rating: 5,
    },
    {
      text: "We had a very positive experience working with Softree Technology. The team delivered an intelligent workflow solution on time that drastically reduced our processing time. We appreciate the attention they gave our project and their great communication.",
      name: "Natasha Adams",
      role: "Partner",
      location: "Virginia",
      company: "Wicked Point LLC",
      rating: 5,
    },
    {
      text: "Overall, we are highly satisfied with the enterprise process automation you implemented. It seamlessly integrated with our existing systems, and your prompt response to any adjustments really makes a difference.",
      name: "Arkady Fedorovtsjev",
      role: "IT Specialist",
      location: "Netherlands",
      company: "ECG International",
      rating: 5,
    },
    {
      text: "Softree demonstrated strong expertise in AI Workflow Automation and Microsoft Power Platform. They delivered the automation project with excellent communication, responsiveness, and coordination throughout the engagement.",
      name: "Rahi Radhakrishnan",
      role: "Director of Delivery",
      location: "USA",
      company: "Nuvento",
      rating: 5,
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  /* ================= UI ================= */
  return (
    <section className="relative py-14 overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      {/* ===== DARK PREMIUM WRAPPER ===== */}
      <div className="relative max-w-7xl mx-auto rounded-3xl px-10 py-10 text-white bg-gradient-to-r from-black via-[#4c1c02] to-black overflow-hidden">
        {/* Glow background */}
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-orange-600/30 blur-[120px] rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-orange-600/30 blur-[120px] rounded-full" />

        <div className="relative flex flex-col items-center gap-10">
          {/* ================= HEADER ================= */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5">
              <span className="text-xs font-semibold text-orange-400 tracking-wider">CLIENT TESTIMONIALS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Trusted by Businesses
              <br />
              Automating with AI
            </h2>

            <p className="text-orange-200 text-sm max-w-2xl mx-auto">
              Discover how organizations across industries have transformed their business processes with AI Workflow Automation, Microsoft Power Platform, intelligent automation, and enterprise AI solutions from Softree Technology.
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
                        <Quote className="w-6 h-6 text-orange-300 mb-4" />

                        {/* ================= USER INFO ================= */}
                        <div className="flex items-center gap-4 mb-4">
                          {(t as any).logo ? (
                            <img
                              src={(t as any).logo}
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
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0">
                              {getInitials(t.name)}
                            </div>
                          )}

                          <div>
                            <p className="text-sm font-semibold text-white">
                              {t.name}
                            </p>
                            <p className="text-xs text-orange-300 mt-0.5">
                              {t.role} • {t.company}
                            </p>
                            <p className="text-[11px] text-orange-200/70 tracking-wider mt-1 uppercase">
                              {t.location}
                            </p>
                          </div>
                        </div>

                        {/* ================= TEXT BELOW USER ================= */}
                        <p className="text-sm leading-relaxed text-orange-100 line-clamp-4 flex-1">
                          {t.text}
                        </p>
                        {/* ⭐ Stars */}
                        <div className="flex gap-1 mt-4">
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
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
