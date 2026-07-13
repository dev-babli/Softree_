/**
 * Surgical Vigorous copy apply for /client Framer sections.
 * Run: node scripts/apply-vigorous-copy-v2.mjs
 */
import fs from "node:fs"
import path from "node:path"

const root = "src/components/client-exact/sections"

function read(name) {
  return fs.readFileSync(path.join(root, name), "utf8")
}
function write(name, s) {
  fs.writeFileSync(path.join(root, name), s)
  console.log("updated", name)
}

// --- About: replace word-reveal paragraph + fake metrics ---
{
  let s = read("AboutSection.tsx")
  if (!s.includes('import { about, stats }')) {
    s = s.replace(
      '"use client"\n\n/**',
      '"use client"\n\nimport { about, stats } from "../content"\n\n/**',
    )
  }
  // CTA
  s = s.replaceAll("Get in Touch", "{about.getInTouch}")
  // Fix JSX - Get in Touch was plain text; need expression
  s = s.replaceAll("{about.getInTouch}", "{about.getInTouch}")
  // Actually replace plain text properly
  s = s.replace(
    />\s*Book Intro\s*</g,
    (m) => m, // already Book Intro from v1 for some; About still Get in Touch→ wait v1 didn't replace Get in Touch
  )
  // Profile already Ashish from v1

  // Replace entire word-span about body with content-driven text
  const aboutBodyRe =
    /(<p className="framer-text framer-styles-preset-b6i87h"[^>]*>)[\s\S]*?(<\/p>\s*<\/div>\s*<\/div>\s*<div className="framer-u0ouch")/
  if (aboutBodyRe.test(s)) {
    s = s.replace(
      aboutBodyRe,
      `$1
                  <span style={{ display: "inline", opacity: "1", willChange: "opacity" }}>
                    {about.greeting}
                  </span>
                  {" "}
                  <span style={{ display: "inline", opacity: "1", willChange: "opacity" }}>
                    {about.body}
                  </span>
                $2`,
    )
  }

  // Wire profile fields that may still be static
  s = s.replace(/Ashish Gangrade /g, "{about.profileName} ")
  s = s.replace(/>\s*Ashish Gangrade\s*</g, ">{about.profileName}<")
  s = s.replace(/>\s*CEO, Vigorous Softech\s*</g, ">{about.profession}<")
  s = s.replace(/>\s*Indore, India\s*</g, ">{about.location}<")
  s = s.replace(/>\s*\/Vigorous\s*</g, ">{about.brandSlash}<")
  s = s.replace(/>\s*Our Mission\s*</g, ">{about.missionLabel}<")
  s = s.replace(/>\s*Get in Touch\s*</g, ">{about.getInTouch}<")
  s = s.replace(/>\s*Book Intro\s*</g, ">{about.getInTouch}<")

  // Stats cards in about (3 cards typically)
  s = s.replace(/>\s*122\+\s*</g, ">{stats.items[0].value}<")
  s = s.replace(/>\s*Projects\s*</g, ">{stats.items[0].label}<")
  s = s.replace(
    /Digital projects shaped from early concept to polished website\./g,
    "{stats.items[0].body}",
  )

  // Second/third about metric cards — common Hanza values
  s = s.replace(/>\s*128k\s*</gi, ">{stats.items[1].value}<")
  s = s.replace(/>\s*4\.2M\s*</gi, ">{stats.items[2].value}<")
  s = s.replace(/>\s*Websites\s*</g, ">{stats.items[1].label}<")
  s = s.replace(/>\s*Followers\s*</g, ">{stats.items[2].label}<")

  write("AboutSection.tsx", s)
}

// --- Testimonials quotes ---
{
  let s = read("TestimonialsSection.tsx")
  if (!s.includes("import { testimonials")) {
    s = s.replace(
      '"use client"\n\n/**',
      '"use client"\n\nimport { testimonials, ctas } from "../content"\n\n/**',
    )
  }
  s = s.replace(
    /Hanza understood our vision immediately and turned it into a website that feels sharp, simple, and easy to use\. The whole process was clear from start to finish\./g,
    "{testimonials.quote.text}",
  )
  s = s.replace(
    /Working with Hanza felt effortless\. He brought structure to our ideas and delivered a polished website that looks premium on every screen\./g,
    "{testimonials.quote.text}",
  )
  // Other common fake quotes
  s = s.replace(
    /From the first call, everything felt organized\. The design direction was clear, the process was smooth, and the final website exceeded our expectations\./g,
    "{testimonials.quote.text}",
  )
  s = s.replace(
    /Hanza delivered a clean, modern website that perfectly matches our brand\. Communication was excellent throughout the entire project\./g,
    "{testimonials.quote.text}",
  )
  s = s.replace(/>\s*Leadership perspective\s*</g, ">{testimonials.trustLead}<")
  s = s.replace(/>\s*Book Intro\s*</g, ">{ctas.startProject}<")
  s = s.replace(/>\s*\/Vigorous\s*</g, ">{ctas.brandSlash}<")
  s = s.replace(/>\s*CEO, Vigorous Softech\s*</g, ">{testimonials.quote.role}<")
  s = s.replace(/data-framer-name="CEO, Vigorous Softech"/g, 'data-framer-name="CEO"')
  write("TestimonialsSection.tsx", s)
}

