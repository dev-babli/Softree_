"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";
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
  action?: React.ReactNode;
  items: GalleryItem[];
}

export function Gallery4({ title = "Projects", description, action, items }: Gallery4Props) {
  return (
    <section className="w-full bg-white pt-12 md:pt-16 pb-14 md:pb-20 font-sans">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-6">
            <div className="max-w-3xl">
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
                <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                  {description}
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0 pb-1">
              {action}
              <div className="flex items-center gap-2">
                <CarouselPrevious className="static translate-x-0 translate-y-0 h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 bg-[#FF5812] text-white border-[#FF5812] hover:bg-[#e04805] hover:border-[#e04805] hover:text-white shadow-md shadow-[#FF5812]/20 active:scale-95 cursor-pointer disabled:bg-zinc-100 disabled:text-zinc-300 disabled:border-zinc-200 disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none" />
                <CarouselNext className="static translate-x-0 translate-y-0 h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 bg-[#FF5812] text-white border-[#FF5812] hover:bg-[#e04805] hover:border-[#e04805] hover:text-white shadow-md shadow-[#FF5812]/20 active:scale-95 cursor-pointer disabled:bg-zinc-100 disabled:text-zinc-300 disabled:border-zinc-200 disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Carousel Track */}
          <CarouselContent className="-ml-4 md:-ml-6">
            {items.map((item) => {
              const imageSrc = item.image.startsWith("/ai-healthcare-images")
                ? item.image.replace(/^\/ai-healthcare-images(\/ai-healthcare-images)?/, "/images/ai-healthcare-images")
                : item.image;

              return (
                <CarouselItem
                  key={item.id}
                  className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <a 
                    href={item.href}
                    className="group/card relative flex flex-col justify-end overflow-hidden rounded-[24px] w-full h-[500px] md:h-[600px] border border-border/50 hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 w-full h-full bg-muted">
                      {imageSrc && (
                        <img
                          src={imageSrc}
                          alt={typeof item.title === "string" ? item.title : "Case study image"}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 opacity-90 group-hover/card:opacity-100 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                      <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md leading-tight">
                        {item.title}
                      </h3>
                      <div className="w-full mt-auto mb-5">
                        {item.description}
                      </div>
                      <div className="pt-1">
                        <FlowButton
                          as="div"
                          text="View Case Study"
                          variant="white-filled"
                          className="px-6 py-2.5 text-xs font-bold w-fit shadow-lg"
                        />
                      </div>
                    </div>
                  </a>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
