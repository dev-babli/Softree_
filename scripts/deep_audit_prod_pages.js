const fs = require('fs');
const path = require('path');

function getAppPages(dir = path.resolve('./src/app'), baseDir = dir) {
  let pages = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      pages = pages.concat(getAppPages(fullPath, baseDir));
    } else if (item === 'page.tsx' || item === 'page.ts') {
      const relDir = path.relative(baseDir, path.dirname(fullPath)).replace(/\\/g, '/');
      const route = relDir === '' ? '/' : `/${relDir}`;
      pages.push({ route, filePath: fullPath, dirPath: path.dirname(fullPath) });
    }
  }
  return pages;
}

const testPrefixes = [
  '/Scroll-hero-test',
  '/hero-test',
  '/human-head-hero-test',
  '/homepage-light-demo',
  '/particle-preview',
  '/record-slides',
  '/sentry-example-page',
  '/servicepage_new',
  '/story-reel-demo',
  '/timeline-component-05',
  '/demo-vigorous',
  '/wireframe',
  '/case-studies/preview',
  '/case-studies/layout-showcase',
  '/studio',
  '/industries/healthcare-ai-solutions/curtain-slider',
  '/services/ai-development-services/curtain-slider',
  '/showcase/'
];

const allPages = getAppPages();
const prodPages = [];
const testPages = [];

allPages.forEach(p => {
  if (testPrefixes.some(pre => p.route === pre || p.route.startsWith(pre))) {
    testPages.push(p);
  } else {
    prodPages.push(p);
  }
});

console.log(`Auditing ${prodPages.length} production pages:`);

const audit = prodPages.map(p => {
  const content = fs.readFileSync(p.filePath, 'utf8');
  const layoutFile = path.join(p.dirPath, 'layout.tsx');
  const layoutContent = fs.existsSync(layoutFile) ? fs.readFileSync(layoutFile, 'utf8') : '';
  const combined = content + '\n' + layoutContent;

  const hasGenMeta = combined.includes('generateMetadata');
  const titleMatch = combined.match(/title:\s*["']([^"']+)["']/);
  const descMatch = combined.match(/description:\s*["']([^"']+)["']/);
  const canonicalMatch = combined.match(/canonical:\s*["'`]([^"'`]+)["'`]/) || combined.match(/canonical\s*=\s*["'`]([^"'`]+)["'`]/);
  const hasOg = combined.includes('openGraph') || combined.includes('applyPageOg') || combined.includes('cmsPageMetadata');

  return {
    route: p.route,
    filePath: path.relative(path.resolve('.'), p.filePath).replace(/\\/g, '/'),
    hasGenMeta,
    title: titleMatch ? titleMatch[1] : (hasGenMeta ? '[dynamic]' : 'MISSING'),
    desc: descMatch ? (descMatch[1].slice(0, 40) + '...') : (hasGenMeta ? '[dynamic]' : 'MISSING'),
    canonical: canonicalMatch ? canonicalMatch[1] : (hasGenMeta ? '[dynamic]' : 'MISSING'),
    hasOg,
  };
});

audit.forEach(a => {
  const flags = [];
  if (a.title === 'MISSING') flags.push('NO_TITLE');
  if (a.desc === 'MISSING') flags.push('NO_DESC');
  if (a.canonical === 'MISSING') flags.push('NO_CANONICAL');
  if (!a.hasOg) flags.push('NO_OG');
  
  if (flags.length > 0) {
    console.log(`❌ ${a.route}: [${flags.join(', ')}] (file: ${a.filePath})`);
  } else {
    console.log(`✅ ${a.route} -> Canon: ${a.canonical}`);
  }
});
