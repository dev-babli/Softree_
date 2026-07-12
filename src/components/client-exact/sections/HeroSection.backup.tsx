"use client"

import { useEffect, useRef, type CSSProperties, type RefObject } from "react"
import { hero } from "../content"
import { HeroParallaxBackground } from "./HeroParallaxBackground"

/**
 * Exact Hanza scroll transform (probed from hanza-template.framer.website):
 * progress 0→1 through hero → scale 1→1.2, translateY 0→300px, opacity 1→0.5
 */
function useHeroVideoScrollZoom(
  sectionRef: RefObject<HTMLElement | null>,
  mediaRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const section = sectionRef.current
    const media = mediaRef.current
    if (!section || !media) return

    let raf = 0
    const apply = () => {
      raf = 0
      const rect = section.getBoundingClientRect()
      const h = rect.height || 1
      const progress = Math.min(1, Math.max(0, -rect.top / h))
      const scale = 1 + 0.2 * progress
      const y = 300 * progress
      const opacity = 1 - 0.5 * progress
      media.style.transform = `translateY(${y}px) scale(${scale})`
      media.style.opacity = String(opacity)
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [sectionRef, mediaRef])
}

const monoLabel: CSSProperties = {
  ["--font-selector" as string]: "R0Y7R2Vpc3QgTW9uby01MDA=",
  fontFamily: '"Geist Mono", monospace',
  fontWeight: 500,
  letterSpacing: "-0.25px",
  lineHeight: "150%",
  color: "var(--token-e78e0574-70cc-443d-9ed0-67f0605f5e88, rgba(255, 255, 255, 0.6))",
  textTransform: "uppercase",
}

const avatarBorder: CSSProperties = {
  ["--border-bottom-width" as string]: "1.5px",
  ["--border-color" as string]: "var(--token-4321a524-8651-4268-85f9-e884d8cb6223, rgb(255, 255, 255))",
  ["--border-left-width" as string]: "1.5px",
  ["--border-right-width" as string]: "1.5px",
  ["--border-style" as string]: "solid",
  ["--border-top-width" as string]: "1.5px",
  borderRadius: "500px",
  opacity: 1,
}

const lineStyle: CSSProperties = {
  backgroundColor: "var(--token-52e12769-d6ac-43e4-86f5-8403f8428401, rgba(255, 255, 255, 0.07))",
  opacity: 1,
}

const starOn: CSSProperties = {
  backgroundColor: "var(--token-dca875b7-f855-43c1-bf73-97596e452266, rgb(255, 96, 68))",
  willChange: "transform",
  opacity: 1,
  transform: "none",
}

const starOff: CSSProperties = {
  backgroundColor: "var(--token-19bcb141-744a-47e0-8efc-5c8873b4ccec, rgba(255, 255, 255, 0.2))",
  willChange: "transform",
  opacity: 1,
  transform: "none",
}

function ServiceRow({ index, label }: { index: string; label: string }) {
  return (
    <div
      className={
        index === "/01"
          ? "framer-nx63pl"
          : index === "/02"
            ? "framer-1k9ef75"
            : "framer-zaemxq"
      }
      data-framer-name="Content"
      style={{ willChange: "transform", opacity: 1, transform: "none" }}
    >
      <div
        className={index === "/01" ? "framer-9ei5vo" : index === "/02" ? "framer-vnt0nz" : "framer-3q6t2i"}
        data-framer-name="Text"
        data-framer-component-type="RichTextContainer"
        style={{ transform: "none" }}
      >
        <p dir="auto" className="framer-text" style={monoLabel}>
          {index}
        </p>
      </div>
      <div
        className={index === "/01" ? "framer-1phe0ao" : index === "/02" ? "framer-1ne67k5" : "framer-1v97eqb"}
        data-framer-name="Text"
        data-framer-component-type="RichTextContainer"
        style={{ transform: "none" }}
      >
        <h6
          className="framer-text framer-styles-preset-1tde6wz"
          data-styles-preset="i6r0kI2sg"
          dir="auto"
          style={{
            ["--framer-text-color" as string]:
              "var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255))",
          }}
        >
          {label}
        </h6>
      </div>
    </div>
  )
}

