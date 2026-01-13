"use client";
import { CALENDLY_URL } from '@/lib/contactConfig';

const testimonials = [
  {
    text: "Softree Technology transformed our PowerApps workflows and reduced manual effort by 40%.",
    name: "Priya Sharma",
    role: "Project Manager, Enterprise Solutions",
  },
  {
    text: "Their PowerApps developers delivered faster than expected with excellent quality.",
    name: "Rahul Mehta",
    role: "Operations Head, FinTech",
  },
  {
    text: "Deep Microsoft ecosystem knowledge and strong execution.",
    name: "Anjali Verma",
    role: "IT Director, Manufacturing",
  },
];

export default function PowerAppsHero() {
  return (
    <section className="relative bg-[#00091A] pt-24 pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0057]/70 via-black/40 to-[#240F8E]/30" />

      {/* HERO CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
          Hire a{" "}
          <span className="text-green-500 font-medium">
            Dedicated PowerApps Developer
          </span>{" "}
          to Build Faster Business Apps
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-white/70">
          Build enterprise-grade low-code applications with Microsoft PowerApps.
          Our experts integrate seamlessly with SharePoint, Office 365, and your
          existing workflows.
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


      {/* Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
