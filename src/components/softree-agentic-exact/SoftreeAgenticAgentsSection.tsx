"use client"

import { useState, type CSSProperties } from "react"
import { agentsContent } from "./softreeAgenticContent"

type StyleVars = CSSProperties & Record<`--${string}`, string | number>

const tabAssets = [
  {
    background:
      "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0d740ea150c2eed21ad614_agents-1.webp",
    object:
      "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0d74c8ccd1edf661f5e0b7_agents-object-1.webp",
    objectVariant: "agent-1",
    objectClass: "w-variant-0d4b44dd-bdd2-5fff-bf07-25f61f56446c",
  },
  {
    background:
      "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0db21491108b8576c9ab90_agents-bg-2.webp",
    object:
      "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0db2136543611bb983dbb6_agents-object-2.webp",
    objectVariant: "agent-2",
    objectClass: "w-variant-5d8a354a-7291-b6f3-e48b-9fc545d53e94",
  },
] as const

const tabs = agentsContent.tabs.map((tab, index) => ({
  id: `tabs-2-tab-${index + 1}`,
  panelId: `tabs-2-tab-${index + 1}-panel`,
  label: tab.label,
  ...tabAssets[index],
  lines: [...tab.lines],
  body: (
    <>
      {"{ "}
      <strong>Softree</strong>
      {" }"} {tab.body}
    </>
  ),
  ctaLabel: tab.ctaLabel,
  ctaHref: tab.ctaHref,
}))

function DotArrowIcon() {
  const dots = [
    [0.795, 9.701, 0],
    [4.465, 9.701, 1],
    [8.135, 9.701, 2],
    [11.805, 9.701, 3],
    [15.475, 9.701, 4],
    [12.431, 17.861, 3],
    [15.005, 15.246, 4],
    [17.58, 12.63, 5],
    [20.155, 10.015, 6],
    [18.199, 7.4, 5],
    [15.624, 4.784, 4],
    [13.05, 2.169, 3],
  ]

  return (
    <div data-wf--icon---arrow--variant="base" className="k2-icon-arrow w-embed">
      <svg viewBox="0 0 22 19" fill="currentColor">
        {dots.map(([cx, cy, index]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="0.76"
            style={{ "--i": index } as StyleVars}
          />
        ))}
      </svg>
    </div>
  )
}

function AgentsPanel({
  tab,
  active,
}: {
  tab: (typeof tabs)[number]
  active: boolean
}) {
  return (
    <div
      className={`k2-tabs-panel k2-tabs-panel-agents${active ? " on" : ""}`}
      id={tab.panelId}
      role="tabpanel"
      aria-labelledby={tab.id}
      inert={active ? undefined : true}
    >
      <div className="k2-bg">
        <div
          data-wf--image--variant="background"
          className="k2-img-wrapper w-variant-ceaf896a-18cf-914c-cbb4-88ae1c1e41ba"
        >
          <img decoding="async" src={tab.background} loading="lazy" alt="" className="k2-img" />
        </div>
      </div>

      <div data-stagger="200" className="k2-agents-panel">
        <div className="k2-agents-header">
          <div
            data-trim=""
            data-mw="100"
            data-op="100"
            data-color="green-dark"
            data-split=""
            data-wf--heading--variant="display-3"
            className="k2-heading w-variant-bd560089-2f5c-eb2a-3547-cac79c99297a w-richtext"
          >
            <h2>
              {tab.lines.map((line, index) => (
                <span
                  key={line}
                  className="line"
                  style={
                    {
                      display: "block",
                      textAlign: "start",
                      width: "100%",
                      "--i": index,
                    } as StyleVars
                  }
                >
                  {line}
                </span>
              ))}
            </h2>
          </div>
        </div>

        <div
          data-stagger="200/200"
          className="k2-agents-content"
          style={{ transitionDelay: "200ms", animationDelay: "200ms" }}
        >
          <div
            data-op="70"
            data-mw="100"
            data-wf--paragraph--variant="base"
            className="k2-text w-richtext"
            style={{ transitionDelay: "200ms", animationDelay: "200ms" }}
          >
            <p>{tab.body}</p>
          </div>
          <div
            data-wf--cta--variant="black"
            className="k2-cta w-variant-cf183fa1-cc13-17cc-02f3-4cd31a749120"
            style={{ transitionDelay: "400ms", animationDelay: "400ms" }}
          >
            <div className="k2-clickable">
              <a aria-label={tab.ctaLabel} href={tab.ctaHref} className="k2-action w-inline-block" />
            </div>
            <div aria-hidden="true" className="k2-cta-text">
              {tab.ctaLabel}
            </div>
            <div aria-hidden="true" className="k2-cta-icon w-variant-cf183fa1-cc13-17cc-02f3-4cd31a749120">
              <DotArrowIcon />
            </div>
          </div>
        </div>

        <div
          data-wf--image--variant={tab.objectVariant}
          className={`k2-img-wrapper ${tab.objectClass}`}
          style={{ transitionDelay: "400ms", animationDelay: "400ms" }}
        >
          <img decoding="async" src={tab.object} loading="lazy" alt="" className="k2-img" />
        </div>
      </div>
    </div>
  )
}

export function SoftreeAgenticAgentsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="ai-agents" className="k2-section k2-section-agents">
      <div className="k2-container k2-container-agents">
        <div data-scroll="20vh" className="k2-tabs" data-k2-init="true">
          <div className="k2-tabs-menu" role="tablist">
            {tabs.map((tab, index) => {
              const active = index === activeIndex

              return (
                <button
                  key={tab.id}
                  data-wf--tabs---button--variant="base"
                  type="button"
                  className={`k2-tabs-btn${active ? " on" : ""}`}
                  id={tab.id}
                  role="tab"
                  aria-controls={tab.panelId}
                  aria-selected={active}
                  tabIndex={active ? 0 : -1}
                  style={{ "--p": 0 } as StyleVars}
                  onClick={() => setActiveIndex(index)}
                >
                  <div data-scramble="">{tab.label}</div>
                </button>
              )
            })}
          </div>

          <div className="k2-tabs-panels k2-tabs-panels-agents">
            {tabs.map((tab, index) => (
              <AgentsPanel key={tab.id} tab={tab} active={index === activeIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
