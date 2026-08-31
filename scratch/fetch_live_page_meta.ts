import axios from 'axios';

async function main() {
  const url = 'http://localhost:3000/blog/power-bi-vs-tableau-enterprise-bi';
  try {
    console.log(`Fetching HTML from ${url}...`);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    
    // Find <title>...</title> using regex
    const titleMatch = response.data.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : 'No title tag found';
    
    console.log('--- Server Response ---');
    console.log('HTML Title Tag:', title);
    
    // Let's check some content as well
    const h1Match = response.data.match(/<h1[\s\S]*?>([\s\S]*?)<\/h1>/i);
    console.log('H1 Tag:', h1Match ? h1Match[1].trim() : 'No H1 tag found');
    
  } catch (error: any) {
    console.error('Error fetching page:', error.message);
  }
}

main();
