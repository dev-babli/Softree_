"use client";

import React from "react";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";

interface ImageCardData {
  id: string;
  imageUrl: string;
  name: string;
  title: string;
  heightClass: string;
}

export function CommunityMasonryStoriesSection() {
  const imageCards: Record<string, ImageCardData> = {
    img1: {
      id: "img1",
      imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
      name: "Surgical Robotics AI",
      title: "CareLine Telehealth",
      heightClass: "h-[320px]",
    },
    img2: {
      id: "img2",
      imageUrl: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?q=80&w=800&auto=format&fit=crop",
      name: "Medical Diagnostic Laser",
      title: "Apex Health Systems",
      heightClass: "h-[360px]",
    },
    img3: {
      id: "img3",
      imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
      name: "Clinical Telemetry Suite",
      title: "BioVance Health",
      heightClass: "h-[200px]",
    },
    img4: {
      id: "img4",
      imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop",
      name: "Diagnostic Biomarker Lab",
      title: "MedPulse Analytics",
      heightClass: "h-[220px]",
    },
    img5: {
      id: "img5",
      imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800&auto=format&fit=crop",
      name: "Medical Diagnostic Scanner",
      title: "ECG Group",
      heightClass: "h-[320px]",
    },
    img6: {
      id: "img6",
      imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop",
      name: "Clinical Research Equipment",
      title: "NextGen Medical AI",
      heightClass: "h-[320px]",
    },
  };

  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 text-neutral-900 relative overflow-hidden border-t border-zinc-100">
      <style>{`
        @keyframes marquee-vertical-up {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marquee-vertical-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0%); }
        }
        .animate-marquee-up {
          animation: marquee-vertical-up 32s linear infinite;
        }
        .animate-marquee-down {
          animation: marquee-vertical-down 34s linear infinite;
        }
        .animate-marquee-up-fast {
          animation: marquee-vertical-up 28s linear infinite;
        }
        .animate-marquee-down-fast {
          animation: marquee-vertical-down 30s linear infinite;
        }
        .marquee-container:hover .animate-marquee-up,
        .marquee-container:hover .animate-marquee-down,
        .marquee-container:hover .animate-marquee-up-fast,
        .marquee-container:hover .animate-marquee-down-fast {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#FF5812] text-xs font-bold uppercase tracking-[0.2em] font-mono mb-3 block">
            CLIENT STORIES & REVIEWS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-tight mb-4">
            Trusted by Leaders in <span className="text-[#FF5812]">Healthcare & Tech</span>
          </h2>
          <p className="text-neutral-600 text-base md:text-lg">
            Read real experiences from enterprise clients, health-tech innovators, and medical providers worldwide.
          </p>
        </div>

        {/* 4-Column Vertical Scrolling Marquee Grid */}
        <div className="relative h-[680px] overflow-hidden rounded-3xl">
          {/* Top/Bottom Gradient Fade Masks */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-zinc-50 to-transparent z-20" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-zinc-50 to-transparent z-20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start h-full">
            {/* COLUMN 1 (Scrolling Upwards) */}
            <div className="marquee-container overflow-hidden h-full">
              <div className="animate-marquee-up flex flex-col gap-6">
                {[1, 2].map((loop) => (
                  <React.Fragment key={`col1-loop-${loop}`}>
                    {/* Card 1: Quote Card */}
                    <div className="bg-white border border-[#E5DACD] rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <h3 className="text-base font-bold text-[#2A1D17] mb-3">
                        “Exceptional Delivery & Communication”
                      </h3>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-[#E5DACD]">
                          <Image
                            src="https://images.unsplash.com/photo-1594824813566-78a9c2409540?q=80&w=200&auto=format&fit=crop"
                            alt="Natasha Adams"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#2A1D17]">Natasha Adams</div>
                          <div className="text-[11px] font-semibold text-[#FF5812]">Wicked Point LLC</div>
                          <div className="text-[10px] text-[#8A7568] flex items-center gap-1">
                            <MapPin size={9} /> Virginia, USA
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-[#5E4C41] leading-relaxed font-normal">
                        We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. The final product was exactly what we wanted.
                      </p>
                    </div>

                    {/* Card 2: Image Card (img1) */}
                    <div className={`relative rounded-3xl overflow-hidden ${imageCards.img1.heightClass} shadow-lg border border-[#E5DACD] group bg-[#2A1D17]`}>
                      <Image
                        src={imageCards.img1.imageUrl}
                        alt={imageCards.img1.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15">
                        <span>{imageCards.img1.name}</span>
                        <span className="text-white/70">{imageCards.img1.title}</span>
                      </div>
                    </div>

                    {/* Card 3: Quote Card */}
                    <div className="bg-white border border-[#E5DACD] rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <h3 className="text-base font-bold text-[#2A1D17] mb-3">
                        “Outstanding Response & Support”
                      </h3>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-[#E5DACD]">
                          <Image
                            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop"
                            alt="Arkady Fedorovtsjev"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#2A1D17]">Arkady Fedorovtsjev</div>
                          <div className="text-[11px] font-semibold text-[#FF5812]">ECG Group</div>
                          <div className="text-[10px] text-[#8A7568] flex items-center gap-1">
                            <MapPin size={9} /> Netherlands
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-[#5E4C41] leading-relaxed font-normal">
                        Overall, we are satisfied with our collaboration in the past and your last action and response to our reported issue, really makes a difference.
                      </p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* COLUMN 2 (Scrolling Downwards) */}
            <div className="marquee-container overflow-hidden h-full">
              <div className="animate-marquee-down flex flex-col gap-6">
                {[1, 2].map((loop) => (
                  <React.Fragment key={`col2-loop-${loop}`}>
                    {/* Card 4: Tall Image Card (img2) */}
                    <div className={`relative rounded-3xl overflow-hidden ${imageCards.img2.heightClass} shadow-lg border border-[#E5DACD] group bg-[#2A1D17]`}>
                      <Image
                        src={imageCards.img2.imageUrl}
                        alt={imageCards.img2.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15">
                        <span>{imageCards.img2.name}</span>
                        <span className="text-white/70">{imageCards.img2.title}</span>
                      </div>
                    </div>

                    {/* Card 5: Horizontal Image Card (img3) */}
                    <div className={`relative rounded-3xl overflow-hidden ${imageCards.img3.heightClass} shadow-lg border border-[#E5DACD] group bg-[#2A1D17]`}>
                      <Image
                        src={imageCards.img3.imageUrl}
                        alt={imageCards.img3.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15">
                        <span>{imageCards.img3.name}</span>
                        <span className="text-white/70">{imageCards.img3.title}</span>
                      </div>
                    </div>

                    {/* Card 6: Quote Card */}
                    <div className="bg-white border border-[#E5DACD] rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <h3 className="text-base font-bold text-[#2A1D17] mb-3">
                        “Built Exactly What We Needed”
                      </h3>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-[#E5DACD]">
                          <Image
                            src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&auto=format&fit=crop"
                            alt="Darrell Trimble"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#2A1D17]">Darrell Trimble</div>
                          <div className="text-[11px] font-semibold text-[#FF5812]">SP Marketplace</div>
                          <div className="text-[10px] text-[#8A7568] flex items-center gap-1">
                            <MapPin size={9} /> California, USA
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-[#5E4C41] leading-relaxed font-normal">
                        SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed with precision and speed.
                      </p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* COLUMN 3 (Scrolling Upwards - Fast) */}
            <div className="marquee-container overflow-hidden h-full hidden lg:block">
              <div className="animate-marquee-up-fast flex flex-col gap-6">
                {[1, 2].map((loop) => (
                  <React.Fragment key={`col3-loop-${loop}`}>
                    {/* Card 7: Medium Image Card (img4) */}
                    <div className={`relative rounded-3xl overflow-hidden ${imageCards.img4.heightClass} shadow-lg border border-[#E5DACD] group bg-[#2A1D17]`}>
                      <Image
                        src={imageCards.img4.imageUrl}
                        alt={imageCards.img4.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15">
                        <span>{imageCards.img4.name}</span>
                        <span className="text-white/70">{imageCards.img4.title}</span>
                      </div>
                    </div>

                    {/* Card 8: Quote Card */}
                    <div className="bg-white border border-[#E5DACD] rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <h3 className="text-base font-bold text-[#2A1D17] mb-3">
                        “HIPAA-Compliant AI Excellence”
                      </h3>
                      <p className="text-xs text-[#5E4C41] leading-relaxed font-normal">
                        Softree built our HIPAA-compliant AI triage assistant and integrated SMART on FHIR with Epic EHR seamlessly. Their engineering standards are world-class.
                      </p>
                    </div>

                    {/* Card 9: Tall Image Card (img5) */}
                    <div className={`relative rounded-3xl overflow-hidden ${imageCards.img5.heightClass} shadow-lg border border-[#E5DACD] group bg-[#2A1D17]`}>
                      <Image
                        src={imageCards.img5.imageUrl}
                        alt={imageCards.img5.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15">
                        <span>{imageCards.img5.name}</span>
                        <span className="text-white/70">{imageCards.img5.title}</span>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* COLUMN 4 (Scrolling Downwards - Fast) */}
            <div className="marquee-container overflow-hidden h-full hidden lg:block">
              <div className="animate-marquee-down-fast flex flex-col gap-6">
                {[1, 2].map((loop) => (
                  <React.Fragment key={`col4-loop-${loop}`}>
                    {/* Card 10: Quote Card */}
                    <div className="bg-white border border-[#E5DACD] rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <h3 className="text-base font-bold text-[#2A1D17] mb-3">
                        “Accelerated Launch by 4 Months”
                      </h3>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-[#E5DACD]">
                          <Image
                            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop"
                            alt="Sarah Jenkins"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#2A1D17]">Sarah Jenkins</div>
                          <div className="text-[11px] font-semibold text-[#FF5812]">CareLine Telehealth</div>
                          <div className="text-[10px] text-[#8A7568] flex items-center gap-1">
                            <MapPin size={9} /> London, UK
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-[#5E4C41] leading-relaxed font-normal">
                        Working with Softree's AI engineering team accelerated our AI patient concierge rollout by 4 months. Exceptional communication and turnaround.
                      </p>
                    </div>

                    {/* Card 11: Tall Image Card (img6) */}
                    <div className={`relative rounded-3xl overflow-hidden ${imageCards.img6.heightClass} shadow-lg border border-[#E5DACD] group bg-[#2A1D17]`}>
                      <Image
                        src={imageCards.img6.imageUrl}
                        alt={imageCards.img6.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15">
                        <span>{imageCards.img6.name}</span>
                        <span className="text-white/70">{imageCards.img6.title}</span>
                      </div>
                    </div>

                    {/* Card 12: Quote Card */}
                    <div className="bg-white border border-[#E5DACD] rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <h3 className="text-base font-bold text-[#2A1D17] mb-3">
                        “95%+ Accuracy in AI Models”
                      </h3>
                      <p className="text-xs text-[#5E4C41] leading-relaxed font-normal">
                        The healthcare AI models and RAG pipeline engineered by Softree delivered 95%+ accuracy. We are extremely pleased with the ongoing collaboration.
                      </p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



