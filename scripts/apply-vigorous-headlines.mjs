import fs from "node:fs"

function replaceFirstH2Inner(file, replacement) {
  let s = fs.readFileSync(file, "utf8")
  const start = s.indexOf('<h2 className="framer-text framer-styles-preset-1kkuq8w"')
  if (start < 0) {
    console.log("no h2", file)
    return
  }
  const openEnd = s.indexOf(">", start) + 1
  const close = s.indexOf("</h2>", openEnd)
  s = s.slice(0, openEnd) + "\n" + replacement + "\n              " + s.slice(close)
  fs.writeFileSync(file, s)
  console.log("h2", file)
}

replaceFirstH2Inner(
  "src/components/client-exact/sections/PricingSection.tsx",
  `                {pricing.headline}`,
)

replaceFirstH2Inner(
  "src/components/client-exact/sections/ProcessSection.tsx",
  `                  {processCopy.headline}`,
)

// Pricing subhead under h2 - replace first letter-split p after h2 if it still says website packages
{
  let s = fs.readFileSync("src/components/client-exact/sections/PricingSection.tsx", "utf8")
  // Find the centered subhead paragraph block after headline and collapse if still letter-split "Clear website packages"
  const marker = 'data-styles-preset="i6r0kI2sg" dir="auto" style={{ ["--framer-text-alignment"]: "center" }}>'
  const idx = s.indexOf(marker)
  if (idx > 0) {
    const openEnd = idx + marker.length
    const close = s.indexOf("</p>", openEnd)
    const inner = s.slice(openEnd, close)
    if (inner.includes('willChange: "transform"') && inner.includes("w") && inner.includes("p")) {
      s =
        s.slice(0, openEnd) +
        "\n                  Free intro, scoped workshop, or custom proposal—no published package prices.\n                " +
        s.slice(close)
      fs.writeFileSync("src/components/client-exact/sections/PricingSection.tsx", s)
      console.log("pricing subhead")
    }
  }
}

{
  let s = fs.readFileSync("src/components/client-exact/sections/ProcessSection.tsx", "utf8")
  const marker = 'data-styles-preset="i6r0kI2sg" dir="auto">'
  // first occurrence after process headline area
  let from = s.indexOf("{processCopy.headline}")
  if (from > 0) {
    const idx = s.indexOf(marker, from)
    if (idx > 0) {
      const openEnd = idx + marker.length
      const close = s.indexOf("</p>", openEnd)
      const inner = s.slice(openEnd, close)
      if (inner.includes('willChange: "transform"')) {
        s =
          s.slice(0, openEnd) +
          "\n                    {processCopy.subhead}\n                  " +
          s.slice(close)
        fs.writeFileSync("src/components/client-exact/sections/ProcessSection.tsx", s)
        console.log("process subhead")
      }
    }
  }
}

console.log("headlines done")
