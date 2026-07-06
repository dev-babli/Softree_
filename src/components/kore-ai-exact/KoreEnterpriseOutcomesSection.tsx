"use client"

import { useEffect, useRef, type CSSProperties } from "react"

type StyleVars = CSSProperties & Record<`--${string}`, string | number>

const cometIcon =
  "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a05fa08754882ab91c980e6_comet.svg"

const outcomeCards = [
  {
    icon: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0c0e4de7656dee6d330b2c_value.svg",
    title: "{ Outcomes in days }",
    body: "{ Artemis } handles the infrastructure; your team starts at the business logic. Team focuses on outcomes. Agents ship faster.",
    metric: "5x",
    label: "faster time to value",
  },
  {
    icon: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0c0e51ce7260a2cb825b5e_scale.svg",
    title: "{ Predictability at Scale }",
    body: "Every agent is clearly defined, tested, and validated before deployment, so what works in design does not break in production.",
    metric: "No",
    label: "surprises in production",
  },
  {
    icon: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a06dbc247ccaaf54ed093f1_security.svg",
    title: "{ Security + Governance }",
    body: "Every action stays within approved policies and boundaries, with full visibility into what happened and why.",
    metric: "Zero",
    label: "unauthorized agent actions",
  },
]

function SquareImage({ src, style }: { src: string; style?: StyleVars }) {
  return (
    <div
      data-wf--image--variant="square-1-1"
      style={style}
      className="k2-img-wrapper w-variant-3228b899-747d-f671-0b6f-59c395a6b5ad"
    >
      <img decoding="async" src={src} loading="lazy" alt="" className="k2-img" />
    </div>
  )
}

function OutcomeCard({
  card,
  index,
}: {
  card: (typeof outcomeCards)[number]
  index: number
}) {
  return (
    <div className="k2-card-item" style={{ "--i": index } as StyleVars}>
      <div className="k2-card">
        <div className="k2-card-media">
          <SquareImage src={card.icon} />
        </div>
        <div className="k2-card-copy">
          <div
            data-op="100"
            data-mw="100"
            data-wf--heading--variant="h6"
            className="k2-heading w-variant-134f9f93-4936-796e-a3f9-5b6e699b3550 w-richtext"
          >
            <h3>{card.title}</h3>
          </div>
          <div
            data-op="50"
            data-mw="100"
            data-wf--paragraph--variant="small"
            className="k2-text w-variant-6cdf3ce3-8eae-2514-b634-a822397495ea w-richtext"
          >
            <p>{card.body}</p>
          </div>
        </div>
      </div>

      <div className="k2-card-number">
        <div
          data-op="100"
          data-font-weight="500"
          data-mw="100"
          data-wf--paragraph--variant="display-2"
          className="k2-text w-variant-03437080-f831-9f31-89fa-6283b7059027 w-richtext"
        >
          <p>{card.metric}</p>
        </div>
        <div
          data-op="100"
          data-font-weight="500"
          data-mw="100"
          data-wf--paragraph--variant="h6"
          className="k2-text w-variant-bbfef6a7-aa6f-3ceb-4ae0-5819087e510e w-richtext"
        >
          <p>{card.label}</p>
        </div>
      </div>
    </div>
  )
}

export function KoreEnterpriseOutcomesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const wrapper = wrapperRef.current
    const group = cardsRef.current
    if (!section || !wrapper || !group) return

    let frame = 0
    let viewportHeight = window.innerHeight

    const px = (value: number) => `${value.toFixed(2)}px`

    const getOffset = (value: string | undefined) => {
      if (!value) return 0
      const text = value.trim().toLowerCase()
      const amount = Number.parseFloat(text)
      if (!Number.isFinite(amount)) return 0
      if (text.endsWith("vh")) return (amount / 100) * viewportHeight
      if (text.endsWith("px")) return amount
      return 0
    }

    const update = () => {
      frame = 0

      const cards = Array.from(group.querySelectorAll<HTMLElement>(".k2-card-item"))
      const firstCard = cards[0]
      section.style.setProperty("--n", String(cards.length || 1))

      if (firstCard) {
        const box = firstCard.querySelector<HTMLElement>(".k2-card")
        const copy = firstCard.querySelector<HTMLElement>(".k2-card-copy")
        section.style.setProperty("--h", px(firstCard.getBoundingClientRect().height))

        if (box && copy) {
          const copyTop = copy.getBoundingClientRect().top - box.getBoundingClientRect().top
          section.style.setProperty("--copy-top", px(copyTop))
        }
      }

      cards.forEach((card, index) => {
        card.style.setProperty("--i", String(index))
      })

      const rect = wrapper.getBoundingClientRect()
      const height = rect.height || 1
      const multiplier = Number.parseFloat(wrapper.dataset.scrollProgress || "1") || 1
      const offset = viewportHeight * 0.25 * multiplier
      const end = getOffset(wrapper.dataset.scrollEnd)
      const targetHeight = Math.max(1, height - end)
      const progress = Math.min(1, Math.max(0, (viewportHeight - rect.top - offset) / targetHeight))

      wrapper.style.setProperty("--p", progress.toFixed(4))
    }

    const request = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    const onResize = () => {
      viewportHeight = window.innerHeight
      request()
    }

    const resizeObserver = new ResizeObserver(request)
    resizeObserver.observe(group)
    group.querySelectorAll<HTMLElement>(".k2-card-item, .k2-card, .k2-card-copy").forEach((node) => {
      resizeObserver.observe(node)
    })

    request()
    window.addEventListener("scroll", request, { passive: true })
    window.addEventListener("resize", onResize, { passive: true })
    window.addEventListener("load", request, { once: true })

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("scroll", request)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("load", request)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="enterprise-ai-outcomes"
      className="k2-section k2-section-cards"
      style={{ "--n": 3 } as StyleVars}
    >
      <div
        ref={wrapperRef}
        data-scroll-end="80vh"
        data-scroll-progress=""
        className="k2-cards-wrapper"
        style={{ "--p": 0 } as StyleVars}
      >
        <div className="k2-cards-sticky">
          <div data-progress="" className="k2-container k2-container-cards-header">
            <div className="k2-cards-header">
              <SquareImage src={cometIcon} style={{ maxWidth: "6.25rem" } as StyleVars} />
              <div
                data-scroll=""
                data-mw="100"
                data-op="100"
                data-split=""
                data-wf--heading--variant="h2"
                className="k2-heading w-variant-48067f6b-129e-96ba-1732-913f89e63e21 w-richtext on"
              >
                <h2>
                  <span
                    className="line"
                    style={
                      { display: "block", textAlign: "start", width: "100%", "--i": 0 } as StyleVars
                    }
                  >
                    What {"{"}{" "}
                    <strong style={{ display: "inline-block", position: "relative" }}>Artemis</strong>{" "}
                    {"}"}
                  </span>
                  <span
                    className="line"
                    style={
                      { display: "block", textAlign: "start", width: "100%", "--i": 1 } as StyleVars
                    }
                  >
                    <em style={{ display: "inline-block", position: "relative" }}>changes</em> for enterprise AI
                  </span>
                </h2>
              </div>
            </div>
          </div>

          <div className="k2-container k2-container-cards">
            <div ref={cardsRef} className="k2-cards">
              {outcomeCards.map((card, index) => (
                <OutcomeCard key={card.title} card={card} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="k2-cards-footer">
        <div
          data-scroll="20vh"
          data-mw="100"
          data-op="100"
          data-split=""
          data-wf--heading--variant="display-1"
          className="k2-heading w-variant-b8037af9-0c31-33c6-fdfd-3ef99113e090 w-richtext on"
        >
          <p>
            <span
              className="line"
              style={{ display: "block", textAlign: "start", width: "100%", "--i": 0 } as StyleVars}
            >
              <sub style={{ display: "inline-block", position: "relative" }}>{"{"}</sub>
              Artemis
              <sub style={{ display: "inline-block", position: "relative" }}>{"}"}</sub>
            </span>
            <span
              className="line"
              style={{ display: "block", textAlign: "start", width: "100%", "--i": 1 } as StyleVars}
            >
              delivers
            </span>
            <span
              className="line"
              style={{ display: "block", textAlign: "start", width: "100%", "--i": 2 } as StyleVars}
            >
              <em style={{ display: "inline-block", position: "relative" }}>certainty</em>
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
