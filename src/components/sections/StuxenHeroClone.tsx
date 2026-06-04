"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import { StuxenPrimaryButton } from "@/components/sections/stuxen/StuxenPrimaryButton";
import "swiper/css";
import "./stuxen/StuxenShared.css";
import "./StuxenHeroClone.css";

const CDN = "https://cdn.prod.website-files.com/68d113e98de4829d272b54f0";

const HERO_SLIDES = [
  {
    src: `${CDN}/68d19247d1931e0206caa31c_Hero%20Img.avif`,
    sizes: "(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px",
    className: "hero-slide-img",
    alt: "Hero Slide Img",
  },
  {
    src: `${CDN}/68d19247e6b8e754a3496530_Hero%20Img-2.avif`,
    className: "hero-slide-img _02",
    alt: "Hero Slide Img",
  },
  {
    src: `${CDN}/68d192470a07c227c98a0dff_Hero%20Img-1.avif`,
    className: "hero-slide-img _03",
    alt: "Hero Slide Img",
  },
] as const;

export type StuxenHeroCloneProps = {
  subTitle?: string;
  title?: React.ReactNode;
  titleMuted?: string;
  details?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const DEFAULTS = {
  subTitle: "Best Agency Near you",
  title: "premium Digital agency webflow ",
  titleMuted: "template.",
  details:
    "At Stuxen, we craft impactful digital strategies, cutting-edge designs, and seamless web solutions that elevate brands in today\u2019s fast-moving world.",
  ctaLabel: "Explore services",
  ctaHref: "/services",
};

function SlideCorners() {
  return (
    <div className="hero-slide-corners" aria-hidden>
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />
    </div>
  );
}

export default function StuxenHeroClone({
  subTitle = DEFAULTS.subTitle,
  title = DEFAULTS.title,
  titleMuted = DEFAULTS.titleMuted,
  details = DEFAULTS.details,
  ctaLabel = DEFAULTS.ctaLabel,
  ctaHref = DEFAULTS.ctaHref,
}: StuxenHeroCloneProps) {
  return (
    <section className="stuxen-hero stuxen-ui section hero" aria-label="Hero">
      <div className="box-line-wrap" aria-hidden>
        <div className="box-line left" />
        <div className="box-line middle" />
        <div className="box-line right" />
      </div>

      <div className="w-layout-blockcontainer container w-container">
        <div className="box-wrapper">
          <div className="hero-wrapper">
            <div className="hero-title-wrapper">
              <div data-wf--sub-title--variant="base" className="sub-title-wrap">
                <div className="sub-title-dot" aria-hidden />
                <div className="sub-title">{subTitle}</div>
              </div>
              <h1 className="hero-title">
                {title}
                <span className="hero-title-span">{titleMuted}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Full-bleed mask — reference shows ~35% side card peek */}
      <div
        className="hero-slider w-slider"
        data-delay="3000"
        data-duration="500"
        data-animation="slide"
        data-autoplay="true"
        data-infinite="true"
        role="region"
        aria-label="carousel"
      >
        <Swiper
          modules={[Autoplay, A11y]}
          className="hero-slider-mask w-slider-mask"
          slidesPerView={1.72}
          centeredSlides
          loop
          loopAdditionalSlides={3}
          speed={500}
          spaceBetween={22}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: { slidesPerView: 1.06, spaceBetween: 12 },
            640: { slidesPerView: 1.42, spaceBetween: 18 },
            1024: { slidesPerView: 1.72, spaceBetween: 22 },
          }}
          a11y={{
            enabled: true,
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
          }}
        >
          {HERO_SLIDES.map((slide, i) => (
            <SwiperSlide
              key={slide.src}
              className="hero-slide w-slide"
              aria-label={`${i + 1} of ${HERO_SLIDES.length}`}
            >
              <div className="hero-slide-media">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={800}
                  height={800}
                  className={slide.className}
                  sizes={
                    "sizes" in slide
                      ? slide.sizes
                      : "(max-width: 991px) 85vw, 48vw"
                  }
                  priority={i === 0}
                  unoptimized
                />
                <SlideCorners />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-layout-blockcontainer container w-container">
        <div className="hero-details-wrap">
          <p className="hero-details">{details}</p>
          <StuxenPrimaryButton href={ctaHref} label={ctaLabel} />
        </div>
      </div>
    </section>
  );
}
