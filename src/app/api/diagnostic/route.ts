import { NextResponse } from "next/server";

export async function GET() {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  return NextResponse.json({
    exists: typeof secret !== 'undefined',
    length: secret ? secret.length : 0,
    prefix: secret ? secret.substring(0, 4) : 'none',
    suffix: secret ? secret.substring(secret.length - 4) : 'none',
  });
}
