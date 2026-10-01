async function run() {
  try {
    const redRes = await fetch('http://localhost:3005/services/offshore-data-analytics', { redirect: 'manual' });
    console.log('--- REDIRECT TEST ---');
    console.log('HTTP Status:', redRes.status);
    console.log('Location Header:', redRes.headers.get('location'));

    const pageRes = await fetch('http://localhost:3005/services/power-bi-development-services');
    console.log('\n--- TARGET PAGE TEST ---');
    console.log('HTTP Status:', pageRes.status);
    const html = await pageRes.text();
    console.log('HTML Length:', html.length);

    // Metadata & SEO tags
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    console.log('Title:', titleMatch ? titleMatch[1] : 'NOT FOUND');

    const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    console.log('Meta Description:', metaDescMatch ? metaDescMatch[1] : 'NOT FOUND');

    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'NOT FOUND');

    const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i);
    console.log('OG Title:', ogTitleMatch ? ogTitleMatch[1] : 'NOT FOUND');

    const ogUrlMatch = html.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']*)["']/i);
    console.log('OG URL:', ogUrlMatch ? ogUrlMatch[1] : 'NOT FOUND');

    const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
    console.log('Robots Meta:', robotsMatch ? robotsMatch[1] : 'NOT FOUND');

    // JSON-LD scripts
    console.log('\n--- STRUCTURED DATA (JSON-LD) ---');
    const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    let count = 0;
    while ((match = jsonLdRegex.exec(html)) !== null) {
      count++;
      console.log(`\n[JSON-LD Block ${count}]`);
      try {
        const parsed = JSON.parse(match[1]);
        console.log(JSON.stringify(parsed, null, 2));
      } catch (e) {
        console.log('JSON-LD parse error:', e.message);
      }
    }

    // Robots.txt and Sitemap.xml test
    console.log('\n--- ROBOTS.TXT & SITEMAP.XML TEST ---');
    const robRes = await fetch('http://localhost:3005/robots.txt');
    console.log('robots.txt status:', robRes.status);
    const robText = await robRes.text();
    console.log('robots.txt snippet:', robText.slice(0, 150));

    const siteRes = await fetch('http://localhost:3005/sitemap.xml');
    console.log('sitemap.xml status:', siteRes.status);
    const siteText = await siteRes.text();
    console.log('sitemap contains power-bi-development-services:', siteText.includes('services/power-bi-development-services'));
    console.log('sitemap contains offshore-data-analytics:', siteText.includes('services/offshore-data-analytics'));

  } catch (err) {
    console.error('Error during test:', err);
  }
}

run();
