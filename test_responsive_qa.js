const puppeteer = require('puppeteer');
const fs = require('fs');

function getBrowserPath() {
  const paths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];
  for (const p of paths) {
    if (fs.existsSync(p)) return p;
  }
  return undefined;
}

async function testPage() {
  const execPath = getBrowserPath();
  console.log('Using browser executable:', execPath);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: execPath,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const viewports = [
    { name: 'Mobile XS', width: 375, height: 667 },
    { name: 'Mobile SM', width: 390, height: 844 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop HD', width: 1280, height: 800 },
    { name: 'Desktop FHD', width: 1440, height: 900 },
    { name: 'Desktop QHD', width: 1920, height: 1080 }
  ];

  console.log('\n=== 1. CONSOLE & NETWORK ASSETS AUDIT ===');
  const page = await browser.newPage();

  const consoleLogs = [];
  const consoleErrors = [];
  const failedRequests = [];
  const mediaRequests = [];

  page.on('console', msg => {
    const text = msg.text();
    if (msg.type() === 'error') {
      consoleErrors.push(text);
    } else {
      consoleLogs.push(`[${msg.type()}] ${text}`);
    }
  });

  page.on('requestfailed', req => {
    failedRequests.push({
      url: req.url(),
      failure: req.failure() ? req.failure().errorText : 'unknown'
    });
  });

  page.on('response', res => {
    const status = res.status();
    const url = res.url();
    if (status >= 400) {
      failedRequests.push({ url, status });
    }
    if (url.match(/\.(png|jpg|jpeg|svg|webp|avif|mp4|webm|woff2?|ttf)/i)) {
      mediaRequests.push({ url, status });
    }
  });

  await page.goto('http://localhost:3005/services/power-bi-development-services', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  console.log('Console Errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  } else {
    console.log('Zero console/hydration errors detected.');
  }

  console.log('\nFailed Network Requests (404/500):', failedRequests.length);
  if (failedRequests.length > 0) {
    console.log('Failed:', failedRequests);
  } else {
    console.log('Zero 404/failed network requests detected.');
  }

  console.log('Media assets successfully loaded:', mediaRequests.length);

  console.log('\n=== 2. RESPONSIVE VIEWPORT & OVERFLOW AUDIT ===');
  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await new Promise(r => setTimeout(r, 400));

    const overflow = await page.evaluate(() => {
      return {
        bodyScrollWidth: document.body.scrollWidth,
        windowInnerWidth: window.innerWidth,
        hasOverflow: document.body.scrollWidth > window.innerWidth,
        htmlScrollWidth: document.documentElement.scrollWidth,
        htmlClientWidth: document.documentElement.clientWidth
      };
    });

    const isPass = !overflow.hasOverflow && overflow.htmlScrollWidth <= vp.width;
    console.log(`Viewport ${vp.width}px (${vp.name}): ${isPass ? 'PASS' : 'FAIL'} (scrollWidth: ${overflow.bodyScrollWidth}px / viewport: ${vp.width}px)`);
  }

  console.log('\n=== 3. INTERACTIVE ELEMENTS & DOM QA ===');
  const domQa = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
      tag: h.tagName,
      text: h.innerText.trim().slice(0, 50)
    }));

    const buttons = Array.from(document.querySelectorAll('button')).map(b => ({
      ariaLabel: b.getAttribute('aria-label'),
      text: b.innerText.trim(),
      hasName: Boolean(b.innerText.trim() || b.getAttribute('aria-label'))
    }));

    const links = Array.from(document.querySelectorAll('a')).map(a => ({
      href: a.getAttribute('href'),
      text: a.innerText.trim(),
      ariaLabel: a.getAttribute('aria-label')
    }));

    const images = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      alt: img.alt,
      hasAlt: Boolean(img.alt !== undefined && img.alt !== null)
    }));

    const forms = Array.from(document.querySelectorAll('form')).map(f => {
      const inputs = Array.from(f.querySelectorAll('input:not([type="hidden"]), textarea, select'));
      return {
        inputCount: inputs.length,
        unlabeledInputs: inputs.filter(inp => {
          const id = inp.getAttribute('id');
          const hasLabel = id ? Boolean(document.querySelector(`label[for="${id}"]`)) : false;
          const hasAriaLabel = Boolean(inp.getAttribute('aria-label') || inp.getAttribute('aria-labelledby'));
          return !hasLabel && !hasAriaLabel;
        }).length
      };
    });

    return {
      h1Count: headings.filter(h => h.tag === 'H1').length,
      headingsTotal: headings.length,
      buttonsTotal: buttons.length,
      buttonsWithoutName: buttons.filter(b => !b.hasName).length,
      linksTotal: links.length,
      imagesTotal: images.length,
      imagesWithoutAlt: images.filter(img => !img.hasAlt).length,
      formsTotal: forms.length,
      unlabeledFormInputs: forms.reduce((acc, f) => acc + f.unlabeledInputs, 0)
    };
  });

  console.log('H1 Count (must be exactly 1):', domQa.h1Count);
  console.log('Total Headings:', domQa.headingsTotal);
  console.log('Total Buttons:', domQa.buttonsTotal);
  console.log('Buttons without accessible name:', domQa.buttonsWithoutName);
  console.log('Total Images:', domQa.imagesTotal);
  console.log('Images without alt attribute:', domQa.imagesWithoutAlt);
  console.log('Total Links:', domQa.linksTotal);
  console.log('Unlabeled form inputs:', domQa.unlabeledFormInputs);

  await browser.close();
}

testPage().catch(console.error);
