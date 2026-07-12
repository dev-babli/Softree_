"use client"

import { LocalTime } from "../LocalTime"
import { assets, ctas, hero } from "../content"

/**
 * Fixed top bar: Menu/Close · brand · Local Time · Book Intro CTA
 */
export function TopBarSection({
  menuOpen = false,
  onMenuToggle,
}: {
  menuOpen?: boolean
  onMenuToggle?: () => void
}) {
  return (
    <div className="framer-1iup1yh-container cx-topbar">
      <header
        className="framer-repFf framer-0fB9Y framer-10e8bmy framer-v-fsgf00"
        data-framer-name="Inverse (XL)"
        style={{ width: "100%", opacity: "1" }}
      >
        <div className="framer-19ggs0t" data-framer-name="Column" style={{ opacity: "1" }}>
          <div className="framer-uzyigg-container" style={{ opacity: "1" }}>
            <div
              className="framer-qWjJt framer-u2zo18 framer-v-jerzy2"
              data-framer-name="Inverse (Left)"
              data-highlight="true"
              role="button"
              tabIndex={0}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{ opacity: "1" }}
              onClick={onMenuToggle}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onMenuToggle?.()
                }
              }}
            >
              <div
                className="framer-194ee6k"
                data-framer-name="Dots"
                style={{ transform: "none", opacity: "1" }}
              >
                <div className="framer-10zeqm5" data-framer-name="Grid" style={{ opacity: "1" }}>
                  <div
                    className="framer-596y9h"
                    data-framer-name="Vector"
                    style={{
                      backgroundColor:
                        "var(--token-19bcb141-744a-47e0-8efc-5c8873b4ccec, rgba(255, 255, 255, 0.2))",
                      opacity: "1",
                    }}
                  />
                  <div
                    className="framer-4q2yjn"
                    data-framer-name="Vector"
                    style={{
                      backgroundColor:
                        "var(--token-19bcb141-744a-47e0-8efc-5c8873b4ccec, rgba(255, 255, 255, 0.2))",
                      opacity: "1",
                    }}
                  />
                </div>
                <div className="framer-ybkbkn" data-framer-name="Grid" style={{ opacity: "1" }}>
                  <div
                    className="framer-9y9bpd"
                    data-framer-name="Vector"
                    style={{
                      backgroundColor:
                        "var(--token-19bcb141-744a-47e0-8efc-5c8873b4ccec, rgba(255, 255, 255, 0.2))",
                      opacity: "1",
                    }}
                  />
                  <div
                    className="framer-srure7"
                    data-framer-name="Vector"
                    style={{
                      backgroundColor:
                        "var(--token-19bcb141-744a-47e0-8efc-5c8873b4ccec, rgba(255, 255, 255, 0.2))",
                      opacity: "1",
                    }}
                  />
                </div>
              </div>
              <div
                className="framer-lu4qp3"
                data-framer-name="Text"
                data-framer-component-type="RichTextContainer"
                style={{
                  ["--extracted-r6o4lv" as string]:
                    "var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255))",
                  ["--framer-paragraph-spacing" as string]: "0px",
                  transform: "none",
                  opacity: "1",
                }}
              >
                <p
                  dir="auto"
                  className="framer-text"
                  style={{
                    ["--font-selector" as string]: "R0Y7WmFsYW5kbyBTYW5zLTUwMA==",
                    ["--framer-font-family" as string]:
                      '"Zalando Sans", "Zalando Sans Placeholder", sans-serif',
                    ["--framer-font-size" as string]: "14px",
                    ["--framer-font-weight" as string]: "500",
                    ["--framer-letter-spacing" as string]: "-0.5px",
                    ["--framer-line-height" as string]: "100%",
                    ["--framer-text-color" as string]:
                      "var(--extracted-r6o4lv, var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255)))",
                    ["--framer-text-transform" as string]: "uppercase",
                  }}
                >
                  Menu
                </p>
              </div>
            </div>
          </div>
          <div
            className="framer-1t9yc25"
            data-framer-name="Border"
            style={{
              backgroundColor:
                "var(--token-19bcb141-744a-47e0-8efc-5c8873b4ccec, rgba(255, 255, 255, 0.2))",
              opacity: "1",
            }}
          />
          <div className="framer-17r4z5h-container" style={{ opacity: "1" }}>
            <a
              className="framer-0B0r4 framer-gkotj2 framer-v-dw47dl framer-32xhyo"
              data-framer-name="Inverse"
              href="/client"
              data-framer-page-link-current="true"
              style={{ height: "100%", width: "100%", opacity: "1" }}
            >
              <div
                data-framer-background-image-wrapper="true"
                style={{ position: "absolute", borderRadius: "inherit", inset: "0px" }}
              >
                <img
                  decoding="auto"
                  width={1901}
                  height={400}
                  sizes="66.7234px"
                  className="cx-brand-logo"
                  src={hero.logoSrc}
                  alt={hero.logoAlt}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    borderRadius: "inherit",
                    objectPosition: "center center",
                    objectFit: "contain",
                  }}
                />
              </div>
            </a>
          </div>
        </div>
        <div className="framer-yi7bl9" data-framer-name="Column" style={{ opacity: "1" }}>
          <div className="framer-1ifctlv" data-framer-name="Content" style={{ opacity: "1" }}>
            <div
              className="framer-1ip11xq-container"
              data-code-component-plugin-id="84d4c1"
              style={{ opacity: "1" }}
            >
              <LocalTime />
            </div>
            <div
              className="framer-1m5dyx3"
              data-framer-name="Text"
              data-framer-component-type="RichTextContainer"
              style={{
                ["--extracted-r6o4lv" as string]:
                  "var(--token-e78e0574-70cc-443d-9ed0-67f0605f5e88, rgba(255, 255, 255, 0.6))",
                ["--framer-paragraph-spacing" as string]: "0px",
                transform: "none",
                opacity: "1",
              }}
            >
              <p
                className="framer-text framer-styles-preset-1t53lfp"
                data-styles-preset="izEPYCVCb"
                dir="auto"
                style={{
                  ["--framer-text-color" as string]:
                    "var(--extracted-r6o4lv, var(--token-e78e0574-70cc-443d-9ed0-67f0605f5e88, rgba(255, 255, 255, 0.6)))",
                }}
              >
                Local Time
              </p>
            </div>
          </div>
        </div>
        <div className="framer-1gl6ihi" data-framer-name="Column" style={{ opacity: "1" }}>
          <div className="framer-53tas7-container" style={{ opacity: "1" }}>
            <a
              className="framer-dFc6T framer-xV28z framer-0fB9Y framer-pnkaol framer-v-pnkaol framer-161hits"
              data-framer-name="Secondary"
              href="#home-contact"
              style={{ width: "100%", opacity: "1" }}
            >
              <div
                className="framer-1fbe84v"
                data-framer-name="Icon"
                style={{
                  backgroundColor:
                    "var(--token-dca875b7-f855-43c1-bf73-97596e452266, rgb(255, 96, 68))",
                  opacity: "1",
                }}
              >
                <svg
                  className="framer-eivmu framer-tisjrm"
                  role="presentation"
                  viewBox="0 0 24 24"
                  style={{
                    ["--1m6trwb" as string]: "0",
                    ["--21h8s6" as string]:
                      "var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255))",
                    ["--pgex8v" as string]: "1.5",
                    opacity: "1",
                  }}
                >
                  <use href="#3166100823" />
                </svg>
              </div>
              <div className="framer-tzdxf3" data-framer-name="Image" style={{ opacity: "1" }}>
                <div className="framer-df0z4f" style={{ transform: "none", opacity: "1" }}>
                  <div
                    data-framer-background-image-wrapper="true"
                    style={{
                      position: "absolute",
                      borderRadius: "inherit",
                      cornerShape: "inherit",
                      inset: "0px",
                    }}
                  >
                    <img
                      decoding="auto"
                      width={120}
                      height={120}
                      src={assets.ctaPortrait}
                      alt={assets.founderAlt}
                      alt=""
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        borderRadius: "inherit",
                        cornerShape: "inherit",
                        objectPosition: "center center",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                className="framer-1i0zdvn"
                data-framer-name="Content"
                style={{
                  ["--border-bottom-width" as string]: "0px",
                  ["--border-color" as string]: "rgba(0, 0, 0, 0)",
                  ["--border-left-width" as string]: "0px",
                  ["--border-right-width" as string]: "0px",
                  ["--border-style" as string]: "solid",
                  ["--border-top-width" as string]: "0px",
                  backgroundColor:
                    "var(--token-a9b62d48-6a26-48a8-a5a7-c173c29cb78d, rgb(18, 18, 18))",
                  opacity: "1",
                }}
              >
                <div className="framer-1dy6dyo" data-framer-name="Inner" style={{ opacity: "1" }}>
                  <div
                    className="framer-1ag56wc"
                    data-framer-component-type="RichTextContainer"
                    style={{
                      ["--framer-paragraph-spacing" as string]: "0px",
                      transform: "none",
                      opacity: "1",
                    }}
                  >
                    <p
                      className="framer-text framer-styles-preset-1ivjnd8"
                      data-styles-preset="x9nNkfERy"
                      dir="auto"
                    >
                      {ctas.startProject}
                    </p>
                  </div>
                  <div
                    className="framer-1nqevs4"
                    data-framer-component-type="RichTextContainer"
                    style={{
                      ["--extracted-r6o4lv" as string]:
                        "var(--token-e78e0574-70cc-443d-9ed0-67f0605f5e88, rgba(255, 255, 255, 0.6))",
                      ["--framer-paragraph-spacing" as string]: "0px",
                      transform: "none",
                      opacity: "1",
                    }}
                  >
                    <p
                      className="framer-text framer-styles-preset-1t53lfp"
                      data-styles-preset="izEPYCVCb"
                      dir="auto"
                      style={{
                        ["--framer-text-color" as string]:
                          "var(--extracted-r6o4lv, var(--token-e78e0574-70cc-443d-9ed0-67f0605f5e88, rgba(255, 255, 255, 0.6)))",
                      }}
                    >
                      {ctas.brandSlash}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="framer-y69qsl"
                data-framer-name="Icon"
                style={{
                  backgroundColor:
                    "var(--token-dca875b7-f855-43c1-bf73-97596e452266, rgb(255, 96, 68))",
                  opacity: "1",
                }}
              >
                <svg
                  className="framer-eivmu framer-6camyy"
                  role="presentation"
                  viewBox="0 0 24 24"
                  style={{
                    ["--1m6trwb" as string]: "0",
                    ["--21h8s6" as string]:
                      "var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255))",
                    ["--pgex8v" as string]: "1.5",
                    opacity: "1",
                  }}
                >
                  <use href="#3166100823" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </header>
    </div>
  )
}
