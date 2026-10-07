const fs = require('fs');
const path = require('path');

function getAppPages(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAppPages(filePath, baseDir));
    } else if (file === 'page.tsx' || file === 'page.ts') {
      const rel = path.relative(baseDir, filePath).replace(/\\/g, '/');
      results.push({ rel, filePath });
    }
  });
  return results;
}

const pages = getAppPages(path.resolve('./src/app'));
const clientPagesWithMeta = [];

pages.forEach(p => {
  const content = fs.readFileSync(p.filePath, 'utf8');
  const isClient = content.includes('"use client"') || content.includes("'use client'");
  const hasMeta = content.includes('export const metadata') || content.includes('export const generateMetadata');
  if (isClient && hasMeta) {
    clientPagesWithMeta.push(p);
  }
});

console.log(`Found ${clientPagesWithMeta.length} client pages exporting metadata:`);
clientPagesWithMeta.forEach(p => console.log(' - ' + p.rel));

// For each client page with metadata, create/update a sibling layout.tsx for the metadata, and remove export const metadata from page.tsx!
clientPagesWithMeta.forEach(p => {
  let content = fs.readFileSync(p.filePath, 'utf8');
  const dir = path.dirname(p.filePath);
  const layoutPath = path.join(dir, 'layout.tsx');

  // Extract metadata block
  const metaMatch = content.match(/export const metadata[^=]*=\s*(\{[\s\S]*?\n\};?)/);
  if (metaMatch) {
    const metaObj = metaMatch[0];
    
    // Create layout.tsx if it does not exist
    if (!fs.existsSync(layoutPath)) {
      const layoutContent = `import type { Metadata } from "next";\n\n${metaObj}\n\nexport default function Layout({ children }: { children: React.ReactNode }) {\n  return <>{children}</>;\n}\n`;
      fs.writeFileSync(layoutPath, layoutContent, 'utf8');
      console.log(`Created layout.tsx for ${p.rel}`);
    }

    // Remove export const metadata from client page.tsx
    content = content.replace(metaMatch[0], '');
    // Clean up unused import type { Metadata } if needed
    content = content.replace(/import\s+(type\s+)?\{\s*Metadata\s*\}\s+from\s+["']next["'];?\n?/g, '');
    fs.writeFileSync(p.filePath, content, 'utf8');
    console.log(`Removed metadata export from client page: ${p.rel}`);
  }
});
