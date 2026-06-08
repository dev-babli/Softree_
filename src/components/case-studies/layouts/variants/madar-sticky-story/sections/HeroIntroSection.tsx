import Image from "next/image"
import { ChevronDown } from "lucide-react"
import type { MadarLayoutData } from "../types"

type Props = Pick<MadarLayoutData, "eyebrow" | "heroTitleLines" | "heroLeadLines" | "heroImage" | "heroImageMobile">

export function HeroIntroSection({
  eyebrow,
  heroTitleLines,
  heroLeadLines,
  heroImage,
  heroImageMobile,
}: Props) {
  return (
    <section className="madar-hero platform-inner-intro" id="top" data-madar-section="hero">
      <div className="madar-hero__sticky">
        <div className="madar-hero__bg" data-madar-parallax="hero-bg">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hidden object-cover md:block"
          />
          <Image
            src={heroImageMobile}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover md:hidden"
          />
        </div>
        <div className="madar-hero__overlay" />
        <div className="madar-hero__inner madar-container">
          <span className="madar-hero__eyebrow">{eyebrow}</span>
          <span className="madar-border-deco" style={{ marginTop: "0.5rem" }} />
          <div className="madar-hero__grid" style={{ marginTop: "2rem" }}>
            <div>
              <h1 className="madar-hero__title">
                {heroTitleLines.map((line) => (
                  <span key={line} style={{ display: "block" }}>
                    {line}
                  </span>
                ))}
              </h1>
            </div>
            <div className="madar-hero__lead-col">
              <p className="madar-hero__lead">
                {heroLeadLines.map((line) => (
                  <span key={line} style={{ display: "block" }}>
                    {line}
                  </span>
                ))}
              </p>
              <a href="#about" className="madar-hero__scroll" aria-label="Scroll down">
                <ChevronDown size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
