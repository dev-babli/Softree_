"use client"

import { useCallback, useEffect, useState } from "react"
import "./framer-ssr.css"
import "./menu-panel.css"
import "./client-exact-overrides.css"
import { HeroSection } from "./sections/HeroSection"
import { LogosSection } from "./sections/LogosSection"
import { AboutSection } from "./sections/AboutSection"
import { PortfolioSection } from "./sections/PortfolioSection"
import { ServicesSection } from "./sections/ServicesSection"
import { ProcessSection } from "./sections/ProcessSection"
import { TestimonialsSection } from "./sections/TestimonialsSection"
import { StatsSection } from "./sections/StatsSection"
import { CasyStudySection } from "./sections/CasyStudySection"
import { PricingSection } from "./sections/PricingSection"
import { FaqSection } from "./sections/FaqSection"
import { BlogSection } from "./sections/BlogSection"
import { FooterSection } from "./sections/FooterSection"
import { TopBarSection } from "./sections/TopBarSection"
import { FramerIconSprite } from "./FramerIconSprite"
import { MenuOverlay } from "./MenuOverlay"
import { bootFramerAppear } from "./bootFramerAppear"
import { bootFramerBreakpoints } from "./bootFramerBreakpoints"
import { bootTextReveals } from "./bootTextReveals"
import { bootFramerAccordion } from "./bootFramerAccordion"
import { bootImageParallax } from "./bootImageParallax"

/**
 * Exact visual clone of Softree_/client.html (Framer Hanza).
 * Layout shell mirrors live .framer-3L5GK (topbar + page + footer + menu).
 */
export default function ClientExactPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const root = document.querySelector("[data-framer-root]")
    const stopBp = bootFramerBreakpoints(root)
    const stopAppear = bootFramerAppear()
    const stopReveal = bootTextReveals()
    const stopAccordion = bootFramerAccordion()
    const stopParallax = bootImageParallax()
    document.querySelector(".client-exact-framer-shell")?.classList.add("cx-ready")
    return () => {
      stopBp()
      stopAppear()
      stopReveal()
      stopAccordion()
      stopParallax()
    }
  }, [])

  return (
    <div className={`client-exact-framer-shell${menuOpen ? " cx-menu-open" : ""}`}>
      <FramerIconSprite />
      <div id="main" className="client-exact-main">
        <div className="framer-3L5GK framer-7n6fwg">
          <TopBarSection menuOpen={menuOpen} onMenuToggle={toggleMenu} />
          <MenuOverlay open={menuOpen} onClose={closeMenu} />
          <div
            data-framer-root=""
            className="framer-7JiRT framer-J0UB8 framer-0fB9Y framer-ic7tY framer-BfFRM framer-Y9G5g framer-7Z0zH framer-pL0Rf framer-OwmSi framer-PXhJw framer-72rtr7"
            style={{ minHeight: "100vh", width: "100%" }}
          >
            <HeroSection />
            <AboutSection />
            <LogosSection />
            <PortfolioSection />
            <ServicesSection />
            <ProcessSection />
            <TestimonialsSection />
            <StatsSection />
            <CasyStudySection />
            <PricingSection />
            <FaqSection />
            <BlogSection />
          </div>
          <div className="framer-97pctu-container" id="home-contact">
            <FooterSection />
          </div>
        </div>
      </div>
    </div>
  )
}
