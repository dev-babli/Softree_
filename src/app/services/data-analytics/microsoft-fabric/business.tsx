"use client";
import Link from "next/link";
const cards = [
  {
    num: "01",
    title: "Unified Data Platform",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
        <ellipse
          cx="24"
          cy="12"
          rx="14"
          ry="5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M10 12v8c0 2.76 6.27 5 14 5s14-2.24 14-5v-8"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M10 20v8c0 2.76 6.27 5 14 5s14-2.24 14-5v-8"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="36" cy="36" r="5" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M36 33v3l2 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    gradient: ["#f5fbf7", "#f7fbfb"],
  },
  {
    num: "02",
    title: "AI Data Intelligence",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
        <rect
          x="8"
          y="20"
          width="8"
          height="16"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect
          x="20"
          y="12"
          width="8"
          height="24"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect
          x="32"
          y="16"
          width="8"
          height="20"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M6 38h36"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="38" cy="10" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M38 8v2l1.5 1.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
    gradient: ["#f5fbf7", "#f7fbfb"],
  },
  {
    num: "03",
    title: "Scalable Architecture",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
        <path
          d="M24 8l4 8h8l-6.5 5 2.5 8L24 24l-8 5 2.5-8L12 16h8z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle
          cx="24"
          cy="30"
          r="10"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M20 30h8M24 26v8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    gradient: ["#f5fbf7", "#f7fbfb"],
  },
  {
    num: "04",
    title: "Enterprise-Grade Security",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
        <path
          d="M24 6L10 12v10c0 9.4 5.9 18.2 14 21 8.1-2.8 14-11.6 14-21V12L24 6z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M18 24l4 4 8-8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    gradient: ["#f5fbf7", "#f7fbfb"],
  },
  {
    num: "05",
    title: "Seamless Data Connectivit",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
        <rect
          x="6"
          y="18"
          width="12"
          height="12"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect
          x="30"
          y="8"
          width="12"
          height="12"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect
          x="30"
          y="28"
          width="12"
          height="12"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M18 24h6M24 24v-10h6M24 24v10h6"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    ),
    gradient: ["#f5fbf7", "#f7fbfb"],
  },
];

export default function WhyFabricSection() {
  return (
    <div className="py-20 px-4 ">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black leading-tight">
            Why Is Microsoft Fabric Essential for Your Business
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-10">
          {cards.map((card, i) => {
            const [c1, c2] = card.gradient;
            return (
              <div
                key={i}
                className="
  relative rounded-2xl p-6 text-center
  bg-gradient-to-r from-black via-[#0f2f7a] to-black
  border border-white/10
  shadow-lg hover:shadow-2xl
  transition-all duration-300
"
              >
                {/* Number */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-1 text-sm font-bold text-black rounded-b-xl"
                  style={{
                    background: `linear-gradient(135deg, ${c1}, ${c2})`,
                  }}
                >
                  {card.num}
                </div>

                {/* Icon */}
                <div className="mt-10 mb-4 text-white">{card.icon}</div>
                <div className="text-sm font-semibold text-white">
                  {card.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/contact">
            <button className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-cyan-100 to-blue-100 text-black shadow-md hover:scale-105 transition">
              Schedule A Meeting →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
