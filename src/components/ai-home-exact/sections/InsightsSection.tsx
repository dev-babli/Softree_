"use client"

import { insightsPosts, strategicPartners } from "../content"
import { ButtonDotBlock, PlayVideoIcon } from "../icons"
import { wf } from "../wf"

/**
 * Insights section — two sub-sections:
 *   1. Strategic partners (Microsoft + AWS) — 2-column image cards
 *   2. AI Insights blog grid — featured hero + 4 latest posts
 */
export function InsightsSection() {
  const featuredPost = insightsPosts.find((p) => p.featured)
  const latestPosts = insightsPosts.filter((p) => !p.featured)

  return (
    <>
      {/* Strategic Partners */}
      <section className="section background-color-sky">
        <div className="padding-global">
          <div className="container-large">
            <div className="flex-verti max-width mb-48">
              <h3>Strategic partners: Microsoft and AWS</h3>
              <p className="text-body-medium">
                We work with the world's largest platforms. Check your provider for more information
                or start building via their marketplaces.
              </p>
            </div>
            <div className="grid _2-column">
              {strategicPartners.map((partner, i) => (
                <div key={i} className="image-card">
                  <div className="image-card-image c2">
                    <img src={partner.img} loading="lazy" alt="" />
                  </div>
                  <div className="image-card-text">
                    <p className="text-color-black text-weight-normal">{partner.body}</p>
                    <div className="button-group">
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
                        href={partner.ctaPrimary.href}
                        aria-label={partner.ctaPrimary.label}
                      >
                        <div className="text-style-1line">{partner.ctaPrimary.label}</div>
                        <ButtonDotBlock />
                        <PlayVideoIcon />
                      </a>
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
                        href={partner.ctaSecondary.href}
                        aria-label={partner.ctaSecondary.label}
                      >
                        <div className="text-style-1line">{partner.ctaSecondary.label}</div>
                        <ButtonDotBlock />
                        <PlayVideoIcon />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Insights */}
      <section className="section background-color-sky">
        <div className="padding-global">
          <div className="container-large">
            {/* Header row */}
            <div className="flex-horizontal space-between mb-48">
              <h3>AI Insights</h3>
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
                href="/ai-insights"
                aria-label="Discover more"
              >
                <div className="text-style-1line">View all</div>
                <ButtonDotBlock />
                <PlayVideoIcon />
              </a>
            </div>

            {/* Blog grid */}
            <div className="blogs_hero-section for-homepage">
              {/* Featured post */}
              {featuredPost && (
                <div className="blogs_hero-section_block hide-mobile-landscape">
                  <div className="item-stretch is-fill">
                    <a href={featuredPost.href} className="blog-item height-100 w-inline-block">
                      <div className="blog-img-wrap for-homepage">
                        <img src={featuredPost.img} loading="lazy" alt="" sizes="100vw" />
                      </div>
                      <div className="blog-featured-item_text">
                        <div className="blog-meta">
                          <div>{featuredPost.date}</div>
                          <div className="dot dark" />
                          {featuredPost.readTime && (
                            <div className="text-color-charcoal2">{featuredPost.readTime}</div>
                          )}
                        </div>
                        <div className="blog-info">
                          <h3 className="heading-style-h5">{featuredPost.title}</h3>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              )}

              {/* Latest posts sidebar */}
              <aside className="blogs_hero-section_block for-latest for-homepage">
                <div className="item-stretch">
                  <div className="latest-blogs-list">
                    {latestPosts.map((post) => (
                      <a key={post.href} href={post.href} className="blog-item is-latest w-inline-block">
                        <div className="blog-img-wrap for-latest">
                          <img src={post.img} loading="lazy" alt="" sizes="100vw" />
                        </div>
                        <div className="blog-info">
                          <h3 className="text-size-medium">{post.title}</h3>
                          <div className="blog-meta">
                            <div>{post.date}</div>
                            <div className="dot dark" />
                            {post.readTime && (
                              <div className="text-color-charcoal2">{post.readTime}</div>
                            )}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
