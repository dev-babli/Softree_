"use client";

const testimonials = [
  {
    text: "Softree Technology streamlined our SharePoint environment and automated key business workflows.",
    name: "Priya Nair",
    role: "IT Manager, Enterprise Organization",
  },
  {
    text: "Their SharePoint team delivered a modern intranet with seamless Microsoft 365 integration.",
    name: "Rohit Sharma",
    role: "Digital Transformation Lead",
  },
  {
    text: "From classic SharePoint to modern SharePoint Online, the migration was smooth and well executed.",
    name: "Ankit Verma",
    role: "CTO, Consulting Firm",
  },
];

export default function SharePointHero() {
  return (
    <section className="relative bg-[#00091A] pt-24 pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0057]/70 via-black/40 to-[#240F8E]/30" />

      {/* ================= HERO CONTENT ================= */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
          Build Intelligent{" "}
          <span className="text-green-500 font-medium">
            SharePoint Solutions
          </span>{" "}
          with Microsoft 365
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-white/70">
          We design, customize, and modernize SharePoint solutions that enhance
          collaboration, automate workflows, and integrate seamlessly with
          Microsoft 365, Power Platform, and enterprise systems.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
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

      {/* ================= MOVING TESTIMONIAL STRIP ================= */}
      <div className="relative z-10 mt-20 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...testimonials, ...testimonials].map((item, i) => (
            <div
              key={i}
              className="mx-4 min-w-[420px] h-[140px] p-5 rounded-xl border border-white/10 flex flex-col justify-between backdrop-blur"
              style={{
                background:
                  "linear-gradient(110deg, rgb(2,119,249) 0%, rgba(0,7,67,0) 35%), rgb(1,7,67)",
              }}
            >
              <p className="text-white/80 text-sm md:text-base line-clamp-3">
                “{item.text}”
              </p>

              <div>
                <p className="mt-2 text-white font-medium text-sm">
                  {item.name}
                </p>
                <p className="text-white/50 text-xs">
                  {item.role}
                </p>
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
