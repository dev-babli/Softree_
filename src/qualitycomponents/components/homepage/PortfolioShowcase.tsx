"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
  {
    id: "weasley",
    title: "Weasley",
    image: "https://cdn.prod.website-files.com/69552630def28e394a0a6395/69593c8b763c6f46416cffdd_695879fc5b0d6e99ba758a18_egor-komarov-gTFJJ42tJmw-unsplash.webp",
    href: "/works/racely-copy",
  },
  {
    id: "motive",
    title: "Motive",
    image: "https://cdn.prod.website-files.com/69552630def28e394a0a6395/69593bd860f3e9b6d3846830_6957d469a8fcac92304baea8_688f8927eca8d8e35957da56_ChatGPT%20Image%20Aug%203%2C%202025%2C%2007_05_57%20PM-p-1080.webp",
    href: "/works/motive",
  },
  {
    id: "leiven",
    title: "Leiven",
    image: "https://cdn.prod.website-files.com/69552630def28e394a0a6395/69593ccbadcaa2d404deed97_69593bb28a5c1118b45f60ec_christian-wiediger-WkfDrhxDMC8-unsplash.webp",
    href: "/works/leiven",
  },
  {
    id: "lumyn",
    title: "Lumyn",
    image: "https://cdn.prod.website-files.com/69552630def28e394a0a6395/6957c2043278c68221dfd023_680a5c2fd4dbaa55b44d84c6_Products%20Main%20Image-8.jpg",
    href: "/works/lumyn",
  },
  {
    id: "reisfel",
    title: "Reisfel",
    image: "https://cdn.prod.website-files.com/69552630def28e394a0a6395/6957c20a657d67ac35ae4fc6_680a5c2fd7fe4902f5284fc0_Products%20Main%20Image-7.jpg",
    href: "/works/reisfel",
  },
  {
    id: "delvies",
    title: "Delvies",
    image: "https://cdn.prod.website-files.com/69552630def28e394a0a6395/6957d72badb9cd45628e1871_664d39ae0c45d683c8989974_Image%202%20Work.jpg",
    href: "/works/delvies",
  },
  {
    id: "clairvy",
    title: "Clairvy",
    image: "https://cdn.prod.website-files.com/69552630def28e394a0a6395/6957c21f14596c8b3b30de1a_68d361e4de10c5b0e50ff2e1_work-img-04.jpg",
    href: "/works/clairvy",
  },
  {
    id: "racely",
    title: "Racely",
    image: "https://cdn.prod.website-files.com/69552630def28e394a0a6395/695879e11a2c431424731f58_pexels-wolrider-18632053.webp",
    href: "/works/racely",
  },
];

function MarqueeText() {
  return (
    <div className="flex overflow-hidden py-8">
      <motion.div
        className="flex shrink-0 gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center gap-8">
            <span className="text-6xl md:text-8xl lg:text-9xl font-bold text-white/10 whitespace-nowrap tracking-tighter">
              Works *
            </span>
          </div>
        ))}
      </motion.div>
      <motion.div
        className="flex shrink-0 gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center gap-8">
            <span className="text-6xl md:text-8xl lg:text-9xl font-bold text-white/10 whitespace-nowrap tracking-tighter">
              Works *
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <Link
      ref={ref}
      href={project.href}
      className="group relative block overflow-hidden rounded-xl aspect-[4/3]"
    >
      {/* Image */}
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

      {/* Explore Button */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="px-6 py-3 bg-white text-black text-sm font-semibold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          Explore
        </span>
      </motion.div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <motion.h4
          className="text-2xl md:text-3xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {project.title.split("").map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 + i * 0.03 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h4>
      </div>
    </Link>
  );
}

export function PortfolioShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative w-full bg-[#0a0a0a] py-20 overflow-hidden"
    >
      {/* Marquee Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <MarqueeText />
      </motion.div>

      {/* Project Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-20" />
    </section>
  );
}

export default PortfolioShowcase;
