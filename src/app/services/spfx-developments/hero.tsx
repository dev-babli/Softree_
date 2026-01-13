"use client";
import { CALENDLY_URL } from '@/lib/contactConfig';

const testimonials = [
  {
    text: "Softree Technology built custom SPFx web parts that modernized our SharePoint intranet experience.",
    name: "Rakesh Menon",
    role: "SharePoint Architect, Enterprise Org",
  },
  {
    text: "Their SPFx extensions improved usability across SharePoint Online with seamless Microsoft 365 integration.",
    name: "Pooja Kulkarni",
    role: "Digital Workplace Manager",
  },
  {
    text: "From SPFx setup to deployment, the team delivered clean, scalable solutions on time.",
    name: "Nitin Agarwal",
    role: "CTO, Consulting Firm",
  },
];

export default function SpfxHero() {
  return (
    <section className="relative bg-[#00091A] pt-24 pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0057]/70 via-black/40 to-[#240F8E]/30" />

      {/* ================= HERO CONTENT ================= */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
          Build Modern{" "}
          <span className="text-green-500 font-medium">SPFx Solutions</span> for
          SharePoint Online
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-white/70">
          We design and develop high-quality SharePoint Framework (SPFx) web
          parts, extensions, and integrations that enhance user experience and
          extend Microsoft 365 capabilities using React, TypeScript, and REST
          APIs.
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
