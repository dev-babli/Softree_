"use client"

import { analystReports, testimonials } from "../content"
import { ButtonDotBlock, PlayVideoIcon } from "../icons"
import { wf } from "../wf"

/**
 * Proof section — two sub-sections:
 *   1. Analyst recognition tabs (Forrester / Gartner / Everest / Cognitive Search)
 *   2. Testimonial Swiper carousel + "more customer stories" CTA
 *
 * The Webflow `w-tabs` system is wired by the reference Webflow runtime. We
 * preserve the exact attribute hooks (data-w-tab, w-tab-link, w-tab-pane) so
 * the runtime can initialise the tabs correctly.
 */
export function ProofSection() {
  return (
    <>
      {/* Analyst reports tabs */}
      <section className="section background-color-sky">
        <div className="padding-global">
          <div className="container-large">
            <div
              {...wf({
                "data-current": "Conversational AI Platforms",
                "data-easing": "ease",
                "data-duration-in": "300",
                "data-duration-out": "100",
              })}
              className="featured-tabs with-bg w-tabs"
            >
              {/* Tab menu */}
              <div className="tabs-menu v2 w-tab-menu" role="tablist">
                {analystReports.map((report, i) => (
                  <a
                    key={report.tab}
                    {...wf({ "data-w-tab": report.tab })}
                    className={`tab-btn w-inline-block w-tab-link${i === 0 ? " w--current" : ""}`}
                    id={`w-tabs-1-data-w-tab-${i}`}
                    href={`#w-tabs-1-data-w-pane-${i}`}
                    role="tab"
                    aria-controls={`w-tabs-1-data-w-pane-${i}`}
                    aria-selected={i === 0}
                    tabIndex={i === 0 ? undefined : -1}
                  >
                    <div>{report.tab}</div>
                  </a>
                ))}
              </div>

              {/* Tab panes */}
              <div className="w-tab-content">
                {analystReports.map((report, i) => (
                  <div
                    key={report.tab}
                    {...wf({ "data-w-tab": report.tab })}
                    className={`w-tab-pane${i === 0 ? " w--tab-active" : ""}`}
                    id={`w-tabs-1-data-w-pane-${i}`}
                    role="tabpanel"
                    aria-labelledby={`w-tabs-1-data-w-tab-${i}`}
                  >
                    <div className="featureed-tab-block">
                      <div className="featured-block-text for-tabs">
                        <div className="featured-block-text-head">
                          <h3 className="heading-text">
                            <a href="http://Kore.ai" target="_blank" rel="noreferrer">
                              Kore.ai
                            </a>{" "}
                            {report.heading}
                          </h3>
                          <p className="text-weight-normal">{report.body}</p>
                        </div>
                        <div className="grid-column-3 gap-24px _w-100">
                          <div className="buttons-dotted-block top-auto col-span-2">
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
                              href={report.ctaHref}
                              aria-label={report.ctaLabel}
                            >
                              <div className="text-style-1line">{report.ctaLabel}</div>
                              <PlayVideoIcon />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="featured-block-img-block for-tab">
                        <div className={`featured-block-img${report.imgClass ? " _1-1" : ""}`}>
                          <img
                            sizes="100vw"
                            srcSet={`${report.img500} 500w, ${report.img} 800w`}
                            alt=""
                            src={report.img}
                            loading="lazy"
                            className={report.imgClass || undefined}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section background-color-sky">
        <div className="padding-global">
          <div className="container-large">
            {/* Swiper carousel — engine wires it via [swiper-init] */}
            <div
              {...wf({ "swiper-init": "", "anim-element": "" })}
              className="swiper for-testimonials"
              style={{ opacity: 0, transform: "translate(0px, 0.75rem)" }}
            >
              <div className="swiper-wrapper">
                {testimonials.map((t, i) => (
                  <div
                    key={`${t.company}-${i}`}
                    className="swiper-slide per-view-3"
                    role="group"
                    aria-label={`${i + 1} / ${testimonials.length}`}
                    style={{ marginRight: 24 }}
                  >
                    <div className="testimonial-card">
                      <div className="heading-style-h5">{t.company}</div>
                      <div className="testimonial-card-body">
                        <p>"{t.quote}"</p>
                        <div className="testimonial-card-detail-wrap">
                          <div className="testimonial-card-detail">
                            <div>{t.name}</div>
                            <div className="text-color-charcoal2">{t.title}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation buttons */}
              <div
                {...wf({ "anim-element": "" })}
                className="slider-btns for-ai"
                style={{ opacity: 0, transform: "translate(0px, 0.75rem)" }}
              >
                <div
                  {...wf({ "swiper-prev-btn": "" })}
                  className="slider-btn swiper-button-disabled"
                  aria-disabled="true"
                  tabIndex={-1}
                  role="button"
                  aria-label="Previous slide"
                  style={{ pointerEvents: "none", opacity: 0.5 }}
                >
                  <div className="slider-btn-icon w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 13 12" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                      <path d="M9.59475 11.3606C9.21027 11.7204 8.61265 11.7204 8.22817 11.3606L3.28022 6.73015C2.85794 6.33497 2.85794 5.66503 3.28022 5.26985L8.22817 0.63944C8.61265 0.279636 9.21027 0.279636 9.59475 0.639439L9.71978 0.756448C10.1421 1.15163 10.1421 1.82156 9.71978 2.21674L6.4573 5.26985C6.03502 5.66503 6.03502 6.33497 6.4573 6.73015L9.71978 9.78326C10.1421 10.1784 10.1421 10.8484 9.71978 11.2436L9.59475 11.3606Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
                <div
                  {...wf({ "swiper-next-btn": "" })}
                  className="slider-btn"
                  aria-disabled="false"
                  tabIndex={0}
                  role="button"
                  aria-label="Next slide"
                >
                  <div className="slider-btn-icon w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 13 12" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                      <path d="M9.59475 11.3606C9.21027 11.7204 8.61265 11.7204 8.22817 11.3606L3.28022 6.73015C2.85794 6.33497 2.85794 5.66503 3.28022 5.26985L8.22817 0.63944C8.61265 0.279636 9.21027 0.279636 9.59475 0.639439L9.71978 0.756448C10.1421 1.15163 10.1421 1.82156 9.71978 2.21674L6.4573 5.26985C6.03502 5.66503 6.03502 6.33497 6.4573 6.73015L9.71978 9.78326C10.1421 10.1784 10.1421 10.8484 9.71978 11.2436L9.59475 11.3606Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="button-group">
              <a
                {...wf({
                  "is-hyperlink": "",
                  "is-small": "",
                  "is-white": "",
                  "is-ghost": "1",
                  "is-light-theme": "",
                  "is-text-link": "",
                  "align-stretch": "0",
                })}
                className="button w-inline-block"
                href="/customer-stories"
                aria-label="Discover more"
              >
                <div className="text-style-1line">more&nbsp;CUSTOMER stories</div>
                <ButtonDotBlock />
                <PlayVideoIcon />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
