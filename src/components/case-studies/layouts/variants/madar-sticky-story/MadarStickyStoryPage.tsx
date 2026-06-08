"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import "./madar-sticky-story.css"
import type { MadarLayoutData } from "./types"
import { HeroIntroSection } from "./sections/HeroIntroSection"
import { AboutStickySection } from "./sections/AboutStickySection"
import { AssessmentSection } from "./sections/AssessmentSection"
import { IntegrationStickySection } from "./sections/IntegrationStickySection"

gsap.registerPlugin(ScrollTrigger)

type Props = {
  data: MadarLayoutData
}

export function MadarStickyStoryPage({ data }: Props) {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduced) return

      const heroBg = rootRef.current?.querySelector<HTMLElement>("[data-madar-parallax='hero-bg'] img")
      if (heroBg) {
        gsap.fromTo(
          heroBg,
          { yPercent: 0 },
          {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-madar-section='hero']",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        )
      }

      const aboutSection = rootRef.current?.querySelector<HTMLElement>("[data-madar-section='about']")
      const aboutBg = rootRef.current?.querySelector<HTMLElement>("[data-madar-parallax='about-bg']")
      const aboutLogo = rootRef.current?.querySelector<HTMLElement>("[data-madar-parallax='about-logo']")
      if (aboutSection && aboutBg) {
        gsap.fromTo(
          aboutBg,
          { yPercent: 8 },
          {
            yPercent: -35,
            ease: "none",
            scrollTrigger: {
              trigger: aboutSection,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        )
      }
      if (aboutSection && aboutLogo) {
        gsap.fromTo(
          aboutLogo,
          { y: "12vh" },
          {
            y: "-8vh",
            ease: "none",
            scrollTrigger: {
              trigger: aboutSection,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        )
      }

      const assessmentBg = rootRef.current?.querySelector<HTMLElement>("[data-madar-parallax='assessment-bg'] img")
      if (assessmentBg) {
        gsap.fromTo(
          assessmentBg,
          { yPercent: 0 },
          {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-madar-section='assessment']",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        )
      }

      const integrationSection = rootRef.current?.querySelector<HTMLElement>(
        "[data-madar-section='integration']",
      )
      const integrationDiagram = rootRef.current?.querySelector<HTMLElement>(
        ".madar-integration__side .madar-integration__diagram",
      )
      if (integrationSection && integrationDiagram) {
        gsap.fromTo(
          integrationDiagram,
          { y: "8vh" },
          {
            y: "-18vh",
            ease: "none",
            scrollTrigger: {
              trigger: integrationSection,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        )
      }
    },
    { scope: rootRef, dependencies: [data] },
  )

  return (
    <article ref={rootRef} className="madar-story">
      <HeroIntroSection
        eyebrow={data.eyebrow}
        heroTitleLines={data.heroTitleLines}
        heroLeadLines={data.heroLeadLines}
        heroImage={data.heroImage}
        heroImageMobile={data.heroImageMobile}
      />
      <AboutStickySection
        aboutHeading={data.aboutHeading}
        aboutIntro={data.aboutIntro}
        aboutClientHeading={data.aboutClientHeading}
        aboutClientBody={data.aboutClientBody}
        aboutBackgroundImage={data.aboutBackgroundImage}
        aboutBackgroundMobile={data.aboutBackgroundMobile}
        clientLogo={data.clientLogo}
        challengeHeading={data.challengeHeading}
        challengeItems={data.challengeItems}
      />
      <AssessmentSection
        assessmentHeading={data.assessmentHeading}
        assessmentBody={data.assessmentBody}
        assessmentBackground={data.assessmentBackground}
        assessmentBackgroundMobile={data.assessmentBackgroundMobile}
      />
      <IntegrationStickySection
        integrationHeading={data.integrationHeading}
        integrationItems={data.integrationItems}
      />
    </article>
  )
}
