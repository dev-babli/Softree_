import { createHmac } from 'crypto';
import { encodeSignatureHeader } from '@sanity/webhook';

async function main() {
  const secret = 'SoftreeRevalidateSecret2026';
  const timestamp = 1787806275400;
  const payloadString = '{"_type":"post","slug":{"_type":"slug","current":"power-bi-vs-tableau-enterprise-bi"}}';

  // Method 1: Node.js createHmac
  const message = `${timestamp}.${payloadString}`;
  const signatureNode = createHmac('sha256', secret).update(message).digest('base64url');
  const expectedHeaderNode = `t=${timestamp},v1=${signatureNode}`;
  
  // Method 2: @sanity/webhook
  const expectedHeaderSanity = await encodeSignatureHeader(payloadString, timestamp, secret);

  console.log('Node.js signature:', signatureNode);
  console.log('Node.js header   :', expectedHeaderNode);
  console.log('Sanity header    :', expectedHeaderSanity);
  console.log('Match?           :', expectedHeaderNode === expectedHeaderSanity);
}

main().catch(console.error);
