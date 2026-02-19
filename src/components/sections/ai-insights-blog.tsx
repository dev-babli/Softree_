"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Article = {
  imageUrl: string;
  title: string;
  date: string;
  readTime: string;
  href: string;
  description: string;
};

const initialFeatured: Article = {
  imageUrl: "/images/1.png",
  title: "Wellkies Doctor Mobile App",
  date: "Healthcare",
  readTime: "Case Study",
  href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Doctor-Document.pdf",
  description:
    "A secure doctor-focused mobile solution providing access to schedules, patient records, and streamlined consultation workflows.",
};

const initialRecent: Article[] = [
  {
    imageUrl: "/images/2.png",
    title: "Wellkies Clinic Management App",
    date: "Healthcare",
    readTime: "Case Study",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Clinic-App.pdf",
    description:
      "An integrated clinic platform to manage appointments, staff coordination, and operational activities efficiently.",
  },
  {
    imageUrl: "/images/case-study/power-apps/project.avif",
    title: "Projects Portfolio Management",
    date: "Power Apps",
    readTime: "Case Study",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Projects-Portfolio-ManagementMicrosoft-Dataverse.pdf",
    description:
      "Built on Microsoft Dataverse, this system enables organizations to track projects, resources, and outcomes in real time.",
  },
  {
    imageUrl: "/images/case-study/power-apps/student.avif",
    title: "Students Portal Mobile App",
    date: "Power Apps",
    readTime: "Case Study",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Students-Portal-Mobile-App.pdf",
    description:
      "A unified student experience platform for accessing academic data, profiles, and institutional services.",
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
    <section className="sm:py-27 bg-gradient-to-b from-black via-[#020d1a] to-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 text-blue-400 px-4 py-1 text-xs font-semibold tracking-widest uppercase border border-blue-500/20">
            Case Studies
          </span>

          <h2 className="mt-4 text-4xl font-bold text-white">
            Our Recent Success Stories
          </h2>

          <p className="mt-4 text-base text-white/70 leading-relaxed">
            Discover how we help organizations streamline operations, enhance
            user experiences, and deliver measurable outcomes through innovative
            digital solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">
          {/* ================= LEFT FEATURED ================= */}
          <div className="lg:col-span-3 h-full">
            <Link href={featured.href} target="_blank" className="block h-full">
              <div className="relative h-full min-h-[520px] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-500 hover:scale-[1.01]">
                {/* Background frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900" />

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
                <div className="absolute inset-2 rounded-[24px] bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                  <div className="text-xs text-white/70 tracking-widest font-semibold uppercase">
                    {featured.date} • {featured.readTime}
                  </div>

                  <h3 className="mt-2 text-white text-3xl font-semibold leading-snug">
                    {featured.title}
                  </h3>

                  <p className="mt-3 text-white/70 text-sm max-w-xl">
                    {featured.description}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* ================= RIGHT LIST ================= */}
          <div className="lg:col-span-2 flex flex-col gap-3 h-full">
            {recent.map((article, index) => (
              <Link
                key={index}
                href={article.href}
                target="_blank"
                className="group relative flex items-center gap-4 flex-1 p-5 rounded-2xl text-left bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                onMouseEnter={() => handleSelect(article, index)}
              >
                {/* Accent bar */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-0 w-1 bg-blue-500 rounded-full group-hover:h-10 transition-all duration-300" />

                {/* Thumbnail */}
                <div className="relative w-36 h-[100px] flex-shrink-0 rounded-xl overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h4 className="font-semibold text-white leading-snug group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h4>

                  <p className="mt-1 text-xs text-white/60 line-clamp-2">
                    {article.description}
                  </p>

                  <p className="mt-2 text-xs text-white/60">
                    {article.date} • {article.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
