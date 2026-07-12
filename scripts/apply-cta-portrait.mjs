import fs from "node:fs"
import path from "node:path"

const PORTRAIT = "/client/image.png"
const dir = "src/components/client-exact/sections"

const avatarHashes = [
  "nxrIdkDd6Y1sqhzSdeVsMugCCNk",
  "OwtdU2BGnc0dMRE7IkZYZlGfBtU",
  "3j6yNJGADoWDBfzMN3MTG2Fkvk",
  "iWIgAhHOUCXReoVH7RJ12DTejLU",
  "6vWPBMlL6qWuNfxxfBgHjLFwd8",
]

const testimonialBgHashes = [
  "i287NdiVZUtn1mMd6mjKUnfIiA",
  "ZorUVFOsjfMZG8wsEheW8SLF3s",
  "PKZsny7qgu8w3UD9rJTVT6pP8",
  "q5DG4PtXMq1eVcsUGy6PeAbBWM",
]

let total = 0
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".tsx"))) {
  const p = path.join(dir, f)
  let s = fs.readFileSync(p, "utf8")
  let n = 0

  for (const hash of [...avatarHashes, ...testimonialBgHashes]) {
    const re = new RegExp(`https://framerusercontent\\.com/images/${hash}\\.webp[^"'\\s]*`, "g")
    const matches = s.match(re)
    if (matches) {
      n += matches.length
      s = s.replace(re, PORTRAIT)
    }
  }

  // srcSet blocks for 6vWPBMlL
  s = s.replace(
    /https:\/\/framerusercontent\.com\/images\/6vWPBMlL6qWuNfxxfBgHjLFwd8\.webp[^"]*/g,
    PORTRAIT,
  )

  if (n) {
    fs.writeFileSync(p, s)
    total += n
    console.log(f, n)
  }
}

console.log("portrait swaps:", total)
