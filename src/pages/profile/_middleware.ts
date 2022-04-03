import type { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req: NextApiRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.redirect('/');
  return NextResponse.next();
}
