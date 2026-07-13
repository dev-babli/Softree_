import fs from "node:fs"

function patch(file, pairs) {
  let s = fs.readFileSync(file, "utf8")
  let n = 0
  for (const [a, b] of pairs) {
    if (s.includes(a)) {
      const c = s.split(a).length - 1
      s = s.split(a).join(b)
      n += c
    }
  }
  fs.writeFileSync(file, s)
  console.log(file, n)
}

patch("src/components/client-exact/sections/ProcessSection.tsx", [
  [
    "I start by understanding your goals, audience, content, and the role your website needs to play. This gives the project a clear direction before any design work begins.",
    "{processCopy.steps[0].body}",
  ],
  [
    "I define the page structure, user flow, and key sections so the website feels easy to navigate. Every part is planned around clarity, hierarchy, and purpose.",
    "{processCopy.steps[1].body}",
  ],
  [
    "I create a clean visual direction with strong typography, spacing, layout, and interaction ideas. The goal is to make your website feel polished, modern, and aligned with your brand.",
    "{processCopy.steps[2].body}",
  ],
  [
    "I turn the design into a responsive Framer website with smooth interactions, clean components, and an easy-to-edit structure. Everything is built to work across desktop, tablet, and mobile.",
    "{processCopy.steps[3].body}",
  ],
  [
    "Before launch, I test the website, refine the details, set up basic SEO, and make sure everything feels ready. After that, your site is prepared to go live with confidence.",
    "{processCopy.steps[4].body}",
  ],
  [
    "Tell me about your project, your goals, and where you want the website to go.",
    "Tell us about your GCC or digital goals—and we’ll recommend a clear next step.",
  ],
  ["{processCopy.steps[0].title}", "{processCopy.steps[0].title}"], // noop keep
])

// Also wire step titles that may still be static
{
  let s = fs.readFileSync("src/components/client-exact/sections/ProcessSection.tsx", "utf8")
  const titlePairs = [
    ["Discovery Call", "{processCopy.steps[0].title}"],
    ["Visual Design", "{processCopy.steps[2].title}"],
    ["Framer Development", "{processCopy.steps[3].title}"],
    ["Launch & Handoff", "{processCopy.steps[4].title}"],
    ["Launch & Support", "{processCopy.steps[4].title}"],
  ]
  for (const [a, b] of titlePairs) {
    if (s.includes(a)) s = s.split(a).join(b)
  }
  fs.writeFileSync("src/components/client-exact/sections/ProcessSection.tsx", s)
}

patch("src/components/client-exact/sections/PricingSection.tsx", [
  [
    "For founders who need a strong foundation, clean design, and a professional website.",
    "A free intro to see if a GCC, Micro GCC, or digital engagement is the right fit.",
  ],
  [
    "For brands that need a complete website with stronger storytelling and more pages.",
    "A scoped workshop to map location, talent, controls, and shared vs dedicated paths.",
  ],
  [
    "For larger websites, digital products, or brands that need a fully custom design system.",
    "Custom GCC-as-a-Service, digital delivery, shared services, or advisory—after discovery.",
  ],
  ["Landing page or small website", "{pricing.cards[0].includes[0]}"],
  ["Multi-page website", "{pricing.cards[1].includes[1]}"],
  ["Full website strategy", "{pricing.cards[2].includes[0]}"],
  ["website with me.", "GCC fit check with leadership."],
])

patch("src/components/client-exact/sections/PortfolioSection.tsx", [
  [
    "a calm, editorial website for a wellness brand.",
    "{portfolio.cards[0].blurb}",
  ],
  [
    "a refined website for a modern technology brand, balancing clean storytelling.",
    "{portfolio.cards[1].blurb}",
  ],
])

patch("src/components/client-exact/sections/BlogSection.tsx", [
  [
    "./blog/what-makes-a-website-project-run-smoothly",
    "{blog.posts[0].href}",
  ],
  [
    "./blog/how-visual-direction-shapes-a-stronger-website",
    "{blog.posts[1].href}",
  ],
  ["./blog/building-better-websites-in-framer", "{blog.posts[2].href}"],
  [
    "How strong messaging, consistent visuals, and a focused website experience.",
    "How GCC-as-a-Service and colocation help mid-sized companies scale capability.",
  ],
])

// Fix blog hrefs - can't put {expr} inside href string without JSX
{
  let s = fs.readFileSync("src/components/client-exact/sections/BlogSection.tsx", "utf8")
  s = s.replaceAll('href="{blog.posts[0].href}"', "href={blog.posts[0].href}")
  s = s.replaceAll('href="{blog.posts[1].href}"', "href={blog.posts[1].href}")
  s = s.replaceAll('href="{blog.posts[2].href}"', "href={blog.posts[2].href}")
  fs.writeFileSync("src/components/client-exact/sections/BlogSection.tsx", s)
  console.log("blog hrefs fixed")
}

{
  let s = fs.readFileSync("src/components/client-exact/sections/FooterSection.tsx", "utf8")
  s = s.replace("Your Name", "{footer.form.nameLabel}")
  s = s.replace(
    'placeholder="I need a website ..."',
    'placeholder={footer.form.messagePlaceholder}',
  )
  s = s.replace(/Send Message/g, "{footer.form.submit}")
  if (!s.includes(footerPrivacySnippet(s))) {
    // add privacy near form if a privacy sentence exists
    s = s.replace(
      /By submitting[\s\S]{0,120}?\./,
      "{footer.form.privacy}",
    )
  }
  fs.writeFileSync("src/components/client-exact/sections/FooterSection.tsx", s)
  console.log("footer")
}

function footerPrivacySnippet(s) {
  return s.includes("{footer.form.privacy}")
}

console.log("v6 done")
