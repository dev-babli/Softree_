/**
 * CONTENT-ONLY Vigorous copy — string replacements inside existing JSX.
 * Never adds/removes elements, imports, or collapses letter-split spans.
 */
import fs from "node:fs"
import path from "node:path"

const dir = "src/components/client-exact/sections"

/** Replace N sequential single-char letter spans starting at anchor */
function replaceLetterRun(source, anchor, newText, spanCount) {
  let i = source.indexOf(anchor)
  if (i < 0) return source
  const chars = [...newText.padEnd(spanCount, " ").slice(0, spanCount)]
  let pos = i + anchor.length
  let replaced = 0
  while (replaced < spanCount && pos < source.length) {
    const open = source.indexOf('style={{ display: "inline-block", willChange: "transform" }}>', pos)
    if (open < 0) break
    const contentStart = source.indexOf(">", open) + 1
    const contentEnd = source.indexOf("</span>", contentStart)
    if (contentEnd < 0) break
    const inner = source.slice(contentStart, contentEnd)
    if (!/^[\s\S]{0,3}$/.test(inner)) {
      pos = contentEnd
      continue
    }
    source = source.slice(0, contentStart) + `\n                      ${chars[replaced]}\n                    ` + source.slice(contentEnd)
    pos = contentStart + chars[replaced].length + 30
    replaced++
  }
  return source
}

