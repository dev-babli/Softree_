import fs from 'node:fs';

const h = fs.readFileSync('public/kore-source-sections.html', 'utf8');

// Slice the industry-tabs swiper region: from tabs-menu v3 to the closing of the tab-slider.
const start = h.indexOf('tabs-menu v3');
// find the end: the slider section ends before next major section. We'll grab a big chunk.
const chunk = h.slice(start, start + 60000);

// Identify each panel by its tabpanel id.
const panelIds = ['panel-financial', 'panel-healthcare', 'panel-consumer', 'panel-telecom', 'panel-business'];

function panelSlice(id, nextId) {
    const a = chunk.indexOf('id="' + id + '"');
    const b = nextId ? chunk.indexOf('id="' + nextId + '"') : chunk.length;
    if (a === -1) return '';
    return chunk.slice(a, b === -1 ? chunk.length : b);
}

const imgRe = /<img[^>]*?src="([^"]+)"[^>]*?alt="([^"]*)"/gs;

for (let i = 0; i < panelIds.length; i++) {
    const s = panelSlice(panelIds[i], panelIds[i + 1]);
    // Within the panel, only collect connect-logo images (skip the .bg image which has alt="").
    // The .bg image is the first img with class="bg". connect-logo imgs have alt text.
    let m;
    const logos = [];
    imgRe.lastIndex = 0;
    while ((m = imgRe.exec(s)) !== null) {
        const src = m[1];
        const alt = m[2];
        // skip bg images (they appear with class="bg" and empty alt)
        if (src.includes('home.avif')) continue;
        logos.push({ src, alt });
    }
    console.log('### ' + panelIds[i] + ' (' + logos.length + ' logos) ###');
    for (const l of logos) {
        const file = decodeURIComponent(l.src.split('/').pop());
        console.log('  ' + file + '  ||ALT|| ' + JSON.stringify(l.alt));
    }
    console.log('');
}
