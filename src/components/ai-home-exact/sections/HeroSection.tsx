"use client"

import { heroContent, heroProductCards } from "../content"
import { ButtonDotBlock, CardArrowIcon, PlayVideoIcon, RoundArrowBtn } from "../icons"
import { RiveCanvas } from "../RiveCanvas"
import { wf } from "../wf"

export function HeroSection() {
  return (
    <section className="section-home-hero _100vh pb-0">
      <div className="padding-global">
        <div className="container-large">
          <div className="home-hero-content">
            <div className="home-hero-content-text">
              <h1 {...wf({ "transition-delay": "2", "data-anim": "" })} className="home-main-heading">
                {heroContent.heading}
              </h1>
              <p {...wf({ "transition-delay": "3", "data-anim": "" })} className="heading-style-h5">
                {heroContent.sub[0]}
                <br />
                {heroContent.sub[1]}
              </p>
            </div>
            <div className="button-group home-hero-btn center-on-mobile">
              <a
                {...wf({
                  "anim-element": "",
                  "is-hyperlink": "",
                  "is-small": "",
                  "is-white": "",
                  "is-ghost": "",
                  "is-light-theme": "",
                  "is-text-link": "",
                  "data-anim": "",
                })}
                className="button w-inline-block"
                href={heroContent.ctaPrimary.href}
              >
                <div className="text-style-1line">{heroContent.ctaPrimary.label}</div>
                <ButtonDotBlock />
                <PlayVideoIcon />
              </a>
              <a
                {...wf({
                  "anim-element": "",
                  "is-hyperlink": "",
                  "is-small": "",
                  "is-white": "",
                  "is-ghost": "1",
                  "is-light-theme": "",
                  "is-text-link": "",
                  "data-anim": "",
                })}
                className="button w-inline-block"
                href={heroContent.ctaSecondary.href}
              >
                <div className="text-style-1line">{heroContent.ctaSecondary.label}</div>
                <ButtonDotBlock />
                <PlayVideoIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <a
        {...wf({ "transition-delay": "2", "data-anim": "" })}
        href={heroContent.meetPanel.href}
        className="home-hero-meet-box w-inline-block"
      >
        <div className="featured-content-block pos-relative-block">
          <div className="artemis-panel-description">
            <span className="announcment-span">{heroContent.meetPanel.eyebrow}</span>
          </div>
          <div className="badge-heading">
            <h2 className="artemis-panel-title">
              Meet <span className="artemis-green-2">{"{"}</span>{" "}
              <span className="text-style-italic bold-text">{heroContent.meetPanel.title}</span>{" "}
              <span className="artemis-green-2">{"}"}</span>
            </h2>
            <div className="k2-badge">
              <div className="badge-text">{heroContent.meetPanel.badge}</div>
            </div>
          </div>
          <div className="artemis-panel-description">{heroContent.meetPanel.description}</div>
        </div>
        <RoundArrowBtn />
      </a>

      <div className="grid for-home-hero">
        {heroProductCards.map((card) => (
          <a
            key={card.href}
            {...wf({ "transition-delay": card.delay, "data-anim": "" })}
            href={card.href}
            className="products-card w-inline-block"
          >
            <div className="products-card-head">
              <div className="products-card-heading">
                <h2 className="heading-style-h6">{card.title}</h2>
                <CardArrowIcon />
              </div>
              <p className="text-color-black text-weight-normal">{card.body}</p>
            </div>
            <div className="products-card-img">
              <RiveCanvas src={card.rive} className="featured-block-img v4 height-100" />
            </div>
            <div className="bg-blur" />
          </a>
        ))}
      </div>

      <div
        {...wf({
          "data-poster-url":
            "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b%2F68e6057dd670c86ab26c8544_Kore%20Hero%20Banner%20Ripple%20BG-poster-00001.jpg",
          "data-video-urls":
            "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b%2F68e6057dd670c86ab26c8544_Kore%20Hero%20Banner%20Ripple%20BG-transcode.mp4,https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b%2F68e6057dd670c86ab26c8544_Kore%20Hero%20Banner%20Ripple%20BG-transcode.webm",
          "data-autoplay": "true",
          "data-loop": "false",
          "data-wf-ignore": "true",
        })}
        className="home-hero-video w-background-video w-background-video-atom"
      >
        <video
          {...wf({ "data-wf-ignore": "true", "data-object-fit": "cover" })}
          autoPlay
          muted
          playsInline
          style={{
            backgroundImage:
              'url("https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b%2F68e6057dd670c86ab26c8544_Kore%20Hero%20Banner%20Ripple%20BG-poster-00001.jpg")',
          }}
        >
          <source
            {...wf({ "data-wf-ignore": "true" })}
            src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b%2F68e6057dd670c86ab26c8544_Kore%20Hero%20Banner%20Ripple%20BG-transcode.mp4"
          />
          <source
            {...wf({ "data-wf-ignore": "true" })}
            src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b%2F68e6057dd670c86ab26c8544_Kore%20Hero%20Banner%20Ripple%20BG-transcode.webm"
          />
        </video>
      </div>

      <div {...wf({ "data-anim": "" })} className="w-embed">
        <div className="scroll-side" id="scrollSideTrigger">
          <div className="scroll-side-text">Explore our technology</div>
          <div className="side-arrows">
            <span className="side-arrow" />
            <span className="side-arrow" />
          </div>
        </div>
      </div>
    </section>
  )
}
