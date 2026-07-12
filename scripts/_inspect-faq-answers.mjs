import fs from "node:fs"

const html = fs.readFileSync("Softree_/client.html", "utf8")
// Find FAQ-related strings
const needles = [
  "What do you offeR",
  "Do you only work with Framer",
  "How long does a project",
  "What do you need from me",
  "Do you offer ongoing",
  "How much does a website",
]
for (const n of needles) {
  const i = html.indexOf(n)
  console.log(n, i >= 0 ? "found" : "MISSING")
  if (i >= 0) {
    console.log(html.slice(i, i + 400).replace(/\s+/g, " ").slice(0, 350))
    console.log("---")
  }
}

// Also check hydrate JSON for FAQ answers
const m = html.match(/I design and build custom websites[\s\S]{0,200}/)
console.log("answer1", !!m)

const faqTsx = fs.readFileSync(
  "src/components/client-exact/sections/FaqSection.tsx",
  "utf8",
)
const questions = [...faqTsx.matchAll(/framer-styles-preset-ohuyvt[\s\S]*?>\s*([^<]+)/g)].map(
  (x) => x[1].trim(),
)
console.log("questions in tsx", questions)
