/**
 * Remove visible Hanza / template residue from client-exact sections (text + URLs only).
 */
import fs from "node:fs"
import path from "node:path"

const dir = "src/components/client-exact/sections"
const LOGO = "/client/vigorous-logo.svg"
const SITE = "https://www.vigoroussoftech.com/"

/** Template fake-client logos (raster wordmarks from Hanza demo) */
const TEMPLATE_LOGO_HASHES = [
  "2GMXWWbIueByg8aHy0ppmBuIo5k",
  "rpWxtpnQjEatsb4cidN6iCSOU",
  "njSY1vofkQx6kiMXnNInOp8xPo",
  "tKVSvCD2BXrjTdpP7b5fCA4ouI",
  "WejkhJs0k28ahidPwTEVUa7UAQ",
  "lWNXDUsAA1lisY0W7PS4Iln69HU",
  "6327KxVOTRZ9nhdzpGqrKNfsq4",
  "lGBNjJpkXvM6ANJVGHNbMawZ4g",
  "Du3BTduVuZ6ITMKZ3z9yHUZKztc",
  "68Thke8izHQ97CzQmZ92cnXJw",
  "mwMZjXODcUlLHZnp5GWrpy6u6Lc",
  "rdYH8Fpt5aPTxGpCY3SCXoox8U",
]

const pairs = [
  // Hanza logo image (wordmark says HANZA)
  ["https://framerusercontent.com/images/2GMXWWbIueByg8aHy0ppmBuIo5k.webp?scale-down-to=512&width=1901&height=400 512w,https://framerusercontent.com/images/2GMXWWbIueByg8aHy0ppmBuIo5k.webp?scale-down-to=1024&width=1901&height=400 1024w,https://framerusercontent.com/images/2GMXWWbIueByg8aHy0ppmBuIo5k.webp?width=1901&height=400 1901w", LOGO],
  ['src="https://framerusercontent.com/images/2GMXWWbIueByg8aHy0ppmBuIo5k.webp?width=1901&height=400"', `src="${LOGO}"`],
  ["https://framerusercontent.com/images/2GMXWWbIueByg8aHy0ppmBuIo5k.webp?width=1901&height=400", LOGO],
  ['alt="Logo"', 'alt="Vigorous Softech"'],
  // Social / creator links
  ["https://www.framer.com/marketplace/creator/pawel-gola?via=pawelgola", SITE],
  ["https://x.com/gola99", SITE],
  ["https://dribbble.com/pawelgola", SITE],
  ["https://www.instagram.com/gola.design/", SITE],
  // Testimonial people / labels
  ["Jakub Horák", "Ashish Gangrade"],
  ["CEO at Leapyear", "CEO, Vigorous Softech"],
  ["CEO at Kintsugi", "CEO, Vigorous Softech"],
  ["24+ Founders", "Leadership perspective"],
  ["Founder at GCC Solutions", "CEO, Vigorous Softech"],
  ["Founder at Digital Services Labs", "Vigorous Softech · GCC practice"],
  // data-framer-name Hanza quotes (devtools / a11y tree)
  ['data-framer-name="Honza understood our vision immediately and turned it into a website that feels sharp, simple, and easy to use. The whole process was clear from start to finish."', 'data-framer-name="Vigorous Softech leadership perspective on GCC and Tier 2/3 talent."'],
  // Misc Hanza copy missed earlier
  ["website for your me.", "GCC fit check for your team."],
  ["The goal is to create a website that looks sharp, feels easy to use, and can be managed for yourout needing a developer for every small update.", "We help enterprises assess GCC fit, location, talent, and operating model—with clear next steps after discovery."],
  ["How strong messaging, consistent visuals, and a focused website experience.", "How GCC-as-a-Service and colocation paths unlock scale for mid-market firms."],
  ['href="./portfolio/goodwell"', 'href="#home-portfolio"'],
  ['href="./portfolio/ikigai"', 'href="#home-portfolio"'],
  ['href="./blog/what-makes-a-website-project-run-smoothly"', 'href="https://www.vigoroussoftech.com/"'],
  ['href="./blog/how-visual-direction-shapes-a-stronger-website"', 'href="https://www.vigoroussoftech.com/"'],
  ['href="./blog/building-better-websites-in-framer"', 'href="https://www.vigoroussoftech.com/"'],
  ['href="./contact"', 'href="#home-contact"'],
  ["Galileo", "Business Advisory"],
  ['href="./portfolio/galileo"', 'href="#home-portfolio"'],
  ['href="./portfolio"', 'href="#home-portfolio"'],
]

function scrubTemplateLogos(s) {
  let n = 0
  for (const hash of TEMPLATE_LOGO_HASHES) {
    const re = new RegExp(`https://framerusercontent\\.com/images/${hash}\\.webp[^"'\\s]*`, "g")
    const matches = s.match(re)
    if (matches) {
      n += matches.length
      s = s.replace(re, LOGO)
    }
  }
  return { s, n }
}

let total = 0
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".tsx"))) {
  const p = path.join(dir, f)
  let s = fs.readFileSync(p, "utf8")
  let n = 0
  const logoScrub = scrubTemplateLogos(s)
  s = logoScrub.s
  n += logoScrub.n
  for (const [a, b] of pairs) {
    const c = s.split(a).length - 1
    if (c) {
      s = s.split(a).join(b)
      n += c
    }
  }
  if (n) {
    fs.writeFileSync(p, s)
    total += n
    console.log(f, n)
  }
}

// vigorousContent logo
const vc = "src/components/client-exact/vigorousContent.ts"
let s = fs.readFileSync(vc, "utf8")
s = s.replace(
  /logoSrc:\s*\n\s*"https:\/\/framerusercontent\.com\/images\/2GMXWWbIueByg8aHy0ppmBuIo5k\.webp\?width=1901&height=400",/,
  `logoSrc: "${LOGO}",`,
)
s = s.replace(
  /logoSrcSet:\s*\n\s*"[^"]+2GMXWWbIueByg8aHy0ppmBuIo5k[^"]+",/,
  `logoSrcSet: "${LOGO}",`,
)
fs.writeFileSync(vc, s)
console.log("vigorousContent logo updated")
console.log("scrub total", total)
