import fs from "node:fs"

// Blog
{
  let s = fs.readFileSync("src/components/client-exact/sections/BlogSection.tsx", "utf8")
  if (!s.includes('import { blog }')) {
    s = s.replace('"use client"\n\n/**', '"use client"\n\nimport { blog } from "../content"\n\n/**')
  }
  s = s.replaceAll("What Makes A Website Project Run Smoothly", "{blog.posts[0].title}")
  s = s.replaceAll("How Visual Direction Shapes A Stronger Website", "{blog.posts[1].title}")
  s = s.replaceAll("Building Better Websites In Framer", "{blog.posts[2].title}")
  s = s.replace(/>\s*Blog\s*</, ">{blog.eyebrow}<")
  fs.writeFileSync("src/components/client-exact/sections/BlogSection.tsx", s)
  console.log("blog")
}

// Stats remaining fake
{
  let s = fs.readFileSync("src/components/client-exact/sections/StatsSection.tsx", "utf8")
  s = s.replace(/>\s*Impressions\s*</, ">{stats.items[2].label}<")
  s = s.replace(
    "Digital experiences seen across launches, campaigns, and brand touchpoints.",
    "{stats.items[2].body}",
  )
  s = s.replaceAll("55+", "{stats.items[0].value}")
  s = s.replace(
    /Projects delivered[\s\S]{0,120}?\./,
    "{stats.items[0].body}",
  )
  fs.writeFileSync("src/components/client-exact/sections/StatsSection.tsx", s)
  console.log("stats")
}

// FAQ remaining questions + empty answers
{
  let s = fs.readFileSync("src/components/client-exact/sections/FaqSection.tsx", "utf8")
  s = s.replace(
    "Can you redesign my existing website?",
    "{faq.items[3].q}",
  )
  s = s.replace(
    "Will I be able to edit the website myself?",
    "{faq.items[4].q}",
  )
  s = s.replace(
    "How do we start a project?",
    "{faq.items[4].q}",
  )
  // item 5 and 6 - find remaining static questions
  s = s.replace(
    "Do you offer ongoing support after launch?",
    "{faq.items[5].q}",
  )
  s = s.replace(
    "What’s your typical project timeline?",
    "{faq.items[2].q}",
  )

  // Fill empty content self-closing tags with answers (items 1-5)
  // Pattern: after faq.items[N].q ... <div className="framer-8povta" ... />
  // Replace self-closing Content with answer block for closed items
  let ansIdx = 1
  s = s.replace(
    /<div className="framer-8povta" data-framer-name="Content" style=\{\{ opacity: "1" \}\} \/>/g,
    () => {
      const i = Math.min(ansIdx, 5)
      ansIdx++
      return `<div className="framer-8povta" data-framer-name="Content" style={{ opacity: "1" }}>
                    <div className="framer-d4bffu" data-framer-name="Inner" style={{ opacity: "1" }}>
                      <div className="framer-ukmnwa" data-framer-name="Text" data-framer-component-type="RichTextContainer" style={{ ["--framer-paragraph-spacing"]: "0px", transform: "none", opacity: "1" }}>
                        <p dir="auto" className="framer-text framer-styles-preset-21ogod">
                          {faq.items[${i}].a}
                        </p>
                      </div>
                    </div>
                  </div>`
    },
  )
  fs.writeFileSync("src/components/client-exact/sections/FaqSection.tsx", s)
  console.log("faq")
}

// Services accordion titles if still Design/Development
{
  let s = fs.readFileSync("src/components/client-exact/sections/ServicesSection.tsx", "utf8")
  // First accordion title often "Brand Strategy" or similar near line 479
  const titles = [
    [/>\s*Brand Strategy\s*</, ">{services.items[0].title}<"],
    [/>\s*Design\s*</, ">{services.items[1].title}<"],
    [/>\s*Development\s*</, ">{services.items[2].title}<"],
    [/>\s*Marketing &amp; SEO\s*</, ">{services.items[3].title}<"],
  ]
  for (const [re, rep] of titles) s = s.replace(re, rep)
  fs.writeFileSync("src/components/client-exact/sections/ServicesSection.tsx", s)
  console.log("services")
}

console.log("done")
