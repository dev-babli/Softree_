const fs = require('fs');
const data = JSON.parse(fs.readFileSync('lighthouse-mobile.json', 'utf8'));

const images = data.audits['uses-optimized-images'];
if (images && images.details && images.details.items) {
    console.log('Unoptimized images:');
    images.details.items.forEach(i => console.log(i.url, i.wastedBytes));
}

const offscreen = data.audits['offscreen-images'];
if (offscreen && offscreen.details && offscreen.details.items) {
    console.log('\nOffscreen images (not lazy loaded):');
    offscreen.details.items.forEach(i => console.log(i.url, i.wastedBytes));
}

const unsized = data.audits['unsized-images'];
if (unsized && unsized.details && unsized.details.items) {
    console.log('\nUnsized images:');
    unsized.details.items.forEach(i => console.log(i.url));
}
