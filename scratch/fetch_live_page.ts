import axios from 'axios';

async function main() {
  const url = 'https://www.softreetechnology.com/blog/power-bi-vs-tableau-enterprise-bi';
  try {
    const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = res.data;
    const cleanHtml = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
    
    console.log('Contains "Ignoring Governance"?:', cleanHtml.includes('Ignoring Governance'));
    console.log('Contains "KPI Ownership"?:', cleanHtml.includes('KPI Ownership'));
    console.log('Contains "Proof of Concept"?:', cleanHtml.includes('Proof of Concept'));
  } catch (err: any) {
    console.error('Error:', err.message);
  }
}

main().catch(console.error);
