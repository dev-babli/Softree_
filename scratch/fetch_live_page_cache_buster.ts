import axios from 'axios';

async function main() {
  // Add a unique timestamp to bypass Edge CDN and Vercel server cache
  const url = 'https://www.softreetechnology.com/blog/power-bi-vs-tableau-enterprise-bi?cb=' + Date.now();
  try {
    console.log(`Fetching HTML from ${url}...`);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    
    const titleMatch = response.data.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : 'No title tag found';
    
    console.log('--- Server Response with Cache Buster ---');
    console.log('HTML Title Tag:', title);
    
    const h1Match = response.data.match(/<h1[\s\S]*?>([\s\S]*?)<\/h1>/i);
    console.log('H1 Tag:', h1Match ? h1Match[1].trim() : 'No H1 tag found');
    
  } catch (error: any) {
    console.error('Error fetching page:', error.message);
  }
}

main();
