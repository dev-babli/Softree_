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

async function countImages() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: getBrowserPath(),
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3005/services/power-bi-development-services', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  const images = await page.evaluate(() => {
    // Find header/nav, contact section, and footer elements to exclude
    const nav = document.querySelector('header, nav, [class*="navigation"]');
    const footer = document.querySelector('footer');
    // Contact section usually has id or class or text
    const contact = document.querySelector('[class*="LightContactSection"], [class*="contact"], section:has(form)');

    const allImgs = Array.from(document.querySelectorAll('img'));

    const filtered = allImgs.filter(img => {
      if (nav && nav.contains(img)) return false;
      if (footer && footer.contains(img)) return false;
      if (contact && contact.contains(img)) return false;
      // Also check if inside a section containing a form
      const parentSection = img.closest('section');
      if (parentSection && parentSection.querySelector('form')) return false;
      return true;
    });

    return filtered.map(img => {
      const src = img.getAttribute('src') || img.currentSrc || img.src;
      const cleanSrc = src.split('?')[0];
      const extMatch = cleanSrc.match(/\.(png|jpg|jpeg|webp|svg|gif|avif)$/i);
      const ext = extMatch ? extMatch[1].toLowerCase() : 'other';
      return {
        src,
        cleanSrc,
        ext,
        alt: img.alt || '',
        parentTag: img.parentElement ? img.parentElement.tagName : '',
        sectionClass: img.closest('section') ? img.closest('section').className.slice(0, 50) : ''
      };
    });
  });

  console.log(`Total images found (excluding Navbar, Contact, Footer): ${images.length}\n`);

  const pngImages = images.filter(img => img.ext === 'png' || img.cleanSrc.endsWith('.png'));
  const jpgImages = images.filter(img => img.ext === 'jpg' || img.ext === 'jpeg' || img.cleanSrc.endsWith('.jpg') || img.cleanSrc.endsWith('.jpeg'));
  const otherImages = images.filter(img => !pngImages.includes(img) && !jpgImages.includes(img));

  console.log(`=== PNG Images (${pngImages.length}) ===`);
  pngImages.forEach((img, i) => console.log(`${i + 1}. [PNG] ${img.cleanSrc} (alt: "${img.alt}")`));

  console.log(`\n=== JPG/JPEG Images (${jpgImages.length}) ===`);
  jpgImages.forEach((img, i) => console.log(`${i + 1}. [JPG] ${img.cleanSrc} (alt: "${img.alt}")`));

  console.log(`\n=== Other Format Images (${otherImages.length}) ===`);
  otherImages.forEach((img, i) => console.log(`${i + 1}. [${img.ext.toUpperCase()}] ${img.cleanSrc} (alt: "${img.alt}")`));

  console.log(`\n========================================`);
  console.log(`Total PNG + JPG/JPEG Images: ${pngImages.length + jpgImages.length}`);
  console.log(`- PNG: ${pngImages.length}`);
  console.log(`- JPG/JPEG: ${jpgImages.length}`);
  console.log(`========================================`);

  await browser.close();
}

countImages().catch(console.error);
