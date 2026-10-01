const fs = require('fs');

function analyzePerf(file) {
    try {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        console.log(`\n=== Performance Breakdown: ${file} ===`);
        
        const mainthread = data.audits['mainthread-work-breakdown'];
        if (mainthread && mainthread.details && mainthread.details.items) {
            console.log('Main-thread work:');
            mainthread.details.items.forEach(item => {
                console.log(`- ${item.groupLabel}: ${Math.round(item.duration)} ms`);
            });
        }
        
        const bootup = data.audits['bootup-time'];
        if (bootup && bootup.details && bootup.details.items) {
            console.log('\nLargest JS Execution Contributors:');
            bootup.details.items.slice(0, 5).forEach(item => {
                console.log(`- ${item.url}: ${Math.round(item.total)} ms`);
            });
        }

        const lcpElement = data.audits['largest-contentful-paint-element'];
        if (lcpElement && lcpElement.details && lcpElement.details.items) {
            console.log('\nLCP Element:');
            console.log(lcpElement.details.items[0].node.snippet);
        }

    } catch(e) {
        console.error(e.message);
    }
}

analyzePerf('lighthouse-mobile.json');