const pairs = [
  // Brand / people
  ["Hanza Novák ", "Ashish Gangrade "],
  ["Hanza Novák", "Ashish Gangrade"],
  ["HaNZA Novák ", "Ashish Gangrade "],
  ["Designer &amp; Framer Expert", "CEO, Vigorous Softech"],
  ["Designer & Framer Expert", "CEO, Vigorous Softech"],
  ["Prague, Czechia", "Indore, India"],
  ["120 00 Prague", "Indore, MP 452001"],
  ["/Hanza", "/Vigorous"],
  ["Start Project", "Book Intro"],
  ["Get in Touch", "Book Intro"],
  ["© 2026 HANZA®", "© 2026 Vigorous Softech Systems Pvt Ltd. All rights reserved."],
  ['alt="Gola Templates"', 'alt="Vigorous Softech"'],
  ["Goodwell", "GCC Solutions"],
  ["Ikigai", "Digital Services"],
  ["All Projects", "All Offerings"],
  ["View Project", "Explore"],
  ["See Project", "Book a GCC fit check"],
  ["My Mission", "Our Mission"],
  // Stats / proof (honest)
  ["122+", "24+"],
  ["128k", "Tier 2/3"],
  ["4.2M", "GCC"],
  ["122+ Founders", "Leadership perspective"],
  ["Founder at Goodwell", "CEO, Vigorous Softech"],
  ["Founder at Ikigai Labs", "Vigorous Softech · GCC practice"],
  ["David Klein", "Ashish Gangrade"],
  ["Anna Marek", "Ashish Gangrade"],
  // Pricing (no $)
  ["$3,500", "Free"],
  ["$7,500", "Scoped"],
  ["$12,500", "Custom"],
  ["Premium", "Discovery call"],
  ["For founders who need a strong foundation, clean design, and a professional website.", "A free intro to see if a GCC, Micro GCC, or digital engagement is the right fit."],
  ["For brands that need a complete website with stronger storytelling and more pages.", "A scoped workshop to map location, talent, controls, and shared vs dedicated paths."],
  ["For larger websites, digital products, or brands that need a fully custom design system.", "Custom GCC-as-a-Service, digital delivery, shared services, or advisory—after discovery."],
  ["Landing page or small website", "30–45 min fit conversation"],
  ["Multi-page website", "Talent & controls checklist"],
  ["Full website strategy", "GCC-as-a-Service path"],
  // Process bodies
  ["I start by understanding your goals, audience, content, and the role your website needs to play. This gives the project a clear direction before any design work begins.", "Free intro: goals, constraints, and whether a GCC, Micro GCC, or digital engagement fits."],
  ["I define the page structure, user flow, and key sections so the website feels easy to navigate. Every part is planned around clarity, hierarchy, and purpose.", "Define towers, governance, Tier 2/3 location logic, and what we enable vs what you own."],
  ["I create a clean visual direction with strong typography, spacing, layout, and interaction ideas. The goal is to make your website feel polished, modern, and aligned with your brand.", "Stand up the foundation—workspace path, hiring plan, and process readiness for go-live."],
  ["I turn the design into a responsive Framer website with smooth interactions, clean components, and an easy-to-edit structure. Everything is built to work across desktop, tablet, and mobile.", "Run agreed IT, digital, or business shared-services work under the defined operating model."],
  ["Before launch, I test the website, refine the details, set up basic SEO, and make sure everything feels ready. After that, your site is prepared to go live with confidence.", "Review against agreed measures, tighten governance, and decide what to expand next."],
  ["Project Direction", "Scope & Fit Assessment"],
  ["Website Blueprint", "Operating Model & Location Plan"],
  ["Visual System", "Setup & Colocation Readiness"],
  ["Tell me about your project, your goals, and where you want the website to go.", "Tell us about your GCC or digital goals—and we'll recommend a clear next step."],
  // Services accordion titles
  ["Brand Strategy", "Global Capability Centre (GCC)"],
  ["Design", "Business Advisory"],
  ["Development", "Shared Services"],
  ["Marketing &amp; SEO", "Digital Services"],
  // FAQ
  ["What do you offeR?", "What does Vigorous Softech do?"],
  ["What do you offer?", "What does Vigorous Softech do?"],
  ["Do you only work with Framer?", "What is your GCC model?"],
  ["How long does a project take?", "Where do you operate from?"],
  ["Can you redesign my existing website?", "Who leads the practice?"],
  ["Will I be able to edit the website myself?", "How do engagements start?"],
  ["How do we start a project?", "How do engagements start?"],
  ["Do you offer ongoing support after launch?", "Which industries do you serve?"],
  ["I design and build custom websites in Framer for founders, studios, and modern brands. My work usually includes strategy, creative direction, UX/UI design, responsive Framer development, basic SEO setup, and launch support.", "We provide IT consulting, business advisory, custom software, shared services, and GCC setup support—helping organizations build capability using talent from India's Tier 2 and Tier 3 cities."],
  // Testimonials (CEO excerpt only)
  ["Hanza understood our vision immediately and turned it into a website that feels sharp, simple, and easy to use. The whole process was clear from start to finish.", "Vigorous Softech is committed to delivering innovative, scalable solutions while tapping into the untapped potential of Tier 2 and Tier 3 cities in India—contributing to regional growth and job creation."],
  ["Working with Hanza felt effortless. He brought structure to our ideas and delivered a polished website that looks premium on every screen.", "Vigorous Softech is committed to delivering innovative, scalable solutions while tapping into the untapped potential of Tier 2 and Tier 3 cities in India—contributing to regional growth and job creation."],
  ["Fast, precise, and highly reliable. The final website gave our brand a much stronger online presence and made our message much easier to understand.", "Vigorous Softech is committed to delivering innovative, scalable solutions while tapping into the untapped potential of Tier 2 and Tier 3 cities in India—contributing to regional growth and job creation."],
  // Portfolio blurbs
  ["a calm, editorial website for a wellness brand.", "Build, scale, and operate GCCs via Colocation-as-a-Service."],
  ["a refined website for a modern technology brand, balancing clean storytelling.", "Cloud, AI/ML, analytics, cybersecurity, and custom software."],
  // Blog
  ["What Makes A Website Project Run Smoothly", "GCC-as-a-Service and GCC Colocation"],
  ["How Visual Direction Shapes A Stronger Website", "Tier-2 Cities: The Gamechanger for GCC Colocation"],
  ["Building Better Websites In Framer", "How AI and Agentic Workforce Capabilities Transform Growth"],
  // Case study
  ["The website created a stronger first impression and brought more attention to the launch.", "GCCs help mid-sized global companies scale operations while focusing on core strengths—colocation and GCC-as-a-Service make that path more accessible."],
  // About greeting fragments (word spans preserved)
  ["Ahoj,", "Hello."],
  ["Hanza.", "Vigorous."],
  ["Digital projects shaped from early concept to polished website.", "Leadership experience across consulting, IT, and digital transformation."],
  ["Websites developed in Framer with clean structure and smooth motion.", "Capability built around emerging-city talent and cost-effective delivery."],
  ["Years of experience across digital design, web development, and visual systems.", "Colocation-as-a-Service and GCC-as-a-Service engagement paths."],
  ["Projects", "Years"],
  ["Websites", "Focus"],
  ["84+", "Tier 2/3"],
  ["12+", "GCC"],
  // Footer form (literal — no import change if already literal)
  ["Your Name", "Your name"],
  ["Jane Smith", "Your name"],
  ["jane@framer.com", "you@company.com"],
  ['placeholder="I need a website ..."', 'placeholder="Tell us about your GCC or digital goals…"'],
  ["Send Message", "Book a free intro"],
  // Services sidebar
  ["Plan Your", "Book a"],
  ["Next Website", "free intro"],
  ["with", "for your"],
  ["Me.", "GCC."],
  ["Book a Call", "Book Intro"],
  // About greeting
  ["I'm", "We're"],
  ["I’m", "We're"],
  // Stats (honest)
  ["55+", "24+"],
  ["435k", "CoE"],
  ["Visitors", "Talent"],
  ["Impressions", "GCC"],
  ["Interactions", "Advisory"],
  ["Focus designed to create clear journeys, stronger engagement, and better first impressions.", "Capability built around emerging-city talent and cost-effective delivery."],
  ["Digital experiences seen across launches, campaigns, and brand touchpoints.", "Colocation-as-a-Service and GCC-as-a-Service engagement paths."],
  ["Focus, landing pages, and Framer builds created for founders, studios, and modern brands.", "Leadership experience across consulting, IT, and digital transformation."],
  ["User moments shaped through clean layouts, smooth motion, and thoughtful interface design.", "IT consulting, advisory, software, and shared services for growing enterprises."],
  // Testimonials (missed quote)
  ["The design direction was exactly what we needed. Clean layouts, smooth interactions, and a Framer build we can actually manage ourselves.", "Vigorous Softech is committed to delivering innovative, scalable solutions while tapping into the untapped potential of Tier 2 and Tier 3 cities in India—contributing to regional growth and job creation."],
  // About card copy
  ["Brands, founders, and studios supported from early idea to final launch.", "Enterprises exploring GCC, Micro GCC, and digital capability from Central India."],
  ["48+", "GCC"],
  // Pricing eyebrow
  ["                    Pricing\n", "                    Engage\n"],
]

