"use client";

import Image from "next/image";

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
  return (
    <section className="relative py-12 bg-black overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-light text-white tracking-wide">
            Certifications & Recognitions
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Trusted standards that reinforce our focus on security, compliance,
            and operational excellence.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-10">
          {certifications.map((item, index) => (
            <div
              key={index}
              className="
                group relative rounded-3xl p-[1px]
                bg-gradient-to-br from-indigo-500/30 via-transparent to-violet-500/30
                transition-all duration-500
              "
            >
              {/* Inner Card */}
              <div
                className="
                  relative flex items-center justify-center
                  h-[220px] rounded-3xl
                  bg-white/[0.035] backdrop-blur-xl
                  border border-white/10
                  transition-all duration-500 ease-out
                  group-hover:-translate-y-1.5
                  group-hover:shadow-[0_20px_60px_rgba(79,70,229,0.35)]
                "
              >
                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <Image
                  src={item.src}
                  alt={item.alt}
                  width={260}
                  height={260}
                  className="
                    relative z-10
                    object-contain
                    max-w-[240px]
                    grayscale opacity-75
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
