const fs = require('fs');
const data = JSON.parse(fs.readFileSync('lighthouse-mobile.json', 'utf8'));

const bp = data.categories['best-practices'].auditRefs;
console.log('Failed Best Practices:');
bp.forEach(ref => {
    const audit = data.audits[ref.id];
    if (audit.score !== null && audit.score < 1) {
        console.log(`- ${audit.title} (${ref.id})`);
        if (audit.details && audit.details.items) {
            audit.details.items.forEach(item => {
                console.log(`  * ${item.url || item.source?.url || JSON.stringify(item)}`);
            });
        }
    }
});
