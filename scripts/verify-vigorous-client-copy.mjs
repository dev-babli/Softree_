import fs from "node:fs"
import path from "node:path"

const dir = "src/components/client-exact"
const forbidden = [
  "$3,500",
  "$7,500",
  "$12,500",
  "122+",
  "128k",
  "4.2M",
  "Hanza Novák",
  "HaNZA",
  "Goodwell",
  "Ikigai",
  "Prague",
  "GOLA Templates",
  "Gola Templates",
  "Honza ",
  "2GMXWWbIueByg8aHy0ppmBuIo5k",
  "framerusercontent.com/images/rpWxtpnQjEatsb4cidN6iCSOU",
  "framerusercontent.com/images/68Thke8izHQ97CzQmZ92cnXJw",
  "Galileo",
  "pawel-gola",
  "gola99",
  "Jakub Horák",
  "Start Project",
  "/Hanza",
  "100+ engineers",
  "3000+ projects",
  "Central India's first",
  "Central India’s first",
]

let hits = 0
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f)
    const st = fs.statSync(p)
    if (st.isDirectory()) walk(p)
    else if (/\.(tsx|ts)$/.test(f)) {
      const lines = fs.readFileSync(p, "utf8").split(/\n/)
      lines.forEach((l, i) => {
        if (l.includes("Exact Hanza") || l.includes("Hanza scroll") || l.includes("open-menu")) return
        for (const needle of forbidden) {
          if (l.includes(needle)) {
            console.log(`${p}:${i + 1}: ${needle}`)
            hits++
          }
        }
      })
    }
  }
}
walk(dir)

const page = fs.readFileSync("src/app/client/page.tsx", "utf8")
if (!page.includes("GCC as a Service") && !page.includes("seo.title")) {
  console.log("FAIL: metadata not wired")
  hits++
} else {
  console.log("OK: metadata uses seo module")
}

const content = fs.readFileSync("src/components/client-exact/vigorousContent.ts", "utf8")
for (const needle of ["Book a free intro", "GCC fit check", "Ashish Gangrade", "Free"]) {
  if (!content.includes(needle)) {
    console.log("FAIL missing in vigorousContent:", needle)
    hits++
  }
}

console.log(hits === 0 ? "VERIFY PASS" : `VERIFY FAIL (${hits} hits)`)
process.exit(hits === 0 ? 0 : 1)
