import fs from "node:fs"

let s = fs.readFileSync("src/components/client-exact/sections/ServicesSection.tsx", "utf8")
let i = 0
s = s.replace(
  /<div className="framer-1bgm5yy" data-framer-name="Content" style=\{\{ opacity: "1" \}\} \/>/g,
  () => {
    const idx = i++
    return `<div className="framer-1bgm5yy" data-framer-name="Content" style={{ opacity: "1" }}>
                    <div className="framer-d4bffu" data-framer-name="Inner" style={{ opacity: "1" }}>
                      <div className="framer-ukmnwa" data-framer-name="Text" data-framer-component-type="RichTextContainer" style={{ ["--framer-paragraph-spacing"]: "0px", transform: "none", opacity: "1" }}>
                        <p dir="auto" className="framer-text framer-styles-preset-21ogod">
                          {services.items[${idx}].body}
                        </p>
                      </div>
                    </div>
                  </div>`
  },
)
fs.writeFileSync("src/components/client-exact/sections/ServicesSection.tsx", s)
console.log("services bodies", i)

let foot = fs.readFileSync("src/components/client-exact/sections/FooterSection.tsx", "utf8")
foot = foot.replace(
  /By submitting, you agree to our[\s\S]{0,200}?Privacy Policy[\s\S]{0,80}?\./,
  "{footer.form.privacy}",
)
// softer fallback
if (foot.includes("By submitting, you agree to our")) {
  foot = foot.replace(
    "By submitting, you agree to our",
    "{footer.form.privacy} — see also",
  )
}
fs.writeFileSync("src/components/client-exact/sections/FooterSection.tsx", foot)
console.log("footer privacy")
