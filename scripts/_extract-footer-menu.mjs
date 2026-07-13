import fs from "node:fs"
import { parse } from "node-html-parser"

const main = fs.readFileSync(
  "src/components/client-exact/_extracted/main-inner.html",
  "utf8",
)
const root = parse(main)
const layout = root.querySelector(".framer-3L5GK")
const kids = layout
  ? [...layout.childNodes].filter((n) => n.nodeType === 1)
  : []

console.log("layout kids:")
for (const k of kids) {
  const cls = k.getAttribute("class") || ""
  const name = k.getAttribute("data-framer-name") || ""
  const tag = k.rawTagName
  const text = (k.text || "").replace(/\s+/g, " ").slice(0, 100)
  console.log("-", tag, cls.slice(0, 80), "|", name, "|", text)
}

const footer = root.querySelector("footer") || root.querySelector(".framer-97pctu-container")
if (footer) {
  const html = footer.tagName === "FOOTER" || footer.rawTagName === "footer"
    ? footer.toString()
    : footer.toString()
  fs.writeFileSync(
    "src/components/client-exact/_extracted/sections/footer.html",
    html,
  )
  console.log("\nfooter written", html.length, "tag", footer.rawTagName)
  console.log(html.slice(0, 400))
}

// Find menu overlay - often a fullscreen fixed panel toggled by class on layout
for (const cls of [
  "framer-11vsk7q",
  "framer-qlili8",
  "framer-1k4nlbv",
  "framer-97pctu",
  "framer-10q7wcf",
]) {
  const el = root.querySelector("." + cls) || root.querySelector("." + cls + "-container")
  console.log("\n", cls, el ? el.toString().length : "missing")
  if (el) {
    fs.writeFileSync(
      `src/components/client-exact/_extracted/sections/_${cls}.html`,
      el.toString().slice(0, 50000),
    )
  }
}

// Nav section already extracted - peek
const nav = fs.readFileSync(
  "src/components/client-exact/_extracted/sections/nav.html",
  "utf8",
)
console.log("\nnav.html", nav.length, nav.slice(0, 300))
