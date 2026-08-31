import axios from 'axios';

async function main() {
  const secret = 'SoftreeRevalidateSecret2026';
  const baseUrl = 'https://www.softreetechnology.com/api/revalidate';
  const payload = {
    _type: 'post',
    slug: {
      current: 'power-bi-vs-tableau-enterprise-bi'
    }
  };

  // 1. Test via Headers
  try {
    console.log('Testing via x-sanity-secret header...');
    const response = await axios.post(baseUrl, payload, {
      headers: {
        'x-sanity-secret': secret,
        'Content-Type': 'application/json'
      }
    });
    console.log('SUCCESS via header! Status:', response.status, response.data);
    return;
  } catch (error: any) {
    if (error.response) {
      console.log('FAILED via header:', error.response.status, error.response.data);
    } else {
      console.log('FAILED via header:', error.message);
    }
  }

  // 2. Test via Query Parameter
  try {
    const urlWithQuery = `${baseUrl}?secret=${secret}`;
    console.log(`Testing via query param: ${urlWithQuery}...`);
    const response = await axios.post(urlWithQuery, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('SUCCESS via query param! Status:', response.status, response.data);
  } catch (error: any) {
    if (error.response) {
      console.log('FAILED via query param:', error.response.status, error.response.data);
    } else {
      console.log('FAILED via query param:', error.message);
    }
  }
}

main();
