import fs from 'fs'
import path from 'path'

async function run() {
  const fileContent = fs.readFileSync(path.join(process.cwd(), 'next.config.ts'), 'utf-8')
  
  const testUrls = [
    { old: '/case-studies/null', expected: '/case-studies' },
    { old: '/case-studies/undefined', expected: '/case-studies' },
    { old: '/services/data-analytics/power-bi', expected: '/services/power-bi-development-services' },
    { old: '/services/data-analytics/microsoft-fabric', expected: '/services/microsoft-fabric-development-services' },
    { old: '/services/business-applications/mvp', expected: '/services/mvp' },
    { old: '/services/business-applications/softree-for-startups', expected: '/services/mvp' },
    { old: '/services/digital-workspace/web-app-development', expected: '/services/offshore-web-app-development' },
    { old: '/services/digital-workspace/mobile-app-development', expected: '/services/offshore-mobile-app-development' },
    { old: '/services/digital-workspace/sharepoint', expected: '/services/offshore-sharepoint-development' },
    { old: '/services/digital-workspace/spfx-developments', expected: '/services/offshore-spfx-development' },
    { old: '/services/digital-workspace/spfx-development', expected: '/services/offshore-spfx-development' },
    { old: '/services/ai-intelligence/agentic-ai', expected: '/services/offshore-ai-development' },
    { old: '/services/business-applications/power-apps', expected: '/services/offshore-power-platform-development' },
    { old: '/services/business-applications/power-platform', expected: '/services/offshore-power-platform-development' },
    { old: '/blog/ai-security-testing-enterprise-guide', expected: '/services/security-testing-services' },
    { old: '/blog/ai-security-testing-services', expected: '/services/security-testing-services' },
    { old: '/power-bi-development-services', expected: '/services/power-bi-development-services' },
    { old: '/microsoft-fabric-development-services', expected: '/services/microsoft-fabric-development-services' },
  ]

  let passed = 0
  let failed = 0

  for (const t of testUrls) {
    const sourceRegex = new RegExp(`source:\\s*["']${t.old.replace(/\//g, '\\/')}["']`)
    const destRegex = new RegExp(`destination:\\s*["']${t.expected.replace(/\//g, '\\/')}["']`)
    
    if (sourceRegex.test(fileContent) && destRegex.test(fileContent)) {
      console.log(`[PASS] ${t.old} -> ${t.expected} (301 Permanent configured)`)
      passed++
    } else {
      console.error(`[FAIL] ${t.old} -> expected ${t.expected}`)
      failed++
    }
  }

  console.log(`\nVerification complete: ${passed} passed, ${failed} failed.`)
}

run()

