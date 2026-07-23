import puppeteer from 'puppeteer'

async function run() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  try {
    await page.goto('http://localhost:3000/blog/ai-workflow-automation-microsoft-power-platform', {
      waitUntil: 'networkidle2'
    })

    const headersInfo = await page.evaluate(() => {
      const headers = Array.from(document.querySelectorAll('header'))
      return headers.map((h, i) => {
        // Find all motion.div elements inside this header and get their opacity
        const motionDivs = Array.from(h.querySelectorAll('div'))
          .filter(d => d.style.opacity !== '')
          .map(d => ({
            className: d.className,
            opacity: window.getComputedStyle(d).opacity,
            styleOpacity: d.style.opacity,
            text: d.innerText.substring(0, 100)
          }))

        return {
          index: i,
          className: h.className,
          height: h.offsetHeight,
          opacity: window.getComputedStyle(h).opacity,
          motionDivsCount: motionDivs.length,
          motionDivs
        }
      })
    })

    console.log("Headers Info:")
    console.log(JSON.stringify(headersInfo, null, 2))

  } catch (err: any) {
    console.error(err)
  } finally {
    await browser.close()
  }
}

run()
