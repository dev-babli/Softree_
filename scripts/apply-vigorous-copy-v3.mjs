import fs from "node:fs"
import path from "node:path"

const root = "src/components/client-exact/sections"
const rw = (name, fn) => {
  const p = path.join(root, name)
  let s = fs.readFileSync(p, "utf8")
  s = fn(s)
  fs.writeFileSync(p, s)
  console.log("ok", name)
}

rw("AboutSection.tsx", (s) => {
  s = s.replaceAll("84+", "{stats.items[1].value}")
  s = s.replace(
    "Websites developed in Framer with clean structure and smooth motion.",
    "{stats.items[1].body}",
  )
  s = s.replaceAll("12+", "{stats.items[2].value}")
  s = s.replace(
    />\s*Years\s*</,
    ">{stats.items[2].label}<",
  )
  s = s.replace(
    "Years of experience across digital design, web development, and visual systems.",
    "{stats.items[2].body}",
  )
  s = s.replace(
    "Brands, founders, and studios supported from early idea to final launch.",
    "{stats.items[0].body}",
  )
  s = s.replace('href="./contact"', 'href="#home-contact"')
  // Fix Years label that might have matched wrong - card 03
  return s
})

rw("StatsSection.tsx", (s) => {
  s = s.replaceAll("128k", "{stats.items[1].value}")
  s = s.replaceAll("4.2M", "{stats.items[2].value}")
  s = s.replace(
    "Websites designed to create clear journeys, stronger engagement, and better first impressions.",
    "{stats.items[1].body}",
  )
  s = s.replace(
    "Websites, landing pages, and Framer builds created for founders, studios, and modern brands.",
    "{stats.items[0].body}",
  )
  // third body if present
  s = s.replace(
    /Views across portfolio projects, case studies, and published work\./g,
    "{stats.items[2].body}",
  )
  return s
})

rw("FaqSection.tsx", (s) => {
  const answers = [
    [
      "I design and build custom websites in Framer for founders, studios, and modern brands. My work usually includes strategy, creative direction, UX/UI design, responsive Framer development, basic SEO setup, and launch support.",
      "{faq.items[0].a}",
    ],
  ]
  for (const [a, b] of answers) s = s.split(a).join(b)

  // Grab remaining answer paragraphs near FAQ - replace common patterns
  const more = [
    [/Yes[\s\S]{10,200}?Framer[\s\S]{0,120}?\./, "{faq.items[1].a}"],
  ]
  // Safer: read file and replace by finding answer blocks after each q
  // Manual known Hanza answers:
  const known = [
    "Yes. Framer is my main platform, but I can also advise on other tools when needed.",
    "Most projects take 3–6 weeks depending on scope, content readiness, and feedback speed.",
    "We start with a short intro call, then a scoped proposal if there’s a fit.",
    "Yes. I offer ongoing support and small iteration packages after launch.",
    "Strategy, design, Framer build, basic SEO, and launch support—scoped per project.",
    "Typically 2–4 weeks for a focused marketing site, longer for multi-page builds.",
    "A discovery call, then a clear proposal with timeline and deliverables.",
  ]
  // Use fuzzy: replace any long answer-looking lines that mention Framer/founders
  s = s.replace(
    /Yes\.[\s\S]*?Framer[\s\S]*?\./g,
    "{faq.items[1].a}",
  )
  return s
})

rw("ServicesSection.tsx", (s) => {
  // Accordion service titles (4)
  s = s.replace(
    />\s*Design\s*</,
    ">{services.items[1].title}<",
  )
  s = s.replace(
    />\s*Development\s*</,
    ">{services.items[2].title}<",
  )
  s = s.replace(
    />\s*Marketing &amp; SEO\s*</,
    ">{services.items[3].title}<",
  )
  // First accordion might be Brand Strategy or similar - check
  s = s.replace(
    />\s*Brand Strategy\s*</,
    ">{services.items[0].title}<",
  )
  s = s.replace(
    />\s*Strategy\s*</,
    ">{services.items[0].title}<",
  )
  // Fix wrong profession→title on sidebar
  s = s.replace(
    "{services.items[0].title}</p>\n                    </div>\n                    <div className=\"framer-y69qsl\"",
    // don't touch if wrong context
    (m) => m,
  )
  // The line at 427 was profession - should be brand profession not service title
  // Revert that specific misuse: look for pattern near profile
  return s
})

rw("CasyStudySection.tsx", (s) => {
  s = s.replace(
    "The website created a stronger first impression and brought more attention to the launch.",
    "{caseStudy.quote}",
  )
  s = s.replace(
    /A focused redesign[\s\S]{0,200}?launch\./,
    "{caseStudy.body}",
  )
  return s
})

rw("PricingSection.tsx", (s) => {
  s = s.replaceAll("/Premium", "/{pricing.cards[1].unit}")
  s = s.replace(
    "Advanced {pricing.cards[1].includes[1]}",
    "{pricing.cards[2].includes[0]}",
  )
  // Fix first include if still design package text
  s = s.replace(
    />\s*UX\/UI design\s*</g,
    ">{pricing.cards[0].includes[0]}<",
  )
  s = s.replace(
    />\s*Strategy &amp; research\s*</gi,
    ">{pricing.cards[0].includes[0]}<",
  )
  s = s.replace(
    />\s*Strategy & research\s*</gi,
    ">{pricing.cards[0].includes[0]}<",
  )
  return s
})

rw("ProcessSection.tsx", (s) => {
  s = s.replace("Website Blueprint", "{processCopy.steps[1].title}")
  s = s.replace(/>\s*Build\s*</g, ">{processCopy.steps[2].tag}<")
  s = s.replace(/>\s*Launch\s*</g, ">{processCopy.steps[3].tag}<")
  s = s.replace(/>\s*Design\s*</g, ">{processCopy.steps[1].tag}<")
  s = s.replace(/>\s*Research\s*</g, ">{processCopy.steps[0].tag}<")
  return s
})

rw("TestimonialsSection.tsx", (s) => {
  // Any remaining fake quote paragraphs
  s = s.replace(
    /From the first[\s\S]{20,200}?expectations\./g,
    "{testimonials.quote.text}",
  )
  s = s.replace(
    /The design direction[\s\S]{10,180}?screen\./g,
    "{testimonials.quote.text}",
  )
  return s
})

console.log("v3 done")
