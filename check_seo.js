const http = require('http');

http.get('http://localhost:3005/solutions/enterprise-rag-development', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const titleMatch = data.match(/<title[^>]*>(.*?)<\/title>/i);
    const descMatch = data.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    const canonicalMatch = data.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
    const ogTitleMatch = data.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/i);
    const ogDescMatch = data.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i);
    const ogUrlMatch = data.match(/<meta\s+property=["']og:url["']\s+content=["'](.*?)["']/i);
    
    console.log('Title:', titleMatch ? titleMatch[1] : 'Not Found');
    console.log('Description:', descMatch ? descMatch[1] : 'Not Found');
    console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'Not Found');
    console.log('OG Title:', ogTitleMatch ? ogTitleMatch[1] : 'Not Found');
    console.log('OG Description:', ogDescMatch ? ogDescMatch[1] : 'Not Found');
    console.log('OG URL:', ogUrlMatch ? ogUrlMatch[1] : 'Not Found');

    const jsonLdMatches = data.match(/<script\s+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gi);
    if (jsonLdMatches) {
        console.log('\nFound JSON-LD blocks:', jsonLdMatches.length);
        jsonLdMatches.forEach((m, i) => {
            const content = m.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
            try {
                const parsed = JSON.parse(content);
                console.log(`Block ${i+1} Type:`, parsed['@type'] || (Array.isArray(parsed) ? parsed.map(p => p['@type']).join(', ') : 'Unknown'));
                if (parsed['@type'] === 'Service') {
                    console.log('  Service Name:', parsed.name);
                } else if (parsed['@type'] === 'FAQPage') {
                    console.log('  FAQ count:', parsed.mainEntity?.length || 0);
                } else if (parsed['@type'] === 'BreadcrumbList') {
                    console.log('  Breadcrumb items:', parsed.itemListElement?.length || 0);
                }
            } catch(e) {
                console.log(`Block ${i+1}: Parse error`, e.message);
            }
        });
    } else {
        console.log('\nNo JSON-LD found.');
    }
  });
}).on('error', (err) => console.error(err.message));
