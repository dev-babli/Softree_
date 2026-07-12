"use client"

import { industries } from "../content"

const CARD_CLASS = [
  "framer-1qzy2t1",
  "framer-1egcg0h",
  "framer-1lp3rqr",
  "framer-h37a7u",
  "framer-wwaygk",
  "framer-1rcfv4a",
  "framer-kgprkk hidden-zo2ufi",
  "framer-16qtox7 hidden-zo2ufi",
] as const

const LOGO_CLASS = [
  "framer-1bk2ejr",
  "framer-lbmm1v",
  "framer-1t2koj",
  "framer-1tocshb",
  "framer-6mxmlj",
  "framer-1eei36t",
  "framer-v59h62",
  "framer-1nuqhxe",
] as const

function IndustryTickerItem({
  index,
  item,
  clone,
}: {
  index: number
  item: (typeof industries.marquee)[number]
  clone?: boolean
}) {
  const i = index % 8
  return (
    <li
      className={clone ? "clone-item" : "ticker-item"}
      aria-hidden={clone ? "true" : "false"}
      aria-posinset={index + 1}
      aria-setsize={8}
      style={{
        flexGrow: "0",
        flexShrink: "0",
        position: "relative",
        height: "fit-content",
        width:
          "calc((100% - var(--ticker-total-not-fr,0px) - (var(--ticker-gap,0px) * (var(--ticker-cms-total-children, var(--ticker-total-children,1)) - 1))) / (var(--ticker-total-fr,1) * var(--ticker-cms-total-children,1)) * 1)",
        transform: index < 4 ? "translateX(19692px)" : "none",
      }}
    >
      <div className={CARD_CLASS[i]} data-border="true" data-framer-name="Card">
        <div className={LOGO_CLASS[i]} data-framer-name={`Industry-${String(i + 1).padStart(2, "0")}`} draggable={false}>
          <div
            data-framer-background-image-wrapper="true"
            style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", inset: "0px" }}
          >
            <img
              decoding="auto"
              loading="lazy"
              width={320}
              height={128}
              src={item.src}
              alt={item.name}
              draggable={false}
              className="cx-industry-marquee-img"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                borderRadius: "inherit",
                cornerShape: "inherit",
                objectPosition: "center center",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>
    </li>
  )
}

/** Industry marquee — sits below About / founder on /client */
export function LogosSection() {
  const items = [...industries.marquee]
  return (
    <section className="framer-1mwno0z" data-framer-name="Section Industries" id="home-industries-ticker">
      <div
        className="framer-1s69xmk"
        data-border="true"
        data-framer-name="Industries"
        draggable={false}
        style={{
          overflowX: "clip",
          display: "flex",
          position: "relative",
          userSelect: "none",
          touchAction: "pan-y",
        }}
      >
        <ul
          style={{
            display: "flex",
            position: "relative",
            listStyleType: "none",
            padding: "0px",
            margin: "0px",
            justifyContent: "flex-start",
            flexDirection: "row",
            gap: "0px",
            opacity: "1",
            alignItems: "center",
            width: "100%",
            height: "100%",
            maxHeight: "100%",
            maxWidth: "100%",
            transform: "translateX(-5836.32px)",
          }}
        >
          {items.map((item, index) => (
            <IndustryTickerItem key={item.name} index={index} item={item} />
          ))}
          {items.map((item, index) => (
            <IndustryTickerItem key={`${item.name}-clone`} index={index} item={item} clone />
          ))}
        </ul>
      </div>
      {" "}
    </section>
  )
}
