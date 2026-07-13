"use client"

import { exploreProductCards, exploreProductsHeader, exploreTabButtons } from "../content"
import { ButtonDotBlock, PlayVideoIcon } from "../icons"
import { wf } from "../wf"

/**
 * #explore-products — custom tab/accordion section with dark/light BG toggle.
 * The tab switching and GSAP card animations are driven by the reference engine's
 * inline script (captured in aiHomeRuntime). Structure and attribute hooks
 * (custom-tab-button[href], custom-tab-content[id], data-anim) match exactly.
 */
export function ExploreProductsSection() {
  const CDN = "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b"

  return (
    <section
      id="explore-products"
      {...wf({ "data-w-id": "f4a1438d-8f0c-2bb0-edf3-a115f542073e" })}
      className="section background-color-sky relative"
      style={{ opacity: 0 }}
    >
      {/* Dark background layer (toggled via .dark-mode class by runtime) */}
      <div className="explore-products-bg-dark">
        <img
          src={`${CDN}/6a0722a3a8cdc722bcdae311_7853f8df3a89d3c9d0e947e01a5fec2c_platform-v2-tabs-tr-bg.webp`}
          loading="lazy"
          alt=""
          className="platform-v2-tabs-tr-bg"
        />
        <img
          src={`${CDN}/6a07266c6de5192ce7dd7235_platform-v2-tabs-bl-bg.webp`}
          loading="lazy"
          alt=""
          className="platform-v2-tabs-bl-bg"
        />
      </div>

      {/* Light background layer */}
      <div className="explore-products-bg-light out-top">
        <img
          sizes="(max-width: 4320px) 100vw, 4320px"
          srcSet={[
            `${CDN}/6984d216ea44c496001b166b_Tabs-Section-BG-p-500.webp 500w`,
            `${CDN}/6984d216ea44c496001b166b_Tabs-Section-BG-p-800.webp 800w`,
            `${CDN}/6984d216ea44c496001b166b_Tabs-Section-BG-p-1080.webp 1080w`,
            `${CDN}/6984d216ea44c496001b166b_Tabs-Section-BG-p-1600.webp 1600w`,
            `${CDN}/6984d216ea44c496001b166b_Tabs-Section-BG.webp 4320w`,
          ].join(", ")}
          alt=""
          src={`${CDN}/6984d216ea44c496001b166b_Tabs-Section-BG.webp`}
          loading="lazy"
          className="explore-products-bg-light-img"
        />
      </div>

      <div className="padding-global">
        <div className="container-large">
          <div className="content">
            <div className="content-head width-85">
              <h2 className="heading-style-h4">{exploreProductsHeader.heading}</h2>
            </div>

            <div id="products-tabs" className="custom-tabs for-home">
              {/* Tab menu */}
              <div className="custom-tab-menu">
                <div className="explore-tabs-text">
                  Use tabs to explore more{" "}
                  <div className="side-arrows">
                    <span className="side-arrow" />
                    <span className="side-arrow" />
                  </div>
                </div>
                <div className="custom-tab-buttons">
                  {exploreTabButtons.map((btn, i) => (
                    <a
                      key={btn.href}
                      href={btn.href}
                      className={`custom-tab-button w-inline-block${i === 0 ? " is-active" : ""}`}
                    >
                      {"isNew" in btn && btn.isNew ? (
                        <div className="badge-heading">
                          <div>{btn.label}</div>
                          <div className="k2-badge for-tab">
                            <div className="badge-text for-tab">NEW</div>
                          </div>
                        </div>
                      ) : (
                        <div>{btn.label}</div>
                      )}
                      <div className="custom-tab-button-dot" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Tab pane — Pre-built Applications */}
              <div className="custom-tabs-pane">
                <div
                  id="Pre-built-Applications"
                  {...wf({ "data-anim": "", "transition-delay": "2" })}
                  className="custom-tab-content active"
                >
                  <div className="custom-tab-content-head">
                    <h3 id="ai-solutions-home" className="heading-text">
                      Use purpose-built agentic AI applications
                    </h3>
                    <p className="text-body-regular-medium">
                      We solve the most urgent industry and enterprise challenges with
                      regulation-approved applications.
                    </p>
                  </div>

                  <div className="service-cards-list">
                    <div className="service-cards-grid">
                      {exploreProductCards.slice(0, 2).map((card) => (
                        <ServiceCard key={card.id} card={card} />
                      ))}
                    </div>
                    <div className="service-cards-grid">
                      {exploreProductCards.slice(2, 4).map((card) => (
                        <ServiceCard key={card.id} card={card} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Application Accelerators — placeholder pane (content TBD) */}
                <div
                  id="Application-Accelerators"
                  {...wf({ "data-anim": "", "transition-delay": "2" })}
                  className="custom-tab-content"
                >
                  <div className="custom-tab-content-head">
                    <h3 className="heading-text">Accelerate delivery with pre-wired connectors</h3>
                    <p className="text-body-regular-medium">
                      Drop-in integrations for the enterprise systems your agents need to act.
                    </p>
                  </div>
                </div>

                {/* Tailored Applications */}
                <div
                  id="Tailored-Applications"
                  {...wf({ "data-anim": "", "transition-delay": "2" })}
                  className="custom-tab-content"
                >
                  <div className="custom-tab-content-head">
                    <h3 className="heading-text">Build custom agents for your exact workflows</h3>
                    <p className="text-body-regular-medium">
                      When your processes are proprietary, your agents should be too.
                    </p>
                  </div>
                </div>

                {/* Artemis */}
                <div
                  id="Artemis"
                  {...wf({ "data-anim": "", "transition-delay": "2" })}
                  className="custom-tab-content"
                >
                  <div className="custom-tab-content-head">
                    <h3 className="heading-text">
                      Agent Platform <span className="artemis-green-2">{"{"}</span> Artemis{" "}
                      <span className="artemis-green-2">{"}"}</span>
                    </h3>
                    <p className="text-body-regular-medium">
                      The AI-programmable foundation for building, scaling, and optimizing AI
                      agents that work in production.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type Card = (typeof exploreProductCards)[number]

function ServiceCard({ card }: { card: Card }) {
  return (
    <div className="service-card is-verti bg-brand-linear">
      <div className="service-card-text-head for-verti height-auto">
        <div className="text-body-large-medium">
          AI for <span className="text-color-blue">{card.industry}</span>
        </div>
        <p className="text-body-regular-normal">{card.desc}</p>
        <div className="home-ctas">
          <a
            {...wf({
              "is-hyperlink": "",
              "is-small": "",
              "is-white": "",
              "is-ghost": "",
              "is-light-theme": "",
              "is-text-link": "",
              "align-stretch": "0",
            })}
            className="button w-inline-block"
            href={card.learnHref}
            aria-label={`Learn more about AI for ${card.industry}`}
          >
            <div className="text-style-1line">learn more</div>
            <ButtonDotBlock />
            <PlayVideoIcon />
          </a>
          {card.guideHref && card.guideLabel && (
            <a
              {...wf({
                "is-small": "",
                "is-white": "",
                "is-ghost": "1",
                "is-light-theme": "",
                "is-text-link": "",
              })}
              className="button hover-img-button w-inline-block"
              href={card.guideHref}
            >
              <div className="hover-img-btn-text text-style-1line">{card.guideLabel}</div>
            </a>
          )}
        </div>
      </div>
      <div className="service-card-img-block for-verti">
        <img
          src={card.img}
          loading="lazy"
          sizes="(max-width: 642px) 100vw, 642px"
          srcSet={`${card.img500} 500w, ${card.img} 642w`}
          alt=""
          className="fit-contain"
        />
      </div>
    </div>
  )
}
