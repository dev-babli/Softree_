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
      pages.push({ route, filePath: fullPath });
    }
  }
  return pages;
}

const pages = getAppPages();

const previewTestKeywords = [
  'test', 'preview', 'demo', 'showcase', 'record-slides', 'timeline-component', 'servicepage_new', 'wireframe', 'sentry-example', 'particle-preview'
];

const report = {
  productionPages: [],
  internalOrPreviewPages: [],
  missingMetadata: [],
  missingCanonical: [],
  noindexedPages: [],
};

pages.forEach(p => {
  const content = fs.readFileSync(p.filePath, 'utf8');
  const layoutPath = path.join(path.dirname(p.filePath), 'layout.tsx');
  const layoutContent = fs.existsSync(layoutPath) ? fs.readFileSync(layoutPath, 'utf8') : '';
  const combined = content + '\n' + layoutContent;

  const isPreviewOrTest = previewTestKeywords.some(k => p.route.toLowerCase().includes(k)) || p.route.startsWith('/studio');
  const hasMetadata = combined.includes('export const metadata') || combined.includes('generateMetadata') || combined.includes('export const generateMetadata');
  const hasNoIndex = combined.includes('index: false') || combined.includes('noindex') || combined.includes('robots: "noindex"');
  const canonicalMatch = combined.match(/canonical:\s*["'`]([^"'`]+)["'`]/) || combined.match(/canonical\s*=\s*["'`]([^"'`]+)["'`]/);
  const titleMatch = combined.match(/title:\s*["'`]([^"'`]+)["'`]/) || combined.match(/title:\s*\{/);
  const descMatch = combined.match(/description:\s*["'`]([^"'`]+)["'`]/);

  const info = {
    route: p.route,
    file: path.relative(path.resolve('.'), p.filePath).replace(/\\/g, '/'),
    isPreviewOrTest,
    hasMetadata,
    hasNoIndex,
    canonical: canonicalMatch ? canonicalMatch[1] : null,
    hasTitle: Boolean(titleMatch),
    hasDesc: Boolean(descMatch),
  };

  if (hasNoIndex) {
    report.noindexedPages.push(info);
  }

  if (isPreviewOrTest) {
    report.internalOrPreviewPages.push(info);
  } else {
    report.productionPages.push(info);
    if (!hasMetadata || (!info.hasTitle && !info.route.includes('['))) {
      report.missingMetadata.push(info);
    }
    if (!info.canonical && !info.route.includes('[')) {
      report.missingCanonical.push(info);
    }
  }
});

console.log(`====================================================`);
console.log(`TOTAL ROUTES AUDITED: ${pages.length}`);
console.log(`PRODUCTION PAGES: ${report.productionPages.length}`);
console.log(`INTERNAL / PREVIEW / TEST PAGES: ${report.internalOrPreviewPages.length}`);
console.log(`NOINDEX PAGES: ${report.noindexedPages.length}`);
console.log(`====================================================\n`);

console.log(`\n--- PRODUCTION PAGES MISSING EXPLICIT METADATA OR TITLE (${report.missingMetadata.length}) ---`);
report.missingMetadata.forEach(p => console.log(`  ${p.route} (${p.file})`));

console.log(`\n--- PRODUCTION PAGES MISSING EXPLICIT CANONICAL (${report.missingCanonical.length}) ---`);
report.missingCanonical.forEach(p => console.log(`  ${p.route}`));

console.log(`\n--- INTERNAL / PREVIEW / TEST PAGES THAT ARE INDEXABLE (MISSING NOINDEX) ---`);
const indexablePreview = report.internalOrPreviewPages.filter(p => !p.hasNoIndex);
console.log(`Found ${indexablePreview.length} preview/test pages that are NOT noindexed:`);
indexablePreview.forEach(p => console.log(`  ${p.route} (${p.file})`));
