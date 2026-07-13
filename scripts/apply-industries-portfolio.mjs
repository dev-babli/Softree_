import fs from "node:fs"

const p = "src/components/client-exact/sections/PortfolioSection.tsx"
let s = fs.readFileSync(p, "utf8")

const reps = [
  ['data-framer-name="Section Portfolio"', 'data-framer-name="Section Industries" id="home-industries"'],
  ["All Offerings", "All Industries"],
  ["GCC Solutions", "BFSI & Enterprise"],
  ["Business Advisory", "Technology & SaaS"],
  ["Digital Services", "Manufacturing & Logistics"],
  [
    "Build, scale, and operate GCCs via Colocation-as-a-Service.",
    "GCC and colocation paths for regulated, multi-tower enterprise operations.",
  ],
  [
    "Cloud, AI/ML, analytics, cybersecurity, and custom software.",
    "Product engineering, cloud, AI/ML, and platform ops from Central India.",
  ],
  [
    "HR, finance, IT helpdesk, procurement, and admin support.",
    "Shared services and digital backbone for supply-chain-heavy sectors.",
  ],
  [">Client<", ">Industry<"],
  [">Year<", ">Sector<"],
  [">2026<", ">GCC<"],
  [
    "https://framerusercontent.com/images/Tg2bM2Ax2NMUNMjXUgpBNTXVW4.webp?scale-down-to=1024&width=1050&height=1400 768w,https://framerusercontent.com/images/Tg2bM2Ax2NMUNMjXUgpBNTXVW4.webp?width=1050&height=1400 1050w",
    "/client/visual-gcc.svg",
  ],
  [
    'src="https://framerusercontent.com/images/Tg2bM2Ax2NMUNMjXUgpBNTXVW4.webp?width=1050&height=1400"',
    'src="/client/visual-gcc.svg"',
  ],
  [
    "https://framerusercontent.com/images/OBhRqYnNhzprFbDXTmYz6oMBA.webp?width=2560&height=1440",
    "/client/visual-gcc-wide.svg",
  ],
  [
    "https://framerusercontent.com/images/usY3IMJkjdi2OFfVikOPgJQTdww.webp?scale-down-to=1024&width=1050&height=1400 768w,https://framerusercontent.com/images/usY3IMJkjdi2OFfVikOPgJQTdww.webp?width=1050&height=1400 1050w",
    "/client/visual-digital.svg",
  ],
  [
    'src="https://framerusercontent.com/images/usY3IMJkjdi2OFfVikOPgJQTdww.webp?width=1050&height=1400"',
    'src="/client/visual-digital.svg"',
  ],
  [
    "https://framerusercontent.com/images/pGfraVtrJQMelbsdPS4dvfBuQaU.webp?width=3200&height=1800",
    "/client/visual-digital-wide.svg",
  ],
  [
    "https://framerusercontent.com/images/5n03cn39zkw03AOYNOG4IGEscdc.webp?scale-down-to=1024&width=1050&height=1400 768w,https://framerusercontent.com/images/5n03cn39zkw03AOYNOG4IGEscdc.webp?width=1050&height=1400 1050w",
    "/client/visual-enterprise.svg",
  ],
  [
    'src="https://framerusercontent.com/images/5n03cn39zkw03AOYNOG4IGEscdc.webp?width=1050&height=1400"',
    'src="/client/visual-enterprise.svg"',
  ],
  [
    "https://framerusercontent.com/images/L2rXxsYb7zPRivbHPp3oRsvjWxE.webp?width=2560&height=1440",
    "/client/visual-enterprise-wide.svg",
  ],
  ['alt="Preview Image"', 'alt="Industry visual"'],
  ['href="#home-portfolio"', 'href="#home-industries"'],
]

let n = 0
for (const [a, b] of reps) {
  const c = s.split(a).length - 1
  if (c) {
    s = s.split(a).join(b)
    n += c
  }
}

const headlineRe =
  /<div className="framer-a0p82f"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div className="framer-1gnwm1">/
const headlineNew = `<div className="framer-a0p82f" data-framer-name="Text" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
              <p className="framer-text framer-styles-preset-1tde6wz" data-styles-preset="i6r0kI2sg" dir="auto">
                <span className="framer-text" style={{ ["--framer-text-color"]: "var(--token-797a2fb4-2d14-46eb-9fb6-f38c1a9a545e, rgba(18, 18, 18, 0.6))" }}>
                  Industries we enable for GCC setup, digital delivery, and shared operations.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="framer-1gnwm1">`

if (headlineRe.test(s)) {
  s = s.replace(headlineRe, headlineNew)
  n++
}

fs.writeFileSync(p, s)
console.log("portfolio industry updates:", n)
