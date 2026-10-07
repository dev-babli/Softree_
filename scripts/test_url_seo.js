const http = require('http');
const https = require('https');

const target = process.argv[2] || '/solutions/ai-agents-development';
const baseUrl = process.argv[3] || 'http://localhost:3000';

const fullUrl = target.startsWith('http') ? target : `${baseUrl}${target.startsWith('/') ? '' : '/'}${target}`;
const client = fullUrl.startsWith('https') ? https : http;

console.log(`\n🔍 Testing SEO & Response for: ${fullUrl}\n`);

const req = client.get(fullUrl, (res) => {
  console.log(`📡 Status Code: ${res.statusCode} ${res.statusMessage}`);
  if (res.statusCode >= 300 && res.statusCode < 400) {
    console.log(`🔁 Redirects to: ${res.headers.location}`);
    return;
  }

  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    const titleMatch = body.match(/<title[^>]*>(.*?)<\/title>/i);
    const descMatch = body.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i) ||
                      body.match(/<meta\s+content=["'](.*?)["']\s+name=["']description["']/i);
    const canonicalMatch = body.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/i) ||
                           body.match(/<link\s+[^>]*href=["'](.*?)["'][^>]*rel=["']canonical["']/i);
    const robotsMatch = body.match(/<meta\s+name=["']robots["']\s+content=["'](.*?)["']/i) ||
                        body.match(/<meta\s+content=["'](.*?)["']\s+name=["']robots["']/i);
    const ogTitle = body.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/i);
    const ogDesc = body.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i);
    const ogImage = body.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i);

    console.log(`🏷️  Title:       ${titleMatch ? titleMatch[1] : '❌ Missing'}`);
    console.log(`📝 Description: ${descMatch ? descMatch[1] : '❌ Missing'}`);
    console.log(`🔗 Canonical:   ${canonicalMatch ? canonicalMatch[1] : '❌ Missing'}`);
    console.log(`🤖 Robots Meta: ${robotsMatch ? robotsMatch[1] : '✅ Default (index, follow)'}`);
    console.log(`🖼️  OG Title:    ${ogTitle ? ogTitle[1] : '❌ Missing'}`);
    console.log(`🖼️  OG Image:    ${ogImage ? ogImage[1] : '❌ Missing'}`);

    const jsonLd = body.match(/<script\s+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gi);
    if (jsonLd) {
      console.log(`\n📊 Structured Data (JSON-LD): ${jsonLd.length} block(s) detected`);
    }
  });
});

req.on('error', (err) => {
  console.error(`❌ Connection failed: ${err.message}`);
  console.log(`👉 Make sure your dev server is running (e.g. npm run dev) on port 3000.`);
});
