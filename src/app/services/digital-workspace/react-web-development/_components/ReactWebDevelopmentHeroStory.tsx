import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

export function ReactWebDevelopmentHeroStory() {
  return (
    <section className="rw-hero" aria-labelledby="react-web-hero-title">
      <div className="rw-hero-pin">
        <div className="rw-hero-word" aria-hidden>
          REACT
        </div>

        <div className="rw-hero-layout">
          <div className="rw-hero-copy">
            <p className="rw-eyebrow">React web development services by Softree</p>
            <h1 id="react-web-hero-title">
              <span className="rw-title-chunk">React websites </span>
              <span className="rw-title-chunk">that sell, </span>
              <span className="rw-title-chunk">load fast, </span>
              <span className="rw-title-chunk">and scale.</span>
            </h1>
            <p>
              We design and build React and Next.js websites, landing pages, SaaS frontends,
              dashboards, and service experiences with UX, performance, SEO, and launch discipline
              in one team.
            </p>
            <div className="rw-actions">
              <Link className="rw-button rw-button-primary" href="/contact">
                Book a React build call <ArrowRight size={18} aria-hidden />
              </Link>
              <Link className="rw-button rw-button-secondary" href="#transformation">
                See the transformation <ArrowUpRight size={18} aria-hidden />
              </Link>
            </div>
          </div>

          <div className="rw-portal-wrap" aria-hidden>
            <div className="rw-portal-shell">
              <div className="rw-product-frame">
                <div className="rw-product-top">
                  <div className="rw-window-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span>softree/react-build</span>
                </div>
                <div className="rw-product-body">
                  <div className="rw-product-stack">
                    <span className="rw-product-line" />
                    <span className="rw-product-line" />
                    <span className="rw-product-line" />
                    <span className="rw-product-line" />
                  </div>
                  <div className="rw-product-preview">
                    <Image
                      src="/web-development-story/hero-platform.svg"
                      alt=""
                      width={720}
                      height={480}
                      priority
                    />
                  </div>
                </div>
              </div>
              <div className="rw-portal-detail">
                <strong>Strategy, design, React build, and launch checks.</strong>
                <span>One page system that can grow into campaigns, service pages, and app UI.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rw-hero-reveal">
          <p>
            The page opens like a product: clear promise, real interface language, measured motion,
            and a fast path to conversation.
          </p>
        </div>
      </div>
    </section>
  )
}
