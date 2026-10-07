import React from "react";
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
  ctaText?: string;
  label?: string;
}

export interface Gallery4Props {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  items: GalleryItem[];
  showControls?: boolean;
}

export function LogisticsGallery4({
  title = "Projects",
  description,
  action,
  items,
  showControls = false,
}: Gallery4Props) {
  return (
    <section className="w-full bg-white pt-12 md:pt-16 pb-14 md:pb-20 font-sans">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <Carousel
          opts={{
            align: "start",
            loop: showControls,
          }}
          className="w-full"
        >
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-6">
            <div className="max-w-3xl">
              {title && (
                typeof title === "string" ? (
                  <h2 className="typo-heading-2 mb-4 text-slate-900">
                    {title}
                  </h2>
                ) : (
                  <div className="mb-4">{title}</div>
                )
              )}
              {description && (
                <p className="typo-description text-slate-500">
                  {description}
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0 pb-1">
              {action}
              {showControls && (
                <div className="flex items-center gap-2.5">
                  <div className="has-[:disabled]:opacity-0 has-[:disabled]:pointer-events-none transition-opacity duration-300">
                    <CarouselPrevious className="!static !top-auto !left-auto !right-auto translate-x-0 translate-y-0 h-12 w-12 rounded-full flex items-center justify-center bg-white text-slate-900 border border-slate-200 shadow-sm hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 active:scale-95 cursor-pointer" />
                  </div>
                  <div className="relative h-12 w-12 shrink-0 has-[:disabled]:opacity-0 has-[:disabled]:pointer-events-none transition-opacity duration-300">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-[3px] rounded-full animate-[spin_2.8s_linear_infinite]"
                      style={{
                        background:
                          "conic-gradient(from 0deg, #FFB347, #FF5812, #FF8A3D, #FFE0C2, #FF5812, #FFB347)",
                      }}
                    />
                    <CarouselNext className="!static relative z-10 !top-auto !left-auto !right-auto translate-x-0 translate-y-0 h-12 w-12 rounded-full flex items-center justify-center bg-[#FF5812] text-white border-0 shadow-[0_8px_18px_rgba(255,88,18,0.35)] hover:bg-[#e04805] hover:text-white active:scale-95 cursor-pointer" />
                  </div>
                </div>
              )}
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
                          className="w-full h-full object-cover transition-transform duration-700 group/card:scale-105"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 opacity-90 group/card:opacity-100 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                      {item.label && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/20 bg-black/40 typo-caption-meta text-white uppercase mb-3 w-fit backdrop-blur-md">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FF5812]"></div>
                          {item.label}
                        </div>
                      )}
                      <h3 className="typo-heading-3 text-white drop-shadow-md leading-tight">
                        {item.title}
                      </h3>
                      <div className="w-full mt-auto mb-5">
                        {item.description}
                      </div>
                      <div className="pt-1">
                        <FlowButton
                          as="div"
                          text={item.ctaText || "View Case Study"}
                          variant="white-filled"
                          className="px-6 py-2.5 typo-button-sm w-fit shadow-lg"
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

const caseStudyData: Gallery4Props = {
  title: (
    <div className="flex flex-col items-start">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-4 w-fit">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
        LOGISTICS TESTING CASE STUDIES
      </div>
      <span className="typo-heading-2 text-slate-900 leading-tight text-left">
        Logistics Testing in Action{" "}
        <span className="text-orange-600">Across Real-World Platforms</span>
      </span>
    </div>
  ) as any,
  description:
    "Explore how logistics testing, test automation, and quality engineering improve TMS/WMS reliability, accelerate releases, and strengthen supply chain workflows.",
  items: [
    {
      id: "logistics-control-tower-shipment-visibility-platform",
      title: "Logistics Control Tower & Visibility",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className="text-white/90 typo-body-sm leading-relaxed">
            Validated multi-carrier tracking, delay alerts, and predictive ETAs
            across a control tower unifying TMS, WMS, and carrier feeds.
          </p>
        </div>
      ),
      href: "/case-studies/logistics-control-tower-shipment-visibility-platform",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&h=1500&q=85",
    },
    {
      id: "intelligent-warehouse-operations-assistant-with-ai-agents",
      title: "Intelligent Warehouse Operations Assistant",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className="text-white/90 typo-body-sm leading-relaxed">
            Quality-engineered warehouse AI workflows spanning WMS, ERP, and
            floor exception triage with hands-free operator flows.
          </p>
        </div>
      ),
      href: "/case-studies/intelligent-warehouse-operations-assistant-with-ai-agents",
      image:
        "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&h=1500&q=85",
    },
    {
      id: "ai-powered-shipment-exception-management",
      title: "AI Shipment Exception Management",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className="text-white/90 typo-body-sm leading-relaxed">
            Tested exception classification, severity routing, and resolution
            workflows across air, ocean, and drayage operations.
          </p>
        </div>
      ),
      href: "/case-studies/ai-powered-shipment-exception-management",
      image:
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&h=1500&q=85",
    },
    {
      id: "ai-based-fraud-detection-in-logistics",
      title: "AI Fraud Detection in Logistics",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className="text-white/90 typo-body-sm leading-relaxed">
            Validated invoice anomaly detection, carrier identity checks, and
            bill-of-lading audit pipelines under high shipment volume.
          </p>
        </div>
      ),
      href: "/case-studies/ai-based-fraud-detection-in-logistics",
      image:
        "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&h=1500&q=85",
    },
    {
      id: "ai-driven-logistics-cost-optimization-microsoft-foundry",
      title: "Cost Optimization with Microsoft Foundry",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className="text-white/90 typo-body-sm leading-relaxed">
            Validated freight-lane pooling, rate benchmarking, and route
            consolidation models that cut deadhead miles and spot-rate waste.
          </p>
        </div>
      ),
      href: "/case-studies/ai-driven-logistics-cost-optimization-microsoft-foundry",
      image: "/images/logistics-testing-images/06-case-studies/case-cost.jpg?v=1",
    },
    {
      id: "last-mile-delivery-and-route-quality-testing",
      title: "Last-Mile Delivery & Route Quality",
      description: (
        <div className="space-y-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className="text-white/90 typo-body-sm leading-relaxed">
            Quality-engineered last-mile routing, ETA accuracy, proof of
            delivery, and dispatcher workflows across high-volume urban lanes.
          </p>
        </div>
      ),
      href: "/case-studies",
      image: "/images/logistics-testing-images/06-case-studies/case-lastmile.jpg?v=1",
    },
  ],
};

export default function LogisticsTestingCaseStudies() {
  return (
    <div className="relative bg-white flex flex-col items-center -mt-4 md:-mt-8 -mb-8 md:-mb-12">
      <div className="w-full">
        <LogisticsGallery4
          {...caseStudyData}
          showControls
          action={
            <FlowButton
              href="/case-studies"
              text="Explore Logistics Case Studies"
              variant="orange-filled"
              className="py-3 px-6 text-xs sm:text-sm font-bold shadow-md"
            />
          }
        />
      </div>
    </div>
  );
}
