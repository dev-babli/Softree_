"use client";
import { useEffect, useState } from "react";

const cards = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    title: "Connect & Import Data",
    desc: "Connect Power BI to multiple data sources like Excel, SQL Server, APIs, and cloud services to import and combine business data.",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
    title: "Transform & Model Data",
    desc: "Clean and transform data using Power Query, create relationships, and build structured data models for accurate reporting.",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1543286386-713bdd548da4",
    title: "Visualize & Share Insights",
    desc: "Design interactive reports and dashboards, apply filters and slicers, and share insights with teams using Power BI Service.",
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
      {/* ========= HEADER ========= */}
      <div className="text-center mb-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900">
          What We Do with Power BI
        </h2>

        <p className="text-gray-600 mt-2 text-lg mb-4">
          Transform Raw Data into Meaningful Insights that Drive Smarter
          Business Decisions{" "}
        </p>
      </div>

      {/* ===== STACK ===== */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-[520px]">
          {cards.map((card, index) => {
            const offset = (index - active + cards.length) % cards.length;
            const isActive = offset === 0;

            return (
              <div
                key={card.id}
                className="
      group absolute top-0 left-0
      w-full h-[460px]
      rounded-3xl overflow-hidden
      transition-all duration-700 ease-in-out
    "
                style={{
                  transform: `
        translateX(${offset * 80}px)
        scale(${1 - Math.abs(offset) * 0.06})
      `,
                  transformOrigin: "center left",
                  zIndex: cards.length - Math.abs(offset),
                  opacity: Math.abs(offset) > 2 ? 0 : 1,
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
    </div>
  );
}
