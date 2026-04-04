"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Article = {
  imageUrl: string;
  title: string;
  date: string;
  readTime: string;
  href: string;
};

const initialFeatured: Article = {
  imageUrl:
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/43e1ec42-1889-4b06-baa4-2c3c23317d48-kore-ai/assets/images/6900c6ead004b6fe60b7d2f1_Future_20of_20Work_20with-10.webp",
  title: "The Future of Work with AI",
  date: "OCTOBER 28, 2025",
  readTime: "6 MIN",
  href: "#",
};

const initialRecent: Article[] = [
  {
    imageUrl:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/43e1ec42-1889-4b06-baa4-2c3c23317d48-kore-ai/assets/images/68fb65f2c34c1ca433a0b58e_Mastering_20the_20Iron_20-11.webp",
    title: "Mastering the 'Iron Triangle' of generative AI",
    date: "Oct 24, 2025",
    readTime: "4 min",
    href: "#",
  },
  {
    imageUrl:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/43e1ec42-1889-4b06-baa4-2c3c23317d48-kore-ai/assets/images/68b1d156967b1e8d2538ce8a_evolution_of_generative_a-12.webp",
    title:
      "Evolution of generative AI engineering from models to agentic ecosystems",
    date: "Aug 25, 2025",
    readTime: "7 min",
    href: "#",
  },
  {
    imageUrl:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/43e1ec42-1889-4b06-baa4-2c3c23317d48-kore-ai/assets/images/68fb65f2c34c1ca433a0b58e_Mastering_20the_20Iron_20-11.webp",
    title:
      "The evolution from prompt engineering to contextual AI in AI systems",
    date: "Aug 14, 2025",
    readTime: "7 min",
    href: "#",
  },
];

export default function AiInsightsBlog() {
  const [featured, setFeatured] = useState<Article>(initialFeatured);
  const [recent, setRecent] = useState<Article[]>(initialRecent);

  const handleSelect = (article: Article, index: number) => {
    setRecent((prev) => {
      const updated = [...prev];
      updated[index] = featured;
      return updated;
    });

    setFeatured(article);
  };

  return (
    <section className="sm:py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 px-4 py-1 text-xs font-semibold tracking-widest uppercase">
            Power Apps Development
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Building Business Apps with Power Apps
          </h2>

          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Explore real-world Power Apps use cases, implementation strategies,
            and best practices for building secure, scalable business
            applications on the Microsoft Power Platform.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* ================= LEFT FEATURED ================= */}
          <div className="lg:col-span-3">
            <div
              className="relative aspect-[2/1] rounded-[32px] overflow-hidden
                    shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
            >
              {/* Background frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-slate-100 to-slate-400" />

              {/* Image inset */}
              <div className="absolute inset-2 rounded-[24px] overflow-hidden">
                <Image
                  src={featured.imageUrl}
                  alt={featured.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Overlay */}
              <div
                className="absolute inset-2 rounded-[24px]
                      bg-gradient-to-t from-black/60 via-black/25 to-transparent"
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <div className="text-xs text-white/80 tracking-widest font-semibold uppercase">
                  {featured.date} • {featured.readTime}
                </div>

                <h3 className="mt-2 text-white text-3xl font-semibold leading-snug">
                  {featured.title}
                </h3>
              </div>
            </div>
          </div>

          {/* ================= RIGHT LIST ================= */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {recent.map((article, index) => (
              <button
                key={index}
                onClick={() => handleSelect(article, index)}
                className="
          group relative flex items-center gap-4
          p-4 rounded-2xl text-left
          bg-white
          border border-slate-200/60
          shadow-sm
          hover:shadow-md hover:border-slate-300
          transition-all duration-300
        "
              >
                {/* Accent bar */}
                <span
                  className="
          absolute left-0 top-1/2 -translate-y-1/2
          h-0 w-1 bg-blue-600 rounded-full
          group-hover:h-10 transition-all duration-300
        "
                />

                {/* Thumbnail */}
                <div className="relative w-36 h-[80px] flex-shrink-0 rounded-xl overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h4
                    className="font-semibold text-slate-900 leading-snug
                         group-hover:text-blue-600 transition-colors"
                  >
                    {article.title}
                  </h4>

                  <p className="mt-1 text-xs text-slate-500">
                    {article.date} • {article.readTime}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