for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".tsx"))) {
  if (f === "HeroSection.tsx" || f === "TopBarSection.tsx") continue // content via content.ts
  const p = path.join(dir, f)
  let s = fs.readFileSync(p, "utf8")
  let n = 0
  for (const [a, b] of pairs) {
    const c = s.split(a).length - 1
    if (c) {
      s = s.split(a).join(b)
      n += c
    }
  }
  if (n) fs.writeFileSync(p, s)
  console.log(f, n)
}

// Pricing headline letter spans: "Website" + "Packages." → "Ways to " + "start."
// (handled via targeted edits in PricingSection.tsx — skip auto letter run)

// Process headline: "Launch." → "Fit."
// (handled via targeted edits in ProcessSection.tsx — skip auto letter run)

// About card 01 label: Projects→Years (Model only on 03)
{
  const p = path.join(dir, "AboutSection.tsx")
  let s = fs.readFileSync(p, "utf8")
  s = s.replace(
    /(>\s*01\s*<\/p>[\s\S]*?framer-styles-preset-1gjw9wk[\s\S]*?>\s*)Model(\s*<\/p>)/,
    "$1Years$2",
  )
  fs.writeFileSync(p, s)
  console.log("about card01 Years")
}

// About mission word-reveal: swap span text only (same DOM)
{
  const p = path.join(dir, "AboutSection.tsx")
  let s = fs.readFileSync(p, "utf8")
  const anchor = "framer-styles-preset-b6i87h"
  const m = s.indexOf(anchor)
  if (m >= 0) {
    const pStart = s.lastIndexOf("<p ", m)
    const pEnd = s.indexOf("</p>", m)
    const before = s.slice(0, pStart)
    let block = s.slice(pStart, pEnd)
    const after = s.slice(pEnd)
    const text =
      "Hello. We're Vigorous. We drive digital transformation and growth by harnessing talent in India's Tier 2 and Tier 3 cities—IT consulting, advisory, software, and GCC services that help enterprises operate smarter. Building an innovative GCC capability in Central India."
    const words = text.split(/\s+/)
    let wi = 0
    block = block.replace(
      /<span style=\{\{ display: "inline", opacity: "1", willChange: "opacity" \}\}>[\s\S]*?<\/span>/g,
      () => {
        const w = words[wi] ?? ""
        wi++
        return `<span style={{ display: "inline", opacity: "1", willChange: "opacity" }}>\n                    ${w}\n                  </span>`
      },
    )
    fs.writeFileSync(p, before + block + after)
    console.log("about word-reveal", wi, "spans")
  }
}

// Fix duplicate Premium → tier names (2nd/3rd cards)
{
  const p = path.join(dir, "PricingSection.tsx")
  let s = fs.readFileSync(p, "utf8")
  let i = 0
  s = s.replace(/Discovery call/g, () => {
    i++
    if (i === 2) return "GCC readiness workshop"
    if (i === 3) return "Custom proposal"
    return "Discovery call"
  })
  fs.writeFileSync(p, s)
}

console.log("content-only done")
