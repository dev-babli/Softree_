import fs from "node:fs"
import path from "node:path"

const dir = "src/components/client-exact/sections"
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".tsx"))) {
  const p = path.join(dir, f)
  let s = fs.readFileSync(p, "utf8")
  const n = (s.match(/\.\/contact/g) || []).length
  if (n) {
    s = s.split("./contact").join("#home-contact")
    fs.writeFileSync(p, s)
    console.log("contact", f, n)
  }
}

let t = fs.readFileSync(path.join(dir, "TestimonialsSection.tsx"), "utf8")
const lines = t.split("\n")
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("framer-styles-preset-6hil1f")) {
    // next non-empty content line
    for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
      const trim = lines[j].trim()
      if (!trim || trim.startsWith("<") || trim.startsWith("{")) continue
      if (!trim.includes("testimonials.quote")) {
        lines[j] = lines[j].replace(trim, "{testimonials.quote.text}")
        console.log("quote line", j + 1)
      }
      break
    }
  }
}
fs.writeFileSync(path.join(dir, "TestimonialsSection.tsx"), lines.join("\n"))

// Footer form labels
let foot = fs.readFileSync(path.join(dir, "FooterSection.tsx"), "utf8")
if (!foot.includes("footer.form")) {
  foot = foot.replace("Your Name", "{footer.form.nameLabel}")
  foot = foot.replace(/Send Message/g, "{footer.form.submit}")
  foot = foot.replace(/Submit/g, "{footer.form.submit}")
  fs.writeFileSync(path.join(dir, "FooterSection.tsx"), foot)
  console.log("footer form")
}

console.log("done")