function Avatar({
  src,
  className,
  translate,
  large,
}: {
  src: string
  className: string
  translate?: boolean
  large?: boolean
}) {
  return (
    <div
      className={className}
      data-border="true"
      data-framer-name="Image"
      style={{
        ...avatarBorder,
        ...(translate ? { transform: "translateY(-50%)" } : {}),
        ...(large ? { backgroundColor: "rgba(0, 0, 0, 0)" } : {}),
      }}
    >
      <div
        data-framer-background-image-wrapper="true"
        style={{
          position: "absolute",
          borderRadius: "inherit",
          inset: 0,
        }}
      >
        <img
          decoding="auto"
          width={large ? 640 : 120}
          height={large ? 640 : 120}
          {...(large
            ? {
                sizes: "40px",
                srcSet: `${src.replace("width=640&height=640", "scale-down-to=512&width=640&height=640")} 512w,${src} 640w`,
              }
            : {})}
          src={src}
          alt="User"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            borderRadius: "inherit",
            objectPosition: "center center",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  )
}

/**
 * REAL React JSX — Framer class names preserved for exact look.
 * Editable copy lives in ../content.ts
 * NO dangerouslySetInnerHTML.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  useHeroVideoScrollZoom(sectionRef, mediaRef)

  return (
    <section
      ref={sectionRef}
      className="framer-8xsx75"
      data-framer-name="Section Hero"
      id="home-hero"
    >
      <div className="framer-1he253f" data-framer-name="Image Wrapper">
        <div className="framer-2i1two" data-framer-name="Content">
          <div className="framer-1ysa24i" data-framer-name="Content">
            <div className="framer-u23ma7">
              <div className="framer-opytkn" data-framer-name="Content">
                <div
                  className="framer-16qcng6"
                  data-framer-name="Text"
                  data-framer-component-type="RichTextContainer"
                  style={{ willChange: "transform", opacity: 1, transform: "none" }}
                >
                  <h6
                    className="framer-text framer-styles-preset-1tde6wz"
                    data-styles-preset="i6r0kI2sg"
                    dir="auto"
                    style={{
                      ["--framer-text-color" as string]:
                        "var(--token-e78e0574-70cc-443d-9ed0-67f0605f5e88, rgba(255, 255, 255, 0.6))",
                    }}
                  >
                    <span
                      className="framer-text"
                      style={{
                        ["--framer-text-color" as string]:
                          "var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255))",
                      }}
                    >
                      {hero.headlineLead}
                    </span>
                    {hero.headlineRest}
                  </h6>
                </div>
                <div
                  className="framer-btg75"
                  data-framer-name="Vector"
                  style={{ willChange: "transform", opacity: 1, transform: "none" }}
                />
              </div>

              <div className="framer-v1eolc hidden-1vb5nd8" data-framer-name="Content">
                <div className="framer-mt57xh" data-framer-name="Content">
                  <ServiceRow index="/01" label={hero.services[0]} />
                  <ServiceRow index="/02" label={hero.services[1]} />
                  <ServiceRow index="/03" label={hero.services[2]} />
                </div>
                <div
                  className="framer-iya6v4"
                  data-framer-name="Vector"
                  style={{ willChange: "transform", opacity: 1, transform: "none" }}
                />
              </div>
            </div>
          </div>

          <div className="framer-h1mnq" data-framer-name="Content">
            <div className="framer-1bjsyq0 hidden-1g6n99x hidden-1vb5nd8" data-framer-name="Content">
              <div className="framer-m6ylt5-container">
                <div
                  className="framer-Q6cR4 framer-BjKZ6 framer-0fB9Y framer-9vjyb0 framer-v-7dg0dq"
                  data-framer-name="Inverse"
                  style={{ borderRadius: "100px", opacity: 1 }}
                >
                  <div className="framer-1kiwhm2" data-framer-name="Images" style={{ opacity: 1 }}>
                    <Avatar src={hero.avatars[0]} className="framer-wtg4q1" />
                    <Avatar src={hero.avatars[1]} className="framer-nod8g3" translate />
                    <Avatar src={hero.avatars[2]} className="framer-6x1pfl" translate />
                    <Avatar src={hero.avatars[3]} className="framer-1q230xs" translate large />
                  </div>
                  <div className="framer-1hs1eml" data-framer-name="Grid" style={{ opacity: 1 }}>
                    <div className="framer-kxgnad" data-framer-name="Grid" style={{ opacity: 1 }}>
                      <div
                        className="framer-958oot"
                        data-framer-name="Text"
                        data-framer-component-type="RichTextContainer"
                        style={{
                          ["--extracted-1w3ko1f" as string]:
                            "var(--token-e78e0574-70cc-443d-9ed0-67f0605f5e88, rgba(255, 255, 255, 0.6))",
                          ["--extracted-r6o4lv" as string]:
                            "var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255))",
                          ["--framer-paragraph-spacing" as string]: "0px",
                          transform: "none",
                          opacity: 1,
                        }}
                      >
                        <p
                          className="framer-text framer-styles-preset-ohuyvt"
                          data-styles-preset="TfHFgjHBc"
                          dir="auto"
                          style={{
                            ["--framer-text-color" as string]:
                              "var(--extracted-r6o4lv, var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255)))",
                          }}
                        >
                          {hero.rating}
                          <span
                            className="framer-text"
                            style={{
                              ["--framer-text-color" as string]:
                                "var(--extracted-1w3ko1f, var(--token-e78e0574-70cc-443d-9ed0-67f0605f5e88, rgba(255, 255, 255, 0.6)))",
                            }}
                          >
                            {hero.ratingSuffix}
                          </span>
                        </p>
                      </div>
                      <div className="framer-t22z8n" data-framer-name="Content" style={{ opacity: 1 }}>
                        <div className="framer-1dfqhu1" data-framer-name="Vector" style={starOn} />
                        <div className="framer-1v2ap27" data-framer-name="Vector" style={starOn} />
                        <div className="framer-1asrz1b" data-framer-name="Vector" style={starOn} />
                        <div className="framer-yyvzpt" data-framer-name="Vector" style={starOn} />
                        <div className="framer-15l9pkj" data-framer-name="Vector" style={starOff} />
                      </div>
                    </div>
                    <div
                      className="framer-rmrdvh"
                      data-framer-name="Text"
                      data-framer-component-type="RichTextContainer"
                      style={{
                        ["--extracted-1w3ko1f" as string]:
                          "var(--token-e78e0574-70cc-443d-9ed0-67f0605f5e88, rgba(255, 255, 255, 0.6))",
                        ["--extracted-r6o4lv" as string]:
                          "var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255))",
                        ["--framer-paragraph-spacing" as string]: "0px",
                        transform: "none",
                        opacity: 1,
                      }}
                    >
                      <p
                        className="framer-text framer-styles-preset-1t53lfp"
                        data-styles-preset="izEPYCVCb"
                        dir="auto"
                        style={{
                          ["--framer-text-color" as string]:
                            "var(--extracted-r6o4lv, var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255)))",
                        }}
                      >
                        <span
                          className="framer-text"
                          style={{
                            ["--framer-text-color" as string]:
                              "var(--extracted-1w3ko1f, var(--token-e78e0574-70cc-443d-9ed0-67f0605f5e88, rgba(255, 255, 255, 0.6)))",
                          }}
                        >
                          {hero.trustLead}
                        </span>
                        {hero.trustRest}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="framer-jeckop" data-framer-name="Content">
              <div
                className="framer-1wu5efj"
                data-framer-name="Logo"
                style={{
                  willChange: "transform",
                  height: "auto",
                  aspectRatio: "4.7525 / 1",
                  opacity: 1,
                  transform: "none",
                }}
              >
                <div
                  data-framer-background-image-wrapper="true"
                  style={{ position: "absolute", borderRadius: "inherit", inset: 0 }}
                >
                  <img
                    decoding="auto"
                    width={1901}
                    height={400}
                    sizes="calc((max(100vw, 1px) - 128px) / 2)"
                    srcSet={hero.logoSrcSet}
                    src={hero.logoSrc}
                    alt={hero.logoAlt}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      borderRadius: "inherit",
                      objectPosition: "center center",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="framer-ci9zn7-container">
          <div
            className="framer-F54Yq framer-1xhumcg framer-v-1roeq3a"
            data-framer-name="Inverse (XL)"
            style={{ height: "100%", width: "100%", opacity: 1 }}
          >
            <div className="framer-v0ol84" data-framer-name="Line" style={lineStyle} />
            <div className="framer-6k7wvo" data-framer-name="Line" style={lineStyle} />
            <div className="framer-59luff" data-framer-name="Line" style={lineStyle} />
            <div className="framer-4o2tez" data-framer-name="Line" style={lineStyle} />
            <div className="framer-eme6rl" data-framer-name="Line" style={lineStyle} />
          </div>
        </div>

        <div className="framer-mkouhr" data-framer-name="Noise">
          <div
            data-framer-background-image-wrapper="true"
            style={{
              position: "absolute",
              borderRadius: "inherit",
              inset: 0,
              backgroundImage: `url("${hero.noiseBg}")`,
              backgroundRepeat: "repeat",
              backgroundPosition: "left top",
              border: 0,
              backgroundSize: "128px",
            }}
          />
        </div>
        <div className="framer-opyzi3" data-framer-name="Overlay" />
        <div
          ref={mediaRef}
          className="framer-1278xai-container cx-hero-mesh-wrap"
          style={{ willChange: "transform", opacity: 1, transform: "none" }}
          aria-hidden="true"
        >
          <div className="cx-hero-mesh" />
        </div>
      </div>
    </section>
  )
}
