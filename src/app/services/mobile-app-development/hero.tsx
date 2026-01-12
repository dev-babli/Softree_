"use client";

const testimonials = [
  {
    text: "Softree Technology built a high-performance mobile app that scaled seamlessly with our user growth.",
    name: "Amit Kulkarni",
    role: "Founder, Startup Tech",
  },
  {
    text: "Their mobile app team delivered an intuitive UI and rock-solid backend integration.",
    name: "Sneha Patel",
    role: "Product Manager, SaaS Company",
  },
  {
    text: "From idea to App Store launch, Softree handled everything professionally.",
    name: "Rohit Verma",
    role: "CTO, Digital Solutions",
  },
];

export default function MobileAppHero() {
  return (
    <section className="relative bg-[#00091A] pt-12 pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0057]/70 via-black/40 to-[#240F8E]/30" />

      {/* HERO CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
          Build High-Performance{" "}
          <span className="text-green-500 font-medium">
            Mobile Applications
          </span>{" "}
          for iOS & Android
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-white/70">
          We design and develop secure, scalable, and user-friendly mobile apps
          using React Native, Flutter, and native technologies — from MVP to
          enterprise-grade solutions.
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
