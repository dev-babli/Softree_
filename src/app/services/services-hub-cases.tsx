"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import "swiper/css";

const CASE_STUDIES = [
  {
    id: "wellkies-doctor",
    title: "Wellkies Doctor Mobile App",
    image: "/images/1.png",
    link: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Doctor-Document.pdf",
    challenge:
      "Doctors struggled with scattered patient records and inefficient appointment handling.",
    innovation:
      "A secure mobile-first platform with real-time patient management and smart scheduling.",
    tech: ["React Native", "Node.js", "MongoDB", "AWS"],
  },
  {
    id: "wellkies-clinic",
    title: "Wellkies Clinic Management App",
    image: "/images/2.png",
    link: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Clinic-App.pdf",
    challenge:
      "Clinic staff relied on manual workflows for billing, appointments, and records.",
    innovation:
      "An all-in-one clinic management system with automation and analytics.",
    tech: ["React", "NestJS", "PostgreSQL", "Azure"],
  },
  {
    id: "mern-blog",
    title: "Public Blogging Website (MERN)",
    image: "/images/3.png",
    link: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Public-Blogging-Website-Using-the-MERN-Stack.pdf",
    challenge:
      "Creators needed a fast, scalable, SEO-friendly publishing platform.",
    innovation:
      "A modern MERN blog with authentication, comments, and admin controls.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
  },
] as const;

export default function ServicesHubCaseStudies() {
  return (
    <section
      data-section="case-studies"
      className="relative w-full bg-[#F8F9FC] py-16 md:py-24 lg:py-28"
      aria-labelledby="services-cases-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            badge="Proof"
            accent="#1852FF"
            headline={
              <span id="services-cases-heading">
                Work that holds up in production.
              </span>
            }
            body="Representative engagements across mobile, web, and platform engineering."
            className="max-w-xl"
          />
          <Link
            href="/case-studies"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#1852FF] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1852FF]"
          >
            All case studies
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={32}
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="!overflow-visible"
        >
          {CASE_STUDIES.map((item) => (
            <SwiperSlide key={item.id}>
              <article className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#0a0a1a]/[0.08] bg-white shadow-[0_8px_32px_-20px_rgba(10,10,26,0.14)] lg:aspect-auto lg:min-h-[420px]">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="rounded-2xl border border-[#0a0a1a]/[0.08] bg-white p-8 shadow-[0_8px_32px_-20px_rgba(10,10,26,0.1)] md:p-10">
                  <h3 className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#0a0a1a] md:text-3xl">
                    {item.title}
                  </h3>
                  <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#0a0a1a]/65">
                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0a0a1a]/40">
                        The challenge
                      </p>
                      <p>{item.challenge}</p>
                    </div>
                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0a0a1a]/40">
                        Our approach
                      </p>
                      <p>{item.innovation}</p>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[#0a0a1a]/[0.08] bg-[#F8F9FC] px-3 py-1 text-xs text-[#0a0a1a]/55"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0a0a1a] px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#0a0a1a]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a0a1a]"
                  >
                    View case study
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
