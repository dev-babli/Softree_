import puppeteer from 'puppeteer'

async function run() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  try {
    await page.goto('http://localhost:3000/blog/ai-workflow-automation-microsoft-power-platform', {
      waitUntil: 'networkidle2'
    })

    const sectionsInfo = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('#content section'))
      return sections.map((s, i) => {
        // Find motion.div or elements with style opacity
        const animatedElements = Array.from(s.querySelectorAll('*'))
          .filter((el: any) => el.style.opacity !== '')
          .map((el: any) => ({
            tagName: el.tagName,
            className: el.className,
            styleOpacity: el.style.opacity,
            computedOpacity: window.getComputedStyle(el).opacity,
            text: el.innerText.substring(0, 50)
          }))

        return {
          sectionIndex: i,
          id: s.id,
          tagName: s.tagName,
          className: s.className,
          height: s.offsetHeight,
          computedOpacity: window.getComputedStyle(s).opacity,
          animatedElements
        }
      })
    })

    console.log("Sections Info:")
    console.log(JSON.stringify(sectionsInfo, null, 2))

  } catch (err: any) {
    console.error(err)
  } finally {
    await browser.close()
  }
}

run()
