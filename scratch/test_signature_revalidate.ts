import axios from 'axios';
import { createHmac } from 'crypto';

const secret = 'SoftreeRevalidateSecret2026';
const baseUrl = 'https://www.softreetechnology.com/api/revalidate';
const payload = {
  _type: 'post',
  slug: {
    _type: 'slug',
    current: 'power-bi-vs-tableau-enterprise-bi'
  }
};

const payloadString = JSON.stringify(payload);

async function testPlainTextHeader() {
  console.log('\n--- Test 1: Plain Text Secret Header ---');
  try {
    const res = await axios.post(baseUrl, payloadString, {
      headers: {
        'x-sanity-secret': secret,
        'Content-Type': 'application/json'
      }
    });
    console.log('Result:', res.status, res.data);
  } catch (err: any) {
    console.error('Error:', err.response?.status, err.response?.data || err.message);
  }
}

async function testSignatureHeader() {
  console.log('\n--- Test 2: Cryptographic Signature Header ---');
  const timestamp = Date.now();
  const message = `${timestamp}.${payloadString}`;
  // Sanity uses base64url encoding for its signature
  const signature = createHmac('sha256', secret).update(message).digest('base64url' as any);
  const signatureHeaderValue = `t=${timestamp},v1=${signature}`;
  console.log('Signature Header Value:', signatureHeaderValue);
  try {
    const res = await axios.post(baseUrl, payloadString, {
      headers: {
        'sanity-webhook-signature': signatureHeaderValue,
        'Content-Type': 'application/json'
      }
    });
    console.log('Result:', res.status, res.data);
  } catch (err: any) {
    console.error('Error:', err.response?.status, err.response?.data || err.message);
  }
}

async function testInvalidSignature() {
  console.log('\n--- Test 3: Invalid Signature Header ---');
  try {
    const res = await axios.post(baseUrl, payload, {
      headers: {
        'sanity-webhook-signature': 'invalid_signature_here',
        'Content-Type': 'application/json'
      }
    });
    console.log('Result:', res.status, res.data);
  } catch (err: any) {
    console.log('Result (Expected Error):', err.response?.status, err.response?.data || err.message);
  }
}

async function runAll() {
  await testPlainTextHeader();
  await testSignatureHeader();
  await testInvalidSignature();
}

runAll();
