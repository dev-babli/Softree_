"use client"

import { industries, industriesHeader } from "../content"
import { ButtonDotBlock, PlayVideoIcon, SliderArrowIcon } from "../icons"
import { wf } from "../wf"

/**
 * #content — industries tab + Swiper slider. Structure and animation hooks
 * (`tabs-btns-slider` / `tab-btn-slider` / `swiper-slider` / `.swiper`) match
 * the reference so the engine's wireSlider + handleSwiper drive it. Client-logo
 * marquees are replaced with honest Softree capability chips.
 */
export function IndustriesSection() {
  return (
    <section id="content" className="section background-color-white">
      <div className="padding-global">
        <div className="container-large">
          <div className="connect-content">
            <div className="connect-content-column for-hero-intro">
              <div className="connect-content-head z-index-2">
                <h2 className="heading-style-h4">{industriesHeader.heading}</h2>
                <div className="text-color-charcoal2 w-richtext" />
                <div className="text-body-regular-medium text-color-charcoal2">
                  <div className="text-body-regular-medium">{industriesHeader.sub}</div>
                </div>
              </div>
              <div className="connect-content-foot z-index-2">
                <p className="text-body-small-normal">{industriesHeader.foot}</p>
                <div className="buttons-dotted-block fill">
                  <a
                    {...wf({ "is-hyperlink": "", "is-small": "", "is-white": "", "is-ghost": "" })}
                    className="button w-inline-block"
                    href={industriesHeader.ctaPrimary.href}
                    aria-label={industriesHeader.ctaPrimary.label}
                  >
                    <div className="text-style-1line">{industriesHeader.ctaPrimary.label}</div>
                    <ButtonDotBlock />
                    <PlayVideoIcon />
                  </a>
                  <a
                    {...wf({ "is-hyperlink": "", "is-small": "", "is-white": "", "is-ghost": "1" })}
                    className="button w-inline-block"
                    href={industriesHeader.ctaSecondary.href}
                    aria-label={industriesHeader.ctaSecondary.label}
                  >
                    <div className="text-style-1line">{industriesHeader.ctaSecondary.label}</div>
                    <PlayVideoIcon />
                  </a>
                </div>
              </div>
              <div className="slider-fake-overflow" />
            </div>

            <div {...wf({ "tabs-btns-slider": "" })} className="tab-slider">
              <div role="tablist" className="tabs-menu v3">
                {industries.map((ind, i) => (
                  <div
                    key={ind.id}
                    id={`tab-${ind.id}`}
                    {...wf({ "tab-btn-slider": "" })}
                    role="tab"
                    aria-controls={`panel-${ind.id}`}
                    className={`tab-btn${i === 0 ? " active" : ""}`}
                    aria-selected={i === 0}
                  >
                    {ind.tab}
                  </div>
                ))}
              </div>

              <div {...wf({ "swiper-slider": "" })} className="swiper-outer">
                <div className="swiper">
                  <div className="swiper-wrapper">
                    {industries.map((ind) => (
                      <div key={ind.id} className="swiper-slide for-services" role="group">
                        <div
                          id={`panel-${ind.id}`}
                          role="tabpanel"
                          aria-labelledby={`tab-${ind.id}`}
                          className="connect-slide"
                        >
                          <img src={ind.bg} loading="lazy" alt="" className="bg" />
                          <div className="connect-slide-fg">
                            <div className="connect-slide-head">
                              <h3 className="heading-text home-carosel">{ind.heading}</h3>
                            </div>
                            <div className="connect-slide-foot">
                              <div className="text-body-tiny-medium">{ind.capLabel}</div>
                              <div className="connect-caps">
                                {ind.caps.map((cap) => (
                                  <span key={cap} className="connect-cap">
                                    {cap}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="slider-buttons is-absolute hide">
                  <div
                    {...wf({ "swiper-prev-btn": "" })}
                    className="slider-button custom"
                    role="button"
                    aria-label="Previous slide"
                  >
                    <SliderArrowIcon />
                  </div>
                  <div
                    {...wf({ "swiper-next-btn": "" })}
                    className="slider-button custom"
                    role="button"
                    aria-label="Next slide"
                  >
                    <SliderArrowIcon next />
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
