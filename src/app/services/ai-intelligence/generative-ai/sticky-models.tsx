"use client";

const models = [
  {
    title: "GPT",
    desc: "Power intelligent copilots, enterprise search, and automated workflows with industry-leading language understanding and reasoning.",
  },
  {
    title: "DALL·E",
    desc: "Turn ideas into high-quality visuals, marketing assets, and product imagery with advanced text-to-image generation.",
  },
  {
    title: "Whisper",
    desc: "Unlock accurate speech recognition, multilingual transcription, and voice intelligence at scale.",
  },
  {
    title: "Midjourney",
    desc: "Accelerate creative exploration with production-ready artwork, concept designs, and visual storytelling.",
  },
  {
    title: "Claude",
    desc: "Enable safe, steerable AI interactions with powerful long-context reasoning built for business reliability.",
  },
  {
    title: "Gemini",
    desc: "Build next-generation multimodal applications that seamlessly understand text, images, code, and structured data.",
  },
  {
    title: "Llama",
    desc: "Adopt customizable open-weight models that offer flexibility, transparency, and optimized infrastructure costs.",
  },
  {
    title: "Stable Diffusion",
    desc: "Generate scalable visual content, design variations, and rapid creative prototypes with precision control.",
  },
];

export default function StickyModels() {
  return (
    <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24">
        {/* ================= LEFT (STICKY) ================= */}
        <div className="h-fit lg:sticky lg:top-32">
          {/* eyebrow */}
          <div className="text-sm font-semibold text-cyan-600 mb-4 tracking-widest uppercase">
            AI Foundation
          </div>

          <h2 className="text-4xl md:text-5xl font-semibold text-zinc-900 leading-tight">
            Built on World-Class Intelligence
            <span className="block mt-2 text-zinc-600">
              The Models Powering Your Competitive Advantage
            </span>
          </h2>

          {/* accent */}
          <div className="my-10 h-[2px] w-28 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />

          <p className="text-zinc-600 text-lg leading-relaxed max-w-xl">
            We combine state-of-the-art AI systems with deep engineering
            expertise to create secure, scalable, and production-ready solutions
            that accelerate innovation and deliver measurable business value.
          </p>
        </div>

        {/* ================= RIGHT (SCROLLING) ================= */}
        <div className="relative">
          {/* vertical rail */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-200" />

          <div className="space-y-8">
            {models.map((item, i) => (
              <div key={i} className="group relative flex gap-8">
                {/* number / icon */}
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-xl bg-gray-600 border border-zinc-200 shadow-sm transition group-hover:shadow-md">
                  <span className="text-sm font-semibold text-zinc-100">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* content */}
                <div className="pb-14 border-b border-zinc-200 last:border-none">
                  <h4 className="text-zinc-900 font-semibold text-xl mb-3">
                    {item.title}
                  </h4>

                  <p className="text-zinc-600 leading-relaxed max-w-lg">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="h-10" />
        </div>
      </div>
    </section>
  );
}
