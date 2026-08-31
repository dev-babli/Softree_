import axios from 'axios';

async function main() {
  const url = 'http://localhost:3000/blog/power-bi-vs-tableau-enterprise-bi';
  try {
    console.log('Sending request to local dev server:', url);
    const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    console.log('Status code:', res.status);
    console.log('Page Title/H1 match:');
    const titleMatch = res.data.match(/<title>([\s\S]*?)<\/title>/);
    console.log(titleMatch ? titleMatch[1].trim() : 'No title found');
  } catch (err: any) {
    if (err.response) {
      console.error('Error fetching page: Status', err.response.status);
      console.error(err.response.data);
    } else {
      console.error('Error:', err.message);
    }
  }
}

main().catch(console.error);
