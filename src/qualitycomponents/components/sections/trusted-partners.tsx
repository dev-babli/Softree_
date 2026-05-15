"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Partner {
  id: number;
  name: string;
  logo: string;
  category: string[];
}

const partners: Partner[] = [
  {
    id: 1,
    name: "Envision Healthcare",
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/svgs/EnvisionHealthcare-Logo-1.svg",
    category: ["Healthcare"],
  },
  {
    id: 2,
    name: "77 Diamonds",
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/svgs/77DiamondsLogo-2.svg",
    category: ["Retail & E-commerce"],
  },
  {
    id: 3,
    name: "Cadence Power",
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/cadence-power-13.png",
    category: ["Real Estate"],
  },
  {
    id: 4,
    name: "UK Police",
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/uk-police-14.png",
    category: ["Media & Entertainment"],
  },
  {
    id: 5,
    name: "ONGC",
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/ongcLogo-15.jpg",
    category: ["Healthcare", "Real Estate"],
  },
  {
    id: 6,
    name: "Partner 1",
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/image1-8.png",
    category: ["Retail & E-commerce"],
  },
  {
    id: 7,
    name: "Partner 2",
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/image2-9.png",
    category: ["Media & Entertainment"],
  },
  {
    id: 8,
    name: "Partner 3",
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/image3-10.png",
    category: ["Healthcare"],
  },
  {
    id: 9,
    name: "Partner 4",
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/image4-11.png",
    category: ["Retail & E-commerce"],
  },
  {
    id: 10,
    name: "Partner 5",
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/image5-12.png",
    category: ["Real Estate"],
  },
];

const categories = [
  "Healthcare",
  "Media & Entertainment",
  "Retail & E-commerce",
  "Real Estate",
];

export default function TrustedPartners() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPartners = activeCategory
    ? partners.filter((p) => p.category.includes(activeCategory))
    : partners;

  return (
    <section className="bg-[#00091a] py-[80px] px-6 lg:px-0 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-[36px] md:text-[40px] font-normal text-white leading-[1.2] mb-12">
            Trusted by Leading Companies<br />Across Industries
          </h2>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setActiveCategory(activeCategory === category ? null : category)
                }
                className={`px-6 py-2 rounded-full border text-[13px] transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-white text-[#00091a] border-white"
                    : "bg-transparent text-[#ffffffcc] border-[#ffffff1a] hover:border-white/40"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8 items-center justify-items-center">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="w-full max-w-[160px] h-[60px] relative transition-all duration-500 animate-in fade-in zoom-in-95"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain grayscale brightness-200 opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                sizes="(max-width: 768px) 120px, 160px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}