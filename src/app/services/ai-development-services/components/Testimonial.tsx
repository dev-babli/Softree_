"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSplitSlider() {
  /* ================= DATA ================= */
  const testimonials = [
    {
      name: "Darrell Trimble",
      role: "CEO",
      company: "SP Marketplace, California",
      rating: 5,
      logo: "https://ui-avatars.com/api/?name=SP+Marketplace&background=fff&color=FF6B2C&font-size=0.33",
      text: "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
    },
    {
      name: "Natasha Adams",
      role: "Partner",
      company: "Wicked Point LLC, Virginia",
      rating: 5,
      logo: "https://ui-avatars.com/api/?name=Wicked+Point&background=fff&color=FF6B2C&font-size=0.33",
      text: "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. We appreciate the attention they gave our project and their great communication. The final product was exactly what we wanted and we look forward to working with Softree in the future.",
    },
    {
      name: "Arkady Fedorovtsjev",
      role: "IT Specialist",
      company: "ECG International, Netherlands",
      rating: 5,
      logo: "https://ui-avatars.com/api/?name=ECG+International&background=fff&color=FF6B2C&font-size=0.33",
      text: "Overall, we are satisfied with our collaboration in the past and your last action and response to our reported issue, really makes a difference.",
    },
    {
      name: "Rahi Radhakrishnan",
      role: "Director of Delivery",
      company: "Nuvento, USA",
      rating: 5,
      logo: "https://ui-avatars.com/api/?name=Nuvento&background=fff&color=FF6B2C&font-size=0.33",
      text: "Softree demonstrated strong expertise in PowerApps development and delivered the project with excellent communication, responsiveness, and coordination throughout the engagement.",
    }
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
      <div className="relative max-w-7xl mx-auto rounded-3xl px-10 py-10 text-white bg-gradient-to-r from-black via-[#4c1c02] to-black overflow-hidden">
        {/* Glow background */}
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-orange-600/30 blur-[120px] rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-orange-600/30 blur-[120px] rounded-full" />

        <div className="relative flex flex-col items-center gap-10">
          {/* ================= HEADER ================= */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              What Our Clients Say
            </h2>

            <p className="text-orange-200 text-sm max-w-xl">
              Trusted by enterprises worldwide. See how our Power Platform
              solutions transform business productivity.
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
                            <p className="text-xs text-orange-300">
                              {t.role} • {t.company}
                            </p>
                          </div>
                        </div>

                        {/* ================= TEXT BELOW USER ================= */}
                        <p className="text-sm leading-relaxed text-orange-100 line-clamp-4">
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
