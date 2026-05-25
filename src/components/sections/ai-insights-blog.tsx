"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";

gsap.registerPlugin(ScrollTrigger);

type Article = {
  imageUrl: string;
  title: string;
  date: string;
  readTime: string;
  href: string;
  description: string;
};

const initialFeatured: Article = {
  imageUrl: "/images/case-study/power-apps/hr.png",
  title: "HR Assistant Copilot Agent",
  date: "AI Agent",
  readTime: "Case Study",
  href: "/pdf/HR-Assistant-Copilot-Agent.pptx",
  description:
    "A comprehensive HR copilot agent that streamlines onboarding, employee assistance, and policy management workflows.",
};

const initialRecent: Article[] = [
  {
    imageUrl: "/images/case-study/power-apps/travel.png",
    title: "ES Speaks and Travel Requests Management System",
    date: "AI Agent",
    readTime: "Case Study",
    href: "/pdf/ES Speaks and Travel Requests Management System.pdf",
    description:
      "A Power Platform–based internal communication and travel request management solution that enhances employee engagement through announcements, structured request workflows, feedback collection, and seamless integration with SharePoint and Microsoft Teams.",
  },
  {
    imageUrl: "/images/case-study/power-apps/barcode.png",
    title: "Barcode Scanner App",
    date: "Power Apps",
    readTime: "Case Study",
    href: "/pdf/Barcode Scanner App.pdf",
    description:
      "A Microsoft Dataverse-based barcode scanning app that automates real-time inventory tracking and reduces manual data entry.",
  },
  {
    imageUrl: "/images/case-study/power-apps/copilot.png",
    title: "AI-Powered Task Automation using Copilot in Power Apps",
    date: "AI",
    readTime: "Case Study",
    href: "/pdf/AI-Powered-Task-Automation-using-Copilot-in-Power-Apps.pptx",
    description:
      "A unified student experience platform for accessing academic data, profiles, and institutional services.",
  },
];

const homePostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...4] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage { asset->{ url }, alt },
    excerpt,
    body[0]{
      ...,
      children[0]{ text }
    }
  }
`;

export default function AiInsightsBlog() {
  const [featured, setFeatured] = useState<Article>(initialFeatured);
  const [recent, setRecent] = useState<Article[]>(initialRecent);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchLatestPosts() {
      try {
        const posts = await client.fetch(homePostsQuery);
        if (posts && posts.length > 0) {
          interface SanityPost {
            _id: string;
            title: string;
            slug?: { current?: string };
            publishedAt?: string;
            mainImage?: { asset?: { url?: string }; alt?: string };
            excerpt?: string;
            body?: { children?: { text?: string }[] };
          }
          const formattedArticles: Article[] = posts.map((post: SanityPost) => {
            const bodySnippet = post.body?.children?.[0]?.text?.substring(0, 160) || "";
            return {
              imageUrl: post.mainImage?.asset?.url || "/og-image.png",
              title: post.title,
              date: post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
                : "Recent Post",
              readTime: "Blog Post",
              href: `/blog/${post.slug?.current || ""}`,
              description: post.excerpt || bodySnippet || "Read our latest technology insights.",
            };
          });

          // Set the first post as featured, and the next 3 as recent list items
          if (formattedArticles.length > 0) {
            setFeatured(formattedArticles[0]);
            setRecent(formattedArticles.slice(1));
          }
        }
      } catch (err) {
        console.error("Error fetching homepage posts from Sanity:", err);
      }
    }
    fetchLatestPosts();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector(".blog-header");
      const grid = sectionRef.current?.querySelector(".blog-grid");
      if (header) {
        gsap.from(header, {
          opacity: 0, y: 28, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: header, start: "top 88%" },
        });
      }
      if (grid) {
        gsap.from(grid, {
          opacity: 0, y: 20, duration: 0.65, ease: "power3.out", delay: 0.1,
          scrollTrigger: { trigger: grid, start: "top 90%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSelect = (article: Article) => {
    setFeatured(article);
  };

  return (
    <section ref={sectionRef} className="sm:py-27 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="blog-header mb-12 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#ff7a2f]/10 text-[#ff7a2f] px-4 py-1 text-xs font-semibold tracking-widest uppercase border border-[#ff7a2f]/20">
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

        <div className="blog-grid grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">
          {/* ================= LEFT FEATURED ================= */}
          <div className="lg:col-span-3 h-full">
            <Link href={featured.href} target="_blank" className="block h-full">
              <div className="relative h-full min-h-[520px] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-500 hover:scale-[1.01]">
                {/* Background frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#111111] to-[#0a0a0a]" />

                {/* Image inset — AnimatePresence for smooth swap */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={featured.imageUrl}
                    className="absolute inset-2 rounded-[24px] overflow-hidden"
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ type: "spring", duration: 0.5, bounce: 0 }}
                  >
                    <Image
                      src={featured.imageUrl}
                      alt={featured.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Overlay */}
                <div className="absolute inset-2 rounded-[24px] bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Content — fades with article change */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={featured.title}
                    className="absolute bottom-0 left-0 right-0 p-8 z-10"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                  >
                    <div className="text-xs text-white/70 tracking-widest font-semibold uppercase">
                      {featured.date} • {featured.readTime}
                    </div>

                    <h3 className="mt-2 text-white text-3xl font-semibold leading-snug">
                      {featured.title}
                    </h3>

                    <p className="mt-3 text-white/70 text-sm max-w-xl">
                      {featured.description}
                    </p>
                    <button className="mt-5 inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-full hover:bg-[#ff7a2f]/20 transition-all duration-300">
                      Read More &rarr;
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Link>
          </div>

          {/* ================= RIGHT LIST RIGHT ================= */}
          <div className="lg:col-span-2 flex flex-col gap-3 h-full">
            {recent.map((article, index) => (
              <Link
                key={index}
                href={article.href}
                target="_blank"
                className="group relative flex items-center gap-4 flex-1 p-5 rounded-2xl text-left bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                onMouseEnter={() => handleSelect(article)}
              >
                {/* Accent bar */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-0 w-1 bg-[#ff7a2f] rounded-full group-hover:h-10 transition-all duration-300" />

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
                  <h4 className="font-semibold text-white leading-snug group-hover:text-[#ff7a2f] transition-colors">
                    {article.title}
                  </h4>

                  <p className="mt-1 text-xs text-white/60 line-clamp-2">
                    {article.description}
                  </p>

                  <p className="mt-2 text-xs text-white/60">
                    {article.date} • {article.readTime}
                  </p>
                  <button className="mt-2 inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-full hover:bg-[#ff7a2f]/20 transition-all duration-300">
                    Read More &rarr;
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
