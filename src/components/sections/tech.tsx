"use client";

const techStack = [
  // Languages
  { name: "Python", img: "https://cdn.simpleicons.org/python" },

  { name: "C#", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },

  // Backend / Frameworks
  { name: "Node.js", img: "https://cdn.simpleicons.org/nodedotjs" },
  { name: ".NET", img: "https://cdn.simpleicons.org/dotnet" },

  { name: "Django", img: "https://cdn.simpleicons.org/django" },
  { name: "GraphQL", img: "https://cdn.simpleicons.org/graphql" },

  // Frontend
  { name: "React", img: "https://cdn.simpleicons.org/react" },
  { name: "Next.js", img: "https://cdn.simpleicons.org/nextdotjs" },
  { name: "Vue.js", img: "https://cdn.simpleicons.org/vuedotjs" },

  // Mobile
  { name: "React Native", img: "https://cdn.simpleicons.org/react" },

  // Microsoft Ecosystem
  {
    name: "SharePoint",
    img: "/images/sharepoint.webp",
  },
  { name: "Power Apps", img: "/images/power-apps.webp" },
  { name: "Power Automate", img: "/images/power-auto.webp" },
];

export default function TechStack() {
  return (
    <section className="relative py-12 overflow-hidden bg-gradient-to-b from-black via-[#020d1a] to-black">
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div
          className="
            rounded-3xl
            bg-gradient-to-br from-black/70 via-black/60 to-black/70
            border border-blue-500/20
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
      "linear-gradient(90deg, #ff7a2f 0%, #c75a2a 35%, #6b5b5b 70%, #3a3a3a 100%)"
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
            <div className="flex gap-10 w-max animate-marquee hover:[animation-play-state:paused]">
              {[...techStack, ...techStack].map((tech, i) => (
                <div
                  key={i}
                  className="
                    min-w-[160px] h-[120px] rounded-2xl
                    bg-gradient-to-br
                    from-[#0a1a2f]/80 via-[#050b14]/80 to-[#0a1a2f]/80
                    border border-blue-500/20
                    backdrop-blur-md
                    flex flex-col items-center justify-center gap-3
                    transition-all duration-300
                    hover:-translate-y-2
                    hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]
                  "
                >
                  <img
                    src={tech.img}
                    alt={tech.name}
                    className="w-12 h-12 object-contain invert brightness-0"
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
      hover:-translate-y-1
    "
    style={{
      background:
        "linear-gradient(90deg, #ff7a2f 0%, #c75a2a 35%, #6b5b5b 70%, #3a3a3a 100%)"
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
