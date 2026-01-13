"use client";
import { CALENDLY_URL } from '@/lib/contactConfig';

const testimonials = [
  {
    text: "Softree Technology transformed our raw data into powerful Power BI dashboards that improved decision-making across teams.",
    name: "Sandeep Iyer",
    role: "Head of Analytics, Enterprise Organization",
  },
  {
    text: "Their Power BI reports gave us real-time insights into sales, finance, and operations with excellent performance.",
    name: "Kavita Rao",
    role: "Business Intelligence Manager",
  },
  {
    text: "From data modeling to DAX optimization, the Power BI solution was delivered flawlessly.",
    name: "Manish Gupta",
    role: "CTO, Data Consulting Firm",
  },
];

export default function PowerBIHero() {
  return (
    <section className="relative bg-[#00091A] pt-24 pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0057]/70 via-black/40 to-[#240F8E]/30" />

      {/* ================= HERO CONTENT ================= */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
          Unlock Actionable Insights with{" "}
          <span className="text-green-500 font-medium">
            Power BI Analytics
          </span>
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-white/70">
          We design and implement high-performance Power BI dashboards and
          reports that turn complex data into clear, interactive insights —
          integrating seamlessly with Azure, SQL, Excel, and enterprise data
          sources.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-4 rounded-xl transition-transform hover:scale-105"
          >
            Talk to Our Expert
          </a>
          <a
            href="#services"
            className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-semibold px-8 py-4 rounded-xl transition-transform hover:scale-105"
          >
            Explore Services
          </a>
        </div>
      </div>

       {/* MOVING TESTIMONIAL STRIP */}
      <div className="relative z-10 mt-20 overflow-hidden">
       <div className="flex items-stretch animate-marquee">

          {[...testimonials, ...testimonials].map((item, i) => (
          <div
  key={i}
 className="mx-4 min-w-[420px] max-w-[420px] h-[200px] p-6 rounded-xl border border-white/10 flex flex-col justify-between backdrop-blur"

>

              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                “{item.text}”
              </p>

              <div>
                <p className="mt-2 text-white font-medium text-sm">
                  {item.name}
                </p>
                <p className="text-white/50 text-xs">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= ANIMATION ================= */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Fast & energetic */
        .animate-marquee {
          animation: marquee 12s linear infinite;
        }

        /* Pause on hover */
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
