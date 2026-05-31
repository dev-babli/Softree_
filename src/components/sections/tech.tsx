"use client";

const techStack = [
  // Languages — simpleicons SVGs are monochrome black; need invert on dark bg
  { name: "Python", img: "https://cdn.simpleicons.org/python", invert: true },

  { name: "C#", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", invert: false },

  // Backend / Frameworks
  { name: "Node.js", img: "https://cdn.simpleicons.org/nodedotjs", invert: true },
  { name: ".NET", img: "https://cdn.simpleicons.org/dotnet", invert: true },

  { name: "Django", img: "https://cdn.simpleicons.org/django", invert: true },
  { name: "GraphQL", img: "https://cdn.simpleicons.org/graphql", invert: true },

  // Frontend
  { name: "React", img: "https://cdn.simpleicons.org/react", invert: true },
  { name: "Next.js", img: "https://cdn.simpleicons.org/nextdotjs", invert: true },
  { name: "Vue.js", img: "https://cdn.simpleicons.org/vuedotjs", invert: true },

  // Mobile
  { name: "React Native", img: "https://cdn.simpleicons.org/react", invert: true },

  // Microsoft Ecosystem — full-colour brand WEBPs; do NOT invert
  {
    name: "SharePoint",
    img: "/images/sharepoint.webp",
    invert: false,
  },
  { name: "Power Apps", img: "/images/power-apps.webp", invert: false },
  { name: "Power Automate", img: "/images/power-auto.webp", invert: false },
];

export default function TechStack() {
  return (
    <section className="relative py-12 overflow-hidden bg-[#0a0a0a]">
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div
          className="
            rounded-3xl
            bg-gradient-to-br from-black/70 via-black/60 to-black/70
            border border-white/8
            backdrop-blur-xl
            shadow-[0_40px_120px_rgba(0,0,0,0.6)]
            px-6 md:px-10 lg:px-14
            py-20
          "
        >
          {/* Heading */}
          <div className="text-center mb-20">
            <h2 className="relative inline-block text-4xl md:text-5xl font-bold leading-tight mb-6">
              <span className="text-white">
                From MVPs to Enterprise Solutions
              </span>
              <br />
              <span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #3a3a3a 0%, #6b5b5b 30%, #c75a2a 65%, #ff7a2f 100%)"
                }}
              >
                Softree Builds It All
              </span>

            </h2>

            <p className="max-w-3xl mx-auto text-lg text-white/80">
              At Softree, we combine modern frontend frameworks, robust backend
              systems, cloud-native architecture, DevOps automation, and AI
              innovation to deliver scalable solutions — from fast MVP launches
              to secure, enterprise-grade platforms.
            </p>
          </div>

          {/* Marquee */}
          <div className="relative overflow-hidden">
            <style>{`
              @media (prefers-reduced-motion: no-preference) {
                .tech-marquee { animation: techScroll 28s linear infinite; }
                .tech-marquee:hover { animation-play-state: paused; }
                @keyframes techScroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
              }
            `}</style>
            <div className="tech-marquee flex gap-10 w-max">
              {[...techStack, ...techStack].map((tech, i) => (
                <div
                  key={i}
                  className="
                    min-w-[160px] h-[120px] rounded-2xl
                    bg-gradient-to-br
                    from-[#111111] via-[#0e0e0e] to-[#111111]
                    border border-white/8
                    backdrop-blur-md
                    flex flex-col items-center justify-center gap-3
                    transition-all duration-300
                    hover:-translate-y-2
                    hover:shadow-[0_0_40px_rgba(255,122,47,0.12)]
                  "
                >
                  <img
                    src={tech.img}
                    alt={tech.name}
                    /* Conditional invert — monochrome simpleicons need it on
                     * a dark canvas; full-colour brand WEBPs do not. */
                    className={`w-12 h-12 object-contain ${tech.invert ? "invert" : ""}`}
                  />
                  <span className="text-sm text-white/90">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-20">
            <a
              href="/services/mvp"
              className="
      group inline-flex items-center justify-center gap-2
      px-10 py-4 rounded-full font-semibold
      text-white transition-all duration-300
      hover:-translate-y-1 active:scale-[0.97]
    "
              style={{
                background:
                  "linear-gradient(90deg, #3a3a3a 0%, #6b5b5b 30%, #c75a2a 65%, #ff7a2f 100%)"
              }}
            >
              Explore all Technologies

              {/* Arrow */}
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
