"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    src: "https://www.softreetechnology.com/wp-content/uploads/2024/12/STPI.webp",
    alt: "STPI",
  },
  {
    src: "https://www.softreetechnology.com/wp-content/uploads/2024/12/startupindia.webp",
    alt: "Startup India",
  },
  {
    src: "https://www.softreetechnology.com/wp-content/uploads/2024/12/MCPD.webp",
    alt: "MCPD",
  },
  {
    src: "https://www.softreetechnology.com/wp-content/uploads/2024/12/MCTS.webp",
    alt: "MCTS",
  },
  {
    src: "https://www.softreetechnology.com/wp-content/uploads/2024/12/ISO-9001-2015.webp",
    alt: "ISO 9001",
  },
  {
    src: "https://www.softreetechnology.com/wp-content/uploads/2024/12/ISO-27001-2022.webp",
    alt: "ISO 27001",
  },
];
export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      });

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.from(Array.from(cards), {
          opacity: 0,
          y: 24,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-[#0a0a0a] text-white">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 px-4">
          <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight">
            Certifications & Recognitions
          </h2>

          <p className="mt-5 text-base lg:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Trusted standards that reinforce our focus on security, compliance,
            and operational excellence.
          </p>
        </div>

        {/* Cards */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-10">
          {certifications.map((item, index) => (
            <div
              key={index}
              className="
                group relative rounded-3xl p-[1px]
                bg-gradient-to-br from-[#ff7a2f]/15 via-transparent to-[#ff7a2f]/10
                transition-all duration-500
              "
            >
              {/* Inner Card */}
              <div
                className="
                  relative flex items-center justify-center
                  h-[220px] rounded-3xl
                  bg-white/[0.05] backdrop-blur-xl
                  border border-white/10
                  shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                  transition-all duration-500 ease-out
                  group-hover:-translate-y-1.5
                  group-hover:shadow-[0_20px_60px_rgba(255,122,47,0.15)]
                "
              >
                {/* Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <Image
                  src={item.src}
                  alt={item.alt}
                  width={260}
                  height={260}
                  className="
                    relative z-10
                    object-contain
                    max-w-[240px]
                    grayscale opacity-70
                    transition-all duration-500 ease-out
                    group-hover:grayscale-0
                    group-hover:opacity-100
                  "
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