// --- Pricing: kill $ and rewrite tiers ---
{
  let s = read("PricingSection.tsx")
  if (!s.includes("import { pricing")) {
    s = s.replace(
      '"use client"\n\n/**',
      '"use client"\n\nimport { pricing } from "../content"\n\n/**',
    )
  }
  s = s.replace(/>\s*Pricing\s*</g, ">{pricing.label}<")
  s = s.replace(/>\s*\$3,500\s*</g, ">{pricing.cards[0].price}<")
  s = s.replace(/>\s*\$7,500\s*</g, ">{pricing.cards[1].price}<")
  s = s.replace(/>\s*\$12,500\s*</g, ">{pricing.cards[2].price}<")
  s = s.replace(/>\s*\/Project\s*</g, (m, offset, str) => {
    // cycle units - simpler: replace all with first then fix
    return ">{pricing.cards[0].unit}<"
  })
  // Fix units per occurrence by sequential replace
  let unitIdx = 0
  s = s.replace(/>\{pricing\.cards\[0\]\.unit\}</g, () => {
    const i = Math.min(unitIdx, 2)
    unitIdx++
    return `>{pricing.cards[${i}].unit}<`
  })

  // Tier names - Premium appears thrice for cards; map to Discovery/Workshop/Custom
  let tierIdx = 0
  s = s.replace(/>\s*Premium\s*</g, () => {
    const i = Math.min(tierIdx, 2)
    tierIdx++
    return `>{pricing.cards[${i}].tier}<`
  })

  s = s.replace(/>\s*Project timeline:\s*</g, ">{pricing.cards[0].timelineLabel}:<")
  s = s.replace(/Project timeline:/g, "Format:")

  // Includes labels
  s = s.replace(/What's included/g, "What's included")
  s = s.replace(/What’s included/g, "What's included")

  // Feature bullets - replace common design package lines
  const featureMap = [
    ["Website development", "{pricing.cards[0].includes[1]}"],
    ["Basic interactions", "{pricing.cards[0].includes[2]}"],
    ["Creative direction", "{pricing.cards[1].includes[0]}"],
    ["UX/UI design", "{pricing.cards[1].includes[1]}"],
    ["Basic SEO setup", "{pricing.cards[1].includes[2]}"],
    ["Advanced UX/UI design", "{pricing.cards[2].includes[0]}"],
    ["Website  development", "{pricing.cards[2].includes[1]}"],
    ["Launch support", "{pricing.cards[2].includes[2]}"],
  ]
  for (const [a, b] of featureMap) {
    s = s.split(a).join(b)
  }

  // CTAs on pricing cards
  s = s.replace(/Get started/gi, "Book a free intro")
  s = s.replace(/Start project/gi, "Book a free intro")

  write("PricingSection.tsx", s)
}

// --- FAQ ---
{
  let s = read("FaqSection.tsx")
  if (!s.includes("import { faq")) {
    s = s.replace(
      '"use client"\n\n/**',
      '"use client"\n\nimport { faq } from "../content"\n\n/**',
    )
  }
  // Common Hanza FAQ questions - replace with ours by order if we can find them
  const qPairs = [
    ["What do you offeR?", "{faq.items[0].q}"],
    ["What do you offer?", "{faq.items[0].q}"],
    ["Do you only work with Framer?", "{faq.items[1].q}"],
    ["How long does a project take?", "{faq.items[2].q}"],
    ["How do we start a project?", "{faq.items[4].q}"],
    ["Do you offer ongoing support?", "{faq.items[5].q}"],
    ["What’s included in a project?", "{faq.items[3].q}"],
    ["What's included in a project?", "{faq.items[3].q}"],
  ]
  for (const [a, b] of qPairs) s = s.split(a).join(b)

  s = s.replace(/>\s*Quick Answers\.\s*</g, ">{faq.headline}<")
  s = s.replace(/>\s*FAQ\s*</g, ">FAQ<")

  write("FaqSection.tsx", s)
}

// --- Process headline ---
{
  let s = read("ProcessSection.tsx")
  if (!s.includes("import { process")) {
    s = s.replace(
      '"use client"\n\n/**',
      '"use client"\n\nimport { process as processCopy } from "../content"\n\n/**',
    )
  }
  s = s.replace(/>\s*Process\s*</g, ">{processCopy.label}<")
  s = s.replace(/Project Direction/g, "{processCopy.steps[0].title}")
  s = s.replace(/Project fit check/g, "{processCopy.steps[0].body}")
  write("ProcessSection.tsx", s)
}

// --- Services ---
{
  let s = read("ServicesSection.tsx")
  if (!s.includes("import { services")) {
    s = s.replace(
      '"use client"\n\n/**',
      '"use client"\n\nimport { services } from "../content"\n\n/**',
    )
  }
  s = s.replace(/>\s*Services\s*</g, ">{services.label}<")
  s = s.replace(/>\s*CEO, Vigorous Softech\s*</g, ">{services.items[0].title}<")
  write("ServicesSection.tsx", s)
}

// --- Case study ---
{
  let s = read("CasyStudySection.tsx")
  if (!s.includes("import { caseStudy")) {
    s = s.replace(
      '"use client"\n\n/**',
      '"use client"\n\nimport { caseStudy } from "../content"\n\n/**',
    )
  }
  s = s.replace(/>\s*Vigorous Softech · GCC practice\s*</g, ">{caseStudy.author}<")
  s = s.replace(/>\s*Book a GCC fit check\s*</g, ">{caseStudy.cta}<")
  write("CasyStudySection.tsx", s)
}

// --- Footer ---
{
  let s = read("FooterSection.tsx")
  if (!s.includes("import { footer")) {
    s = s.replace(
      '"use client"\n\n/**',
      '"use client"\n\nimport { footer } from "../content"\n\n/**',
    )
  }
  s = s.replace(/>\s*Ashish Gangrade\s*</g, ">{footer.profileName}<")
  s = s.replace(/>\s*CEO, Vigorous Softech\s*</g, ">{footer.profession}<")
  s = s.replace(/>\s*Indore, India\s*</g, ">{footer.location}<")
  s = s.replace(/>\s*Indore, MP 452001\s*</g, ">{footer.address}<")
  s = s.replace(
    /© 2026 Vigorous Softech Systems Pvt Ltd\. All rights reserved\./g,
    "{footer.copyright}",
  )
  s = s.replace(/>\s*Get in Touch\s*</g, ">{footer.heading}<")
  write("FooterSection.tsx", s)
}

// --- Menu ---
{
  let s = read("MenuPanel.tsx")
  if (!s.includes("import { menu")) {
    s = s.replace(
      "/**\n * Exact Hanza",
      'import { menu } from "../content"\n\n/**\n * Exact Hanza',
    )
  }
  s = s.replace(/>\s*Ashish Gangrade\s*</g, ">{menu.profileName}<")
  s = s.replace(/>\s*CEO, Vigorous Softech\s*</g, ">{menu.profileRole}<")
  write("MenuPanel.tsx", s)
}

// --- Portfolio ---
{
  let s = read("PortfolioSection.tsx")
  if (!s.includes("import { portfolio")) {
    s = s.replace(
      '"use client"\n\n/**',
      '"use client"\n\nimport { portfolio } from "../content"\n\n/**',
    )
  }
  s = s.replace(/>\s*All Offerings\s*</g, ">{portfolio.sectionCta}<")
  s = s.replace(/>\s*GCC Solutions\s*</g, ">{portfolio.cards[0].name}<")
  s = s.replace(/>\s*Digital Services\s*</g, ">{portfolio.cards[1].name}<")
  // Third card if still something else
  write("PortfolioSection.tsx", s)
}

// --- Stats section ---
{
  let s = read("StatsSection.tsx")
  if (!s.includes("import { stats")) {
    s = s.replace(
      '"use client"\n\n/**',
      '"use client"\n\nimport { stats } from "../content"\n\n/**',
    )
  }
  s = s.replace(/>\s*Projects\s*</g, ">{stats.items[0].label}<")
  write("StatsSection.tsx", s)
}

console.log("v2 done")
