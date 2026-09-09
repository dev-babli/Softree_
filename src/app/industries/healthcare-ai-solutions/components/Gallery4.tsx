"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface GalleryItem {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: React.ReactNode;
  description?: React.ReactNode;
  items: GalleryItem[];
}

export function Gallery4({ title = "Projects", description, items }: Gallery4Props) {
  return (
    <section className="w-full bg-white pt-12 md:pt-16 pb-16 md:pb-24">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm]">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="max-w-2xl">
              {title && (
                typeof title === "string" ? (
                  <h2 className="text-3xl md:text-5xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif] tracking-tight mb-4 text-slate-900">
                    {title}
                  </h2>
                ) : (
                  <div className="mb-4">{title}</div>
                )
              )}
              {description && (
                <p className="text-slate-500 text-lg md:text-xl leading-relaxed">
                  {description}
                </p>
              )}
            </div>
           
            <div className="flex items-center gap-3 shrink-0 pb-2">
              <CarouselPrevious className="static translate-x-0 translate-y-0 h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 bg-[#FF5812] text-white border-[#FF5812] hover:bg-[#e04805] hover:border-[#e04805] hover:text-white shadow-md shadow-[#FF5812]/20 active:scale-95 cursor-pointer disabled:bg-zinc-100 disabled:text-zinc-300 disabled:border-zinc-200 disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none" />
              <CarouselNext className="static translate-x-0 translate-y-0 h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 bg-[#FF5812] text-white border-[#FF5812] hover:bg-[#e04805] hover:border-[#e04805] hover:text-white shadow-md shadow-[#FF5812]/20 active:scale-95 cursor-pointer disabled:bg-zinc-100 disabled:text-zinc-300 disabled:border-zinc-200 disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none" />
            </div>
          </div>

          {/* Carousel Track */}
          <CarouselContent className="-ml-4 md:-ml-6">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <a
                  href={item.href}
                  className="group relative flex flex-col justify-end overflow-hidden rounded-[24px] w-full h-[500px] md:h-[600px] border border-border/50 hover:shadow-xl transition-all duration-300"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 w-full h-full bg-muted">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={typeof item.title === "string" ? item.title : "Case study"}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </div>
                 
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                 
                  {/* Content */}
                  <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                    <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md leading-tight">
                      {item.title}
                    </h3>
                   
                    <div className="w-full mt-auto mb-5">
                      {item.description}
                    </div>
                   
                    <div className="flex items-center text-white font-semibold text-[15px] group-hover:text-white transition-colors">
                      View Case Study <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
