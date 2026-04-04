"use client";
import { useEffect, useState } from "react";

const cards = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    title: "AI Copilot",
    desc: "Assist users with contextual intelligence & automation.",
  },
  {
    id: 2,
    img: "/images/ai/ai-agent.jpg",
    title: "Agent Builder",
    desc: "Create autonomous agents that work 24/7.",
  },
  {
    id: 3,
    img: "/images/ai/analytics.jpg",
    title: "Analytics",
    desc: "Track decisions, actions & business outcomes.",
  },
];

export default function StackedSlider() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % cards.length);
  const prev = () =>
    setActive((prev) => (prev - 1 + cards.length) % cards.length);

  /* ===== AUTO ===== */
  useEffect(() => {
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, []);
  /* ================ */

  return (
    <div className="relative w-full overflow-hidden py-10 bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      {/* ===== TITLE ===== */}
      <div className="text-center mb-6 relative">
        <p className="text-purple-600 font-medium tracking-widest text-sm uppercase mb-3">
          Agentic AI Platform
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold text-zinc-900">
          Intelligence that works for you
        </h2>
      </div>

      {/* ===== STACK ===== */}
      <div className="relative w-[1200px] h-[520px] mx-auto">
        {cards.map((card, index) => {
          const offset = (index - active + cards.length) % cards.length;
          const isActive = offset === 0;

          return (
            <div
              key={card.id}
              className="
                group absolute top-0 left-1/2 -translate-x-1/2
                w-[1020px] h-[460px]
                rounded-3xl overflow-hidden
                transition-all duration-700 ease-in-out
              "
              style={{
                transform: `
                  translateX(${offset * 80}px)
                  scale(${1 - offset * 0.06})
                `,
                zIndex: cards.length - offset,
                opacity: offset > 2 ? 0 : 1,
              }}
            >
              {/* gradient border */}
              <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-purple-500 via-indigo-500 to-cyan-500">
                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-white">
                  {/* image */}
                  <img src={card.img} className="w-full h-full object-cover" />

                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* shine */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                    <div className="absolute -left-40 top-0 h-full w-40 rotate-12 bg-white/30 blur-xl animate-[shine_2s_linear_infinite]" />
                  </div>

                  {/* ===== CONTENT ===== */}
                  <div
                    className={`
                      absolute bottom-0 p-10 text-white transition duration-500
                      ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                    `}
                  >
                    <div className="inline-block px-3 py-1 text-xs rounded-full bg-white/20 backdrop-blur border border-white/30 mb-4">
                      Smart Capability
                    </div>

                    <h3 className="text-3xl font-semibold mb-2">
                      {card.title}
                    </h3>

                    <p className="text-white/80 max-w-md">{card.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
