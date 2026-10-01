const fs = require('fs');

function reportLighthouse(file) {
    try {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        console.log(`\n=== Lighthouse Report: ${file} ===`);
        const scores = {
            Performance: Math.round(data.categories.performance.score * 100),
            Accessibility: Math.round(data.categories.accessibility.score * 100),
            BestPractices: Math.round(data.categories['best-practices'].score * 100),
            SEO: Math.round(data.categories.seo.score * 100),
        };
        console.log(scores);
        console.log('\nCore Web Vitals:');
        console.log('LCP:', data.audits['largest-contentful-paint'].displayValue);
        console.log('FCP:', data.audits['first-contentful-paint'].displayValue);
        console.log('TBT:', data.audits['total-blocking-time'].displayValue);
        console.log('CLS:', data.audits['cumulative-layout-shift'].displayValue);
        console.log('Speed Index:', data.audits['speed-index'].displayValue);
        console.log('TTI:', data.audits['interactive'].displayValue);
    } catch(e) {
        console.error(`Could not parse ${file}: ${e.message}`);
    }
}

reportLighthouse('lighthouse-mobile.json');
reportLighthouse('lighthouse-desktop.json');
