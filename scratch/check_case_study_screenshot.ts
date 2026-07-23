import puppeteer from 'puppeteer'

async function run() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })

  try {
    console.log("Navigating to case study page...")
    await page.goto('http://localhost:3000/case-studies/healthcare-revenue-cycle-intelligence-dashboard', {
      waitUntil: 'networkidle2'
    })

    // Take screenshot of the hero area
    await page.screenshot({ path: 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\77d28267-8dc1-421b-9a20-67b61d5d970d\\case_study_hero_screenshot.png' })
    console.log("Screenshot saved successfully.")

  } catch (err: any) {
    console.error(err)
  } finally {
    await browser.close()
  }
}

run()
